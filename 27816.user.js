// ==UserScript==
// @name           Wer kennt wen? ImageZoomer
// @namespace      http://felix-kloft.invalid/werkenntwenimagezoomer
// @description    Vergrößert Vorschaubilder beim Überfahren mit der Maus bei "Wer kennt wen?"
// @include        http://www.wer-kennt-wen.de/*
// ==/UserScript==

GM_addStyle("span.gmImageZoomer img{cursor:-moz-zoom-in!important;outline:1px dashed #C00!important;}span.gmImageZoomer div img{outline:0px none!important;}span.gmImageZoomer div{visibility:hidden!important;position:absolute!important;z-index:300!important;background-color:white!important;padding:3px!important;border:1px solid blue!important;}span.gmImageZoomer:hover div{visibility:visible!important;}");
/*
span.gmImageZoomer img
{
	cursor: -moz-zoom-in !important;
	outline:1px dashed #C00 !important;
}
span.gmImageZoomer div img
{
	outline:0px none!important;
}
span.gmImageZoomer div
{
	visibility:hidden !important;
	position: absolute !important;
	z-index: 300 !important;
	background-color: white !important;
	padding: 3px !important;
	border: 1px solid blue !important;
}
span.gmImageZoomer:hover div
{
	visibility:visible !important;
}
*/


var regexp = 
{
	user:
	{
		regexp: /^http:\/\/img(\d+)\.werkenntwen\.de\/user\/(tiny|small|medium)\/([a-zA-Z0-9]{2})\/([a-zA-Z0-9]+)\.jpg$/,
		replace: "http://img$1.werkenntwen.de/user/big/$3/$4.jpg"
	},
	user1:
	{
		regexp: /^http:\/\/img(\d+)\.werkenntwen\.de\/user1\/([a-zA-Z0-9]{32})\/(tiny|small|medium)\/([a-zA-Z0-9]{2})\/([a-zA-Z0-9]+)\.jpg$/,
		replace: "http://img$1.werkenntwen.de/user1/$2/big/$4/$5.jpg"
	}, 
	club:
	{
		regexp: /^http:\/\/img(\d+)\.werkenntwen\.de\/club\/(tiny|small|medium)\/([a-zA-Z0-9]{2})\/([a-zA-Z0-9]+)\.jpg$/,
		replace: "http://img$1.werkenntwen.de/club/big/$3/$4.jpg"
	},
	dummies:
	{
		regexp: /^http:\/\/img(\d+)\.werkenntwen\.de\/images\/dummy_(\d+)_(tiny|small|medium).gif$/,
		replace: "http://img$1.werkenntwen.de/images/dummy_$2_big.gif"
	},
	dummy_club:
	{
		regexp: /^http:\/\/img(\d+)\.werkenntwen\.de\/images\/dummy_club_(tiny|small|medium).gif$/,
		replace: "http://img$1.werkenntwen.de/images/dummy_club_big.gif"
	},
	dummies_new:
	{
		regexp: /^http:\/\/static\.werkenntwen\.de\/images\/dummy\/dummy_(1|2|club)_(tiny|small|medium)\.gif$/,
		replace: "http://static.werkenntwen.de/images/dummy/dummy_$1_big.gif"
	}
};

function loadimages()
{
	var imgs = unsafeWindow.document.images;
	for(var i=0; i< imgs.length; i++)
	{
		var img = imgs[i];
		if(img.gm_imagezoomer)
			continue;
		img.gm_imagezoomer = 1;// Diese Bilder werden später nicht mehr vergrößert
		for(var type in regexp)
		{
			if(regexp[type].regexp.test(img.src))
			{
				zoom(img, img.src.replace(regexp[type].regexp, regexp[type].replace));
				break;
			}
		}
	}
}

function zoom(img, src)
{
	var zoom = document.createElement("span");
	zoom.className = "gmImageZoomer";
	zoom.appendChild(img.cloneNode(true));
	//zoom.appendChild(img);
	var div = document.createElement("div");
	var zoomed = document.createElement("img");
	zoomed.src = src;
	zoomed.className = "zoomed";
	div.appendChild(zoomed);
	zoom.appendChild(div);
	img.parentNode.replaceChild(zoom, img);
}


loadimages();
unsafeWindow.old_protectIMG = unsafeWindow.protectIMG;
unsafeWindow.protectIMG = function()
{
	unsafeWindow.old_protectIMG();
	loadimages();
};

