// ==UserScript==
// @name           Show full size links in Twitpic
// @namespace      fslinksTwitpic
// @description    Show links to full size images in Twitpic. ／Twitpic でフルサイズ画像へのリンクを表示します。 Special Thanks: kapow751
// @include        http://twitpic.com/*
// @include        https://twitpic.com/*
// ==/UserScript==

(function(){
if(document.URL.match(/https?:\/\/twitpic.com\/photos\//)) showLinksInListPage();
else showLinksInEachPage();

function showLinksInListPage(){
	var header = document.getElementById("infobar");
	allLinksDiv = document.createElement("div");
	allLinksDiv.id = "profile-photo";
	allLinksDiv.className = "left";
	allLinksDiv.style.padding = "10px"
	allLinksDiv.innerHTML = "All links to full size images:<br/>";
	header.appendChild(allLinksDiv)
	//header.parentNode.insertBefore(allLinksDiv, header.nextSibling);
	
	count = 0;
	
	document.body.addEventListener('AutoPagerize_DOMNodeInserted',function(evt){
        var node = evt.target;
        //var requestURL = evt.newValue;
        //var parentNode = evt.relatedNode;
        handleListPage(node);
    }, false);
	handleListPage(document);
	
}
function handleListPage(node){
	var divs = node.getElementsByClassName("user-photo");
	var fullSizePages = new Array();

	for(var i=count; i<count+divs.length; i++){
		var tmp = document.createElement("a");
		tmp.id = i;
		tmp.innerHTML = "["+i+"]";
		allLinksDiv.appendChild(tmp);
	}
	
	for(var i=count; i<count+divs.length; i++){
		var fullSizePage = divs[i-count].getElementsByTagName("a")[0].href+"/full";

		divs[i-count].style.paddingBottom = "5px";
		let j = i;
		let c = count;
		GM_xmlhttpRequest({
		  method:"GET", 
		  url:fullSizePage ,
		  onload:function(x){
			var uri = getImageUriFromText(x.responseText)
			var link = document.createElement("a");

			link.href = uri;
			link.innerHTML = j+":[full size image]";
    	    divs[j-c].parentNode.appendChild(link);

//    	    var link2 = link.cloneNode(false);
//    	    link2.innerHTML = "["+j+"]";
    	    document.getElementById(j).href = uri;
		  }
		});
	}
	count += divs.length;
}
function showLinksInEachPage(){
	document.body.addEventListener('AutoPagerize_DOMNodeInserted',function(evt){
        var node = evt.target;
        var requestURL = evt.newValue;
        //var parentNode = evt.relatedNode;
        handleEachPage(node, requestURL);
    }, false);
	handleEachPage(document, document.URL);

}
function handleEachPage(node, url){
	//var controls = node.getElementById("photo-controls");
	//if(!controls) return;
	
	//autopagerize されたときのため
	var caption;
	var divs = node.getElementsByTagName("div");
	for(var i=0; i<divs.length; i++){
		if(divs[i].id == "view-photo-caption"){
			caption = divs[i];
			break;
		}
	}
	
//	var caption = node.getElementById("view-photo-caption");
	if(!caption) return;
	
	var fullSizePage = url+"/full";
	GM_xmlhttpRequest({
	  method:"GET", 
	  url:fullSizePage ,
	  onload:function(x){
		var uri = getImageUriFromText(x.responseText)
        var link = document.createElement("a");
      	link.href = uri;
	    link.innerHTML = "[full size image]";
	    link.style.display = "block";
		link.style.paddingTop = "5px";
		link.style.textAlign="center";
	    
	    caption.appendChild(link);
	  }
	});
	
}
function getImageUriFromText(text){
	var text = text.replace(/\n/g, "");
	var imgs = text.match(/<img [^>]*>/g);
	var uri = imgs[imgs.length-2].match(/ src="([^"]+)"/)[1];
	
	return uri;
}
})();