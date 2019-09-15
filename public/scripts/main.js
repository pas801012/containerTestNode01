// ids in index.html
/* global images, file, upload, url */
async function getImages() {
  console.log('getImageArguments');
  let fileNames;
  try {
    fileNames = await (await fetch('/upload')).json();
  } catch (e) {
    console.error(e);
  }
  console.log('fileNames', fileNames);
  //images.innerHTML = fileNames.reduce((str,fileName) => `${/*str*/}<img src="${fileName}"/>`,"" )
  images.innerHTML = fileNames
    .reduce((imageTags, fileName) => {
      imageTags.push(`<img src="/upload/${fileName}"/>`);
      return imageTags;
    }, [])
    .join('');
}

getImages();

console.log('file', file);
file.onchange = async () => {
  console.log('onchange start');
  url.innerHTML = url.href =
    '/' +
    (await (await fetch(upload.value, {
      method: 'POST',
      body: file.files[0]
    })).text());
  getImages();
};
