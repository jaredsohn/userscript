// ==UserScript==
// @name          Yet another TF2R multiline
// @namespace     http://tf2r.com/chat.html
// @version       0.1.2
// @description   It's always textarea there because why not. Shift+Enter or Ctrl+Enter for new line
// @match         http://tf2r.com/chat.html
// ==/UserScript==

(function() {
    var embedMe = function() {
    	// took this from http://stackoverflow.com/questions/946534/insert-text-into-textarea-with-jquery/946556#946556/ and modified a little
        jQuery.fn.insertAtCaret = function(myValue){
            return this.each(function(i) {
                if (document.selection) {
                    //For browsers like Internet Explorer
                    this.focus();
                    var sel = document.selection.createRange();
                    sel.text = myValue;
                    this.focus();
                }
                else if (this.selectionStart || this.selectionStart == '0') {
                    //For browsers like Firefox and Webkit based
                    var startPos = this.selectionStart;
                    var endPos = this.selectionEnd;
                    var scrollTop = this.scrollTop;
                    this.value = this.value.substring(0, startPos) + myValue +this.value.substring(endPos,this.value.length);
                    this.focus();
                    this.selectionStart = startPos + myValue.length;
                    this.selectionEnd = startPos + myValue.length;
                    this.scrollTop = scrollTop;
                } else if (this.hasOwnProperty('value')) {
                    this.value += myValue;
                    this.focus();
                }
            });
        };
        
        var originalInput = $('#feedtext');
        originalInput.closest('table').find('td').css('vertical-align', 'top');
        
        // Extra styles for textarea
        var collapsedStyle = {
            	height: '12px',
            	minHeight: 0,
            	overflow: 'hidden',
                resize: 'none',
            	whiteSpace: 'nowrap',
            	lineHeight: '100%'
            },
            expandedStyle = {
                height: 'auto',
            	minHeight: '72px',
            	overflow: 'auto',
                resize: 'vertical',
            	whiteSpace: 'normal',
                lineHeight: '17px'
            };
        
        var textarea = $('<textarea></textarea>').css({
            width: 660,
            margin: '2px 0',
            padding: '4px 5px 5px',
        	fontFamily: 'sans-serif',
			fontSize: '13px',
			lineHeight: '100%',
            '-webkit-transition': 'height ease-in-out 85ms',
            '-moz-transition': 'height ease-in-out 85ms',
			transition: 'height ease-in-out 85ms'
        });
        textarea.insertAfter('#feedtext');
        originalInput.detach();
        textarea.attr('id', 'feedtext').css(collapsedStyle);
        
        if (!jQuery.fn.prop) {
    		jQuery.fn.prop = jQuery.fn.attr;
		}
        
        textarea.keydown(function (e) {
            if ((e.ctrlKey || e.shiftKey) && e.keyCode == 13) {
                var oldScrollHeight = textarea.prop('scrollHeight');
                textarea.css(expandedStyle);
                textarea.insertAtCaret('\n', false);
                if (!isNaN(parseFloat(oldScrollHeight))) {
                    textarea.scrollTop(textarea.scrollTop() + (textarea.prop('scrollHeight') - oldScrollHeight));
                }
                return false;
            } else if (e.keyCode == 13) {
                if (/^\s*$/.test(textarea.val())) {
                	textarea.val('');
                    return false;
                }                
                postChat();
                textarea.val('').css(collapsedStyle);
                return false;
            }
        }).blur(function() {
            if (textarea.val() == '') {
            	textarea.css(collapsedStyle);
            }
		}).focus(function() {
            if (textarea.val() != '' && /\n/.test(textarea.val())) {
            	textarea.css(expandedStyle);
            }
		});
	};
    
	var script = document.createElement('script');
	script.setAttribute('type', 'text/javascript');
	script.appendChild(document.createTextNode('('+ embedMe +')();'));
	(document.head || document.body || document.documentElement).appendChild(script);
})();
