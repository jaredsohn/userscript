// ==UserScript==
// @name           Reported Post Notifier
// @namespace      GLB
// @include        http://goallineblitz.com/game/*
// ==/UserScript==

function getElementsByClassName(classname, par){
  var a=[];   
  var re = new RegExp('\\b' + classname + '\\b');      
  var els = par.getElementsByTagName("*"); 
  for(var i=0,j=els.length; i<j; i++){       
    if(re.test(els[i].className)){  
      a.push(els[i]);
    }
  }
  return a;
};

function findName(test) {
    if (test.indexOf('alternating_color1', 0)>=0) return 1;
  return 0;
}

var url = 'http://goallineblitz.com/game/forum_reported_posts.pl'

GM_xmlhttpRequest({
method: 'GET',
url: url,
headers: {
'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
'Accept': 'application/atom+xml,application/xml,text/xml',
},
onload: function(boosts) {
var response1=boosts.responseText;
if (findName(response1)){
	var modbar = getElementsByClassName("subhead_link_bar", document)[0];
	var unsticky_button = document.createElement('div');
	unsticky_button.setAttribute('class', 'tab_on');
	unsticky_button.innerHTML = '<a href="http://goallineblitz.com/game/forum_reported_posts.pl">Reports</a>';
	modbar.appendChild(unsticky_button)
}
}
});