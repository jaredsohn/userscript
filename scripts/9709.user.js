// ==UserScript==
// @name        Google Search keybind as a LDR
// @namespace   http://d.hatena.ne.jp/Sybian/
// @include     http://*.google.co*/search?*
// @description Google keybind as a LDR
// @version     1.1.1
// ==/UserScript==


// keybinds are written bottom. 
// "?" input,key table display

// special thanks!
// http://d.hatena.ne.jp/sawat/20070416/1176727349

// ver 1.1.1 patch from http://white.s151.xrea.com/wiki/index.php?diary%2F2007-06-02%2F%A1%D6Google%A4%F2LDR%C9%F7%A4%CB%C1%E0%BA%EE%A4%B9%A4%EB%A1%D7%A4%CE%A5%D1%A5%C3%A5%C1#m4793bc8
// thanks!

// * 2007-06-02  ver.1.1.1 (http://white.s151.xrea.com/wiki/index.php?diary%2F2007-06-02%2F%A1%D6Google%A4%F2LDR%C9%F7%A4%CB%C1%E0%BA%EE%A4%B9%A4%EB%A1%D7%A4%CE%A5%D1%A5%C3%A5%C1#m4793bc8)
//     - support for AutoPagerize/Pagerization added page
//     - fixed keybind for Meta+v != v
//     - fixed error for "k" key pressed when scroll point upper than first item
// 
// * 2007-05-24  ver.1.1.0
//     - adjust next/prev item using current scroll point



(function(){
	var setup=function(){
		// from prototype.js
		String.prototype.escapeHTML=function(){
			var div = document.createElement('div');
			div.innerHTML = this.replace(/<.*?>/g,"");
			return div.childNodes[0].nodeValue;
		}

		// for working both firefox and opera
		var unsafeWindow= unsafeWindow || window;

		// for Opera's popup block through..?
		var wo=unsafeWindow.open;
		window.openLater=function(){
			var args=arguments;
			setTimeout(
				function(){
					wo.apply(window,args)
				},100
			);
		}


		//**************************************************
		// css
		//**************************************************
		function CSS(){
			this._elm=[];
			this._cnt=0;
			this._hash={};
			this._head=document.getElementsByTagName("head")[0];
		}
		CSS.prototype.factory=function(id){
			this._cnt++;
			var id=id || this._cnt;
			var elm=document.createElement("style");
			elm.type="text/css";
			elm.id="css_"+id;
			return elm;
		}
		CSS.prototype.toggle=function(selector,prototype,id){
			if(!id) return;
			if(this._hash["css_"+id]){
				this.removeRule(id);
			}else{
				this.addRule(selector,prototype,id);
			}
		}
		CSS.prototype.addRule=function(selector,property,id){
			if(this._hash["css_"+id]) return ;
			var elm=this.factory(id);
			elm.innerHTML=selector+"{"+property+"}";
			this._head.appendChild(elm);
			this._hash[elm.id]=true;
			return elm.id;
		}
		CSS.prototype.removeRule=function(id){
			var elm=document.getElementById("css_"+id);
			if(elm){
				this._head.removeChild(elm);
				this._hash["css_"+id]=false;
			}
		}
		var css=new CSS();


		//**************************************************
		// panel
		//**************************************************
		var panel=document.createElement("div");

		panel.id="ldr_panel";
		css.addRule(
			"#ldr_panel"
			,[
				,"position:fixed"
				,"right:10px; top:10px;"
				,"background:#eee;"
			].join(";")
			,"panel"
		);

		// for panel's pin count
		css.addRule(
			"#ldr_panel p"
			,[
				"margin:0"
				,"padding:0"
				,"text-align:right"
			].join(";")
		);

		// for pinned items
		css.addRule(
			"div.g.pinnedItem:before"
			,[
				'content:"pinned"'
				,'background:#00c'
				,'color:#fff'
				,"padding:0 4px"
				,"margin-right:1ex"
				,"font-weight:normal"
			].join(";")
		);
		css.addRule(
			"div.g.pinnedCache h2:before"
			,[
				'content:"cache"'
				,'background:#0c0'
				,'color:#fff'
				,"padding:0 4px"
				,"margin-right:1ex"
				,"font-weight:normal"
			].join(";")
		);


		//--------------------------------------------------
		// panel list
		//--------------------------------------------------
		function List(){
			this.parent=panel;
			this.element=document.createElement("ol");
			this.element.style.display="none";
		}
		List.prototype.update=function(){
			var tmp=[];
			for(var i=0,l=this.parent.pin._pins.length; i<l; i++){
				var pin=this.parent.pin._pins[i];
				tmp.push([
					'<li>'
					,'<a href="',pin.url,'">',pin.title,'</a>'
					,'</li>'
				].join(""));
			}
			this.element.innerHTML=tmp.join("");
		}
		List.prototype.display=function(){
			this.element.style.display="block";
		}
		List.prototype.hidden=function(){
			this.element.style.display="none";
		}
		List.prototype.toggle=function(){
			if(this.element.style.display == "none"){
				this.display();
			}else{
				this.hidden();
			}
		}
		panel.list=new List();


		//--------------------------------------------------
		// panel pin
		//--------------------------------------------------
		panel.pin={
			parent: panel
			,_pins: []
			,_hashTable: {}
		};
		panel.pin.element=document.createElement("p");
		panel.pin.hash=function(url){
			return url.replace(/[^a-zA-Z0-9-_]/g,"");
		}
		panel.pin.update=function(){
			this.element.innerHTML=this._pins.length;
			this.parent.list.update();
		}
		panel.pin.toggle=function(item,cache){
			var url=(cache) ? item.cache : item.url;
			if(this._hashTable[this.hash(url)]){
				this.remove(item,cache);
			}else{
				this.add(item,cache);
			}
		}
		panel.pin.add=function(item,cache){
			if(!item) return ;
			var url=(cache) ? item.cache : item.url;
			if(!url) return;
			if(cache){
				var title="(cache)"+item.title;
				var element=item.cacheElement;
				items.addClass("pinnedCache");
			}else{
				var title=item.title;
				var element=item.element;
				items.addClass("pinnedItem");
			}
			var key=this.hash(url);
			if(this._hashTable[key]) return;
			this._hashTable[key]=item;
			this._pins.push({
				url:url
				,title:title
				,element:element
				,isCacheitem: cache
				,num: element.id.match(/[0-9]+/)
			});
			this.update();
		}
		panel.pin.remove=function(item,cache){
			if(cache){
				var url=item.cache || item.url;
				items.removeClass("pinnedCache",item.num);
			}else{
				var url=item.url;
				items.removeClass("pinnedItem",item.num);
			}
			var key=this.hash(url);
			if(!this._hashTable[key]) return;
			for(var i=0,l=this._pins.length; i<l; i++){
				if(this._pins[i].url == url){
					this._pins.splice(i,1);
					this._hashTable[key]=false;
					this.update();
					break;
				}
			}
		}
		panel.pin.clear=function(){
			var i=0;
			while(this._pins[i]){
				var pin=this._pins[i];
				this.remove(
					pin
					,pin.isCacheitem
				);
			}
			items.clearClasses();
			this.update();
		}
		panel.pin.openAll=function(){
			for(var i=0,l=this._pins.length; i<l; i++){
				var pin=this._pins[i];
				window.openLater(pin.url);
			}
			this.clear();
			items.clearClasses();
		}
		panel.pin.open=function(num){
			window.open(this._pins[num].url);
			this.remove(this._pins[num].url);
		}



		//--------------------------------------------------
		// Items
		//--------------------------------------------------
		function Items(){
			this.scrollHeight;
			this._items=[];
			this.current=-1;
			this.allItems();
		};

		Items.prototype.adjust=function(){
			var pos=document.documentElement.scrollTop || document.body.scrollTop;
			for(var i=0,len=this._items.length; i<len; i++){
				if(this._items[i].offsetTop > pos){
					break;
				}
			}
			this.current=(i-1);
		}
		Items.prototype.allItems=function(){
			if(this._items.length > 0 && document.documentElement.scrollHeight == this.scrollHeight)
			  return this._items;
			this.scrollHeight = document.documentElement.scrollHeight;
			var xpath = 'id("res")//div[contains(@class,"g")]';
			var div = document.evaluate(xpath, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
			this._items=[];
			for(var i=0,l=div.snapshotLength; i<l; i++){
				div.snapshotItem(i).id="item_"+(1+i);
				this._items.push(div.snapshotItem(i));
			}
			return this._items;
		}
		Items.prototype.focus=function(){
			//location.hash="item_"+(this.current);
			if(this._items[this.current]){
				var y=this._items[this.current].offsetTop;
				scrollTo(0,y);
			}
		}
		Items.prototype.prev=function(){
			this.adjust();
			if(this.current > 0) this.current--;
			this.focus();
		}
		Items.prototype.next=function(){
			this.adjust();
			this.allItems();
			if(this.current < this._items.length) this.current++;
			this.focus();
		}
		Items.prototype.top=function(){
			this.current=0;
			this.focus();
		}
		Items.prototype.bottom=function(){
			this.current=this._items.length-1;
			this.focus();
		}
		Items.prototype.getItem=function(num){
			var num=num || this.current;
			var item=this._items[num];
			try{
				var _a=item.getElementsByTagName("h2")[0].getElementsByTagName("a")[0];
				var url=_a.href;
				var title=_a.innerHTML;
			}catch(e){
				
			}
			try{
				var nobr=item.getElementsByTagName("nobr")[0].getElementsByTagName("a");
				for(var i=0,l=nobr.length; i<l ;i++){
					if(nobr[i].href.indexOf("q=cache:") > -1){
						var cacheURL=nobr[i].href;
						var cache=nobr[i];
					}else if(nobr[i].href.indexOf("q=related:") > -1){
						var relatedURL=nobr[i].href;
						var related=nobr[i];
					}
				}
			}catch(e){
				
			}
			return {
				element: item || {}
				,url: url || ""
				,title: title || ""
				,cache: cacheURL || ""
				,cacheElement: cache
				,related: relatedURL
				,relatedElement: related
			};
		}
		Items.prototype.addClass=function(name,num){
			var key=num || this.current;
			var item=this._items[key];
			var cls=(item.className + " ").split(" ");
			cls.push(name);
			item.className=cls.join(" ");
		}
		Items.prototype.removeClass=function(name,num){
			var key=num || this.current;
			var item=this._items[key];
			var cls=item.className.split(" ");
			for(var i=0,l=cls.length; i<l; i++){
				if(cls[i]==name){
					cls.splice(i,1);
				}
			}
			item.className=cls.join(" ");
		}
		Items.prototype.clearClasses=function(){
			for(var i=0,l=this._items.length; i<l; i++){
				this.removeClass("pinnedItem",i);
				this.removeClass("pinnedCache",i);
			}
		}
		var items=new Items();
		if(items.allItems().length == 0){
			return ;
		}



		//--------------------------------------------------
		// keybind
		//--------------------------------------------------
		var keybind={
		}
		keybind.keycode2char=function(e){
			var kc=e.keyCode;
			// based on LDR(event.js)
			var between = function(a,b){
				return a <= kc && kc <= b
			}
			
			var _32_40 = "space pageup pagedown end home left up right down".split(" ");
			var kt = {
				8  : "back",
				9  : "tab",
				10 : "enter",
				13 : "enter",
				16 : "shift",
				17 : "ctrl",
				44 : ",",
				46 : ".",
				47 : "/",
				58 : ":", // keypress
				60 : "<", // keypress
				62 : ">", // keypress
				63 : "?", // keypress
				191: "?", // keydown
				91 : "[",
				93 : "]",
				
				188: "<",
				190: ">",
				219: "[",
				221: "]",

				229: "IME"
			};
			unsafeWindow.kt = kt;
			var result=(function(){return (
				between(65,90)  ? String.fromCharCode(kc+32) : // keydown  a-z
				between(97,122) ? String.fromCharCode(kc) :    // keypress a-z
				between(48,57)  ? String.fromCharCode(kc) :    // 0-9
				between(96,105) ? String.fromCharCode(kc-48) : // num 0-9
				between(32,40)  ? _32_40[kc-32] :
				kt.hasOwnProperty(kc) ? kt[kc] : 
				"null"
			)})();
			result=(e.shiftKey) ? "S-"+result : result;
			result=(e.ctrlKey)? "C-"+result : result;
			result=(e.altKey || e.metaKey)? "A-"+result : result;
			//alert(result + "/" + kc);
			return result;
		};
		keybind.callback=function(key,func){
			var func=func || function(){};
			func();
		}

		var help=document.createElement("div");
		help.id="ldr_help";
		css.addRule("#ldr_help"
			,[
				"position:fixed"
				,"bottom:10px"
				,"right:10px"
				,"width:50%"
				,"background:#fff"
				,"border:2px solid #333"
			].join(";")
		);
		help.style.display="none";
		help.table=document.createElement("table");
		help.appendChild(help.table);


		//**************************************************
		// event
		//**************************************************
		function eh(e){
			var ch=keybind.keycode2char(e);
			if(keybinds.has(ch)){
				keybind.callback(ch,keybinds.call(ch));
				e.preventDefault();
			}
		}
		function EventHandler(){
			this._enabled=false;
			this.listener=(window.opera)? "keypress" : "keydown";
			this.target=document.getElementsByTagName("html")[0];
		}
		EventHandler.prototype.toggle=function(){
			if(this._enabled){
				this.disable();
			}else{
				this.enable();
			}
		}
		EventHandler.prototype.enable=function(e){
			if(this._enabled == false){
				this.target.addEventListener(this.listener,eh,true);
				this._enabled=true;
			}
		}
		EventHandler.prototype.disable=function(){
			
			if(this._enabled == true){
				this.target.removeEventListener(this.listener,eh,true);
				this._enabled=false;
			}
		}

		var ev=new EventHandler();


		var textfields=document.getElementsByName("q");
		for(var i=0;i<textfields.length;i++) {
			var textfield = textfields[i];
			textfield.addEventListener("keydown" , function(e){
				var ch=keybind.keycode2char(e);
				if(ch == "C-["){ // alternative ESC
					document.getElementsByName("btnG")[0].focus();
					//ev.enable();
				}
			}, false);
			textfield.addEventListener("focus", function(){
				ev.disable();
			}, false);
			textfield.addEventListener("blur", function(){
				ev.enable();
			}, false);
		}




		//**************************************************
		// setup
		//**************************************************
		ev.enable();
		panel.pin.update();
		panel.appendChild(panel.pin.element);
		panel.appendChild(panel.list.element);
		panel.addEventListener("mouseover", function(){
			panel.list.display();
		}, false);
		panel.addEventListener("mouseout", function(){
			panel.list.hidden();
		}, false);


		function Keybinds(){
			this._keys=[];
			this.help=[];
		}
		Keybinds.prototype.register=function(ch,man,func){
			var chars=(ch+" ").split(" ");
			var keys=[];
			for(var i in chars){
				if(!chars[i]) continue;
				this._keys.push({
					ch: chars[i]
					,man: man
					,func: func
				});
				if(typeof chars[i] == "string"){
					keys.push(""+chars[i].escapeHTML());
				}
			}
			this.help.push([
				'<tr>'
				,'<th><kbd>',keys.join('</kbd> / <kbd>'),'</kbd></th>'
				,'<td>',man,'</td>'
				,'</tr>'
			].join(""));
		}
		Keybinds.prototype.find=function(ch){
			for(var i=0,l=this._keys.length; i<l; i++){
				if(this._keys[i].ch == ch){
					return this._keys[i];
				}
			}
			return false;
		}
		Keybinds.prototype.has=function(ch){
			return this.find(ch);
		}
		Keybinds.prototype.call=function(ch){
			this.find(ch)["func"]();
		}


		//**************************************************
		// keybinds setting
		//**************************************************
		var keybinds=new Keybinds();

		// [space] separeted keys are same oprerations
		// ex. "j enter","v S-enter"
		keybinds.register(
			"p"
			,"pin current url"
			,function(){
				panel.pin.toggle(items.getItem());
			}
		);
		keybinds.register(
			"S-p"
			,"pin current url(cache page)"
			,function(){
				panel.pin.toggle(items.getItem(),true);
			}
		);
		keybinds.register(
			"l"
			,"pinlist show/hide"
			,function(){ // pin list show/hide
				panel.list.toggle();
			}
		);
		keybinds.register(
			"o"
			,"open all pins (and clear pins)"
			,function(){ // open all pins(and clear pins)
				panel.pin.openAll();
			}
		);
		keybinds.register(
			"C-S-c"
			,"clear pins"
			,function(){ // clear all pins
				panel.pin.clear();
			}
		);
		keybinds.register(
			"c"
			,"snippet(description text) hide/show"
			,function(){ // description text hide/show
				css.toggle("div.g table","display:none;","ldr_text");
			}
		);
		keybinds.register(
			"v C-enter"
			,"open current url"
			,function(){ // open current url
				var item=items.getItem();
				window.open(item.url);
			}
		);
		keybinds.register(
			"S-v C-S-enter"
			,"open current url(cache)"
			,function(){ // open current url(cache page)
				var item=items.getItem();
				window.open(item.cache);
			}
		);
		keybinds.register(
			"f"
			,"focus search field"
			,function(){ // focus textfield
				scrollTo(0,0);
				document.getElementsByName("q")[0].focus();
			}
		);
		keybinds.register(
			"S-f"
			,"focus search field and select text"
			,function(){ // focus textfield and selected text
				var q=document.getElementsByName("q")[0];
				scrollTo(0,0);
				q.focus();
				q.select();
			}
		);
		keybinds.register(
			"S->"
			,"next page"
			,function(){ // next page
				var d=document.getElementById("nn");
				if(d){
					location.href=d.parentNode.href;
				}
			}
		);
		keybinds.register(
			"S-<"
			,"prev page"
			,function(){ // prev page
				var d=document.getElementById("np");
				if(d){
					location.href=d.parentNode.href;
				}
			}
		);
		keybinds.register(
			"j enter"
			,"next item"
			,function(){
				items.next();
			}
		);
		keybinds.register(
			"S-j"
			,"first item"
			,function(){
				items.bottom();
			}
		);
		keybinds.register(
			"k S-enter"
			,"prev item"
			,function(){
				items.prev();
			}
		);
		keybinds.register(
			"S-k"
			,"last item"
			,function(){
				items.top();
			}
		);
		keybinds.register(
			"S-?"
			,"help show/hide"
			,function(){
				help.style.display=(help.style.display == "none") ? "block" : "none";
			}
		);
		help.table.innerHTML=keybinds.help.join("");


		document.body.appendChild(panel);
		document.body.appendChild(help);

	}; // setup() end

	if(!window.opera){
		setup();
	}else{
		//if opera, to start script press Ctrl+Shift (performance issue)
		document.addEventListener(
			"keydown"
			,function(e){
				if(e.ctrlKey && e.shiftKey){
					var preparing=document.createElement("p");
					preparing.innerHTML="building...";
					preparing.style.background="#f88";
					preparing.style.position="fixed";
					preparing.style.top="10px";
					preparing.style.right="10px";
					document.body.appendChild(preparing);
					setTimeout(
						function(){
							setup();
							document.body.removeChild(preparing);
						}
						,10
					);
					document.removeEventListener(
						"keydown"
						,arguments.callee
						,false
					);
				}
			}
			,false
		);
	}
})();

