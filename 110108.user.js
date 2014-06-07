// ==UserScript==
// @name           geocaching fast send to gps
// @namespace      bcmpinc
// @include        http://www.geocaching.com/seek/*
// ==/UserScript==

var iframe;
var win;
var doc;

// Get list of elements using xpath
$$=function(expr,node){
	if (node===undefined) node=document;
	var res=document.evaluate(expr,node,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
	var a=new Array();
	for(var i=0;i<res.snapshotLength;i++)a[i]=res.snapshotItem(i);
	return a;
}

function createframe() {
    iframe = document.createElement('iframe');
    var ct = document.getElementById("ctl00_divContentSide")
    ct.innerHTML="";
    ct.appendChild(iframe);
    iframe.name = iframe.id = "garmin_frame";
    iframe.src="http://www.geocaching.com/0";
    iframe.style.position = "fixed";
}

function script(src) {
    var headID = doc.getElementsByTagName("head")[0];         
    var newScript = doc.createElement('script');
    newScript.type = 'text/javascript';
    headID.appendChild(newScript);
    if (src)
        newScript.src = src;
    return newScript;
}

function style(src) {
    var headID = doc.getElementsByTagName("head")[0];         
    var newStyle = doc.createElement('style');
    newStyle.type = 'text/css';
    headID.appendChild(newStyle);
    if (src)
        newStyle.innerHTML = src;
    return newStyle;
}

function loadGarmin() {
    script().innerHTML="\
    var cahce_id='1';\
    var cache_data='<gpx/>';\
    var display;\
    display = new Garmin.DeviceDisplay(\"garminDisplay\", {\
        pathKeyPairsArray: ['http://www.geocaching.com','456bcdf93f1266984e91420e857c504d'],\
        unlockOnPageLoad: false,\
        hideIfBrowserNotSupported: false,\
        showStatusElement: true,\
        autoFindDevices: true,\
        showReadDataElement: false,\
        showWriteDataElement: true,\
        showProgressBar: true,\
        showFindDevicesElement: true,\
        getWriteDataFileName: function(){ return cache_id } ,\
        getWriteData: function() { return cache_data.replace(/\\r?\\n/g, \"\\r\\n\"); } ,\
        afterFinishWriteToDevice: function(message, display) {\
            display.setStatus(\"Geocache \" + cache_id + \" saved successfully\");\
        }\
    });\
    //display.setStatus(\"No file set.\");\
    ";
}

function garminjs() {
    // Hook parseFloat, such that we can override Garmin's failing 'require' method.
    var oldParse = win.wrappedJSObject.parseFloat;
    win.wrappedJSObject.parseFloat = function(v) {
        win.wrappedJSObject.parseFloat = oldParse; // restore parseFloat
        win.wrappedJSObject.GarminDeviceDisplay.require = script; // override failing method.
        //alert("hooked");
        return oldParse(v);
    }
    win.wrappedJSObject.BrowserSupport={isBrowserSupported: function(){return true;}}
    doc.wrappedJSObject.write = function(t) { } // Garmin likes to use this function, but it destroys the page.
    
    script("http://www8.garmin.com/j/communicator-api-1.5.1/garmin/device/GarminDeviceDisplay.js"); //.addEventListener("load", loadGarmin, false);
}

function protojs() {
    script("/js/prototype.js"); //.addEventListener("load", garminjs, false);
    script();
    style("body {background: #ffc;}");
}

function load() { try{
    win = iframe.contentWindow;
    doc = iframe.contentDocument;
    //<html><head></head><body></body></html>
    html = '<div><object id="GarminActiveXControl" style="WIDTH: 0px; HEIGHT: 0px; visible: hidden" height="0" width="0" classid="CLSID:099B5A62-DE20-48C6-BF9E-290A9D1D8CB5">';
    html += '	<object id="GarminNetscapePlugin" type="application/vnd-garmin.mygarmin" width="0" height="0">&#160;</object>';
    html += '</object></div>';
    doc.body.innerHTML = '<div id="garminDisplay"></div>' + html;
    doc.body.id = "garminDisplay";
    protojs(); // load prototype library
    window.setTimeout(garminjs, 1000); // load garmin library
    window.setTimeout(loadGarmin, 2000); // create UI.
}catch(e){alert(e)}; }

try{
createframe();
window.setTimeout(load, 1000);
var links = $$("//a[@title='Send to GPS'][img]");
function addLinkAction(l) {
    // example: javascript:s2gps('581669');
    var c = l.href.match(/'(\d+)'/)[1];  
    l.href="javascript:";
    l.title = c;
    l.addEventListener("click", function() {
        GM_xmlhttpRequest({
          method:"GET",
          url:"http://www.geocaching.com/seek/sendtogps.aspx?wptid="+c,
          onload:function(details) {
              var t = details.responseText;
              try {
              win.wrappedJSObject.cache_id = t.match(/<textarea id="cacheID" rows="1" cols="7">(.*?\.gpx)<\/textarea/m)[1];
              win.wrappedJSObject.cache_data = t.match(/<textarea id="dataString" rows="22" cols="50">([\s\S]*?)<\/textarea>/m)[1];
              win.wrappedJSObject.display.setStatus("Ready to upload "+win.wrappedJSObject.cache_id);
                l.style.background="green";
              } catch(e) { alert(e); }
          }
        });
        l.style.background="orange";
    }, false);
}
for (i in links) {
    addLinkAction(links[i]);
}

}catch(e){alert(e)};