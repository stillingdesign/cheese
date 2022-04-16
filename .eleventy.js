const { DateTime } = require("luxon");

module.exports = (function(eleventyConfig) { 

    // Hot reload when sass saves
    eleventyConfig.addWatchTarget("src/assets/scss");
    
    // Pass through images
    eleventyConfig.addPassthroughCopy("src/assets/img");
    
    // Abbreviated Date Formatting
    eleventyConfig.addFilter("dateShort", (dateObj) => {
        return DateTime.fromJSDate(dateObj).toLocaleString(DateTime.DATE_SHORT);
    });

    // Full Date Formatting
    eleventyConfig.addFilter("dateFull", (dateObj) => {
        return DateTime.fromJSDate(dateObj).toLocaleString(DateTime.DATE_FULL);
    });

    // Limit for loop results
    eleventyConfig.addFilter("limit", (arr, limit) => arr.slice(0, limit));

    // Current filter - filters our current page
    eleventyConfig.addFilter('currentFilter', function(collection, title) {
        if (!title) return collection;
            const filtered = collection.filter(item => item.data.title != title)
            return filtered;
    });

    // List all collections
    eleventyConfig.addCollection("tagsList", function(collectionApi) {
        const tagsList = new Set();
        collectionApi.getAll().map( item => {
            if (item.data.tags) { // handle pages that don't have tags
                item.data.tags.map( tag => tagsList.add(tag))
            }
        });
        return tagsList;
    });

    return {
        dir: {
            input: "src",
            output: "dist"
        }
    }

});