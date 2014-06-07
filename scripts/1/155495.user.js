// ==UserScript==
// @name			Baidu Logout Adblock
// @include			http://tieba.baidu.com/*
// ==/UserScript==

try {
	$();
}catch(a){
	(function() {
		var ga = document.createElement('script');
		ga.type = 'text/javascript';
		ga.setAttribute('async', 'true');
		ga.src = 'http://lib.sinaapp.com/js/jquery/1.5.2/jquery.min.js';
		var s = document.getElementsByTagName('script')[0];
		s.parentNode.insertBefore(ga, s);
	})();
}

$(function(){
	setTimeout(function(){
		var uname = '';
    try {
        PageData.user ? (uname = PageData.user.name) : (uname = PageData.user_info.name)
    } catch (D) {
        uname = ""
    }
		$.cookie("baidu_broswer_setup_" + uname, 3);
		$('.u_logout a').click(function(){
			TbCom.process("User", "logout");
			return false;
		});
	},1000);
});