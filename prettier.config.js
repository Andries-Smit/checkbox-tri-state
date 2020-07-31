const base = require("./node_modules/@mendix/pluggable-widgets-tools/configs/prettier.base.json");

module.exports = {
    ...base,
    overrides: [
        {
            files: "*.md",
            options: {
                proseWrap: "preserve"
            }
        }
    ]
};
