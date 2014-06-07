// ==UserScript==
// @name        MiniCalendar
// @description Google Calendar userscript based on Helvetical
// @include     https://*.google.*/calendar/render*
// @include     http://*.google.*/calendar/render*
// @include     https://*.google.*/calendar/hosted*
// @include     http://*.google.*/calendar/hosted*
// ==/UserScript==
GM_addStyle('*{font-family:"Helvetica Neue" !important;}');

document.addEventListener("keydown", function(e) {
  element = e.target;
  elementName = element.nodeName.toLowerCase();
  if (elementName == "input" || elementName == "textarea") return true;
  if (String.fromCharCode(e.which)=="U" && !e.ctrlKey && !e.metaKey) {
    toggle_gc();
    try {
      e.preventDefault();
    } catch (e) {
    }
    return false;
  }
  return true;
}, false);

var ids = [["topBar","block"],["nav","table-cell"],["guser","block"],["gbar","block"],["mainnav","block"],["sidebar","table-cell"]]
function toggle_gc ()
{
  for (var i=0; i < ids.length;i++){
    document.getElementById(ids[i][0]).style.display = (document.getElementById(ids[i][0]).style.display == "none")? ids[i][1] : "none" ;
  }
  location.assign( "javascript:_RefreshCalendarWhenDisplayedNext();void(0)" );
}
setTimeout(toggle_gc,1000);