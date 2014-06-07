// ==UserScript==
// @name           sdfqfs
// @namespace 	   Ikaria
// @include        http://*.ikariam.*/*
// ==/UserScript==
// ===========================================================================


// ---- (CSS) ----

if(location.toString().search("tradeAdvisor")!=-1)
{
loc=location.toString();
var maReg2 = new RegExp("offset=([0-9]*)&", "i");
if(maReg2.test(location.toString()))
{
idebut=maReg2.exec(location.toString());
idebut2=parseInt(idebut[1])+10;
}
else
{
idebut2=10;
}
max=10*2+parseInt(idebut2);

for(i=parseInt(idebut2);i<=max;i=i+10)
{
sdfsdqf=i;
url=loc+"&offset="+i;
GM_xmlhttpRequest({ method: "GET", url: url, onload: function(response) {  urlretour=response.responseText;
var maReg = new RegExp("<tbody>((.|\n|\r)*)<\/tbody>", "i");
urlretour=maReg.exec(response.responseText);
urlretour2=urlretour[1];
if(sdfsdqf!=max){urlretour2=urlretour2.replace('class="paginator"',"style='visibility:hidden'");}
document.getElementsByTagName('tbody')[0].innerHTML+=urlretour2;
}
});
}
}