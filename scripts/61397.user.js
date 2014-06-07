// ==UserScript==
// @name           RealGmailNews
// @namespace      sterculius@gmail.com
// @description    get rid of idiotic nonsense from FauxNews and WSJ
// @include        http://news.google.com/*
// ==/UserScript==

(function () {

var newsnips = [
	"free markets, capitalism!  no wait, BAIL US OUT!  put your $$$ in the stock market casino!",
	"blah blah blah Obama is a Muslim, he wants to murder your granny blah blah blah"
];
var objs = [ 
  { re : /wsj.com/, text : "More Lies From Greed Inc." },
  { re : /foxnews.com/, text : "What an Wingnut Idiot Says!" }
];

var replacements = {
	"Fox Business": "Tinfoil Hat Stuff",
	"FOXNews": "Nazi Propaganda",	
	"Fox News": "Teabagging Boys Club",	
	"Wall Street Journal": "Wall St. Hates America"
  };	
  
var regex, key, textnodes, node, s;
regex = {};
for ( key in replacements ) {
  regex[key] = new RegExp(key, 'g');
}
  
var replaceSnip = -1;

stories = document.getElementsByTagName("div");

	for ( var x=0 ; x<stories.length ; x++ ) {
	var thisstory = stories[x];
		if(thisstory.className.indexOf("story")!=0)
			continue;
		subtitles = thisstory.getElementsByTagName("H2");	
		for ( var y=0 ; y<subtitles.length ; y++ ) {
			var thissub = subtitles[y];
			if(thissub.className!="title")
			continue;
			toplink = thissub.getElementsByTagName("a");
			thislink = toplink[0];
			replaceSnip = -1;
			for (var j = 0; j < objs.length; j++) {
				if (thislink.href.match(objs[j].re)) {
				thislink.parentNode.innerHTML = objs[j].text;
				replaceSnip = j;
				}
			}
		}
		if(replaceSnip > -1){
			snips = thisstory.getElementsByTagName("div");
			for ( var z=0 ; z<snips.length ; z++ ) {
			var snip = snips[z];
			if(snip.className!="snippet")
				continue;
			snip.innerHTML = newsnips[replaceSnip];
			}
		}
			

		var links = thisstory.getElementsByTagName("a");
			 
		for (var i = 0; i < links.length; i++) {
		  a = links[i];
		  if (a.href) {
			for (var j = 0; j < objs.length; j++) {
			  if (a.href.match(objs[j].re)) {
				a.innerHTML = objs[j].text;
				a.href = ">";
			  }         
			}
		  }
		}
	}

	textnodes = document.evaluate( "//text()" , document, null , XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE , null );
	for ( var i=0 ; i<textnodes.snapshotLength ; i++ ) {
	  node = textnodes.snapshotItem(i);
	  s = node.data;
	  for ( key in replacements ) {
		s = s.replace( regex[key] , replacements[key] );
	  }
	  node.data = s;
	}
	
})();
