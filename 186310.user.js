// ==UserScript==
// @name			Sailthru template editor height change
// @namespace		sailthru-ace-editor-height-change
// @version			0.4.3
// @description		Changes the height of the editor used for email templates and possibly other stuff as well.
// @include			*my.sailthru.com/template*
// @include			*my.sailthru.com/page*
// @grant			none
// @copyright		2014, Me
// @downloadURL		http://userscripts.org/scripts/source/186310.user.js
// ==/UserScript==


changeEditorHeight = {
	active: false,
    addButton: function() {
        $('#wrapper').prepend('<a href="javascript: changeEditorHeight.toggle();" id="toggle_fullscreen" style="position: absolute; top: 56px; right: 10px; font-size: 12px; padding: 4px 8px; z-index: 1; border: solid 1px #E0E0E0; background: #F1F1F1; color: #303030;">Toggle full screen</a>');
    },
	toggle: function() {
		if (this.active == false) {
			this.run();
			this.active = true;
		} else {
			this.active = false;
			this.revert();
		}
	},
	run: function() {
		var el = $('#ace-editor'),
			tabs = $('.ui-tabs');
		if (el.length) {
			this.hide();
			if ($(el.parent()).height() == 360) {
				$(el.parent()).css('height', 'auto');
			}
			var newHeight = window.innerHeight - tabs.offset().top - tabs.height() - (parseInt($('.ui-tabs .ui-tabs-panel').css('padding')) * 2);
			if ($('#tab-editor').is(':visible')) {
				newHeight += 15;
			} else {
				newHeight -=145;
			}
            el.css('width', 'auto');
			el.css('height', newHeight + el.height() + 'px');
            
            if ($('.ace_content').height() < 400) {
				// Page needs to be resized
                $('#editor-tab').click();
            }
		}
	},
	revert: function() {
		var el = $('#ace-editor');
		if (el.length) {
			el.css('height', '360px');
			this.show();
            $('#editor-tab').click();
		}
	},
	hide: function() {
		$('footer, #communications_sidebar, #header_first_row').hide();
		$('#editor').css('width', '100%');
		$('.sidebar_page').css('margin', '0');
		$('#main').css('padding', '0 10px');
	},
	show: function() {
		$('footer, #communications_sidebar, #header_first_row').show();
		$('#editor').css('width', '95%');
		$('.sidebar_page').css('margin-left', '190px');
		$('#main').css('padding', '40px 20px');
	}
}

$(window).keypress(function(e) {
    // Press Ctrl + Shift + F for fullscreen
    if (e.ctrlKey && e.shiftKey && e.keyCode == 6) {
		changeEditorHeight.toggle();
    }
});

setTimeout(function() {changeEditorHeight.addButton();}, 500);