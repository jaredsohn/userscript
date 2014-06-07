// ==UserScript==
// @name       Division Domination
// @namespace  http://sugarfree.is.sexy.com
// @version    1.0
// @description  Use it wisely plox
// @include    http://*erepublik.com/*/military/battlefield/*
// ==/UserScript==

var p = unsafeWindow;
  
// chrome 
if(window.navigator.vendor.match(/Google/)) {
  var div = document.createElement("div");
  div.setAttribute("onclick", "return window;");
  p = div.onclick();
};
var jQuery = $j = $ = p.jQuery;
var SERVER_DATA = p.SERVER_DATA; // I have no idea what I'm doing lol

function roundNumber(num, dec) {
  var result = Math.round(num*Math.pow(10,dec))/Math.pow(10,dec);
  return result;
}

// Division domination
function getDivisionDom(bID) {
  $j.ajax({
    type: 'GET',
    url: "http://www.erepublik.com/en/military/battle-log/"+bID,
    dataType: 'json',
    timeout: 15000,
    success: function(data) {
      $("div.campaign_details .div1 .cz3 span")[0].innerHTML = roundNumber(data["division"]["domination"]["1"], 1)+"%";
      $("div.campaign_details .div2 .cz3 span")[0].innerHTML = roundNumber(data["division"]["domination"]["2"], 1)+"%";
      $("div.campaign_details .div3 .cz3 span")[0].innerHTML = roundNumber(data["division"]["domination"]["3"], 1)+"%";
      $("div.campaign_details .div4 .cz3 span")[0].innerHTML = roundNumber(data["division"]["domination"]["4"], 1)+"%";
    },
    error:function (xhr, ajaxOptions, thrownError) {}
  });
  setTimeout(function () { getDivisionDom(divBattleID); }, 60000);
}

// Do fun things here
$("div.campaign_details .div1 .cz3 span").css("font-size", "10px");
$("div.campaign_details .div2 .cz3 span").css("font-size", "10px");
$("div.campaign_details .div3 .cz3 span").css("font-size", "10px");
$("div.campaign_details .div4 .cz3 span").css("font-size", "10px");

try {
  var curl = location.href;
  if (curl == null || curl == undefined || curl == 'undefined') {
    curl = window.location.href;
  }
  if(curl.search(/military\/battlefield/i) != -1) {
    var curlparts = curl.split('/');
    var bId = curlparts[curlparts.length - 1];
    bId = bId.split('?')[0];
    bId = bId.replace(/[^0-9]/g, '');
    divBattleID = bId;
    getDivisionDom(divBattleID);
  }
}
catch (err) {}

// sugarfree is the sweetest sugarfree sugar ever