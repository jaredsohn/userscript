// ==UserScript==
// @name           Rasmus Modifications
// @namespace      http://jobson.us
// @include        http://www.rasmuscatalog.com/cgi-bin/mnlist.cgi*
// @include        http://rasmuscatalog.com/cgi-bin/mnlist.cgi*
// @include        http://rasmus.com/*
// @include        http://www.rasmus.com/*
// @include        http://rasmus.com/auction_detail.php*
// @include        http://www.rasmus.com/auction_detail.php*
// ==/UserScript==


var wlh = window.location.href;

var rm = {
	auction: null,
	list: [],
	init: function() {
		rm.setupCSS();
		if (wlh.match(/mnlist.cgi/)) rm.allOnePage();
		if (wlh.match(/mnlist.cgi/)) rm.stars();
		if (wlh.match(/mnlist.cgi/)) rm.showFavorites();
	},
	setupCSS: function() {
		GM_addStyle('#starTD { color: white; font-weight: bold; text-align: center; }');
		GM_addStyle('#starTD div { text-decoration: underline; font-weight: normal; cursor: pointer; }');
		GM_addStyle('td.favStar { text-align: center; }');
		GM_addStyle('td.favStar div { font-size: 1.5em; cursor: pointer; }');
		GM_addStyle('div.off { color: black; }');
		GM_addStyle('div.on { color: red; }');
	},
	stars: function() {
		rm.auction = document.getElementsByName('auction')[0].getAttribute('value').match(/rasmus(\d+)/)[1];
		rm.list = GM_getValue(rm.auction);
		rm.list = (rm.list) ? rm.list.split(',') : [];
					
		var tr = document.getElementById('DataTable').getElementsByTagName('tbody')[0].getElementsByTagName('tr');
		for (var i=0;i<tr.length;i++) {
			var td = document.createElement('td');
				td.setAttribute('class','favStar');
			tr[i].insertBefore(td,tr[i].getElementsByTagName('td')[1]);
			if (i==0) {
				td.innerHTML = 'star';
				td.setAttribute('id','starTD');
				td.removeAttribute('class','');
			} else {
				var star = td.appendChild(document.createElement('div'));
					star.setAttribute('id',tr[i].getElementsByTagName('a')[0].getAttribute('href').match(/\d+$/)[0]);
					
					if (rm.list.indexOf(star.getAttribute('id')) == -1) {
						star.setAttribute('class','off');
						star.innerHTML = '\u2606';
					} else {
						star.setAttribute('class','on');
						star.innerHTML = '\u2605';
					}
					
								
				star.addEventListener('click',function() {
					if (this.getAttribute('class') == 'off') {
						rm.list.push(this.getAttribute('id'));
						rm.list = rm.list.unique();
						GM_setValue(rm.auction,rm.list.join(','));
						this.innerHTML = '\u2605';
						this.setAttribute('class','on');
					} else {
						rm.list = rm.list.remove(this.getAttribute('id'))
						GM_setValue(rm.auction,rm.list.join(','));
						
						this.setAttribute('class','off');
						this.innerHTML = '\u2606';
					}
					rm.updateStarList();
				},false);
			}
		}
	},
	updateStarList: function() {
		document.getElementsByName('show stared')[0].value = rm.list.join('/')+'/';
	},
	showFavorites: function() {
		var f = document.getElementsByTagName('form')[5];
		
		var newVal = '';
		
		if (!rm.list) return;
		if (rm.list.length==0) return;
		

		var td = document.getElementById('SelectPage').getElementsByTagName('tbody')[0].getElementsByTagName('td')[0].getElementsByTagName('p')[0];
		
		td.appendChild(document.createTextNode('\u00a0'));
		
		var inp = td.appendChild(document.createElement('input'));
			inp.type = 'hidden';
			inp.name = 'show stared';
			inp.value = rm.list.join('/')+'/';
		var sub = td.appendChild(document.createElement('input'));
			sub.type = 'submit';
			sub.value = 'show stared';
			sub.name = 'page';
	},
	allOnePage: function() {
		var f = document.getElementsByTagName('form')[5];
		
		var newVal = '';
		
		var inp = f.getElementsByTagName('input');
		for (var i=0;i<inp.length;i++) {
			if (inp[i].type != 'hidden') continue;
			if (/p\d+/.test(inp[i].name)) {
				newVal += inp[i].value;
				continue;
			}
		}
		var td = document.getElementById('SelectPage').getElementsByTagName('tbody')[0].getElementsByTagName('td')[0].getElementsByTagName('p')[0];
		td.appendChild(document.createElement('br'));
		td.appendChild(document.createElement('br'));
		var inp = td.appendChild(document.createElement('input'));
			inp.type = 'hidden';
			inp.name = 'show all';
			inp.value = newVal;
		var sub = td.appendChild(document.createElement('input'));
			sub.type = 'submit';
			sub.value = 'show all';
			sub.name = 'page';
			
		document.getElementById('TableTop').parentNode.insertBefore(f.cloneNode(true),document.getElementById('TableTop'))
		
	}
};

Array.prototype.remove = function(val) {
	var out = [];
	for (var i=0;i<this.length;i++) {
		if (this[i] != val) out.push(this[i]);
	}
	return out;
}

Array.prototype.unique = function() {
	var a = [];
	var l = this.length;
	for(var i=0; i<l; i++) {
		for(var j=i+1; j<l; j++) {
			// If this[i] is found later in the array
			if (this[i] === this[j])
			j = ++i;
		}
		a.push(this[i]);
	}
	return a;
};

rm.init();
