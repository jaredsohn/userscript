// ==UserScript==
// @name           Smilies in Orkut! 
// @namespace      Yahoo! Smilie
// @description    JuST 4 U
// @include        http://www.orkut.com/Scrapbook.aspx*
// ==/UserScript==



addEventListener('load', function(event) {
function getTextArea(n) {
	return document.getElementsByTagName('textarea')[n];
}


function insertSmiley(){
	var image = this.getElementsByTagName('img')[0].getAttribute("src");
	getTextArea(this.getAttribute("gult")).focus();
	getTextArea(this.getAttribute("gult")).value += "<img src="+image+">";
}

function dip() {
	var smileyarr = new Array();	
	smileyarr["smile"]="http://i242.photobucket.com/albums/ff6/yahoo-emotions/1.gif";
	smileyarr["sad"]="http://i242.photobucket.com/albums/ff6/yahoo-emotions/2.gif";
	smileyarr["angry"]="http://i242.photobucket.com/albums/ff6/yahoo-emotions/14.gif";
	smileyarr["bsmile"]="http://i242.photobucket.com/albums/ff6/yahoo-emotions/4.gif";
	smileyarr["funny"]="http://i242.photobucket.com/albums/ff6/yahoo-emotions/10.gif";
	smileyarr["surprise"]="http://i242.photobucket.com/albums/ff6/yahoo-emotions/13.gif";
	smileyarr["wink"]="http://i242.photobucket.com/albums/ff6/yahoo-emotions/3.gif";
	smileyarr["cool"]="http://i242.photobucket.com/albums/ff6/yahoo-emotions/16.gif";
	smileyarr["confuse"]="http://i242.photobucket.com/albums/ff6/yahoo-emotions/7.gif";
	smileyarr["hug"]="http://i242.photobucket.com/albums/ff6/yahoo-emotions/6.gif";
	smileyarr["heart"]="http://i242.photobucket.com/albums/ff6/yahoo-emotions/8.gif";
	smileyarr["kiss"]="http://i242.photobucket.com/albums/ff6/yahoo-emotions/11.gif";
	smileyarr["laugh"]="http://i242.photobucket.com/albums/ff6/yahoo-emotions/21.gif";
	smileyarr["drool"]="http://i242.photobucket.com/albums/ff6/yahoo-emotions/38.gif";
	smileyarr["doubt"]="http://i242.photobucket.com/albums/ff6/yahoo-emotions/23.gif";
	smileyarr["blush"]="http://i242.photobucket.com/albums/ff6/yahoo-emotions/9.gif";
	smileyarr["devil"]="http://i242.photobucket.com/albums/ff6/yahoo-emotions/19.gif";
	smileyarr["angel"]="http://i242.photobucket.com/albums/ff6/yahoo-emotions/25.gif";
	smileyarr["roll"]="http://i242.photobucket.com/albums/ff6/yahoo-emotions/24.gif";
	smileyarr["sleep"]="http://i242.photobucket.com/albums/ff6/yahoo-emotions/28.gif";
	smileyarr["notalk"]="http://i242.photobucket.com/albums/ff6/yahoo-emotions/33.gif";
	smileyarr["worried"]="http://i242.photobucket.com/albums/ff6/yahoo-emotions/17.gif";
	smileyarr["wait"]="http://i242.photobucket.com/albums/ff6/yahoo-emotions/45.gif";
	smileyarr["applause"]="http://i242.photobucket.com/albums/ff6/yahoo-emotions/41.gif";
	smileyarr["straight"]="http://i242.photobucket.com/albums/ff6/yahoo-emotions/22.gif";
	smileyarr["silly"]="http://i242.photobucket.com/albums/ff6/yahoo-emotions/35.gif";
	smileyarr["smug"]="http://i242.photobucket.com/albums/ff6/yahoo-emotions/15.gif";
	smileyarr["sick"]="http://i242.photobucket.com/albums/ff6/yahoo-emotions/31.gif";
	smileyarr["party"]="http://i242.photobucket.com/albums/ff6/yahoo-emotions/36.gif";
	smileyarr["dream"]="http://i242.photobucket.com/albums/ff6/yahoo-emotions/105.gif";
	smileyarr["irritated"]="http://i242.photobucket.com/albums/ff6/yahoo-emotions/102.gif";
	smileyarr["eyelash"]="http://i242.photobucket.com/albums/ff6/yahoo-emotions/104.gif";
	smileyarr["whew"]="http://i242.photobucket.com/albums/ff6/yahoo-emotions/18.gif";
	smileyarr["nerd"]="http://i242.photobucket.com/albums/ff6/yahoo-emotions/26.gif";
	smileyarr["phbbt"]="http://i242.photobucket.com/albums/ff6/yahoo-emotions/47.gif";
	smileyarr["hypno"]="http://i242.photobucket.com/albums/ff6/yahoo-emotions/43.gif";
	smileyarr["yawn"]="http://i242.photobucket.com/albums/ff6/yahoo-emotions/37.gif";
	smileyarr["sigh"]="http://i242.photobucket.com/albums/ff6/yahoo-emotions/46.gif";
	smileyarr["clown"]="http://i242.photobucket.com/albums/ff6/yahoo-emotions/34.gif";
	smileyarr["bye"]="http://i242.photobucket.com/albums/ff6/yahoo-emotions/103.gif";
	smileyarr["bringiton"]="http://i242.photobucket.com/albums/ff6/yahoo-emotions/70.gif";
	smileyarr["peace"]="http://i242.photobucket.com/albums/ff6/yahoo-emotions/67.gif";
	smileyarr["dancing"]="http://i242.photobucket.com/albums/ff6/yahoo-emotions/69.gif";
	smileyarr["worthy"]="http://i242.photobucket.com/albums/ff6/yahoo-emotions/77.gif";
	smileyarr["money"]="http://i242.photobucket.com/albums/ff6/yahoo-emotions/64.gif";
	smileyarr["pray"]="http://i242.photobucket.com/albums/ff6/yahoo-emotions/63.gif";
	smileyarr["chatter"]="http://i242.photobucket.com/albums/ff6/yahoo-emotions/76.gif";
	smileyarr["whistle"]="http://i242.photobucket.com/albums/ff6/yahoo-emotions/65.gif";
	smileyarr["puppy"]="http://i242.photobucket.com/albums/ff6/yahoo-emotions/108.gif";
	smileyarr["pig"]="http://i242.photobucket.com/albums/ff6/yahoo-emotions/49.gif";
	smileyarr["cow"]="http://i242.photobucket.com/albums/ff6/yahoo-emotions/50.gif";
	smileyarr["monkey"]="http://i242.photobucket.com/albums/ff6/yahoo-emotions/51.gif";
	smileyarr["chick"]="http://i242.photobucket.com/albums/ff6/yahoo-emotions/52.gif";
	smileyarr["rose"]="http://i242.photobucket.com/albums/ff6/yahoo-emotions/53.gif";
	smileyarr["cafe"]="http://i242.photobucket.com/albums/ff6/yahoo-emotions/57.gif";
	smileyarr["skull"]="http://i242.photobucket.com/albums/ff6/yahoo-emotions/59.gif";
	smileyarr["star"]="http://i242.photobucket.com/albums/ff6/yahoo-emotions/79.gif";
	smileyarr["ying"]="http://i242.photobucket.com/albums/ff6/yahoo-emotions/75.gif";
	smileyarr["boy"]="http://i242.photobucket.com/albums/ff6/yahoo-emotions/72.gif";
	smileyarr["girl"]="http://i242.photobucket.com/albums/ff6/yahoo-emotions/74.gif";
	
	var tb = document.getElementsByTagName('textarea');
	for(i=0;i<tb.length;i++){
		text=tb[i];
		if (!text) return;
		c=text.parentNode;
		d=document.createElement("div");
		d.className="T";
		d.style.fontSize="11px";
		d.align="left";
		
	        
	    d.style.marginTop="10px";
		c.appendChild(d);
		
		for(title in smileyarr){
			mm=document.createElement("a");
			mm.href="javascript:;";
			mm.setAttribute("gult",i);
			mm.innerHTML="<img src='"+smileyarr[title]+"' title='"+title+"'>";
			mm.addEventListener("click", insertSmiley, true);
			d.appendChild(mm);
		}
	}	
}
dip();
}, false);
