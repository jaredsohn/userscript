// ==UserScript==
// @name           YammerIgnore
// @namespace      http://www.ctpeko3a.com
// @include        https://www.yammer.com/*
// @description    Remove annoying people's posts from Yammer
// @version        2.0 - Added ability to ignore more than one person. Added delay value to configuration dialog.
// @version        1.1 - Added configuration dialog. Invoke by right click on GM->User script commands
// @version        1.0 - Initial release
// ==/UserScript==

var blockName = GM_getValue('yamignorename');
var yamDelay = GM_getValue('yamignoredelay', 5000);

// Add jQuery
    (function(){
        if (typeof unsafeWindow.jQuery == 'undefined') {
            var GM_Head = document.getElementsByTagName('head')[0] || document.documentElement,
                GM_JQ = document.createElement('script');
    
            GM_JQ.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js';
            GM_JQ.type = 'text/javascript';
            GM_JQ.async = true;
    
            GM_Head.insertBefore(GM_JQ, GM_Head.firstChild);
        }
        window.setTimeout(GM_wait, yamDelay);
		// GM_wait();
    })();

// Check if jQuery's loaded
    function GM_wait() {
        if (typeof unsafeWindow.jQuery == 'undefined') {
            window.setTimeout(GM_wait, 100);
        } else {
            // $$$ = unsafeWindow.jQuery.noConflict(true);
            letsJQuery();
        }
    }

    function letsJQuery() {
		var names = blockName.split(',');

		for (var i=names.length-1; i>=0; --i) {
        	unsafeWindow.jQuery('li[class^=thread-list-item] div[class^=message-container]:has(div[class=avatar]:first-child:has(a[title*='+names[i]+']))').parent().parent().css("display", "none");
		}
    }


	function options() {
  		var div = document.createElement('div');
  		div.setAttribute('style', 'position: fixed; top:200px; left:100px; z-index: 10; background: white; border: 10px solid #9a9a9a; padding: 10px;');
		div.setAttribute('id', 'yamignoreoptions');
  		div.style.backgroundColor = 'yellow';
  		div.innerHTML =
    		'<h2>Yammer Ignore Options</h2>' +
    		'<label>Comma separated list of persons to ignore (no spaces):<input type="text" id="yamignorename"></label><br>' +
    		'<label>Execution delay:<input type="text" id="yamignoredelay"></label><br>' +
    		'<a>save</a> <a>cancel</a>';

		var a = div.getElementsByTagName('a');
		a[0].addEventListener('click',
    		function () {//save
      			var div = this.parentNode;
      			GM_setValue('yamignorename', document.getElementById('yamignorename').value);
				GM_setValue('yamignoredelay', document.getElementById('yamignoredelay').value);
      			div.parentNode.removeChild(div);
				document.location.reload(true);
    		},
    		true);
  		
		a[1].addEventListener('click',
    		function () {//cancel
      			var div = this.parentNode;
      			div.parentNode.removeChild(div);
    		},
    		true);
  		
		document.body.appendChild(div);
  		document.getElementById('yamignorename').value = GM_getValue('yamignorename');
		console.debug(GM_getValue('yamignoredelay', 5000));
  		document.getElementById('yamignoredelay').value = GM_getValue('yamignoredelay', 5000);
	}

GM_registerMenuCommand('YammerIgnore - Options', options);

