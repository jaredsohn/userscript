// ==UserScript==
// @name           Fix for Castle Age Timer glitch
// @namespace      ca
// @include        http://apps.castleagegame.com/castle_age/*
// @include        http://web.castleagegame.com/castle/*
// @include        http://web3.castleagegame.com/castle_ws/*
// @include        https://apps.castleagegame.com/castle_age/*
// @include        https://web.castleagegame.com/castle/*
// @include        https://web3.castleagegame.com/castle_ws/*
// ==/UserScript==

function contentEval(source) {
  // Check for function input.
  if ('function' == typeof source) {
    // Execute this function with no arguments, by adding parentheses.
    // One set around the function, required for valid syntax, and a
    // second empty set calls the surrounded function.
    source = '(' + source + ')();'
  }

  // Create a script node holding this  source code.
  var script = document.createElement('script');
  script.setAttribute("type", "application/javascript");
  script.textContent = source;

  // Insert the script node into the page, so it will run, and immediately
  // remove it to clean up.
  document.body.appendChild(script);
  document.body.removeChild(script);
}

contentEval(function(){
var zzzsr = ajaxFormSend.toString().split('signed_request=')[1].split(';')[0];
zzzsr = zzzsr.substr(0,zzzsr.length-1);
ajaxFormSend = function (div, url, formElement, anchor, retry)
    {
            FB.Canvas.scrollTo(0,$('#main_anchor').offset().top);
		   friend_browse_offset = 0;
		   reset_raid_lst();
		   
		   if(!anchor) {
               anchor= 'main_anchor';
           }
           
           stopTimers=true;

			params = $(formElement).serialize();
	        params += '&ajax=1';
	        			params += '&signed_request='+zzzsr;
	            		pageCache = {};
			if (!url) {
				url = 'index.php?adkx=7';
		    }
			ajaxPerforming=true;
			showLoaderIfAjax();
			
			$.ajax({ url: url, context: document.body, data: params, type: 'POST', success: function(data){
			    stopTimers=false;
			    ajaxPerforming=false;
				$('#AjaxLoadIcon').hide();
if (data.length==0) {
  if(typeof retry=='undefined') retry=0;
  if (retry==3)
    alert('sorry server busy!');
  else 
    ajaxFormSend(div, url, formElement, anchor, retry+1);
  return;
}
					$('#'+div).html(data);
				if(data.lastIndexOf('<fb:')!=-1) {
					FB.XFBML.parse(document.getElementById(div));
				}
				centerPopups();
			}});
			
			scrollToElement('#'+anchor);
    }

get_cached_ajax=function (url, get_type, retry) {
		//just_body_cache
		var url_key= url;
		if(url.indexOf('?') != -1){
			url_key = url.substring(0, url.indexOf('?'));
		}
		if(get_type=='cache_body' && pageCache[url_key]) {
				$('#app_body_container').html(pageCache[url_key]);
			if(pageCache[url_key].lastIndexOf('<fb:')!=-1) {
				FB.XFBML.parse(document.getElementById('app_body_container'));
			}
		} else {
			
			if(get_type=='get_page') {
			    stopTimers=true;
				pageCache[url_key]= null;
			} else if(get_type=='destroy_all_get_page') {
			    stopTimers=true;
				pageCache = {};
			}
			var params = 'ajax=1';
		    if((get_type == 'cache_body') || (get_type == 'get_body')) {
		        params += '&get_type=body';
		    }
	        			params += '&signed_request='+zzzsr;
	        
		    
			ajaxPerforming=true;
			showLoaderIfAjax();
			
			$.ajax({ url: url, context: document.body, data: params, type: 'POST', success: function(data){
			    stopTimers=false;
			    ajaxPerforming=false;
				$('#AjaxLoadIcon').hide();
if (data.length==0) {
  if(typeof retry=='undefined') retry=0;
  if (retry==3)
    alert('sorry server busy!');
  else 
     get_cached_ajax(url, get_type, retry+1);
  return;
}
				if((get_type == 'cache_body') || (get_type == 'get_body')) {
      
						$('#app_body_container').html(data);
					if(data.lastIndexOf('<fb:')!=-1) {
						FB.XFBML.parse(document.getElementById('app_body_container'));
					}
					
	            } else {
		
						$('#globalContainer').html(data);
					if(data.lastIndexOf('<fb:')!=-1) {
						FB.XFBML.parse(document.getElementById('globalContainer'));
					}
	            }
				centerPopups();
			}});
		}
		scrollToElement('#main_anchor');
	}

ajaxLinkSend=function(div, url, retry)
    {
		friend_browse_offset = 0;
		reset_raid_lst();

		pageCache = {};
		ajaxPerforming=true;
		
		showLoaderIfAjax();

        var params = 'ajax=1';
        		params += '&signed_request='+zzzsr;
                
        if (!url) {
			url = 'index.php?adkx=2';
	    }
		
		$.ajax({ url: url, context: document.body, data: params, type: 'POST', success: function(data){
		    ajaxPerforming=false;
			$('#AjaxLoadIcon').hide();
			
if (data.length==0) {
  if(typeof retry=='undefined') retry=0;
  if (retry==3)
    alert('sorry server busy!');
  else 
     ajaxLinkSend(div, url, retry+1);
  return;
}
				$('#'+div).html(data);
			if(data.lastIndexOf('<fb:')!=-1) {
				FB.XFBML.parse(document.getElementById(div));
			}
			centerPopups();
		}});
		
		scrollToElement('#main_anchor');
		
		 FB.init({
		     appId  : '46755028429',
		     status : true, // check login status
		     cookie : true, // enable cookies to allow the server to access the session
		     xfbml  : true  // parse XFBML
		   });
		 FB.Canvas.setAutoResize();		
		
    }


});
