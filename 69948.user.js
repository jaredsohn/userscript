// ==UserScript==
// @name           Class Checker
// @namespace      http://www.registrar.ucla.edu/schedule/detselect.aspx?termsel=10S&subareasel=LIFESCI&idxcrs=0002++++
// @include        if (document.getElementById('dgdLectureHeaderLIFESCI0002').innerHTML.split('Closed').length == 14)
// @include            setTimeout(function() {location.href = location.href;}, 10000);
// @include        else
// @include            window.open('http://www.youtube.com/watch?v=bpV5InLw52U#t=01m00s');
// ==/UserScript==