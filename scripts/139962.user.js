// ==UserScript==
// @name       tricky
// @namespace   MW
// @description Mod
// @icon        http://icons.iconarchive.com/icons/bad-blood/yolks-2/72/eyes-on-fire-icon.png
// @include     http://facebook.mafiawars.zynga.com/mwfb/remote/html_server.php*
// @include     http://mwfb.zynga.com/mwfb/remote/html_server.php*
// @include     http://facebook.mafiawars.zynga.com/mwfb/xd_receiver.htm
// @include     http://apps.facebook.com/inthemafia/*
// @include     http://apps.new.facebook.com/inthemafia/*
// @include     http://www.facebook.com/connect/uiserver*
// @include     https://www.facebook.com/dialog/feed*
// @exclude     http://mwfb.zynga.com/mwfb/*#*
// @exclude     http://facebook.mafiawars.zynga.com/mwfb/*#*
// @exclude     http://apps.facebook.com/inthemafia/sk_updater.php*
// @exclude	    http://facebook.mafiawars.zynga.com/mwfb/iframe_proxy.php*
// @include     https://facebook.mafiawars.zynga.com/mwfb/remote/html_server.php*
// @include     https://mwfb.zynga.com/mwfb/remote/html_server.php*
// @include     https://facebook.mafiawars.zynga.com/mwfb/xd_receiver.htm
// @include     https://apps.facebook.com/inthemafia/*
// @include     https://apps.new.facebook.com/inthemafia/*
// @include     https://www.facebook.com/connect/uiserver*
// @exclude     https://mwfb.zynga.com/mwfb/*#*
// @exclude     https://facebook.mafiawars.zynga.com/mwfb/*#*
// @exclude     https://apps.facebook.com/inthemafia/sk_updater.php*
// @exclude	    https://facebook.mafiawars.zynga.com/mwfb/iframe_proxy.php*
// @version     1.0.0
// ==/UserScript==

(function(){
    
	var http = 'http://';
	if (/https/.test(document.location)) {
		http = 'https://';
	}
	var preurl = http+'facebook.mafiawars.zynga.com/mwfb/remote/html_server.php?';  
        
var regex = /(http|https|ftp|ftps)\:\/\/[a-zA-Z0-9\-\.]+\.[a-zA-Z]{2,3}(\/\S*)?/g

String.prototype.trunc = function(n){
                          return this.substr(0,n-1)+(this.length>n?'.......':'');
                         };
                         
function start(){
try{
var ScriptLikeButton = '<fb:like href="http://www.facebook.com/mwscripts" layout="button_count" show_faces="false" action="like" colorscheme="light"></fb:like>';


FB.init({			
       appId  : '10979261223',			
       status : true, // check login status			
       cookie : true, // enable cookies to allow the server to access the session			
       xfbml  : true,  // parse XFBML			
       oauth  : true, // OAuth 2.0			
       frictionlessRequests   : true		
   });		
  
}catch(err){}

html ='&nbsp;Paste all your links<textarea id="LucifersLinksArea" style="width: 400px; height: 250px"></textarea>';
$('head').append('<link rel="stylesheet" href="http://ajax.googleapis.com/ajax/libs/jqueryui/1.8/themes/ui-darkness/jquery-ui.css" type="text/css" />');
		$('#popup_fodder').append("<div id='multiopenlinks' style='height:20px;overflow:auto;'>"+html+"<span id='group_msg_result'><br/></span></div>");
                
		$('#multiopenlinks').dialog({ 
			title: 'Lucifers Multi Link Opener  '+ScriptLikeButton, 
			close: function(){ $('#multiopenlinks').remove();}, 
			buttons: [ 

			{
			text: 'Open All Links',
			id: 'post_wall',
			click: function(){
                        
                        var urls = $('#LucifersLinksArea').val();       
                        var url = urls.match(regex)
                        $('#group_msg_result').text('Please Wait, Processing Links')
                         $('#LucifersLinksArea').val('Processing Links'); 
                        var current_text = "\n";
                        
                        
                         for (var i = 0; i < url.length; i++) {
                            //window.open (url[i]);
                            link = url[i];
                            
                           
                            unshort(link,function(longurl,shortlink){
                                
				if(/^https?:\/\/.*facebook/.test(longurl)) {
                                    $('#group_msg_result').text('Processing '+shortlink.trunc(40))
					request_fburl(shortlink,longurl,function(response,shortlink){
										var result;
                                        setTimeout(function(){
                                        current_text = $('#LucifersLinksArea').val()
                                        $('#group_msg_result').text('Finished!')
										log(response);
										
										 if (($r = $(response).find('.message_body:first, #mbox_generic_1 tr:eq(1)')).length > 0) {
											result = $.trim($r.text());
											//log('here');
											}
										
										if (($r = $(response).find('.fl_Msg')).length > 0) {
											result = $.trim($r.text());
											//log('here');
										}
										
										if (($r = $(response).find('.fl_Box')).length > 0) {
											result = $.trim($r.text());
											//log('here');
										}
										
										
										
										
					$('#LucifersLinksArea').val(current_text+"\n"+shortlink+"\n"+result)
                                        
                                        },0);
                                        

                                        
					},function(){
                                            
					current_text = $('#LucifersLinksArea').val()         
					$('#LucifersLinksArea').val(current_text+"\nError Loading Link")
					});
                                    } 
                                });
		
                                
                            } 
                        
 
                        }
			}], 
			width: 450,
			height: 450,
			position: ['center',100]
		}); 


}

function oldschool(){
 
  var n_to_open,dl,dll,i; 
    function linkIsSafe(u) { 
        if (u.substr(0,7)=='mailto:') 
            return false; 
        if (u.substr(0,11)=='javascript:') 
            return false; 
        return true; 
    } 
    n_to_open = 0; 
    dl = document.links; 
    dll = dl.length;
    
    if (window.getSelection && window.getSelection().containsNode) {
        /* mozilla */ for(i=0; i<dll; ++i) {
            if (window.getSelection().containsNode(dl[i], true) && linkIsSafe(dl[i].href)) ++n_to_open; } 
        if (n_to_open && confirm('Open ' + n_to_open + ' selected links in new windows?')) { 
            for(i=0; i<dll; ++i) if (window.getSelection().containsNode(dl[i], true) && linkIsSafe(dl[i].href)) window.open(dl[i].href); }
    }
if (!n_to_open){    
var urls=prompt("Please paste all your links you wish to open \n\nhttp://tinyurl.com/1 http://tinyurl.com/2 etc etc\n\nYou can even paste in text with your URLs","");
try{
if (urls.length > 0){
    
var url = urls.match(regex)
  for (var i = 0; i < url.length; i++) {
window.open (url[i]);

 }
 return false;
}}catch(err){}}
}



        
if (typeof jQuery === "undefined") 
{
    oldschool();
    return false;

}
if (/html_server/.test(window.location.href)) {
        // make sure it's the real game
        if (document.getElementById('final_wrapper')) {
           start();
           return false;
        }
    }
    else if (/apps.facebook.com\/inthemafia/.test(window.location.href)) {
        start();
        return false;
    }
    
else{
    oldschool()
}

	function unshort(url,handler) {
		try {
			var m;
			if(m=/(http\:\/\/[^\s]*)/.exec(url)) {
				url=m[1];
			}
		} catch(e){}
                //URL is already a long link
                if (/apps.facebook.com\/inthemafia/.test(url)) {
                     handler(url,url);
                }
            //$.getJSON('http://screepts.com/unshorten.php?url='+escape(url)+'&callback=?',
			$.getJSON('http://api.longurl.org/v2/expand?url='+escape(url)+'&format=json&callback=?',
				function (data) {
					//var longurl = unescape(data.longlink);
					var longurl = unescape(data['long-url']);
                                        //log(longurl);
                                        handler(longurl,url);
                                        
				}
			);		
		 
		
	}
function request_fburl(shortlink,url, handler, errorhandler) {
                    

                                        
		url = url.replace('http://apps.facebook.com/inthemafia/track.php?','');
		url = url.replace('https://apps.facebook.com/inthemafia/track.php?','');
		url = url.replace(/next_/g,'xw_');
		var strparams = '';
		if (params = /params=(\{.*\})/.exec(url)) {
			try {
				params = jQuery.parseJSON(params[1].replace(/[\+\%]/g,''));
			}
			catch (parseproblem) {
				//console.log(parseproblem+' '+unescape(params[1]).replace(/[\+\%]/g,''));
			}
			for (x in params) {
				strparams += '&'+x+'='+params[x];
			}
			url = url.substr(0,url.indexOf('&xw_params'));
		}
		if (params = /params=(%7B.*%7D)/.exec(url)) {
			try {
				params = jQuery.parseJSON(unescape(params[1]).replace(/[\+\%]/g,''));
			}
			catch (parseproblem) {
				//console.log(parseproblem+' '+unescape(params[1]).replace(/[\+\%]/g,''));
			}
			for (x in params) {
				strparams += '&'+x+'='+params[x];
			}
			url = url.substr(0,url.indexOf('&xw_params'));
		}
		url = url+strparams;
		var timestamp = parseInt(new Date().getTime().toString().substring(0, 10));
		if (url.indexOf('cb=') == -1) {
			url += '&cb='+User.id+timestamp;
		}
		if (url.indexOf('tmp=') == -1) {
			url += '&tmp='+timestamp;
		}
		User.clicks++;
		var params = {
			'ajax': 1,
			'liteload': 1,
			'sf_xw_user_id': User.id,
			'sf_xw_sig': local_xw_sig,
			'xw_client_id': 8,
			'skip_req_frame': 1,
			'clicks': User.clicks
		};
		$.ajax({
			type: "POST",
			url: preurl+url,
			data: params,
			cache: false,
			success: function(data){
                        handler(data,shortlink)
                        log( preurl+url)
                        $('#group_msg_result').text('Finished')
                         },
			error: errorhandler
		});
	}

function log(msg) {
//For us to debug out to browser java console
    setTimeout(function() {
        throw new Error(msg);
    }, 0);
}

//SCRIPT FINISH
	function PreLoadContent(file){
		var head = document.getElementsByTagName('head').item(0)
		var scriptTag = document.getElementById('loadScript');
		if(scriptTag) head.removeChild(scriptTag);
			script = document.createElement('script');
			script.src = file;
			script.type = 'text/javascript';
			script.id = 'loadScript';
			head.appendChild(script);
	}
	PreLoadContent('http://www.google-analytics.com/ga.js');
	try {
	var pageTracker = _gat._getTracker("UA-26130408-1");
	pageTracker._trackPageview();
	pageTracker._trackPageview("/scripts/multilink_opener"); 
	} catch(err) {}
})();