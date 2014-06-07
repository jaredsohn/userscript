// Flickr Snap
// v0.1
// 2006-05-09
// Copyright (c) 2006, Pierre Andrews.
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// ==UserScript==
// @name	Flickr Snap
// @namespace	http://6v8.gamboni.org/Flickr-Snap.html
// @description	Add thumbnails of flickr image where a link goes there.
// @source         http://6v8.gamboni.org/Flickr-Snap.html
// @identifier     http://6v8.gamboni.org/IMG/js/flickrsnap.user.js
// @version        0.1
// @date           2006-05-09
// @creator        Pierre Andrews (mortimer.pa@free.fr)
// @include	*
// @exclude http://flickr.com*
// @exclude http://www.flickr.com*
// @exclude http:/del.icio.us*
// ==/UserScript==

(function () {

	var win = (unsafeWindow || window.wrappedJSObject || window);

	//update information
	var SCRIPT = {
		name: "Flickr Snap",
		namespace: "http://6v8.gamboni.org/Flickr-Snap.html",
		description: "Add thumbnails of flickr image where a link goes there.",
		source: "http://6v8.gamboni.org/Flickr-Snap.html",			// script homepage/description URL
		identifier: "http://6v8.gamboni.org/IMG/js/flickrsnap.user.js",
		version: "0.1",								// version
		date: (new Date(2006, 5, 09))		// update date
		.valueOf()
	};

	//======================================================================


	//======================================================================

	 // constants
	 // http status constants
	var OK = 200;
	
	// xmlhttprequest readystate
	var COMPLETE = 4;
	
	var DEBUG = false;

	//======================================================================
	//exception
	var procException =  function(msg, code, req) {
			this.msg = msg;
			this.code =code;
			this.req = req;
	};
		
	
	//======================================================================
	//to do the closure and get the right this.
	//adapted from http://persistent.info/greasemonkey/gmail.user.js

	function getObjectMethodClosure(object, method) {
		return function() {
			return object[method](); 
		}
	}

	function getObjectMethodClosure0(object, method,args) {
		return function() {
			return object[method](args); 
		}
	}

	function getObjectMethodClosure1(object, method) {
		return function(arg) {
			return object[method](arg); 
		}
	}

	
	function getObjectMethodClosure11(object, method,args3) {
		return function(arg) {
			return object[method](arg,args3); 
		}
	}

	function getObjectMethodClosure2(object, method) {
		return function(arg,arg2) {
			return object[method](arg,arg2); 
		}
	}
	function getObjectMethodClosure21(object, method,args3) {
		return function(arg,arg2) {
			return object[method](arg,arg2,args3); 
		}
	}
	



	//======================================================================
	//Simple calls to flickr REST API, from the batch enhancer script
	// needs the md5 and status_msg code above

	win.FlickrAPI = function(){;}
	
	win.FlickrAPI.prototype = {	// flickr api 
		
		init: function(api_key,shared_secret) {
			this.api_key = api_key;
			this.shared_secret = shared_secret;
			if(shared_secret) this.auth_token = GM_getValue('auth_'+this.api_key);
			
			if (this.shared_secret && !this.auth_token) {
				this.askForAuth();
				
			} 
		},

		askForAuth: function() {
			this.flickr_api_call("flickr.auth.getFrob",
				{api_sig: this.getMethodSig("flickr.auth.getFrob", {api_key: this.api_key})}, 
								 getObjectMethodClosure2(this,'frob_loaded'),
								 getObjectMethodClosure1(this,'frob_failed'));
		},

		frob_loaded: function(req, rsp) {

			this.frob = rsp..frob[0];
			if(DEBUG) GM_log("received Frob "+this.frob);
			var api_sig = this.getMethodSig(false, {api_key: this.api_key,frob:this.frob,perms:"read"});
			var url= "http://flickr.com/services/auth/?api_key="+this.api_key+"&perms=read&frob="+this.frob+"&api_sig="+api_sig;
			//Here, we need the status_msg code
			status_msg.msgbox2("This script needs to be authorized. <br>" +
							  "<b style=\"font-variant:small-caps;\">Click [<a onclick='window.open(\""+url+"\"); return false'>Step1</a>]</b>, " +
							  "follow the instructions in the popup window,<br> " +
							  "then return here click Step2.<br> " +
							  "Popup blockers may cause this not to work.<br>You'll only have to do this once.","Step2",getObjectMethodClosure1(this,'getToken'));
		},

		frob_failed: function(e) {
			status_msg.msgbox('Couldn\'t authorize, for whatever reason.');
		},
		
		token_loaded: function(req,rsp) {		
			status_msg.hide();
			var token = rsp..token[0];
			this.nsid = rsp..user.@nsid[0];		
			
			if(DEBUG) GM_log("authenticated with user "+this.nsid+": "+token);
			this.auth = token;

			GM_setValue('auth_'+this.api_key,""+token);
		},
		
		token_failed:function(e) {
			status_msg.msgbox('Couldn\'t authorize, for whatever reason.');
		},
		
		// set it all up
	
		getToken: function()
		{
			status_msg.show('authorizing...');
			var api_sig = this.getMethodSig("flickr.auth.getToken", {api_key: this.api_key,frob:this.frob});
			this.flickr_api_call("flickr.auth.getToken",
			{frob: this.frob,api_sig: api_sig},
								 getObjectMethodClosure2(this,'token_loaded'),
								 getObjectMethodClosure1(this,'token_failed'));
		},	

		do_req: function ( method, proc_request, url, referer, data ) {
			var headers = new Object();
			var details = {
				method    : method,
				onload    : function(d) { proc_request(d) },
				url       : url,
				header    : headers
			};

			if (referer != null)
				headers['Referer'] = referer;
			
			if (data != null) {
				headers['Content-Type'] = 'application/x-www-form-urlencoded';
				details['data']         = data;
			}
			
			GM_xmlhttpRequest( details );
		},
		
		
		
		// a proc just spins around waiting for the thing to succeed or fail
		// then calls a callback, if we got 200 OK message.
		make_proc: function (op_name, ok_cb, fail_cb) {
			
			return function(req) { 
				
				try {
					// init progress
					document.body.style.cursor = 'progress';
					
				if (req.readyState != COMPLETE) {
					return;
				}
					
					// if (alert_response) { alert(req.responseText); }
					
					if( req.status != OK ) {
						throw new procException( op_name + " request status was '" + req.status + "'", 0, req )
					}
					
					ok_cb(req);
					
				} catch(e) {
					
					// clean up progress
					document.body.style.cursor = 'default';
					
					
					if (e instanceof procException) {
						if( fail_cb != null )
							fail_cb( e );
						else {
							GM_log( e.msg );
							if (DEBUG) {
								GM_log(e.req.responseText);
							}
						}
					} else {
						throw(e);
					}
				}
				
				// clean up progress
				
				document.body.style.cursor = 'default';
			}
		},


		// this is wraps the spinning proc like above,
		// except it parses the flickr api response a little before deciding all is well,
		// and passing control to the all-is-well callback
		make_flickr_api_proc: function(op_name, ok_cb, fail_cb) {

			function parse_and_ok_cb(req) {
				if(DEBUG) GM_log(req.responseText);
				var rsp = req.responseText.replace(/<\?xml.*\?>/,'');
				var rsp = new XML(rsp);
				// var rsp = req.responseXML.getElementsByTagName('rsp').item(0);
				
				if (rsp == null) {
					throw new procException( "Could not understand Flickr's response.", 0, req );
				}
				
				var stat = rsp.@stat;
				if (stat == null) {
					throw new procException( "Could not find status of Flickr request", 0, req);
				}
				
				if (stat != 'ok') {
					if (stat == 'fail') {
						var err_node = rsp.err[0];
						var code = err_node.@code;
						var err_msg = err_node.@msg;
						throw new procException( err_msg, code, req );
					} else {
						throw new procException("Unknown error status: '" + stat + "'", 0, req)
					}
				}
				
				ok_cb(req, rsp);
			}
			
			return this.make_proc(op_name, parse_and_ok_cb, fail_cb);
		},

		getMethodSig: function(method, args)
		{
			var data = new Array();		
			var names = new Array();
			var sig = this.shared_secret;
			
			if(method) {
				data['method'] = method;	
				names.push('method');
			}
			for (var key in args) {
				data[key] = args[key];
				names.push(key);
			}		
			names.sort();
			for (i in names) {
				sig += names[i] + data[names[i]];
			}		
			return hex_md5(sig);
		},


		// construct a flickr api request, with method and args, 
		// if that worked, call callback with request object.
		flickr_api_call: function( method, args, ok_cb, fail_cb,with_auth) {
			
			var http_method = args['http_method'];
			http_method = ( http_method ? http_method : 'GET' );
			delete args['http_method'];

			args['api_key'] = this.api_key;
			
			if (this.shared_secret && with_auth && this.auth_token) {
				args['auth_token'] = this.auth_token;
				args['api_sig'] = this.getMethodSig(method, args);
			} else if(DEBUG) GM_log('not signing: ' + method);
			
			
			var url = 'http://www.flickr.com/services/rest/?method=' + encodeURIComponent(method);
			
			for (var key in args) {
				url += '&' + encodeURIComponent(key) + '=' + encodeURIComponent(args[key]);
			}
			if(DEBUG) GM_log(url);

			var proc = this.make_flickr_api_proc( method, ok_cb, fail_cb )
			
			this.do_req(http_method, proc, url, null, null)
		},

	}

	//======================================================================

	var MAX_DAY_COUNT = 5;
	var NUMBER_OF_LAST_PHOTOS = 8;
	
	win.FlickrSnap = function() {;}

		
	win.FlickrSnap.prototype = {
		init: function(key,secret) {
			this.api = new win.FlickrAPI();
			this.api.init(key,false);
			var auctionLinks = document.evaluate(
												 "/html/body//a",
												 document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);  // Get all group
			
			for(var i = 0; i < auctionLinks.snapshotLength; i++) {  // For each LINK...
				var al = auctionLinks.snapshotItem(i);
					this.processA(al);
			}  		
		},
		checkImage: function(link) {
			for(var i=0;i<link.childNodes.length;i++) {
				if(link.childNodes.item(i).nodeName == 'IMG') {
					return true;
				}
			}
		},
		processA: function(link) {
			if(matches = /^(http:\/\/)?(www\.)?flickr.com\/photos\/[^\/]+?\/([0-9]+)/i.exec(link.href)) {
				if(!this.checkImage(link)) { //the link is not on an image
					this.api.flickr_api_call('flickr.photos.getSizes',
						{ photo_id: matches[3], http_method: 'POST' },
											 getObjectMethodClosure21(this,'getSizes_done', link),
											 getObjectMethodClosure1(this,'request_failed'));
				}
			} else if(matches = /^(http:\/\/)?(www\.)?flickr.com\/photos\/[^\/]+?\/sets\/([0-9]+)/i.exec(link.href)) {
				if(!this.checkImage(link)) { //the link is not on an image
					this.api.flickr_api_call('flickr.photosets.getPhotos',
						{ photoset_id: matches[3], http_method: 'POST' },
											 getObjectMethodClosure21(this,'getSetPhotos_done', link),
											 getObjectMethodClosure1(this,'request_failed'));
				}

			}
		},
		request_failed: function(err) {
			GM_log(err.msg);
		},
		getSizes_done: function(req,rsp,link) {
			img = link.appendChild(document.createElement('IMG'));
			img.src = rsp..size.@source[0];
		},
		getSetPhotos_done: function(req,rsp,link) {
			var primary = rsp..photo.(@isprimary == '1');
			img = link.appendChild(document.createElement('IMG'));
			img.src = "http://static.flickr.com/"+primary.@server+"/"+primary.@id+'_'+primary.@secret+'_s.jpg';
		}
	}
		
	// update automatically (http://userscripts.org/scripts/show/2296)
	try {
		window.addEventListener("load", function () {
			try {
				win.UserScriptUpdates.requestAutomaticUpdates(SCRIPT);
			} catch (ex) {} 
			
			var flickrgp = new win.FlickrSnap();
			flickrgp.init( "e8c3239ff04c102ce2d6ed885bf99005");	
		}, false);
	} catch (ex) {}

})();
