// ==UserScript==
// @name        WaniKani Real Numbers
// @namespace   penx.scripts
// @description Replaces 42+ with the real number using WaniKani API v1.0
// @include     https://www.wanikani.com/*
// @version     2.8
// @run-at		document-end
// @updateURL	https://userscripts.org/scripts/source/153756.meta.js
// @require		http://code.jquery.com/jquery-1.8.3.min.js
// ==/UserScript==

function main(){

	var apikey = GM_getValue("apikey");
	if(!apikey){
		
		if(window.location.href.indexOf("account") != -1){
			
			retrieveAPIkey();
			apikey = GM_getValue("apikey");
			
		}else{
		
			var okcancel = confirm("WaniKani Real Numbers has no API key entered!\nPress OK to go to your settings page and retrieve your API key!");
		
			if(okcancel == true){
				
				window.location = "https://www.wanikani.com/account";
				
			}
		}
		
	}
	
	var doneReviews = GM_getValue("doneReviews", true);
	var lastUpdate = GM_getValue("lastUpdate", "0");
	var currentTime = new Date().getTime();
			
	if((currentTime-lastUpdate) > 120000){
	
		GM_setValue("lastUpdate", currentTime.toString());
		doneReviews = true;
		
	}
	
	
	if(window.location.href.indexOf("review") != -1 || window.location.href.indexOf("lesson") != -1){
	
		GM_setValue("doneReviews", true);
		
	}else{

		var numberReviews = document.getElementsByClassName("reviews")[0].getElementsByTagName("span")[0];
		var numberLessons = document.getElementsByClassName("lessons")[0].getElementsByTagName("span")[0];
		
		if(numberReviews.innerHTML == "42+" || numberLessons.innerHTML == "42+"){
			
			if(apikey){
						
				if(doneReviews){
				
					$.getJSON('https://www.wanikani.com/api/v1/user/'+ apikey +'/study-queue', function(data){
						setTimeout(function() {
							if(data.error){
								alert("API Error: "+data.error.message);
							}else{
								GM_setValue("numberReviews", data.requested_information.reviews_available);
								GM_setValue("numberLessons", data.requested_information.lessons_available);
								GM_setValue("doneReviews", false);
								displayReal(numberReviews, numberLessons);
							}
						}, 0);
					});
					
				}else{
				
					displayReal(numberReviews, numberLessons);
				
				}
				
			}
		}
	}
}

window.addEventListener("load", main, false);

GM_registerMenuCommand("WaniKani Real Numbers: Manually enter API key", setAPIkey, null, null, "R");
GM_registerMenuCommand("WaniKani Real Numbers: Reset API key", resetAPIkey, null, null, "e");

function resetAPIkey(){

	GM_deleteValue("apikey");
	alert("WaniKani Real Numbers API key reset!");
	
}

function retrieveAPIkey(){

	var apikey = document.getElementsByClassName("span6")[7].getAttribute("value");
	alert("WaniKani Real Numbers API key set to: "+apikey);
	
	if(apikey){
	
		GM_setValue("apikey", apikey);
		GM_setValue("doneReviews", true);
		
	}
	
}

function setAPIkey(){

	var apikey = prompt("Enter API key for WaniKani Real Numbers:");
	
	if(apikey){
	
		GM_setValue("apikey", apikey);
		GM_setValue("doneReviews", true);
	}
	
}

function displayReal(numberReviews, numberLessons){

	numberReviews.innerHTML = GM_getValue("numberReviews");
	numberLessons.innerHTML = GM_getValue("numberLessons");
	
}