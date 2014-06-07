// ==UserScript==
// @name           GayRomeo - Odd Age Search
// @namespace      http://gr-tools.justlep.net
// @description    Adds missing odd values to the two age dropdown lists of GayRomeo's extended searchform.
// @include        http*://www.planetromeo.com*search/index.php?action=showForm&searchType=userDetail
// @include        http*://www.gayromeo.com*search/index.php?action=showForm&searchType=userDetail
// @include        http*://www.planetromeo.com*search/*action=showForm&searchType=escortDetail
// @include        http*://www.gayromeo.com*search/*action=showForm&searchType=escortDetail
// @version	$Revision: 1.4 $
// @author LeP <gr-tools@justlep.net>
// ==/UserScript==

({
	fillAges: function(sel) {
		var opts = sel.getElementsByTagName('option');
		for (var i=opts.length-1; i>=0; i--) {
			var opt = opts[i],
				val = parseInt(opt.value,10),
				newVal = val+1;
			if (val%2 || newVal<10) continue;

			var newOpt = document.wrappedJSObject.createElement('option');
			newOpt.value = newVal;
			newOpt.innerHTML = newVal;

			if (opt.nextSibling) 
				sel.insertBefore(newOpt, opt.nextSibling);
			else sel.appendChild(newOpt);
		}

	},
	
	init: function() {
		var f = unsafeWindow.document.userDetailSearchForm;
		this.fillAges(f.alter1);
		this.fillAges(f.alter2);
	}

}).init();