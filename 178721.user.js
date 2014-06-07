// ==UserScript==
// @name        TornCity AttackLog Navigation
// @namespace   http://localhost
// @include     http://www.torn.com/attacklogs.php*
// @require     http://pblg1.zzl.org/hlib.js
// @version     1.0
// ==/UserScript==

var current_id = window.location.toString().slice(38);
var domain = "http:\/\/www.torn.com/attacklogs.php?ID=";

var id = parseInt(current_id);

pushTo('div','logNav','#announceWrapper');
pushTo('div','next','#logNav');
pushTo('div','previous','#logNav');
sel('#next').style.width="70px";
sel('#previous').style.width="100px";

typeTo('#next','<a id="nextButton">&nbsp;&nbsp;<strong>NEXT LOG&nbsp;&nbsp;</a>');
typeTo('#previous','<a id="previousButton">&nbsp;&nbsp;<strong>PREVIOUS LOG&nbsp;&nbsp;</a>');

move('#next','absolute',1100,80);
move('#previous','absolute',300,80);

sel('#nextButton').onclick = function(){
var next_link = domain+(id+=1);
window.location=next_link;
}

sel('#previousButton').onclick = function(){
var prev_link = domain+(id-=1);
window.location=prev_link;
}

injectCss('#next,#previous {border:3px solid #343434;cursor:pointer;} a#nextButton,#previousButton{text-decoration:none; outline:none;}');