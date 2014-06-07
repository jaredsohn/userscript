// ==UserScript==
// @name image opener
// @namespace org.positrium.gm
// @description image link opener
// @include *
// @exclude http://images.google.co.jp/*
// @version 0.3
// @licence Public Domain
// ==/UserScript==

(function() {
	// makeMenuToggle(
		// "isAppendBeforeBR", 
		// true, 
		// "show bef:BR [on]", 
		// "hide bef:BR [off]", 
		// "img_opener"
		// );
	// makeMenuToggle(
		// "isAppendAfterBR", 
		// true, 
		// "show aft:BR [on]", 
		// "hide aft:BR [off]", 
		// "img_opener"
		// );

	var wx = new wxGreaseMonkey();
	var frame = wx.createFrame('config');
	//frame.appendItem(wx.text('test'));
	
	frame.appendItem(wx.checkBox('isAppendBeforeBR','append before br'));
	frame.appendItem(wx.checkBox('isAppendAfterBR','append after br'));	
	
	// makeMenuToggle's first argument is GM_setValue()' s first argument.
	// So that is key.
	// So if you use same key across some script, you get failure.
	makeMenuToggle("isConfigOpen",  false,  "config [open]",  "dialog [close]",  "img_opener");
	if(isConfigOpen){
		wx.open();
	}else{
		wx.close();
	}
	
	var links = document.getElementsByTagName('A');
	for (var i in links) {
		var link = links[i];
		if (!hasImage(link)&& (
				link.href.indexOf(".jpg") > 0 ||
				link.href.indexOf(".gif") > 0 ||
				link.href.indexOf(".png") > 0
				)) {
			var img = document.createElement('IMG');
			img.setAttribute('src', link.href);
			img.setAttribute('width', '50%');
			
			if(GM_getValue('isAppendBeforeBR', false)){
				link.appendChild(document.createElement('BR'));
			}
			link.appendChild(img);
			if(GM_getValue('isAppendAfterBR', false)){
				link.appendChild(document.createElement('BR'));
			}

		}
	}

	function hasImage(DOM) {
		var ret = false;
		var child = DOM.childNodes;
		for (var i in child) {
			if (child[i].nodeName == 'IMG') {
				ret = true;
			}
		}
		return ret;
	}
	
	/**
	 * GreaseMonkey menu toggle
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
	
	/* ======== wxGreaseMonkey ======== */
	/** @version 0.0.1 */
	function wxGreaseMonkey(){
		this.wxGreaseMonkey = function(){
			this.dialog_opened = false;
			this.window = null;
			this.frame = null;
		}
		
		this.open = function(){
			document.body.appendChild(this.window);
			this.dialog_opened = true;
		}
		
		this.close = function(){
			if(this.dialog_opened){
				document.body.removeChild(this.window);
				this.dialog_opened = false;
			}
		}
		
		this.text = function(string){
			return document.createTextNode(string);
		}
		
		this.createFrame = function( _title ){
			window0 = document.createElement('div');
			// window0.setAttribute('style','fsMeQok_window');
			window0.setAttribute('style',
				"border:1px solid #333;" +
				"position:fixed;" +
				"top:10%;" +
				"left:30%;" +
				"width:400px;" +
				"background-color:#f1f1f1;" +
                                "z-index:10000"
				);
				
			window_title0 = document.createElement('h3');
			window_title0.setAttribute('style',
				"text-align:center;" +
				"border:1px solid #f1f1f1;" +
				"margin-top:0px;" +
				"margin-bottom:0px;" +
				"background-color:gray;" +
				"color:white;"
				);
				
			window0.appendChild(window_title0);
			
			content0 = document.createElement('div');
			content0.setAttribute('style',
				"border:1px solid #fff;" +
				"padding:0.5ex;" +
				"margin-top:0px;"
				);
				
			window0.appendChild(content0);
			
			tx1 = this.text(_title);
			window_title0.appendChild(tx1);
			txL = this.text(' [ ');
			txR = this.text(' ] ');
			window_title0.appendChild(txL)
			
			lnk1 = document.createElement('a');
			lnk1.href = '#';
			lnk1.setAttribute('style',
				"color:white;"
				);
				
			lnk_tx1 = this.text('x');
			lnk1.appendChild(lnk_tx1);
			lnk1.addEventListener('click', function(event){
				// isConfigOpen = false;
				GM_setValue("isConfigOpen", false);
				location.reload();
			}, false);
			
			window_title0.appendChild(lnk1);
			window_title0.appendChild(txR);
			
			this.window = window0;
			this.frame = content0;
			
			/** appendItem(DOMElement) */
			this.frame.appendItem = function(child){
				this.appendChild(child);
				this.appendChild(document.createElement('br'));
			}
			
			return  content0;
		}
		
		this.checkBox = function(_id, _string){
			block = document.createElement('span');
			
			check = document.createElement('input');
			check.type = 'checkbox';
			check.id = _id;
			if(GM_getValue(_id, false)){
				check.checked = 'checked';
			}
			check.addEventListener('click', function(event){
				var val = GM_getValue(_id, false);
				if(!val) {GM_setValue(_id, true)}else{GM_setValue(_id, false)}
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
	}
})();