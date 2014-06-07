// ==UserScript==
// @name       MyShows Profile Sort
// @namespace  http://myshows.ru/
// @version    0.1
// @description  Sort serials in alphabetic order on myshows.ru
// @match      http://myshows.ru/profile/
// @copyright  2014+, Vladimir Mechkauskas
// ==/UserScript==

/*
 * jSort - jQury sorting plugin
 * http://do-web.com/jsort/overview
 *
 * Copyright 2011, Miriam Zusin
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://do-web.com/jsort/license
 */
(function($){$.fn.jSort=function(options){var options=$.extend({sort_by:"p",item:"div",order:"asc",is_num:false,sort_by_attr:false,attr_name:""},options);return this.each(function(){var a=this,hndl=a,titles=[],i=0;$(a).find(options.item).each(function(){var a,b=$(this).find(options.sort_by);if(options.sort_by_attr)a=b.attr(options.attr_name).toLowerCase();else a=b.text().toLowerCase();titles.push([a,i]);$(this).attr("rel","sort"+i);i++});a.sortNum=function(a,b){return eval(a[0]-b[0])};a.sortABC=function(a,b){return a[0]>b[0]?1:-1};if(options.is_num)titles.sort(hndl.sortNum);else titles.sort(hndl.sortABC);if(options.order=="desc")if(options.is_num)titles.reverse(hndl.sortNum);else titles.reverse(hndl.sortABC);for(var t=0;t<titles.length;t++){var el=$(hndl).find(options.item+"[rel='sort"+titles[t][1]+"']");$(hndl).append(el)}})}})(jQuery);

$(document).ready(function () {
    //$('.content-lside ul').myShowsListSorter();
    $('.watch-episode').die("click");
    
    console.log("ready!");
    
    sortMyShowsProfileShows();
    
    $('.watch-episode').live( 'click', function(e){
        var link       = $(this);
        var mode       = link.attr('id').substr(0,1);
        var parameters = { "watched" : link.attr('id').substr(2) };
        var cont       = $(this).parents('.bserial_season');
        
        var controls = link.parent().parent();
        if ( mode == 'r' ) {
            parameters["rate-episode"] = link.attr('id').substr(1,1);
            controls = controls.parent().parent().parent(); // how to rewrite?
            
            mixpanel.track('Rate Episode', {
                rate : parameters["rate-episode"],
                show : cont.data('show')
            });
        }
        console.log("!!!");
        
        controls.after('<img src="' + root + 'shared/images/ajax-loader.gif" border="0" height="20" />').remove();
        
        hideHint();
        
        //$('#content-inner').load( root + 'int/controls/profile/check', parameters);   
                
        $.get(root + 'int/controls/profile/check', parameters, function(responseTxt){        
            $('#content-inner').html(responseTxt);
            sortMyShowsProfileShows();
        });
        
        e.preventDefault();
    });
    
    function sortMyShowsProfileShows(){
        console.log("jSort: .content-lside ul");
        
        $('#content-inner').find('.content-lside ul').each(function(i){
            $(this).jSort({
                sort_by: 'a',
                item: 'li',
                order: 'asc'
            });
        });        
		
		// sort main content
		$('div.bserial').html(function(){
			return $(this).children('h4').map(function(){
				return $(this).nextUntil('h4').andSelf();
			}).sort(function(a,b){
				return a.first().text() < b.first().text() ? -1 : 1;
			}).map(function(){
				return this.get();
			});
		});
        
        console.log('Sorted!');
    }
});