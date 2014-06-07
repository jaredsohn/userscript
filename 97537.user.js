// ==UserScript==
// @name           noTheater 
// @namespace      http://userscripts.org/users/296491
// @include        http://www.facebook.com*
// @include        https://www.facebook.com*
// @description    Get rid of the annoying facebook theater
// ==/UserScript==

var noTheater={
	stopOnFeedUpdate:function(event){
		var id=event.target.id;
		if(id){
			if(id.search("stream_story")!=-1){
				noTheater.stopTheater(document.getElementById(id).getElementsByClassName('uiPhotoThumb'));
			}
		}
	},
	stopOnLoad:function(){
		var anchors;
		if(document.getElementById("contentArea").getElementsByClassName('uiPhotoThumb').length>0){
			anchors=document.getElementById("contentArea").getElementsByClassName('uiPhotoThumb');
		}else if(document.getElementById("contentArea").getElementsByClassName("uiMediaThumb").length>0){
			anchors=document.getElementById("contentArea").getElementsByClassName("uiMediaThumb");
		}
		noTheater.stopTheater(anchors);
	},
	stopTheater:function(anchorArr){
		for(var i=0;i<anchorArr.length;i++){
			anchorArr[i].addEventListener('click',function (e) {
				e.stopPropagation();
			},true);
		}
	}
}


window.addEventListener("load", noTheater.stopOnLoad, false);

document.body.addEventListener("DOMNodeInserted", noTheater.stopOnFeedUpdate, false);