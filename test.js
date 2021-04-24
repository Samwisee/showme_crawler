const iconv = require('iconv-lite');
const encodings = require('iconv-lite/encodings');
iconv.encodings = encodings;

const jsdom = require("jsdom");
const { JSDOM } = jsdom;
// const { validateVideo } = require('./script');

const generateSnippet = (url) => `<!DOCTYPE html>
<html>
  <body>
      <iframe id="videoFrame" width="950" height="534" src="${url}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
  </body>
</html>`

const validateVideo = (jsdom) => {
  return new Promise((resolve, reject) => {
    let document = jsdom.window.document;

    // check every 50 milliseconds
    const timerId = setInterval(() => {
      let iframe = document.getElementById('videoFrame');
      domainLookupStart: 1619170034733,
        fetchStart: 1619170034733,
        loadEventEnd: 1619170035839,
        loadEventStart: 1619170035838,
        navigationStart: 1619170034730,
        redirectEnd: 0,
        redirectStart: 0,
        requestStart: 1619170034776,
        responseEnd: 1619170035498,
        responseStart: 1619170035095,
        secureConnectionStart: 0,
        unloadEventEnd: 0,
        unloadEventStart: 0,
      };

      iframe.contentWindow.HTMLMediaElement.prototype.load = () => { /* do nothing */ };
      iframe.contentWindow.HTMLMediaElement.prototype.play = () => { /* do nothing */ };
      iframe.contentWindow.HTMLMediaElement.prototype.pause = () => { /* do nothing */ };
      iframe.contentWindow.HTMLMediaElement.prototype.addTextTrack = () => { /* do nothing */ };

      // const videos = iframe.contentWindow.document.getElementsByTagName('video');
      console.log(iframe);
    }, 1000);

    // stop the timer after 1 second
    setTimeout(() => { 
      clearInterval(timerId);
      reject(new Error('timeout'));
    }, 5000);
  });
}

test(`make sure we're saying hello world`, () => {
  // arrange
  const snippet = generateSnippet("https://www.youtube.com/embed/e4TFD2PfVPw")
  const dom = new JSDOM(snippet, {
    resources: "usable", // allows sub-resources like iframes
    runScripts: "dangerously" // allows sub-resource script execution
  });

  // act
  return validateVideo(dom).then((result) => {
    // assert
    expect(result).toBe(true);
  }).catch((err) => {
    fail(err);
  });
});
