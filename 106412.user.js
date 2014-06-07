// ==UserScript==
// @name           FoodPornDaily - Slideshow
// @namespace      FoodPornDaily.com
// @include        http://*foodporndaily.com*
// ==/UserScript==

function setCookie(c_name,value,exdays) {
	var exdate=new Date();
	exdate.setDate(exdate.getDate() + exdays);
	var c_value=escape(value) + ((exdays==null) ? "" : "; expires="+exdate.toUTCString());
	document.cookie=c_name + "=" + c_value;
}

function getCookie(c_name) {
	var i,x,y,ARRcookies=document.cookie.split(";");
	for (i=0;i<ARRcookies.length;i++) {
		x=ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
		y=ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
		x=x.replace(/^\s+|\s+$/g,"");
		if (x==c_name) {
			return unescape(y);
		}
	}
}

if (getCookie('fpdSlide')=='true') {
	slideshow=true;
} else {
	slideshow=false;
}

if (document.getElementById('mainPhoto')) {
	nextImageLink = document.getElementById('mainPhoto').parentNode.href;
	nextImage = nextImageLink.replace(/.$/,'.jpg');
	document.getElementById('mainPhoto').parentNode.innerHTML += '<img src="' + nextImage + '" style="display:none" />';
}

if (document.getElementById('nav')) {
	img = document.getElementById('mainPhoto').src;
	document.getElementById('nav').innerHTML = '<a style="font-size:.8em;" href="'+img+'">Download Image</a><br/>' + document.getElementById('nav').innerHTML;
}

if (document.getElementById('sequenceControls')) {
	document.getElementById('sequenceControls').innerHTML += '<a id="scSlideshow" href="javascript:" style="display: inline-block; background: url(\'http://i.imgur.com/gnzIz.jpg\') no-repeat top center; width:85px; height:30px;"></a>';
	if (slideshow===true) {
		document.getElementById('scSlideshow').style.backgroundPosition = 'bottom center';
	} else {
		document.getElementById('scSlideshow').style.backgroundPosition = 'top center';
	}
	document.getElementById('scSlideshow').addEventListener('click', function() {
		if (slideshow===true) {
			slideshow=false;
			document.getElementById('scSlideshow').style.backgroundPosition = 'top center';
			clearTimeout(t);
		} else {
			slideshow=true;
			document.getElementById('scSlideshow').style.backgroundPosition = 'bottom center';
			t=setTimeout(
				function () {
					document.location.href = nextImageLink;
				}
				,10000
			);
		}
		setCookie('fpdSlide',slideshow,7);
	},false);
}

if (slideshow===true) {
	t=setTimeout(
		function () {
			document.location.href = nextImageLink;
		}
		,10000
	);
}