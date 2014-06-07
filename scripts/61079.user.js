// ==UserScript==
// @name         amazon popup image script
// @author       kamo
// @namespace    http://www.yasui-kamo.com/
// @description  When the mouse is put on the image, a large image is displayed.
// @include      http://www.amazon.*/*
// @include      https://www.amazon.*/*
// @exclude      http://www.amazon.*/gp/product/images/*
// @exclude      https://www.amazon.*/gp/product/images/*
// ==/UserScript==

//---------------------------
//set condition
//---------------------------
var g_popupImg   = true;  // When the mouse is put on the image, a large image is displayed.
var g_dragImg    = true;  // When the image is dragged, the image is displayed in another window.
var g_listImg    = true;  // When left-click while right-click in the image, all of the image is displayed.
var g_actframe   = false; // The frame is displayed in the image of a possible action.
var g_actstring  = false; // The popup action is added to the character.
//---------------------------

var g_asin;
var g_imgObj;
var g_link;
var g_mouseX;
var g_mouseY;
var g_imageListEvent = 0;
var g_rightClick = 0;
var g_leftClick = 0;

//get asin
function getASIN(url)
{
	//get asin
	var asin = "";
	var asin_ePos;
	var asin_sPos = url.indexOf("/gp/product/images/");
	if(asin_sPos != -1)
	{
		asin_ePos = url.indexOf("/", asin_sPos+19);
		asin = url.substring(asin_sPos+19, asin_ePos);
		return asin;
	}
	asin_sPos = url.indexOf("/gp/product/");
	if(asin_sPos != -1)
	{
		asin_ePos = url.indexOf("/", asin_sPos+12);
		asin = url.substring(asin_sPos+12, asin_ePos);
		return asin;
	}
	asin_sPos = url.indexOf("/gp/reader/");
	if(asin_sPos != -1)
	{
		asin_ePos = url.indexOf("/", asin_sPos+11);
		asin = url.substring(asin_sPos+11, asin_ePos);
		return asin;
	}
	asin_sPos = url.indexOf("/dp/images/");
	if(asin_sPos != -1)
	{
		asin_ePos = url.indexOf("/", asin_sPos+11);
		asin = url.substring(asin_sPos+11, asin_ePos);
		return asin;
	}
	asin_sPos = url.indexOf("/dp/");
	if(asin_sPos != -1)
	{
		asin_ePos = url.indexOf("/", asin_sPos+4);
		asin = url.substring(asin_sPos+4, asin_ePos);
	}
	asin_sPos = url.indexOf("asin=");
	if(asin_sPos != -1)
	{
		asin = url.substring(asin_sPos+5, asin_sPos+15);
	}

	return asin;
}

//get country code
function getCountryCode()
{
	var country;
	var title = document.getElementsByTagName("title")[0].text;

	if(title.indexOf("Amazon.co.jp") != -1)
	{
		country = "09";
	}
	else if(title.indexOf("Amazon.com") != -1)
	{
		country = "01";
	}
	else if(title.indexOf("Amazon.co.uk") != -1)
	{
		country = "02";
	}
	else if(title.indexOf("Amazon.de") != -1)
	{
		country = "03";
	}
	else if(title.indexOf("Amazon.fr") != -1)
	{
		country = "08";
	}
	else if(title.indexOf("Amazon.ca") != -1)
	{
		country = "01";
	}
	else if(title.indexOf("Amazon.it") != -1)
	{
		country = "05";
	}
	else
	{
		country = "04";
	}

	return country;
}

//display image
function popupImg(asin, link, evt)
{
	//get country code
	var country = getCountryCode();

	//get image size
	var imageSize = 400;
	imageSize = document.body.clientWidth/2 - imageSize/2;

	if(g_popupImg == true)
	{
		document.getElementById('popc').style.left =  imageSize + "px";
		document.getElementById('popc').style.top = "0px";
		document.getElementById('popc').innerHTML = "<img src='http://images.amazon.com/images/P/"+asin+"."+country+"._SCLZZZZZZZ_.jpg'>";
	}
	g_link = link;
	g_mouseX = evt.clientX + document.body.scrollLeft;
	g_mouseY = evt.clientY + document.body.scrollTop;
	g_asin = asin;
}

//clear image
function clearOriginalImg(asin, evt)
{
	//check display image
	var country = getCountryCode();
	var imgObj = new Image();
	imgObj.src = "http://images.amazon.com/images/P/"+asin+"."+country+"._SCLZZZZZZZ_.jpg";
	if(imgObj.width != 0)
	{
		var imageSize = 400;
		imageSize = document.body.clientWidth/2 - imageSize/2;
		var img_width = imgObj.naturalWidth;
		var img_height = imgObj.naturalHeight;
		var img_width_s = imageSize;
		var img_width_e = img_width_s + img_width;
		var img_height_s = 0;
		var img_height_e = img_height_s + img_height;
		var mouseX = evt.clientX;
		var mouseY = evt.clientY;
		if((mouseX >= img_width_s && mouseX <= img_width_e) && (mouseY >= img_height_s && mouseY <= img_height_e))
		{
			return;
		}
	}

	//clear image
	clearImg();
}

//drag image
function dragImage(evt)
{
	var mouseX = evt.clientX + document.body.scrollLeft;
	var mouseY = evt.clientY + document.body.scrollTop;
	if(Math.abs(mouseX-g_mouseX) > 100 || Math.abs(mouseY-g_mouseY) > 100)
	{
		//drag image
		if(g_asin != undefined)
		{
			if(g_asin.length > 0)
			{
				var country = getCountryCode();
				var maxURL = "http://images.amazon.com/images/P/"+g_asin+"."+country+"._SCRMZZZZZZ_.jpg";
				g_asin = "";
				var img = new Image();
				img.src = maxURL;
				g_imgObj = img;
				img.onload  = (function(imgObj){
					setTimeout(checkImageComplete, 100);
				})(img);
			}
		}
	}
}

//clear image
function clearImg()
{
	document.getElementById('popc').innerHTML = "";
}

//wait image complete and show max size image.
function checkImageComplete()
{
	if(g_imgObj.complete == true || g_imgObj.width > 0)
	{
		if(g_imgObj.width > 10)
		{
			window.open(g_imgObj.src, g_imgObj.src);
		}
		else
		{
			var url = g_imgObj.src.replace("_SCRMZZZZZZ_", "_SCLZZZZZZZ_");
			var img = new Image();
			img.src = url;
			g_imgObj = img;
			img.onload  = (function(imgObj){
				setTimeout(checkImageComplete2, 100);
			})(img);
		}
		return;
	}
	setTimeout(checkImageComplete, 100);
}

//wait image complete and show large size image.
function checkImageComplete2()
{
	if(g_imgObj.complete == true || g_imgObj.width > 0)
	{
		if(g_imgObj.width > 10)
		{
			window.open(g_imgObj.src, g_imgObj.src);
		}
		return;
	}
	setTimeout(checkImageComplete2, 100);
}

//clear asin
function sendPageAndClearASIN(event)
{
	event.preventDefault();
}

//send page
function sendPage()
{
	if(g_link.indexOf("/gp/product/images/") != -1)
	{
		return;
	}
	location.href = g_link;
}

//add pop up image event
function addEventPopUpImg()
{
	var objLink = document.getElementsByTagName("a");
	for (var i = 0; i < objLink.length; i++) {
		var nodes = objLink[i].getElementsByTagName('a');
		if(nodes.length > 0)
		{
			continue;
		}

		var link = objLink[i].href;
		if((link.indexOf("http://www.amazon.") != -1 && (link.indexOf("/dp/") != -1 || link.indexOf("/images/") != -1)) ||
			link.indexOf("/gp/product/") != -1 || link.indexOf("/gp/reader/") != -1 || link.indexOf("asin=") != -1 && link.indexOf("#customerReviews") == -1)
		{
			var nameVal = objLink[i].getAttribute("name");
			var styleVal = objLink[i].getAttribute("style");
			var className = objLink[i].getAttribute("class");
			if(nameVal != "popupImg" && styleVal == null && className != "select-this-item")
			{
				var asin = getASIN(link);
				var targetVal = objLink[i].getAttribute("target");
				if(targetVal != null && targetVal == "AmazonHelp")
				{
					asin = getASIN(location.href);
				}
				if(asin.length == 10 && checkAlphanumeric(asin) == true)
				{
					var childNodes = objLink[i].getElementsByTagName('img');
					if(childNodes.length > 0)
					{
						var width = childNodes[0].getAttribute("width");
						if(width != null && (width.indexOf("30px") != -1 || width == "30"))
						{
							continue;
						}
					}
					else
					{
						if(g_actstring == false)
						{
							continue;
						}
					}

					if(g_actstring == false && childNodes.length > 0)
					{
						(function(n,m){childNodes[0].addEventListener("mouseover", function(){popupImg(n, m, arguments[0])}, false);})(asin, link);
						(function(n){childNodes[0].addEventListener("mouseout", function(){clearOriginalImg(n, arguments[0])}, false);})(asin);
					}
					else
					{
						(function(n,m){objLink[i].addEventListener("mouseover", function(){popupImg(n, m, arguments[0])}, false);})(asin, link);
						(function(n){objLink[i].addEventListener("mouseout", function(){clearOriginalImg(n, arguments[0])}, false);})(asin);
					}

					objLink[i].addEventListener("DOMMouseScroll", clearImg, false);
					if(g_popupImg == true && g_listImg == false)
					{
						objLink[i].addEventListener("click", function(){sendPageAndClearASIN(arguments[0])}, false);
						objLink[i].addEventListener("mouseup", sendPage, false);
					}
					if(g_dragImg == true)
					{
						objLink[i].addEventListener("dragend", function(){dragImage(arguments[0])}, false);
					}
					if(g_listImg == true)
					{
						objLink[i].addEventListener("mousedown", function(){showImageList(arguments[0])}, false);
						objLink[i].addEventListener("mouseup", function(){clearImageListEventAndSendPage(arguments[0])}, false);
						objLink[i].addEventListener("contextmenu", function(){cancelEvent(arguments[0])}, false);
						objLink[i].addEventListener("click", function(){sendPageAndClearASIN(arguments[0])}, false);
					}
					objLink[i].setAttribute("name", "popupImg");
					
					if(g_actframe == true && childNodes.length > 0)
					{
						childNodes[0].style.border = "solid 1px black";
						childNodes[0].style.padding = "3px";
					}
				}
			}
		}
	}
	setTimeout(addEventPopUpImg, 1000);
}

//check Alphabet and numeric
function checkAlphanumeric(value)
{
	if(value.match(/[^0-9A-Z]+/) == null)
	{
		return true;
	}
	else
	{
		return false;
	}
}

//get image size
function getImageSize(size)
{
	if(size == 1)
	{
		return "_SCMZZZZZZZ_";
	}
	else if(size == 2)
	{
		return "_SCLZZZZZZZ_";
	}
	else
	{
		return "_SCRMZZZZZZ_";
	}
}

//display image list
var g_imagecount;
var g_imageloadcheck;
function displayImageList(asin, size)
{
	g_imagecount = 0;
	g_leftClick = 1;
	g_imageListEvent = 1;
	g_imageloadcheck = 0;

	document.getElementById("loadimage").innerHTML = "<img src=\"https://images-na.ssl-images-amazon.com/images/G/01/x-locale/common/loading/loading-small._V192239831_.gif\"> Loading...";
	document.getElementById('imageList').style.left = "0px";
	document.getElementById('imageList').style.top = "0px";

	//main image
	var imageSize = getImageSize(size);
	var country = getCountryCode();
	var url = "http://images.amazon.com/images/P/"+asin+"."+country+"."+imageSize+".jpg";
	var imgObj = new Image();
	(function(n, m){imgObj.addEventListener("load", function(){displayImage(n, m)}, false);})(url, asin);
	imgObj.src = url;

	//sub image
	var number;
	for(number = 1; number <= 30; number++)
	{
		var url = getImageURL(asin, "PT", number, size);
		var imgObj = new Image();
		(function(n, m){imgObj.addEventListener("load", function(){displayImage(n, m)}, false);})(url, asin);
		imgObj.src = url;
	}
	for(number = 1; number <= 30; number++)
	{
		var url = getImageURL(asin, "IN", number, size);
		var imgObj = new Image();
		(function(n, m){imgObj.addEventListener("load", function(){displayImage(n, m)}, false);})(url, asin);
		imgObj.src = url;
	}
}

//display image
function displayImage(url, asin)
{
	g_imageloadcheck++;
	if(g_imageloadcheck >= 61) {
		document.getElementById("loadimage").innerHTML = "";
	}

	var imgObj = new Image();
	imgObj.src = url;
	if(imgObj.width <= 10)
	{
		return;
	}
	g_imagecount++;
	if(g_imagecount == 1)
	{
		document.getElementById("imageList").innerHTML = "<table id='imageListTbl' style='border-style:none;'><thead><tr><td id='closeLink' style='text-align:center;border-style:none;'></td></tr><tr><td id='sizeLink' style='text-align:center;border-style:none;'></td></tr></thead><tfoot><tr><td id='closeLink2' style='text-align:center;border-style:none;'></td></tr><tr><td id='poweredLink' style='text-align:center;border-style:none;'></td></tr></tfoot><tbody id='imageListTbody'></tbody></table>";
	}

	var tableObj = document.getElementById("poweredLink");
	tableObj.innerHTML = "<a style='font-size:0.8em;' href='http://www.yasui-kamo.com/' target='_blank'>powered by yasuikamo</a>";
	var closeHTML = "<div><a onclick=\"document.getElementById('imageList').innerHTML='';\" href=\"javascript:void(0);\">Close</a></div>";
	var tableObj = document.getElementById("closeLink");
	tableObj.innerHTML = closeHTML;
	var tableObj = document.getElementById("closeLink2");
	tableObj.innerHTML = closeHTML;
	var tableObj = document.getElementById("sizeLink");
	tableObj.innerHTML = "<div><a id='imageSize1' href=\"javascript:void(0);\">Small</a> <a id='imageSize2' href=\"javascript:void(0);\">Middle</a> <a id='imageSize3' href=\"javascript:void(0);\">Large</a><div>";
	var imageSizeObj1 = document.getElementById("imageSize1");
	var imageSizeObj2 = document.getElementById("imageSize2");
	var imageSizeObj3 = document.getElementById("imageSize3");
	(function(n, m){imageSizeObj1.addEventListener("click", function(){displayImageList(n, m)}, false);})(asin, 1);
	(function(n, m){imageSizeObj2.addEventListener("click", function(){displayImageList(n, m)}, false);})(asin, 2);
	(function(n, m){imageSizeObj3.addEventListener("click", function(){displayImageList(n, m)}, false);})(asin, 3);

	var tableObj = document.getElementById("imageListTbody");
	var insObj = document.createElement('tr');
	tableObj.appendChild(insObj) 
	var sImage = document.createElement('td');
	insObj.appendChild(sImage) 
	sImage.style.textAlign = "center";
	var htmldata = "<a href ="+url+" target='_blank'><img style=\"border-style:none;\" src="+url+"></a>";
	if(imgObj.width >= 500)
	{
		htmldata = "<a href ="+url+" target='_blank'><img style=\"border-style:none;\" width=\"500px;\" src="+url+"></a>";
	}
	sImage.innerHTML = htmldata;
	sImage.addEventListener("mouseup", function(){clearEvent(arguments[0]);}, false);
}

//get number of string
function getNumberStr(number)
{
	if(number < 10)
	{
		return "0"+number;
	}
	else
	{
		return number;
	}
}

//get image url
function getImageURL(asin, type, number, size)
{
	var country = getCountryCode();
	var imagesize = getImageSize(size);
	var numberStr = getNumberStr(number);
	var url = "http://images.amazon.com/images/P/"+asin+"."+country+"."+type+numberStr+"."+imagesize+".jpg";

	return url;
}

//clear event
function clearEvent(evt)
{
	evt.preventDefault();
	g_rightClick = 0;
	g_leftClick = 0;
	g_imageListEvent = 0;
}

//show image list
function showImageList(evt)
{
	//right click
	if(evt.button == 2)
	{
		g_rightClick = 1;
		return;
	}

	//keep right click
	if(g_rightClick == 1)
	{
		displayImageList(g_asin, 2);
	}
}

// mouse up
function clearImageListEventAndSendPage(evt)
{
	//right click
	if(evt.button == 2)
	{
		g_rightClick = 0;
		return;
	}

	if(g_leftClick == 1)
	{
		g_leftClick = 0;
		return;
	}

	//left click(send item page.)
	if(g_imageListEvent == 0)
	{
		sendPage();
	}
}

//cancel right click
function cancelEvent(evt)
{
	if(g_imageListEvent == 1)
	{
		g_imageListEvent = 0;
		evt.preventDefault();
	}
}


//main
(function(){
	if(!document.body)
	{
		return;
	}

	if(g_popupImg == false && g_dragImg == false && g_listImg == false)
	{
		return;
	}

	//create image area
	var imageArea = document.createElement('div');
	imageArea.id = "popc";
	imageArea.style.position = "fixed";
	imageArea.style.zIndex = "100";
	imageArea.style.overflow = "auto";
	imageArea.style.background = "white";
	imageArea.style.opacity = "1.0";

	var imageListArea = document.createElement('div');
	imageListArea.id = "imageList";
	imageListArea.style.position = "fixed";
	imageListArea.style.zIndex = "99";
	imageListArea.style.overflow = "auto";
	imageListArea.style.background = "white";
	var height = window.innerHeight;
	imageListArea.style.height = height + "px";
	imageListArea.addEventListener("mouseup", function(){clearEvent(arguments[0]);}, false);

	//create image area
	var loadArea = document.createElement('div');
	loadArea.id = "loadimage";
	loadArea.style.position = "fixed";
	loadArea.style.zIndex = "2003";
	loadArea.style.overflow = "auto";
	loadArea.style.background = "white";
	loadArea.style.left = "5px";
	loadArea.style.top = "5px";
	
	var objBody = document.getElementsByTagName("body").item(0);
	objBody.appendChild(imageArea);
	objBody.appendChild(imageListArea);
	objBody.appendChild(loadArea);

	var imageObj = document.getElementById('popc');
	if(g_popupImg == true)
	{
		imageObj.addEventListener("mouseout", clearImg, false);
		imageObj.addEventListener("DOMMouseScroll", clearImg, false);
		if(g_listImg == false)
		{
			imageObj.addEventListener("click", sendPage, false);
		}
	}
	if(g_dragImg == true)
	{
		imageObj.addEventListener("dragend", function(){dragImage(arguments[0]);}, false);
	}
	if(g_listImg == true)
	{
		imageObj.addEventListener("mousedown", function(){showImageList(arguments[0]);}, false);
		imageObj.addEventListener("mouseup", function(){clearImageListEventAndSendPage(arguments[0]);}, false);
		imageObj.addEventListener("contextmenu", function(){cancelEvent(arguments[0]);}, false);
	}

	//add event
	addEventPopUpImg();
}
)();
