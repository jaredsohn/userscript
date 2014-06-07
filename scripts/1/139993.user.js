// ==UserScript==
// @name        IISc MMCR
// @author      Biplab Sarkar (sarkarbiplab@gmail.com)
// @namespace   http://www.cpdm.iisc.ernet.in/~biplab
// @license     GNU GPL v3 (http://www.gnu.org/copyleft/gpl.html) 
// @description Adds Download option for IISc MMCR videos
// @include     http://mmcr.iisc.ernet.in:8008/cgi-bin/nwayfiles.py?*
// @require     http://code.jquery.com/jquery-latest.min.js
// @version     1.1
// ==/UserScript==

// Load jQuery script explicitly. Required for google chrome
function addJQuery(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "//code.jquery.com/jquery-latest.min.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "(" + callback.toString() + ")();";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}

addJQuery(function () {
  jQuery('table > tbody > tr > td > a').each(function() {
    this.href = this.href.replace(/client=other/,"client=download");
    if (jQuery(this).text() == "VLC") {
      jQuery(this).text("VLC|Download");
    }
  });
});






