// ==UserScript==
// @name           quick build
// @namespace      howtomakeladygagasayouch.com/pokerface
// @description    quick build blueprints
// @include        *.war-facts.com/view_colony.php?colony=*
// ==/UserScript==

	var mall = ""; // mall blueprint id
	var farm = "6"; // farm blueprint id

	// builds the lame input boxes
	var html = "<div style=\"width: 200px; margin: auto;\">";
	html += "<input type=\"button\" style=\"float: left;\"  value=\"+\" id=\"incF\" onclick=\"incFarm()\"/>";
	html += "<input style=\"width: 30px;\" type=\"text\" value=\"1\" id=\"fa\" />";
	html += "&nbsp;farms&nbsp;&nbsp;<input onclick=\"sendFarm(43, "+farm+")\" type=\"button\" value=\"build\"/>";
	html += "<br /><input type=\"button\" style=\"float: left;\" id=\"incM\" onclick=\"incM()\" value=\"+\"/>";
	html += "<input style=\"width: 30px;\" type=\"text\" id=\"ma\"  value=\"1\" />";
	html += "&nbsp;malls&nbsp;&nbsp;<input onclick=\"sendMall(43, "+mall+")\" type=\"button\" value=\"build\"/>";
	html += "</div><div><input onclick=\"setUp(43)\" type=\"button\" value=\"set shit up\" /></div>";
	
	// puts the inputs before the center tag
	var center =  document.evaluate("/html/body/div/div",document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null ).singleNodeValue;
	
	center.innerHTML = html+center.innerHTML;
	
	function incFarm(){
		num = document.getElementById('fa').value;
		num++;
		document.getElementById('fa').value = num;
	}