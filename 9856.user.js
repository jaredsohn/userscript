// ==UserScript==
// @name           Remove Some I hate AD
// @namespace      http://www.hillhill.net/GreaseMonkey/Script
// @description    Remove AD function
// @include        *
// ==/UserScript==


// change the backGroundColor code
//document.bgColor = "#FFFFE1"


//----dive into greasemokey book ad
var adSidebar = document.getElementsByTagName('iframe')[0];

//----google ad frame
//var adSidebar2 = document.getElementsByName('google_ads_frame')[0];
var adSidebar2 = document.getElementsByName('google_ads_frame');

//----sina float ad
var adSidebar3 = document.getElementById('xp_content_iframe');

//----baidu search and mp3 right ad 
var adSidebar4 = document.getElementById('ScriptDiv');
var adSidebar5 = document.getElementById('rightAd');
var parentNode

//----yahoo ad
var adSidebar6 = document.getElementById('alliads');

//----google search ad
var adSidebar7 = document.getElementById('tads');
var adSidebar8 = document.getElementById('mbEnd');

//-baidu adsendse
var adSidebar9 = document.getElementsByTagName('iframe');

//NarrowAD
while(document.getElementById('nadmouseframe')){
	document.getElementById('nadmouseframe').parentNode.removeChild(document.getElementById('nadmouseframe'));
}

if (adSidebar && document.location.host == "diveintogreasemonkey.org") {
    adSidebar.parentNode.removeChild(adSidebar);
}

if (adSidebar2.length > 0){
		for(i=0; i<adSidebar2.length; i++){
			//adSidebar2[i].parentNode.removeChild(adSidebar2[i]);
			adSidebar2[i].style.display = 'none';	
	}
}

if (adSidebar3 && document.location.host == "blog.sina.com.cn"){
		adSidebar3.parentNode.removeChild(adSidebar3);
}

if (adSidebar4){
		parentNode = adSidebar4.parentNode.parentNode.parentNode
		parentNode.parentNode.removeChild(parentNode);
}

if (adSidebar5 && document.location.host == "mp3.baidu.com"){
		adSidebar5.style.display = 'none';
		document.getElementById('leftRes').style.width = '100%';
		document.getElementById('dMA').style.display = 'none';
}

if (adSidebar6) {
    adSidebar6.parentNode.removeChild(adSidebar6);
}

if (adSidebar7) {
    adSidebar7.parentNode.removeChild(adSidebar7);
    adSidebar8.parentNode.removeChild(adSidebar8);
}

if (adSidebar9) {
	for (i=0; i<adSidebar9.length ;i++ )
	{
		if (adSidebar9[i].src.indexOf('baidu') != -1)
		{
//			alert(adSidebar9[i].src);
			adSidebar9[i].parentNode.removeChild(adSidebar9[i]);
		}
	}
}

//sogou adword
if (document.getElementById('cttbss0')) {
    document.getElementById('cttbss0').parentNode.removeChild(document.getElementById('cttbss0'));
}

//if (document.getElementsByTagName("iframe")[0] && document.location.host == "topic.csdn.net"){
//		adSidebar5.style.display = 'none';
//		document.getElementById('leftRes').style.width = '100%';
//		document.getElementById('dMA').style.display = 'none';
//}


//use the image size to remove the suit size image AD
var adsize = ";468 X 60;180 X 60;760 X 100;180 X 120;760 X 60;300 X 300;530 X 60;80 X 80;400 X 50;150 X 60;760 X 80;135 X 100;135 X 30;980 X 70";
var findadsize;
var imgobj;
var images = document.evaluate(
    "//img",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
for(var i = 0; i < images.snapshotLength; i++)
{
		imgobj = images.snapshotItem(i);
    if(imgobj.width > 0 && imgobj.height > 0){
    findadsize = imgobj.width + " X " + imgobj.height;
    if(adsize.indexOf(findadsize) >  0){
//       console.info(findadsize);
//       imgobj.parentNode.removeChild(imgobj);
       imgobj.style.display = 'none';
    }
}
}

//use the embed size to remove the suit size image AD
var adsize = ";980 X 70;";
var findadsize;
var imgobj;
var images = document.evaluate(
    "//embed",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
for(var i = 0; i < images.snapshotLength; i++)
{
		imgobj = images.snapshotItem(i);
    if(imgobj.width > 0 && imgobj.height > 0){
    findadsize = imgobj.width + " X " + imgobj.height;
    if(adsize.indexOf(findadsize) >  0){
//       console.info(findadsize);
//       imgobj.parentNode.removeChild(imgobj);
       imgobj.style.display = 'none';
    }
}
}

//GM_xmlhttpRequest({
//    method: 'GET',
//    url: 'http://www.baidu.com',
//    headers: {
//        'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
//        'Accept': 'application/atom+xml,application/xml,text/xml',
//    },
//    onload: function (responseDetails) {
//        alert('Request for Atom feed returned ' + responseDetails.status +
//              ' ' + responseDetails.statusText + '\n\n' +
//              'Feed data:\n' + responseDetails.responseText);
//    }
//});

//baidu search width result
var allDivs, thisDiv;
allDivs = document.evaluate(
    "//td[@class='f']",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
for (var i = 0; i < allDivs.snapshotLength; i++) {
    thisDiv = allDivs.snapshotItem(i);
    // do something with thisDiv
    thisDiv.style.width = "100%";
}

//some table ad no id
allDivs = document.evaluate(
    "//table[@width='468'][@height='60']",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
for (var i = 0; i < allDivs.snapshotLength; i++) {
    thisDiv = allDivs.snapshotItem(i);
    // do something with thisDiv
    thisDiv.parentNode.removeChild(thisDiv);
}


//baidu mp3 remove ad2
//var allDivs, thisDiv;
//allDivs = document.evaluate(
//    "//table[@cellspacing='0'][@cellpadding='0'][count(@*)=2]",
//    document,
//    null,
//    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
//    null);
//// method 1 hide
//allDivs.snapshotItem(0).style.display='none';
//// method 2 remove
//allDivs.snapshotItem(0).parentNode.removeChild(allDivs.snapshotItem(0));