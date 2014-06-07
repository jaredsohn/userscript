// ==UserScript==
// @name           haiku_entry_eraser
// @namespace      http://h.hatena.ne.jp/caxifb
// @include        http://h.hatena.ne.jp/*
// @exclude        http://h.hatena.ne.jp/
// ==/UserScript==

(function(w){

	function start(){
		if (menu.init()){
			menu.create('++',onclickMultiple);
			menu.create('clear',onclickClear);
			menu.ready('cancel',function(){
				menu.erase();
				execute.cancel= true;
				pager.cancel= true;
			});
		}
		function onclickMultiple(){
			var count= parseInt( prompt('Number of the pages to include'), 10 );
			if (isNaN(count)){
				return;
			}
			menu.ready();
			pager.init();
			pager.max= count;
			pager.callLater(startDeletion);
			pager.repeat();
		}
		function onclickClear(){
			if (!confirm('Delete your entries in this document?')){
				return;
			}
			menu.ready();
			startDeletion();
		}
		function startDeletion(){
			execute.callLater(function(){ menu.erase() });
			execute.deleteEntry();
		}
	}

	var menu={
		init: function(){
			var container= fromSelector('div.stream-mode ul')[0];
			if (container){
				this._items= [];
				this._li= container.appendChild( document.createElement('li') );
				return true;
			}
		},
		create: function(title,callback){
			this._items.push( this._createMenu(title,callback) );
		},
		ready: function(title,callback){
			if (callback){
				this._after= [title,callback];
			}
			else{
				this._items.forEach(function(elem){
					elem.parentNode.removeChild(elem);
				});
				this._after && this._createMenu.apply(this,this._after);
			}
		},
		erase: function(){
			this._li.parentNode && this._li.parentNode.removeChild(this._li);
		},
		_createMenu: function(title,callback){
			var a= this._li.appendChild( document.createElement('a') );
			a.style.cursor= 'pointer';
			a.appendChild( document.createTextNode(title) );
			a.addEventListener('click', callback, false);
			return a;
		}
	};

	var pager={
		max: 0,
		cancel: false,
		init: function(){
			if (this._img){
				return;
			}
			this._img= fromSelector('div.pager img')[0];
			this._link= fromSelector('div.pager a')[0];
			this._counter= 0;
		},
		repeat: function(){
			if (this.cancel){
				return;
			}
			if (this.max <= this._counter ){
				this._callback();
				return;
			}
			if (this._img.style.display=='none'){
				this._callback();
				return;
			}
			var self= this;
			setTimeout(function(){ self._click() }, rand(500,1500) );
		},
		callLater: function(callback){
			this._callback= callback;
		},
		_click: function(){
			if (this._is_loading()){
				return;
			}
			var e= w.document.createEvent('MouseEvents');
			e.initEvent('click',true,true);
			this._link.dispatchEvent(e);

			var self= this;
			this._wait(function(){
				self._counter++;
				self.repeat();
			});
		},
		_is_loading: function(){
			return /on\.gif/.test(this._img.src) && this._img.style.display!='none';
		},
		_wait: function(callback){
			var self= this;
			this._timer= setInterval(function(){
				if (!self._is_loading()){
					clearInterval(self._timer);
					callback();
				}
			},250);
		}
	}

	var execute={
		cancel: false,
		_done: {},
		_counter: 0,
		deleteEntry: function() {
			if (!this._start){
				this._start= new Date();
			}
			var img= fromSelector('div.entry img.delete-icon')[0];
			this._span= img? img.parentNode: img;
			if (!this._span || this.cancel){
				this._end();
				return;
			}
			this._span.id.match(/\-([0-9]+)$/);
			this.entryID = RegExp.$1;

			var rks = w.Hatena.Visitor.RKS;
			if (!this.entryID || !rks) return;

			if (this._done[this.entryID]){
				this._removeEntryNode(1);
				return;
			}
			var self= this;
			GM_xmlhttpRequest({
				method: 'POST',
				url: 'http://h.hatena.ne.jp/entry.delete.json',
				headers:{
					'Content-Type': 'application/x-www-form-urlencoded'
				},
				data: w.Ten.XHR.makePostData({
					entry_id: self.entryID,
					rks: rks
				}),
				onload: function(){
					self._counter++;
					self._removeEntryNode();
					self._done[self.entryID]= true;
				}
			});
		},
		callLater: function(callback){
			this._after= callback;
		},
		_removeEntryNode: function(msec) {
			var obj = this._span;
			while (obj = obj.parentNode) {
				if (obj.className == 'entry')
					break;
			}
			obj.parentNode.removeChild(obj);
			var self= this;
			this._timer= setTimeout(
				function(){
					self.deleteEntry()
				},
				msec || rand(500,2500)
			);
		},
		_end: function(){
			this._after && this._after();
			clearTimeout(this._timer);
			alert(
				''+this._counter+' entries are erased'+
				'\n\n[start]\n' + this._start + '\n\n[end]\n' + new Date );
		}
	};

	function rand(a,b){
		return Math.floor( 1+ (b-a+1)*Math.random() ) +(a-1);
	}
	function fromSelector(sel){
		return w.Ten.Selector.getElementsBySelector(sel);
	}

	start();

})(unsafeWindow);
