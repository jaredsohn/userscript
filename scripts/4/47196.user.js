// ==UserScript==
// @name           Quick Search
// @namespace      BXT
// @description    Select text and a menu pops up so that you can search for the phrase on various search engines
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.1/jquery.min.js
// ==/UserScript==

$(document).ready(function() {
	var BXT_open=true;
	
	function getTwthisLink(text){
	text='"'+text+'"';
	var linkArr=document.getElementsByTagName('link');
	var a=false;
	var u='';
	for(var i=0;i<linkArr.length&&!a;i++){
		var l=linkArr[i];
		for(var x=0;x<l.attributes.length;x++){
			if(l.attributes[x].nodeName.toLowerCase()=='rel'){
				p=l.attributes[x].nodeValue.split(' ');
				for (y=0;y<p.length;y++){
					if(p[y]=='short_url'||p[y]=='shortlink') a=true;
				}
			}
		}
		if(a)u=l.href;
	}
	if(a){
		l='http://twitter.com/home/?status='+encodeURIComponent(text+' '+u);
	}
	else{
		l='http://bernhardhaeussner.de/tools/tweetthis.php?link='+encodeURIComponent(window.location.href)+'&title='+encodeURIComponent(text);
	}
	return l;
}
	function BXT_callmenu(e) {
		var s=window.getSelection();
		if (!BXT_open) {
			window.setTimeout(function(){
				$("#BXT_searchselector").remove(); 
				BXT_open=true;
			},100)
		}
		if (s&&BXT_open&&s!='') {
			//alert(s);
			sE=encodeURIComponent(s);
			$("<div id=\"BXT_searchselector\"><a href=\"http://www.google.de/search?q="+sE+"\"><img src=\"http://www.google.de/favicon.ico\" border=0> google</a><br/><a href=\"http://de.wikipedia.org/w/wiki.phtml?search="+sE+"\"><img src=\"http://de.wikipedia.org/favicon.ico\" border=0> wiki</a><br/><a href=\"http://dict.leo.org/ende?search="+sE+"\"><img src=\"http://dict.leo.org/favicon.ico\" border=0> leo</a><br/><a href=\"http://maps.google.de/maps?q="+sE+"\"><img src=\"http://www.google.de/favicon.ico\" border=0> map</a><br/><a href=\"http://search.twitter.com/search?q="+sE+"\"><img src=\"http://search.twitter.com/favicon.ico\" border=0> twitter</a><br/><a href=\""+getTwthisLink(s)+"\"><img src=\"http://search.twitter.com/favicon.ico\" border=0> tweet!</a><br/><a href=\""+s+"\">- URL</a><br/></div>").css(
				{
				'background-color':'rgba(0,0,0,0.7)',
				'position':'absolute',
				'z-index':'99999',
				'top':(e.pageY+10)+'px',
				'left':(e.pageX+10)+'px',
				'padding':'20px',
				'border':'1px #fff solid'
				}
			).appendTo("body");
			$("#BXT_searchselector a").css(
				{
				'font-size':'15px',
				'color':'#fff',
				'text-decoration':'none',
				'boder':'0',
				'border-bottom':'1px #999999 solid',
				'padding':'0',
				'margin':'0'
				}
			);
			BXT_open=false;
		}
	}
	//window.onmouseup=callmenu;
	window.addEventListener('mouseup',BXT_callmenu, true);
});

