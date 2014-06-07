// ==UserScript==

// @name           Fix Lokacija u cms-u

// @namespace      namespace

// @include

// ==/UserScript==

//alert("test");

var styleVar = "";
styleVar += "<style>";
styleVar += ".fw3k2_treeview_item_actions{float:right;}";
//styleVar += "a{font-size:24px;}";
styleVar += ".hierarchy_list{width:600px;}";
styleVar += ".hierarchy{width:600px;padding:5px;}";
styleVar += ".fw3k2_treeview_item{border:1px solid #e2e2e2;margin-top:5px;padding:2px;height:25px;}";
styleVar += "</style>";
document.getElementById("footer").innerHTML = styleVar;
document.getElementById("fw3k2_treeview_item_0").style.display = "none";
