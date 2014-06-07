// ==UserScript==
// @name          LJ expand turbo
// @description   super fast expand comments for LJ
// @author        trololo
// @include       http://*.livejournal.com/*
// ==/UserScript==

(function () {
	// Opera hack
	var jQuery;
	try {
		jQuery = unsafeWindow.jQuery;
	} catch (e) {
		jQuery = window.jQuery;
	}

	(function ($) {
		var jQuery = $;
		// duck punch that bastard
		$.lj.comments.prototype.expand = function(id, node) {
			node = node || jQuery('#' + id);
			if (node.hasClass(this.options.classNames.leafExpanding) ||
				node.hasClass(this.options.classNames.leafCollapsing)) {
					return;
				}
			node.addClass(this.options.classNames.leafExpanding);
			var self = this, collapsedClass = self.options.classNames.leafCollapsed, selectors = this.options.selectors, preloader, twig = node.closest(selectors.twig), twigHeight = twig.height(), leaves = $.comments.getThread(node).filter(selectors.leafCollapsed), dataFilter = function(dataExist) {
				return function() {
					var node = jQuery(this);
					return (!!node.data('full') === dataExist);
				};
			};
			if (((!node.data('full') && node.hasClass(collapsedClass)) || leaves.filter(dataFilter(false)).length > 0)) {
				// preloader = self._preloader.clone();
				// preloader.insertAfter(node).slideDown(200);
				this._fetchThread(id, jQuery.delayedCallback(function(results) {
					self._applyFetchResults(results);
					// preloader.slideUp('fast', preloader.remove.bind(preloader));
					self.expand(node.prop('id'));
				}, 500));
			} else if (node.hasClass(collapsedClass) || leaves.length > 0) {
				leaves.filter(dataFilter(true)).removeClass(collapsedClass);
				node.removeClass(this.options.classNames.leafExpanding)
					var newHeight = twig.height();
				twig
					.css({ opacity: 0, height: twigHeight })
					.animate({ opacity: 1, height: newHeight }, {
						duration: 300,
						complete: function() {
							twig.css({ opacity: '', height: '' });
						}
					});
				this.element.trigger('commentsUpdated', id);
			} else {
				node.removeClass(this.options.classNames.leafExpanding)
			}
		}
	})(jQuery);
})();
