// ==UserScript==
// @name           RTM Keyboard Shortcuts
// @namespace      http://d.hatena.ne.jp/a_kimura/
// @description    Show the keyboard shortcuts of Remember The Milk on the right. And this goes up and down with scrolling window. 
// @include        http://www.rememberthemilk.com/home/*
// ==/UserScript==

var shortcut = '<table class="tblbasic" align="right"><tbody><tr><td><b>t</b></td><td>Add</td></tr><tr><td><b>c</b></td><td>Complete</td></tr><tr><td><b>p</b></td><td>Postpone</td></tr><tr><td><b>d</b></td><td>Due Date</td></tr><tr><td><b>f</b></td><td>Repeat</td></tr><tr><td><b>g</b></td><td>Time Estimate</td></tr><tr><td><b>s</b></td><td>Tags</td></tr><tr><td><b>u</b></td><td>URL</td></tr><tr><td><b>l</b></td><td>Location</td></tr><tr><td><b>y</b></td><td>Add Note</td></tr><tr><td><b>r</b></td><td>Rename</td></tr><tr><td><b>z</b></td><td>Undo</td></tr><tr><td><b>1</b></td><td>Priority 1</td></tr><tr><td><b>2</b></td><td>Priority 2</td></tr><tr><td><b>3</b></td><td>Priority 3</td></tr><tr><td><b>4</b></td><td>No Priority</td></tr><tr><td><b>&lt;Del&gt;</b></td><td>Delete</td></tr><tr><td><b>a</b></td><td>Select All</td></tr><tr><td><b>n</b></td><td>Select None</td></tr><tr><td><b>k</b></td><td>Move Up</td></tr><tr><td><b>j</b></td><td>Move Down</td></tr><tr><td><b>i</b></td><td>Select Item</td></tr><tr><td><b>h</b></td><td>Switch Tabs</td></tr><tr><td><b>m</b></td><td>Multi-edit</td></tr><tr><td><b>&lt;Tab&gt;</b></td><td>Tab</td></tr><tr><td><b>&lt;Esc&gt;</b></td><td>Escape</td></tr></tbody></table><br clear="all"/><table class="tblbasic" align="right"><tbody><tr><td><b>&lt;Ctrl&gt;+&lt;Shift&gt;+/</b></td></tr><tr><td align="right">Search</td></tr><tr><td><b>&lt;Ctrl&gt;+&lt;Shift&gt;+6</b></td></tr><tr><td align="right">Switch to Overview</td></tr><tr><td><b>&lt;Ctrl&gt;+&lt;Shift&gt;+7</b></td></tr><tr><td align="right">Switch to Tasks</td></tr><tr><td><b>&lt;Ctrl&gt;+&lt;Shift&gt;+8</b></td></tr><tr><td align="right">Switch to Locations</td></tr><tr><td><b>&lt;Ctrl&gt;+&lt;Shift&gt;+9</b></td></tr><tr><td align="right">Switch to Contacts</td></tr><tr><td><b>&lt;Ctrl&gt;+&lt;Shift&gt;+0</b></td></tr><tr><td align="right">Switch to Settings</td></tr><tr><td><b>&lt;Ctrl&gt;+&lt;Shift&gt;+&lt;Right&gt;</b></td></tr><tr><td align="right">Move Next</td></tr><tr><td><b>&lt;Ctrl&gt;+&lt;Shift&gt;+&lt;Left&gt;</b></td></tr><tr><td align="right">Move Previous</td></tr><tr><td><b>&lt;Ctrl&gt;+&lt;Shift&gt;+l</b></td></tr><tr><td align="right">Login</td></tr></tbody></table>';
var css = "#_shortcut{position:absolute;top:0;right:0;font-size:70%;}#_shortcut .tblbasic{background-color:#FFF;} #_shortcut .tblbasic td{padding:0;}";
var d = document;
var $ = function(id) { return d.getElementById(id); }
var $x = function(xp) { return d.evaluate(xp, d, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue; }
var $a = function(xp) { var r = d.evaluate(xp, d, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null); var a=[]; for(var i=0; i<r.snapshotLength; i++){ a.push(r.snapshotItem(i)); } return a; }
var $e = function(e,t,f) { if (!e) return; e.addEventListener(t, f, false); }
var style = d.createElement("style");
style.type = "text/css";
style.innerHTML = css;
$x("//head").appendChild(style);
var div = d.createElement("div");
div.id = "_shortcut";
//div.style.display = "none";
div.innerHTML = shortcut;
d.body.appendChild(div);
$e(window, "scroll", function(){
	$("_shortcut").style.top = window.pageYOffset + "px";
});