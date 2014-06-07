// Except where noted, (c) Copyright 2007 Rod Knowlton. 
// ==UserScript==
// @name           Tumblr v3 Follow Mode
// @namespace      com.toldorknown.tumblr
// @description    Tumble to Tumble Surfing 
// @include        http://www.tumblr.com/dashboard
// @include        http://www.tumblr.com/dashboard/iframe?*
// @include        http://www.tumblr.com/show/*
// ==/UserScript==

var ID = "FollowerMode";
var refreshEveryMinutes = 5;
var scanFollowed = true;
var scanFollowers = false;


if (! document.URL.match(/tumblr.com\/dashboard\/iframe/)){
	var freshTumbleButton = document.createElement("img");
	freshTumbleButton.src = 
	"data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%" +
	"00%00%002%00%00%00%0F%08%02%00%00%00)%B9%0B%95%00%" +
	"00%00%04gAMA%00%00%D6%D8%D4OX2%00%00%00%19tEXtSoft" + 
	"ware%00Adobe%20ImageReadyq%C9e%3C%00%00%01%CFIDATx" + 
	"%DA%CC%95%DDn%01A%14%C7%07KY%96T%DA%B4%89%A6%84%A4" +
	"H%5C%7B%02%2F%C0%BDp%ED%E3%09%5C%F3%02%E2%9E%17%20" +
	"%EE%BD%00%2F%40%DA%B8hC%D2%A6MJ%A5B%09%FD%CF%9E%DA" +
	"~%A4%CD%8EH%E8d29gfv%E6%B7%FFsf%C6%B0%5E%AF%D9%FF%" +
	"2B%D2%A7%B9Z%B1%F1%98M%A7l%B9%DC7%85%C9%C4d%99%B9%" +
	"5C%DC%F8%865%9B%B1~%9F%B7%07%2Cf3%F3%FB%99%C3%B1%C" +
	"1B%1C%F5%98%E6%C3!%AA%E6%DAC!%93%D3)%B8%DD%B4%DB%3" +
	"D%F2x%F4%E7%2F%16%1C%23%12%81f*%16%02%A7%A7%D3s%AB" +
	"%F5T%AFcur%3D%F9%BC%2C%8C5%2C%97%CF%D2ig4%AA%3F%15" +
	"%F9%83Dr%BBU%AC%F9%5Cd%F5%93D%E2%3C%95%FA%AA%1F%B5" +
	"%A4%1C%24%81%2B%87%C34%FA%D2%E9H%8A%A2%B9%D4%83%BF" +
	"%D2~%EC%CF%A2%0Ad%14%0F%3D%08%B04*%11%40%BF%9BL%86" +
	"%EC%DBR%E9%B1%D1%40%85%01%17%FD%93v%FB%BEV%83%A1%0" +
	"9%86%99%DDd%12%9F%EBl%A3%DE%0C%928%16vz%1B%0CH%12%" +
	"92%E18%16%83~%C0%C5%D0e%A1%80%9E%BBb%11%DB%BF%F6z4" +
	"%04%83%BE%85%8D%1E%CA3%91hn%81%F5%23%88%FC%5C%AB%E" +
	"9E%D1%24%D90%07%9DW%95%0A%94%83Z%A0G%88%B5%99%E2E%" +
	"0D%A2%C1%B0%CB%B9F%BA%2C'%93%D3x%9C%A0%91R%00%BA%C" +
	"8%E5%22%CD%26%885%C1%84%89%8C%1B%B5%2C%96%1D%B1%00" +
	"q%9D%CD%C2F%80%20%0CZ%CDE%7D%A8V%B7X%CEf%E3B%7D%3C" +
	"%3E%B80F%A3%C3%3F%3Av%3B%0B%06%11%BDMny%BD%BC%3D%2" +
	"C%99%A20%9F%8F2j%83%25I%2C%10%E0w%06%AEV%3C%8E%7B." +
	"%40%C1%9B%A8%86%EF%B7%93h%B5%F2%FA%0F%CA%BB%00%03%" +
	"002%D5%C9%C9%BD%D8%AE%1E%00%00%00%00IEND%AEB%60%82";

	var freshTumbleLink = document.createElement("a");
	freshTumbleLink.style.visibility = "hidden";
	freshTumbleLink.style.textDecoration = "none";
	freshTumbleLink.id = "fresh_button";
	freshTumbleLink.appendChild(freshTumbleButton);


	var dashboardControls = document.getElementById("dashboard_controls");
	dashboardControls.appendChild(freshTumbleLink);
	GM_registerMenuCommand("Surf Fresh Followers", function() {
		scanForFreshness("followers");
	});
	watchForFreshFriends();
} else {
	// GM_log(document.URL);
	var tumble_regex = /src=(.*)/;
	var match_result = document.URL.match(tumble_regex);

	if (match_result ){
		var thisTumble = decodeURIComponent(match_result[1]);
		thisTumble = thisTumble.match(/(http:\/\/[^\/]+\/)/)[1];
		// GM_log(thisTumble);
		removeFromFreshList(thisTumble);
		updateFreshness(thisTumble);
		var next_fresh = getNextFresh();
		if ( next_fresh != ''){
			insertNextFriendLink(next_fresh);
		}
	}

}



function watchForFreshFriends(){

	if (scanFollowers){
		scanForFreshness("followers");
	}
	if (scanFollowed){
		scanForFreshness("following");
	}
	
	watchTimer = window.setTimeout(watchForFreshFriends, (refreshEveryMinutes*60*1000));
}


function scanForFreshness(who){
	// GM_log("scanning for freshness from " + document.location.href);	
	
	var d = new Date();
	// GM_log("checking for fresh " + who + ": " + d.toTimeString());

	var iframe = document.createElement("iframe");
	iframe.addEventListener("load",getFollowed,false);
	iframe.width = 1;
	iframe.height = 1;
	iframe.style.visibility = "hidden";
	iframe.src = "http://www.tumblr.com/" + who;
	document.documentElement.appendChild(iframe);

	function getFollowed(){
		var followedStats = load(ID+'followedStats', new Object());
		var followedURL="";
		var iframeDoc = iframe.contentDocument;
		var followed = unsafeWindow.document.getElementsByClassName("username",iframeDoc);

		// for(var i=0; i < followed.length; i++){
		var i=1;
		function delayedLoop(){
			followedURL = followed[i].getElementsByTagName("a")[0].href;
			if(followedStats[followedURL] == null){
				updateFreshness(followedURL);
				followedStats = load(ID+'followedStats', null);
			} else {
				checkFreshness(followedURL,followedStats[followedURL]);					
			}
			
			if(i <= followed.length)
				{
					window.setTimeout(delayedLoop, 1000);
				}
			i++
		}
		
		delayedLoop();
	}
	
	if(getNextFresh() == ""){
			freshTumbleLink.style.visibility = "hidden";
	}
}

function showFreshButton(){
	
	if(freshTumbleLink.style.visibility == "hidden"){
		freshTumbleLink.href = getNextFresh();
		freshTumbleLink.style.visibility = "visible";
	}
}


function addToFreshList(url){
	// GM_log("adding to fresh list: " + url);
	var fresh_list = load(ID+'freshlist','');
	var list_entry = url + ';';
	if( fresh_list.indexOf(list_entry) < 0){
		fresh_list += list_entry;
		save(ID+'freshlist', fresh_list);
	}
	
	showFreshButton();

}

function removeFromFreshList(url){
	// GM_log("removing from fresh list: " + url);
	var fresh_list = load(ID+'freshlist','');
	var list_entry = url + ';';
	if( fresh_list.indexOf(list_entry) != -1 ){
		fresh_list = fresh_list.replace(list_entry,"");
		save(ID+'freshlist', fresh_list);
	}
}

function isOnFreshList(url){
	var fresh_list = load(ID+'freshlist','');
	(fresh_list.indexOf(url) != -1) ? true : false;
}

function getNextFresh(){
	var fresh_list = load(ID+'freshlist','');
	var fresh_regex = /^([^;]*)/;
	var next_fresh = ''; 
	var match_result = fresh_list.match(fresh_regex);
	if(match_result){
		next_fresh = match_result[1];
	}

	return next_fresh;
}

function checkFreshness(tumblelog, last_read){
	

	var api_url = tumblelog + 'api/read?num=1'
	var post_total_regex = /total=\"(\d+)\"/;
	
	if (! isOnFreshList(tumblelog)){
	// GM_log("checking freshness" + tumblelog + " " + last_read);
	var d = new Date();
	// GM_log("hitting api for " + tumblelog + ": " + d.toTimeString());
	

	GM_xmlhttpRequest({
		method: 'GET',
		url: api_url,
		header: { 'User-Agent': 'Mozilla/4.0 (compatible) Tumblr Follow Mode'},
		onload: function(responseDetails){
			var status = responseDetails.status;
			if ( status == '200'){
				var count = 0;
				var match_result = responseDetails.responseText.match(post_total_regex);
				// GM_log("checkFreshness response: " + responseDetails.responseText);
				if (match_result){
					count = match_result[1];
					// GM_log("checkFreshness count " + count);
				}
				if (parseInt(count) > last_read) {
					// tumblelog_node.innerHTML += ' *';
					addToFreshList(tumblelog);
				}
			} else {
				// GM_log("checkFreshness error: " + status + " " + responseDetails.statusText);
			}
		}
	});
	}
}
function updateFreshness(tumblelog){
	// GM_log("updateFreshness " + tumblelog);
	
	var api_url = tumblelog + 'api/read?num=1'
	var post_total_regex = /total=\"(\d+)\"/;
	var d = new Date();
	// GM_log("hitting api for " + tumblelog + ": " + d.toTimeString());


	GM_xmlhttpRequest({
		method: 'GET',
		url: api_url,
		header: { 'User-Agent': 'Mozilla/4.0 (compatible) Tumblr Follow Mode'},
		onload: function(responseDetails){
			var status = responseDetails.status;
			if ( status == '200' ) {
			var match_result = responseDetails.responseText.match(post_total_regex);
			if (match_result){
				count = match_result[1];
				updateStats(tumblelog,count);
			}
			 }else {
				// GM_log("updateFreshness error: " + status + responseDetails.statusText);
			}

		}
	});
}

function updateStats(tlog,count){
	// GM_log("updateStats " + tlog + " " + count);
	var followedStats = load(ID+'followedStats', new Object());
	followedStats[tlog]=count;

	save(ID+'followedStats',followedStats);
}

function insertNextFriendLink(fresh_url){

	var tumblrMenu = document.getElementsByTagName("div")[0];
	var nextFriendLink = document.createElement('a');
	nextFriendLink.href = "#";

	nextFriendLink.addEventListener('click', function(event){
		parent.location.href = fresh_url;
	},
	true);

	var nextFriendDiv = document.createElement('div');
	nextFriendDiv.setAttribute('style', 
	'display:block;' +
	'float:left;' +
	'height: 25px;' +
	'background-color: #858585;' +
	'color: #BCBCBC;');
	nextFriendDiv.innerHTML = '&#9656;';

	nextFriendLink.appendChild(nextFriendDiv);
	tumblrMenu.insertBefore(nextFriendLink,tumblrMenu.firstChild);
}

// Utility functions from brasil's Check New Followers script
// ----[Utility]-------------------------------------------------
function load(name, def){
	var obj = eval(GM_getValue(name));
	return obj==null? def : obj;
}

function save(name, obj){
	GM_setValue(name, obj.toSource());
}

