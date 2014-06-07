// ==UserScript==
// @name           Upcoming Group Scrapbook
// @version        2.0
// @description    Adds a gallery to Upcoming.org's Group page
// @namespace      http://userscripts.org/users/674;scripts
// @include        http://upcoming.yahoo.com/group/*
// ==/UserScript==

var m = window.location.pathname.match('group/(\\d+)');
if (m == null) return;
var groupId = m[1];
var jsonURL = 'http://pipes.yahoo.com/pipes/pipe.run?_id=EKyNhRcO3BGQgRp31vC6Jw&_render=json&_run=1&group_id=' + groupId;
var imgs = [];
var imgsIndex;
var step = 10;

function $(id) { return document.getElementById(id); }
GM_addStyle("#groupGallery{padding-top:40px;} #ggbd {padding:5px 0;overflow:-moz-scrollbars-horizontal; white-space:nowrap;} #gghdlink,#gghdinfo{font-size:10px}");
var gg = document.createElement('div');
gg.id = 'groupGallery';
gg.innerHTML = '<div id="gghd" class="heading">Group Gallery <span id="gghdlink"><a id="gghdlinka">Get recent images</a></span> <span id="gghdinfo"></span></div><div id="ggbd"></div>';
document.getElementById('group').appendChild(gg);
var gghdlinka = $('gghdlinka');
var gghdinfo = $('gghdinfo');
var ggbd = $('ggbd');

gghdlinka.addEventListener('click', getImages, false);

function getImages() {
	gg.style.cursor = 'progress';
	gghdlinka.innerHTML = '';
	gghdinfo.innerHTML = 'fetching gallery...';
	GM_xmlhttpRequest({ method: 'GET', url: jsonURL, onload: loadImages});
}

function loadImages (o) {
	if (o.responseText == '') { gghdinfo.innerHTML='Unable to get pics: '+o.statusText ;  return; }
	var json = eval('(' + o.responseText + ')');
	json.value.items.forEach(function(e){
		imgs.push(e.flickr['y:flickr']);
	});
	imgsIndex = imgs.length - 1;
	gghdlinka.removeEventListener('click', getImages, false);
	gghdlinka.addEventListener('click', showImages, false);
	showImages();
	gg.style.cursor = '';
	gghdinfo.innerHTML = '';
}

function showImages(){
	gghdlinka.innerHTML = '';
	gghdinfo.innerHTML = 'fetching more images...';
	var endpoint = (ggbd.scrollWidth == ggbd.clientWidth) ? 0 : ggbd.scrollWidth;  // save the end point

	for (var i = step; i > 0 && imgsIndex >= 0; i--) {
		var img = imgs[imgsIndex];
		ggbd.innerHTML += '<a href="' + img['link'] + '" title="See all pics from this event"><img src=\"' + img['img'].replace('m.jpg', 't.jpg') + '\" /></a> ';
		imgsIndex--;
	}

	if (imgsIndex < 0) {
		document.getElementById('gghdlink').innerHTML = '';
	} else {
		var num = Math.min(step, imgsIndex+1);
		gghdlinka.innerHTML = (num > 3) ? ('Get next ' + num + ' images') : 'Get last few images';
	}

	// jump to the beginning of the next batch.  Need a little time to let browser render the new images.
	setTimeout("document.getElementById('ggbd').scrollLeft = " + endpoint + ';document.getElementById("gghdinfo").innerHTML=""', 1000);
}

