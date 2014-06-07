// ==UserScript==
// @name           Read All Tweets
// @namespace      readalltweets
// @description    Twitter のタイムラインをすべて読む人のため、未読発言のみ古いものから順に表示します。 For people who read all tweets on Twitter time-line, display only unread tweets in the order beginning from oldest. 
// @include        http://twitter.com/
// @include        https://twitter.com/
// ==/UserScript==
(function(){
	var ol = document.getElementById("timeline");
	var processingDiv = document.createElement("div");
	processingDiv.setAttribute("class", "minor-notification");
	processingDiv.style.display ="block";
	processingDiv.innerHTML = 'Read All Tweets<br>PLEASE UPDATE TO <a href="https://addons.mozilla.org/ja/firefox/addon/14920/">ADD-ON VERSION</a>.Update of this script is stopped.<br><a href="https://addons.mozilla.org/ja/firefox/addon/14920/">アドオン版</a>にアップデートしてください。このスクリプトの更新は停止しています。'
	ol.parentNode.insertBefore(processingDiv, ol);

})();