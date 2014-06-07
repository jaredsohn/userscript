// ==UserScript==
// @name        wse - wmi to runtime
// @author      Lin
// @namespace   http://userscripts.org/scripts/show/186110
// @include     https://wselinux1.pssc.mop.fr.ibm.com/tools/wse/wmi/*
// @include		https://localhost:8443/tools/wse/wmi/*
// @version     1
// @grant       none
// ==/UserScript==

function  trim(str){
    for(var  i  =  0  ;  i<str.length  &&  str.charAt(i)=="  "  ;  i++  )  ;
    for(var  j  =str.length;  j>0  &&  str.charAt(j-1)=="  "  ;  j--)  ;
    if(i>j)  return  "";  
    return  str.substring(i,j);  
} 

// Get table
var tables = document.getElementsByClassName("ibm-data-table ibm-alternating");
//alert(tables[0].innerHTML);
var table = tables[0];

// Get column number
var tHeads = table.getElementsByTagName("th");
for(i=0; i<tHeads.length; i++){
    if( tHeads[i].innerHTML.indexOf("Version") > -1 ){
//        alert("Version found! in column " + i);
        var colVer = i;
    }else if(  tHeads[i].innerHTML.indexOf("Application") > -1 ){
//        alert("Application name found! in column: " + i );
        var colApp = i;
    }
}

var tBody = table.getElementsByTagName("tbody")[0];
var tRows = tBody.getElementsByTagName("tr");
//alert(tRows[0].innerHTML);


var element = document.getElementById("ibm-leadspace-body");
var para = document.createElement("p");
para.innerHTML = "*<i>Go to eSolution runtime login page</i>:";
element.appendChild(para);

var last_app_ver = null;
for(i = 0; i <tRows.length; i++){
//    alert("rows = " + tRows.length);
    var tds = tRows[i].getElementsByTagName("td");
    
	// !!! "innerText" not working in firefox !!!
    //var app_ver = trim( tds[colApp-1].innerHTML ) + '/' + trim( tds[colVer-1].innerHTML );
	var app_ver = trim( tds[colApp-1].textContent ) + '/' + trim( tds[colVer-1].innerHTML );
//    alert(app_ver);

	if( last_app_ver == app_ver ){
		continue;
	}
    
    var pref = "https://wselinux1.pssc.mop.fr.ibm.com/tools/wse/runtime/test/protect/";
    var tail = "/login.wss"
    var link = pref + app_ver + tail;
//    alert(link);
    
    var para = document.createElement("p");
    para.innerHTML = "<a href=\"" +
        link +
        "\">" +
        app_ver +
        "</a>";
    element.appendChild(para);
    
/*    
    var para = document.createElement("p");
    var text=document.createTextNode(app_ver);
    para.appendChild(text);
    para.setAttribute("id", app_ver);
    element.appendChild(para);
    
    document.getElementById(app_ver).innerHTML = "<a href=\"" +
        link +
        "\">" +
        app_ver +
        "</a>";
*/

	last_app_ver = app_ver;
}



