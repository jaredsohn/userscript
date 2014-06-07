// ==UserScript==
// @name 	      	Yahoo! Answers Decloaker
// @namespace 		http://userscripts.org/users/107071
// @author 	      	LarryDKB
// @description       	Shows hidden questions and answers.
//	     	      	-Based on the following
//	     	      	-http://userscripts.org/scripts/show/50445 by itsjareds.
//	     	      	-http://userscripts.org/scripts/show/13149 by pw.
// @version 		0.9.4
// @include 		http://*answers.yahoo.com/my/profile*
// ==/UserScript==

function gup( name )
{
  name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
  var regexS = "[\\?&]"+name+"=([^&#]*)";
  var regex = new RegExp( regexS );
  var results = regex.exec( window.location.href );
  if( results == null )
    return "";
  else
    return results[1];
}

var url = window.location.href;
var url_root1 = "http://answers.yahooapis.com/AnswersService/V1/getByUser?appid=YahooDemo&output=rss&results=50&user_id=";
var url_root2 = "http://answers.yahooapis.com/AnswersService/V1/getByUser?appid=YahooDemo&output=rss&results=50&filter=answer&user_id=";
var user_id = gup( 'show' );
var url_stem = user_id;
new_url1 = url_root1 + url_stem;
new_url2 = url_root2 + url_stem;

if(document.getElementById('ks-user-profile-list'))
  {
    var seeQa = document.getElementById("ks-user-profile-list");
  }
  else
  {
    var seeQa = document.getElementById("middle");
  }

var div = document.createElement("div");
seeQa.appendChild(div);
var codeBtn1 = document.createElement("input");
codeBtn1.type = "button";
codeBtn1.value = "Questions";
codeBtn1.className = "button";
codeBtn1.style.marginRight = "5px";
div.appendChild(codeBtn1);

var codeBtn2 = document.createElement("input");
codeBtn2.type = "button";
codeBtn2.value = "Answers";
codeBtn2.className = "button";
div.appendChild(codeBtn2);

codeBtn1.addEventListener("click", function() {
	window.location.href = new_url1;
}, false);

codeBtn2.addEventListener("click", function() {
	window.location.href = new_url2;
}, false);