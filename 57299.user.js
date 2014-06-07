// ==UserScript==
// @name          TestScript
// @namespace     http://userscripts.org/users/107267
// @description	  TestScript
// @author        tstbvg
// @include       http://www.loneads.com/down*
// ==/UserScript==

    var GM_JQ = document.createElement('script');
    GM_JQ.src = 'http://jquery.com/src/jquery-latest.js';
    GM_JQ.type = 'text/javascript';
    document.getElementsByTagName('head')[0].appendChild(GM_JQ);

    function GM_wait() {
        if(typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(GM_wait,100); }
    else { $ = unsafeWindow.jQuery; letsJQuery(); }
    }
    GM_wait();

    function letsJQuery() {
        var anchors = $('#idws7').getElementsByTagName('a');
        document.getElementById('antiiklan').innerHTML = '';
        for(var i=0; i < anchors.length; i++){
                if(anchors[i].href == 'javascript:'){
			try{
	                        var link = anchors[i].getAttribute('onclick');
	                        var new_a = document.createElement('a');
				new_a.href = link.substr(15,link.length - 16);
				new_a.innerHTML = 'Download Here <br />';
				document.getElementById('antiiklan').appendChild(new_a);
			}
			catch(e){
				alert('#ERR: '+e);
			}
                }
          }
    }