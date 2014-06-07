// ==UserScript==
// @name           QuickPage Translator
// @author		   F1u5h3r
// @description    Currently contains only German to English translation. Press Alt+"Double Leftclick" to initiate the translation. A bubble with possible results will show up.
// @include        *
// @require http://ajax.googleapis.com/ajax/libs/jquery/1.8.1/jquery.min.js
// ==/UserScript==

(function($) {
	$.fn.translationBubble = function(cssPrefix) {

		var object = $(this);
		var pageHeight = $(document).height();
		var pageWidth = $(document).width();
		var css = "#"+cssPrefix+"{z-index:10000;width:330px;height:95px;font-size:13px;position:absolute;visibility:hidden;text-align:center;background-color:#fff0a0;background-image:linear-gradient(top,hsla(0,0%,100%,.5), hsla(0,0%,100%,0));border-radius:5px;box-shadow:inset 0 1px 1px hsla(0,0%,100%,.5), 3px 3px 0 hsla(0,0%,0%,.1);color:#333;display:inline-block;text-shadow:0 1px 1px hsla(0,0%,100%,.5);padding:5px;}."+cssPrefix+"-left:after,."+cssPrefix+"-left:before{border-bottom:25px solid transparent;border-right:25px solid #fff0a0;bottom:-25px;content:'';position:absolute;right:300px;}."+cssPrefix+"-left:before{border-right:25px solid hsla(0,0%,0%,.1);bottom:-28px;right:297px;}."+cssPrefix+"-topleft:after,."+cssPrefix+"-topleft:before{border-right:25px solid transparent;border-bottom:25px solid #fff7ca;bottom:100px;content:'';position:absolute;right:308px;}."+cssPrefix+"-topright:after,."+cssPrefix+"-topright:before{border-left:25px solid transparent;border-bottom:25px solid #fff0a0;bottom:99px;content:'';position:absolute;right:10px;}."+cssPrefix+"-right:after,."+cssPrefix+"-right:before{border-bottom:25px solid transparent;border-right:25px solid #fff0a0;bottom:-25px;content:'';position:absolute;right:10px;}."+cssPrefix+"-right:before{border-right:25px solid hsla(0,0%,0%,.1);bottom:-28px;right:7px;}#"+cssPrefix+"-inner{height:95px;width:330px;position:relative;overflow-y:scroll;overflow-x:hidden;}#"+cssPrefix+"-table{table-layout:fixed;width:317px;border:.5px;}#"+cssPrefix+"-close{position:absolute;right:-6px;top:-11px;z-index:9999;cursor:pointer;}#"+cssPrefix+" a{color:#000;text-decoration:none;}#"+cssPrefix+"-table tr{height:15px;width:50px;}#"+cssPrefix+"-table td{background-color:rgba(232,232,232,0.37);border-bottom:1px solid #CCC;padding-left:6px;padding-right:6px;height:15px;}."+cssPrefix+"-topleft:before,."+cssPrefix+"-topright:before{border-right:0!important;}";
		var head = document.getElementsByTagName('head')[0];
		var styleElement = document.createElement('style');
		styleElement.setAttribute('type', 'text/css');
		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
	    } else {
	        styleElement.appendChild(document.createTextNode(css));
	    }
	    head.appendChild(styleElement);

	    $('body').append('<div id="'+cssPrefix+'"><a id="'+cssPrefix+'-close">X</a><div id="'+cssPrefix+'-inner"><table id="'+cssPrefix+'-table"></table></div><img id="'+cssPrefix+'-loader" alt="" src="ajax-loader.gif" style="margin-top: 35px"></div>');

		$(document).ready(function() {
			$("#"+cssPrefix+"-close").click(function() {
				$("#"+cssPrefix+"").css("visibility", "hidden");
			});

			$(object).mousedown(function(event) {
				if(event.altKey) {
					$(object).mouseup(function() {
						if(getSelected() != ""){
							$("#"+cssPrefix+"-inner").scrollTop(0);
							getTranslation(getSelected());
							repositionBubble(event.pageX, event.pageY);	
						}
					});
				}
			});

			$(object).dblclick(function(event) {
				if(event.altKey) {
					$("#"+cssPrefix+"-inner").scrollTop(0);
					getTranslation(getSelected());
					repositionBubble(event.pageX, event.pageY);
				}
			});

			function repositionBubble(pageX, pageY) {
				var bubbleHeight = $("#"+cssPrefix+"").height() + 48;
				var bubbleWidth = $("#"+cssPrefix+"").width();
				$("#"+cssPrefix+"").removeClass(cssPrefix+"-left " + cssPrefix+"-topleft " + cssPrefix+"-topright " + cssPrefix+"-right " + cssPrefix+"-bottomright");
				if((pageY - bubbleHeight) < 0) {
					if((pageX + bubbleWidth) > pageWidth) {
						$("#"+cssPrefix+"").addClass(cssPrefix+"-topright");
						$("#"+cssPrefix+"").css('left', pageX - bubbleWidth);
						$("#"+cssPrefix+"").css('top', pageY + 20);
					}
					else {
						$("#"+cssPrefix+"").addClass(cssPrefix+"-topleft");
						$("#"+cssPrefix+"").css('left', pageX - 2);
						$("#"+cssPrefix+"").css('top', pageY + 20);	
					}
				} 
				else if ((pageX + bubbleWidth) > pageWidth) {
					$("#"+cssPrefix+"").addClass(cssPrefix+"-right");
					$("#"+cssPrefix+"").css('left', pageX - bubbleWidth);
					$("#"+cssPrefix+"").css('top', pageY - bubbleHeight + 2);
				} 
				else {
					$("#"+cssPrefix+"").addClass(cssPrefix+"-left");
					$("#"+cssPrefix+"").css('left', pageX - 26);
					$("#"+cssPrefix+"").css('top', pageY - bubbleHeight);
				}
				$("#"+cssPrefix+"").css('visibility', "visible");
			}

			function getSelected() {
				var t = '';
				if(window.getSelection) {
					t = window.getSelection();
				}else if(document.getSelection) {
					t = document.getSelection();
				}else if(document.selection) {
					t = document.selection.createRange().text;
				}
				return t.toString();
			}

			function getTranslation(wordToTranslate) {
				$("#"+cssPrefix+"-loader").css('visibility', "visible");
				$("#"+cssPrefix+"-inner").css('display', "none");
				$.ajax({
				    url: 'http://www.dict.cc/?s=' + wordToTranslate,
				    type: 'GET',
				    success: function(res) {
				        var headline = $(res.responseText).find("table:has(tr#tr1)");
				        var words = $(res.responseText).find('tr[id^="tr"]');
				        words.find("td.td7cml").remove();
				        words.find("td.td7cmr").remove();
				        words.find("div").remove();
				        replaceAndKeepContent(words, "p", "span");
				        $("#"+cssPrefix+" #"+cssPrefix+"-table").html(words);
				        $("#"+cssPrefix+"-loader").css('visibility', 'hidden');
				        $("#"+cssPrefix+"-inner").css('display', "block");
				    }
				});
			}

			function replaceAndKeepContent(words, tagToReplace, replacementTag) {
				var elem = words.find(tagToReplace);
				$(elem).each(function() {
				    var outer = this.outerHTML;
				    var regex = new RegExp('<' + this.tagName, 'i');
				    var newTag = outer.replace(regex, '<' + replacementTag);
				    regex = new RegExp('</' + this.tagName, 'i');
				    newTag = newTag.replace(regex, '</' + replacementTag);
				    $(this).replaceWith(newTag);
				});
			}
		});

		
		function doAjax(word){
			if(url.match('^http')){
			    $.getJSON("http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20html%20where%20url%3D%22http%3A%2F%2Fwww.dict.cc%2F%3Fs%3D"+
			            encodeURIComponent(word)+"%22%20and%20xpath%3D%22%2Fhtml%2Fbody%2Fdiv%5B4%5D%2Ftable%5B2%5D%2Ftr%5B%40id%5D%22",
				    function(data){
				    	if(data.results[0]){
				        	console.log(data.results[0]);
				    	} else {
				    		var errormsg = '<p>Error: could not load the page.</p>';
				    		console.log(errormsg);
				      	}
				    }
			  	);
			} else {
			  //$('#target').load(url);
			}
		}
	};
})(jQuery);

function init() {
	$('body').append('<script>$("body").translationBubble("wrapper");</script>');
}

init();

/**
 * jQuery.ajax mid - CROSS DOMAIN AJAX
 * ---
 * @author James Padolsey (http://james.padolsey.com)
 * @version 0.11
 * @updated 12-JAN-10
 * ---
 * Note: Read the README!
 * ---
 * @info http://james.padolsey.com/javascript/cross-domain-requests-with-jquery/
 */

jQuery.ajax = (function(_ajax){
    var protocol = location.protocol,
        hostname = location.hostname,
        exRegex = RegExp(protocol + '//' + hostname),
        YQL = 'http' + (/^https/.test(protocol)?'s':'') + '://query.yahooapis.com/v1/public/yql?callback=?',
        query = 'select * from html where url="{URL}" and xpath="*"';
   
    function isExternal(url) {
        return !exRegex.test(url) && /:\/\//.test(url);
    }
   
    return function(o) {
       
        var url = o.url;
       
        if ( /get/i.test(o.type) && !/json/i.test(o.dataType) && isExternal(url) ) {
           
            // Manipulate options so that JSONP-x request is made to YQL
           
            o.url = YQL;
            o.dataType = 'json';
           
            o.data = {
                q: query.replace(
                    '{URL}',
                    url + (o.data ?
                        (/\?/.test(url) ? '&' : '?') + jQuery.param(o.data)
                    : '')
                ),
                format: 'xml'
            };
           
            // Since it's a JSONP request
            // complete === success
            if (!o.success && o.complete) {
                o.success = o.complete;
                delete o.complete;
            }
           
            o.success = (function(_success){
                return function(data) {
                   
                    if (_success) {
                        try {
                                // Fake XHR callback.
                                _success.call(this, {
                                    responseText: data.results[0]
                                        // YQL screws with <script>s
                                        // Get rid of them
                                        .replace(/<script[^>]+?\/>|<script(.|\s)*?\/script>/gi, '')
                                }, 'success');
                        } catch (e) {}
                    }
                   
                };
            })(o.success);
           
        }
       
        return _ajax.apply(this, arguments);
       
    };
   
})(jQuery.ajax);
