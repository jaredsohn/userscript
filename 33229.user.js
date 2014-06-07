// ==UserScript==
// @name           PMS.visada.lt ajax balsavimas
// @namespace      http://userscripts.org/users/22512
// @description    Spaudziant +/- nekrauna naujo puslapio.
// @include        *pms.visada.lt/*
// ==/UserScript==

function balsuot(vote)
{
  return function(e){
    e.preventDefault();
    update_vote(vote);
    GM_xmlhttpRequest({method:'GET',url:vote.href,headers:{'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey'}});
  };
}

function update_vote(vote) {
  var root = vote.parentNode;

  current_val=parseInt(root.childNodes[6].textContent.match(/\d+/));
  console.log(current_val);
  root.childNodes[6].textContent = vote.href.match(/\=for/) ? current_val + 1 : current_val - 1;
  root.removeChild(root.childNodes[7]);
  root.removeChild(root.childNodes[5]);
}

var links = document.getElementsByTagName('a');

for(var i = 0; i < links.length; i++) 
{
  var vote = links[i];
  if(!vote.href.match("voting"))
    continue;
  vote.addEventListener('click', balsuot(vote), true); 
}
