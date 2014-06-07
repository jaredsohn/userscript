// ==UserScript==
// @name        deviantArt - DevWatch Duplicate Destroyer
// @author		Nuclearo
// @namespace   NuclearGenom
// @description Removes duplicates from your dA inbox
// @include     http://www.deviantart.com/messages/*
// @date        2013/11/12
// @source      http://userscripts.org/scripts/review/173689
// @updateURL   https://userscripts.org/scripts/source/173689.meta.js
// @downloadURL https://userscripts.org/scripts/source/173689.user.js
// @version     0.99
// @lisence		GPL v2
// @grant		none
// ==/UserScript==

/****
Uses code from Timid Script - http://userscripts.org/users/TimidScript
****/

var deviations = {};
var deleted;
var originURL;
var timeoutLength = 400;

function cleanInbox() {
	deviations = {};
	deviations.length = 0;
	deleted=false;
	$("#DuplicateDeleterButton").addClass("active").off("click");
	originURL = document.URL;
	cleanPage();
}


function cleanPage () {
	try{
		var boxes = $(".mcbox");	//get all the message boxes
		deleted = false;
		//the boxes will always be there, their content might be late, so we check first.
		if (boxes.find(":contains('Loading Message...')").length>0)
			setTimeout(cleanPage,timeoutLength); //If the content wasn't loaded yet, wait a bit more.
		else {
			boxes.filter(":has(.mcb-line)").each(function(){	//sometimes "This deviation is no longer available". V1.0 will delete those too.
				var id = $(this).find(".mcb-title a").attr("href").match(/\d+$/);
				if (!(id in deviations)){
					deviations[id]=$(this).find(".mcb-who a").text();
					deviations.length++;
				}
				else if(deviations[id]!==$(this).find(".mcb-who a").text()){
					$(this).find(".mcx").click();
					deleted=true;
				}
			});

			var next = $(".r.page"); //check for extra pages
			if(next.length==1){
				if (deleted){ //If you deleted anything, continue on this page.
					setTimeout(cleanPage,timeoutLength);
				}
				else { //If this page is done, get the nest page.
					deleted=false;
					next.click();
					setTimeout(cleanPage,timeoutLength);
				}
			}
			else { //If there is no next page our work here is done.
				location.assign(originURL);
				$("#DuplicateDeleterButton").removeClass("active").on("click",cleanInbox);
			}
		} 
	}catch(error){
		console.log(error);
	}
}

function placeButton (){
	if(document.URL.indexOf("www.deviantart.com/messages/#view=deviations")!==-1){
		if (!$("#DuplicateDeleterButton").length){
			var mczone = $(".mczone-filter");
			if(mczone.length===1){
				var button = $(document.createElement("div"));	//the delete button
				button.attr("id","DuplicateDeleterButton");
				button.addClass("f1");
				button.text("Delete Duplicate Deviations");            
				button.click(cleanInbox);
				var spot = mczone.find("tr");
				var parenTD = document.createElement("td"); //enclosing td for the button
				parenTD.setAttribute("class","f");
				$(parenTD).append(button);
				spot.append(parenTD);
				//create a separator
				// var divl = document.createElement("div");
				// divl.setAttribute("class","dvl");
				// spot.insertBefore(divl,parenTD);
			}
		}
	}
	else if (document.getElementById("DuplicateDeleterButton")){
		var parenTD=document.getElementById("DuplicateDeleterButton").parentElement;
		parenTD.removeChild(document.getElementById("DuplicateDeleterButton"));
		parenTD.parentElement.removeChild(parenTD);
	}

}

function getNextPage()
{
	var next = $(".r.page");
	//GM_log(next);
	if (next.length > 0)
	{
		next.click();
		return true;
	}
	return false;
}


$(placeButton);
// document.addEventListener("DOMSubtreeModified", placeButton, true);
obs = new window.MutationObserver(placeButton);
obs.observe(document,{subtree:true, childList: true});