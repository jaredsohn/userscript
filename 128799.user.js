// ==UserScript==
// @name           Dirty Votes @ User Comments
// @namespace      http://userscripts.org/users/248610
// @description    Позволяет голосовать со странички с комментариями пользователя
// @include        http://dirty.ru/user/*
// @include        http://*.dirty.ru/user/*
// @include        http://*.d3.ru/user/*
// @include        http://d3.ru/user/*
// ==/UserScript==

(function(){
	//return;
	if (document.location.href.match(/comments/)) {
		var cc = document.getElementsByClassName('vote c_vote');
		unsafeWindow.voteHandler.wtf = unsafeWindow.wtf_vote;
		// Moscow delta time to GMT;
		var mtzo = -240;
		// Threshold date
		var td = new Date((new Date()).getTime() + ((new Date()).getTimezoneOffset() - mtzo)*60*1000 - 7*24*60*60*1000);
		td.setSeconds(0);
		td.setMilliseconds(0);
		for (var c in cc) {
			var time = cc[c].parentNode.getElementsByClassName('c_user')[0].nextSibling.nodeValue;
			var re = /(\d{2})\.(\d{2})\.(\d{4})\sв\s(\d{2})\.(\d{2})/;
			// comment date
			var cd;
			if (re.exec(time)) {
				cd = new Date();
				cd.setYear(RegExp.$3);
				cd.setMonth(RegExp.$2 - 1);
				cd.setDate(RegExp.$1);
				cd.setHours(RegExp.$4);
				cd.setMinutes(RegExp.$5);
				cd.setSeconds(0);
				cd.setMilliseconds(0);
				if ((cd-td)<0) {
					cc[c].childNodes[1].style.color = '#CC0000';
				} else {
					var href = cc[c].parentNode.getElementsByClassName('c_icon')[0].href.split(/\//);
					var atrs = href[href.length-1].split(/#/);
					
					var d = document.createElement('div');
					d.setAttribute('onmouseout', "$(this).removeClass('over')");
					d.setAttribute('onmouseover', "$(this).addClass('over')");
					d.setAttribute('class', 'vote c_vote ');
					
					var a = document.createElement('a');
					a.setAttribute('onclick', "voteHandler.vote(this, '"+atrs[1]+"', '0', '1', '"+atrs[0]+"'); return false;");
					a.setAttribute('href', '#');
					a.setAttribute('class', 'vote_button vote_button_plus');
					var t = document.createTextNode('+');
					a.appendChild(t);
					d.appendChild(a);

					var s = document.createElement('strong');
					s.setAttribute('onclick', "voteDetailsHandler.show({type:'comment', button:this, id:'"+atrs[1]+"', post_id:'"+atrs[0]+"'});");
					s.setAttribute('class', 'vote_result');
					t = document.createTextNode(cc[c].childNodes[1].firstChild.nodeValue);
					s.appendChild(t);
					d.appendChild(s);

					a = document.createElement('a');
					a.setAttribute('onclick', "voteHandler.vote(this, '"+atrs[1]+"', '0', '-1', '"+atrs[0]+"'); return false;");
					a.setAttribute('href', '#');
					a.setAttribute('class', 'vote_button vote_button_minus');
					t = document.createTextNode('–');
					a.appendChild(t);
					d.appendChild(a);
					
					cc[c].parentNode.replaceChild(d, cc[c]);
				}
			}
		}
	}
/*
<div onmouseout="$(this).removeClass('over');" onmouseover="$(this).addClass('over');" class="vote c_vote ">
				<a href="#" onclick="voteHandler.vote(this, '7411561', '0', '1', '342167'); return false;" class="vote_button vote_button_plus">+</a>
				<strong onclick="voteDetailsHandler.show({type:'comment', button:this, id:'7411561', post_id:'342167'});" class="vote_result">23</strong>
				<a href="#" onclick="voteHandler.vote(this, '7411561', '0', '-1', '342167'); return false;" class="vote_button vote_button_minus">&ndash;</a>
</div>
*/
})();