// ==UserScript==
// @name             login alert [GW] 
// @description      ну вы поняли да?!
// @include          http://www.ganjawars.ru/login.php
// @version          1.0
// @author           111!!!!адынадынадын
// ==/UserScript==

(function() {

var root = typeof unsafeWindow != 'undefined' ? unsafeWindow : window;

            if (root.document.getElementById('flashcontent') == null) {
                
                var div = root.document.createElement('div');
                div.id = 'flashcontent';
                root.document.body.appendChild(div);
                
            }
            var sound_id = 22;
            root.document.getElementById('flashcontent').innerHTML = '<embed height="1" width="1" flashvars="soundPath=/sounds/'+ sound_id +'.mp3" allowscriptaccess="always" quality="high" bgcolor="#F5fff5" name="gr_server" id="gr_server" src="http://images.ganjawars.ru/i/play.swf" type="application/x-shockwave-flash"/>';

})();