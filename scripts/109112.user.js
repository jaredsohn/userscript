// TheBotDilaila
// 2013-04-07
// New Core System with plugins
// --------------------------------------------------------------------
// ==UserScript==
// @name        TheBotDilaila
// @namespace   tbd.my
// @description TheBotDilaila TheBotox Version
// @author      Izham87, Jejaka Pemalu, Hotfloppy, Suhz
// @include     http://w3.tbd.my/*
// @include     https://w3.tbd.my/*
// @exclude	http*://w3.tbd.my/xmlhttp.php*
// @exclude	http*://w3.tbd.my/ch.php
// @exclude http*://w3.tbd.my/us/*
// @version     2.0.202c
// ==/UserScript==
//

var TBDDebug = false;
//Rewrite function if not exists
if (typeof unsafeWindow === 'undefined') {
    var unsafeWindow    = ( function () {
        var dummyElem   = document.createElement('a');
        dummyElem.setAttribute ('onclick', 'return window;');
        return dummyElem.onclick ();
    })();
//    var unsafeWindow = this.window;
}
var TBD_log = function(msg){
	if (TBDDebug === true){
		if (typeof GM_log === 'undefined' || typeof msg.toString() ==='undefined' || typeof msg !== 'string'){
			console.log(msg);
		}else{
			GM_log(msg);
		}
	}
}

//End of defined functions
//Initialize of the bot
var GMTBD = function(jquery){
	TBD_log('Initialized');
		/************************************ TBDELEMENT ********************************************/
    //Create temporary directory
    var TBDElement = new function(){
    	this.body = document.getElementsByTagName('body')[0];
	   var tmp = document.createElement('div');
    	tmp.style.display='none';
	   tmp.id = 'GM_TBD_tmp';
    	this.tmp = tmp;
	   this.body.appendChild(tmp);
    },//EOF TBDElement
    /************************************ TBDRESPONSE ********************************************/
	//TBDResponse what the output of the bot be like
	TBDResponse =  function(){
    	//Execute each repo's loaded actions
			var uselists =TBDPlugins.usedLists;
			TBD_log('Filter Request :'+TBDRequest.message.substring(0,30));
			if (TBDRequest.message === 'test' && (TBDRequest.userid === TBDSession.userid)){
					TBDHttp.post_chat('HelloWorld!!\
					[spoiler]\
					[align=left]**** Session ****[/align]\
					[align=left]Username: '+TBDSession.username+'[/align]\
					[align=left]User ID: '+TBDSession.userid+'[/align]\
					[align=left]**** Request ****[/align]\
					[align=left]Username: '+TBDRequest.username+'[/align]\
					[align=left]User ID: '+TBDRequest.userid+'[/align]\
					[align=left]Message: '+TBDRequest.message+'[/align]\
					[align=left]Websocket: '+TBDRequest.socket+'[/align]\
					[align=left]Location: '+TBDRequest.location+'[/align]\
					[align=left]***** Debug *****[/align]\
					[/spoiler]');
			}else {
				for (var i=0; i<uselists.length; i++) {
					var fn = 'TBDPlugin'+uselists[i];
					fn = unsafeWindow[fn];
					if (typeof fn !== 'undefined' && (TBDDebug===true || TBDRequest.userid !== TBDSession.userid) ){
					var re = (typeof fn.regexFlag === 'undefined')? new RegExp(fn.regex): new RegExp(fn.regex,fn.regexFlag);
					if (re.test(String(TBDRequest.message))){
						TBD_log('Test success for '+uselists[i]);
						if (typeof fn.session !== 'undefined' && fn.session === true)fn.session = TBDSession;
						if (typeof fn.request !== 'undefined' && fn.request === true)fn.request = TBDRequest;
						TBD_log('Executing action for '+uselists[i]);
						var output = fn.action();
						if (output !== false && (TBDRequest.location === '/index.php' || TBDRequest.location  === '/') ){
								TBD_log('Output detected');
								if (typeof fn.callback === 'function'){
									TBD_log('Plugin callback is a function');
									fn.callback(output);
								}else if (typeof fn.callback !== 'undefined' && fn.callback !== true){
										var cb = TBDHttp[fn.callback];
										cb(output);
								}else if (typeof fn.callback === 'undefined' || fn.callback === true){
										TBDHttp.post_chat(output);
								}//callback eot
							}//output n loc test
						}//regex test eot
				}else{//fn test eot
					TBD_log('No function defined for '+uselists[i]);
				}
			}
		}
	},//EOF TBDResponse
   /************************************ TBDHTTP ********************************************/
	TBDHttp = {
		//post function for chat
		post_chat : function(msg){
		jquery.ajax({
  			type: "POST",
  			beforeSend:function(){
					 	TBD_log('exec: HTTP POST CHAT');
				},
				error:function(a,b,c){
										TBD_log('exec[error]: HTTP POST CHAT '+c);
				},
  			url: 'http://w3.tbd.my/xmlhttp.php?action=add_shout',
		  	data: {"shout_data": msg, "shout_key": TBDSession.shout_key},
			  success: function(data) {
                  TBD_log('exec[done]: HTTP POST CHAT ');
                  if (data === String("flood|0")){
                      TBD_log('exec[flood]: HTTP POST CHAT ');
                      window.setTimeout(function(){TBDHttp.post_chat(msg);},1000);
                  }
    		},
    		xhrFields: {
      		withCredentials: true
   			},
    		async:true
		});
	},//EOF http_post_chat
	//HTTP get chat contents
	get_chat : function(){
	   jquery.ajax({
	       		xhrFields: {
		      		withCredentials: true
		   			},
					   url: TBDRequest.shout_url,
					   beforeSend:function(){
					   	TBD_log('exec: HTTP GET CHAT');
					   },
					   error:function(a,b,c){
					   	TBD_log('exec[error]: HTTP GET CHAT '+c);
					   },
					   success:function(d) {
					     	TBD_log('exec[done]: HTTP GET CHAT');
	              d = new String(d);
						d=d.split("<br>");
						d = d[0].split('--');
						TBDRequest.message =  d[d.length-1].replace(/^\s\s*/, '').replace(/\s+$/, '');
						var b = parseInt(d[0].replace(/[^0-9]/g,''));
						var hashTag = d[2].replace(/<[^<]+?>+(\W|\d)+/g,'');
						TBDRequest.userid = hashTag.replace().replace(/\D+/g,'');
						TBDRequest.username = hashTag.replace('^&raquo; ','').replace(/<[^<]+?>/g,'');
						if (TBDRequest.lastid < b ){
							TBDResponse();
						}
						TBDRequest.lastid = b;
						},
						type:'GET',
						async:true,
						dataType:'text'
			});
		}//EOF http_get_chat
	},
 /************************************ TBDREQUEST ********************************************/
	//TBDRequest Represents what is displayed at chatbox.
	TBDRequest = {
		location:unsafeWindow.location.pathname,
		url:'chat.tbd.my',
		port : '80',
		channel : 'tbdshoutbox',
		shout_url : 'http://w3.tbd.my/xmlhttp.php?action=show_shouts',
		lastid : 0,
		username : '',
		userid : '',
		message : '',
		socket : (("WebSocket" in window)===true),
	},//EOF TBDRequest
	/************************************ TBDSESSION ********************************************/
	//TBDSession The users identity to post or get anything
	TBDSession = {
		username : unsafeWindow.tbd_uname,
		userid : unsafeWindow.tbd_uid,
		shout_key : jquery('#shout_key').attr('value'),
		post_key : 	unsafeWindow.my_post_key
	},//EOF TBDSession
	/************************************ TBDPLUGINS ********************************************/
	//TBDPlugins Load or call the plugins action
	TBDPlugins = {
      src : "http://w3.tbd.my/us/plugins.php",
       //Enabled plugins lists
	   	usedLists : ['Buzzer','Salam']
	};//EOF TBDPlugins
	//Load Repolists	
	   jquery.ajax({
	   		async:false,
        cache:true,
	   			xhrFields: {
      			withCredentials: true
 				},
  			beforeSend:function(){
					   	TBD_log('exec: PLUGINS GET LIST');
				},
				error:function(xhr, textStatus, errorThrown ){
				   	TBD_log('exec[error]: PLUGINS GET LIST '+errorThrown);
				},
	    	success:function(data,status, xhr){
				   	TBD_log('exec[done]: PLUGINS GET LIST');
				   	var useList = TBDPlugins.usedLists;
						jquery.each(useList,function(_key,_object){
								if (typeof data[_object] !== 'undefined'){
   			    		    var s = document.createElement('script');
                  	  s.type = 'text/javascript';
                   	  s.src = data[_object];
                   	  TBDElement.body.appendChild(s);
                   	  var fn_wait = function(){
                   	  	if (typeof unsafeWindow['TBDPlugin'+data[_object]] === 'undefined'){
                   	  		window.setTimeout(fn_wait,100);
                   	  	}
                   	  }
                   	  fn_wait();
          	     }
            });
           },
          url:TBDPlugins.src,
          type:'GET',
          dataType:'json'
        }).done(function(){				
        TBDHttp.get_chat();
				if (TBDRequest.socket){    //Yes Got websocket
					TBD_log('Using socket');
					var socket = new unsafeWindow.PushStream({
						host: TBDRequest.url,
						port: TBDRequest.port,
						modes: "websocket",
						channelsByArgument: true,
						channelsArgument: 'channels'
					});
					socket.onmessage = function(a,b,c){
					if (TBDRequest.lastid < b){//Make sure the msg isn't it
						var d = jquery.parseJSON(jquery.base64.decode(a));
							TBDRequest.message = d.shout_msg;
							TBDRequest.username = jquery(d.uname).html();
							TBDRequest.userid = d.uid;
							TBDResponse();
					}
					TBDRequest.lastid = b;
	  	};		
			socket.addChannel(TBDRequest.channel);
			socket.connect();	
		}else{//no got websocket
			TBD_log('No socket');
			setInterval (TBDHttp.get_chat,2000)
		}
});
},//EOF GM_TBD_init
GM_start = function () {
	if ( typeof unsafeWindow.jQuery === 'undefined') {
		window.setTimeout(GM_start, 100);
	} else {
		jquery = unsafeWindow.jQuery = unsafeWindow.jQuery.noConflict(true);
		jquery(document).ready(function(){
		    if (jquery("#GM_TBD_tmp").length === 0) GMTBD(jquery);			
		});
	}
};//EOF GM_start
GM_start();