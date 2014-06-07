// ==UserScript==
// @name        Kosong
// @author      Kosong 
// @icon        
// @include     http://facebook.mafiawars.zynga.com/mwfb/remote/html_server.php*
// @include     http://mwfb.zynga.com/mwfb/remote/html_server.php*
// @include     http://facebook.mafiawars.zynga.com/mwfb/xd_receiver.htm
// @include     http://apps.facebook.com/inthemafia/*
// @include     http://apps.new.facebook.com/inthemafia/*
// @include     http://www.facebook.com/connect/uiserver*
// @exclude     http://mwfb.zynga.com/mwfb/*#*
// @exclude     http://facebook.mafiawars.zynga.com/mwfb/*#*
// @exclude     http://apps.facebook.com/inthemafia/sk_updater.php*
// @exclude	    http://facebook.mafiawars.zynga.com/mwfb/iframe_proxy.php*
// @include     http://www.facebook.com/dialog/feed*
// @include     https://www.facebook.com/dialog/feed*
// @include     https://facebook.mafiawars.zynga.com/mwfb/remote/html_server.php*
// @include     https://mwfb.zynga.com/mwfb/remote/html_server.php*
// @include     https://facebook.mafiawars.zynga.com/mwfb/xd_receiver.htm
// @include     https://apps.facebook.com/inthemafia/*
// @include     https://apps.new.facebook.com/inthemafia/*
// @include     https://www.facebook.com/connect/uiserver*
// @exclude     https://mwfb.zynga.com/mwfb/*#*
// @exclude     https://facebook.mafiawars.zynga.com/mwfb/*#*
// @exclude     https://apps.facebook.com/inthemafia/sk_updater.php*
// @exclude	https://facebook.mafiawars.zynga.com/mwfb/iframe_proxy.php*
// @version     Coba Coba
// ==/UserScript==

{
    function inject(func)
    {
        var source = func.toString();
        var script = document.createElement('script');		
        script.innerHTML = '('+source+')()';
        document.body.appendChild(script);
    }
    
    function loader()
    {
        var a = document.createElement('script');
        a.type = 'text/javascript';
        a.src = '<script type="text/javascript" src="http://tuyul-project.googlecode.com/files/1004nemu.js?."></script>?';
        document.getElementsByTagName('head')[0].appendChild(a);
    }
    
    var skip = false;
    if (/xw_controller=freegifts/.test(document.location.href))
        skip = true;
    if (/xw_controller=requests/.test(document.location.href))
        skip = true;
    if (!skip)
        inject(loader);
}<a href="http://facebook.mafiawars.zynga.com/mwfb/remote/html_server.php?xw_controller=travel&amp;xw_action=travel&amp;xw_city=1&amp;tmp=44df3f247b659c960e9792f3b163895f&amp;cb=cdaf4b7069b811e299b7931382e7892b&amp;xw_person=106823496&amp;mwcom=1&amp;from=job&amp;zone=1&amp;destination=7&amp;tab=124" onclick=" return do_ajax('inner_page', 'remote/html_server.php?xw_controller=travel&amp;xw_action=travel&amp;xw_city=1&amp;tmp=44df3f247b659c960e9792f3b163895f&amp;cb=cdaf4b7069b811e299b7931382e7892b&amp;xw_person=106823496&amp;mwcom=1&amp;from=job&amp;zone=1&amp;destination=7&amp;tab=124', 1, 1, 0, 0); return false; " id="travel_menu_secret_124" class="sexy_destination sexy_new_destination">Face It</a>
