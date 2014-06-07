// ==UserScript==
// @name AMO image preview
// @namespace org.positrium.gm
// @include https://addons.mozilla.org/*/*/*
// @license Public Domain
// @version 0.4.1
// ==/UserScript==
(function() {
	/* ********************************* CSS ******************************** */
	GM_addStyle(<><![CDATA[
	]]></>);

	/* ********************************* logger ***************************** */
	var log = new Logger(true);
	
	/* ********************************* toggle ***************************** */

	/* ********************************* content **************************** */
	var page = new AMOPage(location.href);

	// pickup preview images
	var linklist = null;
	
	// v0.4: preview image styles per page pattern.
	var image_style = 'border:1px solid #333;';
	
	/* ======== PAGE driven . collect target page urls. */
	if(page.isSearch()){
		try{
			linklist = x("//div[contains(@class,'item')]/h3/a",'search');
			log.info('search: '+page.url);
		}catch(e){
			log.error(e);
			return;
		}
			
	}else if(page.isTag()){
		try{
			linklist = x("//div[contains(@class,'item')]/h3/a",'tag');
			log.info('tag: '+page.url);
		}catch(e){
			log.error(e);
			return;
		}
		
	}else if(page.is3Cols()){
		try{
			linklist = x("//div[contains(@class,'addons_column')]/ul/li/a",'3cols');
			image_style = 'border:1px solid #333;margin:2em;height:150px;width:200px;';
			log.info('3column: '+page.url);
		}catch(e){
			log.error(e);
			return;
		}
		
	}else if(page.isRecommended()){
		try{
			linklist = x("//div[contains(@class,'item')]/h3/a",'recommended');
			log.info('stacked: '+page.url);
		}catch(e){
			log.error(e);
			return;
		}
		
	}else if(page.isCollection()){
		try{
			//linklist = x('/html/body/div/div[2]/div[2]/div[2]/div/h4/a','collection');
			linklist = x("//div[contains(@class,'item')]/h4/a",'collection');
			log.info('collect: '+page.url);
		}catch(e){
			log.error(e);
			return;
		}
		
	}else if(page.isFeatured()){
		try{
			// top of addons.mozilla.org .
			linklist = x("//div[contains(@class,'item')]/h3/a",'featured');
			log.info('top: '+page.url);
		}catch(e){
			log.error(e);
			return;
		}
		
	}else{
		log.info('else: '+page.url);
	}
	
	/* ===== reduce.. */
	// to be unique set
	var url_map = [];
	for (var i in linklist) {
		url_map[linklist[i].href] = linklist[i];
	}
	var keylist = [];
	for (var i in url_map) {
		log.info(i+" *** "+url_map[i]);
		keylist.push(i);
	}

	var img_progress = cE('img', {src : ''});
	var data = 'data:image/gif;base64,'
			+ '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'
			+ 'fySDhGYQdDWGQyUhADs=';
	img_progress.src = data;

	/* ===== create chain and define jobs */
	var chain = new Chain();
	var cnt = 0;
	for (var i in url_map) {
		
		/** show loading screw */
		chain.addFunction(function() {
			var container = url_map[keylist[cnt]].parentNode;
			container.appendChild(img_progress);
			// log.info(keylist[cnt]);
		});
		
		/** retrieve page content */
		chain.addRequestFunction(function() {
			return {
				method : 'get',
				url : keylist[cnt],
				onload : function(res) {
					// log.info(res.responseText);
					this.pb = res.responseText;
					// log.info(this.pb);
				}
			}
		});
		
		/** collect images */
		chain.addFunction(function() {
			// for firefox 
			xx = this.pb.match(/\/[^\/]+\/[^\/]+\/images\/t\/[^"]+/g);
			if(!(xx != null)){
				// for thunderbird 
				xx = this.pb.match(/\/img\/uploads\/previews\/full\/[^\/]+\/[^\/]+\.png\?modified=[^"]+/g);
			}
			//log.info(this.pb);
			var container = url_map[keylist[cnt]].parentNode;
			
			if (xx != null && xx[0].length>1) {
				//log.info('xx: '+xx);
				container.replaceChild(cE('img', {
					src : 'https://addons.mozilla.org'+ xx,
					style : image_style
					}), img_progress);
			} else {
			
				log.warn('images not found.');
				// v0.4 : suppress no images, no gallary addons
				//container.replaceChild(cE('span', {}), img_progress);
				container.replaceChild(cT('[no image]'), img_progress);
			}
			
		});
		
		/** for delay execute jobs */
		chain.addFunction(function() {
			cnt++;
		});
	
	}
	chain.doChain();
	
	
	
	/* ======= xpath libs */
	/** get nodes array from xpath.
	 * 
	 * @argument _xpath String
	 * @return nodesArray Array
	 * @throw EmptyArrayException
	 */
	function x(_xpath, msg) {
		var nodes = document.evaluate(_xpath, document, null,
				XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
		var nodesArray = [];
		for (var i = 0; i < nodes.snapshotLength; i++) {
			nodesArray.push(nodes.snapshotItem(i));
		}
		if (nodesArray.length < 1) throw EmptyArrayException(msg);
		// return (nodesArray.length >= 1) ? nodesArray : null;
		return nodesArray;
	}

	/** get first node from xpath.
	 * 
	 * @argument _xpath String
	 * @return node Object
	 */
	function x_zero(_xpath, msg) {
		var nodes = x(_xpath, msg);
		return nodes != null ? nodes[0] : null;
	}

	/** try multiple xpath
	 * 
	 * @argument xpath_array Array
	 * @argument msg String
	 * @return node Object
	 */
	function x_try(xpath_array, msg) {
		var ret = [];
		for (var i in xpath_array) {
			var nodes = x(xpath_array[i], msg);
			if (nodes != null) {
				for (var j in nodes) {
					ret.push(nodes[j]);
				}
			}
		}
		return ret;
	}

	/** get first node from multiple xpath */
	function x_zero_try(xpath_array, msg) {
		var nodes = x_try(xpath_array, msg);
		return nodes != null ? nodes[0] : null;
	}
	
	
	
	/* ======= common snippet */
	/** createTextNode wrapper */
	function cT(value) {
		var d = document.createTextNode(value);
		return d;
	}
	
	/** createElement wrapper */
	function cE(name, array) {
		var d = document.createElement(name);
		for (var i in array) {
			d.setAttribute(i, array[i]);
		}
		return d;
	}

	/** chain executor */
	function Chain() {
		// Constructor.
		this.jobs = [];
		this.container = {};

		// append function to chain that return args for GM_xmlhttpRequest().
		this.addRequestFunction = function(f) {
			this.jobs.push({
						type : 'request',
						func : f
					})
		};

		// append normally functions.
		this.addFunction = function(f) {
			this.jobs.push({
						type : 'function',
						func : f
					})
		};

		// return most first job.
		this.shift = function() {
			return this.jobs.shift();
		};

		// execute chained jobs
		this.doChain = function() {
			// get first job. If there is nothing, do not something.
			var job = this.jobs.shift();
			if (!job)
				return;

			if (job.type == 'function') {
				// If this job is function, do this.
				job.func.apply(this);
				// and do next job.
				this.doChain();
			} else if (job.type == 'request') {
				// If this job is Request , change args and do GM_xmlhttpRequest().
				var obj = job.func.apply(this);
				obj.chain = this;
				if (obj.onload) {
					// change onload(). After do function, do next job.
					obj.$onload = obj.onload;
					obj.onload = function(response) {
						obj.$onload.apply(this.chain, [response]);
						this.chain.doChain();
					}
				}
				GM_xmlhttpRequest(obj);
			}
		};
	}
	
	/** GreaseMonkey menu toggle
	 * @argument key boolean_key
	 * @argument defaultValue default_value
	 * @argument toggleOn on_string
	 * @argument toggleOff off_string
	 * @argument prefix ui_prefix
	 */
	function makeMenuToggle(key, defaultValue, toggleOn, toggleOff, prefix) {
	  // Load current value into variable
	  window[key] = GM_getValue(key, defaultValue);
	  // Add menu toggle
	  GM_registerMenuCommand((prefix ? prefix+": " : "") + (window[key] ? toggleOff : toggleOn), function() {
	    GM_setValue(key, !window[key]);
	    location.reload();
	  });
	}
	
	/** common logger */
	function Logger(isDebug){
		this.isDebug = isDebug?isDebug:false;
		this.debug = function(text){
			if(this.isDebug) console.log(text);
		}
		this.warn = function(text) {
			if (this.isDebug)console.warn(text);
		}
		this.error = function(text) {
			if (this.isDebug)console.error(text);
		}
		this.fatal = function(text) {
			if (this.isDebug)console.fatal(text);
		}
		this.ast = function(expr, msg) {
			console.group('assert ' + parseInt(Math.random() * 10000));
			console.log(msg);
			console.assert(expr);
			console.groupEnd();
		}
		this.info = function(text) {
			if (this.isDebug)console.info(text);
		}
		this.group = function(text) {
			if (this.isDebug)console.group(text);
		}
		this.groupEnd = function(text) {console.groupEnd();}
		this.dummy = function() {}
	}
	
	
	
	/* ======= experimental */
	/** for AMO page separator */
	function AMOPage(string){
		this.url = string.toString(); // An arg will String but I do twice.
		this.isSearch = function(){ return this.url.match(/search?/);}
		this.isTag = function(){ return this.url.match(/tag/);}
		this.isRecommended = function(){ return (this.url.match(/type\:4/) || this.url.match(/\/recommended/));}
		this.isCollection = function(){ return this.url.match(/collection\//);}
		this.isFeatured = function(){ return (this.url.match(/\//) || this.url.match(/\/?featured=/));}
		this.is3Cols = function(){ return this.url.match(/type\:1/);}
		this.getURL = function(){ return this.url; }
	}

	/** Exceptions */
	function EmptyArrayException(msg){
		return "EmptyArrayException occurs: "+msg;
	}
})();