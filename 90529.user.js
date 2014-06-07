// ==UserScript==
// @name              ImageViewer
// @author            modestein
// @description       让Firefox上的图片浏览更加舒适
// @create            2010-10-01
// @lastmodified      2010-10-12
// @version           0.11
// @namespace         modestein
// @include           *
// ==/UserScript==

const IV_TITLE         = "Image Viewer";
const IV_TRIGGER_KEY   = 17;

const IV_CLS_CONTAINER = "container";
const IV_CLS_IMGCELL   = "imgcell";
const IV_CLS_TABLE     = "table";
const IV_CLS_TABLEROW  = "tablerow";
const IV_CLS_TABLECELL = "tablecell";
const IV_CLS_TMBCELL   = "tablecell thumbnail";
const IV_CLS_TIPCELL   = "tablecell description";
const IV_CLS_MASK      = "mask";
const IV_CLS_HIDE      = "hide";
const IV_KDN_PIXEL     = 20;
const IV_KDC_PIXEL     = 200;
const IV_CTR_KEYS      = ["altKey","ctrlKey","shiftKey"];
const IV_KEY_HOST      = "iv_key_host";
const IV_REX_CSSURI    = /url\(\s*(['"]?)(.*?)\1\s*\)/g;
const IV_LST_CSSIMG    = ["background-image", "list-style-image"];
const IV_VWR_ZOOMRATE  = [.01, .02, .03, .05, .07, .1, .15, .2, .3, .5, .7, 1, 1.5, 2, 3, 5, 7, 10, 20, 30, 50, 70, 100];
const IV_HKM_VIEWER    = [["023,061","moveToLast"],["024,067","moveToFirst"],["022,063","moveForward"],["021,069","moveBackward"],
                         ["06b","zoomIn"],["06d","zoomOut"],["025,064","lookLeft"],["027,066","lookRight"],["026,068","lookUp"],
                         ["028,062","lookDown"],["00d,01b","close"],["06a","setFitViewMode"],["06f","setNoResizeMode"],
                         ["225","quickLookLeft"],["227","quickLookRight"],["226","quickLookUp"],["228","quickLookDown"],
                         ["125","reverseX"],["126","reverseY"],["127","setFitWidthMode"],["128","setFitHeightMode"],
                         ["1dc","setFixedRateMode"],["03b","setNoMoveMode"],["04c","setMoveToLastMode"],["04b","setMoveToSetMode"],
                         ["325","rotate90"],["327","rotate270"],["044,065,00c","drawImage"]];
const IV_HKM_EXPLORER  = [["00d,01b","close"]];
const IV_MTX_TRANSFORM = [[[1,0,0,1,0,0],[0,-1,1,0,0,1],[-1,0,0,-1,1,1],[0,1,-1,0,1,0]],
                         [[-1,0,0,1,1,0],[0,-1,-1,0,0,0],[1,0,0,-1,0,1],[0,1,1,0,1,1]],
                         [[1,0,0,-1,0,1],[0,1,1,0,1,1],[-1,0,0,1,1,0],[0,-1,-1,0,0,0]],
                         [[-1,0,0,-1,1,1],[0,1,-1,0,1,0],[1,0,0,1,0,0],[0,-1,1,0,0,1]]];
const each             = Array.forEach;
const IV_PTN_LAUNCH    = "d$,u$,d$".split("$").join(IV_TRIGGER_KEY);

function $(s, e){
	return (e || document).querySelector(s);
}

function $$(s, e){
	return (e || document).querySelectorAll(s);
}

function listen(ev, cb, el){
	(el || window).addEventListener(ev, cb, false);
}

function unlisten(ev, cb, el){
	(el || window).removeEventListener(ev, cb, false);
}

function limit(n, lower, upper){
	return n < lower ? lower : n > upper ? upper : n;
}

function stop(e){
	e.stopPropagation();
	e.preventDefault();
	return false;
}

function getKeyState(e){
	for(var i = 0, s = 0; i < 3; i++) s |= e[IV_CTR_KEYS[i]] << i;
	return s;
}

function getHotkeyHandler(map){
	return function(e){
		var state = getKeyState(e), key = e.keyCode;
		map.some(function(p){
			for each(var k in p[0].split(","))
				if(k[0] == state && parseInt(k.slice(1), 16) == key){
					this[p[1]]();
					return !stop(e);
				}
		}, this.$);
	}
}

function isAvailable(img){
	return img.complete && img.naturalWidth && img.naturalHeight;
}

function parseURI(url){
	try{ url = decodeURI(url) } catch(e){};
	return url;
}

function newClass(constructor, prototype, inherits){
	constructor.prototype = prototype || {};
	if(inherits) for each(var i in inherits){
		for(var m in i.prototype || {}){
			constructor.prototype[m] = i.prototype[m];
		}
	}
	return constructor;
}

let OO = {
	getClass: function(obj){
		return Object.prototype.toString.call(obj).slice(8, -1);
	},
	isArray: function(obj){
		return this.getClass(obj) == "Array";
	},
	Collection: newClass(
		function(){
			this.array = [];
		}, {
			add: function(el){
				this.array.push(el);
			},
			remove: function(el){
				let(a = this.array) a.splice(a.indexOf(el), 1);
			},
			getNext: function(el, previous){
				var a = this.array, i = a.indexOf(el);
				previous ? i-- : i++;
				if(~i && i < a.length) el = a[i];
				return el;
			},
			get first(){
				return this.array[0];
			},
			get last(){
				return this.array[this.array.length - 1];
			},
			get length(){
				return this.array.length;
			}
		}),
	Enum: newClass(
		function(csv){
			this.dic = {};
			csv && csv.split(",").forEach(function(i) this.add(i) ,this);
		}, {
			add: function(key){
				this.dic[key] = null;
			},
			exists: function(key){
				return key in this.dic;
			},
			get values(){
				var values = [];
				for(var i in this.dic) values.push(i);
				return values;
			}
		}),
	redo: function(st, n){
		for(var a = []; n--;) a.push(st());
		return a;
	},
	initHandlers: function(obj){
		for(var m in obj)
			if(~m.indexOf("__")) obj[m] = { $: obj, handleEvent: obj[m] };
	}
};

let DOM = {
	$: function(xpath, root){
		var got = document.evaluate(xpath, root || document, null, null, null), result = [];
		while(next = got.iterateNext()) result.push(next);
		return result;
	},
	setAttributes: function(el, prop){
		for(var p in prop) el.setAttribute(p, prop[p]);
	},
	removeAttributes: function(el, dic){
		var props = {};
		each(el.attributes, function({name:n, value:v}){
			if(!dic.exists(n)){
				props[n] = v;
				el.removeAttribute(n);
			}
		});
		return props;
	},
	create: function(name, prop){
		var el = document.createElement(name);
		this.setAttributes(el, prop);
		return el;
	},
	append: function(){
		var a = arguments, i;
		if(a.length > 1){
			(i = +OO.isArray(a[0])) && a[0].forEach(function(n) a[1].appendChild(n));
			for(; i < a.length - 1; i++){
				a[i + 1].appendChild(a[i]);
			}
		}
		return a[i];
	},
	removeChildren: function(node){
		each(node.childNodes, function(n) n.parentNode.removeChild(n));
	}
};

let keyLogger = {
	max: 50,
	list: [],
	reset: function(){
		this.list = [];
	},
	log: function(e){
		this.list.push({
			code: e.type[3] + e.keyCode,
			time: e.timeStamp
		});
		this.list.length > this.max && this.list.shift();
	},
	matches: function(exp, time){
		var c = exp.split(","), x, l, k;
		l = k = this.list.length, k--;
		if(l < c.length) return false;
		while(x = c.pop()){
			if(this.list[--l].code != x) return false;
		}
		return this.list[k].time - this.list[l].time <= time;
	}
};

let IV = {}, mouseX, mouseY;
IV.document = new (newClass(
	function(){
		this.root = document.documentElement;
		this.container = document.body;
		OO.initHandlers(this);
		this.ondisplay(true);
	}, {
		launchExplorer: function(){
			(new IV.explorer).display(true);
		},
		ondisplay: function(b){
			if(b){
				keyLogger.reset();
				listen("keyup", this.__keyup);
				listen("keydown", this.__keydown);
			} else{
				unlisten("keyup", this.__keyup);
				unlisten("keydown", this.__keydown);
			}
		},
		__keyup: function(e){
			keyLogger.log(e);
		},
		__keydown: function(e){
			keyLogger.log(e);
			if(keyLogger.matches(IV_PTN_LAUNCH, 300)){
				this.$.launchExplorer();
			}
		}
	}));
IV.element = newClass(
	function(){
	}, {
		display: function(b){
			if(b){
				this.root.style.display = this._display;
			} else{
				this._display = this._root.style.display;
				this.root.style.display = "none";
			}
		},
		addHandler: function(ev, cb){
			listen(ev, cb, this.root);
		},
		removeHandler: function(ev, cb){
			unlisten(ev, cb, this.root);
		}
	});
IV.main = newClass(
	function(){
	}, {
		init: function(css){
			this.srcDoc = document.documentElement;
			this.root = DOM.create("html");
			var body = this.body = DOM.create("body");
			var head = DOM.create("head");
			var style = DOM.create("style");
			style.textContent = css;
			DOM.append(style, head, this.root);
			this.container = new IV.container;
			DOM.append(this.container.root, body, this.root);
			OO.initHandlers(this);
		},
		display: function(b){
			this.ondisplay && this.ondisplay(b);
			if(b){
				document.replaceChild(this.root, this.srcDoc);
			} else{
				document.replaceChild(this.srcDoc, this.root);
			}
			this.host.ondisplay && this.host.ondisplay(!b);
		}
	});
IV.container = newClass(
	function(){
		this.root = DOM.create("div", {class: IV_CLS_CONTAINER});
		this.members = new OO.Collection;
	}, {
		add: function(member){
			this.members.add(member);
			this.root.appendChild(member.root);
		},
		remove: function(member){
			this.members.remove(member);
			this.root.removeChild(member.root);
		}
	}, [IV.element]);
IV.imgCell = newClass(
	function(url){
		this.root = DOM.create("div", {class: IV_CLS_IMGCELL});
		var table = DOM.create("div", {class: IV_CLS_TABLE});
		var rows = [];
		rows = OO.redo(function() DOM.create("div", {class: IV_CLS_TABLEROW}), 2);
		this.imgcell = DOM.create("div", {class: IV_CLS_TMBCELL});
		this.tipcell = DOM.create("div", {class: IV_CLS_TIPCELL});
		rows[0].appendChild(this.imgcell);
		rows[1].appendChild(this.tipcell);
		DOM.append(rows, table, this.root);
		this.root.setUserData(IV_KEY_HOST, this, null);
		if(url) let(p = new Image){
			p.src = url;
			p.title = parseURI(url);
			this.setImage(p);
		}
	}, {
		setImage: function(img){
			this.image = img;
			DOM.removeChildren(this.imgcell);
			this.imgcell.appendChild(img);
			var ic = this;
			if(isAvailable(img)){
				this.setDescription(img.naturalWidth + " x " + img.naturalHeight);
			} else{
				this.setDescription("? x ?");
				img.addEventListener("load", function(){
					ic.setDescription(this.naturalWidth + " x " + this.naturalHeight);
					this.removeEventListener("load", arguments.callee, false);
				}, false);
			}
		},
		setDescription: function(t){
			DOM.removeChildren(this.tipcell);
			this.tipcell.textContent = t;
		}
	}, [IV.element]);
IV.canvas = newClass(
	function(){
		this.root = DOM.create("canvas");
	}, {
		get context(){
			return this.root.getContext("2d");
		},
		get width(){
			return this.root.width;
		},
		get height(){
			return this.root.height;
		},
		set width(x){
			this.root.width = x;
		},
		set height(y){
			this.root.height = y;
		}
	}, [IV.element]);
IV.explorer = newClass(
	function(){
		this.host = IV.document;
		this.init(IV_CSS_EXPLORER);
		this.imageCells = new OO.Collection;
		this.fetchImages();
		this.current = null;
	}, {
		ondisplay: function(b){
			if(b){
				listen("keydown", this.__keydown);
			} else{
				unlisten("keydown", this.__keydown);
			}
		},
		addImage: function(url){
			var ic = new IV.imgCell(url);
			listen("dblclick", this.__dblclick, ic.root);
			this.imageCells.add(ic);
			this.container.add(ic);
		},
		fetchImages: function(){
			var url = new OO.Enum(), s, a, el, v;
			each($$("*"), function(el){
				for each(s in IV_LST_CSSIMG){
					v = getComputedStyle(el, null).getPropertyValue(s)
					while(a = IV_REX_CSSURI.exec(v)) url.add(a[2]);
				}
			});
			each(document.images, function(i) url.add(i.src));
			for each(let i in url.values) this.addImage(i);
		},
		get viewer(){
			this._viewer = this._viewer || new IV.viewer(this);
			return this._viewer;
		},
		close: function(){
			this.display(false);
		},
		__keydown: getHotkeyHandler(IV_HKM_EXPLORER),
		__dblclick: function(e){
			var host = e.currentTarget.getUserData(IV_KEY_HOST), img = host.image;
			if(isAvailable(img)){
				this.$.current = host;
				this.$.viewer.display(true);
				this.$.viewer.loadImage(img);
				return stop(e);
			}
		},
		showNext: function(previous){
			if(this.current){
				let current = this.imageCells.getNext(this.current, previous);
				if(this.current != current){
					this.current = current;
					isAvailable(current.image) ? this.viewer.loadImage(current.image) : this.showNext(previous);
				}
			}
		},
		showFirst: function(showLast){
			let current = showLast ? this.imageCells.last : this.imageCells.first;
			if(this.current != current){
				this.current = current;
				isAvailable(current.image) ? this.viewer.loadImage(current.image) : this.showNext(showLast);
			}
		}
	}, [IV.main]);
IV.viewer = newClass(
	function(host){
		this.host = host;
		this.init(IV_CSS_VIEWER);
		this.mask = DOM.create("div", {class: IV_CLS_MASK});
		this.body.appendChild(this.mask);
		this.canvas = new IV.canvas;
		this.container.add(this.canvas);
		this.resizeCanvas();
		this.ctx = this.canvas.context;
		this._resizeMode = this.NORESIZE;
		this._moveMode = this.NOMOVE;
	}, {
		NORESIZE: 0,
		FITVIEW: 1,
		FITWIDTH: 2,
		FITHEIGHT: 3,
		FIXEDRATE: 4,
		NOMOVE: 0,
		MOVETOLAST: 1,
		MOVETOSET: 2,
		reset: function(){
			this.scaled = false;
			this.rotate = 0;
			this.reverse = 0;
		},
		ondisplay: function(b){
			if(b){
				listen("dragstart", stop);
				listen("resize", this.__resize);
				listen("keydown", this.__keydown);
				listen("dblclick", this.__dblclick);
				listen("mousedown", this.__mousedown);
				listen("DOMMouseScroll", this.__mousescroll);
			} else{
				unlisten("dragstart", stop);
				unlisten("resize", this.__resize);
				unlisten("keydown", this.__keydown);
				unlisten("dblclick", this.__dblclick);
				unlisten("mousedown", this.__mousedown);
				unlisten("DOMMouseScroll", this.__mousescroll);
			}
		},
		get needScroll(){
			return this.needScrollX || this.needScrollY;
		},
		get needScrollX(){
			return this.width > this.canvasWidth;
		},
		get needScrollY(){
			return this.height > this.canvasHeight;
		},
		get imgWidth(){
			return this.img.naturalWidth;
		},
		get imgHeight(){
			return this.img.naturalHeight;
		},
		get dataWidth(){
			return this.rotate % 2 ? this.imgHeight : this.imgWidth;
		},
		get dataHeight(){
			return this.rotate % 2 ? this.imgWidth : this.imgHeight;
		},
		get canvasWidth(){
			return this.canvas.width;
		},
		get canvasHeight(){
			return this.canvas.height;
		},
		get width(){
			return Math.round(this.rate * this.dataWidth);
		},
		get height(){
			return Math.round(this.rate * this.dataHeight);
		},
		get currentWidth(){
			return Math.round(this.rate * this.imgWidth);
		},
		get currentHeight(){
			return Math.round(this.rate * this.imgHeight);
		},
		set top(n){
			var ch = this.canvasHeight, h = this.height;
			this._top = this.needScrollY ? limit(n, ch - h, 0) : Math.round((ch - h) / 2);
		},
		get top(){
			return this._top;
		},
		set left(n){
			var cw = this.canvasWidth, w = this.width;
			this._left = this.needScrollX ? limit(n, cw - w, 0) : Math.round((cw - w) / 2);
		},
		get left(){
			return this._left;
		},
		get resizeMode(){
			return this._resizeMode;
		},
		set resizeMode(mode){
			this._resizeMode = mode;
			this.img && this.loadImage(this.img);
		},
		get moveMode(){
			return this._moveMode;
		},
		set moveMode(mode){
			if(mode == this.MOVETOSET){
				this.userLeft = this.left;
				this.userTop = this.top;
			}
			this._moveMode = mode;
		},
		decideRate: function(){
			var wr = this.canvasWidth / this.dataWidth, hr = this.canvasHeight / this.dataHeight;
			switch(this.resizeMode){
				case this.NORESIZE:
					this.rate = 1;
					break;
				case this.FITVIEW:
					this.rate = Math.min(1, wr, hr);
					break;
				case this.FITWIDTH:
					this.rate = Math.min(1, wr);
					break;
				case this.FITHEIGHT:
					this.rate = Math.min(1, hr);
					break;
				case this.FIXEDRATE:
					break;
			}
		},
		decideOffset: function(){
			switch(this.moveMode){
				case this.NOMOVE:
					this.left = this.top = 0;
					break;
				case this.MOVETOLAST:
					this.left = this.left;
					this.top = this.top;
					break;
				case this.MOVETOSET:
					this.left = this.userLeft;
					this.top = this.userTop;
					break;
			}
		},
		loadImage: function(img){
			this.img = img;
			this.reset();
			this.decideRate();
			this.decideOffset();
			this.draw();
		},
		resizeCanvas: function(){
			this.canvas.width = window.innerWidth;
			this.canvas.height = window.innerHeight;
		},
		draw: function(){
			this.resizeCanvas();
			this.drawImage();
			if(this.needScroll){
				this.mask.classList.remove(IV_CLS_HIDE);
				this.mask.style.top = this.top + "px";
				this.mask.style.left = this.left + "px";
				this.mask.style.width = this.width + "px";
				this.mask.style.height = this.height + "px";
			} else{
				this.mask.classList.add(IV_CLS_HIDE);
			}
		},
		drawImage: function(){
			this.ctx.save();
			var m = IV_MTX_TRANSFORM[this.reverse][this.rotate];
			this.ctx.setTransform(m[0], m[1], m[2], m[3], this.left + m[4] * this.width, this.top + m[5] * this.height);
			this.ctx.drawImage(this.img, 0, 0, this.currentWidth, this.currentHeight);
			this.ctx.restore();
		},
		resizeTo: function(rate){
			if(this.rate == rate) return;
			var x = this.canvasWidth / 2, y = this.canvasHeight / 2, r = rate / this.rate;
			this.rate = rate;
			this.scaled = true;
			this.top = Math.round(y + r * (this.top - y));
			this.left = Math.round(x + r * (this.left - x));
			this.draw();
		},
		rotateCW: function(times){
			var cw = this.canvasWidth / 2, ch = this.canvasHeight / 2;
			var x = this.left - cw, y = this.top - ch, nx, ny;
			switch(times % 4){
				case 0:
					nx = x, ny = y;
					break;
				case 1:
					nx = y, ny = -this.width - x;
					break;
				case 2:
					nx = -this.width - x, ny = -this.height - y;
					break;
				case 3:
					nx = -this.height - y, ny = x;
					break;
			}
			this.rotate = (this.rotate + times) % 4;
			this.left = nx + cw, this.top = ny + ch;
		},
		moveToLast: function(){
			this.host.showFirst(true);
		},
		moveToFirst: function(){
			this.host.showFirst();
		},
		moveForward: function(){
			this.host.showNext();
		},
		moveBackward: function(){
			this.host.showNext(true);
		},
		zoomIn: function(){
			for(var i = 0; IV_VWR_ZOOMRATE[++i] <= this.rate && i < IV_VWR_ZOOMRATE.length - 1;);
			this.resizeTo(IV_VWR_ZOOMRATE[i]);
		},
		zoomOut: function(){
			for(var i = IV_VWR_ZOOMRATE.length - 1; IV_VWR_ZOOMRATE[--i] >= this.rate && i > 0;);
			this.resizeTo(IV_VWR_ZOOMRATE[i]);
		},
		lookLeft: function(){
			if(this.needScrollX) this.left += IV_KDN_PIXEL;
			this.draw();
		},
		lookRight: function(){
			if(this.needScrollX) this.left -= IV_KDN_PIXEL;
			this.draw();
		},
		lookUp: function(){
			if(this.needScrollY) this.top += IV_KDN_PIXEL;
			this.draw();
		},
		lookDown: function(){
			if(this.needScrollY) this.top -= IV_KDN_PIXEL;
			this.draw();
		},
		quickLookLeft: function(){
			if(this.needScrollX) this.left += IV_KDC_PIXEL;
			this.draw();
		},
		quickLookRight: function(){
			if(this.needScrollX) this.left -= IV_KDC_PIXEL;
			this.draw();
		},
		quickLookUp: function(){
			if(this.needScrollY) this.top += IV_KDC_PIXEL;
			this.draw();
		},
		quickLookDown: function(){
			if(this.needScrollY) this.top -= IV_KDC_PIXEL;
			this.draw();
		},
		reverseX: function(){
			this.reverse ^= 1;
			this.draw();
		},
		reverseY: function(){
			this.reverse ^= 2;
			this.draw();
		},
		rotate90: function(){
			this.rotateCW(1);
			this.draw();
		},
		rotate270: function(){
			this.rotateCW(3);
			this.draw();
		},
		setNoResizeMode: function(){
			this.resizeMode = this.NORESIZE;
		},
		setFitViewMode: function(){
			this.resizeMode = this.FITVIEW;
		},
		setFitWidthMode: function(){
			this.resizeMode = this.FITWIDTH;
		},
		setFitHeightMode: function(){
			this.resizeMode = this.FITHEIGHT;
		},
		setFixedRateMode: function(){
			this.resizeMode = this.FIXEDRATE;
		},
		setNoMoveMode: function(){
			this.moveMode = this.NOMOVE;
		},
		setMoveToLastMode: function(){
			this.moveMode = this.MOVETOLAST;
		},
		setMoveToSetMode: function(){
			this.moveMode = this.MOVETOSET;
			this.userLeft = this.left;
			this.userTop = this.top;
		},
		close: function(){
			this.display(false);
		},
		__resize: function(e){
			var $ = this.$;
			$.resizeCanvas();
			!$.scaled && $.decideRate();
			$.top = $.top, $.left = $.left;
			$.draw();
		},
		__keydown: getHotkeyHandler(IV_HKM_VIEWER),
		__mousescroll: function(e){
			this.$.host.showNext(e.detail < 0);
		},
		__mousedown: function(e){
			if(this.$.needScroll){
				mouseX = e.screenX, mouseY = e.screenY;
				listen("mousemove", this.$.__mousemove);
				listen("mouseup", this.$.__mouseup);
			}
		},
		__mousemove: function(e){
			var $ = this.$;
			$.left += e.screenX - mouseX;
			$.top += e.screenY - mouseY;
			mouseX = e.screenX, mouseY = e.screenY;
			$.draw();
		},
		__mouseup: function(e){
			unlisten("mousemove", this.$.__mousemove);
			unlisten("mouseup", this.$.__mouseup);
		},
		__dblclick: function(e){
			this.$.close();
		}
	}, [IV.main]);
const IV_CSS_EXPLORER = <![CDATA[
*{
	font-size: 10pt;
	font-family: MS Gothic;
}
html, body{
	width: 100%;
	height: 100%;
	padding: 0;
	margin: 0;
}
div.container{
	width: 100%;
	height: 100%;
	background: #fff;
	overflow: auto;
}
div.imgcell{
	display: inline-block;
	margin: 10px;
}
div.imgcell>div.table{
	display: table;
	width: 120px;
	height: 120px;
	color: #000;
}
div.table>div.tablerow{
	display: table-row;
	text-align: center;
}
div.tablerow>div.tablecell{
	display: table-cell;
	vertical-align: middle;
}
div.tablerow>div.description{
	height: 20px;
}
div.tablerow>div.thumbnail{
	border: 1px solid #999;
}
div.table:hover{
	background: #c9cad2;
	cursor: pointer;
}
div.table:hover>div.tablerow>div.thumbnail{
	border: 1px dashed #999;
}
div.thumbnail>img{
	max-width: 100px;
	max-height: 80px;
	-moz-box-shadow: 2px 2px 5px #555;
}
]]>;

const IV_CSS_VIEWER = <![CDATA[
html, body{
	width: 100%;
	height: 100%;
	padding: 0;
	margin: 0;
}
div.container{
	width: 100%;
	height: 100%;
	background: #c1c1c1;
	overflow: hidden;
}
div.hide{
	display: none;
}
div.mask{
	position: fixed;
	background: url("data:image/gif;base64,R0lGODlhAQABAIAAAAAAAAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==");
	cursor: url("data:image/gif;base64,R0lGODlhEAARAJECAAAAAP///wAAAAAAACH5BAEAAAIALAAAAAAQABEAAAI3lC8AyLkQgloMSotrVHsnhHWXdISS+EzRimIWy3Ii7CU0Tdn3mut3b3jBgEFcozg8+nhHYcxQAAA7"), auto;
}
div.mask:active{
	cursor: url("data:image/gif;base64,R0lGODlhDwAQAJECAAAAAP///wAAAAAAACH5BAEAAAIALAAAAAAPABAAAAIxlA95K+nhWIMgQAtYvTy2DWKUs1kmWCXmeobsOb1sFssYYkOaTS8lLPndgq8eTkYrAAA7"), auto!important;
}
]]>;