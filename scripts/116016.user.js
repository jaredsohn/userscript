// ==UserScript==
// @name           Habr New Comments Navigator
// @version       1.0
// @namespace     http://userscripts.org/scripts/show/116016
// @include       http://habrahabr.ru/*
// ==/UserScript==
function HabrNewComments() {
	this.init();
}
HabrNewComments.prototype = {
	$: function(id) {
		return document.getElementById(id);
	},
	canvas: null,
	commets: null,
	commentsTotal: 0,
	startPos: -1,
	endPos: -1,
	username: null,
	init: function() {
// TODO
//		var g = this.$('greetings');
//		var a = g.getElementsByTagName('a');
//		if (a.length > 0) {
//			this.username = a[0].innerHTML;
//		}
		
		this.canvas = document.createElement('canvas');
		this.canvas.width = 20;
		this.canvas.style.position = 'fixed';
		this.canvas.style.right = '0px';
		this.canvas.style.top = '0px';
		this.canvas.style.bottom = '0px';
		this.canvas.style.width = '20px'
		this.canvas.style.backgroundColor = '#ffffff';
		this.canvas.style.color = 'black';
		this.canvas.style.overflow = 'hidden';
		this.canvas.style.zIndex = 5;
		document.body.appendChild(this.canvas);
		this.update();
		
		var self = this;
		window.addEventListener("scroll", function () { self.repaint() }, false);
		window.addEventListener("load", function () { self.update(); }, false);
		window.addEventListener("resize", function () { self.update(); }, false);
		this.canvas.addEventListener("click", function(e) { self.click(e) }, false);

// TODO		
//		var ow = window.wrappedJSObject ? window.wrappedJSObject : window;
//		this.userposts = ow.allUserPosts;
//		ow.allUserPosts = function(id) { self.userposts(id); self.highlight(id); self.repaint(); return false; }
	},
	userposts: null,
	update: function() {
		var cnt = 0;
		
		var height = window.innerHeight;
		this.canvas.height = height;
		
		var comments = this.$('comments');
		if (!comments) return;
		
		comment = comments.firstChild;
		this.comments = [];
		while (comment != null) {
			if (comment.tagName == 'DIV') {
				var ch = this.height(comment);
				var pos = this.pos(comment);
				var o = {isNew:false,id:0,height:ch, top:pos, forUsername:null, username:null};
				o.isNew = this.isCommentNew(comment);
//				var p = comment.className.indexOf(' u');
//				o.id = parseInt(comment.className.substr(p + 2)); 
//				var ds = comment.getElementsByTagName('div');
//				if (ds[0].className == 'dt') {
//					var t = ds[0].innerHTML.replace(/(<([^>]+)>)/ig,"");
//					if ((p = t.indexOf(':')) != -1) {
//						o.forUsername = t.substr(0, p).replace(/^\s\s*/, '').replace(/\s\s*$/, '');
//					}
//				}
//				if (ds[1].className == 'dd') {
//  					var dsa = ds[1].getElementsByTagName('a');
//					o.username = dsa[1].innerHTML;
//				}
				
				this.comments[cnt] = o;
				
				
				if (this.startPos == -1) {
					this.startPos = pos;
				}
				this.endPos = pos + ch;
				cnt++;
			}
			
			comment = this.getNextComment(comment, comments);
			
		}

		this.commentsTotal = cnt;
		
		this.repaint();
	},

        isCommentNew: function(comment)
        {
		var childNodes = comment.childNodes;
		for (var i = 0 ; i < childNodes.length; i++)
		{
			var node = childNodes[i];
			if (node.className != null && node.className.indexOf('is_new') != -1)
				return true;
		}
		return false;
        },
        getNextComment: function(comment, comments)
        {
		var childNodes = comment.childNodes;
		for (var i = 0 ; i < childNodes.length; i++)
		{
			var node = childNodes[i];
			if (node.className == 'reply_comments' && node.firstChild != null)
				return node.firstChild;
		}
		if (comment.nextSibling != null)
			return comment.nextSibling;
		while(comment.parentNode != comments)
		{
			comment = comment.parentNode;
			if (comment.nextSibling != null)
				return comment.nextSibling;
		}
		return null;
        },
	highlights: {},
	highlight: function(id) {
		this.highlights[id] = this.highlights[id] == undefined ? true : !this.highlights[id];
	},
	repaint: function() {
		var height = window.innerHeight;
		var ctx = this.canvas.getContext('2d');
		
		ctx.fillStyle = "rgb(255, 255, 255)";
		ctx.fillRect(0, 0, 20, height);
		
		var tmp = height / (this.endPos - this.startPos) * height;
		var tmp1 = (this.scroll() - this.startPos) / (this.endPos - this.startPos) * (height);
		ctx.fillStyle = "rgb(180, 180, 180)";
		ctx.fillRect(0, tmp1, 20, tmp);

		for (var i = 0; i < this.comments.length; i++) {
			var o = this.comments[i];
			var y = (o.top - this.startPos) / (this.endPos - this.startPos) * height;
			var h = o.height / (this.endPos - this.startPos) * height;
			var ch = h > 2 ? h : 2;			
			
			
//			if (o.username == this.username) {
//				ctx.fillStyle = "rgb(80, 80, 80)";
//				ctx.fillRect(4, y, 14, ch);
//			}
//			else 
			if (o.isNew) {
				ctx.fillStyle = "rgb(232, 232, 255)";
				ctx.fillRect(4, y, 14, ch);
			}
			
			
//			if (this.highlights['u' + o.id] == true) {
//				ctx.fillStyle = "rgb(0, 200, 0)";
//				ctx.fillRect(8, y, 6, ch);
//			}
			
			
//			if (o.forUsername == this.username) {
//				ctx.fillStyle = "rgb(120, 120, 120)";
//				ctx.fillRect(12, y, 6, ch);
//			}
		}
	},
	click: function(e) {
		var height = window.innerHeight;
		var tmp = height / (this.endPos - this.startPos) * height;
		var top = 0;
		for (var i = 0; i < this.comments.length; i++) {
			var o = this.comments[i];
			var y = (o.top - this.startPos) / (this.endPos - this.startPos) * height;
			top = o.top;
			if (e.clientY < y) {
				break;
			}
		}
		window.scroll(0, top - height / 2);
	},
	pos: function(e) {
		var pos = e.offsetTop;
		while (e.offsetParent != null) {
			e = e.offsetParent;
			pos += e.offsetTop;
			if (e.tagName == 'BODY') break;
		}
		return pos;
	},
	height: function(e) {
		var height = e.clientHeight;
		var childNodes = comment.childNodes;
		for (var i = 0 ; i < childNodes.length; i++)
		{
			var node = childNodes[i];
			if (node.className == 'reply_comments')
			{
				height -= node.clientHeight;
				break;
			}
		}
		return height;
	},
	scroll: function() {
		var scroll = document.body.scrollTop;
		if (scroll == 0) {
			if (window.pageYOffset) {
				scroll = window.pageYOffset;
			}
			else {
				scroll = (document.body.parentElement) ? document.body.parentElement.scrollTop : 0;
			}
		}
		return parseInt(scroll);
	},
	docHeight: function() {
		var D = document;
		return Math.max(
			Math.max(D.body.scrollHeight, D.documentElement.scrollHeight),
			Math.max(D.body.offsetHeight, D.documentElement.offsetHeight),
			Math.max(D.body.clientHeight, D.documentElement.clientHeight)
		);
	}
};
new HabrNewComments();