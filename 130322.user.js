// ==UserScript==
// @name           spash extract girlfans
// @namespace      org.eroim.essime
// @include        http://www.girlfans.info/*
// @version        0.1.4
// ==/UserScript==
(function() {

	/* ======= logger */
	var log = new Logger(true); // logger
	log.info('hoge');
	var mapLog = new Logger(true);
	var keyLog = new Logger(true);

	/* ======= setup */
	var chain = new Chain();

	/* ======= for progress ani-GIF */
	var data = '';
	var img_progress = cE('img', {
		src : ''
	});
	{
		data = 'data:image/gif;base64,'
				+ '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'
				+ 'fySDhGYQdDWGQyUhADs=';
	}
	img_progress.src = data;

	/* ======= content */
	{
		var img_matchers = new Array(new RegExp(
				/src="[^"]+" onmouseover="img_onmouseoverfunc\(this\)" onload="thumbImg\(this\)" border="0" alt="" /gi), new RegExp(
				/\/attachments[^"]+/gi));
				             
		/* -------------------------------- localLib ------------------ */
		function getThreadLinks() {

			var linkList = x(
					'//*[@class="xst" and starts-with(@href,"forum")]',
					'linkList');

			for ( var i = 0; i < linkList.length; i++) {

				// log.info(linkList[i].href);
			}
			//linkList[0].href = 'http://www.javforum.net/';

			return linkList;
		}



		var linkList = getThreadLinks();

		// to be unique set
		var url_map = [], tor_map = [], img_map = []; // a#id : a
		for ( var i in linkList) {
			if (linkList[i].href.match(/forum/i)) {
				url_map[linkList[i].href] = linkList[i];
			}
		}
		var keyList = [];
		for ( var i in url_map) {
			keyList.push(i);
		}

		mapLog.info('keyList: ');
		mapLog.info(keyList);

		/* =========== CHAIN ============== */
		var cnt = 0;
		// for(var i=cnt;i<linkList.length;i++){
		for ( var i in url_map) { // DEBUG
			var tor_links = '', img_links = '';

			chain.addFunction(function() {
				log.info('[' + url_map[keyList[cnt]].textContent
						+ '] attached torrent');
			});

			chain.addFunction(function() {
				var container = url_map[keyList[cnt]].parentNode;
				container.appendChild(img_progress);
			});

			// show loading screw
			// get specific page contents => this.pb
			chain.addRequestFunction(function() {
				keyLog.info(keyList[cnt] + " = false . so collecting.");
				return {
					method : 'get',
					url : url_map[keyList[cnt]].href,
					onload : function(res) {
						// log.info(res.responseText);
						this.pb = res.responseText;
						// log.info(this.pb);
					}
				}
			});

			// check this.pb specific sentences.
			// [attached torrent filepath]
			chain
					.addFunction(function() {
						tor_links = '', img_links = '';
						torrent_urls = [];

						var container = url_map[keyList[cnt]].parentNode;

						/* ===== attached torrent ====== */

						if (this.pb) {
							torrent_urls = this.pb
									.match(/http\:\/\/.+file=[^\.]+\.torrent[^<]*/g);
						}

						// match object && match result[0]
						if (torrent_urls && torrent_urls.length > 0) {
							log.debug('content: ' + torrent_urls);
							torrent_url_str = torrent_urls[0];

							for ( var j = 0; j < torrent_urls.length; j++) {
								torrent_url = torrent_urls[j];
								log.debug("torrent: " + torrent_url);

								container.appendChild(cE('br', {}));

								var attached_torrent_link = cE(
										'a',
										{
											href : new String(torrent_url
													.match(/http\:\/\/.+file=[^\.]+\.torrent[^"]*"/)).replace('"',''),
											style : {0:"color:#cb143c;",1:"color:#cb143c;",2:"color:#99FF99;"}
										});
								attached_torrent_link
										.appendChild(cE(
												'img',
												{
													src : 'http://www.utorrent.com/favicon.ico',
													style : 'border:0px;'
												}));
								var text = torrent_url
										.match(/>[^\.]+.torrent/g);
								if (text == null) {
									text = "*******.torrent";
								} else {
									text = text.toString().substring(1);
								}
								log.info("tor-text : [" + text + "] "
										+ attached_torrent_link.href);
								attached_torrent_link.appendChild(cT(text));
								container.appendChild(attached_torrent_link);
								tor_links += tor_links.length > 0 ? "<>"
										+ attached_torrent_link.href
										: attached_torrent_link.href;
							}
						} else {
							log.error("torrent_urls == NULL");
						}

						/* ===== image preview ====== */

						var img_width = "";
						var img_height = "";

						for ( var r = 0; r < img_matchers.length; r++) {
							var image_url_str = [];

							if (this.pb) {
								image_urls = this.pb.match(img_matchers[r]);
								if (image_urls) {
									image_url_str = image_urls.toString()
											.split(',');
								}
							}

							if (image_url_str && image_url_str.length > 0) {
								// log.dir(image_url_str);

								container.appendChild(cE('br', {}));

								var SHOW_IMAGE_MAX = image_url_str.length;

								if (image_url_str) {
									// log.dirxml(image_url_str);
									for ( var img = 0; img < SHOW_IMAGE_MAX; img++) {
										image_url = image_url_str[img].replace('&#65353;','i').replace('ｉ','i');
										if (image_url!=null) {
											if (r == 0) {
												image_url = image_url_str[img]
														.match(/http[^"]+/gi);
												log.warn('image embed');
											} else {
												log.warn('image attached');
											}

											log.info(img + "      : "
													+ image_url);

											container.appendChild(cE('img', {
												src : image_url,
												width : img_width,
												height : img_height
											}));
											img_link = image_url.toString()
													.match(/http.+/i) ? image_url
													: "http://www.akiba-online.com"
															+ image_url;
											img_links += img_links.length > 0 ? '<>'
													+ img_link
													: img_link;
										}
									}
									break;
								}
							}
						}

						/* ====== END ===== */
						container.removeChild(img_progress);
					});

			chain.addFunction(function() {
				/* =============== save to about:config ============== */
				tor_map[keyList[cnt]] = tor_links;
				img_map[keyList[cnt]] = img_links;
			});

			// no effective count in callback chains.
			chain.addFunction(function() {
				cnt++;
				log.groupEnd();
			});
		}
		chain.doChain();
	}

	/**
	 * @args _data String ( expect {"tor":"hogehoge[,henheno]",
	 *       "img":"foofoo[,barbar]"} )
	 */
	function getTorImgMap(_json_string) {
		var _data = eval("(" + _json_string + ")");
		var map = [];
		map['tor'] = _data.tor.split('<>');
		map['img'] = _data.img.split('<>');
		return map;
	}

	/* ======= common Lib */
	/**
	 * get nodes array from xpath.
	 * 
	 * @argument _xpath String
	 * @return nodesArray Array
	 */
	function x(_xpath, msg) {
		var nodes = document.evaluate(_xpath, document, null,
				XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
		var nodesArray = [];
		for ( var i = 0; i < nodes.snapshotLength; i++) {
			nodesArray.push(nodes.snapshotItem(i));
		}
		if (nodesArray.length < 1) {
			log.warn(msg + ": node array is NULL." + nodesArray.length);
			return null;
		} else {
			return nodesArray;
		}
	}

	/**
	 * // Chain execution class
	 */
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
				// If this job is Request , change args and do
				// GM_xmlhttpRequest().
				var obj = job.func.apply(this);
				obj.chain = this;
				if (obj.onload) {
					// change onload(). After do function, do next job.
					obj.$onload = obj.onload;
					obj.onload = function(response) {
						obj.$onload.apply(this.chain, [ response ]);
						this.chain.doChain();
					}
				}
				GM_xmlhttpRequest(obj);
			}
		};
	}

	// ========== add from snippet ================
	function cT(value) {
		var d = document.createTextNode(value);
		return d;
	}
	// ========== add from snippet ================
	function cE(name, array) {
		var d = document.createElement(name);
		for ( var i in array) {
			d.setAttribute(i, array[i]);
		}
		return d;
	}

	function Logger(isDebug) {
		this.isDebug = isDebug ? isDebug : false;
		this.debug = function(text) {
			if (this.isDebug)
				console.log(text);
		}
		this.warn = function(text) {
			if (this.isDebug)
				console.warn(text);
		}
		this.error = function(text) {
			if (this.isDebug)
				console.error(text);
		}
		this.fatal = function(text) {
			if (this.isDebug)
				console.fatal(text);
		}
		this.ast = function(expr, msg) {
			console.group('assert ' + parseInt(Math.random() * 10000));
			console.log(msg);
			console.assert(expr);
			console.groupEnd();
		}
		this.info = function(text) {
			if (this.isDebug)
				console.info(text);
		}
		this.group = function(text) {
			if (this.isDebug)
				console.group(text);
		}
		this.groupEnd = function(text) {
			console.groupEnd();
		}
		this.dir = function(text) {
			if (this.isDebug)
				console.dir(text);
		}
		this.dirxml = function(text) {
			if (this.isDebug)
				console.dirxml(text);
		}
		this.dummy = function() {
		}
	}
})();