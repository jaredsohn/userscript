// ==UserScript==
// @name           Twitter Append dead word from shigo.com
// @namespace      http://buycheapviagraonlinenow.com/
// @include        http://twitter.com/home
// ==/UserScript==
(function() {
  var endpoint = 'http://pipes.yahoo.com/pipes/pipe.run?_id=FOIlvECp3BG1I24QOTY80A&_render=json&index=';
  var lastIndex = 2254;

  var w = (typeof unsafeWindow == 'undefined') ? window : unsafeWindow;
  var submit = w.document.getElementById('update-submit');
	var form = document.getElementById('doingForm');
  var appendDeadWord = function(callback) {
    GM_xmlhttpRequest({
      method : "GET",
      url : endpoint + Math.floor(Math.random() * lastIndex),
      onload : function(response) {
				var json = eval('(' + response.responseText + ')');
				if(json.count == 1) {
					document.getElementById('status').value += ' '
						+ json.value.items[0].title
						+ '!!!'.substr(Math.random()*3);
				}
				
				callback();
      }
    });
  };
  
  submit.addEventListener('click', function(e) {
    appendDeadWord(function() {
			var evt = document.createEvent('HTMLEvents');
			evt.initEvent('submit', true, true);
			evt.element = function (){ return evt.target; };
			form.dispatchEvent(evt);
		});

		e.preventDefault();
  }, false);
})();
