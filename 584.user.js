// ==UserScript==
// @name          Stream MP3
// @namespace     http://barkingstars.com/
// @description	  Add a link to stream MP3s
// @include       *
// ==/UserScript==
//
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
	if (href.match(/\.mp3$/i)) {
        	mp3_links.push(current_link);
	}
    }
    current_link = links.iterateNext();
  }
  for (var i = 0; i < mp3_links.length; i++) {
      var m3u_link = document.createElement('a');
      m3u_link.setAttribute('href', 'http://barkingstars.com/streammp3/stream.m3u?s=' + escape(mp3_links[i].href));
      m3u_link.setAttribute('title', 'Stream this MP3');
      m3u_link.innerHTML 
        = '<img src="data:image/gif;base64,R0lGODlhCQAXAPcAAAAAAIAAAACAAICAAAAAgIAAgACAgICAgMDAwP8AAAD%2FAP%2F%2FAAAA%2F%2F8A%2FwD%2F%2F%2F%2F%2F%2FwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMwAAZgAAmQAAzAAA%2FwAzAAAzMwAzZgAzmQAzzAAz%2FwBmAABmMwBmZgBmmQBmzABm%2FwCZAACZMwCZZgCZmQCZzACZ%2FwDMAADMMwDMZgDMmQDMzADM%2FwD%2FAAD%2FMwD%2FZgD%2FmQD%2FzAD%2F%2FzMAADMAMzMAZjMAmTMAzDMA%2FzMzADMzMzMzZjMzmTMzzDMz%2FzNmADNmMzNmZjNmmTNmzDNm%2FzOZADOZMzOZZjOZmTOZzDOZ%2FzPMADPMMzPMZjPMmTPMzDPM%2FzP%2FADP%2FMzP%2FZjP%2FmTP%2FzDP%2F%2F2YAAGYAM2YAZmYAmWYAzGYA%2F2YzAGYzM2YzZmYzmWYzzGYz%2F2ZmAGZmM2ZmZmZmmWZmzGZm%2F2aZAGaZM2aZZmaZmWaZzGaZ%2F2bMAGbMM2bMZmbMmWbMzGbM%2F2b%2FAGb%2FM2b%2FZmb%2FmWb%2FzGb%2F%2F5kAAJkAM5kAZpkAmZkAzJkA%2F5kzAJkzM5kzZpkzmZkzzJkz%2F5lmAJlmM5lmZplmmZlmzJlm%2F5mZAJmZM5mZZpmZmZmZzJmZ%2F5nMAJnMM5nMZpnMmZnMzJnM%2F5n%2FAJn%2FM5n%2FZpn%2FmZn%2FzJn%2F%2F8wAAMwAM8wAZswAmcwAzMwA%2F8wzAMwzM8wzZswzmcwzzMwz%2F8xmAMxmM8xmZsxmmcxmzMxm%2F8yZAMyZM8yZZsyZmcyZzMyZ%2F8zMAMzMM8zMZszMmczMzMzM%2F8z%2FAMz%2FM8z%2FZsz%2Fmcz%2FzMz%2F%2F%2F8AAP8AM%2F8AZv8Amf8AzP8A%2F%2F8zAP8zM%2F8zZv8zmf8zzP8z%2F%2F9mAP9mM%2F9mZv9mmf9mzP9m%2F%2F%2BZAP%2BZM%2F%2BZZv%2BZmf%2BZzP%2BZ%2F%2F%2FMAP%2FMM%2F%2FMZv%2FMmf%2FMzP%2FM%2F%2F%2F%2FAP%2F%2FM%2F%2F%2FZv%2F%2Fmf%2F%2FzP%2F%2F%2FyH5BAEAABAALAAAAAAJABcAAAhOAP8JHEgwlZ9U%2Fwwi%2FOenIMGGAiEOhLgwoUSJBDMaFKgwIsOPAzdanPgRI8KTBzOqBHnSY8ODFFN2LEkzoc2WKwtSS7UzI7WfKyvmFBgQADs%3D"'
        + ' style="border: 0; margin: 0 0 0 2px; padding: 0; vertical-align: middle"'
        + ' alt="Stream MP3" />';
      mp3_links[i].parentNode.insertBefore(m3u_link, mp3_links[i]);
      mp3_links[i].parentNode.insertBefore(mp3_links[i], m3u_link);
  }
}

)();
