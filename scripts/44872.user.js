// ==UserScript==
// @name           Olympian CR Converter
// @autor          Toranaga
// @description    Convert Ikariam combat reports for OLY forums
// @license        GPL version 3 or any later version (http://www.gnu.org/copyleft/gpl.html)
// @include        http://*.ikariam.*/*
// @exclude        http://board.ikariam.*/*
// ==/UserScript==


function formatLoot(html) {
	var ul = html.replace(/(.*)<ul.*?>(.*)<\/ul>(.*)/, "[/b]Loot:\n$2$3[b]");
	if (ul != html) {
		ul = ul.replace(/<span class="textLabel.*?<\/span>/g, "");
		ul = ul.replace(/<li class="(.*?)">(.*?)<\/li>/g, "[img]http://s7.ikariam.com/skin/resources/icon_$1.gif[/img]$2   ");
		GM_log(ul);
	}
	return ul;
}

function applyFormat(cell, clazz) {
	var result =
		trim(cell.innerHTML)
			.replace(/(.*)<img src="(.*?)".*?>(.*)/, "$1[img]http://s7.ikariam.com/$2[/img]$3")  // process images
			.replace(/(<a .*?>|<\/a>)/g, "")                                                     // remove links
			.replace(/(.*)<span class="loss.*?>(.*)<\/span>(.*)/, "$1[color=red]$2[/color]$3")   // losses in red
			.replace(/<span style.*?\/span>/g, "")                                               // remove Favourite Targets
			.replace(/<br>/g, "\n")                                                              // replace BRs with LFs
			.replace(/\(/, "{").replace(/\)/, "}")                                               // replace brackets (accidental smilies)
			.replace(/\s+/g, ' ')                                                                // purge whitespace
		;
	
		if (clazz && clazz.match(/(units|sum)/)) {
		return result;
	}
	
	if (clazz && clazz.match(/(winner|battle)/)) {
		if (clazz == 'winner') {
			result = formatLoot(result);
		}
		result = "[size=13][color=#333300][b]" + result + "[/b][/color][/size][hr]";
	}
	
	return '[center]' + result + '[/center]';
}

function getColspan(cs) {
 return (cs ? ' colspan="'+cs + '"' : '');
}

function getWidth(clazz) {
	if (!clazz) {
		return '';
	}
	
	if (clazz == 'sum') return ' width="160"';
	if (clazz == 'own') return ' width="60"';
	return ' width="60"';
}

function processReport() {
	var report = "";
	
	var rows = $x("//table[@id='ergebnis']/tbody/tr");
	for (var i = 0; i < rows.length - 1; i++) {
		report += "[tr]";
		var cells = rows[i].cells;
		for (var j = 0; j < cells.length; j++) {
			var td = cells[j];
			var clazz = td.getAttribute("class");
			report += '[td' + getColspan(td.getAttribute("colspan")) + getWidth(clazz) + ']';
			report += '[color=#000000]' + applyFormat(td, clazz) + '[/color]';
			report += '[/td]';
		}			
		report += "[/tr]";
	}
	
	createReport('[size=10][font=Trebuchet MS][color=#000000][center][table width="660" bgcolor="#FDF7DD"]\n' + report + '[/table][/center][/color][/font][/size]\n');
}

function createReport(code)
{
	var body = $("militaryAdvisorReportView");
	if (body == null) {
		return;
	}

	var container = document.createElement('div');
	container.setAttribute('align', 'center');
	
	var header = document.createElement('h3');
	header.setAttribute('style', 'font: bold 14px arial');
	header.innerHTML = 'Olympian Combat Report Converter';

	var textarea = document.createElement('textarea');
	textarea.setAttribute('style', 'font-family: courier');
	textarea.setAttribute('cols', '100');
	textarea.setAttribute('rows', '10');
	textarea.setAttribute('readonly', '');
	textarea.innerHTML = code;

	container.appendChild(header);
	container.appendChild(textarea);
	body.appendChild(container);
}

window.addEventListener('load',
function() {
	try {		
		if ($("militaryAdvisorReportView")) {
			processReport();
		}
	} catch (e) {
		GM_log("Error: " + e);
	}
}, true);

function $(id) {
	return document.getElementById(id);
}

function $X( xpath, root ) {
	var got = $x( xpath, root );
	return got instanceof Array ? got[0] : got;
}

function $x( xpath, root ) {
  var doc = root ? root.evaluate ? root : root.ownerDocument : document, next;
  var got = doc.evaluate( xpath, root||doc, null, 0, null ), result = [];
  switch (got.resultType) {
    case got.STRING_TYPE:
      return got.stringValue;
    case got.NUMBER_TYPE:
      return got.numberValue;
    case got.BOOLEAN_TYPE:
      return got.booleanValue;
    default:
      while (next = got.iterateNext())
		result.push( next );
      return result;
  }
}

function trim(str) {
	return str.replace(/(^\s*)|(\s*$)/g, "");
}