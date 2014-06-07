// ==UserScript==
// @name       Roblox Trade Helper
// @namespace  http://use.i.E.your.homepage/
// @version    2.0
// @description  A Special Tool that makes trading easier.
// @match      http://www.roblox.com/*
// @copyright  2012+, You
// @require http://code.jquery.com/jquery-latest.js
// ==/UserScript==
var website = "http://www.roblox.com/My/Money.aspx#/#TradeCurrency_tab";
var limitorder = "ctl00_ctl00_cphRoblox_cphMyRobloxContent_ctl00_LimitOrderRadioButton";
var give = "ctl00_ctl00_cphRoblox_cphMyRobloxContent_ctl00_HaveAmountTextBoxRestyle";
var want = "ctl00_ctl00_cphRoblox_cphMyRobloxContent_ctl00_WantAmountTextBox";
var givelist = "ctl00_ctl00_cphRoblox_cphMyRobloxContent_ctl00_HaveCurrencyDropDownList";
var wantlist = "ctl00_ctl00_cphRoblox_cphMyRobloxContent_ctl00_WantCurrencyDropDownList";
var submittradebutton = "ctl00_ctl00_cphRoblox_cphMyRobloxContent_ctl00_SubmitTradeButton";
var giveamount;
var wantamount;
var Tix_Trades = "CurrencyBidsPane";
var Bux_Trades = "CurrencyOffersPane";
var tixa = new Array(20);
var buxa = new Array(20);

var page_info;
var buxRate;
var tixRate;
var spread;
var amount;
var rcolumn;
var rtrade;
var ttrade;
var RobuxWrapper;
var TicketsWrapper;

var Hist = document.createElement('div');
Hist.id = "History";
Hist.style.position = "fixed";
Hist.style.top = "9%";
Hist.style.left = "0px";
Hist.style.overflow = "auto";
Hist.style.height = "24%";
Hist.style.width = "140px";
Hist.style.background = "#fef";
document.body.appendChild(Hist);


var pageUICode = "\
<style>\
.ttcell {width:6ex;border-collapse:collapse;border:2px solid #D0D0E8;font-family:\"Trebuchet MS\", Arial, Helvetica, sans-serif;text-align:center;}\
.tthcell {width:6ex;background-color:#FFDDCC;border-collapse:collapse;border:2px solid #D0D0E8;font-family:\"Trebuchet MS\", Arial, Helvetica, sans-serif;text-align:center;}\
.avcell {width:22ex;background-color:#FFDDCC;border-collapse:collapse;border:3px solid #D0D0E8;font-family:\"Trebuchet MS\", Arial, Helvetica, sans-serif;text-align:center;}\
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
<th class=\"tthcell\">SPREAD</th>\
<th class=\"tthcell\">TIX</th>\
</tr>\
<tr>\
<td class=\"ttcell\" id=\"buxvalueTT\"></td>\
<td class=\"ttcell\" id=\"spreadvalueTT\"></td>\
<td class=\"ttcell\" id=\"tixvalueTT\"></td>\
</tr>\
</table>\
<tr>\
<div class=\"avcell\">Trade Amount</div>\
<textarea id=\"TPadText\" style=\"text-align:center;left:20%;width:95%;\"></textarea>\
<button type=\"button\" id=\"TPadSubmit\">Save</button>\
<button type=\"button\" id=\"TPadClear\">Clear Hist</button>\
</tr>\
</div>\
";


var TTable = $.parseHTML(pageUICode);
$("body").append(TTable);

$("#TPadText").val(String(getCookie("TPadSave")));

$("#TPadSubmit").click(function(){
    var text = String($("#TPadText").val());
    setCookie("TPadSave",text, 365);
});

$("#TPadClear").click(function(){
    var text = "";
    setCookie("RTHHistory",text, 365);
});

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
//End Cookie API//

function autofill(){
    document.getElementById(limitorder).click();
    if (document.getElementById(givelist).value == "Robux"){
        giveamount = amount;
        if (spread>0)
        { 
            wantamount = Math.round(tixRate*amount)-1;
        }
        else
        {
            wantamount = Math.round((buxa[1][1])*amount)-1;
        }
    }
    if (document.getElementById(wantlist).value == "Robux"){
        wantamount = amount;
        if (spread>0)
        {
            giveamount = Math.round(buxRate*amount)+1;
        }
        else
        {
            giveamount =  Math.round(tixa[1][1]*amount)+1;
        }
    }
    document.getElementById(give).value = giveamount;
    document.getElementById(want).value = wantamount; 
}


function liveupdate(){
    document.getElementById("RobuxWrapper").innerHTML = RobuxWrapper;
    document.getElementById("TicketsWrapper").innerHTML = TicketsWrapper;
    if (document.URL == website){
        document.getElementsByClassName("RightColumn")[0].innerHTML = rcolumn;
        document.getElementById("RobuxPositions").innerHTML = rtrade;
        document.getElementById("TicketsPositions").innerHTML = ttrade;
        
        var pane = document.getElementById(Tix_Trades).getElementsByTagName('div')[0];
        pane = pane.getElementsByTagName('div');
        for(var i=0;i<20;i++) {
            tixa[i] = pane[i].innerHTML.replace(/,/g,"").split("@");
            tixa[i][1] = tixa[i][1].substr(0,tixa[i][1].lastIndexOf(":"));
            tixa[i][0] = parseFloat(tixa[i][0]);
            tixa[i][1] = parseFloat(tixa[i][1]);
        }
        pane = document.getElementById(Bux_Trades).getElementsByTagName('div')[0];
        pane = pane.getElementsByTagName('div');
        for(i=0;i<20;i++) {
            buxa[i] = pane[i].innerHTML.replace(/,/g,"").split("@");
            buxa[i][1] = buxa[i][1].substr(buxa[i][1].lastIndexOf(":")+1);
            buxa[i][0] = parseFloat(buxa[i][0]);
            buxa[i][1] = parseFloat(buxa[i][1]);
        }
    }
}

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
    amount = String($("#TPadText").val());
    RobuxWrapper = $(page_info).find("#RobuxWrapper").html();
    TicketsWrapper = $(page_info).find("#TicketsWrapper").html();
    rcolumn = $(page_info).find(".RightColumn").html();
    rtrade = $(page_info).find("#RobuxPositions").html();
    ttrade = $(page_info).find("#TicketsPositions").html();
    
    liveupdate();
    
    $("#buxvalueTT").text(buxRate);
    $("#tixvalueTT").text(tixRate);
    $("#spreadvalueTT").text(spread);
    
    Hist.innerHTML = String(getCookie("RTHHistory"));
    
    if (document.URL == website){
        autofill();
    }
}

updateTable();
setInterval(updateTable, 1000);

var text = "";
document.getElementById(submittradebutton).onclick = function() { 
    if (document.getElementById(wantlist).value == "Robux"){
        text += " "+giveamount+" Tix->"+amount+" Bux \n";
    }
    if (document.getElementById(givelist).value == "Robux"){
        text += " "+amount+" Bux->"+wantamount+" Tix \n";
    }
    text += Hist.innerText;
    //alert(text);
    setCookie("RTHHistory",text, 365);
};