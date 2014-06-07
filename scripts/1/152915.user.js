// ==UserScript==
// @name       	MultiLink OPN
// @namespace   MultiLink OPN
// @author		Copyright(C) 2011 Luke Hardiman
// @description Update
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
// @version     000
// ==/UserScript==

(function(){
    
	var http = 'http://';
	if (/https/.test(document.location)) {
		http = 'https://';
	}
	var preurl = http+'facebook.mafiawars.zynga.com/mwfb/remote/html_server.php?';  
        
var regex = /(http|https|ftp|ftps)\:\/\/[a-zA-Z0-9\-\.]+\.[a-zA-Z]{2,3}(\/\S*)?/g
var link_no = 0;

var run_times = 1;
var reset_log
String.prototype.trunc = function(n){
    
                          return this.substr(0,n-1)+(this.length>n?'...':'');
                         };
                         

var stopme = false;



function start(){
/*
 * Create the link div & text area for links to process  
 */     
//temp links for testing
var temp_links = '';

html ='&nbsp;Paste all your links<textarea id="LucifersLinksArea" style="font-size:13px;width: 475px; height: 300px">'+temp_links+'</textarea>';
$('head').append('<link rel="stylesheet" href="http://ajax.googleapis.com/ajax/libs/jqueryui/1.8/themes/ui-darkness/jquery-ui.css" type="text/css" />');
		$('#popup_fodder').append("<div id='multiopenlinks' style='height:20px;overflow:auto;'>"+html+"<span id='group_msg_result' style='font-size:13px;'><br/></span></div>");

		$('#multiopenlinks').dialog({ 
			title: 'Lucifers Multi Link Opener',
                            //+ScriptLikeButton, 
			close: function(){ stopme = true;$(this).remove();}, 
			buttons: [ 

			{
			text: 'Open All Links',
			id: 'process',
			click: function(){
                        
                        process_links();

 
                        }
			}], 
			width: 530,
			height: 470,
			position: ['center',100]
		}); 


}



function process_links(){
/*
 * Process the links from the text area a long link
 */    


link_no = 0;

 var urls = $('#LucifersLinksArea').val();
 if (!urls){
     alert('no links to process')
     return false;
 } 
 var url = urls.match(regex);


log('url.length =>'+url.length);


if (url.length > 0){
    
$('#LucifersLinksArea').val('Processing links...')
$('#group_msg_result').text('Please Wait, Processing '+url.length+' Links')

process(0)
}else{
    alert('no links to process');
    return false;
}

function process(){
/*
 * Process the links in the url array
 */    
log('running process')
//Resets the process window if to large
if (reset_log > 150){                                        
$('#LucifersLinksArea').val('reset log');
reset_log = 0;
}else{
    reset_log++;
}


if ( url.length > link_no){
    
    
    //var link_to_process = url[link_no];
    
    
    if (/http/.test(url[link_no])){
        
    //if link_no is more than 5 we will open 5 lots of this link quickly
    var links_can_do = link_no + 2;
    log('links_can_do'+links_can_do)
    if (url.length > links_can_do) {
        //loop 5 links @ a time
        /*
        for (i=0; i<5; i++)
        {
       */
       
        log('link array '+link_no+'=>'+url[link_no])
           if ( url.length > link_no){
            if (/http/.test(url[link_no])){
                log('going to unshorten =>'+url[link_no])
                //setTimeout(function(){
                
                unshort(url[link_no],function(e){
                    log(e)
                    process_a_link(e,url[link_no])
                    
                    link_no++
                    process()
                })
                    //unshort(process_a_link)
                
            //},2500);
            }
            
            
           //}
        
        
        //
           
        }
        
    }else{
       if ( url.length > link_no){
         unshort(url[link_no],function(e){
                    log(e)
                    process_a_link(e,url[link_no],process)
                    
                    link_no++
                    //process()
         })
        }
    }
    
   
    //$('#LucifersLinksArea').val($('#LucifersLinksArea').val()+'Processing Link \n');
    
    
    
    //var show_link = link_no + 1;
    //$('#group_msg_result').text('Processing link '+show_link+' of '+url.length+' Links')
    }else{
        //link_no++
        //process()
        //alert('test')
        if ( url.length > link_no){
            
             link_no++
             process()
        }
       
    }
    
}else{
   //alert('finished processing links');
   $('#link_process_no').text(url.length+' links processed '+run_times+' times each')
   $('#group_msg_result').text('Finished processing links...')
   return;
}


}
//log(concat(url))
//return;

function process_a_link(e,shortlink,handler){
/*
 * Process A(1) link 
 */ 
//log(concat(e))
//var show_link = link_no + 1;

 
var Currently_Processed = 1;
if(/^https?:\/\/.*facebook/.test(e)) {
function process_it(){
if (run_times > 1){
    $('#link_process_no').text('processed ('+Currently_Processed+'/'+run_times+')')
}
//alert('processing link..'+e)    
    request_fburl(e,function(response){
       /*
        *Process the request
        */
       //var our_response = return_response(response);
       $('#group_msg_result').text('Processing link '+link_no+' of '+url.length+' Links')
       if (shortlink){
            update_results(shortlink,return_response(response));
       }else{
           update_results(e,return_response(response));
       }
       
       //var return_box = $('#LucifersLinksArea').val();
       //Clean up return text
      
        //parse again if need to process again
       
            //link_no++;
            handler()
       
            
    })
}    
process_it()    
}else{
    log('there was a problem couldn\'t get long link response was'+e)
    //Finished processing parse back to the process function to finish
    link_no++;
    process()
}


}   
                            
 
} 

function update_results(link,response){
/*
 * Updates the text value with the link & response
 */
var our_response = response;

var return_box = $('#LucifersLinksArea').val();

 if(return_box.charAt( return_box.length-1 ) == "\n") {
          our_response = our_response+'\n';
       }else{
          our_response = '\n'+our_response+'\n';
}

//replace the track url...
//link = link.replace('http://apps.facebook.com/inthemafia/track.php?','')
$('#LucifersLinksArea').val( return_box+'\n\n'+link+'\nresponse :'+response);

}

function unshort(urllink,handler) {
/*
 * Unshorten Link parse back long link to handler
 */
 //URL is already a long link

log('parsed to unshorten =>'+urllink)

                
if (/apps.facebook.com\/inthemafia/.test(urllink)) {
//alert('long link')
handler(urllink,urllink);
}else if (urllink.indexOf('spockon.me')!=-1) {
$.ajax({
    type: "GET",
    dataType: "jsonp",
    url: 'http://spockon.me/api.php?action=expand&format=jsonp&shorturl='+escape(urllink),
    crossDomain: true,
    success: function (msg){
    var longurl = msg.longurl;
         handler(longurl,urllink);
    },
    error: other_long
});	
}else{
//URL Is shortlink return long link
function other_long(){
$.getJSON('http://api.longurl.org/v2/expand?url='+escape(urllink)+'&format=json&callback=?',
				function (data) {
					//var longurl = unescape(data.longlink);
					var longurl = unescape(data['long-url']);
                                        //log(longurl);
                                        //alert('test')
                                        handler(longurl,urllink);
                                        
}
);
}
other_long()
}
/*           
try {
			var m;
			if(m=/(http\:\/\/[^\s]*)/.exec(url)) {
				url=m[1];
			}
		} catch(e){}		
               
            
*/			

//handler()
}
function request_fburl(url, handler, errorhandler) {
/*
 * Process a mafia link & return to handler
 */

if (stopme == true)return false;

var AjaxErrorCount = 0; 
//alert('doing ajax')    

                                    
		url = url.replace('http://apps.facebook.com/inthemafia/track.php?','');
		url = url.replace('https://apps.facebook.com/inthemafia/track.php?','');
		url = url.replace(/next_/g,'xw_');
		var strparams = '';
		if (params = /params=(\{.*\})/.exec(url)) {
			try {
				params = $.parseJSON(params[1].replace(/[\+\%]/g,''));
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
				params = $.parseJSON(unescape(params[1]).replace(/[\+\%]/g,''));
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

function processRequest(){
		$.ajax({
			type: "POST",
			url: preurl+url,
			data: params,
			cache: false,
			success: function(data){
                        handler(data)
                        //log( preurl+url)
                        
                         },
			error: function(e){
                           AjaxErrorCount++;
                            if (AjaxErrorCount > 5){
                                
                                log('there where to many ajax errors')
                       
                            }else{
                                 //log('<span style="color:#F00">Ajax Error :</span> attempting a retry #'+AjaxErrorCount,true)
                                 setTimeout(function(){processRequest();},666)
     
                            }  
                        }
		});
}
processRequest();
	}

function log(msg) {
//For us to debug out to browser java console
    setTimeout(function() {
        throw new Error(msg);
    }, 0);
}

function return_response(html){
/*
 * Returns the text message response from ajax call
 */    
var result;
if (($r = $(html).find('.message_body:first, #mbox_generic_1 tr:eq(1)')).length > 0) {
result = $.trim($r.text());											
}
										
else if (($r = $(html).find('.fl_Msg')).length > 0) {
result = $.trim($r.text());
}
else if (($r = $(html).find('.fl_Box')).length > 0) {
result = $.trim($r.text())
}else{
result = 'Could not process request'
}

return result
}

function concat(obj) {
/*
 * Returns object data x1
*/
  str='';
  for(prop in obj)
  {
    str+=prop + " value :"+ obj[prop]+"\n";
  }
  return(str);
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
start()
})();
