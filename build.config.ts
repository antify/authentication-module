import {defineBuildConfig} from 'unbuild';

export default defineBuildConfig({
  declaration: true,
  entries: [
    'src/module',
    'src/package',
    {
      input: 'src/cli',
      builder: 'mkdist',
      outDir: 'dist/cli',
    }
  ],
  externals: [
    '#authentication-module-data-adapter',
    '#vue-router',
    'mongoose',
    'pathe',
  ]
});
