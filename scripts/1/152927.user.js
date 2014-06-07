// ==UserScript==
// @name        自动评教
// @namespace   http://userscripts.org/users/tumuyan
// @include     *jwgl.*.edu.cn/*
// @version     2
// ==/UserScript==

var text=document.getElementsByTagName("textarea")

for (var i=text.length-1;i>-1;i--)

{

text[i].innerHTML='无'

}


var radio=document.getElementsByTagName('input')
for (var i=radio.length-1;i>-1;i--)

{
if (radio[i].type=='radio' && radio[i].value==95)
radio[i].click()
else if (radio[i].type=='radio' && radio[i].value=="10.00")
radio[i].click()
}
