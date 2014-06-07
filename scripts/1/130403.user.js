// ==UserScript==
// @name           MixCloud Scrobbler
// @namespace      newcrackcity.fm
// @description    Scrobble Mixcloud
// @exclude		   http://www.mixcloud.com/categories/*	
// @exclude		   http://www.mixcloud.com/upload/*
// @exclude		   http://www.mixcloud.com/groups/*
// @exclude		   http://www.mixcloud.com/tag/*
// @exclude 	   http://www.mixcloud.com/myaccount/*
// @exclude		   http://www.mixcloud.com/*/playlists/*/
// @include        http://www.mixcloud.com/*/*/
// @include        http://www.hexagram.cz/mixcloud-to-lasft-fm/*
// @include        http://offliberty.com/*
// ==/UserScript==

(function() { 
var css = "#main-content-box {margin:0px} #cloudcast-header.absolute {left:0%; margin-left:0px;} #comments-box{display:none;} body {min-width:1680px; min-height:1050px;} #dfp-Mixcloud_ROS_ATF_Leaderboard_728x90, #dfp-Mixcloud_ROS_BTF_Leaderboard_728x90, #dfp-Mixcloud_ROS_TopLeft_Gutter_300x1000, #dfp-Mixcloud_ROS_TopRight_Gutter_300x1000, #dfp-Mixcloud_ROS_Right_Gutter_160x600 {display:none;} .cloudcast-sections-table{display:none;} #dfp-Mixcloud_ROS_MPU_300x250 {display:none;} .skinnable-background  {min-height:850px!important;} .mx-box1 {display:none;}"
if (typeof GM_addStyle != "undefined" )  
	{
		GM_addStyle(css);
	} 

else if (typeof PRO_addStyle != "undefined") {
	PRO_addStyle(css);
} else if (typeof addStyle != "undefined") {
	addStyle(css);
} else 
	{
		var heads = document.getElementsByTagName("head");
		if (heads.length > 0) {
			var node = document.createElement("style");
			node.type = "text/css";
			node.appendChild(document.createTextNode(css));
			heads[0].appendChild(node); 
	}
}

function NewPlayer() {
	var foot = document.getElementById("footer");
	var temp = document.createElement("div"); 
		temp.id = "HGSWidget";
		temp.innerHTML = ""
		+ "<iframe/style=\"left:970px;top:50px;position:absolute;width:350px;height:450px;border:none;\" frameborder=\"0\" src=\"http://www.hexagram.cz/mixcloud-to-lasft-fm/" + "\">"
		+ "</iframe>";
	document.body.insertBefore(temp, foot);

  if (window.top == window.self) {
  var temp2= document.createElement("div2"); 
		temp2.id = "OFLWidget";
		temp2.innerHTML = ""
		+ "<iframe/style=\"left:650px;top:650px;position:absolute;width:300px;height:250px;border:none;\" frameborder=\"0\" src=\"http://offliberty.com/" + "\">"
		+ "</iframe>";
	document.body.insertBefore(temp2, foot); 

	
	 var temp3= document.createElement("div3"); 
		temp3.id = "LFMJQWidget";
		temp3.innerHTML = ""
		+ "<iframe/style=\"left:1315px;top:50px;width:350px;position:absolute;height:450px;border:none;\" frameborder=\"0\" src=\"http://bits.meloncholy.com/mixcloud-rss" + "\">"		
		+ "</iframe>";
	document.body.insertBefore(temp3, foot);
		
	var temp4= document.createElement("div3"); 
		temp4.id = "LFMJQWidget";
		temp4.innerHTML = ""
		+ "<iframe/style=\"left:970px; top:500px;width:700px;position:absolute;height:400px;border:none;\" frameborder=\"0\" src=\"http://www.toma.hk" + "\">"		
		+ "</iframe>";
	document.body.insertBefore(temp4, foot);	
	} 				
};	

if (document.title != "Home Dashboard | Mixcloud - Re-think radio"){
	NewPlayer();
if (window.top == window.self) 
	return;

	var css2 = "html body div#wrapper.wrapper26 div#off-wrap div#header a{display:none;}\n#player{display:none!important;}\n#rows{float:left;}\n#conteiner{float:left!important;min-height:400px!important;width:400px;margin:0pt!important;background-image:none}\n#input-form, #mixpath, #track {width:450px!important;}\n#logo, #counter, #miximage, #uservoice-feedback, #HGSWidget, #footer{display:none!important;}\n#form, #form_div{float:left; width:200px;}\n#input-form, #back{float:left;}\n#menu{display:none;}\n#header {width: 300px; height: 50px; margin: 0px auto;padding: 0px 0px 0px;}\n#donate, #bookmarklet{display:none;}\n#sharemenu{display:none;}\n#wrapper.wrapper8{height:100px;}.navbar-fixed-top, .navbar-fixed-top .navbar-inner, .navbar-fixed-bottom .navbar-inner {display:none!important;}"
	if (typeof GM_addStyle != "undefined" )  
	{
		//document.body.style.overflow = "hidden"; 

		GM_addStyle(css2);	
	} 

var mixurl = document.getElementById("mixpath");
var oflurl = d
mixurl.value = document.referrer;  
}
})();