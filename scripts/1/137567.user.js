// ==UserScript==
// @name           Display Image Info ThinkInk
// @author          caoyue
// @version           1.1
// @description    Display Image Info in Image Title
// @include        *
// ==/UserScript==


(function (){
	var URL_MAX_LENGTH =  100;  
	var MIN_SIZE_DISPLAY = 30;  
	var url;
	document.addEventListener('mouseover',function(e){
	var tar = e.target;
	if(tar.nodeName.toLowerCase()=='img'){
		if (tar.naturalWidth > MIN_SIZE_DISPLAY || tar.naturalWidth == 0){
			imgSize = "[" + tar.naturalWidth + "px × "+ tar.naturalHeight +"px" + "]";
			
			url = tar.src;
			if(tar.src.match("data:image")){
				url = "(Base64 Image)";
			}
			else if(tar.src.length > URL_MAX_LENGTH){     
				var str = tar.src;
				url = str.substr(0,50) + "..."+str.substr(str.length-50,50);
			}
			
			if (tar.title.indexOf("px ×")== -1){   
				tar.title = "Url  " + url;	
			}	
		}
	}
},false);
})();