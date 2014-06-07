// ==UserScript==
// @name           Kelikamerat
// @namespace      http://alk.tiehallinto.fi/alk/kelikamerat/*
// @include	   http://alk.tiehallinto.fi/alk/kelikamerat/*
// @author         pailakka@gmail.com
// @description	   Better navigation for browsing weather camera pictures by Tiehallinto (Finnish Road Administration) 
// ==/UserScript==


var images = new Array();
var currpos = 0;
var timer = null;


function GetInnerSize () {
	var x,y;
	if (self.innerHeight) // all except Explorer
	{
		x = self.innerWidth;
		y = self.innerHeight;
	}
	else if (document.documentElement && document.documentElement.clientHeight)
		// Explorer 6 Strict Mode
	{
		x = document.documentElement.clientWidth;
		y = document.documentElement.clientHeight;
	}
	else if (document.body) // other Explorers
	{
		x = document.body.clientWidth;
		y = document.body.clientHeight;
	}
	return [x,y];
}

var innersize = GetInnerSize();

function getImages() {	
	hrefs = document.getElementsByTagName('a');
	for (i=0;i < hrefs.length;i++) {
		if (hrefs[i].href.indexOf('kelikamerat') != -1 && hrefs[i].href.indexOf('.jpg') != -1) {
			images[i] = new Array();
			images[i]['t'] = hrefs[i].innerHTML;
			images[i]['i'] = document.createElement('img');
			images[i]['i'].src = hrefs[i].href;			
			hrefs[i].target = '';
			hrefs[i].id = i
			hrefs[i].addEventListener("mouseover", function(event) { changeImage(event.target.id) }, false); 
			//hrefs[i].addeventlistener("onmouseover", 'changeImage(i)', false); 
			//hrefs[i].href = 'changeImage(\'' + i + '\');';
		}
	}
	
	return images
}



function getImageTag() {
	return document.images[0];
}

function changeImage(i) {
	imgtag.src = images[i]['i'].src;
	fonts = document.getElementsByTagName("font");
	if (images[i]['t'] != 'Animoi') {
		fonts[0].innerHTML = fonts[0].innerHTML.substr(0,(fonts[0].innerHTML.length)-9) + images[i]['t'];
	}
}

function tick() {
	if (currpos-1 < 0) {
		currpos = images.length - 1;
	}
	currpos-=1
	timer = setTimeout(tick,150);
	changeImage(currpos);

}

function startanim() {
	timer = setTimeout(tick,150);
}

var stopanim=function() {
	clearTimeout(timer);
}



function addPlayLink() {
	fonts = document.getElementsByTagName("font");
	fonts[1].innerHTML = fonts[1].innerHTML + '<a id="animlink" href="#">Animoi</a>';
	animLink = document.getElementById('animlink');
	//animLink.onmouseover = startanim;
	//alert(animLink);
	animLink.addEventListener("mouseover",startanim,false);
	animLink.addEventListener("mouseout",stopanim,false);
}

function hidePopup(event) {
	popupdiv.style.zIndex = '-2';
	popupdiv.style.display = 'none';
}

function showPopup(event) {
	kamera = event.target.href;
	popupdiv.style.display = 'block';
	popupdiv.style.zIndex = '5';
	//alert(kamera + '\n' + event.clientX + '\n' + event.clientY);
	if (event.clientY - parseInt(popupdiv.style.height) - 20 > 0) {
		popupdiv.style.top = event.clientY - parseInt(popupdiv.style.height) - 20;
	} else {
		ylitys = -parseInt(event.clientY - parseInt(popupdiv.style.height) - 20);
		popupdiv.style.top = event.clientY - (parseInt(popupdiv.style.height)) + ylitys;
	}
	
	if (event.clientX + 20 + parseInt(popupdiv.style.width) > innersize[0]) {
		popupdiv.style.left = event.clientX + 20 + (innersize[0] - (event.clientX + 20 + parseInt(popupdiv.style.width)));
	} else {	
		popupdiv.style.left = event.clientX + 20;// - parseInt(popupdiv.style.width);
	}
	GM_xmlhttpRequest({
	    method: 'GET',
	    url: kamera,
	    headers: {
	        'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
	        'Accept': 'text/html',
	    },
	    onload: function(responseDetails) {
	        var data = responseDetails.responseText
	       	popupdiv.innerHTML = data;
					var myregexp = /<IMG src="(.*?)"/i;
					var kuva = myregexp.exec(data);
					if (kuva != null) {
						kuva = kuva[1];
					} else {
						return;
					}
					img.src=kuva;
					popupdiv.innerHTML = '<img src="' + img.src + '" width="' + 704 / 2 + '" height="' + 576 / 2 + '"/>';
				}
			});
	
}

var map = document.getElementsByTagName('map')[0];
if (map == undefined) {
  
	addPlayLink();
	getImages()
	var imgtag = getImageTag()	
	imgtag.width = 704;
	imgtag.height = 576;
} else {	
	var popupdiv = document.createElement('div');
	var img = document.createElement('img');
	popupdiv.style.display='none';
	popupdiv.style.position = 'fixed';
	popupdiv.style.width=704 / 2 + 'px';
	popupdiv.style.height=576 / 2 + 'px';
	popupdiv.style.backgroundColor='white';
	popupdiv.style.left = '100px';
	popupdiv.style.top = '100px';
	popupdiv.style.border = '1px solid black';

	map.parentNode.insertBefore(popupdiv, map);
	
	var anchors = document.getElementsByTagName('a');
	var areas = document.getElementsByTagName('area');
	//alert(anchors.length);
	for (i=0;i < anchors.length;i++) {
		if(find(anchors[i].href,'kamera-C') != -1) {
			anchors[i].id = i;
			document.getElementById(i).addEventListener("mouseover",showPopup,false);
			document.getElementById(i).addEventListener("mouseout",hidePopup,false);
		}
	}
	
	for (i=0;i < areas.length;i++) {
		if(find(areas[i].href,'kamera-C') != -1) {
			//areas[i].id = 'a_' + i;
			areas[i].addEventListener("mouseover",showPopup,false);
			areas[i].addEventListener("mouseout",hidePopup,false);
		}
	}
	
}
