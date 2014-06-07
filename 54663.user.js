// ==UserScript==
// @name         TNT - Collection
// @namespace    tnt.collection
// @author       Ronny Jespersen
// @description  The Northman Tools - Collection of Ikariam enhancements
// @include      http://s*.ikariam.*/*
// @require	     http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==
//
// Features:
//   Shortcut to mills and mines from the city resources
//   Show building levels in city
//   Show city, mill and mine levels on island view
//   Remove the horizontal scrollbar
//   Automatic search for upgrades

GM_addStyle("\
/* Show level styles */\
.tntLvl{\
	position:absolute;\
	color:black;\
	line-height:13px;\
	background:gold;\
	font-size:9px;\
	text-align:center;\
	vertical-align:middle;\
	width:14px;\
	height:14px;\
	-moz-outline: black outset 2px;\
	-moz-outline-radius: 8px;\
}\
.tnt_wood{\
	top:19px;\
	left:12px;\
}\
.tnt_marble{\
	top:25px;\
	left:30px;\
}\
.tnt_wine{\
	top:15px;\
	left:40px\
}\
.tnt_crystal{\
	top:17px;\
	left:18px;\
}\
.tnt_sulfur{\
	top:20px;\
	left:34px;\
}\
#mainview a:hover{\
	text-decoration:none;\
}\
.tntHide,\
#infocontainer .tntLvl, #actioncontainer .tntLvl{\
	display:none;\
}\
#tntOptions {\
position:absolute;\
top:39px;\
left:592px;\
width:372px;\
border:1px #755931 solid;\
border-top:none;\
background-color:#FEE8C3;\
background:#DBBE8C url(/skin/layout/bg_stone.jpg) repeat scroll center top;\
padding:10px 10px 0px 10px;\
}\
.txtCenter{text-align:center}\
");

var tnt = {
	
	version:"1.2",
	VersionUrl:"http://ikariam.rjj-net.dk/scripts/tnt.Collection/version.php",
	
	init:function(){
		
		if(GM_getValue("version") != tnt.version){ tnt.setup(); }

		tnt.options();
		tnt.checkVersion();
		tnt.all();
		
		switch($("body").attr("id")){
			case "island": tnt.island(); break;
			case "city": tnt.city(); break;
			case "tavern": tnt.tavern(); break;
			case "resource": tnt.resource(); break;
			case "tradegood": tnt.tradegood(); break;
			case "academy": tnt.academy(); break;
			case "changeResearch": tnt.changeResearch(); break;
			case "barracks": tnt.barracks(); break;
			case "shipyard": tnt.shipyard(); break;
		}

	},
	
	setup:function(){

		/* Set/Upgrade default values */
		GM_setValue("allRemoveScrollbar", GM_getValue("allRemoveScrollbar", true));
		GM_setValue("allResourceShortcuts", GM_getValue("allResourceShortcuts", true));
		GM_setValue("islandShowResourceLvl", GM_getValue("islandShowResourceLvl", true));
		GM_setValue("islandShowCityLvl", GM_getValue("islandShowCityLvl", true));
		GM_setValue("cityShowBuildingLvl", GM_getValue("cityShowBuildingLvl", true));
		GM_setValue("version", tnt.version);
		
	},
	
	options:function(){

		/* Add option link, option box and eventlisteners */
		$("#GF_toolbar ul").append('\
			<li>\
				<a id="tntOptionsLink" href="javascript:void(0);">TNT Options v' + tnt.version + '</a>\
				<div id="tntOptions" class="tntBox" style="display:none;">\
					<div align="center" style="padding-bottom:5px;">\
						<a id="tntColUpgradeLink" class="tntHide" href="" style="color:blue;font-size:12px;">Version <span id="tntColVersion"></span> is available. Click here to update now!</a>\
					</div>\
					<input id="tntAllRemoveScrollbar" type="checkbox"' + (GM_getValue("allRemoveScrollbar")? ' checked="checked"' : '') + ' /> Remove Horizontal Scrollbar<br/>\
					<input id="tntAllResourceShortcuts" type="checkbox"' + (GM_getValue("allResourceShortcuts")? ' checked="checked"' : '') + ' /> Resource Shortcuts<br/>\
					<input id="tntIslandShowResourceLvl" type="checkbox"' + (GM_getValue("islandShowResourceLvl")? ' checked="checked"' : '') + ' /> Show Resource Levels on Islands<br/>\
					<input id="tntIslandShowCityLvl" type="checkbox"' + (GM_getValue("islandShowCityLvl")? ' checked="checked"' : '') + ' /> Show Town Levels on Islands<br/>\
					<input id="tntCityShowBuildingLvl" type="checkbox"' + (GM_getValue("cityShowBuildingLvl")? ' checked="checked"' : '') + ' /> Show Levels in Towns<br/>\
					<div align="center">\
						<input id="tntOptionsClose" type="button" class="button" value="Close" />\
					</div>\
				</div>\
			</li>\
		');
		$("#tntOptionsLink").bind("click", function(){ $("#tntOptions").slideToggle(); });
		$("#tntAllRemoveScrollbar").bind("change", function(){ GM_setValue("allRemoveScrollbar", (GM_getValue("allRemoveScrollbar")? false : true)); });
		$("#tntAllResourceShortcuts").bind("change", function(){ GM_setValue("allResourceShortcuts", (GM_getValue("allResourceShortcuts")? false : true)); });
		$("#tntIslandShowResourceLvl").bind("change", function(){ GM_setValue("islandShowResourceLvl", (GM_getValue("islandShowResourceLvl")? false : true)); });
		$("#tntIslandShowCityLvl").bind("change", function(){ GM_setValue("islandShowCityLvl", (GM_getValue("islandShowCityLvl")? false : true)); });
		$("#tntCityShowBuildingLvl").bind("change", function(){ GM_setValue("cityShowBuildingLvl", (GM_getValue("cityShowBuildingLvl")? false : true)); });
		$("#tntOptionsClose").bind("click", function(){ $("#tntOptions").slideToggle(); });
		
	},
	
	checkVersion:function(){
		
		GM_xmlhttpRequest({
			url:tnt.VersionUrl,
			method:'GET',
			headers:{'Content-type':'application/x-www-form-urlencoded'},
			onload:function(response){
				if(response.responseText.split("&")[0].split("=")[1]!=tnt.version){
					$("#tntOptionsLink").css("color", "darkred");
					$("#tntColVersion").html(response.responseText.split("&")[0].split("=")[1]);
					$("#tntColUpgradeLink").attr("href", response.responseText.split("&")[1].split("=")[1]).removeClass("tntHide");
				}
			} 
		});
		
	},
	
	all:function(){
		
		/* Remove scroll bar at the bottom of the page */
		if(GM_getValue("allRemoveScrollbar")){
			GM_addStyle("body {overflow-x: hidden !important;}");
		}
		
		/* Add shortcuts to mills and mines on the city resource list */
		if(GM_getValue("allResourceShortcuts")){
			var islandId = $("#cityNav li.viewIsland a").attr("href").split("=")[2];
			$("#cityResources ul li.wood").css("cursor", "pointer").bind("click", function(ev){
				location.assign("http://" + location.host + "/index.php?view=resource&type=resource&id=" + islandId);
			});
			$("#cityResources ul li.wine").css("cursor", "pointer").bind("click", function(ev){
				location.assign("http://" + location.host + "/index.php?view=tradegood&type=tradegood&id=" + islandId);
			});
			$("#cityResources ul li.marble").css("cursor", "pointer").bind("click", function(ev){
				location.assign("http://" + location.host + "/index.php?view=tradegood&type=tradegood&id=" + islandId);
			});
			$("#cityResources ul li.glass").css("cursor", "pointer").bind("click", function(ev){
				location.assign("http://" + location.host + "/index.php?view=tradegood&type=tradegood&id=" + islandId);
			});
			$("#cityResources ul li.sulfur").css("cursor", "pointer").bind("click", function(ev){
				location.assign("http://" + location.host + "/index.php?view=tradegood&type=tradegood&id=" + islandId);
			});
		}
		
	},
	
	island:function(){

		/** Show level for Island Features */
		if(GM_getValue("islandShowResourceLvl")){
			var level, woodLvl, luxuryType, luxuryLvl;
			$("#mainview #islandfeatures li:not(#wonder) a").each(
				function(){
					$(this).append('<span class="tntLvl tnt_' + this.parentNode.className.split(" ")[0] + '">' + this.title.replace(/[^\d-]+/g, "") + '</span>');
				}
			);		
		}
	
		/** Show level for cities on Island */
		if(GM_getValue("islandShowCityLvl")){
			$("#mainview #cities .city").each(
				function(){
					$("#" + this.id + " > a").append('<span class="tntLvl" style="top:35px; left:25px;">' + $("#" + this.id + " > .cityinfo .citylevel").text().replace(/[^\d-]+/g, "") + '</span>');
				}
			);
		}

	},

	city:function(){
			
		/** Show level for buildings */
		if(GM_getValue("cityShowBuildingLvl")){
			$("ul#locations li:not(.buildingGround) a").each(
				function(){
					$(this).append('<span class="tntLvl" style="top:35px; left:25px;">' + this.title.replace(/[^\d-]+/g, "") + '</span>');
				}
			);
		}
		
	},
	
};

tnt.init();