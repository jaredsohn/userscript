﻿// ==UserScript==
// @name           OGame Redesign: Links for expedition and colonization
// @namespace      8arlock
// @description    Links for expedition and colonization on second fleet page
// @version        0.05
// @include        http://*.ogame.*/game/index.php?page=fleet2*
// @include        http://*.ogame.*/game/index.php?page=movement*
// @include        http://*.ogame.*/game/index.php?page=galaxy*

// ==/UserScript==
(function() 
{
	var theHref = document.location.href;
	// The following "if" is not really necessary but with it this script will work for Opera too
	if ((theHref.indexOf ("/game/index.php?")                  	<  0) ||
	    ((theHref.indexOf ("/game/index.php?page=fleet2")      	<  0) &&
	    (theHref.indexOf ("/game/index.php?page=movement")   <  0) &&
	    (theHref.indexOf ("/game/index.php?page=galaxy") 		<  0)))
		return;
	
	var icon_expedition = 'data:image/gif;base64,R0lGODlhEQARAPf/ADlYl017yjNQiUVtt0RprUFkpT1foz1foD1dozhZmDdamTZWkzJOhSU8azRQiP///iY+cENnrjxenz1ipC5KgEFjpEJprT9jp0ZknkBnq0dZgkRpqydCeCtEdzZdqGiS1yc/cDNXmz5kpkJwwUt2xjhgo2yMxsfS5jlirUFnsDtiqkJnqV2CwVN2t+/0+TVTj+Pp8X2YzneNs058zDxdnpGnzEJprsrT4UluslJqmkForDJQijpgoi5IfTpfn6y83TNTlcbV7HKGsTNPijhalUBsvElwukNglz5XkYWdxjBHdpmszCM4aUZutEFmrEBmrj1kqUBhoVJ5wEFmqTFbq5alvk9/0DBMhTFOhkJjqDhcnkRnrSlFfEt4w0FpsEFbkThXlPT5+f/+/jdWkf3+/TZUjqK21TFNiFh3rklzvTpfp/7+/SQ8biY+b0Jor0NprlN/zjliqkt7z0tvsVBpmzRRiUBorUFprPr8/EdtsUJoq1WB0SxIfj5jpmGL0jtfnj9krDZhsF5+vTFXoTFUlp2x1EpwtS1PjkBotH+WxDBMgX+b0EFquEduuPb2+lp+xE1zvVJ0rTtcnqizx0x0woCay5Soyjpdmj5foVd9wuzv9j1cmDFZot/k8TZfo3GX2fn5+naY1kJmrE1rpT5jpHye20BlqEprqLzP7TNRjEJmqkNlrUZttLXG50Zut7zL5mWL0bbH6jBMhzNOhs3a78/a7M3X6WGBvClDeDdWlClEeC1FezhMeE95x0VdiCY/dkVelkx70EhutEl2yPL4+TZYnFN7w5mw2zVVkmmLxkJprDRQijVVjzdXj0VprkVqrDZaoTFPiFl2q09+zkhwvcvU6TtdpCtPkjxenf///ZSozI2lzSY9bFF3wEJork18yjphp0NorVF+zSg+cMvU4Tphqkl6z/39/Ep0wkl0wDNXnnWOuzRQiThYmjtfoOju9Iqav/z+/fn8/PLz+D9lqUdts0BoqzZfqFSB0EdlnUdwt4qk0kFnqjxipP///wAAACH5BAEAAP8ALAAAAAARABEAAAj/AP9lWVVOxZZwEdxY8KZDz50Mff5Z0wJtSRI1ESzYefJGlCkRExAYsEejRI1KiNKke5SMmhFWyugZ8OJMwpQ4rtAN++YnVIBelAbw66cvjw8ogmDQKhVAzrQ9cEgsasEDkrA/gFic85ctyKdgVvCJk1JvQrdG7mwwauXvwQM8qD6Ym9GlyQVjqoikKAKL2AMxYVzEi+VnxAAJhiqwoSONkxl/8sgci3GiUyEMv5wVYOIrB6E582pVW2OCSiR4kzQ4qcCNy5lLHgo5yvQK1K1BhxgoIVCgQY8dCTzh0LQv0I93pw4pavOMVINdWHKtA7fNFop72sgh4QNiQxReuiikTcon6cANNMWuyaiCC8IKTOOiMQPT7oC6RJZCYANy5EUHBM1AIMAYCwCQgAKbCKFAArkgUwYHo/wDzBVDLOOAA+zsIEsdDswyCwVf/BMQADs=';	
	var icon_kolonisieren = 'data:image/gif;base64,R0lGODlhEQARAPf/ACaqqyWnqSajpSGcnSObnB6Skxd5eRV4eSetriitriWoqf7//xd9fB6SlBqGhyivsCKfoPD+/ySmphl8fB6Rkhh9fCmrrTTJySirrQZVVSu5uzDKyxelpimwsB2Nji7V2CGamyWlpRdeXym0tSasqyWioyKfnxh8fR2wspPn6CGambD29fr+/RuHid/s6/j+/WXi4S3AwAFVVkG7upjFxR+VliKeoDPa3jHLzxZkZCCamvr9/CisrjbZ2iarrDLPzyiur6HX2PL29Gqysyirqyy6uyWsrSG3ufP+//T//y9xbwtUVRSamfz+/yapqUujpSezsprX1v39/xuJiyCWl73g3977+yXKyyCZnCCbng5bXTG1t3vp6kfh4y/IyZvc3ef7/AFQUSmyszPd3i2/v6Pl5Sasrvr//u7+/ybl5iOeoPH9/vH9/y/Fxh+/wiewsBJlZRyOkAplZiOjofj9/RyLjBZ8fRqChiq5uim5uSatrSWmpiCZmhyJiiiurimztvX8/COXmfX9//f8/lDk5p3g3xd8e9719qvY2Gnt7XXU0yy1tHzZ2SCrref5+BNvcuf8/Vro6ieztITw7zB9exizt+/7/B5oaBh+fRaWlxp+fpC8uxKKiyarqSWzsx9+fSavryu7uxqDgzLS0h6gob3W1CGRkjXW2CGQlIDu7CWlpxp9f9z4+KP19iHOzyWxryKdniG9vyCanQpaWglbXiKkpA9eXwxoaySfoCu+vizKyyuOji7JyjDj5Znf3jCCgyakplOKiizCw2menyKdoBNxcTDf36f08y28vy69viWusfL8+6Xj5iasr/r+//v//u79/Sbi5SShpMHv8COjpSOfofD9/y6xtDHg4iyzsxl8fTLExfX+/iSgoSaxseXy8hZ2diewsR6ysy69wCy9wR6PkghiZC3CwSGbmyOjo/r//TnLzByPjhmJih2Ljhl+gRuChB+RkyOenvL8/Ci4uSiwsSasrB2anCaqrCSkpSGZmx+SlC/FxxyKi////wAAACH5BAEAAP8ALAAAAAARABEAAAj/AP/50GPBnpkEfhAgSMADAxESnf5Jk2UjnSp8CTrUe/MAgQJquEzsaaYvBIARufjxuqLLizA84QLI+yNJhQIx50bd6MKF0JhTG4ogqEZOAwgjoX4YizbJ37E0vXq0+dNtGzIsoGJ8iNTKCjdIKxJhw0GvxIVk6B64gQFtQRI0SJq8SOUqj4B1Pth5YsSKjrUIEdawEQQmxTgCZIDR2vXNn7Mz8ywte6ZuAZ0n5rJJCDNMCqIohQ4BcsTsS5BBm2Qsypeh1LdAHCqV8TctFgomVVzkgEJKiRAanAKIU8TC15FXmYbsCNaolghKn9oRcHJtxhZlAhrA+3XJ25wlch69TatDJcu9ATriOThwaxYQYlrsOPBQY4AaCBBg8aHQ7w4cCabYMkELU8RBwT4FNLBPOe70IUoxqPyzigEnTKBNBZgwwEAFhhhwADia/BMQADs=';	
	var wrap_body = 'data:image/gif;base64,R0lGODlhmwIdAJECAA0QFAAAAAAAAAAAACH5BAEAAAIALAAAAACbAh0AAAL/lB0BCu0Po5y02ouz3rz7D4biSJbmiabqyrZupyTHfCTLi+f6zvf+DwwKh8TiIxag0WwMo/MJjUqn1Kr1qkIqZ0ys9wsOi8fkclS7RcTM7Lb7DY/Ln+h0d47P6/f8vru+dec3SFhoeIg4AqgkmOj4CBkp2ba4tDaJmam5yalTyXXZKTpKWmra8FkTesra6vqal6p2A1tre4tLJSvQmOv7CxycstsrbHyMnHy0kJTGu6ocLT39SgxNjZ2tLWlNu/0NHt7X3SRufo4+Rp7O3u5+xuz87P1eb3//so6/z98fou8voMCBEAASPIjwnsGEDBuaW+gwosRpECdavAisIsaNEBxdaewIMiSnjyJLmnS0qAAAOw==';

	var versogame = document.getElementsByName('ogame-version').item(0);
	if(!versogame)
	{
		alert("This script 'OGame Redesign: Links for expedition and colonization' works only in ogame version 2.2.8 or higher.");
		return;
	}
	
	versogame = versogame.content.split('.');
	if((parseInt(versogame[0])*1000000+parseInt(versogame[1])*1000+parseInt(versogame[2])) < 2002008)
	{
		alert("This script 'OGame Redesign: Links for expedition and colonization' works only in ogame version 2.2.8 or higher.");
		return;
	}
	
	var universe = document.getElementsByName('ogame-universe').item(0).content.split('.');

	var ogameserver = universe[0];

	var Name2Num = [
		["uni101", "andromeda"],
		["uni102", "barym"],
		["uni103", "capella"],
		["uni104", "draco"],
		["uni105", "electra"],
		["uni106", "fornax"],
		["uni107", "gemini"],
		["uni108", "hydra"],
		["uni109", "io"],
		["uni110", "jupiter"],
		["uni111", "kassiopeia"],
		["uni112", "leo"],
		["uni113", "mizar"],
		["uni114", "nekkar"],
		["uni115", "orion"],
		["uni116", "pegasus"],
		["uni117", "quantum"],
		["uni118", "rigel"],
		["uni119", "sirius"],
		["uni120", "taurus"],
		["uni121", "ursa"],
		["uni122", "vega"],
		["uni123", "wasat"],
		["uni124", "xalynth"],
		["uni125", "yakini"],
		["uni126", "zagadra"]
	];

	for(var i = 0; i < Name2Num.length; i++) {
		ogameserver = ogameserver.replace(Name2Num[i][1], Name2Num[i][0]);
	}

	ogameserver += universe[2];

	getElementsByClassName = function (element, cl)
	{
		var retnode = [];
		var myclass = new RegExp ('\\b' + cl + '\\b');
		var elem = element.getElementsByTagName ('*');
		for (var i = 0; i < elem.length; i++)
		{
			var classes = elem [i].className;
			if (myclass.test (classes))
				retnode.push (elem [i]);
		}
		return retnode;
	}
	
	coords_in_array = function(_array,_value){
		for(var i = 0, l = _array.length; i < l; i++) 
			if (_array[i][0] == _value[0] && _array[i][1] == _value[1] && _array[i][2] == _value[2]) return i;
		return undefined;
	}

	Distance = function(current, target)
	{
		var dG = Math.abs(current[0] - target[0]);
		var dS = Math.abs(current[1] - target[1]);
		var dP = Math.abs(current[2] - target[2]);

		if(dG != 0)
		{
			return dG * 20000;
		} 
		else if(dS != 0) 
		{
			return dS * 5 * 19 + 2700;
		} 
		else if(dP != 0) 
		{
			return dP * 5 + 1000;
		} 
		else 
		{
			return 5;
		}
	}

	try {
		var Fleets = '';
		var dcoords = '';
		var acoords = localStorage.getItem(ogameserver+'ExpoLink');
		if(acoords) acoords = JSON.parse(acoords); else acoords = new Array();

		if ((document.location.href.indexOf('page=fleet2') > -1)  && !(document.location.href.indexOf('&cp=') > -1))
		{
			var cmission = document.getElementsByName('mission')[0].value;
			var cposition = document.getElementsByName('position')[0].value;

			if(cmission == 0 || cmission == 15 || cmission == 7 || cposition == 16) {
				document.getElementsByTagName('head')[0].appendChild(document.createElement("style"));
				var stylesheet = document.styleSheets[document.styleSheets.length-1];
				var rule = '.leclink0 {'+
					'color: #AAAAAA !important;'+
					'padding:0px 1px;'+
					'font-size: 11px;'+
					'outline: none;'+
					'text-decoration: none !important;'+
					'} ';
				stylesheet.insertRule(rule, 0);
					
				var rule = '.leclink1 {'+
					'color: #FF0000 !important;'+
					'padding:0px 1px;'+
					'font-size: 11px;'+
					'outline: none;'+
					'text-decoration: none !important;'+
					'} ';
				stylesheet.insertRule(rule, 0);
				var coords = document.getElementsByName('ogame-planet-coordinates').item(0).content.split(':');
				var galaxy = coords[0];
				var system = parseInt(coords[1],10);
				var linktablerow = '';
				var linktable = '';
				var expbutscriptcode = '';
				
				if(cmission == 0 || cmission == 15 || cposition == 16) {
					linktablerow = '<td><img src="'+icon_expedition+'" style="background-color:#3a5f9f; outline: 1px solid #FFFFFF; height:17px; width:17px"></td>';
					linktable = '';
					expbutscriptcode = '';
					for(var i=0;i<9;i++)
					{
						if((system+i) > 499) linktablerow += '<td>&nbsp</td>'
						else linktablerow += '<td><a href="javascript:void(0)" ONCLICK="alert(0); return false;" class="leclink'+(coords_in_array(acoords, [galaxy,system+i,16]) == undefined?'0':'1')+'" id="lex'+ galaxy+'_'+(system+i).toString() + '_16">['+galaxy+':'+(i+system).toString()+':'+16+']' + '</a></td>';
					}
					linktable += '<tr>'+linktablerow+'</tr>';
					linktablerow = '<td>&nbsp;</td><td>&nbsp;</td>';
					for(var i=9;i<17;i++)
					{
						if((system+i) > 499) linktablerow += '<td>&nbsp</td>'
						else linktablerow += '<td><a href="javascript:void(0)" ONCLICK="alert(0); return false;" class="leclink'+(coords_in_array(acoords, [galaxy,system+i,16]) == undefined?'0':'1')+'" id="lex'+ galaxy+'_'+(system+i).toString() + '_16">['+galaxy+':'+(i+system).toString()+':'+16+']' + '</a></td>';
					}
					linktable += '<tr>'+linktablerow+'</tr>';
					linktablerow = '<td>&nbsp;</td><td>&nbsp;</td>';
					for(var i=1;i<9;i++)
					{
						if((system-i) < 1) linktablerow += '<td>&nbsp</td>'
						else linktablerow += '<td><a href="javascript:void(0)" ONCLICK="alert(0); return false;" class="leclink'+(coords_in_array(acoords, [galaxy,system-i,16]) == undefined?'0':'1')+'" id="lex'+ galaxy+'_'+(system-i).toString() + '_16">['+galaxy+':'+(system-i).toString()+':'+16+']' + '</a></td>';
					}
					linktable += '<tr>'+linktablerow+'</tr>';
					linktablerow = '<td>&nbsp;</td><td>&nbsp;</td>';
					for(var i=9;i<17;i++)
					{
						if((system-i) < 1) linktablerow += '<td>&nbsp</td>'
						else linktablerow += '<td><a href="javascript:void(0)" ONCLICK="alert(0); return false;" class="leclink'+(coords_in_array(acoords, [galaxy,system-i,16]) == undefined?'0':'1')+'" id="lex'+ galaxy+'_'+(system-i).toString() + '_16">['+galaxy+':'+(system-i).toString()+':'+16+']' + '</a></td>';
					}
					linktable += '<tr>'+linktablerow+'</tr>';
					linktablerow = '';
					for(var i=0;i<10;i++) linktablerow += '<td>&nbsp;</td>';
					linktable += '<tr>'+linktablerow+'</tr>';
				}
				
				if(cmission == 0 || cmission == 7) {
					var kolonisieren = localStorage.getItem(ogameserver+'kolonisieren_'+galaxy+'_'+system);
					var planetslist = [];
					var planetslist1 = [];
					if(kolonisieren) {
						kolonisieren = JSON.parse(kolonisieren);
						for(var i=0;i<kolonisieren.length;i++)
						{
							planetslist.push([galaxy,system,kolonisieren[i]]);
							planetslist1.push([galaxy,system,kolonisieren[i]]);
						}
					}

					if(planetslist.length < 1) {planetslist.push([galaxy,system,1]); planetslist1.push([galaxy,system,1]);}
					planetslist.sort(function(a,b){ return (Distance(coords, a)-Distance(coords, b)) });
					linktablerow = '<td><img src="'+icon_kolonisieren+'" style="background-color:#1fbfc2; outline: 1px solid #FFFFFF; height:17px; width:17px"></td>';
					var linkcol = 0;
					for(i=0;i<planetslist.length;i++) {
						linktablerow += '<td><a href="javascript:void(0)" ONCLICK="alert(0); return false;" class="leclink0" id="lex'+ planetslist[i][0]+'_'+ planetslist[i][1] + '_'+planetslist[i][2]+'">['+planetslist[i][0]+':'+planetslist[i][1]+':'+planetslist[i][2]+']' + '</a></td>';
						linkcol++;
						if(linkcol > 8) {
							linktable += '<tr>'+linktablerow+'</tr>';
							linktablerow = '<td>&nbsp;</td>';
							linkcol = 0;
						}
					}
					for(;linkcol < 9;linkcol++) linktablerow += '<td>&nbsp;</td>';
					linktable += '<tr>'+linktablerow+'</tr>';
					planetslist = [];

					if((system + 1) < 500) {
						kolonisieren = localStorage.getItem(ogameserver+'kolonisieren_'+galaxy+'_'+(system+1));
						if(kolonisieren) {
							kolonisieren = JSON.parse(kolonisieren);
							for(var i=0;i<kolonisieren.length;i++)
							{
								planetslist.push([galaxy,system+1,kolonisieren[i]]);
								planetslist1.push([galaxy,system+1,kolonisieren[i]]);
							}
						}
					}
					if(planetslist.length < 1) {planetslist.push([galaxy,system+1,1]); planetslist1.push([galaxy,system+1,1]);}
					planetslist.sort(function(a,b){ return (Distance(coords, a)-Distance(coords, b)) });
					linktablerow = '<td>&nbsp;</td>';
					var linkcol = 0;
					for(i=0;i<planetslist.length;i++) {
						linktablerow += '<td><a href="javascript:void(0)" ONCLICK="alert(0); return false;" class="leclink0" id="lex'+ planetslist[i][0]+'_'+ planetslist[i][1] + '_'+planetslist[i][2]+'">['+planetslist[i][0]+':'+planetslist[i][1]+':'+planetslist[i][2]+']' + '</a></td>';
						linkcol++;
						if(linkcol > 8) {
							linktable += '<tr>'+linktablerow+'</tr>';
							linktablerow = '<td>&nbsp;</td>';
							linkcol = 0;
						}
					}
					for(;linkcol < 9;linkcol++) linktablerow += '<td>&nbsp;</td>';
					linktable += '<tr>'+linktablerow+'</tr>';
					planetslist = [];

					if((system - 1) > 0) {
						kolonisieren = localStorage.getItem(ogameserver+'kolonisieren_'+galaxy+'_'+(system-1));
						if(kolonisieren) {
							kolonisieren = JSON.parse(kolonisieren);
							for(var i=0;i<kolonisieren.length;i++)
							{
								planetslist.push([galaxy,system-1,kolonisieren[i]]);
								planetslist1.push([galaxy,system-1,kolonisieren[i]]);
							}

						}
					}
					if(planetslist.length < 1) {planetslist.push([galaxy,system-1,1]); planetslist1.push([galaxy,system-1,1]);}
					planetslist.sort(function(a,b){ return (Distance(coords, a)-Distance(coords, b)) });
					linktablerow = '<td>&nbsp;</td>';
					var linkcol = 0;
					for(i=0;i<planetslist.length;i++) {
						linktablerow += '<td><a href="javascript:void(0)" ONCLICK="alert(0); return false;" class="leclink0" id="lex'+ planetslist[i][0]+'_'+ planetslist[i][1] + '_'+planetslist[i][2]+'">['+planetslist[i][0]+':'+planetslist[i][1]+':'+planetslist[i][2]+']' + '</a></td>';
						linkcol++;
						if(linkcol > 8) {
							linktable += '<tr>'+linktablerow+'</tr>';
							linktablerow = '<td>&nbsp;</td>';
							linkcol = 0;
						}
					}
					for(;linkcol < 9;linkcol++) linktablerow += '<td>&nbsp;</td>';
					linktable += '<tr>'+linktablerow+'</tr>';
				}
				
				linktable = '<table cellspacing="5px"><tbody>' + linktable + '</tbody></table>';
				var links = document.createElement('div');
				links.id = 'lec';
				links.innerHTML = linktable;
				document.getElementById('inhalt').appendChild(links);
				links.style.padding ='4px 9px'; 
				links.style.margin = '2px 1px';
				links.style.backgroundImage = 'url("'+wrap_body+'")'; 
				links.style.width = '650px';
				var lecid = '';
				if(cmission == 0 || cmission == 15 || cposition == 16)	for(var i=0;i<17;i++)
				{
					if((system+i) < 500) {
						lecid = 'lex'+ galaxy+'_'+(system+i).toString() + '_16';
						expbutscriptcode = document.createElement('script');
						expbutscriptcode.innerHTML = '\n'+
							"document.getElementById('"+lecid+"').onclick=function(){\n"+
							"document.getElementsByName('galaxy')[0].value =" + galaxy +"; \n"+
							"document.getElementsByName('system')[0].value =" + (system+i).toString() +"; \n"+
							"document.getElementsByName('position')[0].value = 16; \n"+
							"document.getElementsByName('type')[0].value = 1; \n"+
							"document.getElementsByName('mission')[0].value = 15; \n"+
							"updateVariables(); \n"+
							"};\n";
						document.getElementById(lecid).appendChild(expbutscriptcode);
					}
					if( (i > 0) && ((system-i) > 0)) {
						lecid = 'lex'+ galaxy+'_'+(system-i).toString() + '_16';
						expbutscriptcode = document.createElement('script');
						expbutscriptcode.innerHTML = '\n'+
							"document.getElementById('"+lecid+"').onclick=function(){\n"+
							"document.getElementsByName('galaxy')[0].value =" + galaxy +"; \n"+
							"document.getElementsByName('system')[0].value =" + (system-i).toString() +"; \n"+
							"document.getElementsByName('position')[0].value = 16; \n"+
							"document.getElementsByName('type')[0].value = 1; \n"+
							"document.getElementsByName('mission')[0].value = 15; \n"+
							"updateVariables(); \n"+
							"};\n";
						document.getElementById(lecid).appendChild(expbutscriptcode);
					}
				}
				if(cmission == 0 || cmission == 7) for(i=0;i<planetslist1.length;i++) 
				{
					lecid = 'lex'+ planetslist1[i][0]+'_'+planetslist1[i][1]+ '_'+planetslist1[i][2];
					expbutscriptcode = document.createElement('script');
					expbutscriptcode.innerHTML = '\n'+
						"document.getElementById('"+lecid+"').onclick=function(){\n"+
						"document.getElementsByName('galaxy')[0].value =" + planetslist1[i][0] +"; \n"+
						"document.getElementsByName('system')[0].value =" + planetslist1[i][1]+"; \n"+
						"document.getElementsByName('position')[0].value ="+planetslist1[i][2]+"; \n"+
						"document.getElementsByName('type')[0].value = 1; \n"+
						"document.getElementsByName('mission')[0].value = 7; \n"+
						"updateVariables(); \n"+
						"};\n";
					document.getElementById(lecid).appendChild(expbutscriptcode);
				}
			}
		}
		if (document.location.href.indexOf('page=movement') > -1) {
			Fleets = getElementsByClassName (document, "destinationCoords");
			acoords = new Array();
			for (var i = 0; i < Fleets.length; i++) {
				dcoords = Fleets [i].parentNode.getElementsByTagName ("a") [0].innerHTML.replace(/[\[\]]/g,'').split(':');
				if(parseInt(dcoords[2],10) == 16) acoords.push(dcoords);
			}
			if(acoords.length > 0) {
				localStorage.setItem(ogameserver+'ExpoLink', JSON.stringify(acoords));
			} else {
				localStorage.removeItem(ogameserver+'ExpoLink');
			}
		}
		
		$ (document).ajaxSuccess (function(e, xhr, settings)
		{
			if (settings.url.indexOf("page=galaxyContent") >= 0)
			{
				var coords = document.getElementsByName('ogame-planet-coordinates').item(0).content.split(':');
				
				var galaxy = document.getElementsByName("galaxy")[0].value;
				var system = document.getElementsByName("system")[0].value;
			
				if(galaxy == coords[0] && Math.abs(system - coords[1]) < 2) {
					var freeplanets = new Array();
						$('.planetEmpty').each(function () {
							if(this.className.indexOf("microplanet") >= 0) $('.position', this.parentNode).each(function () {
								freeplanets.push(parseInt(this.textContent));
								return false;
							});
						});
					if(freeplanets.length > 0) localStorage.setItem(ogameserver+'kolonisieren_'+galaxy+'_'+system, JSON.stringify(freeplanets));
				}
			}
		})
	}
	catch (e) {console.log(e)}
}) ()
