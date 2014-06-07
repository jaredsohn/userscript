// ==UserScript==
// @name Ogame NucleaR ASCII
// @description NucleaR ASCII
// @creator by Lorenz
// @version 1.1 b Works on the new Ogame
// @include http://*.ogame.*/game/index.php?page=showmessage*
// @include http://*.ogame.*/game/index.php?page=writemessage*
// @include http://*.ogame.*/game/index.php?page=alliance*
// ==/UserScript==

(function(){
        var smilies = new Array();
	smilies.push(new Array("♥","♥"));
	smilies.push(new Array("♫","♫"));
	smilies.push(new Array("§","§"));
	smilies.push(new Array("♂","♂"));
	smilies.push(new Array("♀","♀"));
	smilies.push(new Array("©","©"));
	smilies.push(new Array("®","®"));
	smilies.push(new Array("Ø","Ø"));
	smilies.push(new Array("¿","¿"));
	smilies.push(new Array("⊕","⊕"));
        smilies.push(new Array("™","™"));
        smilies.push(new Array("۞₪۞₪۞₪۞₪۞₪۞₪۞₪۞₪۞₪۞","۞₪۞₪۞₪۞₪۞₪۞₪۞₪۞₪۞₪۞"));
        smilies.push(new Array("•¤•¤•¤•¤•¤•¤•¤•¤•¤•¤•¤•¤•","•¤•¤•¤•¤•¤•¤•¤•¤•¤•¤•¤•¤•"));
        smilies.push(new Array("†~†~†~†~†~†††~†††~†~†~†~†~†","alè"));
        smilies.push(new Array("◄►◄►◄►◄►◄►","◄►◄►◄►◄►◄►"));

        var script = document.createElement("script");
	script.setAttribute("type","text/javascript");
	script.setAttribute("language","javascript");
	script.text = 
	'function addSmiley(smiley) {' +
		'var message = document.getElementsByName("text")[0];' +
		'var str = "" + smiley;' +
		'message.focus();' +
		'if (message.isTextEdit) {' +
			'var sel = document.selection;' +
			'var rng = sel.createRange();' +
			'rng.text = str;' +
			'rng.collapse(false);' +
			'rng.select();' +
		'} else {' +
			'var start = message.selectionStart;' +
			'var starttext = message.value.substring(0,start);' +
			'var endtext = message.value.substring(message.selectionEnd,message.textLength);' +
			'message.value = starttext + str + endtext;' +
			'start += str.length;' +
			'message.selectionStart = start;' +
			'message.selectionEnd = start;' +
		'}' +
		'message.focus();' +
	'}';
	document.body.appendChild(script);

	function funcSmilies() {
		var form = document.getElementsByTagName("form")[0];
		if (!form) return;
		var div = document.createElement("div");
		for (var i = 0; i < smilies.length; i++) {
			div.innerHTML += "<a href=\"javascript:addSmiley('"+smilies[i][0].replace(/'/g,"\\'")+"')\"><img src=\""+smilies[i][1]+"\" alt=\""+smilies[i][0]+"\" border='0' /></a> ";
		}
		div.style.textAlign = "center";
		div.style.height = "220px";
		div.style.overflow = "auto";
				
		var cell = document.getElementsByName("text")[0].parentNode;
		do {
			cell = cell.previousSibling;
		}while(cell && cell.nodeType != 1);
		if (cell) {
			div.style.width = "99%";
			cell.appendChild(document.createElement("br"));
			cell.appendChild(document.createElement("br"));
			cell.appendChild(div);
		} else {
			var message = document.getElementsByName("text")[0];
			var message_div = message.parentNode;
			var parentDiv = message_div;
			do {
				parentDiv = parentDiv.parentNode;
			}while(parentDiv && parentDiv.nodeName.toLowerCase() != "div");
			parentDiv.style.position = "relative";
			div.style.position = "absolute";
			div.style.width = "175px";
			div.style.marginLeft = "8px";
			if (parentDiv.className == "textWrapperSmall") {
				div.style.top = "5px";
			} else {
				div.style.top = "0%";
				div.style.marginTop = "80px";
			}
			message.style.width = "540px";
			message_div.style.width = "550px";
			message_div.style.marginLeft = "170px";
			message_div.parentNode.insertBefore(div, message_div);
		}
	}
  
	if (document.location.href.indexOf("page=alliance") != -1) {
		 
    var $;
		try { $ = unsafeWindow.$; }
		catch(e) { $ = window.$; }
		$("#eins").ajaxSuccess(function(e,xhr,settings){
			if (settings.url.indexOf("page=allianceBroadcast") == -1) return;

			funcSmilies();
		});
	} else {
		funcSmilies();
	}

	if (document.location.href.indexOf("page=showmessage") != -1) {
		function rep_smilies(value,index) {
			var text = value;
			for (var i = index; i < smilies.length; i++) {
				var smiley = smilies[i][0];
				smiley = smiley.replace(/([\\\[\](){}.+*?^$|-])/g,"\\$1");
				var expression = new RegExp(smiley,"i");
				var pos = value.search(expression);
				if (pos != -1) {
					var part1 = value.substring(0,pos);
					var part2 = value.substring(pos+smilies[i][0].length,value.length);
					text = rep_smilies(part1,i) + "<img src=\""+smilies[i][1]+"\" alt=\""+smilies[i][0]+"\" border='0' />" + rep_smilies(part2,i);
					break;
				}
			}
			return text;
		}

		function sort_smilies(a,b) { return b[0].length-a[0].length; }
		smilies.sort(sort_smilies);
		var divs = document.getElementById("messagebox").getElementsByTagName("div");
		var message;
		var i = 0;
		do {
			message = divs[i];
			i++;
		}while(message.className != "note");
		message.innerHTML = rep_smilies(message.innerHTML,0);
	}
})();