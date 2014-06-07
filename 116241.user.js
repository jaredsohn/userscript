// ==UserScript==
// @name Power Juick
// @include http://juick.com/*
// @description Some tweaks for Juick.com
// @version 1.1.5
// ==/UserScript==

(function() {

    var tree = true; /* Древовидные комментарии */
    var fluid = true; /*Резиновая разметка*/
    var menu = true; /*Расширенное меню*/
    var input = true; /*Текстовые поля для быстрого копирования*/
    var google_qr = true; /*QR-коды*/
    var media = true; /*Автовнедрение медиа*/
    var full_image = true; /*Загружать полное изображение, если миниатюра недоступна*/

    var link_array = document.getElementsByTagName("link");
    var style_num = 0;
    for(i=0;i<link_array.length;i++){
	if(myurl = /http:\/\/i\.juick\.com\/d\/(.+)\/style\.css/.exec(link_array[i].href)){
	    style_num = myurl[1];
	}
    }

    switch(style_num)
    {
    case '1':
	var ColorBG = '#e9f0f2';
	break;
    case '2':
	var ColorBG = '#383838';
	break;
    case '3':
	var ColorBG = '#FCFCFC';
	break;
    case '4':
	var ColorBG = '#CBCB9C';
	break;
    default:
	var ColorBG = '#eeeedf';
    }

    var dotURL = "data:image/png;base64,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";

    /*---------- SHARED -----------*/

    function getElementsByXPath(xpath){
	var result = document.evaluate(xpath, document, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null);
	var nodes = new Array();

	i = 0;
	while (node = result.iterateNext()) {
	    nodes[i] = node;
	    i++;
	}

	return nodes;
    }


    /*------- FLUID LAYOUT --------*/

    if (fluid) {

	var style = new Array();
	style[0] = "<style type=\"text/css\">";
	style[1] = "#hlinks, #user, #pagetabs, #wrapper, #pagetitle {width: 93%; min-width: 925px;} div#intr{margin: 0 auto; width: 925px;}";
	style[2] = "#content{width: 67%;} #lcol{width: 30%;}";
	style[3] = "#userlinks{margin: 0; float: right; width: 30%;} #userinfo{width: 67%;}";
	style[4] = "</style>";

	var new_style = style.join(" ");

	document.getElementsByTagName("body")[0].innerHTML += new_style;
    }

    /*------- TREE COMMENTS -------*/
    if (tree) {

	var juick_tree_view = {
	    get_lastchild : function(n) {
		x = n.lastChild;
		while (x.nodeType != 1)
		    x = x.previousSibling;
		return x;
	    },
	    get_oo : function(item) {
		var current= item;
		for(var i= 0; i < 4; i++)
		    current= this.get_lastchild(current);
		return current;
	    },
	    get_parentId : function(item) {
		return String(this.get_oo(item).innerHTML).substring(1);
	    },
	    get_parent : function(item) {
		return document.getElementById(this.get_parentId(item));
	    },
	    reply_rewrite : function(item) {
		item.style.marginTop =     "1.25em";
		item.style.paddingBottom = "0";
		item.style.position=       "relative";
		item.style.width=          "600px";
		this.reply_rewrite_children(item);
	    },
	    reply_rewrite_children : function(reply) {
		var id= reply.getAttribute('id');
		var children= reply.reply_children;
		if (children.length > 0) {
		    var root= document.createElement('ul');
		    for(var i= 0; i < children.length; i++) {
			var child= document.getElementById(children[i]);
			this.reply_rewrite(child);
			root.appendChild(child);
		    }

		    var button= document.createElement('a');
		    button.setAttribute("style", "TEXT-DECORATION: NONE");
		    button.href= "javascript: void(0)";
		    button.hide= function () {
			reply.removeChild(root);
			button.innerHTML= "+ " + children.length + " \/ " + reply.reply_children_total;
			if (button.listener) {
			    button.removeEventListener(button.listener);
			}
			button.listener= button.addEventListener("click", function() {
			    button.show();
			}, false);
		    };
		    button.show= function() {
			reply.appendChild(root);
			button.innerHTML= '-';
			if (button.listener) {
			    button.removeEventListener(button.listener);
			}
			button.addEventListener("click", function() {
			    button.hide();
			}, false);
		    };

		    if (reply.reply_parent) {
			reply.appendChild(button);
			this.reply_add(id, button);
		    } else {
			var fold_all= document.createElement('a');
			fold_all.setAttribute("style", "TEXT-DECORATION: NONE");
			fold_all.href= "javascript: window.fold_all();";
			fold_all.innerHTML=   "(hide all) ";

			var unfold_all= document.createElement('a');
			unfold_all.setAttribute("style", "TEXT-DECORATION: NONE");
			unfold_all.href= "javascript: window.unfold_all();";
			unfold_all.innerHTML= "(show all) ";

			reply.appendChild(fold_all);
			reply.appendChild(unfold_all);
		    }
		    button.show();
		}
	    },
	    reply_init : function(item) {
		item.reply_children= [];
		item.reply_children_total= 0;
	    },
	    reply_add_child : function(item, id) {
		item.reply_children.push(id);
		item.reply_children_total+= 1;
		var parent= item.reply_parent;
		while(parent) {
		    parent.reply_children_total+= 1;
		    parent= parent.reply_parent;
		}
	    },
	    reply_link : function(root, item) {
		this.reply_init(item);
		item.reply_parent= this.get_parent(item);
		if(item.reply_parent) {} else {
		    item.reply_parent= root;
		}
		var parent= item.reply_parent;
		if (parent) {
		    parent.reply_children.push(item.getAttribute("id"));
		    while(parent) {
			parent.reply_children_total+= 1;
			parent= parent.reply_parent;
		    }
		}
	    },
	    reply_cache: {},
	    reply_all: [],
	    fold_all: function() {
		    for(var i= 0; i < w.reply_all.length; i++) {
			this.reply_all[i].hide();
		    }
	    },
	    unfold_all: function() {
		for(var i= 0; i < w.reply_all.length; i++) {
		    this.reply_all[i].show();
		}
	    },
	    reply_add: function(id, button) {
		    this.reply_cache[id]= button;
		    this.reply_all.push(button);
	    },
	    process : function(ul)
	    {
		var root= ul.parentNode;
		
		this.reply_init(root);
		var replies= ul.getElementsByTagName('LI');
		for (var i= 0; i < replies.length; i++) {
		    this.reply_link(root, replies[i]);
		}
		this.reply_rewrite_children(root);
		root.removeChild(ul);
	    },
	    run : function() {
		var ul= document.getElementById('replies');
		if (ul) {
		    this.process(ul);
		}
	    }
	};
	juick_tree_view.run();
    }


    /*--------- EXT MENU ----------*/

    if (menu) {

	if (document.getElementById("cse-search-box")) {
	    var add_items = "<li><a href=\"http://juick.com/top/\">TOP</a></li><li><a href=\"http://juick.com/last\">LAST</a></li>";
	    var menu = document.getElementById("cse-search-box")
		.getElementsByTagName("ul")[0];
	    menu.innerHTML = add_items + menu.innerHTML;
	    document.getElementsByTagName("body")[0].innerHTML += "<style> #header .inp{width: 150px;} </style>";
	}

    }

    /*---------- INPUTS -----------*/

    if (input) {

	if (document.getElementById("userlinks")) {

	    var href = document.getElementById("userlinks")
		.getElementsByTagName("ul")[0]
		.getElementsByTagName("li")[0]
		.getElementsByTagName("a")[0].href;
	    var first_index = href.indexOf("('");
	    var last_index = href.indexOf("')");
	    var nick = href.substring(first_index + 2, last_index);

	    var input = '<li><input type="text" size="30" value="S '
		+ nick
		+ '" onclick="this.focus();this.select();" /></li>';
	    document.getElementById("userlinks")
		.getElementsByTagName("ul")[0].innerHTML += input;

	}

	var small_links = document.getElementsByTagName("small");
	for (i = 0; i < small_links.length; i++) {

	    if (small_links[i].getElementsByTagName("a")[0]
		&& !small_links[i].getElementsByTagName("a")[0].innerHTML
		.indexOf("#")) {
		var hashlink = small_links[i]
		    .getElementsByTagName("a")[0].innerHTML;
		small_links[i].innerHTML = '<input type="text" size="8" value="'
		    + hashlink
		    + '" onclick="this.focus();this.select();" />&nbsp;'
		    + small_links[i].innerHTML;
	    } else {
		var hashdata = small_links[i].innerHTML;
		if (!hashdata.indexOf("#")) {
		    var start_index = hashdata.indexOf("#");
		    var end_index = hashdata.indexOf(" с");
		    var hashlink = hashdata.substring(start_index,
						      end_index);
		    small_links[i].innerHTML = '<input type="text" size="8" value="'
			+ hashlink
			+ '" onclick="this.focus();this.select();" />&nbsp;'
			+ small_links[i].innerHTML;
		}
	    }

	}

    }

    /*--------- QR-CODES ----------*/

    if (google_qr) {

	var this_page = location.href;
	if (document.getElementById("lcol")) {
	    document.getElementById("lcol").innerHTML += '<h2>QR-код</h2><div style="text-align: center;"><img src="http://chart.apis.google.com/chart?cht=qr&chs=200x200&choe=UTF-8&chld=H&chl='
		+ this_page
		+ '" style="width: 200px; height: 200px;" /></div>';
	}
    }

    /*---------- MEDIA ------------*/

    if (media) {

	function resolve(xpath) {

	    var all_links = getElementsByXPath(xpath);

	    for (z = 0; z < all_links.length; z++) {
		var node = all_links[z];

		if (tubeid = /youtube\.com\/watch\?v=(.+)/
		    .exec(node.href)) { // YouTube
			var elem = document.createElement("div");
		    elem.setAttribute("style", "margin-top: 5px;");
		    elem.innerHTML = '<object style="max-width: 560px; width: 100%; height: 340px;"><param name="movie" value="http://www.youtube.com/v/'
			+ tubeid[1]
			+ '&hl=ru_RU&fs=1&"></param><param name="allowFullScreen" value="true"></param><param name="wmode" value="transparent"></param><param name="allowscriptaccess" value="always"></param><embed src="http://www.youtube.com/v/'
			+ tubeid[1]
			+ '&hl=ru_RU&fs=1&" type="application/x-shockwave-flash" allowscriptaccess="always" allowfullscreen="true" wmode="transparent" style="max-width: 560px; width: 100%; height: 340px;"></embed></object>';
		    node.parentNode.insertBefore(elem,
						 node.nextSibling);
		} else if (tubeid = /youtu\.be\/(.+)/
			   .exec(node.href)) { // YouTube
			var elem = document.createElement("div");
		    elem.setAttribute("style", "margin-top: 5px;");
		    elem.innerHTML = '<object style="max-width: 560px; width: 100%; height: 340px;"><param name="movie" value="http://www.youtube.com/v/'
			+ tubeid[1]
			+ '&hl=ru_RU&fs=1&"></param><param name="allowFullScreen" value="true"></param><param name="wmode" value="transparent"></param><param name="allowscriptaccess" value="always"></param><embed src="http://www.youtube.com/v/'
			+ tubeid[1]
			+ '&hl=ru_RU&fs=1&" type="application/x-shockwave-flash" allowscriptaccess="always" allowfullscreen="true" wmode="transparent" style="max-width: 560px; width: 100%; height: 340px;"></embed></object>';
		    node.parentNode.insertBefore(elem,
						 node.nextSibling);
		} else if (myurl = /http:\/\/(\S+)radikal\.ru\/(\S+)\.(jpg|gif|png)/
			   .exec(node.href)) { // Radikal.ru
			var elem = document.createElement("div");
		    elem.setAttribute("style", "margin-top: 5px;");
		    elem.innerHTML = '<a href="' + myurl[0]
			+ '"><img src="http://' + myurl[1]
			+ "radikal.ru/" + myurl[2]
			+ 't.jpg" /></a>';
		    node.parentNode.insertBefore(elem,
						 node.nextSibling);
		} else if (myurl = /http:\/\/(\S{0,2})imgur\.com\/(\S+)\.(jpg|gif|png)/
			   .exec(node.href)) { // Imgur.com
			var elem = document.createElement("div");
		    elem.setAttribute("style", "margin-top: 5px;");
		    elem.innerHTML = '<a href="' + myurl[0]
			+ '"><img src="http://' + myurl[1]
			+ "imgur.com/" + myurl[2]
			+ 'l.' + myurl[3] + '" style="max-width: 100%; height: auto;"/></a>';
		    node.parentNode.insertBefore(elem,
						 node.nextSibling);
		} else if (myurl = /http:\/\/img(\S+)imageshack\.us\/img(\S+)\.(jpg|gif|png)/
			   .exec(node.href)) { // ImageShack
			var elem = document.createElement("div");
		    elem.setAttribute("style", "margin-top: 5px;");
		    elem.innerHTML = '<a href="' + myurl[0]
			+ '"><img src="http://img' + myurl[1]
			+ "imageshack.us/img" + myurl[2]
			+ '.th.' + myurl[3] + '" /></a>';
		    node.parentNode.insertBefore(elem,
						 node.nextSibling);
		} else if (myurl = /http:\/\/e-shuushuu\.net\/images\/(\d+)-(\d+)-(\d+)-(\d+)\.(\S+)/
			   .exec(node.href)) { // E-ShuuShuu.net
			var elem = document.createElement("div");
		    elem.setAttribute("style", "margin-top: 5px;");
		    elem.innerHTML = '<a href="http://e-shuushuu.net/image/' + myurl[4]
			+ '/"><img src="http://e-shuushuu.net/images/thumbs/' + myurl[1]
			+ "-" + myurl[2]+ "-" + myurl[3]+ "-" + myurl[4]
			+ '.jpeg" /></a>';
		    node.parentNode.insertBefore(elem,
						 node.nextSibling);
		} else if (myurl = /http:\/\/(\S+)fastpic\.ru\/big\/(\S+)\.(jpg|png|gif)/
			   .exec(node.href)) { // Fastpic.ru
			var elem = document.createElement("div");
		    elem.setAttribute("style", "margin-top: 5px;");
		    elem.innerHTML = '<a href="' + myurl[0]
			+ '"><img src="http://' + myurl[1] + 'fastpic.ru/thumb/' + myurl[2]
			+ '.jpeg" /></a>';
		    node.parentNode.insertBefore(elem,
						 node.nextSibling);
		} else if (myurl = /http:\/\/(\S{0,})rghost\.ru\/(\S+)\/image\.png/
			   .exec(node.href)) { // RGHost.ru
			var elem = document.createElement("div");
		    elem.setAttribute("style", "margin-top: 5px;");
		    elem.innerHTML = '<a href="' + myurl[0]
			+ '"><img src="http://' + myurl[1] + 'rghost.ru/' + myurl[1] + '/thumb.png" /></a>';
		    node.parentNode.insertBefore(elem,
						 node.nextSibling);
		} else if (myurl = /http:\/\/(\S{0,})rghost\.ru\/(\S+)\.view/
			   .exec(node.href)) { // RGHost.ru
			var elem = document.createElement("div");
		    elem.setAttribute("style", "margin-top: 5px;");
		    elem.innerHTML = '<a href="' + myurl[0]
			+ '"><img src="http://' + myurl[1] + 'rghost.ru/' + myurl[2] + '/thumb.png" /></a>';
		    node.parentNode.insertBefore(elem,
						 node.nextSibling);
		} else if (myurl = /http:\/\/(\S{0,})rghost\.ru\/(\S+)\.image/
			   .exec(node.href)) { // RGHost.ru
			var elem = document.createElement("div");
		    elem.setAttribute("style", "margin-top: 5px;");
		    elem.innerHTML = '<a href="' + myurl[0]
			+ '"><img src="http://' + myurl[1] + 'rghost.ru/' + myurl[2] + '/thumb.png" /></a>';
		    node.parentNode.insertBefore(elem,
						 node.nextSibling);
		} else if (myurl = /http:\/\/(\S+)deviantart\.com\/art\/(\S+)-(\d+)/
			   .exec(node.href)) { // DeviantArt
			var elem = document.createElement("div");
		    elem.setAttribute("style", "margin-top: 5px;");
		    elem.innerHTML = '<object width="300" height="400"><param name="movie" value="http://backend.deviantart.com/embed/view.swf" /><param name="wmode" value="transparent"></param><param name="flashvars" value="id=' + myurl[3] + '&width=1337" /><param name="allowScriptAccess" value="always" /><embed src="http://backend.deviantart.com/embed/view.swf" type="application/x-shockwave-flash" width="500" flashvars="id=' + myurl[3] + '&width=1337" height="600" wmode="transparent" allowscriptaccess="always"></embed></object>';
		    node.parentNode.insertBefore(elem,
						 node.nextSibling);
		} else if (myurl = /http:\/\/yfrog\.com\/(.*)/
			   .exec(node.href)) { // YFrog
			var elem = document.createElement("div");
		    elem.setAttribute("style", "margin-top: 5px;");
		    elem.innerHTML = '<a href="' + myurl[0]
			+ '"><img src="http://yfrog.com/' + myurl[1] + '.th.jpg" /></a>';
		    node.parentNode.insertBefore(elem,
						 node.nextSibling);
		} else if (myurl = /http:\/\/(www\.|)twitpic\.com\/(.*)/
			   .exec(node.href)) { // TwitPic
			var elem = document.createElement("div");
		    elem.setAttribute("style", "margin-top: 5px;");
		    elem.innerHTML = '<a href="' + myurl[0]
			+ '"><img src="http://twitpic.com/show/thumb/' + myurl[2] + '" /></a>';
		    node.parentNode.insertBefore(elem,
						 node.nextSibling);
		} else if (myurl = /http:\/\/ipicture\.ru\/upload\/(\d+)(\/\d+|)\/(.+)\.(jpg|png|gif)/
			   .exec(node.href)) { // iPicture.ru
			var elem = document.createElement("div");
		    elem.setAttribute("style", "margin-top: 5px;");
		    elem.innerHTML = '<a href="' + myurl[0]
			+ '"><img src="http://ipicture.ru/upload/' + myurl[1] + myurl[2] + '/thumbs/' + myurl[3] + '.' + myurl[4] + '" /></a>';
		    node.parentNode.insertBefore(elem,
						 node.nextSibling);
		} else if (myurl = /http:\/\/(www.|)ljplus\.ru\/img4\/(.)\/(.)\/(.+)\/(.+)\.(jpg|gif|png)/
			   .exec(node.href)) { // LJPlus
			var elem = document.createElement("div");
		    elem.setAttribute("style", "margin-top: 5px;");
		    elem.innerHTML = '<a href="' + myurl[0]
			+ '"><img src="http://www.ljplus.ru/img4/' + myurl[2] + '/' + myurl[3] + '/' + myurl[4] + '/th_' + myurl[5] + '.' + myurl[6] + '" /></a>';
		    node.parentNode.insertBefore(elem,
						 node.nextSibling);
		} else if (myurl = /http:\/\/(.+)\.imagehost\.org\/(.+).(jpg|png|gif)/
			   .exec(node.href)) { // ImageHost.org
			var elem = document.createElement("div");
		    elem.setAttribute("style", "margin-top: 5px;");
		    elem.innerHTML = '<a href="' + myurl[0]
			+ '"><img src="http://' + myurl[1] + '.imagehost.org/t/' + myurl[2] + '.jpg" /></a>';
		    node.parentNode.insertBefore(elem,
						 node.nextSibling);
		} else if (myurl = /http:\/\/omploader\.org\/(v|i)(.+)(\/.+|)/
			   .exec(node.href)) { // OMPLoader.org
			var elem = document.createElement("div");
		    elem.setAttribute("style", "margin-top: 5px;");
		    elem.innerHTML = '<a href="' + myurl[0]
			+ '"><img src="http://omploader.org/t' + myurl[2] + '" /></a>';
		    node.parentNode.insertBefore(elem,
						 node.nextSibling);
		} else if (myurl = /http:\/\/img(\S+)imageshack\.us\/i\/(\S+)\.(jpg|gif|png)/.exec(node.href)) { // ImageShack
		    //Заглушка
		} else if (myurl = node.href.match(/http:\/\/images\.4chan\.org\/(.+)\.(jpg|png|gif)/)) { // 4Chan
		    //Заглушка
		}else if ((myurl = node.href.match(/(.*)\.(jpg|gif|png|jpeg)/)) && full_image) { // If nothing can help
		    var elem = document.createElement("div");
		    elem.setAttribute("style", "margin-top: 5px;");
		    elem.innerHTML = '<a href="' + myurl[0]
			+ '"><img src="' + myurl[0] + '" style="max-width: 500px; max-height: 400px; width: auto; height: auto;" /></a>';
		    node.parentNode.insertBefore(elem,
						 node.nextSibling);
		} else if ((myurl = node.href.match(/http:\/\/pics\.livejournal\.com\/(.+)\/pic\/(.+)/)) && full_image) { // LJ Pics
		    var elem = document.createElement("div");
		    elem.setAttribute("style", "margin-top: 5px;");
		    elem.innerHTML = '<a href="' + myurl[0]
			+ '"><img src="' + myurl[0] + '" style="max-width: 500px; max-height: 400px; width: auto; height: auto;" /></a>';
		    node.parentNode.insertBefore(elem,
						 node.nextSibling);
		} else if ((myurl = /http:\/\/bayimg\.com\/(.+)/
			    .exec(node.href)) && full_image) { // BayImg
			var elem = document.createElement("div");
		    elem.setAttribute("style", "margin-top: 5px;");
		    elem.innerHTML = '<a href="' + myurl[0]
			+ '"><img src="http://bayimg.com/image/' + myurl[1].toLowerCase() + '.jpg" style="max-width: 500px; max-height: 400px; width: auto; height: auto;" /></a>';
		    node.parentNode.insertBefore(elem,
						 node.nextSibling);
		}
	    }
	}

	resolve("//div[@class='msgtxt']/a");// Individual post

    }

})();
