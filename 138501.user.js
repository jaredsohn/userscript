// ==UserScript==
// @name           Private - add discover stylesheet
// @namespace      http://bejeweledcheats.com
// @description    Testing
// @copyright      2009, fittyfitty <fittyfitty@hotmail.com> (http://www.bejeweledcheats.com)
// @include        http://acpaucweb02-02.nineentertainmentco.com.au/services/cathaypacific/discoveryservice.svc/GetPageMarkup*
// ==/UserScript==

var ss = document.createElement("link");
ss.type = "text/css";
ss.rel = "stylesheet";
ss.href = "http://discovery-live.herokuapp.com/css/application.css";
document.getElementsByTagName("head")[0].appendChild(ss);
