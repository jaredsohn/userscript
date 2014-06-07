// ==UserScript==
// @name Trade Table
// @namespace nil
// @version 1.2
// @description Shows currency trading information from the kid's website roblox.com, and notifies the user when ideal trading conditions are met (spread >= 125). Also allows users to save text information like the price of the currency they've recently bought.
// @match http://www.roblox.com/*
// @exclude http://www.roblox.com/userads/*
// @copyright 2013+ Nicholas L. Fenner
// @require http://code.jquery.com/jquery-latest.js
// ==/UserScript==

//Cookie API//
function getCookie(c_name){
    var i,x,y,ARRcookies=document.cookie.split(";");
    for (i=0;i<ARRcookies.length;i++){
        x=ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
        y=ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
        x=x.replace(/^\s+|\s+$/g,"");
        if (x==c_name){
            return unescape(y);
        }
    }
}

function setCookie(c_name,value,exdays){
    var exdate=new Date();
    exdate.setDate(exdate.getDate() + exdays);
    var c_value=escape(value) + ((exdays==null) ? "" : "; expires="+exdate.toUTCString());
    document.cookie=c_name + "=" + c_value;
}
//Cookie API//

//Scrape the screen for values.
var page_info;
var spread;
var buxRate;
var tixRate;

var pageUICode = "\
<style>\
.ttcell {width:6ex;border-collapse:collapse;border:2px solid #D0D0E8;font-family:\"Trebuchet MS\", Arial, Helvetica, sans-serif;text-align:center;}\
.tthcell {width:6ex;background-color:#FFDDCC;border-collapse:collapse;border:2px solid #D0D0E8;font-family:\"Trebuchet MS\", Arial, Helvetica, sans-serif;text-align:center;}\
.TradeCellWindows {border:2px solid #D0D0E8;background-color:#FFEEDD;font-size:8pt;position:absolute;}\
#TTContainer {font-size:8pt;position:fixed;top:35%;left:2px;width:13em;height:17em;\
</style>\
<div id=\"TTContainer\">\
	<table id=\"TradingTable\" style=\"background-color:#FFEEDD;border-collapse:collapse;width:100%;height:50%;position:relative;left:0em;top:0px;border:2px solid #D0D0E8;font-family:\"Trebuchet MS\", Arial, Helvetica, sans-serif;text-align:center;\">\
        <tr>\
            <th class=\"tthcell\">TRADING</th>\
            <th class=\"tthcell\">&mdash;</th>\
            <th class=\"tthcell\">TABLE</th>\
        </tr>\
        <tr>\
            <th class=\"tthcell\">BUX</th>\
            <th class=\"tthcell\">TIX</th>\
            <th class=\"tthcell\">SPREAD</th>\
        </tr>\
        <tr>\
            <td class=\"ttcell\" id=\"buxvalueTT\"></td>\
            <td class=\"ttcell\" id=\"tixvalueTT\"></td>\
            <td class=\"ttcell\" id=\"spreadvalueTT\"></td>\
        </tr>\
    </table>\
</div>\
";

var TTable = $.parseHTML(pageUICode);
$("body").append(TTable);

function updateTable(){
    $.ajax({
         async: false,
         type: 'GET',
         url: 'http://www.roblox.com/My/Money.aspx#/#TradeCurrency_tab',
         success: function(data) {
              page_info = data;
         }
    });
    
    buxRate = Number(String(page_info.match(/Rate.+\d+\.?\d*/g)).match(/\d+\.\d*/g)[0]);
    tixRate = Number(String(page_info.match(/Rate.+\d+\.?\d*/g)).match(/\d+\.\d*/g)[1]);
    spread = Number(String(page_info.match(/Spread:.+\d+/g)).match(/\-?\d+/g));
    
    $("#buxvalueTT").text(buxRate);
    $("#tixvalueTT").text(tixRate);
    $("#spreadvalueTT").text(spread);
    
}
updateTable();
setInterval(updateTable, 2500);

var flashBool = true;
function obnoxFlash(){
    if(spread >= 125){
        if(flashBool){
            $(".ttcell").css("background-color", "#FFEEDD");
        }else{
            $(".ttcell").css("background-color", "#AAFF99");
        }
        flashBool = !flashBool;
    }else{
        if(spread < 125 && $(".ttcell").css("background-color") != "#FFEEDD"){
            $(".ttcell").css("background-color", "#FFEEDD");
        }
    }
}
setInterval(obnoxFlash, 250);

pageUICode = "\
<div id=\"TPadContainer\" class=\"TradeCellWindows\" style\"width:100%;height:50%;left:0%;bottom:0%;\">\
	<form>\
	<textarea id=\"TPadText\" style=\"text-align:left;left:20%;width:95%;\"></textarea>\
	<button type=\"button\" id=\"TPadSubmit\">Save</button>\
</div>\
";

var TPad = $.parseHTML(pageUICode);
$("#TTContainer").append(TPad);

$("#TPadText").val(String(getCookie("TPadSave")));

$("#TPadSubmit").click(function(){
    var text = String($("#TPadText").val());
    setCookie("TPadSave",text, 365);
});

/*$('#ctl00_ctl00_cphRoblox_cphMyRobloxContent_LimitOrderRadioButton').trigger('click');

$("#ctl00_ctl00_cphRoblox_cphMyRobloxContent_HaveCurrencyDropDownList").val("Robux");
$("#ctl00_ctl00_cphRoblox_cphMyRobloxContent_WantCurrencyDropDownList").val("Tickets");

if(confirm("Trade?")){
	$("[name='ctl00$ctl00$cphRoblox$cphMyRobloxContent$SubmitTradeButton']").trigger('click');
}*/