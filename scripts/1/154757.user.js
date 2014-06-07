// ==UserScript==
// @name               	Vortex Pack 
// @description        	Vortex Tool :D 
// @author             	Terr0rNL/Vortex
// @version            	3.0.3
// @namespace     	   	http://www.micservice.nl/
// @copyright   	   	2012, Terr0rNL/Vortex
// @include        		http://nl*.tribalwars.nl/*&intro*
// @include            	http://nl*.tribalwars.nl/game.php*
// @include            	http://nl*.tribalwars.nl/game.php*screen=main*
// @include            	http://nl*.tribalwars.nl/game.php*screen=welcome*
// @include            	http://nl*.tribalwars.nl/game.php*screen=map*
// @include            	http://nl*.tribalwars.nl/game.php*screen=settings* 
// @include            	http://nl*.tribalwars.nl/game.php?*screen=snob*
// @include            	http://nl*.tribalwars.nl/game.php*screen=settings_villages&mode=profile*
// @include            	http://nl*.tribalwars.nl/game.php*screen=overview_villages&mode=commands*
// @include            	http://nl*.tribalwars.nl/game.php*screen=overview_villages&mode=units&type*
// @include            	http://nl*.tribalwars.nl/game.php*screen=overview_villages&mode=units*
// @include            	http://nl*.tribalwars.nl/game.php*screen=overview_villages&mode=buildings*
// @include            	http://nl*.tribalwars.nl/game.php*screen=overview_villages&mode=groups*
// @include            	http://nl*.tribalwars.nl/game.php*screen=overview_villages*
// @include       	   	http://nl*.tribalwars.nl/game.php*screen=info_village*
// @include            	http://nl*.tribalwars.nl/game.php*screen=ranking*
// @include            	http://nl*.tribalwars.nl/game.php*screen=ally*
// @include            	http://nl*.tribalwars.nl/game.php*screen=memo*
// @include            	http://nl*.tribalwars.nl/game.php*screen=buddies*
// @include			   	http://nl*.tribalwars.nl/game.php*mode=all*screen=report*
// @include        		http://nl*.tribalwars.nl/game.php*screen=report*
// @include        		http://nl*.tribalwars.nl/game.php*screen=report*view=*
// @include			   	http://nl*.tribalwars.nl/game.php*mode=view*screen=mail*
// @include			   	http://*.tribalwars.nl/game.php?*screen=place*
// @include			   	http://*.tribalwars.nl/game.php?*screen=info_command*
// @include        		http://nl*.tribalwars.nl/*screen=mail*
// @include			   	http://*twmaps.org/*
// @icon               	http://www.tribalwars.nl/graphic/rabe.png
// ==/UserScript==

//* Changelog
//	3.0.0 16-01-2013 Release Vortexpack
//	3.0.1 30-01-2013 Link in info balk naar vrienden lijst en spelers uitnodigen werkt nu op alle werelden
// 	3.0.2 01-02-2013 Nieuwe Afbeeldingen toegevoegd bij icons verschillende awards afbeeldingen / code verfijning
// 	3.0.3 01-03-2013 Nieuwe opties toegevoegd
//					 Instellingen functie toegevoegd (Forum/mededelingen/Notitie blok
//					 Live Preview
//					 Smilie Box Editor
//					 Code verfijning
//* Changelog

function Vortex_ready()
{
    var Vortex_pack_versie = "3";
    var DEBUG = false;
    var aanuit = 	{
	activatePack: "Vortex_pack Aanzetten",
	deactivatePack: "Vortex_pack Uitzetten"
	};
	   function getQueryStringParam(name, url)
    {
        name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
        var regexS = "[\\?&]" + name + "=([^&#]*)";
        var regex = new RegExp(regexS);
        var results = regex.exec(url == undefined ? window.location.href : url);
        if (results == null)
            return "";
        else
            return results[1];
    }

    function getUrlString(url, villageId)
    {
        if (url.indexOf("?") == -1)
        {
            var link = location.href.substr(0, location.href.indexOf("?"));
            link += "?village=" + (villageId ? villageId : getQueryStringParam("village"));
            var isSit = getQueryStringParam("t");
            if (isSit) link += "&t=" + isSit;

            if (url.indexOf("=") == -1)
                return link + "&screen=" + url;
            else
                return link + "&" + url;
        }
        else
        {
            return url;
        }
    }

    function ajax(screen, strategy, opts)
    {
        opts = $.extend({}, { villageId: false, contentValue: true }, opts);

        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange =
		function ()
		{
		    if (xmlhttp.readyState == 4 && xmlhttp.status == 200)
		    {
		        var text = xmlhttp.responseText;
		        text = opts.contentValue ? $("#content_value", text) : text;
		        strategy(text);
		    }
		};

        xmlhttp.open("GET", getUrlString(screen, opts.villageId), true);
        xmlhttp.send();
    }
	
    function getCookie(name, isGlobalWorlds)
    {
        if ( true || localStorage === undefined)
        {
            if (document.cookie.match(/;/))
            {
                var cooks = document.cookie.split("; ");
                for (var x = 0; x < cooks.length; x++)
                {
                    var cookie = cooks[x];
                    if (cookie.match(name + "="))
                        return cookie.replace(name + "=", "");
                }
            }
            else
            {
                if (document.cookie.match(name + "="))
                    return document.cookie.replace(name + "=", "");
            }

            return '';
        }
        else
        {
            var item = localStorage.getItem(name);
            if (item == null) return '';
        }
    }

    function setCookie(name, value, expireMinutes)
    {
        var date_obj = new Date();
        time = date_obj.getTime();
        if (expireMinutes == undefined)
        {
            time += 1 * 60 * 1000 * 24 * 356;
        }
        else
        {
            time += expireMinutes * 1000 * 60;
        }
        date_obj.setTime(time);

        var expires = "expires=" + date_obj.toGMTString() + ";";

        document.cookie = name + "=" + value + ";" + expires;
    }
    var isVPActive = getCookie("VPActive") == "true";
    if (location.href.indexOf('ChangeStatus=') > -1)
    {
        isVPActive = location.href.indexOf('ChangeStatus=true') > -1;
        setCookie("VPActive", isVPActive);
    };

	var link = "<a href='" + location.href.replace("&ChangeStatus="  + isVPActive, "") + "&ChangeStatus=" + (!isVPActive) + "'>";
	link += " - ";
	link += "<img src='graphic/" + (isVPActive ? 'rabe' : 'rabe_grau') + ".png' title='" + (!isVPActive? aanuit.activatePack  : aanuit.deactivatePack) + " (rev. " +Vortex_pack_versie+ ")' />";
	link += "</a>";
	$("#footer_left").append(link);
    if (isVPActive)
	{
	

	
// Stukje voor de welkomstpagina
if (game_data.screen == 'welcome') {
	$('li:contains("Vrienden uitgenodigd?")').parent().before('<ul class="welcome-list"><li class="list-item a"><span class="list-left">Vortex pack actief</span><span class="list-right"><img alt="" src="http://cdn2.tribalwars.net/graphic/confirm.png?f058b"></span></li></ul>');
}	
	
// Stukje voor de welkomstpagina
if (game_data.screen == 'welcome') {
	$('ul:contains("Vrienden uitgenodigd?")').parent().after('<div class="row" id="newdiv"><h4>Links</h4><ul class="welcome-list"><li class="list-item b"><a href="http://www.tribetool.nl/index.php" target="_blank">Tribe tool.nl</a></li><li class="list-item a"><a href="http://www.twscripts.nl" target="_blank">Tw Scripts.nl</a></li><li class="list-item b"><a href="http://nl.twstats.com/" target="_blank">Tw stats.com</a></li><li class="list-item a"><a href="http://www.twmerge.nl/" target="_blank">Tw Merge.nl</a></li><li class="list-item b"><a href="http://nl.twplus.org/area/" target="_blank">Tw Plus.org</a></li><li class="list-item a"><a href="http://www.twclip.com/nl" target="_blank">Tw Clip.com</a></li></ul></div>');
}

//Stukje voor de balk (elke pagina van tw)
	var style = 'background: url(http://cdn2.tribalwars.net/graphic/index/statusbar-center.png?e0ab7) repeat-x transparent;height: 24px;padding: 5px;'
	$('td.topAlign').parent().after('<tr><td colspan="7" style="'+style+'"><center><a href="http://forum.tribalwars.nl/forum.php" TARGET="_blank">Forum</a>&nbsp;&nbsp;-&nbsp;&nbsp;<a href="http://help.tribalwars.nl/wiki/Hoofdpagina" TARGET="_blank">wiki</a>&nbsp;&nbsp;-&nbsp;&nbsp;<a href="http://blog.tribalwars.nl/" TARGET="_blank">Blog</a>&nbsp;&nbsp;-&nbsp;&nbsp;<a href="' + game_data.link_base_pure + 'village=*&screen=buddies">Vrienden</a>&nbsp;&nbsp;-&nbsp;&nbsp;<a href="' + game_data.link_base_pure + 'settings&mode=ref"> Spelers uitnodigen</a>&nbsp;&nbsp;-&nbsp;&nbsp;<a href="' + game_data.link_base_pure + 'welcome">Welkoms pagina</a>&nbsp;&nbsp;-&nbsp;&nbsp;</center></td></tr>');	


		

$ = (typeof(unsafeWindow) != 'undefined') ? unsafeWindow.$ : window.$;

if ($("#serverDate").length) $("#serverDate").after(" <b>Vortex pack © 2013</b>");	
	

	
(function() { 
  if(/screen=mail/.test(location.href) || /screen=memo/.test(location.href) || /screen=forum/.test(location.href));
  else {
  return;
	} 
$ = (typeof(unsafeWindow) != 'undefined') ? unsafeWindow.$ : window.$;

function addJQuery(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "(" + callback.toString() + ")();";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}

function main() {

var version = "1.1"; // werkt niet indien gewijzigd!!!
var world = "nl14"; //standaard wereld dat weergeven wordt. Kan je aanpassen aan jouw gewenste standaard wereld!

$('#bb_bar').append('<td>| TW Maps:</td>');

$('#bb_bar').append('<td><div style="display" id="bb_button_player_twmap" title="Link speler Statistieken toevoegen"><span style="display:inline-block; zoom:1; *display:inline; background:url(http://muzevision.com/twbbforum/graphic/bbcodes.png) no-repeat -80px 0px; padding-left: 0px; padding-bottom:0px; margin-right: 2px; margin-bottom:3px; width: 20px; height: 20px">&nbsp;</span></div></td>');

$('#bb_bar').append('<td><div style="display" id="bb_button_stats_twmap" title="Speler details toevoegen"><span style="display:inline-block; zoom:1; *display:inline; background:url(http://muzevision.com/twbbforum/graphic/bbcodes.png) no-repeat -80px 0px; padding-left: 0px; padding-bottom:2px; margin-right: 2px; margin-bottom:3px; width: 20px; height: 22px">&nbsp;</span></div></td>');

$('#bb_bar').append('<td><div style="display" id="bb_button_coord_twmap" title="Link center coord toevoegen"><span style="display:inline-block; zoom:1; *display:inline; background:url(http://muzevision.com/twbbforum/graphic/bbcodes.png) no-repeat -120px 0px; padding-left: 0px; padding-bottom:0px; margin-right: 2px; margin-bottom:3px; width: 20px; height: 20px">&nbsp;</span></div></td>');

$('#bb_bar').append('<td>| +/- Grafiek:</td>');
 
$('#bb_bar').append('<td><div style="display" id="bb_button_punten_player_twmap" title="Punten grafiek speler toevoegen"><span style="display:inline-block; zoom:1; *display:inline; background:url(http://muzevision.com/twbbforum/graphic/bbcodes.png) no-repeat -80px 0px; padding-left: 0px; padding-bottom:0px; margin-right: 2px; margin-bottom:3px; width: 20px; height: 20px">&nbsp;</span></div></td>');

$('#bb_bar').append('<td><div style="display" id="bb_button_punten_Ally_twmap" title="Punten grafiek stam toevoegen"><span style="display:inline-block; zoom:1; *display:inline; background:url(http://muzevision.com/twbbforum/graphic/bbcodes.png) no-repeat -100px 0px; padding-left: 0px; padding-bottom:0px; margin-right: 2px; margin-bottom:3px; width: 20px; height: 20px">&nbsp;</span></div></td>');

$('#bb_bar').append('<td>| ODA/ODD Spelers:</td>');

$('#bb_bar').append('<td><div style="display" id="ODAspeler" title="ODA speler grafiek toevoegen"><span style="display:inline-block; zoom:1; *display:inline; background:url(http://muzevision.com/twbbforum/graphic/bbcodes.png) no-repeat -80px 0px; padding-left: 0px; padding-bottom:0px; margin-right: 2px; margin-bottom:3px; width: 20px; height: 20px">&nbsp;</span></div></td>');

$('#bb_bar').append('<td><div style="display" id="ODDspeler" title="ODD speler grafiek toevoegen"><span style="display:inline-block; zoom:1; *display:inline; background:url(http://muzevision.com/twbbforum/graphic/bbcodes.png) no-repeat -80px 0px; padding-left: 0px; padding-bottom:0px; margin-right: 2px; margin-bottom:3px; width: 20px; height: 20px">&nbsp;</span></div></td>');

$('#bb_bar').append('<td>| ODA/ODD Stammen:</td>');

$('#bb_bar').append('<td><div style="display" id="ODAstam" title="ODA stam grafiek toevoegen"><span style="display:inline-block; zoom:1; *display:inline; background:url(http://muzevision.com/twbbforum/graphic/bbcodes.png) no-repeat -100px 0px; padding-left: 0px; padding-bottom:0px; margin-right: 2px; margin-bottom:3px; width: 20px; height: 20px">&nbsp;</span></div></td>');

$('#bb_bar').append('<td><div style="display" id="ODDstam" title="ODD stam grafiek toevoegen"><span style="display:inline-block; zoom:1; *display:inline; background:url(http://muzevision.com/twbbforum/graphic/bbcodes.png) no-repeat -100px 0px; padding-left: 0px; padding-bottom:0px; margin-right: 2px; margin-bottom:3px; width: 20px; height: 20px">&nbsp;</span></div></td>');

function BBCoordTwMap() {
	var textBox =  document.getElementById("message");
	var FoundErrors = '';
	var enterCoord   = prompt(unescape("Vul de co%F6rdinaten in (bv: 500|500)", "500|500"));
	var enterWorld = prompt("Vul de wereld in (het moet beginnen met nl)", world);
	if (!enterCoord)    {
		FoundErrors += " Gelieve geldige coördinaten in te vullen!";
	}
	if (!enterWorld)  {
		FoundErrors += " Gelieve een geldige wereld in te vullen!";
	}
	if (FoundErrors)  {
		alert("Error!"+FoundErrors);
		return;
	}
	
	var x = enterCoord.substring(0,3);
	var y = enterCoord.substring(4,9);
	
	var ToAdd = "[quote][img]http://www.greensmilies.com/smile/smiley_emoticons_ds_love.gif[/img][url=http://"+enterWorld+".tribalwarsmap.com/nl/index.php?x="+x+"&y="+y+"]"+enterCoord+"[/url][/quote]";
	textBox.value += ToAdd;

}

function BBStatsTwMap() {
	
	var textBox =  document.getElementById("message");
	var FoundErrors = '';
	var enterPlayer   = prompt("Vul de naam van de speler in", "Speler");
	var enterWorld = prompt("Vul de wereld in (het moet beginnen met nl)", world);
	if (!enterPlayer)    {
		FoundErrors += " Gelieve een geldige spelersnaam in te vullen!";
	}
	if (!enterWorld)  {
		FoundErrors += " Gelieve een geldige wereld in te vullen!";
	}
	if (FoundErrors)  {
		alert("Error!"+FoundErrors);
		return;
	}
$.ajax({
	type: "GET",
    url: 'http://muzevision.com/twbbforum/player.php?player='+enterPlayer+'&world='+enterWorld+'&version='+version+'&callback=?',
    dataType: 'jsonp',
    success: function(responseDetails) {
     if (responseDetails == "fout"){
			alert("Speler bestaat niet op deze wereld!");
			
	}else if (responseDetails == "fout versie"){
			alert("U moet een nieuwe versie van het script downloaden!");
	}else if (responseDetails.length > 15){
			alert("Error! U hebt waarschijnlijk een niet bestaande wereld ingevuld!");
	}else{
	var idPlayer = responseDetails;
	var ToAdd = "[quote][img]http://www.greensmilies.com/smile/smiley_emoticons_ds_love.gif[/img][spoiler][img]http://"+enterWorld+".tribalwarsmap.com/nl/graph/player/"+idPlayer+"[/img][/spoiler][/quote]";
	textBox.value += ToAdd;
	}
	}
	})
	return false;		
	
}

function BBPlayerTwMap() {
	var textBox =  document.getElementById("message");
	var FoundErrors = '';
	var enterPlayer   = prompt("Vul de naam van de speler in", "Speler");
	var enterWorld = prompt("Vul de wereld in (het moet beginnen met nl)", world);
	if (!enterPlayer)    {
		FoundErrors += " Gelieve een geldige spelersnaam in te vullen!";
	}
	if (!enterWorld)  {
		FoundErrors += " Gelieve een geldige wereld in te vullen!";
	}
	if (FoundErrors)  {
		alert("Error!"+FoundErrors);
		return;
	}
$.ajax({
	type: "GET",
    url: 'http://muzevision.com/twbbforum/player.php?player='+enterPlayer+'&world='+enterWorld+'&version='+version+'&callback=?',
    dataType: 'jsonp',
    success: function(responseDetails) {
     if (responseDetails == "fout"){
			alert("Speler bestaat niet op deze wereld!");
			
	}else if (responseDetails == "fout versie"){
			alert("U moet een nieuwe versie van het script downloaden!");
	}else if (responseDetails.length > 15){
			alert("Error! U hebt waarschijnlijk een niet bestaande wereld ingevuld!");
	}else{
	var idPlayer = responseDetails;
	var ToAdd = "[quote][img]http://www.greensmilies.com/smile/smiley_emoticons_ds_love.gif[/img][url=http://"+enterWorld+".tribalwarsmap.com/nl/history/player/"+idPlayer+"]"+enterPlayer+"[/url][/quote]";
	textBox.value += ToAdd;
	}
	}
	})
	return false;
	
}

function BBpuntenspelerTwMap() {
	var textBox =  document.getElementById("message");
	var FoundErrors = '';
	var enterPlayer   = prompt("Vul de naam van de speler in", "Speler");
	var enterWorld = prompt("Vul de wereld in (het moet beginnen met nl)", world);
	if (!enterPlayer)    {
		FoundErrors += " Gelieve een geldige spelersnaam in te vullen!";
	}
	if (!enterWorld)  {
		FoundErrors += " Gelieve een geldige wereld in te vullen!";
	}
	if (FoundErrors)  {
		alert("Error!"+FoundErrors);
		return;
	}
$.ajax({
	type: "GET",
    url: 'http://muzevision.com/twbbforum/player.php?player='+enterPlayer+'&world='+enterWorld+'&version='+version+'&callback=?',
    dataType: 'jsonp',
    success: function(responseDetails) {
     if (responseDetails == "fout"){
			alert("Speler bestaat niet op deze wereld!");
			
	}else if (responseDetails == "fout versie"){
			alert("U moet een nieuwe versie van het script downloaden!");
	}else if (responseDetails.length > 15){
			alert("Error! U hebt waarschijnlijk een niet bestaande wereld ingevuld!");
	}else{
	var idPlayer = responseDetails;
	var ToAdd = "[quote][img]http://www.greensmilies.com/smile/smiley_emoticons_ds_love.gif[/img][img]http://"+enterWorld+".tribalwarsmap.com/nl/graph/p_player/"+idPlayer+"[/img][/quote]";
	textBox.value += ToAdd;
	}
	}
	})
	return false;
	
}

function BBpuntenAllyTwMap() {
	var textBox =  document.getElementById("message");
	var FoundErrors = '';
	var enterAlly   = prompt("Vul de naam van de stam in", "Stam");
	var enterWorld = prompt("Vul de wereld in (het moet beginnen met nl)", world);
	if (!enterAlly)    {
		FoundErrors += " Gelieve een geldige stamnaam in te vullen!";
	}
	if (!enterWorld)  {
		FoundErrors += " Gelieve een geldige wereld in te vullen!";
	}
	if (FoundErrors)  {
		alert("Error!"+FoundErrors);
		return;
	}
$.ajax({
	type: "GET",
    url: 'http://muzevision.com/twbbforum/player.php?tribe='+enterAlly+'&world='+enterWorld+'&version='+version+'&callback=?',
    dataType: 'jsonp',
    success: function(responseDetails) {
     if (responseDetails == "fout"){
			alert("Stam bestaat niet op deze wereld!");
			
	}else if (responseDetails == "fout versie"){
			alert("U moet een nieuwe versie van het script downloaden!");
	}else if (responseDetails.length > 15){
			alert("Error! U hebt waarschijnlijk een niet bestaande wereld ingevuld!");
	}else{
	var idAlly = responseDetails;
	var ToAdd = "[quote][img]http://www.greensmilies.com/smile/smiley_emoticons_ds_love.gif[/img][img]http://"+enterWorld+".tribalwarsmap.com/nl/graph/p_tribe/"+idAlly+"[/img][/quote]";
	textBox.value += ToAdd;
	}
	}
	})
	return false;
	
}

function ODAspeler() {
	var textBox =  document.getElementById("message");
	var FoundErrors = '';
	var enterPlayer   = prompt("Vul de naam van de speler in", "Speler");
	var enterWorld = prompt("Vul de wereld in (het moet beginnen met nl)", world);
	if (!enterPlayer)    {
		FoundErrors += " Gelieve een geldige spelersnaam in te vullen!";
	}
	if (!enterWorld)  {
		FoundErrors += " Gelieve een geldige wereld in te vullen!";
	}
	if (FoundErrors)  {
		alert("Error!"+FoundErrors);
		return;
	}
$.ajax({
	type: "GET",
    url: 'http://muzevision.com/twbbforum/player.php?player='+enterPlayer+'&world='+enterWorld+'&version='+version+'&callback=?',
    dataType: 'jsonp',
    success: function(responseDetails) {
     if (responseDetails == "fout"){
			alert("Speler bestaat niet op deze wereld!");
			
	}else if (responseDetails == "fout versie"){
			alert("U moet een nieuwe versie van het script downloaden!");
	}else if (responseDetails.length > 15){
			alert("Error! U hebt waarschijnlijk een niet bestaande wereld ingevuld!");
	}else{
	var idPlayer = responseDetails;
	var ToAdd = "[quote][img]http://www.greensmilies.com/smile/smiley_emoticons_ds_love.gif[/img][img]http://"+enterWorld+".tribalwarsmap.com/nl/graph/oda_player/"+idPlayer+"[/img][/quote]";
	textBox.value += ToAdd;
	}
	}
	})
	return false;
	
}

function ODDspeler() {
	var textBox =  document.getElementById("message");
	var FoundErrors = '';
	var enterPlayer   = prompt("Vul de naam van de speler in", "Speler");
	var enterWorld = prompt("Vul de wereld in (het moet beginnen met nl)", world);
	if (!enterPlayer)    {
		FoundErrors += " Gelieve een geldige spelersnaam in te vullen!";
	}
	if (!enterWorld)  {
		FoundErrors += " Gelieve een geldige wereld in te vullen!";
	}
	if (FoundErrors)  {
		alert("Error!"+FoundErrors);
		return;
	}
$.ajax({
	type: "GET",
    url: 'http://muzevision.com/twbbforum/player.php?player='+enterPlayer+'&world='+enterWorld+'&version='+version+'&callback=?',
    dataType: 'jsonp',
    success: function(responseDetails) {
     if (responseDetails == "fout"){
			alert("Speler bestaat niet op deze wereld!");
			
	}else if (responseDetails == "fout versie"){
			alert("U moet een nieuwe versie van het script downloaden!");
	}else if (responseDetails.length > 15){
			alert("Error! U hebt waarschijnlijk een niet bestaande wereld ingevuld!");
	}else{
	var idPlayer = responseDetails;
	var ToAdd = "[quote][img]http://www.greensmilies.com/smile/smiley_emoticons_ds_love.gif[/img][img]http://"+enterWorld+".tribalwarsmap.com/nl/graph/odd_player/"+idPlayer+"[/img][/quote]";
	textBox.value += ToAdd;
	}
	}
	})
	return false;
	
}

function ODAstam() {
	var textBox =  document.getElementById("message");
	var FoundErrors = '';
	var enterAlly   = prompt("Vul de naam van de stam in", "Stam");
	var enterWorld = prompt("Vul de wereld in (het moet beginnen met nl)", world);
	if (!enterAlly)    {
		FoundErrors += " Gelieve een geldige stamnaam in te vullen!";
	}
	if (!enterWorld)  {
		FoundErrors += " Gelieve een geldige wereld in te vullen!";
	}
	if (FoundErrors)  {
		alert("Error!"+FoundErrors);
		return;
	}
$.ajax({
	type: "GET",
    url: 'http://muzevision.com/twbbforum/player.php?tribe='+enterAlly+'&world='+enterWorld+'&version='+version+'&callback=?',
    dataType: 'jsonp',
    success: function(responseDetails) {
     if (responseDetails == "fout"){
			alert("Stam bestaat niet op deze wereld!");
			
	}else if (responseDetails == "fout versie"){
			alert("U moet een nieuwe versie van het script downloaden!");
	}else if (responseDetails.length > 15){
			alert("Error! U hebt waarschijnlijk een niet bestaande wereld ingevuld!");
	}else{
	var idAlly = responseDetails;
	var ToAdd = "[quote][img]http://www.greensmilies.com/smile/smiley_emoticons_ds_love.gif[/img][img]http://"+enterWorld+".tribalwarsmap.com/nl/graph/oda_tribe/"+idAlly+"[/img][/quote]";
	textBox.value += ToAdd;
	}
	}
	})
	return false;
	
}

function ODDstam() {
	var textBox =  document.getElementById("message");
	var FoundErrors = '';
	var enterAlly   = prompt("Vul de naam van de stam in", "Stam");
	var enterWorld = prompt("Vul de wereld in (het moet beginnen met nl)", world);
	if (!enterAlly)    {
		FoundErrors += " Gelieve een geldige stamnaam in te vullen!";
	}
	if (!enterWorld)  {
		FoundErrors += " Gelieve een geldige wereld in te vullen!";
	}
	if (FoundErrors)  {
		alert("Error!"+FoundErrors);
		return;
	}
$.ajax({
	type: "GET",
    url: 'http://muzevision.com/twbbforum/player.php?tribe='+enterAlly+'&world='+enterWorld+'&version='+version+'&callback=?',
    dataType: 'jsonp',
    success: function(responseDetails) {
     if (responseDetails == "fout"){
			alert("Stam bestaat niet op deze wereld!");
			
	}else if (responseDetails == "fout versie"){
			alert("U moet een nieuwe versie van het script downloaden!");
	}else if (responseDetails.length > 15){
			alert("Error! U hebt waarschijnlijk een niet bestaande wereld ingevuld!");
	}else{
	var idAlly = responseDetails;
	var ToAdd = "[quote][img]http://www.greensmilies.com/smile/smiley_emoticons_ds_love.gif[/img][img]http://"+enterWorld+".tribalwarsmap.com/nl/graph/odd_tribe/"+idAlly+"[/img][/quote]";
	textBox.value += ToAdd;
	}
	}
	})
	return false;
	
}

$("#bb_button_coord_twmap").click(function () {
BBCoordTwMap();
});

$("#bb_button_stats_twmap").click(function () {
BBStatsTwMap();
});

$("#bb_button_player_twmap").click(function () {
BBPlayerTwMap();
});

$("#bb_button_punten_player_twmap").click(function () {
BBpuntenspelerTwMap();
});

$("#bb_button_punten_Ally_twmap").click(function () {
BBpuntenAllyTwMap();
});

$("#ODAspeler").click(function () {
ODAspeler();
});

$("#ODDspeler").click(function () {
ODDspeler();
});

$("#ODAstam").click(function () {
ODAstam();
});

$("#ODDstam").click(function () {
ODDstam();
});

}

addJQuery(main);
// ++++++++++++++++++++++
// ++ smiliegenerator invoegen
// ++++++++++++++++++++++

function dsSmiliesBBCodesList() {


const ver = '3.0.3';
var GM_prefix = 'dsSmiliesBBCodesList639562_';

var unsafeWindow = window;

var GM_addStyle = function(css) {
	var style = document.createElement('style');
	style.textContent = css;
	document.getElementsByTagName('head')[0].appendChild(style);
}

var GM_deleteValue = function(name) {
	localStorage.removeItem(GM_prefix+name);
}

var GM_getValue = function(name, defaultValue) {
	var value = localStorage.getItem(GM_prefix+name);
	if (!value)
	return defaultValue;
	var type = value[0];
	value = value.substring(1);
	switch (type) {
	case 'b':
		return value == 'true';
	case 'n':
		return Number(value);
	default:
		return value;
	}
}

var GM_log = function(message) {
	console.log(message);
}

var GM_registerMenuCommand = function(name, funk) {
}

var GM_setValue = function(name, value) {
	value = (typeof value)[0] + value;
	localStorage.setItem(GM_prefix+name, value);
}
var lang = {
  'nl' : {
'buildings' : 'Gebouwen',
'units' : 'Eenheden',
'bigunits' : 'Eenheden (big)',
'villages' : 'Dorpen',
'ressources' : 'Grondstoffen',
'points' : 'Activiteit ',
'arrows' : 'Pijlen',
'messages' : 'Mail',
'leaders' : 'Leider stam',
'others' : 'Andere',
'awards' : 'Awards',
'awards2' : 'Awards 2',
'mijlpaalawards' : 'Mijlpaalawards',
'dagelijkseawards' : 'Dagelijkse awards',
'report_url' : 'Link uit (» Dit bericht publiceren (rapport)) plakken;',
'report_direct' : 'Link uit (» Dit bericht publiceren (rapport)) plakken; ', 
'TWmap' : 'Voer speler ID nummer in',
'linkreport' : 'Link van rapport weergeven',
'directreport' : 'Rapport tonen als afbeelding',
'convertcoords' : 'xxx|yyy naar BB-Codes converteren ',
'search' : 'Zoeken . . . ',
'searchterm' : 'Zoeken naar: ',
'line' : 'Rij',
'noresults' : 'Geen resultaten :(',
'personaltexts' : 'Tekst sjablonen',
'noentries' : 'Momenteel geen items',
'editentry' : 'Nieuw sjabloon maken',
'editpersonalentries' : ' Tekst sjablonen bewerken',
'del' : 'Verwijderen',
'confirm_delete' : 'Deze tekst werkelijk vewijderen?',
'newentry' : 'Nieuw sjabloon maken',
'close' : 'Sluiten',
'editpersonaltext' : 'Tekst sjablonen bewerken',
'newpersonaltext' : 'Nieuwe tekst sjablonen',
'title' : 'Titel:',
'text' : 'Tekst:',
'ok' : 'Opslaan',
'cancel' : 'Afbreken',
'scriptname' : 'Vortex Pack',
'shortVersion' : 'versie-',
'smiliesEditor' : 'Smilies Editor',
'close' : 'Sluiten',
'plus' : 'Plus',
'addSmiley' : 'Nieuwe Smiley invoeren',
'addLineBreak' : 'Nieuwe rij aanmaken',
'action' : 'Actie',
'uri' : 'URL',
'result': 'Toont',
'resetSmilies' : 'Reset naar orgineel',
'confirmResetSmilies' : 'Echt je eigen toegevoegde smilis verwijderen?',
'doneResetSmilies' : 'Reset goed uitgevoerd',
'moveUp' : 'Naar boven',
'moveToTop' : 'Als eerste plaatsen',
'moveUpOneLine' : '1 rij omhoog schuiven',
'moveDown' : 'Naar beneden',
'moveDownOneLine' : '1 rij naarbeneden schuiven',
'moveToBottom' : 'Als laatste plaatsen',
'enterImageURL' : 'Voer de URL van de imoticon in:',
'mainMenu' : 'Instellingen',
'setting_on' : 'Ja',
'setting_off' : 'Nee',
'setting_closeAfterAddImage' : 'Smiley sluiten(Popup auto sluiten)',
'setting_quickPreview' : 'Quick Preview:',
'setting_showAllImagesImmediately' : 'Alle Icons direckt tonen:',
'setting_openSmiliesEditor' : 'Smilies Editor openen',
'setting_smilies' : 'Smilies:',
'licenseURL' : '',
'licenseName' : '',
'authorHint' : ''

    },
	

  'en' : {
// tja
 },

};

const url = document.location.href;
var l_matched = url.match(/\/\/(\D{2})\d+\./);
l_matched = l_matched?l_matched[1]:false;
var std_lang = 'en';
const languagecode = l_matched?l_matched:std_lang;
const say = lang[languagecode]?lang[languagecode]:lang[std_lang];




// ############################################################## Default Smilies and Images


var smilies = new Array(
'http://www.en.kolobok.us/smiles/rpg/king.gif',
'http://www.en.kolobok.us/smiles/rpg/king2.gif',
'http://www.en.kolobok.us/smiles/rpg/dwarf.gif',
'http://www.en.kolobok.us/smiles/rpg/paladin.gif',
'http://www.en.kolobok.us/smiles/rpg/orc.gif',
'http://www.freesmileys.org/smileys/smiley-basic/knight.gif',
'http://images.community.wizards.com/community.wizards.com/user/the_silversword/smilies/a7d8133d0f3397ee9f176021f4053a05.gif?v=1376',
'http://www.greensmilies.com/smile/smiley_emoticons_ds_love.gif',
'\n',
'http://www.smiliegenerator.us/smiley-search/y/music-yu.gif',
'http://www.smiliegenerator.us/smiley-search/5/59.gif',
'http://www.smiliegenerator.us/smiley-search/y/yahoo.gif',
'http://www.smiliegenerator.us/smiley-search/w/worshippy.gif',
'http://www.smiliegenerator.us/smiley-search/3/3rd.gif',
'http://www.smiliegenerator.us/smiley-search/2/2nd.gif',
'http://www.smiliegenerator.us/smiley-search/1/1st.gif',
'http://www.smiliegenerator.us/smiley-search/w/Unhappy-wallbash.gif',
'http://www.smiliegenerator.us/smiley-search/b/sad-bawl.gif',
'http://www.smiliegenerator.us/smiley-search/t/signs-tv_happy.gif',
'\n',
'http://www.smiliegenerator.us/smiley-search/kolobok/light_skin/sorry.gif',
'http://www.smiliegenerator.us/smiley-search/sets/VIKING2/sad.gif',
'http://www.smiliegenerator.us/smiley-search/sets/VIKING2/happy.gif',
'http://www.smiliegenerator.us/smiley-search/p/Default-priest.gif',
'http://www.smiliegenerator.us/smiley-search/h/Happy-hug.gif',
'http://www.en.kolobok.us/smiles/big_standart/acute.gif',
'http://www.en.kolobok.us/smiles/big_standart/bad.gif',
'http://www.en.kolobok.us/smiles/big_standart/biggrin.gif',
'http://www.en.kolobok.us/smiles/big_standart/blum1.gif',
'http://www.en.kolobok.us/smiles/big_standart/blush.gif',
'\n',
'Nieuwe rij',
'http://www.en.kolobok.us/smiles/big_standart/boredom.gif',
'http://www.en.kolobok.us/smiles/big_standart/bye.gif',
'http://www.en.kolobok.us/smiles/big_standart/bye2.gif',
'http://www.en.kolobok.us/smiles/big_standart/clapping.gif',
'http://www.en.kolobok.us/smiles/big_standart/congratulate.gif',
'http://www.en.kolobok.us/smiles/big_standart/cool.gif',
'http://www.en.kolobok.us/smiles/big_standart/cray.gif',
'http://www.en.kolobok.us/smiles/big_standart/dance.gif',
'http://www.en.kolobok.us/smiles/big_standart/dance2.gif',
'\n',
'http://www.en.kolobok.us/smiles/big_standart/diablo.gif',
'http://www.en.kolobok.us/smiles/big_standart/drinks.gif',
'http://www.en.kolobok.us/smiles/big_standart/empathy.gif',
'http://www.en.kolobok.us/smiles/big_standart/fool.gif',
'http://www.en.kolobok.us/smiles/big_standart/fool2.gif',
'http://www.en.kolobok.us/smiles/big_standart/good.gif',
'http://www.en.kolobok.us/smiles/big_standart/good2.gif',
'http://www.en.kolobok.us/smiles/big_standart/greeting.gif',
'http://www.en.kolobok.us/smiles/big_standart/hi.gif',
'http://www.en.kolobok.us/smiles/big_standart/i_am_so_happy.gif',
'\n',
'http://www.en.kolobok.us/smiles/big_standart/mocking.gif',
'http://www.en.kolobok.us/smiles/big_standart/morning1.gif',
'http://www.en.kolobok.us/smiles/big_standart/morning2.gif',
'http://www.en.kolobok.us/smiles/big_standart/music.gif',
'http://www.en.kolobok.us/smiles/big_standart/nea.gif',
'http://www.en.kolobok.us/smiles/big_standart/negative.gif',
'http://www.en.kolobok.us/smiles/big_standart/nyam1.gif',
'http://www.en.kolobok.us/smiles/big_standart/pardon.gif',
'\n',
'http://www.en.kolobok.us/smiles/big_standart/playboy.gif',
'http://www.en.kolobok.us/smiles/big_standart/pleasantry.gif',
'http://www.en.kolobok.us/smiles/big_standart/praising.gif',
'http://www.en.kolobok.us/smiles/big_standart/rofl.gif',
'http://www.en.kolobok.us/smiles/big_standart/sad.gif',
'http://www.en.kolobok.us/smiles/big_standart/scratch_one-s_head.gif',
'http://www.en.kolobok.us/smiles/big_standart/secret2.gif',
'http://www.en.kolobok.us/smiles/big_standart/shok.gif',
'http://www.en.kolobok.us/smiles/big_standart/shout.gif',
'http://www.en.kolobok.us/smiles/big_standart/smile.gif',
'http://www.en.kolobok.us/smiles/big_standart/mad.gif',
'\n',
'http://www.schoollife.nl/upload/images/twlogo.png');
var ds_icons = new Array(

new Array(
say.buildings,
'graphic/buildings/main.png',
'graphic/buildings/barracks.png',
'graphic/buildings/stable.png',
'graphic/buildings/garage.png',
'graphic/buildings/snob.png',
'graphic/buildings/smith.png',
'graphic/buildings/place.png',
'graphic/buildings/statue.png',
'graphic/buildings/church.png',
'graphic/buildings/market.png',
'graphic/buildings/wood.png',
'graphic/buildings/stone.png',
'graphic/buildings/iron.png',
'graphic/buildings/farm.png',
'graphic/buildings/storage.png',
'graphic/buildings/hide.png',
'graphic/buildings/wall.png'
),

new Array(
say.units,
'graphic/unit/unit_archer.png',
'graphic/unit/unit_axe.png',
'graphic/unit/unit_catapult.png',
'graphic/unit/unit_heavy.png',
'graphic/unit/unit_knight.png',
'graphic/unit/unit_light.png',
'graphic/unit/unit_marcher.png',
'graphic/unit/unit_priest.png',
'graphic/unit/unit_ram.png',
'graphic/unit/unit_snob.png',
'graphic/unit/unit_spear.png',
'graphic/unit/unit_spy.png',
'graphic/unit/unit_sword.png'
),

new Array(
say.bigunits,
'graphic/unit_big/archer.png',
'graphic/unit_big/axe.png',
'graphic/unit_big/catapult.png',
'graphic/unit_big/heavy.png',
'graphic/unit_big/knight.png',
'graphic/unit_big/light.png',
'graphic/unit_big/marcher.png',
'graphic/unit_big/ram.png',
'graphic/unit_big/snob.png',
'graphic/unit_big/spear.png',
'graphic/unit_big/spy.png',
'graphic/unit_big/sword.png'
),


new Array(
say.villages,
'graphic/map/b1.png',
'graphic/map/b1_left.png',
'graphic/map/b2.png',
'graphic/map/b2_left.png',
'graphic/map/b3.png',
'graphic/map/b3_left.png',
'graphic/map/b4.png',
'graphic/map/b4_left.png',
'graphic/map/b5.png',
'graphic/map/b5_left.png',
'graphic/map/b6.png',
'graphic/map/b6_left.png'
),

new Array(
say.ressources,
'graphic/eisen.png',
'graphic/holz.png',
'graphic/lehm.png',
'http://www.schoollife.nl/upload/images/twgstgt.png'
),

new Array(
say.points,
'graphic/dots/blue.png',
'graphic/dots/brown.png',
'graphic/dots/green.png',
'graphic/dots/grey.png',
'graphic/dots/red.png',
'graphic/dots/yellow.png'
),

new Array(
say.arrows,
'graphic/forwarded.png',
'graphic/group_jump.png',
'graphic/group_left.png',
'graphic/group_right.png',
'graphic/links2.png',
'graphic/rechts2.png',
'graphic/links.png',
'graphic/rechts.png',
'graphic/oben.png',
'graphic/unten.png',
'graphic/pfeil.png',
'graphic/overview/up.png',
'graphic/overview/down.png',
'graphic/map/map_ne.png',
'graphic/map/map_nw.png',
'graphic/map/map_se.png',
'graphic/map/map_sw.png'
),

new Array(
say.messages,
'graphic/answered_mail.png',
'graphic/deleted_mail.png',
'graphic/new_mail.png',
'graphic/read_mail.png'
),

new Array(
say.leaders,
'graphic/ally_rights/diplomacy.png',
'graphic/ally_rights/forum_mod.png',
'graphic/ally_rights/found.png',
'graphic/ally_rights/internal_forum.png',
'graphic/ally_rights/invite.png',
'graphic/ally_rights/lead.png',
'graphic/ally_rights/mass_mail.png'
),

new Array(
say.others,
'graphic/ally_forum.png',
'graphic/face.png',
'graphic/gold.png',
'graphic/klee.png',
'graphic/rabe.png',
'graphic/rename.png',
'graphic/command/attack.png',
'graphic/command/back.png',
'graphic/command/cancel.png',
'graphic/command/return.png',
'graphic/command/support.png',
'graphic/unit/def.png',
'graphic/unit/def_archer.png',
'graphic/unit/def_cav.png',
'graphic/unit/speed.png',
'graphic/unit/att.png',
'graphic/forum/forum_admin_unread.png',
'graphic/forum/thread_close.png',
'graphic/forum/thread_closed_unread.png',
'graphic/forum/thread_delete.png',
'graphic/forum/thread_open.png',
'graphic/forum/thread_unread.png'
),

new Array(
say.awards,
'graphic/awards/award1.png',
'graphic/awards/award2.png',
'graphic/awards/award3.png',
'graphic/awards/award4.png',
'graphic/awards/award5.png',
'graphic/awards/award6.png',
'graphic/awards/award7.png',
'graphic/awards/award8.png',
'graphic/awards/award13.png',
'graphic/awards/award14.png',
'graphic/awards/award15.png',
'graphic/awards/award16.png',
'graphic/awards/award17.png',
'graphic/awards/award18.png',
'graphic/awards/award19.png',
'graphic/awards/master_of_the_battlefield.png',
'graphic/awards/warmonger.png',
'graphic/awards/award20.png'
),

new Array(
say.awards2,
'graphic/awards/wealth_comes_in_gold.png',
'graphic/awards/wallbreaker.png',
'graphic/awards/market_guru.png',
'graphic/awards/beloved_friends.png',
'graphic/awards/demolisher.png',
'graphic/awards/nobles_faith.png',
'graphic/awards/scout_hunter.png',
'graphic/awards/reliable_commander.png',
'graphic/awards/brothers_in_arms.png',
'graphic/awards/dummy.png'
),

new Array(
say.mijlpaalawards,
'graphic/awards/milestone/milestone_villages.png',
'graphic/awards/milestone/milestone_bash_points.png',
'graphic/awards/milestone/milestone_points.png'
),

new Array(
say.dagelijkseawards,
'graphic/awards/award9.png',
'graphic/awards/award10.png',
'graphic/awards/award11.png',
'graphic/awards/farmer_of_the_day.png',
'graphic/awards/award12.png'
)

);


var icon_smilies = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAMAAAC6V+0/AAAACXBIWXMAAAsTAAALEwEAmpwYAAACoFBM\
VEUAAACvsrfb0bHNwJS5ur7Zz7DJvJSusrbe1LStsbbKvJG4sAuyqgrVzK7c0rKvpwrQxJ7IuI/TyKKU\
jQfDs411bwns4Rm0rArf0xK0rAu3rwvNwZvFvA66si7e1J706Rje1LDRyJ7VzBHKwA7c0RTYzqC7snmz\
qgv79Brb0q779yva0Jnb0RHw6l9sZwmwqA3CuRCYkBfb0bDe1bDs53Lt5nP26xf78xweHQW2rXTXzRGn\
oA0ZGASRigyxqBCooAiRiiLNxJzc07Lw6lz68xv16Rbu4hXUyRMKCgOlng3SyRGbkwze1KyEfgm4sAys\
sLXf1a6im1359TTWzJ3y6y6fmA/r4BTm2xSnnhAjIgWyqg7OxQ+jmw0gHgWVjgu2rgyelQbd0hWBew7V\
yovr3xTn3BPJvxCSiw26sV/LwA67sg7k3Jr49DP89BqwqAqlnQeBexjy5xbMwYLZzhKwpxCclA/WzBHS\
yBHOxA/KwQ7GvA7Btw28tAzj2pqupwv17DKFfwiBexDJvxbJvIgKCQKspA+FfwzQxhDMww7Jvw7FvA3B\
uA28swzp3RSxqAppYwmHgAeFfRyimiTMv5HOwZfKu5K3rTCKhAy9tA7Hvg3DuQ3Atw28sw2zqgqYjwh0\
bgqXkAaPhzbGvRmzqVa1rAqblAqPiQ2/tg6+tgy6sguzrAq1rBGjmguTjAmJgQ2roWrGuYaclCOIggl/\
eQuhmgqvpgqRiQlybAuOiAuJgjHFuIu4rHOUjB2mnQmakgt4cgl1cAp9dgtzbQp2cAmWjwiTjAiHfyK5\
rn+7r3mSii6Rig+YkQaXjweVjQiUjQaTjAeIgRKRijy8sIGMhDLGuo24rXeimVGTizeNhS6TiziimVW3\
rHrIu5CGgAqupwy1rQpMLoSeAAAAAXRSTlMAQObYZgAAAWlJREFUeF5VzFOzK1EQgNG9xzOxk2Pbtm3b\
tm1b17Zt27b9V85k8nLzvXTXqq4GACP/C0JIYgBAAY7ohQswAHGKK8nE0dqe23AaQISdZsPOo0qrCeM6\
cyFFIakcpnln+Jouqy0sbTfaeFAId+np5WBXXhHr5Obiynf3F+qwsanZJ8TvVEBgUDAvNCxci3hEZFR0\
THZcfELiVHKKSJaOsyjNzGrPyc3LLygsKi4pFZV9krIorlRWVatrao3qG/78/dfS2iYmATTs6Ozq7unt\
6x8YHDIYUYyNG0IAicmD0zOzc/MLi0s8zcrq2gaCRWbTVqNt23fs3LWbp9mzd9/+AwzJInro8JGjx46f\
MDipOq04c/YcQ2vx/AX+xUuXVfwrV69dl924qUP01u07d+/df/Dw0eMnT5+hDOQQff7i5avXb96+e//h\
I4pqfxKb2T5/+frt+4+fv36zO8GiXLJFL4kcAwCjSb1oDKwDMvtwyB3q78QAAAAASUVORK5CYII=';

var icon_report_direct = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAMAAAC6V+0/AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAYFBMVEUAAACvsrebjHDXy7f5+Pausra0po2nmYC+s5qL\
e125ur7QxJ6WDArKvJHRv6rDEBCtsbbTyKLNwZvRgHLJvJTZl4rn3Na2Z1rVzK7t6OLIuI/Ds43Zz7DKu5Lb0bGssLVAcwUHAAAAAXRSTlMAQObYZgAAAKVJ\
REFUeF5tzdcOwzAIQFGG98ruHv//l8WtFNVyzhtXIACC/oOIOgDgpRMAH50R8NV5H8V2k501htvoiJViI3F/tJFTSl3Z1kdTxfY8DCdJhuwkMcboyJ7UNgzF\
EJUYNeA8k1HiuqREZRYIuK6e5FC2UiprJTFncp6t9+6cllzpb/SWvMl5W35xrNGRJ5aBOe+xg0dRy/eOxPvt2bjdA0AYdWMM8AFB7hjReYdZRgAAAABJRU5E\
rkJggg==';

var icon_report_link = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAMAAAC6V+0/AAAACXBIWXMAAAsTAAALEwEAmpwYAAABIFBMVEUAAACbjHCvsrfJvJT5+PbXy7e0po2+s5qLe12n\
mYDKvJG5ur6tsbausrbb0bHRv6qWDArZz7DQxJ7DEBDRgHLZl4rNwZvn3NbTyKLDs43IuI+2Z1rt6OLVzK7Ku5KssLV1wtydqZxgosGVqKVXsVBq0eyBqZVf\
mJ26t5ZcndFtgnQsoD+J7vjAvpaKnomnqYlsoGJFWnEob3E8nbJPw+RQxeZKqdpIf8hSf5hsvENKUnkkR38xcaU2iMI5ic09ecc4Wbo1W48+hUxobH4lNoQf\
ZVohgFAudIAxUaksQagrQZo/WoSimotUX4cnY1IUfRwXgCglcl80Xpc8YKN1gZGrpJFqeIc/hVcymURAlXFVi7CCnai2r5JhyuhVlc9biqeITlZjAAAAAXRS\
TlMAQObYZgAAAPNJREFUeF5lzeNyBEEUgNG+bYy1jG3btu33f4t0MqnJbO3389QFQsYthTF2DUK4oy2DcNiWg7BXxITinHleVwkFMEoZ97z/yRQEpbTJVIFM\
NeK4YolDjmEoQFVoGsc+B/DzR1Xg1NZMggD86k8WIwl20U4Fgd/XMxxFkYtwBkIyJaVoBEl37+BElmGECUgFkk/1p0kyMDI0SYhFLUAC06NjjI1/fH5Na+1a\
zJuZnZtfWFxaXtHaKXB1bX1jc2t7Z7eMe/sHh0fHJ6dnWuMCzy8ur65vbu/uf2+Svx4en55fXt/eCbFYq3e2VK8ZhIzjtuQY9A0LLSCs0XdPPQAAAABJRU5E\
rkJggg==';

var icon_code = 'data:image/png;base64,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';

var icon_icons = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9kHGQkaKOydSuwA\
AAMgSURBVDjLnZRPaBxlGMZ/839md5P9Y3Y3TTZry9pNtJVqD4b2EDWH1JMnteCpXgpBBO2hooeCBW+CJ/UiVFDw4CEQClsVzCUWqlbBGpVgUvxTaNxm081kd2Z35pvxMO402yyCeU/D\
937P8z3zvs/7SgALi7UwJOT/hIQUf4eEJE2TU3OzirSwWAurYw6qIiPLEvuJIAjxRcBfjQwqgKrIcWKvFJ0w6ACgqAaB6A4kVRWZHceNCAcpO/7cZbJTZYRrs3njx+jQ/Qnf6/DL1Q8H\
koZhiDwoMfPaZazcNsK16drbWIUpAMxciaNTVc6+/PbgukpSpHB3vHi+Rv7403hff8x0/k8SBy0sEzbqw+juXbZEFsdp4PhJLLW1h7RP4cmzy/zhjDG5/hmPlZKMFrMcO1KlWjnIo1MV\
XjhdBiBhWpx//cJAlXKvGUEQYv9+g+bKAoaukc0Mc/ihKhMHyhQeSDOSL5LPZRgvejhdGVVP8+ZbH8XYXkNVgG5nGwBtaILnj9xFsXQeHC9SKpVI6QZWIo9xu8746G2efOJvbm342G0H\
4fsxNoqRSKHw/SjZFHzzm42m6qSSSVK6QS6bjq837Xs1Mw2d764vx1jh+0jSvwqFEACIts3E2BjPzu5waGKD8uF1tFwJgIcbdb692qC+2WI83+C9S9+zG9ubHhXA9yLjaumoR7bd5dUL\
Na4srQGQHjIBePfiU2w1nZjskclKjI0NHjFHr2QmhzGNFvWtJG+8Mg3AlaU1mrbbBzo3/wwrq00kORljezPd58OECyThy+UmS9c0DlVmmK/MANBuOTjOHdyO4NbNLSR5CNMw7puU+3z4\
6cWjAHS9Do7r0m45MZkf3FNyp5vEEwHTJ078t7EBDowWMNSAhCHT2kUqRNB3T1Nk5k6W+8kkaS/hmdPH+HX1JqlwMz7reB6+EDiuj9sRmIbO6to6vt/o/+VeDUOUvsSl98+BJPPS/DsU\
CyNksgUArq+4XPthk08+OIMsBwNXsrSwWAtHpJ/RNBlZUfa3YIXA8wLaxuPRHv/8i6/CHcdF2t/CJgwhZZmcmpuV/wER7Et6eXrxhgAAAABJRU5ErkJggg==';

var icon_convertCoords = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAABGdBTUEAALGPC/xhBQAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAA\
ABl0RVh0Q29tbWVudABDcmVhdGVkIHdpdGggR0lNUFeBDhcAAANiSURBVDhPnZVdaFtlGMd/5+Tkc2maNBubTWzW1JTQ6kDprhRBalFECU7GvBoDZTL1wiHb\
wEtBL3Y5ZFgmeDfGrLMbtEOddirKtBCUdjE2nTbFNetam6YfyUl6kuP7npK5kkLUB55zzvue//M/z/t8HWVwcFDZ2xmrres6/0UUlHtwE5MdLhefDl1oVT7/\
4msz3LbclEuzqU0xMws+tLWSzr8B2+1aU0KLyzRNVHXTffmsKP8cpc6w3d527NJeux9cf5Z3qctLd7gzlbZs1Zad1t3uduH3Omnb3dHAKW0azmGRCp37NcnN\
775k9Idf6B8YIBxaI/nHOhPfXCayy0Xi2DtEu2INpFsiXauZXDt3mrdef5uy02eRRQIKe8wcHaEeXko8TmK/n+yCTjo1xdgHx/htcmILqeWhJJJy+vIwzkWT\
pR4fLk8rj7QrREOtrBX+5NKFs+RWFXoDFdq8KgPPPkN+vpvs2EVqvQ/fI1VlIOdULxczScZv/MTRN14h2tvJyaGz9MTCBO0lC1yw7aTvyado3xMkFuvFMIq0\
BHfj69xHWV+1VIpaz3CpXKKnP86Jax9ze+E2gbCf886QBZKkmXmDB7w1Fh1xHnv6BTbKOmfO5/CGuqlVDUtl+BuqtSSAZaGFYoGqVuVD/z6LdCKVZfnmKJXZ\
7xn+0cGr7/7O0YSHGVEFp87kGBkPiN4RWZYXz0KacrGMYX2pSlEvUTUM8ht58jnRRZ1wONEnPL3Be9OHcczeFXGvcvBkBrc7iNu5SjozR3fkQVTZhwpVDnV1\
8ej0ogiWapFV1iv8lSxwfP9Brs9HOPBiP0euPm95WyyV0cuGcKBmrT0eFw7HZgVq9QzLFwMvH6J1PM251HUKqWU+OfUm7qAfnohjbGwa66UVqjUbNs3O/e0d\
DHgR+UUZGh4xO7zT1pekKKIN797Kkvp2BKp52nwOUUIt6MVVllYqvD8mjtUSR7PvELEu81A0zPHXniMeTDJTiKJ8duWqGfJMWWSyGmUnK6pqZSw7OYk5lxWG\
szidHSjtETy79nLgxM9i7earj/osu7rMrnShXLoyaoY9mS0vtlvYNNt221v2sivRzV42aQ5WlOYYya7JSVsRWWsmptFQsg0mkssafnJqy+Eo4/Z/RGbXK8aa\
+AV4/was4VDzReWIEgAAAABJRU5ErkJggg==';

var icon_usertexts = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAABGdBTUEAALGPC/xhBQAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAA\
ABl0RVh0Q29tbWVudABDcmVhdGVkIHdpdGggR0lNUFeBDhcAAAMpSURBVDhPjVVNb9NAEH3rtWM7SZOmBTWqgKqBVAJa4ILEmQP8XCQuCA6cOKKWUyVKJShq\
y1cp+awTfy1vNm3iNgeYyNpde+ftm5k3GwXa6zdvzXA0kul/m4Ka7jUwqAQBnj976qgXL1+ZjdWoAKTgqC6y1ANMB8b4yLMOHB3CcXKugVF0CpMreOEavNLC\
1PfwdBGurFztTF/+PnXR+f0dWv1Af3gdnjnAWdpCUNpDkq9D4xvHFR76CzfWciyHM99BNJoAOs6M/uHPGn4ct7G+6iBzH6Lma7J6At98QH3xCZLBRyw2t5AM\
9xGrGlnPUmVI3zIsmtYajx63cWP1LhJTQ9Vvo1pvIks2EFaWGe4dVBYWObbwaX+frodTd6WYrquARmVYai7h8/EvvN9+h+OTDkqBRn15BX7god5Ygus6KFer\
AAGu2hwglIOS76Hb7SFg5eRRkhIW45JxXUzVxTcbcp7Pdps84xq4eesmxxyNpYZlkjE/mnslrAsz3Me6XzrHAsbj3myTYek9jfbGhgUseR4ialRg+mQdj8eo\
1WpoNHgQ4Yq+wLVJUbI0nQLmWYo0ybGzs4OvBwcWMM8ySLHqBDI8pLXesswNjyn6Cnmbw4wOF4/k0NEKw+GQXxQGHIMwRL/ft3m1OS6VbE4FoOgr3WNDTpPx\
jGGaIElzlCsVJEmCwA/Q63UJWmboEUG7uN1qne9Xl3zlpQUk8SkgW4CAIws2GAxsqL7vo0qZVHhItVzGSrOJXHpwEvTUV3p6TtgwGUP20Grfwf0HW2w5n2dQ\
sA5TwVHLnI9U12IWTNbzgMqlcDW+Hx/ZUMMgtBUXdmIT2bAclJr8rto8IHWYpgYxK392FvHicK18pE/FXeaka6tZkK/FFebzgNxsmFMpyrejI2QclbwjYHIu\
ryFzm1CPvc4fzC4vyeh5Dic9MCFfLUuBMtTqddzb3ERE2ezt7lKLOcbRwDLzXOYw7qPkkjnTU7RJp0RjeJ7oT+PawglOvmwjjkVjMVQ2YiFSVtpD6MacG4pd\
I1VnVAfDJ3MRfsJmkFtbOkrxLyCXy7HQppdO/ddCqlsN7V+A/gtSUG0hEZwMIwAAAABJRU5ErkJggg==';

var icon_search = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAMAAAC6V+0/AAAB41BMVEXlEmuusrbZz7CtsbavsrfKvJG5ur7JvJTb0bGssLX+343Ds43Iuo/VzK7GvqrUy66zr63Gvq23tLPF2+6ms87b5vLE0ebG\
xszMw6vY5/OopKrUyq296fvR8Pvd9frg9vvX8/u41O7O0NrWzK3BuaWyrrGZz/qz4vvE7PrO8PvP8PvI7vu45vuoweXMxr+ZlZdtlNKMxfuvrrCy4Pu86Py+6vy35PzOxKjMw6jKydDVy66Dgo9e\
h8lml9qHt+mZyPCfyuyZw+iXw+yTxvZ4s/a1vM3RyK2Kh49pjMd+p9qTt9ykxN2tyt1+j7mfwd2Otd50puLAwszRyKyspZhrgLCQtd2qyd/A2d7M4t/L4d671d+jw96Rr9bHwsHXza6p2vzCtI1y\
coeGnr+30dDP39Ld49La49LJ3dGqw9G4vM+0rZ+LpM6vpIhsbIuToLPQ3tPn49Li5NS8ycuqrcKzs8WyrKS6pXi8r4iHgYWDgpSRkaKWlaSgnKGjm4ufmJGwnY7xyGTMo0+i1PzAs428sIy/so2w\
nnbUix+GuvH75pDQpU2xh0jrnR3833zIoFK0h0TomRz+4I384oXTqU7IuY2th03pmxzgwXjItoi4iUPDhiyklpDEuJaryt7AsIq5p4K7rYxDXc45AAAAAXRSTlMAQObYZgAAARNJREFUeF5l0FOz\
xGAMgOHkQ9vFsW3btm3btm3bxk897WJ2d85zlzcXmQmAgGYYYyjIzeofASghxMPaNt7ezoYYUFBJUmqQo4Obk7OLq6SnAioFuE94enn7+Pr5p+gjlWNgVXBIaFh4RGRUtCnGxMbtJyQmJfecpqUb\
I8nIzMrOyc3LLygsKjYeIiWlZeUVlV/VNbV19YaIpKGxqbmlta29o7OrWxcRkPf29Q8MDg2PjI6Ncx0GTBQnp6ZnZufmFxaXlkUFAsqrldW19Y3Nre2d3T2tPCKouOLg8EjLj0/UZ+fyQOVocnGp\
vrpWIuNmbm7v7h8eGSA39/SsfnlFQNHC2/vHJ4KgsfD986tRXk/RAhXgD5aaN2cW9YgDAAAAAElFTkSuQmCC';

var icon_img = 'data:image/png;base64,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';


var icon_facebook = 'data:image/png;base64,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';

var icon_skype = 'data:image/png;base64,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';

var icon_twitter = 'data:image/png;base64,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';

var icon_hyves = 'data:image/png;base64,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';


var $ = function(x,data) {
  var y = this.alert?this.document:this;
  var add = function(l) { for(var i = 0; i < l.length; i++){ l[i].$ = $;} return l;};
  if(x[0] == '#') {
    var r = y.getElementById(x.substring(1));
    if(r)
      r.$ = $;
    return r;
    }
  else if(x[0] == '.') {
    var r = y.getElementsByClassName(x.substring(1))
    return add(r);
    }
  else if(x[0] == '-') {
    var r = y.getElementsByName(x.substring(1))
    return add(r);
    }
  else if(x.toString && x.toString() == '[object HTMLCollection]') {
    return add(x); 
    }
  else if(typeof(x) == 'object') {
    x.$ = $;
    return x; 
    }
  else if(x == '$d:') {
    var r = data;
	r.parentNode.removeChild(r);
	r.$ = $;
    return r;
    }	
  else if(x[0] == '$' || x.substring(0,3) == '$n:') {
    if(x.substring(0,3) == '$n:')
	  x = x.substring(2);

    var r = document.createElement(x.substring(1));
	if(data && typeof(data) == 'object') {
	  for (var attr in data) {
	    if(attr == 'styles') {
		  if(!r.style)
		    r.setAttribute('style','');
		  for (var key in data[attr]) {
		    r.style[key] = data[attr][key];		    		  
		    }	      
		  }	
	    else if(attr == 'html') {
		  r.innerHTML = data[attr];	      
		  }	
	    else if(attr == 'append') {
		  data[attr].appendChild(r);	      
		  }			  
		else {
		  r.setAttribute(attr,data[attr]) 
          }			 
        }
	  }
    r.$ = $;
    return r;
    }
  else {
    var r = y.getElementsByTagName(x)
    return add(r);
    }
  }

Array.prototype.remove = function()
  {
  for(var i = 0,l = arguments.length; i < l; i++)
    {
    var x = this[arguments[i]];
    if (x)
      this.splice(x,1);
    }
  return this;
  }

var rel_top = function(e)
  {
  var y = 0;
  while(e)
    y += e.offsetTop + e.clientTop,e = e.offsetParent;
  return y;
  }

var rel_left = function(e)
  {
  var x = 0;
  while(e)
    x += e.offsetLeft + e.clientLeft,e = e.offsetParent;
  return x;
  }
  
var fromJson = function(str,def) {
  try
    {
    var re = JSON.parse( str );
    }
  catch(e)
    {
    return def;
    }
  return re;
  }
  
var toJson = function(o) {
  return JSON.stringify( o );
  } 
  
const forum = (url.indexOf('forum.php') != -1  || url.indexOf('screen=view_forum') != -1  || url.indexOf('screen=forum') != -1) && (url.indexOf('answer=true') != -1 || url.indexOf('mode=new_thread') != -1 || url.indexOf('edit_post_id') != -1 || url.indexOf('mode=new_poll') != -1);
const memo = url.indexOf('screen=memo') != -1;
const mail = url.indexOf('screen=mail') != -1 && (url.indexOf('mode=new') != -1 || url.indexOf('mode=view') != -1);
const answer = url.indexOf('view=') != -1;    // Diff. of mail
const ally = url.indexOf('screen=ally') != -1 && (url.indexOf('mode=overview') != -1 || url.indexOf('mode=properties') != -1);

var quick_preview = GM_getValue('quick_preview',false);
var close_after_add_image = GM_getValue('close_after_add_image',true);
var show_all_images_immediately = GM_getValue('show_all_images_immediately',false);

var default_smilies = smilies;
if(GM_getValue('personal_smilies',false)) {
  var str = GM_getValue('personal_smilies','[]');
  var smilies = fromJson(str,[]);
  smilies = smilies?smilies:[];
} else {
  GM_setValue('personal_smilies',toJson(smilies));
}

var saveReload = function() { // Save text field content because of required reload	
  if(messageTextField && messageTextField.value) {
    GM_setValue('lastTextFieldEntry',messageTextField.value);
  } else {
    GM_setValue('lastTextFieldEntry',false);	
  }
  document.location.reload();
};

var toogle_quick_preview = function () {
  if(GM_getValue('quick_preview',false)) {
    GM_setValue('quick_preview',false); 
  } else {
    GM_setValue('quick_preview',true);   
  }

  saveReload();
};

var toogle_close_after_add_image = function () {
  if(GM_getValue('close_after_add_image',false)) {
    GM_setValue('close_after_add_image',false); 
  } else {
    GM_setValue('close_after_add_image',true);   
  }

  saveReload();
} ;  

var toogle_show_all_images_immediately = function () {
  if(GM_getValue('show_all_images_immediately',false)) {
    GM_setValue('show_all_images_immediately',false); 
  } else {
    GM_setValue('show_all_images_immediately',true);   
  }

  saveReload();
} ;  



    
var toogle_smiliesEditor = function (ev) {
	ev.preventDefault();
	if(document.getElementById('smilieseditor')) {
		saveReload();
		return;
	}
	
	var div = document.createElement('div');
	div.setAttribute('style','overflow:auto; max-height:700px; width: 1050px; display:none; clear:both; position:absolute; z-index:101; border: 2px solid #804000; background:#efe6c9; top: 60px; left: 10px; padding:5px; border-top-left-radius:20px; ');
	div.setAttribute('id','smilieseditor');
	
	document.body.appendChild(div);
	toggle('smilieseditor');
	toggle('mainmenu',false,true);	
	
	div.appendChild(document.createTextNode(say.scriptname+' ('+say.shortVersion+ver+')'));
	
	var h2 = document.createElement('h2');
	h2.appendChild(document.createTextNode(say.smiliesEditor));	
	div.appendChild(h2);
	
	
	var close = document.createElement('a');
	close.setAttribute('style','position:absolute; top: 0px; right: 0px; cursor:pointer; ');
	close.setAttribute('href','#');	
	close.appendChild(document.createTextNode(say.close));
    close.addEventListener('click',function() {			
	    saveReload();
		return; },false);	
    div.appendChild(close);
	
	
	var table = document.createElement('table');
	table.setAttribute('style','width: 1000px;');
	div.appendChild(table);
	
	
	var tr = document.createElement('tr');	
	table.appendChild(tr);	

	var td = document.createElement('td');	
	td.setAttribute('colspan','3');
	tr.appendChild(td);
	
	var img = document.createElement('img');
	img.setAttribute('src','/graphic/plus.png');	  
	img.setAttribute('alt',say.plus);	 
	img.setAttribute('title',say.addSmiley);	 	    
	td.appendChild(img);	
	  
	td.appendChild(document.createTextNode(say.addSmiley));		
	
	td.addEventListener('click',smiliesEditor_op_add,false);	

	var tr = document.createElement('tr');	
	table.appendChild(tr);	

	var td = document.createElement('td');	
	td.setAttribute('colspan','3');
	tr.appendChild(td);
	
	var img = document.createElement('img');
	img.setAttribute('src','/graphic/plus.png');	  
	img.setAttribute('alt',say.plus);	 
	img.setAttribute('title',say.addLineBreak);	 	    
	td.appendChild(img);	
	  
	td.appendChild(document.createTextNode(say.addLineBreak));		
	
	td.addEventListener('click',smiliesEditor_op_addLB,false);	
		
	
	var table = document.createElement('table');
	table.setAttribute('style','width: 1000px;');
	table.setAttribute('class','smiliesEditor_table');	
	div.appendChild(table);	
		
	var tr = document.createElement('tr');	
	table.appendChild(tr);
	
	var th = document.createElement('th');	
	tr.appendChild(th);
	th.appendChild(document.createTextNode(say.action));	
		
	var th = document.createElement('th');	
	tr.appendChild(th);
	th.appendChild(document.createTextNode(say.uri));	
	
	var th = document.createElement('th');	
	tr.appendChild(th);
	th.appendChild(document.createTextNode(say.result));	
		
	
	for(var i = 0; i < smilies.length; i++) {	
	  var tr = smiliesEditor_tr(i);
	  table.appendChild(tr);
	}
	
	var table = document.createElement('table');
	table.setAttribute('style','width: 1000px;');
	div.appendChild(table);		
	
	var tr = document.createElement('tr');	
	table.appendChild(tr);	

	var td = document.createElement('td');	
    td.setAttribute('colspan','3');
	tr.appendChild(td);
	
	var img = document.createElement('img');
	img.setAttribute('src','/graphic/plus.png');	  
	img.setAttribute('alt',say.plus);	 
	img.setAttribute('title',say.addSmiley);	 	    
	td.appendChild(img);	
	  
	td.appendChild(document.createTextNode(say.addSmiley));		
	
	td.addEventListener('click',smiliesEditor_op_add,false);
	
	var tr = document.createElement('tr');	
	table.appendChild(tr);	

	var td = document.createElement('td');	
	td.setAttribute('colspan','3');
	tr.appendChild(td);
	
	var img = document.createElement('img');
	img.setAttribute('src','/graphic/plus.png');	  
	img.setAttribute('alt',say.plus);	 
	img.setAttribute('title',say.addLineBreak);	 	    
	td.appendChild(img);	
	  
	td.appendChild(document.createTextNode(say.addLineBreak));		
	
	td.addEventListener('click',smiliesEditor_op_addLB,false);	
	
	
	var tr = document.createElement('tr');	
	table.appendChild(tr);	

	var td = document.createElement('td');	
	td.setAttribute('colspan','3');
	tr.appendChild(td);
				  
	td.appendChild(document.createTextNode(say.resetSmilies));		
	
	td.addEventListener('click',function() { 
	  if(confirm(say.confirmResetSmilies)) 
	    smiliesEditor_op_reset();  
      alert(say.doneResetSmilies);
      saveReload();
	},false);		
	
	return false;

};
var smiliesEditor_tr = function(index) {


	  var tr = document.createElement('tr');		
	  
	  var td = document.createElement('td');	  
	  tr.appendChild(td);
	
	  td.setAttribute('class','smiliesindex_'+index);	 	
	  
	  var img = document.createElement('img');
	  img.setAttribute('src','graphic/forum/thread_delete.png');	  
	  img.setAttribute('alt',say.del);	 
	  img.setAttribute('title',say.del);	 
      img.addEventListener('click',smiliesEditor_op_del,false);	   
	  td.appendChild(img);	

	  td.appendChild(document.createTextNode(' '));		  
	  
	  var img = document.createElement('img');
	  img.setAttribute('src','graphic/forum/thread_unread.png');	  
	  img.setAttribute('alt',say.editentry);	 
	  img.setAttribute('title',say.editentry);
      img.addEventListener('click',smiliesEditor_op_edit,false);	   	  
	  td.appendChild(img);	

	  td.appendChild(document.createTextNode(' - '));	
	  
	  var img = document.createElement('img');
	  img.setAttribute('src','graphic/overview/up.png');	  
	  img.setAttribute('alt',say.moveUp);	 
	  img.setAttribute('title',say.moveToTop);
      img.addEventListener('click',smiliesEditor_op_top,false);	   	  
	  td.appendChild(img);		  
	
	  td.appendChild(document.createTextNode('  '));	
	
	  var img = document.createElement('img');
	  img.setAttribute('src','graphic/oben.png');	  
	  img.setAttribute('alt',say.moveUp);	 
	  img.setAttribute('title',say.moveUpOneLine);	 
      img.addEventListener('click',smiliesEditor_op_up,false);	 	  
	  td.appendChild(img);	
	  	
	  td.appendChild(document.createTextNode(' - '));	
		
	  var img = document.createElement('img');
	  img.setAttribute('src','graphic/unten.png');	  
	  img.setAttribute('alt',say.moveDown);	 
	  img.setAttribute('title',say.moveDownOneLine);	 	 
      img.addEventListener('click',smiliesEditor_op_down,false);	 	  
	  td.appendChild(img);	
	  
	  td.appendChild(document.createTextNode(' '));	
	  
	  var img = document.createElement('img');
	  img.setAttribute('src','graphic/overview/down.png');	  
	  img.setAttribute('alt',say.moveDown);	 
	  img.setAttribute('title',say.moveToBottom);
      img.addEventListener('click',smiliesEditor_op_bottom,false);	 	  
	  td.appendChild(img);		  
	  	  

	  
	  if(smilies[index] == '\n') {
	  
	    var td = document.createElement('td');	
	    td.setAttribute('colspan','2');
	    tr.appendChild(td);	    
	
		td.appendChild(document.createTextNode('-----------------------------------------------------------------------------------------------'));
		
	  }	 else {	  
	  
	    var td = document.createElement('td');
	    tr.appendChild(td);
	    td.appendChild(document.createTextNode(smilies[index]));
        td.setAttribute('class','smiliesEditor_url');				

	    var td = document.createElement('td');	
	    tr.appendChild(td);
	    var img = document.createElement('img');
	    img.setAttribute('src',smilies[index]);
		img.setAttribute('class','smiliesEditor_img');
	    td.appendChild(img);
		
	  }	  

	  return tr;
};

var smiliesEditor_op_reset = function(ev) {
  GM_setValue('personal_smilies',toJson(default_smilies));
};

var smiliesEditor_op_del = function (ev) {
  var index = parseInt(this.parentNode.className.split('_').pop());
  
  var n_arr = [];
  for(var i = 0; i < smilies.length; i++) {
    if(i !== index) {
	  n_arr.push(smilies[i]);
	}
  }
  smilies = n_arr;
  
  GM_setValue('personal_smilies',toJson(smilies));
    
  this.parentNode.parentNode.parentNode.removeChild(this.parentNode.parentNode);
};

var smiliesEditor_op_add = function (ev) {
  var new_url = prompt(say.enterImageURL,'');

  if(!new_url) {
    return;   
  }

  smilies.push(new_url);

  GM_setValue('personal_smilies',toJson(smilies));
  
  var tr = smiliesEditor_tr(smilies.length-1,new_url);
  
  this.parentNode.parentNode.parentNode.getElementsByClassName('smiliesEditor_table')[0].appendChild(tr); 
} ; 

var smiliesEditor_op_addLB = function (ev) {
  var new_url = '\n';

  smilies.push(new_url);

  GM_setValue('personal_smilies',toJson(smilies));
  
  var tr = smiliesEditor_tr(smilies.length-1,new_url);
  
  this.parentNode.parentNode.parentNode.getElementsByClassName('smiliesEditor_table')[0].appendChild(tr); 
};  
  
var smiliesEditor_op_edit = function (ev) {
  var index = parseInt(this.parentNode.className.split('_').pop());
  
  var new_url = prompt(say.enterImageURL,smilies[index]);

  if(!new_url || new_url == smilies[index]) {
    return;   
  }

  smilies[index] = new_url;

  GM_setValue('personal_smilies',toJson(smilies));
	
  (this.parentNode.tagName == 'TR'?this.parentNode:this.parentNode.parentNode).getElementsByClassName('smiliesEditor_url')[0].innerHTML = new_url;
  (this.parentNode.tagName == 'TR'?this.parentNode:this.parentNode.parentNode).getElementsByClassName('smiliesEditor_img')[0].src = new_url;
}; 

var smiliesEditor_op_up = function (ev) {
  var index = parseInt(this.parentNode.className.split('_').pop());
   
  var table = this.parentNode.parentNode.parentNode;
  
  smiliesEditor_op_switch(table,index,index-1);
}; 
 
var smiliesEditor_op_down = function (ev) {
  var index = parseInt(this.parentNode.className.split('_').pop());
   
  var table = this.parentNode.parentNode.parentNode;
  
  smiliesEditor_op_switch(table,index,index+1);
}; 
 
var smiliesEditor_op_top  = function (ev) {
  var index = parseInt(this.parentNode.className.split('_').pop());
   
  var table = this.parentNode.parentNode.parentNode;
  
  smiliesEditor_op_switch(table,index,0);
}; 
 
var smiliesEditor_op_bottom  = function (ev) {
  var index = parseInt(this.parentNode.className.split('_').pop());
   
  var table = this.parentNode.parentNode.parentNode;
  
  smiliesEditor_op_switch(table,index,smilies.length-1);
};   
	  
var smiliesEditor_op_switch = function(table,index0,index1) {
  if(index0 < 0 || index0 > smilies.length-1 || index1 < 0 || index1 > smilies.length-1) {
    return;
	}


  var tmp = smilies[index0];
  smilies[index0] = smilies[index1];
  smilies[index1] = tmp;
  GM_setValue('personal_smilies',toJson(smilies));
  
  var tr0 = table.getElementsByTagName('tr')[index0+1];
  var tr1 = table.getElementsByTagName('tr')[index1+1];  
  
  table.insertBefore(tr0,table.getElementsByTagName('tr')[index1+1]);
  table.insertBefore(tr1,table.getElementsByTagName('tr')[index0+1]); 

  tr0.getElementsByTagName('td')[0].setAttribute('class','smiliesindex_'+index1);	
  tr1.getElementsByTagName('td')[0].setAttribute('class','smiliesindex_'+index0);	  
  
};	  

var mainmenu = function (ev) {
	ev.preventDefault();
	if(document.getElementById('mainmenu')) {
		toggle('mainmenu');
		return;
	}

	var div = document.createElement('div');
	div.setAttribute('style','overflow:auto; max-height:300px; display:none; clear:both; position:absolute; z-index:101; border: 2px solid #804000; background:#efe6c9; top: 100px; left: 200px; padding:5px; ');
	div.setAttribute('id','mainmenu');
	
	document.body.appendChild(div);
	toggle('mainmenu',this);
	
	
	div.appendChild(document.createTextNode(say.scriptname+' ('+say.shortVersion+ver+')'));
	
	var h2 = document.createElement('h2');
	h2.appendChild(document.createTextNode(say.mainMenu));	
	div.appendChild(h2);
	
	var table = document.createElement('table');
	div.appendChild(table);
	
	var tr = document.createElement('tr');	
	table.appendChild(tr);
	
	var tr = document.createElement('tr');	
	table.appendChild(tr);

	var th = document.createElement('th');	
	tr.appendChild(th);
	th.appendChild(document.createTextNode(say.setting_closeAfterAddImage));
	
	var th = document.createElement('th');	
	tr.appendChild(th);
	var spanON = document.createElement('span');
	spanON.setAttribute('style','cursor:pointer; font-weight:'+(close_after_add_image?'bold':'normal'));
	spanON.appendChild(document.createTextNode(say.setting_on));
	if(!close_after_add_image) {
	  spanON.addEventListener('click',toogle_close_after_add_image,false);
	}
	
	var spanOFF = document.createElement('span');
	spanOFF.setAttribute('style','cursor:pointer; font-weight:'+(close_after_add_image?'normal':'bold'));
	spanOFF.appendChild(document.createTextNode(say.setting_off));	
	if(close_after_add_image) {
	  spanOFF.addEventListener('click',toogle_close_after_add_image,false);
	}
	
	th.appendChild(spanON);
	th.appendChild(document.createTextNode('/'));	
	th.appendChild(spanOFF);	
	
	var tr = document.createElement('tr');	
	table.appendChild(tr);

	var th = document.createElement('th');	
	tr.appendChild(th);
	th.appendChild(document.createTextNode(say.setting_quickPreview));
	
	var th = document.createElement('th');	
	tr.appendChild(th);
	var spanON = document.createElement('span');
	spanON.setAttribute('style','cursor:pointer; font-weight:'+(quick_preview?'bold':'normal'));
	spanON.appendChild(document.createTextNode(say.setting_on));
	if(!quick_preview) {
	  spanON.addEventListener('click',toogle_quick_preview,false);
	}
	
	var spanOFF = document.createElement('span');
	spanOFF.setAttribute('style','cursor:pointer; font-weight:'+(quick_preview?'normal':'bold'));
	spanOFF.appendChild(document.createTextNode(say.setting_off));	
	if(quick_preview) {
	  spanOFF.addEventListener('click',toogle_quick_preview,false);
	}
	
	th.appendChild(spanON);
	th.appendChild(document.createTextNode('/'));	
	th.appendChild(spanOFF);

	var tr = document.createElement('tr');	
	table.appendChild(tr);

	var th = document.createElement('th');	
	tr.appendChild(th);
	th.appendChild(document.createTextNode(say.setting_showAllImagesImmediately));
	
	var th = document.createElement('th');	
	tr.appendChild(th);
	var spanON = document.createElement('span');
	spanON.setAttribute('style','cursor:pointer; font-weight:'+(show_all_images_immediately?'bold':'normal'));
	spanON.appendChild(document.createTextNode(say.setting_on));
	if(!show_all_images_immediately) {
	  spanON.addEventListener('click',toogle_show_all_images_immediately,false);
	}
	
	var spanOFF = document.createElement('span');
	spanOFF.setAttribute('style','cursor:pointer; font-weight:'+(show_all_images_immediately?'normal':'bold'));
	spanOFF.appendChild(document.createTextNode(say.setting_off));	
	if(show_all_images_immediately) {
	  spanOFF.addEventListener('click',toogle_show_all_images_immediately,false);
	}
	
	th.appendChild(spanON);
	th.appendChild(document.createTextNode('/'));	
	th.appendChild(spanOFF);	
	
	var tr = document.createElement('tr');	
	table.appendChild(tr);

	var th = document.createElement('th');	
	tr.appendChild(th);
	th.appendChild(document.createTextNode(say.setting_smilies));
	
	var th = document.createElement('th');	
	tr.appendChild(th);
	var spanOpen = document.createElement('span');
	spanOpen.setAttribute('style','cursor:pointer; ');
	spanOpen.appendChild(document.createTextNode(say.setting_openSmiliesEditor));
    spanOpen.addEventListener('click',toogle_smiliesEditor,false);
	
	th.appendChild(spanOpen);	
	return false;
}

  var show_userTextsBox = function (mainDiv)
    {
    if(document.getElementById('user_texts'))
      return;

    var div = document.createElement('div');
    div.setAttribute('style','overflow:auto; max-height:300px; display:none; clear:both; position:absolute; z-index:101; border: 2px solid #804000; background:#efe6c9; top: 100px; left: 200px; ');
    div.setAttribute('id','user_texts');

    var table = document.createElement('table');

    var tr = document.createElement('tr');
    var th = document.createElement('th');
    th.appendChild(document.createTextNode(say.personaltexts));
    tr.appendChild(th);
    table.appendChild(tr);

    var texts = getTexts();
    for(var i = 0,len = texts.length; i < len; i++)
      {
      var tr = document.createElement('tr');
      var td = document.createElement('td');
      td.appendChild(document.createTextNode(texts[i].name));
      td.addEventListener('click',function(i) { return function() {
        insert(texts[i].value,'');
        toggle('user_texts',this);
       } }(i),false);
      td.setAttribute('class','tdbutton');
      tr.appendChild(td);
      table.appendChild(tr);
      }

    if(len == 0)
      {
      var tr = document.createElement('tr');
      var td = document.createElement('td');
      td.setAttribute('style','color:Silver; font-family:Courier,sans-serif; ');
      td.appendChild(document.createTextNode(say.noentries));
      tr.appendChild(td);
      table.appendChild(tr);
      }


    var tr = document.createElement('tr');
    var td = document.createElement('td');
    td.appendChild(document.createTextNode(say.editentry));
    td.setAttribute('class','tdbutton');
    td.setAttribute('style','border-top:solid black 2px; ');
    td.addEventListener('click',function() {
      show_userTextsEditBox(mainDiv);

      toggle('user_texts',mainDiv);
      toggle('user_texts_edit',mainDiv);
      return false;
    },false);
    tr.appendChild(td);
    table.appendChild(tr);

    div.appendChild(table);

    mainDiv.appendChild(div);
    }
  var show_userTextsEditBox = function (mainDiv)
    {
    if(document.getElementById('user_texts_edit'))
      return;

    var div = document.createElement('div');
    div.setAttribute('style','overflow:auto; max-height:300px; display:none; clear:both; position:absolute; z-index:101; border: 2px solid #804000; background:#efe6c9; top: 100px; left: 200px; ');
    div.setAttribute('id','user_texts_edit');

    var table = document.createElement('table');

    var tr = document.createElement('tr');
    var th = document.createElement('th');
    th.setAttribute('colspan','4');
    th.appendChild(document.createTextNode(say.editpersonalentries));
    tr.appendChild(th);
    table.appendChild(tr);

    var texts = getTexts();
    for(var i = 0,len = texts.length; i < len; i++)
      {
      var tr = document.createElement('tr');

      var td = document.createElement('td');
      td.appendChild(document.createTextNode(texts[i].name));

      tr.appendChild(td);

      var td = document.createElement('td');
      td.setAttribute('style','font-size:x-small; font-family:monospace;');

      var text = texts[i].value.substring(0,250);
      if(text != texts[i].value)
        text += '...';

      text = text.split('\n');

      for(var attr in text)
        {
        if(typeof(text[attr]) != 'function')
          {
          td.appendChild(document.createTextNode(text[attr]));
          td.appendChild(document.createElement('br'));
          }
        }

      tr.appendChild(td);

      var td = document.createElement('td');
      td.setAttribute('class','tdbutton');
      td.setAttribute('title','Bewerken');
      td.appendChild(document.createTextNode('E'));
      td.addEventListener('click',function(i) { return function() {
        var re = workWithEntry(texts,i);
        mainDiv.appendChild( re );
       } }(i),false);
      tr.appendChild(td);


      var td = document.createElement('td');
      td.setAttribute('class','tdbutton');
      td.setAttribute('title',say.del);
      td.appendChild(document.createTextNode('X'));
      td.addEventListener('click',function(i) { return function() {
       var c = confirm(say.confirm_delete);
       if(c)
         {
         texts.remove(i);
         setTexts(texts);
         if(document.getElementById('user_texts'))
           {
           document.getElementById('user_texts').parentNode.removeChild(document.getElementById('user_texts'));
           }
         if(document.getElementById('user_texts_edit'))
           {
           document.getElementById('user_texts_edit').parentNode.removeChild(document.getElementById('user_texts_edit'));
           }
         show_userTextsBox(mainDiv);
         show_userTextsEditBox(mainDiv);
         toggle('user_texts_edit',this);
         }

       } }(i),false);

      tr.appendChild(td);
      table.appendChild(tr);
      }

    var tr = document.createElement('tr');

    var td = document.createElement('td');
    td.setAttribute('class','tdbutton');
    td.appendChild(document.createTextNode(say.newentry));
    td.addEventListener('click',function() {
      var re = workWithEntry(texts);
      mainDiv.appendChild( re );
      return false;
    },false);
    tr.appendChild(td);

    var td = document.createElement('td');
    td.setAttribute('colspan','3');
    td.setAttribute('class','tdbutton');
    td.appendChild(document.createTextNode(say.close));
    td.addEventListener('click',function() {
      toggle('user_texts_edit',this);
      return false;
    },false);
    tr.appendChild(td);

    table.appendChild(tr);

    div.appendChild(table);

    mainDiv.appendChild(div);
    }
  var workWithEntry = function (texts,n)
    {
    var texts = texts;
    if(typeof(n) != 'undefined')
      {
      var header = say.editpersonaltext;
      var name = texts[n].name;
      var text = texts[n].value;
      }
    else
      {
      var header = say.newpersonaltext;
      var name = '';
      var text = '';
      }

    var table = document.createElement('table');
    table.setAttribute('id','user_texts_edit_entry');
    table.setAttribute('style','clear:both; position:absolute; z-index:121; border: 2px solid #804000; background:#efe6c9; top: 100px; left: 200px; ');

    var tr = document.createElement('tr');
    var th = document.createElement('th');
    th.setAttribute('colspan','2');

    th.appendChild(document.createTextNode(header));

    tr.appendChild(th);
    table.appendChild(tr);

    var tr = document.createElement('tr');

    var td = document.createElement('td');
    td.appendChild(document.createTextNode(say.title));
    tr.appendChild(td);

    var td = document.createElement('td');
    var input = document.createElement('input');
    input.setAttribute('type','text');
    input.setAttribute('value',name);
    input.setAttribute('size',64);
    input.setAttribute('id','UserText_Name');
    td.appendChild(input);
    tr.appendChild(td);

    table.appendChild(tr);
    var tr = document.createElement('tr');

    var td = document.createElement('td');
    td.appendChild(document.createTextNode(say.text));
    tr.appendChild(td);

    var td = document.createElement('td');
    var textarea = document.createElement('textarea');
    textarea.setAttribute('cols','40');
    textarea.setAttribute('rows','12');
    textarea.setAttribute('id','UserText_Text');
    textarea.appendChild(document.createTextNode(text));
    td.appendChild(textarea);
    tr.appendChild(td);

    table.appendChild(tr);

    var tr = document.createElement('tr');

    var td = document.createElement('td');
    td.setAttribute('class','tdbutton');
    td.appendChild(document.createTextNode(say.ok));
    td.addEventListener('click',function() {
      var data = {
        'name' : document.getElementById('UserText_Name').value,
        'value' : document.getElementById('UserText_Text').value };

      if(typeof(n) != 'undefined')
        {
        texts[n] = data;
        }
      else
        {
        texts.push(data);
        }

      setTexts(texts);
      this.parentNode.parentNode.parentNode.removeChild(this.parentNode.parentNode);


      if(document.getElementById('user_texts'))
        {
        document.getElementById('user_texts').parentNode.removeChild(document.getElementById('user_texts'));
        }
      if(document.getElementById('user_texts_edit'))
        {
        document.getElementById('user_texts_edit').parentNode.removeChild(document.getElementById('user_texts_edit'));
        }
      show_userTextsBox(mainDiv);

      return false;
    },false);
    tr.appendChild(td);

    var td = document.createElement('td');
    td.setAttribute('class','tdbutton');
    td.appendChild(document.createTextNode(say.cancel));
    td.addEventListener('click',function() {
      this.parentNode.parentNode.parentNode.removeChild(this.parentNode.parentNode);
      return false;
    },false);
    tr.appendChild(td);

    table.appendChild(tr);

    return table;
    }


var getTexts = function ()
  {
  var gm = GM_getValue('usertexts');

  if(typeof(gm) == 'undefined' || gm == '' || !gm)
    return new Array();

  try
    {
    var ar = JSON.parse( gm );
    }
  catch(e)
    {
    return new Array();
    }
  return ar;
  }

var setTexts = function (ar)
  {
  var str = JSON.stringify(ar);
  GM_setValue('usertexts',str);
  }

var toggleLine = function (e)
  {
  var elist = this.nextSibling.getElementsByTagName('a');
  var n = elist[0].style.display=='inline'?'none':'inline';
  for(var i = 0; i < elist.length; i++)
    {
    elist[i].style.display = n;
    }
  }

var toggle = function (id,parent,hide)
  {
  var e = document.getElementById(id);
  if(e.style.display == 'block' || hide) {
    e.style.display = 'none';
	}
  else {
    e.style.display = 'block';
	if(parent)	{
	  var top = rel_top(parent)+5;
	  var left = rel_left(parent)+10;	  
	  e.style.top = top +'px';
	  e.style.left = left +'px';	  
	  }
	}
		
  }

var insert = function (aTag, eTag)
  {
  var input = messageTextField;
  input.focus();
  if(typeof input.selectionStart != undefined)
    {
    var start = input.selectionStart;
    var end = input.selectionEnd;
    var insText = input.value.substring(start, end);
    input.value = input.value.substr(0,start) + aTag + insText + eTag + input.value.substr(end);
    var pos;
    if(insText.length == 0)
      pos = start + aTag.length;
    else
      pos = start + aTag.length + insText.length + eTag.length;
    input.selectionStart = pos;
    input.selectionEnd = pos;
    }
  textarea_keyup();
  }
  
if(document.getElementById('message') || document.getElementById('intern') || document.getElementById('desc_text') || document.getElementById('bb_bar'))
  {
  var root = 'http://' + document.location.host;
  if(document.getElementById('bb_bar')) 
    var mainDiv = document.getElementById('bb_bar');
  else if(ally && document.getElementById('desc_text'))
    var mainDiv = document.getElementById('bb_row').getElementsByTagName('div')[0];
  else if(ally && document.getElementById('bb_row'))
    var mainDiv = document.getElementById('bb_row').getElementsByTagName('div')[0];
  else if(forum || ally )
    var mainDiv = document.getElementsByTagName('form')[0].getElementsByTagName('div')[0];
  else if(answer)
    var mainDiv = document.getElementById('message').parentNode.parentNode.getElementsByTagName('div')[0];
  else if(mail)
    var mainDiv = document.getElementById('message').parentNode.parentNode.previousElementSibling.getElementsByTagName('div')[0];
  else if(memo)
    var mainDiv = document.getElementById('bb_bar');
	

  var messageTextField = document.getElementById('message');
  if(memo) {
    messageTextField = document.getElementsByName('memo')[0];
  }  else if(document.getElementById('desc_text')) {
    messageTextField = document.getElementById('desc_text');
  }
	if(GM_getValue('lastTextFieldEntry',false)) {
	  messageTextField.value = GM_getValue('lastTextFieldEntry','');
	  GM_setValue('lastTextFieldEntry',false);	
	}
  if(messageTextField) {
    var left,top;
    var store = function() {
      top = this.scrollTop;
      left = this.scrollLeft;
      };
    var update = function() {
      this.scrollTop = top;
      this.scrollLeft = left;
      };

    messageTextField.addEventListener('mouseover',update,false);
    messageTextField.addEventListener('mouseout',store,false);
    }

  if(show_all_images_immediately) {
    var css = '#bb_icons img { max-width:40px; max-height:40px; } '; 
  } else {
    var css = '#bb_icons td a { display:none;  } #bb_icons img { max-width:40px; max-height:40px; } ';
  }
  
  css += ' .tdbutton { color:DarkBlue; font-family:"Courier New"; text-decoration:underline; } ';

  if (typeof GM_addStyle == "undefined")
    {
    var head = document.getElementsByTagName("head")[0];
    var style = document.createElement("style");
    style.type = "text/css";
    style.appendChild(document.createTextNode(css));
    head.appendChild(style);
    }
  else
    {
    GM_addStyle(css);
    }
  mainDiv.addButton = function(title,img,fct,node)
    {
    var a = document.createElement('a');
    a.setAttribute('title',title);
    a.setAttribute('href','#');
    a.addEventListener('click',fct,false);
	
	var span = document.createElement('span');
    span.setAttribute('style','display:inline-block; zoom:1; *display:inline; background:url('+img+') no-repeat 0px 0px; padding-left: 0px; padding-bottom:0px; margin-right: 2px; margin-bottom:3px; width: 20px; height: 20px');
	span.innerHTML = '&nbsp;';	
    a.appendChild(span);
    if(node)
      this.insertBefore(a,node);
    else
      this.insertBefore(a,document.getElementById('bb_sizes'));
    return this;
    }
  if(forum || memo || ally || mail)
    {
    mainDiv.removeChild(document.getElementById('bb_button_report_display'));
    }

  if(forum || memo)
    {	
    var table = document.createElement('table');
    table.setAttribute('id','bb_smilies');
    table.setAttribute('style','display:none; clear:both; position:absolute; z-index:100; border: 2px solid #804000; background:#efe6c9 no-repeat url(http://c1b1.de/images/gm_logo.png) bottom right; top: 100px; left: 200px; ');

    var tr = document.createElement('tr');

    var td = document.createElement('td');
    td.setAttribute('style','padding:2px;');

    for(var i = 0; i < smilies.length; i++)
      {
      if(smilies[i] == '\n')
        {
        var br = document.createElement('br');
        td.appendChild(br);
        continue;
        }


      var img = new Image();
      img.setAttribute('src',smilies[i]);
      img.setAttribute('style','vertical-align:middle; ');
      img.setAttribute('alt','[img]'+smilies[i]+'[/img]');

      var a = document.createElement('a');
      a.setAttribute('href','#');
      a.setAttribute('style','vertical-align:middle; ');
      a.addEventListener('click',function() {
        insert(this.title,'');
		if(close_after_add_image) {
          toggle('bb_smilies',this);
		  }
        return false;
      },false);
      a.setAttribute('title','[img]'+smilies[i]+'[/img]');
      a.appendChild(img);

      td.appendChild(a);
      }

    tr.appendChild(td);
    table.appendChild(tr);
    mainDiv.appendChild(table);
    }

  if(forum || memo)
    {
    var table = document.createElement('table');
    table.setAttribute('id','bb_icons');
    table.setAttribute('style','display:none; clear:both; position:absolute; z-index:101; border: 2px solid #804000; background:#efe6c9 no-repeat url(http://c1b1.de/images/gm_logo.png) bottom right; top: 100px; left: 200px; ');

    for(var i = 0; i < ds_icons.length; i++)
      {
      var tr = document.createElement('tr');

      var td = document.createElement('td');
      td.style.fontSize = '7pt';
      td.style.cursor = 'pointer';
      td.appendChild(document.createTextNode(ds_icons[i][0]+':'));
      td.addEventListener('click',toggleLine,false);
      tr.appendChild(td);

      var td = document.createElement('td');
      td.setAttribute('style','padding:2px;');

      for(var x = 1; x < ds_icons[i].length; x++)
        {
        var img = new Image();
        img.setAttribute('src',ds_icons[i][x]);
        img.setAttribute('style','padding:1px; border:solid 1px black; -moz-border-radius:5px 0px;');
        img.setAttribute('alt','[img]'+ds_icons[i][x]+'[/img]');

        var a = document.createElement('a');
        a.setAttribute('href','#');
        a.setAttribute('style','padding:2px; margin-right:1px;  margin-bottom:2px; ');
        a.style.fontSize = '';
        a.addEventListener('click',function() {
          insert(this.title,'');
          toggle('bb_icons',this);
          return false;
        },false);
        a.setAttribute('title','[img]'+root+'/'+ds_icons[i][x]+'[/img]');
        a.appendChild(img);

        td.appendChild(a);
        }
      tr.appendChild(td);
      table.appendChild(tr);
      }

    mainDiv.appendChild(table);
    }
	
  if(forum || memo || mail || ally)
  {
	table = tr = td = a = 0; // Dirty bug fix	

    var table = document.createElement('table');
	mainDiv.appendChild(table);	
    table.setAttribute('id','bb_convertcoords');
    table.setAttribute('style','display:none; clear:both; position:absolute; z-index:100; border: 2px solid #804000; background:#efe6c9; top: 100px; left: 200px; ');

    var tr = document.createElement('tr');
	table.appendChild(tr);	

    var td = document.createElement('td');
	tr.appendChild(td);
	td.setAttribute('colspan',2);
	td.appendChild(document.createTextNode(say.convertcoords));	

    var tr = document.createElement('tr');
	table.appendChild(tr);

	tr.addEventListener('click',function() {
	  messageTextField.value = messageTextField.value.replace(/(\(\d{1,3}\|\d{1,3}\))(?!\[\/c[a-z]{4,4}\])/g,'[coord]$1[/coord]');
      messageTextField.value = messageTextField.value.replace(/(\d{1,3}\|\d{1,3})(?!.*\[\/c[a-z]{4,4}\])/g,'[coord]($1)[/coord]');
	  toggle('bb_convertcoords',this);
	  return false;
	},false);


    var td = document.createElement('td');
	tr.appendChild(td);
	td.setAttribute('style','padding:0;background:url(http://cdn.tribalwars.net/graphic//bbcodes/bbcodes.png?1) no-repeat -120px 0px; width: 20px; height: 20px');
	td.setAttribute('title','[coord]');
	td.appendChild(document.createTextNode(' '));	

    var td = document.createElement('td');
	tr.appendChild(td);
	td.appendChild(document.createTextNode('[coord]'));		

    var tr = document.createElement('tr');
	table.appendChild(tr);

	tr.addEventListener('click',function() {
	  messageTextField.value = messageTextField.value.replace(/(\(\d{1,3}\|\d{1,3}\))(?!\[\/c[a-z]{4,4}\])/g,'[claim]$1[/claim]');
      messageTextField.value = messageTextField.value.replace(/(\d{1,3}\|\d{1,3})(?!.*\[\/c[a-z]{4,4}\])/g,'[claim]($1)[/claim]');
	  toggle('bb_convertcoords',this);
	  return false;
	},false);

	var td = document.createElement('td');
	tr.appendChild(td);
	td.setAttribute('style','padding:0;background:url(http://cdn.tribalwars.net/graphic//bbcodes/bbcodes.png?1) no-repeat -340px 0px; width: 20px; height: 20px');
	td.setAttribute('title','[claim]');
	td.appendChild(document.createTextNode(' '));	

    var td = document.createElement('td');
	tr.appendChild(td);
	td.appendChild(document.createTextNode('[claim]'));	

	table = tr = td = a = 0; // Dirty bug fix		
  }	

  // Runtimes     [runtimes]  [/runtimes]
  if(forum || memo || mail || ally)
  {
  mainDiv.addButton('Looptijden tool -->tussen de bbcode tag de dorp coord plaatsen [runtimes][coord]362|514[/coord] [i]Notitie[/i][/runtimes]',icon_img,function() {
      insert('[runtimes]\n\n','[/runtimes]');
  return false;
  }
  ,mainDiv.getElementsByTagName('a')[4]);
  }
  
  // Code     [code]  [/code]
  if(forum || memo || ally || mail)
  {	  
mainDiv.addButton('Code_tool, voegt de tekst [code] [/code] in, alles tussen deze tekst worden bb_codes uitgeschakeld',icon_code,function() {
      insert('[code]\n\n','[/code]');
  return false;
  }
  ,mainDiv.getElementsByTagName('a')[5]);
  } 

  // Facebook     [facebook]  [/facebook]
  /*if(forum || memo || ally || mail)
    {
    mainDiv.addButton(say.facebook,icon_facebook,function() {
      var url = prompt(say.facebook,'');
      if(url != '')
        {
        if(url.indexOf('=') != -1)
          {
          url = url.split('=').pop();
          insert('[facebook]'+url+'[/facebook]','');
          }
        else
          {
          url = url.split('/').pop();
          insert('[facebook]'+url+'[/facebook]','');
          }
        }
      else
        insert('[facebook]','[/facebook]');
      return false;
      });
    }

  // Skype     [skype]  [/skype]
  if(forum || memo || ally || mail)
    {
    mainDiv.addButton(say.skype,icon_skype,function() {
      var url = prompt(say.skype,'');
      if(url != '')
        {
        if(url.indexOf('=') != -1)
          {
          url = url.split('=').pop();
          insert('[skype]'+url+'[/skype]','');
          }
        else
          {
          url = url.split('/').pop();
          insert('[skype]'+url+'[/skype]','');
          }
        }
      else
        insert('[skype]','[/skype]');
      return false;
      });
    }	

  // Twitter     [twitter]  [/twitter]
  if(forum || memo || ally || mail)
    {
    mainDiv.addButton(say.twitter,icon_twitter,function() {
      var url = prompt(say.twitter,'');
      if(url != '')
        {
        if(url.indexOf('=') != -1)
          {
          url = url.split('=').pop();
          insert('[twitter]'+url+'[/twitter]','');
          }
        else
          {
          url = url.split('/').pop();
          insert('[twitter]'+url+'[/twitter]','');
          }
        }
      else
        insert('[twitter]','[/twitter]');
      return false;
      });
    }

  // Hyves     [hyves]  [/hyves]
  if(forum || memo || ally || mail)
    {
    mainDiv.addButton(say.hyves,icon_hyves,function() {
      var url = prompt(say.hyves,'');
      if(url != '')
        {
        if(url.indexOf('=') != -1)
          {
          url = url.split('=').pop();
          insert('[hyves]'+url+'[/hyves]','');
          }
        else
          {
          url = url.split('/').pop();
          insert('[hyves]'+url+'[/hyves]','');
          }
        }
      else
        insert('[hyves]','[/hyves]');
      return false;
      });
    }*/
  
  if(forum || memo)
    {
    mainDiv.addButton('Icons',icon_icons,function() {
      toggle('bb_icons',this);
      return false;
      },
	  document.getElementById('bb_button_units')
	  );
    }

  if(forum || memo)
    {
    mainDiv.addButton('Smilies',icon_smilies,function() {
      toggle('bb_smilies',this);
      return false;
      },
	  document.getElementById('bb_button_units')
	  );
    }

  if(forum || memo || ally || mail)
    {
    mainDiv.addButton(say.linkreport,icon_report_link,function() {
      var url = prompt(say.report_url,'');
      if(url != '')
        {
        if(url.indexOf('=') != -1)
          {
          url = url.split('=').pop();
          insert('[report]'+url+'[/report]','');
          }
        else
          {
          url = url.split('/').pop();
          insert('[report]'+url+'[/report]','');
          }
        }
      else
        insert('[report]','[/report]');
      return false;
      },
	  document.getElementById('bb_button_size')
	  );
    }

  if(forum || memo || ally || mail)
    {
    mainDiv.addButton(say.directreport,icon_report_direct,function() {
      var url = prompt(say.directreport,'');
      if(url != '')
        {
        if(url.indexOf('=') != -1)
          {
          url = url.split('=').pop();
          insert('[report_display]'+url+'[/report_display]','');
          }
        else
          {
          url = url.split('/').pop();
          insert('[report_display]'+url+'[/report_display]','');
          }
        }
      else
        insert('[report_display]','[/report_display]');
      return false;
      },
	  document.getElementById('bb_button_size')
	  );
    }

  if(forum || memo || mail || ally)
    {
    mainDiv.addButton(say.convertcoords,icon_convertCoords,function() {
      toggle('bb_convertcoords',this);
      return false;
      });		
    }

  if(forum || memo || mail || ally)
    {
    mainDiv.addButton(say.search,icon_search,function() {
      var key = prompt(say.searchterm,'');
      var text = messageTextField.value;
      var ar = text.split('\n');
      var foundInRenderedLine = -1;
      var foundInRealLine = -1;
      var cols = 80;
      for (var i=x=0; i < ar.length; i++,x++)
        {
        if(foundInRenderedLine == -1 && ar[i] && ar[i].indexOf(key) != -1)
          {
          foundInRealLine = i;
          if(ar[i].length > cols)
            {
            var a = 0;
            var part = ar[a].substr((cols*a),cols);
            while(part)
              {
              if(part.indexOf(key) != -1)
                {
                break;
                }
              a++;
              part = ar[a].substr((cols*a),cols);
              }
            foundInRenderedLine = x + a;
            }
          else
            {
            foundInRenderedLine = x;
            }

          break;
          }
        else if(ar[i] && ar[i].length > cols)
          {
          x+=parseInt(ar[i].length / cols);
          }
        }

      if(foundInRenderedLine != -1)
        {
        var  x = foundInRenderedLine*17;      // Pixel from top (1 line = 17 pixel)
        top = x;
        alert(say.line+' '+foundInRenderedLine);
        messageTextField.scrollTop = x;
        }
      else
        {
        alert(say.noresults);
        }

      return false;
      });
    }

  if(forum || memo || mail || ally)
    {
    mainDiv.addButton(say.personaltexts,icon_usertexts,function() {
      // User Texts' Box
      show_userTextsBox(mainDiv);
      toggle('user_texts',this);
      return false;
      });
    }

  var mainmenuButton = mainDiv.addButton('(ver'+ver+') '+say.mainMenu,'http://cdn.tribalwars.net/graphic/buildings/garage.png',mainmenu);
  mainmenuButton.setAttribute;//('href',say.scriptURL);
	
  }

var frame,body,message,postINframe;
  
  
// "Global Functions": 
var insertFrame = function (type,style)
  {
  var el = document.createElement(type);
  if(style)
    el.setAttribute('style',style);

  var sel = window.getSelection();
  var range = sel.getRangeAt(0);
  range.surroundContents(el);
  frame_keyup();
  } 

var htmlspecialchars = function (str) 
  {
  return str.replace('&','&amp;').replace('<','&lt;').replace('<','&lt;').replace('"','&quot;');
  }  
  

var textarea_keyup = function () {
   if(!quick_preview)
     return;

   var html = message.value;
      
   html = html.replace(/\n/gi,'<br />');   // Important cause String.replace can't match enjambments
   
   // [b]
   html = html.replace(/\[b\](.*?)\[\/b\]/gi,'<b>$1</b>');
   
    // [i]
   html = html.replace(/\[i\](.*?)\[\/i\]/gi,'<i>$1</i>');    
     
    // [u]
   html = html.replace(/\[u\](.*?)\[\/u\]/gi,'<span style="text-decoration:underline; ">$1</span>');
      
    // [s]
   html = html.replace(/\[s\](.*?)\[\/s\]/gi,'<span style="text-decoration:line-through; ">$1</span>');
         
   // [url]
   html = html.replace(/\[url\](.*?)\[\/url\]/gi,'<a href="http://www.tribalwars.nl/redir.php?url=$1" style="color:rgb(64,64,208)">$1</a>');  
    
   // [url=some.google.de]
   html = html.replace(/\[url=(.*?)\](.*?)\[\/url\]/gi,'<a href="http://www.tribalwars.nl/redir.php?url=$1" style="color:rgb(64,64,208)">$2</a>');    
   
   // [color=blue]
   html = html.replace(/\[color=(.*?)\](.*?)\[\/color\]/gi,'<span style="color:$1">$2</span>');    
     
   // [code]
   html = html.replace(/\[code\](.*?)\[\/code\]/gi,function(str, p1,offset, s) {  return '<pre>'+htmlspecialchars(p1.replace(/\<br \/\>/gi,'\n'))+'</pre>'; } );    
     	 
   postINframe.innerHTML = html;
} 
  
 var frame_keyup = function () {      

   var clone = postINframe.cloneNode(true);
   var html = '';
    
   // reduce and simplify the subtree
   var tags = clone.getElementsByTagName('*');
   for(var i = 0; i < tags.length; i++) {
     //GM_log(tags[i].tagName+':'+tags[i].rel);	 
	 var cn = tags[i];
	 var pn = tags[i].parentNode;
	 
	 switch(tags[i].tagName) {
	   case 'STRONG':
	   case 'B':
	     createSpanFromStyle(cn,pn,'fontWeight','bold'); 
		 i = 0;
	   break;
	   case 'I':
	     createSpanFromStyle(cn,pn,'fontStyle','italic');  
		 i = 0;
	   break;
	   case 'U':
	     createSpanFromStyle(cn,pn,'textDecoration','underline'); 
		 i = 0;		 
	   break;
	   case 'S':
	     createSpanFromStyle(cn,pn,'textDecoration','line-through');  
		 i = 0;
	   break;	 
	   case 'SPAN':
	   case 'P':	   
	   case 'DIV':	
 	     createSpanFromStyle(cn,pn);     	 
	   break;
	   
	   case 'A':
	   	 if(cn.rel != 'finished') {
    	   createAFromA(cn,pn);	   
         } else {	
           i += 1;	
         }	   
	   break;

	   
	 }

   }
       
   var tags = clone.getElementsByTagName('*');
      

   for(var i = 0; i < tags.length; i++) {
	 var cn = tags[i];
	 var pn = tags[i].parentNode;
	 
	 switch(tags[i].tagName) {
	   case 'SPAN':
         var bbtags = getBBTagsFromSpan(cn); 
		 var prefix = '';
		 var suffix = '';
		 for(var a = 0; a < bbtags.length; a++) {
		   prefix += '['+bbtags[a]+']';
		   suffix += '[/'+bbtags[a]+']';
		 }
		 pn.innerHTML = pn.innerHTML.replace(new RegExp('\<span(.*?)\>'+cn.innerHTML+'\<\/span\>'),prefix+cn.innerHTML+suffix);		 
		 pn.innerHTML = pn.innerHTML.replace(new RegExp('\<span(.*?)\>'+cn.innerHTML+'\<\/span\>'),prefix+cn.innerHTML+suffix);		 		 
		 
		 
         tags = clone.getElementsByTagName('*');		 		 
         i = 0;		 
	   break;	
	   case 'A':
         var bbtag = 'URL'; 
		 var prefix = '';
		 var suffix = '';
		 var href = tags[i].href;
		 prefix += '['+bbtag+'='+href+']';
		 suffix += '[/'+bbtag+']';
		 pn.replaceChild(document.createTextNode(prefix+tags[i].textContent+suffix),cn);		 
	   break;	
	   
	 }

   }

   var code = clone.innerHTML;
   
   code = code.replace(/\<br\>/gi,'\n');  
   code = code.replace(/\<br \/\>/gi,'\n');  
   code = code.replace(/&nbsp;/gi,'');
   code = code.replace(/&amp;/gi,'&');   
      alert(code);
   message.value = code;
}  
  
 var getBBTagsFromSpan = function (span) {
   var tags = [];
   if(span.style['fontWeight'] == 'bold') {
     tags.push('b');
   }
   if(span.style['fontStyle'] == 'italic') {
     tags.push('i');
   } 
   if(span.style['textDecoration'] == 'underline') {
     tags.push('u');
   }    
   else if(span.style['textDecoration'] == 'line-through') {
     tags.push('s');
   }
  return tags;

}  
 
var createSpanFromStyle = function (cn,pn,styleattr,stylevalue) {
	   if(pn.textContent == cn.textContent) {
	     if(styleattr && !pn.style[styleattr]) {   
	       pn.style[styleattr] = stylevalue; 
		   }
		 else if(!styleattr) {
		   pn.setAttribute('style',pn.getAttribute('style') + ';' + cn.getAttribute('style')); 
		 }  
		 pn.removeChild(cn);
		 pn.innerHTML = cn.innerHTML;
	   }  
	   else {
	     var span = $('$span');
	     pn.insertBefore(span,cn);
		 span.setAttribute('style',cn.getAttribute('style'));
		 if(styleattr && !span.style[styleattr]) {
		   span.style[styleattr] = stylevalue;
		   }
		 span.innerHTML = cn.innerHTML;
		 pn.removeChild(cn);
	   }
}  
  
var createAFromA = function (cn,pn) {

	   if(!cn.getAttribute('href')) {
	     pn.replaceChild(document.createTextNode(cn.textContent),cn); 
         return;		 
	   }
	   
	   if(cn.rel == 'finished') {
	     return;
	   }
	   
	   if(pn.textContent == cn.textContent) {  
	     // Do not create a new node, but use the parent node
		 pn.setAttribute('style',pn.getAttribute('style') + ';' + cn.getAttribute('style')); 
		 var a = $('$a',{href:cn.href,rel:'finished'});
		 a.innerHTML = cn.innerHTML;
		 pn.replaceChild(a,cn);		 
	   }  
	   else {
	     var span = $('$span');	  
		 span.setAttribute('style',cn.getAttribute('style'));
		 var a = $('$a',{href:cn.href,rel:'finished'});
		 a.innerHTML = cn.innerHTML;
		 span.appendChild(a);
		 pn.replaceChild(span,cn);
	   }
	   
	   
}   
  
  
var easySurroundButton = function (css,surround_bb,surround_html,style) {
  $(css).removeAttribute('onclick');
  $(css).addEventListener('click',function(ev) {
    if(message.hasFocus) {
	  insert('['+surround_bb+']','[/'+surround_bb+']');
	  }
	else {
	  insertFrame(surround_html,style);
	  }
    },false);

}
  
  
var modBBButtons = function modBBButtons() 
  {
  easySurroundButton('#bb_button_bold','b','b');
  easySurroundButton('#bb_button_italic','i','i');
  easySurroundButton('#bb_button_underline','u','span','text-decoration:underline');
  easySurroundButton('#bb_button_strikethrough','s','span','font-stlye:italic');
  }  
  
var createContentEditable = function ()
  {
  message = messageTextField;
  frame = document.createElement('div');
  messageTextField.parentNode.appendChild(frame);
   
  frame.style.background = '#F7EED3';
  frame.width = message.clientWidth;
  frame.height = message.clientHeight;
  frame.setAttribute('style','border: black dotted 0px;');  
    
  frame.innerHTML = '<div class="post" style="color:Black; "><div class="igmline"><span class="author"></span><span class="right date"></span></div><div id="postINframe" contenteditable="true" class="text">Test</div></div>';

  postINframe = document.getElementById('postINframe');
  
  postINframe.addEventListener('keyup',frame_keyup,false);
  postINframe.addEventListener('focus',function() { frame.hasFocus = true; message.hasFocus = false; },false); 
  
  message.addEventListener('keyup',textarea_keyup,false);
  message.addEventListener('focus',function() { frame.hasFocus = false; message.hasFocus = true; },false);  
  
  message.focus();
  message.hasFocus = true;
  frame.hasFocus = false;
  
  textarea_keyup();
  modBBButtons();    
  }
if(quick_preview && messageTextField) {
  createContentEditable();
  }
  


};

dsSmiliesBBCodesList();
})(); 

(function() { 
	if(/screen=screen=place/.test(location.href) || /game.php?/.test(location.href)  || /screen=place&try=confirm/.test(location.href));	
  else {
		return;
	} 
// Config
function CConfig() {
	this.endOfNight = 7;
	this.defaultSpanName = "default_";
	this.unitNames = ['Spy', 'LC/BBoog', 'ZC', 'Bijl/Speer/Boog', 'Zwaard', 'Ram/Kata', 'Edel'];
	this.unitRuntimes = [9,10,11,18,22,30,35];
}


// findet ein Element mithilfe von XPath aus einem bestimmten context (Standard: document)
function _evaluate(path, context) {
	if(!context) {
		var context = document;
	}
	
	var XPath = document.evaluate(path, context, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	var nodes = [];
	for(var x = 0; x < XPath.snapshotLength; x++) {
		nodes.push(XPath.snapshotItem(x));
	}
	
	return nodes;
}

// Ueberprueft, ob in einem Array ein bestimmter Wert 'cont' enthalten ist
Array.prototype.contains = function(cont) {
	for(var x = 0; x < this.length; x++) {
		if(this[x] == cont) {
			return x;
		}
	}
	
	return false;
}

// Gibt den Wert eines Cookies zurueck
function _getCookie(name) {
	if(document.cookie.match(name)) {
		return unescape(document.cookie.split(name + "=")[1].split(";")[0]);
	}
		
	return false;
}

// speichert einen Wert unter einem spezifischen Namen als Cookie
function _setCookie(name, value) {
	document.cookie = name + "=" + value + ";";
}

// einen Cookie loeschen
function _deleteCookie(name) {
	document.cookie = name + "=;expires=Thu, 01-Jan-70 00:00:01 GMT";
}

// Gibt die Koordinaten des aktuellen Dorfes zurueck
function getCurrentCoords() {
	var row = document.getElementById("menu_row2");
	var village_name = row.getElementsByTagName("b")[0].innerHTML;
	var coords = village_name.replace(/\(|\)| C\d+/g, "");
	
	return coords;
}

// Ermittelt den gespeicherten Faktor fuer die Einheit und gibt sie zurueck
function getUnitFactor(rowId) {
	var default_factor = config.unitRuntimes[5];
	
	var unit_factor = localStorage.getItem("runtime_" + rowId);
	if(!unit_factor) {
		unit_factor = default_factor;
	}
	
	return unit_factor;
}

// Berechnet die Laufzeit zwischen 2 Doerfern
function calcRuntime(coords_1, coords_2, unit_factor) {
	if(coords_2 == coords_1) {
		return " - ";
	}
	
	coords_1 = coords_1.split("|");
	coords_2 = coords_2.toString().split("|");
	
	var x_len = Math.abs(coords_1[0]-coords_2[0]);
	var y_len = Math.abs(coords_1[1]-coords_2[1]);
	
	var fields = Math.sqrt((x_len*x_len)+(y_len*y_len));;
	var runtime = (fields*unit_factor*60).toFixed(0);	// in secs
	
	var seconds = (runtime%60).toString();
	var minutes = (Math.floor(runtime/60)%60).toString();
	var hours = (Math.floor(Math.floor(runtime/60)/60)).toString();
	
	if(hours.length < 2) hours = '0' + hours;
	if(minutes.length < 2) minutes = '0' + minutes;
	if(seconds.length < 2) seconds = '0' + seconds;
	
	var output = hours + ":" + minutes + ":" + seconds;
	
	return output;
} 

// Berechnet aus der Laufzeit die Ankunftszeit
function getArrivalDate(runtime) {
	if(runtime == " - ") {
		return " - ";
	}
	
	var hours = parseInt(runtime.split(":")[0], 10);
	var minutes = parseInt(runtime.split(":")[1], 10);
	var seconds = parseInt(runtime.split(":")[2], 10);
	
	var arrival = new Date();
	arrival.setHours(hours+arrival.getHours());
	arrival.setMinutes(minutes+arrival.getMinutes());
	arrival.setSeconds(seconds+arrival.getSeconds());
	
	var date = (arrival.getDate() < 10) ? "0" + arrival.getDate() : arrival.getDate();
	var month = (1+arrival.getMonth() < 10) ? "0" + (1+arrival.getMonth()) : 1+arrival.getMonth();
	var hours = (arrival.getHours() < 10) ? "0" + arrival.getHours() : arrival.getHours();
	var minutes = (arrival.getMinutes() < 10) ? "0" + arrival.getMinutes() : arrival.getMinutes();
	var seconds = (arrival.getSeconds() < 10) ? "0" + arrival.getSeconds() : arrival.getSeconds();
	
	var output = "op " + date + "." + month + ". om " + hours + ":" + minutes + ":" + seconds + " Uur";
	
	return output;
}

// trennt einen String anhand eines Zeichens auf
function makeArray(string, separator) {
	if(!string) {
		var arr = [];
	} else if(!string.match(separator)) {
		var arr = [string];
	} else {
		var arr = string.split(separator);
	}
	
	return arr;
}

// markiert eine Ankunft im NB rot und eine ausserhalb gruen
function markNB(arrival) {
	if(!arrival.match(/om/)) {
		return arrival;
	}
	
	var hours = parseInt(arrival.split("om ")[1].split(":"), 10);
	if(hours >= config.endOfNight) {
		return "<span style='color:green;'>" + arrival + "</span>";
	} else {
		return "<span style='color:red;'>" + arrival + "</span>";
	}
}

// laed die laufenden Angriffe
function getRunningAttacks() {
	var runningAttacks = makeArray(localStorage.getItem("runningAttacks"), ',');
	var now = new Date().getTime();
	var obj = new Object();
	
	for(var x = 0; x < runningAttacks.length; x++) {
		var targetID = runningAttacks[x].split(":")[0];
		var timestap = runningAttacks[x].split(":")[1];
		
		// Ueberpruefen, ob der Angriff nicht bereits eingetroffen ist
		if(timestap <= now) { 
			continue;
		}
		
		if(obj[targetID] === undefined) {
			obj[targetID] = [timestap];
		} else {
			obj[targetID].push(timestap);
			obj[targetID].sort(function(a,b){return a-b;});
		}
	}
	
	return obj;
}

// traegt einen Angriff als abgebrochen ein
function cancelCommand() {
	if($_GET('screen') == 'place') {
		// Daten auslesen
		var cells = this.parentNode.parentNode.getElementsByTagName("td");
		var runtime = cells[cells.length-2].textContent.split(":");
		var serverTime = document.getElementById("serverTime").textContent.split(":");
		var serverDate = document.getElementById("serverDate").textContent.split("/");
		
		// Ankunftstimestap berechnen
		var now = new Date(serverDate[1] + " " + serverDate[0] + ", " + serverDate[2] + " " + serverTime.join(":"));
		var arrival = now;
		arrival.setHours(now.getHours() 	+ parseInt(runtime[0], 10));
		arrival.setMinutes(now.getMinutes() + parseInt(runtime[1], 10));
		arrival.setSeconds(now.getSeconds() + parseInt(runtime[2], 10));
		arrival.setMilliseconds(0);
		var timestap = arrival.getTime();
		
		// laufende Angriffe abgleichen
		var runningAttacks = makeArray(localStorage.getItem("runningAttacks"), ',');
		var newString = "";
		for(var x = 0; x < runningAttacks.length; x++) {
			if(runningAttacks[x].split(":")[1] != timestap) {
				newString += runningAttacks[x] + ((x == runningAttacks.length) ? "" : ",");
			}
		}
		
		localStorage.setItem("runningAttacks", newString);
	} else 
	if($_GET('screen') == 'info_command') {
		// Nur bei Angriffen auslesen
		var type = document.getElementsByTagName("h2")[0].textContent.split(" ")[0];
		if(type != "Aanvallen") {
			return;
		}
		
		// Ziel-ID und Ankunft auslesen
		var targetID = _evaluate('//td[.="Doel"]/parent::tr/following::tr/td[.="Dorp:"]/following::td/a')[0].href.match(/[&?]id=(\d+)($|\&)/)[1];
		var arrival	 = _evaluate('//td[.="Aankomst:"]/following::td')[0].textContent;
		var timestap = convertDate(arrival);
		
		// laufende Angriffe abgleichen
		var runningAttacks = makeArray(localStorage.getItem("runningAttacks"), ',');
		var newString = "";
		var canceled = false;
		for(var x = 0; x < runningAttacks.length; x++) {
			if(runningAttacks[x].split(":")[1] != timestap || runningAttacks[x].split(":")[0] != targetID || canceled === true) {
				newString += runningAttacks[x] + ((x == runningAttacks.length) ? "" : ",");
			} else {
				var canceled = true;
			}
		}
		
		localStorage.setItem("runningAttacks", newString);
	}
}

// loescht alle gespeicherten angriffe, die bereits angegekommen sind
function deleteArrivedAttacks() {
	var runningAttacks = makeArray(localStorage.getItem("runningAttacks"), ',');
	var now = new Date().getTime();
	var newAttackString = "";
	
	for(var x = 0; x < runningAttacks.length; x++) {
		var targetID = runningAttacks[x].split(":")[0];
		var timestap = runningAttacks[x].split(":")[1];
		
		// Ueberpruefen, ob der Angriff nicht bereits eingetroffen ist
		if(timestap > now) {
			var save = targetID + ":" + timestap;
			newAttackString += (x == runningAttacks.length-1) ? save : save + ",";
		}
	}
	
	localStorage.setItem("runningAttacks", newAttackString);
}

// rechnet einen String mit einer der Datumsangaben von DS in einen Unix-Timestap um
function convertDate(string) {
	// Ankunft in einen Unix-Timestap codieren
	var date = new Date();
	date.setYear(new Date().getYear()+1900);
	date.setMinutes(parseInt(string.split(":")[1], 10));
	date.setSeconds(parseInt(string.split(":")[2], 10));
	date.setMilliseconds(0);
	date.setHours(parseInt(string.split(" ")[1].split(":")[0], 10));
	date.setDate (parseInt(string.split(".")[0], 10));
	date.setMonth(parseInt(string.split(".")[1], 10)-1);
	
	return date.getTime();
}

// Berechnet das Zentrum von einem Array von Koordinaten
function getCenter(coords) {
	var xCoord = 0;
	var yCoord = 0;
	
	for(var x = 0; x < coords.length; x++) {
		xCoord += parseInt(coords[x].split("|")[0], 10);
		yCoord += parseInt(coords[x].split("|")[1], 10);
	}
	
	return Math.floor(xCoord/coords.length).toString() + "|" + Math.floor(yCoord/coords.length).toString();
}

// wartet 100 ms und setzt dann die Doerfer, den Spieler und den Stamm auf twmaps.org
function setData(villages, player, allyId) {
	window.setTimeout(function(villages, player, allyId) {
		if(!document.getElementById("v" + x + "x")) {
			setData();
		}
		
		for(var x = 1; x < villages.length+1; x++) {
			document.getElementById("v" + x + "x").value = villages[x-1].split("|")[0];
			document.getElementById("v" + x + "y").value = villages[x-1].split("|")[1];
		}
		
		document.getElementById("p1").value = player;
		document.getElementById("p1rgb").value = "FFCC00";
		document.getElementById("a1").value = allyId;
		document.getElementById("a1rgb").value = "8c5f0d";
		
		document.getElementById("submitSettings").click();
	}, 100, villages, player, allyId);
}

// Ermittelt einen GET-Parameter
function $_GET(name) {
	return (location.href.match(new RegExp(name + "=(.+?)(\&|$)"))) ? RegExp.$1 : false;
}


(function main() {
	// config laden
	config = new CConfig();
	
	// alle angegekommenen Angriffe loeschen
	deleteArrivedAttacks();
	
	// game_data ermitteln
	try {
		if(typeof(unsafeWindow) != 'undefined') {
			game_data = unsafeWindow.game_data;
		} else {
			var script = document.createElement("script");
			script.type = "application/javascript";
			script.textContent = 	"var input=document.createElement('input');" + 
									"input.type='hidden';" + 
									"input.value=JSON.stringify(game_data);"  + 
									"input.id='game_data';" + 
									"document.body.appendChild(input);";
			document.body.appendChild(script);
			document.body.removeChild(script);
			
			eval("game_data=" + document.getElementById("game_data").value + ";");
		}
	} catch(e) {}	// auf twmaps wirft das hier logischerweise einen Fehler aus
	
	if(location.href.match(/\.twmaps\.org\/index\.php/)) {
		// Die parameter auslesen
		var center 		= unescape($_GET("center"));
		var zoom 		= unescape($_GET("zoom"));
		var villages 	= unescape($_GET("villages"));
		var player 		= unescape($_GET("player"));
		var allyId 		= unescape($_GET("ally"));
		
		// Falls etwas nicht korrekt uebermittelt wurde beenden
		if(!center || !zoom || !villages || !player || !allyId) {
			return;
		}
		villages = makeArray(villages, ",");
		
		// Den Zoomfaktor setzen
		var options = document.getElementById("zoom").getElementsByTagName("option");
		for(var x = 0; x < options.length; x++) {
			if(options[x].text == zoom) {
				document.getElementById("zoom").options[x].selected = true;
				break;
			}
		}
		
		// Die Zentrumskoordinaten setzen
		document.getElementById("settingsCenterX").value = center.split("|")[0];
		document.getElementById("settingsCenterY").value = center.split("|")[1];
		
		// verlassene Doerfer anzeigen
		document.getElementById("abandon").checked = true;
		
		// Doerfer, Spieler und Stamm setzen
		var script = document.createElement("script");
		script.type = "text/javascript";
		document.body.appendChild(script);
		script.appendChild(document.createTextNode(
			'try{' + 
			'for(var x=0;x<' + villages.length.toString() + ';x++){' + 
			'AddVillageMarker();' + 
			'}' + 
			'AddPlayerMarker();' + 
			'AddAllyMarker();' + 
			'}catch(e){' + 
			'window.alert(e);' + 
			'}'
		));
		
		setData(villages, player, allyId);
	} else 
	if(location.href.match(/screen=place/ ) || location.href.match(/screen=memo/ ) || location.href.match(/screen=place&try=confirm/)) {//($|\&)/  [?&] ------------------------------------------------------------------Nog eens naar kijken
		/*
		 //Ein runtimes-Tag-Bild in die BB-Codesliste einfuegen
        var div = document.createElement('div');
		div.id = "bb_runtimes";
		document.getElementById('bb_bar').getElementsByTagName('div')[0].appendChild(div);
		
		var link = document.createElement("a");
		
		link.id = "bb_button_runtimes";
		link.setAttribute('onclick', "BBCodes.insert('[runtimes]', '[/runtimes]'); return false;");
		link.href = "#";
		document.getElementById('bb_color_picker').parentNode.insertBefore(link, document.getElementById('bb_color_picker').nextSibling);
		
		var div = link.appendChild(document.createElement("div"));
		div.innerHTML = "&nbsp;";
		div.style.background = "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASBAMAAACk4JNkAAAAJ1BMVEXd0rgyMjFAQD9QT0phXlhpZVx0cWqRi3uTk5KtppS3saPCuqYHBwf4R2BDAAAAAXRSTlMAQObYZgAAAGpJREFUeF59zj0KgDAMBeAKgkg3505FcHXzBy+jIEhdxBO46+DiKVy6OSvolEMZmszN9EES3hP+kadlHerdmdszssLErKT4LoeF2KpU02mgAHKnCAA+WjfIjL5RukbIubBd5fL6ScjL+Ev98S8YGlpDlg0AAAAASUVORK5CYII%3D) no-repeat scroll -200px 0px transparent";
		div.style.display = "inline-block";
		div.style.paddingLeft = "0px";
		div.style.paddingBottom = "0px";
		div.style.marginRight = "2px";
		div.style.marginBottom = "3px";
		div.style.width = "20px";
		div.style.height = "20px";
		*/
		
		var row = document.getElementsByClassName("show_row")[0];	// Der Notizblock
		var notices = row.innerHTML;								// Alle Notizen
		var currentCoords = getCurrentCoords();						// aktuelle Koordinaten
		var default_title_index = 0;								// Standard-ID eines spans
		var spanIDs = [];											// Array von allen existierenden Span IDs
		var runningAttacks = getRunningAttacks();					// Die laufenden Angriffe laden
		
		// Falls keine "runtimes"-Tags da sind, gleich wieder beenden
		if(!notices.match(/\[runtimes\]/) || !notices.match(/\[\/runtimes\]/)) {
			return false;
		}
		
		// die "runtimes"-Tags du ein Span-Tag ersetzen mit Namen "runtimes"
		row.innerHTML = row.innerHTML.replace(/\[runtimes\]/g, "<span name='runtimes'>").replace(/\[\/runtimes\]/g, "</span>");
		
		// Die span-Tags ermitteln
		var spans = document.getElementsByName("runtimes");
		for(var x = 0; x < spans.length; x++) {
			var span = spans[x];
			var text = span.innerHTML;
			
			// schauen, ob ein Titel definiert wurde, ansonsten einen Standardwert nehmen und dann den Wert als ID von Span definieren
			if(span.getElementsByTagName("b").length > 0 && span.getElementsByTagName("b")[0].textContent != "") {
				var title = span.getElementsByTagName("b")[0].textContent;
				var rowId = span.id = escape(title);
			} else {
				var title = "";
				var rowId = span.id = config.defaultSpanName + (default_title_index++).toString();
			}
			spanIDs.push(rowId);
			
			//Falls irgendwelche Koords falsch waren, den Link trotzdem anzeigen
			if(text.match(/Dorp ung.ltig/)) {
				span.innerHTML = text.replace(/Dorp ung.ltig/g, "<a href=''>Dorp ung&uuml;ltig</a>");
			}
			
			// Faktor der gewaehlten Einheit
			var unit_factor = getUnitFactor(rowId);
			
			// Array von allen enthaltenen Koordinaten
			var allCoords = [];
			
			// Alle Links durchgehen und die Infos rausziehen
			var links = span.getElementsByTagName("a");
			var data = [];
			for(var y = 0; y < links.length; y++) {
				var row = {
					'url': links[y].href, 
					'coords': (links[y].textContent.match(/\((\d{1,3}\|\d{1,3})\) C\d+/)) ? RegExp.$1 : currentCoords, 
					'villagename': links[y].innerHTML, 
					'comment': links[y].nextSibling.nextSibling.innerHTML, 
					'vid': (links[y].href.match(/[&?]id=(\d+)($|\&)/)) ? RegExp.$1 : 0
				}
				allCoords.push(row.coords);
				data.push(row);
			}
			
			// Den ganzen Text loeschen um Platz fuer die neue Umgebung zu schaffen
			span.innerHTML = "";
			
			// Falls ein Titel gesetzt wurde, diesen auch darstellen
			if(title != "") {
				var head = document.createElement("h3");
				head.innerHTML = title;
				span.appendChild(head);
			}
			
			// Die Tabelle erzeugen, in die alles rein soll
			var table = document.createElement("table");
			table.className = "vis";
			table.style.width = "100%";
			span.appendChild(table);
			
			var tbody = document.createElement("tbody");
			table.appendChild(tbody);
			
			// Die Beschriftungszeile + Zellen erzeugen und einfuegen
			var row = document.createElement("tr");
			tbody.appendChild(row);
			
			var descriptions = ['Dorp','Notitie','Looptijd','Aankomsttijd','@RESET@'];
			for(var y = 0; y < descriptions.length; y++) {
				var cell = document.createElement("th");
				cell.style.paddingLeft = "5px";
				cell.style.paddingRight = "5px";
				cell.style.textAlign = "center";
				cell.style.border = "1px solid #804000";
				cell.innerHTML = descriptions[y];
				row.appendChild(cell);
				
				switch(descriptions[y]) {
					case 'Dorp':
						cell.style.textAlign = "left";
						
						var linkSpan = document.createElement("span");
						linkSpan.style.cssFloat = "right";
						cell.appendChild(linkSpan);
						
						var link = document.createElement("a");
						link.href = "http://" + location.host.split(".")[0] + ".twmaps.org/index.php?center=" + escape(getCenter(allCoords)) + "&Zoom=5&player=" + escape(game_data.player.name) + "&ally=" + escape(game_data.player.ally_id) + "&villages=" + escape(allCoords.join(","));
						link.innerHTML = "TWmaps-Dorplijst";
						link.target = "_blank";
						linkSpan.appendChild(link);
						break;
					
					case 'Looptijd':
						cell.style.textAlign = "left";
						
						var list = document.createElement("select");
						list.id = "kindOfUnit_" + rowId;
						list.setAttribute('forId', rowId);
						list.size = "1";
						list.style.backgroundColor = "#F8F4E8";
						list.style.cssFloat = "right";
						list.addEventListener('change', function () {
							var rowId = this.getAttribute('forId');
							var factor = document.getElementById('kindOfUnit_' + rowId).value;
							localStorage.setItem("runtime_" + rowId, factor);
							
							window.alert("Opgeslagen!");
							location.reload();
						}, false);
						cell.appendChild(list);
						
						for(var i = 0; i < config.unitNames.length; i++) {
							var option = document.createElement("option");
							option.selected = (config.unitRuntimes[i] == unit_factor);
							option.value = config.unitRuntimes[i];
							option.innerHTML = config.unitNames[i];
							list.appendChild(option);
						}
						break;
					
					case '@RESET@':
						//var code = "<a href='javascript: (" + reset + ")(\"" + span.id + "\");'><img style='height:15px;' src='/graphic/unit/att.png' alt='Zur&uuml;cksetzen' title='Zur&uuml;cksetzen' /></a>";//uit
						var code = "<img style='height:15px;' src='/graphic/unit/att.png' alt='Lopende aanvallen' title='Lopende aanvallen' />";
						cell.innerHTML = cell.innerHTML.replace(/@RESET@/, code);
						break;
				}
			}
			
			// Die Daten errechnen und setzen
			for(var y = 0; y < data.length; y++) {
				var row = document.createElement("tr");
				// Die Zeile umranden, ueber der gerade die Maus ist
				row.addEventListener('mouseover', function () {
					this.style.outline = "1px solid #804000";
				}, false);
				row.addEventListener('mouseout', function () {
					this.removeAttribute("style");
				}, false);
				tbody.appendChild(row);
				
				for(var z = 0; z < descriptions.length; z++) {
					var cell = document.createElement("td");
					cell.style.textAlign = "center";
					row.appendChild(cell);
					
					switch(descriptions[z]) {
						case 'Dorp':
							cell.style.textAlign = "left";
							
							var link = document.createElement("a");
							link.href = data[y].url;
							link.innerHTML = data[y].villagename;
							//link.setAttribute('onclick', 'var makeArray = ' + makeArray + '; var _getCookie = ' + _getCookie + '; var _setCookie = ' + _setCookie + '; (' + raiseAtt + ')("' + span.id + '",' + data[y].vid + ');');//uit
							cell.appendChild(link);
							break;
						case 'Notitie':
							cell.innerHTML = data[y].comment;
							break;
						case 'Looptijd':
							cell.innerHTML = calcRuntime(currentCoords, data[y].coords, unit_factor);
							break;
						case 'Aankomsttijd':
							cell.innerHTML = markNB(getArrivalDate(calcRuntime(currentCoords, data[y].coords, unit_factor)));
							break;
						case '@RESET@':
							cell.innerHTML = (runningAttacks[data[y].vid]) ? runningAttacks[data[y].vid].length : 0;
							cell.setAttribute('name', 'runningAtts_' + data[y].vid);
							break;
					}
				}
			}
		}
	} else 
	if(location.href.match(/[?&]try=confirm($|\&)/)) {
		document.getElementsByName("submit")[0].addEventListener('click', function() {
			// Ziel-ID und Ankunft auslesen
			var targetID = _evaluate('//td[.="Doel:"]/following::td/a')[0].href.match(/[&?]id=(\d+)($|\&)/)[1];
			var runtime  = _evaluate('//td[.="Duur:"]/following::td')[0].textContent.split(":");
			var serverTime = document.getElementById("serverTime").textContent.split(":");
			var serverDate = document.getElementById("serverDate").textContent.split("/");
			
			// Ankunftstimestap berechnen
			var now = new Date(serverDate[1] + " " + serverDate[0] + ", " + serverDate[2] + " " + serverTime.join(":"));
			var arrival = now;
			arrival.setHours(now.getHours() 	+ parseInt(runtime[0], 10));
			arrival.setMinutes(now.getMinutes() + parseInt(runtime[1], 10));
			arrival.setSeconds(now.getSeconds() + parseInt(runtime[2], 10));
			arrival.setMilliseconds(0);
			var timestap = arrival.getTime();
			
			// Angriff speichern
			var runningAttacks = makeArray(localStorage.getItem("runningAttacks"), ',');
			runningAttacks.push(targetID + ":" + timestap);
			localStorage.setItem("runningAttacks", runningAttacks.join(","));
		}, false);
	} else 
	if(location.href.match(/[?&]screen=info_command($|\&)/)) {
		// Nur bei Angriffen auslesen
		var type = document.getElementsByTagName("h2")[0].textContent.split(" ")[0];
		if(type != "Aanvallen") {
			return;
		}
		
		// Ziel-ID und Ankunft auslesen
		var targetID = _evaluate('//td[.="Doel"]/parent::tr/following::tr/td[.="Dorp:"]/following::td/a')[0].href.match(/[&?]id=(\d+)($|\&)/)[1];
		var arrival	 = _evaluate('//td[.="Aankomst:"]/following::td')[0].textContent;
		var timestap = convertDate(arrival);
		
		var runningAttacks = makeArray(localStorage.getItem("runningAttacks"), ',');
		if(runningAttacks.contains(targetID + ":" + timestap) === false) {
			runningAttacks.push(targetID + ":" + timestap);
			localStorage.setItem("runningAttacks", runningAttacks.join(","));
		}
	}
	
	if(_evaluate('//a[.="abbrechen"]').length > 0) {
		var link = _evaluate('//a[.="abbrechen"]')[0];
		link.addEventListener('click', cancelCommand, false);
	}
})();
})(); 

(function() { 
	if(/screen=mail/.test(location.href) || /screen=memo/.test(location.href)  || /screen=forum/.test(location.href));	
  else {
		return;
	} 
// Created: 24042009-1
(function(f){var d=document,s=d.createElement('script');s.textContent = '$(document).ready('+f.toString()+')';(d.body||d.head||d.documentElement).appendChild(s);s.parentNode.removeChild(s)})(function(){
	var settings = {	//standaardinstellingen
		sig: true,		//true: handtekening ingeschakeld, false: handtekening uitgeschakeld
	};
	var lang = {

		'nl': {
			
			code: 'Code',
			smilies: 'Auto invullen on/off (short key by mouse over)',
			unload_message: 'Wil je echt de pagina verlaten?\nWijzigingen worden *niet* opgeslagen.',
			auto_smilies_short: 'Automatisch smilies invullen (aan/uit)',
			auto_smilies_long: 'Automatisch smilies invoegen tijdens het typen',
			enter_url: 'Geef de URL op:',
			report_code: 'Geef de code op. Deze code bevat enkel letters en cijfers, en is 32 tekens lang.\nJe kunt ook direct de URL opgeven.',
			no_sig_error: 'Je hebt nog geen handtekening ingesteld.',
			sig_modified: 'De handtekening is gewijzigd.\nWil je deze opslaan?',
			sig_reset: 'Wil je de laatste handtekening herstellen?',
			no_sig_auto: 'Je hebt geen handtekening ingesteld, de automatische toevoeging ervan wordt uitgeschakeld...',
			sig_insert: 'Handtekening invoegen',
			sig_insert_info: 'Automatisch de handtekening toevoegen bij het verzenden van de pagina.',
			sig_required: 'Stel eerst een handtekening in.',
			change_sig: 'Handtekening aanpassen...'
		},

	};
	var image_base = self.image_base || "/graphic",
		/* for shorter URLs, host it elsewhere */
		tt_s = "http://static.tribetool.nl/smilies/";
		tt_b= "http://skype-emoticons.com/images/emoticon-"
	var button_to_shortcut = {
		"bold": 66,
		"italic": 73,
		"underline": 85,
		"strikethrough": 83,
		"quote": 81,
		"url": 76,
		"spoiler": 0,
		"player": 80,
		"tribe": 84,
		"coord": 68,
		"report_display": 0,
		"size": 0,
		"image": 0,
		"color": 0,
		"table": 0,
		"report": 0,
		"code": 0
	};
	
	var bb_bar = document.getElementById("bb_bar"),
		addTag = function (tag, title, image) {
			var link = document.getElementById("bb_button_bold").cloneNode(true);
			link.id = tag ? "bb_button_" + tag : "";
			link.title = title;
			/* prevent scope leakage */
			link.onclick = tag ? Function("BBCodes.insert('[" + tag + "]', '[/" + tag + "]');return false") : null;
			var span = link.getElementsByTagName("span")[0];
			span.style.background = "url(" + image + ") center no-repeat";
			span.style.outline = "";
			return bb_bar.appendChild(link);
		};
	if (!bb_bar) return;
	var textfield;
	var slang = location.host.match(/^\D+/);
	if(slang in lang) lang = lang[slang];
	else lang = lang["en"];
	if (!(self.game_data && (game_data.screen == "mail" || game_data.screen == "forum") || location.pathname == "/forum.php")) settings.sig = false;

	/* optional smilies button might be added later in this script */

	BBCodes.insert = eval("(" + BBCodes.insert.toString().replace(/input.value\s*=/, "try{if(!(" + (function() {
		switch (start_tag) {
			case "[url]":
				var url_change = !(/^https?:\/\//i.test(ins_text) || /^[\d\w]\.?([\d\w\-]\.?)*\.\w{2,}/i.test(ins_text));
				if (ins_text != "" && url_change) {
					var url_new = prompt(lang.enter_url, ins_text);
					if (url_new && url_new != ins_text) {
						start_tag = '[url="' + url_new.replace(/"/g, "%22").replace(/\]/g, "%5D") +'"]';
					}
				}
			break;

		}
		return true;
	}) + ")())return}catch(ex){};$&") + ")");
	var previousbeforeunload = window.onbeforeunload,
		default_value;
	window.onbeforeunload = function (e) {
		var E = e.explicitOriginalTarget;
		if (textfield && textfield.value != default_value && (!E || !E.tagName || E.tagName.toLowerCase() != 'input')){
			/* no message in Fx4 =/ */
			e.returnValue = lang.unload_message;
		}
		if (previousbeforeunload) previousbeforeunload(e);
	};

	var shortcuts = [];
	for (var type in button_to_shortcut) {
		if (button_to_shortcut[type]) {
			var bb_btn = document.getElementById("bb_button_" + type);
			if (bb_btn) {
				shortcuts[button_to_shortcut[type]] = type;
				bb_btn.firstElementChild.style.outline = "0px solid #8c5f0d";
				bb_btn.title += " (Ctrl + " + String.fromCharCode(button_to_shortcut[type]) + ")";
			}
		}
	}
	var shortcut_handler = function(e){
			if(e.ctrlKey && !e.shiftKey && !e.altKey){
				if(shortcuts[e.keyCode]){
					e.stopPropagation();
					e.preventDefault();
					var in_signature = e.target.id == "lkn_bbSigedit";
					setTimeout(function(){
						var old_target = BBCodes.target;
						try {
							if (in_signature) BBCodes.setTarget($("#lkn_bbSigedit"));
							document.getElementById("bb_button_" + shortcuts[e.keyCode]).onclick();
						} finally {
							if (in_signature) BBCodes.setTarget(old_target);
						}
					}, 1);
				}
			}
		};

	if (settings.sig) {
		var sig = document.createElement("div");
		var lkn_bbSig = function () {
				var sig = lkn_bbSig.getSig();
				if(sig != ''){
					if(textfield.value.lastIndexOf(sig) != textfield.value.length - sig.length) textfield.value += '\n'+sig;
				}
				else alert(lang.no_sig_error);
			};
		var win=frames.main||self,doc=win.document;
		function getCookie(n){var c='; '+doc.cookie+';',s='; '+encodeURIComponent(n)+'=',b=c.indexOf(s),e;if(b==-1)return'';b=b+s.length;e=c.indexOf(';',b);return decodeURIComponent(c.substring(b,e))}
		function setCookie(n,v,l){var e=encodeURIComponent,L=parseInt(l)||0,c=doc.cookie;if(L&&c.length+e(n+v).length-e(('; '+c).indexOf('; '+n+'=')+1?n+getCookie(n):'').length>4027)throw alert('Cookie "'+n+'" kon niet opgeslagen worden: te weinig vrije ruimte voor cookies!');doc.cookie=e(n)+'='+e(v)+'; max-age='+L}
		var loSt=win.localStorage,
		getValue=loSt?function(n){return loSt.getItem(n)||''}:getCookie,setValue=loSt?function(n,v){v===0||v?loSt.setItem(n,v):loSt.removeItem(n)}:function(n,v){setCookie(n,v,1e7)},getValueC=loSt?function(n){var v=getCookie(n);if(v!=''){setValue(n,v);setCookie(n,0)}else return getValue(n);return v}:getCookie;
		var oldSig = getCookie('lkn_bbsig');
		if(oldSig){
			setCookie('lkn_bbsig', '');
			setValue('lkn_bbsig_f', oldSig);
			setValue('lkn_bbsig_m', oldSig);
		}
		var oldAuto = getCookie('lkn_bbsa');
		if(oldAuto){
			setCookie('lkn_bbsa', '');
			setValue('lkn_bbsa_f', oldAuto);
			setValue('lkn_bbsa_m', oldAuto);
		}
		var sigPlace = (location.pathname=='/forum.php'?'_f':'_m');
		lkn_bbSig.getSig = function(){
			return getValue('lkn_bbsig'+sigPlace);
		};
		lkn_bbSig.setSig = function(sig){
			setValue('lkn_bbsig'+sigPlace, sig);
		};
		lkn_bbSig.editSig = function(open){
			var e = document.getElementById('lkn_bbSigedit');
			if(e.style.display == 'none'){
				if(open) e.value = lkn_bbSig.getSig();
				e.style.display = 'block';
			}
			else{
				if(lkn_bbSig.getSig() != e.value){
					if(confirm(lang.sig_modified)){
						lkn_bbSig.setSig(e.value);
						e.style.display = 'none';
					}
					else if(confirm(lang.sig_reset)){
						e.value = lkn_bbSig.getSig();
						e.style.display = 'none';
					}
				}
				else e.style.display = 'none';
			}
		};
		lkn_bbSig.auto = function(nw){
			if(typeof nw == 'boolean'){
				setValue('lkn_bbsa'+sigPlace, nw?1:0);
			}
			return getValue('lkn_bbsa'+sigPlace) == 1;
		}
		lkn_bbSig.form_handler = function () {
			if(lkn_bbSig.auto()) lkn_bbSig();
		};
		if(lkn_bbSig.auto() && lkn_bbSig.getSig() == ''){
			lkn_bbSig.auto(false);
			alert(lang.no_sig_auto);
		}
		var btn_insertSig = sig.appendChild(document.createElement("input"));
		btn_insertSig.type = "button";
		btn_insertSig.onclick = lkn_bbSig;
		btn_insertSig.value = lang.sig_insert;
		btn_insertSig.tabIndex = -1;
		var lbl_autoSig = sig.appendChild(document.createElement("label"));
		lbl_autoSig.title = lang.sig_insert_info;
		var cbx_autoSig = lbl_autoSig.appendChild(document.createElement("input"));
		cbx_autoSig.type = "checkbox";
		if (lkn_bbSig.auto()) cbx_autoSig.checked = true;
		cbx_autoSig.addEventListener("click", function (ev) {
			if (lkn_bbSig.getSig() == "" && this.checked) {
				alert(lang.sig_required);
				ev.preventDefault();
			} else {
				lkn_bbSig.auto(this.checked);
			}
			return true;
		}, false);
		cbx_autoSig.tabIndex = -1;
		lbl_autoSig.appendChild(document.createTextNode(" Auto..."));
		var btn_changeSig = sig.appendChild(document.createElement("input"));
		btn_changeSig.type = "button";
		btn_changeSig.value = lang.change_sig;
		btn_changeSig.addEventListener("click", function () {
			lkn_bbSig.editSig(true);
		}, false);
		btn_changeSig.tabIndex = -1;
		var txt_sig = sig.appendChild(document.createElement("textarea"));
		txt_sig.rows = 5;
		txt_sig.cols = 55;
		txt_sig.addEventListener("blur", function () {
			lkn_bbSig.editSig();
		}, false);
		txt_sig.style.display = "none";
		txt_sig.id = "lkn_bbSigedit";
		txt_sig.tabIndex = -1;
		sig.addEventListener(typeof opera == "undefined" ? "keydown" : "keypress", shortcut_handler, true);
	}
	function initTextfield() {
		try {
			if (textfield) {
				textfield.removeEventListener(typeof opera == "undefined" ? "keydown" : "keypress", shortcut_handler, true);
				if (settings.smilies) textfield.removeEventListener("keypress", smileyFunc, true);
				if (settings.sig) textfield.form.removeEventListener("submit", lkn_bbSig.form_handler, false);
			}
			if(!(textfield = BBCodes.target[0])) return;
			default_value = textfield.defaultValue;
			textfield.addEventListener(typeof opera == "undefined" ? "keydown" : "keypress", shortcut_handler, true);
			if (settings.smilies) {
				textfield.addEventListener("keypress", smileyFunc, true);
			}
			if (settings.sig) {
				if (textfield.nextSibling) textfield.parentNode.insertBefore(sig, textfield.nextSibling);
				else textfield.parentNode.appendChild(sig);
				textfield.form.addEventListener("submit", lkn_bbSig.form_handler, false);
			}
		} catch (ex) {
			/* sorry, I want feedback for errors */
			alert("TW BB Code++: An error occured while initialising textfields, please report it to vortex.vdb@gmail.com. Details: \n" + ex.message);
		}
	}
	initTextfield(BBCodes.target[0]);
	self.lkn_twbb_initTextfield = initTextfield;
	BBCodes.setTarget = eval("(" + BBCodes.setTarget.toString().replace(/}$/, "try{self.lkn_twbb_initTextfield();}catch(ex){alert('TW BB Code++ could not detect an internal function. Please report to vortex.vdb@gmail.com with your browser details: '+navigator.userAgent);}}") + ")");
})
})(); 

(function() {
  var win = typeof(unsafeWindow) != "undefined" ? unsafeWindow : window;
  var msg = "";
  var ownPid;
  var DSKORRIDOR_VERSION = "8.4-1.0.0";
  var DSKORRIDOR_TECHNICAL_VERSION = DSKORRIDOR_VERSION.split("-")[1].split(".")[0];
  var DSKORRIDOR_SCRIPT_VERSION    = DSKORRIDOR_VERSION.split("-")[1].split(".")[1];
  var DSKORRIDOR_BUGFIX_VERSION    = DSKORRIDOR_VERSION.split("-")[1].split(".")[2];
  
  var TEXTS = {
    nl: {
      gui: {
        title: "Tekenen op kaart",
        settings: {
          titles: { misc: "Aan/uit (schakelen)", KorridorAssist: "Coords invoeren(tekenen)" },
          misc: {
            useKorridor: "tekenen op kaart in schakelen?",
            useMap: "Tekenen op kaart tonen?",
            useMiniMap: "Tekenen op Minimap tonen?",
          },
        },
        Korridors: {
          Id: "Id",
          FontColor: "Kleur</br>Text",
          LineColor: "Kleur</br>Lijn",
          LineWidth: "Kaart</br>Lijn dikte",
          MiniMapLineWidth: "Minimap</br>Lijn dikte",
          Font: "Kaart</br>Schrift",
          MiniMapFont: "Minmap</br>Schrift",
          Coords: "CoÃ¶rdinaten",
          Aktiv: "Actief",
        },
       Korridor: "Korridor",
        variantName: "Naam",
        enterName: "Naam invoeren.",
        nameExists: "Deze naam bestaat al!",
        delVariant: "Variante verwijderen",
        addVariant: "Variatie toevoegen",
        confirmDeleteVariant: "Variatie echt verwijderen?",
        confirm_delAll: "Echt de data van deze wereld verwijderen?",
        allDataDeleted: "Alle data verwijderd!",
        savebutton: "Opslaan",
        importbutton: "Data importeren",
        exportbutton: "Data exporteren",
        deletebutton: "Data verwijderen",
        
        startimport: "Importeren",
        importTitle: "Import",
        exportTitle: "Export",
        exportGroups: { title: "Welke Data exporteren?", 
                        settings: "Instellingen", 
                        variants: "Tekeningen",
                      },
        unknowVersion: "Onbekende versie",
        wrongFormat: "verkeerde Format",
        importDone: "De Data is geimporteert",
        incompleteExp: "De data is niet voledig (sorry)",
        wrongworld: "Deze data is voor een andere Server",
        unsupportedVersion: "De data voor deze versie wordt niet ondersteund",
        close: "Sluiten",
        settingsSaved: "Tekenen op kaart-Instellingen opgeslagen!",
        forumThread: "http://www.colorpicker.com/",
      },
      regex: {
        settings: /Instellingen/,
      },
    },
	};
 var lib = new LCDSLib("lcxdskorridor",false,false);   
  if( lib.game_data ) {
    var res = lib.game_data.version.match(/\d+ (\d+)\.(\d+)/);
    if( res && res[1] < 7) 
      return;
  };
  if( typeof(TEXTS[lib.lang]) == "undefined" ) {
    alert( "Tekenen op kaart:\nLanguage not supported!" );
    return;
  };
 
  var isUV = !isNaN(parseInt(lib.params.t,10));
  
  var VariantEdit = function(parent,fields,fieldWidth,varKey) {
    var THIS = this;
    this.insertHeadCol = function(obj) {
      cell = row.appendChild(ce("th"));
      if( obj.img ) {
        var img = cell.appendChild(ce("img"));
        img.src = obj.img;
        img.alt = obj.title;
        img.title = obj.title;
        cell.style.textAlign = "center";
      }
      else
        cell.innerHTML = obj.title;
    }
    this.insertRow = function(variant) {
      var name = "";
      if( !variant ) {
        var title = TEXTS[lib.lang].gui.enterName;
        for(;;) {
          name = prompt(title);
          if( name === null )
            return;
          if( name.length > 0 ) {
            for( var i = 1; i < tab.rows.length; i++ ) {
              if( tab.rows[i].cells[1].lastChild.value == name ) {
                title = TEXTS[lib.lang].gui.nameExists;
                break;
              }
            }
            if( i == tab.rows.length )
              break;
          }
          else
            title = TEXTS[lib.lang].gui.enterName;
        }
      }
      else
        name = variant.name;
      row = tab.insertRow(-1);
      if( variant )
        row.id = "dskorridor_"+varKey+"_"+(row.rowIndex-1);
      row.style.whiteSpace = "nowrap";

     
      cell = row.insertCell(-1);
      a = cell.appendChild(ce("a"));
      a.innerHTML = "X";
      a.style.color = "#FF0000";
      a.href = "javascript:;";
      a.title = TEXTS[lib.lang].gui.delVariant;
      a.addEventListener("click", THIS.deleteVariant, false); 
      
      cell = row.insertCell(-1);
      input = cell.appendChild(ce("input"));
      input.type = "text";
      input.style.width = "60px";
      input.value = name;
      input.addEventListener("change", function(e) {
          if( this.value.length == 0 ) {
            alert( TEXTS[lib.lang].gui.enterName );
            return false;
          }
          var tab = getByTagName(this,"table","parentNode");
          var row = getByTagName(this,"tr","parentNode");
          for( var i = 1; i < tab.rows.length; i++ ) {
            if( row.rowIndex != i && this.value == tab.rows[i].cells[0].lastChild.value ) {
              alert( TEXTS[lib.lang].gui.nameExists );
            }
          }        
        }, false );
      if( !variant )
        input.focus();            
      for( j = 0; j < fields.length; j++ ) {
        cell = row.insertCell(-1);
        cell.style.width = fieldWidth;
        switch (fields[j].FieldType) {
          case "Checkbox":
            input = ce("input");
            input.type = "checkbox";
            input.name = fields[j].key;
            input.value =   fields[j].key;
            input.checked = variant ? variant[fields[j].key] : fields[j].newVal;          
            win.aaaa = input;
            cell.appendChild(input);
            input.addEventListener("change",function(e){ 
              var idx = this.parentNode.cellIndex-1;
            },false);     
            input.style.width = fields[j].SetWidth ? fields[j].FieldWitdh : fieldWidth;
            break;
          default:
            input = ce("input");
            input.type = "text";
            input.name = fields[j].key;
            input.value = variant ? variant[fields[j].key] : fields[j].newVal;
            cell.appendChild(input);
            input.addEventListener("change",function(e){ 
              var idx = this.parentNode.cellIndex-1;
            },false);     
            input.style.width = fields[j].SetWidth ? fields[j].FieldWitdh : fieldWidth;
            break;
        };     
      } 
    }
    this.deleteVariant = function(e) {
      var row = getByTagName(e.target,"tr","parentNode");
      if( row.id != "" ) {
        var idx = row.id.split("_");
        idx = parseInt(idx[idx.length-1],10);
        Settings[varKey].assigns = Settings[varKey].assigns.replace(new RegExp(";\\d+,"+Settings[varKey].variants[idx].id+";"),";");
      }
      row.parentNode.removeChild(row);
      Settings[varKey].variants.splice(idx,1);
    }
    this.save = function() {
      var nextId = 1;       
      for( var i = 0; i < Settings[varKey].variants.length; i++ ) {
        if( Settings[varKey].variants[i].id >= nextId )
          nextId = Settings[varKey].variants[i].id + 1;
      }
      for( var i = 1; i < tab.rows.length; i++ ) {
        if( i-1 == Settings[varKey].variants.length )
          Settings[varKey].variants.push( {id: nextId++ } );
        Settings[varKey].variants[i-1].name = tab.rows[i].cells[1].lastChild.value;
        for( var j = 0; j < fields.length; j++ ) {
          switch (tab.rows[i].cells[j+2].firstChild.type) {
            case "checkbox":
              Settings[varKey].variants[i-1][fields[j].key] = tab.rows[i].cells[j+2].firstChild.checked;
              break;
            default:       
              Settings[varKey].variants[i-1][fields[j].key] = tab.rows[i].cells[j+2].firstChild.value;
              break;
		  };  
	    };
      }
      lib.storage.setValue(varKey+ownPid,Settings[varKey]);
    }
    
    var tab = parent.appendChild(ce("table"));
    tab.className = "vis";
    var row = tab.insertRow(-1);
    row.style.whiteSpace = "nowrap";
    cell = row.appendChild(ce("th"));
    cell.innerHTML = "X";
    cell.style.color = "#FF0000";
    cell = row.appendChild(ce("th"));
    cell.innerHTML = TEXTS[lib.lang].gui.variantName;
    for( var i = 0; i < fields.length; i++ )
      this.insertHeadCol(fields[i]);
    var input; 
    for( i = 0;  i < Settings[varKey].variants.length; i++ )
      this.insertRow(Settings[varKey].variants[i]);
    var a = parent.appendChild(ce("a"));
    a.href = "javascript:;";
    a.innerHTML = "&raquo; " + TEXTS[lib.lang].gui.addVariant;
    a.addEventListener("click", function(e) { THIS.insertRow(); }, false );
  }

  
  var Korridor = {
    MiniMapMopX : 0,
    MiniMapMopY : 0,
    MapMopX : 0,
    MapMopY : 0,
    doIt : function () {
      Korridor.MiniMapInit();
      Korridor.MapInit();
    },
    MapInit : function () {
      if( lib.params.screen == "map") {
        if( Settings.settings.misc.useMap && Settings.settings.misc.useKorridor )
          setInterval(function() { Korridor.MapWatch(); }, 1000);
      };
    },
    MiniMapInit : function () {
      if( lib.params.screen == "map") {
        if( Settings.settings.misc.useMiniMap && Settings.settings.misc.useKorridor ) {
          setInterval(function() { Korridor.MiniMapWatch(); },1000);
        }
      };
    },
    MapWatch : function() {
      var x = win.TWMap.map.pos[0];
      var y = win.TWMap.map.pos[1];
      if( !win.TWMap.scrolling && (Korridor.MapMopX != x || Korridor.MapMopY != y) ) {
        Korridor.MapMopX = x;
        Korridor.MapMopY = y;
        Korridor.MapUpdateOverlays();
      };
    },
    MiniMapWatch : function () {
      var x = win.TWMap.minimap.pos[0];
      var y = win.TWMap.minimap.pos[1];
      if( !win.TWMap.scrolling && (Korridor.MiniMapMopX != x || Korridor.MiniMapMopY != y) ) {
        Korridor.MiniMapMopX = x;
        Korridor.MiniMapMopY = y;
        Korridor.MiniMapUpdateOverlays();
      };
    },
    MapUpdateOverlays : function() { 
      for( var key in win.TWMap.map._visibleSectors ) {
        var sector = win.TWMap.map._visibleSectors[key];

        var el = $("DSKorridor_map_canvas_"+key);
        if( ! el ) {
          var canvas = ce("canvas");
          canvas.style.position = "absolute";
          canvas.width = "265";
          canvas.height = "190";
          canvas.style.zIndex = 100;
          canvas.className = "DSKorridor_map_canvas";
          canvas.id = "DSKorridor_map_canvas_"+key;
          Korridor.MapCreateTopokorridorOverlay(canvas,sector);
          sector.appendElement(canvas);
        }
      };  
    },
    MiniMapUpdateOverlays : function () {
      for( var key in win.TWMap.minimap._visibleSectors ) {
        var sector = win.TWMap.minimap._visibleSectors[key];
        var el = $("DsKorridor_minimap_canvas_"+key);
        if( ! el ) {
          var canvas = ce("canvas");
          canvas.style.position = "absolute";
          canvas.width = "250";
          canvas.height = "250";
          canvas.style.zIndex = 100;
          canvas.className = "DsKorridor_minimap_canvas";
          canvas.id = "DsKorridor_minimap_canvas_"+key;
          Korridor.MiniMapCreateTopokorridorOverlay(canvas,sector);
          sector.appendElement(canvas);
        }
      };  
    },
    MapCreateTopokorridorOverlay : function(canvas,sector) {
      var ctx = canvas.getContext('2d');
      ctx.clearRect(0,0,canvas.width,canvas.height);
      ctx.save();
      var x = 0 - sector.x * 53 + 26.5;
      var y = 0 - sector.y * 38 + 15;      
      for(var Z1 = 0;  Z1 < Settings.KorridorAssist.variants.length; Z1 ++) {
		ctx.restore();
		ctx.lineWidth = Settings.KorridorAssist.variants[Z1].LineWidth;
		ctx.strokeStyle = Settings.KorridorAssist.variants[Z1].LineColor;
		ctx.fillStyle = Settings.KorridorAssist.variants[Z1].FontColor
		ctx.font = Settings.KorridorAssist.variants[Z1].Font;
		ctx.beginPath();
		if (Settings.KorridorAssist.variants[Z1].Aktiv) {		
		  var CoordsArray = Settings.KorridorAssist.variants[Z1].Coords.split(',');;
		  ctx.moveTo(x+CoordsArray[0]*53,y+CoordsArray[1]*38);
		  ctx.fillText(Settings.KorridorAssist.variants[Z1].name, x+CoordsArray[0]*53, y+CoordsArray[1]*38);
		  for( var j = 0; j < CoordsArray.length; j += 2) {
			ctx.lineTo(x+CoordsArray[j]*53, y+CoordsArray[j+1]*38);
			ctx.fillText(Settings.KorridorAssist.variants[Z1].name, x+CoordsArray[j]*53, y+CoordsArray[j+1]*38);
			var XAfter = CoordsArray[j+2];
			var YAfter = CoordsArray[j+3];
			var XDifferenz = XAfter - CoordsArray[j];
			var YDifferenz = YAfter - CoordsArray[j+1];
			var XFaktor = 0;
			var XNewPoint = 0;
			if (!isNaN(XDifferenz)) {
			  XFaktor = XDifferenz / 2;
			  XNewPoint = parseInt(CoordsArray[j], 10) + XFaktor;
			};
			if (XDifferenz == 0 ) {
			  XNewPoint = parseInt(CoordsArray[j], 10);
			};

			var YFaktor = 0;
			var YNewPoint = 0;
			if (!isNaN(YDifferenz)) {
			  YFaktor = YDifferenz / 2;
			  YNewPoint = parseInt(CoordsArray[j+1], 10) + YFaktor;
			};
			if (YDifferenz == 0 ) {
			  YNewPoint = parseInt(CoordsArray[j+1], 10);
			};
			if (XNewPoint !=0 || YNewPoint != 0) {
			  ctx.fillText(Settings.KorridorAssist.variants[Z1].name, x+XNewPoint*53, y+YNewPoint*38);
			};
		  };
		  ctx.closePath();
		  ctx.stroke();
		};
      };
    },
    MiniMapCreateTopokorridorOverlay : function(canvas,sector) {
      var ctx = canvas.getContext('2d');
      ctx.clearRect(0,0,canvas.width,canvas.height);
      ctx.save();
      var x = 0 - sector.x * 5 + 0.5;
      var y = 0 - sector.y * 5 + 0.5;      
      for(var Z1 = 0;  Z1 < Settings.KorridorAssist.variants.length; Z1 ++) {
		ctx.restore();
		ctx.lineWidth = Settings.KorridorAssist.variants[Z1].MiniMapLineWidth;
		ctx.strokeStyle = Settings.KorridorAssist.variants[Z1].LineColor;
		ctx.fillStyle = Settings.KorridorAssist.variants[Z1].FontColor
		ctx.font = Settings.KorridorAssist.variants[Z1].MiniMapFont;
		ctx.beginPath();
		
		if (Settings.KorridorAssist.variants[Z1].Aktiv) {	
		  var CoordsArray = Settings.KorridorAssist.variants[Z1].Coords.split(',');;
		  ctx.moveTo(x+CoordsArray[0]*5,y+CoordsArray[1]*5);
          ctx.fillText(Settings.KorridorAssist.variants[Z1].name, x+CoordsArray[0]*5, y+CoordsArray[1]*5);
		  for( var j = 0; j < CoordsArray.length; j += 2) {
            ctx.lineTo(x+CoordsArray[j]*5, y+CoordsArray[j+1]*5);
            ctx.fillText(Settings.KorridorAssist.variants[Z1].name, x+CoordsArray[j]*5, y+CoordsArray[j+1]*5);
            var XAfter = CoordsArray[j+2];
            var YAfter = CoordsArray[j+3];
            var XDifferenz = XAfter - CoordsArray[j];
            var YDifferenz = YAfter - CoordsArray[j+1];
            var XFaktor = 0;
            var XNewPoint = 0;
            if (!isNaN(XDifferenz)) {
              XFaktor = XDifferenz / 2;
              XNewPoint = parseInt(CoordsArray[j], 10) + XFaktor;
            };
            if (XDifferenz == 0 ) {
              XNewPoint = parseInt(CoordsArray[j], 10);
            };

            var YFaktor = 0;
            var YNewPoint = 0;
            if (!isNaN(YDifferenz)) {
              YFaktor = YDifferenz / 2;
              YNewPoint = parseInt(CoordsArray[j+1], 10) + YFaktor;
            };
            if (YDifferenz == 0 ) {
              YNewPoint = parseInt(CoordsArray[j+1], 10);
            };
            if (XNewPoint !=0 || YNewPoint != 0) {
              ctx.fillText(Settings.KorridorAssist.variants[Z1].name, x+XNewPoint*5, y+YNewPoint*5);
            };
  		  };
          ctx.closePath();
          ctx.stroke();
        };
      };
    }
  };   
  var Settings = {
    settings: {},
    defSettings : {
      "misc": {
        confirmQueue: true,
        useKorridor: true,
        useMap: true,
        useMiniMap: true,
      },
    },
    impExpPopup : null,
    exportPopup : null,
    exportGroups : { settings: "flSort\\d+|showFl\\d+|coordlist\\d+|exportGroups\\d+|settings\\d+|kataOrder\\d+|checkedUnits\\d+|drillqueueMode\\d+|dst\\d+|farmsort\\d+|groupsOnTopo\\d+|otherOvl\\d+|ownOvl\\d+|redirTarget\\d+|reportorder\\d+|smallQueue\\d+|unitSelect\\d+|unitSum\\d+|useeq\\d+|vilgrp\\d+|villageorder\\d+|bbcode\\d+|topo\\d+|mapopts\\d+|unitFilter\\d+|sounds", variants: "KorridorAssist\\d+", },
    KorridorAssist: { variants:[], assigns: "" },
    variantEdit : { KorridorAssist: null},
    doIt : function() {
      Settings.settings = lib.storage.getValue("settings"+ownPid,Settings.defSettings);
      Settings.KorridorAssist = lib.storage.getValue("KorridorAssist"+ownPid, Settings.KorridorAssist);
      
      if( lib.params.screen == "settings" && lib.params.mode == "settings" ) {
        var val = Settings.settings.misc.confirmQueue;
        var chk = document.getElementsByName("confirm_queue")[0];
        if( chk )
          Settings.settings.misc.confirmQueue = chk.checked;
        if( val != Settings.settings.misc.confirmQueue )
          lib.storage.setValue("settings"+ownPid,Settings.settings);
        Settings.showSettings();
      }
    },
    showSettings : function() {
      var e = document.getElementsByTagName("h3");
      for( var i = 0; i < e.length; e++ ) {
        if( TEXTS[lib.lang].regex.settings.test(e[i].innerHTML) ) {
          e = e[i].parentNode;
          break;
        }
      }
      var p = e.appendChild(ce("p"));
      e = p.appendChild(ce("form"));
      e.name="DSKorridorSettingsFrm";
      e.action = "javascript:;";
      e = e.appendChild(ce("table"));
      e.style.border = "1px solid rgb(222, 211, 185)";
      e.className = "vis";
      e.style.width = "100%";
      var row = e.insertRow(e.rows.length);
      var cell = row.appendChild(ce("th"));
      var a = cell.appendChild(ce("a"));
      a.href = TEXTS[lib.lang].gui.forumThread;;
      a.textContent = TEXTS[lib.lang].gui.title + " " + DSKORRIDOR_VERSION;
      a.target = "_blank";
      cell.colSpan = 2;

      row = e.insertRow(e.rows.length);
      var tabsCell = row.insertCell(0);

      row = e.insertRow(e.rows.length);
      var divCell = row.insertCell(0);
      divCell.style.verticalAlign = "top";

      for( var key in TEXTS[lib.lang].gui.settings.titles ) {
        var span = tabsCell.appendChild(ce("span"));
        span.style.paddingRight = "20px";
        var a = span.appendChild(ce("a"));
        a.href = "javascript:;";
        a.id = "dskorridor_"+key;
        a.innerHTML = TEXTS[lib.lang].gui.settings.titles[key];
        a.addEventListener("click", Settings.showTab, false);
        var tab = divCell.appendChild(ce("table"));
        tab.id = "dskorridor_"+key+"_tab";
        tab.className="vis";
        tab.style.width = "100%";
        tab.style.display = "none";
        Settings["create_"+key+"Form"]();
      }

      row = e.insertRow(e.rows.length);
      cell = row.insertCell(0);
      cell.colSpan = 5;
      var input = cell.appendChild(ce("input"));
      input.type = "button";
      input.value = TEXTS[lib.lang].gui.savebutton;
      input.name = "dskorridor_save";
      input.addEventListener("click", Settings.save, false);
      input = cell.appendChild(ce("input"));
      input.type = "button";
      input.value = TEXTS[lib.lang].gui.exportbutton;
      input.name = "dskorridor_export";
      input.addEventListener("click", function() { Settings.exportPopup.show(); }, false);

      input = cell.appendChild(ce("input"));
      input.type = "button";
      input.value = TEXTS[lib.lang].gui.importbutton;
      input.name = "dskorridor_import";
      input.addEventListener("click", function() { Settings.showImpExpForm(true) }, false);
      input = cell.appendChild(ce("input"));
      input.type = "button";
      input.value = TEXTS[lib.lang].gui.deletebutton;
      input.name = "dskorridor_delete";
      input.addEventListener("click", function() { clearAllInfos(); }, false);
      
      
      Settings.impExpPopup = new lib.Popup("impexp_popup","",true,600,400);
      html = '<table style="width:600px; height:400px;">';
      html += '<tr height="100%"><td><textarea onclick="this.select()" id="dskorridor_impexp_report" style="width:595px; height:100%;"></textarea></td></tr>';
      html += '<tr><td id="dskorridor_impexp_desc"></td></tr>';
      html += '<tr id="dskorridor_impbtn_row"><td style="text-align:center"><input id="dskorridor_import_btn" type="button" value="'+TEXTS[lib.lang].gui.startimport+'"/></td></tr>';
      html += '</table>';
      Settings.impExpPopup.content.innerHTML = html;
      $("dskorridor_import_btn").addEventListener("click", Settings.importData, false);

      tab = p.appendChild(document.createElement("table"));
      row = tab.insertRow(-1);

      lib.fireEvent($("dskorridor_"+lib.storage.getValue("settingsTab"+ownPid,"misc")),"click");
      
      Settings.exportPopup = new lib.Popup("exportGroups",TEXTS[lib.lang].gui.exportGroups.title,true,400,300);
      var tab = Settings.exportPopup.content.appendChild(ce("table"));
      var exportGroups = lib.storage.getValue("exportGroups"+ownPid,"settings,variants");
      for( var key in Settings.exportGroups ) {
        row = tab.insertRow(-1);
        cell = row.insertCell(-1);
        input = cell.appendChild(ce("input"));
        input.type = "checkbox";
        input.value = key;
        input.checked = exportGroups.indexOf(key+",")>-1;
        cell.appendChild(document.createTextNode(TEXTS[lib.lang].gui.exportGroups[key]));
      }
      row = tab.insertRow(-1);
      cell = row.insertCell(-1);
      input = cell.appendChild(ce("input"));
      input.type = "button";
      input.value = TEXTS[lib.lang].gui.exportbutton;
      input.addEventListener("click",Settings.exportData,false);
    },
    create_miscForm : function() {
      var tab = $("dskorridor_misc_tab");
      if (tab) {
        Settings.insertCheckBox(tab.insertRow(-1).insertCell(-1),"misc","useKorridor");
        Settings.insertCheckBox(tab.insertRow(-1).insertCell(-1),"misc","useMap");
        Settings.insertCheckBox(tab.insertRow(-1).insertCell(-1),"misc","useMiniMap");
      };
    },
    create_KorridorAssistForm : function() {
      var tab = $("dskorridor_KorridorAssist_tab");
      if (tab) {      
        var fields = [];
        fields.push( { title: TEXTS[lib.lang].gui.Korridors.Aktiv,             key: "Aktiv",            newVal: "checked",      SetWidth: false, FieldWitdh: "0"    , FieldType: "Checkbox" } ); 
        fields.push( { title: TEXTS[lib.lang].gui.Korridors.LineColor,         key: "LineColor",        newVal: "black",        SetWidth: false, FieldWitdh: "0"    , FieldType: "Input" } ); 
        fields.push( { title: TEXTS[lib.lang].gui.Korridors.FontColor,         key: "FontColor",        newVal: "#FAF5F7",        SetWidth: false, FieldWitdh: "0"    , FieldType: "Input" } ); 
        fields.push( { title: TEXTS[lib.lang].gui.Korridors.LineWidth,         key: "LineWidth",        newVal: 2,              SetWidth: false, FieldWitdh: "0"    , FieldType: "Input" } );
        fields.push( { title: TEXTS[lib.lang].gui.Korridors.MiniMapLineWidth,  key: "MiniMapLineWidth", newVal: 2,              SetWidth: false, FieldWitdh: "0"    , FieldType: "Input" } );
        fields.push( { title: TEXTS[lib.lang].gui.Korridors.Font,              key: "Font",             newVal: "20px 'arial'", SetWidth: false, FieldWitdh: "0"    , FieldType: "Input" } );
        fields.push( { title: TEXTS[lib.lang].gui.Korridors.MiniMapFont,       key: "MiniMapFont",      newVal: "13px 'arial'", SetWidth: false, FieldWitdh: "0"    , FieldType: "Input" } );
        fields.push( { title: TEXTS[lib.lang].gui.Korridors.Coords,            key: "Coords",           newVal: "0,0 ,",          SetWidth: true,  FieldWitdh: "550px", FieldType: "Input" } );

        Settings.variantEdit.KorridorAssist = new VariantEdit(tab,fields,"40px","KorridorAssist");     
      };
    },
    insertCheckBox : function(parent,grp,key) {
      var input = parent.appendChild(ce("input"));
      input.type = "checkbox";
      input.id = "dskorridor_"+grp+key;
      input.checked = Settings.settings[grp][key];
      parent.appendChild(document.createTextNode(TEXTS[lib.lang].gui.settings[grp][key]));
    },
    showTab : function() {
      var tab = this.parentNode.parentNode.parentNode.parentNode;
      var curTab = tab.getElementsByClassName("selected")[0];
      if( curTab )
        curTab = curTab.firstChild;
      if( !curTab || this.id != curTab.id ) {
        if( curTab ) {
          curTab.parentNode.className = "";
          $(curTab.id+"_tab").style.display = "none";
        }
        this.parentNode.className = "selected";
        $(this.id+"_tab").style.display = "";
        lib.storage.setValue("settingsTab"+ownPid,this.id.substr(11));
      }
    },
    showImpExpForm : function(isImport) {
      Settings.impExpPopup.setTitle(TEXTS[lib.lang].gui.title + " - " + (isImport ? TEXTS[lib.lang].gui.importTitle : TEXTS[lib.lang].gui.exportTitle));
      $("dskorridor_impexp_report").innerHTML = "";
      $("dskorridor_impbtn_row").style.display = isImport ? "" : "none";
      Settings.impExpPopup.show();
    },
    exportData : function() {
      var str = "LcKorridorExp\n"+DSKORRIDOR_VERSION+"\n"+lib.server+"\n";
      var inputs = Settings.exportPopup.content.getElementsByTagName("input");
      var re = "";
      var groups = "";
      for( var i = 0;  i < inputs.length - 1; i++ ) {
        if( inputs[i].checked ) {
          if( re.length > 0 )
            re+= "|";
          re += Settings.exportGroups[inputs[i].value];
          groups += inputs[i].value+",";
        }
      }
      lib.storage.setValue("exportGroups"+ownPid,groups);
      Settings.exportPopup.hide();
      var vals = lib.storage.listValues("^"+re+"$");
      for(var i = 0; i < vals.length; i++ )
        str += vals[i]+":"+lib.storage.getString(vals[i])+"\n";
      str += "LcKorridorExp";
      var div = $("dskorridor_impexp_div");
      Settings.showImpExpForm(false);
      $("dskorridor_impexp_report").value = str;
    },
    importData : function() {
      var lines = $("dskorridor_impexp_report").value.replace(/\r\n/g,"\n").replace(/\n\r/g,"\n").split("\n");
      if( lines[0] == "LcKorridorExp" ) {
        var partA = lines[1].split('-');
        if (typeof partA[1] != 'undefined') {
          var DSKORRIDOR_TECHNICAL_VERSIONImport = parseInt(partA[1].split(".")[0],10);
        } else {
          var DSKORRIDOR_TECHNICAL_VERSIONImport = 0;
        };
        if( DSKORRIDOR_TECHNICAL_VERSIONImport == 1) {
          if( lines[2] == lib.server ) {
            if( lines[lines.length-1] != "LcKorridorExp" )
              alert(TEXTS[lib.lang].gui.incompleteExp);
            for( var i = 2; i < lines.length; i++ ) {
              var parts = lines[i].split(":");
              if( parts.length > 1 ) {
                var name = parts[0];
                parts = parts.splice( 1 );
                var value = parts.join(":");
                lib.storage.setString(name,value);
              }
            }
            lib.storage.setValue("version"+ownPid,"");
            alert( TEXTS[lib.lang].gui.importDone );          
            var dsfmImpExpDiv = $("lcxdskorridor_impexp_popup");
            if (dsfmImpExpDiv) {
              dsfmImpExpDiv.style.display="none"; 
            };
            var dsfmShadowDiv = $("dskorridor_shadow_div")
            if (dsfmShadowDiv) {
              dsfmShadowDiv.style.display="none";
            };
          }
          else
            alert(TEXTS[lib.lang].gui.wrongworld);
        }
        else
          alert( TEXTS[lib.lang].gui.unsupportedVersion );
      }
      else {
        alert( TEXTS[lib.lang].gui.wrongFormat );
      }
    },
    save : function() {
      Settings.saveSettings();
      Settings.variantEdit.KorridorAssist.save();
      alert( TEXTS[lib.lang].gui.settingsSaved );
    },
    saveSettings : function() {
      for( var grp in Settings.settings ) {
          for( var key in Settings.settings[grp] ) {
            var input = $("dskorridor_"+grp+key);
            if( !input ) {
              if( !(grp == "storage" && key == "colors") )
                delete Settings.settings[grp][key];
            }
            else {
              if( input.type == "checkbox" )
                Settings.settings[grp][key] = input.checked;
              else {
                Settings.settings[grp][key] = parseInt(input.value, 10);
                if( isNaN(Settings.settings[grp][key]) )
                  Settings.settings[grp][key] = 0;
              }
            }
          }
      }
      lib.storage.setValue("settings"+ownPid,Settings.settings);
    },
  };
  
  if( lib.game_data ) {
    ownPid = parseInt(lib.game_data.player.id,10);
  }
  if( isUV )
    ownPid = parseInt(lib.params.t,10);



  function clearAllInfos() {
    if( confirm( TEXTS[lib.lang].gui.confirm_delAll ) ) {
      lib.storage.clear();
      alert( TEXTS[lib.lang].gui.allDataDeleted );
    }
  }
  run();
  function run() {
    Settings.doIt();  
    Korridor.doIt();       
  };
  function $(id) {
    return document.getElementById(id);
  };
  function ce(name) {
    return document.createElement(name);
  };
  function getByTagName(node,nodeName,what,count) {
    if( typeof count == "undefined" )
      count = 1;
    nodeName = nodeName.toUpperCase();
    node = node[what];
    if( what == "firstChild" )
      what = "nextSibling";
    else if( what == "lastChild" )
      what = "previousSibling";
    while( node && node.nodeName.toUpperCase() != nodeName )
      node = node[what];
    if( count == 1 )
      return node;
    else
      return getByTagName(node,nodeName,what,count-1);
  }  
  function LCDSLib(prefix,forceGM,useIdx) {
    var lib = this;
    this.prefix = prefix;
    this.Debug = function() {
      this.log = function(msg) {
        if( typeof(GM_log) != "undefined" )
          GM_log(msg);
        else if( typeof(opera) != "undefined" )
          opera.postError(msg);
         else if( typeof(console) != "undefined" )
           console.log(msg);
      };
    };
    this.StorageHandler = function(forceGM,useIdx) {
      var gm = typeof(unsafeWindow) != "undefined" && navigator.userAgent.indexOf("Firefox")>-1;
      var win = gm ? unsafeWindow : window;
      var ls = false;
      var intGetValue;
      var intSetValue;
      var prefix = lib.prefix;
      try {ls = typeof(win.localStorage) != "undefined";} catch(e) {lib.log(e.message);}
      var setIdx = function(key,inIdx) {
        if( typeof(inIdx) == "undefined" )
          inIdx = true;
        if( useIdx && inIdx ) {
          var idx = intGetValue("idx",";");
          if( !new RegExp(";"+key+";").test(idx) )
            intSetValue("idx",idx+key+";",false);
        }
      }
      var delIdx = function(key) {
        if( useIdx ) {
          var idx = intGetValue("idx",";");
          idx = idx.replace(new RegExp(";"+key+";","g"), ";");
          intSetValue("idx",idx,false);
        }
      }
      var idxListValues = function(re) {
          var allkeys = intGetValue("idx",";").split(";");
          var serverKeys = [];
          if( typeof(re) != "undefined" )
            var reKey = new RegExp(re);
          for( var i = 1; i < allkeys.length-1; i++ ) {
            if( reKey ) {
              res = res[1].match(reKey);
              if( res )
                serverKeys.push(res);
            }
            else
              serverKeys.push(res[1]);
          }
          return serverKeys;
      };
            if( forceGM && gm || !ls) {
        if( gm ) {
          prefix = prefix + "_" + document.location.host.split('.')[0];
          intSetValue = function(key,value,inIdx) {
            setIdx(key,inIdx);
            GM_setValue(prefix+"_"+key,value);
          };
          intGetValue = function(key,defaultValue) {
            return GM_getValue(prefix+"_" + key, defaultValue);
          }
          this.deleteValue = function(key) {
            delIdx(key);
            GM_deleteValue(prefix+"_"+key);
          }
          if( this.useIdx )
            this.listValues = idxListValues;
          else
            this.listValues = function(re) {
              var allkeys = GM_listValues();
              var serverKeys = [];
              var rePrefix = new RegExp("^"+prefix+"_(.*)$");
              if( typeof(re) != "undefined" )
                var reKey = new RegExp(re);
              for( var i = 0; i < allkeys.length; i++ ) {
                var res = allkeys[i].match(rePrefix);
                if( res ) {
                  if( reKey ) {
                    res = res[1].match(reKey);
                    if( res )
                      serverKeys.push(res);
                  }
                  else
                    serverKeys.push(res[1]);
                }
              }
              return serverKeys;
            }
        }
        else {
          alert( "Geen mogelijkheden gevonden!");
          end;
        }
      }
      else if( ls ) {
        intSetValue = function(key,value,inIdx) {
          if( useIdx )
            setIdx(key,inIdx);
          localStorage.setItem(prefix+"_"+key, value );
        };
        intGetValue = function(key,defaultValue) {
          var value = localStorage.getItem(prefix+"_"+key);
          if( value )
            return value;
          else
            return defaultValue;
        };
        this.deleteValue = function(key) {
          delIdx(key);
          localStorage.removeItem(prefix+"_"+key);
        }
        if( this.useIdx )
          this.listValues = idxListValues;
        else
          this.listValues = function(re) {
            if( this.useIdx ) {
              return idxListValues(intGetValue("idx","").split(";"));
            }
            else {
              var keys = [];
              var rePrefix = new RegExp("^"+prefix+"_(.*)$");
              if( typeof(re) != "undefined")
                var reKey = new RegExp(re);
              for( var i = 0; i < win.localStorage.length; i++ ) {
                var res = localStorage.key(i).match(rePrefix);
                if( res ) {
                  if( reKey ) {
                    res = res[1].match(reKey);
                    if( res )
                      keys.push(res);
                  }
                  else
                    keys.push(res[1]);
                }
              }
              return keys;
            }
          }
      }
      else {
        alert( "Geen mogelijkheden gevonden!");
        end;
      }
      this.clear = function(re) {
        var keys = this.listValues(re);
        for( var i = 0; i < keys.length; i++ )
          this.deleteValue(keys[i]);
      }
      this.setValue = function(key,value) {
        switch( typeof(value) ) {
          case "object":
          case "function":
            intSetValue(key,"j"+JSON.stringify(value));
            break;
          case "number":
            intSetValue(key,"n"+value);
            break;
          case "boolean":
            intSetValue(key,"b" + (value ? 1 : 0));
            break;
          case "string":
            intSetValue(key,"s" + value );
            break;
          case "undefined":
            intSetValue(key,"u");
            break;
        }
      }
      this.getValue = function(key,defaultValue) {
        var str = intGetValue(key);
        if( typeof(str) != "undefined" ) {
          switch( str[0] ) {
            case "j":
              try {
                return JSON.parse(str.substring(1));
              }
              catch(e) {
                alert( key + ": " + TEXTS[lib.lang].gui.valueError );
                return defaultValue;
              }
            case "n":
              return parseFloat(str.substring(1));
            case "b":
              return str[1] == "1";
            case "s":
              return str.substring(1);
            default:
              this.deleteValue(key);
          }
        }
        return defaultValue;
      }
      this.getString = function(key) {
        return intGetValue(key);
      }
      this.setString = function(key,value) {
        intSetValue(key,value);
      }
    }
    this.parseParams = function(url) {
      url = url.replace( location.hash, "");
      url = url.substring(url.indexOf("?")+1);
      url = url.replace( /&amp;/g, "&" );
      var hash = url.indexOf("#");
      if( hash > -1 )
        url = url.substring(0,hash-1);
      url = url.split("&");
      var params = { get: function(name,def) { if(typeof(this[name]) == "undefined") return def; else return this[name]; }, };
      for( var i = 0; i < url.length; i++ ) {
        var param = url[i].split("=");
        params[param[0]] = param[1];
      }
      return params;
    }
    this.getGameData = function() {
      var game_data;
      if(typeof(unsafeWindow) != 'undefined' && navigator.userAgent.indexOf("Firefox")>-1) {
        game_data = unsafeWindow.game_data;
      }
      if(!game_data) {
        var script = ce("script");
        script.type = "application/javascript";
        script.textContent = 	"var input=document.createElement('input');" +
                    "input.type='hidden';" +
                    "input.value=JSON.stringify(game_data);"  +
                    "input.id='game_data';" +
                    "document.body.appendChild(input);";
        document.body.appendChild(script);
        var input = $("game_data");
        if( input )
          eval("game_data=" + input.value + ";");
        document.body.removeChild(script);
      }
      if( game_data )
        game_data.link_base = game_data.link_base.replace(/&amp;/g,"&");
      return game_data;
    }
    this.Popup = function(id,title,close,width,height) {
      var THIS = this;
      id = lib.prefix+"_"+id;
      this.div = $(id);
      this.shadowDiv = $("dskorridor_shadow_div");
      if( this.shadowDiv === null ) {
        this.shadowDiv = document.body.appendChild(ce("div"));
        this.shadowDiv.id = "dskorridor_shadow_div";
        this.shadowDiv.style.position = "fixed";
        this.shadowDiv.style.left = "0px";
        this.shadowDiv.style.top = "0px";
        this.shadowDiv.style.backgroundColor = "rgba(0,0,0,0.7)";
        this.shadowDiv.style.zIndex = 999;
        this.shadowDiv.style.display = "none";
      }
      this.prevShadowDisplay = this.shadowDiv.style.display;
      if( this.div === null ) {
        this.div = document.body.appendChild(ce("div"));
        this.div.id = id;
        this.div.style.position = "absolute";
        this.div.style.zIndex = 1000;
        this.div.style.display = "none";
      }
      this.div.innerHTML = "";
      var tab = this.div.appendChild(ce("table"));
      tab.className = "popup_content";
      tab.style.border = "2px solid #804000";
      var row = tab.insertRow(0);
      var cell = row.appendChild(ce("th"));
      if( close ) {
        var titleTab = cell.appendChild(ce("table"));
        titleTab.style.width = "100%";
        row = titleTab.insertRow(0);
        this.titleCell = row.insertCell(0);
        this.titleCell.appendChild(document.createTextNode(title));
        cell = row.insertCell(1);
        cell.style.textAlign = "right";
        var a = cell.appendChild(ce("a"));
        a.id = id+"_close";
        a.href = "javascript:;";
        a.appendChild(document.createTextNode(TEXTS[lib.lang].gui.close));
        a.addEventListener("click", function() { THIS.hide(); }, false);
      }
      else {
        this.titleCell = cell;
        cell.appendChild(document.createTextNode(title));
      }
      this.content = tab.insertRow(1).insertCell(0);
      this.resize = function() {
        THIS.shadowDiv.style.width = self.innerWidth + "px";
        THIS.shadowDiv.style.height =  self.innerHeight + "px";
      }
      this.center = function() {
        THIS.div.style.left = Math.round(Math.max(0,self.pageXOffset + (self.innerWidth-THIS.div.offsetWidth)/2)) +"px";
        THIS.div.style.top = Math.round(Math.max(0,self.pageYOffset + (self.innerHeight-THIS.div.offsetHeight)/2)) + "px";
      }
      this.show = function() {
        var show = arguments.length == 0 || arguments[0] == true;
        THIS.shadowDiv.style.display = show ? "block" : this.prevShadowDisplay;
        THIS.div.style.display = show ? "block" : "none";
        if( show ) {
          window.addEventListener("resize", THIS.resize, false);
          THIS.resize();
          THIS.center();
        }
        else {
          window.removeEventListener("resize", this.resize, false);
        }
      }
      this.hide = function() {
        THIS.show(false);
      }
      this.setSize = function(width,height) {
        var display = THIS.div.style.display;
        THIS.div.style.display = "block";
        if( typeof(width) == "undefined" )
          width = tab.offsetWidth;
        if( typeof(height) == "undefined" )
          height = tab.offsetHeight;
        THIS.div.style.display = display;
        THIS.div.style.width = width + "px";
        THIS.div.style.height = height + "px";
        THIS.content.parentNode.parentNode.parentNode.style.width = Math.max(0,width - 8) +"px";
        THIS.content.parentNode.parentNode.parentNode.style.height = Math.max(0,height - 50) + "px";
        THIS.center();
      }
      this.setSize(width,height);
      this.setTitle = function(title) {
        THIS.titleCell.innerHTML = "";
        THIS.titleCell.appendChild(document.createTextNode(title));
      }
    }
    this.fireEvent = function(node,evt) {
      if( node.nodeName.toUpperCase() == "INPUT" && node.type.toUpperCase() == "CHECKBOX" )
        node.checked = !node.checked;
      var evObj = document.createEvent('HTMLEvents');
      evObj.initEvent( evt, true, true );
      var ok = node.dispatchEvent(evObj);
      if( ok && node.nodeName == "A" && node.href != "" ) {
        location.href = node.href;
       }
    }
    this.debug = new this.Debug();
    this.storage = new this.StorageHandler(forceGM,useIdx);
    this.params = this.parseParams(location.href);
    this.server = document.location.host.split('.')[0];
    this.hasPA = false;
    var res = this.server.match(/^([a-z]{2})s?(\d+)/);
    if( res ) {
      this.lang = res[1];
      this.world = parseInt(res[2], 10);
    }
    else {
      this.lang = "nl";
      this.world = -1;
    }
    if( this.params.screen ) {
     this.game_data = this.getGameData();
     if( this.game_data)
      this.hasPA = this.game_data.player.premium;
    }
  };
})();

(function() { 
  if(/screen=memo/.test(location.href) || /screen=info_village/.test(location.href) || /screen=ranking/.test(location.href)  || /screen=buddies/.test(location.href) || /screen=report&/.test(location.href));	
  else {
		return;
	} 
var icon =	'data:image/png;base64,'+
		'iVBORw0KGgoAAAANSUhEUgAAAA8AAAAKCAMAAABcxfTLAAAABGdBTUEAALGPC%2FxhBQAAAwBQTF'+
		'RFAAAAGhgVHx0aHx4bIB8cJiMdKCUfIiIgJCQjJSUlNDIuODc0OzgyOjk3QjwtQj00REA3Q0A5Rk'+
		'I6bl07U05FUE9NXldIXllOUVFRaF9PY19XYF5bZmJaY2NjaWdhhHdag3tqgX56g4J%2Fk4Rkkody'+
		'kYl4lYx4o5Z9mJGFnJWJpJ2PrJ%2BGoZ2UsKWOtqyWvLKftLCnv7%2B%2FxLys1su00czB087H29'+
		'LA2dnZ4djG6OPW8ezg%2BPPr%2Ffr1%2F%2F%2F%2FAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
		'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
		'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
		'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
		'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
		'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
		'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
		'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
		'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
		'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
		'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQJw%2FEgAAAAlwSFlz'+
		'AAAOwgAADsIBFShKgAAAABh0RVh0U29mdHdhcmUAUGFpbnQuTkVUIHYzLjM2qefiJQAAAIlJREFU'+
		'GFdFx9sWgUAUgOFNlJzCOIcQNjKNmaEaZr%2F%2Fa6lu%2FBf%2FWh8wVP%2BQgUofVJZXu3EBii'+
		'Y7Igk52XXwrSwbhra%2BtJn7%2FKSlyb8Yf3nMTp4xtWervXOY4nBT1LbzMAzO7aIZ6YKDsvgeeC'+
		'%2FRuo51rBMQaG2nZ0zXuWsdIzChRH%2BR8pGbJIjsB%2FGKF8so9KtqAAAAAElFTkSuQmCC';

var input = document.getElementsByTagName('a');
for (a = 0; a < input.length; a++) {
	if (input[a].href.match(/village=(\d+)&id=(\d+)&screen=info_player/) || input[a].href.match(/village=(\d+)&amp;id=(\d+)&amp;screen=info_player/)) {
		var village = RegExp.$1;
		var player = RegExp.$2;
		var link = document.createElement('a');
		link.href = '/game.php?village=' + village + '&screen=mail&mode=new&player=' + player;
		link.setAttribute('style', 'margin-left: 15px;');
		var img = document.createElement('img');
		img.src = icon;
		img.alt = 'IGM';
		link.appendChild(img);
		input[a].parentNode.insertBefore(link, input[a].nextSibling);
	}
}
})();



//2
(function() { 
  if(/mode=prod/.test(location.href) || /mode=combined/.test(location.href) || /mode=trader/.test(location.href)  || /mode=units/.test(location.href) || /mode=tech/.test(location.href) || /mode=groups/.test(location.href)  || /mode=commands/.test(location.href)  || /mode=buildings/.test(location.href));	
  else {
		return;
	} 
var win =  typeof unsafeWindow != 'undefined' ? unsafeWindow : window;
var $ = win.$;{

var rows = $("tr[class*='row_']");

function changeRowColor(obj, color) {
		$(obj).find('td').css("backgroundColor", color);
}

function addListeners(row, changeColor, origColor) {
	row.addEventListener("mouseover", function() {
			changeRowColor(this, changeColor)
		}, false);
	
	row.addEventListener("mouseout", function() {
			changeRowColor(this, origColor)
		}, false);
}
for (var i = 0; i < rows.length; i++) {
	var color = win.getComputedStyle(rows[i].getElementsByTagName('td')[0], null).backgroundColor;
	addListeners(rows[i], "rgb(159, 111, 60)", color); 
    }
	}
})();

//3
(function() { 
  if(/screen=overview_villages/.test(location.href));
  else {
		return;
	} 
//should I scroll to the current village?
	var goto_village = true; //true | false
//styles for current village
	var highlight_text_color = '#a30013'; //purple, black, grey, red, blue, ...
	var highlight_background_color = '#a29089'; //#F5DEB3, red, blue, wheat, ...
	var bold = true; //true | false

// begin code
function $x(p,c){return document.evaluate(p,c||document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue}
var tables = ['combined', 'production'/*, 'trades'*/, 'units'/*, 'commands'*//*, 'incomings'*/, 'buildings', 'techs', 'groups'],
	table,
	villages_per_row = 1,
	vid = document.links[0].href.match(/village=(\d+)/)[1],
	type;
for(var i=0; i<tables.length; i++){
	if((table=document.getElementById(tables[i]+'_table'))){
		break;
	}
}
if(document.getElementById('units_table')){
	type = $x('//td[@class="selected"]/a[contains(@href, "units_type=")]');
	if(type) type = type.href.match(/units_type=(complete|own_home|there|away|moving|support_detail|away_detail)(?:&|$)/);
	type = type ? type[1] : 'complete';
	switch(type){
	case 'complete':
		villages_per_row = 4;
		break;
	case 'own':
	case 'there':
	case 'away':
	case 'moving':
		villages_per_row = 2;
		break;
	}
}
if(table){
	var rows = table.rows;
	for(var i=1; i<rows.length; i+=villages_per_row){
		var row = rows[i],
			a = row.getElementsByTagName('a')[0];
		if((type == 'support_detail' || type == 'away_detail') && row.className != 'units_away') continue;
		if(a.href.indexOf('village='+vid+'&') != -1){
			a.name = 'lkn_hlcv_current_village';
			var anchor = document.createElement('a');
			anchor.href = '#'+a.name;
			anchor.innerHTML = '»  Scroll naar huidige dorp';
			row.offsetParent.parentNode.insertBefore(anchor, row.offsetParent);
			if(goto_village) location.hash = a.name;
			var css_styles = 'color: '+highlight_text_color+'; background-color: '+highlight_background_color+';';
			if(bold) css_styles += 'font-weight: bold;';
			for(var j=0; j<villages_per_row; j++){
				row = rows[i+j];
				for(var k=0; k<row.cells.length; k++){
					row.cells[k].style.cssText = css_styles;
				}
			}
			break;
		}
	}
}
})(); 				

(function () {
	// XPath single result
	var $x = function (p,c){return document.evaluate(p,c||document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue};
	
	var pages_row = $x('//table/tbody/tr/td[@colspan=3 and @align="center"]/a[@class="paged-nav-item" and contains(., "[") and contains(., "]")]/..');
	if (pages_row) {
		var footer_table = $x('//table[@id="report_list"]/tbody');
		var pages_table = document.createElement("tr");
		pages_table.className = "vis";
		pages_table.width = "100%";
		pages_table.appendChild(pages_row.cloneNode(true));
		footer_table.insertBefore(pages_table, footer_table.lastChild.nextSibling);
	}
})();



(function() { 
  if(/screen=info_village/.test(location.href));
  else {
		return;
	}
var table = document.getElementById('content_value').getElementsByTagName('table')[1];
// Local Village
var local_village = (typeof unsafeWindow != 'undefined' ? unsafeWindow : window).game_data.village.coord.split('|');
// Remote Village
var remote_village = table.rows[1].cells[1].innerHTML.match(/\d+\|\d+/);
remote_village = (''+remote_village).split('|');

// Calc Distance
var distance = Math.sqrt(
						 Math.pow(local_village[0] - remote_village[0], 2) +
						 Math.pow(local_village[1] - remote_village[1], 2)
						).toFixed(2);

// Insert Content
var row = document.createElement('tr');
table.appendChild(row); // Opera is buggy with insertRow :/
row.insertCell(0).innerHTML = 'Afstand:';
row.insertCell(1).innerHTML = distance + ' velden';
})();

(function () {
var tabs = document.getElementsByTagName("table");
var tables = [];
for(var x = 0; x < tabs.length; x++)
{
  if(tabs[x].innerHTML.match(/Aantal:/) && !tabs[x].getElementsByTagName("table")[0])
  {
	tables.push(tabs[x]);
  }
}

var len, clone, newTr, newTd;
var unitsWent, unitsLose, unitsSurv;
for(var x = 0; x < tables.length; x++)
{
  len = tables[x].getElementsByTagName("tr")[1].getElementsByTagName("td").length;
  newTr = tables[x].getElementsByTagName("tr")[1].cloneNode(true);
  newTd = newTr.getElementsByTagName("td")[0].cloneNode(true);
	newTd.setAttribute('style','text-align:center');
  newTr.innerHTML = "";
  newTd.innerHTML = "Overlevende: ";
  newTr.appendChild(newTd);
  
  for(var y = 1; y < len; y++)
  {
	/* calc survived Units */
	unitsWent = tables[x].getElementsByTagName("tr")[1].getElementsByTagName("td")[y].innerHTML;
	unitsLose = tables[x].getElementsByTagName("tr")[2].getElementsByTagName("td")[y].innerHTML;
	unitsSurv = (parseInt(unitsWent)-parseInt(unitsLose));
	
	/* set survied Units */
	newTd = newTd.cloneNode(true);
	newTd.innerHTML = unitsSurv;
	newTd.className = (unitsSurv == 0) ? "hidden" : "";
	newTr.appendChild(newTd);
  }
  
  tables[x].getElementsByTagName('tbody')[0].appendChild(newTr);
}
})();

(function () {
const url = document.location.href;
const lang = url.split('.')[0].split(/\/\/(\D+)\d+/)[1];
const world = parseInt(url.split('.').shift().split(lang).pop());

function stringInt(int) { var string = parseInt(int).toString(10); var reo = new RegExp('(-?[0-9]+)([0-9]{3})'); while(reo.test(string)) string = string.replace(reo,'$1.$2'); return string; };
function GTFW (type)
  {
  if( (lang == 'de' && (world < 20 || world == 40 || world == 42)) || (lang == 'ch' && world < 2) ||  (lang == 'en' && world < 14)  ||  (lang == 'nl' && world < 6))
    return 2;
  else
    if(type == 'att')
      return 1;
  return 0;
  }

// Strings
const lstrings =
  {
  'quantity' : {
    'de' : 'Anzahl:',
    'ch' : 'Azau:',
    'en' : 'Quantity:',
    'nl' : 'Aantal:'}

  }

// Bashpoints
const unit_points =
  {            //  def   att   w19
  'spear'     :  [   4,    1,    1],
  'sword'     :  [   5,    2,    1],
  'axe'       :  [   1,    4,    1],
  'archer'    :  [   5,    2,    1],
  'spy'       :  [   1,    2,    2],
  'light'     :  [   5,   13,    4],
  'marcher'   :  [   6,   12,    5],
  'heavy'     :  [  23,   15,    6],
  'ram'       :  [   4,    8,    5],
  'catapult'  :  [  12,   10,    8],
  'knight'    :  [  40,   20,  100],
  'priest'    :  [   0,    0,  100],
  'snob'      :  [ 200,  200,   10],
	'militia'		:	 [   4,    1,    1]
  };

// Get Tables
var tables = findByInner(document,lstrings.quantity[lang]);
attacker_table = tables[0].parentNode.parentNode;
defender_table = tables[1].parentNode.parentNode;

// Get Units
var units = new Array('empty');
var elist = attacker_table.getElementsByTagName('tr')[0].getElementsByTagName('td');
for(var i = 1; i < elist.length; i++)
  {
  // graphic/unit/unit_spear.png?1
  var unit = elist[i].getElementsByTagName('img')[0].getAttribute('src').match(/_(.+).png/)[1];
  void units.push( unit );
  };

// Get Attacker's Lost Units
var index = GTFW('att');
var attackers_points = 0;
var elist = attacker_table.getElementsByTagName('tr')[2].getElementsByTagName('td');
for(var i = 1; i < elist.length; i++)
  {
  var unit_att_lost = parseInt(elist[i].firstChild.data);
  attackers_points += unit_att_lost * unit_points[units[i]][index];
  };

// Get Defender's Lost Units
var index = GTFW('def');
var defender_points = 0;
var elist = defender_table.getElementsByTagName('tr')[2].getElementsByTagName('td');
if (world > 20) { void units.push('militia'); }
for(var i = 1; i < elist.length; i++)
 	{
  var unit_def_lost = parseInt(elist[i].firstChild.data);
 	defender_points += unit_def_lost * unit_points[units[i]][index];
  };

// Insert Defender Points
var tr = document.createElement('tr');
var td = document.createElement('td');
td.setAttribute('colspan','2');
td.appendChild(document.createTextNode('ODA: '+stringInt(defender_points)));
tr.appendChild(td);
attacker_table.parentNode.parentNode.parentNode.parentNode.appendChild(tr);

// Insert Attacker Points
var tr = tr.cloneNode(true);
tr.firstChild.replaceChild(document.createTextNode('ODD: '+stringInt(attackers_points)),tr.firstChild.firstChild);
defender_table.parentNode.parentNode.parentNode.parentNode.appendChild(tr);


function findByInner(obj,value) {
    var len = obj.getElementsByTagName('*').length;
    var list = new Object();
    var  a = 0;
    for(var i = 0; i < len; i++) {
      if(obj.getElementsByTagName('*')[i].firstChild) {
        if(obj.getElementsByTagName('*')[i].firstChild.data) {
          if(obj.getElementsByTagName('*')[i].firstChild.data.indexOf(value) != -1) {
            list[a] = obj.getElementsByTagName('*')[i];
            a++; } } } }
    list['length'] = a;
    return list; }
})();

// +++++++++++++++++++++++++++++++++
// ++Tab titel bewerken
// +++++++++++++++++++++++++++++++++
(function() { 
  if(/game.php?/.test(location.href));
  else {
		return;
	} 
	 var $ = unsafeWindow.$;

var url = window.location.href;

if(url.split("village=")[1] == null)
    return;

var wereld = url.split(".")[0].replace("http://nl", "");
var dorp_ID = url.split("village=")[1].split("&")[0];

var title = $(unsafeWindow.top.document).find('title');
var oldTitle = 'Welkom op - Tribalwars - Wereld '+wereld;

title.html(oldTitle);

var newTitle = '';
var marqueeTitleOn = false;

unsafeWindow.newsInTitle_getNews = function(){
    $.get(url,function(data){
        ajax = $(data);
        
        var post = ajax.find('.icon.header.new_post').length;
        var msg = ajax.find('.icon.header.new_mail').length;
        var report = ajax.find('.icon.header.new_report').length;
        
        if(post || msg || report)
        {
            $('#menu_row').html(ajax.find('#menu_row').html());
            newTitle ='['+(post+msg+report)+']'+(msg ? ' - Nieuwe PM -': '')+(report ? ' - Nieuw Rapport -': '')+(post ? ' - Nieuw Stam bericht -': '');
//'[W'+wereld+']' +
            title.html(newTitle);
            if(!marqueeTitleOn)
            {
                unsafeWindow.newsInTitle_marqueeTitle();
                marqueeTitleOn = true;
            }
        }
        
        unsafeWindow.setTimeout(function(){unsafeWindow.newsInTitle_getNews();},10000);
    });
};


unsafeWindow.newsInTitle_marqueeTitle = function()
{
    var count = title.html().substr(1,1);
    var tempTitle = title.html().substr(3);
    
    title.html('['+count+']'+tempTitle.substr(1));
    
    if(tempTitle == '')
        title.html(newTitle);
        
    unsafeWindow.setTimeout(function(){unsafeWindow.newsInTitle_marqueeTitle();},250);
};

unsafeWindow.newsInTitle_getNews();
	})();
//3

(function() { 
  if(/screen=mail/.test(location.href) || /screen=info_player/.test(location.href) || /screen=memo/.test(location.href) || /screen=forum/.test(location.href));
  else {
		return;
	} 
function infoVillage() {
	var id = location.href.match(/&screen=info_village&id=(\d+)/)[1];
	var content = document.getElementById("content_value");
	var th = content.getElementsByTagName("th")[0];
	addEditSymbol(th);
	if(villages.id[id])
	{
		var name = content.getElementsByTagName("h2")[0];
		name.title = name.textContent;
		name.textContent = villages.id[id];
	}
}

function infoCommand(obj) {

	var id = obj.href.match(/screen=info_village&id=(\d+)/)[1];
	var content = document.getElementById("content_value");
	if(villages.id[id])
	{
		var name = content.getElementsByTagName("h2")[0];
		var vilname = name.textContent.match(/(.+ op.+ van|.+ voor|.+ naar) (.+)/)[2];
		name.title = vilname;
		name.textContent = name.textContent.replace(vilname, villages.id[id]);
	}
}

function checkExistence(object) {
	if (navigator.userAgent.indexOf("Opera") != -1)
	{
		if ((typeof(object) != "undefined") && (typeof(object) != undefined))
		{
			return true;
		}
		else 
			return false;
	}
	else if (navigator.userAgent.indexOf("Firefox") != -1)
	{
		if (object != null)
			return true;
		else
			return false;
	}
}


function loadName(obj) {
	var link = obj;
	var id = link.href.match(/village=\d+&screen=info_village&id=(\d+)/)[1];
	if(villages.id[id])
	{
		link.title = link.textContent;
		if(link.textContent.match(/\((\d+\|\d+)\) (C\d+)$/))
		{
			var coords = RegExp.$1;
			var con = RegExp.$2;
			link.textContent = villages.id[id] + " (" + coords + ") " + con;
		}
		else
		{
			link.textContent = villages.id[id];
		}
		
		addBackToOriginalSymbol(obj);
	}
}

function loadNameCommands(obj) {
	var name = obj.textContent.match(/(.+ op|.+ van|.+ voor|.+ naar) (.+) \((\d+\|\d+)\) C\d+$/)[2];
	var coords = obj.textContent.match(/(.+ op|.+ van|.+ voor|.+ naar) (.+) \((\d+\|\d+)\) C\d+$/)[3];
	
	if (villages.coords[coords])
	{	
		obj.textContent = obj.textContent.replace(name, villages.coords[coords]);
	}
}

function loadNameReports(obj) {
	var name = obj.textContent.match(/(.+ Aanval|.+ unterstützt|.+ veroverd|.+ naar) (.+) \((\d+\|\d+)\)/)[2];
	var coords = obj.textContent.match(/(.+ Aanval|.+ unterstützt|.+ veroverd|.+ naar)(.+) \((\d+\|\d+)\)/)[3];
	
	if (villages.coords[coords])
	{	
		obj.textContent = obj.textContent.replace(name, "*" + villages.coords[coords] + "*");
	}
}
		
function addEditSymbol(obj)
{
	var edit = document.createElement("img");
	edit.src = " http://www.imgbox.de/users/Peety/Bueroklammer.png";
	edit.addEventListener("click", rename, false);
	if (location.href.match(/&screen=info_village&id=\d+/))
	{
		obj.innerHTML = "<a href="+location.href+">"+obj.textContent+"</a>";
		obj = obj.getElementsByTagName("a")[0];
	}
		obj.parentNode.insertBefore(edit, obj.nextSibling);
		loadName(obj);
}

function addBackToOriginalSymbol(obj) {
	var back = document.createElement("img");
	back.title = "Orginele naam weer herstellen";
	back.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAMCAYAAABSgIzaAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9sIAhYeINnQBdMAAAAZdEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAAB+0lEQVQoz22QS2gTYRSFz8z8ecxfENpJBN2ohJhGokJLgqUq+MCNKIKgm9hF0aT4KkFKXShFCCJokRA3VWuagkExiN24FYRYSR+oKEWrjQ+qjUnrxqaZJv9cV0lG6Nne83HOPRJMCl+MUHtgV3soeHIaAJLpsbbpiexU7vNs3bNn34GevvPhITMHzeGkvfsPTiUeP23r7jlHmsNJmsNJbk8raQ4nASDOOUUHY1116Er0RheA+lFzOCnYfYbiw8lI7G5iw807Qy845wSAAh2dpJgC33zLzQEAKpUKQhcicLm3XlvV9VEi/AEw//1rLvg7vwBIgFyjJl+/+q/2vfhtrCzlB4QQvbpedgFYz3kTAKC8UgarGUulEtyeVgBAc4sGu6riR76ITXzdnMLYRyHEoy+znwAALZrWAEeePPOv6nqTrpfF8t9lqlYrC6Ja7VcYSyuKsvHXz3nfYrEAAPD6djSqSpI0I8vySwAZm902wZilMNB/KcSYxWDMcjWdGq2/4fFug4Q1FB9OMkMYZJCxWZbkvoeJ++HseAYAEOjoRHY8I8lrgarKhcq5oqrqMTPEOcehw0cAmFY1y2K1SlabbXdq5MGtGgQAp06HYVfV6wAa46TGnvuJ8F6S0AxCXhhiyevbjg/v3mKxWMDR4yewxeX2X+49OxkdjO38Bz/Ow0WkTG6MAAAAAElFTkSuQmCC";
	back.addEventListener("click", eraseFromDataBase, false);
	obj.parentNode.insertBefore(back, obj.nextSibling.nextSibling);
}

function eraseFromDataBase() {
	var link = this.previousSibling.previousSibling;
	if(location.href.match(/&screen=info_village&id=\d+/) || location.href.match(/screen=info_command&id=\d+/))
	{
		var content = document.getElementById("content_value");
		var name = content.getElementsByTagName("h2")[0];
		if (location.href.match(/screen=info_command&id=\d+/))
		{
			name.textContent = name.textContent.match(/(.+ op |.+ van |.+ voor |.+ naar )/)[1] + name.title;
		}
		else
		{
			name.textContent = name.title;
		}
		name.title = "";
	}
	
	this.parentNode.removeChild(this);
	var id = link.href.match(/village=\d+&screen=info_village&id=(\d+)/)[1];
	delete villages.id[id];
	if(link.textContent.match(/\((\d+\|\d+)\) C\d+$/))
	{
		var coords = RegExp.$1;
	}
	else if (location.href.match(/&screen=info_player&id=\d+/) && (link.parentNode.parentNode.parentNode.parentNode.id == "villages_list"))
	{
		var coords = link.parentNode.nextSibling.textContent;
	}
	else if (location.href.match(/&screen=info_village&id=\d+/))
	{
		var coords = link.parentNode.parentNode.parentNode.getElementsByTagName("tr")[1].firstChild.nextSibling.innerHTML;
	}
	delete villages.coords[coords];
	link.textContent = link.title;
	link.title = "";
	localStorage.setItem("tm4rkus_village_renamer", JSON.stringify(villages));
}

function rename() {	
	var link = this.previousSibling;
	var id = link.href.match(/village=\d+&screen=info_village&id=(\d+)/)[1];
	link.style.display = "none";
	this.style.display = "none";
	if(this.nextSibling)
	{
		if(this.nextSibling.title == "Orginele naam weer herstellen")
		{
			this.parentNode.removeChild(this.nextSibling);
		}
	}
	var input = document.createElement("input");
	input.type = "text";
	input.id = id;
	if (link.textContent.match(/(.+) \(\d+\|\d+\) C\d+$/))
	{
		input.value = RegExp.$1;
	}
	else
	{
		input.value = link.textContent;
	}
	input.size = 17;
	this.parentNode.insertBefore(input, this);
	var button = document.createElement("input");
	button.type = "button";
	button.value = "Ok";
	button.addEventListener("click", save, false);
	this.parentNode.insertBefore(button, this);
}

function save() {
	var link = this.previousSibling.previousSibling;
	var id = link.href.match(/village=\d+&screen=info_village&id=(\d+)/)[1];
	var input = document.getElementById(id);
	newName = input.value;
	if(link.textContent.match(/\((\d+\|\d+)\) C\d+$/))
	{
		var coords = RegExp.$1;
	}
	else if (location.href.match(/&screen=info_player&id=\d+/) && (this.parentNode.parentNode.parentNode.parentNode.id == "villages_list"))
	{
		var coords = this.parentNode.nextSibling.textContent;
	}
	else if (location.href.match(/&screen=info_village&id=\d+/))
	{
		var coords = this.parentNode.parentNode.parentNode.getElementsByTagName("tr")[1].firstChild.nextSibling.innerHTML;
	}
	
	if(!villages.id[id])
	{
		link.title = link.textContent;
	}
		
	villages.id[id] = newName;
	villages.coords[coords] = newName;
	
	this.nextSibling.style.display = "";

	if (link.textContent.match(/\((\d+\|\d+)\) (C\d+)$/))
	{
		var con = RegExp.$2;
		link.textContent = newName + " (" + coords + ") " + con;
	}
	else
	{
		link.textContent = newName;
	}
	link.style.display = "";
	addBackToOriginalSymbol(this);
	this.parentNode.removeChild(input);
	this.parentNode.removeChild(this);
	if(location.href.match(/&screen=info_village&id=\d+/))
	{
	var content = document.getElementById("content_value");
	var name = content.getElementsByTagName("h2")[0];
	name.title = name.textContent;
	name.textContent = villages.id[id];
	}
	if(location.href.match(/screen=info_command&id=\d+/))
	{
	var content = document.getElementById("content_value");
	var name = content.getElementsByTagName("h2")[0];
	name.title = name.textContent.match(/(.+ op|.+ van|.+ voor|.+ naar) (.+)/)[2];
	name.textContent = name.textContent.replace(/(.+ op|.+ van|.+ voor|.+ naar) (.+$)/, name.textContent.match(/(.+ op|.+ van |.+ voor |.+ naar )/)[1] + villages.id[id]);
	}
	localStorage.setItem("tm4rkus_village_renamer", JSON.stringify(villages));
}

function exportData() 
{
this.nextSibling.style.display = "none";
this.style.display = "none";
var input = document.createElement("input");
input.value = JSON.stringify(villages);
input.type = "text";
input.size = 3;
var button = document.createElement("input");
button.type = "button";
button.value = "Ok";
button.addEventListener("click", function() {
	this.nextSibling.style.display = ""; 
	this.nextSibling.nextSibling.style.display = ""; 
	this.parentNode.removeChild(this.previousSibling);
	this.parentNode.removeChild(this);
	}, false);
this.parentNode.insertBefore(input, this);
this.parentNode.insertBefore(button, this);
}

function importData() 
{
this.previousSibling.style.display = "none";
this.style.display = "none";
var input = document.createElement("input");
input.type = "text";
input.size = 3;
var button = document.createElement("input");
button.type = "button";
button.value = "Importeren";
button.addEventListener("click", function() {
	
	var imported = this.previousSibling.value;
	if(imported.match(/^{.+"id":{.+},"coords":{.+}}$/))
	{
		if(confirm("Echt importeren? Dorpen, die je opgeslagen hebt onder een andere naam, worden overschreven! Alle anderen Dorpnamen werden behouden"))
		{
			var villages_temp = villages;
			try
			{
					imported = JSON.parse(imported);
					for (var prop in imported.id)
					{
					villages.id[prop] = imported.id[prop];
					}
					for (var prop in imported.coords)
					{
					villages.coords[prop] = imported.coords[prop];
					}
				
				localStorage.setItem("tm4rkus_village_renamer", JSON.stringify(villages));
				location.reload();
			}
			catch(e)
			{
				villages = villages_temp;
				localStorage.setItem("tm4rkus_village_renamer", JSON.stringify(villages));
			}
		}
	}
	else
	{
	alert("Fout bij het Importeren! Voortgang afgebroken, er wordt geen data veranderd.");
	}
}, false);
this.parentNode.insertBefore(input, this);
this.parentNode.insertBefore(button, this);
}
	


var head = document.getElementsByTagName("head")[0];
var gamedata = JSON.parse(head.innerHTML.match(/var game_data = (\{.+\})\;/)[1]);
var playername = gamedata.player.name;
var premium = gamedata.player.premium;
var version = "8.5.1";

if (premium == true)
{
	window.addEventListener("focus", function() {
		if(checkExistence(localStorage["tm4rkus_village_renamer"]))
		{
			villages = JSON.parse(localStorage.getItem("tm4rkus_village_renamer"));
		}
		else
		{
			villages = {"version": version, "id": {}, "coords": {}};
		}
		localStorage.setItem("tm4rkus_village_renamer", JSON.stringify(villages));
	}, false);
	if(checkExistence(localStorage["tm4rkus_village_renamer"]))
	{
		var villages = JSON.parse(localStorage.getItem("tm4rkus_village_renamer"));
		if(!villages.id)
		{
		var villages = {"version": version, "id": {}, "coords": {}};
		localStorage.setItem("tm4rkus_village_renamer", JSON.stringify(villages));
		}
	}
	else
	{
		var villages = {"version": version, "id": {}, "coords": {}};
		localStorage.setItem("tm4rkus_village_renamer", JSON.stringify(villages));
	}
	
	if (villages.version != version)
	{
		villages.version = version;
	}
	
	var nodes = document.getElementById("content_value").getElementsByTagName("a");
	for (var i = 0; i < nodes.length; i++) 
	{
		if (nodes[i].href.match(/village=\d+&screen=info_village&id=\d+$/))
		{
			addEditSymbol(nodes[i]);
			if (location.href.match(/screen=info_command&id=\d+/))
			{
				infoCommand(nodes[i]);
			}
		}
		if (nodes[i].href.match(/screen=info_command&id=\d+/) && nodes[i].textContent.match(/(.+ op |.+ van |.+ voor |.+ naar )/))
		{
			loadNameCommands(nodes[i]);
		}
		else if (nodes[i].textContent.match(/(.+ Aanvallen|.+ unterstützt|.+ veroverd|.+ naar)(.+) \((\d+\|\d+)\)/))
		{	
			loadNameReports(nodes[i]);
		}
	}

	if (location.href.match(/screen=info_player&id=\d+/))
	{
		var links_added = 0;

		var village_table = document.getElementById("content_value").getElementsByTagName("TABLE")[2];
		var rows = village_table.getElementsByTagName("tr");
		var export_img = rows[0].getElementsByTagName("th")[0].appendChild(document.createElement("img"));
		export_img.addEventListener("click", exportData, false);
		var import_img = rows[0].getElementsByTagName("th")[0].appendChild(document.createElement("img"));
		import_img.addEventListener("click", importData, false);
		var link = rows[rows.length-1].getElementsByTagName("a")[0];
		link.addEventListener("click", function() { links_added = 1 }, false)
		village_table.addEventListener("DOMNodeRemoved", function() 
		{
			if (links_added == 1)
			{
				var village_table = this;
				var rows = village_table.getElementsByTagName("tr");
				var nodes = village_table.getElementsByTagName("a");
				for(var i = 0; i < nodes.length; i++) 
				{
					if (nodes[i].href.match(/village=\d+&screen=info_village&id=\d+$/))
					{
						var img = nodes[i].parentNode.getElementsByTagName("img")[0];
						if(!img)
						addEditSymbol(nodes[i]);
					}
				}
			links_added = 0;
			}
		}, false);
		
	}

	if (location.href.match(/&screen=info_village&id=\d+/))
	{
	infoVillage();
	}
	
	if (location.href.match(/screen=map/))
	{
		var coords = "";
		function mapRename() {
			var info_title = document.getElementById("info_title").innerHTML;
			
			if (info_title.match(/.+ \((\d+\|\d+)\) C\d+$/))
				{
					coords = RegExp.$1;
					if(villages.coords[coords])
					{
						document.getElementById("info_title").innerHTML = villages.coords[coords] + " <img src=\" http://www.imgbox.de/users/Peety/Bueroklammer.png\">";
					}
				}
		}
		setInterval(mapRename, 100);
	}
	
	
}
})(); 



};
};

// ++++++++++++++++++++++++
// ++ jump naar top maken
// ++++++++++++++++++++++++
$ = (typeof(unsafeWindow) != 'undefined') ? unsafeWindow.$ : window.$;
   
if ($("#footer_left").length) $("#footer_left").after("<a href='#'><CENTER>↑ Naar Boven ↑</CENTER></a>");

(
 function ()
 {
     var script = document.createElement("script");
     script.textContent = "(" + Vortex_ready + ")()";
     document.body.appendChild(script);
 })();     	  