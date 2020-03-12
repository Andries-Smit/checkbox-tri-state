const merge = require("webpack-merge");
const baseConfig = require("./node_modules/@mendix/pluggable-widgets-tools/configs/webpack.config.prod.js");

const customConfig = {
    devtool: "false"
};
const previewConfig = {
};

module.exports = [merge(baseConfig[0], customConfig), merge(baseConfig[1], previewConfig)];
