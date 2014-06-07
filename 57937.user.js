//
//
// ==UserScript==
// @name          Dirty Script
// @namespace     http://dirty.ru/
// @description   dirty stuff
// @include       http://www.dirty.ru/*
// @include       http://dirty.ru/*
// ==/UserScript==

/**
* Obclick handler
*/	
if (document.getElementById('copy')) {

	function DocOnClick(e) {
		var el = e.target;
		var ratingDiv;
		while(el) {
			if (isNamed(el, 'span') && hasClass(el, 'rating')) {
				// Set flag that rating is clicked
				ratingDiv = el;
			} else if (ratingDiv && isNamed(el, 'div') && hasClass(el, 'post')) {
				var id = el.id;
				var type = 0;
				if (id.charAt(0) == 'p') {
					id = id.substr(1);
					type = 1;
				}
				getVotes(id, ratingDiv, type)
			} else if (hasClass(el, 'vote')  && el.getAttribute('uid')) {
				getVotes(el.getAttribute('uid'), el, 0, true)
			} else if (isNamed(el, 'div') && hasClass(el, 'p') && !isNamed(e.target, 'a')) {
				nav.mark(getPostDate(el))
			}
			el = el.parentNode;
		}
	}
	var today = new Date();
	function getPostDate(el) {
		if (/((\d{2})\.(\d{2})\.(\d{4})|сегодня|вчера) в (\d{2})\.(\d{2})/.test(el.textContent)) {
			var y,m,d;
			if (RegExp.$1 == "сегодня") {
				y = today.getFullYear(); 
				m = today.getMonth(); 
				d = today.getDate();
			} else if (RegExp.$1 == "вчера") {
				y = today.getFullYear(); 
				m = today.getMonth(); 
				d = today.getDate() - 1;
			} else {
				y = RegExp.$4; 
				m = RegExp.$3-1; 
				d = RegExp.$2;
			}

			return new Date(y,m,d,RegExp.$5,RegExp.$6);
		} else {
			return null;
		}
	}

	function isNamed(el, name) {
		return el.nodeName ? el.nodeName.toLowerCase()==name.toLowerCase() : false;
	}

	function hasClass(el, className) {
		var classRe = new RegExp('\\b'+className+'\\b');
		return el.className ? classRe.test(el.className)==true : false;
	}

	function getVotes(id, el, type, isCarma) {
		var xmlhttp = new XMLHttpRequest();
		xmlhttp.open('POST', window.location.protocol+'//'+window.location.host+'/'+(isCarma ? 'karmactl':'votesctl'), true);
		xmlhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
		xmlhttp.setRequestHeader('Referer', window.location.href);
		xmlhttp.onreadystatechange = function() {
			if (xmlhttp.readyState == 4) {
				if(xmlhttp.status == 200) {
					showRes(eval ('res = ' +xmlhttp.responseText), el);
				}
			}
		};
		var addenum = '';
		if (!isCarma && !type){
			var eln = document.getElementById('navigation');
			if (eln) {
				var elp = eln.getElementsByClassName('post');
				if (elp && elp.length && elp[0].id) {
					addenum += '&post_id='+elp[0].id.substr(1); 				
				}
			}
		}
		xmlhttp.send((isCarma?'view=':'type='+type+'&id=')+id+addenum);
	}
	function showRes(res, el) {
		var div = document.getElementById("ds_show_div");
		if (!div) {
			document.body.appendChild(div = document.createElement('div'));
			div.style.cssText = 'position:absolute;top:20px;left:20px;background:#fff;padding:10px;border:1px solid #999;z-index:1200;font-size:10px; height:200px; overflow:auto;width:500px;height:400px';
			div.id = 'ds_show_div';
			document.addEventListener('click', function(e){div.style.visibility = 'hidden'}, true);
		}
		var pos = getPos(el);
	
		div.style.visibility = 'visible';
		div.style.top = (pos.y+el.offsetHeight)+'px';
		div.style.left = pos.x+'px';
		var buff = [];
		buff.push('<b>Voted: '+res.voters+'</b><table border="0"><tr>');
		res.votes.sort(function(a,b){
			return (b.attitude-a.attitude) || (a.uid-b.uid);
		});
		for (var i=0; i<res.votes.length; i++) {
			var e = res.votes[i];
			if (i>0 && i%4==0) buff.push('</tr><tr>');
			buff.push('<td><a href="http://www.dirty.ru/users/'+e.uid+'">'+e.login+'</a></td><td nowrap> '+e.attitude+'</td><td>&nbsp;</td>');
		}
		buff.push('</tr></table>');
		div.innerHTML = buff.join('');
	
	
	}


	function getPos(el) {
		var rv = {x:0,y:0}
		while (el) {
			rv.x += el.offsetLeft; //-el.scrollLeft; 
			rv.y += el.offsetTop; //-el.scrollTop; 
			el = el.offsetParent;
		}
		return rv;
	
	}

	function Navigator() {
		var currDiv = document.getElementById('new');
		var me = this;
		var ps = document.getElementsByClassName('p');
		var posts = [];
		for(i=0; i<ps.length; i++) {
			ps[i].style.cursor = 'pointer';
			posts.push([ps[i], getPostDate(ps[i])]);		
		}
		posts.sort(function(a, b) {
			return a[1]>b[1] ? 1 : (a[1]<b[1] ? -1 : 0)
		}) 
		index = posts.length-1;

		this.first = function(e) {
			index = 0;
			e.preventDefault();
			scrollIn();
		}
		this.last = function(e) {
			index = posts.length-1;
			e.preventDefault();
			scrollIn();
		}
		this.next = function(e) {
			index += index<posts.length-1 ? 1 : 0 ;
			e.preventDefault();
			scrollIn();
		}
		this.prev = function(e) {
			index -= index>0 ? 1 : 0 ;
			e.preventDefault();
			scrollIn();
		}
		function scrollIn() {
			posts[index][0].parentNode.parentNode.scrollIntoView();
		}
		this.mark = function(dt) {
			var d, found = false;
			for (i=0, l=posts.length; i<l; i++) {
				d = posts[i][1];	
				if (d && dt<=d) {
					ps[i].parentNode.parentNode.className += ' new';
					if (!found) {
						index=i; found=true;
					}
				} else {
					ps[i].parentNode.parentNode.className = ps[i].parentNode.parentNode.className.replace(/\bnew\b/g, '');
				}
			}
		}
	}

	function addLink(div, text, func) {
		a = div.appendChild(document.createElement('a'));
		a.appendChild(document.createTextNode(text));
		a.href='#';
		a.addEventListener('click', func, true);
		div.appendChild(document.createTextNode(' \xA0 '));
	}

	var nav = new Navigator();

	document.addEventListener('click', DocOnClick, true);

	document.body.appendChild(div = document.createElement('div'));
	div.style.cssText = 'position:fixed;top:10px;right:10px;background:#fff;padding:10px;border:1px solid #999;z-index:1200;font-size:10px; overflow:auto;';
	div.id = 'ds_nav_div';


	addLink(div, '|<', nav.first);
	addLink(div, '<<', nav.prev);
	addLink(div, '>>', nav.next);
	addLink(div, '>|', nav.last);
	//document.addEventListener('click', function(e){div.style.visibility = 'hidden'}, true);
} else {
	var hash = location.hash
	var newEl = document.getElementById('show_new');
	if (newEl && /\((\d+)\)/.test(newEl.textContent)) {
		hash = '#last'+RegExp.$1;
	}
/*	window.setTimeout( function() {
		location.assign(location.protocol+'//'+location.host+location.pathname+'?'+(new Date().getMilliseconds())+hash);
	}, 2000);
	*/
}
