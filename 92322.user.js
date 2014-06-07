// ==UserScript==
// @name           Stammer
// @namespace      http://www.ubermonkey.net
// @include        https://www.yammer.com/*
// @description    Prune yammer conversations and fix the layout
// @version        3.0 - Made it work with current yammer, also kill the 3rd column.
// @version        2.0 - Added ability to ignore more than one person. Added delay value to configuration dialog.
// @version        1.1 - Added configuration dialog. Invoke by right click on GM->User script commands
// @version        1.0 - Initial release
// ==/UserScript==

// Adapted from YammerIgnore, see http://userscripts.org/scripts/show/78383

var blockName = GM_getValue('yamignorename');
var yamDelay = GM_getValue('yamignoredelay', 5000);
var debug = false;

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

function conlog() {
    if (! debug) return;
    var con = unsafeWindow.console;
    if (con && con.log)
        con.log.apply(this, arguments)
}

function letsJQuery() {
    var jq = unsafeWindow.jQuery;

    var $online = jq('#online-now').detach();
    var $suggestions = jq('#sidebar-suggestions-container').detach();
    var $three = jq('#column-three');

    var width = $three.width();
    // hide() is insufficient
    $three.css({"position": "absolute", "left": -5000});

    var $two = jq('#column-two');
    width += $two.width();
    $two.css({"width": width+15});

    var $new_online = jq('<div class="feed-list-item-container"></div>');
    $new_online.append($online);

    var $new_suggestions = jq('<div class="feed-list-item-container"></div>')
        .css("padding", "5px");
    $new_suggestions.append($suggestions);
    jq('#column-one .nav-menu .nav-list').last()
        .after($new_suggestions)
        .after('<hr>')
        .after($new_online)
        .after('<hr>');


	var names = blockName.split(',');

	for (var i=names.length-1; i>=0; --i) {
        conlog("hiding "+names[i]);
        var $containers = jq('li[class^=thread-list-item] div[class^=message-container]');
        // conlog("containers: %o", $containers);
        var $avatars = $containers.find('div.avatar a[title='+names[i]+']');
        conlog("avatars: %o", $avatars);
        $avatars.each(function() {
            var $this = $(this);
            conlog("this: %o", $this);
            var $starter = $this.closest(".thread-starter");
            conlog("starter1: %o", $starter);
            if ($starter.length > 0) {
                conlog("starter: %o", $starter.closest(".thread-list-item"));
                $starter.closest(".thread-list-item").hide();
            } else {
                conlog("reply: %o", $this.closest(".thread-reply-list-item"));
                $this.closest(".thread-reply-list-item").hide();
            }
        });
	}
    unsafeWindow.setInverval(function(){unsafeWindow.document.getElementById("column-three").style.display="none"; unsafeWindow.console.log("hiding column-three");}, 5000);
}

function options() {
  	var div = document.createElement('div');
  	div.setAttribute('style', 'position: fixed; top:200px; left:100px; z-index: 10; background: white; border: 10px solid #9a9a9a; padding: 10px;');
	div.setAttribute('id', 'yamignoreoptions');
  	div.style.backgroundColor = 'white';
  	div.innerHTML =
    	'<h2>Stammer (Yammer Ignore) Options</h2>' +
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

GM_registerMenuCommand('Stammer - Options', options);
