// ==UserScript==
// @name        Youtube Enlarger
// @namespace   http://userscripts.org/users/496698
// @description Fixes youtube page size.
// @include     http://www.youtube.com/*
// @include     https://www.youtube.com/*
// @version     3
// @grant       none
// @run-at      document-end
// ==/UserScript==

var refreshrate = 200;

if(document.getElementById("watch7-player") != null){ //Player page
	var YTPlayer;
	var YTMain;
	var YTContent;
	var YTContainer;
	var YTSidebar;
	
	var isPlayList = (document.getElementById("watch7-playlist-bar-controls") != null);
	var YTPlayListBar;
	var YTPlayListData;
	var YTPlayListBarControls;
	var YTPlayListTrayContainer;

	var checkWindowFunc = function(){
		if(YTMain == null){ //Check if variables are initialized.
			initVars();
			return;
		}
		
		
		windowWidth = document.documentElement.clientWidth; 
		// All sizes were calculated for 1920. The ratio converts this to the appropriate size.
		widthRatio = windowWidth / 1903; 
		YTMain.style.width = 1440*widthRatio+"px";
		YTContent.style.width = 1100*widthRatio+"px"
		YTSidebar.style.width = 330*widthRatio+"px"
		//if(YTContainer.className == "transition-content" || YTContainer.className == "transition-content watch-playlist"){ 
		if(!contains(YTContainer.className, "watch-medium")){ //Small window
			YTPlayer.style.width = 1100*widthRatio+"px"
			YTPlayer.style.height = 650*widthRatio+"px"
			YTSidebar.style.marginTop = 0-640*widthRatio+"px"
		}else{ //Large window
			YTPlayer.style.width = 1440*widthRatio+"px"
			YTPlayer.style.height = 800*widthRatio+"px"
		}
		if(isPlayList){
			YTPlayListData.style.width = YTPlayer.style.width;
			YTPlayListBar.style.width = YTPlayer.style.width;
		}
	}

	function initVars(){
		YTPlayer = document.getElementById("watch7-player");
		YTMain = document.getElementById("watch7-main");
		YTContent = document.getElementById("watch7-content");
		YTContainer = document.getElementById("watch7-container");
		YTSidebar = document.getElementById("watch7-sidebar");
		
		if(isPlayList){
			YTPlayListData = document.getElementById("watch7-playlist-data");
			YTPlayListBar = YTPlayListData.children.item(0);
			YTPlayListBarControls = document.getElementById("watch7-playlist-bar-controls");
			YTPlayListTrayContainer = document.getElementById("watch7-playlist-tray-container");
		}
	}

	checkWindowFunc(); //Init vars
	checkWindowFunc(); //Init window resize
	setInterval(checkWindowFunc, refreshrate);
	
	if(isPlayList){
		document.getElementById("watch7-playlist-tray-container").style.visibility = "hidden";
		YTPlayListBarControls.onclick = function(){
			if(YTPlayListTrayContainer.style.visibility == "visible"){
				YTPlayListTrayContainer.style.visibility = "hidden";
			}else{
				YTPlayListTrayContainer.style.visibility = "visible";
			}
		}
	}
}else if(document.getElementById("masthead-subnav") != null){ //Settings
	var YTSubnav;

	var checkWindowFunc = function(){
		if(YTSubnav == null){ //Check if variables are initialized.
			initVars();
			return;
		}
		
		windowWidth = document.documentElement.clientWidth; 
		// All sizes were calculated for 1920. The ratio converts this to the appropriate size.
		widthRatio = windowWidth / 1903;
	}

	function initVars(){
		YTSubnav = document.getElementById("masthead-subnav");
	}

	//checkWindowFunc(); //Init vars
	//checkWindowFunc(); //Init window resize
	//setInterval(checkWindowFunc, refreshrate);
}else{ //Main page - if(document.getElementById("content").children.item(0).children.item(0).children.item(0) != null) to check for recommend
	var YTContent;
	var YTGuide;
	var YTRecommended;
	var YTBrandedPageContainer;

	var checkWindowFunc = function(){
		if(YTContent == null){ //Check if variables are initialized.
			initVars();
			return;
		}
		
		windowWidth = document.documentElement.clientWidth; 
		// All sizes were calculated for 1920. The ratio converts this to the appropriate size.
		widthRatio = windowWidth / 1903; 
		YTGuide.style.width = 200*widthRatio+"px";
		YTContent.style.width = 1600*widthRatio+"px";
		YTContent.style.marginLeft = ((YTGuide.clientWidth)+20)+"px";
		YTBrandedPageContainer.style.width = 1600*widthRatio+"px";
		if(document.getElementById("feed-main-highlights") != null){
			YTRecommended.style.width = 400+"px";
		}
	}

	function initVars(){
		YTContent = document.getElementById("content");
		YTBrandedPageContainer = YTContent.children.item(0);
		YTGuide = document.getElementById("guide");
		YTRecommended = YTContent.children.item(0).children.item(0).children.item(0);
	}

	checkWindowFunc(); //Init vars
	checkWindowFunc(); //Init window resize
	setInterval(checkWindowFunc, refreshrate);
}

function contains(string, stringtosearch){
	return string.search(stringtosearch) > -1
}