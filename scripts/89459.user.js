// ==UserScript==
// @name           LoU UI Tweaks
// @namespace      LoUTweaks
// @description    Hide/Show the information panels
// @include        http://prodgame*.lordofultima.com/*/index.aspx*
// @version        0.9
// ==/UserScript==
(function () {
try {
    var mainLoU_UITweaks = function () {
    try {
	var a, p, titleBar, worldView, srvBar;
	var maxButton, isMax = false; 
	var maxText = "Max", minText = "Min"
	var oLeft = 404, oTop = 62;

	function startCheck() { window.setTimeout(checkIfLoaded, 2000); }

	function checkIfLoaded() {
	try {
	    var isLoaded = false;
	    if (qx.$$domReady == true) {
		a = qx.core.Init.getApplication(); // application
		p = webfrontend.data.Player.getInstance(); // player data
		if (a && p) {
		    if (a.title && a.worldView) {
			titleBar = a.title; // top player info bar
			worldView = a.worldView; // region / city view
			isLoaded = true;
		    }
		}
	    }
	    if (isLoaded) { tweakGuiLoU(); }
	    else { /*console.log("waiting");*/
		startCheck();
	    }
	} catch (e) { console.log(e); }
	}

	// Bugs:
	// 1. srvBar.show
	// 2. a.desktop.addListener "resize"
	// 3. LoU Tweak unit queue

	function tweakGuiLoU() {
	try {
	    srvBar = a.serverBar;
	    
	    maxButton = new qx.ui.form.Button(maxText);
	    maxButton.set({appearance:"button-text-small"}); //width:35, , height:15
	    maxButton.addListener("execute", onFullScreen, this);
	    a.desktop._add(maxButton, { left: 10, top: 35 });
	    
	    //a.desktop.addListener("resize", onResize, this);

	} catch (e) { console.log(e); }
	} // tweakGuiLoU

	//function onResize() {
	//try {
	//    if(worldView){
	//	    var viewWidth = qx.bom.Viewport.getWidth()
	//	    var viewHeight = qx.bom.Viewport.getHeight()
	//	if(isMax){
	//	    worldView.setUserBounds(oLeft,oTop,viewWidth-oLeft,viewHeight-oTop);
	//		console.log("ya 1");
	//	}else{
	//	    worldView.setUserBounds(0,0,viewWidth,viewHeight);
	//		console.log("ya 2");
	//	}
	//    }
	//} catch (e) { console.log(e); }
	//}

	function onFullScreen() {
	try {
	    var desktopItems = a.desktop.__cD;
	    var desktopItem; 
	    
	    for (var item in desktopItems) {
		
		desktopItem = desktopItems[item];
		//console.log(desktopItem);
		
		if (desktopItem == maxButton) {
		    // skip
		} else if (desktopItem == worldView) {
		    var viewWidth = qx.bom.Viewport.getWidth()
		    var viewHeight = qx.bom.Viewport.getHeight()
		    if(isMax){
			desktopItem.setUserBounds(oLeft,oTop,viewWidth-oLeft,viewHeight-oTop);
			isMax = false;
			maxButton.setLabel(maxText);
		    }else{
			desktopItem.setUserBounds(0,0,viewWidth,viewHeight);
			isMax = true;
			maxButton.setLabel(minText);
		    }
		//} else if (desktopItem == srvBar) {
		//    if(isMax) {
		//	srvBar.hide();
		//    }
		//    else {
		//	srvBar.show();
		//	srvBar.syncAppearance();
		//	srvBar.updateAppearance();
		//    }
		//}
		} else {
		    // toggle all others 
		    if (desktopItem.isVisible())
			desktopItem.hide();
		    else
			desktopItem.show();
		}
	    }
	} catch (e) { console.log(e); }
	}

	startCheck();
	console.log("LoU UI Tweaks");

    } catch (e) { console.log(e); }
    } // mainLoU_UITweaks
		
    var louUITweaksScript = document.createElement("script");
    var txt = mainLoU_UITweaks.toString();
    if (window.opera != undefined) txt = txt.replace(/</g, "&lt;");
    louUITweaksScript.innerHTML = "(" + txt + ")();";
    louUITweaksScript.type = "text/javascript";
    document.getElementsByTagName("head")[0].appendChild(louUITweaksScript);
		
} catch (e) { console.log(e); }
})();