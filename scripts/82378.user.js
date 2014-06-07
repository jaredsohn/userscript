// ==UserScript==
// @name           Facebook Request Simplifier
// @namespace      http://userscripts.org/users/asuza
// @include        http://www.facebook.com/*reqs.php*
// @copyright      2010 (C) Asuza (<http://www.squarephoenix.com/>)
// @license        BSD License
// @version        0.6
// ==/UserScript==

/*
	Copyright (c) 2010, Asuza
	All rights reserved.

	Redistribution and use in source and binary forms, with or without
	modification, are permitted provided that the following conditions are met:
	1. Redistributions of source code must retain the above copyright
	   notice, this list of conditions and the following disclaimer.
	2. Redistributions in binary form must reproduce the above copyright
	   notice, this list of conditions and the following disclaimer in the
	   documentation and/or other materials provided with the distribution.
	3. All advertising materials mentioning features or use of this software
	   must display the following acknowledgement:
	   This product includes software developed by the <organization>.
	4. Neither the name of the <organization> nor the
	   names of its contributors may be used to endorse or promote products
	   derived from this software without specific prior written permission.

	THIS SOFTWARE IS PROVIDED BY <COPYRIGHT HOLDER> ''AS IS'' AND ANY
	EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
	WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
	DISCLAIMED. IN NO EVENT SHALL <COPYRIGHT HOLDER> BE LIABLE FOR ANY
	DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
	(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
	LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
	ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
	(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
	SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

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

	function fbs_toggleView(obj, id)
	{
		var toggle = $(obj).html();
		
		if(toggle == '[+]')
		{
			if(id == "friend_connect")
				$('#' + id + ' > span').show();
			
			$('#' + id + ' form').show();
			$(obj).html('[-]');
		}
		else
		{
			if(id == "friend_connect")
				$('#' + id + ' > span').hide();
		
			$('#' + id + ' form').hide();
			$(obj).html('[+]');
		}
	}
	
	function fbs_acceptAll(id)
	{
		var count = $('#' + id + " input[name^='actions[http://']:first").parents("div.confirm:first").length;
	
		if(count > 0)
		{
			$('#' + id + ' .acceptAll').html('Processing...').unbind('click');
			var firstId = $('#' + id + " input[name^='actions[http://']:first").parents("div.confirm:first").attr('id');
			fbs_acceptSingle(firstId, id);
		}
		else
		{
			$('#' + id + ' .acceptAll').html('Done').attr('href','');
		}
	}
	
	function fbs_acceptSingle(id, callback)
	{
		obj = $('#' + id + " input[name^='actions[http://']");
		
		var objName = $(obj).attr("name");
		var buttonText = $(obj).val();
		var address = objName.substr(8, objName.length - 9);
		
		var requestBox = $(obj).parents("div.confirm:first");
		var appData = requestBox.attr('id').split('_');
		
		switch(appData[1])
		{
			case "25287267406":		// Vampire Wars
				return true;
			break;
		}
		
		$(obj).siblings("input").hide();
		$(obj).val("Processing...");
		
		var frame = $("<iframe></iframe>").hide().css({ width: '100%', height: '300px' }).attr('src',address);		
		var message = $('<div></div>').addClass('confirm').html('The request has been processed.');
		
		$(frame).appendTo($(obj).parents("div:eq(1)"));
		
		$(frame).load(function() {
		
			switch(appData[1])
			{
				default:				
					if(buttonText.substr(0,6) == "Accept" || buttonText.substr(0,3) == "Be ") {
						$(requestBox).hide().after(message);
						$(obj).siblings("input[name='actions[reject]']").click();
					}
				
					switch(buttonText)
					{
						case "Click here! Head on over to FrontierVille!":
						case "Retrieve Mystery Animal":
						case "Claim Rewards":
						case "Open Chest":
							$(requestBox).hide().after(message);
							$(obj).siblings("input[name='actions[reject]']").click();
						break;
						default:
							$(this).show();
							$(obj).siblings("input").show();
							$(obj).remove();
						break;
					}
				break;
			}
			
			if(callback) fbs_acceptAll(callback);
		});
		
		return false;
	}

    function letsJQuery() {
	
		$("input[name^='actions[http://']").bind('click',function() {
			fbs_acceptSingle($(this).parents('.confirm:first').attr('id'));
		});
	
		$('.confirm_boxes form, #friend_connect > span').hide();
		$('.confirm_boxes').each(function() {
		
			var cbid = this.id;
			
			// Expand/shrink button that goes before the group text
			var preHtml = $('<a></a>').attr('href','#').css('padding','0 4px').html('[+]');
			$(preHtml).bind('click',function() {
				fbs_toggleView(this, cbid);
			});
			
			// Container for text after group text
			var postWrap = $('<span></span>').css('padding','0 4px');
			var appData = cbid.split('_');
		
			switch(appData[1])
			{
				case "connect":			// Friends list
				
					postWrap.html('');
				
				break;
				case "25287267406":		// Vampire Wars
				
					postWrap.html('| Incompatible');
					
				break;
				default:

					var postHtml = $('<a></a>').attr('href','#').html('Accept All').addClass('acceptAll');
										
					$(postHtml).bind('click',function() {
						fbs_acceptAll(cbid);
						return false;
					});
					
					postWrap.html('(').append(postHtml).append(')');
					
				break;
			}
			
			if($(this).find('span:first').html() != null)
			{
				$(this).find('span:first').prepend(preHtml).append(postWrap);
			}
		
		});
		
    }