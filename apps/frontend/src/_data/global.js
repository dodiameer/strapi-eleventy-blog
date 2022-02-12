const { request, gql } = require("graphql-request");

module.exports = async ({ env: { GRAPHQL_URL, API_URL } }) => {
  const { global: response } = await request(
    GRAPHQL_URL,
    gql`
      {
        global {
          data {
            attributes {
              siteName
              favicon {
                data {
                  attributes {
                    url
                  }
                }
              }
              siteDescription
              defaultSeo {
                metaTitle
                metaDescription
              }
            }
          }
        }
      }
    `
  );

  return {
    siteName: response.data.attributes.siteName,
    siteDescription: response.data.attributes.siteDescription,
    favicon: API_URL + response.data.attributes.favicon.data.attributes.url,
    defaultSeo: response.data.attributes.defaultSeo,
  };
};
