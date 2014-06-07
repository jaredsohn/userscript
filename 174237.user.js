// ==UserScript==
// @name       TF2R No Emoticons
// @version    1.0.3
// @namespace  
// @include    http://tf2r.com/chat.html
// @copyright  2013, thanks to Wara for a nice idea
// ==/UserScript==

$(function() {
	var script = document.createElement('script');
	script.appendChild(document.createTextNode('('+ include +')();'));
	document.head.appendChild(script);

    function include() {
		setTimeout(function() {
			var originalAddMess = AddMess;

			AddMess = function (msg){
                msg.message = msg.message.replace(/:[a-z0-9-_]+?:/ig, ' ');
              if (/^\s*$/i.test(msg.message)) {
				return;
              }
				originalAddMess(msg);
			};
		}, 200);
    }
});
