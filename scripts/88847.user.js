// ==UserScript==
// @name           SaveFight Bitefight
// @namespace      shahterov.net
// @description    FightReport saver for bitefight
// @require  http://ajax.googleapis.com/ajax/libs/jquery/1.3/jquery.min.js
// @require  http://s1.bitefight.ru/js/jquery.tools.min.js?check=10768
// @require  http://s1.bitefight.ru/js/jquery.ui.1.8.10.js?check=10768
// @include        http://*.bitefight.*/report/fightreport/*
// @version	1.0a
// ==/UserScript==

( function () {

        var logger_domain = 'bitefight.shahterov.net';
        var logger_path = '/plugin.php';

        var unsafe;
        try { unsafe = unsafeWindow }
        catch (e) { unsafe = window }


        var bitefight_domain = getDomain(document.location.href);


        function addIFrame() {

                        var iframe = document.createElement('iframe');
                        var div = document.createElement('div');
                        div.style.height = "240px";


                        iframe.src = 'http://' + logger_domain + logger_path;
                        iframe.id = "iframe";
                        iframe.style.width = '100%';
                        iframe.style.height = '100%';
                        iframe.style.border = "none";
                        div.appendChild(iframe);
                        $(div).insertBefore('.clearfloat');
        }

        function getDomain (thestring) {
			//simple function that matches the beginning of a URL
			//in a string and then returns the domain.
			var urlpattern = new RegExp("(http|ftp|https)://(.*?)/.*$");
			var parsedurl = thestring.match(urlpattern);
			return parsedurl[2];
		}

       function postCombat(e) {
                var server = e.origin.toString();
                if (!server.match( new RegExp(logger_domain, 'i') )) return;

                var html = unsafe.document.getElementsByTagName('html')[0].innerHTML;
                var iframe = unsafe.document.getElementById('iframe');
                iframe.contentWindow.postMessage(html, 'http://'+logger_domain);
        }

        function ajaxLoadContent(targetSelector, targetAction, requestData, reloadCheck)
    {
        if ($(targetSelector).html() != '' && reloadCheck)
        {
            return;
        }

        $(targetSelector).html(
        '<img src="http://'+bitefight_domain+'/img/ajax/ajax_loader_large.gif" alt="loading.." />'
    );

        var successFunc = function(htmlContent)
        {
            $(targetSelector).html(htmlContent);
            window.addEventListener('message', postCombat, false);
            addIFrame();
            activateTooltipsForSelector(targetSelector);

        }

        ajaxSendRequestHtml(targetAction, requestData, successFunc);
    }

    function ajaxReplaceContent(targetSelector, targetAction, requestData)
    {
        var successFunc = function(htmlContent)
        {
            $(targetSelector).html(htmlContent);

            activateTooltipsForSelector(targetSelector);
        }

        ajaxSendRequestHtml(targetAction, requestData, successFunc);
    }

    function ajaxSendRequestHtml(targetAction, requestData, successFunc)
    {
        $.get('http://'+bitefight_domain+'/ajax/' + targetAction,
        requestData,
        successFunc,
        'html');
    }



        function onClick() {

                this.removeChild(this.firstChild);
                var html=unsafe.document.getElementsByTagName('html')[0].innerHTML;
                var checksum=html.substring(html.indexOf("'checksum': '")+13,html.indexOf("'checksum': '")+13+32);
                var fightreportId=location.pathname.match(/\/fightreport\/(\d+)/)[1];

                $("#fightround_details").toggle();
				var requestData = {
				'fightreportId': fightreportId,
				'checksum': checksum
				};

                ajaxLoadContent('#fightround_details_contents', 'report/ajax_fightround_details_1on1', requestData, '1');

        }

        function createButton() {


                var alink = document.createElement("a");
                alink.innerHTML = 'Сохранить в bitefight.shahterov.net';
                alink.className='btn';

                var div2 = document.createElement('div');
                div2.className='btn-right';

                var div1 = document.createElement('div');
                div1.className='btn-left left';

                var div = document.createElement('div');
                div.id='save_button';

                div2.appendChild(alink);
                div1.appendChild(div2);
                div.appendChild(div1);
                div.addEventListener('click', onClick, false);

                $(div).insertBefore('.clearfloat');
        }

        createButton();

}) ();