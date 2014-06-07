// ==UserScript==
// @name         Rally Utils
// @namespace    ar.com.eduardocuomo.rally-utils
// @version      1.1.1
// @description  Rally Utils
// @match        *://rally1.rallydev.com/
// @match        https://rally1.rallydev.com/
// @match        https://rally1.rallydev.com/#/*/timesheet
// @include      https://rally1.rallydev.com/#/*/timesheet
// @include      https://rally1.rallydev.com/
// @include      *://rally1.rallydev.com/
// @garant       all
// @copyright    2012+, Eduardo Daniel Cuomo
// ==/UserScript==

console.log('Rally Utils loaded!');

// jQuery
var script=document.createElement('script');script.src="https://code.jquery.com/jquery-1.10.2.min.js";document.getElementsByTagName('head')[0].appendChild(script);function waitLoadJQ(){if(typeof jQuery==='undefined'){setTimeout(waitLoadJQ, 100);}else{runWithJQ(jQuery);}}waitLoadJQ();

// Run
function runWithJQ ($) {

	// Styles

	var styles = {
		state : {
			'Completed' : {
				'background-color' : '#AAFFAA'
			},
			'Defined' : {
				'background-color' : '#FF8888'
			},
			'In-Progress' : {
				'background-color' : '#FFFFAA'
			}
		}
	};

	function setStyles () {
		$('iframe').contents().find('.x-grid3-row-table').each(function () {
			var tr = $(this)
				, state = tr.find('.x-grid3-td-4 div').text().trim();
			tr.css(styles.state[state])
				.find('a').attr('target', '_blank');
		});
	}

	setInterval(setStyles, 3000);

	// iFrame Size

	function iframeSize() {
		var c = $('#content span div div div div:eq(1)').hide(),
			h = (parseInt($('#content').css('min-height'), 10) - 50) + 'px';
		$('#content span div div iframe:first')
			.css('min-height', h)
			.height(h);
		c.show();
	}

	var iframeSizeTO;
	$(window).resize(function () {
		if (iframeSizeTO)
			clearInterval(iframeSizeTO);
		iframeSizeTO = setTimeout(iframeSize, 300);
	});
	iframeSize();
	setTimeout(iframeSize, 15000);
}