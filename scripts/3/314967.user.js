// ==UserScript==
// @name        LeproFilter
// @namespace   Constantine
// @description 
// @include     http://leprosorium.ru/my/
// @version     1.0.0
// @grant       GM_log
// ==/UserScript==

(function(){
	Array.prototype.inArray = function(comparer) { 
	    for(var i=0; i<this.length; i++) { 
	        if(comparer(this[i])) return true; 
	    }
	    return false; 
	}; 

	Array.prototype.pushIfNotExist = function(element, comparer) { 
	    if (!this.inArray(comparer)) {
	        this.push(element);
	    }
	};

	var filter = function () {
		var pp = document.getElementsByClassName('post');
		var s = document.getElementById('domainFilter');
		for(var i=0; i<pp.length; i++) {
			var dn = pp[i].getElementsByClassName('sub_domain_url')[0];
			if (dn.textContent.indexOf(s.options[s.selectedIndex].textContent) == -1) {
				pp[i].style.display = 'none';
			} else {
				pp[i].style.display = 'block';
			}
		}
		document.body.focus();
	}
	
	var process = function (e, id) {
		GM_log(e.target.textContent + " : " + id);
		var coms = document.evaluate( '//div[@id="'+id+'"]/div[@class="dd"]/div[@class="p"]//span//a[contains(child::text(), "коммент")]' , document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null ).singleNodeValue;
		var newc = document.evaluate( '//div[@id="'+id+'"]/div[@class="dd"]/div[@class="p"]//span/a/strong[contains(child::text(), "новы")]' , document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null ).singleNodeValue;
		var things = document.evaluate( '//li[@id="things"]/a/span/em' , document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null ).singleNodeValue;
		var arr = /^мои\sвещи\s(\d{1,})\/?(\d{1,})?$/g.exec(things.textContent);
		GM_log(coms.textContent);
		if (!newc) {
			things.textContent = 'мои вещи ' + (arr[1]-1) + (arr[2]?('/'+arr[2]):'');
		}
		if (coms && newc) {
			if (coms.textContent.split(' ')[0] == newc.textContent.split(' ')[0]) {
				things.textContent = 'мои вещи ' + (arr[1]-1) + (arr[2]?('/'+(arr[2]-newc.textContent.split(' ')[0])):'');
			} else {
				things.textContent = 'мои вещи ' + arr[1] + (arr[2]?('/'+(arr[2]-newc.textContent.split(' ')[0])):'');
			}
		}
	}

	var c = document.getElementsByClassName('category')[0];
	var td = document.createElement('td');
	var l = document.createElement('label');
	l.textContent = 'Показывать только';
	l.setAttribute('for', 'domainFilter');
	l.style.padding = '0 4px 0 0';
	td.appendChild(l);
	var s = document.createElement('select');
	s.id = 'domainFilter';
	var dn = document.getElementsByClassName('sub_domain_url');
	var arr = new Array();
	for(var i=0; i<dn.length; i++) {
		var name = dn[i].textContent.split('.')[0];
		arr.pushIfNotExist(name, function(e) { 
		    return e == name;
		});
	}
	arr.sort();
	var o = document.createElement('option');
	s.appendChild(o);
	for (var i=0; i<arr.length; i++) {
		o = document.createElement('option');
		o.textContent = arr[i];
		s.appendChild(o);
	}
	s.addEventListener('change', filter);
	td.appendChild(s);
	c.rows[0].appendChild(td);
	
	var p = new Array();
	var posts = document.getElementsByClassName('post');
	for (var i=0; i<posts.length; i++) {
		var things = document.evaluate( '//div[@id="'+posts[i].id+'"]/div[@class="dd"]//div[@class="p"]//span//a[contains(@onmouseout, "del_from_my_things_out")]' , document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null );
		var post = posts[i].getElementsByClassName('p')[0];
		//var span = document.createElement('span');
		//span.innerHTML = "&sect;";
		//span.style.cursor = 'pointer';
		//(function (id) {
		//	span.addEventListener('click', function(event) {process(event, id)}, false);
		//})(posts[i].id);
		//post.appendChild(span);
		for (var l = 0; l<things.snapshotLength; l++) {
			var el = things.snapshotItem(l);
			(function (id) {
				el.addEventListener('click', function(event) {process(event, id)}, false);
			})(posts[i].id);
			el.style.color = 'Red';
		}
	}

})();