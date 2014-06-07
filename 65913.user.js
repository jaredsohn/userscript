// ==UserScript==
// @name        RK
// @namespace   mafiawars
// @description none
// @include     http://mwfb.zynga.com/mwfb/*
// @include     http://apps.facebook.com/inthemafia/*
// @include     http://apps.new.facebook.com/inthemafia/*
// @version     1.0
// ==/UserScript==

javascript:(function(){
	
	var frame=document.getElementsByName('mafiawars');

	if(frame.length>0 || (!frame)){
		if(confirm('You need to break out the mw-frame first.\nPress OK to do it now.')){
			window.location.href=document.getElementsByName('mafiawars')[0].src;
			return;
		}
	}

	else{
		document.body.parentNode.style.overflowY="scroll";
		document.body.style.overflowX="auto";
		document.body.style.overflowY="auto";
		if(typeof FB!='undefined'){
			FB.CanvasClient.stopTimerToSizeToContent;
			window.clearInterval(FB.CanvasClient._timer);
			FB.CanvasClient._timer=-1;
		}
	}
	
	var attacktext=/Attack Him!/.exec(document.body.innerHTML);

	if(attacktext==null){
		alert('Boss Fight not running !');
		return;
	}

	var url = document.getElementsByTagName('a')[43].href;
	var tmp = /&tmp=([^&]+)/.exec(url)[1];
	var cb = /&cb=([^&]+)/.exec(url)[1];


	do_ajax('inner_page','remote/html_server.php?xw_controller=bossfight&xw_action=fight&xw_city=1&tmp='+tmp+'&cb='+cb+'&action=fight&boss=4',1,1);
	do_ajax('inner_page','remote/html_server.php?xw_controller=bossfight&xw_action=fight&xw_city=1&tmp='+tmp+'&cb='+cb+'&action=fight&boss=4',1,1);
	do_ajax('inner_page','remote/html_server.php?xw_controller=bossfight&xw_action=fight&xw_city=1&tmp='+tmp+'&cb='+cb+'&action=fight&boss=4',1,1);
	do_ajax('inner_page','remote/html_server.php?xw_controller=bossfight&xw_action=fight&xw_city=1&tmp='+tmp+'&cb='+cb+'&action=fight&boss=4',1,1);
	do_ajax('inner_page','remote/html_server.php?xw_controller=bossfight&xw_action=fight&xw_city=1&tmp='+tmp+'&cb='+cb+'&action=fight&boss=4',1,1);
        do_ajax('inner_page','remote/html_server.php?xw_controller=bossfight&xw_action=fight&xw_city=1&tmp='+tmp+'&cb='+cb+'&action=fight&boss=4',1,1);
        do_ajax('inner_page','remote/html_server.php?xw_controller=bossfight&xw_action=fight&xw_city=1&tmp='+tmp+'&cb='+cb+'&action=fight&boss=4',1,1);
        do_ajax('inner_page','remote/html_server.php?xw_controller=bossfight&xw_action=fight&xw_city=1&tmp='+tmp+'&cb='+cb+'&action=fight&boss=4',1,1);
        do_ajax('inner_page','remote/html_server.php?xw_controller=bossfight&xw_action=fight&xw_city=1&tmp='+tmp+'&cb='+cb+'&action=fight&boss=4',1,1);
        do_ajax('inner_page','remote/html_server.php?xw_controller=bossfight&xw_action=fight&xw_city=1&tmp='+tmp+'&cb='+cb+'&action=fight&boss=4',1,1);
        do_ajax('inner_page','remote/html_server.php?xw_controller=bossfight&xw_action=fight&xw_city=1&tmp='+tmp+'&cb='+cb+'&action=fight&boss=4',1,1);
        do_ajax('inner_page','remote/html_server.php?xw_controller=bossfight&xw_action=fight&xw_city=1&tmp='+tmp+'&cb='+cb+'&action=fight&boss=4',1,1);
        do_ajax('inner_page','remote/html_server.php?xw_controller=bossfight&xw_action=fight&xw_city=1&tmp='+tmp+'&cb='+cb+'&action=fight&boss=4',1,1);
        do_ajax('inner_page','remote/html_server.php?xw_controller=bossfight&xw_action=fight&xw_city=1&tmp='+tmp+'&cb='+cb+'&action=fight&boss=4',1,1);
        do_ajax('inner_page','remote/html_server.php?xw_controller=bossfight&xw_action=fight&xw_city=1&tmp='+tmp+'&cb='+cb+'&action=fight&boss=4',1,1);
        do_ajax('inner_page','remote/html_server.php?xw_controller=bossfight&xw_action=fight&xw_city=1&tmp='+tmp+'&cb='+cb+'&action=fight&boss=4',1,1);
        do_ajax('inner_page','remote/html_server.php?xw_controller=bossfight&xw_action=fight&xw_city=1&tmp='+tmp+'&cb='+cb+'&action=fight&boss=4',1,1);
        do_ajax('inner_page','remote/html_server.php?xw_controller=bossfight&xw_action=fight&xw_city=1&tmp='+tmp+'&cb='+cb+'&action=fight&boss=4',1,1);
        do_ajax('inner_page','remote/html_server.php?xw_controller=bossfight&xw_action=fight&xw_city=1&tmp='+tmp+'&cb='+cb+'&action=fight&boss=4',1,1);
        do_ajax('inner_page','remote/html_server.php?xw_controller=bossfight&xw_action=fight&xw_city=1&tmp='+tmp+'&cb='+cb+'&action=fight&boss=4',1,1);
        do_ajax('inner_page','remote/html_server.php?xw_controller=bossfight&xw_action=fight&xw_city=1&tmp='+tmp+'&cb='+cb+'&action=fight&boss=4',1,1);
        do_ajax('inner_page','remote/html_server.php?xw_controller=bossfight&xw_action=fight&xw_city=1&tmp='+tmp+'&cb='+cb+'&action=fight&boss=4',1,1);
        do_ajax('inner_page','remote/html_server.php?xw_controller=bossfight&xw_action=fight&xw_city=1&tmp='+tmp+'&cb='+cb+'&action=fight&boss=4',1,1);
        do_ajax('inner_page','remote/html_server.php?xw_controller=bossfight&xw_action=fight&xw_city=1&tmp='+tmp+'&cb='+cb+'&action=fight&boss=4',1,1);
        do_ajax('inner_page','remote/html_server.php?xw_controller=bossfight&xw_action=fight&xw_city=1&tmp='+tmp+'&cb='+cb+'&action=fight&boss=4',1,1);
        do_ajax('inner_page','remote/html_server.php?xw_controller=bossfight&xw_action=fight&xw_city=1&tmp='+tmp+'&cb='+cb+'&action=fight&boss=4',1,1);
        do_ajax('inner_page','remote/html_server.php?xw_controller=bossfight&xw_action=fight&xw_city=1&tmp='+tmp+'&cb='+cb+'&action=fight&boss=4',1,1);
        do_ajax('inner_page','remote/html_server.php?xw_controller=bossfight&xw_action=fight&xw_city=1&tmp='+tmp+'&cb='+cb+'&action=fight&boss=4',1,1);
        do_ajax('inner_page','remote/html_server.php?xw_controller=bossfight&xw_action=fight&xw_city=1&tmp='+tmp+'&cb='+cb+'&action=fight&boss=4',1,1);
        do_ajax('inner_page','remote/html_server.php?xw_controller=bossfight&xw_action=fight&xw_city=1&tmp='+tmp+'&cb='+cb+'&action=fight&boss=4',1,1);



})();