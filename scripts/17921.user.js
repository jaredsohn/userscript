// ==UserScript==
// @name OGame : Smilies
// @author Black Cat
// @description OGame : Smilies in messages
// @include http://*/game/index.php?page=messages*
// @include http://*/game/index.php?page=writemessages*
// @include http://*/game/index.php?page=allianzen*&a=17*
// @exclude	   
// ==/UserScript==

(function(){

	smilies = new Array();
	smilies.push(new Array(":D","http://board.ogame.org/en_images_ogame/smilies/biggrin.gif"));
	smilies.push(new Array(":tongue:","http://board.ogame.org/en_images_ogame/smilies/tongue2.gif"));
	smilies.push(new Array(":evil:","http://board.ogame.org/en_images_ogame/smilies/evil.gif"));
	smilies.push(new Array(":baby:","http://board.ogame.org/en_images_ogame/smilies/baby.gif"));
	smilies.push(new Array(":rolleyes:","http://board.ogame.org/en_images_ogame/smilies/rolleyes.gif"));
	smilies.push(new Array(";)","http://board.ogame.org/en_images_ogame/smilies/wink.gif"));
	smilies.push(new Array(":P","http://board.ogame.org/en_images_ogame/smilies/tongue.gif"));
	smilies.push(new Array(":)","http://board.ogame.org/en_images_ogame/smilies/smile.gif"));
	smilies.push(new Array("X(","http://board.ogame.org/en_images_ogame/smilies/mad.gif"));
	smilies.push(new Array(":))","http://board.ogame.org/en_images_ogame/smilies/happy.gif"));
	smilies.push(new Array(":O","http://board.ogame.org/en_images_ogame/smilies/redface.gif"));
	smilies.push(new Array("?(","http://board.ogame.org/en_images_ogame/smilies/confused.gif"));
	smilies.push(new Array("8-)","http://board.ogame.org/en_images_ogame/smilies/cool.gif"));
	smilies.push(new Array(";(","http://board.ogame.org/en_images_ogame/smilies/crying.gif"));
	smilies.push(new Array("8o","http://board.ogame.org/en_images_ogame/smilies/eek.gif"));
	smilies.push(new Array(":]","http://board.ogame.org/en_images_ogame/smilies/pleased.gif"));
	smilies.push(new Array(":(","http://board.ogame.org/en_images_ogame/smilies/frown.gif"));
	smilies.push(new Array(":supa:","http://board.ogame.de/de_images/smilies/applaus.gif"));
	smilies.push(new Array(":ra:","http://board.ogame.de/de_images/smilies/rauch08.gif"));

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
			for (var j = 0; j < 2*messages.snapshotLength; j++) {
				var thisMessage = messages.snapshotItem(Math.floor(j/2)); // Replace twice
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
})();