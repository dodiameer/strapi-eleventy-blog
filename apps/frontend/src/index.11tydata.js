const { request, gql } = require("graphql-request");
const prepareBlocks = require("./_utils/prepareBlocks");

const query = gql`
  {
    home {
      data {
        attributes {
          content {
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
            ... on ComponentSharedSeo {
              metaTitle
              metaDescription
              shareImage {
                data {
                  attributes {
                    alternativeText
                    url
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

module.exports = async ({ env }) => {
  const { home } = await request(env.GRAPHQL_URL, query);

  if (!home.data || !home.data.attributes) {
    throw new Error("No data found");
  }

  return prepareBlocks(home.data.attributes.content);
};
