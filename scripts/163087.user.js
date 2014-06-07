// ==UserScript==
// @id             JustJustin.suptgx
// @name           suptgx
// @version        .1
// @namespace      
// @author         JustJustin
// @description    Beginnings of an improvement script for suptg. Implements Image Expand for now.
// @include        http://suptg.thisisnotatrueending.com/archive/*
// @run-at         document-end
// ==/UserScript==

var $base;
var config = {
	debug: false,
	version: 1.0,
	imgonly: false,
	deculture: false,
	pinkify: false,
	browse: {
		oneThread: false
	}
};

var pinkPosts = [19555685, 19556039, 19559357, 19581351, 19581677, 19619555, 19619828, 19619840, 
	19620191, 19694663, 19695958, 19696180, 19696185, 19721948, 19748232, 19748283, 19748699, 
	19921023, 19989599, 20032216, 20033246, 20345951, 20357148, 20357158, 20357221, 20357222, 
	20357511, 20357816, 20357841, 20358118, 20358217, 20358332, 20811163, 20811171, 20811773, 
	20811782, 20812426, 20812433, 20812872, 20812879, 20813336, 20813372, 20959672, 20959684,
	20960195, 20999981, 20999989, 21182100, 21182181, 21238491, 21238500, 21239398, 21239461];

$base = function(selector, root){
	if(root == null) {
		root = document.body;
	}
	return root.querySelector(selector);
};
$$base = function(selector, root){
	if(root == null) {
		root = document.body;
	}
	return root.querySelectorAll(selector);
};
$base.extend = function(object, data){
	var key, val;
	for(key in data){
		val = data[key];
		object[key] = val;
	}
};

$base.extend($base, {
	engine: /WebKit|Presto|Gecko/.exec(navigator.userAgent)[0].toLowerCase(),
	addClass: function(el, klass){
		el.classList.add(klass);
	},
	rmClass: function(el, klass){
		el.classList.remove(klass);
	},
	hasClass: function(el, klass){
		var i;
		for(i = 0; i < el.classList.length; ++i){
			if(el.classList[i] == klass){
				return true;
			}
		}
		return false;
	},
	id: function(id) {
		return document.getElementById(id);
	},
	attr: function(el, val) {
		var attributes = el.attributes;
		return (attributes[val] === undefined) ? false: attributes[val].value;
	},
	after: function(root, el) {
		if(root.nextSibling){
			return root.parentNode.insertBefore(el, root.nextSibling);
		}
		return root.parentNode.appendChild(el);
	},
	before: function(root, el) {
		return root.parentNode.insertBefore(el, root);
	},
	space: function(el) {
		el.appendChild(document.createTextNode(' '));
	},
	el: function(tagname, attrs) {
		var el = document.createElement(tagname);
		if(attrs == undefined) {
			attrs = {};
		}
		$base.extend(el, attrs);
		if(attrs['class']) {
			el.className = attrs['class'];
		}
		return el;
	},
	indexIn: function(array, object) {
		var index = -1;
		for(var i = 0; i < array.length; ++i) {
			if(array[i] > object) {
				index = i;
				break;
			}
		}
		return index;
	},
	firstParent: function(root, tag, limit) {
		if(limit === 0) { return false; }
		if( root.parentNode.tagName.toLowerCase() == tag.toLowerCase() ) {
			return root.parentNode;
		}
		if(root.parentNode == document.body){
			return false;
		}
		return $base.firstParent(root.parentNode, tag, limit - 1);
	},
	remove: function(el) {
		return el.parentNode.removeChild(el);
	},
	log: function(obj, severe) {
		if(severe || config.debug) {
			console.log(obj); //This is going to fuck up horribly with regular firefox I think
			//TODO FIX ^^^
		}
	},
	prepend: function(base, el) {
		if(base.firstChild) {
			$base.before(base.firstChild, el);
		} else {
			base.appendChild(el);
		}
	},
	addStyle: function(css) {
		var style;
		style = $base.el('style', {
			textContent: css
		});
		document.head.appendChild(style);
		return style;
    }
});

noirThread = function(){
	noirThread.init();
}

$base.extend(noirThread, {
	dialogBox: document,
	init: function() {
		$base.addStyle(noirThread.css);
		
		if( localStorage.getItem('config') ) {
			try {
				var con = JSON.parse(localStorage.getItem('config'));
				if(con.version == config.version) {
					config = con;
				}
				else {
					this.oldVersion(con);
				}
			} catch(er) {
				localStorage.removeItem('config');
			}
		}
		
		noirThread.dialog();
		noirThread.imageExpand.init();
		//noirThread.deculture.init();
		noirThread.imageonly.init();
		//noirThread.browse.init();
		//noirThread.pinkify.init();
	},
	oldVersion: function(con) {
		switch(con.version) {
			case 1.0:
				con.version = 1.1;
				con.pinkify = false;
			case 9.9:
				break;
			default:
				//Unrecognized Version
				return false;
				break;
		}
		config = con;
		localStorage.setItem('config', JSON.stringify( config ));
	},
	dialog: function() {
		controls = $base.el('div', {
		  id: 'threadControls',
		  innerHTML: "<!-- \
		  <select id=imageType name=imageType><option value=full>Full</option>\
		  <option value='fit width'>Fit Width</option><option value='fit height'>Fit Height</option>\
		  <option value='fit screen'>Fit Screen</option></select>\
		  -->\
		  <label>Expand Images<input type=checkbox id=imageExpand></label>\
		  <!-- <label>Deculture Posts Only<input type=checkbox id=deculture></label> -->\
		  <!-- <label>Pinkify<input type=checkbox id=pinkify></label> -->\
		  <label>Image Only<input type=checkbox id=imgonly></label>"
		});
		setInterval(noirThread.dialogTimeout, 100);
		//$base('#deculture', controls).checked = config.deculture;
		//$base('#pinkify', controls).checked = config.pinkify;
		$base('#imgonly', controls).checked = config.imgonly;
		
		$base('#imageExpand', controls).addEventListener('click', noirThread.imageExpand.toggleAll);
		$base('#imgonly', controls).addEventListener('click', noirThread.settingsUpdate);
		//$base('#deculture', controls).addEventListener('click', noirThread.settingsUpdate);
		//$base('#pinkify', controls).addEventListener('click', noirThread.settingsUpdate);
		
		this.dialogBox = controls;
		$base.prepend($base('#delform'), controls);
	},
	settingsUpdate: function() { //no this
		//if($base('#deculture').checked != config.deculture){
		//	config.deculture = $base('#deculture').checked;
		//	noirThread.deculture.update();
		//}
		/*if($base('#pinkify').checked != config.pinkify){
			config.pinkify = $base('#pinkify').checked;
			noirThread.pinkify.update();
		}*/
		if($base('#imgonly').checked != config.imgonly) {
			config.imgonly = $base('#imgonly').checked;
			noirThread.imageonly.update();
		}
		
		localStorage.setItem('config', JSON.stringify( config ));
	},
	dialogTimeout: function() {
		if(typeof(noirThread.controlsTop) == 'undefined')
		{
			$base.extend(noirThread, {'controlsTop': $base('#threadControls').offsetTop});
		}
		if($base('#threadControls').getBoundingClientRect().top < 0)
		{
			$base.addClass($base('#threadControls'), 'floatingControls');
		}
		if( ($base('#threadControls').offsetTop + (document.documentElement.scrollTop || document.body.scrollTop) )  < noirThread.controlsTop){
			$base.rmClass($base('#threadControls'), 'floatingControls');
		}
	},
	getThreadId: function(el) {
		while(el.parentNode != document.body) {
			if(el.id.search('t') != -1) {
				return el.id.slice(1);
			} else {
				el = el.parentNode;
			}
		}
	},
	pinkify: {
		init: function() {
			if(config.pinkify) {
				this.update();
			}
		},
		dialog: function(paint) {
			if(paint) {
				var control = $base('#pinkify').parentNode;
				
				var back = $base.el('a', {
					'class': 'link noselection',
					id: 'pinkifyBack',
					innerHTML: '<<'
					});
				back.addEventListener('click', this.prev);
				
				var forward = $base.el('a', {
					'class': 'link noselection',
					id: 'pinkifyNext',
					innerHTML: '>>'
					});
				forward.addEventListener('click', this.next);
				
				$base.before(control, back);
				$base.after(control, forward);
				return;
			}
			if($base('#pinkifyBack')) {
				$base.remove($base('#pinkifyBack'));
			}
			if($base('#pinkifyNext')) {
				$base.remove($base('#pinkifyNext'));
			}
		},
		update: function() {
			this.dialog(config.pinkify);
			if(config.pinkify) {
				for(var i = 0; i < pinkPosts.length; ++i) {
					this.pink(pinkPosts[i]);
				}
			}
			else {
				for(var i = 0; i < pinkPosts.length; ++i) {
					this.unPink(pinkPosts[i]);
				}
			}
		},
		pink: function(id) {
			$post = $base('#p' + id);
			if($post)
				$base.addClass($post, 'pinkify');
		},
		unPink: function(id) {
			$post = $base('#p' + id);
			if($post)
				$base.rmClass($post, 'pinkify');
		},
		where: function() {
			for(var i = 0; i < pinkPosts.length; ++i) {
				if(window.pageYOffset < $base('#p'+pinkPosts[i]).offsetTop - 5) {
					break;
				}
			}
			return ( (i - 1) < 0) ? i : i - 1;
		},
		go: function(post) {
			if(post < 0) {
				post = pinkPosts.length - 1;
			}
			if(post >= pinkPosts.length) {
				post = 0;
			}
			$base('#p' + pinkPosts[post]).scrollIntoView();
		},
		prev: function() {
			var pos = noirThread.pinkify.where();
			noirThread.pinkify.go(pos - 1);
		},
		next: function() {
			var pos = noirThread.pinkify.where();
			noirThread.pinkify.go(pos + 1);
		}
	},
	browse: {
		threads: [],
		$threads: null,
		init: function() {
			this.calculate();
			this.dialog();
			
			if(localStorage.getItem('thread') && !window.location.hash) {
				this.go(localStorage.getItem('thread'));
			}
		},
		calculate: function() {
			if(this.$threads == null) {
				this.$threads = $$base('div.thread');
			}
			this.threads = [];
			for(var i = 0; i < this.$threads.length; ++i) {
				this.threads.push(this.$threads[i].offsetTop);
			}
		},
		dialog: function() {
			var innerSelect = '';
			for(var i = 0; i < this.threads.length; ++i) {
				innerSelect = innerSelect + "<option value='" + i + "'>" + (i + 1) + "</option>";
			}
			var el = $base.el('select', {
				id: 'threadSelect',
				innerHTML: innerSelect
			});
			
			var label = $base.el('label', {
				'for': 'threadSelect',
				innerHTML: "Thread "
			});
			
			$base.prepend($base('#threadControls'), el);
			$base.prepend($base('#threadControls'), label);
			
			window.addEventListener('scroll', this.scroll);
			$base('#threadSelect').addEventListener('change', this.select);
		},
		where: function() {
			for(var i = 0; i < this.threads.length; ++i) {
				if(window.pageYOffset < this.threads[i] - 25) {
					break;
				}
			}
			return ( (i - 1) < 0) ? i : i - 1;
		},
		select: function() {
			noirThread.browse.go( this.value );
		},
		scroll: function() {
			if(noirThread.browse.where() != $base('#threadSelect').value) {
				noirThread.browse.calculate();
				$base('#threadSelect').value = noirThread.browse.where();
				localStorage.setItem('thread', noirThread.browse.where());
			}
		},
		go: function(thread) {
			this.calculate();
			$$base('div.thread')[thread].scrollIntoView();
			localStorage.setItem('thread', thread);
		}
	},
	imageonly: {
		init: function() {
			//Don't do anything for now.
			this.update();
		},
		update: function() {
			var posts = $$base('.postContainer');
			for(var i = 0; i < posts.length; ++i)
			{
				if(config.imgonly == false) {
					noirThread.imageonly.show(posts[i]);
					continue;
				}
				if(noirThread.imageonly.hasImage(posts[i]))
					noirThread.imageonly.show(posts[i]);
				else
					noirThread.imageonly.hide(posts[i]);
			}
		},
		hasImage: function(el) {
			return $$base('.file', el).length != 0;
		},
		show: function(el) {
			return el.hidden = false;
		},
		hide: function(el) {
			return el.hidden = true;
		}
	},
	deculture: {
		init: function() {
			var links = $$base('.quotelink');
			for(var i = 0; i < links.length; ++i) {
				links[i].onclick = function(){return;}
				if(this.getPost(links[i]) == false){ continue; }
				links[i].addEventListener('click', this.click);
			}
			this.update();
		},
		enter: function() {
			if(config.deculture) {
				noirThread.deculture.show(this);
			}
		},
		leave: function() {
			if(config.deculture) {
				noirThread.deculture.hide(this);
			}
		},
		click: function(e) {
			if(config.deculture) {
				e.preventDefault();
				noirThread.deculture.toggle(this);
			}
		},
		getPost: function(el) {
			var id = el.attributes.href.value.slice(2);
			var post = document.getElementById('pc' + id);
			if(!post) {return false;}
			var name = post.querySelector('.name').innerHTML;
			if(name.search('Deculture') == -1){
				return post;
			}
			return false;
		},
		update: function() {
			var links = $$base('.quotelink');
			for(var i = 0; i < links.length; ++i) {
				var post = this.getPost(links[i]);
				if(post == false) {continue; }
				if(config.deculture) {
					post.hidden = true;
				} else {
					post.hidden = false;
				}
			}
			//Update our browse thread locations.
			//noirThread.browse.calculate();
		},
		show: function(el) {
			this.getPost(el).hidden = false;
		},
		hide: function(el) {
			this.getPost(el).hidden = true;
		},
		toggle: function(el) {
			var post = this.getPost(el);
			if(post.hidden) {
				post.hidden = false;
			} else {
				post.hidden = true;
			}
		}
	},
	imageExpand: {
		suptg: "http://suptg.thisisnotatrueending.com/archive/",
		init: function() {
			var refs = $$base('.fileThumb');
			for(var i = 0 ; i < refs.length; ++i) {
				var href = noirThread.imageExpand.suptg + 
					noirThread.getThreadId(refs[i]) + '/' + $base.attr(refs[i], 'href');
				refs[i].href = href;
				refs[i].addEventListener('click', noirThread.imageExpand.toggleHandler);
			}
		},
		toggleHandler: function(e) {
			if (e.shiftKey || e.altKey || e.ctrlKey || e.metaKey || e.button !== 0) {
				return;
			}
			e.preventDefault();
			noirThread.imageExpand.toggle(this);
		},
		toggleAll: function(e) {
			if($base('#imageExpand').checked)
				noirThread.imageExpand.expandAll();
			else
				noirThread.imageExpand.contractAll();
		},
		toggle: function(a) {
			var thumb = a.firstChild;
			if (thumb.hidden) {
				var rect = a.getBoundingClientRect();
				if ($base.engine === 'webkit') {
					if (rect.top < 0) {
						document.body.scrollTop += rect.top - 42;
					}
					if (rect.left < 0) {
						document.body.scrollLeft += rect.left;
					}
				} else {
					if (rect.top < 0) {
						document.documentElement.scrollTop += rect.top - 42;
					}
					if (rect.left < 0) {
						document.documentElement.scrollLeft += rect.left;
					}
				}
				return noirThread.imageExpand.contract(thumb);
			} else {
				return noirThread.imageExpand.expand(thumb);
			}
		},
		contract: function(thumb) {
			thumb.hidden = false;
			thumb.nextSibling.hidden = true;
		},
		expand: function(thumb) {
			var img;
			thumb.hidden = true;
			if(img = thumb.nextSibling) {
				if(img.nodeName == 'IMG'){
					img.hidden = false;
					return;
				}
			}
			var a = thumb.parentNode;
			img = $base.el('img', {
				src: a.href
			});
			$base.after(thumb, img);
		},
		getAll: function() {
			return $$base('.fileThumb img:first-child');
		},
		expandAll: function() {
			var thumbs = this.getAll();
			for(var i = 0; i < thumbs.length; ++i) {
				this.expand(thumbs[i]);
			}
		},
		contractAll: function() {
		var thumbs = this.getAll();
			for(var i = 0; i < thumbs.length; ++i) {
				if(thumbs[i].hidden)
					this.contract(thumbs[i]);
			}
		}
	},
	
	css: ".floatingControls {\
  position: fixed;\
  top: 0px;\
  background-color: #D6DAF0;\
  }\
  div.pinkify{ \
  background-color: #ffbbd8;\
  }\
  \
  div.checkspace{ \
  position:relative;\
  left: 0px; right: 0px;\
  display: inline-block;\
  margin: 0px; padding: 0px;\
  width: 16px;\
  }\
  a.noselection{ \
  -webkit-user-select: none;\
  -moz-user-select: none;\
  -khtml-user-select: none;\
  -ms-user-select: none;\
  }"

});
noirThread();