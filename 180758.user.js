// ==UserScript==
// @name       FP Dog Snapshot
// @namespace  http://use.i.E.your.homepage/
// @version    1.1
// @description  Gives a quick summary of dog's genetics on top of page
// @match      http://*.furry-paws.com/dog/index/*
// @match      http://*.furry-paws.com/litter/pup/*
// @include    http://*.furry-paws.com/dog/index/*
// @include    http://*.furry-paws.com/litter/pup/*
// @require    http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @copyright  2013+, FP #170335
// ==/UserScript==

this.$ = this.jQuery = jQuery.noConflict(true);

$(document).ready(function(){
    var gene 		= $('.info_table tr:contains(Genotype) td').text();
    var pattern 	= /^(\w+\s+){39}\w+$/;
    var $placement 	= $('.dog_overview_holder');
	
    if(pattern.test(gene)) {
        var phenotype 	= gene.match(/^(\w+\s+){16}/g)[0].trim();
        var quality 	= gene.match(/(\w+\s+){23}\w+$/g)[0].trim();
        var qualityabbr = '';
        var $qualityloc	= $('#tab_about > div > span:odd');
        if(!$qualityloc.length) $qualityloc = $('.add_margins.centered').last().find('> span:odd');
           
        $.each(($qualityloc.text()).match(/ ([A-Z])\w+/g), function(index, value) {
        	qualityabbr += value.trim().charAt(0);
        });
        
        if(!$placement.length) $placement = $('.add_margins.centered').eq(0);
        $placement.append(
            '<div>'
            	+'<span style="font-weight: bold; color: green;">'
                    +(quality.match(/HH/g) ? quality.match(/HH/g).length : '0')+'HH '
                    +(quality.match(/Hh/g) ? quality.match(/Hh/g).length : '0')+'Hh '
            		+(quality.match(/hh/g) ? quality.match(/hh/g).length : '0')+'hh '
            		+qualityabbr+' '
            		+phenotype.split(' ')[13]+' '
            		+phenotype.split(' ')[14].substr(0,3)+'/'
            		+phenotype.split(' ')[15].substr(0,3)
            	+'</span>'
        	+'</div>');
    }

});