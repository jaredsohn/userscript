// ==UserScript==
// @name           Tatoeba Edit Insert Links
// @namespace      slomox_tatoeba_scripts
// @description    adds links to insert certain characters into the Tatoeba edit box
// @include        http://tatoeba.org/*
// ==/UserScript==

 window.addEventListener(
  'load',
      function () {
			var divs = document.getElementsByTagName('div');
			for (i=0;i<divs.length;i++) if (divs[i].id.match(/^translation_for_/)) {
				var id = divs[i].id.match(/\d+/);
				var box = document.createElement("div");
				var ibox = document.getElementById('translation_for_'+id).insertBefore(box, document.getElementById('translation_for_'+id).lastChild);
				ibox.innerHTML =
							"<a onclick=\"document.getElementById('_"+id+"_text').value += '’';document.getElementById('_"+id+"_text').focus();return false\" href=\"#\" title=\"Semicolon (as in isn’t); key: 1\" accesskey=\"1\"> ’ </a> &nbsp;"+
							"<a onclick=\"document.getElementById('_"+id+"_text').value += '„“';document.getElementById('_"+id+"_text').focus();return false\" href=\"#\" title=\"Key: 2\" accesskey=\"2\"> „“ </a>&nbsp;"+
							"<a onclick=\"document.getElementById('_"+id+"_text').value += '‚‘';document.getElementById('_"+id+"_text').focus();return false\" href=\"#\" title=\"Key: 3\" accesskey=\"3\"> ‚‘ </a>&nbsp;"+
							"<a onclick=\"document.getElementById('_"+id+"_text').value += '“”';document.getElementById('_"+id+"_text').focus();return false\" href=\"#\" title=\"Key: r\" accesskey=\"r\"> “” </a>&nbsp;"+
							"<a onclick=\"document.getElementById('_"+id+"_text').value += '‘’';document.getElementById('_"+id+"_text').focus();return false\" href=\"#\" title=\"Key: 5\" accesskey=\"5\"> ‘’ </a>&nbsp;"+
							"<a onclick=\"document.getElementById('_"+id+"_text').value += '“”';document.getElementById('_"+id+"_text').focus();return false\" href=\"#\" title=\"Key: 6\" accesskey=\"6\"> “” </a>&nbsp;"+
							"<a onclick=\"document.getElementById('_"+id+"_text').value += '«»';document.getElementById('_"+id+"_text').focus();return false\" href=\"#\" title=\"Key: 7\" accesskey=\"7\"> «» </a>&nbsp;"+
							"<a onclick=\"document.getElementById('_"+id+"_text').value += '‹›';document.getElementById('_"+id+"_text').focus();return false\" href=\"#\" title=\"Key: 8\" accesskey=\"8\"> ‹› </a>&nbsp;"+
							"<a onclick=\"document.getElementById('_"+id+"_text').value += '»«';document.getElementById('_"+id+"_text').focus();return false\" href=\"#\" title=\"Key: 9\" accesskey=\"9\"> »« </a>&nbsp;"+
							"<a onclick=\"document.getElementById('_"+id+"_text').value += '›‹';document.getElementById('_"+id+"_text').focus();return false\" href=\"#\" title=\"Key: 0\" accesskey=\"0\"> ›‹ </a>&nbsp;"+
							"<a onclick=\"document.getElementById('_"+id+"_text').value += '¿';document.getElementById('_"+id+"_text').focus();return false\" href=\"#\" title=\"Key: q\" accesskey=\"q\"> ¿ </a>&nbsp;"+
							"<a onclick=\"document.getElementById('_"+id+"_text').value += '¡';document.getElementById('_"+id+"_text').focus();return false\" href=\"#\" title=\"Key: e\" accesskey=\"e\"> ¡ </a>&nbsp;"+
							"<a onclick=\"document.getElementById('_"+id+"_text').value += '…';document.getElementById('_"+id+"_text').focus();return false\" href=\"#\" title=\"Key: .\" accesskey=\".\"> … </a>&nbsp;"+
							"<a onclick=\"document.getElementById('_"+id+"_text').value += '–';document.getElementById('_"+id+"_text').focus();return false\" href=\"#\" title=\"Key: -\" accesskey=\"-\"> – </a>";
			}
      },
  false
);