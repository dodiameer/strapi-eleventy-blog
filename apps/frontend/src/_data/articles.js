const { request, gql } = require("graphql-request");
const prepareBlocks = require("../_utils/prepareBlocks");

const query = gql`
  {
    articles {
      data {
        attributes {
          title
          description
          slug
          author {
            data {
              attributes {
                name
                avatar {
                  data {
                    attributes {
                      formats
                    }
                  }
                }
              }
            }
          }
          category {
            data {
              attributes {
                name
                slug
              }
            }
          }
          blocks {
            ... on ComponentSharedMedia {
              file {
                data {
                  attributes {
                    url
                  }
                }
              }
            }
            ... on ComponentSharedQuote {
              title
              body
            }
            ... on ComponentSharedRichText {
              body
            }
            ... on ComponentSharedSlider {
              files {
                data {
                  attributes {
                    url
                  }
                }
              }
            }
          }
          publishedAt
        }
      }
    }
  }
`;

module.exports = async ({ env }) => {
  const { articles } = await request(env.GRAPHQL_URL, query);
  if (!articles.data) {
    throw new Error("No data found");
  }

  const data = articles.data.map((article) => {
    return {
      ...article.attributes,
      ...prepareBlocks(article.attributes.blocks),
    };
  });

  return data;
};
