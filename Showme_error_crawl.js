const Webflow = require('webflow-api');
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

// // Initialize the webflow API
API_TOKEN = 'dce44da83e317c58bd11f0a115d30a76d0ba094ef051075157809c8996d88d12'
const webflow = new Webflow({ token: API_TOKEN });

const concerts = webflow.items({ collectionId: '603f35b07235057cf5ca3712' }, { limit: 100}); 
// Can't be above 100, so this will have to be run multiple times

const UrlExists = (concerts) =>  {

  var http = new XMLHttpRequest();
  concerts.then(
    result => result.items.forEach(
      (item) => {
        http.open('HEAD', item.video.url, false);
        http.send();
        if(http.status === 200) {console.log(`${item.name}`)}
        
        if(http.status !== 200) {
          console.log(`********* There is an issue with ${item.name}, check ${item.video.url} ********`)
        };
      }
  ));
}

UrlExists(concerts)