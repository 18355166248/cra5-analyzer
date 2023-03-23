const BundleAnalyzerPlugin =
  require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const CracoLessPlugin = require("craco-less");

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              "@primary-color": "#1DA57A",
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
  babel: {
    plugins: [
      /**
       * AntDesign 按需加载
       */
      [
        "babel-plugin-import",
        {
          libraryName: "antd",
          libraryDirectory: "es",
          style: true,
        },
        "antd",
      ],
      [
        "babel-plugin-import",
        {
          libraryName: "@xmly/mi-design",
          libraryDirectory: "es",
          customName: (name, file) => {
            console.log(file.opts.filename, name);
            return `@xmly/mi-design/dist/components/common/${name}`;
          },
        },
        "@xmly/mi-design",
      ],
    ],
  },
  webpack: {
    plugins: {
      add: process.env.ANALYZER_ENV ? [new BundleAnalyzerPlugin()] : [],
    },
  },
  configure: (webpackConfig, { env, paths }) => {
    /**
     * webpack split chunks
     */
    webpackConfig.optimization.splitChunks = {
      ...webpackConfig.optimization.splitChunks,
      ...{
        chunks: "all",
        name: true,
        cacheGroups: {
          antd: {
            test: /[\\/]node_modules[\\/](antd|rc-).*[\\/]/,
            name: "antd",
            chunks: "all",
          },
          "mi-design": {
            test: /[\\/]node_modules[\\/](mi-design)[\\/]/,
            name: "mi-design",
            chunks: "all",
          },
        },
      },
    };
    // 返回重写后的新配置
    return webpackConfig;
  },
};
