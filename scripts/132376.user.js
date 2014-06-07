// ==UserScript==
// @name           mws.amazonservices.de
// @namespace      scratchpad
// @description    adding feed-type-dropdown
// @include        https://mws.amazonservices.de/scratchpad/index.html
// @grant          none
// ==/UserScript==

var options = {
	_POST_PRODUCT_DATA_: "PRODUCTFEED",
	_POST_PRODUCT_RELATIONSHIP_DATA_  : "RELATIONSHIPFEED",
	_POST_PRODUCT_PRICING_DATA_ : "PRICINGFEED",
	_POST_PRODUCT_IMAGE_DATA_ : "IMAGEFEED",
	_POST_INVENTORY_AVAILABILITY_DATA_ : "INVENTORYFEED"
};

$(function() {
	$('#apicall').change(function(){
		if($(this).val() === 'SubmitFeed'){
			var ftIptDiv = $('#FeedType').parent();
			$('#FeedType').remove();
			ftIptDiv.append('<select id="FeedType" />');
			$.each(options, function(key, val){
				$('select#FeedType').append(new Option(val, key));
			});
		}
	});
});
