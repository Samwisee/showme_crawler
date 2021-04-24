// this assumes that the youtube embeddable iframe is present on the jsdom object
exports.validateVideo = (jsdom) => {
  return new Promise((resolve, reject) => {
    // check every 50 milliseconds
    const timerId = setInterval(() => {
      const document = jsdom.window.document;
      const iframe = document.getElementById('videoFrame');
      // const videos = iframe.contentWindow.document.getElementsByTagName('video');
      console.log(iframe);
    }, 50);

    // stop the timer after 1 second
    setTimeout(() => { 
      clearInterval(timerId);
      reject(new Error('timeout'));
    }, 5000);
  });
}
