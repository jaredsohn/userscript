// ==UserScript==
// @name          Flickr Image Align and Crop by Oliver Hadfield
// @description	  Adds a button to flickr photo pages which allows you to load the image into another page and align crop it.  The new image is not saved over original image.
// @namespace     http://www.oliverhadfield.co.uk
// @include       http://flickr.com/photos/*
// @include       http://www.flickr.com/photos/*


	pid = location.pathname.split('/')[3];
	uid = location.pathname.split('/')[2];


	var listener = {
		flickr_photos_getSizes_onLoad: function(success, responseXML, responseText, params){
			makeObject(responseText);
		}
	};

	var makeObject = function (rsp) {
		
		var parser = new DOMParser();
		var dom = parser.parseFromString(rsp, "application/xml");
		var src = (dom.getElementsByTagName('size')[dom.getElementsByTagName('size').length-1].getAttribute('source'))

	var containerA = document.createElement("li");
	containerA.setAttribute("class","Stats");

	var link = document.createElement("a")
	link.setAttribute("class","Plain");
	containerA.appendChild(link)
	
	cUrl = "http://www.oliverhadfield.co.uk/cropper/?iU="
	
	link.setAttribute('href', cUrl + src);

	link.innerHTML = "Crop this image";


	//document.getElementsByTagName("ul")[2].appendChild(containerA);
	//document.getElementById("li_location").parentNode.appendChild(containerA);
	document.getElementById("faves_p").parentNode.appendChild(containerA);

	}
	
		doUpdateWithXHR = function() {
		unsafeWindow.F.API.callMethod('flickr.photos.getSizes', {
			photo_id: pid
		}, listener);
	}
	

unsafeWindow.setTimeout(doUpdateWithXHR, 1);


