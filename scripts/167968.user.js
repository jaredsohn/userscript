// ==UserScript==
// @name       Userscripts.org better view
// @version    0.5
// @description  Better view for userscripts.org
// @match      http://userscripts.org/*
// @copyright  2013+, ich01
// @grant      none
// ==/UserScript==  
if (document.location.toString().indexOf("scripts/show")>-1) {
var td_headers = [];
var td_contents = [];
var el_summary = document.getElementsByClassName("script_summary")[0];
var el_summary2 = document.getElementsByClassName("script_summary")[1];
var scriptSummary = el_summary.getElementsByTagName("p")[0].childNodes[2].textContent;
td_headers[td_headers.length]= el_summary.getElementsByTagName("p")[0].childNodes[1].textContent;   
td_contents[td_contents.length]=el_summary.getElementsByTagName("p")[0].childNodes[2].textContent;  
for (var a = 1;a<el_summary2.childNodes.length;a=a+2) {
if (el_summary2.childNodes[a] && el_summary2.childNodes[a].textContent) {
    if (el_summary2.childNodes[a].childNodes.length==1) {
     td_headers[td_headers.length]=el_summary2.childNodes[a].textContent;   
     td_contents[td_contents.length]=el_summary2.childNodes[a].childNodes[0].outerHTML;   
    } else if (el_summary2.childNodes[a].childNodes.length==3) {
      td_contents[td_contents.length]=el_summary2.childNodes[a].childNodes[2].textContent; 
      td_headers[td_headers.length]=el_summary2.childNodes[a].childNodes[1].textContent;
    }
}
}
var s_el = document.getElementsByClassName("script_summary");
    for (var i=0;i<s_el.length;i++) {
     s_el[i].style.display="none";   
    }
var newElement = document.createElement("scriptsummary");
newElement.setAttribute("id","scriptsummary");
document.getElementById("content").insertBefore(newElement,document.getElementById("content").firstChild);
    var iHTMLnew = "<table style='margin:0px;border:2px solid black;border-radius:5px;'><tr>";
    for (var i = 0;i<td_headers.length;i++) {
        iHTMLnew = iHTMLnew + "<td style='font-weight:bold;'>"+td_headers[i]+"</td>";
    }
    iHTMLnew = iHTMLnew + "</tr><tr>";
    for (var i2 = 0;i2<td_contents.length;i2++) {
        iHTMLnew = iHTMLnew + "<td>"+td_contents[i2]+"</td>";
    }
iHTMLnew = iHTMLnew + "</tr></table>";    
document.getElementById("scriptsummary").innerHTML=iHTMLnew;
} else if (document.location.toString()=="http://userscripts.org/" || document.location.toString().indexOf("http://userscripts.org/#")>-1) {
 var newFrame = document.createElement("iframe");
 newFrame.setAttribute("src","http://userscripts.org/home/scripts");
    newFrame.setAttribute("style","width:100%;max-height:750px;min-height:250px;border:2px solid black;border-radius:5px;padding-top:5px;margin-bottom:8px;");
 document.getElementById("content").insertBefore(newFrame,document.getElementById("content").firstChild);   
} else if (self.location != top.location && document.location.toString().indexOf("home/scripts")>-1) {
 var clonedNode = document.getElementById("main").outerHTML;  
    for (var i =0;i<document.body.children.length;i++) {
     document.body.removeChild(document.body.children[i]);   
    }
    document.body.innerHTML=clonedNode;
    for (var i2 = 0;i2<document.getElementsByTagName("a").length;i2++) {
     document.getElementsByTagName("a")[i2].setAttribute("target","window.top");   
    }
} else if (document.location.toString().indexOf("scripts/fans")>-1) {
 var UL_ELEMENT = document.getElementById("content").getElementsByTagName("ul")[0];
 var LI_ELEMENTS = UL_ELEMENT.getElementsByTagName("li");
 var scriptFans = new Array();
    for (var i=0;i<LI_ELEMENTS.length;i++) {
     scriptFans[i] = new Array();  
     scriptFans[i][0] = LI_ELEMENTS[i].getElementsByTagName("img")[0].outerHTML.replace("s=16","s=32").replace("width=\"16\"","width=32").replace("height=\"16\"","height=32");
     scriptFans[i][1] = LI_ELEMENTS[i].getElementsByTagName("a")[0].outerHTML;      
    }
    var newInnerHTML = "<table cellpadding=1 cellspacing=2>";
    var increment = 1;
    if (scriptFans.length>50) {
     increment = 8;   
    }  else if (scriptFans.length>40) {
     increment = 7;   
    } else if (scriptFans.length>30) {
     increment = 6;
    } else if (scriptFans.length>19) {
     increment = 5;   
    } else if (scriptFans.length>15) {
     increment = 4;   
    } else if (scriptFans.length>11) {
     increment = 3;   
    } else if (scriptFans.length>5) {
     increment = 2;   
    }
    for (var i=0;i<scriptFans.length;i=i+increment) {
        newInnerHTML = newInnerHTML + "<tr>";
        for (var i2 = 0;i2<increment;i2++) {
        if (scriptFans[i+i2]) {
        newInnerHTML = newInnerHTML + "<td>"+ scriptFans[i+i2][0] + "</td><td>"+ scriptFans[i+i2][1] + "</td>";    
        }
    }
    newInnerHTML = newInnerHTML + "</tr>";
    }
    newInnerHTML = newInnerHTML + "</table>";
    var newElement = document.createElement("div");
    newElement.style.width="0px";
    newElement.innerHTML = newInnerHTML;
    document.getElementById("content").removeChild(UL_ELEMENT);
    document.getElementById("content").appendChild(newElement);
}
