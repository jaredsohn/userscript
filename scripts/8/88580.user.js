// ==UserScript==
// @name           YT QuickSearch
// @description    Search Videos on YouTube while watching a Video. Demonstration-Video: http://youtu.be/l-ezidCFR-A
// @namespace      yt
// @developer      Benjamin Buhler - www.freiken-douhl.de
// @version        1.2
// @include        http://www.youtube.com/watch*
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
		var indikator= $('#search-btn span').text();
		var schnellsuche= indikator=='Suchen'?'Schnellsuche':'Quicksearch';
		var kommentare= indikator=='Suchen'?'Kommentare':'Comments';
		var hier_eingeben= indikator=='Suchen'?'Suche hier eingeben..':'enter your search here..';
        $('#watch-info').after('<div id="watch-switch"><button id="watch-switch-comments" type="button" class="yt-uix-button yt-uix-button-default" style="margin-right:8px"><span class="yt-uix-button-content">'+kommentare+'</span></button><button id="watch-switch-suche" type="button" class="yt-uix-button yt-uix-button-default"><span class="yt-uix-button-content">'+schnellsuche+'</span></button></div>');
		$('#watch-switch-comments').click(function(){
			$('#watch-discussion').show();
			$('#watch-suche').hide();
		});
		$('#watch-switch-suche').click(function(){
			$('#watch-discussion').hide();
			$('#watch-suche').show();
		});
		$('#watch-discussion').after('<div id="watch-suche" class="comments-section" style="display:none;margin-top:20px"></div>');
		$('#watch-suche').html('<form id="watch-suche-form"><input type="hidden" id="watch-suche-seite" name="page" value="1"><input type="text" id="watch-suche-input" class="comments-section-see-all" value="'+hier_eingeben+'" autocomplete="off"><img src="http://www.abload.de/img/2-02xwh.gif" id="watch-suche-load" style="float:right;margin-right:5px;display:none"></form><h4>'+schnellsuche+':</h4><div id="watch-suche-ergebnis"></div>');
		$('#watch-suche-input').css({
			width: '525px',
			border: '0px none',
			margin: '0px',
			padding: '0px',
			color: '#CCCCCC',
			'font-style': 'italic',
			'margin-top': '5px',
		}).focus(function(){
			if(this.value==hier_eingeben){
				this.value='';
			}
			this.style.color='#333333';
			this.style.fontStyle='normal';
			$('#watch-suche-seite').val(1);
		}).blur(function(){
			if($.trim(this.value)==''){
				this.style.color='#CCCCCC';
				this.style.fontStyle='italic';
				this.value=hier_eingeben;
			}
		});
		
		$('#watch-suche-form').submit(function(){
			if($.trim($('#watch-suche-input').val()).length>0){
				$('#watch-suche-ergebnis').hide('fast');
				$('#watch-suche-load').show();
				$.ajax({
					url: 'http://www.youtube.com/results?search_query='+$('#watch-suche-input').val()+'&page='+$('#watch-suche-seite').val(),
					success: function(html){
						var weiter= '<div class="watch-suche-seiten" style="float:right">'+$(html).find('#search-footer-box .yt-uix-pager').html()+'</div><div stlye="clear:right"></div>';
						var weiter2= weiter.replace(/onclick="(.+)"/gim,'');
						var result= $(html).find('#results-main-content').html();
						$('#watch-suche-ergebnis').html( weiter2+result+weiter2 ).show('slow');
						$('.watch-suche-seiten button, .watch-suche-seiten a').unbind('click').bind('click',function(){
							var href= $(this).attr('href');
							$('#watch-suche-seite').val( href.substr(href.lastIndexOf('=')+1) );
							$('#watch-suche-form').trigger('submit');
							return false;
						});
						$('#watch-suche-load').fadeOut('slow');
					}
				});
			}
			return false;
		});
		
    }