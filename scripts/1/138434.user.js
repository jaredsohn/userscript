// ==UserScript==
// @name        Safeway Sort Unit Price
// @namespace   safeway
// @require     https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @require     https://raw.github.com/padolsey/jQuery-Plugins/master/sortElements/jquery.sortElements.js
// @version     1
// @include     http://shop.safeway.com/*
// ==/UserScript==

$(document).ready(function() {

	deobfuscateUnitPriceText = function(unitPriceText) {
        if (unitPriceText == "") { return 0; }
		return unitPriceText.slice(unitPriceText.indexOf('$') + 1, unitPriceText.indexOf('/'));
	};

	var form = $('#Products');

	// Pick some place to attach the sorting logic, such as the column headers
	$('#itemDescTxt').wrapInner('<span title="Sort by Unit Price"/>')
		.each(function() {
		    $(this).click(function() {            
		        // Only find table elements that have children with #unitprice
		        form.find('table').filter(function() {
		            // If the parent node is a form, and this table has size()
		            //alert(this.parentNode.tagName);
		            if (this.parentNode.tagName.toLowerCase() == "form")
		            {
		                return $(this).find('#unitprice').size() > 0;
		            }
		            return false;
		        }).sortElements(function(a, b){
		            // Both a, b are HTMLTableElement
		            // Select them for the unit price element
		            var priceA = parseFloat(deobfuscateUnitPriceText($.text($(a).find('#unitprice'))));
		            var priceB = parseFloat(deobfuscateUnitPriceText($.text($(b).find('#unitprice'))));
		            
		            return priceA - priceB;
		            
		        }, function() {
		            // We want to sort the set of tables in the form
		            return this;
		        });
		    });
		});

});