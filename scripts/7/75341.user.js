// ==UserScript==
// @name          java test
// @namespace     http://diveintogreasemonkey.org/download/
// @description   example script to alert "Hello world!" on every page
// @include       http://diveintogreasemonkey.org/
// ==/UserScript==

function LinkList() {
var myheader = "<head><title>Links In "+document.title+"</title></head>";
myheader = myheader + "<body>";
var myfont = "<font style=\"font: 8pt Verdana, Arial, Helvetica, Sans-serif; line-height:18pt;\" face=\"verdana, tahoma, geneva\" size=\"-1\" >";
var mytext = "<center><b>Links in " + document.title + "</b><ol></center>";
var myendfont = "</font>";
var myendheader = "</body>";

windowprops = "menubars=no,location=no,toolbars=no,scrollbars=yes,"+"width=350,height=400,top=50,left=50";
self.name = "main";

if(document.all) {
for (i=0; i<document.links.length; i++) {
if(document.links[i].innerText)
	if(document.links[i].innerText != " ")
		mytext += "<li><a target='_new' href="+document.links[i]+">"+document.links[i].innerText+"</a><br>";
	else
		mytext += "<li><a target='_new' href="+document.links[i]+">"+document.links[i]+"</a><br>" ;
   }
}
else {
	for (i=0; i<document.links.length; i++) {
	if(document.links[i].text) {
	if(((document.links[i].text).indexOf("javascript:")) == -1) {
		mytext += "<li><a target='_new' href="+document.links[i]+">"+document.links[i].text+"</a><br>" ;
	}
}
else { }
   }
}

mytext = mytext + "</ol><center><a href='javascript:window.close()'>close</a></center><BR>";

linkswin = window.open("","",windowprops);
with (linkswin.document) {
open();
write(myheader + myfont + mytext + myendfont + myendheader);
close();
   }
}

var allDivs, thisDiv;
allDivs = document.evaluate(
    "//div[@class='sectionInner']",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
for (var i = 0; i < allDivs.snapshotLength; i++) {
    //thisDiv = allDivs.snapshotItem(i);
    // do something with thisDiv
	var mypoom = "<input type=button onClick=\"LinkList();\" value=\"List all links on this page\">"
	document.write(mypoom);
}