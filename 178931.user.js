// ==UserScript==
// @id             www1.nbnco.com.au-36383e4f-4370-4edc-ab9f-b79e54ecf162@http://nbn.skymesh.net.au
// @name           NSOC Validate Fibre/Wireless order
// @version        1.0
// @namespace      http://nbn.skymesh.net.au
// @author         David Toso
// @description    blah
// @include        https://www1.nbnco.com.au/online_customers/page/order/avc/new/*
// @run-at         document-end
// @require				 http://code.jquery.com/jquery-1.10.2.min.js
// @grant					 GM_addStyle
// ==/UserScript==

(function(){
	if ($ && $('#configurationId').get(0)) {

		// get the product template configuration options
		var template = $('#configurationId');
		var td = template.parent().parent();
		var options = $.map(template.get(0).options, function(val, i) { return val.label; });

		// determine the correct product template setting
		var last = options[options.length - 1];	
		var correct = /NFAS/.test(last)
			? $.grep(options, function(val, i){ return /^NFAS - NFAS Default Mapped \d+$/.test(val); })[0]
			: $.grep(options, function(val, i){ return /^NWAS - NWAS DSCP Mapped$/.test(val); })[0];

		// if I can see priorityAssist, it's because we've selected the product template

		if ($('#selectedProduct-unid-physicalInterface').get(0)) {

			// validate template selection
			if (template.get(0).options[template.get(0).selectedIndex].label != correct) {
				$('img.status-image', td).remove();
				td.append('<img class="status-image" src="http://tina.skymesh.net.au/nsoc_red_cross.png" border=0>');
			} else {
				$('img.status-image', td).remove();
				td.append('<img class="status-image" src="http://tina.skymesh.net.au/nsoc_green_tick.png" border=0>');
			}

			if ($('#primary-access-technology dd').html() == 'Fibre') {

				setTimeout(function(){
					$('option:contains("Auto/Auto")', $('#selectedProduct-unid-physicalInterface'))[0].selected = true;	
					$('option:contains("100/40 Mbps")', $('#selectedProduct-unid-tc4SpeedId'))[0].selected = true;	
					$('option:contains("Active")', $('#selectedProduct-unid-accessLoopIdentification'))[0].selected = true;
					var dcvc = $('#selectedProduct-unid-cvcId');
					var doptions = $.map(dcvc.get(0).options, function(val, i) { return val.value; });
					dcvc.val(doptions[1]);

					if (!$('#selectedProduct.univEnabled').is(':checked')) {
						$('#univ-details').show();
						var vcvc = $('#selectedProduct-univ-cvcId');
						var voptions = $.map(vcvc.get(0).options, function(val, i) { return val.value; });
						vcvc.val(voptions[1]);
					}
				},2000);

			} else {

				setTimeout(function(){
					$('option:contains("Auto/Auto")', $('#selectedProduct-unid-physicalInterface'))[0].selected = true;	
					$('option:contains("25/5 Mbps")', $('#selectedProduct-unid-tc4SpeedId'))[0].selected = true;	
					$('option:contains("150 kbps")', $('#selectedProduct-unid-tc1SpeedId'))[0].selected = true;	
					var dcvc = $('#selectedProduct-unid-cvcId');
					var doptions = $.map(dcvc.get(0).options, function(val, i) { return val.value; });
					dcvc.val(doptions[1]);
				},2000);

			}

		// otherwise, we need to automatically select the product template

		} else {
			$('option:contains("'+correct+'")', template)[0].selected = true;
			$('#updateTemplate').click();
		}
	}
})();
