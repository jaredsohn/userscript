// ==UserScript==
// @name           Synesthesia
// @namespace      nathanww
// @description    Simulates the experience of having number->color synesthesia
// @include        *
// ==/UserScript==

//document.body.innerHTML

var associations=[["0","maroon"],["1","gray"],["2","cyan"],["3","green"],["4","yellow"],["5","blue"],["6","pink"],["7","violet"],["8","orange"],["9","red"]];
temp=document.body.innerHTML;
buffer=""
engage=true
engage2=true
skipNext=false
for (i=0; i<temp.length; i++) {

grapheme=temp.charAt(i);
found=false;
for (x=0;x<associations.length;x++) {
	if (associations[x][0]==grapheme && skipNext==false && engage==true && engage2 == true) {
		found=true;
		buffer=buffer+"<b><font color=\""+associations[x][1]+"\">"+grapheme+"</font></b>";
		break;
		}
}
if (found==false) {
	buffer=buffer+grapheme;

}
skipNext=false
if (grapheme == "=" || grapheme == "H" || grapheme == "h") {
	skipNext=true;
	}
if (grapheme  == "\"") {
	if (engage==false) {
		engage=true;
	}
	else {
		engage=false;
	}
}
if (grapheme  == "<" || grapheme == ">") {
	if (engage2==false) {
		engage2=true;
	}
	else {
		engage2=false;
	}
}
}
document.body.innerHTML=buffer