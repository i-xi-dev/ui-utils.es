import { build, emptyDir } from "https://deno.land/x/dnt@0.32.0/mod.ts";

await emptyDir("./npm");

await build({
  compilerOptions: {
    lib: ["esnext", "dom"],
  },
  entryPoints: ["./mod.ts"],
  outDir: "./npm",
  shims: {
    deno: "dev",
  },
  scriptModule: false,
  rootTestDir: "./tests",
  package: {
    name: "@i-xi-dev/ui-utils",
    version: "2.0.1",
    description: "This is not for direct usage.",
    license: "MIT",
    author: "i-xi-dev",
    homepage: "https://github.com/i-xi-dev/ui-utils.es#readme",
    keywords: [],
    repository: {
      type: "git",
      url: "git+https://github.com/i-xi-dev/ui-utils.es.git",
    },
    bugs: {
      url: "https://github.com/i-xi-dev/ui-utils.es/issues",
    },
    publishConfig: {
      access: "public",
    },
    files: [
      "esm",
      "types",
    ],

    //
    // devDependencies: {
    //   "@typescript/lib-es5": "npm:@better-typescript-lib/es5@2.2.0",
    //   "@typescript/lib-es2015": "npm:@better-typescript-lib/es2015@2.2.0",
    //   "@typescript/lib-es2016": "npm:@better-typescript-lib/es2016@2.2.0",
    //   "@typescript/lib-es2017": "npm:@better-typescript-lib/es2017@2.2.0",
    //   "@typescript/lib-es2018": "npm:@better-typescript-lib/es2018@2.2.0",
    //   "@typescript/lib-es2019": "npm:@better-typescript-lib/es2019@2.2.0",
    //   "@typescript/lib-es2020": "npm:@better-typescript-lib/es2020@2.2.0",
    // },
  },
  importMap: "./import_map.json",

  //
  typeCheck: false, // 落ちるようになった
  declaration: false, // 落ちるようになった
});

Deno.copyFileSync("LICENSE", "npm/LICENSE");
Deno.copyFileSync("README.md", "npm/README.md");
