// ==UserScript==
// @name           Gladiatus Health
// @namespace      n\a
// @include        *.gladiatus.*
// ==/UserScript==

var leben = 0;
var start = window.location.href.substring(0,window.location.href.indexOf('mod='))+'mod=overview&sh=';
var end = window.location.href.substring(window.location.href.indexOf('sh=')+3,window.location.href.length);
ajax2(start+end,0);

function getStats(code, id, num, stat)
{
	var ex = ".//span[@id='"+id+"']";
	tag = document.evaluate( 
  	ex,
    	code,
    	null,
    	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    	null);

	if (tag.snapshotLength) 
	{ 
  	return(tag.snapshotItem(0).innerHTML)
  	}
}

function ajax2(url, num)
{
  GM_xmlhttpRequest({
    method: "GET",
    url: url,
    onload: function(responseDetails) 
    {
	pulled = document.createElement('div');
    	pulled.innerHTML = responseDetails.responseText; 
    	leben = getStats(pulled, 'char_leben');

prnt(leben)
    }
});

}
function prnt(prt)
{
var ert1 = document.body.innerHTML.substring(document.body.innerHTML.indexOf('<div><span class="charvaluesPre">'),document.body.innerHTML.length);
var ert2 = ert1;
ert1 = ert1.substring(33,ert1.indexOf(':</span><span class="charvaluesSub">'));
ert2 = ert2.substring(ert2.indexOf(':</span><span class="charvaluesSub">')+36,ert2.indexOf('</span></div>'));

var ert3 = document.body.innerHTML.substring(document.body.innerHTML.indexOf('><div><span class="charvaluesPre">'),document.body.innerHTML.length);
var ert4 = ert3;
ert3 = ert3.substring(34,ert3.indexOf(':</span><span class="charvaluesSub">'));
ert4 = ert4.substring(ert4.indexOf(':</span><span class="charvaluesSub">')+36,ert4.indexOf('</span></div></div>'));

var xx1 = document.body.innerHTML.substring(0,document.body.innerHTML.indexOf('<div class="headerHighscore">'));
var xx2 = document.body.innerHTML.substring(document.body.innerHTML.indexOf('<div class="headerHonor">'),document.body.innerHTML.length);
var xx3 = '<div class="headerHighscore">';
	xx3 += '<div style="margin-top:-4px;"><div><span class="charvaluesPre">'+ert1+':</span><span class="charvaluesSub">'+ert2+'</span></div>';
	xx3 += '<div><span class="charvaluesPre">'+ert3+':</span><span class="charvaluesSub">'+ert4+'</span></div>';
	xx3 += '<div><span class="charvaluesPre">Life:</span><span class="charvaluesSub">'+prt+'</span></div>';
	xx3 += '</div></div>'

var xx4 = document.body.innerHTML.substring(document.body.innerHTML.indexOf('<div class="headerHonor">'),document.body.innerHTML.indexOf('<div id="main">'));
	var xx5 = document.body.innerHTML.substring(document.body.innerHTML.indexOf('<div class="headerDiv1">'),document.body.innerHTML.indexOf('<div class="headerHighscore">'));
	var nn = document.getElementById('charvalues'); 
	nn.innerHTML = xx5+xx3+xx4;

}

function doSomethingWithClasses(theClass) {
a = 0;
x = new Array();
var allPageTags=document.getElementsByTagName("div");
for (i=0; i<allPageTags.length; i++) {
if (allPageTags[i].className==theClass) {

x[a] = allPageTags[i];
a++;
}
}
return x;
}