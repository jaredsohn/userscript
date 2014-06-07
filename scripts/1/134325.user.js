// ==UserScript==
// @name new
// @description new
// @author alex tremer
// ==/UserScript==
/*function del_cookie(name) {
                document.cookie = name +
                '=; expires=Thu, 01-Jan-70 00:00:01 GMT;';
        } 

function wait(msecs)
{
var start = new Date().getTime();
var cur = start
while(cur - start < msecs)
{
cur = new Date().getTime();
}
} 
*/
function createDiv(){
 var height = window.innerHeight -6;
var div = '<div style=\"width: 60px; height: '+height+'px; position:fixed; bottom:3px; left:3px; text-align:center;\" '+
                           'onclick=\"window.scroll(0,0); return false;\"'+
                           'class=\"alexxx_style\">'+
		           'To top'+
                           '</div>';
var css_class = '<style type="text/css">.alexxx_style { z-index: 50;}'+
 '.alexxx_style:hover { z-index: 50;background-color: #e1e7ed; cursor: pointer;}</style>';
 document.getElementsByTagName('head')[0].innerHTML = css_class + document.getElementsByTagName('head')[0].innerHTML;
 document.getElementsByTagName('body')[0].innerHTML = div + document.getElementsByTagName('body')[0].innerHTML;
}

setTimeout(function(){createDiv();}, 2000);
//del_cookie('p11');
//var elem = document.getElementById('ctl10_ctl04_ItemVariants_4');
//elem.click();
//elem = document.getElementById('ctl10_ctl04_AnswerButton');
//elem.click();
//setTimeout(function(){del_cookie('p11'); window.location.reload();}, 30000);