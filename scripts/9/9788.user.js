
// ==UserScript==
// @name           kentucky mash
// @namespace      banninations/fark mashup
// @include       *fark.com/cgi/fark*
// ==/UserScript==

function oh_fark()
{
    var ofark= Math.floor(Math.random()*99);
    return ofark;
}
var spanArray = document.getElementsByTagName('td');
var i=0;var j=10;var k=0;var idnum=1;var b=spanArray.length/4;
var urlink="&nbsp;<img src=http://webmonkees.com/fimg/f";
for (i = 0; i < b; i++){k=j+3;idnum=oh_fark();
//spanArray[j].innerHTML;
spanArray[j].innerHTML=spanArray[j].innerHTML+urlink+idnum+".png width=58 height=18 alt=| "+idnum+"| title=("+idnum+")>"; k=j+1;
//if you  don't want a middle image, comment the next line. otherwise, don't. 
if (idnum != 0){spanArray[k].innerHTML=spanArray[k].innerHTML+urlink+"m"+idnum+".png width=180 height=18 id= ("+idnum+") title="+idnum+">";}
k=j+2;
spanArray[k].innerHTML=spanArray[k].innerHTML+"&nbsp;|<a href=http://webmonkees.com/baNNers/multi.php#"+idnum+" target=_blank>&#164;</a>";
j=j+4;}