// ==UserScript==
// @name          Stream MP3 new
// @namespace     http://elektroelch.de
// @description	  Add a link to stream MP3s
// @include       *
// ==/UserScript==
//
// This script was originally written by Ivan. Unfortunately the service
// disappeared in early 2006 so I decided to host the smal script on
// my own site.
// Changes:
// --- Obviously I had to change the URLs
// --- changed the icon
// ************************************************************************
// Original comments:
// This script is basically an adapted form of amazon2melvyl which is here:
// http://sims.berkeley.edu/~ryanshaw/amazon2melvyl/amazon2melvyl.user.js
// Thanks to Julien Couvreur for data url tip.
// Thanks to Brandon for telling me about the bug with URLs with spaces
// Full details at http://www.barkingstars.com/blog/000031.html

(

function() {
  var links = document.evaluate('//a', document, null, XPathResult.ANY_TYPE, null); 
  var mp3_links = new Array();
  var current_link = links.iterateNext();
  while (current_link) {
    var href = current_link.getAttribute('href');
    if (href) {
	if (href.match(/\.mp3$|\.ogg/i)) {
        	mp3_links.push(current_link);
	}
    }
    current_link = links.iterateNext();
  }
  for (var i = 0; i < mp3_links.length; i++) {
      var m3u_link = document.createElement('a');
      m3u_link.setAttribute('href', 'data:audio/x-mpegurl,' + escape(mp3_links[i].href));
      m3u_link.setAttribute('title', 'Stream this MP3');
      m3u_link.innerHTML 
        = '<img src="data:image/gif;base64,R0lGODlhFgAWAOYAAHV9OXF5M/z8/MzPvMDIfenp6YWPOvDx7LCwsOPk2rG7Xd7e3tfZynF6Mefn58PGr7S+ZfLy8vb29uHh4fr6+vT09L/Hequvjr7GeLGxsXN5Qqq1TqSlnLC6XcTMhcnQj7S4mcHJfvX19XuENs/Pz7fBaqWwSbu7u6SuSMHBwX2GN7zEc42Njdzc3KGsR8fOi6GrSKywj4WHerq9o3p+XGtvTqSuSZaWlqm0TZubm8TExICHOeLi4tHWn5qdg6u2UZOeQeDg4IaOO9vb29ra2n2DUL3GdXJ3Rr3Fd5OcQ4iOX9TU1NHXoObm5pmkQ42TZpehR7e7ocbNinmCNaClfra/aHyCT5OYcYGFatPUynmAQ6+6W7a2tqq1TLW1tcjPjrC6WYiTPLm8osjPjLC6W7K2m7y8vLrCb8DIe8PKg/n5+evr6+Pj46u1UH+FUaezS6ezSq+vr5SYe4yQaG5yUpuegpeYlJ6ifrS+Y6aqi/39/cLKgnB4Mf///wAAAAAAACH5BAEAAH0ALAAAAAAWABYAAAekgH2Cg4SFhoeIiYqLjH1XfJCRikqRBjh4aARpCnyJABsYYy9SBGRwYQ17nYgAeyiRkEV9qauHrXxWhgGqnry6vrbAhLu1hreHxL3Fg8mswszPhMeCTxqRJct9c5FGq0AKBB9fWybLKmAhTD0/Bn18SBAQVTZCfD6EfCtnHhZtO518usCAkmTEFBqF+Dhx0eGNATeDakSig+gIJC1YGmncyLFjoUAAOw%3D%3D"'
        + ' style="border: 0; margin: 0 0 0 2px; padding: 0; vertical-align: middle"'
        + ' alt="Stream MP3" />';
      mp3_links[i].parentNode.insertBefore(m3u_link, mp3_links[i]);
      mp3_links[i].parentNode.insertBefore(mp3_links[i], m3u_link);
  }
}

)();
