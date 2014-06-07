// ==UserScript==
// @name           Dumpert embedder
// @namespace      random.Emd4l2ALIXp6oLQ31ZSw
// @description    Zorgt ervoor dat je filmpjes van Dumpert.nl kan embedden
// @include        http://dumpert.nl/mediabase/*
// @include        http://www.dumpert.nl/mediabase/*
// @version        0.1.337 alpha
// @comment        Everything should work, but I personally dislike the use of an external flash player. Everything works fine however. Maybe if I get bored some later time I'll fix that.
// ==/UserScript==

function DumpertEmbed()
{
  
  var embedCode = document.body.getElementsByTagName("noscript")[0].innerHTML;
  if (typeof embedCode != "undefined")
  {
	
	var videoURL = embedCode.match(/file\=(.*?)\&/gi)[0].replace("file=","").replace("&","");
	// using a different flash video player than the one on Dumpert.nl, I couldn't get it to work easily (didn't load at all) so this is a quick'n'dirty solution
	// apologies for stealing bandwidth from gdd.ro *blush*
	embedCode = '<embed src="http://www.gdd.ro/gdd/flvplayer/gddflvplayer.swf" flashvars="&amp;autoplay=false&amp;sound=70&amp;buffer=2&amp;vdo='+escape(videoURL)+'" allowfullscreen="true" quality="best" wmode="transparent" allowscriptaccess="always" pluginspage="http://www.macromedia.com/go/getflashplayer" type="application/x-shockwave-flash" width="660" height="480">';
	
	var itemInfo = document.getElementById("iteminfo");
	itemInfo.innerHTML = itemInfo.innerHTML.replace('<h2 class="link">Link</h2>',"<h2 class=\"link\">Embed</h2>\n<input value='"+embedCode+"' type=\"text\" onclick=\"this.focus();this.select();\"><br>\n<h2 class=\"link\">Link</h2>");
	
  }
  
}

DumpertEmbed();