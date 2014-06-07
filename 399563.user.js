// ==UserScript==
// @name       Grid View
// @match      http://www.fakku.net/*
// @copyright  2014+, MetalTxus
// ==/UserScript==

$(document).ready(function() {
    var style = '<style>' +
        '.content-row {height:162px; width:auto; padding-left:215px;}' +
        '#content {width:auto;}' +
        '</style>';
    
    $('html > head').append($(style));
    
    $('.content-row .content-meta').remove();
    
    $('.images a').each(function(i, element) {
  		$(element).attr('href', $(element).attr('href') + '/read');
	});
});
