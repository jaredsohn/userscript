// ==UserScript==
// @name           Enable Items Per Page
// @namespace      liferay
// @description    Enables the Items Per Page select box on the Liferay.com forums
// @include        http://www.liferay.com/community/forums*
// ==/UserScript==

(function() {
	var jQuery = unsafeWindow.jQuery;
	if (jQuery) {
		var deltaSelector = jQuery('<div class="delta-selector" style="float: left; margin-right: 15px;">	Items per Page	<select onchange="_19_deltaupdateDelta(this);">	<option value="5">5</option>	<option value="10">10</option>	<option value="20" selected="selected">20</option>	<option value="30">30</option>	<option value="50">50</option>	<option value="75">75</option>	</select>	</div>');

		deltaSelector.prependTo('.taglib-page-iterator .search-pages');

		var loc = location.href;

		if (loc && loc.indexOf('_19_delta=') > -1) {
			var delta = loc.match(/_19_delta=(\d+)/);

			if (delta && delta[1]) {
				delta = delta[1];

				deltaSelector.find('option[value=' + delta + ']').attr('selected', true);
			}
		}
	}
})();