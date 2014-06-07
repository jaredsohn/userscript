// ==UserScript==
// @name           Facebook on wipple hill
// @namespace      http://htmlblog.net
// @include        *www.flinthill.org*
// ==/UserScript==

var chat = false;
//         ^^Change this to true to use the chat website instead


var greenSpace = document.getElementById('lOutTblRCell');
var myAddition = document.createElement('iframe');
myAddition.setAttribute('width', '500');
myAddition.setAttribute('height', '900');
if(chat){
var uriItem = 'http://www.facebook.com/presence/popout.php';
}
else{
var uriItem = 'http://touch.facebook.com/#home.php';
}
myAddition.setAttribute('src', uriItem);


greenSpace.appendChild(myAddition)