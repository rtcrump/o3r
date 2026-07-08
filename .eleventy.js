module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy({ "src/assets": "assets" });

  eleventyConfig.addFilter("findProject", function (projectIds, projects) {
    if (!Array.isArray(projectIds) || !Array.isArray(projects)) {
      return [];
    }

    return projectIds
      .map((id) => projects.find((project) => project.id === id))
      .filter(Boolean);
  });

  eleventyConfig.addFilter("statusClass", function (status) {
    return String(status || "")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  });
  eleventyConfig.addShortcode("initials", function (name) {
    if (!name) {
      return "?";
    }

    return name
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0].toUpperCase())
      .join("");
  });

  return {
    dir: {
      input: "src",
      includes: "_includes",
      data: "_data",
      output: "_site"
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk"
  };
};
