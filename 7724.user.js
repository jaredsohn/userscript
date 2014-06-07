// Terraserver Print GUI (navigation and options)
// version 1.2
// 2007-Feb-25 Created
// 2007-Apr-14 adjust fonts
// 2007-Apr-21 Disable from main page
// 2007-May-6  Work around PrintImage v. printimage
//             for grid print formats
// Copyright (c) 2007, Steve Miller
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.  To install it, you need
// Greasemonkey 0.3 or later: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Terraserver Print GUI", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Terraserver Print GUI
// @description   Repaints the print page allowing point and track overlays
// @include       http://www.terraserver-usa.com/PrintImage.aspx*
// ==/UserScript==

var tshref = window.location.href;
var tshrefcgi = "";
var tsArr = new Array();
tsArr = tshref.split('?');
tshref = tsArr[0] + "?";  // restore ? and reuse tshref
tshrefcgi = tsArr[1]; // take this apart for values in the cgi string
var parmStr = "STXY";
var S, T, X, Y;      // assign these as they come from the cgi string
var tsparms = new Array();
var tsparms = tshrefcgi.split('&');
tshrefcgi = "";
for (var i=0; i<tsparms.length; i++){
    if (parmStr.indexOf(tsparms[i].substring(0,1)) > -1 ){  // S, T, X, Y
        eval(tsparms[i]);  // eval to assign S, T, X, and Y  
    } else {
        tshrefcgi += "&" + tsparms[i];
    }
}


//var ctlHtml = "<div id=navDiv style='{position:absolute; top:0; left:0}'>";
var ctlHtml = "<div id=navDiv><table bgcolor='#eeeeee' width='100%'";
ctlHtml += " cellpadding=2 cellspacing=0><tr>";

ctlHtml += "<td align=center><a href=# ";
ctlHtml += " onclick=eval(\'window.location.replace(\\'";
ctlHtml += tshref + "T=" + T + "&S=" + S + "&X=" + X + "&Y=" + (Y+1) + tshrefcgi + "\\')\')";
ctlHtml += " title='Increase image Northing'";
ctlHtml += " style='{font-weight:normal; font-size:8pt;}'>North ^</a></td>";

ctlHtml += "<td align=center><a href=# ";
ctlHtml += " onclick=eval(\'window.location.replace(\\'";
ctlHtml += tshref + "T=" + T + "&S=" + S+ "&X=" + (X-1) + "&Y=" + Y + tshrefcgi + "\\')\')";
ctlHtml += " title='Decrease image Easting'";
ctlHtml += " style='{font-weight:normal; font-size:8pt;}'>&lt; West</a></td>";

ctlHtml += "<td align=center><a href=# ";
ctlHtml += " onclick=eval(\'window.location.replace(\\'";
ctlHtml += tshref + "T=" + T + "&S=" + S + "&X=" + (X+1) + "&Y=" + Y + tshrefcgi + "\\')\')";
ctlHtml += " title='Increase image Easting'";
ctlHtml += " style='{font-weight:normal; font-size:8pt;}'>East &gt;</a></td>";

ctlHtml += "<td align=center><a href=# ";
ctlHtml += " onclick=eval(\'window.location.replace(\\'";
ctlHtml += tshref + "T=" + T + "&S=" + S + "&X=" + X + "&Y=" + (Y-1) + tshrefcgi + "\\')\')";
ctlHtml += " title='Decrease image Northing'";
ctlHtml += " style='{font-weight:normal; font-size:8pt;}'>South v</a></td>";

ctlHtml += "<td align=center><a href=# ";
if (S<14) {
    ctlHtml += " onclick=eval(\'window.location.replace(\\'";
    ctlHtml += tshref + "T=" + T + "&S=" + (S+1);
    ctlHtml += "&X=" + Math.round(X/2) + "&Y=" + Math.round(Y/2) + tshrefcgi + "\\')\')";
} else {
    ctlHtml += " onclick=\'alert(\"Minimum Zoom Out\");\'";
}
ctlHtml += " title='Zoom In' id='in'";
ctlHtml += " style='{font-weight:normal; font-size:8pt;}'>Farther</a></td>";
ctlHtml += "<td align=center><a href=# ";
if (S>10) {
    ctlHtml += " onclick=eval(\'window.location.replace(\\'";
    ctlHtml += tshref + "T=" + T + "&S=" + (S-1);
    ctlHtml += "&X=" + (X*2) + "&Y=" + (Y*2) + tshrefcgi + "\\')\')";
} else {
    ctlHtml += " onclick=\'alert(\"Maximum Zoom In\");\'";
}
ctlHtml += " title='Zoom Out' id='out'";
ctlHtml += " style='{font-weight:normal; font-size:8pt;}'>Closer</a></td>";

ctlHtml += "<td align=center><a href=# ";
if (T==1) { //set button for topo
    ctlHtml += "onclick=eval(\'window.location.replace(\\'";
    ctlHtml += tshref + "T=2" + "&S=" + S + "&X=" + X + "&Y=" + Y + tshrefcgi + "\\')\')";
    ctlHtml += " title='Show Topo'";
    ctlHtml += " style='{font-weight:normal; font-size:8pt;}'>Topo</a></td></tr>"
} else {  //set button for photo
    ctlHtml += "onclick=eval(\'window.location.replace(\\'";
    ctlHtml += tshref + "T=1" + "&S=" + S + "&X=" + X + "&Y=" + Y + tshrefcgi + "\\')\')";
    ctlHtml += " title='Show Photo'";
    ctlHtml += " style='{font-weight:normal; font-size:8pt;}'>Photo</a></td></tr>"
}

ctlHtml += "</tr></table></div>";

var nav = document.createElement("div");
nav.innerHTML = ctlHtml;
if ((window.location.href.indexOf("PrintImage.aspx") > 0) ||
    (window.location.href.indexOf("printimage.aspx") > 0)){
    document.body.insertBefore(nav, document.body.firstChild);
    document.body.style.margin = '0px';
}