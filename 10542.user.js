// Sensible Comments
// Redisplays comments in a more easily interpreted tree, and allows expanding / collapsing of threads
// version 2.0.1.2
// 2007-07-04
// Copyright (c) 2007 Rojo^
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Sensible Erection comment mods", and click Uninstall.
//
// ==UserScript==
// @name	   Sensible Comments
// @namespace	  http://userscripts.org/scripts/show/10318
// @description	Redisplays comments in a more easily interpreted tree, and allows expanding / collapsing of threads
// @include	http://sensibleerection.com/entry.php/*
// @include	http://*.sensibleerection.com/entry.php/*
// @version	2.0.1.2
// ==/UserScript==

(function () {
	function fblog(what) {
		if (console && console.log) console.log(what);
	};
	
	// *sigh* fix Firefox's weirdness about forms spanning table elements, and SE's weirdness about using them
	function fixModForm() {
		var selectTag = document.getElementById('mod_type_id');
		if (selectTag) {
			var options = selectTag.innerHTML;
			var tableDaddy = selectTag.parentNode.parentNode.parentNode.parentNode;
			var modAction = tableDaddy.innerHTML.match(/\/entry\.php\/\d+/);
			tableDaddy.innerHTML = '<tbody><tr><td><form name="mod_type" method="post" action="'+modAction+'">'
				+'<select name="mod_type_id" class="text11px" id="mod_type_id">'
				+options
				+'</select>'
				+'<input name="action" type="submit" id="action" value="moderate" class="text11px">'
				+'</form></td></tr></tbody>';
		}
	};
	fixModForm();

	var st = document.createElement('style');
	st.innerHTML = '.new0 { background-color: #f3f0e8; border: 1px solid #c77; }'
	+ '.new1 { background-color: #e7e4dd; border: 1px solid #c77; }'
	+ '.old0 { background-color: #f3f3df; border: 1px dotted #888; }'
	+ '.old1 { background-color: #e3e3cf; border: 1px dotted #888; }'
	+ '#comments li { left: 0; margin-bottom: 10px; }'
	+ '.sensibleComments { list-style: none; padding: 0; left: 5px; }'
	+ '.sensibleComments li { padding: 5px 10px; position: relative; float: left; width: 600px; margin: 5px 0; }'
	+ '.plusminus { background-color: #fff; border: 1px solid black; '
	+ 'float: left; margin-right: 5px; line-height: 8px; font-family: "Courier New","Courier",serif;}'
	+ '.plusminus td { text-align: center; vertical-align: 50%; text-size: 8px; cursor: pointer; }'
	+ '.equalhash { background-color: #fff; border: 1px solid black; '
	+ 'float: left; margin-right: 5px; line-height: 8px; font-family: "Courier New","Courier",serif;}'
	+ '.equalhash td { text-align: center; vertical-align: 50%; text-size: 8px; cursor: pointer; }';
	document.body.appendChild(st);
	
	var Layer1 = document.getElementById('Layer1');
	if (!Layer1) return false;
	var spacers = Layer1.getElementsByTagName('img');
	var posts = [], pageBuild = [], comments = [], depth=[];
	pageBuild[0] = Layer1.innerHTML.split(/<div class\="date_header_text">Comments<\/div>/)[0];
	pageBuild[1] = '<div class="date_header_text">Comments</div>';
	pageBuild[2] = '';  // this will be populated with the comments array
	pageBuild[3] = '<div class="date_header_text">Post a comment</div>';
	pageBuild[4] = Layer1.innerHTML.split(/<div class\="date_header_text">Post a comment<\/div>/)[1];
	
	function count(searchStr,arr) {
		var intCount = 0;
		var searchStr = new RegExp(searchStr,"gi");
		var strText = arr.join('');
		strText.replace(searchStr,function(){intCount++});
		return intCount;
	}

	var parent = document.getElementsByTagName('div');
	for (var i=0; i<parent.length; i++) {
		if (parent[i].className == 'date_header_text' && parent[i].innerHTML == 'Comments') {
			parent = parent[i];
			break;
		}
	}
	for (var i=0; i<spacers.length; i++) {
		if (spacers[i] && spacers[i].src.indexOf('/images/spacer.gif') > -1) {
			// array_element [ offset, content, new ]
			var tableNode = spacers[i].parentNode.parentNode.parentNode;
			var newComment = tableNode.getElementsByTagName('td')[1].style.backgroundColor == 'rgb(238, 238, 238)';
			posts[posts.length] = new Array(
				spacers[i].width / 10,
				tableNode.getElementsByTagName('td')[1].innerHTML,
				newComment
			);
		}
	}
	
	if (posts.length == 0) return false;
	
	for (var i=0; i<posts.length; i++) {
	var commentsFragment = [];
		commentsFragment.push('<ul class="sensibleComments">');
		commentsFragment.push('<li class="'+(posts[i][2]?'new':'old')+posts[i][0]%2+'" id="comment'+i+'">');
		// commentsFragment.push('<sup>'+i+'('+posts[i][0]+') </sup>');
		commentsFragment.push('<table class="plusminus" id="plusMinus'+i
			+'" title="Collapse thread"><tbody><tr><td>-</td></tr></tbody></table>');
		commentsFragment.push('<table class="equalhash" id="equalHash'+i
			+'" title="Hide sibling threads"><tbody><tr><td>=</td></tr></tbody></table>');
		commentsFragment.push(posts[i][1]);
		depth.push(posts[i][0]);
		comments.push(commentsFragment.join('\n'));
		depth.push('*');
		comments.push('</ul>');
	}
	
	for (var i=0; i<depth.length; i+=2) {
		if (!isNaN(depth[i]) && depth[i] > 0) {
			var comment = comments[i];
			comments.splice(i,1);
			comments.splice(i-depth[i],0,comment);
		}
	}
	
	pageBuild[2] = comments.join('\n');
	Layer1.innerHTML = pageBuild.join('\n');
	
	// slow down looping so Firefox doesn't complain about a script stopped
	// when a post with 150+ comments is being parsed
	var i=0;
	var nice = setInterval(function() {
		var pm = document.getElementById('plusMinus'+i);
		if (pm) {
			pm.addEventListener('click',function() {
				var obj = this;
   				const minus='<tbody><tr><td>-</td></tr></tbody>';
   				const plus='<tbody><tr><td>+</td></tr></tbody>';
   				var main = obj.parentNode.getElementsByTagName('span')[1];
   				main.style.display = (obj.innerHTML == plus) ? 'block' : 'none';
   				var children = obj.parentNode.getElementsByTagName('ul');
   				for (var i=0; i<children.length; i++) {
					children[i].style.display = main.style.display;
				}
				obj.innerHTML = (obj.innerHTML == plus) ? minus : plus;
				obj.setAttribute('title',obj.innerHTML == plus ? 'Expand thread' : 'Collapse thread');
			},true);
		}
		var eh = document.getElementById('equalHash'+i)
		if (eh) {
			eh.addEventListener('click',function() {
				var obj = this;
				const equal='<tbody><tr><td>=</td></tr></tbody>';
				const hash='<tbody><tr><td>#</td></tr></tbody>';
				var parentPost = obj.parentNode.parentNode.parentNode;
				var children = parentPost.childNodes;
				for (var i=0; i<children.length; i++) {
					if (children[i] != obj.parentNode.parentNode && children[i].className == 'sensibleComments') {
						children[i].style.display = (obj.innerHTML == hash) ? 'block' : 'none';
					}
				}
				obj.innerHTML = (obj.innerHTML == hash) ? equal : hash;
				obj.setAttribute('title',obj.innerHTML == hash ? 'Reveal sibling threads' : 'Hide sibling threads');
				obj = obj.wrappedJSObject || obj;
				obj.scrollIntoView();
				scrollTo(0, Math.floor(document.body.scrollTop - (window.innerHeight / 2)));
			},true);
		}
		i++;
		if (i == posts.length)
			clearInterval(nice);
	},10);
})();