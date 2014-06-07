// ==UserScript==
// @name           WykopowyKinomaniak
// @namespace      http://localhost
// @description    Przyjemne oglądanie filmów na Wykopie
// @copyright      Dawid Nowak (MacDada), http://dnowak.pl
// @license        GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @include        http://www.wykop.pl/link/*
// ==/UserScript==

(function() {

	function WykopowyKinomaniak() {
		var $body = $('body'), 
			$ve = $('#body-con .videoembed'),
			$hide,
			kursorTimeout,
			mousemoveEvent;
		    
		// ładuję tylko na stronie z zaembedowanym filmem:
		if ($('iframe', $ve).length || $('object', $ve).length) {
			
			// style ukrywania
			$('<style>body {height:auto} body.kinomaniak, body.kinomaniak #body-con, body.kinomaniak .videoembed {background:black} body.kinomaniak .videoembed {border:none} body.kinomaniak {cursor:none} body.kinomaniak.kinomaniak-kursorwidoczny {cursor:auto}</style>').appendTo('head');
			
			// ikonka kinomaniaka
			$('<style>#kinomaniak {opacity:0.5;border:1px solid gray;cursor:pointer;position:absolute;top:5px;right:20px;width:64px;height:63px;border-radius:7px;background-image:url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAAA/CAMAAABnwz74AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBNYWNpbnRvc2giIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NTg3NkEzREI1OUQyMTFFMTlENDlDMzNCMkFDOERFN0MiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NTg3NkEzREM1OUQyMTFFMTlENDlDMzNCMkFDOERFN0MiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo1ODc2QTNEOTU5RDIxMUUxOUQ0OUMzM0IyQUM4REU3QyIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo1ODc2QTNEQTU5RDIxMUUxOUQ0OUMzM0IyQUM4REU3QyIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PvSQLXMAAABgUExURQAAALGxsTU1NUZGRpeXl2NjY/T09G9vb1NTUwwMDOPj4+/v76qqqnV1dfr6+tvb28/PzxMTExoaGoODg6OjoysrK3p6egUFBdTU1IqKiiMjI8DAwAEBAf///+jo6P///6KOTzoAAAHZSURBVHja7JbZloMgDIYpuBQXrFvdesz7v+UAdtEqGmQu5mJyZXP6f0r4SSDELRryVyOnxWOd6x8oMU+TDACCmz9bIL3EKjd49FBPlXqKyH/m+uGdE91+3ZpSwCw6/dF0nOfa3Y+oYBmJfB8LlrmgNuuv8B0hyaPv3M24inxcAYIiWeWgxC5ARbaRE4ZFPAJARroN6LF6SLAlNEW2DejQAOCbgNIV4KP1keEYoAEXwzlEb6PJSdgqBoXJyrGTj2TccS4wt4SHh9mCeq8hHBNuxX5L89tduaj4YVdkF/PbwxzVmI36w3HAHAElDNQJoNpf0jsAdPWEV7gBpNWdlrDrISRAnAZUk9fq0wB1EJLaYRc6LXdxYu3oROez8GsAU0u4YwF9MqoQL1/G+mdUWl4r+QiRbPQMoDp3WZTiq2zTXNqLntEXAQyqz3P9cCL0i1M1iCXlaq+neuka0GR7s8QUg56AGqCuLqGtnk27Hk53iQFGbqdvWoiaD6AW0NkB/GfdngB50EVv6aFp514AOfit3FSCoAuAeqBWHvLIEiCLYuEmD+L8XQv+3ha0m2TNU/INkEMD7abZX2eAXmDdJLs6I2uArGyLNFHKPm3W+3ShJmTkPza6xo8AAwAxTqU+KOvxqQAAAABJRU5ErkJggg==")} body.kinomaniak #kinomaniak {opacity:0.2}</style>').appendTo('head');
			
			// guziczek włączania trybu:
			$('<span id="kinomaniak" title="WykopowyKinomaniak"></span>').appendTo($ve).click(function(e) {
				e.preventDefault();
				if ($body.hasClass('kinomaniak')) {
					// wyłączam kinomaniaka:
					$hide.show();
					$body.removeClass('kinomaniak').removeClass('kinomaniak-kursorwidoczny').unbind(mousemoveEvent);
					clearTimeout(kursorTimeout);
				} else {
					// włączam kinomaniaka:
					$hide = $('body > *:not(#body-con), #body-con > *:not(.videoembed)').fadeOut();
					// znikanie myszki:
					$body.addClass('kinomaniak').bind('mousemove', function(e) {
						mousemoveEvent = e;
						$body.addClass('kinomaniak-kursorwidoczny');
						clearTimeout(kursorTimeout);
						kursorTimeout = setTimeout(function() {
							unsafeWindow.console.log('ukrywam');
							$body.removeClass('kinomaniak-kursorwidoczny');
						}, 1000);
					});
				}
			});
		}
	}; // eo main()
	
	
	function addJQuery(callback) {
		var script = document.createElement("script");
		script.textContent = "(" + callback.toString() + ")();";
		document.body.appendChild(script);
	};
	
	
	// ładuję jQuery:
	if ('undefined' == typeof $) {
		if (unsafeWindow.jQuery) {
			// Firefox:
			var $ = unsafeWindow.jQuery;
			WykopowyKinomaniak();
		} else {
			// Chrome:
			addJQuery(WykopowyKinomaniak);
		}
	} else {
		// Opera:
		WykopowyKinomaniak();
	}

})();