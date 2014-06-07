// ==UserScript==
// @name		biggrFlickrExif
// @namespace	
// @description	view larger flickr images and available basic EXIF data in Google Reader
// @include	http://www.google.com/reader/*
// @include	https://www.google.com/reader/*
// ==/UserScript==

var entries=document.getElementById("entries");
entries.addEventListener('DOMNodeInserted', function(event){nodeInserted(event);},true);

function getExifData(photoId){
	var str="";
	var exifDiv = document.createElement('div');
	var exifDivId = "exif_" + photoId;
	exifDiv.setAttribute("id",exifDivId);	
	exifDiv.innerHTML = "...fetching EXIF...";
	document.getElementById(photoId).parentNode.parentNode.parentNode.appendChild(exifDiv);
	var exifContent = document.getElementById(exifDivId);
	exifContent.style.color = "#666";
	exifContent.style.fontSize = ".85em";
	GM_xmlhttpRequest({
		method: 'GET',
		url: 'http://api.flickr.com/services/rest/?method=flickr.photos.getExif&api_key=acb087962e4b83d9ad0f4fce59b7782f&photo_id='+photoId+'&format=json&nojsoncallback=1',
		onload: function(rsp) {
			var exifdata = eval('(' + rsp.responseText + ')');
			if(exifdata.photo){
				var exifArray = new Array();
				var x=-1;
				var exifKeys = ['Aperture', 'Exposure', 'ISO Speed', 'Focal Length'];
				for (var i =exifdata.photo.exif.length-1; i >=0; i--){
					if(exifdata.photo.exif[i]){ 
						var val = (exifdata.photo.exif[i].raw._clean) ? exifdata.photo.exif[i].raw._clean : exifdata.photo.exif[i].raw._content;
						exifArray[exifdata.photo.exif[i].label] =  val;
					}
				}
				for (i in exifKeys) {
					var exifLabel = "";
					var exifPostLabel = "";
					switch(exifKeys[i]){
						case "Aperture":
							exifLabel = "f/";
							break;
						case "ISO Speed":
							exifLabel = "ISO ";
							break;
						case "Exposure":
							exifPostLabel = "s";
							break;
						default:
							exifLabel = "";
							exifPostLabel = "";
					}
					if(exifArray[exifKeys[i]]){
						str+= " . " + exifLabel + exifArray[exifKeys[i]] + exifPostLabel;
					}
				}
				exifDiv.innerHTML = exifdata.photo.camera + str;		
			}
			else {
			    exifDiv.innerHTML = "No EXIF data available";
			}
		}
	});
}

function nodeInserted(event){ 
	var newImgSrc=null;
	if (event.target.tagName=="DIV"){
		try{
			feedItem = event.target.getElementsByTagName('DIV');
			for (var i = 0; i < feedItem.length; i++) {
				feedItem = feedItem[i];
				feedImages = feedItem.getElementsByTagName('img');
				if(feedImages.length>0){
					for (var i = 0; i < feedImages.length; i++) {
						var imgEl = feedImages[i];
						if(imgEl.src.indexOf("flickr")!==-1){
							newImgSrc = imgEl.src.replace(/_m.jpg/, ".jpg");					 
							imgEl.src = newImgSrc;
							imgEl.removeAttribute('width');
							imgEl.removeAttribute('height');
							var photoId = newImgSrc.split('/')[4];
							photoId = photoId.split('_')[0];
							imgEl.setAttribute('id',photoId);
							imgEl.addEventListener('mouseover',function() {getExifData(photoId);},false);
							imgEl.addEventListener('mousemove',mousemoveListener,false);
						}
					}				 
				}
			}
		} catch(e){	}
	}
}

function mousemoveListener(e) {
	var imgId = e.target.id;
	var imgObj = document.getElementById(imgId);
	var new_element = imgObj.cloneNode(true);
	imgObj.parentNode.replaceChild(new_element, imgObj);
}