// ==UserScript==
// @require       http://mwswh.googlecode.com/files/jquery.js
// @name          Mafia Wars Tons Gifter
// @description   Send up to 10 gifts to your friends on Mafia Wars, with one click!
// @author        caesar2k
// @version       0.4
// @namespace     mwtg
// @include       http://mwfb.zynga.com/mwfb/remote/*xw_controller=safehouse*
// ==/UserScript==

var SCRIPT = {
  version: '0.4',
  title: 'Mafia Wars Tons Gifter',
  name: 'inthemafia',
  appID: 'app10979261223',
  appNo: '10979261223',
  presentationurl: 'http://userscripts.org/scripts/show/70677',
  url: 'http://userscripts.org/scripts/source/70677.user.js',
  metadata: 'http://userscripts.org/scripts/source/70677.meta.js'
};

(function($){
	$.fn.domouseevent = function(mouseevt) {
		try {
			$this = typeof this[0] != 'undefined'?this[0]:this;
			if (!$this) {
				GM_log('ERROR: Null object passed to Click');
				return false;
			}
			var evt = document.createEvent("MouseEvents");
			evt.initMouseEvent(mouseevt, true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
			return !$this.dispatchEvent(evt);
		} catch (exception) {
			GM_log(exception.toString());
			return false;
		}
	}
})(jQuery);

var
  redirect_url, xw_user_id, $button, $count = 0;

xdoGetRequest = function(url){
  zStreamController = url.match(/xw_controller=(\w+)/);
  zStreamAction = url.match(/xw_action=(\w+)/);
  zStreamController = (zStreamController[1] == undefined) ? null : zStreamController[1];
  zStreamAction = (zStreamAction[1] == undefined) ? null : zStreamAction[1];

  var connector = (url.indexOf('?') == -1) ? '?' : '&';
  url = 'http://mwfb.zynga.com/mwfb/' + url + connector + 'xw_client_id=8';
  
  /*var params =
  {
    'ajax': 1,
    'liteload': 1,
    'sf_xw_user_id': xw_user_id,
    'sf_xw_sig': unsafeWindow.window.local_xw_sig
  };*/

  GM_xmlhttpRequest({
    method: "POST",
    url: url,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    data: "ajax=1&liteload=1&sf_xw_user_id="+xw_user_id+"&sf_xw_sig=" + unsafeWindow.window.local_xw_sig,
    onload: function (msg) {
      $count++;
      $button.text($button.text().replace(/\((\d+)\)/, $count));
    }
  });
}

$(function(){
  var $gift_button = $('#gift_popup_send_gift', unsafeWindow.document);

  if ($gift_button.size()) {

    $gift_button.removeAttr('id').hide();

    /*HIJACK SEND GIFT BUTTON >:D */

    redirect_url = $('li.tab_last div.tab_content a').attr('href');
    xw_user_id = window.location.href.toString().match(/sf_xw_user_id\=(\d+)/);
    
    if (xw_user_id && xw_user_id[1]) {
      xw_user_id = xw_user_id[1];
    } else {
      GM_log('Something went wrong. The xw_user_id is empty?')
      return;
    }

    GM_log('Local xw sig: ' + unsafeWindow.window.local_xw_sig);
    GM_log('XW_USER_ID: ' + xw_user_id);
    GM_log('Redirect URL: ' + redirect_url);

    $button = $('<a/>', {
      'class': 'sexy_button_new',
      'click': function(){
        for (i = 10; i > 0; i--) {
          window.setTimeout(function(){
            let url = '';

            if ($("#reward_selected", unsafeWindow.document).val() == 'xp'){
              url = $("#xp_gain_url", unsafeWindow.document).val();
            } else if ($("#reward_selected", unsafeWindow.document).val() == 'energy') {
              url = $("#nrg_gain_url", unsafeWindow.document).val();
            } else if ($("#reward_selected", unsafeWindow.document).val() == 'stamina') {
              url = $("#sta_gain_url", unsafeWindow.document).val();
            } else {
              url = $("#normal_url", unsafeWindow.document).val();
            }

            if (!url) {
              GM_log('URL is empty, crap');
            } else {
              xdoGetRequest(url + '&gift_id=' + $("#gift_id_selected", unsafeWindow.document).val());
            }
          }, 1 + i);
        }

        window.setTimeout(function(){
          document.location.href = redirect_url + '&xw_client_id=8';
        }, 4000);
      }
    })
    .html('<span><span><span>Send Tons (0)</span></span></span>')
    .insertAfter($gift_button);
    
  }
});

