// ==UserScript==
// @name       Nxtgn Search Engine
// @namespace  Search by Digto
// @version    1.2.7
// @description  Søgning på nxtgn blev lige lidt bedre.
// @include     http://nxtgn.org/forums.php?action=search*
// @include     https://nxtgn.org/forums.php?action=search*
// @match      http://nxtgn.org/forums.php?action=search*
// @match      https://nxtgn.org/forums.php?action=search*
// @copyright  2013+, Digto
// ==/UserScript==
function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
    });
    return vars;
}
var type=getUrlVars()["type"];
var sektion=getUrlVars()["sektion"];
var soeg=getUrlVars()["soeg"];
var key="854fee41a4d8a2e9da89eafdbaa5e0b2";
if (sektion==undefined) { sektion="alle"; }
if (soeg==undefined) { soeg=""; }
var url='https://iapetus.feralhosting.com/digtokiller/project_horus/magic_new.php?key='+key+'&pick='+type+'&forum='+sektion+'&string='+soeg;
document.getElementById("search_form").innerHTML='<iframe id="soeg" name="soegenavn" src="'+url+'" frameborder="0" scrolling="auto" style="width:950px; min-height:600px"><p>Your browser does not support iframes.</p></iframe>';