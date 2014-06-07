// ==UserScript==
// @name          Facebook instant application block
// @namespace     http://code.google.com/p/ecmanaut/
// @description   Clicks "Close" and "Okay" for you in Facebook application block dialogs, so it isn't as tedious going through uninteresting app invites.
// @include       http://www.facebook.com/reqs.php*
// @require       http://ecmanaut.googlecode.com/svn/trunk/lib/gm/$x$X.js
// ==/UserScript==

document.body.addEventListener('DOMNodeInserted', yes, false);

$x('//a[.="Block This Application"]').forEach(function buttonize(a) {
  a.className = 'inputbutton' + (a.className ? ' ' + a.className : '');
  a.title = 'Instantly block this app'+
    ' (c/o Facebook instant application block user script)';
});

function yes(e) {
  function nuke() {
    yes.eh = null;
    var aye = $X('//div[@class="pop_container_advanced"]' +
                 '[.//h2[.="Block Application?"]]//input' +
                 '[@class="UIButton_Text" and @value[.="Okay" or .="Close"]]');
    if (aye) {
      aye.id = 'yesyesyes';
      location.href = 'javascript:void($("yesyesyes").click())';
    }
  }
  if (yes.eh)
    clearTimeout(yes.eh);
  yes.eh = setTimeout(nuke, 100);
}
