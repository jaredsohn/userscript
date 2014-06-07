// ==UserScript==
// @name           Jetblue: 1 adult selected by default
// @namespace      http://paulirish.com/greasemonkey
// @description    When the jetblue.com homepage loads, 1 Adult is selected by default, making the whole process a bit quicker.
// @include        http://www.jetblue.com/
// ==/UserScript==



	document.getElementById('selectObj_0').innerHTML = '<h4>1 Adult</h4> <ul style="display: none;"><li value="0">0 Adults</li><li value="1">1 Adult</li><li value="2">2 Adults</li><li value="3">3 Adults</li> <li value="4">4 Adults</li><li value="5">5 Adults</li><li value="6">6 Adults</li><li value="7">7 Adults</li><li value="8">8 Adults</li><li value="9">9 Adults</li></ul><input type="hidden" value="1" name="ADULT" id="ADULT"/>';
