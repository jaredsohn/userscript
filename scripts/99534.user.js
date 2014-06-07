// ==UserScript==
// @name           Tyler Remover
// @namespace      http://www.tylersucks.com
// @description    Removes Tyler from BYOB, making it bearable to read
// @include        http://forums.somethingawful.com/*
// ==/UserScript==

var allT = document.getElementsByTagName("table");
var allTR = document.getElementsByTagName("tr");
var allA = document.getElementsByTagName("td");
for (var i = 0; i < allT.length; i++) {

	if(allT[i].innerHTML.match(/userinfo userid-173901/) )
{
allT[i].style.display = 'none'
}

	if(allT[i].innerHTML.match(/userinfo userid-166847/) )
{
allT[i].style.display = 'none'
}
	

if(allT[i].innerHTML.match(/My First Theodicy posted:/) )
{
allT[i].style.display = 'none'
}


if(allT[i].innerHTML.match(/A Soothing Lacuna posted:/) )
{
allT[i].style.display = 'none'
}

}

for (var i = 0; i < allTR.length; i++) {

if(allTR[i].innerHTML.match(/userid=173901/))

{
allTR[i].style.display = 'none'
}

if(allTR[i].innerHTML.match(/userid=166847/))

{
allTR[i].style.display = 'none'
}







}

var words={
'My First Theodicy':'Nobody',
'A Soothing Lacuna':'Nobody'

}
var regs=[];
for(arg in words){regs[regs.length]=new RegExp(arg,'g')}

function replaceText(){
var tags=document.getElementsByTagName('body')[0].getElementsByTagName('*');
var i=0,t;
	while(t=tags[i++]){
		if(t.childNodes[0]){
			var j=0, c;
			while(c=t.childNodes[j++]){
				if(c.nodeType==3){
					var k=0;
					for(arg in words){
						c.nodeValue=c.nodeValue.replace(regs[k],words[arg]);
						k++;
					}
				}
			}
		}
	}
}

replaceText()


