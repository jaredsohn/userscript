// ==UserScript==
// @name           embed and attache viewer
// @namespace      org.eroim.essime
// @include        http://www.akiba-online.com/forum/forumdisplay.php?f=*
// @include        http://www.akiba-online.com/forum/tags.php?tag=*
// @include        http://www.akiba-online.com/forum/search.php?searchid=*
// @version        0.9
// ==/UserScript==
(function() {
	/* ======= logger */
	var log = new Logger(true); // logger
	var mapLog = new Logger(true);
	var keyLog = new Logger(true);
	
	
	/* ======= UI setup */
	var wx = new wxGreaseMonkey(); // gui config dialog insteed of user_script_command.
	var frame_id = "org.eroim.essime.gm.embed_and_attache_viewer";
	var frame_prefix = "akv";
	var frame = wx.createFrame('config', frame_id, frame_prefix);//org.positrium.gm.embed_and_attache_viewer');
	
	// isShowImages = false;
	// isPicsSize50per = false;
	// isMultiImage = false;
	
	// GM_deleteValue('isConfigOpen');
	// GM_deleteValue(frame_id);
	mapLog.info('GM_listValues: ');
	var config_list = GM_listValues();
	for(var i in config_list){
		if(config_list[i].toString().match(/is.+/i)){
			mapLog.debug( config_list[i] +"="+ wx.get(config_list[i]) );
		}
	}
	
	// frame.appendItem(wx.checkBox('img [on]', 'img [off]', 'isShowImages'), true);
	// frame.appendItem(wx.checkBox('size [ 50%]', 'size [100%]', 'isPicsSize50per'), true);
	// frame.appendItem(wx.checkBox('multi [on]', 'multi [off]', 'isMultiImage'), true);
	frame.appendItem(wx.checkBox('img on', 'isShowImages'), true);
	frame.appendItem(wx.checkBox('size 50%', 'isPicsSize50per'), true);
	frame.appendItem(wx.checkBox('multi on', 'isMultiImage'), true);
	// frame.appendItem(wx.checkBox('collect', 'isCollect'), true);
	
	frame.appendItem(wx.button('delete all', function(){
			var list = GM_listValues();
			for(var i in list){
				// if(list[i].match(/is.+/i)){
					GM_deleteValue(list[i]);
				// }
			}
			// location.reload();
		}), false);
		
	frame.appendItem(wx.button('check', function(){
			var list = GM_listValues();
			mapLog.info(list);
			for(var i in list){
				mapLog.info("["+i + "] " + list[i] + " = " + GM_getValue(list[i]));
			}
			//console.dir(list);
		}), false);
	
	if(wx.get(frame_id)){
		wx.open();
	}else{
		wx.close();
	}
	
	/* ======= setup */
	var chain = new Chain();

	/* ======= for progress ani-GIF */
	var data = '';
	var img_progress = cE('img', {src : ''});
	{
	data = 'data:image/gif;base64,'
		+ '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'
		+ 'fySDhGYQdDWGQyUhADs=';
	}
	img_progress.src = data;

	/* =======  pre content */
	{
		//var bbs_theme = x('//*[@id="vbulletin_css"]','bbs_theme');
		//var text = bbs_theme[0].textContent;
		
		var torr_style = {0:"color:#cb143c;",1:"color:#cb143c;",2:"color:#99FF99;"};
		var style_matchers = new Array(
			new RegExp(/Style: 'Blue';/gi),
			new RegExp(/Style: 'Blue-guest';/gi),
			new RegExp(/Style: 'Dark';/gi)
		);
		var torr_link_style = "";
		for(m in style_matchers){
			//if(text.toString().match(style_matchers[m])){
			//	torr_link_style = torr_style[m];
			//}
		}
	}
	
	
	/* =======  content */
	{
		var img_matchers = new Array(
			new RegExp(/img src="[^"]+" border="[^"]*" alt="[^"]*" onload="NcodeImageResizer\.createOn\(this\);"/gi),
			new RegExp(/\/attachments[^"]+/gi)
		);
		
	
	
	
	
	
	
		/* -------------------------------- localLib ------------------*/
		function getThreadLinks(){
			var linkList = x('//*[@id="threadslist"]/tbody/tr/td[2]/div/a','linkList');
			           
			for(var i=0;i<linkList.length;i++){
				linkList[i].href = linkList[i].href.match(/showthread\.php\?t=[^"]+/g);
			}
			return linkList;
		}
		
		function highlight(xpath, color){
		  var point = x(xpath, 'hlpoint');
		  var backs = x('/html/body/div/div/div/div/table[2]/tbody/tr/td[2]/form/table/tbody/tr/td[1]', 'backs');
		  log.debug(point.length);
      log.debug(backs.length);
		  for(i=0;i<point.length;i++){
		    if(point[i].getAttribute('href') == "forumdisplay.php?f=44"){
		      log.debug(i+"::::"+point[i].textContent);
          backs[i+2].setAttribute('style','background-color:'+color);
        }
      }
    }
	
		var linkList = getThreadLinks();
		
		
		// to be unique set
		var url_map = [], tor_map = [], img_map = []; // a#id : a
		for (var i in linkList) {
			if(linkList[i].href.match(/showthread/i)){
				url_map[linkList[i].id] = linkList[i];
			}
		}
		var keyList = [];
		for (var i in url_map) {
			keyList.push(i);
		}
		
		
		mapLog.info('keyList: ');
		mapLog.debug(keyList);
		
		
		
		/* =========== CHAIN ============== */
		var cnt=0;
		//	for(var i=cnt;i<linkList.length;i++){
		for(var i in url_map){ // DEBUG
			var tor_links = '', img_links = '';
			
			//	log.info("CNT: "+cnt);
			//	log.debug(url_map[cnt].text+"\t\t\t"+url_map[i].href);
			chain.addFunction(function() {
				log.group('['+url_map[keyList[cnt]].textContent+'] attached torrent');
			});
			
			// restore = jsonParse(GM_getValue(keyList[cnt]));
			// log.info(restore['tor']);
			// log.info(restore['img']);
			
			chain.addFunction(function() {
				var container = url_map[keyList[cnt]].parentNode;
				container.appendChild(img_progress);
			});
				
			if( wx.get(keyList[cnt]) == false){
				// show loading screw
				// get specific page contents => this.pb
				chain.addRequestFunction(function() {
					keyLog.info(keyList[cnt] +" = false . so collecting.");
					return {
						method : 'get',
						url : url_map[keyList[cnt]].href,
						onload : function(res) {
						//	log.info(res.responseText);
							this.pb = res.responseText;
						//	log.info(this.pb);
						}
					}
				});
			}
				
				
			// check this.pb specific sentences.
			// [attached torrent filepath]
			chain.addFunction(function() {
				tor_links = '', img_links = '';
				torrent_urls = [];
				//	log.info("CNT: "+cnt);
				//	log.debug('pb size: '+this.pb.length);
				
				var container = url_map[keyList[cnt]].parentNode;
				
				/* ===== attached torrent ====== */
				
				// mapLog.info(keyList[cnt]);
				// mapLog.info(wx.get(keyList[cnt]));
				if(  wx.get(keyList[cnt]) != false ){
					keyLog.info(keyList[cnt] +" // "+GM_getValue(keyList[cnt]));
					var load_json_string = wx.get(keyList[cnt]);
					var map = [];
					map = getTorImgMap(load_json_string);
					mapLog.info(load_json_string);
					torrent_urls = map['tor'];
					
					mapLog.info("map['tor']");
					mapLog.dir(map['tor']);

				}else{
					if(this.pb){
						torrent_urls = this.pb.match(/attachment\.php.+type=torrent.+<\/a>/g);
					}
				}
				
				// match object && match result[0]
				if(torrent_urls && torrent_urls.length>0){
					log.debug('content: '+torrent_urls);
					torrent_url_str = torrent_urls[0];
					
					for(var j=0;j<torrent_urls.length;j++){
						torrent_url = torrent_urls[j];
						log.debug("torrent: "+torrent_url);
						
						container.appendChild(cE('br',{}));
						
						var attached_torrent_link = cE('a', {
							href:torrent_url.match(/attachment\.php.+type=torrent[^"]*/),
							style:torr_link_style
							});
						attached_torrent_link.appendChild(
							cE('img',{
								src:'/forum/images/bluefantasy/attach/torrent.gif',
								style : 'border:0px;'}
							)
						);
						var text = torrent_url.match(/>[^\.]+.torrent/g);
						if(text == null){
							text = "*******.torrent";
						}else{
							text = text.toString().substring(1);
						}
						log.info("tor-text : ["+text+"] "+attached_torrent_link.href);
						attached_torrent_link.appendChild(
							cT(text)
						);
						container.appendChild(attached_torrent_link);
						tor_links += tor_links.length>0?"<>"+attached_torrent_link.href:attached_torrent_link.href;
					}
				}else{
					log.error("torrent_urls == NULL");
				}
				
				
				
				if( wx.get('isShowImages') ){
					/* ===== image preview ====== */
					
					var img_width="";
					var img_height="";
					if(wx.get('isPicsSize50per')){
						img_width="";
						img_height="200px";
					}
					
					for(var r=0;r<img_matchers.length;r++){
						var image_url_str = [];
						
						if( wx.get(keyList[cnt]) != false ){
							var load_json_string = wx.get( keyList[cnt] );
							var map = [];
							map = getTorImgMap(load_json_string);
							mapLog.dir(map);
							image_url_str = map['img'];
							
						}else{
							if(this.pb){
								image_urls = this.pb.match(img_matchers[r]);
								if(image_urls){
									image_url_str = image_urls.toString().split(',');
								}
							}
						}
							
						if(image_url_str && image_url_str.length>0){
							log.dir(image_url_str);
							
							// for(ius in image_url_str){
								// log.info(ius+" "+image_url_str[ius].match(/http[^"]+/gi));
							// }
							
							// if(image_url_str.length>1){
								// log.warn("multi image");
							// }else{
								// log.warn("mono image");
							// }
							
							container.appendChild(cE('br',{}));
							
							var SHOW_IMAGE_MAX = 1;
							if(wx.get('isMultiImage')){
								SHOW_IMAGE_MAX = image_url_str.length;
							}

							if( image_url_str ){
								for(var img=0;img<SHOW_IMAGE_MAX;img++){
									image_url = image_url_str[img];
									if( image_url ){
										if(r==0){
											image_url = image_url_str[img].match(/http[^"]+/gi);
											log.warn('image embed');
										}else{
											log.warn('image attached');
										}
										
										log.info(img+"      : "+image_url);
										
										container.appendChild(cE('img', {
											src:image_url,
											width:img_width,
											height:img_height
										} ));
										img_link = image_url.toString().match(/http.+/i)?image_url:"http://www.akiba-online.com"+image_url;
										img_links += img_links.length>0?'<>'+img_link:img_link;
									}
								}
								break;
							}
						}
					}
				}
				
				/* ====== END ===== */
				// if( wx.get(keyList[cnt]) == false ){
					container.removeChild(img_progress);
				// }
			});
			
			
			chain.addFunction(function() {
			/* =============== save to about:config ============== */
				tor_map[keyList[cnt]] = tor_links;
				img_map[keyList[cnt]] = img_links;
				var save_json_string = '';
				if(tor_map[keyList[cnt]].length>0){
					save_json_string = '{"tor":"'+tor_map[keyList[cnt]];
				
					
					if(img_map[keyList[cnt]].length>0){
						save_json_string += '","img":"'+img_map[keyList[cnt]]+'"}';
					}else{
						save_json_string += '","img":""}';
					}
					GM_setValue(keyList[cnt], save_json_string);
				}
				
				/* xxx DEBUG xxx */
				var load_json_string = GM_getValue(keyList[cnt], "0");
				if(load_json_string.length>1){
					var map = getTorImgMap(load_json_string);
					mapLog.dir(map);
				}
				/* end DEBUG end */
			
			});
			
			// no effective count in callback chains.
			chain.addFunction(function() {
				cnt++;
				log.groupEnd();
			});
		}
		if(!wx.get(frame_id)) chain.doChain();
		
		highlight('/html/body/div/div/div/div/table[2]/tbody/tr/td[2]/form/table/tbody/tr/td[6]/a', 'red');
	}
	
	/** @args _data String ( expect {"tor":"hogehoge[,henheno]", "img":"foofoo[,barbar]"} )
	  */
	function getTorImgMap(_json_string){
		var _data = eval("("+_json_string+")");
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
		for (var i = 0; i < nodes.snapshotLength; i++) {
			nodesArray.push(nodes.snapshotItem(i));
		}
		if (nodesArray.length < 1) {
			log.warn(msg + ": node array is NULL."+nodesArray.length);
			return null;
		}else{
			return nodesArray;
		}
	}
	
	/**
	// Chain execution class
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
	
	// ========== add from snippet ================
	function cT(value) {
		var d = document.createTextNode(value);
		return d;
	}
	// ========== add from snippet ================
	function cE(name, array) {
		var d = document.createElement(name);
		for (var i in array) {
			d.setAttribute(i, array[i]);
		}
		return d;
	}
	
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
			if (this.isDebug) console.info(text);
		}
		this.group = function(text) {
			if (this.isDebug)console.group(text);
		}
		this.groupEnd = function(text) {console.groupEnd();}
		this.dir = function(text){
			if(this.isDebug) console.dir(text);
		}
		this.dirxml = function(text){
			if(this.isDebug) console.dirxml(text);
		}
		this.dummy = function() {}
	}
	
	/* ======== wxGreaseMonkey ======== */
	function wxGreaseMonkey(){
		/** constructor */
		this.wxGreaseMonkey = function(){
			this.dialog_opened = false;
			this.window = null;
			this.frame = null;
			this.dialog_key = null;
			this.dialog_state = null;
		}
		
		/** frame open */
		this.open = function(){
			document.body.appendChild(this.window);
			this.window.setAttribute('style', 
				this.window.getAttribute('style')+
				"display:block !important;"
				);
			this.dialog_opened = true;
		}
		
		/** frame close */
		this.close = function(){
			if(this.dialog_opened){
				//document.body.removeChild(this.window);
				this.window.setAttribute('style', 
					this.window.getAttribute('style')+
					"display:none !important;"
					);
				this.dialog_opened = false;
			}
		}
		
		/** create Text Node */
		this.text = function(string){
			return document.createTextNode(string);
		}
		
		/** createFrame */
		this.createFrame = function( _title, _key, _prefix ){
			this.dialog_key = _key;
			
			GM_registerMenuCommand((_prefix ? _prefix+": " : "") + (GM_getValue(_key, false) ? "[x]" : "[config]"), function() {
				console.log('INN dialog_key: '+_key);
				console.log('INN dialog_state: '+GM_getValue(_key, false));
				
				if(!GM_getValue(_key, false)){
					GM_setValue(_key, true);
				}else{
					GM_deleteValue(_key);
				}
				// GM_setValue(_key, !this.dialog_state);
				
				location.reload();
			  });
			 
			// window
			window0 = document.createElement('div');
			window0.setAttribute('style', 
									"border:1px solid #333 !important;" +
									"position:fixed !important;" +
									"top:10% !important;" +
									"left:30% !important;" +
									"width:400px !important;" +
									"background-color:#f1f1f1 !important;" +
									"z-index:1000 !important;"
									);
			window0.setAttribute('name', "wxWindow");
			
			// window title header
			window_title0 = document.createElement('h4');
			window_title0.setAttribute('style',
				"text-align:center !important;" +
				"border:1px solid #f1f1f1 !important;" +
				"margin-top:0px !important;" +
				"margin-bottom:0px !important;" +
				"background-color:gray !important;" +
				"color:white !important;" +
				"z-index:999 !important;" +
				"margin:0px !important;"
				);
			window_title0.setAttribute('name', "wxWindow_title");
			
			window0.appendChild(window_title0);
			
			// window content pane
			content0 = document.createElement('div');
			content0.setAttribute('style',
				"border:1px solid #fff !important;" +
				"padding:0.5ex !important;" +
				"margin-top:0px !important;" +
				"z-index:999 !important;"
				);
			content0.setAttribute('name', "wxContent_pane");
				
			window0.appendChild(content0);
			
			// window title
			tx1 = this.text(_title);
			window_title0.appendChild(tx1);
			txL = this.text(' [ ');
			txR = this.text(' ] ');
			window_title0.appendChild(txL)
			
			// close link
			lnk1 = document.createElement('a');
			lnk1.href = '#';
			lnk1.setAttribute('style',
				"color:white;"
				);
			lnk_tx1 = this.text('x');
			lnk1.appendChild(lnk_tx1);
			lnk1.parentKey = this.dialog_key;
			lnk1.addEventListener('click', function(event){
				GM_deleteValue(lnk1.parentKey);
				location.reload();
			}, false);
			
			window_title0.appendChild(lnk1);
			window_title0.appendChild(txR);
			
			this.window = window0;
			this.frame = content0;
			
			// appendItem(DOMElement)
			this.frame.appendItem = function(child, isBR){
				this.appendChild(child);
				if(isBR){
					this.appendChild(document.createElement('br'));
				}
			}
			
			return  content0;
		}
		
		/** checkbox */
		this.checkBox = function(_string, _id){
			block = document.createElement('span');
			
			check = document.createElement('input');
			check.type = 'checkbox';
			check.id = _id;
			
			if(GM_getValue(_id, false)){
				check.checked = 'checked';
			}
			check.addEventListener('click', function(event){
				var val = GM_getValue(_id, false);
				if(!val) {
					GM_setValue(_id, true);
				}else{
					GM_deleteValue(_id);
				}
				console.log('GM:'+_id+" *** "+GM_getValue(_id));
				}, false);
			// check.setAttribute('onclick', "GM_setValue('"+_id+"','checked')");
			
			label = document.createElement('label');
			label.setAttribute('for',_id);
			label.appendChild(this.text(_string));
			
			block.appendChild(check);
			block.appendChild(label);
			
			return block;
		}
		
		/** button */
		this.button = function(_string, func){
			button0 = document.createElement('button');
			button0.addEventListener('click',func,false);
			button0.appendChild(this.text(_string));
			return button0;
		}
		
		/** GM_getValue() wrapper */
		this.get  = function(_id){
			return GM_getValue(_id, false);
		}
	}
})();