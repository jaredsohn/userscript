// ==UserScript==
// @name			Upload Indicator for Envato Updates
// @creator			userscripts@revaxarts.com
// @namespace		revaxarts.com
// @description		Adds the progress of the current uploaded item to the item title
// @date			2012-04-02
// @version			0.1
// @include			http://activeden.net/author_dashboard*
// @include			http://audiojungle.net/author_dashboard*
// @include			http://themeforest.net/author_dashboard*
// @include			http://videohive.net/author_dashboard*
// @include			http://graphicriver.net/author_dashboard*
// @include			http://3docean.net/user/author_dashboard*
// @include			http://codecanyon.net/author_dashboard*
// @include			http://marketplace.tutsplus.com/author_dashboard*
// @include			http://photodune.net/author_dashboard*
// ==/UserScript==
(function () {



	function uploadIndicator() {

		var bar = $('span.loadup');
		
		if(bar.length){
			$.each(bar, function(){
				var _this = $(this);
				_this.parent().prev().append(' <strong>('+_this.html()+')</strong>');
			});
		}
	}

	var inject = document.createElement("script");

	inject.setAttribute("type", "text/javascript");
	inject.appendChild(document.createTextNode("(" + uploadIndicator + ")()"));

	(document.head || document.documentElement).appendChild(inject);


})();