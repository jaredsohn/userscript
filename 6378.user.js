// ==UserScript==
// @name           	Auto Join Community on Orkut
// @namespace     	

http://www.devilsworkshop.org/2006/10/29/autojoin-communities-on-orkut/
// @description 	Automatically join Communities
// @include        	http://*.orkut.*/*
// @exclude	http://*.orkut.*/Communities.aspx
// @exclude	http://*.orkut.*/Home.aspx
// ==/UserScript==

(function() {
var i=document.getElementsByTagName('a');
for (var j=i.length-1; j>1; j--) {
    var linkdata =  i[j].getAttribute("href");
    var linkparts = linkdata.split("?");
    if (linkdata.match("Community.") == "Community." ) {
        var commjoinlink = document.createElement("a");
        commjoinlink.href="http://www.orkut.com/CommunityJoin.aspx"+"?"+linkparts[1];
        commjoinlink.appendChild(document.createTextNode(" [J]"));

        i[j].parentNode.insertBefore( commjoinlink,i[j].nextSibling);
        }
    }
})();


window.addEventListener(
	'load',
	function() {
	if ( window.location.href.match("CommunityJoin") == ("CommunityJoin") ) {
		window.location.href = "javascript: 

_submitForm(document.evaluate('/html/body/div[6]/div[3]/table/tbody/tr[2]/td[1]/form/div[4]/sp

an[1]/a', document, null, 7 , null).snapshotItem(0),'join');"
		}
	},
	true);
