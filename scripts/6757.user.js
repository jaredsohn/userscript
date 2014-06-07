// Sensible Mods
// Adds a moderation function to each user comment, enabling comment
// mods typically only available for post moderation on Sensible Erection.
// version 0.3.2
// 2007-07-06
// Copyright (c) 2006, Rojo^
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
// 
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Sensible Erection comment mods", and click Uninstall.
//
// ==UserScript==
// @name					 Sensible Mods
// @namespace			http://userscripts.org/scripts/show/6757
// @description		adds mod function to each user comment on Sensible Erection
// @include				http://*.sensibleerection.com/entry.php*
// @include				http://sensibleerection.com/entry.php*
// @version				0.3.2
// ==/UserScript==

(function () {
// *sigh* fix Firefox's weirdness about forms spanning table elements, and SE's weirdness about using them
function fixModForm() {
	var selectTag = document.getElementById('mod_type_id');
	if (selectTag) {
		var options = selectTag.innerHTML;
		var tableDaddy = selectTag.parentNode.parentNode.parentNode.parentNode;
		var modAction = tableDaddy.innerHTML.match(/\/entry\.php\/\d+/);
		tableDaddy.innerHTML = '<tbody><tr><td><form name="mod_type" method="post" action="'+modAction+'">'
			+'<select name="mod_type_id" class="text11px" id="mod_type_id">'
			+options
			+'</select>'
			+'<input name="action" type="submit" id="action" value="moderate" class="text11px">'
			+'</form></td></tr></tbody>';
	}
};
fixModForm();

function fblog(what) {
	if (console && console.log) console.log(what);
}

var inputEl = document.getElementsByTagName('input');
for (var i=0; i<inputEl.length; i++) {
	switch (inputEl[i].name) {
	case 'name':
		const name = inputEl[i].value;
		break;
	case 'email':
		const email = inputEl[i].value;
		break;
	}
}

if (document.forms[0].elements[0]) {
	var opt = document.createElement('option');
	opt.value = '11';
	opt.innerHTML = '+/-0 Meh';
	document.forms[0].elements[0].appendChild(opt);
}
var st = document.createElement('style');
st.innerHTML = 'option.r { color:#610; }'
	+'option.g { color:#160; }'
	+'.replyLink { font-style: italic; font-size: 9px; text-align: right; }'
	+'.pseudoLink { color: #666; text-decoration: underline; cursor: pointer; }'
	+'.select { font-size: 9px; display: inline; width: 110px; }'
    +'.entry_details_text { white-space: nowrap; }';
document.body.appendChild(st);

var s = [];
s.push('<select name="comment_mod_type_id" class="select">');
s.push('<option value="">no vote</option>');
s.push('<option value="17" class="g">+1 Good</option>');
s.push('<option value="1" class="g">+1 Insightful</option>');
s.push('<option value="2" class="g">+1 Informative</option>');
s.push('<option value="3" class="g">+1 Funny</option>');
s.push('<option value="4" class="g">+1 Underrated</option>');
s.push('<option value="5" class="g">+1 Original</option>');
s.push('<option value="16" class="g">+1 Interesting</option>');
s.push('<option value="20" class="g">+1 WTF</option>');
s.push('<option value="6" class="r">-1 Repost</option>');
s.push('<option value="7" class="r">-1 Overrated</option>');
s.push('<option value="8" class="r">-1 Unworthy Self Link</option>');
s.push('<option value="9" class="r">-1 Troll</option>');
s.push('<option value="10" class="r">-1 Flamebait</option>');
s.push('<option value="19" class="r">-1 Bad</option>');
s.push('<option value="18" class="r">-1 Old</option>');
s.push('<option value="21" class="r">-1 WTF</option>');
s.push('<option value="22" class="r">-1 Wrong Category</option>');
s.push('<option value="23" class="r">-1 Boring</option>');
s.push('<option value="12" class="g">+1 Hot Pr0n</option>');
s.push('<option value="13" class="g">+1 Classy Pr0n</option>');
s.push('<option value="14" class="r">-1 Bad Pr0n</option>');
s.push('<option value="15" class="r">-1 Illegal Pr0n</option>');
s.push('</select>');
s.push('<input type="submit" value="mod" style="font-size: 9px; display: inline" />');

var entry = /\/entry\.php\/\d+/.exec(location.href);
var spans = document.getElementsByTagName('span');
var i=0;
var nice = setInterval(function() {
	if (spans[i].className == 'entry_details_text') {
        var timestampRxp = /said @ (\d+:\d\d[ap]m on \d+\w\w \w\w\w)/;
		var ts = timestampRxp.test(spans[i].innerHTML);
        ts = RegExp.$1.split(' ');
        // fblog(typeof timestamp + ': ' + timestamp);
        spans[i].innerHTML = spans[i].innerHTML.replace(timestampRxp,'- '+ts[0]+' '+ts[3]+' '+ts[2]) || spans[i].innerHTML;
        // spans[i].innerHTML = spans[i].innerHTML.replace(/said @ (\d+:\d\d[ap]m) on/,RegExp.$1);
		// var timestamp = RegExp.$1;
		var links = spans[i].getElementsByTagName('a');
		if (links[1] && /comment\.php\/\d+\/(\d+)/.test(links[1].href)) {
			links[1].innerHTML = '&infin;';
			links[1].setAttribute('title',links[1].href);
			links[1].style.textDecoration = 'none';
			// links[0].setAttribute('title',timestamp);
			const parentID = RegExp.$1;
			var f = [];
			f.push(spans[i].innerHTML);
			f.push('<form action="' + entry + '" method="post" style="display: inline">');
			f.push('<input type="hidden" name="parent_id" value="' + parentID + '" />');
			f.push(s.join('\n'));
			f.push('</form>');
			spans[i].innerHTML = f.join('\n');
			var formContainer = document.createElement('div');
			formContainer.style.display = 'none';
			var replyLink = document.createElement('div');
			replyLink.className = 'replyLink';
			replyLink.innerHTML = '(<span class="pseudoLink">Reply to this comment</span>)';
			var cancelButton = document.createElement('button');
			cancelButton.innerHTML = 'cancel';
			cancelButton.style.display = 'none';
			var formBuild = [];
			formBuild.push('<form method="post" style="display: inline"><hr />');
			formBuild.push('name<br /><input type="text" name="name" value="'+name+'" /><br />');
			formBuild.push('email address<br /><input type="text" name="email" value="'+email+'" /><br />');
			formBuild.push('<input type="checkbox" name="email_replies" value="1" /> email replies');
			formBuild.push('<input type="checkbox" name="add_watch" value="'+entry+'" /> add to watch list<br />');
			formBuild.push('<textarea name="comment" rows="10" wrap="VIRTUAL" style="width: 490px"></textarea><br />');
			formBuild.push('<input type="submit" name="submit" value="post" />');
			formBuild.push('<input type="hidden" name="action" value="post" />');
			formBuild.push('<input type="hidden" name="parent_id" value="'+parentID+'" />');
			formBuild.push('<input type="hidden" name="score_adj" value="0" />');
			formBuild.push('</form>');
			formContainer.innerHTML = formBuild.join('\n');
			cancelButton.addEventListener('click',function() {
				replyLink.style.display = 'block';
				this.style.display = 'none';
				formContainer.style.display = 'none';
			},false);
			replyLink.getElementsByTagName('span')[0].addEventListener('click',function() {
				replyLink.style.display = 'none';
				cancelButton.style.display = 'inline';
				formContainer.style.display = 'inline';
			},false);
			spans[i+1].appendChild(formContainer);
			spans[i+1].appendChild(replyLink);
			spans[i+1].appendChild(cancelButton);
		}
	}
	i++;
	if (i==spans.length) {
		clearInterval(nice);
	}
},10);
})();