// ==UserScript==
// @name           filejungle Auto Click + Enter
// @version        1.0
// @namespace      
// @author         
// @description    
// @include        http://www.filejungle.com/f/*
// @require http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @version 1.0.0
// ==/UserScript==

$(document).ready(function () {
	btn = document.getElementById('regularBtn');
    btn2 = document.getElementById('regularBtn2');
    //btn3=document.getElementById('showSlowDownload');
    //alert(btn3.style.display);
    errBox=document.getElementById('errorBox'); //Please wait for 35 minutes to download the next file
    //alert(errBox);
    if (!errBox) {  // no error click Slow Download
		btn.click();
		//window.setTimeout(function(){document.getElementById("recaptcha_response_field").focus();},0); //無效?
		CaChaFldfocus();
    }

    function CaChaFldfocus(){
        document.getElementById("recaptcha_response_field").focus();
		window.setTimeout(CaChaFldfocus,0);
    }

    window.addEventListener('keypress', function(e){
        if (e.keyCode == 13) {
            btn2.click();
            Downloadstart();
        }
    }, false);
	
    function Downloadstart(){
		btn3=document.getElementById('showSlowDownload');
		//alert(btn3.style.display);
			
		if (btn3.style.display!='none') {
			btn3 = document.getElementById('regularBtn3');
			btn3.click();
		}
        window.setTimeout(Downloadstart,5000); //見鬼了，要加 window 才正常!?
    }

});