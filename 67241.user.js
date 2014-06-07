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

smilies.push(new Array("[img]http://www.world-of-smilies.com/wos_ugly/m07700.gif[/img]","http://www.world-of-smilies.com/wos_ugly/m07700.gif"));

smilies.push(new Array("[img]http://www.world-of-smilies.com/wos_ugly/m0910.gif[/img]","http://www.world-of-smilies.com/wos_ugly/m0910.gif"));

smilies.push(new Array("[img]http://www.world-of-smilies.com/wos_sonstige/spammergerufen000.gif[/img]","http://www.world-of-smilies.com/wos_sonstige/spammergerufen000.gif"));

smilies.push(new Array("[img]http://www.world-of-smilies.com/wos_sonstige/sprech_03.gif[/img]","http://www.world-of-smilies.com/wos_sonstige/sprech_03.gif"));

smilies.push(new Array("[img]http://www.smilies.4-user.de/include/Schilder/smilie_d_002.gif[/img]","http://www.smilies.4-user.de/include/Schilder/smilie_d_002.gif"));

smilies.push(new Array("[img]http://www.smilies.4-user.de/include/Schilder/smilie_h_001.gif[/img]","http://www.smilies.4-user.de/include/Schilder/smilie_h_001.gif"));

smilies.push(new Array("[img]http://www.smilies.4-user.de/include/Schilder/smilie_schild_031.gif[/img]","http://www.smilies.4-user.de/include/Schilder/smilie_schild_031.gif"));

smilies.push(new Array("[img]http://www.smilies.4-user.de/include/Schilder/smilie_schild_039.gif[/img]","http://www.smilies.4-user.de/include/Schilder/smilie_schild_039.gif"));

smilies.push(new Array("[img]http://www.smilies.4-user.de/include/Schilder/smilie_w_010.gif[/img]","http://www.smilies.4-user.de/include/Schilder/smilie_w_010.gif"));

smilies.push(new Array("[img]http://www.smilies.4-user.de/include/SML/smilie_x_037.gif[/img]","http://www.smilies.4-user.de/include/SML/smilie_x_037.gif"));

smilies.push(new Array("[img]http://www.smilies.4-user.de/include/Huepfen/smilie_hops_128.gif[/img]","http://www.smilies.4-user.de/include/Huepfen/smilie_hops_128.gif"));

smilies.push(new Array("[img]http://www.smilies.4-user.de/include/Schilder/smilie_p_002.gif[/img]","http://www.smilies.4-user.de/include/Schilder/smilie_p_002.gif"));

smilies.push(new Array("[img]http://www.smilies.4-user.de/include/Schilder/smilie_o_008.gif[/img]","http://www.smilies.4-user.de/include/Schilder/smilie_o_008.gif"));

smilies.push(new Array("[img]http://www.smilies.4-user.de/include/Schilder/smilie_schild_027.gif[/img]","http://www.smilies.4-user.de/include/Schilder/smilie_schild_027.gif"));

smilies.push(new Array("[img]http://www.smilies.4-user.de/include/Froehlich/smilie_happy_309.gif[/img]","http://www.smilies.4-user.de/include/Froehlich/smilie_happy_309.gif"));

smilies.push(new Array("[img]http://www.smilies.4-user.de/include/SML/smilie_x_060.gif[/img]","http://www.smilies.4-user.de/include/SML/smilie_x_060.gif"));

smilies.push(new Array("[img]http://www.smilies.4-user.de/include/Frech/smilie_frech_060.gif[/img]","http://www.smilies.4-user.de/include/Frech/smilie_frech_060.gif"));

smilies.push(new Array("[img]http://www.smilies.4-user.de/include/Computer/smilie_pc_139.gif[/img]","http://www.smilies.4-user.de/include/Computer/smilie_pc_139.gif"));

smilies.push(new Array("[img]http://www.smilies.4-user.de/include/Krank/smilie_krank_105.gif[/img]","http://www.smilies.4-user.de/include/Krank/smilie_krank_105.gif"));

smilies.push(new Array("[img]http://www.smilies.4-user.de/include/Bad/smilie_bad_18.gif[/img]","http://www.smilies.4-user.de/include/Bad/smilie_bad_18.gif"));

smilies.push(new Array("[img]http://www.smilies.4-user.de/include/Optimismus/smilie_op_037.gif[/img]","http://www.smilies.4-user.de/include/Optimismus/smilie_op_037.gif"));

smilies.push(new Array("[img]http://www.smilies.4-user.de/include/Schock/smilie_sh_013.gif[/img]","http://www.smilies.4-user.de/include/Schock/smilie_sh_013.gif"));

smilies.push(new Array("[img]http://www.smilies.4-user.de/include/Schock/smilie_sh_062.gif[/img]","http://www.smilies.4-user.de/include/Schock/smilie_sh_062.gif"));

smilies.push(new Array("[img]http://www.smilies.4-user.de/include/Raucher/raucher_smilie_95.gif[/img]","http://www.smilies.4-user.de/include/Raucher/raucher_smilie_95.gif"));

smilies.push(new Array("[img]http://www.smilies.4-user.de/include/Verkleidet/smilie_verkl_012.gif[/img]","http://www.smilies.4-user.de/include/Verkleidet/smilie_verkl_012.gif"));

smilies.push(new Array("[img]http://www.smilies.4-user.de/include/SML/smilie_x_002.gif[/img]","http://www.smilies.4-user.de/include/SML/smilie_x_002.gif"));

smilies.push(new Array("[img]http://www.smilies.4-user.de/include/Froehlich/smilie_happy_008.gif[/img]","http://www.smilies.4-user.de/include/Froehlich/smilie_happy_008.gif"));

smilies.push(new Array("[img]http://www.smilies.4-user.de/include/Froehlich/smilie_happy_011.gif[/img]","http://www.smilies.4-user.de/include/Froehlich/smilie_happy_011.gif"));

smilies.push(new Array("[img]http://www.smilies.4-user.de/include/Musik/floeten_smilie_122.gif[/img]","http://www.smilies.4-user.de/include/Musik/floeten_smilie_122.gif"));

smilies.push(new Array("[img]http://www.smilies.4-user.de/include/Tanzen/smilie_tanz_006.gif[/img]","http://www.smilies.4-user.de/include/Tanzen/smilie_tanz_006.gif"));




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