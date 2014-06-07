// ==UserScript==
// @name          Flickr Batch Operations Enhancer
// @namespace     http://lachnlone.no-ip.info/greasemonkey
// @description	  Adds several features to Flickr's batch operations
// @include       http://www.flickr.com/photos_batch_operations.gne*
// @include       http://flickr.com/photos_batch_operations.gne*
// ==/UserScript==

/*
	Flickr Batch Operations Enhancer v0.4.2
	(c) 2005 Lachie
	http://lachblog.blogspot.com/
	http://www.flickr.com/photos/lachie/

	Credits
	http://livehttpheaders.mozdev.org/                  - invaluable for sniffing the POSTs
	http://persistent.info/greasemonkey/gmail.user.js   - nicked a bit from this script
	http://brevity.org/greasemonkey/                    - Neil Kandalgaonkar for the Flickr API bits, and beautiful clean example code (Lickr)
*/



(function() {

	 //------------------------------------------------------------------------
	 // constants
	 // http status constants
	 var OK = 200

	 // xmlhttprequest readystate
	 var COMPLETE = 4

	// to get multi group editing, put your email and password in here
	 var USER_EMAIL    = 'your@email'
	 var USER_PASSWORD = 'yourpassword'


	 var API_KEY = '3a25e3658df8e1964a65c898feeb2faf';
	 var DEBUG = true;

	 var MAX_PICS_TO_GROUP = 2;


	// nicked from http://persistent.info/greasemonkey/gmail.user.js
	function getObjectMethodClosure(object, method) {
		return function() {
			return object[method](); 
		}
	}

	function getObjectMethodClosure1(object, method) {
		return function(arg) {
			return object[method](arg); 
		}
	}
	function getObjectMethodClosure2(object, method) {
		return function(arg,arg2) {
			return object[method](arg,arg2); 
		}
	}


	// Shorthand
	var newNode = getObjectMethodClosure1(document, "createElement");
	var newText = getObjectMethodClosure1(document, "createTextNode");
	var getNode = getObjectMethodClosure1(document, "getElementById");
	var getTags = getObjectMethodClosure1(document, "getElementsByTagName");


	// display status
	function update_status() {
		this.status_span.innerHTML = "";

		if( this.status['sent'] > 0 ) {
			this.status_span.innerHTML += "sent: " + this.status['sent'] + " ";
		}
		if( this.status['failed'] > 0 ) {
			this.status_span.innerHTML += "failed: " + this.status['failed'] + " ";
		}
	}

	/*
	function do_post( cb_method, url, referer, data ) {
		var req = new GM_XMLHttpRequest();

		var object = this;
		req.onreadystatechange = function() { object[cb_method](req) };
		req.open('POST', url );
		req.setRequestHeader( 'Referer', referer );
		req.setRequestHeader( 'Content-Type', 'application/x-www-form-urlencoded' );
		req.send( data );
	}
	*/


	function do_post( cb_method, url, referer, data ) {
		var object = this;

		GM_xmlhttpRequest({
			method  : "POST"  ,
			url     : url     ,
			data    : data    ,
			onload  : function() { object[cb_method](req) },
			headers : {
				'Referer'      : referer,
				'Content-Type' : 'application/x-www-form-urlencoded'
			}
		});
	}

	function do_get( object, cb_method, url, referer ) {
		var object = this;

		GM_xmlhttpRequest({
			method  : "POST"  ,
			url     : url     ,
			onload  : function(d) { object[cb_method](d) },
			headers : {
				'Referer'      : referer,
			}
		});

	}


	// lifted from lickr.js - with mods

	function xpath_single_node(context_node, xpath) {
		return  document.evaluate( 
				xpath,                              
				context_node, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null
				).singleNodeValue;
	}



	// flickr api 

	function do_req( method, proc_request, url, referer, data ) {
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
	}

	/*
	function do_req( method, proc_request, url, referer, data ) {
		var req = new XMLHttpRequest();
		req.onreadystatechange = function() { proc_request(req) };
		req.open(method, url );

		if (referer != null) {
			req.setRequestHeader( 'Referer', referer );
		}

		if (data != null) {
			req.setRequestHeader( 'Content-Type', 'application/x-www-form-urlencoded' );
			req.send( data );
		} else {
			req.send('');
		}

	}
	*/



	function procException(msg, req) {
		this.msg = msg
			this.req = req
	}


	// a proc just spins around waiting for the thing to succeed or fail
	// then calls a callback, if we got 200 OK message.
	function make_proc(op_name, ok_cb, fail_cb) {

		return function(req) { 

			try {
				// init progress
				document.body.style.cursor = 'progress';

				if (req.readyState != COMPLETE) {
					return;
				}

				// if (alert_response) { alert(req.responseText); }

				if( req.status != OK ) {
					throw new procException( op_name + " request status was '" + req.status + "'", req )
				}

				ok_cb(req);

			} catch(e) {

				// clean up progress
				document.body.style.cursor = 'default';


				if (e instanceof procException) {
					if( fail_cb != null )
						fail_cb( e );
					else {
						alert( e.msg );
						if (DEBUG) {
							alert(e.req.responseText);
						}
					}
				} else {
					throw(e);
				}
			}

			// clean up progress

			document.body.style.cursor = 'default';
		}
	}


	// this is wraps the spinning proc like above,
	// except it parses the flickr api response a little before deciding all is well,
	// and passing control to the all-is-well callback
	function make_flickr_api_proc(op_name, ok_cb, fail_cb) {

		function parse_and_ok_cb(req) {
			var parser = new DOMParser();
			var doc = parser.parseFromString( req.responseText, 'text/xml' );
			var rsp = doc.getElementsByTagName('rsp').item(0);

			// var rsp = req.responseXML.getElementsByTagName('rsp').item(0);

			if (rsp == null) {
				throw new procException( "Could not understand Flickr's response.", req );
			}

			var stat = rsp.getAttribute("stat");
			if (stat == null) {
				throw new procException( "Could not find status of Flickr request", req);
			}

			if (stat != 'ok') {
				if (stat == 'fail') {
					var err_node = rsp.getElementsByTagName('err').item(0);
					var err_msg = err_node.getAttribute("msg");
					throw new procException( err_msg, req );
				} else {
					throw new procException("Unknown error status: '" + stat + "'", req)
				}
			}

			ok_cb(req, rsp);
		}

		return make_proc(op_name, parse_and_ok_cb, fail_cb);
	}


	// construct a flickr api request, with method and args, 
	// if that worked, call callback with request object.
	function flickr_api_call( method, args, ok_cb, fail_cb ) {

		var url = 'http://www.flickr.com/services/rest/?api_key=' + API_KEY;
		url += '&method=' + encodeURIComponent(method);

		for (var key in args) {
			url += '&' + encodeURIComponent(key) + '=' + encodeURIComponent(args[key])
		}

		var proc = make_flickr_api_proc( method, ok_cb, fail_cb )

		var http_method = args['http_method']
		http_method = ( http_method ? http_method : 'GET' )
		delete args['http_method']

		do_req(http_method, proc, url, null, null)
	}

	// end of section lifted from lickr.js
	// -----------------------------------------------


	function inject_css( css ) {
		var style_el = xpath_single_node( document, '//head[1]/style[1]' );
		if( ! style_el ) {
			var style_el = newNode( 'style' );
			style_el.setAttribute("type", 'text/css');
			style_el.innerHTML = '';

			xpath_single_node( document, '//head[1]' ).appendChild( style_el );
		}

		style_el.innerHTML += css;
	}


	// make an anchor
	function mk_a(text,fn) {
		var a = newNode('a');
		a.setAttribute('href','#');
		a.onclick = fn
		a.appendChild( newText(text) );

		return a;
	}
	
	function link(text,href) {
		var a = newNode('a');
		a.setAttribute('href',href);
		a.appendChild( newText(text) );

		return a;
	}


	// Date utils
	function split_to_int( sep, str ) {
		var bits = str.split(sep);
		for( var i=0; i<bits.length; i++ ) {
			bits[i] = parseInt(bits[i]);
		}
		return bits;
	}

	// parses and validates the date from a date and a time string
	function get_date( date_str, time_str ) {
		var dt;

		try {
			var date_bits = split_to_int( '/', date_str );
			var time_bits = split_to_int( ':', time_str );

			dt = new Date();

			dt.setYear(  date_bits[2] );
			dt.setMonth( date_bits[0]-1 );
			dt.setDate( date_bits[1] );

			dt.setHours( time_bits[0] );
			dt.setMinutes( time_bits[1] );
			dt.setSeconds( time_bits[2] );

			if(  date_bits[0] != dt.getMonth()+1 
				|| date_bits[1] != dt.getDate()
				|| date_bits[2] != dt.getFullYear()
			) throw new Error("couldn't parse date");

			if(  time_bits[0] != dt.getHours() 
				|| time_bits[1] != dt.getMinutes()
				|| time_bits[2] != dt.getSeconds()
			) throw new Error("couldn't parse time");

		} catch(e) {
			alert("your date is whack: " + e.message );
			return null;
		}

		return dt;
	}

	// zero pads a number, up to 2 digits
	function pad02d(num) {
		return ( num < 10 ? '0' + num : num );
	}


	// Options
	function init_option() {
		this.div = newNode('div');

		this.div.setAttribute('class','OneOption');

		if( this.header )
			this.div.innerHTML = "<h4>" + this.header + "</h4><br>";


		var para = newNode('p');

		if( this.setup_op ) this.setup_op(para);

		this.div.appendChild( para );

		return this.div;
	}

	// Date option object

	function DateOp() {

		this.status         = { sent: 0, failed: 0 };
		this.header         = 'Change uploaded date on <i>selected</i> photos';

		this.update_status  = update_status;
		this.do_post        = do_post;
		this.mk_op          = init_option;

		// callback for the date POST
		this.proc_date_request = function(req) {
			if (req.readyState != 4) return;

			this.status['sent']--;
			if( req.status != 200 ) {
				// XXX: The date you have chosen is in the future
				this.status['failed']++;
			}

			this.update_status();
		}


		// set the date posted for all the selected photos
		this.change_dates = function() {

			this.status['sent']   = 0;
			this.status['failed'] = 0;

			var date_box = getNode('gmfbe_date').value;
			var time_box = getNode('gmfbe_time').value;

			var date = get_date( date_box, time_box );
			if( ! date ) return;

			var post_date = (date.getMonth()+1) + '/' + date.getDate() + '/' + date.getFullYear();
			var post_time = pad02d( date.getHours() ) + ':' + pad02d( date.getMinutes() ) + ':' + pad02d( date.getSeconds() );
			var post_date_e = escape( post_date );
			var post_time_e = escape( post_time );


			var sel_ids = get_selected_ids();

			for( var j in sel_ids ) {
				var id = sel_ids[j];
				if( id == '0' || ! id ) continue;

				var post_data = 'done=1&id=' + id + '&date=' + post_date_e + '&time=' + post_time_e;

				this.do_post( 'proc_date_request', 
						'http://www.flickr.com/photo_date_posted.gne', 
						'http://www.flickr.com/photo_date_posted.gne?id=' + id,
						post_data
						);

				this.status['sent']++;
			}

			this.update_status();
			return false;
		}


		this.setup_op = function(date_div) {


			var now = new Date();
			var now_date = (now.getMonth()+1) + '/' + now.getDate() + '/' + now.getFullYear();
			var now_time = pad02d(now.getHours()) + ':' + pad02d(now.getMinutes()) + ':' + pad02d(now.getSeconds());

			date_div.innerHTML += "<input id='gmfbe_date' value='" + now_date + "'  size='11'> at <input id='gmfbe_time' value='"+ now_time +"' size='6'><br/>"

			var change_dates_button = mk_a('change date', getObjectMethodClosure(this,'change_dates') );
			date_div.appendChild( change_dates_button );

			date_div.appendChild( newNode('br') );

			this.status_span = newNode('span');
			date_div.appendChild( this.status_span );

		}

	} // DateOption


	function LicenseOp() {

		this.status         = new Object();
		this.update_status  = update_status;
		this.do_post        = do_post;
		this.mk_op          = init_option;
		this.header         = "Change license on <i>selected</i> photos";

		
		// callback for the license POST
		this.proc_license_request = function(req) {
			if (req.readyState != 4) return;

			this.status['sent']--;
			if( req.status != 200 )
				this.status['failed']++;

			this.update_status();
		}

		// set the license for all selected photos
		this.set_license = function() {
			this.status.failed = 0;
			this.status.sent   = 0;

			var opts = this.select.options;
			var license_id = opts[opts.selectedIndex].value;

			var sel_ids = get_selected_ids();

			for( var j in sel_ids ) {
				var id = sel_ids[j];
				if( ! id ) continue;

				var post_data = 'done=1&id=' + id + '&license=' + license_id + '&Submit=SAVE+LICENSE';


				// id=6996151&done=1&context=set-174385&license=1&Submit=SAVE+LICENSE

				this.do_post( 'proc_license_request',
						'http://www.flickr.com/photo_license.gne', 
						'http://www.flickr.com/photo_license.gne?id=' + id,
						post_data
						);

				this.status['sent']++;
			}

			this.update_status();

			return false;
		}

		this.licenses = new Array(
				'None (All rights reserved)',
				'Attribution-NonCommercial-ShareAlike License',
				'Attribution-NonCommercial License',
				'Attribution-NonCommercial-NoDerivs License',
				'Attribution License',
				'Attribution-ShareAlike License',
				'Attribution-NoDerivs License'
				);

		// poplulate the select
		this.mk_license_options = function(sel) {
			for( var i=0; i<this.licenses.length; i++ ) {
				var opt = newNode('option');
				opt.setAttribute('value',i);
				opt.appendChild( newText(this.licenses[i]) );
				sel.appendChild( opt );
			}
		}



		this.setup_op = function(license_div) {

			this.select = newNode('select');
			this.mk_license_options( this.select );

			license_div.appendChild( this.select );

			var set_lic_but        = mk_a( "set license",getObjectMethodClosure( this, 'set_license' ) );
			license_div.appendChild(set_lic_but);

			license_div.appendChild( newNode("br") );

			this.status_span = newNode('span');
			license_div.appendChild( this.status_span );

		}

	} // end of LicenseOption


	// Add selected photos to Set or Group
	function SetOp() {

		this.header  = "Add <i>selected</i> photos to set";
		this.api     = true;
		this.mk_op   = init_option;


		// the list of sets has loaded
		this.set_list_loaded = function(req, rsp) {
			var opts = this.select.options;
			var collection = document.evaluate( "//photoset", rsp, null, XPathResult.ANY_TYPE, null );

			var set = collection.iterateNext();

			while( set ) {
				var s       = new Object();

				s.title     = set.getElementsByTagName('title')[0].childNodes[0].nodeValue;
				s.node      = set;

				var opt = new Option( s.title, null );
				opt.gmfbe_set = s;
				opts[ opts.length ] = opt;

				set = collection.iterateNext();
			}
		}


		// the existing photos for the set have been loaded
		this.set_photos_loaded = function(req,rsp) {
			var set        = this.selected_set;

			if( ! set )
				throw new Error("selected_set not set");

			var collection = document.evaluate( "//photo", rsp, null, XPathResult.ANY_TYPE, null );
			var photo_ids  = new Array();

			var photo = collection.iterateNext();
			while( photo ) {
				photo_ids.push( photo.getAttribute('id') );
				photo = collection.iterateNext();
			}

			var set_id            = set.node.getAttribute('id');
			var primary_photo_id  = set.node.getAttribute('primary');
			var photo_ids_string  = photo_ids.join(",") + "," + this.selected_ids.join(",");

			flickr_api_call( "flickr.photosets.editPhotos", 
				{ photoset_id: set_id, primary_photo_id: primary_photo_id, photo_ids: photo_ids_string,
					 email: USER_EMAIL, password: USER_PASSWORD, http_method: 'POST' },
				getObjectMethodClosure2( this, 'set_photos_done' ) );
		}


		// the new photo list has been saved
		this.set_photos_done = function(req,rsp) {
			// all done
		}


		// "button" event, kicks off the update
		this.update_set = function() {
			var set = this.selected_set = this.select.options[ this.select.options.selectedIndex ].gmfbe_set;
			
			this.selected_ids = get_selected_ids();

			if( ! this.selected_ids.length ) {
				alert("no photos selected");
				return;
			}

			var set_id            = set.node.getAttribute('id');

			flickr_api_call( "flickr.photosets.getPhotos", { photoset_id: set_id }, getObjectMethodClosure2( this, 'set_photos_loaded' ) );
			
			return false;
		}


		// create the interface
		this.setup_op = function(div) {

			var sel = this.select = newNode('select');
			div.appendChild( sel );

			div.appendChild( newNode('br') );

			div.appendChild( mk_a( 'update set', getObjectMethodClosure(this,'update_set') ) );

			flickr_api_call( "flickr.photosets.getList", {}, getObjectMethodClosure2( this, 'set_list_loaded' ) );

			return div;
		}

	} // end of SetOption




	// Add selected photos to group
	function GroupOp() {

		this.status         = new Object();
		this.update_status  = update_status;
		this.api            = true;
		this.mk_op          = init_option;

		this.header = "Add <i>selected</i> photos to group";


		this.group_list_loaded = function(req,rsp) {
			var opts = this.select.options;
			var collection = document.evaluate( "//group", rsp, null, XPathResult.ANY_TYPE, null );

			var group = collection.iterateNext();

			while( group ) {

				var name     = group.getAttribute("name");
				var id       = group.getAttribute("id");

				var opt = new Option( name, id );
				opts[ opts.length ] = opt;

				group = collection.iterateNext();
			}
		}



		this.update_groups = function() {
			this.status["sent"]   = 0;
			this.status["failed"] = 0;

			var opts = this.select.options;
			var group_id = opts[ opts.selectedIndex ].value;

			var ids = get_selected_ids();

			if( ids.length > MAX_PICS_TO_GROUP 
				 && ! confirm("It is probably bad form to post more than " + MAX_PICS_TO_GROUP 
							+ " photos to a public group\nIf its a private group or you don't care, click OK. Otherwise click Cancel"
							+ "\n\nPlease - keep our Flickr beautiful!" ) 
				) return false;

			for( i in ids ) {
				flickr_api_call( "flickr.groups.pools.add", 
					{ group_id: group_id, photo_id: ids[i], email: USER_EMAIL, password: USER_PASSWORD, http_method: 'POST' }, 
					getObjectMethodClosure2( this, 'group_add_done'   ),
					getObjectMethodClosure2( this, 'group_add_failed' )
				);

				this.status["sent"]++;
			}

			this.update_status();

			return false;
		}


		this.group_add_done = function(req,rsp) {
			this.status["sent"]--;
			this.update_status();
		}
		this.group_add_failed = function(e) {
			this.status["sent"]--;
			this.status["failed"]++;
			this.update_status();
		}


		// create the interface
		this.setup_op = function(div) {

			this.select = newNode("select");

			div.appendChild( this.select );
			div.appendChild( newNode('br') );
			div.appendChild( mk_a( "update groups", getObjectMethodClosure( this, 'update_groups' ) ) );

			div.appendChild( newNode('br') );

			this.status_span = newNode('span');
			div.appendChild( this.status_span );

			flickr_api_call( "flickr.groups.pools.getGroups", { email: USER_EMAIL, password: USER_PASSWORD }, getObjectMethodClosure2( this, 'group_list_loaded' ) );


			return div;
		}
	} // end GroupOption



	// Extended Permissions Operation
	function PermOp() {

		this.api            = true;
		this.mk_op          = init_option;
		this.header         = "Set permissions on <i>selected</i> photos";
		this.status         = new Object();
		this.update_status  = update_status;

		// <perms id="2733" ispublic="1" isfriend="1" isfamily="0" permcomment="0" permaddmeta="1" />

		this.save = function() {

			var ids = get_selected_ids();

			if( ids.length < 1 ) {
				alert("no photos selected");
				return;
			}

			this.status.sent   = 0;
			this.status.failed = 0;

			for( var i in ids ) {
				flickr_api_call( "flickr.photos.getPerms", { photo_id: ids[i] },
					getObjectMethodClosure2( this, 'photo_loaded' ),
					getObjectMethodClosure2( this, 'photo_failed' )
				);

				this.status.sent++;
			}

			this.update_status();

			return false;
		}

		this.photo_loaded = function(req,rsp) {
			this.status.sent--;
			var perms  = xpath_single_node(rsp, "//perms[1]");

			var args   = {
				photo_id      : perms.getAttribute('id'),
				is_public     : perms.getAttribute('ispublic'),
				is_friend     : perms.getAttribute('isfriend'),
				is_family     : perms.getAttribute('isfamily'),
				perm_comment  : perms.getAttribute('permcomment'),
				perm_addmeta  : perms.getAttribute('permaddmeta')
			};


			var comment = this.selected_index( "perm_comment", this.who_comment.length );
			var addmeta = this.selected_index( "perm_addmeta", this.who_addmeta.length );


			if( comment > -1 )
				args['perm_comment'] = comment;
			if( addmeta > -1 )
				args['perm_addmeta'] = addmeta;

				// alert( "saving: " + args['perm_comment'] + ", " + args['perm_addmeta'] );


			flickr_api_call( "flickr.photos.setPerms", args,
				getObjectMethodClosure2( this, 'photo_saved' ),
				getObjectMethodClosure2( this, 'photo_failed' )
			);

			this.update_status();

		}

		this.photo_saved = function(req,rsp) {
			this.status.sent--;
			this.update_status();
		}

		this.photo_failed = function(e) {
			alert("fail: " + e.msg);
			this.status.failed++;
			this.status.sent--;
			this.update_status();
		}

		this.selected_index = function( prefix, length ) {
			for( var i=0; i<length; i++ ) {
				var box = getNode( prefix + i );
				if( box.checked == true ) return i;
			}
			return -1;
		}

		this.who_comment = new Array(
			"Only You",
			"Your Friends and/or Family",
			"Your Contacts",
			"Any Flickr User (Recommended)"
		);
		this.who_addmeta = new Array(
			"Only You",
			"Your Friends and/or Family",
			"Your Contacts (Recommended)",
			"Any Flickr User"
		);

		this.setup_who = function( who, title, prefix ) {
			var div = newNode('div');

			var str = "";

			for( var i in who ) {
				str += "<input type='radio' name='" + prefix + "' id='" + prefix + i + "' value='" + i + "'> <label for='" + prefix + i + "'>" 
				    +   who[i] + "</label><br/>";
			}

			div.innerHTML += "<b>" + title + "</b><br/>" + str;


			return div;
		}

		this.setup_op = function(div) {

			div.appendChild( this.setup_who( this.who_comment, 'Who can comment?'              , 'perm_comment' ) );
			div.appendChild( this.setup_who( this.who_addmeta, 'Who can add notes &amp; tags?' , 'perm_addmeta' ) );

			div.appendChild( newNode('br') );

			div.appendChild( mk_a('Save', getObjectMethodClosure(this,'save') ) );

			div.appendChild( newNode('br') );

			this.status_span = newNode('span');
			div.appendChild( this.status_span );
		}

	}

	function get_selected_ids() {
		var sel_ids = new Array();

		for(var i=0; i<ids.length; i++){
			if ( ! ids[i] ) continue;
			if( getNode('check_'+ids[i]).checked )
				sel_ids.push( ids[i] );
		}

		return sel_ids;
	}


/*
	function PicTools() {

		this.body     = xpath_single_node(document,"//body[1]");
		this.p_lookup = new Object();
		
		
		// this.imageLoaded = function( req,rsp ) 
		this.imageLoaded = function( req,rsp ) {
			var photo = xpath_single_node( rsp, '//photo[1]' );
			
			var id    = photo.getAttribute('id');
			var p     = this.p_lookup[ id ];

			p.secret  = photo.getAttribute('secret');
			p.server  = photo.getAttribute('server');

			p.title   = xpath_single_node( photo, './title[1]/text()').nodeValue;

			var vis   = xpath_single_node( photo, './visibility[1]');

			p.ispublic  = vis.getAttribute('ispublic');
			p.isfriend  = vis.getAttribute('isfriend');
			p.isfamily  = vis.getAttribute('isfamily');
			
			var perm  = xpath_single_node( photo, './permissions[1]');
			if( perm ) {
				p.permcomment  = perm.getAttribute('permcomment');
				p.permaddmeta  = perm.getAttribute('permaddmeta');
			}

			var tags_coll = document.evaluate( "./tags/tag/text()", photo, null, XPathResult.ANY_TYPE, null );
			var tag = tags_coll.iterateNext();
			p.tags = new Array();

			while( tag ) {
				p.tags.push( tag.nodeValue );
				tag = tags_coll.iterateNext();
			}

			this.setupPhoto( p );
		}

		this.get_div_for_id = function( id, extra ) {
			var path = '//div[@id="photo_'+ id +'"][1]';

			if( extra ) {
				path += "/" + extra;
			}

			return xpath_single_node( document , path );
		}

		this.setupPhoto = function( p ) {
			var div = this.get_div_for_id( p.id );

			str = "<div class='gmbe_photo_hide'><b class='gmbe_title'>" + p.title + "</b></div>" 
				+ div.innerHTML 
				+ "<div class='gmbe_photo_hide'>";

			// public
			str += "<img border='0' style='border: 0;' src='http://www.flickr.com/images/";

			if( p.ispublic )
				str += 'icon_public.gif\'>';
			else {
				str += 'icon_private.gif';
				str += ' | ' + ( p.isfriend ? 'friend' : '' );
				str += ' | ' + ( p.isfamily ? 'family' : '' );
			}

			str += " <a href='#' class='show_big'>view</a>";

			str += "<br/>tags: ";

			str += p.tags.join(" ");
				
			str +=	"</div>";

			div.innerHTML = str;

			var link = this.get_div_for_id( p.id, '*    /a[@class="show_big"][1]' );
			link.onclick = getObjectMethodClosure1(this,'show_big');
			link.setAttribute('photo_id', p.id);
		}



		this.show_big = function(e) {
			var id   = e.target.getAttribute('photo_id');
			
			var p    = this.p_lookup[id];

			window.open( this.photo_link(p) );

			/ *
			var img  = xpath_single_node( document, '//img[@class="batch_img_' + id + '"]' );
			img.setAttribute('src', this.photo_link( p ));
			* /
		}


		this.photo_link = function( p ) {
			return "http://photos" + p.server + ".flickr.com/" + p.id + "_" + p.secret + ".jpg";
		}



		this.photoMouseOver = function( e ) {
			this.curr_div_photo = e.target;
			this.flipPhoto( e.target, 'hide', 'show' );
		}
		this.photoMouseOut = function( e ) {

			// thanks quirksmode
			var tg = e.target;
			if (tg.nodeName != 'DIV') return;
			var reltg = e.relatedTarget;

			while (reltg != tg && reltg.nodeName != 'BODY')
				reltg = reltg.parentNode;

			if (reltg == tg) return;

			/ *
			if( e.target != this.curr_div_photo ) {
				this.flipPhoto( this.curr_div_photo, 'hide', 'show' );
			}
			* /

			this.flipPhoto( e.target, 'show', 'hide' );
		}

		this.flipPhoto     = function( el, which, which_not ) {
			var collection = document.evaluate( "./div[@class='gmbe_photo_"+ which +"']", el, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );
			var col_len = collection.snapshotLength;
			for( var i=0; i<col_len; i++ ) {
				var div = collection.snapshotItem(i);
				div.setAttribute('class','gmbe_photo_'+which_not);
			}
		}

		try {
			inject_css( ".gmbe_image_box { border: thin solid #555; background: #eee; margin: 2px 2px; padding: 10px; float: left; max-width: 75px }\n"
				+ ".gmbe_title { font-size: xx-small }\n" 
				+ ".gmbe_photo_hide { display: none ; font-size: xx-small; }\n"
				+ ".gmbe_photo_show { display: block; font-size: xx-small; }\n"
			);

			// http://photos5.flickr.com/4896742_d4d217c510_s.jpg
			var re   = new RegExp("((\\d+)_([a-fA-f\\d]+))(?:_[smob]|)\.jpg$");
			// var re   = new RegExp("(http://photos(\\d+)\\.flickr\\.com/(\\d+)_([a-fA-f\\d]+))(?:_[smob]|)\.jpg");

			var collection = document.evaluate( "//img[@height='75']", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );


			var list_length = collection.snapshotLength;
			for( var ci=0; ci<list_length; ci++ ) {	
				var img = collection.snapshotItem( ci );


				var results = img.src.match( re );
				var i       = new Object();

				i.base_url = results[1];
				i.id       = results[2];

				this.p_lookup[i.id] = i;


				img.removeAttribute('height');
				img.removeAttribute('width');
				img.setAttribute('class','batch_img_'+i.id);

				var new_div  = newNode('div');
				new_div.setAttribute( 'class', 'gmbe_image_box'  );
				new_div.setAttribute( 'id'   , 'photo_' + i.id   );
				new_div.addEventListener( 'mouseover', getObjectMethodClosure1(this,'photoMouseOver'), true );
				new_div.addEventListener( 'mouseout' , getObjectMethodClosure1(this,'photoMouseOut' ), true );

				//new_div.onmouseout   = getObjectMethodClosure1(this,'photoMouseOut');


				var parent   = img.parentNode;
				var parent2  = parent.parentNode;

				new_div.innerHTML = "<div>" + parent.innerHTML + "</div>";

				parent2.removeChild( parent );
				parent2.appendChild( new_div );



				flickr_api_call( 'flickr.photos.getInfo', { photo_id: i.id }, getObjectMethodClosure2(this,'imageLoaded') );
			}

		} catch( e ) {
			alert("couldn't add images " + e.message);
		}
		
	} // end PicTools
*/


	function Selection() { }

	 //selection functions


	function fill_selection() {

		var filling = false;
		var first;
		var last;

		for( var i in ids ) {
			if( ! ids[i] ) continue;
			var check   = getNode('check_'+ids[i]);
			if( ! check.checked ) continue;

			if( ! first ) 
				first = check;
			last = check;
		}

		for( var i in ids ) {
			if( ! ids[i] ) continue;
			var check = getNode('check_'+ids[i]);

			if( check == first ) filling = true;

			if( filling  ) check.checked = true;

			if( check == last  ) filling = false;
		}
	}

	function invert_selection() {
		for( var i in ids ) {
			if( ! ids[i] ) continue;
			var check   = getNode('check_'+ids[i]);

			     if( ! check.checked )  check.checked = true;
			else if(   check.checked )  check.checked = false;

		}
	}


	function click_reload_batch_set() {
		var sel_ids = get_selected_ids();
		window.location = 'http://www.flickr.com/photos_batch_operations.gne?ids=' + sel_ids.join(',');
	}

	function mk_selection_div() {
		var sel_extra = newNode('div');

		var fill_button = mk_a('fill selection', fill_selection);
		sel_extra.appendChild( fill_button );

		sel_extra.appendChild( newText(" | ") );

		var invert_sel_button = mk_a('invert selection', invert_selection);
		sel_extra.appendChild( invert_sel_button );

		sel_extra.appendChild( newText(" | reload batch with ") );

		var reload_batch_sel = mk_a('selection', click_reload_batch_set );
		sel_extra.appendChild( reload_batch_sel );

		/*
			 sel_extra.appendChild( newText(" | ") );

			 var reload_batch_set = mk_a('set', click_reload_batch_set );
			 sel_extra.appendChild( reload_batch_set );
		 */
		return sel_extra;
	}


	// set it all up

	var sel_extra = mk_selection_div();

	// find the attachment spot for selection
	var sel_all = getNode('selectall');
	sel_all.parentNode.insertBefore( sel_extra, sel_all.nextSibling );

	var last_div;

	// find the attachement spot for batch options
	/*
	last_div = 
	xpath_single_node(document, "//td[@class='photoswftd'][1]");
	*/

	var divs = getTags('div');
	for( var i=0; i<divs.length; i++ ) {
		if( divs[i].getAttribute('class') == 'OneOption' ) last_div = divs[i];
	}

	var op_container = newNode('div');

	last_div.parentNode.appendChild(op_container);


	var op_cnt_closed = newNode('div');
	op_cnt_closed.appendChild( mk_a( '[ + show enhancements ]', function () {
		op_cnt_closed.style.display  = 'none';
		op_cnt_open.style.display    = 'block';
		return false;
	} ) );

	var op_cnt_open = newNode('div');
	op_cnt_open.appendChild( mk_a( '[ - hide enhancements ]', function () {
		op_cnt_open.style.display    = 'none';
		op_cnt_closed.style.display  = 'block';
		return false;
	} ) );

	op_cnt_open.style.display = 'none';

	op_container.appendChild(op_cnt_closed);
	op_container.appendChild(op_cnt_open);


	// var pic_tools = new PicTools();


	// Add the classes which provide extra operations on the RHS

	var ops = [
		DateOp,
		LicenseOp,
		PermOp
	];

	if( USER_EMAIL != 'your@email' ) {
		ops.push( GroupOp )
		ops.push( SetOp )
	}



	for( var j=0; j<ops.length; j++ ) {
		var option  = new ops[j]();
		var new_div = option.mk_op();

		if( ! new_div ) continue;
		op_cnt_open.appendChild( new_div );
	}



})();

// vim: se ft=javascript:
