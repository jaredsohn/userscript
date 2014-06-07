// ==UserScript==
// @name           myTnet
// @namespace      http://userscripts.org/users/241261
// @include        http://tweakers.net/
// @exlude        http://tweakers.net/*
// ==/UserScript==

var $;

// Add jQuery
    (function(){
        if (typeof unsafeWindow.jQuery == 'undefined') {
            var GM_Head = document.getElementsByTagName('head')[0] || document.documentElement,
                
			GM_JQ = document.createElement('script');
            GM_JQ.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js';
            GM_JQ.type = 'text/javascript';
            GM_JQ.async = true;
            GM_Head.insertBefore(GM_JQ, GM_Head.firstChild);
            
            GM_JQUI = document.createElement('script');
            GM_JQUI.src = 'http://ajax.googleapis.com/ajax/libs/jqueryui/1.8.5/jquery-ui.min.js';
            GM_JQUI.type = 'text/javascript';
            GM_JQUI.async = true;
            GM_Head.insertBefore(GM_JQUI, GM_Head.lastChild);
            
            GM_JQCK = document.createElement('script');
            GM_JQCK.src = ' http://cookies.googlecode.com/svn/trunk/jquery.cookies.js';
            GM_JQCK.type = 'text/javascript';
            GM_JQCK.async = true;
            GM_Head.insertBefore(GM_JQCK, GM_Head.lastChild);
            GM_JQCK = document.createElement('script');
        }
        GM_wait();
    })();

// Check if jQuery's loaded
    function GM_wait() {
        if (typeof unsafeWindow.jQuery == 'undefined') {
            window.setTimeout(GM_wait, 100);
        } else {
            $ = unsafeWindow.jQuery.noConflict(true);
            letsJQuery();
        }
    }

// All your GM code must be inside this function
    function letsJQuery() {
        
        // hide newsletter
        $('.frontpageItem h2:contains("Tweakers.net Nieuwsbrief")').parent().parent().remove();
        
        // hide award
        $('#award').remove();
        
        // spam
        $('.breadCrumb').append('<span style="font-style:italic;float:right;line-height:16px;">myTnet by <a href="/gallery/weejewel">WeeJeWel</a></span>');
    	
    	// add deathgrunt <3
        $('.sidebar .frontpageItem:first-child').after( ' <div class="frontpageItem deathgrunt"><h2><a href="http://deathgrunt.com/" target="_blank">Deathgrunt</a></h2><div><a target="_blank" href="http://deathgrunt.com/"><img src="http://deathgrunt.com/x/travolta/deathgrunt.php" width="408" /></a></div>' ).next().hide().slideToggle(1000);
        
       	// deathgrunt description - not really funny without it :)
       	GM_xmlhttpRequest({
		  method: "GET",
		  url: "http://deathgrunt.com/",
		  onload: function(response) {
		  	$('.sidebar .frontpageItem.deathgrunt > div > a').before( '<p>' + $(response.responseText).find('.textfield .text').text() + '</p>' );
		  }
		});
		
        // animate poll bars
        $('.scoreBar').each(function(){
        	$(this).data('oldwidth', $(this).css('width') ).css('width','0%').animate( {'width': $(this).data('oldwidth')}, 1000);
        });
        
        // hide specific blogs
        var hideBlogs = new Array(
        	'shownieuws',
        	'username1',
        	'username2',
        	'username3',
        	'username4'
        );
        
        // add titles to widgets
        var title = $('a:contains("Upcoming nieuws en meuk")')
        $(title).parent().parent().hide().parent().parent().css('borderTop','none').parent().prepend('<h2>' + $(title).text() + '</h2>');
        var title = $('.frontpageItem:not(.marginBottom) a:contains("Nieuws van ")');
        $(title).parent().parent().hide().parent().parent().css('borderTop','none').parent().prepend('<h2>' + $(title).text() + '</h2>');
        
        for( var username in hideBlogs )
        {
        	$( '#tracker-weblogs a[href^="http://' + hideBlogs[username] + '"]' ).parent().slideToggle(200);
        }
        
        // move icon
        $('.frontpageItem h2').prepend('<img src="http://www.bobohelper.com/images/gridIcon.gif" class="move" style="width:0;margin-right:0;" title="Doubleclick to hide, drag to move." />').hover(function(){
        	$(this).parent().find('.move').animate({'width':'16px','marginRight':'7px'},300);
        },function(){
        	$(this).parent().find('.move').animate({'width':'0','marginRight':'0'},300);
        });
        $('.move').css({'cursor':'move','float':'left','margin':'4px 0 0 0','opacity':'0.5'}).hover(function(){
        	$(this).fadeTo(200, 1.0);
        }, function(){
        	$(this).fadeTo(200, 0.5);
        }).bind('dblclick',function(){
        	$(this).parent().parent().children('*:not(h2):not(script)').slideToggle(200);
        	
        	var hiddenBlocks = $.cookies.get( 'hiddenBlocks' );
        	
        	if( hiddenBlocks === null )
        	{
        		hiddenBlocks = '';
        	}
        	
        	$.cookies.set( 'hiddenBlocks', hiddenBlocks + $(this).parent().parent().attr('id') + ';', { expiresAt: new Date( 2011, 1, 1 ) } );
        	
        });
        
        // sortable widgets
       
        // - content
		$('> *', $(".content") ).each(function (index) {
			this.id = 'block-content-' + index;
		});
	    $(".content").sortable({
        	handle: '.move',
        	revert: true,
        	axis: 'y'
        });
        $(".content").bind( "sortupdate", function(event, ui) {
			var order = $(".content").sortable('serialize');
	        $.cookies.set('sortableContent', order, { expiresAt: new Date( 2011, 1, 1 ) } );
		});
		var c = $.cookies.get('sortableContent');
		if (c) {
			$.each(c.split('&'), function () {
				var id = this.replace('[]=', '-');
				$('#' + id).appendTo( $(".content") );
			});
		}
		
		// - sidebar
		$('> *', $(".sidebar") ).each(function (index) {
			this.id = 'block-sidebar-' + index;
		});
	    $(".sidebar").sortable({
        	handle: '.move',
        	revert: true,
        	axis: 'y'
        });
        $(".sidebar").bind( "sortupdate", function(event, ui) {
			var order = $(".sidebar").sortable('serialize');
	        $.cookies.set('sortableSidebar', order, { expiresAt: new Date( 2011, 1, 1 ) });
		});
		var c = $.cookies.get('sortableSidebar');
		if (c) {
			$.each(c.split('&'), function () {
				var id = this.replace('[]=', '-');
				$('#' + id).appendTo( $(".sidebar") );
			});
		}
		
		// hide hidden blocks
		var hiddenBlocks = $.cookies.get( 'hiddenBlocks' );
			hiddenBlocks = hiddenBlocks.split(';');
		for( var hiddenBlock in hiddenBlocks )
		{
			$('#' + hiddenBlocks[hiddenBlock]).children('*:not(h2):not(script)').stop().slideToggle(200);
		}
                
    }