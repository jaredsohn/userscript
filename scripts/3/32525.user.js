// ==UserScript==
// @name           Simulate Ajax comment in plurk mobile version
// @namespace      http://www.plurk.com/m/
// @include        http://www.plurk.com/m*
// ==/UserScript==

//to auto-expand comment or not, default is false
var AUTO_EXPAND = true;

//Custom CSS
var CUSTOM_CSS = "div.response { border-left: 5px solid #EEE;  padding-left: 3px;} form.replyBox{ margin-left: 2em; font-size:0.7em;} a.replyLink{font-size:0.7em; padding-left: 2em;}";

//Loading jQuery
var GM_JQ = document.createElement('script');
GM_JQ.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1.2.6/jquery.min.js';
GM_JQ.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(GM_JQ);

// Check if jQuery's loaded
function GM_wait() {
    if(typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(GM_wait,100); }
	else { $ = unsafeWindow.jQuery; letsJQuery(); }
}
GM_wait();

function letsJQuery(){
	//a little bit styling
	addCSS(CUSTOM_CSS);
	
	//attach event 
	$("span.meta > a").each(function(){		
		$(this).click(function(){
			getResponse(this);
			return false;
		});
		if(AUTO_EXPAND) getResponse(this);
	});		
}

function getResponse(obj, nonMobile){
	var plurk = $(obj).parents("div.plurk");
	plurk.find("div.responseList").remove();
	var div = $("<div></div>").addClass("responseList").appendTo(plurk);
	
	if(!nonMobile){ //try to load from mobile version
		var url = obj.href;
		$.ajax({ 
			url:url,
			cache:false,
			success:function(data, status){
				$(data).find("div.response").appendTo(div).end();
				var replyLink = $("<a href='#' class='replyLink'>[reply]</a>").appendTo(div);
				var form = $(data).find("form.plurkbox")
						.attr("action",obj.href)
						.removeClass("plurkbox").addClass('replyBox')
						.find("p.submit").remove().end()
						.find("br").remove().end()
						.find("input.input").after("<input type='submit' value='Plurk!'/>").end()
						.appendTo(div)
						.submit(function(){
							var params = {};
							var array = $(this).serializeArray();
							$.each(array, function(i, field){
								params[field.name] = field.value;
							});
							$.post(obj.href, params, function(data){
								getResponse(obj);
							})
							return false;
						})
						.hide();
				
				replyLink.click(function(){
					form.toggle();
					return false;
				})
			},
			error: function(){
				getResponse(obj, true);
			}
		});
	}
	else{ //try to load from normal plurk page
		var url = obj.href.replace("/m","");
		$.ajax({ 
			url: url,
			cache:false,
			success: function(data,status){
				$(data).find("div.message")
					.find("span.time").remove().end()
					.find("a.user").each(function(){
						this.href = this.href.replace("/user","/m/u");
					}).end()
					.addClass("response").appendTo(div);
				
				var q = ["asks","feels","gives","has","hates","hopes",
						"is","likes","loves","needs","says","shares","thinks",
						"want","was","will","wishes","wonders"];

				var select = $("<select/>")
								.attr("name","qualifier")
								.append("<option>:</option>");
								
				$.each(q, function(i,d){
					var o = $("<option/>").addClass("qualifier").addClass("q_" + d)
						.val(d).text(d);
					select.append(o);
				});
				
				var replyLink = $("<a href='#' class='replyLink'>[reply]</a>").appendTo(div);
				var form = $("<form/>")
					.attr("action", url)
					.addClass('replyBox')
					.append("jackysee")
					.append(select)
					.append("<input type='text' size='30' name='content' class='input'/>")
					.append("<input type='submit' value='Plurk!'/>")
					.appendTo(div)
					.submit(function(){
						var params = {};
						var array = $(this).serializeArray();
						$.each(array, function(i, field){
							params[field.name] = field.value;
						});
						$.post(retryUrl, params, function(data){
							getResponse(obj, true);
						})
						return false;
					})
					.hide();
					
				replyLink.click(function(){
					form.toggle();
					return false;
				})
			},
			error: function(){
				div.html("error occurs!");
			}
		});
	}	
}

function addCSS(newcss){
	if ($.browser.msie) {
		document.createStyleSheet().cssText = newcss;
	} else {
		var tag = document.createElement('style'); tag.type = 'text/css'; document.getElementsByTagName('head')[0].appendChild(tag); 
		tag[ $.browser.safari ? 'innerText' : 'innerHTML'] = newcss; 
	}
}