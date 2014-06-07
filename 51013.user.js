// ==UserScript==
// @name           sourceforge-release-mass-edit
// @namespace      net.radebatz
// @description    Mass edit a file release on sourceforge where platform/filetype are the same for all files
// @include        https://sourceforge.net/project/admin/editreleases.php*
// ==/UserScript==

(function() {
  var selectElems = document.getElementsByTagName("select");
	for (var ii=0; ii < selectElems.length; ++ii) {
		var select = selectElems[ii];
		if ("processor_id" == select.getAttribute("name")) {
      for (var jj=0; jj < select.options.length; ++jj) {
        if ('8500' == select.options[jj].value && select.selectedIndex != jj) {
          select.selectedIndex = jj;
          // mark as not done yet
          // now, this gets messy as the generated DOM is not quite valid :/
          var nextSib = select.form;
          while (nextSib = nextSib.nextSibling) {
            if ('TR' == nextSib.nodeName) {
              nextSib.setAttribute("bgcolor", "#c55");
              break;
            }
          }
          // also set new target for form to avoid reloading...
          select.form.target = "_new";
          break;
        }
      }
		}
		if ("type_id" == select.getAttribute("name")) {
      for (var jj=0; jj < select.options.length; ++jj) {
        if ('5000' == select.options[jj].value) {
          select.selectedIndex = jj;
          break;
        }
      }
		}
	}
})();
