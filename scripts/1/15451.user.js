// ==UserScript==

	// @name		Google alternate search links
	// @description		adds alternative search links (for instance video or linux search) to the google search results
	// @version		0.1
	// @date		2007-12-03

	// @author		b0b_rox0r <thomasbruckmaier@web.de>

	// @include		http://*.google.*/*
	// @exclude		http://*.google.*/custom*

// ==/UserScript==

alternates={};
alternates["linux"]={"name":"Linux","urlpart":"linux","baseurl":""};
alternates["video"]={"name":"Video","urlpart":"videosearch","baseurl":"video"};
alternates["blogs"]={"name":"Blogs","urlpart":"blogsearch","baseurl":""};
alternates["books"]={"name":"Books","urlpart":"books","baseurl":""};
alternates["scholar"]={"name":"Scholar","urlpart":"scholar","baseurl":"scholar"};
// general: http://baseurl.google.toplevel/urlpart?q=searchterm


enabled=new Array("linux","video","blogs","books","scholar");

a=document.getElementsByTagName("FONT")[0].childNodes;
str="";
for(i=0;i<a.length;i++) {
if(a[i].nodeType==1) {
b=a[i].firstChild;
if(b.nodeType==3 & a[i].tagName=="A") {
if(b.data=="Produkte") {
groupsLink=a[i];
href2=groupsLink.href;
questionmark=href2.indexOf("?");
slash=questionmark-href2.substr(0,questionmark).split("").reverse().join("").indexOf('/');
lastdot=questionmark-href2.substr(0,questionmark).split("").reverse().join("").indexOf('.');
toplevel=href2.substr(lastdot,slash-lastdot-1);
linkparts=new Array(href2.substr(0,slash),href2.substr(questionmark))
}
}
}
}

if (groupsLink) {
urls=new Array();

for(key in enabled) {
urls[i]=document.createElement('A');
tmp=alternates[enabled[key]];
urls[i].href="http://"+tmp["baseurl"]+((tmp["baseurl"])?".":"")+"google."+toplevel+"/"+tmp["urlpart"]+linkparts[1];
urls[i].innerHTML = tmp["name"];
urls[i].class = 'q';
spacer = document.createTextNode("\u00a0\u00a0\u00a0\u00a0");
groupsLink.parentNode.insertBefore(urls[i],groupsLink);
groupsLink.parentNode.insertBefore(spacer,groupsLink);
}

}

