// ==UserScript==
// @name           AutoRep v2.1-RC1 (2011.01.09)
// @namespace      --
// @include       http://battlestations.ochospace.com/*
// @exclude        http://battlestations.ochospace.com/war_console.php
// @exclude        http://battlestations.ochospace.com/expedition.php
// ==/UserScript==


/*************************************
*    todo: auto remove protection    *
*************************************/

var $;
var tid;

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
		// check for captain name, then run script if available
		var c_start		= 0;
		var c_end		= 0;
		var c_capt_name	= null;
		var capt_name	= null;
		var exdate		= new Date();

		c_start = document.cookie.indexOf('capt_name=');
		if (c_start > -1)
		{
			c_start	= c_start   10;
			c_end	= document.cookie.indexOf(";", c_start);
			if (c_end == -1)
				c_end = document.cookie.length;
			c_capt_name	= $.trim(unescape(document.cookie.substring(c_start, c_end)));
		}

		if($('.statusname').length === 1)
		{
			var st_names	= $('.statusname');
			capt_name	= $.trim(st_names[0].getElementsByTagName('strong')[0].innerHTML);
			
			if(c_capt_name !== capt_name)
			{
				exdate.setYear(2070);
				document.cookie = 'capt_name='  capt_name  '; expires='   exdate.toString()   '; path=/';
				exdate.setYear(2010);
				document.cookie = 'help_visit=changed; expires='   exdate.toString()   '; path=/';
			}
		}else{
			capt_name = c_capt_name;
		}

		if(capt_name != null)
		{
	    	var exdate = new Date();
			var tid;
			var cid;
			var max_try		= 10;
			var action 		= 'repair';
			var using		= 'gold';
			var sunk 		= 0;
			var sink		= 0;
			var count		= max_try;
			var timeout_ms	= 100;
			var server_time = null;
			    
			// create UI
			var innerHTML	 = '<div style="padding:3px;border:1px solid #CCC;background:#333333;" id="ar_inner_div"><span id="result_span" ';
			innerHTML		 = 'style="float:left">initializing ('  capt_name  ')...</span>';
			innerHTML		 = '<span style="float:right;padding:2px;border:1px solid #CCC;cursor:pointer;width:20px" id="more">...</span>';
			innerHTML		 = '<div style="clear:both"></div></div>';
			innerHTML		 = '<div style="border:1px solid #CCC;text-align:left;padding:5px;display:none" id="option">';
			innerHTML		 = '<label style="width:120px;display:inline-block" for="full_repair">Full repair</label>';
			innerHTML		 = '<input type="checkbox" id="full_repair" /><br />';
			innerHTML		 = '<label style="width:120px;display:inline-block" for="ref_int">Refresh interval</label>';
			innerHTML		 = '<input type="text" id="ref_int" size="1" value="3" onclick="this.select()" ';
			innerHTML		 = 'style="border:none; text-align:right;color:#FFF;background:#444444;font-weight:bold" /> sec';
			innerHTML		 = '<label style="width:120px;display:inline-block">Repair count</label>';
			innerHTML		 = '<span id="repair_count">0</span><span style="float: right"><a href="javascript:;" id="reset_r">reset</a></span><br />';
			innerHTML		 = '<label style="width:120px;display:inline-block">Salvage count</label>';
			innerHTML		 = '<span id="salvage_count">0</span><span style="float: right"><a href="javascript:;" id="reset_s">reset</a></span><br />';
			innerHTML		 = '<div style="display:none" id="dummy_div"></div>';
			innerHTML		 = '</div><div style="padding:3px;border:1px solid #CCC;background:#333333;text-align:center;" id="ar_clock"></div>';

			$('<div></div>')
				.appendTo('body')
				.html(innerHTML)
				.css('display', 'block')
				.css('background', '#333')
				.css('border', '1px solid #CCC')
				.css('left', '0')
				.css('top', '0')
				.css('position', 'fixed')
				.css('width', '200px')
				.css('margin', '5px')
				.css('overflow', 'hidden')
				.css('text-align', 'center')
				.css('color', 'white')
				.css('font-weight', 'bold')
				.css('font-size', '11px')
				.css('font-family', 'Helvetica, Verdana, Arial, Sans-serif')
				.attr('id', 'ar_wrapper_div');

			$('#more').click(function(){
				if($('#option').css('display') == 'none')
				{
					$('#option').css('display', 'block');
				}else{
					$('#option').css('display', 'none');
				}
			});
			
			$('#reset_r').click(function(){
				sink = 0;
				$('#repair_count').html('0');
			});

			$('#reset_s').click(function(){
				sunk = 0;
				$('#salvage_count').html('0');
			});

			// load preferences
			c_start = document.cookie.indexOf('user_pref=');
			if (c_start > -1)
			{
				c_start	= c_start   10;
				c_end	= document.cookie.indexOf(";", c_start);
				if (c_end == -1)
					c_end = document.cookie.length;
				prefs	= unescape(document.cookie.substring(c_start, c_end)).split(':');
				if(prefs.length == 5)
				{
					$('#option').css('display', prefs[0]);
					if(prefs[1] == 'true') $('#full_repair').click();
					$('#ref_int').val(isNaN(parseInt(prefs[2])) ? 3 : parseInt(prefs[2]));
					sink = parseInt(prefs[3]);
					sunk = parseInt(prefs[4]);
					$('#repair_count').html(sink);
					$('#salvage_count').html(sunk);
				}
			}
		
			// this is the heart of the bot
			var user_func = function(){
				var ut = new Date();
				var h, m, s;
				var immediate = false;
				var after_salvage = false;
				var eid;
				
				h = ut.getHours();
				m = ut.getMinutes();
				s = ut.getSeconds();
				if(s < 10) s = '0'   s;
				if(m < 10) m = '0'   m;
				if(h < 10) h = '0'   h;
				
				seed = '11_5_'   h   '_'   m   '_'   s;
				$('#result_span').html($('#result_span').html()   ' *');
				
				timeout_ms = parseInt($('#ref_int').val()) * 1000;
				if(timeout_ms < 1000) timeout_ms = 1000;

				// set timeout of response
				eid = setTimeout(function(){
					$('#result_span').html('Network error. Refreshing..');
					$('#ar_inner_div').css('background', 'red');
					clearTimeout(tid);
					location.reload();	
				}, timeout_ms * max_try);
				
				// send request
				$.ajax({
					type	: 'post',
					url		: 'http://battlestations.mobileweapon.net/_remote.php?type=wc_repair&name='   kucing22,
					data	: {
						full	: $('#full_repair').is(':checked'),
						op		: 'war_'   action,
						seed	: seed,
						using	: using
					},
					success	: function(message){

						// handle response
						clearTimeout(eid);
						if(message == 'Your ship is sunk. Salvage it first.' || message == 'Your ship must be salvaged first!')
						{
							$('#result_span').html('Ship sunk, salvaging...');
							$('#ar_inner_div').css('background', 'red');
							using	= 'ap';
							action	= 'salvage';
							$('#salvage_count').html(  sunk);
							document.title = '* Battle Stations!';
							after_salvage = true;

							if(--count == 0)
							{
								$('#result_span').html('Bot disabled. <abbr title="You may out of AP or have been sunk '  max_try  ' times in a row. Reload page to reactivate bot.">why?</abbr>');
								$('#ar_inner_div').css('background', 'red');
								
								alert('Bot disabled.\n\nYou may out of AP or have been sunk '  max_try  ' times in a row.\nReload page to reactivate bot.');
								clearInterval(tid);
							}
						}else{
							count = max_try;
							if(message == 'Full repairs needed.')
							{
								document.title = '  Battle Stations!';
								$('#result_span').html('Fishing mode');
								$('#ar_inner_div').css('background', '#CC8800');
							}else if(message == 'No repairs needed.'){
								$('#result_span').html('Full health');
								$('#ar_inner_div').css('background', '#008800');
							}else if(message.indexOf('script') > -1){
								$('#result_span').html('Session error. Refreshing...');
								$('#ar_inner_div').css('background', 'red');
								location.reload();
							}else if(message.indexOf('salvaged') < 0){
								$('#result_span').html('Repairing...');
								$('#ar_inner_div').css('background', '#CC8800');
								if(!after_salvage)
									$('#repair_count').html(  sink);
								immediate = true;
							}
							using	= 'gold';
							action	= 'repair';
						}

						try{
							clearTimeout(tid);
							if(immediate)
							{
								timeout_ms = 100;
							}
							
							tid = setTimeout(user_func, timeout_ms);
						}catch(e){}
					}
				});
			};
			
			// now let the heart beats
			tid = setTimeout(user_func, timeout_ms);

			// save preferences on page unload
			$(window).unload(function(){
				var user_pref = $('#option').css('display')   ':'   $('#full_repair').is(':checked')   ':';
				user_pref     = $('#ref_int').val()   ':'   sink   ':'   sunk;
				exdate.setYear(2070);
				document.cookie = 'user_pref='  user_pref  '; expires='   exdate.toString()   '; path=/';

				try{
					clearTimeout(tid);
					clearTimeout(eid);
					clearInterval(cid);
				}catch(e){}
			});
		}
	}