// ==UserScript==
// @name           	TTS55
// @version        	v0.2
// @namespace   	TWsc
// @description   	tribalwars
// @include        	http://en55.tribalwars.net/*screen=*
// @copyright      	Copyright (c) 2010 by MaJia(免责的马甲)
// ==/UserScript==
// XPath
try {
if (true) {
	var btime = new Date();
	var temp = new Date();
	var dodge_time = new Date();
	var server_time = new Date();
	var version = "v0.2";
	var interval = 1000;
	var td = 2700;
	var dodge_count = 0;
	var timeZone = 7*3600*1000;
	var tc = 500; 
	var mm = 0;
	var t0 = null;
	var rStep = 10;
	var br = false;
	var rhtml = "";
	var iCount = 1;
	var toolbar = true;
	var postvar = "";
	var unitsArray = ["spear","sword","axe","spy","light","heavy","ram","catapult","knight","snob","Militia"];
	var diffs = ["","","","","","","","","","","","","","","","",""];
	var pid = 0;
	var vid = 0;
	var coord = "999|999";
	var curVillage = 0;
	var villages_count = 1;
	var incoming = 0;
	var sitter_id = 0;
	var points = 0;
	var ranking = 0;
	var scripts = $("script");
	//GM_log(scripts.length);
	for (var i=0;i<scripts.length;i++) {
		if (scripts[i].innerHTML.indexOf("game_data") != -1) {
			gamedata = scripts[i].innerHTML.split("var game_data = {")[1].split("};")[0].split(":{");		
			//GM_log(gamedata[1].split("}")[0]);
			//GM_log(gamedata[2]);
			pid = gamedata[1].split(",")[0].split(":")[1].replace('"','').replace('"','');
			pname = gamedata[1].split(",")[1].split(":")[1].replace('"','').replace('"','');
			villages_count = parseInt(gamedata[1].split(",")[3].split(":")[1].replace('"','').replace('"',''));
			incoming = parseInt(gamedata[1].split(",")[6].split(":")[1].replace('"','').replace('"',''));
			sitter_id = parseInt(gamedata[1].split(",")[7].split(":")[1].replace('"','').replace('"',''));
			points = parseInt(gamedata[1].split(",")[4].split(":")[1].replace('"','').replace('"',''));
			ranking = parseInt(gamedata[1].split(",")[5].split(":")[1].replace('"','').replace('"',''));

			vid = gamedata[2].split(",")[0].split(":")[1].replace('"','').replace('"','');
			curVillage = vid;
			vname = gamedata[2].split(",")[1].split(":")[1].replace('"','').replace('"','');
			coord = gamedata[2].split(",")[2].split(":")[1].replace('"','').replace('"','').split('|');
			con = gamedata[2].split(",")[3].split(":")[1].replace('"','').replace('"','');
			//GM_log(pid);
			//GM_log(vid);
			//GM_log(points+"     "+ranking);
		}
	}
	var Premium =($("quickbar").length > 0) ? true : false;
	var Screen = location.href.replace(/^(.+)\/(\w+)\.php(.+)screen=(\w+)(.*)$/i,"$4");
	var Page =   location.href.replace(/^(.+)\/(\w+)\.php(.+)screen=(\w+)(.*)$/i,"$2");
	var World =  location.href.replace(/^http:\/\/(\w+)\.(\w+)\.(\w+)\/(.*)$/i,"$1");
	var Server = location.href.replace(/^(.+)\/(\w+)\.php(.*)$/i,"$1");
	var _Unique = World+"_"+pid;
	
	var imgbase = "file:///d:/graphic";
	var menu_xhtml = "";
	var strRC = "";
	var total = 0;  
	
	var dodge_target = {
			url: "",
			x: "515",
			y: "529",
			action_id: "9999",
			action: "command",
			h: "999",
			spear: "0",
			sword: "0",
			axe: "0",
			spy: "0",
			light: "0",
			heavy: "0",
			ram: "0",
			catapult: "0",
			snob: "0",
			Militia: "0",
			sumbit: "OK",
			attack: "true",
			support: "false"
		}
	var farm_target = {
			url: "",
			vid: "",
			x: "515",
			y: "529",
			action_id: "",
			action: "command",
			h: "",
			spear: "0",
			sword: "0",
			axe: "0",
			spy: "1",
			light: "0",
			heavy: "0",
			ram: "0",
			catapult: "0",
			snob: "0",
			Militia: "0",
			sumbit: "OK",
			attack: "true"
		}
	var FarmArray = [];
	var priceArray = [0,90,130,130,120,475,950,700,820,80,140000,0];
	var peopleArray = [ 0, 1, 1, 1, 2, 4, 6, 5, 8, 100,0,0,0,0];
	var speedArray = [12, 14.67, 12, 6, 6.67, 7.33, 20, 20, 23.33, 0.02];
	var haulArray = [25,15,10,0,80,50,0,0,100,0,0,0,0,0];
	var unit_index = 0;
	var troops_type = unitsArray[unit_index];
	var unit_haul = haulArray[unit_index]; 
	var cavCount = 0;
	var cavTotal = 0;
	var icoArray = ["spear","sword","axe","spy","light","heavy","ram","catapult","knight","snob","Militia"];
	var storageArray = [0,1000,1229,1512,1859,2285,2810,3454,4247,5222,6420,
						7893,9705,11932,14670,18037,22177,27266,33523,41217,
						50675,62305,76604,94184,115798,142373,175047,215219,
						264611,325337,400000,0]; 
	var farmArray = [0,
					240,281,329,386,452,530,622,729,854,1002,
					1174,1376,1613,1891,2216,2598,3045,3569,4183,4904,
					5748,6737,7896,9255,10848,12715,14904,17469,20476,24000,
					0];
	var hideArray = [0,150,200,267,356,474,632,843,1125,1500,2000,0]; 
	var _production = [6,								//0
		 33, 38, 45,  52,  60,  70,  82,  95, 111, 129, // level 1-10
		150,174,202, 235, 274, 318, 370, 431, 501, 583, // level 11-20
		678,788,917,1066,1240,1442,1678,1951,2270,2640, // level 21-30
		];
	var _units = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
	var _buildings = null;
	$("div[id='footer_left']")[0].innerHTML = "<div id='info_div' class='small' style='text-align:left;height:16px;margin:0;padding:0;white-space:nowrap;border:0;background:transparent;'/>";
	var dodge_div = document.createElement("DIV");
	dodge_div.setAttribute("style","float:bottom;display:none;");
	$("body")[0].appendChild(dodge_div);
}

	if (toolbar) {
		if (/t=([^&]+)/.test(location.href)) {
			var t = '&' + location.href.match(/t=([^&]+)/g)
		} else {
			var t = '';
		}
		var newreport = '';
		var newmail = '';
		var newpost = '';
		var logout = $("tr#menu_row td:last a")[0].href;
		if ($("[class='icon header new_post']").length>0) newpost = '<a href="/game.php?village=' + curVillage +  t+ '&screen=ally&mode=forum"> <span class="icon header new_post" title="New post in private forum"></span></a>';
		if ($("[class='icon header new_mail']").length>0) newmail = '<a href="/game.php?village=' + curVillage + t+ '&screen=mail"> <span class="icon header new_mail" title="New mail"></span></a>';
		if ($("[class='icon header new_report']").length>0) newreport = '<a href="/game.php?village=' + curVillage + t+ '&screen=report&amp;mode=attack"> <span class="icon header new_report" title="New report"></span></a>';
		var top_xhtml = '';
		top_xhtml += '<tr><td>';
		top_xhtml += '<table class="header-border"><tr><td>';
		top_xhtml += '<table class="box menu nowrap"><tr>';
		top_xhtml += '<td class="icon-box nowrap"><a href="/game.php?village=' + curVillage + t+ '&screen=overview"> O<span class="small">verview </a></td>';
		top_xhtml += '<td class="icon-box nowrap"><a href="/game.php?village=' + curVillage + t+ '&screen=overview_villages"> V<span class="small">illa list</span></a></td>';
		top_xhtml += '<td class="icon-box nowrap">'+newreport+'<a href="/game.php?village=' + curVillage + t+ '&screen=report"> R<span class="small">eports </span></a></td>';
		top_xhtml += '<td class="icon-box nowrap">'+newmail+'<a href="/game.php?village=' + curVillage + t+ '&screen=mail"> M<span class="small">ail  </span></a></td>';
		top_xhtml += '<td class="icon-box nowrap">'+newpost+'<a href="/game.php?village=' + curVillage + t+ '&screen=ally"> T<span class="small">ribe  </span></a></td>';
		top_xhtml += '</tr></table></td></tr></table></td>';
		top_xhtml += '<td></td>';
		
		top_xhtml += '<td><table class="header-border"><tr><td>';
		top_xhtml += '<table class="box menu nowrap"><tr>';
		top_xhtml += '<td class="icon-box nowrap"><a href="/game.php?village=' + curVillage +  t+'&screen=ranking"> R<span class="small">anking  </span></a><span class="small">('+ranking+'.|'+points+'p) </span></td>';
		top_xhtml += '<td class="icon-box nowrap" align="center">   <a href="/game.php?village='+curVillage+ t+'&screen=map">M<span class="small">ap </span></a> <span class="small">('+coord[0]+'|'+coord[1]+')</span> </td>';
		top_xhtml += '</tr></table></td></tr></table></td>';
		
		top_xhtml += '<td colspan="3"><table class="header-border"><tr><td>';
		top_xhtml += '<table class="box menu nowrap"><tr>';
		top_xhtml += '<td class="icon-box nowrap"><a href="/game.php?village=' + curVillage +  t+'&screen=settings"> S<span class="small">ettings </span></a></td>';	
		top_xhtml += '<td class="icon-box nowrap"><a href="/game.php?village=' + curVillage + t+ '&screen=premium"> P<span class="small">remium </span></a></td>';
		top_xhtml += '<td class="icon-box nowrap"><a href="'+logout+'"> L<span class="small">og out </span></a></td>';
		top_xhtml += '</tr></table></td></tr></table></td></tr>';
		$("#header_info")[0].innerHTML = top_xhtml+$("#header_info")[0].innerHTML;
		
		//style="border-left: solid 1px #876534"
		menu_xhtml += '<td class="icon-box nowrap"><a href="http://'+World+'.tribalwarsmap.com/noflash/" target="_blank">' +
						'<img src="'+imgbase + '/rabe_38x40.png" style="height:16px;margin:0px 2px;" title="tribalwarsmap.com" />' + 
						'</a></td>';
		menu_xhtml += '<td class="icon-box nowrap"><a href="/game.php?village=' + 
						curVillage + 
						'&screen=main' + t + 
						'"><img src="'+imgbase + '/buildings/main.png" style="margin:0px 2px" title="Main" />' + 
						'</a></td>';
		menu_xhtml += '<td><a href="/game.php?village=' + curVillage + '&screen=barracks'+t+'"><img src="'+imgbase + '/buildings/barracks.png?1" style="margin:0px 2px" title="barracks" /></a></td>';
		menu_xhtml += '<td><a href="/game.php?village=' + curVillage + '&screen=stable'+t+'"><img src="'+imgbase + '/buildings/stable.png?1" style="margin:0px 2px" title="stable" /></a></td>';
		menu_xhtml += '<td><a href="/game.php?village=' + curVillage + '&screen=garage'+t+'"><img src="'+imgbase + '/buildings/garage.png?1" style="margin:0px 2px" title="garage" /></a></td>';
		menu_xhtml += '<td><a href="/game.php?village=' + curVillage + '&screen=snob'+t+'"><img src="'+imgbase + '/buildings/snob.png?1" style="margin:0px 2px" title="snob" /></a></td>';
		
		menu_xhtml += '<td class="icon-box nowrap"><a href="/game.php?village=' + curVillage + '&screen=smith'+t+'"><img src="'+imgbase + '/buildings/smith.png?1" style="margin:0px 2px" title="smith" /></a></td>';	
		menu_xhtml += '<td><a href="/game.php?village=' + curVillage + '&screen=place'+t+'"><img src="'+imgbase + '/buildings/place.png?1" style="margin:0px 2px" title="place" /></a></td>';
	//	menu_xhtml += '<td><a href="/game.php?village=' + curVillage + '&screen=church_f'+t+'"><img src="'+imgbase + '/buildings/church.png?1" style="margin:0px 2px" title="First church" /></a></td>';
		menu_xhtml += '<td class="icon-box nowrap"><a href="/game.php?village=' + curVillage + '&screen=market'+t+'"><img src="'+imgbase + '/buildings/market.png?1" style="margin:0px 2px" title="market" /></a></td>';
		menu_xhtml += '';
	//$("#menu_row2_village").after(menu_xhtml);
	}
	function _log(data,br){
		if (br) {
			$("td[id='info_div0']")[0].innerHTML = data+"<br/>"+$("td[id='info_div0']")[0].innerHTML;
		} else {$("div[id='info_div']")[0].innerHTML = data;};
	}
	function _msg(data){
		$("p.server_info")[0].innerHTML = $("p.server_info")[0].innerHTML.split("|")[0] + 
										" | " + data + 
										" | "+ $("p.server_info")[0].innerHTML.split("|")[1];
	}
	function setFunc(func, new_func) {
		if (typeof unsafeWindow == "object") {
			unsafeWindow[func] = new_func;
		} 
	}
	function xpathGetFirst(xpath) {
		return document.evaluate(xpath,document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;
	}
	function xpathGetAll(p, context) {
		if (!context) context = document;
		var i, arr = [], xpr = document.evaluate(p, context, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		for (i = 0; item = xpr.snapshotItem(i); i++) arr.push(item);
		return arr;
	}
	function ajax(url, type, async) {
		var xhReq = new XMLHttpRequest();
		if (type != "POST") { type = "GET"; }
		if (async !== true) { async = false; }
		xhReq.open(type, url, async);
		xhReq.send(null);
		return xhReq;
	}
	function array_flip( trans ) {
		var tmp_ar = {};
		for(var key in trans ) {
			tmp_ar[trans[key]] = key;
		}
		return tmp_ar;
	}
	function setValue(key, new_val) {
		GM_setValue(_Unique+"_"+key, uneval(new_val));
	}
	function getValue(key) {
		return eval(GM_getValue(_Unique+"_"+key));
	}
	function getUserVillages() { // Grab the users villages 
		var villageSet = $("table.vis tr[class^='nowrap  row_']");
		if (!villageSet) return false;
		var villages = {};
		for (i = 0; i < villageSet.length; i++) { // loop through the found links
			 var cells = villageSet[i].getElementsByTagName("td");
//	GM_log(villageSet[i].innerHTML+"   \n\r "+cells[0].innerHTML+" \n\r " +cells[1].innerHTML+" \n\r " +cells[2].innerHTML);
			var tmpId = cells[0].innerHTML.match( /village=([^&]+)/ );
			var tmpDetails = cells[0].innerHTML.match( /">(.+) \((-?\d+)\|(-?\d+)\)(?: K(\d+))?<\/sp/ );
			var tmpPoints = cells[1].textContent.replace(".","");
			var tmpPointsInt = parseInt(tmpPoints);

// GM_log(tmpDetails[1]);
			villages[tmpId[1]] = {
				id: tmpId[1], 
				name: tmpDetails[1], 
				x: parseInt(tmpDetails[2]), 
				y: parseInt(tmpDetails[3]), 
				continent: tmpDetails[4], 
				points: tmpPoints
			};
		}
		 
		villageSet = $("table.vis tr[class^='nowrap  selected row_']");
		for (i = 0; i < villageSet.length; i++) { // loop through the found links
			var cells = villageSet[i].getElementsByTagName("td");
//	GM_log(villageSet[i].innerHTML+"   \n\r "+cells[0].innerHTML+" \n\r " +cells[1].innerHTML+" \n\r " +cells[2].innerHTML);
			var tmpId = cells[0].innerHTML.match( /village=([^&]+)/ );
			var tmpDetails = cells[0].innerHTML.match( /">(.+) \((-?\d+)\|(-?\d+)\)(?: K(\d+))?<\/sp/ );
			var tmpPoints = cells[1].textContent.replace(".","");
			var tmpPointsInt = parseInt(tmpPoints);
			//var vcoords_from = ["513","530"];
			//var vcoords_to = [tmpDetails[2],tmpDetails[3]];
			//var dist = parseInt(get_distance_num(vcoords_from,vcoords_to)*10000000);
//GM_log(tmpDetails[1]);
			villages[tmpId[1]] = {
				id: tmpId[1], 
				name: tmpDetails[1], 
				x: parseInt(tmpDetails[2]), 
				y: parseInt(tmpDetails[3]), 
				continent: tmpDetails[4], 
				points: tmpPoints
			};
		};
		setValue("myVillages", villages);
		_log("getUserVillages:"+villageSet.length,false);
	}
	function getCurrentVillage() { // Grab the currently selected village
		if (curVillage == null) {
			try {
				var cur = $("a:first").attr("href");
				cur = cur.replace(/(.+)village=([^&]+)(.+)/g, "$2");
				curVillage = cur;
				vid = cur;
			} catch(e) {
				GM_log("Failed to properly execute getCurrentVillage. js error:\n"+e);
				curVillage = null;
			}
		}
		//_log("getCurrentVillage: "+curVillage,false);
		return curVillage;
	}
	function myVillages() { // My villages
		if (Screen == "overview_villages" || ! getValue("myVillages") || getValue("myVillages") === 'undefined') {
			getUserVillages();
		}
		//_log("myVillages",false);
		return getValue("myVillages");
	 }
	function getReportsByVillage() {
			var reports = getValue("reports");
			var ret = {};
			var i = 0;
			for(var v in reports) {
					 i++;
					 var report = reports[v];
					 var coords = report.coords.join('|');
					 if(!ret[coords] || ret[coords].timestamp < report.timestamp) {
						 ret[coords] = report;
					 }
			}
			//_log("getReportsByVillage",false);
			return ret;
	}
	function getReportForCoord(coord) {
				 return getReportsByVillage()[coord];
	}
	function getUnits() {
		return getValue("units");
	}
	function get_unit_html(unit, rallypoint) {
		_log("get_unit_html:"+unit.title,false);
		return(	"<input type='text' value='' size='5' name='"+unit.id+"'/>" +
				"<br/><img src='"+imgbase+"/unit/unit_"+unit.id+".png' title='"+unit.title+"' height='12px'/>" +
				" <a href='javascript:insertUnit(document.forms[0]."+unit.id+", "+rallypoint.units[unit.index]+")'>"+ 
				"("+rallypoint.units[unit.index]+")</a>");
	}
	function get_rallypoint_html(village_id,x,y) {
		  var rallypoints = getValue("rallypoints");
		  var rallypoint = rallypoints[village_id];
		  if(!rallypoint) return false;
		  var html = "<form id='units_form' name='units' action='/game.php?village="+village_id+"&amp;screen=place&amp;try=confirm' method='post'>";
		  html += "<table cellpadding='0' cellspacing='0' width='100%' style='border:1px solid #987634;'><tbody><tr>";
		  var units = getUnits()[village_id];
		  html += "<th valign='top' width='100%'><table cellpadding='0' cellspacing='0' border='0' width='100%'><tbody><tr>";
		  var col = 1;
		  for(var i in units) {
			  var unit = units[i];
			  html += "<th valign='middle' align='center'>"+get_unit_html(unit, rallypoint)+"</th>";
		  }
		  html += "</tr></tbody></table></th><th>";
		  html += "<table><tbody><tr>\n<th rowspan='2'>";
		  html += "<input type='text' size='5' value='"+x+"' name='x' id='inputx' /><br/> x: ";
		  html += "</th><th><input type='text' size='5' value='"+y+"' name='y' id='inputy' /><br/> y: ";
		  html += "</th>";
		  html += "<td rowspan='2'><input id='target_attack' class='attack' name='attack' value='攻击' style='font-size: 10pt;' type='submit'>";
		  html += "<input id='target_support' class='support' name='support' value='支援' style='font-size: 10pt;' type='submit'></td>";
		  html += "</tr></tbody></table>";
		  html += "</th></tr></tbody></table>";
		  html += "</form>";
		  _log("get_rallypoint_html: "+village_id+" ("+x+"|"+y+")",false);
		  return html;
	}
	function get_distance_num(from, to) {
		var distance_x = from[0]-to[0];
		var distance_y = from[1]-to[1];
		var distance = Math.sqrt(Math.pow(distance_x,2) + Math.pow(distance_y,2));
		//var ret = "<font color='green'>" + distance.toFixed(2) +"</font>cells";
		//_log("get_distance_num("+from+","+to+"): "+distance,false);
		return distance;
	}
	setFunc("changeTroopsType", function(index,istart){ 
		window.setTimeout(function() {
			//var troops_type = $("#troopsSel")[0].options[index].value;
			//var villageid = $("#troopsSel")[0].name;
			//GM_log(istart);
			setValue("unit_index",index);
			for (var idx=0;idx<rStep;idx++) {
				var idn = idx + istart +1;
				var dist = parseFloat($("#dist_"+idn)[0].value);
				var speed = dist*speedArray[index];
				
				var troops_speed_hour = parseInt(speed/60);
				var troops_speed_min = parseInt(speed - troops_speed_hour*60);
				var troops_speed_sec = parseInt((speed - troops_speed_hour*60 - troops_speed_min)*60);
				var troops_speed = (troops_speed_hour>0?troops_speed_hour+":":"")+troops_speed_min +":"+troops_speed_sec;
						//var troops_speed = troops_speed_min +":"+troops_speed_sec;
						//var troops_speed = (dist*speedArray[4]).toFixed(2);
				//GM_log("time: "+dist*speedArray[4]+"     "+troops_speed_hour+":"+troops_speed_min+":"+troops_speed_sec);
				$("#speed_"+idn)[0].innerHTML = troops_speed;
				//GM_log(dist+"      "+speed);
				//$("#farm_"+idn)[0].innerHTML = farm_table();
			}

			unit_haul = haulArray[index];
			var farm_tables = $("td[name^='farm_table_']");
			var reports = getValue("reports");
			for (var f=0;f<farm_tables.length;f++){
				var fid = farm_tables[f].id;
				//var report = reports[fid];
				//GM_log("farm_tables:"+fid);
				//farm_tables[fid].innerHTML = farm_table(report);
			}
			//GM_log(" unit_haul:     "+unit_haul);
		},0)
	});
	function farm_table(report) {
		var cavTotal = parseFloat($("#cavTotal")[0].value);
		var cavCount = cavTotal / unit_haul;
		cavCount = Math.ceil(cavCount) ;
		var html = "";
		if (true) {
			html += "<table cellpadding='0' cellspacing='0' border='0' width='100%'><tr>";//  + 
					//"<td class='small'> <font color='green'><b><span id='speed_"+(jj+iStart)+"'>" + troops_speed + "</span></b></font><span class='inactive small'>min</span></td>";
			var did = parseInt(report.villageid);
			var pnt = points[did];
			if (!pnt) {
				pnt = {point:0};
				//points[did] = pnt;
			}
			html += (pnt.point>0?("<td class='small' style='border:0px solid gold; width:1px;' nowrap><img src='"+imgbase +"/face.png' height='12px'/><b>"+pnt.point+"</b></td>"):"");
			//html +=	(wallHtml==""?"":(iWall>0?("<td class='small' style='border:2px solid red; width:1px;' nowrap>"+wallHtml+"</td>"):("<td style='width:1px;'nowrap>"+wallHtml+"</td>")));
						
			// ------------------------ 侦查
			html += "<td style='border:1px solid #987634;' width='16px' nowrap><a href='javascript:farmIt(" + 
					report.villageid + "," + 
					report.coords[0] + 
					","+ report.coords[1] + 
					",0,true);'>" + 
					"<img src='"+imgbase +"/unit/unit_spy.png?1' height='12px'></a></td>";
			// 手动抢夺									
			html += "<td style='border:1px solid #987634;' width='16px' nowrap><a href='javascript:{"+ 
					"insertUnit(document.forms[0].spy, \"1\");"+ 						 
					"insertUnit(document.forms[0].light, \""+ (cavCount+2) + "\");"+ 
					"insertUnit(document.forms[0].x, \""+ report.coords[0] + "\");"+ 
					"insertUnit(document.forms[0].y, \""+ report.coords[1] + "\");" + 
					"}'>" +  
					"<img src='"+imgbase +"/buildings/place.png?1' height='12px'></a></td>";
							
			html += "<td style='border:1px solid #987634;' width='16px' nowrap>" + 
					"<a href='javascript:farmIt(" + 
					report.villageid + "," + 
					report.coords[0] + 
					","+ report.coords[1] + 
					",0,true,true);' title='attack'>" + 
					"<img src='"+imgbase +"/unit/unit_axe.png?1' height='12px'></a></td>";

			html += "<td style='border:1px solid #987634;' width='16px' nowrap>" + 
					"<a href='javascript:farmIt(" + 
					report.villageid + "," + 
					report.coords[0] + 
					","+ report.coords[1] + 
					","+parseInt(cavCount+2)+",true);' title='loot'" + 
					((iTroops==0)?">":" onclick='javascript:return false;'>") + 
					"<img src='"+imgbase +"/unit/unit_light.png?1' height='12px'>" +  		
					parseInt(cavCount+2) + 
					"</a></td>";

			if (cavCount/2>10) {
				html += "<td style='border:1px dotted #987634;' width='16px' nowrap><a href='javascript:farmIt(" + 
						report.villageid + "," + 
						report.coords[0] + 
						","+ report.coords[1] + 
						","+parseInt((cavCount+2)/2)+",true);' title='loot'" + 
						((iTroops==0)?">":" onclick='javascript:return false;'>") + 
						parseInt((cavCount+2)/2) + "</a></td>";
				// farm 2		 	
			}
			if (cavCount/3>10) {
				html += "<td style='border:1px dotted #987634;' width='16px' nowrap><a href='javascript:farmIt(" + 
						report.villageid + "," + 
						report.coords[0] + 
						","+ report.coords[1] + 
						","+parseInt((cavCount+2)/3)+",true);' title='loot'" + 
						((iTroops==0)?">":" onclick='javascript:return false;'>") + 									
						parseInt((cavCount+2)/3) + "</a></td>";
			// farm 3		 	
			}
			if (cavCount/4>10) {
				html += "<td style='border:1px dotted #987634;' width='16px' nowrap><a href='javascript:farmIt(" + 
						report.villageid + "," + 
						report.coords[0] + 
						","+ report.coords[1] + 
						","+parseInt((cavCount+2)/4)+",true);' title='loot'" +  
						((iTroops==0)?">":" onclick='javascript:return false;'>") + 
						parseInt((cavCount+2)/4) + "</a></td>";
			//  farm 4
			}
							
			html += "</tr></table>";
		}
		return html;
	}
	function _get_report_html(rCount) {
				var html = "<table cellpadding='0' cellspacing='0' border='0' width='100%'>"; 
				html += "<tr class='.row_a'>";
				var points = getValue("points");
				if (!points) points = {};
				var report;
				var reports = getReportsByVillage();
				var villages = myVillages();
				var v = villages[vid];
				var vcoords = [v.x,v.y];

				var i=0;
				var jj =0;
				var iStorage = 1000;
				var iStart = rCount - rStep;
				for (var report_id in reports) { i++;}
				if (rCount > i) rCount = i;
				i = 0;
				if (rCount  == 0) {
					rCount = reports.length;
					iStart = 0;
				} 
						//var troops_type = unitsArray[4]; // LC= troops_type
						
						var unitOpts = "<select id='troopsSel' name='"+iStart+"' onChange='changeTroopsType(this.options.selectedIndex,"+iStart+")' style='color:white;background-Color: #987634;border:1px solid #987634;' class='box menu nowrap'>";
						for (var unt=0;unt<unitsArray.length;unt++) {
						//GM_log("unitsArray[unt]: " +unitsArray[unt]+"   troops_type: "+troops_type)
							var troops_select = (unitsArray[unt]==troops_type?'selected="true"':'');
							unitOpts += '<option value="'+unitsArray[unt]+'" '+troops_select+'>' + 
										unitsArray[unt] +
										'</option>';				
						}
						unitOpts += "</select>";
				html += "<td><font color='red'><b>L</b></font><span class='small'>ist <b>o</b>f</span> <font color='green'><b>R</b></font><span class='small'>eports </span><font color='blue'><b>C</b></font><span class='small'>ache</span></td><td colspan='1' align='right'><img src='"+imgbase+"/unit/speed.png' height='12px'>&nbsp;"+unitOpts+"</td></tr><tr class='.row_a'>";
				
				for (var report_id in reports) {
					if (i < iStart) { i++;}	
					else 
					{
						jj += 1;
						report = reports[report_id];
						if(report.timestamp.getTime) { report.timestamp = report.timestamp.getTime(); }
						 
						var lclTime = new Date();
						var age = ((lclTime.getTime() - 7*3600*1000)-report.timestamp)/1000;
						age = age>0? age:(0 - age);
						var sTime = (age/3600);
						var sHour = parseInt(sTime);
						var sMinute = parseInt((sTime - sHour)*60);
			//			var sSecond = parseInt(((sTime - sHour)*60 - sMinute)*60);
						if (sMinute >9)  {	sTime = sHour + ":" + sMinute;} 
						else 
						{sTime = sHour + ":0"+ sMinute;}
						
		// -----------------------
						var dist = get_distance_num(vcoords,report.coords);
						var troops_speed_hour = parseInt((dist*speedArray[4])/60);
						var troops_speed_min = parseInt(dist*speedArray[4] - troops_speed_hour*60);
						var troops_speed_sec = parseInt((dist*speedArray[4] - troops_speed_hour*60 - troops_speed_min)*60);
						var troops_speed = (troops_speed_hour>0?troops_speed_hour+":":"")+(troops_speed_min>9?troops_speed_min:"0"+troops_speed_min)+":"+(troops_speed_sec>9?troops_speed_sec:"0"+troops_speed_sec);
						//var troops_speed = troops_speed_min +":"+troops_speed_sec;
						//var troops_speed = (dist*speedArray[4]).toFixed(2);
				//GM_log("time: "+dist*speedArray[4]+"     "+troops_speed_hour+":"+troops_speed_min+":"+troops_speed_sec);
						//var troops_type = unitsArray[4]; // LC= troops_type
						
						var unitOpts = "<select id='troopsSel' name='"+report.villageid+"' onChange='changeTroopsType(this.options.selectedIndex,"+report.villageid+")' style='color:white;background-Color: #987634;border:1px solid #987634;' class='box menu nowrap'>";
						for (var unt=0;unt<unitsArray.length;unt++) {
							var troops_select = (unitsArray[unt]==troops_type?'selected="true"':'');
							unitOpts += '<option value="'+unitsArray[unt]+'" '+troops_select+'>' + 
										unitsArray[unt] +
										'</option>';				
						}
						unitOpts += "</select>";
						var iTroops = 0;
						var unitHtml = "";
						var UnitArray = report.Units;
						//if (UnitArray[u]>0) {unitHtml += "<span><img src='/imgbase/unit/unit_" + icoArray[u]+".png?1' height='12px'><b><i>" + parseInt(UnitArray[u]) + "</i></b></span>";iTroops += 1;} 
						for (var u=0;u<UnitArray.length-1;u++)
						{
							if (UnitArray[u]>0) {
								unitHtml += "<span>" + 
											"<img src='"+imgbase+"/unit/unit_" + 
											icoArray[u]+".png?1' height='12px'>" + 
											"<b><i>" + 
											parseInt(UnitArray[u]) + 
											"</i></b></span>";
											iTroops += 1;
							} 
						}
						var wallHtml = "";
						var iWall = 0;
						if (report.buildings.wall) {
							if (parseInt(report.buildings.wall)>0 && parseInt(report.buildings.wall)<21) 
								wallHtml = "<span><img src='"+imgbase+"/buildings/wall.png?1' height='12px'>"+parseInt(report.buildings.wall)+"</span>";
							else if (parseInt(report.buildings.wall)>20) {
								wallHtml = "<span><img src='"+imgbase+"/buildings/wall.png?1' height='12px'><font color='red'><b>Scout fail</b></font></span>";
								iWall += 1;
							}
						}
						var attacked = report.attacked ? report.attacked : "";
						var rplayer = report.player;		//Bonus village
						var villagename = (report.villagename.indexOf("Bonus village")!=-1?"":(report.villagename.indexOf("Barbarian village")!=-1?"":report.villagename))		
						 html += "<td class='small' width='50%' style='border:0px solid #604620;' align='right' valign='top' nowrap>" + 
								"<table class='content-border vis' cellpadding='0' cellspacing='0' width='100%' style='border:1px solid #987634;border-top:1px solid #987634;border-left:1px solid #987634;'>";						
						 html += "<tr class='selected'><th width='60px'>" + 
						 "<a href='game.php?village="+curVillage + 
						"&amp;screen=report&amp;mode=attack&amp;view="+report.id+ "'" + 
						"target='_blank'><img src='"+imgbase+"/new_report.png' height='12px' width='12px'>" + 
						(jj+iStart) + 
						"</a></th>" + 
						"<th class='small' nowrap><table cellpadding='0' border='0' cellspacing='0' width='100%'><tr>" + 
						"<th class='small'>"+rplayer + "</th><th class='small'><a href='game.php?village="+curVillage + 
						"&amp;screen=info_village&amp;id="+report.villageid+"' target='_blank'>" + 
						//villagename + 
						"  (" +
						report.coords[0]+"|"+report.coords[1] + 
						")</a></th>" + 
						(unitHtml==""?"":("<td class='small' style='border:2px solid red; width:1px;' nowrap>"+unitHtml+"</td>")) + 
						"<th class='small' width='10%' align='right'>" + 
						"<span style='text-align:right'>" + attacked + 
						"<font color='green'><b> "+sTime + 
						"</b></font>" +  
						"</span>" + 
						"</th></tr></table>" + 
						"</td></tr>";

						 html += "";
						 var sum = 0;
						 var wh = storageArray[parseInt(report.buildings['storage'])];
						 for(var j in report.resources) { sum += report.resources[j]; }
						 html += "<tr class='selected'><td class='small' align='center'><img src='"+imgbase +"/res.png' height='12px'><b>" + 
						 wh + 
						 "</b></td>";
			//			 log(1,report.buildings.wood);
						var lvl = [];
						var _prod = [];
						var buildings = report.buildings;
			//GM_log(buildings["wood"]+"\n\r"+report.buildings.stone);
						lvl[0] = buildings["wood"]?buildings["wood"]:0;
						lvl[1] = report.buildings.stone?report.buildings.stone:0;
						lvl[2] = report.buildings.iron?report.buildings.iron:0;
						_prod[0] = _production[lvl[0]];
						_prod[1] = _production[lvl[1]];
						_prod[2] = _production[lvl[2]];
						//_prod[2] = (lvl[2]==0)?0:_production[lvl[2]];
	//	log(1,lvl[0]+"\n\r"+lvl[1]+"\n\r"+lvl[2]);

						var resources = report.resources.slice(); // slice = clone array
						resources[0] = Math.round(_prod[0]*(age/3600));
						resources[1] = Math.round(_prod[1]*(age/3600));
						resources[2] = Math.round(_prod[2]*(age/3600));
						var res = report.resources.slice();
						var storage = storageArray[parseInt(report.buildings['storage'])]; //�ֿ����
						var hide = hideArray[parseInt(report.buildings['hide'])];  // ɽ�����

			//				log(1,"storage[" + +report.buildings['storage']+"]: "+storage+"  /  hide["+report.buildings['hide']+"]: "+hide);
						storage = parseInt(storage);	
						hide = parseInt(hide);
						cavTotal = 0;
						for(var ires in resources) {
								//if (resources[ires]>storage) resources[ires] = storage;
								//usum += resources[ires];
							res[ires] = (report.resources[ires] + resources[ires])>storage?storage:(report.resources[ires] + resources[ires]);
							cavTotal += res[ires]; 
						}
								
							//var cavTotal = sum + usum;
						if (cavTotal > (storage-hide)*3) cavTotal = (storage-hide)*3;

						//var iLC = 0;
						//var cavCount = 0;
						if (cavTotal != 0){
							cavCount = cavTotal / unit_haul;
							cavCount = Math.ceil(cavCount) ;
							//cavCount = Math.ceil(Math.ceil(iLC/3)/100)*100;
						}
			
						html += "<td class='small'><table cellpadding='0' border='0' cellspacing='0' width='100%'><tr><td valign='top' width='80%' class='small'>" + 
									"<img src='"+imgbase +"/holz.png' height='12px'><B>" + 
									//(report.resources[0] + resources[0]) + 
									res[0] + 
									"</B><span class='inactive' title='"+_prod[0]+"'>/"+ 
									+lvl[0] + //_prod[0] + 
									"</span>&nbsp;"; 
						html += "<img src='"+imgbase +"/lehm.png' height='12px'><B>" + 
									//(report.resources[1] + resources[1]) + 
									res[1] + 
									"</B><span class='inactive' title='"+_prod[1]+"'>/"+ 
									+lvl[1] + //_prod[1]+ 
									"</span>&nbsp;"; 
						html += "<img src='"+imgbase +"/eisen.png' height='12px'><B>" + 
									//(report.resources[2] + resources[2]) + 
									res[2] + 
									"</B><span class='inactive' title='"+_prod[2]+"'>/"+ 
									+lvl[2] + //_prod[2]+ 
									"</span>&nbsp;&nbsp;&nbsp;"; 

						html += "<input id='cavTotal' type='hidden' value='"+cavTotal+"'/><img src='"+imgbase +"/res.png' height='12px'><b>" +cavTotal+"</b></td>";
						//if (report.ifarm!="") {html += "<th style='border:1px solid #987634;width:1px;'><img src='"+imgbase +"/command/attack.png?1'/></th>";}
						html += "<td class='small' id='att"+report.villageid+"' style='color:red;' valign='top' align='right' width='20%' nowrap><b><u>"+report.ifarm+"</u></b></td>";
						html += "</tr></table></td></tr>";	
						
						html += "<tr><td class='small' style='text-align:center;height:12px;border-top:0px dotted #987634;' nowrap>" + 
								"<img src='"+imgbase +"/forwarded.png'>" + 
								"<font color='green'><b><input id='dist_"+(jj+iStart)+"' type='hidden' value='"+dist+"'/>" + dist.toFixed(2) + " </b></font></td>" + 
								"<td id='"+report.villageid+"' name='farm_table_"+report.villageid+"' class='small' style='height:12px;border-top:0px dotted #987634;'>";


if (true) {
								html += "<table cellpadding='0' cellspacing='0' border='0' width='100%'><tr>"  + 
								"<td class='small'> <font color='green'><b><span id='speed_"+(jj+iStart)+"'>" + troops_speed + "</span></b></font></td>";
						//		"+unitOpts+"
						var did = parseInt(report.villageid);
						var pnt = points[did];
						if (!pnt) {
							pnt = {
									point:0,
									grow:0
							};
							//points[did] = pnt;
						}
						var strg = "";
						if (pnt.grow!=0) {
							strg = (pnt.grow!=0?"("+(pnt.grow>0?"+":"")+pnt.grow+")":'');
						}
						html += (pnt.point>0?("<td class='small' style='border:0px solid gold; width:1px;' nowrap><img src='"+imgbase +"/face.png' height='12px'/><b>"+pnt.point+"</b>"+strg+"</td>"):"");
						html +=	(wallHtml==""?"":(iWall>0?("<td class='small' style='border:2px solid red; width:1px;' nowrap>"+wallHtml+"</td>"):("<td style='width:1px;'nowrap>"+wallHtml+"</td>")));
						
			// ------------------------ 侦查
							html +=  "<td style='border:1px solid #987634;' width='16px' nowrap><a href='javascript:farmIt(" + 
										 report.villageid + "," + 
										 report.coords[0] + 
										 ","+ report.coords[1] + 
										 ",0,true);' title='Scout '>" + 
										 "<img src='"+imgbase +"/unit/unit_spy.png?1' height='12px'></a></td>";
								// 手动抢夺									
						html += "<td style='border:1px solid #987634;' width='16px' nowrap><a href='javascript:{"+ 
										 "insertUnit(document.forms[0].spy, \"1\");"+ 						 
										 "insertUnit(document.forms[0].light, \""+ (cavCount+2) + "\");"+ 
										 "insertUnit(document.forms[0].x, \""+ report.coords[0] + "\");"+ 
										 "insertUnit(document.forms[0].y, \""+ report.coords[1] + "\");" + 
										 "}' title='Rally point '>" +  
										 "<img src='"+imgbase +"/buildings/place.png?1' height='12px'></a></td>";
							
						html += "<td style='border:1px solid #987634;' width='16px' nowrap>" + 
										 "<a href='javascript:farmIt(" + 
										 report.villageid + "," + 
										 report.coords[0] + 
										 ","+ report.coords[1] + 
										 ",0,true,true);' title='Attack with Axemen'>" + 
										 "<img src='"+imgbase +"/unit/unit_axe.png?1' height='12px'></a></td>";
						
						html += "<td style='border:1px solid #987634;' width='16px' nowrap>" + 
										 "<a href='javascript:farmIt(" + 
										 report.villageid + "," + 
										 report.coords[0] + 
										 ","+ report.coords[1] + 
										 ",0,true,false,true);' title='Attack with spears'>" + 
										 "<img src='"+imgbase +"/unit/unit_spear.png?1' height='12px'></a></td>";


						html += "<td style='border:1px solid #987634;' width='16px' nowrap>" + 
								"<a href='javascript:farmIt(" + 
								report.villageid + "," + 
								report.coords[0] + 
								","+ report.coords[1] + 
								","+parseInt(cavCount+2)+",true);' title='Loot'" + 
								((iTroops==0)?">":" onclick='javascript:return false;'>") + 
								"<img src='"+imgbase +"/unit/unit_light.png?1' height='12px'>" +  		
								parseInt(cavCount+2) + 
								"</a></td>";

						if (cavCount/2>10) {
							html += "<td style='border:1px dotted #987634;' width='16px' nowrap><a href='javascript:farmIt(" + 
									report.villageid + "," + 
									report.coords[0] + 
									","+ report.coords[1] + 
									","+parseInt((cavCount+2)/2)+",true);' title='Loot'" + 
									((iTroops==0)?">":" onclick='javascript:return false;'>") + 
									parseInt((cavCount+2)/2) + "</a></td>";
										 // farm 2		 	
						}
						if (cavCount/3>10) {
							html += "<td style='border:1px dotted #987634;' width='16px' nowrap><a href='javascript:farmIt(" + 
									report.villageid + "," + 
									report.coords[0] + 
									","+ report.coords[1] + 
									","+parseInt((cavCount+2)/3)+",true);' title='Loot'" + 
									((iTroops==0)?">":" onclick='javascript:return false;'>") + 									
									parseInt((cavCount+2)/3) + "</a></td>";
										 // farm 3		 	
						}
						if (cavCount/4>10) {
							html += "<td style='border:1px dotted #987634;' width='16px' nowrap><a href='javascript:farmIt(" + 
									report.villageid + "," + 
									report.coords[0] + 
									","+ report.coords[1] + 
									","+parseInt((cavCount+2)/4)+",true);' title='Loot'" +  
									((iTroops==0)?">":" onclick='javascript:return false;'>") + 
									parseInt((cavCount+2)/4) + "</a></td>";
										 //  farm 4
						}
							
						html += "</tr></table>";
}						

						html += "</td></tr></th></tr></table></td>";
						if ((jj/2) == parseInt(jj/2)) html += "</tr>";
						i++;
						if (i == rCount ) {
							html += "<table cellpadding='0' cellspacing='0' border='0' width='100%'><tr>" + 
									"<td style='text-align:right;'>" + 
									get_rallypoint_html(v.id,"","") + 
									"</td></tr>" +  
									"</table>";	 
						}
													 
						if (i > rCount -1) return html;
					 }
				 }
				 if(i==0) {html += "No reports found - look at some reports first";}
				 html += "</table>";

				 _log("rStep:"+rStep+"  iStart:"+iStart+"  rCount:"+rCount,false);
				 return html;
	}
	function _generate_report() {
			// find report id
		if(/mode=attack/.test(location.href)){}
		else{
			if(/mode=all/.test(location.href)){}
			else{
				if(!(/view=/.test(location.href))) return false;
				_log("not an attack's report: "+!(/mode=all/.test(location.href)));
				return false;
			}
		}
	
		var walls = 1;
		var tmp=location.href.match(/view=(\d+)/);
	//	log(1,eval(tmp));
		if(!tmp) return false;
		var report_id = tmp[1];
		var timeTD = $("table.vis:eq(3) tr:eq(1) td:last")[0];
		var time = Date.parse(timeTD.innerHTML); 

	//			 GM_log(time);	
		var report = {
					id : report_id,
					timestamp : time,
					timefull : timeTD.innerHTML,
					ifarm : "",
				//	pop: 0,
		};

		var UnitArray = [0,0,0,0,0,0,0,0,0,0,0,0,0];
		var UnitTarget1 = $("table[id='attack_info_def_units'] tr:eq(1) td"); //Ŀ����
		var UnitTarget2 = $("table[id='attack_info_def_units'] tr:eq(2) td");  //Ŀ�걻������
		for (var u=1;u<UnitTarget1.length;u++) {
			if (parseInt(UnitTarget1[u].innerHTML)>0) {
				UnitArray[u-1] = parseInt(UnitTarget1[u].innerHTML)-parseInt(UnitTarget2[u].innerHTML)+0.1;
	//GM_log(UnitTarget1.length+"      "+UnitArray[u-1]);
			}
		}
		report.Units = UnitArray;

		var priceTotal = 0;
		var peopleTotal = 0;
		var uLost = 0;
		var attack_info_att = $("table[id='attack_info_att_units']")[0];
	//	GM_log("attack_info_att:\n\r"+attack_info_att.innerHTML);
		var rLost = $('tr:eq(2) td', attack_info_att);	
		for (r=1;r<rLost.length;r++) {
			if (parseInt(rLost[r].innerHTML) > 0) {
				uLost = parseInt(rLost[r].innerHTML);
				priceTotal += priceArray[r] *uLost;
				peopleTotal += peopleArray[r] * uLost;
				rLost[r].innerHTML += "<br>" + (peopleArray[r] > 1? "(<font color='green'>"+peopleArray[r] * uLost+ "</font>)" : "") +"<br><font color='green'>" +priceArray[r] * uLost+ "</font>";			
	//GM_log("rLost"+r+":\n\r"+rLost[r].innerHTML);
			}
		}
		if (priceTotal >0) rLost[0].innerHTML += (peopleTotal > 0? "<br>(<font color='green'><b>"+peopleTotal+ "</b></font>)" : "") +"<br><font color='green'><b>" + priceTotal+ "</b></font>";
		peopleTotal = 0;
		priceTotal = 0;
		var attack_info_def = $("table[id='attack_info_def_units']")[0];
		var rLost = $('tr:eq(2) td', attack_info_def);	
		for (r=1;r<rLost.length;r++) {
			if (parseInt(rLost[r].innerHTML) > 0) {
				uLost = parseInt(rLost[r].innerHTML);
				priceTotal += priceArray[r] *uLost;
				peopleTotal += peopleArray[r] * uLost;
				rLost[r].innerHTML += "<br>" + (peopleArray[r] > 1? "(<font color='red'>"+peopleArray[r] * uLost+ "</font>)" : "") +"<br><font color='red'>" +priceArray[r] * uLost+ "</font>";			
					//log(1,rLost[r].innerHTML);
			}
		}
		if (priceTotal >0) rLost[0].innerHTML += (peopleTotal > 0? "<br>(<font color='red'><b>"+peopleTotal+ "</b></font>)" : "") +"<br><font color='red'><b>" + priceTotal+ "</b></font>";
		var target = $("table[id='attack_info_def']")[0];
		var targetPlayerA = $('tr:first > th:eq(1)', target)[0];
	//if(! target) return;
	//GM_log("target: "+target.innerHTML);
	//if(! target) return;
		report.player = targetPlayerA.innerHTML; // TODO: strip HTML
		var targetVillageA = $('tr:eq(1) > td:eq(1) a', target)[0];
		tmp = targetVillageA.href.match(/&id=(\d+)/);
		var village_id = tmp[1];
		if (myVillages()[village_id]) {
			_log("Not an attack report ("+village_id+")");
			return false;
		}
		report.villageid = village_id;
		tmp = targetVillageA.innerHTML.match(/(.+) \((-?\d+\|-?\d+)\)(?: (K\d+))?/);
		report.villagefull = targetVillageA.innerHTML;
		report.villagename = tmp[1];
		report.coords = tmp[2].split("|");
		var resources = [0,0,0];
		var resourceTD = $('td:has(> img[src$="graphic/holz.png?1"])')[0];
		if (!resourceTD) resourceTD = $('td:has(> img[src$="graphic/lehm.png?1"])')[0];
		if (!resourceTD) resourceTD = $('td:has(> img[src$="graphic/eisen.png?1"])')[0];
	//GM_log(resourceTD.innerHTML);
		walls = 0;
		if (resourceTD) {
			newHtml = resourceTD.innerHTML.replace(/<span.*?<\/span>/g,""); // remove spans
			newHtml = newHtml.replace(/<img.*?>/g,""); // remove images
	//GM_log(newHtml);
			var ress = newHtml.split(" ");
	//GM_log("ress.length: "+ress.length);
			var r = 0;
			if (ress.length<4) {
				resources=[0,0,0];
				if (resourceTD.innerHTML.match("holz.png")) {r += 1;resources[0]=1;}
				if (resourceTD.innerHTML.match("lehm.png")) {r += 1;resources[1]=1;}
				if (resourceTD.innerHTML.match("eisen.png")) {r += 1;resources[2]=1;}
	//GM_log("r: "+r + "   resources[0]: " +resources[0] + "   resources[1]: " +resources[1] + "    resources[2]: " +resources[2]);
				if (r>0) {
					if (resources[2]>0)	resources[2] = parseInt(ress[0]);
					if (resources[1]>0)	resources[1] = parseInt(ress[0]);
					if (resources[0]>0)	resources[0] = parseInt(ress[0]);
				} else if (r>1) {
					if (resources[2]>0)	resources[2] = parseInt(ress[1]);
					if (resources[1]>0)	resources[1] = parseInt(ress[1]);
					if (resources[0]>0)	resources[0] = parseInt(ress[1]);						
				}
	//GM_log("r: "+r + "   resources[0]: " +resources[0] + "   resources[1]: " +resources[1] + "    resources[2]: " +resources[2]);
			} else {
				ress.length=3;
				resources = ress.map(function(element) {return parseInt(element);});
			}
		} else {walls = 999;}
		report.resources = resources;
				 
	//-----//////////////////////////--///////////////////////	// find building levels
		var buildingsTD = xpathGetFirst("//table[@id='attack_spy']/tbody/tr[2]/td");
	//GM_log("buildingsTD:\n\r"+buildingsTD.innerHTML);
		if (buildingsTD) {
			report.buildings = _get_buildings(buildingsTD);
			walls = 0;
		} else {
			if (!report.buildings) {
				report.buildings = {};
				var buildings = getValue("buildings")[curVillage];
	//GM_log(eval(buildings));
				for (bld in buildings) {
					report.buildings[bld] = 1;
	//GM_log(""+bld+":"+report.buildings[bld]+"\n\r");
				}
			}
		}
		if (walls==999) report.buildings["wall"] = walls;
		
		var haul = $("table#attack_results tr:first td:last")[0];
		if (haul) {
			haul = parseInt(haul.innerHTML.split("/")[0]);
			var hauls = getValue("hauls");
			if (! hauls) {
				hauls = 0;
				setValue("haulstime",timeTD.innerHTML);
			}
			var rpts= getValue("reports");
			if (rpts){
				var rpt = rpts[village_id];
				if (rpt) { 
					if (rpt.id!=report_id) {
						hauls += haul;
						setValue("hauls",hauls);
					}
				}
			}
		}

	//GM_log("wall: "+walls+"report.buildings[wall]: "+report.buildings[wall]);
	//report.attacked = "  ";
	//report.end = "-->";
		_log("_generate_report ",false);
		return report;
	}
	function generate_report(doc,href) {
			// find report id
		var walls = 1;
		var timeTD = $("table.vis:eq(3) tr:eq(1) td:last",doc)[0];
		var time = Date.parse(timeTD.innerHTML); 
		//var rl = $("td:has(> a[href^='report_id'])",doc)[0];
		var href = $("td.nopad table.vis:first tr:first td:first a",doc)[0].href;
		var report_id = 0;
		if (href.indexOf("id=")>0) {
			var tmp=href.match(/id=(\d+)/);
			if(!tmp) return false;
			report_id = tmp[1];
		}

	//	GM_log(report_id+"      "+time);	
		var report = {
					id : report_id,
					timestamp : time,
					timefull : timeTD.innerHTML,
					ifarm : "",

		};

		var UnitArray = [0,0,0,0,0,0,0,0,0,0,0,0,0];
		var UnitTarget1 = $("table[id='attack_info_def_units'] tr:eq(1) td",doc); //Ŀ����
		var UnitTarget2 = $("table[id='attack_info_def_units'] tr:eq(2) td",doc);  //Ŀ�걻������
		for (var u=1;u<UnitTarget1.length;u++) {
			if (parseInt(UnitTarget1[u].innerHTML)>0) {
				UnitArray[u-1] = parseInt(UnitTarget1[u].innerHTML)-parseInt(UnitTarget2[u].innerHTML)+0.1;
	//GM_log(UnitTarget1.length+"      "+UnitArray[u-1]);
			}
		}
		report.Units = UnitArray;
				 
		var priceArray = [0,90,130,190,120,475,950,700,820,140000,0];
		var peopleArray = [ 0, 1, 1, 1, 2, 4, 6, 5, 8, 100,0];
		var priceTotal = 0;
		var peopleTotal = 0;
		var uLost = 0;
		var attack_info_att = $("table[id='attack_info_att_units']",doc)[0];
	//	GM_log("attack_info_att:\n\r"+attack_info_att.innerHTML);
		var rLost = $('tr:eq(2) td', attack_info_att);	
		for (r=1;r<rLost.length;r++) {
			if (parseInt(rLost[r].innerHTML) > 0) {
				uLost = parseInt(rLost[r].innerHTML);
				priceTotal += priceArray[r] *uLost;
				peopleTotal += peopleArray[r] * uLost;
				rLost[r].innerHTML += "<br>" + (peopleArray[r] > 1? "(<font color='green'>"+peopleArray[r] * uLost+ "</font>)" : "") +"<br><font color='green'>" +priceArray[r] * uLost+ "</font>";			
	//GM_log("rLost"+r+":\n\r"+rLost[r].innerHTML);
			}
		}
		if (priceTotal >0) rLost[0].innerHTML += (peopleTotal > 0? "<br>(<font color='green'><b>"+peopleTotal+ "</b></font>)" : "") +"<br><font color='green'><b>" + priceTotal+ "</b></font>";
		peopleTotal = 0;
		priceTotal = 0;
		var attack_info_def = $("table[id='attack_info_def_units']",doc)[0];
		var rLost = $('tr:eq(2) td', attack_info_def);	
		for (r=1;r<rLost.length;r++) {
			if (parseInt(rLost[r].innerHTML) > 0) {
				uLost = parseInt(rLost[r].innerHTML);
				priceTotal += priceArray[r] *uLost;
				peopleTotal += peopleArray[r] * uLost;
				rLost[r].innerHTML += "<br>" + (peopleArray[r] > 1? "(<font color='red'>"+peopleArray[r] * uLost+ "</font>)" : "") +"<br><font color='red'>" +priceArray[r] * uLost+ "</font>";			
					//log(1,rLost[r].innerHTML);
			}
		}
		if (priceTotal >0) rLost[0].innerHTML += (peopleTotal > 0? "<br>(<font color='red'><b>"+peopleTotal+ "</b></font>)" : "") +"<br><font color='red'><b>" + priceTotal+ "</b></font>";
		var target = $("table[id='attack_info_def']",doc)[0];
		var targetPlayerA = $('tr:first > th:eq(1)', target)[0];
	//if(! target) return;
	//GM_log("target: "+target.innerHTML);
	//if(! target) return;
		report.player = targetPlayerA.innerHTML; // TODO: strip HTML
		var targetVillageA = $('tr:eq(1) > td:eq(1) a', target)[0];
		tmp = targetVillageA.href.match(/&id=(\d+)/);
		var village_id = tmp[1];
		if (myVillages()[village_id]) {
			_log("Not an attack report ("+village_id+")");
			return false;
		}
		report.villageid = tmp[1];
		tmp = targetVillageA.innerHTML.match(/(.+) \((-?\d+\|-?\d+)\)(?: (K\d+))?/);
		report.villagefull = targetVillageA.innerHTML;
		report.villagename = tmp[1];
		report.coords = tmp[2].split("|");
		var resources = [0,0,0];
		var resourceTD = $('td:has(> img[src$="graphic/holz.png?1"])',doc)[0];
		if (!resourceTD) resourceTD = $('td:has(> img[src$="graphic/lehm.png?1"])',doc)[0];
		if (!resourceTD) resourceTD = $('td:has(> img[src$="graphic/eisen.png?1"])',doc)[0];
	//GM_log(resourceTD.innerHTML);
		walls = 0;
		if (resourceTD) {
			newHtml = resourceTD.innerHTML.replace(/<span.*?<\/span>/g,""); // remove spans
			newHtml = newHtml.replace(/<img.*?>/g,""); // remove images
	//GM_log(newHtml);
			var ress = newHtml.split(" ");
	//GM_log("ress.length: "+ress.length);
			var r = 0;
			if (ress.length<4) {
				resources=[0,0,0];
				if (resourceTD.innerHTML.match("holz.png")) {r += 1;resources[0]=1;}
				if (resourceTD.innerHTML.match("lehm.png")) {r += 1;resources[1]=1;}
				if (resourceTD.innerHTML.match("eisen.png")) {r += 1;resources[2]=1;}
	//GM_log("r: "+r + "   resources[0]: " +resources[0] + "   resources[1]: " +resources[1] + "    resources[2]: " +resources[2]);
				if (r>0) {
					if (resources[2]>0)	resources[2] = parseInt(ress[0]);
					if (resources[1]>0)	resources[1] = parseInt(ress[0]);
					if (resources[0]>0)	resources[0] = parseInt(ress[0]);
				} else if (r>1) {
					if (resources[2]>0)	resources[2] = parseInt(ress[1]);
					if (resources[1]>0)	resources[1] = parseInt(ress[1]);
					if (resources[0]>0)	resources[0] = parseInt(ress[1]);						
				}
	//GM_log("r: "+r + "   resources[0]: " +resources[0] + "   resources[1]: " +resources[1] + "    resources[2]: " +resources[2]);
			} else {
				ress.length=3;
				resources = ress.map(function(element) {return parseInt(element);});
	//GM_log("r: "+r + "   resources[0]: " +resources[0] + "   resources[1]: " +resources[1] + "    resources[2]: " +resources[2]);
			}
		} else {walls = 999;}
		report.resources = resources;
				 
	//-----//////////////////////////--///////////////////////	// find building levels
		var buildingsTD = document.evaluate("//table[@id='attack_spy']/tbody/tr[2]/td",doc,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;
		if (buildingsTD) {
			report.buildings = _get_buildings(buildingsTD);
			walls = 0;
		} else {
			if (!report.buildings) {
				report.buildings = {};
				var buildings = getValue("buildings")[curVillage];
				for (bld in buildings) {
					report.buildings[bld] = 1;
	//GM_log(""+bld+":"+report.buildings[bld]+"\n\r");
				}
			}
		}
		if (walls==999) report.buildings["wall"] = walls;
		
		var haul = $("table[id='attack_results'] tr:first td:last",doc)[0];
		//GM_log(haul.innerHTML);
		if (haul) {
			haul = parseInt(haul.innerHTML.split("/")[0]);
			var hauls = getValue("hauls");
			if (! hauls) {
				hauls = 0;
				setValue("haulstime",timeTD.innerHTML);
			}
//	GM_log("village_id["+village_id+"]: "+report_id);
			var rpts= getValue("reports");
			if (rpts){
				var rpt = rpts[village_id];
				if (rpt) { 
					if (rpt.id!=report_id) {
						hauls += haul;
						setValue("hauls",hauls);
					}
				}
			}
		}

		_log("generate_report "+report_id,false);
		return report;
	}
	setFunc("changeReport", function(index){ 
		var r = $("select[name='report_list']")[0].options[index].value;
		//reportcache(parseInt(r));
		//return;
		//_log(r);
		if (parseInt(r)<9999) 
			reportcache(parseInt(r));
		else {
			$("input[id='b_report']")[0].checked = false; 
			$("table.main tr:first > td").html(rhtml);
		}
	});
	setFunc("changeStep", function(index){ 
		window.setTimeout(function() {
			var r = $("select[name='report_step']")[0].options[index].value;
			rStep = parseInt(r);
			setValue("report_step",rStep);
			var str = set_report_menu(rStep);
			$("div[id='footer_right']")[0].innerHTML = str; 
		},300)
	});
	setFunc("display_report_cache", function() { 
		window.setTimeout(function() {
			if (! $("input[id='b_report']")[0].checked){
				$("table.main tr:first > td").html(rhtml);
			} else {
				reportcache(iCount);
			}
		}, 0)});
	setFunc("read_report", function() { 
		window.setTimeout(function() {
		var leng = 1;
//		for(leng=9;leng>0;leng--){
			url = "http://"+World+".tribalwars.net/game.php?village="+curVillage+"&screen=report&mode=attack&from="+(leng-1)*12;
			var req = GM_xmlhttpRequest({
				method: "GET",
				url: url,
				data:null,
				onload: function(responseDetails){
					if (responseDetails.status  == 200) {
						dodge_div.innerHTML = responseDetails.responseText;
						//GM_log(dodge_div.innerHTML);
						var rl = $("form table.vis tr td:has(> input[name^='id_'])",dodge_div);
						//GM_log("rl.length:"+rl.length);
						var ct = 0;
						
						for (i=rl.length;i>0;i--) {
							//GM_log(rl[i-1].innerHTML.indexOf("(new)"));
							if (rl[i-1].innerHTML.indexOf("(new)")!=-1) {
								ct += 1;
								var r = $("a",rl[i-1])[0];
								//GM_log(r.href);
								var rid=r.href.match(/view=(\d+)/)[1];
								//GM_log(rid);
								var req = GM_xmlhttpRequest({
									method: "GET",
									url: r.href,
									data:null,
									onload: function(responseDetails){
										if (responseDetails.status  == 200) {
											dodge_div.innerHTML = responseDetails.responseText;
											var report = generate_report(dodge_div,r.href);
											if (report) _update_report(report);
											var rcid = $("td.nopad table.vis:first tr:first td:first a",dodge_div)[0].href.match(/id=(\d+)/)[1];
											//  (#"+rcid+")
											var rtitle = $("#labelText",dodge_div)[0].innerHTML;
											_log("Read report: <a target='_blank' href='/game.php?village="+curVillage+"&screen=report&mode=all&view="+rcid+"'>"+rtitle+"</a>");
										}
								}});
								//rl[i-1].innerHTML.replace("(new)","");
							}
							//_log("New report: "+rid);	
						}
						_log("New report: "+ct);
					}
				}
			});	
//	}
		}, 0)});
	setFunc("read_all_report", function() { 
		window.setTimeout(function() {
		var leng = 1;
		for(leng=2;leng>0;leng--){
			url = "http://"+World+".tribalwars.net/game.php?village="+curVillage+"&screen=report&mode=attack&from="+(leng-1)*12;
			var req = GM_xmlhttpRequest({
				method: "GET",
				url: url,
				data:null,
				onload: function(responseDetails){
					if (responseDetails.status  == 200) {
						dodge_div.innerHTML = responseDetails.responseText;
						//GM_log(dodge_div.innerHTML);
						var rl = $("form table.vis tr td:has(> input[name^='id_'])",dodge_div);
						//GM_log("rl.length:"+rl.length);

						for (i=rl.length;i>0;i--) {
								var r = $("a",rl[i-1])[0];
								//GM_log(r.href);
								//var rid=r.href.match(/view=(\d+)/)[1];
								//GM_log(rid);
								var req = GM_xmlhttpRequest({
									method: "GET",
									url: r.href,
									data:null,
									onload: function(responseDetails){
										if (responseDetails.status  == 200) {
											dodge_div.innerHTML = responseDetails.responseText;
											var report = generate_report(dodge_div,r.href);
											if (report) _update_report(report);
											var rcid = $("td.nopad table.vis:first tr:first td:first a",dodge_div)[0].href.match(/id=(\d+)/)[1];
											var rtitle = $("#labelText",dodge_div)[0].innerHTML;
											//  (#"+rcid+")
											//GM_log("read all reports: "+rcid);
											_log("Read report: <a target='_blank' href='/game.php?village="+curVillage+"&screen=report&mode=all&view="+rcid+"'>"+rtitle+"</a>");
										}
								}});
						}
					}
				}
			});	
	}
		}, 0)});
	setFunc("read_points", function() { 
		window.setTimeout(function() {
			var reports = getValue("reports");
			if (! reports) return false;
		for (var vid in reports) {
			url = "http://"+World+".tribalwars.net/game.php?village="+curVillage+"&screen=info_village&id="+vid;
			var req = GM_xmlhttpRequest({
				method: "GET",
				url: url,
				data:null,
				onload: function(responseDetails){
					if (responseDetails.status  == 200) {
						dodge_div.innerHTML = responseDetails.responseText;
						var did = $("table.vis:first tr:last td:last a",dodge_div)[0].href.split("target=")[1];
						if (! did) did = $("table.vis:first tr:last td:last a",dodge_div)[0].href.split("village_id=")[1];
						//var did = location.href.replace(/(.+)id=([^&]+)(.+)/g, "$2");
						//GM_log("did: "+did);
						var player = $("table.vis:first tr:eq(3) td:last",dodge_div)[0].innerHTML;
						var point = parseInt($("table.vis:first tr:eq(2) td:last",dodge_div)[0].textContent.replace(".",""));
						var points = getValue("points");
						if (!points) points = {};
						var pnt = points[did];
						if (!pnt) {
							pnt ={point:0,grow:0};
						}
						if (!pnt.grow) pnt.grow = 0;
						if (point!=pnt.point && pnt.point!=0) pnt.grow = point - pnt.point;
						pnt.point = point;
						points[did] = pnt;
						setValue("points", points);
						_log("read_points "+player+"("+did+"): "+point+" ("+pnt.grow+")",false);
					}
				}
			});	
		}
		}, 0)
	});
	setFunc("reportcache", function(r) { 
		window.setTimeout(function() {
			iCount = r;
			$("table.main tr:first > td").html(_get_report_html(r));
			_log("reportcache: "+(r-9)+"~"+r,false);
			$("input[id='b_report']")[0].checked = true;
		}, 0)});	 
	setFunc("report_sort_for_distance", function() { 
		 window.setTimeout(function() {
			_log("report_sort_for_distance ",false);
			 var reports = getValue("reports");
			 var ret = {};
			 var temp = {};
			 var villages = myVillages();
			 //GM_log("vid: "+vid+"     cur: "+curVillage);
			 var v = villages[curVillage];
			 var i = 0;
			 var j = 0;
			 for (var report_id in reports) { 
					var report = reports[report_id];
					var distance_x = v.x - report.coords[0];
					var distance_y = v.y - report.coords[1];
					var distance = parseInt(Math.sqrt(Math.pow(distance_x,2) + Math.pow(distance_y,2)) * 1000000);
		//			log(1,report_id + " / " +distance);
					if (!temp[distance]) {
						temp[distance] = report_id;
					} else {
						i++;
						temp[distance+i]  = report_id;
					}
					j++;
			}

			var tmp = 0;
			for ( var k=0; k<j; k++) {
				i = 0;
				for (var dist in temp) {
						if (temp[dist] !="@@@") {
								if (i==0) {tmp  = parseInt(dist); i++; }
								if (parseInt(dist)<tmp) {
										tmp = parseInt(dist);	
								}
						}
				}
				var vid = reports[temp[tmp]].villageid;
				ret[vid] = reports[temp[tmp]];
		//		log(1,"temp["+tmp+"]"+temp[tmp]);
				temp[tmp] = "@@@";
			}
			setValue("reports", ret);
			_log("report_sort_for_distance: Done ",false);
		 }, 0)});	 
	setFunc("report_sort_for_time", function() { 
		window.setTimeout(function() {
			_log("report_sort_for_time ",false);
			 var reports = getValue("reports");
			 var ret = {};
			 var temp = {};
			 //var villages = myVillages();
			 //var v = villages[vid];
			 var i = 0;
			 var j = 0;
			 for (var report_id in reports) { 
					var report = reports[report_id];
					var timestamp = parseInt(report.timestamp);
		//			log(1,report_id + " / " +distance);
					if (!temp[timestamp]) {
						temp[timestamp] = report_id;
					} else {
						i++;
						temp[timestamp+i]  = report_id;
					}
					j++;
			}

			var tmp = 0;
			for ( var k=0; k<j; k++) {
				i = 0;
				for (var ts in temp) {
						if (temp[ts] !="@@@") {
								if (i==0) {
									tmp  = parseInt(ts); 
									i++; 
								}
								if (parseInt(ts)>=tmp) {
										tmp = parseInt(ts);	
								}
						}
				}
				var vid = reports[temp[tmp]].villageid;
				ret[vid] = reports[temp[tmp]];
				//log(1,"temp["+tmp+"]"+temp[tmp]);
				temp[tmp] = "@@@";
			}
			setValue("reports", ret);
			_log("report_sort_for_time: Done ",false);
		 }, 0)});	
	setFunc("report_sort_for_point", function() { 
		window.setTimeout(function() {
			_log("report_sort_for_point ",false);
			var points = getValue("points");
			 var reports = getValue("reports");
			 var ret = {};
			 var temp = {};
			 //var villages = myVillages();
			 //var v = villages[vid];
			 var i = 0;
			 var j = 0;
			 for (var vid in points) { 
				//	var report = reports[vid];
					var point = points[vid];
					var pnt = parseInt(point.point)*10000;
		//			log(1,report_id + " / " +distance);
					if (!temp[pnt]) {
						temp[pnt] = parseInt(vid);
					} else {
						i++;
						temp[pnt+i] = parseInt(vid);
					}
					j++;
			}

			var tmp = 0;
			for ( var k=0; k<j; k++) {
				i = 0;
				for (var ts in temp) {
						if (temp[ts] !="@@@") {
							if (i==0) {
								tmp  = parseInt(ts); 
								i++; 
							}
							if (parseInt(ts)>=tmp) {
								tmp = parseInt(ts);	
							}
						}
				}
				//_log("temp["+tmp+"]: "+temp[tmp]);
				var did = temp[tmp];//reports[temp[tmp]].villageid;
				if (reports[did]) ret[did] = reports[did];
				//GM_log(eval(ret[did]));
				temp[tmp] = "@@@";
			}
			//setValue("rets", ret);
			for (var did in reports) {
				if (!ret[did]) {
					ret[did] = reports[did];
				}
			}
			setValue("reports", ret);
			_log("report_sort_for_point: Done",false);
		 }, 0)});
	function _update_report(report) {
		var reports = getValue("reports");
		if(!reports) reports = {};
		reports[report.villageid] = report;
		setValue("reports", reports);
		//_log("_update_report ",false);
	}
	function _get_buildings(buildingsTD) {
		var reverse = array_flip(getValue("buildings")[curVillage]);

		var buildingsText = buildingsTD.innerHTML.replace(/<.+?>/g,""); //this can also contain the loyalty loss.
		var buildings = {};
		$.each(buildingsText.split('\n'), function(i, buildingText) {
			var tmp = buildingText.match(/\s*(.*) \(.*?(\d+)\)/);
			if(!tmp) return; // don't know what this is -- return silently
			building = tmp[1];
			var level = parseInt(tmp[2]);
			if(!reverse[building]) return;
			buildings[reverse[building]] = level;
		});
		_log("_get_buildings ",false);
		return buildings;
	}
	function enhance_game_main(doc) {
		var pa = $("table.vis:eq(2) tr:first td:first")[0];
		if (pa) {
	//	GM_log(pa.innerHTML);
			if (pa.innerHTML.indexOf("» premium account")!= -1) {
	//	GM_log(pa.innerHTML.indexOf("» premium account"));
				var pn = pa.parentNode.parentNode;
				pn.parentNode.removeChild(pn);

				//pa.parentNode.parentNode.parentNode.setAttribute("style","display:none");
			}
		}
		var wood = $("#main_buildrow_wood td .nowrap")[0];
		//GM_log(wood.innerHTML);
		var wood_level = parseInt(wood.innerHTML.match(/Level (\d+)/)[1]);
		//GM_log(wood_level);
		var _prod_wood = _production[wood_level];
		var _prod_wood_next = _production[wood_level+1];
		wood.innerHTML = "(<span class='inactive'>"+wood_level+"/</span>"+_prod_wood+"/"+_prod_wood_next+")";

		var iron = $("#main_buildrow_iron td .nowrap")[0];
		var iron_level = parseInt(iron.innerHTML.match(/Level (\d+)/)[1]);
		var _prod_iron = _production[iron_level];
		var _prod_iron_next = _production[iron_level+1];
		iron.innerHTML = "(<span class='inactive'>"+iron_level+"/</span>"+_prod_iron+"/"+_prod_iron_next+")";

		var stone = $("#main_buildrow_stone td .nowrap")[0];
		var stone_level = parseInt(stone.innerHTML.match(/Level (\d+)/)[1]);
		var _prod_stone = _production[stone_level];
		var _prod_stone_next = _production[stone_level+1];
		stone.innerHTML = "(<span class='inactive'>"+stone_level+"/</span>"+_prod_stone+"/"+_prod_stone_next+")";
		
		var farm = $("#main_buildrow_farm td .nowrap")[0];
		var farm_level = parseInt(farm.innerHTML.match(/Level (\d+)/)[1]);
		var _population_farm = farmArray[farm_level];
		var _population_farm_next = farmArray[farm_level+1];
		farm.innerHTML = "(<span class='inactive'>"+farm_level+"</span>/"+_population_farm_next+")";

		var storage = $("#main_buildrow_storage td .nowrap")[0];
		var storage_level = parseInt(storage.innerHTML.match(/Level (\d+)/)[1]);
		var capacity_storage = storageArray[storage_level];
		var capacity_storage_next = storageArray[storage_level+1];
		storage.innerHTML = "(<span class='inactive'>"+storage_level+"</span>/"+capacity_storage_next+")";

		var buildings = getValue("buildings");
		if (!buildings) var buildings = {};
		var bc = 0;
		for (var bld in buildings) { bc++;}
		if (bc == 17) {_log("enhance_game_main return",false);return;}
		var buildingset = {};
		$('table[id=buildings] tr td:first-child').each(function() {
		var tmp = this.innerHTML.match(/screen=(.*?)"><img.*> (.*)</);
		_log(bc + "\n\r"+ tmp[1]+" \n\r "+tmp[2] + "\n\r" );
			if (!buildingset[tmp[1]]) buildingset[tmp[1]] = tmp[2];
		});
		buildings[curVillage] =  buildingset;
		setValue("buildings", buildings);
		_log("enhance_game_main ",false);
	}
	function enhance_game_report(doc) {
	if(!(/view=/.test(location.href))) {
	//	read_report();
		return false;
	}
	
		var report = _generate_report();
	//GM_log(report);
		if (report) _update_report(report);
	}
	function enhance_game_place(doc) {
		  if(/try=confirm/.test(location.href) || /mode=(?:units|sim)/.test(location.href)) return;
		  var units = getValue("units");
		  if (! units) units = {};
		 // _log("enhance_game_place ",false);
		  var rallypoints = getValue("rallypoints");
		  //if (rallypoints && units) return; // 存在rallypoints/units返回
		  var unitsObj = {};
		  var rallypoint = [];
		  col=0;
		  $("form > table:first tr:first > td").each(function() {
			  $("table tr td", this).each(function() {
				  var title = $(this).find("img")[0].title;
				  var input = $(this).find("input")[0];
				  //var number = $(this).find("a")[1].innerHTML.replace("(","").replace(")","");
				  //GM_log("number:"+number);
				  
				  //units.push(unit);
				  
				  var unitcount = parseInt($(this).find("a:last")[0].innerHTML.replace(/\(|\)/g,''));
				  var unit = {id:input.name,count:unitcount,title:title,index:(input.tabIndex-1)};
				  unitsObj[input.name] = unit;
				  rallypoint.push(unitcount);
			  });
			  col++;
		  });

		  //setValue("units", units);
		  if (! units[vid]) {
			units[vid] = unitsObj;
			setValue("units", units);
		  }
		  if(!rallypoints) rallypoints = new Object();
		  rallypoints[vid] = {'units':rallypoint};
		  setValue("rallypoints", rallypoints);
		  _log("enhance_game_place ",false);
	}
	function enhance_game_barracks(doc) {
		var unit_row = $('tr.row_a'); 
		var units = getValue("units");
		if(!units) units = new Object();
		var unit = units[vid];
		var unit_count = [0,0,0,0];
		var time,mins,secs,uph,upd;
		for (var u=0; u<unit_row.length; u++) {
			unit_count[u] = parseInt(unit_row[u].cells[6].innerHTML.split("/")[1],10);	
			
			mins = parseInt(unit_row[u].cells[5].innerHTML.split(":")[1],10);
			secs = parseInt(unit_row[u].cells[5].innerHTML.split(":")[2],10);
			time = mins*60+secs;
			uph = (3600/time).toFixed(1);
			upd = parseInt(24*3600/time,10);
			unit_row[u].cells[6].innerHTML += " <span class='small inactive'>("+uph+"/"+upd+")";
		}
		unit.spear.count = unit_count[0];
		unit.sword.count = unit_count[1];
		unit.axe.count = unit_count[2];
		setValue("units", units);
		_log("enhance_game_barracks ",false);
	}
	function enhance_game_stable(doc) {
		var unit_row = $('tr.row_a'); 
		var units = getValue("units");
		if(!units) units = new Object();
		var unit = units[vid];
		var unit_count = [0,0,0,0];
		var time,mins,secs,uph,upd;
		for (var u=0; u<unit_row.length; u++) {
			unit_count[u] = parseInt(unit_row[u].cells[6].innerHTML.split("/")[1]);	
			
			mins = parseInt(unit_row[u].cells[5].innerHTML.split(":")[1],10);
			secs = parseInt(unit_row[u].cells[5].innerHTML.split(":")[2],10);
			time = mins*60+secs;
			uph = (3600/time).toFixed(1);
			upd = parseInt(24*3600/time,10);
			unit_row[u].cells[6].innerHTML += " <span class='small inactive'>("+uph+"/"+upd+")";
		}
		unit.spy.count = unit_count[0];
		unit.light.count = unit_count[1];
		unit.heavy.count = unit_count[2];
		setValue("units", units);
		_log("enhance_game_stable ",false);
	}
	function enhance_game_garage(doc) {
		var unit_row = $('tr.row_a'); 
		var units = getValue("units");
		if(!units) units = new Object();
		var unit = units[vid];
		var unit_count = [0,0,0,0];
		var time,mins,secs,uph,upd;
		for (var u=0; u<unit_row.length; u++) {
			unit_count[u] = parseInt(unit_row[u].cells[6].innerHTML.split("/")[1]);	
			
			mins = parseInt(unit_row[u].cells[5].innerHTML.split(":")[1],10);
			secs = parseInt(unit_row[u].cells[5].innerHTML.split(":")[2],10);
			time = mins*60+secs;
			uph = (3600/time).toFixed(1);
			upd = parseInt(24*3600/time,10);
			unit_row[u].cells[6].innerHTML += " <span class='small inactive'>("+uph+"/"+upd+")";
		}
		unit.ram.count = unit_count[0];
		unit.catapult.count = unit_count[1];
		setValue("units", units);
		_log("enhance_game_garage ",false);
	}	
	function enhance_game_snob(doc) {
		var unit_row = $('td a:has(> img[src$="graphic/unit/unit_snob.png?1"])')[0].parentNode.parentNode;
		var units = getValue("units");
		if(!units) units = new Object();
		var unit = units[vid];
		var unit_count = unit_row.cells[4].innerHTML.split("/")[1];
		unit.snob.count = unit_count;
		setValue("units", units);
		_log("enhance_game_snob ",false);
	}	
	function enhance_game_info_village(doc) {
		var did = $("table.vis:first tr:last td:last a")[0].href.split("target=")[1];
		if (! did) did = $("table.vis:first tr:last td:last a",dodge_div)[0].href.split("village_id=")[1];
		//var did = location.href.replace(/(.+)id=([^&]+)(.+)/g, "$2");
		//GM_log("did: "+did);
		var point = parseInt($("table.vis:first tr:eq(2) td:last")[0].textContent.replace(".",""));
		var points = getValue("points");
		if (!points) points = {};
		var pnt = points[did];
		if (!pnt) pnt ={point:0};
		pnt.point = point;
		points[did] = pnt;
		setValue("points", points);
		_log("enhance_game_info_village ",false);
	}	
	function enhance_game_info_player(doc) {
		GM_log(location.href.indexOf("id="+pid));
		if (location.href.indexOf("id="+pid)== -1) {
			_log("enhance_game_info_player: other player, return");
			return false;
		}
		var vrows = $("table.vis:eq(1) tr");
		//if (! vrows) return false;
		//GM_log("did: "+did);
		var villages = {};
		for (var r=1;r<vrows.length;r++) {
			var v = $("td:first a",vrows[r])[0];
			var id = v.href.split("id=")[1];
			var name = v.textContent;
			var coord = $("td:eq(1)",vrows[r])[0].textContent;
			var x = coord.split("|")[0];
			var y = coord.split("|")[1];
			var point = $("td:last",vrows[r])[0].textContent;
			villages[id] = {
				id: id, 
				name: name, 
				x: parseInt(x), 
				y: parseInt(y), 
				continent: con, 
				points: point
			};			
			//GM_log("vid: "+id);
		}
		setValue("myVillages", villages);
		_log("enhance_game_info_player ",false);
	}	
	function display_troops() {
		var ua = getValue("units");
		var va = getValue("myVillages");
		if (!ua || !va) return false;
		var html = "<br/>";
		var u = ua[vid];
		html += "<table class='content-border' width='100%'>";
		html += "<tr><th>Villages</th>";
		for (var t in u) {
			var ui = u[t];
			html += "<th><img src='"+imgbase + "/unit/unit_"+ui.id+".png?1' style='margin:0px 2px' title='"+ui.title+"'>";
		}
		html += "</tr>";
		for (var v in va) {
			var id =va[v].id;
			var u = ua[id];
			html += "<tr>";
			html += "<td>"+va[v].name+"</td>";
			for (var t in u) {
				var ui = u[t];
				html += "<td>"+ui.count+"</td>";
			}
			html += "</tr>";
		}
		$("#content_value")[0].innerHTML += html;
	}
// -//////////////////-dodge-/////////////////////////-
	function get_server_time(doc){
		var sdt = $("[id='serverDate']",doc)[0].innerHTML.split("/");
		var sy = sdt[2];
		var sm = sdt[1];
		var sd = sdt[0];
		var st = $("[id='serverTime']",doc)[0].innerHTML;
		//var h = st.split(":")[0], min = st.split(":")[1], sec = st.split(":")[2];
		var ret = new Date(sy+ " "+sm+ " "+sd+ " "+ st);
		return ret;
	}
	function get_timeDiff(){
		var timec = [0,0];
		var iii = 0;
			var t0 = new Date().getTime();
			var ret = ajax("http://"+World+".tribalwars.net/game.php?village="+curVillage+"&screen=place", "GET");
			var t1 = new Date().getTime();
			timec[0] = t1 -t0;
			dodge_div.innerHTML = ret.responseText;
			timec[1] = get_server_time(dodge_div).getTime()-((new Date()).getTime()-timeZone);
		return timec;
	}
	function _final(doc){
		
		//var move = $("table.vis:last tr:last td:eq(1)",doc)[0].innerHTML;
		//var move1 = $("table.vis:last tr:last td:last",doc)[0].innerHTML;
		//_log("Arrival time: "+move +" <<"+ move1+">>",true);
		_log("<table class='vis'>"+$("table.vis:last",doc)[0].innerHTML+"</table>",true);
	}
	function dodge_final(doc){
		try{
			dodge_target.action_id =$("input[name='action_id']",doc)[0].value;
			dodge_target.url=$("form",doc)[0].action;
		} catch(e){
			var ss_time = get_server_time(doc);
			_log("<font color='blue'>"+ss_time +"</font>:  final: getValue fail ",true);
			return false
		}
		postvar += 	"&action_id="+dodge_target.action_id + 
					"&sumbit="+dodge_target.sumbit;
	//GM_log(postvar);
		GM_xmlhttpRequest({
				method: "POST",
				url: dodge_target.url,
				headers:{'Content-type':'application/x-www-form-urlencoded'},
				data:encodeURI(postvar),
				onload: function(responseDetails){
					if (responseDetails.status  == 200) {
						dodge_div.innerHTML = responseDetails.responseText;
						var ss_time = get_server_time(dodge_div);
						//_log("<font color='blue'>"+(ss_time.getTime()-temp)+"</font>",false);
						_log("<font color='blue'>"+ss_time +"</font>:  Complete  "+dodge_target.action_id,true);
						_final(dodge_div);
					}
				}
		});	
	}
	function dodge_confirm(doc){
		var url = "http://"+World+".tribalwars.net/game.php?village="+curVillage+"&screen=place&try=confirm";
		try{
			var exx=$("a[href^='javascript:insertUnit']",doc);
			dodge_target[unitsArray[0]] = exx[0].innerHTML.replace("(","").replace(")","");
			dodge_target[unitsArray[1]] = exx[1].innerHTML.replace("(","").replace(")","");
			dodge_target[unitsArray[2]] = exx[2].innerHTML.replace("(","").replace(")","");
			dodge_target[unitsArray[3]] = exx[3].innerHTML.replace("(","").replace(")","");
			dodge_target[unitsArray[4]] = exx[4].innerHTML.replace("(","").replace(")","");
			dodge_target[unitsArray[5]] = exx[5].innerHTML.replace("(","").replace(")","");
			dodge_target[unitsArray[6]] = exx[6].innerHTML.replace("(","").replace(")","");
			dodge_target[unitsArray[7]] = exx[7].innerHTML.replace("(","").replace(")","");
			dodge_target[unitsArray[8]] = exx[8].innerHTML.replace("(","").replace(")","");
			//dodge_target[unitsArray[9]] = exx[9].innerHTML.replace("(","").replace(")","");
			//dodge_target[unitsArray[10]] = exx[10].innerHTML.replace("(","").replace(")","");
			//dodge_target[unitsArray[11]] = exx[11].innerHTML.replace("(","").replace(")","");
			dodge_target.x=$("input[name='x']",doc)[0].value;
			dodge_target.y=$("input[name='y']",doc)[0].value;
			dodge_target.url=$("form",doc)[0].action;
		} catch(e){
			var ss_time = get_server_time(doc);
			_log("<font color='blue'>"+ss_time +"</font>:  Confirm: getValue fail",true);
			return false;
		}
		postvar =	"x="+dodge_target.x + 
					"&y="+dodge_target.y + 
					(dodge_target.support?("&support="+dodge_target.support):"") + 
					(dodge_target.attack?("&attack="+dodge_target.attack):"") + 
					"&"+unitsArray[0]+"="+dodge_target[unitsArray[0]] + 
					"&"+unitsArray[1]+"="+dodge_target[unitsArray[1]] + 
					"&"+unitsArray[2]+"="+dodge_target[unitsArray[2]] + 
					"&"+unitsArray[3]+"="+dodge_target[unitsArray[3]] + 
					"&"+unitsArray[4]+"="+dodge_target[unitsArray[4]] + 
					"&"+unitsArray[5]+"="+dodge_target[unitsArray[5]] + 
					"&"+unitsArray[6]+"="+dodge_target[unitsArray[6]] + 
					"&"+unitsArray[7]+"="+dodge_target[unitsArray[7]] + 
					"&"+unitsArray[8]+"="+dodge_target[unitsArray[8]];
		GM_xmlhttpRequest({
			method: "POST",
			url: url,
			headers:{'Content-type':'application/x-www-form-urlencoded'},
			data:encodeURI(postvar),
			onload: function(responseDetails) 
			{
				if (responseDetails.status  == 200) {
					dodge_div.innerHTML = responseDetails.responseText;		
					var ss_time = get_server_time(dodge_div);
					var _t = dodge_time.getTime()-ss_time.getTime()-tc-500;				
					setTimeout(function(){
						dodge_final(dodge_div);
					},_t);
					_log("<font color='blue'>"+ss_time +"</font>:  Confirm",true);
					_log($("table[id='contentContainer']",dodge_div)[0].innerHTML,true);
					_log("<font color='blue'>"+ss_time +"</font>:  Delay "+_t+"(ms)",true);
				}
			}
		});
		
	}
	function dodge(x,y,url) { 
		url = "http://"+World+".tribalwars.net/game.php?village="+curVillage+"&screen=place";
	//_log(url,true);
	//GM_log(doc.innerHTML);
		postvar = "x="+x+"&y="+y;
		GM_xmlhttpRequest({
			method: "POST",
			url: url,
			headers:{'Content-type':'application/x-www-form-urlencoded'},
			data:encodeURI(postvar),
			onload: function(responseDetails) 
				{
					if (responseDetails.status  == 200) {
						dodge_div.innerHTML = responseDetails.responseText;
						var ss_time = get_server_time(dodge_div);
						dodge_confirm(dodge_div)
						_log("<font color='blue'>"+ss_time +"</font>:  Command",true);
					}
				}
		});
	}
	function ready_to_dodge(){
			GM_xmlhttpRequest({
				method: "GET",
				data: null,
				url: dodge_target.url,
				onload: function(responseDetails) 
					{
						if (responseDetails.status  == 200) {
							dodge_div.innerHTML = responseDetails.responseText;
							var ss_time = get_server_time(dodge_div);
							var _t = dodge_time.getTime()-ss_time.getTime()-td-tc-5*1000;
							//setTimeout(function(){dodge(dodge_target.x,dodge_target.y,dodge_target.url);},_t-300);
							setTimeout(function(){dodge(dodge_target.x,dodge_target.y,dodge_target.url);},_t);
							_log("<font color='blue'>"+ss_time +"</font>:  startting dodge at <font color='green'>"+_t/1000+"</font>(s) later",true);
						}
					}
			});
	}
	function set_time_difference_calibration(){
		var diff = 0;
		var iii = 0;
		for (i=0;i<5;i++) {
			var ret = get_timeDiff();
			iii += ret[0];
			diff += ret[1];
			//_log("time difference: "+ret[1]+"ms,  time calibration: "+ret[0]+"ms",true);
		}
		tc = iii/5;
		td = diff/5;
		ready_to_dodge();
		_log("<font color='blue'>"+get_server_time(dodge_div) +"</font>:  td:"+td+"   tc:"+tc,true);
		$("#ii0")[0].value = tc;
		$("#diff0")[0].innerHTML = "time difference: " + td;
	}
	setFunc("countdown", function(){ 
		dodge_count -= 1000;
		if (dodge_count<30*1000) {
			window.clearInterval(t0);
			var ret = get_timeDiff();
			setTimeout(function(){set_time_difference_calibration()},0);
			_log(curVillage+" Getting time difference & time calibration",true);
		} else {
			$("#countdown")[0].innerHTML = dodge_count/1000;
		}
	});
	setFunc("setdodge", function(){ window.setTimeout(function() {
		if (t0) window.clearInterval(t0);
		interval = parseInt($("input[id='timer0']")[0].value);
		tc = parseInt($("#ii0")[0].value);
		dodge_target.url = "http://"+World+".tribalwars.net/game.php?village="+curVillage+"&screen=place";
		dodge_target.x = $("input[id='x0']")[0].value;
		dodge_target.y = $("input[id='y0']")[0].value;
		var y=$("input[id='year']")[0].value;
		var m=$("input[id='month']")[0].value;
		var d=$("input[id='day']")[0].value;
		var h=$("input[id='hour']")[0].value;
		var min=$("input[id='minute']")[0].value;
		var sec=$("input[id='second']")[0].value;
		mm=parseInt($("input[id='mm']")[0].value);
		dodge_time = new Date((new Date(y+" "+m+" "+d+" "+h+":"+min+":"+sec)).getTime()+mm);
		server_time = get_server_time(window.document);
		dodge_count = dodge_time.getTime() - server_time.getTime(); // -----///
	//	server_time = new Date(server_time+1000*3600*7);
//	GM_log(interval+"      dodge_time: "+dodge_time.getTime()+"  server_time:"+server_time.getTime()+"   "+(dodge_time.getTime()-server_time.getTime()));
		t0 = window.setInterval("countdown()",interval);
		_log("<font color='blue'>"+server_time +"</font>:  Countdown <font color='green'><span id='countdown'>"+dodge_count/1000+"</span></font>(s)",true);
	}, 0)});	 
	setFunc("changeOpt", function(index){ window.setTimeout(function() {
		var coord = $("select[name='coords']")[0].options[index].text;
		$("input[id='x0']")[0].value = coord.split("|")[0];
		$("input[id='y0']")[0].value = coord.split("|")[1];
		var vil = getValue("myVillages");
		var v = vil[curVillage];
		var to = [v.x,v.y];
		var from = coord.split("|");
		var d = get_distance_num(from, to);
		_log(v.id+"  ("+v.x+"|"+v.y +")  "+d.toFixed(2),false);
	}),0});
	setFunc("setOpt", function(id){ window.setTimeout(function() {
		var att = $("input[id='att']")[0];
		var spt = $("input[id='spt']")[0];
		if (id=="att") spt.checked = !att.checked;
		if (id=="spt") att.checked = !spt.checked;
		dodge_target.attack = att.checked;
		dodge_target.support = spt.checked;
		_log("  attack: "+dodge_target.attack+"&nbsp;     support: "+dodge_target.support,false);
	}),0});
	function TroopsSave () {
		var reports = eval(GM_getValue(_Unique+"_reports"));
		var coordx0 = "0";
		var coordy0 = "0";
		var strOpt = "<select name='coords' onChange='changeOpt(this.options.selectedIndex)'>";
		for(var v in reports) {
			var report = reports[v];
			var coord = report.coords.join('|');
			if (coordx0 == "0") {coordx0 = report.coords[0];coordy0 = report.coords[1];};
			strOpt += "<option value='" +coord+"'>"+coord+"</option>"
		}
		strOpt += "</select>";
		var stime = get_server_time(window.document);
	//GM_log(stime);
		var ltime = new Date();
		td = (ltime.getTime()-stime.getTime()-1000*3600*7)>0?(ltime.getTime()-stime.getTime()-1000*3600*7):0-(ltime.getTime()-stime.getTime()-1000*3600*7);
		tc = 2750 - td;

// ---------------------------------------------------------//
		var units = getUnits()[curVillage];
		var col = 1;
		var html = "<table>" + 
					"<tr><td>";
		  
		html += "<table class='header-border'><tr><td>" + 
				"<table class='box menu nowrap'>";
		html += "<tr>";
		for(var i in units) {
			var unit = units[i];
			html += "<td class='icon-box nowrap'>" + 
					"<img src='"+imgbase +"/unit/unit_"+unit.id+".png' title='"+unit.title+"' />" +
					"</td>";
		}
		html += "<td class='icon-box nowrap'>x </td><td class='icon-box nowrap'>y </td>";
		html += "</tr><tr class='newStyleOnly'><td class='shadow' colspan='14'>" + 
				"<div class='leftshadow'></div><div class='rightshadow'></div>" + 
				"</td></tr>";
		for (var row=0;row<3;row++) {
			html += "<tr>";
			for(var i in units) {
				var unit = units[i];
				html += "<td class='icon-box nowrap'>" + 
						"<input style='height:12px;' type='text' value='' tabindex='"+(unit.index+1)+"' size='6' name='"+unit.id+"_"+row+"'/>" +
						"</td>";
			}
			html += "<td class='icon-box nowrap'><input type='text' size='5' value='' name='x_"+row+"' id='inputx' /></td>";
			html += "<td class='icon-box nowrap'><input type='text' size='5' value='' name='y_"+row+"' id='inputy' /></td>";
			html += "</tr>";
		}

		html += "</table></td></tr></table></td></tr></table>";
		html += "<br/>";
//----------------------------------------------------------//		
		var mstime = 0;
		str = "<table class='box' width='100%'><tr><td><table class='vis' width='100%'><tr><th>" + 
				"<input type='button' id='dodge' onclick='javascript:setdodge();' value='dodge'/>" + 
				"<label><input type='radio' id='att' onchange='javascript:setOpt(\"att\");'/>attack </label>" + 
				"<label><input type='radio' id='spt' onchange='javascript:setOpt(\"spt\");'/>support </label>" + 
				"<span style='float:right;'>Timeout:<input id='timer0' name='timer0' size='5' value='1000' type='text' /></span>" + 
				"</th></tr>" + 
				"<tr><th><table class='vis' width='100%'><tbody><tr class='nowrap'><td width='50%'>" + 
				"time calibration(ms):<input id='ii0' name='ii0' size='4' value='"+tc+"' type='text' />" +
				"     time difference(ms):<input id='diff0' name='diff0' size='4' value='"+td+"' type='text' />" +
				"</td><td>" + 
				"x: <input id='x0' name='x0' size='4' value='"+coordx0+"' type='text' /> " +
				"y: <input id='y0' name='y0' size='4' value='"+coordy0+"' type='text' /> " + 
				strOpt+"</td></tr>" + 
				"<tr class='nowrap' colspan='2'><th colspan='2'>" + 
				"departure time:" + 
				"</th></tr>" + 
				"<tr class='nowrap'><td>" + 
				"Date(yyyy-mm-dd):<input id='year' name='year' size='4' value='"+stime.getFullYear()+"' type='text' />" + 
				" - <input id='month' name='month' size='2' value='"+(stime.getMonth()+1)+"' type='text' />" + 
				" - <input id='day' name='day' size='2' value='"+stime.getDate()+"' type='text' />" + 
				"</td><td>" + 
				"Time(hh:mm:ss.mm):<input id='hour' name='hour' size='3' value='"+stime.getHours()+"' type='text' />" + 
				" : <input id='minute' name='minute' size='3' value='"+(parseInt(stime.getMinutes())+2)+"' type='text' />" + 
				" : <input id='second' name='second' size='3' value='00' type='text' />" + 
				".<input id='mm' name='mm' size='4' value='"+mstime+"' type='text' />" + 
				"</th></tr>" + 
				"</td></tr>" + 
				"</tbody></table></td></tr><tr><th>Message:</th></tr>" + 
				"<tr><td id='info_div0'>" + 
				"input data and then click the checkbox to dodge for your troops.<br/>" + 
				"</td></tr></table></td></tr></table>";
		//str = html + str;

		$("table.main tr:first > td").html(str);
	}
//---////////////////////////---farm start---////////////////////////---//
	function set_farm_flag(ss_time){
		var reports = getValue("reports");

		var report = reports[farm_target.vid];
		report.ifarm = ss_time;
		//_log("update report: "+farm_target.vid);
		_update_report(report);
		setValue("reports", reports);
		_log("Complete at <font color='blue'>"+ss_time+"</font>."+farm_target.x+"|"+farm_target.y,false);
	}
	function farm_final(vid,doc){
		try{
			farm_target.action_id =$("input[name='action_id']",doc)[0].value;
			farm_target.url=$("form",doc)[0].action;
		} catch(e){
			var t=new Date();
			_log("final: get <i>action_id</i>  fail <font color='red'>"+t+"</font>  "+farm_target.x+"|"+farm_target.y);
			return false
		}
		postvar += 	"&action_id="+farm_target.action_id + 
					"&sumbit="+farm_target.sumbit;
	//GM_log(postvar);
		GM_xmlhttpRequest({
				method: "POST",
				url: farm_target.url,
				headers:{'Content-type':'application/x-www-form-urlencoded'},
				data:encodeURI(postvar),
				onload: function(responseDetails){
					if (responseDetails.status  == 200) {
						dodge_div.innerHTML = responseDetails.responseText;
						var ss_time = get_server_time(dodge_div);
						set_farm_flag($("[id='serverTime']",dodge_div)[0].innerHTML);
						var xpath = "td[id='att"+vid+"']";
						$(xpath)[0].innerHTML = "<b><u>"+$("[id='serverTime']",dodge_div)[0].innerHTML+"</u></b>";
						//xpathGetFirst(xpath).innerHTML = "<img src='"+imgbase +"/command/attack.png?1'/>";
						//_log("Complete at <font color='blue'>"+ss_time+"</font>."+farm_target.x+"|"+farm_target.y,false);
						
					}
				}
		});	
	}
	function farm_confirm(vid,doc){
		var url = "http://"+World+".tribalwars.net/game.php?village="+curVillage+"&screen=place&try=confirm";
		try{// 0:spear 2:axe 3:spy 4:LC
			var exx=$("a[href^='javascript:insertUnit']",doc);
			if (parseInt(farm_target[unitsArray[3]])>parseInt(exx[3].innerHTML.replace("(","").replace(")",""))) farm_target[unitsArray[3]] = 0;
			
			if (parseInt(farm_target[unitsArray[2]])>0) {
				farm_target[unitsArray[2]] = parseInt(exx[2].innerHTML.replace("(","").replace(")",""));
				farm_target[unitsArray[8]] = parseInt(exx[8].innerHTML.replace("(","").replace(")",""));
				farm_target[unitsArray[4]] = 0;
			} 
			else if (parseInt(farm_target[unitsArray[0]])>0) {
				farm_target[unitsArray[0]] = parseInt(exx[0].innerHTML.replace("(","").replace(")",""));
				farm_target[unitsArray[8]] = parseInt(exx[8].innerHTML.replace("(","").replace(")",""));
				farm_target[unitsArray[4]] = 0;
			}
			else if (parseInt(farm_target[unitsArray[4]])>parseInt(exx[4].innerHTML.replace("(","").replace(")",""))) {
				var uc = parseInt(exx[4].innerHTML.replace("(","").replace(")",""),10);
				var refarm = "<a href='javascript:farmIt(" + 
							vid + 
							"," + 
							farm_target.x + 
							"," + 
							farm_target.y + 
							"," + 
							uc + 
							",true,false,false)'> farm with " + 
							unitsArray[4]+ 
							"" + 
							exx[4].innerHTML + 
							"?</a>";
				_log("Confirm data: Not enough unit, "+refarm,false);
				return false;
			} else {
				farm_target[unitsArray[8]] = 0;
				//$("a[href^='javascript:insertUnit']")[4].innerHTML = parseInt(exx[4].innerHTML)-farm_target[unitsArray[4]];
			}
			farm_target.x=$("input[name='x']",doc)[0].value;
			farm_target.y=$("input[name='y']",doc)[0].value;
			farm_target.url=$("form",doc)[0].action;
		} catch(e){
			var ttt=new Date();
			_log("confirm: get <i>units</i> or <i>coords</i> fail <font color='red'>"+ttt+"</font>  "+farm_target.x+"|"+farm_target.y);
			return;
		}
		var uc = $("a[href^='javascript:insertUnit']");
		for (var u=0;u<9;u++) {
			uc[u].innerHTML = "("+(parseInt(exx[u].innerHTML.replace("(","").replace(")",""))-farm_target[unitsArray[u]])+")";
			//GM_log(parseInt(uc[u].innerHTML.replace("(","").replace(")",""))+"    "+farm_target[unitsArray[u]]);
		}
		postvar = "x="+farm_target.x + 
					"&y="+farm_target.y + 
					"&attack="+farm_target.attack;
		postvar += "&"+unitsArray[0]+"="+farm_target[unitsArray[0]];
		postvar += "&"+unitsArray[1]+"="+farm_target[unitsArray[1]];
		postvar += "&"+unitsArray[2]+"="+farm_target[unitsArray[2]];
		postvar += "&"+unitsArray[3]+"="+farm_target[unitsArray[3]];
		postvar += "&"+unitsArray[4]+"="+farm_target[unitsArray[4]];
		postvar += "&"+unitsArray[5]+"="+farm_target[unitsArray[5]];
		postvar += "&"+unitsArray[6]+"="+farm_target[unitsArray[6]];
		postvar += "&"+unitsArray[7]+"="+farm_target[unitsArray[7]];
		postvar += "&"+unitsArray[8]+"="+farm_target[unitsArray[8]];
		//postvar += "&"+unitsArray[9]+"="+farm_target[unitsArray[9]];
		//postvar += "&"+unitsArray[10]+"="+farm_target[unitsArray[10]];
		//postvar += "&"+unitsArray[11]+"="+farm_target[unitsArray[11]];
		GM_xmlhttpRequest({
				method: "POST",
				url: url,
				headers:{'Content-type':'application/x-www-form-urlencoded'},
				data:encodeURI(postvar),
				onload: function(responseDetails) 
					{
						if (responseDetails.status  == 200) {
							dodge_div.innerHTML = responseDetails.responseText;
							_log("Confirm data, "+farm_target.x+"|"+farm_target.y,false);
							farm_final(vid,dodge_div);
						}
					}
		});	
	}
	function farm(vid,x,y) { 
	url = "http://"+World+".tribalwars.net/game.php?village="+curVillage+"&screen=place";
	postvar = "x="+x+"&y="+y;
	var xhReq = GM_xmlhttpRequest({
			method: "POST",
			url: url,
			headers:{'Content-type':'application/x-www-form-urlencoded'},
			data:encodeURI(postvar),
			onload: function(responseDetails) 
				{
					if (responseDetails.status  == 200) {
						dodge_div.innerHTML = responseDetails.responseText;
						_log("Set up data, "+farm_target.x+"|"+farm_target.y,false);
						farm_confirm(vid,dodge_div);
					}
				}
		});
	}
	function ready_to_farm(vid,x,y){
			var url = "http://"+World+".tribalwars.net/game.php?screen=place";
			GM_xmlhttpRequest({
				method: "GET",
				data: null,
				url: url,
				onload: function(responseDetails) 
					{
						if (responseDetails.status  == 200) {
							dodge_div.innerHTML = responseDetails.responseText;
							_log("enter rallypoint, "+farm_target.x+"|"+farm_target.y,false);
							setTimeout(function(){farm(vid,x,y);},100); 
							return; 
						}
					}
			});
	}
	setFunc("farmIt", function(vid,x,y,cavCount,bSpy,bAxe,bSpear){ window.setTimeout(function() {
		if (bAxe) {farm_target[unitsArray[2]] = 1;} 
		else if (bSpear) {farm_target[unitsArray[0]] = 1;}
		else {
			farm_target[unitsArray[2]] = 0;
			farm_target[unitsArray[4]] = cavCount;
		}
		if (bSpy) farm_target[unitsArray[3]] = 1;
		else farm_target[unitsArray[3]] = 0;
		//farm_target[unitsArray[5]] = cavCount;
		farm_target.x = x;
		farm_target.y = y;
		farm_target.vid = vid;
		_log("Satrting... "+farm_target.x+"|"+farm_target.y,false);
		ready_to_farm(vid,x,y);
	},0)});
// ---////////////////////////---farm end---////////////////////////---//
	function set_report_menu(iStep){
		var reports = getReportsByVillage();
		var i=0;
		for (var report_id in reports) { i++;}

		var iCnt = ((i/iStep)+1);
		var strRC = '<a href="javascript:read_all_report()">»G<span class="small">et all reports</span></a>';
		strRC += '<a href="javascript:read_points()"> »G<span class="small">et points</span></a>';
		strRC += '<a href="javascript:report_sort_for_distance()" title="Sort report with distance"> »d<span class="small">istance</span></a>'; 
		strRC += '<a href="javascript:report_sort_for_point()" title="Sort report with point"> »p<span class="small">oint</span></a>'; 
		strRC += '&nbsp;<a href="javascript:report_sort_for_time()" title="Sort report with time"> »t<span class="small">ime</span></a>'; 
		
		var strOpt = "";
		strOpt = "&nbsp;&nbsp;<select name='report_step' onChange='changeStep(this.options.selectedIndex)' style='color:white;background-Color: #987634;border:1px solid white;'>";
		strOpt += "<option value='"+(iStep-4)+"'>"+(iStep-4)+"</option>";
		strOpt += "<option value='"+(iStep-2)+"'>"+(iStep-2)+"</option>";
		strOpt += "<option value='"+(iStep)+"' selected='true'>"+(iStep)+"</option>";
		strOpt += "<option value='"+(iStep+2)+"'>"+(iStep+2)+"</option>";
		strOpt += "<option value='"+(iStep+6)+"'>"+(iStep+6)+"</option>";
		strOpt += "<option value='"+(iStep+10)+"'>"+(iStep+10)+"</option>";

		strOpt += "</select>";

		strOpt += "<select name='report_list' onChange='changeReport(this.options.selectedIndex)' style='color:white;background-Color: #987634;border:1px solid white;'>";
		strOpt += "<option value='9999'>Report</option>";
		strOpt += "<option value='0'>All</option>";
		for (ii=1; ii<iCnt; ii++) {
			strOpt += "<option value='" + ii*iStep +"'>"+((ii-1)*iStep+1) + ' ~' + ii*iStep +"</option>"
		}
		
		strOpt += "</select>";
		strRC += strOpt;
		strRC += "" + 
				"<input id='b_report' name='b_report' type='checkbox' valign='middle'" + 
				" onChange='javascript:display_report_cache();' style='color:white;background-Color: #987634;border:1px solid white;'>" + 
				"<b>t<span class='small'>oggle &nbsp;</span></b></input>";
		if (! br) rhtml = $("table.main tr:first > td")[0].innerHTML;
		return strRC;
	}
	setFunc("changeVil", function(index){ window.setTimeout(function() {
		var vid = $("select[name='vills']")[0].options[index].value;
		var url = location.href.replace(/village=([^&]+)/g,"village="+vid);
		setValue("village_selected",parseInt(vid));
		location.href = url;
	}),0});
	function set_vil_menu() {
		var vils = myVillages();
		var vils = getValue("myVillages");
		var vv = 0;
		for (var vid in vils) {vv++;}
		var disabled = false;
		if (vv==1) disabled = true;
		var vhtml = "<select id='vills' name='vills' onChange='changeVil(this.options.selectedIndex)' " + 
					"style='color:#885614;background-Color: RGB(194,174,131);border:1px solid #987644;'>";
		for (var vid in vils) {
			var vil = vils[vid];
	//GM_log(vil.x);
			var sel = curVillage==vid?'selected="true"':'';
	//GM_log("curVillage: "+curVillage+"   vid: "+vid);
			vhtml += '<option value="'+vid+'" '+sel+'>' + 
					vil.name + "  ("+vil.points+")" +
					'</option>';
		}
		vhtml += '</select>';
		//GM_log("vhtml: "+vhtml);
		$("td#menu_row2_village")[0].innerHTML = vhtml;	
		//GM_log("vhtml: "+$("td#menu_row2_village")[0].innerHTML);
	}
	if (true) {
		if (Screen == "main") enhance_game_main();
		else if (Screen == "report") enhance_game_report();
		else if (Screen == "overview_villages") {getUserVillages();display_troops();}
		else if (Screen == "place") enhance_game_place();
		else if (Screen == "stable") enhance_game_stable();
		//else if (Screen == "statue") enhance_game_statue();
		else if (Screen == "garage") enhance_game_garage();
		else if (Screen == "barracks") enhance_game_barracks();
		else if (Screen == "snob") enhance_game_snob();
		else if (Screen == "premium") TroopsSave();
		else if (Screen == "info_village") enhance_game_info_village();
		else if (Screen == "info_player") enhance_game_info_player();

		unit_index = getValue("unit_index",-1);
		if(unit_index<0) {
			setValue("unit_index",4);
			
			unit_index = 4;
		}
		//GM_log("unit_index: "+unit_index);
		troops_type = unitsArray[unit_index];
		
		unit_haul = haulArray[unit_index]; 
	//GM_log("troops_type: "+troops_type+"  unit_haul: "+unit_haul);
	
		if ($("[class='icon header new_report']").length>0) read_report();
		if (villages_count>1) set_vil_menu();
		rStep = getValue("report_step");
		if (! rStep) {
			rStep = 10;
			setValue("report_step",rStep);
		}
		strRC = set_report_menu(rStep);
		$("tr[id='menu_row'] td:eq(1) a")[0].href += "&mode=attack";
		//$(".main_layout tr:first")[0].innerHTML = "";
		//var mt2 = $("tr[id='menu_row2'] td:eq(2)")[0];
		
		var crd = $("tr[id='menu_row2'] td:eq(5) a[href='#']")[0];
		//GM_log(crd.innerHTML);
		if (crd) crd.parentNode.setAttribute("style","display:none");
		var crd = $("tr[id='menu_row2'] td:eq(4) b.nowrap")[0];
		//GM_log(crd.innerHTML);
		if (crd) crd.parentNode.setAttribute("style","display:none");
		var crd = $("tr[id='menu_row2'] td:eq(2) b.nowrap")[0];
		//GM_log(crd.innerHTML);
		if (crd) crd.parentNode.setAttribute("style","display:none");
		
		var MaJia = "M<span class='small'>a</span>J<span class='small'>ia</span> <span class='small'>2011</span>";
		$("#menu_row2_map")[0].setAttribute("style","display:none"); //$("#menu_row2_map")[0].innerHTML = "";//(incoming>0?incoming:(sitter_id>0?sitter_id:MaJia));//mt2.innerHTML.split("(")[1].split(")")[0];
		//var mt1 = $("tr[id='menu_row2'] td:eq(1)")[0];
		//var mt0 = $("tr[id='menu_row2'] td:eq(0)")[0];
		//var mt = $("tr[id='menu_row2']")[0];
		//var mnu = "<td id='menu_row2_map' class='firstcell'>"+mt0.innerHTML +"</td>" +  
		//		  "<td style='white-space:nowrap;' id='menu_row2_village' class='icon-box nowrap'>"+mt1.innerHTML +"</td>" + 
		//		  menu_xhtml; 
		//mt.innerHTML = mnu;
		var menu_row2 = $("tr[id='menu_row2']")[0];
		menu_row2.innerHTML = menu_xhtml +menu_row2.innerHTML;
		var attr = $("div[id='linkContainer']")[0].getAttribute("style");
		//GM_log(attr);
		$("div[id='linkContainer']")[0].setAttribute("style","max-width:100%;width:100%;")
		$("div[id='footer_right']")[0].innerHTML = strRC;
		btime = new Date()- btime;
		_msg(""+btime+"ms  "); 
	}
} 
catch(e){
	GM_log("Error: "+e);
	return false
}
	