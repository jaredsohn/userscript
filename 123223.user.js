// ==UserScript==
// @name           Facebook football blocker
// @namespace      facebook-football-blocker
// @description    I don't like sports, and I don't care who knows.
// @match          http://*.facebook.com/*
// @match          https://*.facebook.com/*
// @version        0.4
// ==/UserScript==

(function(window, document) {

  var style = document.createElement('style');
  style.innerText = '.sports { opacity: .1; -webkit-transition: opacity .4s; -moz-transition: opacity .4s; -o-transition: opacity .4s; -ms-transition: opacity .4s; transition: opacity .4s; } .sports:hover { opacity: 1; }';
  document.getElementsByTagName('head')[0].appendChild(style);

  var terms = new RegExp('\\b(?:' + ['baltimore', 'ravens', 'cincinnati', 'bengals', 'cleveland', 'browns', 'pittsburgh', 'steelers', 'houston', 'texans', 'indianapolis', 'colts', 'jacksonville', 'jaguars', 'tennessee', 'titans', 'buffalo', 'bills', 'miami', 'dolphins', 'new england', 'patriots', 'new york', 'jets', 'denver', 'broncos', 'kansas city', 'chiefs', 'oakland', 'raiders', 'san diego', 'chargers', 'chicago', 'bears', 'detroit', 'lions', 'green bay', 'packers', 'minnesota', 'vikings', 'atlanta', 'falcons', 'carolina', 'panthers', 'new orleans', 'saints', 'tampa bay', 'buccaneers', 'dallas', 'cowboys', 'new york', 'giants', 'philadelphia', 'eagles', 'washington', 'redskins', 'arizona', 'cardinals', 'san francisco', '49ers', 'seattle', 'seahawks', 'st. louis', 'rams', 'horrible game', 'bad game', 'good game', 'great game', 'awesome game', 'football', 'the game', 'you just lost it', 'we just lost', 'tom brady', 'tebow', 'tboe', 't boe', 't. boe', 't boh', 'go team'].join('|') + ')\\b', 'i');

  function hideSports() {
    Array.prototype.slice.call(document.getElementsByClassName('uiStreamMessage')).forEach(function(el) {
      if (terms.test(el.textContent || el.innerText))
        el.parentNode.parentNode.parentNode.parentNode.parentNode.className += ' sports';
    });
  }

  var streamStoryReg = /(?:^| )uiStreamStory(?: |$)/;
  var timeoutId;
  var standard = !!document.addEventListener;
  document[standard ? 'addEventListener' : 'attachEvent']((standard ? '' : 'on') + 'DOMNodeInserted', function(e) {
    if (!streamStoryReg.test(e.target.className))
      return;
    if (timeoutId)
      window.clearTimeout(timeoutId);
    timeoutId = window.setTimeout(hideSports, 500);
  });

  hideSports();

}(this, this.document));
