// ==UserScript==
// @name          Bash.org AJAX voting
// @namespace     http://danvsdan.com
// @description   Submits your vote, removes +/-/X links and updates the vote count.
// @include       http://*bash.org/?*
// ==/UserScript==

function submit_vote(vote) {
  return function(evt) {
    evt.preventDefault();

    update_vote(vote);

    GM_xmlhttpRequest({
      method:  'GET',
      url:     vote.href,
      headers: {
        'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
      },
    });
  };
}

function update_vote(vote) {
  var root = vote.parentNode;
  root.removeChild(root.childNodes[2]);
  root.removeChild(root.childNodes[3]);
  root.removeChild(root.childNodes[4]);

  var votecnt = root.childNodes[2];
  var num     = parseInt(votecnt.nodeValue.match(/([\d-]+)/));
  var newnum  = vote.href.match(/&rox/) ? num + 1 : num - 1;
  var newcnt  = document.createTextNode('('+newnum+')');
  root.replaceChild(newcnt, votecnt);
}

var links = document.getElementsByTagName('a');

for(var i = 0; i < links.length; i++) {
  var vote = links[i];
  if(!vote.href.match(/&[sr]ox/))
    continue;

  vote.addEventListener('click', submit_vote(vote), true); 
}

/*
Copyright (c) 2007, Dan Brook. All Rights Reserved. This userscript is free software. It may be used, redistributed and/or modified under the same terms as Perl.
*/