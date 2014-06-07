// ==UserScript==
// @name           [HFR] Dynamic Word Search
// @include        http://forum.hardware.fr/hfr/AchatsVentes/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @require        https://raw.github.com/carhartl/jquery-cookie/master/jquery.cookie.js
// @version        0.2.4
// @description    Recherche les lignes contenant un mot clé dans une page de la section vente. Option de rafraîchissement automatique
// ==/UserScript==

// Config values
var autorefreshValue = true
var autorefreshRate = 30 //minutes
var fade = false
var fadeValue = 0.4
var colorize = true
var fadeSpeed = "fast " // fast or slow
var searchString = ""; // default search value
var ach_background = "#F8E6E0"
var vds_background = "#E3F6CE"
var ech_background = "#E6E6E6"
var default_background = "#FFFFFF" 


// Cookies index
var cookieSearchValue = "mysearchcookie_search_value"
var cookieRateValue = "mysearchcookie_rate_value"
var cookieAutorefreshValue = "mysearchcookie_autorefresh_value"
var cookieFadeValue = "mysearchcookie_fade_value"
var colorizeValue = "mysearchcookie_colorize_value"


var ach = /^\[\s*ach/i
var vds = /^\[\s*vds/i
var ech = /^\[\s*(ech|ven)/i
var tds = $("td.sujetCase3");
var refreshInterval;


if(!$.cookie(cookieSearchValue))
	$.cookie(cookieSearchValue,searchString);
else
	searchString = $.cookie(cookieSearchValue);

if(!$.cookie(cookieRateValue))
	$.cookie(cookieRateValue,autorefreshRate);
else
	autorefreshRate = $.cookie(cookieRateValue);

if(!$.cookie(cookieAutorefreshValue))
	$.cookie(cookieAutorefreshValue,(autorefreshValue)?"1":"0");
else
	autorefreshValue = ($.cookie(cookieAutorefreshValue) == "1");

if(!$.cookie(cookieFadeValue))
	$.cookie(cookieFadeValue,(fade)?"1":"0");
else
	fade = ($.cookie(cookieFadeValue) == "1");
	
if(!$.cookie(colorizeValue))
	$.cookie(colorizeValue,(colorize)?"1":"0");
else
	colorize = ($.cookie(colorizeValue) == "1");

resetrows();
fadeProp = (fade)?"checked='checked'":"";
colorizeProp = (colorize)?"checked='checked'":"";
autorefreshProp = (autorefreshValue)?"checked='checked'":"";

$("body").append("\
	<div style='padding:5px 30px 5px 10px;position:fixed;left:0px;bottom:5px;z-index:1000;border:1px black solid;background-color:#FFFFFF;width:250px'>\
		<input type='text' id='mysearch' style='font-size:1.5em;' value='"+searchString+"' />\
        <a href='#' id='options'>Options</a>\
        <div id='block_options' style='width:100%'>\
            <ul style='list-style-type:none;margin:0;padding:0'>\
                <li style='padding:5px 0 0 0'><input  id='myfade' type='checkbox' "+fadeProp+" /> Effet Fondu </li>\
                <li style='padding:5px 0 0 0'><input  id='colorize' type='checkbox' "+colorizeProp+" /> Couleurs permanentes</li>\
                <li style='padding:5px 0 0 0'><input  id='autorefresh' type='checkbox' "+autorefreshProp+" /> Auto rafraîchissement </li>\
                <li style='padding:5px 0 0 0'>Période <input id='refreshrate' type='button' value='"+autorefreshRate+" mn' /> </li>\
            </ul>\
        </div> \
	</div>");
	
	
//reset rows display status
function resetrows() {
	tds.each(function(){
			$(this).parent("tr").show().fadeTo('fast', 1).children().css("background-color",default_background);
	});
	if(colorize){
		colorizeAll();
	}
}

function autorefresh(on){
    if(on)
        doAutorefresh();
    else
        stopAutorefresh();
}

function doAutorefresh(){
    refreshInterval = setInterval("location.reload()",autorefreshRate*1000*60);
}

function stopAutorefresh(){
    clearInterval(refreshInterval);
}

function colorizeLine(value,item){
	if(value.match(vds)){
		item.parent("tr").children().css("background-color", vds_background);
	}else if(value.match(ach)){
		item.parent("tr").children().css("background-color", ach_background);
	}else if(value.match(ech)){
		item.parent("tr").children().css("background-color", ech_background);
	}else{
		if(fade)
			item.parent("tr").fadeTo(fadeSpeed, fadeValue);
		else
			item.parent("tr").hide();
	}
}

function colorizeAll(){
	tds.each(function(){
		value = $(this).text();
		colorizeLine(value,$(this));
	});
}

//search function
function searchPattern() {
	resetrows();
	$.cookie(cookieSearchValue,searchString);
	if(searchString.length == 0) {return; }
	var pattern = new RegExp(searchString, "i");
	tds.each(function(){
		value = $(this).text();
		colorizeLine(value,$(this));
		if(!value.match(pattern)){
			if(fade)
				$(this).parent("tr").fadeTo(fadeSpeed, fadeValue);
			else
				$(this).parent("tr").hide();
		}
	});
}
	
$("#mysearch").css("width","100%").change(function(){
	searchString = $("#mysearch").val();
	searchPattern();
});

$("#myfade").click(
    function(){
        fade = $(this).is(":checked");
        searchPattern();
        $.cookie(cookieFadeValue,(fade)?"1":"0");
    }
);

$("#colorize").click(
    function(){
        colorize = $(this).is(":checked");
        searchPattern();
        $.cookie(colorizeValue,(colorize)?"1":"0");
    }
);

$("#autorefresh").click(
    function(){
        autorefreshValue = $(this).is(":checked");
        autorefresh(autorefreshValue);
        $.cookie(cookieAutorefreshValue,(autorefreshValue)?"1":"0");
    }
);

$("#refreshrate").click(
    function(){
        var rate;
        do{
             rate = prompt("Refresh rate", autorefreshRate);
        }while(isNaN(rate));
        autorefreshRate = rate;
        $(this).val(autorefreshRate+" mn");
        stopAutorefresh();
        autorefresh($("#autorefresh").is(":checked"));
        $.cookie(cookieRateValue,autorefreshRate);
    }
);

$("#options").click(
    function(){
        $("#block_options").toggle();
    }
);
searchPattern();
autorefresh(autorefreshValue);
$("#block_options").toggle();
