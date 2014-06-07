// ==UserScript==
// @name                 Don't waste your time!
// @description          Display a motivational "Don't waste your time" message on every website.
// @version              0.1
// @date                 08/29/2008
// @author               Andre Gil
// @include              http*://*
// @exclude              http*://*localhost*
// @exclude              http*://*127.0.0.1*
// ==/UserScript==

(function () {

	var _toastHeight = 0;
	var _toast;
		
	function hideToast() {
		
		_toast = document.getElementById("motivationalToasterDiv_GM");
		if( _toast == undefined || _toast == null ) return;

		var _hideInterval = window.setInterval( function(){
			_toastHeight--;
			_toast.style.height = _toastHeight + "px";

			if( _toastHeight <= 0 ) {
				clearInterval( _hideInterval );
				_toast.style.display = 'none';
			}
		}, 5);
		
	}

	function showToast() {

		_toast = document.getElementById("motivationalToasterDiv_GM");
		if( _toast == undefined || _toast == null ) return;

		_toast.style.display = '';			

		var _showInterval = window.setInterval( function(){
			_toastHeight += 5;
			_toast.style.height = _toastHeight + "px";

			if( _toastHeight >= 35 ) {
				clearInterval( _showInterval );
				setTimeout( hideToast, 3000 );
			}
		}, 10);
		
	}

	function createToaster() {
		try{
			var toastDiv = document.createElement( "DIV" );
			toastDiv.id = "motivationalToasterDiv_GM";
			toastDiv.style.display = "none";
			toastDiv.style.position = "fixed";
			toastDiv.style.right = "0px";
			toastDiv.style.bottom = "0px";
			toastDiv.style.backgroundColor = "#000000";
			toastDiv.style.opacity = .70;
			toastDiv.style.zIndex = 999999;

			var toastTextDiv = document.createElement( "DIV" );
			toastTextDiv.id = "motivationalToasterTextDiv_GM";
			toastTextDiv.appendChild( document.createTextNode( "Don't waste your time!" ) );
			toastTextDiv.style.padding = "3px";
			toastTextDiv.style.width = "350px";
			toastTextDiv.style.height = "0px";
			toastTextDiv.style.textAlign = "center";
			toastTextDiv.style.color = "#FFFFFF";
			toastTextDiv.style.fontFamily = "verdana";
			toastTextDiv.style.fontWeight = "bold";
			toastTextDiv.style.fontSize = "16px";
			toastDiv.appendChild( toastTextDiv );
		
			var bdy = document.getElementsByTagName("BODY")[0];

			if( bdy != undefined && bdy != null ) {
				bdy.appendChild( toastDiv );
				showToast();
				window.setInterval( showToast, GM_getValue("motivationalToasterTime") );
			}
		}catch(ex){}
	}

	function setDefaultValues() {
		if( GM_getValue("motivationalToasterTime") == undefined )
			GM_setValue( "motivationalToasterTime", 1 * 1000 * 60 );
	}

	function setToasterTime() {
		try{
			var toasterTime = prompt( "Please type the interval in minutes (numbers only)", 1 );

			if( toasterTime != undefined && toasterTime != null && toasterTime > 0 ) {
				GM_setValue( "motivationalToasterTime", toasterTime * 1000 * 60 );
				alert("This change will only take effect after you refresh opened pages.");
			}else{
				alert("I said NUMBERS ONLY! ¬¬'");
			}
		}catch(ex){
			alert("I said NUMBERS ONLY! ¬¬'");
		}
	}

	setDefaultValues();
	GM_registerMenuCommand( "Don't waste your time! (Change interval)", setToasterTime );

	createToaster();

})()
