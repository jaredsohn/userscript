// ==UserScript==
// @name           Auto URL Shortener
// @namespace      http://twitter.com/lucasdecastro
// @description    Simplify URLs automatically when you change textareas. Useful for twitter, blogs, forums...
// @include        http://twitter.com/*
// ==/UserScript==

// Feedback while loading short url
var feedbackId = 'AutoUrlShortenerFeedback';
loadingElement = document.createElement('div');
loadingElement.setAttribute('id', feedbackId);
loadingElement.setAttribute('style', 'position:fixed; right: 2px; top: 2px; background: #a02c2c; color: white; padding: 2px;')
loadingElement.innerHTML = 'Getting short url...';
loadingElement.style.display = 'none';
document.body.appendChild(loadingElement);

// Event Handler
function onChange(event) {
  var element = event.currentTarget; 

  /* regex from http://snippets.dzone.com/posts/show/452 */
  var regex = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/g

  urls = element.value.match(regex);
  if (urls) {
    for(i in urls) {
      var url = urls[i]
      // Can't be a migre.me url
      if (url.substring(0, 15) == 'http://migre.me') continue;

      GM_xmlhttpRequest({
        method: 'GET',
        url:    'http://migre.me/api.xml?url=' + url,
        headers: {
          'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
          'Accept': 'text/xml',
        },
        onreadystatechange: function (responseDetails) {
          document.getElementById(feedbackId).style.display = 'block'
        },
        onload: function(responseDetails) {
          try {
            var parser  = new DOMParser();
            var dom     = parser.parseFromString(responseDetails.responseText, 'text/xml');
            var newUrl  = dom.getElementsByTagName('migre')[0].textContent;

            if (confirm("Change '" + url + "' to '" + newUrl + "'?")) {
              element.value = element.value.replace(url, newUrl)
            }
          } catch (err) {
            alert('oh shit! migre.me api is out :/')
          }

          document.getElementById(feedbackId).style.display = 'none'
        },
      });
    }
  }
}


// Adding Event Listeners
var elements = document.getElementsByTagName('textarea');

for (i in elements) {
  try {
    elements[i].addEventListener("change", onChange, true);
  } catch (err) { /* dont try it at home ;) */ }
}