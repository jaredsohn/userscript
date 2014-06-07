// ==UserScript==    EVO Multi PM
// @name        EVO Multi PM
// @version        0.1
// @namespace        http://podd.net/evo
// @description        Message multiple people in evolution
// @include        http://ev5.neondragon.net/*
// @author        podd
// ==/UserScript==

GM_log("start");

var pageHandlers = new Array();
regPageHandler(/^\/alliances\/(.*)\/members/i, masspm);


// Generic functions
function getcoords(userstring) {
var startindex = userstring.indexOf("(");
var endindex = userstring.indexOf(")");
return userstring.substring(startindex,endindex+1);
}

function buildgenericurl(form) {
var workingform = document.getElementById( form );
var baseurl = '';
    for( e = 0; e < workingform.elements.length; e++ ) {
    if (e != 0) { baseurl += "&"; }
    baseurl += workingform.elements[e].name + "=" + escape(workingform.elements[e].value.replace('\n','<P>'));
    }
return baseurl;
}

// mass pm
function masspm() {

unsafeWindow.hidesubmit = function() {
document.getElementById('submitform').elements[0].type = "submit";
}


unsafeWindow.sendpm = function (url,map) {

    GM_xmlhttpRequest({

    method: 'POST',
    url: 'http://ev5.neondragon.net/send_message',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        data: url,
    onload:  function(responseDetails) {
        GM_log('Success');
        var confirm = document.getElementById('confirmation');
            if (confirm) {
            var oldhtml = confirm.innerHTML;
            oldhtml += '<P style="margin: 0px 100px 10px 100px;">Message sent to:' + unsafeWindow.memberarray[map] +'</P>';
            confirm.innerHTML = oldhtml;
            }
        },
    onerror: function(responseDetails) {
        GM_log('Failure');
        GM_log(responseDetails.responseHeaders);
        GM_log(responseDetails.responseText);
        var confirm = document.getElementById('confirmation');
            if (confirm) {
            var oldhtml = confirm.innerHTML;
            oldhtml += '<P>FAILED:' + unsafeWindow.memberarray[map];
            confirm.innerHTML = oldhtml;
            }
        }
    });

}

unsafeWindow.sendmasspm = function() {

document.getElementById('submitform').elements[0].type = "hidden";
document.getElementById('confirmation').innerHTML = '';

    var baseurl = buildgenericurl("messageform");
    baseurl = "&totype=coords&" + baseurl.replace(" ","+");


// build selected users array
  const selectedArray = new Array();
  const selectedArraymap = new Array();

  var selObj = document.getElementById('alliancelist').elements[0];
  var i;
  var count = 0;
  for (i=0; i<selObj.options.length; i++) {
    if (selObj.options[i].selected) {
      selectedArray[count] = unsafeWindow.coordarray[i];
      selectedArraymap[count] = i;
      count++;
    }
  }
if (count == 0) {alert("Select someone to pm"); return false;}
else {

j = 0;
while (selectedArray[j]) {

var cleancoords = '';
cleancoords = selectedArray[j].replace(")","");
cleancoords = cleancoords.replace("(","");

var coordx = cleancoords.substring(0,cleancoords.indexOf(","));
cleancoords = cleancoords.replace(coordx + ",","");

var coordy = cleancoords.substring(0,cleancoords.indexOf(","));
cleancoords = cleancoords.replace(coordy + ",","");

var coordz = cleancoords.substring(0,cleancoords.indexOf(":"));
cleancoords = cleancoords.replace(coordz + ":","");

var coordc = cleancoords;

url = "x=" + coordx + "&y=" + coordy + "&z=" + coordz + "&c=" + coordc + baseurl;
GM_log(url);
setTimeout('sendpm("' + url + '",' + selectedArraymap[j]  + ')', (1000 * j));
j++;
}
setTimeout('hidesubmit()', (1000 * j + 1000));


}
 


}


unsafeWindow.memberarray = new Array();
unsafeWindow.coordarray = new Array();

pmnodes = document.evaluate('//table[@class="membertable"]//a', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);

var numberofmembers = pmnodes.snapshotLength;

        for( i = 0; i < numberofmembers; i++ ) {
        pmnode = pmnodes.snapshotItem(i).textContent;
        unsafeWindow.coordarray[i] = getcoords(pmnode);
        unsafeWindow.memberarray[i] = pmnode.replace(unsafeWindow.coordarray[i],"");
    }


var formhtml = '<table style="text-align:center;width:90%;"><tr><td><form name="alliancelist" id="alliancelist" action="" onsubmit="return false;" method="post" style="text-align:right;"><select name="allianceselect[]" multiple size="' + numberofmembers + '">';

    for( x = 0; optionuser = unsafeWindow.memberarray[x]; x++ ) {
    formhtml += '<option>' + optionuser + '</option>';
}


formhtml +='</select></form></td><td style="padding:10px;"><form name="messageform" id="messageform" action="" onsubmit="return false;" method="post"><input type="text" size="50" style="width:100%;"name="msgsubject" value="" /><BR><textarea rows="12" cols="40" style="width: 100%;"name="message" id="messagebox"></textarea></form><form name="submitform" id="submitform" onsubmit="return false;"><input type="submit" onclick="sendmasspm();" value="Send Message" /></form></td></tr></table><div id="confirmation" name="confirmation"></div>';


masspmformdiv = document.createElement("div");
masspmformdiv.innerHTML = formhtml;
masspmformdiv.id = 'masspmformdiv';

var placeholder = document.evaluate('id("alliancememberlist")//h3[1]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

thenode = placeholder.snapshotItem(0);
thenode.parentNode.insertBefore(masspmformdiv, thenode);

}

//
// ***************************************************************************
// ** MAIN
// ***************************************************************************
//
(function () {

    // Dispatch
    // -----------------------------------------------------------------------
    for(var i = 0; i < pageHandlers.length; i++ ) {
        if( pageHandlers[i].urlRegEx == null || pageHandlers[i].urlRegEx.test(document.location.pathname) )
            pageHandlers[i].handler();
    }

}) ();

// ***************************************************************************
// ** Objects
// ***************************************************************************

//
// Page Handler hooks
function pageHandler(urlRegEx, handler) {
    this.urlRegEx = urlRegEx;
    this.handler = handler;
}
function regPageHandler(urlRegEx, handler) {
    pageHandlers.push(new pageHandler(urlRegEx,  handler));
}

GM_log("end");