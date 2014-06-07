// ==UserScript==
// @name           Travian Musou
// @namespace      http://summerwxy.blogspot.com/
// @include        http://*.travian.tw/build.php*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @require        http://dl.dropbox.com/u/187830/Userscripts/jquery.cheat-code.js
// ==/UserScript==


(function($) {
  $(function() {
    if ($('.g37').size()) {
      GM_addStyle(<><![CDATA[
		div.overlay {
			position: absolute; top: 0; right: 0; left: 0; bottom: 0;
			background-color: #000;
			opacity: 0.75; filter: alpha(opacity=75);
                        z-index: 9998;
		}
		div.modal {
			position: fixed; top: 100px; left: 50%; z-index: 50;
			width: 250px;
			padding: 20px; margin: 0 0 0 -125px;
			font-size: 24px; line-height: 30px; text-align: center;
			background-color: #fff;
			border: 5px solid #333;
                        z-index: 9999;
		}
                span.redMusou {
                        color: #ff0000;
                }
      ]]></>.toString());

      $(document).cheatCode({
        message: '英雄開無雙了, 不過一點效果都沒有',
        activated: function(o) {
          // from jquery cheat code
          complete(o);
          
          $('.info').before('<span class="redMusou">*無雙*</span>');

        }
      });
    }
  });
 })(jQuery);
