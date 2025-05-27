const resolve = require("@rollup/plugin-node-resolve").default;
const commonjs = require("@rollup/plugin-commonjs").default;
const typescript = require("@rollup/plugin-typescript").default;
const terser = require("@rollup/plugin-terser").default;

module.exports = [
  {
    input: "src/index.ts",
    output: [
      {
        file: "dist/index.js",
        format: "cjs",
        sourcemap: true,
      },
      {
        file: "dist/index.esm.js",
        format: "esm",
        sourcemap: true,
      },
      {
        file: "dist/index.umd.js",
        format: "umd",
        sourcemap: true,
        name: "HierarchicalFoldersList",
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
          "@emotion/react": "emotionReact",
          "@emotion/styled": "emotionStyled",
          "classnames": "classNames"
        }
      }
    ],
    plugins: [
      resolve(),
      commonjs(),
      typescript({ 
        tsconfig: "tsconfig.json",
        sourceMap: true,
        declaration: true,
        declarationDir: "dist/types",
        rootDir: "src"
      }),
      terser(),
    ],
    external: ["react", "react-dom", "@emotion/react", "@emotion/styled", "classnames"],
  }
]; 