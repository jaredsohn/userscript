// ==UserScript==
// @name           me2day interface fix
// @namespace      me2
// @match          http://me2day.net/*
// ==/UserScript==

if (typeof(GM_addStyle) == 'undefined') {
	function GM_addStyle(css) {
		var S = document.createElement('style');
		S.type = 'text/css';
		S.appendChild(document.createTextNode(css))
		document.body.appendChild(S);
	}
}

var up = document.getElementById('update_noti_anchor')
if (up) {
	up.accessKey = "u"
	document.getElementById('update_noti_layer').appendChild(document.createTextNode(' (단축키: Alt+U)'))
	window.addEventListener('keypress', function (event) {
		if (event.altKey && event.which == 117 /* u */) {
			var x = document.createElement('script')
			x.type = 'text/javascript'
			x.appendChild(document.createTextNode('NotiNPC.show_posts()'))
			document.body.appendChild(x)
		}
	}, false)
}

GM_addStyle('\
	/* 마우스 오버 시에만 보이는 태그 편집 / 미투하기 링크 항상 보이기 */\
	.edit_tag_button, .me2button { visibility: visible !important; }\
	.edit_tag_button img { opacity: 1 !important; }\
\
	/* 페이지 내에서 Ajax로 불러오는 링크를 굵게 처리 */\
	.post_cont p a[onclick], .pingbackline a[onclick] { font-weight: bold; background: url("http://asset1.me2day.net/images/bg_icons_grarrow.gif?1269596642") no-repeat right center; padding-right: 10px; }\
	\
	/* 댓글 달기 링크를 왼쪽으로 보내고 크게 표시 */\
	.comment_link { margin-left: 58px; margin-top: 0.5em; text-align: left !important; }\
	.pingback_box .comment_link { margin-left: 126px; }\
	.rerecom { text-align: left !important; }\
	.rerecom a { font-size: 13px !important; }\
	.comment_link a, .comment_count { font-size: 13px !important; }\
\
	/* 댓글 알림을 약간 들여써서 표시 */\
	.sec_post[id^="comment"] { padding-left: 75px; }\
	.sec_post[id^="comment"] .post_section { margin-left: 100px !important; }\
	.sec_post[id^="comment"] .r_sign { right: auto !important; left: 20px; }\
	.sec_post[id^="comment"] .profile_master{width:78px !important;}\
	.sec_post[id^="comment"] .profile_introduce .profile_master{margin-bottom:15px !important;}\
	.sec_post[id^="comment"] .profile_master{padding-bottom:0 !important;}\
	.sec_post[id^="comment"] .profile_master .name_text{line-height:17px;}\
	.sec_post[id^="comment"] .profile_master .action_link{}\
');
