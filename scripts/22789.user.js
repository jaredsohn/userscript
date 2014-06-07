// ==UserScript==
// @name           german-bash.org AJAX voting
// @namespace      http://d-scribe.de
// @description    Submits your vote, removes +/-/X links and updates the vote count.
// @include        http://german-bash.org/*
// ==/UserScript==
function submit_vote(vote) {
  return function(event) {
    GM_xmlhttpRequest({
      method:  'GET',
      url:     vote.href,
      headers: {
        'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
      },
      onload:  function(responseDetails) {
        var root = vote.parentNode.parentNode;
        var posnode = null;
        var negnode = null;
        var newcnt = null;
        var votecnt = null;
        for(var i=0;i<root.childNodes.length;i++) {
        if(root.childNodes[i].className == "vote_c")
            negnode = root.childNodes[i];
        if(root.childNodes[i].className == "vote_p")
            posnode = root.childNodes[i];    
        if(root.childNodes[i].className == "votes")
        {
            votecnt = root.childNodes[i];
            var num = parseInt(root.childNodes[i].firstChild.text.match(/([\d-]+)/));
            var newnum  = vote.href.match(/vote_type\/pos/) ? num + 1 : num - 1;
            newcnt  = document.createTextNode(newnum);
        }
        }
        root.removeChild(posnode);
        root.removeChild(negnode);
        root.replaceChild(newcnt, votecnt);
      }
    });
    event.preventDefault();
  };
}

var links = document.getElementsByTagName('a');

for(var i = 0; i < links.length; i++) {
  var vote = links[i];
  if(!vote.href.match(/vote_type\/(pos|neg)/))
    continue;

  vote.addEventListener('click', submit_vote(vote), true); 
}

/*
Copyright (c) 2008, Gabriel Birke. All Rights Reserved. This userscript is free software. It may be used, redistributed and/or modified under the same terms as Perl.
This plugin was first for developed for *bash.org* by Dan Brook (http://www.danvsdan.com/)
*/