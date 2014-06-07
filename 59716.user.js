// ==UserScript==
// @name          clean elementool
// @description	  clean elementool
// @include       http://www.elementool.com/Services/BugTracking/ViewIssue.aspx
// @version       1
// ==/UserScript==

try{
var i = 0;
var oColl = document.getElementsByTagName("table");
var el = oColl[ oColl.length-1 ];
el.parentNode.removeChild( el );
var el = oColl[ 0 ];
//el.parentNode.removeChild( el );

if( document.getElementById("pnlIssueForm") ){
    document.getElementById("pnlIssueForm").style.width = "1200px";
}
document.getElementById("description").style.width = "1080px";
document.getElementById("description").style.height = "150px";
document.getElementById("steps_to_reproduce").style.width = "1080px";
document.getElementById("steps_to_reproduce").style.height = "50px";

var bEliminar = true;
var oOptions = document.getElementById("assigned_to").options;
var sValue = "";
for(i=oOptions.length-1; i>=0; i--){
    bEliminar = true;
    sValue = oOptions[i].getAttribute("value");
    if( sValue == "Andrea Alvarez" ) bEliminar = false;
    if( sValue == "Christina Rossello" ) bEliminar = false;
    if( sValue == "Hannah Taylor" ) bEliminar = false;
    if( sValue == "Hannah Bailey" ) bEliminar = false;
    if( sValue == "Ivan Fernandez" ) bEliminar = false;
    if( sValue == "Karen Mawbey" ) bEliminar = false;
    if( sValue == "Malcolm Ellis" ) bEliminar = false;
    if( sValue == "Eduardo Sanchez" ) bEliminar = false;
    if( sValue == "Xavier Godoy" ) bEliminar = false;
    if( bEliminar === true ) oOptions[i] = null;
}

bEliminar = true;
oOptions = document.getElementById("CC").options;
sValue = "";
for(i=oOptions.length-1; i>=0; i--){
    bEliminar = true;
    sValue = oOptions[i].getAttribute("value");
    if( sValue == "Andrea Alvarez" ) bEliminar = false;
    if( sValue == "Christina Rossello" ) bEliminar = false;
    if( sValue == "Hannah Taylor" ) bEliminar = false;
    if( sValue == "Hannah Bailey" ) bEliminar = false;
    if( sValue == "Ivan Fernandez" ) bEliminar = false;
    if( sValue == "Karen Mawbey" ) bEliminar = false;
    if( sValue == "Malcolm Ellis" ) bEliminar = false;
    if( sValue == "Eduardo Sanchez" ) bEliminar = false;
    if( sValue == "Xavier Godoy" ) bEliminar = false;
    if( bEliminar === true ) oOptions[i] = null;
}

document.getElementById("CC").style.height = "120px";
document.getElementById("remarks").style.width = "1080px";
document.getElementById("remarks").style.height = "50px";

var oSelects = document.getElementsByTagName("select");

for (i=0; i<oSelects.length; i++){
    oSelects[i].style.width = "185px";
};

document.getElementById('History_grdHistory').style.display = "none";
var s = '<td class="regulartext">';
s += '<a href="javascript:';
s += "var o=document.getElementById('History_grdHistory');void(o.style.display=(o.style.display=='none')?'':'none')";
s += '">';
s += '<b>History Trail</b></a></td>';
document.getElementById("History_boardTitle").innerHTML = s;
}
catch(e){}