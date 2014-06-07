//  Rip GOOGLE Image Search  
//  Version 2.1
//  Copyright (c) 2011-2012 VinRav
// ==UserScript==
// @name           rip google image search
// @namespace      http://userscripts.org/
// @description    This will give direct link for google image search (for both modern and old way of searching). And also give list of direct links, which can be saved to text file and download via downloadmangers like IDM.
// @include        *.google.*/*tbm=isch*
// @version        2.1
// ==/UserScript==
var $;
    (function()
	{
        if (typeof unsafeWindow.jQuery == 'undefined') 
		{
            var GM_Head = document.getElementsByTagName('head')[0] || document.documentElement,
                GM_JQ = document.createElement('script');
            GM_JQ.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js';
            GM_JQ.type = 'text/javascript';
            GM_JQ.async = true;
            GM_Head.insertBefore(GM_JQ, GM_Head.firstChild);
        }
        GM_wait();
    })();
    function GM_wait() 
	{
        if (typeof unsafeWindow.jQuery == 'undefined') 
		{
            window.setTimeout(GM_wait, 100);
        }
		else 
		{
            $ = unsafeWindow.jQuery.noConflict(true);
            letsJQuery();
        }
    }
    function letsJQuery() 
	{
		count=0;
		if($(".images_table").length>0)
		{
			$('#res').prepend($('<div id="mine" style="height:120px; margin-left:'+$('#foot').css('marginLeft')+'; font:16px/26px Georgia, Garamond, Serif;overflow:hidden; padding:30px; padding-top:0px; position:relative"></div> '));
			$('#ires').prepend($('<input type="checkbox" id="selectall" />Select all/None </br></br>'));
			$('#selectall').attr('checked',true);
			$("#.images_table>tbody>tr>td>a").each(function(index) 
			{
				str=$(this).attr("href");
				str=str.substring(str.indexOf('/imgres?imgurl=')+15,str.indexOf('&imgrefurl='));
				$("#mine").append('<div class="lines" style="background:#e4f575; margin-top:1px;">'+str+'</dv>');
				var $chk = $('<input/>').attr({ type: 'checkbox',checked:'true'}).addClass("mycheck");
				$(this).parent('td').prepend($('<div></div>'));		
				$(this).parent('td').prepend($chk);		
				$(this).attr('href',str);
			});
		}
		else 
		{
			$('#rg_s').prepend($('<div id="mine" style="height:120px; top:0px; margin-left:0px; font:16px/26px Georgia, Garamond, Serif;overflow:hidden; padding:30px; padding-top:0px; position:relative"></div> '));
			$('#rg_s').prepend($('<input type="checkbox" id="selectall" />Select all/None </br>'));
			$('#selectall').attr('checked',true);
			$(".rg_ctlv>.rg_ul>.rg_li>.rg_l>.rg_i").each(function(index,domEle) 
			{				
				myfunction(domEle);
			});		

		}
		var refreshId = setInterval(function() 
		{
			$(".rg_ctlv>.rg_ul>.rg_li>.rg_l>.rg_i").not(".rg_ctlv>.rg_ul>.rg_li>.rg_l>.rg_i>.mycheck").each(function(index,domEle) 
			{				
				myfunction(domEle);
			});	
		
		}, 5000);
	
		function myfunction(domEle)
		{
				str=$(domEle).parent('.rg_l').attr('href');
				str=str.substr(str.indexOf("&imgurl=")+8,str.indexOf("&w="));
				str=str.substr(0,str.indexOf("&w="));
				$("#mine").append('<div class="lines" style="background:#e4f575; margin-top:1px;">'+str+'</dv>');
				$(domEle).parent().parent().prepend($('<input type="checkbox" class="mycheck" checked="checked" />'));
				$(domEle).parent('a').attr('href',str);
				$(domEle).parent('a').attr('class','nothing');
		}
		$('#mine').bind('mouseover', function()
		{
			$('#mine').css('border','solid 1px red');
			$('#mine').css('overflow','auto');
		});	
		$('#mine').bind('mouseout', function()
		{
			$('#mine').css('border','none');
			$('#mine').css('overflow','hidden');
		});	
		$('#selectall').bind('click', function()
		{
			if($(this).is(':checked'))
			{
				$('.mycheck').each(function()
				{	
					$(this).attr('checked',true);
					$(this).trigger('change');
				});
			}
			else
			{
				$('.mycheck').each(function()
				{	
					$(this).attr('checked',false);
					$(this).trigger('change');
				});
			}
		});
		$('.mycheck').live('change', function() 
		{
			if($(this).is(':checked'))
			{ 
				str=$(this).parent().children('a').attr('href');
				$("#mine").append('<div class="lines" style="background:#e4f575; margin-top:1px;">'+str+'</dv>');
			}
			else
			{
				str=$(this).parent().children('a').attr('href');
				$('#mine>.lines').each(function(index) 
				{
					if($(this).text()==str)
						$(this).remove();
				});	
			}
		});
    }
	
	
