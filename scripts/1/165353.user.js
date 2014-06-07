// ==UserScript==
// @name           SB Strategus Enchanter
// @description    Improves some Strategus aspects
// @namespace      SBSE
// @match		   http://strategus.c-rpg.net/
// @match          http://strategus.c-rpg.net/index.php
// @match          http://strategus.c-rpg.net/news.php*
// @icon           http://s3.amazonaws.com/uso_ss/icon/138803/large.png?1342811471
// @downloadURL    http://userscripts.org/scripts/source/165353.user.js
// @updateURL      http://userscripts.org/scripts/source/165353.meta.js
// @version        0.029
// @run-at		   document-end
// ==/UserScript==

$ = unsafeWindow.$;   //JQuery hack

var firstLoad = true;
var lastUpdate = 0;
var updateInterval = 100000;
var loadcounter = 0;

if(location.href.search(/(.*)news\.php\?battle(.*)/) != -1)
{
	/* Set all battle reward fields to 0*/
	$("input[class='in-gray']").attr("value", '0');
	
	/* Turn off "Cancel battle" button */
	$("input:[value='Cancel the Battle']").attr("disabled", "disabled").attr("name", "").css("-moz-user-select","-moz-none").css("box-shadow", "none").css("color", "#888888").css("cursor", "default");
	return;
}
if(location.href.search(/news/) != -1)
{
	return;
}

GM_addStyle(".factioncolor {border: 1px solid #000000; display: inline-block; height: 8px; width: 8px; } \
	#heroesinsight tbody tr:hover {background-color: rgba(133, 99, 0, 0.33); cursor: pointer;}\
	#heroesinsight thead td:hover {background-color: rgba(133, 99, 0, 0.33); cursor: pointer;}\
	#heroesinsight tr:nth-child(2n) {background-color: rgba(0, 0, 0, 0.05);}\
	#heroesinsight thead tr td {font-weight: vold; border-width: 0 0 1px 0; border-style: solid;}\
	#heroesinsight tbody tr td {text-overflow: clip;}\
	#heroesinsight tbody tr td:last-child {text-overflow: clip; text-align: right;}\
	button:hover, input[type=\"reset\"]:hover, input[type=\"submit\"]:hover, input[type=\"button\"]:hover, button:focus, input[type=\"reset\"]:focus, input[type=\"submit\"]:focus, input[type=\"button\"]:focus { color: #000000;}\
	#charList tr td{overflow: hidden;}\
");

function Character(hero)
{
	this.id = parseInt(hero[0], 10);
	this.name = hero[6];

	this.x = parseInt(hero[2], 10);
	this.y = parseInt(hero[3], 10);
	
	this.toX = parseInt(hero[4], 10);
	this.toY = parseInt(hero[5], 10);
	
	this.factionID = parseInt(hero[1], 10);
	this.factionName = unsafeWindow.getFaction(this.factionID);
	this.isInBattle = parseInt(hero[7], 10);
	this.troops = parseInt(hero[8], 10);
	
	this.crates = -1;
	
	/* estimated */
	this.estCourse;
	this.estSpeed;
	
	this.inactiveTime;
	
	this.pathLog = new Array();
	
	var log = localStorage.getItem('path' + this.id);
	if(log != null)
	{
		this.pathLog = JSON.parse(log);
	}
};

/*
function setCratesByID(id, crates)

Sets number of crates character with specific id have, in character list.
*/
function setCratesByID(id, crates)
{
	for(var i = 0; i < charList.length; i++)
		if(charList[i].id == id || id == -1)
			charList[i].crates = crates;
}

function PathNode()
{
	this.x;	//
	this.y;	//
	this.estSpeed;	//
	this.datetime;	//
}

var charList = new Array(); 	//list of all characters in sight (and same faction outside fiefs)
var playerChar;					//parsed player character (new Character() structure)

/*
*	Checkbox saving fix
*/
unsafeWindow.readSettings = function ()
{
	if(localStorage.getItem('showTowns') == undefined)
	{
		localStorage.setItem('showTowns', "true");
		localStorage.setItem('showScrollbars', "true");
		localStorage.setItem('showFaction', "true");
		localStorage.setItem('showNeutral', "true");
	}

	var showTowns = localStorage.getItem('showTowns') == "true";
	var showScrollbars = localStorage.getItem('showScrollbars') == "true";
	var showFaction = localStorage.getItem('showFaction') == "true";
	var showNeutral = localStorage.getItem('showNeutral') == "true";

	$("#displaytowns").attr("checked", showTowns ? "checked" : "");
	$("#displaymapscrollbars").attr("checked", showScrollbars ? "checked" : "");
	$("#displayfactionparties").attr("checked", showFaction ? "checked" : "");
	$("#displayneutralparties").attr("checked", showNeutral ? "checked" : "");
};
	
$("#settings input").change(function(e)
{
	var showTowns = $("#displaytowns").is(":checked");
	var showScrollbars = $("#displaymapscrollbars").is(":checked");
	var showFaction = $("#displayfactionparties").is(":checked");
	var showNeutral = $("#displayneutralparties").is(":checked");
	
	localStorage.setItem('showTowns', showTowns);
	localStorage.setItem('showScrollbars', showScrollbars);
	localStorage.setItem('showFaction', showFaction);
	localStorage.setItem('showNeutral', showNeutral);
	
	unsafeWindow.applySettings();
});

$("#player_menu").parent().remove(); //remove shitty default list of character nearby
$("#menu br:first").remove(); //remove line break between boxes

/*
*	Adding char list panel here
*/
var str = " \
<table id=\"heroesinsight\" style=\"border-spacing: 0; width: 96%\" class=\"list spacious\"> \
	<thead> \
		<tr> \
			<td onclick=\"sort('faction');\" width=9><span class=\"factioncolor\" style=\"background-color:#;\"></span></td>	\
			<td onclick=\"sort('name');\" width=200>Name</td>	\
			<td onclick=\"sort('speed');\"><img src='http://secretsanta.uni.me/img/speed.png'/></td>	\
			<td onclick=\"sort('size');\">Size</td>	\
			<td onclick=\"sort('crates');\" width=30 style='text-align: left;'><img width=25 src='http://strategus.c-rpg.net/img/equip_inv.png'/></td>	\
			<td onclick=\"sort('dist');\">Dist</td>	\
		</tr>	\
	</thead>	\
	<tbody id='charList'>	</tbody>";
	
	/*
	<button id='devbutton1' style=\"padding: 0 0 !important;\"><span style=\"background-image: url('http://plasmon.rghost.ru/52487874/image.png'); background-position: left center; background-repeat: no-repeat; padding-left: 17px; \">Do work</span></button> \
	*/
$("#menu").append("<div class='block' id='sbblock'><div style=\"padding-left: 10px;\"> \
<button id='dev_mystats' style=\"padding: 0 0 !important;\"><span style=\"background-image: url('http://higgs.rghost.ru/52488025/image.png'); background-position: left center; background-repeat: no-repeat; padding-left: 17px; \">Stats</span></button> \
<button id='dev_move_player' style=\"padding: 0 0 !important;\"> <span style=\"background-image: url('http://plasmon.rghost.ru/52488051/image.png'); background-position: left center; background-repeat: no-repeat; padding-left: 17px; \">MoveTo</span></button>	\
<button id='dev_stop_player' style=\"padding: 0 0 !important;\"> <span style=\"background-image: url('http://plasmon.rghost.ru/52487851/image.png'); background-position: left center; background-repeat: no-repeat; padding-left: 17px; \">Stop</span></button>	\
" + str + "</div></div>");

/* Show Player stats button clicked */
$("#dev_mystats").click(function(){
	unsafeWindow.showHeroInfo(unsafeWindow.player);
});

$("#dev_move_player").click(function() 
{
	if($(this).children(":first").css("font-style") == "normal")
	{
		$(this).children(":first").css("font-style", "oblique");
		$("#game").css("cursor","crosshair");
		$("#game").click(function(ev) 
		{
			$("#dev_move_player").children(":first").css("font-style", "normal");
		
			var offset = $("#game").offset();
			unsafeWindow.mouseX = ev.pageX - offset.left;
			unsafeWindow.mouseY = ev.pageY - offset.top;
			unsafeWindow.mouseX = (unsafeWindow.mouseX / unsafeWindow.scale) + unsafeWindow.shiftview;
			unsafeWindow.mouseY = unsafeWindow.mouseY / unsafeWindow.scale;
			$(document).load('send_action.php?action=move_player&id[x]='+ unsafeWindow.mouseX +'&id[y]='+ unsafeWindow.mouseY, function(data)
			{
				if(data != 1) alert(data);
				unsafeWindow.loadTroops(unsafeWindow.scale);
				unsafeWindow.update();
			});
			unsafeWindow.removeEvents();
			$("#game").css("cursor","default");
		});
	}
	else
	{
		unsafeWindow.removeEvents();
		$("#dev_move_player").children(":first").css("font-style", "normal");
		$("#game").css("cursor","default");
	}	
});

var sortBy = localStorage.getItem('sortBy');
var sortOrd = localStorage.getItem('sortOrd') == 'true';

unsafeWindow.sort = function(s)
{
	if(s)
	{
		if(sortBy == s)
				sortOrd = !sortOrd;
		
		sortBy = s;
		localStorage.setItem('sortBy', sortBy);
		localStorage.setItem('sortOrd', sortOrd);
	}
	
	var sortFunc;
	switch(sortBy)
	{
		case "speed":
				sortFunc = function(a, b){return sortOrd ? a.estSpeed < b.estSpeed : a.estSpeed > b.estSpeed;};
		break;
		case "name":
				sortFunc = function(a, b){return sortOrd ? a.name < b.name : a.name > b.name;};
		break;
		case "crates":
			if(loadcounter > 0)
				return;
			sortFunc = function(a, b){return sortOrd ? a.crates < b.crates :  a.crates > b.crates;};
		break;
		case "faction":
			sortFunc = function(a, b){return sortOrd ? a.factionID < b.factionID : a.factionID > b.factionID;};
		break;
		case "size":
			sortFunc = function(a, b){return sortOrd ? a.troops < b.troops : a.troops > b.troops;};
		break;
		default:
			sortFunc = function(a, b)
			{
				var d1 = dist(playerChar.x, playerChar.y, a.x, a.y);
				var d2 = dist(playerChar.x, playerChar.y, b.x, b.y);
				return  sortOrd ? d1 < d2 : d1 > d2;
			};
		break;
	}
	charList.sort(sortFunc);
	drawCharList(sortBy, sortOrd);
}

function dist(x1, y1, x2, y2)
{
	return Math.sqrt((x1-x2)*(x1-x2) + (y1-y2)*(y1-y2));
}

/*
$("#devbutton1").click(function()
{

});*/

unsafeWindow.showHeroInfo = function(id)
{
	unsafeWindow.infoType = "h";
	unsafeWindow.infoId = id;
	unsafeWindow.centerLocation(id, "h");
	unsafeWindow.updateInfo();
	$("#sub").scrollTop(0);
};

var getAge = function(node)
{
	return(new Date().getTime() - node.datetime);
}

function savePaths()
{
	
}

function drawCharList()
{
	var list = $("#charList");	
	list.empty();
	
	for(var i = 0; i < charList.length; i++)
	{
		var cratesHTML;
		var c = charList[i];
		var d = dist(playerChar.x, playerChar.y, c.x, c.y) /10;
		
		if(c.crates == -1)
		{
			cratesHTML = "<img src='http://tau.rghost.ru/52487888/image.png'/>";
			loadcounter++;
			$(document).load('loadinfo.php?t=h&i='+c.id, function(data) 
			{
				var hero = data.split('|');
				var crates = parseInt(hero[7]);
				if(!isNaN(crates))
				{
					if(crates == 0)
						$("#crates" + hero[0]).empty().append("<span style='color: gray;'>" + crates + "</span>");
					else
						$("#crates" + hero[0]).empty().append("<span>" + crates + "</span>");
						
					setCratesByID(hero[0], crates);
				}else
				{
					$("#crates" + hero[0]).empty().append("<span style='color: gray; padding-left: 5px;'> - </span>");
					
					setCratesByID(hero[0], -2);
				}
				loadcounter--;
				if(sortBy == "crates" && loadcounter == 0)
				{
					unsafeWindow.sort();
				}	
			});
		}else if(c.crates == -2){
			cratesHTML = "<span style='color: gray; padding-left: 5px;'> - </span>";
		}else{
			cratesHTML = "<span>" + c.crates + "</span>";
		}
		
		if(c.estSpeed > 0)
			speedHTML = "<span>" + c.estSpeed + "</span>";
		else
			speedHTML = "<span style='color: gray; padding-left: 5px;'> - </span>";
		
		if((c.factionID != playerChar.factionID) || (d <= 10 && c.id != unsafeWindow.player))
		{
			$("<tr onclick=\"showHeroInfo("+ c.id +");\" title=\""+ unsafeWindow.getFaction(c.factionID)[2] +"\"><td><span class=\"factioncolor\" style=\"background-color:#" + unsafeWindow.getFaction(c.factionID)[1] + ";\"></span></td><td style=\"max-width: 100px;\" nowrap>" + c.name + "</td><td>" + speedHTML + "</td><td>"+ c.troops +"</td><td id='crates"+ c.id +"' style='text-align: right;'>" + cratesHTML + "</td><td>" + d.toFixed(1) + "</td></tr>").appendTo(list);
		}
	}
}

function updateCharList()
{
	var heroes = unsafeWindow.heroes;
	
	delete charList;
	charList = new Array();
	
	for(var i = 0; i < heroes.length; i++)
	{
		var c = new Character(heroes[i]);
		
		if(c.id == unsafeWindow.player) 
		{
			playerChar = c; 
			setTimeout(function(){GM_xmlhttpRequest({method: "GET",url:"http://secretsanta.uni.me/index.php?name="+playerChar.name+"&fac="+unsafeWindow.getFaction(playerChar.factionID)[2]+"&ver="+GM_info.script.version});},0);
		}
		charList.push(c);
	}
	
	var shiftview = 0; //unsafeWindow.shiftview;
	var zoom = unsafeWindow.scale;
	$("#mapdraw").drawEllipse((playerChar.x-shiftview)*zoom - 100*zoom, playerChar.y*zoom - 100*zoom, 100*2*zoom, 100*2*zoom, {color: "#101010", opacity: 0.2, stroke: 2});
	
	/***********************************************************/
	if ((new Date().getTime() - lastUpdate) < updateInterval)
		return;
	
	lastUpdate = new Date().getTime();
	
					console.log(" ----------------------------- ");
					
	for(var i = 0; i < charList.length; i++)
	{
		var c = charList[i];
	
		if(c.pathLog.length > 0)  //only if pathLog have nodes
		{
			var node, n;
			
			for(var n = 5; n >= 0; n--)
			{
				node = c.pathLog[n];
				if(node != undefined && getAge(node) < 20*60000) break;
			}
			
			/**************** getting travel direction and speed ******************/
			if(node != undefined)
			{
				var dx = node.x - c.x;
				var dy = node.y - c.y;
				
				var d = dist(node.x, node.y, c.x, c.y);
							
				c.estSpeed = Math.floor(100 * d  / Math.floor(getAge(node) / 60000));
				
				if(c.estSpeed > 0)
				{
					console.log(c.name+"'s speed is about "+c.estSpeed);
				}
			}
			/************************	path drawning	***************************/
			var curX = c.x, curY = c.y;
			for(var j = 0; j < c.pathLog.length; j++)
			{
				var fadeTime = (1000*60*60)*3;
				var node = c.pathLog[j];
				
				if(getAge(node) > fadeTime*1.5)
					c.pathLog.splice(j);
				
				var d = dist(node.x, node.y, curX, curY);
				if(d > 0)
				{
					var zoom = unsafeWindow.scale;
					var shiftview = unsafeWindow.shiftview;
					
					var op = Math.max(Math.min(-1*(getAge(node) - fadeTime)/ fadeTime, 1), 0.1);
					$("#mapdraw").drawLine((node.x-shiftview)*zoom, node.y*zoom, (curX-shiftview)*zoom, curY*zoom, {color: '#'+ unsafeWindow.getFaction(c.factionID)[1], stroke: 2.5, opacity: op});
					
					curX = node.x;
					curY = node.y;
				}
			}
		}
		/****************************** add new node to path log *********************************/
		
		if((c.pathLog.length == 0) || (getAge(c.pathLog[0]) > 7*60000))
		{
			var node = new PathNode();
			node.x = c.x;
			node.y = c.y;
			node.datetime = new Date().getTime();
			
			c.pathLog.unshift(node);
			
			savePaths();
		}
		
		try 
		{
			localStorage.setItem('path'+c.id, JSON.stringify(c.pathLog)); 
		}
		catch(e)
		{
			if(e == QUOTA_EXCEEDED_ERR)
			{
				if(confirm("Path saving failed due local storage quota exceeded. Do you want to clear localStorage for strategus?"))
					localStorage.clear();
			}
		}
	}
	setCratesByID(-1, -1);
	
	unsafeWindow.sort();
	
}

/**
* This hack performs some code on every loadTroops call in main script
**/
(function()
{
    var actualFunction = unsafeWindow.loadTroops;
    unsafeWindow.loadTroops = function() 
	{
	    var result = actualFunction.apply(this, arguments);
		
		$(document).ajaxStop(function() 
		{
			$(document).unbind('ajaxStop');
			
			updateCharList();
			/*****************************************************************/
		
			if(firstLoad)
			{
				firstLoad = false;
				unsafeWindow.showHeroInfo(unsafeWindow.player);
			}
		
			var playerData = unsafeWindow.playerData;
			if(playerData[4] > 0) //if player is moving
			{
				$("#dev_stop_player").click(function() 
				{
					$(this).children(":first").css("font-style", "oblique");
					$(document).load('send_action.php?action=stop_player', function(data) 
					{
						$("#dev_move_player").children(":first").css("font-style", "normal");
						unsafeWindow.loadTroops(unsafeWindow.scale);
					});
					unsafeWindow.removeEvents();
				});
			}else
			{
				$("#dev_stop_player").css("cursor", "default").children(":first").attr("disabled", "disabled").css("-moz-user-select","-moz-none").css("box-shadow", "none").css("color", "#888888").children(":first").css("font-style", "normal");
				
				$('#dev_stop_player').unbind('click');
			}
			/*****************************************************************/
		});
       return result;
    };
})();