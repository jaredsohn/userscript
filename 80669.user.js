// ==UserScript==
// @name           en-japan helper
// @namespace      org.positrium.gm
// @description    compare job helper (unstable)
// @version	0.0.2b
// @include        https://employment.en-japan.com/search/desc_job.cfm?*
// @include		https://employment.en-japan.com/search/wish_search_list.cfm?*
// @include		https://employment.en-japan.com/message/index.cfm?
//
// org.positrium.gm.Logger 
// @require		http://userscripts.org/scripts/source/80719.user.js
//
//
// ==/UserScript==

(function() {
	var PAGE = new Page();
	
	if( PAGE.match( new RegExp(/search\/desc_job\.cfm\?WorkID=.+/) ) ){
		var log = new Logger(true);
		var log2 = new Logger(true);
		
		var wx = new wxGreaseMonkey();
		var frame_id = "org.positrium.gm.en-japan_helper";
		var frame_prefix = "enjapanhelper-edit";
		var frame = wx.createFrame('edit', frame_id, frame_prefix);
		
		var config_list = GM_listValues();
		for(var i in config_list){
			//if(config_list[i].toString().match(/is.+/i)){
				log2.debug( config_list[i] +"="+ wx.get(config_list[i]) );
			//}
		}
		
		var company_obj = x('/html/body/div/div[5]/div/table/tbody/tr/th', 'title')[0];
		var company_title = company_obj.textContent;
		//log2.dir(company_obj);
		log2.info(company_title);
		//log2.dirxml(company_title);
		//=======================================
		var storage = {
				'id':PAGE.getParam(location.href)['WorkID'],
				'name':company_title,
				'rank':0,
				'type':'',
				'suit':false,
				'stay':'maybe',
				'place':'',
				'flex':false,
				'worktime':'',
				'study':'maybe',
				'rejected':0,
				'ignore':true
				//'url':location.href
			};
		
		
		
		var text_typelist = new TypeList(['id', 'url', 'name']);
		
		for(var i in storage){
			if( text_typelist.contains(i) ){
				frame.appendItem( wx.text( i+": "+storage[i]) , true );
			}else{
				frame.appendItem( wx.textInput( i , storage ), true );
			}
		}
		
		
		
		//=======================================
		frame.appendItem(
			wx.button('check', 
				function(){
					var list = GM_listValues();
					log2.info(list);
					for(var i in list){
						log2.info( "["+i + "] " + list[i] + " = " + GM_getValue(list[i]) );
					}
				}
			), false
		);

		frame.appendItem( 
			wx.button('reset', 
				function(){
					GM_deleteValue( storage['id'] );
					if( !GM_getValue( storage['id'], false )  ) log2.info("delete done!");
				}
			), false
		);

		// wx.open();
		if(wx.get(frame_id)){
			wx.open();
		}else{
			wx.close();
		}
		
	}else if( PAGE.match(new RegExp(/search\/wish_search_list\.cfm\?.*/)) ){
	
		var log2 = new Logger(true);
		var config = new GMConfigHandler();
		
		log2.info("logger initialized.");
		
		var links = x('/html/body/div/div/div[2]/div/div[1]/table/tbody/tr/th/a', "company name links");
		
		
		for(var i in links){
			var id = PAGE.getParam( (links[i].href).toString())['WorkID'];
			var modify_parent = links[i].parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;
			//log2.debug(id);
			
			if(config.isExist(id)){
				var data = config.load(id);
				//log2.dir(data);
				if(data['ignore'] == "false" ) {
					log2.info(links[i].textContent+" == "+id +" is show." );
				}else{
					log2.warn(links[i].textContent+" == "+id +" is ignore." );
					modify_parent.setAttribute("style", "display:none;");
				}
			}else{
				log2.info(links[i].textContent+" == "+id +" is NOT registered." );
			}
			
		}
	
	}else if( PAGE.match( new RegExp(/message\/index\.cfm\?.*/)) ){
	
		var config = new GMConfigHandler();
		
		var configs = GM_listValues();
		var list = x('/html/body/div/form/div/div[2]/table/tbody/tr/td[2]/em', 'myMessageList');
		for(var i in configs){
			var test = config.load(configs[i]);
			//console.log(test["name"]);
			
			for(var j in list){	
				if(test['name'] == list[j].textContent && test['ignore'] != "false"){
					console.log( list[j].textContent );
					var parent = list[j].parentNode.parentNode;
					parent.setAttribute('style', 'display:none');
				}
			}
		}
		// var configs = GM_listValues();
		// for(var i in configs){
			// console.log(configs[i]);
		// }
	}else{
		console.log("PAGE Not Match: "+location.href );
	}
	
	
	/* ======= common Lib */
	/**
	 * get nodes array from xpath.
	 * 
	 * @argument _xpath String
	 * @return nodesArray Array
	 * @version 0.0.2
	 */
	function x(_xpath, msg) {
		var nodes = document.evaluate(_xpath, document, null,
				XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
		var nodesArray = [];
		for (var i = 0; i < nodes.snapshotLength; i++) {
			nodesArray.push( nodes.snapshotItem(i) );
		}
		if (nodesArray.length < 1) {
			log.warn(msg + ": node array is NULL."+nodesArray.length);
			return null;
		}else{
			return nodesArray;
		}
	}
	
	/**
	 * @require http://userscripts.org/scripts/source/80719.user.js
	 */
	function TypeList(_array){
		var log = new Logger(false);
		this.array = _array;
		this.contains = function(_string){
			var ret = false;
			for(var i in this.array){
				log.bar(_string)
				log.info(i);
				if(_string==i){
					ret = true;
					break;
				}
			}
			return ret;
		}
	}
	
	/** @version 0.0.2 */
	function Page(){		
		this.getParam = function(urlstring){
			var tmp = (urlstring.split('?')[1]).split('&');
			var params = [];
			for(var i in tmp){
				params[tmp[i].split('=')[0]] = tmp[i].split('=')[1];
			}
			return params;	
		}
		
		this.match = function(pattern){
			return (location.href).toString().match(pattern);
		}
	}
	
	/** @version 0.0.1 */
	function cT(value) {
		var d = document.createTextNode(value);
		return d;
	}
	
	/** @version 0.0.1 */
	function cE(name, array) {
		var d = document.createElement(name);
		var len = 0;
		for(var i in array){
			len++;
		}
		if(len>0){
			for (var i in array) {
				d.setAttribute(i, array[i]);
			}
		}
		return d;
	}
	
	
	
	
	/* ======== config data handler */
	/** @version 0.0.1 */
	function GMConfigHandler(){
	
		this.save = function(array){
			GM_setValue(array['id'], this.toJSON(array) );
		}
		
		this.load = function(id){
			return eval("("+GM_getValue(id)+")");
		}
		
		this.isExist = function(id){
			var retbool = true;
			if(GM_getValue(id, false)==false){
				retbool = false;
			}
			return retbool
		}
		
		this.toJSON = function(array){

			var json = '{';
			for(var e in array){
					json += this.jsonize(e, array[e] );
			}
			json += '"dummy":"0"';
			json += '}';
			
			return json;
		}
		
		this.jsonize = function(_name, _value, _end){
			var retVal = '"'+_name+'":';
					retVal += '"'+_value+'"';
					retVal += _end!="EOL"?',':'';
			return retVal;
		}
	}
	
	/* ======== wxGreaseMonkey ======== */
	/** @version 0.0.2 */
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
		
		/** create text input */
		this.textInput = function(_label, _storage_array){
			var block = document.createElement('span');
			var input = document.createElement('input');
			input.type = 'text';

			
			var config = new GMConfigHandler();
			
			input.id = _storage_array['id']+"-"+_label;
			

			var input_size = 0;
			for(var i in _storage_array){
				input_size++;
			}
			input.size = 100;

			if(config.isExist(_storage_array['id'])){
				_storage_array = config.load(_storage_array['id']);
			}

			input.value = _storage_array[_label];
					

			
			/* == save == */
			input.addEventListener('keyup', 
				function(event){

					_storage_array[_label] = this.value;
					

					
					config.save(_storage_array);

				}, 
				false
			);
			
			var label = document.createElement('label');
			label.setAttribute('for',input.id);
			label.appendChild( this.text(_label+":") );
	
			block.appendChild(label);	
			block.appendChild(input);

			
			return block;			
			
		}
		
		/** createFrame */
		this.createFrame = function( _title, _key, _prefix , _width){
			this.dialog_key = _key;
			
			GM_registerMenuCommand((_prefix ? _prefix+": " : "") + (GM_getValue(_key, false) ? "[x]" : "["+_title+"]"), function() {
				console.log('INN dialog_key: '+_key);
				console.log('INN dialog_state: '+GM_getValue(_key, false));
				
				if(!GM_getValue(_key, false)){
					GM_setValue(_key, true);
				}else{
					GM_deleteValue(_key);
				}

				location.reload();
			  });
			
			/* window */
			var width = _width=="undefined"?400:_width;
			
			window0 = document.createElement('div');
			window0.setAttribute('style', 
									"border:1px solid #333 !important;" +
									"position:fixed !important;" +
									"top:10% !important;" +
									"left:30% !important;" +
									"width:"+width+"px !important;" +
									"background-color:#f1f1f1 !important;" +
									"z-index:1000 !important;"
									);
			window0.setAttribute('name', "wxWindow");
			
			/* window title header */
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
			
			/* window content pane */
			content0 = document.createElement('div');
			content0.setAttribute('style',
				"border:1px solid #fff !important;" +
				"padding:0.5ex !important;" +
				"margin-top:0px !important;" +
				"z-index:999 !important;" +
				"text-align: left !important;"
				);
			content0.setAttribute('name', "wxContent_pane");
				
			window0.appendChild(content0);
			
			/* window title */
			tx1 = this.text(_title);
			window_title0.appendChild(tx1);
			txL = this.text(' [ ');
			txR = this.text(' ] ');
			window_title0.appendChild(txL)
			
			/* close link */
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
			
			/* appendItem(DOMElement) */
			this.frame.appendItem = function(child, isBR){
				this.appendChild(child);
				if(isBR){
					this.appendChild(document.createElement('br'));
				}
			}
			
			return  content0;
		}
		
		/** checkbox */
		/** @todo append storage saving. like a textInput(). */
		this.checkBox = function(_string, _id){
			block = document.createElement('span');
			
			check = document.createElement('input');
			check.type = 'checkbox';
			check.id = _id;
			
			if( GM_getValue(_id, false) ){
				check.checked = 'checked';
			}
			
			check.addEventListener('click', 
				function(event){
					var val = GM_getValue(_id, false);
					if(!val) {
						GM_setValue(_id, true);
					}else{
						GM_deleteValue(_id);
					}
					console.log('GM:'+_id+" *** "+GM_getValue(_id));

				
					label = document.createElement('label');
					label.setAttribute('for',_id);
					label.appendChild(this.text(_string));
					
					block.appendChild(check);
					block.appendChild(label);
					
					return block;
				}
			,false);
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