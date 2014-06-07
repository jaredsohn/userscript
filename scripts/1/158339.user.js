// ==UserScript==
// @name        HV修正文字重叠
// @namespace   HVCDE
// @icon         http://g.e-hentai.org/favicon.ico
// @match       http://hentaiverse.org/?s=Bazaar&ss=mm*
// @match       http://hentaiverse.org/?s=Battle&ss=ar
// @version     1.3
// ==/UserScript==

aaa=document.location.href.match(/ss\=ar/)
if(aaa){
	if(document.querySelector("#togpane_log")) return;
	bbb="margin:30px auto 0px; border-collapse:collapse; width:800px"
	document.querySelectorAll("#arena_pane>div>table")[1].setAttribute('style',bbb);

}
aaa=document.location.href.match(/Write/)
if(aaa)
{
	if(document.querySelector("#mailform>#leftpane>div>div>div>.fd2"))	document.querySelector("#mailform>#leftpane>div>div>div>.fd2").style.cssText+='position:absolute; top:0px; left:125px;'
	if(document.querySelector("#leftpane>div>div>#leftpane>.fd2"))document.querySelector("#leftpane>div>div>#leftpane>.fd2").style.cssText+='position:absolute; top:0px; left:125px;'
}
aaa=document.location.href.match(/Inbox|Sent/)
if(aaa)
	{
if(document.querySelector("#mailform>#leftpane>div>div>div>.fd2"))	document.querySelector("#mailform>#leftpane>div>div>div>.fd2").style.cssText+='position:absolute; top:0px; left:125px;'
if(document.querySelector("#mailform>div>div>div>.fd2"))document.querySelector("#mailform>div>div>div>.fd2").style.cssText+='position:absolute; top:0px; left:125px;'
}
aaa=document.location.href.match(/ss\=mm/)
if(aaa)
{
	if(document.querySelector("#mailform>#leftpane>div>div>div>.fd2"))	document.querySelector("#mailform>#leftpane>div>div>div>.fd2").style.cssText+='position:absolute; top:0px; left:125px;'
	if(document.querySelector("#leftpane>div>div>#leftpane>.fd2"))document.querySelector("#leftpane>div>div>#leftpane>.fd2").style.cssText+='position:absolute; top:0px; left:125px;'
}
