// ==UserScript==
// @name        Uzdarbis Topic Bump
// @namespace   Uzdarbis
// @include     http://uzdarbis.lt/*
// @exclude     http://uzdarbis.lt/top
// @exclude     http://uzdarbis.lt/ips.topics.php
// @version     0.1.6
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js
// @grant  GM_xmlhttpRequest
// @grant  GM_getValue
// @grant  GM_setValue
// ==/UserScript==

//0.1.6
//Pop-up alert langas, bandant pakelti temą panaikintas.
//

jQuery.noConflict();

var myTopics_str = GM_getValue("UTB_myTopics","t207796,t280802");
var cachedTime = GM_getValue("UTB_cachedTime", "0");

var myTopics = myTopics_str.split(",");

var totalCount = myTopics.length;
var parsedCount = 0;

function insertVisuals() {
	jQuery("<div id='UTB_menu_hider'>UTB nustatymai</div>").appendTo("#ipboard_body")
												.css({
													"position": "absolute",
													"top": "0",
													"right": "0",
													"z-index": "2000",
													"width": "150px",
													"height": "20px",
													"background-color": "black",
													"color":"white",
													"text-align":"center",
													"font-family":"Calibri",
												});
	jQuery("<div id='UTB_info'></div>").appendTo("#ipboard_body")
												.css({
													"position": "absolute",
													"top": "0",
													"right": "150px",
													"width": "200px",
													"height": "20px",
													"color":"white",
													"background-color": "#2E9F9F",
													"text-align":"center",
													"font-size":"10px",
													"font-family":"Calibri",
													"line-height": "18px",
												});
	jQuery("#UTB_menu_hider").css("cursor","pointer");
	jQuery("<div id='UTB_menu'></div>").appendTo("#ipboard_body")
										.css({
											"position": "absolute",
											"top": "100px",
											"right": "0px",
											"padding": "5px 15px",
											"background-color": "rgba(255,255,255,0.5)",
											"-webkit-border-bottom-left-radius": "5px",
											"-moz-border-radius-bottomleft": "5px",
											"border-bottom-left-radius": "5px",
											"z-index": "5000",
											"font-family":"Calibri",
										});
	jQuery("<div id='UTB_settings'></div>").appendTo("#ipboard_body")
										.css({
											"display": "none",
											"position": "absolute",
											"top": "20px",
											"right": "0px",
											"padding": "5px 15px",
											"background-color": "rgba(255,255,255,0.5)",
											"-webkit-border-bottom-left-radius": "5px",
											"-moz-border-radius-bottomleft": "5px",
											"border-bottom-left-radius": "5px",
											"z-index": "2000",
											"font-family":"Calibri",
											"text-align": "center",
										});
}
function fillSettings() {
	jQuery("#UTB_settings").append("T: <input type='text' style='font-size:11px;padding:4px;margin-bottom:2px;' id='UTB_settings_topic_list' value="+myTopics_str+"> <span title='Įveskite temos pavadinimą, atskirkite kableliais'>?</span><br/><button style='background-color:white; border:0;'>Atnaujinti sąrašą</button>");
}

function updateTopics() {
	myTopics_str = jQuery("#UTB_settings_topic_list").val();
	myTopics = myTopics_str.split(",");
	GM_setValue("UTB_myTopics",myTopics_str);
	reDraw();
	
}

function getMyTopics(topics) {
	jQuery.each(topics,function(index,value) {
		jQuery("<div id='UTB_"+value+"'>"+value+"</div>").appendTo("#UTB_menu");
		getSingleTopic(value);
	});

}
function setTopicInfo(Topic) {
	cutTopicName = Topic.Name.substr(0, 15) + "...";
	TopicContent = "<a style='text-decoration:none; display: inline-block; width:140px;' title='"+Topic.Name+"' target='_blank' href='http://uzdarbis.lt/"+Topic.Id+"/'>"+cutTopicName+"</a>"
	if(Topic.Error.length !== 0) {
		TopicContent += "<span title='"+Topic.Error+"'style='color:red;'>Err</span>";
	} else {
		if(Topic.Bumpable) {
			TopicContent += "<span class='bump_button' style='color:green;cursor:pointer;'>BUMP</span>";
		} else {
			TopicContent += "<span style='color:#AEB404; '>"+Topic.BumpTime+" min.</span>";
		}
	}
	jQuery("#UTB_"+Topic.Id).html(TopicContent);
	parsedCount++;
}
function getSingleTopic(name) {
	GM_xmlhttpRequest({
	  method: "GET",
	  url: "http://uzdarbis.lt/"+name+"/",
	  dataType: "text",
	  synchronous:    false,
	  onload: function(data) {
	  	var topicId = name;
	  	var topicName;
	  	var topicBumpable = false;
	  	var topicBumpTime = 0;
	  	var topicError = "";
	  	parsed = jQuery(data.responseText);
	  	topicName = jQuery(".firstpost_title h2 strong", parsed).html();

	  	Bumpable = jQuery(".topic_controls .disabled", parsed);
	  	if(Bumpable.length) {
	  		topicBumpable = false;

	  		topicBumpTime = Bumpable.attr("title").split(" ")[4];

	  	} else {
	  		searchForButton = jQuery(".topic_buttons", parsed);
	  		if(searchForButton.html().indexOf('Pakelti ')==-1) {
	  			topicError = "Temos pakelti negalima";
	  		} else {
	  			topicBumpable = true;
	  		}
	  	}
	  	Topic = {"Id": topicId,"Name":topicName,"Bumpable":topicBumpable,"BumpTime":topicBumpTime,"Error":topicError};
	  	setTopicInfo(Topic);
	  	
	  }
	});
}
function updateInfo(info) {
	jQuery("#UTB_info").html(info);
}

function checkCache() {
	if(cachedTime != "0") {
		//cached_Time_obj = new Date(cachedTime.slice(0,-6).slice(1,cachedTime.length).replace(/-/g,'/').replace(/T/,' ') +" +0000");
		time_diff = Math.abs(new Date() - new Date(cachedTime))/60000;
		if(time_diff > 5) {
			GM_setValue("UTB_cachedTime", new Date()+"");
			return 1;
		} else {
			return 0;
		}
	}
	GM_setValue("UTB_cachedTime", new Date()+"");
	return 1;
}
function saveToCache() {
	ccc = jQuery("#UTB_menu").html();
	GM_setValue("UTB_cachedContent", ccc);
	updateInfo("Cache turinys atnaujintas");
}
function loadFromCache() {
	ccc = GM_getValue("UTB_cachedContent");
	jQuery("#UTB_menu").html(ccc);
	updateInfo("Cache užkrautas");
}

function getSyncedAndCache() {
	if(totalCount!=parsedCount) {
		setTimeout(function() {
			getSyncedAndCache();
		}	, 500);
	} else {
		saveToCache();
	} 
	return
}

function bumpThread(id) {
	link = "http://uzdarbis.lt/"+id+"/page__bumpTopic__1";

	GM_xmlhttpRequest({
		method: "GET",
		url: link,
		dataType: "text",
		synchronous:    false,
		onload: function(data) {
			reDraw();
		}
	});
}

function reDraw() {
		jQuery("#UTB_menu").remove();
		jQuery("#UTB_menu_hider").remove();
		jQuery("#UTB_info").remove();
		jQuery("#UTB_settings").remove();
		insertVisuals();
		fillSettings();
		parsedCount = 0;
		getMyTopics(myTopics);
		getSyncedAndCache();
		updateInfo("Informacija atnaujinta");
}

jQuery(document).ready(function() {
	insertVisuals();
	fillSettings();

	
	//Setting up menu actions
	jQuery("body").on('click',"#UTB_menu_hider",function(){jQuery("#UTB_settings").toggle();});
	jQuery("body").on('click',"#UTB_settings button",function(){updateTopics()});
	jQuery("body").on('click','.bump_button',function() {
		r_id = jQuery(this).parent().attr("id")
		r_id = r_id.slice(4,r_id.length);
		bumpThread(r_id);
		
	});


	if(checkCache()) {
		getMyTopics(myTopics);
		getSyncedAndCache();
	} else {
		loadFromCache();
	}
	
	
});