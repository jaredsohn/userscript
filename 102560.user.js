// ==UserScript==
// @name           ThisBadToken
// @namespace      ThisBadToken
// @author 	   bluekirby
// @description    Makes it easy to give other users bad tokens whenever 

you see "blank this bad token"
// @include        *endoftheinter.net*
// ==/UserScript==
//<img 

src="http://i3.endoftheinter.net/i/n/2fc26365ed4a4b0c715485c85ce524db/Bad 

Rhino.jpg" />

var regEx = /\d+/i;
var btRegEx = /this bad token/ig;
var TCloc = document.getElementsByClassName('message-top')[0];
var TCID = regEx.exec(TCloc.getElementsByTagName('a')[0].href);
var userID = document.getElementsByClassName('userbar')[0];
userID = regEx.exec(userID.getElementsByTagName('a')[0].href);

var msgs = document.getElementsByClassName('message');

for(var i=0; i<msgs.length; i++)
{
var msg=msgs[i];
msg.innerHTML = msg.innerHTML.replace(btRegEx,'<a href=

\'http://endoftheinter.net/token.php?me='+userID+'&type=1&user='+TCID

+'\'>this bad token</a>');
}