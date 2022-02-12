const { request, gql } = require("graphql-request");
const prepareBlocks = require("./_utils/prepareBlocks");

const query = gql`
  {
    about {
      data {
        attributes {
          title
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
        }
      }
    }
  }
`;

module.exports = async ({ env }) => {
  const { about } = await request(env.GRAPHQL_URL, query);

  if (!about.data || !about.data.attributes) {
    throw new Error("No data found");
  }

  return {
    ...about.data.attributes,
    ...prepareBlocks(about.data.attributes.blocks),
  };
};
