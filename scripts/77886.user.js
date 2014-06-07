// ==UserScript==
// @name           SG_Image_Resize
// @namespace      sg
// @description    Bilder vergroessern bei Mouseover
// @include        http://www.schwarzes-glueck.de/*/*
// ==/UserScript==


GM_addStyle("span.gmImageZoomer img{cursor:-moz-zoom-in!important;outline:1px dashed #CCC!important;}span.gmImageZoomer div img{outline:0px none!important;}span.gmImageZoomer div{visibility:hidden!important;position:absolute!important;z-index:1500!important;background-color:black!important;padding:3px!important;border:1px solid red!important;}span.gmImageZoomer:hover div{visibility:visible!important;} #contentdiv{owerflow:visible !important;}");


var regexp = 
{
	user:
	{
		regexp: /^http:\/\/www\.schwarzes-glueck\.de\/profil\/image\.php\?a=([0-9]+)\&b=thumb\&c=jpg$/,
		replace: "http://www.schwarzes-glueck.de/profil/image.php?a=$1&b=1&c=jpg"
	},
	sdt:
	{
		regexp: /^http:\/\/www\.schwarzes-glueck\.de\/profil\/image_feature\.php\?id=([0-9]+)/,
		replace: "http://www.schwarzes-glueck.de/profil/image.php?a=$1&b=1&c=jpg"
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
			//alert(type);
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
	var content = document.getElementById("contentdiv").style.overflow = "visible";
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

