// ==UserScript==
// @name           vote yes on sea enn enn
// @namespace      Anon1166
// @description    auto-votes yes every 5 seconds
// @include        http://www.cnn.com/US/
// ==/UserScript==

document.getElementById('cnnPollA1').click();
unsafeWindow.qvSubmitVote_52622();

window.setTimeout(function() {					
						
document.location = 'http://www.cnn.com/US/';

}, 5000);
