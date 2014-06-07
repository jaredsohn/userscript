// ==UserScript==
// @name       CR Enable
// @version    0.3
// @match      http://canvasrider.com*
// @include    http://canvasrider.com*
// @grant      unsafeWindow
// ==/UserScript==

var w = unsafeWindow, d = w.document, l = w.location;
if (/draw/.test(l.href)) {
  d.getElementById('content').innerHTML =
      '<aside class="floatLeft ad"></aside>'
    + '<aside class="floatRight ad"></aside>'
    + '<canvas id="canvas_rider" width="700px" height="400px"></canvas>'
    + '<img src="images/toolbar1.png" class="toolbar" id="toolbar1" style="position:absolute" />'
    + '<img src="images/toolbar2.png" class="toolbar" id="toolbar2" style="position:absolute" />'
    + '<div id="track_menu" class="padded">'
      + '<span id="charcount">Trackcode - CTRL + V to paste</span><br /><br />'
      + '<div class="floatRight">'
        + '<input id="new"     type="button" value="NEW"    /><br />'
        + '<input id="load"    type="button" value="LOAD"   /><br />'
        + '<input id="save"    type="button" value="SAVE"   /><br />'
        + '<input id="upload"  type="button" value="UPLOAD" />'
      + '</div>'
      + '<textarea id="trackcode" rows="5"></textarea><br/>'
    + '</div>';

    var s = d.createElement('script');
  s.onload = function () { w.canvas_ride('-18 1i 18 1i###BMX'), w.DQ(), w.DQ() }, s.src = 'http://canvasrider.com/js/rc7.js';
  d.getElementById('content').appendChild(s);
}
if (/register/.test(l.href)) {
    d.getElementById('content').innerHTML =
      '<h1 class="big underlined">Register & login to upload tracks & save records</h1><br/><br/>'
    + '<form method="post" action="" onsubmit="return check();">'
      + 'Username: <input type="text" name="username" id="username" size="18" maxlength="20" value="" /><br/><br/>'
       + 'Password: <input type="password" name="password" id="password" size="18" maxlength="20" value="" /><br/><br/>'
      + 'Email: <input type="text" name="email" id="email" size="18" maxlength="35" value="" /><br/><br/>'
      + '<input type="submit" value="REGISTER"/>'
    + '</form>';
}
if (/login">/.test(document.getElementById('membership').innerHTML)) {
    document.getElementById('membership').innerHTML += ' / <a href="/register">Register</a>';
    var s = d.createElement('script');
  s.src = 'http://canvasrider.com/js/register.js';
  d.getElementById('content').appendChild(s);
}
