// ==UserScript==
// @name         WOWAY Hovering thread title statusbar
// @namespace     http://www.weirdalforum.com/
// @description   Modified the hovering statusbar script from http://peterstuifzand.nl/statusbar/ to show the thread title for the WOWAY forum. Also changes the page HTML title to the topic title
// @include       http://www.weirdalforum.com/forum/index.php?showtopic=*
// ==/UserScript==

//I'm looking for the part of the page that has the topic title

  for (var div,i=0,title; div=document.getElementsByTagName("div")[i]; ++i) {
      if (div.className == "postlinksbar") {
		if (div.style.cssText == "float: left;") {
				title = div.textContent; //saving the topic title in the variable I most aptly named "title"
				document.title = title + (" - WOWAY"); // updating the HTML title of the page, SO I CAN KNOW WHERE I AM! This shows up on Firefox tabs.
				}
		  }
      }

//the following part is a modified version of the statusbar script. It creates a hovering block of text.
	  
var sb = document.getElementById('statusbar-sb');
if (!sb) {
    sb = document.createElement('div');
    sb.id='statusbar-sb';
    sb.style.display='none';
    sb.style.position = 'fixed';
    sb.style.top='0px';
    sb.style.left='0px';
    sb.style.height='1.4em';
    sb.style.width='600px';
    sb.style.background='#aaf';
    sb.style.padding='3px';
    var text = document.createElement('span');
    text.id = 'statusbar-text';
    sb.appendChild(text);
    document.body.appendChild(sb);
	sb.style.display='block';
	sb.innerHTML = title; // I'm using the topic title I had saved from before, and inserting it in the hovering block of text.
}
