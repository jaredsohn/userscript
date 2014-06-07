// ==UserScript==
// @name           Facebook Message Filter ( b3ta )
// @namespace      fse
// @description    This script attempts to filter out message spam on facebook
// @include        *www.facebook.com*sk=messages*
// @copyright      Copyright 2010 Nathan Trujillo
// @require        http://jqueryjs.googlecode.com/files/jquery-1.3.2.min.js
// ==/UserScript==

jQuery.noConflict();

var setup = false;
var eventsReg=/(group\.php|event\.php)/gi;

if(top.location == location && /\.facebook\.com$/i.test(location.hostname)) {
  var reg = /^(https?:\/\/([-a-z0-9]+\.)*facebook\.com)\/[^#]*#!?(\/.+)/i;
    document.addEventListener( 'DOMContentLoaded', setupUI, true );    
}

function makeButton( title, id ){
	
	return '<a href="#" id="'+ id +'" class="uiButton uiButtonDefault"><span class="uiButtonText">' + title + '</span></a>';
}

function setupUI(){	
	setup = true;		
  	
  	var link = makeButton('Mark Event Spam', 'btnFilterSpam');
	jQuery('span.UIButtonStrip').append(link);
	jQuery('#btnFilterSpam').click( fseFilterSpam );
}


function enableDeleteButton(){

	jQuery('span.uiButtonText').each(function(){
		if( jQuery( this ).html() == 'Delete' ){
			jQuery( this ).parent().removeClass('uiButtonDisabled');
		}
	});
	
}


// scan for message elements
function fseFilterSpam(){
	
	var ref = null;
	var found = 0;
	
	jQuery('div.ThreadList div').find('.GBThreadRow div.authors').each(function(){
		 if(jQuery(this).html().match( eventsReg )){
	      ref =	jQuery(this).parent().siblings().find('input').attr('checked', 'true');//each(function(){ jQuery(this).click(); });
	      found++; 
	     }
	});
	
	if( found > 0 )
		enableDeleteButton();

}

//http://james.padolsey.com/javascript/regex-selector-for-jquery/
jQuery.expr[':'].regex = function(elem, index, match) {
    var matchParams = match[3].split(','),
        validLabels = /^(data|css):/,
        attr = {
            method: matchParams[0].match(validLabels) ? 
                        matchParams[0].split(':')[0] : 'attr',
            property: matchParams.shift().replace(validLabels,'')
        },
        regexFlags = 'ig',
        regex = new RegExp(matchParams.join('').replace(/^\s+|\s+$/g,''), regexFlags);
    return regex.test(jQuery(elem)[attr.method](attr.property));
}