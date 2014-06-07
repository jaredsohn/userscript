// Utopia Quirinus
// version 0.5
// 2010-03-22
// Copyright (c) 2010+, Ivan Jelenic (Quirinus)
// Contact: vanamond42@hotmail.com
// Homepage: http://www.last.fm/user/Quirinus42
//
// Released under the GPL (v2) license
// http://www.gnu.org/copyleft/gpl.html
//
// This program is free software; you can redistribute it and/or
// modify it under the terms of the GNU General Public License
// as published by the Free Software Foundation; either version 2
// of the License, or (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.

// ==UserScript==
// @name           Utopia Quirinus
// @namespace      http://www.last.fm/user/Quirinus42
// @description    Various interface improvements for Utopia.
// @include        http://utopia-game.com/wol/game/*
// @include        http://utopia-game.com/wol/kingdom_forum/*
// @include        http://utopia-game.com/wol/war_forum/*
// @include        http://utopia-game.com/wol/mail/*
// @include        http://utopia-game.com/wol/sit/game/*
// @include        http://utopia-game.com/wol/sit/kingdom_forum/*
// @include        http://utopia-game.com/wol/sit/war_forum/*
// @include        http://utopia-game.com/wol/sit/mail/*
// ==/UserScript==

//handles arrow keys on the kd page - modified from Change Kingdom with Cursor script
function handleArrowKeys(evt) {
    evt = (evt) ? evt : ((window.event) ? event : null);
    if (evt) {
		var kd=getValue('id_kingdom');
		var is=getValue('id_island');

        switch (evt.which) {
			case 37:window.location = "http://utopia-game.com/wol/game/kingdom_details/"+kd+"/"+is+"?previous";	break; 
            case 39:window.location = "http://utopia-game.com/wol/game/kingdom_details/"+kd+"/"+is+"?next";	break;
}}}

function keyss () {document.addEventListener("keydown", handleArrowKeys, true);}
//END handles arrow keys on the kd page - modified from Change Kingdom with Cursor script

//hides class
var allPageTags = new Array(); 
function hideClass(theClass) {
var allPageTags=document.getElementsByTagName("*");
for (i=0; i<allPageTags.length; i++) {if (allPageTags[i].className==theClass) {
	allPageTags[i].style.display='none';}}};
//END hides class

//removes bg pic from class
var allPageTags1 = new Array(); 
function hideBG(theClass) {
var allPageTags1=document.getElementsByTagName("*");
for (i=0; i<allPageTags1.length; i++) {if (allPageTags1[i].className==theClass) {allPageTags1[i].style.background='none';}}};
//END removes bg pic from class

//removes float and alligns text to center for a class
var allPageTags2 = new Array(); 
function floatcenter(theClass) {
var allPageTags2=document.getElementsByTagName("*");
for (i=0; i<allPageTags2.length; i++) {if (allPageTags2[i].className==theClass) {
	allPageTags2[i].style.cssFloat ="none";
	allPageTags2[i].style.textAlign="center";}}};
//END removes float and alligns text to center for a class

//removes all adds
hideClass("right-box");
hideClass("foot-links");
hideClass("header-left");
hideClass("header-top-right");
hideBG("header");
floatcenter("header-right");
//END removes all adds




//forum bullet fix
GM_addStyle('ul { list-style-type: disc; }');
//END forum bullet fix

//more space (from utopia space optimization script)
var css = <><![CDATA[
table#resource-bar { width: 700px; border: 0px; }
div.middle-box { width: 820px; align: 'center'; }
div.container { margin: 2px auto; }

]]></>.toString();

GM_addStyle(css);

var throneStats = document.getElementById ("throne-statistics");

if (throneStats != null) {
  throneStats.style.width = '650px'
  
  var center_node = document.createElement ("CENTER");
  throneStats.parentNode.insertBefore(center_node, throneStats);
  throneStats.parentNode.removeChild(throneStats);
  center_node.appendChild(throneStats);
}
//END more space (from utopia space optimization script)



//***ADD LINKS***
// menu links
GM_addStyle('#menu_hidden a { color: #3D3D3D; };');
GM_addStyle('#menu_hidden a:hover, #menu_hidden a.highlighted:hover, #menu_hidden a:focus { color: white;}');


function addNavLinks(){
	var nav=document.getElementById("navigation");
	var	maill=nav.getElementsByTagName('ul')[3].getElementsByTagName('li')[0].getElementsByTagName('span')[0]
	//if (maill == undefined) {alert("gg")}
	var kd=GM_getValue('tag_kingdom');
	var is=GM_getValue('tag_island');
	nav.innerHTML="<ul><li><a href='/wol/game/throne'>Throne</a> <a target='_blank' href='/wol/game/council_state'><b>C</b></a></li><li><a href='/wol/game/kingdom_details'>Kingdom</a></li><li><a target='_blank' href='/wol/game/kingdom_news'>News</a> <a target='_blank' href='/wol/game/province_news'><b>P</b></a></li></ul>"
	
if (kd!=undefined&&is!=undefined) {nav.innerHTML=format("<ul><li><a href='/wol/game/throne'>Throne</a> <a target='_blank' href='/wol/game/council_state'><b>C</b></a></li><li><a href='/wol/game/kingdom_details'>Kingdom</a><br /><a id=\"arroww\" onmouseover=\"this.style.cursor='pointer'\">&rarr;</a>&nbsp;<a href='/wol/game/kingdom_details/{0}/{1}'>({0}:{1})</a></li><li><a target='_blank' href='/wol/game/kingdom_news'>News</a> <a target='_blank' href='/wol/game/province_news'><b>P</b></a></li></ul>", kd, is);}

	nav.innerHTML+="<ul><li><a href='/wol/game/build'>Build</a> <a target='_blank' href='/wol/game/council_internal'><b>C</b></a></li><li><a href='/wol/game/science'>Science</a> <a target='_blank' href='/wol/game/council_learn'><b>C</b></a></li><li><a href='/wol/game/train_army'>Train</a> <a target='_blank' href='/wol/game/council_military'><b>C</b></a></li><li><a href='/wol/game/enchantment'>Magic</a> <a target='_blank' href='/wol/game/council_spells'><b>C</b></a></li></ul>";
	
	//if on the kd page, the current kd numbers are more important than the bookmark
	if (location.href.indexOf('kingdom_details')>0) {
		var xxkd=getValue('id_kingdom');
		var xxis=getValue('id_island');
		kd=xxkd;
		is=xxis;
	}
	//immediately switch to bookmark kd when going to thievery/sorcery/attack
	if (kd!=undefined&&is!=undefined) {
	var strr="<ul><li><form method='POST' action='/wol/game/change_kingdom/' id='sorc'>";
		strr+="<input type='hidden' name='next_url' value='/wol/game/sorcery' id='id_next_url' />";
		strr+="<input name='kingdom' value='"+kd+"' type='hidden'/>";
		strr+="<input name='island' value='"+is+"' type='hidden' />";
		strr+="<a onclick=\"document.getElementById('sorc').submit()\" onmouseover=\"this.style.cursor='pointer'\">Sorcery</a> <a target='_blank' href='/wol/game/council_spells'><b>C</b></a></form></li>";
		strr+="<li><form method='POST' action='/wol/game/change_kingdom/' id='thf'>";
		strr+="<input type='hidden' name='next_url' value='/wol/game/thievery' id='id_next_url' />";
		strr+="<input name='kingdom' value='"+kd+"' type='hidden'/>";
		strr+="<input name='island' value='"+is+"' type='hidden' />";
		strr+="<a onclick=\"document.getElementById('thf').submit()\" onmouseover=\"this.style.cursor='pointer'\"\>Thievery</a></form></li>";
		strr+="<li><form method='POST' action='/wol/game/change_kingdom/' id='att'>";
		strr+="<input type='hidden' name='next_url' value='/wol/game/send_armies' id='id_next_url' />";
		strr+="<input name='kingdom' value='"+kd+"' type='hidden'/>";
		strr+="<input name='island' value='"+is+"' type='hidden' />";
		strr+="<a onclick=\"document.getElementById('att').submit()\" onmouseover=\"this.style.cursor='pointer'\">Attack</a> <a target='_blank' href='/wol/game/council_military'><b>C</b></a></form></li></ul>";
	}
	//if no bookmarks present, and not on the kd page, put normal links
	else {
		strr="<ul><li><a href='/wol/game/sorcery'>Sorcery</a> <a target='_blank' href='/wol/game/council_spells'><b>C</b></a></li><li><a href='/wol/game/thievery'>Thievery</a><li><a href='/wol/game/send_armies'>Attack</a> <a target='_blank' href='/wol/game/council_military'><b>C</b></a></li></ul>";
	}

	nav.innerHTML+=strr;


	
// adds diamond if there's a msg
if (maill == undefined) {nav.innerHTML+="<ul><li><a target='_blank' href='/wol/kingdom_forum/topics/'>Forum</a> <a target='_blank' href='/wol/mail/inbox/'><b>M</b></a></li></ul>";}
else {nav.innerHTML+="<ul><li><a target='_blank' href='/wol/kingdom_forum/topics/'>Forum</a> <a target='_blank' href='/wol/mail/inbox/'><b>M <span class='advice-message'>&diams;</span></b></a></li></ul>";};



	nav.innerHTML+="<br /><br />";
	nav.innerHTML+="<div id='menu_hidden'><ul><li id='extra' style='display:inline' onclick=\"document.getElementById('extra').style.display='none'; document.getElementById('extra_1').style.display='inline'; document.getElementById('extra_2').style.display='inline'\"><a style='cursor: pointer;'><b style='font-size:large'>+</b> Extra <b style='font-size:large'>+</b></a></li><li id='extra_1' style='display:none;' onclick=\"document.getElementById('extra_1').style.display='none';document.getElementById('extra_2').style.display='none';document.getElementById('extra').style.display='inline'\"><a style='cursor: pointer;'><b style='font-size:large'>-</b> Extra <b style='font-size:large'>-</b></a></li><li id='extra_2' style='display:none;'><br /><br /><ul><li><a href='/wol/game/explore'>Explore</a></li><li><a href='/wol/game/aid'>Send Aid</a></li><li><a href='/wol/game/wizards'>Wizards</a></li></ul><ul><li><a href='/wol/game/monarchy'>Monarchy</a></li><li><a href='/wol/game/invitations'>Invitations</a></li><li><a href='/wol/game/start_dragon'>Dragons</a></li></ul><ul><li><a href='/wol/game/vote'>Politics</a></li><li><a href='/wol/game/council_history'>History</a></li><li><a target='_blank' href='/wol/game/ranking'>Rankings</a></li></ul><ul><li><li><a href='http://utopia-game.com/shared/credits/topup/'>Manage Credits</a></li><li><a href='/wol/gift/'>Gift Credits</a></li><li><a target='_blank' href='http://utopia-game.com/shared/feedback/report_bug_instructions/'>Report Bug</a></li></li></ul></li></ul></div>";
}
//END menu links




//remove tabs from throne script by http://haiku.merseine.nu/ (modified by me)
if (location.href.indexOf('throne')>0) {

var tabss = document.getElementById("tabbed_menu");

if (tabss) {
    tabss.parentNode.removeChild(tabss);
}}
//END remove tabs from throne script by http://haiku.merseine.nu/ (modified by me)



// top links
function addHelpLink(){
	var links=document.getElementById("header-account-links");
	var spans=document.getElementsByTagName("span");
	spans[0].getElementsByTagName("a")[0].innerHTML="Forum"
	spans[0].getElementsByTagName("a")[0].href="http://forums.joltonline.com/forumdisplay.php?f=1527"
	spans[0].getElementsByTagName("a")[0].target="_blank"
	spans[1].getElementsByTagName("a")[0].innerHTML="Guide"
	spans[1].getElementsByTagName("a")[0].href="http://wiki.utopia-game.com/index.php"
	spans[1].getElementsByTagName("a")[0].target="_blank"
	spans[2].getElementsByTagName("a")[0].innerHTML="Pimp"
	spans[2].getElementsByTagName("a")[0].href="http://codingforcharity.com/"
	spans[2].getElementsByTagName("a")[0].target="_blank"
	spans[3].getElementsByTagName("a")[0].innerHTML="Preferences"
	spans[3].getElementsByTagName("a")[0].href="/wol/game/preferences/"
	spans[3].getElementsByTagName("a")[0].target="_blank"
	links.innerHTML+="....... <span><a href='http://utopia-game.com/shared//logout/'>< Log Out ></a></span>";
}
//END top links



//Adds Average Net Worth / Acre to the KD Stats info
function avg_landnw() {
kdinfo=document.getElementById("kingdom-details-statistics").getElementsByTagName("tbody")[0]
var nww=parseReturnedXML(kdinfo.innerHTML, "avg: ", "gc")
var landd=parseReturnedXML(kdinfo.innerHTML, "avg: ", " acres")
landd=landd.replace(",","")
nww=nww.replace(",","")
var nwland=nww/landd
nwland=nwland.toFixed(3)
kdinfo.innerHTML+="<tr><th>Average Net Worth/Acre</th><td>"+nwland+"</td></tr>"}
//END Adds Average Net Worth / Acre to the KD Stats info



//function to get a string between two strings
function parseReturnedXML(strToParse, strStart, strFinish)
{var str = strToParse.match(strStart + "(.*?)" + strFinish);
return str[1];}
//END function to get a string between two strings



//build percentages on the build page - idea from Utopia Upgrade script by Roga
function bper() {
	if (document.getElementById('build-statistics')!=undefined) {
		//alert("gg")
		GM_addStyle('#tabbed_panel {width:105%;};');
		GM_addStyle('#build-buildings tr td {white-space:nowrap; border:0px; padding:0px; margin:0px;};');
		GM_addStyle('#build-buildings th {white-space:nowrap;};');


		var c0 = new Array();
		var c1 = new Array();
		var c3 = new Array();
		var c4 = new Array();
		var c0p = new Array();
		var c1p = new Array();
		var c3p = new Array();
		var c4p = new Array();
		var acress=parseReturnedXML(document.getElementById('build-statistics').getElementsByTagName('tr')[0].innerHTML, "<td>", " acres").replace(",","");
		
		for (i=0;i<=8;i++) {
			
		c0[i]=document.getElementById('build-buildings').getElementsByTagName('tbody')[0].getElementsByTagName('tr')[i].getElementsByTagName('td')[0];
				c0p[i]=((c0[i].innerHTML.replace(",","")*100/acress).toFixed(1)+"%").replace(".0%","%");
		c0[i].innerHTML="<span style='white-space:nowrap'><div style='text-align:left; display:inline; float:left;'>&nbsp;"+c0[i].innerHTML.replace(",","")+"</div><div style='text-align:right; color:#666; display:inline;'>"+c0p[i]+"</div></span>";
		
		c1[i]=document.getElementById('build-buildings').getElementsByTagName('tbody')[0].getElementsByTagName('tr')[i].getElementsByTagName('td')[1];
		c1p[i]=((c1[i].innerHTML.replace(",","")*100/acress).toFixed(1)+"%").replace(".0%","%");
		c1[i].innerHTML="<span style='white-space:nowrap'><div style='text-align:left; display:inline; float:left;'>&nbsp;"+c1[i].innerHTML.replace(",","")+"</div><div style='text-align:right; color:#666; display:inline;'>"+c1p[i]+"</div></span>";
		
		
		c3[i]=document.getElementById('build-buildings').getElementsByTagName('tbody')[0].getElementsByTagName('tr')[i].getElementsByTagName('td')[3];
		c3p[i]=((c3[i].innerHTML.replace(",","")*100/acress).toFixed(1)+"%").replace(".0%","%");
		c3[i].innerHTML="<span style='white-space:nowrap'><div style='text-align:left; display:inline; float:left;'>&nbsp;"+c3[i].innerHTML.replace(",","")+"</div><div style='text-align:right; color:#666; display:inline;'>"+c3p[i]+"</div></span>";
		
		
		c4[i]=document.getElementById('build-buildings').getElementsByTagName('tbody')[0].getElementsByTagName('tr')[i].getElementsByTagName('td')[4];
		c4p[i]=((c4[i].innerHTML.replace(",","")*100/acress).toFixed(1)+"%").replace(".0%","%");
		c4[i].innerHTML="<span style='white-space:nowrap'><div style='text-align:left; display:inline; float:left;'>&nbsp;"+c4[i].innerHTML.replace(",","")+"</div><div style='text-align:right; color:#666; display:inline;'>"+c4p[i]+"</div></span>";}
		
		}
}
//END build percentages on the build page - idea from Utopia Upgrade script by Roga



//provinces in 90%-110% nw range colored (except you, monarch and protection)
function colorTarget() {
GM_addStyle('.targett {color:#8A2BE2;};'); 


var provincc = new Array();
provincc=document.getElementById("kingdom-details-provinces").getElementsByTagName("tbody")[0].getElementsByTagName("tr")
var ynetwrr=document.getElementById("resource-bar").getElementsByTagName("tbody")[0].getElementsByTagName("tr")[0].getElementsByTagName("th")[4].innerHTML.replace(",","");
var numprovinc=document.getElementById("kingdom-details-statistics").getElementsByTagName("tbody")[0].getElementsByTagName("tr")[0].getElementsByTagName("td")[0].innerHTML;

var netwrr = new Array(); 
var statuss = new Array(); 
for (i=0;i<numprovinc;i++) {
	netwrr[i]=(provincc[i].getElementsByTagName('td')[3].innerHTML.replace(",","")).slice(0,-2);
	statuss[i]=provincc[i].className;
	if ((statuss[i]!='protected')&&(statuss[i]!='monarch')&&(statuss[i]!=' you')&&(netwrr[i]<=ynetwrr*1.1)&&(netwrr[i]>=ynetwrr*0.9))
	{provincc[i].className="targett"}
	}



	if ((document.getElementById("kingdom-details-legend").getElementsByTagName("tbody")[0].innerHTML).indexOf("Inactive+")>-1){
	document.getElementById("kingdom-details-legend").getElementsByTagName("tbody")[0].innerHTML="<tr class='protected'><td>Protection^</td></tr><tr class='monarch'><td>Kingdom Monarch (M)</td></tr><tr class='targett'><td>In 90%-110% NW range</td></tr><tr class='you'><td>You</td></tr><tr class='online'><td>Online*</td></tr><tr class='inactive'><td>Inactive+</td></tr>" //legend add
	}
	else {
	document.getElementById("kingdom-details-legend").getElementsByTagName("tbody")[0].innerHTML="<tr class='protected'><td>Protection^</td></tr><tr class='monarch'><td>Kingdom Monarch (M)</td></tr><tr class='targett'><td>In 90%-110% NW range</td></tr><tr class='you'><td>You</td></tr><tr class='online'><td>Online*</td></tr>" //legend add
	}

}
//END provinces in 90%-110% nw range colored (except you, monarch and protection)



//adds max buttons on the science page
function scimax() {

GM_addStyle('table#allocate_max {width:auto; float:left; display:inline; border-collapse: separate; border-spacing: 0px 3px;};');
GM_addStyle('table#allocate_max thead th { background-color: #400000;};'); 	
GM_addStyle('table#learn-research-effects {width:auto; float:left; padding-right:0px; };');
GM_addStyle('button { font-size: 0.84em; };');


var newsci=(document.getElementById("learn-statistics").getElementsByTagName("tbody")[0].getElementsByTagName("td")[3].innerHTML.slice(0,-6)).replace(",","");
	if (newsci=="0") {newsci=""}
var maxtable="<table id=\"allocate_max\"><thead><tr><th>&nbsp;</th></tr><tr><th>&nbsp;</th></tr></thead><tbody><tr class=\"odd\"><td></td></tr><tr class=\"even\"><td style=\"border-spacing:0px 1px\"></td></tr><tr class=\"odd\"><td>&nbsp;</td></tr><tr class=\"even\"><td>&nbsp;</td></tr><tr class=\"odd\"><td>&nbsp;</td></tr><tr class=\"even\"><td>&nbsp;</td></tr><tr class=\"odd\"><td>&nbsp;</td></tr></tbody></table>";//</div>

document.body.innerHTML=(document.body.innerHTML).replace("<p>",maxtable+"<p>");

for (i=0;i<7;i++) {
document.getElementById("allocate_max").getElementsByTagName("tbody")[0].getElementsByTagName("td")[i].innerHTML="<button type=\"button\" onclick=\"for (j=0;j<7;j++) {	document.getElementById('id_quantity_'+j).value=''}; document.getElementById('id_quantity_"+i+"').value="+newsci+"\">Max</button>";}
}
//END adds max buttons on the science page



//removes bookmark if the stored kd is the same as the currently open (xkd,yis); also, if del=1, removes the bookmark regardless of the kd (it's for the arrow removal)
function rembookmark(xkd,yis){
	if ((GM_getValue('tag_kingdom')==xkd&&GM_getValue('tag_island')==yis)||del==1){
		GM_deleteValue('tag_kingdom');
		GM_deleteValue('tag_island');
		document.getElementById('navigation').getElementsByTagName('li')[1].innerHTML="<a href='/wol/game/kingdom_details'>Kingdom</a>";
	}
}
//END removes bookmark



//watches for arrow bookmark removal
function arrow_rem() {
	document.addEventListener('click', function(event) {
	if(event.target.id=='arroww'){rembookmark(GM_getValue('tag_kingdom'),GM_getValue('tag_island'));}
	}, true);
}
//END watches for arrow bookmark removal



//bookmark/home position
function bookmarkk() {
	GM_addStyle("table#change-kingdom {width:auto;}");

var navlrr=document.getElementById('change-kingdom').getElementsByTagName('tbody')[0].getElementsByTagName('tr')[1].getElementsByTagName('td')[0].getElementsByTagName('div')[0]
var navkdis=document.getElementById('change-kingdom').getElementsByTagName('tbody')[0].getElementsByTagName('tr')[0].getElementsByTagName('td')[2]
document.body.innerHTML=(document.body.innerHTML).replace(navlrr.innerHTML,navlrr.innerHTML+"&nbsp;&nbsp;&nbsp;<a href=\"/wol/game/kingdom_details\">Home</a>");
document.body.innerHTML=(document.body.innerHTML).replace(navkdis.innerHTML,navkdis.innerHTML+"&nbsp;<input type=\"button\" id=\"btnBookmark\" value=\"Bookmark\"/>");
}
//END bookmark/home position



//***UTILITY FUNCTIONS***
function trim(str){ return ltrim(rtrim(str)); } 
function ltrim(str) {	return str.replace(new RegExp("^[\\s]+", "g"), ""); }
function rtrim(str) {	return str.replace(new RegExp("[\\s]+$", "g"), ""); }
function getValue(name){ return document.getElementById(name).value; }
function getHTML(name){ return document.getElementById(name).innerHTML; }
function nanParseInt(str, def){ var i=parseInt(str); return isNaN(i)?def:i; }
function GM_getInt(name){ return nanParseInt(GM_getValue(name)); }
function GM_getBool(name){ return new Boolean(GM_getValue(name)); }
//END ***UTILITY FUNCTIONS***



//simplistic string formatter 
//eg format("{0} * {1} = {2} = {1} * {0}", 3, "five", 15) returns "3 * five = 15 = five * 3"
//based on .NET's String.Format, but much much lazier (no special formatters, padding, etc)
function format(){
	var str=arguments[0];
	for(i=0;i<arguments.length-1;i++)
		str=str.replace(new RegExp('\\{'+i+'\\}', 'gi'), arguments[i+1]);
	return str;
}
//END simplistic string formatter 



//***KINGDOM PAGE***	
function kingdom(){
	GM_addStyle(".heading{cursor:pointer;}");
	

	avg_landnw()	//added
	//these two sort the kd by nw when the kd page opens up; from highest to lowest
	SortKd(3);	//added
	SortKd(3);	//added
	
	colorTarget()  //added

	var table=document.getElementById("kingdom-details-provinces");
	var headings=table.getElementsByTagName("th");	
	for(var i=0;i<headings.length;i++)
		headings[i].className="heading";
		
	
		//document.body.innerHTML+='<input type="button" id="btnBookmark" value="Bookmark" class="seraButton"/>';

		
	function Province(row){
		var cells=row.getElementsByTagName("td");
		var values=Array();
		for(var i=0;i<cells.length;i++)
			values[i]=trim(cells[i].innerHTML);
		values[cells.length]=row.className;
		return values;
	}
	
	function OrderVal(arr, orderby){
		switch(orderby){
			case 2:
			case 3:
			case 4:
				return parseInt(arr[orderby].replace(/,/g,""));
			case 5:
				var ranks=Array("DEAD", "Peasant", "Knight", "Lady", "Lord", "Noble Lady", "Baron", "Baroness",	"Viscount", 
					"Viscountess", "Marquis", "Marchioness", "Duke", "Duchess", "Prince", "Princess", "King", "Queen");
				for(var i=0;i<ranks.length;i++)
					if(arr[orderby]==ranks[i])
						return i;
				return 0;
			default: return arr[orderby];
		}
	}
	
	function Sort(arr, orderby){
		//yes, it's a BUBBLE sort. I'm lame. I can only defend myself by saying that n<=25.
		do{
			cont=false;
			for(i=arr.length-1;i>=1;i--){
				for(j=0;j<i;j++){
					if(OrderVal(arr[j], orderby)>OrderVal(arr[j+1], orderby)){
						var temp=arr[j];
						arr[j]=arr[j+1];
						arr[j+1]=temp;
						cont=true;
					}
				}
			}
		} while(cont);
		//if no exchanges were made, reverse the order (the kindgom page should be sortable in both directions).
		if(sortAsc&&sortCol==orderby)
			arr.reverse();
		sortAsc=(sortCol==orderby)?!sortAsc:true;
		sortCol=orderby;
		return arr;
	}
	
	function SortKd(orderby){
		var table=document.getElementById("kingdom-details-provinces");
		var rows=table.getElementsByTagName("tr");
		var provinces=Array();
		for(j=1;j<rows.length;j++)
			provinces[j-1]=Province(rows[j]);
		Sort(provinces, orderby);
		for(j=0;j<provinces.length;j++){
			cols=rows[j+1].getElementsByTagName("td");
			for(k=0;k<cols.length;k++)
				cols[k].innerHTML=provinces[j][k];
			rows[j+1].className=provinces[j][cols.length];
		}
	}
	
	var sortCol=GM_getInt('sortCol', -1);
	var sortAsc=!GM_getBool('sortAsc');
	if(sortCol>=0)
		SortKd(sortCol);
	GM_setValue('sortCol', -1);
	GM_setValue('sortAsc', false);
	
	function saveSortValues(){
		GM_setValue('sortCol', sortCol);
		GM_setValue('sortAsc', sortAsc);
	}	
	
	document.addEventListener('click', function(event) {
		var id=event.target.id;
	
		switch(id){
			case 'btnBookmark': //bookmark kingdom
				var kd=getValue('id_kingdom');
				var is=getValue('id_island');
				if(GM_getValue('tag_kingdom')!=kd||GM_getValue('tag_island')!=is){
					GM_setValue('tag_kingdom', kd);
					GM_setValue('tag_island', is);
					var kdlink=document.getElementById('navigation').getElementsByTagName('li')[1];
					var kdlinks=kdlink.getElementsByTagName('a');
					kdlinks[0].innerHTML='Kingdom'; //changed from Kd to Kingdom
					for(i=1;i<kdlinks.length-1;i++)
						kdlink.removeChild(kdlinks[1]);
					if(kdlinks.length>1)
						kdlinks[1].innerHTML=kdlinks[1].innerHTML.substr(1, kdlinks[1].innerHTML.length-7); //changed from 2 to 7
					kdlink.innerHTML=format("<a href='/wol/game/kingdom_details'>Kingdom</a><br /><a id=\"arroww\" onmouseover=\"this.style.cursor='pointer'\">&rarr;</a>&nbsp;<a href='/wol/game/kingdom_details/{0}/{1}'>({0}:{1})</a>", kd, is);		
				}
				else {rembookmark(kd,is)} //added - removes bookmark if you bookmark the already bookmarked kd
				break;
			default: //sort kingdom page
				var colNames=new Array("Province", "Race", "Land", "Net Worth", "Net Worth/Acre", "Nobility");
				for(var i=0;i<colNames.length;i++)
					if(colNames[i]==event.target.innerHTML)
						SortKd(i);
				break;
		}
	}, true);
}
//END ***KINGDOM PAGE***	


//***MILITARY TRAINING***
//new, positioned under the table, turns red if not enough money or solds, reduces the cost by spec credits
function militaryTraining(){
	document.body.innerHTML=(document.body.innerHTML).replace("<p>Accelerated","<div id=\"calculator\">Training 0 troops at a cost of 0gc.</div><br/><p>"); //added
	document.addEventListener('keyup', function(event) {
		var table=document.getElementById('train-army-training');
		var rows=table.getElementsByTagName("tr");
		var totalNum=0, totalCost=0;
		for(i=0;i<rows.length-1;i++){
			var cost=nanParseInt(rows[i+1].getElementsByTagName("td")[2].innerHTML, 0);
			var qty=nanParseInt(document.getElementById('id_unit-quantity_'+i).value, 0);
			totalNum+=qty;
			totalCost+=cost*qty;
			
		}
	var solss=document.getElementsByTagName("tbody")[1].getElementsByTagName("td")[5].innerHTML.replace(",",""); //added
	var moneyg=document.getElementById("resource-bar").getElementsByTagName("th")[7].innerHTML.replace(",",""); //added
	var credits=parseInt(document.getElementsByTagName("tbody")[1].getElementsByTagName("td")[6].innerHTML.replace(",","")); //added
	var specst=nanParseInt(document.getElementById('id_unit-quantity_0').value, 0)+nanParseInt(document.getElementById('id_unit-quantity_1').value, 0);//added - counts specialists
		if (specst>credits) {specst=credits;}//added
		totalCost=totalCost-specst*nanParseInt(rows[1].getElementsByTagName("td")[2].innerHTML, 0); //added - reduces the credit cost
		if (totalNum<=solss&&totalCost<=moneyg) {//added
		document.getElementById('calculator').innerHTML=format('Training {0} troops at a cost of {1}gc.', totalNum, totalCost);} //added
		else{//added
		document.getElementById('calculator').innerHTML=format('<span style=\"color:red;\">Training {0} troops at a cost of {1}gc.</span>', totalNum, totalCost);} //added
	}, true);
}
//END ***MILITARY TRAINING***


//***MAGIC***
function magic(){
	document.addEventListener('click', function(event) {
		if(event.target.type=='submit'){
			var obj=document.getElementById('id_spell');
			if(obj!=null){
				var spell=obj.value;
				if(spell.length>0){
					spell=spell.toUpperCase().replace(/\ /g, '_');
					document.forms[document.forms.length-1].action='?s='+spell;
				}
			}
		}
	}, true);
}
//END ***MAGIC***

//***FORUM***
function topics(){
	//add pages to topics page
	var rows=document.getElementsByTagName('tr');
	for(i=0;i<rows.length;i++){
		if(rows[i].className=='odd'||rows[i].className=='even'){
			var cells=rows[i].getElementsByTagName('td');
			var link=cells[0].getElementsByTagName('a')[0].href;
			var pages=Math.ceil(parseInt((cells[2].innerHTML-1)/10))+1;
			if(pages>1){
				var topic=cells[0].innerHTML.split('<br>');
				topic[0]+=' page:';
				for(page=2;page<=pages;page++)
					topic[0]+=' <a href="'+link+'?page='+page+'">'+page+'</a>';
				cells[0].innerHTML=topic[0]+'<br>'+topic[1];
			}			
		}
	}
	//puts all actions on the same line (pages/monarchs only)
	for(i=0;i<document.forms.length-1;i++){
		var str='<div style="white-space:nowrap;right:0;padding:0">';
		str+=document.forms[i].innerHTML.replace(new RegExp("<br>", "g"), "")+'</div>';
		document.forms[i].innerHTML=str;
	}
}
//END ***FORUM***

//***MAIN***
GM_addStyle("#navigation{position:fixed;top:200px}");
addHelpLink();
addNavLinks();
arrow_rem(); //added
if (location.href.indexOf('kingdom_details')>0) {
	kingdom();
	keyss(); //added
	bookmarkk(); //added
}

if(location.href.indexOf('train_army')>0)
	militaryTraining();
if(location.href.indexOf('forum/topics')>0)
	topics();
if(location.href.indexOf('build')>0) //added
	bper();							//added
//if(location.href.indexOf('enchantment')>0||location.href.indexOf('sorcery'))
//	magic();
if(location.href.indexOf('science')>0) //added
	scimax();							//added
//END ***MAIN***

