// ==UserScript==
// @name        amc_itil
// @namespace   yeedomliu
// @description amc申请密码
// @include     http://10.134.140.80/*
// @include     http://amc.itil.com/*
// @version     10
// ==/UserScript==

// firefox浏览器jquery支持
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

/**
 * chrome浏览器jquery支持
 */
// a function that loads jQuery and calls a callback function when jQuery has
// finished loading
function addJQuery(callback) {
	var script = document.createElement("script");
	script.setAttribute("src", "//appmedia.qq.com/media/jquery/jquery-1.8.0.min.js");
	script.addEventListener('load', function() {
		var script = document.createElement("script");
		script.textContent = "window.$=window.jQuery=jQuery.noConflict(true);("
				+ callback.toString() + ")();";
		document.body.appendChild(script);
	}, false);
	document.body.appendChild(script);
}

// load jQuery and execute the main function
//addJQuery(addRunKeeperPlugin);

function addRunKeeperPlugin() {
	jQuery(function() {
		function in_array(needle, haystack, argStrict) {
			var key = '', strict = !!argStrict;
			if (strict) {
				for (key in haystack) {
					if (haystack[key] === needle) {
						return true;
					}
				}
			} else {
				for (key in haystack) {
					if (haystack[key] == needle) {
						return true;
					}
				}
			}
			return false;
		}
		
		var $util = {
			click : function(name) {
				var evt = document.createEvent("MouseEvents");
				evt.initEvent("click", true, true);
				if ('string' == typeof name) {
					document.getElementById(name).dispatchEvent(evt);
				} else if ('object' == typeof name) {
					name.dispatchEvent(evt);
				}
			},
			log : function(argument) {
				GM_log(argument);
			},
			xpath : function xpath(query) {
				return document.evaluate(query, document, null,
						XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
			},
			request : function(url, callback, data, method) {
				method = method || 'POST';
				if ('POST' == method) {
					headers = {
						'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8',
						'X-Requested-With' : 'XMLHttpRequest',
					};
				} else {
					headers = {
						'X-Requested-With' : 'XMLHttpRequest',
					};
				}
				GM_xmlhttpRequest({
					'method' : method,
					'url' : url,
					'data' : data,
					'onload' : function(responseDetails) {
						callback(responseDetails);
					},
					'headers' : headers
				});
			},
			open : function(url) {
				GM_openInTab(url);
			},
			createElem : function(name, attrs) {
				var node_name;
				var node = document.createElement(name);
				for (node_name in attrs) {
					if (attrs.hasOwnProperty(node_name)) {
						node.setAttribute(node_name, attrs[node_name]);
					}
				}
				return node;
			},
			insertBefore : function(before, after) {
				return after.parentNode.insertBefore(before, after);
			},
			insertAfter : function(before, after) {
				return after.parentNode.insertBefore(before, after.nextSibling);
			},
			remove : function(elem) {
				var _elem = document.getElementById(elem);
				if (_elem) {
					_elem.parentNode.removeChild(_elem);
				}
			},
			addHandler : function(element, type, handler) {
				if (element.addEventListener) {
					element.addEventListener(type, handler, false);
				} else if (element.attachEvent) {
					element.attachEvent("on" + type, handler);
				} else {
					element["on" + type] = handler;
				}
			},
			getEvent : function(event) {
				// 取得事件对象
				return event ? event : window.event;
			},
			getTarget : function(event) {
				// 取得事件目标对象
				return event.target ? event.target : event.srcElement;
			},
			fireAEvent : function(ele, type) {
				//调用事件，通过GM很难调用原页面的函数，最好只从Element的事件方向处理
			    var evt = document.createEvent("Event");  
			    evt.initEvent(type, true, false);  
			    ele.dispatchEvent(evt);  
			}
		};

		setTimeout(function() {
			var url = $.trim(window.location.href);
			var showpass_url = 'http://amc.itil.com/auth/pwd_req/show.php';
			var remark_text = '业务/代码调整';
			if (url == 'http://amc.itil.com/Index.php'
					|| url == 'http://amc.itil.com/menu.php') {
				// 首页自动跳转到“口令申请”页面
				if (url == 'http://amc.itil.com/menu.php') {
					console.log($('#sd14').attr('onclick'));
					$('#sd14').click();
					$util.click($('#sd14').get(0));
				}
			} else {
				var username_obj = $util.xpath("//select[@name='username']")
						.snapshotItem(0);
				// 去掉一大块说明
				var block_text = $util.xpath("//table[@width='580']")
						.snapshotItem(0);
				if (block_text) {
					block_text.style.display = 'none';
				}
				
				var frameset = $util.xpath("//FRAMESET").snapshotItem(0);
				if (frameset) {
					frameset.setAttribute('rows', '250,210,*');
				}
				// 去掉块状样式
				var tr_type = $util.xpath("//tr[@id='tr_type']")
						.snapshotItem(0);
				if (tr_type) {
					tr_type.setAttribute('style', '');
				}
				if (username_obj) {
					username_obj.setAttribute('id', 'username');
					var types = $util.xpath("//option");
					for ( var i = 0, j = types.snapshotLength; i < j; i++) {
						var type_option = types.snapshotItem(i);
						if (type_option.value == '业务/代码调整') {
							type_option.setAttribute('selected', 'selected');
							break;
						}
					}
					jQuery('textarea[name=sub_remark]').val(remark_text);
					jQuery('input[name=remark]').val(remark_text);
					jQuery('input[name=ip]').attr('size', 100).attr('maxlength', 100).addClass('span10').val('10.171.12.20 10.163.3.77').mouseover(function() {
						$(this).select();
					}).focus();
				}
			}
			
			// 显示密码页面
			if (url.substr(0, showpass_url.length) == showpass_url) {
				jQuery.each(jQuery('tr[height=25]'), function(index, item) {
					var th = jQuery(this);
					var label = jQuery('label', th);
					console.log('<input type="text" value="' + label.html() + '" class="pass_class">');
					label.html('<input type="text" value="' + label.html() + '" class="pass_class">');
				});
				jQuery('.pass_class').mouseover(function() {
					jQuery(this).select();
				});
			}

			// 把申请表单多余部分删除掉(申请部门、用户类型、申请类别、申请原因)
			if (url == 'http://amc.itil.com/auth/pwd_req/req.php') {
				var del_index = [ 3, 4, 6, 7 ];
				jQuery.each(jQuery('table tr'), function(index, item) {
					if (in_array(index, del_index)) {
						jQuery(item).hide();
					}
				});
				
				// 添加bootstrap样式
				var head, style;
				head = document.getElementsByTagName('head')[0];
				if (!head) { return; }
				style = document.createElement('link');
				style.type = 'text/css';
				style.rel = 'stylesheet';
				style.href = 'http://appmedia.qq.com/media/tae/bootstrap/css/bootstrap.min.css';
				head.appendChild(style);
				
				$('table').addClass('table');
				
				$('tr td[height=1]').remove();
			}
			
//			function apply_pass(ip) {
//				ip = $.trim(ip);
//				GM_xmlhttpRequest({
//					method: "post",
//					url: "http://amc.itil.com/auth/pwd_req/post.php",
//					headers: { "Content-type" : "application/x-www-form-urlencoded" },
//					data: encodeURI("departname=6&username=admin&ip="+ip+"&pwd_req_type"+remark_text+"&sub_remark="+remark_text+"&remark="+remark_text),
//					onload: function(e) { alert(e.responseText); }
//				});
//			}

			var btn_submit = $($('input[type=button]').get(0));
			var btn_batchsubmit = $('<input type="button" id="batchsubmit" value="    提  交    " class="btn btn-primary" size="8">');
			$('#batchsubmit').remove();
			btn_submit.after(btn_batchsubmit);
			btn_submit.hide();
			btn_batchsubmit.click(function() {
				var input_ip = $('input[name=ip]');
				var origin_ip = $.trim(input_ip.val());
				var ip_string = ' ' + origin_ip + ' stop';
				var re = /(?:\s|;)(\S+)/ig;    
				var r = "";
				var index = 0;
				var internal = 500;
				var apply_pass = function(ip, index, internal) {
					setTimeout(function() {
						if ('stop' == ip) {
							input_ip.val(origin_ip);
						} else {
							input_ip.val(ip);
							btn_submit.click();
						}
						console.log(ip);
					},index * internal);
				}
				while(r = re.exec(ip_string)) {
					console.log(r[1]);
					apply_pass(r[1], ++index, internal);
				}
				return false;
			});

		}, 100);
	});
}
