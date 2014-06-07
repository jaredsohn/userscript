// ==UserScript==
// @name OGame : Smilies
// @description OGame : Smilies in messages
// @include http://*/game/index.php?page=messages*
// @include http://*/game/index.php?page=writemessages*
// @include http://*/game/index.php?page=allianzen*&a=17*
// @exclude	
// *Script edit by Phoenix Achill @ Uni50
// ==/UserScript==

smilies = new Array();
smilies.push(new Array("[img]http://www.abload.de/img/smiletycf.png[/img]","http://www.abload.de/img/smiletycf.png"));
smilies.push(new Array("[img]http://www.abload.de/img/shockedhpka.png[/img]","http://www.abload.de/img/shockedhpka.png"));
smilies.push(new Array("[img]http://www.abload.de/img/sad0pyy.png[/img]","http://www.abload.de/img/sad0pyy.png"));
smilies.push(new Array("[img]http://www.abload.de/img/rolleyes7ptf.png[/img]","http://www.abload.de/img/rolleyes7ptf.png"));
smilies.push(new Array("[img]http://www.abload.de/img/jokinglyryq3.png[/img]","http://www.abload.de/img/jokinglyryq3.png"));
smilies.push(new Array("[img]http://www.abload.de/img/cry5ova.png[/img]","http://www.abload.de/img/cry5ova.png"));
smilies.push(new Array("[img]http://www.abload.de/img/evil8m91.png[/img]","http://www.abload.de/img/evil8m91.png"));
smilies.push(new Array("[img]http://www.abload.de/img/happybt0n.png[/img]","http://www.abload.de/img/happybt0n.png"));
smilies.push(new Array("[img]http://www.abload.de/img/aggrdmb1.png[/img]","http://www.abload.de/img/aggrdmb1.png"));


if (document.location.href.indexOf('=messages') != -1) {
	function sort_smilies(a,b) { return b[0].length-a[0].length; }
	smilies.sort(sort_smilies);
	var messages = document.evaluate("//tr/th/input[2]/../../preceding::tr[1]/td[@colspan and @class='b']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
	for (var i = 0; i < smilies.length; i++) {
		var smiley = smilies[i][0];
		smiley = smiley.replace(/\\/g,"\\\\");
		smiley = smiley.replace(/\[/g,"\\\[").replace(/\]/g,"\\\]");
		smiley = smiley.replace(/\(/g,"\\\(").replace(/\)/g,"\\\)");
		smiley = smiley.replace(/\{/g,"\\\{").replace(/\}/g,"\\\}");
		smiley = smiley.replace(/\./g,"\\\.").replace(/\+/g,"\\\+").replace(/\*/g,"\\\*").replace(/\?/g,"\\\?");
		smiley = smiley.replace(/\^/g,"\\\^").replace(/\$/g,"\\\$").replace(/\|/g,"\\\|").replace(/\-/g,"\\\-");
		var expression = new RegExp("(^|[^\"'])"+smiley+"([^\"']|$)","gi");
		for (var j = 0; j < messages.snapshotLength; j++) {
			var thisMessage = messages.snapshotItem(j);
			thisMessage.innerHTML = thisMessage.innerHTML.replace(expression,"$1<img src='"+smilies[i][1]+"' alt='"+smilies[i][0]+"' border='0' />$2");
		}
	}
} else {
	var script = document.createElement('span');
	script.innerHTML = '<script type="text/javascript" language="javascript">function addSmiley(smiley) { var message = document.getElementsByName("text")[0]; var str = " " + smiley; message.focus(); var start = message.selectionStart; var starttext = message.value.substring(0,start); var endtext = message.value.substring(message.selectionEnd,message.textLength); message.value = starttext + str + endtext; start += str.length; message.selectionStart = start; message.selectionEnd = start; message.focus(); }</script>';
	var form = document.getElementsByTagName('form')[0];
	form.parentNode.insertBefore(script,form);
	var table = document.evaluate("//textarea/ancestor::table[1]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;
	var row = document.createElement("tr");
	var cell = document.createElement("th");
	cell.setAttribute("colspan","2");
	row.appendChild(cell);
	table.appendChild(row);
	for (var i = 0; i < smilies.length; i++) {
		cell.innerHTML += "<a href=\"javascript:addSmiley('"+smilies[i][0]+"')\"><img src='"+smilies[i][1]+"' alt='"+smilies[i][0]+"' border='0' /></a> ";
	}
}