// ==UserScript==
// @name           Twitlator
// @namespace      http://ianloic.com/
// @description    Translate tweets automatically
// @include        http://twitter.com/*
// @exclude        http://twitter.com/help/*
// ==/UserScript==


// only real twitter pages
if (!document.getElementById('container')) return;


// translate takes a string @s and a callback @cb, does a little magic to
// do the translate @s from whatever language into english, and calls @cb
// with a single object argument with either a key 'error' if an error occurs
// or keys 'language' and 'translation' if the translation was successful.
function translate(s, cb) {
  function iframeLoaded() {
    try {
      cb(eval(loader.contentWindow.name));
      document.body.removeChild(loader);
    } catch (e) {
    }
  }

  // we have to use an iframe to host the Google language API
  var loader = document.createElement('iframe');
  var request = {};
  request.string = s;
  request.callback = 'http://twitter.com/help/contact';
  request.language = 'en';
  loader.setAttribute('src', 'http://static.ianloic.com/twitlator/proxy.html#'+
      encodeURIComponent(request.toSource()));
  loader.setAttribute('width', '1');
  loader.setAttribute('height', '1');
  loader.addEventListener('load', iframeLoaded, false);
  document.body.appendChild(loader);
}


// decorate a single tweet element
function decorateTweet(tweet) {
    var original = document.createElement('div');
    tweet.appendChild(original);
    while (tweet.firstChild && tweet.firstChild != original) {
      original.appendChild(tweet.firstChild);
    }

    var translation = document.createElement('div');
    tweet.appendChild(translation);

    function tclick(event) {
      event.preventDefault();
      event.stopPropagation();
      translation.textContent = "translating...";
      function cb(data) { 
        if (data.error) {
          translation.innerHTML = 'error translating';
        } else {
          translation.innerHTML = '<small>tranlated from ' + 
            data.language + ':</small> ' + data.translation; 
          translation.setAttribute('style', 'font-style:italic');
        }
      }
      translate(original.innerHTML, cb);
    }

    var a = document.createElement('a');
    a.href='#';
    a.innerHTML = "translate!";
    a.addEventListener('click', tclick, false);

    translation.appendChild(a);
}

// decorate all the tweets on a page
function decorateTweets() {
  var tweets = document.getElementsByClassName('entry-title');
  for (var i=0; i<tweets.length; i++) {
    decorateTweet(tweets[i]);
  }
}
decorateTweets();
