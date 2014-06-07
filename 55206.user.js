// ==UserScript==
// @name           Boost link on player page
// @namespace      GLB
// @include        http://goallineblitz.com/game/player.pl*
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

var userid = window.location.href.split('_id=', 2)
var url = 'http://goallineblitz.com/game/boost_player.pl?player_id=' + userid[1]

GM_xmlhttpRequest({
method: 'GET',
url: url,
headers: {
'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
'Accept': 'application/atom+xml,application/xml,text/xml',
},
onload: function(boosts) {
var response1=boosts.responseText;
var boostcount=response1.split('<td class="level_up_value">');
var boostnumber=boostcount[3].split('</td');
var boostcount=boostnumber[0];
var container = getElementsByClassName('button_long', document);
var button = document.createElement('div');
button.setAttribute('class', 'button_long');
button.innerHTML = '<a href="' + url + '">Boost ('+boostcount+')</a>';
container[0].parentNode.insertBefore(button,container[0]);
var attributes = getElementsByClassName('small_head white', document);
attributes[1].parentNode.removeChild(attributes[1]);

}
});