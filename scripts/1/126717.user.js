// ==UserScript==
// @name       Facebook Lottery for Pages
// @namespace  
// @version    1.2
// @description  Facebook lottery script for "Facebook Pages". Go to Insights > Likes > See likes (top right) and press Lottery button appeared between Your Name and Home menubar.
// @include    http://*.facebook.com/*
// @copyright  2011+, justlight.net
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
        //$.getScript("http://flesler-plugins.googlecode.com/files/jquery.scrollTo-1.4.2-min.js");
        //$.getScript("http://demos.flesler.com/jquery/scrollTo/js/jquery.scrollTo-min.js");
        //$.getScript("http://static.tumblr.com/fkm6sn6/lbNl5zqhv/jquery.scrollto-1.4.2-min.js");
		
		
        /*$('body').append('<div style="position:absolute;top:0px;left:0px;z-index:300;"><textarea id="needhtml"></textarea><button id="needgo">?</button></div>');
        $('#needgo').click(function(){
            $('#needhtml').val($('html').html());
			$('div').scroll(function(){
				alert($(this).attr('id')+' :id | class: '+$(this).attr('class'));
			});
        });*/
	
        $('.righthand').click(function(){
            if ($(this).find('a').attr('href').indexOf('/browse/page_fans/?page_id')>-1) {
                $('#navHome').before('<li class="topNavLink" id="navlottery"><a href="" style="color:#fff; font-weight:bold;">Lottery</a></li>');
				$('#navlottery').click(function(e){
					$('.lotterycount').remove();
					e.preventDefault();
					var i=0;
					var letszam=$('#pagelet_pages_stats').find('.uiNumberGiant:first').text()*1;
					var rand=Math.floor(Math.random()*letszam);
					//alert(rand);
					$('.uiProfileBlockContent').each(function(){
						i=i+1;
						eznev=$(this).find('a')
						if (i==rand) {
							$(this).css({
								'background':'yellowgreen',
								'padding-left':'5px',
								'border-radius':'5px',
								'color':'white'
							});
							winner=eznev.text();
							eznev.html('<span class="lotterycount">'+i+'.) </span>'+eznev.html()+' - <span style="font-weight:bold;">Winner!</span>');
							//$('.fbProfileBrowserResult .hideSummary').scrollTo('150',1000);
							//$('body').scrollTo(150,1000);
							//$('.fbProfileBrowserResult').scrollTo(150,1000);
						} else {
							eznev.html('<span class="lotterycount">'+i+'.) </span>'+eznev.html());
						}
					});
					alert('The Winner is '+winner+'!');
				});
            }
        });
    }









