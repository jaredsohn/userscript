// ==UserScript==
// @name           ThePirateBay Enhancer
// @description    Show torrent age, spelling suggestions, SEED to PEER ratio, and number of comments. Kill dead torrents as well!
// @namespace      #avg
// @include        http://*thepiratebay.org/search/*
// @include        http://*thepiratebay.org/top*
// @include        http://*thepiratebay.org/music*
// @include        http://*thepiratebay.org/tv*
// @include        http://*thepiratebay.org/browse*
// @include        http://*thepiratebay.org/recent*
// @version        0.1.8
// ==/UserScript==
var $=function(x){return document.getElementById(x)},
    single=function(x,y){return document.evaluate(x,y||document,null,9,null).singleNodeValue},
    cR=function(x){return document.createElement(x)},
    round2=function(x) {return x==Infinity ? 0 : Math.round(100*x)/100},
    remove=function(a) {if(a)a.parentNode.removeChild(a)},
    treatDate=function(x) {
	x=x.replace(/\s+/g," ");
	if (/mins ago/.test(x))
		return (new Date()-parseInt(/\d+/.exec(x)[0])*60000)
	if (/Today/.test(x))
		return new Date().toDateString()+" "+/\S+$/.exec(x)[0];
	if (/Y-day/.test(x))
		return new Date(new Date()-86400000).toDateString()+" "+/\S+$/.exec(x)[0];
	switch(x.length) {
		case 10: return x.replace("-",",");
		case 11: return x.replace(/-/g,",").replace(" "," " +new Date().getFullYear()+" ");
	}
	return "December 20, 1991";
},
    getDays=function(x) {
       return round2((new Date()*1-new Date(treatDate(x))*1) / 86400000)
    };
    
// cleanup
remove(single("//div[@align='center' and @style]"));

// spellchecker
if (/\/search\//.test(document.URL)) {
	var h=single("//h2");
	h.innerHTML=h.innerHTML.replace(/\..+/,".");
	var query=unescape(/\/search\/([^\/]+)/.exec(location.pathname)[1]).replace(/\s+/g,"+");
	GM_xmlhttpRequest({
		method: "GET",
		url:"http://www.google.com/search?complete=1&q="+query+"&num=1",
		onload: function(a){
			correct=/<a href="\/search.+?<\/a>/.exec(a.responseText)[0].replace(/<\/?.+?>/g,"");
			if(correct!=="Similar pages" && correct !=="More details")
				single("/html/body/h2").innerHTML+=" <strong style=\"font-size:20px\">Did you mean to search for <a href=\""+location.pathname.replace(/\/search\/[^\/]+/,"/search/"+correct)+"\">"+correct+"</a></strong>?";
		}
	});
}


// table helper
if(!single("//*[contains(text(),'No hits.')]"))
{
  var torrTable=$("searchResult"),
      torrents=document.evaluate("./tbody//tr",torrTable,null,6,null),
      l=torrents.snapshotLength,
      i=0;

while(tr=torrents.snapshotItem(i++)) {
	var tl=tr.cells.length, z=tr.insertCell(tl), c=tr.cells[tl-4], d=tr.cells[tl-5], comment=single(".//img[contains(@src,'comment')]",c);
	d.textContent=getDays(d.textContent);
	if (comment)
		c.replaceChild(document.createTextNode(/\d+/.exec(comment.title)[0]), comment);
	z.innerHTML=round2((parseInt(tr.cells[tl-2].textContent)/parseInt(tr.cells[tl-1].textContent)));
}

var ratio=cR("th"),
    descrip=cR("abbr");

descrip.title="Seeds to Peers Ratio";
descrip.innerHTML="RT";

ratio.appendChild(descrip);

$("tableHead").firstChild.appendChild(ratio);
single("//thead//th[4]",torrTable).innerHTML="Comments";
single("//thead//th[3]/a",torrTable).innerHTML="Age (days)";


}

GM_registerMenuCommand("kill dead torrents",function() {
	var torrTable=$('searchResult'),
		torrents=document.evaluate("//tbody//tr",torrTable,null,6,null),
		i=torrents.snapshotLength,
		alt=false;
	while(tr=torrents.snapshotItem(--i)) {
		if (tr.cells[tr.cells.length-1].innerHTML=="0") {
			tr.parentNode.removeChild(tr);
			continue;
		}
		tr.className=alt ? "alt" : "";
		alt = !alt;
	}
});