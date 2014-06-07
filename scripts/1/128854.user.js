// ==UserScript==
// @name test
// @description test
// @author alex tremer
// ==/UserScript==
function del_cookie(name) {
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

del_cookie('p11');
var elem = document.getElementById('ctl10_ctl04_ItemVariants_4');
elem.click();
elem = document.getElementById('ctl10_ctl04_AnswerButton');
elem.click();
setTimeout(function(){del_cookie('p11'); window.location.reload();}, 30000);

