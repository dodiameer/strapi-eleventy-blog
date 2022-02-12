module.exports = (blocks) => {
  // Add keys to each component to easily use them in the template
  blocks = blocks.map((item) => {
    if ("file" in item) {
      item.key = "media";
    }
    if ("title" in item) {
      item.key = "quote";
    }
    if ("body" in item && !("title" in item)) {
      item.key = "richText";
    }
    if ("files" in item) {
      item.key = "slider";
    }
    if ("metaTitle" in item) {
      item.key = "seo";
    }

    return item;
  });

  const meta = blocks.find((item) => item.key === "seo");

  return {
    content: blocks,
    meta: {
      title: meta?.metaTitle,
      description: meta?.metaDescription,
      image: meta?.shareImage?.data?.attributes?.url,
    },
  };
};
