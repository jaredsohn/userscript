// ==UserScript==
// @name        tnm2
// @namespace   yeedomliu
// @include     http://tnm2.oa.com/attribute/create
// @include     http://tnm2.oa.com/alarm_strategy/create
// @version     1
// ==/UserScript==
// firefox浏览器jquery支持
if (unsafeWindow.jQuery) {
	jQuery = $ = unsafeWindow.jQuery;
	addRunKeeperPlugin();
} else {
	var GM_JQ = document.createElement('script');
	GM_JQ.src = 'http://appmedia.qq.com/media/jquery/jquery-1.8.0.min.js';
	GM_JQ.type = 'text/javascript';
	document.getElementsByTagName('head')[0].appendChild(GM_JQ);
	function GM_wait() {
		if (typeof unsafeWindow.jQuery == 'undefined')
			window.setTimeout(GM_wait, 100);
		else {
			jQuery = $ = unsafeWindow.jQuery;
			addRunKeeperPlugin();
		}
	}
	GM_wait();
}

/**
 * chrome浏览器jquery支持
 */
// a function that loads jQuery and calls a callback function when jQuery has
// finished loading
function addJQuery(callback) {
	var script = document.createElement("script");
	script.setAttribute("src",
			"//appmedia.qq.com/media/jquery/jquery-1.8.0.min.js");
	script.addEventListener('load', function() {
		var script = document.createElement("script");
		script.textContent = "window.$=window.jQuery=jQuery.noConflict(true);("
				+ callback.toString() + ")();";
		document.body.appendChild(script);
	}, false);
	document.body.appendChild(script);
}

// load jQuery and execute the main function
// addJQuery(addRunKeeperPlugin);

function addRunKeeperPlugin() {
	jQuery(function() {
		var url = $.trim(window.location.href);
		console.log(url);

		// 添加特性
		if ('http://tnm2.oa.com/attribute/create' == url) {
			setTimeout(function() {
				$('#ci_servicegroup_select').val('广告业务合作').change();
				setTimeout(function() {
					$('#ci_service_select').val('north虚拟化').change();
					setTimeout(function() {
						$('#ci_module_select').val('apache集群').change();

						$('#attr_type_select').val('叠加类型');
						$('#attr_unit_input').val('次');
						$('#get_valid_attr_id').click();

						$('#attr_name_input').focus();
					}, 500);
				}, 500);
			}, 500);
		}

		// 特性告警
		if ('http://tnm2.oa.com/alarm_strategy/create' == url) {
			setTimeout(function() {
				 $('#ci_servicegroup_select').val('广告业务合作').change();
				setTimeout(function() {
					$('#ci_service_select').val('north虚拟化').change();
					setTimeout(function() {
						$('#ci_module_select').val('apache集群').change();
						$('#alarm_type_select').val('数值型业务特性告警');
					}, 700);
				}, 700);
			}, 700);
		}
	});
}