// ==UserScript==
// @name           Nothing
// @include       https://secure.adultfriendfinder.com/p/order.cgi?*
// ==/UserScript==  
function findLink(){
	searchPath=(document.location.search)
	searchOptions=searchPath.split("&");
	if(searchOptions.length < 2){
		alert("Not enough to work on");
	} else {
		loopNo=0
		while (loopNo < searchOptions.length){
			pairs=searchOptions[loopNo].split("=")
			if (pairs[0]=="p_pwsid"){
				answer=pairs[1]
				
			}
			loopNo+=1;
		}
	}
	imageCount=0
	field="";
	while (imageCount < 10){
		test=field;
		field=test+'<img src="http://photos.adultfriendfinder.com/ffadult/photos_100/35/'+answer+'.'+imageCount+'.gif">';
		imageCount+=1;
	}

	var images = document.createElement("div");
	images.innerHTML = '<div style="margin: 0 auto 0 auto; border-bottom: 1px solid #000000; margin-bottom: 5px; font-size: small; background-color: #000000; color: #ffffff;">'+field+'<br><a href="http://profile.adultfriendfinder.com/view/'+answer+'">Visit Profile</a></div>';
	document.body.insertBefore(images, document.body.ffadult);


}
findLink()



