// ==UserScript==
// @name           FB Ticker Cleaner
// @namespace      fbtickercleaner.eros.js
// @description    filters the ticker
// @include        http://www.facebook.com/
// ==/UserScript==

var filters=new Array("keywords", "go", "here");

var div=document.createElement("div");
var body=document.getElementsByTagName('body')[0];
var before=document.getElementById('pagelet_bluebar');
body.insertBefore(div,before);

function fixFacebook() {

  var nodes = document.getElementsByTagName('div');
  for (var i=0; i<nodes.length; i++)
	{
		if(nodes[i].className.indexOf("fbFeedTickerStory")!=-1) {
			var dt=new Date(parseInt(nodes[i].getAttribute('data-ticker-timestamp'))*1000);
			var data="<span style='font-size: 10px;'>...at <b>"+dt.getHours()+':'+dt.getMinutes()+'</b>:'+dt.getSeconds()+"&nbsp;&nbsp;&nbsp;<i>("+dt.getFullYear()+'-'+dt.getDate()+'-'+(dt.getMonth()+1)+")</i></span>";
			var htm=nodes[i].innerHTML.toLowerCase();
			var tstamp=nodes[i].firstChild.childNodes[1].firstChild.firstChild;
			if(tstamp.childNodes.length==1){
				var divts=document.createElement('div');
				tstamp.appendChild(divts);
				divts.innerHTML=data;
			}
			var found=false;
			for(var x=0;x<filters.length;x++) {
				if(htm.indexOf(filters[x])!=-1) {
					found=true;
					break;
				}
			}
			if(!found) {
				nodes[i].style.display='none';
			}
		}
	}
}
setInterval(fixFacebook, 100);

