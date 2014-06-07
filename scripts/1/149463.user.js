// ==UserScript==
// @id             VE2.0
// @name           Visual Events 2.0
// @version        1.0
// @namespace      Hasan Cengiz
// @author         Hasan Cengiz
// @description    A shortcut button for Visual Events v2.0
// @include        *
// @run-at         document-end
// ==/UserScript==

var veButton='<a href="javascript:(function(){if(typeof%20VisualEvent!=\'undefined\'){if(document.getElementById(\'Event_display\')){VisualEvent.fnClose();}else{VisualEvent.fnInit();}}else{var%20n=document.createElement(\'script\');n.setAttribute(\'language\',\'JavaScript\');n.setAttribute(\'src\',\'http://www.sprymedia.co.uk/design/event/media/js/event-loader.js\');document.body.appendChild(n);}})();;" '+
			 'style="font-weight:bold;font-size:9px;padding:0px 3px 0px 3px;display:block;border:outset 1px #454;background-color:#eef;position:fixed;top:1px;right:1px;z-index:99999999;">VE</a>';

document.body.innerHTML+=veButton;