// ==UserScript==
// @name         vBulletin 5 Quote Selected Text
// @namespace    http://userscripts.org/users/527495
// @description  Quote selected text in a post.
// @downloadURL  http://userscripts.org/scripts/show/175829
// @grant        none
// @include      http*
// @version      1.0
// @date         2013-08-15
// @creator      noypiscripter
// ==/UserScript==

(function() {	
	var main = function() {

		$(function() {
            var getSelectionHtml = function() {};
            if (typeof window.getSelection != 'undefined') {
                getSelectionHtml = function() {
                    var sel = window.getSelection(), html = '';
                    if (sel.rangeCount) {
                        var container = document.createElement('div');
                        for (var i = 0, len = sel.rangeCount; i < len; ++i) {
                            container.appendChild(sel.getRangeAt(i).cloneContents());
                        }
                        html = container.innerHTML;
                    }
                    return html;
                };
            }
            else if (typeof document.selection != 'undefined') {
                getSelectionHtml = function() {
                    var html = '';
                    if (document.selection.type == 'Text') {
                        html = document.selection.createRange().htmlText;
                    }
                    return html;
                }
            }
            else {
                return;
            }

            var quote = {text: '', nodeid: 0, author: ''};
            
            $(document).on('mouseup', '.js-post__content-text, .js-post__content', function(e) {
                var $textContainer = $(this);
                if ($(e.target).closest('.b-media, .b-post__footer, .post-signature, .b-post__edit, .b-post-attachments').length) {
                    return;
                }
                quote.text = $.trim(getSelectionHtml());
                if (quote.text) {
                    var $postItem = $textContainer.closest('.b-post');
                    quote.nodeid = $postItem.data('node-id');
                    quote.author = $postItem.is('.b-comment') ? $postItem.find('.b-media__body .b-comment__author').html() : $postItem.find('.b-userinfo .b-userinfo__details .author a').text();
                    var $quoteCtrl = $('#vb5QuoteSelectedTextByNoypiscripter_QuoteCtrl');
                    if (!$quoteCtrl.length) {
                        $quoteCtrl = $('.js-post-control__quote')
                            .first()
                            .clone()
                            .addClass('b-button b-button--primary')
                            .removeClass('js-post-control__quote') 
                            .css({'font-size': '11px', 'line-height': '18px', 'color': ($('.b-button--primary').css('color') || '#FFF'), 'box-shadow': '2px 2px 3px ' + $textContainer.css('color')})
                            .on('click', function(e) {
                                var $jsEditor = $('.js-editor');
                                $(document).off('mousedown.vb5QuoteSelectedTextByNoypiscripter');
                                var editor = vBulletin.ckeditor.getEditor($jsEditor);
                                if (editor) {
                                    var content = '[QUOTE=' + quote.author +';n' + quote.nodeid + ']' + quote.text + '[/QUOTE]<br />';
                                    editor.insertHtml(content);
                                    editor.focus();
                                    vBulletin.animateScrollTop($('.js-content-entry').offset().top, {duration: 500,complete: function() {
                                        vBulletin.ckeditor.focusEditor($jsEditor);
                                    }});                                            
                                }
                                else {
                                    $jsEditor.val(quote.text.replace(/\<br(\s*\/|)\>/gi, '\n'));
                                }
                                $(this).parent().hide();
                            })
                            .wrap('<ul></ul>')
                            .parent()
                            .attr('id', 'vb5QuoteSelectedTextByNoypiscripter_QuoteCtrl')
                            .css('position', 'absolute')
                            .hide()
                            .appendTo('body');                            
                    }
                    
                    $quoteCtrl.css({'left': e.pageX + 5, 'top': e.pageY - 30}).fadeIn('slow');
                   
                    $(document).on('mousedown.vb5QuoteSelectedTextByNoypiscripter', function(e) {
                        if (!$(e.target).closest('#vb5QuoteSelectedTextByNoypiscripter_QuoteCtrl').length && $quoteCtrl.is(':visible')) {
                            $quoteCtrl.hide();
                        }
                    });
                }
            });
		});
	};

	var lazyLoader = function() {
		//this script applies to all vBulletin 5+ sites only
		if (typeof window.vBulletin === 'object' && document.querySelector('.js-post-control__quote')) {
			var lazyScript = document.getElementById('vb5QuoteSelectedTextByNoypiscripter_lazyScript'),
				lazyScriptBody = (lazyScript.textContent || '').replace(/\/\*/, '').replace(/\*\//, '');
			eval(lazyScriptBody);
		}
	}
	
	var lazyScript = document.createElement('script');
	lazyScript.type = 'text/javascript';
	lazyScript.id = 'vb5QuoteSelectedTextByNoypiscripter_lazyScript';
	lazyScript.textContent = '/* (' + main.toString() + ')(); */';
	document.body.appendChild(lazyScript);

	var lazyLoaderScript = document.createElement('script');
	lazyLoaderScript.type = 'text/javascript';
	lazyLoaderScript.id = 'vb5QuoteSelectedTextByNoypiscripter_lazyScriptLoader';
	lazyLoaderScript.textContent = '(' + lazyLoader.toString() + ')();';
	document.body.appendChild(lazyLoaderScript);

})();