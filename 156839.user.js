// ==UserScript==

// @name          PasteBin JS Exec

// @namespace     http://www.sovas.lv

// @description   Exec PasteBin javascript codes. Try out example in http://pastebin.com/u6zFGfz2

// @include      http://pastebin.com/*

// ==/UserScript==

(function(){
  //boilerplate greasemonkey to wait until jQuery is defined...
  function GM_wait()
  {
    if(typeof unsafeWindow.jQuery == 'undefined')
      window.setTimeout(GM_wait,100);
    else
      unsafeWindow.jQuery(function() { letsJQuery(unsafeWindow.jQuery , unsafeWindow); });
  }
  GM_wait();

  function letsJQuery($ , usw)
  {
	var ico = '<img alt="" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAMAAAC6V+0/AAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAAqUExURX2Ch9Td55ektEZPWy42PbvH0uXm5vH1+uvx+PP3/OLb2+3u7tHSyv///7EjLhsAAAAOdFJOU/////////////////8ARcDcyAAAAJhJREFUeNqE0AkKAyEMBdD/s7nMeP/rVjum7UBpg0R8kASD8SXwEwWQOwIDpWDdL4RXIAKoLonqteyorolVeAQZB6UmDu3dYQbvXXc5gNNlvlT8xJq1Tmv+bDWbe2sbSYkLQ8gLzWbdLhc1y0EUiupMzEHDGEuXBS1R6PSImSiJw0Bd31TC3guZ3bHmmt1XZ7bl75I/4yHAAEWkDZnDccm2AAAAAElFTkSuQmCC" />';

	fullView = '<a title="Run Script" id= "imHereToRun" href="#">' + ico + '</a>';

	$('#code_buttons').append(fullView).find('#imHereToRun').click(
		function() {
			if (confirm('Run Script?')){
				try{
				  eval($('#paste_code').html());
				}
				catch(err){
				  //Handle errors here
				  alert(err);
				}
				
			}
		}
	);



  }
})();