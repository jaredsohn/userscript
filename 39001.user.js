// ==UserScript==
// @name           haiku_i_search
// @namespace      http://h.hatena.ne.jp/caxifb
// @include        http://h.hatena.ne.jp/*
// ==/UserScript==

(function(w){

	var debug = false;
	var skkUser = false;
	
	function start(env){
		var container = new CompletionContainer(env.renderer).hide();
		var request = new Request({});
		var search = wait( 250, function(){
			var keyword = env.input.value.replace(/(^\s+|\s+$)/g,' ');
			if (/^$/.test(keyword)){
				return;
			}
			var timestamp = new Date().getTime();
			keyword = InputMethod.filter(keyword);
			log('searching for...',keyword);

			request.cancel();
			request = KeywordModel.search( keyword, function(ul){
				container.updateList(ul);
			});
			request.before(function(){
				container.show().status.clear().append(
					loadingImage,
					'searching for [ ' + keyword + ' ]' );
			});
			request.after(function(){
				container.status.clear().append(
					( new Date().getTime() - timestamp ) / 1000 ,
					' sec [ ' + keyword + ' ]' );
			});
			request.execute();
		});
		var loadingImage = createLoadingImage({ margin:'0px 7px 0px 0px' });
		var watch = new ChangeWatcher(env.input,'value',search);
			watch.every(130);
			watch.autostop(15*1000);

		var onKeydown = function(e){
			if ( 27 == e.keyCode || 9 == e.keyCode ){
				// Esc or Tab
				container.hide();
				watch.detach();
				return;
			}
			watch.attach();
		}
		var onKeyup = function(e){
			if ( 27 != e.keyCode && 9 != e.keyCode ){
				watch.attach();
			}
		}
		var onMouseup = function(e){
			if (!container.has(e.target) && e.target!=env.input){
				container.hide();
				watch.detach();
			}
		}
		var onFocus = function(){
			request.url && container.show();
		}
		var onBlur = function(){
			watch.detach();
		}

		env.input.addEventListener('keydown',onKeydown,false);
		env.input.addEventListener('keyup',onKeyup,false);
		env.input.addEventListener('focus',onFocus,false)
		env.input.addEventListener('blur',onBlur,false)

		w.addEventListener('mouseup',onMouseup,false);
	}

	function ready(){
		var input = fromSelector('div.streambody form.search-form input').shift();
		if (input){
			input.style.width = '50%';
			return { input:input, renderer:forKeywordPage }
		}
		input = fromSelector('#rightbar ul.list-keyword input.text').shift();
		if (input){
			return { input:input, renderer:forRightBar }
		}
		var ul = fromSelector('#rightbar ul.list-keyword').shift();
		if (ul){
			var li = ul.insertBefore( create('li'),ul.firstChild );
			li.innerHTML =
				'<form action="/keywords" class="search-keyword" method="get">'+
					'<input name="word" value="" class="text" type="text">'+
					'<input class="submit" value="Search" type="submit">'+
				'</form>';

			input = fromSelector('input.text',li).shift();
			return { input:input, renderer:forRightBar }
		}

		function forKeywordPage(box){
			var pos = getPosition(input);
			var [x,y] = [ input.offsetWidth + pos.x , input.offsetHeight + pos.y ];
			with(box.style){
				top =  y + 5 + 'px';
				left = x + 5 + 'px';
				width = innerWidth - x - 50 + 'px';
				maxHeight = innerHeight - y - 50 + 'px';
			}
		}
		function forRightBar(box){
			var pos = getPosition(input);
			var [x,y] = [ pos.x, pos.y ];
			var scroll = document.documentElement.scrollTop;
			var diff = scroll + innerHeight - y;
			if (diff < innerHeight/2){
				with(box.style){
					top = box.offsetHeight ?
						( y - box.offsetHeight + input.offsetHeight +  'px' ):
						( y + 'px' );

					right = innerWidth - 10 - x + 'px';
					width = input.offsetWidth*3 + 'px';
					maxHeight = innerHeight - diff - 50 + input.offsetHeight + 'px';
				}
			}
			else{
				with(box.style){
					top =  y + 'px';
					right = innerWidth - 10 - x + 'px';
					width = input.offsetWidth*3 + 'px';
					maxHeight = scroll + innerHeight - y - 25 + 'px';
				}
			}
		}
	}

	var CompletionContainer = function(obj){
		this.initialize(obj);
	};
	CompletionContainer.prototype={
		initialize: function(renderer){
			this._box = document.body.appendChild( create('div') );

			var o = CompletionContainerElement;
			this.status= new o ( this._box.appendChild( create('div') ) );
			this.canvas= new o ( this._box.appendChild( create('div') ) );

			with(this._box.style){
				border     = '3px solid #cccccc';
				opacity    = '0.95';
				lineHeight = '1em';
				textAlign  = 'left';
				overflow   = 'auto';
				position   = 'absolute';
			}
			with(this.status.element.style){
				backgroundColor = '#7BA86D';
				color    = 'white';
				fontSize = '90%';
				padding  = '5px 3px 3px 3px';
				textAlign= 'right';
			}
			this._renderer = renderer;
		},
		show: function(){
			this._box.style.display = '';
			this._renderer(this._box);
			return this;
		},
		hide: function(){
			this._box.style.display = 'none';
			return this;
		},
		updateList: function(ul){
			this.canvas.clear().append(ul);
			this._box.scrollTop = 0;
			this._renderer(this._box);
		},
		has: function(elem){
			while(elem){
				if (elem==this._box){
					return true;
				}
				elem = elem.parentNode;
			};
			return false;
		}
	};

	var CompletionContainerElement = function(elem){
		this.element = elem;
	};
	CompletionContainerElement.prototype={
		clear: function(){
			var elem = this.element;
			while(elem.firstChild){
				elem.removeChild(elem.firstChild);
			}
			return this;
		},
		append: function(){
			var tmp = [].slice.call(arguments,0);
			for each( var obj in tmp ){
				this.element.appendChild(
					( typeof obj == typeof {} ) ?
						obj : document.createTextNode( '' + obj )
				);
			}
		}
	};

	var ChangeWatcher = function(obj,prop,listener){
		this._pause = true;
		this._interval = 100;

		this._object = obj;
		this._property = prop;
		this._listener = listener;
	}
	ChangeWatcher.prototype = {
		attach: function(){
			if (this._pause){
				var self = this;
				this._timer = setInterval(function(){ self._check() },this._interval);
				this._pause = false;
			}
		},
		detach: function(){
			if(!this._pause){
				this._timer && clearInterval(this._timer);
				this._pause = true;
			}
		},
		every: function(msec){
			this._interval = msec;
		},
		autostop: function(msec){
			var self = this;
			this._wait = wait(msec || 1000, function(){ self.detach() });
		},
		_check: function(){
			var obj = this._object;
			var value = this._object[this._property];
			if (value != this._prev){
				this._listener(value,this._prev);
				this._wait && this._wait();
			}
			this._prev = value;
		}
	};

	var Request = function(args){
		this._before = [];
		this._after = [];
		this._parser = function(text){ return text };
		if (args.onload){
			this.after(args.onload);
		}
		this.url = args.url;
		this.method = args.method || 'get';
		this.useCache = false;
	};
	Request.prototype = {
		_cache: {},

		cancel: function(bool){
			this._cancel = bool !== false;
		},
		before: function(fn){
			this._before.push(fn);
		},
		after: function(fn){
			this._after.push(fn);
		},
		parseWith: function(parser){
			this._parser = parser;
		},
		execute: function(){
			for each( var listener in this._before ){
				listener.call(listener);
			}
			var cache, self=this;
			if (this.useCache && ( cache=this._cache[this.url] )){
				setTimeout(function(){ self._onLoad(cache) },10);
				return;
			}
			log('loading...',this.url);
			GM_xmlhttpRequest({
				method: this.method || 'get',
				onload: function(result){
					self.useCache && ( self._cache[self.url] = result.responseText );
					self._onLoad(result.responseText);
				},
				url: this.url
			});
		},
		_onLoad: function(text){
			text = this._parser(text);
			if (this._cancel){
				log('canceled...',this.url);
				return;
			}
			for each( var listener in this._after ){
				listener.call(listener,text);
			}
		}

	};

	var KeywordModel={
		search: function(word,callback){
			var request = new Request({
				url   : 'http://h.hatena.ne.jp/keywords?word=' + word,
				onload: callback
			});
			request.useCache = true;
			request.parseWith(parse);
			return request;

			function parse(str){
				var div = create('div');
				var txt = str.slice(
					str.indexOf('<ul class="list-search"'),
					str.indexOf('<div class="pager"')
				);
				div.innerHTML = txt;
				var list = div.getElementsByTagName('li');
				if (list[0].className=='search'){
					list[0].parentNode.removeChild(list[0]);
				}
				return div.getElementsByTagName('ul')[0];
			}
		}
	};

	var InputMethod={
		filter: function(str){
			if (skkUser){
				var reg = new RegExp( unescape("%u25BC") +"|"+ unescape("%u25BD") );
				return str.replace(reg,'');
			}
			return str;
		}
	};

	function log(){
		debug && w.console.log.apply(w.console.log,arguments);
	}
	function fromSelector(sel,base){
		return w.Ten.Selector.getElementsBySelector(sel,base);
	}
	function getPosition(element){
		return w.Ten.Geometry.getElementPosition(element);
	}
	function create(tag){
		return document.createElement(tag);
	}
	function wait(msec,callback){
		var timer;
		return function(){
			var args=arguments;
			timer && clearTimeout(timer);
			timer = setTimeout(function(){
				callback.apply(this,args)
			},msec);
		}
	}
	function createLoadingImage(style){
		/*
		 * thanks for
		 *    http://www.ajaxload.info/
		 *    http://www.kawa.net/works/js/data-scheme/base64.html
		 */
		var data = 'data:image/gif;base64,'+
			'R0lGODlhKwALAPEAAHuobf///7rRs////yH+GkNyZWF0ZWQgd2l0aCBhamF4bG9hZC5pbmZvACH5'+
			'BAAKAAAAIf8LTkVUU0NBUEUyLjADAQAAACwAAAAAKwALAAACMoSOCMuW2diD88UKG95W88uF4DaG'+
			'WFmhZid93pq+pwxnLUnXh8ou+sSz+T64oCAyTBUAACH5BAAKAAEALAAAAAArAAsAAAI9xI4IyyAP'+
			'YWOxmoTHrHzzmGHe94xkmJifyqFKQ0pwLLgHa82xrekkDrIBZRQab1jyfY7KTtPimixiUsevAAAh'+
			'+QQACgACACwAAAAAKwALAAACPYSOCMswD2FjqZpqW9xv4g8KE7d54XmMpNSgqLoOpgvC60xjNonn'+
			'yc7p+VKamKw1zDCMR8rp8pksYlKorgAAIfkEAAoAAwAsAAAAACsACwAAAkCEjgjLltnYmJS6Bxt+'+
			'sfq5ZUyoNJ9HHlEqdCfFrqn7DrE2m7Wdj/2y45FkQ13t5itKdshFExC8YCLOEBX6AhQAADsAAAAA'+
			'AAAAAAA=';

		var img = create('img');
		img.src = data;
		for(var i in style){
			img.style[i] = style[i];
		}
		return img;
	}

	var env = ready();
	if (env){
		start(env);
	}

})(unsafeWindow);

