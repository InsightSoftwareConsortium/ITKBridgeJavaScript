- To release a new version of itk.js on npmjs:

Verify the source tree.

```
git checkout master
git pull upstream master
git clean -fdx
npm ci
version=6.0.0 # change to correct version

# Update the default CLI image in src/itk-js-cli.js
./src/Docker/itk-js-base/build.sh --with-debug
./src/Docker/itk-js/build.sh --with-debug
./src/Docker/itk-js-vtk/build.sh --with-debug
git add -- src/itk-js-cli.js
git commit -m "feat(itk-js-cli): Update default Docker image for ${version}"
```

Push the `latest` and date / hash tagged Docker images to DockerHub

Bump `version` in `package.json`.

```
git add -- package.json package-lock.json
git commit -m "feat(version): Bump NPM version to ${version}"
npm run build
npm run test
rm dist/Pipelines/itkJSPipeline*
rm dist/Pipelines/*Test*
cp LICENSE README.md package.json dist/
cd dist
npm publish
cd ..
git tag -m "itk.js ${version}" -s v$version HEAD
git checkout release
git merge master
git push --tags upstream release master
```
