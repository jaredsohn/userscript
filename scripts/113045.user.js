// ==UserScript==
// @name		TeenForumz Riceballs
// @description	Replaces the smileys in posts with Riceballs by dlanham on TeenForumz.
// @namespace	TeenForumz
// @include     http://*.teenforumz.com/*
// @version     0.2
// @author		Haydenish
// ==/UserScript==

var smilies = [
	
		[[':d', ':-d'], 'http://i.imgur.com/vy5wK.jpg'],
		[[':/', ':\\', ':-/', ':-\\'], 'http://i.imgur.com/uGfhC.jpg'],
		[[':@', ':-@'], 'http://i.imgur.com/SFjOG.jpg'],
		[[';)', ';-)'], 'http://i.imgur.com/UzgVg.jpg'],
		[['(Y)', '(y)'], 'http://i.imgur.com/BGnK4.jpg'],
		[['(N)', '(n)'], 'http://i.imgur.com/vwre0.jpg'],
		[[':P', ':-P', ':p', ':-p'], 'http://i.imgur.com/7LeW2.jpg'],
		[[':)', ':-)'], 'http://i.imgur.com/lLnP2.jpg'],
		[[':[[', '(sick)'], 'http://i.imgur.com/WFG7X.jpg'],
		[['o.O', 'o_O', 'O_o', 'O.o'], 'http://i.imgur.com/9xop4.jpg'],
		[['D:'], 'http://i.imgur.com/ARAku.jpg'],
		[[':B', ':-B', '8B', '8-B'], 'http://i.imgur.com/5veys.jpg'],
		[['P-['], 'http://i.imgur.com/4frfQ.jpg'],
		[['>:)', '>:-)'], 'http://i.imgur.com/c7e5E.jpg'],
		[['$)', '$-)'], 'http://i.imgur.com/pNtz3.jpg'],
		[[':D', ':-D'], 'http://i.imgur.com/61l8m.jpg'],
		[[':X', ':x', ':-X', ':-x'], 'http://i.imgur.com/JCXYV.jpg'],
		[[':O', ':-O', 'O_O', 'O.O'], 'http://i.imgur.com/SVkx2.jpg'],
		[['(A)', '(a)'], 'http://i.imgur.com/QnTbM.jpg'],
		[['-_-', '-.-'], 'http://i.imgur.com/JPgpc.jpg'], 
		[[':$', ':-$'], 'http://i.imgur.com/1l6VB.jpg'], 
		[[':glare:', ':glare:'], 'http://i.imgur.com/bRuws.jpg'],
		[['-.-\'\'', '-_-\'\'', '>.<\'\'', '<.<\'\'', '>.>\'\'', '>_<\'\'', '<_<\'\'', '>_>\'\''], 'http://i.imgur.com/bRuws.jpg'],
		[[':S', ':-S'], 'http://i.imgur.com/hKwMs.jpg'],
		[[':\'(', ';_;', ';(', ';-('], 'http://i.imgur.com/d1atQ.jpg'],
		[[':(', ':-('], 'http://i.imgur.com/9UmVP.jpg'],
		[['o.o\'\'', 'o_o\'\''], 'http://i.imgur.com/6sa3U.jpg'],
		[[':o', ':-o'], 'http://i.imgur.com/ZcYB8.jpg'],
		[['^^', '^_^'], 'http://i.imgur.com/ENZn2.jpg'],
		[['<3', '(L)'], 'http://i.imgur.com/WtIl5.jpg'],
		[['o:)', 'O:)', 'o:-)', 'O:-)'], 'http://i.imgur.com/UVDL7.jpg'],
		[[':*', ':-*'], 'http://i.imgur.com/hEgKH.jpg'],
		[['8)', '8-)', '(H)'], 'http://i.imgur.com/E7dE3.jpg']
	
	];

var smileyCount = smilies.length;

function escape(text) {
	return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
}

function createRow() {

	var row = document.createElement('tr');
	row.setAttribute('align', 'center');
	row.setAttribute('valign', 'bottom');
	return row;

}

function add() {

	var element = document.getElementById('vB_Editor_001_smiliebox');
	
	if (element == null) {
	
		return true;
	
	}
	
	var script = document.createElement('script');
	var rows = new Array();
	var currentRow = 0;
	element = element.getElementsByTagName('tbody')[0];
	
	for (var i = 0; i < smileyCount; i++) {
	
		if (i % 12 == 0) currentRow = rows.push(createRow());
		var column = document.createElement('td');
		var image = document.createElement('img');
		var sid = 'vB_Editor_001_smilie_' + (9000 + i);
		
		image.setAttribute('src', smilies[i][1]);
		image.setAttribute('id', sid);
		image.setAttribute('alt', '[img]' + smilies[i][1] + '[/img]');
		image.setAttribute('border', '0');
		image.setAttribute('class', 'inlineimg');
		image.setAttribute('title', 'Smiley');
		image.setAttribute('style', 'cursor: pointer;');
		
		column.appendChild(image);
		rows[currentRow - 1].appendChild(column);
		script.innerHTML += "document.getElementById('" + sid + "').onclick = vB_Text_Editor_Events.prototype.smilie_onclick;document.getElementById('" + sid + "').editorid = 'vB_Editor_001';";
	
	}
	
	for (var i = 0; i < currentRow; i++) {
	
		element.appendChild(rows[i]);
	
	}
	
	document.body.appendChild(script);
	return true;

}

function alter(event) {

	var form = (event ? event.target : this);
	var check = form.action;
	
	if (check.indexOf('newreply.php') == -1 && check.indexOf('newthread.php') == -1 && check.indexOf('editpost.php') == -1 && check.indexOf('visitormessage.php') == -1) {
	
		this._submit();
		return true;
	
	}
	
	var textarea = form.getElementsByTagName('textarea')[0];
	
	for (var i = 0; i < smileyCount; i++) {
	
		var count = smilies[i][0].length;
		
		for (var j = 0; j < count; j++) {
		
			var str = escape(smilies[i][0][j]);
			var r = new RegExp('(\\s)' + str, 'g');
			textarea.value = textarea.value.replace(r, '$1[img]' + smilies[i][1] + '[/img]');
		
		}
	
	}
	
	this._submit();
	return true;

}

document.body.onload = add;
window.addEventListener('submit', alter, true);
HTMLFormElement.prototype._submit = HTMLFormElement.prototype.submit;
HTMLFormElement.prototype.submit = alter;