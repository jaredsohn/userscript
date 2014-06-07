// ==UserScript==
// @name           FunnyJunkCustomizer
// @namespace      fj.customizer.mobilegaers
// @description    Customize funnyjunk
// @include        http://funnyjunk.com/*
// @include        http://www.funnyjunk.com/*
// ==/UserScript==
	var upButtonImage="http://keepyourcopyrights.org/images/thumb-up.png";
	var downButtonImage="http://www.foe.org.im/1010ThumbsDown.jpg";
	//var mainBackground="#0000FF";
	//var darkColor="#FF0000";
	//var lightColor="#00FF00";
	
	GM_registerMenuCommand("Toggle Ads (Refresh required)",toggleAds);
	GM_registerMenuCommand("Toggle Button Image Swapping",toggleButton);
	//GM_registerMenuCommand("Toggle Background Color Swapping",toggleBackground);
	
	mainCode();
	
	function mainCode(){
		if(GM_getValue("adSwitch","true")){
			// Remove ads by IDS's located in HTML
			document.getElementById("google_ads_div_Side-Banner").innerHTML="";
			document.getElementById("google_ads_div_TopBanner").innerHTML="";
			document.getElementById("google_ads_div_Rectangle").innerHTML="";
		}
		var upBTN = document.getElementById("tUpBig");
		var dnBTN = document.getElementById("tDnBig");
		
		if(GM_getValue("buttonSwitch","true")==true){
			//Change thumb icons

			if(!(upBTN===null || dnBTN===null)){
				//var container = document.getElementById("f");
				upBTN.style.backgroundImage="url("+upButtonImage+")";
				upBTN.style.backgroundPosition="0px 0";
				
				dnBTN.style.backgroundImage="url("+downButtonImage+")";
				dnBTN.style.backgroundPosition="0px 0";
			}
		}
		else if(!(upBTN===null || dnBTN===null)){
			upBTN.style.backgroundImage="";
			upBTN.style.backgroundPosition="";
			dnBTN.style.backgroundImage="";
			dnBTN.style.backgroundPosition="";
		}
		
		/*
		if(GM_getValue("backgroundSwitch","true")==true){
			document.body.style.background=mainBackground;
			document.getElementById("contentLeftTop").style.background=mainBackground;
			document.getElementById("contentRightTop").style.background=mainBackground;
			document.getElementById("content").style.background=mainBackground;
			document.getElementById("content").style.border="0px";
			document.getElementById("contentBottom").style.background=mainBackground;
			document.getElementById("contentBottomRight").style.background=mainBackground;
			
			alert("adding");
			addCss("#contentLeft ul.menu li {background:"+drakColor+";height:21px;margin-bottom:1px;overflow:hidden;white-space:nowrap;}");
			alert("Added");
		}*/
	}
	
	function addCss(cssCode) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		styleElement.appendChild(document.createTextNode(cssCode));
		document.getElementsByTagName("head")[0].appendChild(styleElement);
	}

	function toggleAds(e){
		GM_setValue("adSwitch",!GM_getValue("adSwitch","true"));
		alert("Ad removing now: "+ getString(GM_getValue("adSwitch"))
			+"\nYou must refresh page if re-enabling ads");
		mainCode();
	}
	function toggleBackground(e){
		GM_setValue("backgroundSwitch",!GM_getValue("backgroundSwitch","true"));
		alert("Background switching now: "+getString(GM_getValue("adSwitch")));
		mainCode();
	}
	function toggleButton(e){	
		GM_setValue("buttonSwitch",!GM_getValue("buttonSwitch","true"));
		alert("Button switching now: "+getString(GM_getValue("adSwitch")));
		mainCode();
	}
	function getString(val){
		if(val)
			return "Enabled";
		else
			return "Disabled";
	}