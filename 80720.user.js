// ==UserScript==
// @name           org.positrium.gm.wxGreasemonkey
// @namespace      org.positrium.gm
// @description    gui for greasemonkey.
// @version	0.0.2
// ==/UserScript==

	/* ======== GUI ======== */
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
		
		/** create text input */
		this.textInput = function(_label, _storage_array){
			var block = document.createElement('span');
			var input = document.createElement('input');
			input.type = 'text';
			//_storage = CompanyFactory(_storage_array);
			
			var config = new GMConfigHandler();
			
			input.id = _storage_array['id']+"-"+_label;
			
			//log2.info(_label+": --------");
			//log2.dir(_storage);
			
			//input.setAttribute('value', _storage.getProperties()[_label] );
			var input_size = 0;
			for(var i in _storage_array){
				input_size++;
			}
			input.size = 100;
			// input.setAttribute('size' , input_size*10 );
			
			// log2.info("control-name:"+_label);
			if(config.isExist(_storage_array['id'])){
				_storage_array = config.load(_storage_array['id']);
			}
			// log2.debug("mouseup -- "+_label);
			// log2.dir(_storage_array);
			// log2.info(_storage_array[_label]);
			input.value = _storage_array[_label];
					
			// /* == load == */
			// input.addEventListener('mouseup', 
				// function(event){
					// log2.info("control-name:"+_label);
					// if(config.isExist(_storage_array['id'])){
						// _storage_array = config.load(_storage_array['id']);
					// }
					// log2.debug("mouseup -- "+_label);
					// log2.dir(_storage_array);
					// log2.info(_storage_array[_label]);
					// input.value = _storage_array[_label];
				// }, 
				// false
			// );
			
			/* == save == */
			input.addEventListener('keyup', 
				function(event){
					
					//log2.info('hoge key!');
					// log2.info("control-name:"+_label);
					//log2.dir(input);
					// log2.info("value="+this.value);
					_storage_array[_label] = this.value;
					
					// log2.info(_label +" = "+ _storage_array[_label] + " /// "+this.value );
					// log2.info("******************************");
					
					// log2.dir(_storage_array);
					//log2.dir(this);
					// log2.info("******************************");
					
					config.save(_storage_array);
					// log2.info("saved.");
					//GM_setValue(
					//	_storage_array['id'], 
					//	data.toJSON()
					//	);
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
				// GM_setValue(_key, !this.dialog_state);
				
				location.reload();
			  });
			
			// window
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
				"z-index:999 !important;" +
				"text-align: left !important;"
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
		// @todo append storage saving. like a textInput().
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