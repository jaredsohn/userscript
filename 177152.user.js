// ==UserScript==
// @name           zUrl.ir Link shortner service for Javab24.com
// @namespace      ADEL
// @description    zUrl.ir Link shortner service for Javab24.com
// @version        1.0
// @lastupdated    2013-09-03
// @include        http://*.javab24.com/*
// ==/UserScript==

// به دلیل استفاده از  سرویس 
// zUrl.ir
// برای کوتاه کردن لینک ها در سایت جواب24، این اسکریپت رو نوشتم 
// تا بتونم هر چه سریع تر و راحت تراین کار رو انجام بدم 
// به این فکر افتادم که اسکریپت رو در اختیار تمام کاربر های محترم سایت جواب24 
// قرار بدم تا  شاید بتونم کمکی کرده باشم
// ;)


var ScriptDebug = false;
	
var pages = {

btn: {			// button

		// ساختن دکمه برای صفحه مورد نظر


		GenerateButton : function () {
		
			if (ScriptDebug) { GM_log("Call: GenerateButton()"); }
			
			var new_button = document.createElement("input");
			var btnLoc;
			
			new_button.className = "btn btn-small btn-success";
			new_button.type = "button";
			new_button.value = "کوتاه کردن لینک  با zUrl.ir"; 
			new_button.setAttribute("onsubmit", "return false" );
			
			btnLoc = document.dc_submit; // مکان قرار دادن دکمه
			
			if (btnLoc) {
				btnLoc.insertBefore(new_button, btnLoc.firstChild);
				new_button.addEventListener("click", pages.btn.getData, false);
			}
			
			return new_button;

		}, // پایان ساختن دکمه
	

        // تابع گرفتن و کوتاه کردن لینک توسط ای پی آی سایت 
       getData : function (){
                    
                    var link=prompt("لطفا لینک مورد نظر را وارد کنید:","");

                    if (link!=null && link!=""){
                
                    GM_xmlhttpRequest({
                        method: "GET",
                        url: "http://zurl.ir/api.php?url=" +link ,
                        onload: function(response) {
                        //alert(response.responseText);
                        document.dc_submit.dc_reply_content.value += response.responseText;
                        document.dc_submit.dc_reply_content.value  += "\r\n";
                        }
                    });
                
                    }

        }
       
}
                
}

pages.btn.btnID = pages.btn.GenerateButton();