// ==UserScript==
// @name          Webshots Image Leecher
// @namespace     webshots.com
// @description   Automatically browses through all of a user's albums and photos and displays all of the full image links on a single page once it has finished. 
// @version       0.1
// @include       http://*.webshots.com/*
// ==/UserScript==



function onUserPage(){

	var gotoAlbum = GM_getValue("albumLinks").split(',')[0];

	GM_setValue("albumLinks", GM_getValue("albumLinks").slice(GM_getValue("albumLinks").indexOf(',')+1));
	
	window.location = gotoAlbum;	

}


/**home page**/
if(document.URL.indexOf("webshots.com/user/") > -1){

	function gePics(){
		
		var hLinks = [];
		
		var yo = document.getElementById('items').getElementsByTagName('img');
		
		for(i=0;i<yo.length;i++){
		
			hLinks.push(yo[i].parentNode.href);
			
		}
	
		if(GM_getValue("albumLinks") == "start"){
		
			GM_setValue("albumLinks", hLinks.toString());
			
		}
		else{
		
			var adOldandNew = GM_getValue("albumLinks")+hLinks.toString()
		
			GM_setValue("albumLinks", adOldandNew);	
		
		}
			
		if(document.getElementById('page-nav').lastChild.previousSibling.getAttribute('rel') != 'next'){
			
			onUserPage();
			
		}
		else{
		
			window.location = document.getElementById('page-nav').lastChild.previousSibling.href;
		
		}
	
	}
	
	
	if(GM_getValue("canHasCheezBurga") == "true"){
	
		gePics();
		
	}
	else{
	
		function setGMs(){
		
			GM_setValue("albumLinks", "start");
			GM_setValue("pageLinks", "start");
			GM_setValue("photoLinks", "start");
			GM_setValue("canHasCheezBurga", "true");
			gePics();		
		
		}
	
		var leechlink = document.createElement("a");
		leechlink.href = '#';
		leechlink.id = 'leech';
		leechlink.style.marginRight = '10px';
		leechlink.style.cssFloat = 'right';
		leechlink.textContent = 'Leech Pics';
		 
		document.getElementById('pageNav1').appendChild(leechlink);	
		
		var elmLink = document.getElementById('leech');
		
		elmLink.addEventListener("click", setGMs, true);	
	
	}

}
	

function onAlbumPage(gotoPic){

	GM_setValue("pageLinks", GM_getValue("pageLinks").replace(gotoPic, ""));
	
	window.location = gotoPic;		

}


if((document.URL.indexOf("webshots.com/album/") > -1) && (GM_getValue("canHasCheezBurga") == "true")){

	var pLinks = [];
	
	var meh = document.getElementById('media').getElementsByTagName('img');
	
	var ml = meh.length;
	
	if(meh.length > 12){
	
		ml = 12;
	
	}
	
	for(j=0;j<ml;j++){
	
		pLinks.push(meh[j].parentNode.href);
		
	}
	
	
	if(GM_getValue("pageLinks") == "start"){
	
		var torep = pLinks.toString().replace(/,/g, '');
	
		GM_setValue("pageLinks", torep);
		
	}
	else{
	
		var allPgelinks = GM_getValue("pageLinks")+pLinks.toString().replace(/,/g, '');
	
		GM_setValue("pageLinks", allPgelinks);	
	
	}	

	if(document.getElementById('album').getElementsByTagName('dd')[0].lastChild.previousSibling.getAttribute('rel') == 'next'){
		
		window.location = document.getElementById('album').getElementsByTagName('dd')[0].lastChild.previousSibling;
		
	}
	else if(GM_getValue("albumLinks").split('http').length == 2){

		var gotoAlbum = GM_getValue("albumLinks");
	
		GM_setValue("albumLinks", "");
		
		window.location = gotoAlbum;	
			
	}
	else if(GM_getValue("albumLinks").length == 0){
	
		var gotoPic = 'http://'+GM_getValue("pageLinks").split('http://')[1];
	
		onAlbumPage(gotoPic);
			
	}	
	else{
		
		onUserPage();	

	}

}

if((document.URL.indexOf("webshots.com/photo/") > -1) && (GM_getValue("canHasCheezBurga") == "true")){	

	var fullSizeLink = document.getElementById('sidebar').getElementsByTagName('a')[4].href;

	if(GM_getValue("pageLinks").split('http').length == 2) {
	
		var joinEm = GM_getValue("photoLinks")+fullSizeLink;
		
		GM_setValue("photoLinks", joinEm);	
		
		var getWrap = document.getElementById('pagewrap');
	
		getWrap.innerHTML = '';
		
		var fullPhotos = GM_getValue("photoLinks").split('http://');
		
		fullPhotos.shift();
		
		for(k=0;k<fullPhotos.length;k++){
		
			var iGottaP = document.createElement("p");
			
			var tehfullLinks = document.createElement("a");			
			tehfullLinks.href = 'http://'+fullPhotos[k];
			tehfullLinks.style.marginLeft = '15px';
			tehfullLinks.textContent = 'http://'+fullPhotos[k];
			
			getWrap.appendChild(tehfullLinks);
			
			getWrap.appendChild(iGottaP);
			
		}		
		
		GM_setValue("canHasCheezBurga", "false");
	
	}

	else if(GM_getValue("photoLinks") == "start"){
	
		GM_setValue("photoLinks", fullSizeLink);
		
		var gotoPic = 'http://'+GM_getValue("pageLinks").split('http://')[1];
		
		onAlbumPage(gotoPic);
		
		
	}
	else{
	
		var joinEm = GM_getValue("photoLinks")+fullSizeLink;
		
		GM_setValue("photoLinks", joinEm);
		
		var gotoPic = 'http://'+GM_getValue("pageLinks").split('http://')[1];
		
		onAlbumPage(gotoPic);


	}


}



