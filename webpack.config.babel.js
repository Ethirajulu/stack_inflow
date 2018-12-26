import path from "path";
import webpack from "webpack";
import merge from "webpack-merge";
import UglifyJsPlugin from "uglifyjs-webpack-plugin";
import CleanWebpackPlugin from "clean-webpack-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import OptimizeCSSAssetsPlugin from "optimize-css-assets-webpack-plugin";
import ExtractTextPlugin from "extract-text-webpack-plugin";
import OpenBrowserPlugin from "open-browser-webpack-plugin";

/* eslint-disable no-console */

let _BABEL_PRESETS_ = [
  "react",
  [
    "env",
    {
      debug: true,
      modules: false
    }
  ],
  "stage-0"
];
const isProduction = process.env.NODE_ENV === "production";

console.log("This is a", process.env.NODE_ENV, "build");

let baseConfig = {
  stats: "verbose",
  entry: {
    vendor: ["babel-polyfill"],
    app: path.resolve(__dirname, "src/index")
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js",
    publicPath: "/"
  },
  target: "web",
  plugins: [
    new CleanWebpackPlugin(["dist"]),
    new HtmlWebpackPlugin({
      title: "Bank management system",
      template: path.resolve(__dirname, "public/index.html"),
      filename: "index.html",
      favicon: path.resolve(__dirname, "public/favicon.ico"),
      minify: true,
      hash: true
    }),
    new ExtractTextPlugin({
      filename: "css/[name].css?[hash]-[chunkhash]-[contenthash]-[name]",
      disable: false,
      allChunks: true
    })
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        include: path.join(__dirname, "src"),
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: _BABEL_PRESETS_,
              babelrc: false,
              plugins: [
                [
                  "transform-runtime",
                  {
                    helpers: true,
                    polyfill: true,
                    regenerator: true,
                    moduleName: "babel-runtime"
                  }
                ]
              ]
            }
          }
        ]
      },
      {
        test: /\.html$/,
        exclude: /(node_modules)/,
        use: [
          "htmllint-loader",
          {
            loader: "html-loader",
            options: {
              minimize: true,
              removeComments: true,
              collapseWhitespace: false
            }
          }
        ]
      },
      { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file-loader" },
      { test: /\.(woff|woff2)$/, loader: "url-loader?prefix=font/&limit=5000" },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url-loader?limit=10000&mimetype=application/octet-stream"
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url-loader?limit=10000&mimetype=image/svg+xml"
      }
    ]
  },
  resolveLoader: {
    alias: {
      "userDefined-loader": path.resolve(
        __dirname,
        "tools/userDefined-loader.js"
      )
    }
  },
  resolve: {
    extensions: [".js", ".jsx", ".css", ".html"]
  }
};

if (isProduction) {
  module.exports = merge(baseConfig, {
    mode: "production",
    optimization: {
      minimizer: [
        new UglifyJsPlugin({
          cache: true,
          parallel: true,
          sourceMap: true
        }),
        new OptimizeCSSAssetsPlugin({})
      ],
      splitChunks: {
        chunks: "async",
        minSize: 30000,
        minChunks: 1,
        maxAsyncRequests: 5,
        maxInitialRequests: 3,
        automaticNameDelimiter: "~",
        name: true,
        cacheGroups: {
          vendors: {
            test: /[\\/]node_modules[\\/]/,
            priority: -10
          },
          default: {
            minChunks: 2,
            priority: -20,
            reuseExistingChunk: true
          }
        }
      }
    },
    plugins: [
      new webpack.DefinePlugin({
        "process.env.NODE_ENV": JSON.stringify("production")
      }),
      new MiniCssExtractPlugin({
        filename: "[name].css",
        chunkFilename: "[id].css"
      })
    ],
    module: {
      rules: [
        {
          test: /(\.css)$/,
          use: [MiniCssExtractPlugin.loader, "css-loader"]
        }
      ]
    }
  });
} else {
  _BABEL_PRESETS_.push("react-hmre");
  module.exports = merge(baseConfig, {
    entry: {
      vendor: ["eventsource-polyfill"]
    },
    mode: "development",
    devtool: "inline-source-map",
    devServer: {
      port: 3000,
      contentBase: path.resolve(__dirname, "dist"),
      hot: true,
      historyApiFallback: true,
      overlay: true
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new OpenBrowserPlugin({ url: "http://localhost:3000" })
    ],
    module: {
      rules: [
        {
          test: /(\.css)$/,
          use: ["style-loader", "css-loader"]
        }
      ]
    }
  });
}
