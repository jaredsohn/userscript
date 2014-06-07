// ==UserScript==
// @name           SingSnap PM Notifier
// @match          http://www.singsnap.com/*
// ==/UserScript==





var minb = document.createElement("div");
minb.style.position = 'absolute';
minb.innerHTML = '<style>.minbox {display:block; overflow:hidden;' +
'width: 60px; height:20px; position:fixed; top:0px; left:0px;' +
'border: 1px solid #717171; background-color: #eff7fb; ' +
'font-weight:bold; font-size:12px;font-family:arial; ' +
'text-align:center;} .minbox img{display:none;}' +
'</style><script type="text/javascript"> ' +
'new Ajax.PeriodicalUpdater("new_message_count", ' +
'"http://www.singsnap.com/snap/ajax/newMessageCount", ' +
'{frequency: 30, evalScripts:true});</script> ' +
'<div class="minbox"> ' +
'<a href="http://www.singsnap.com/snap/messaging/inbox" ' +
'id="new_message_count"></a></div> ';
document.body.insertBefore(minb, document.body.firstChild);