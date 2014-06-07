// ==UserScript==
// @name           Yahoo! Answers Untruncate
// @namespace      http://dt.in.th/
// @description    Untruncate question text in Yahoo! Answers.
// @include        http://answers.yahoo.com/question*
// ==/UserScript==

if (m = location.href.match(/qid=([^;&]+)/)) {

	var q_id = m[1];
	// this is my app id. get your own at https://developer.apps.yahoo.com/wsregapp/
	var appid = 'xfRHoIrV34EqKkwErmNG0GU6_whSfuOdPsf3tRr7XGjBBRh0lteUdjw8veQY';
	var api = 'http://answers.yahooapis.com/AnswersService/V1/getQuestion?appid='
		+ appid + '&output=json&question_id=' + m[1];

	function parse(x) {
		x = x.replace(/&/g, '&amp;');
		x = x.replace(/"/g, '&quot;');
		x = x.replace(/</g, '&lt;');
		x = x.replace(/>/g, '&gt;');
		x = x.replace(/\r\n|\n|\r/g, '<br/>');
		x = x.replace(/\b(([\w-]+:\/\/?|www[.])[^\s()<>]+(?:\([\w\d]+\)|([^\W\s]|\/)))/g, function(a) {
			url = a.substr(0, 1) == 'w' ? 'http://' + a : a;
			return '<a href="' + url + '">' + a + '</a>';
		});
		return x;
	}

	var targetEl = document.querySelector('#yan-question .content');
	if (targetEl) {

		targetEl.style.color = '#aaa';
		GM_xmlhttpRequest ({
			method: 'GET',
			url: api,
			onload: function(details) {
				var data = JSON.parse(details.responseText);
				targetEl.style.color = '';
				targetEl.style.wordWrap = 'break-word';
				targetEl.style.whiteSpace = 'pre-wrap';
				targetEl.innerHTML = parse(data.all.question[0].Content);
			}
		});

	}

}