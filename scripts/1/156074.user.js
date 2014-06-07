// ==UserScript==
// @name	DailyBitcoins Auto-Refresh Bar
// @namespace	dailyBitcoinsAutoRefreshBar 
// @icon	http://dailybitcoins.org/favicon.ico
// @description	Adds a customisable auto-refresh bar to the top of dailybitcoins.org's Main page
// @include	http://dailybitcoins.org/
// @include	http://dailybitcoins.org/#
// @include	http://dailybitcoins.org/index.php
// @version	1.0
// ==/UserScript==


(function(){

	var script = function(){

		var autorefreshDelay;

		var onTextfieldEvent = function(){
			var d = Number($("#textfield").val());
			if(!isNaN(d).valueOf())
				sessionStorage.setItem("delay", d);
				autorefreshDelay = d; 
			}

		autorefreshDelay = sessionStorage.getItem("delay");
		if (autorefreshDelay == null) autorefreshDelay = 10;

		var navbar = $(".navbar-inner");

		var checkbox = document.createElement('input');
		checkbox.id = "checkbox";
		checkbox.type = 'checkbox';
		checkbox.checked = true;
		checkbox.autofocus = true;

		var textfield = document.createElement('input');
		textfield.id = "textfield";
		textfield.type = 'text';
		textfield.size = '2';
		textfield.addEventListener("keyup", onTextfieldEvent, false);
		textfield.addEventListener("keypress", onTextfieldEvent, false);

		navbar.before("Auto-refresh: ", checkbox, " Refresh when timer reaches: ", textfield);
		$("#textfield").val(autorefreshDelay);

		//
		// NB:
		// This function is an override. If this script goes screwy in the future, look here first.
		//
		update = function(){		
			//this is just a straight copy and paste
			timeLeft--;
			$('#send').html('Wait ' + timeLeft + ' seconds...');
	
			if(timeLeft <= 0) {
				clearTimeout(timer);
				$('#send').html('Send');
				$('#send').removeClass('disabled');
			}

			//but I've added the autorefresh below
			if((timeLeft < autorefreshDelay) && ($("#checkbox").attr("checked") == "checked")){
				document.location.reload();
			}
		}
	}

   var injectScript = function(){
	    console.log("Injecting Auto-Refresh Bar");

            var injectScriptElement = document.createElement("script");
            var txt = script.toString();
            injectScriptElement.innerHTML = "(" + txt + ")();";
            injectScriptElement.type = "text/javascript";
            injectScriptElement.id = "autorefreshBar";
            document.getElementsByTagName("head")[0].appendChild(injectScriptElement);
    }
    
    //GreaseMonkey entry point
    injectScript();

})();