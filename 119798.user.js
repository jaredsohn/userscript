// ==UserScript==
// @name           Cookie Injector
// @namespace      BearsWithWings
// @description    Inject Cookie String From Wireshark Dump Into Any Webpage
// @version 2.0.1
// @include        *
// @exclude	   https?://gmail.com/*
// @exclude	   https?://mail.google.com/*
// ==/UserScript==

//Anonomyous function wrapper
(function (){
	//Ensure that there is only one instance of the cookieInjector Object
	if(typeof this["cookieInjector"] == "undefined"){	
		cookieInjector = {};
	}	

	//Make a local refrence to the cookie Injector object to save on typing
	var cI = cookieInjector;
	//Make the cookieInjector object globally viewable
	unsafeWindow['cookieInjector'] = cI;
	
	/**
	* Cookie Injector createDiv function
	* Sets up the cookie injector dialogue
	*/
	cI.createDiv = function(){
		//Create the DIV to contain the Dialog
		cI.dialog = document.createElement('div');
		cI.dialog.id = "cookieInjectorDiv";
		cI.dialog.innerHTML = "<div align='center'>Wireshark Cookie Dump:<br/><input type='text' id='cookieInjectorCookie'/><br/><button onclick='cookieInjector.writeCookie();'>OK</button><button onclick='cookieInjector.hide();'>Cancel</button></div>";
		cI.dialog.style.display = "none";
		cI.dialog.style.position = "fixed";
		cI.dialog.style.opacity = "0.9";
		cI.dialog.style.top = "40%";
		cI.dialog.style.background= "#DDDDDD";
		cI.dialog.style.left = "40%";
		cI.dialog.style.width = "20%";
		cI.dialog.style.zIndex = "99999";
		document.body.appendChild(cI.dialog);
		cI.visible = false;
	} 

	/**
	* Show the dialog
	*/
	cI.show = function(){
		if(!cI.dialog) {
			cI.createDiv();
		}
		cI.dialog.style.display = "block";
		cI.visible = true;
	}

	/**
	* Hide the dialog
	*/
	cI.hide = function(){
		cI.dialog.style.display = "none";
		cI.visible = false;
	}

	/**
	* Gets the wireshark dump string and converts it into cookies
	*/
	cI.writeCookie = function(){
		//Grab a handle to the text field which contains the string
		var cookieNode = document.getElementById('cookieInjectorCookie');
		var cookieText = cI.cleanCookie(cookieNode.value);
		cookieNode.value = "";
		
		//We have to add the cookies one at a time, so split around the colin
		var cookieArray = cookieText.split(";");
		for(var x=0; x<cookieArray.length; x++){
			//We want the path to be the root, the host is filled in automatically 
			//since we are on the same webpage that we captured the cookies on
			document.cookie = cookieArray[x]+"; path=/";
		}		

		alert("All Cookies Have Been Written");
		cI.hide();
	}

	/**
	* Do a little big of cleanup on the cookie string, Mostly we are looking
	* To get rid of the "Cookie: " string that Wireshark prepends to the cookie string
	*/
	cI.cleanCookie = function(cookieText){
		var cookie = cookieText.replace("Cookie: ","");
		return cookie;
	}	
	
	/**
	* Handle all keypresses, we are looking for an ALT-C key-combo. Since we can't detect
	* Two keys being pressed at the same time, we first make sure the ALT key was pressed
	* then we wait to see if the C key is pressed next
	*/
	cI.keyPress = function (e){	
		//Check to see if "C" is pressed after ALT	
		if(e.keyCode == 67 && cI.ctrlFire){
			if(!cI.visible){		
				cI.show();
			}else{
				cI.hide();
			}
		}

		//Make sure the Alt key was previously depressed
		if(e.keyCode == 18){
			cI.ctrlFire = true;
		}else{
			cI.ctrlFire = false;
		}
	}

	//Capture all onkeydown events, so we can filter for our key-combo
	cI.visible = false;
	window.addEventListener('keydown', cI.keyPress,'false');
})();

