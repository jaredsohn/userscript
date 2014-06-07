//UPDATE: Not working with NEW ORKUT! If u like this script then you may <strong><a href="http://feeds.feedburner.com/rb286" rel="nofollow">subscribe to my RSS feed</a></strong> or <strong><a href="http://www.feedburner.com/fb/a/emailverifySubmit?feedId=431924" rel="nofollow">email alert</a></strong> to receive automatic updates in future!
//
// ==UserScript==
// @name          Orkut Fan Flooder 
// @namespace    http://www.devilsworkshop.org/2006/10/12/orkut-latest-fan-flooder/
// @description  Orkut Fan Flooding Script!
// @include        http://www.orkut.*/Friends.aspx*
// ==/UserScript==

(function() {
var linkpre = "javascript:function cmd(){window.location='/setkarma?cat=0&val=3&gid="
var linkpost = "';}void(setInterval(cmd,2000));"

var i=document.getElementsByTagName('a');

for (var j = 0; j < i.length; j++) {
    var linkdata =  i[j].getAttribute("href");

    if (linkdata.match("setKarma") == "setKarma" ){
	var linkparts = linkdata.split("'");
  	var floodlink = document.createElement("a");
   	floodlink.href=linkpre+linkparts[1]+linkpost;
    	floodlink.appendChild(document.createTextNode(" [FanFlood]"));
	i[j].parentNode.insertBefore( floodlink ,i[j]);
	j=j+10;
        }
    }
})();