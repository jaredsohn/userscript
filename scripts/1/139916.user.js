// ==UserScript==
// @name        mafia wars test
// @description multiopener
// @namespace   MafiaWars
// @include     http://www.facebook.com/*
// @include     https://www.facebook.com/*
// @match      http://www.facebook.com/* 
// @match      https://www.facebook.com/*
// @exclude    http://www.facebook.com/groups/*
// @exclude    http://www.facebook.com/messages/*
// @exclude     http://apps.facebook.com/*
// @exclude     http://www.facebook.com/extern/*
// @exclude     http://www.facebook.com/connect/*
// @exclude     http://www.facebook.com/plugins/*
// @exclude     http://www.facebook.com/login.php*
// @exclude     http://facebook.mafiawars.zynga.com/mwfb/*

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
                          return this.substr(0,n-1)+(this.length>n?'.......':'');
                         };
                         
window.advncedOptions = function(){
var stopme = false;

var css = $('#advncedoptions').css('display')
//alert(css)
    if (css == 'none'){
        $('#linkarea').hide();
        $('#advncedoptions').show();
    }else{
        $('#linkarea').show();
        $('#advncedoptions').hide();
    }
}

function start(){
/*
 * Create the link div & text area for links to process  
 */     
//temp links for testing
var temp_links = '';

html ='&nbsp;Paste all your links<textarea id="LucifersLinksArea" style="width: 400px; height: 250px"></textarea>';
$('head').append('<link rel="stylesheet" href="http://ajax.googleapis.com/ajax/libs/jqueryui/1.8/themes/ui-darkness/jquery-ui.css" type="text/css" />');
		$('#popup_fodder').append("<div id='multiopenlinks' style='height:20px;overflow:auto;'>"+html+"<span id='group_msg_result'><br/></span></div>");

		$('#multiopenlinks').dialog({ 
			title: 'Lucifers Multi Link Opener',
                            //+ScriptLikeButton, 
			close: function(){ stopme = true;$('#multiopenlinks').remove();}, 
			buttons: [ 

			{
			text: 'Open All Links',
			id: 'process',
			click: function(){
                        
                        process_links();

 
                        }
			}], 
			width: 450,
			height: 450,
			position: ['center',100]
		}); 


}



function process_links(){
/*
 * Process the links from the text area a long link
 */    
 var urls = $('#LucifersLinksArea').val();
 if (!urls){
     alert('no links to process')
     return false;
 } 
 var url = urls.match(regex);

 run_times = parseInt($('#runlinks').val());

if (url.length > 0){
    
$('#LucifersLinksArea').val('')
$('#group_msg_result').text('Please Wait, Processing '+url.length+' Links')

process(0)
}else{
    alert('no links to process');
    return false;
}

function process(link_no){
/*
 * Process the links in the url array
 */    

//Resets the process window if to large
if (reset_log > 100){                                        
$('#LucifersLinksArea').val('reset log');
reset_log = 0;
}else{
    reset_log++;
}


if ( url.length > link_no){
    var link_to_process = url[link_no]; 
    if (link_to_process.length>0){
    var show_link = link_no + 1;
    $('#group_msg_result').text('Processing link '+show_link+' of '+url.length+' Links')
    $('#LucifersLinksArea').val($('#LucifersLinksArea').val()+'Processing Link \n'+link_to_process);
    log('proc')
    unshort(link_to_process,process_a_link)
    }else{
        link_no++
        process(link_no)
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

function process_a_link(e){
/*
 * Process A(1) link 
 */ 
//log(concat(e))
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
       var our_response = return_response(response);
       var return_box = $('#LucifersLinksArea').val();
       //Clean up return text
       if(return_box.charAt( return_box.length-1 ) == "\n") {
          our_response = our_response+'\n';
       }else{
          our_response = '\n'+our_response+'\n';
       }
       $('#LucifersLinksArea').val($('#LucifersLinksArea').val()+our_response);
        //parse again if need to process again
       
            link_no++;
            process(link_no)
       
            
    })
}    
process_it()    
}else{
    log('there was a problem couldn\'t get long link response was'+e)
    //Finished processing parse back to the process function to finish
    link_no++;
    process(link_no)
}


}   
                            
 
} 


function unshort(url,handler) {
/*
 * Unshorten Link parse back long link to handler
 */
 //URL is already a long link
if (/apps.facebook.com\/inthemafia/.test(url)) {
//alert('long link')
handler(url,url);
}else{
//URL Is shortlink return long link

$.getJSON('http://api.longurl.org/v2/expand?url='+escape(url)+'&format=json&callback=?',
				function (data) {
					//var longurl = unescape(data.longlink);
					var longurl = unescape(data['long-url']);
                                        //log(longurl);
                                        //alert('test')
                                        handler(longurl,url);
                                        
}
);
    
}
/*           
try {
			var m;
			if(m=/(http\:\/\/[^\s]*)/.exec(url)) {
				url=m[1];
			}
		} catch(e){}		
               
            
*/			
		 
}
function request_fburl(url, handler, errorhandler) {
/*
 * Process a mafia link & return to handler
 */
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