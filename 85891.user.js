// ==UserScript==
// @name           SavePhalanx
// @namespace      shahterov.net
// @description    Save Phalanx report at shahterov.net
// @version	0.3a
// @require  http://ajax.googleapis.com/ajax/libs/jquery/1.3/jquery.min.js
// @include        http://*.ogame.ru/game/index.php?page=phalanx*
// ==/UserScript==

( function () {

    var logger_domain = 'shahterov.net';
    var logger_path = '/tool/plugin_phalanx.php';
    var html = '';
    var count = 0;
    var refurl = '';
    var unsafe;
    try {
        unsafe = unsafeWindow
    }
    catch (e) {
        unsafe = window
    }


    url = document.URL;
    session = url.substr(url.indexOf("session=") + 8, 12);


    function addIFrame() {
        var iframe = document.createElement('iframe');
        var div = document.createElement('div');
        div.style.height = "280px";
        div.id = "div_iframe";
        var uni = document.location.href.match(/:\/\/([a-z0-9]+)\./i);
        uni = uni ? uni[1] : '0';

        iframe.src = 'http://' + logger_domain + logger_path + '?universe='+uni;
        iframe.id = "iframe";
        iframe.style.width = '100%';
        iframe.style.height = '280px';
        iframe.style.border = "none";
        div.appendChild(iframe);
        document.body.appendChild(div);
    }





    function postCombat(e) {
        var server = e.origin.toString();
        if (!server.match( new RegExp(logger_domain, 'i') )) return;

        html = unsafe.document.getElementsByTagName('html')[0].innerHTML;
        var iframe = unsafe.document.getElementById('iframe');

        var ogame_time = parent.document.getElementById('OGameClock').innerHTML;

        //Если установлен antigame то флоты не получаем
        if (html.indexOf("antigame")==-1) {	   	   
	    spanElements = document.getElementsByTagName("span");	
						
    		for (i = 0; i < spanElements.length; i++) {
    		    if (spanElements[i].hasAttribute("rel")) {
			var fleetURL = spanElements[i].getAttribute("rel");
			 if (fleetURL.indexOf("eventListTooltip")!=-1) {
				getFleets(fleetURL);
			  }
  		      }
 		   }

           
            html = str_replace(session, '', html);
            iframe.contentWindow.postMessage(html, 'http://'+logger_domain);
            iframe.contentWindow.postMessage('<div id="ogame_time">'+ogame_time+'</div>', 'http://'+logger_domain);
        } else {
            html = str_replace(session, '', html);
            iframe.contentWindow.postMessage(html, 'http://'+logger_domain);
            iframe.contentWindow.postMessage('<div id="ogame_time">'+ogame_time+'</div>', 'http://'+logger_domain);
            iframe.contentWindow.postMessage(' done '+occur(html, "eventListTooltip")/2, 'http://'+logger_domain);
            document.getElementById('div_iframe').style.display='';
            document.getElementById('save_button').style.display = 'none';
        }





    }

    


    function getFleets(fleetUrl) {
        $.get(fleetUrl, function(data){
            var iframe = unsafe.document.getElementById('iframe');
            fleetUrl=str_replace(session, '', fleetUrl);
            data = str_replace('<table', '<table [ref-url='+fleetUrl+']', data);
            count++;
            iframe.contentWindow.postMessage(data, 'http://'+logger_domain);

            //Определяется все ли флоты получены
            if (count==occur(html, "eventListTooltip")) {
                iframe.contentWindow.postMessage(' done '+occur(html, "eventListTooltip")/2, 'http://'+logger_domain);
                document.getElementById('div_iframe').style.display='';
                document.getElementById('save_button').style.display = 'none';
            }
        });
    }

    function str_replace(search, replace, subject) {
        return subject.split(search).join(replace);
    }

    function occur(str, pattern) {
        var pos = str.indexOf(pattern);
        for (var count = 0; pos != -1; count++)
            pos = str.indexOf(pattern, pos + pattern.length);
        return count;
    }

    function createButton() {
        var btn = document.createElement('input');
        btn.type = 'button';
        btn.id = 'save_button';
        btn.width = '10em';
        btn.value = 'Сохранить';
        btn.border = '1px solid black';
        btn.style.margin = "0% 0% 0% 40%";
        btn.addEventListener('click', onClick, false);	
        document.body.appendChild(btn);
    }

    function onClick() {
        window.addEventListener('message', postCombat, false);
        //this.disabled = true;
        this.value = 'Получение флотов...';
        addIFrame();
        document.getElementById('div_iframe').style.display='none';

    }

    createButton();

}) ();