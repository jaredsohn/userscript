// ==UserScript==
// @name           Twitter - Better saved searches
// @namespace      http://iwamot.com/
// @include        http://twitter.com/*
// @include        https://twitter.com/*
// @version        1.2.0
// ==/UserScript==

(function(){
	window.addEventListener('load', onLoad, false);

	function onLoad(){
		var _setTitleAndHeading = unsafeWindow.setTitleAndHeading;
		if (!_setTitleAndHeading || !unsafeWindow.$.fn.isSaveSearchLink) return;

		unsafeWindow.setTitleAndHeading = function(H){
			_setTitleAndHeading(H);

			if (H != 'search' || $("li.status").length > 0) return;

			var page = unsafeWindow.page;
			var F = h(page.prettyQuery);
			var C = h(page.query);

			var O, G = $("#side #saved_searches ul.sidebar-menu li.active");
			if (G.length > 0) {
				var K = G.attr("id").replace("ss_", "");
				O = "<a href=\"/saved_searches/destroy/" + K + "\" title=\"" + F + "\" _query=\"" + C + "\" class=\"delete-search-link\">" + _("Remove this saved search") + "</a>";
			} else {
				O = "<a href=\"/saved_searches/create\" class=\"save-search-link\" title=\"" + F + "\" _query=\"" + C + "\" _place_details=\"" + h(page.placeDetails) + "\" _place_map_link=\"" + h(page.placeMapLink) + "\">" + _("Save this search") + "</a>";
			}

			var E = "<li class=\"name-search-link\"><a href=\"#\">" + _("Search for users &raquo;") + "</a></li>";
			E = "<ul class=\"has-saved-search\"><li>" + O + "</li>" + E + "</ul>";
			var heading = E + _("No real-time results for <b>%{query}</b>", {query: F});

			var Q = $("#timeline_heading h1");
			Q.html(heading);
			Q.find(".save-search-link").isSaveSearchLink().end().find(".delete-search-link").isRemoveSearchLink();
		}

		unsafeWindow.$.fn.isSaveSearchLink = function(){
			return this.each(function () {
				var A = $(this);
				var B = $("#saved_searches");
				var C = B.find("ul.sidebar-menu");
				A.click(function () {
/*
					if (C.find("li").length >= 10) {
						(new unsafeWindow.InfoNotification).setMessage(_("You can only save ten searches. To remove a saved search, select the search and click <strong>remove this saved search</strong>.")).show();
						return false;
					}
*/
					var D = A.attr("title");
					var F = A.attr("_query") || D;
					var E = $("<li><a href=\"/search?q=" + encodeURIComponent(F) + "\" class=\"search-link\" title=\"" + h(D) + "\" _query=\"" + h(F) + "\" _place_details=\"" + h(A.attr("_place_details")) + "\" _place_map_link=\"" + h(A.attr("_place_map_link")) + "\"><span>" + h(D) + "</span></a></li>");
					E.find("a").isSearchLink(unsafeWindow.SEARCH_CALLBACKS.savedSearchLink);
					E.fadeOut(1, function () {
						C.append(E);E.fadeIn(100);
					});
					if (B.hasClass("collapsed")) {
						B.trigger("expand");
					}
					B.fadeIn();
					$("#side ul.sidebar-menu li").removeClass("active");
					$("#side #custom_search").removeClass("active");
					E.addClass("active");
					unsafeWindow.$.ajax({
						type: "POST",
						dataType: "json",
						url: "/saved_searches/create",
						data: {
							q: F,
							authenticity_token: unsafeWindow.twttr.form_authenticity_token,
							twttr: true
						},
						beforeSend: function () {
							A.replaceWith("<span class=\"loading\">" + _("Save this search") + "</span>");
						},
						success: function (G) {
							E.attr("id", "ss_" + G.id);
							unsafeWindow.setTitleAndHeading("search");
						},
						error: function (G) {
							(new unsafeWindow.InfoNotification).setMessage(G.responseText).show();
							E.remove();
						}
					});
					return false;
				});
			});
		}
	}

	function $(str) {
		return unsafeWindow.$(str);
	}

	function _(str, hash) {
		return unsafeWindow._(str, hash);
	}

	function h(str) {
		return unsafeWindow.h(str);
	}
})();
