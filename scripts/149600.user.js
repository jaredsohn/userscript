// ==UserScript==
// @name		IMDb Movie Ratings @ Name pages
// @namespace	http://userscripts.org/users/248610
// @include		http://www.imdb.com/name/nm*
// @run-at		document-end
// @grant       GM_log
// @grant		GM_xmlhttpRequest
// @updateURL	http://userscripts.org/scripts/source/149600.user.js
// @downloadURL	http://userscripts.org/scripts/source/149600.user.js
// @version		1.3.0
// ==/UserScript==

(function () {

	var uid = 248610;

	if (top !== self) {
		return;
	}

	// http://www.imdb.com/name/nm0000113/?ref_=tt_cl_t1
	var uri = document.location.href.split('/');
	var nameId = uri[4];
	//GM_log(nameId);

	var sortAsc = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAAK8AAACvABQqw0mAAAAUxJREFUOMutkjFLQlEYhp9z0UgiNP9Ag4I/oMmlTQoyEHS/l5ZGtyChqa1NcAkcjkMOuggKIW4NXRD6A3L/ghZcw4bu/RpMSb1aVC8cOHDO+8D3vp8SEf4igz/qfwG1Wm1+L9Vto9AcSaE5kkwms/I+l4isnMu7RyPfGEqlP5ZKfyz5xlASiQQigtZ64a9aDrFUt41BOOWdH+zw8uYDENs2uH16pXu2r1zXXfi/ACjVbcPZSnlXh7v4Au9TP6HPQa8fXGLdC1WtVuee0FfaIJzyykfRtYGVj6MUuRFABQL2vFGneC8nm1KP+89tiAeP8BuFlmpsA9lvPB3TNE8DAUA2l8ttdLdarezaFpRSaK3ni+P70xoMY1pDr9fDNE21EQCgtZZ0Os1kMgEgEolg2zaWZa1kFgiYQZLJJACO42BZlppt7o8AMwiw1gzwAYspqiwRNY6EAAAAAElFTkSuQmCC";
	var sortDesc = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAAK8AAACvABQqw0mAAAATdJREFUOMutksFKAlEUhr8zBiURlb5Ai3mDVm6CFgNBhoIk7VxFG6EnaDVP0DJyc3YhCYIuAhdBLlz1BnfRC5jCEBY0c1voRKWjhf2rC5f/O+f/OWKtZRk5LKn/Bajq17ejqlZVred5U/+xZFYHquoAoeu6ABhj8H1fjDGoKpVKJRkQm3O5HKPRCIB0Ok2v16NarUoQBMkbqKojIqHneVhriaJonNMZJ+10OnS7XanVap+elR/bh4VCIbGwYrEIYAFJArSbzebhguJbC0v8i75tcHpjWoNUJj/PsB0+t69P3KOZgEEqk7882Jw78fyOfGIEEaFU79uLvQ0A3qPJlMm5+Q8Bt8cZmQsAKNX79mx3neHrmLC15nD1+EKjnJ3qbCYghuzvrAJw//RGo5wVgF8DYgiQaAb4AAREi4pfpJt8AAAAAElFTkSuQmCC";
	var icoSort = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAAK8AAACvABQqw0mAAAAPJJREFUOMutkrGNg0AQRd8gJ/RBEy5go+MEHewWQBe0QbDTAZKdERLQBF0QEMFe4MOybPa4k+9HK63+0/w/IyEE3lHCm/pfgKo+vhNVDaoajDEv/5tkrwNVTYAlyzIAxnGkrmsZxxFVxVobB2zm8/nMPM8ApGnKMAxUVSXTNMUnUNVERBZjDCEE1nW95UxuSbuuo+97aZrm7jk9Tb8URREtrCxLgABIDHBt2/bjoPjLYYl/0empwAuQH3iu1trPWIT8O2dUbdvm0Qgigvf+fjh7W7DWyo8AAO992LsD59xLZ7uADfJ4ic45Afg1YIMAUTPAF4/RiXelr/HCAAAAAElFTkSuQmCC";
	
	Function.prototype.bind = function( obj ) {
		var method = this;
		var oldargs = [].slice.call( arguments, 1 );
		return function () {
			var newargs = [].slice.call( arguments );
			return method.apply( obj, oldargs.concat( newargs ));
		};
	}
	
	swap = function (e, id) {
		document.getElementById('ico-rating-' + id).src = icoSort;
		document.getElementById('ico-vote-' + id).src = icoSort;
		document.getElementById('ico-year-' + id).src = icoSort;
		var y = 0;
		var el = e.target;
		for(y = 0; el; el = el.offsetParent) {
			y += el.offsetTop;
		}
		y = e.pageY - y;
		if (y < 9) {
			e.target.src = sortAsc;
			return true;
		} else {
			e.target.src = sortDesc;
			return false;
		}
	}
	
	function sortRows(id, f) {
		var t = document.getElementById('data-' + id);
		var r = t.rows;
		r = Array.prototype.splice.call(r, 0);
		r.sort(f);
		while (t.hasChildNodes()) {
			t.removeChild(t.firstChild);
		}
		var cnt = 0;
		for (i = 0; i < r.length; i++) {
			t.appendChild(r[i]);
			if (r[i].style.display == 'block') {
				markRow(r[i], ++cnt%2 ? 'odd' : 'even');
			}
		}
	}

// -- SORTING YEAR --	
	cya = function (a, b) {
		var va = parseInt(a.getAttribute('movie-year'));
		var vb = parseInt(b.getAttribute('movie-year'));
		if (va < vb) {return -1}
		if (va > vb) {return 1}
		return 0;
	}
	cyd = function (a, b) {
		var va = parseInt(a.getAttribute('movie-year'));
		var vb = parseInt(b.getAttribute('movie-year'));
		if (va < vb) {return 1}
		if (va > vb) {return -1}
		return 0;
	}
	tableSortYear = function (e, id) {
		sortRows(id, (swap(e, id) ? cya : cyd));
	}

// -- SORTING RATING --	
	cra = function (a, b) {
		var va = parseFloat(a.getAttribute('movie-rating'));
		var vb = parseFloat(b.getAttribute('movie-rating'));
		if (va < vb) {return -1}
		if (va > vb) {return 1}
		return 0;
	}
	crd = function (a, b) {
		var va = parseFloat(a.getAttribute('movie-rating'));
		var vb = parseFloat(b.getAttribute('movie-rating'));
		if (va < vb) {return 1}
		if (va > vb) {return -1}
		return 0;
	}
	tableSortRating = function (e, id) {
		sortRows(id, (swap(e, id) ? cra : crd));
	}

// -- SORTING VOTE --	
	cva = function (a, b) {
		var va = parseInt(a.getAttribute('movie-vote'));
		var vb = parseInt(b.getAttribute('movie-vote'));
		if (va < vb) {return -1} 
		if (va > vb) {return 1}
		return 0;
	}
	cvd = function (a, b) {
		var va = parseInt(a.getAttribute('movie-vote'));
		var vb = parseInt(b.getAttribute('movie-vote'));
		if (va < vb) {return 1} 
		if (va > vb) {return -1}
		return 0;
	}
	tableSortVote = function (e, id) {
		sortRows(id, (swap(e, id) ? cva : cvd));
	}

    addSpaces = function (s) {
        s += "";
        var re = /(\d+)(\d{3})/;
        while (re.test(s)) {
            s = s.replace(re, "$1 $2");
        }
        return s;
    };
    
    markRow = function (row, parity) {
		row.children[0].className = 'filmo-row ' + parity;
		row.children[0].children[0].className = 'filmo-row ' + parity;
		row.children[1].className = 'filmo-row ' + parity;
    }
	
	filter = function (e, id) {
		var sel = e.target;
		var data = localStorage.getItem(nameId);
		var compartments = new Array();
		if (data) {
			compartments = JSON.parse(data);
		}
		var found = false;
		if (compartments.length > 0) {
			for (var c in compartments) {
				if(compartments[c].id == id) {
					compartments[c].movieType = sel.options[sel.selectedIndex].value;
					found = true;
				}
			}
		}
		if (!found) {
			compartments.push({
				  movieType : sel.options[sel.selectedIndex].value
				, orderType : ''
				, orderDir  : ''
				, id: id
			});
		}
		localStorage.setItem(nameId, JSON.stringify(compartments));
		var t = document.getElementById('data-' + id);
		var cnt = 0;
		for (var i=0; i<t.rows.length; i++) {
			var type = t.rows[i].getAttribute('movie-type');
			if (sel.options[sel.selectedIndex].value == 'ALL') {
				t.rows[i].style.display = 'block';
				markRow(t.rows[i], ++cnt%2 ? 'odd' : 'even');
			} else if (sel.options[sel.selectedIndex].value == type) {
				t.rows[i].style.display = 'block';
				markRow(t.rows[i], ++cnt%2 ? 'odd' : 'even');
			} else {
				t.rows[i].style.display = 'none';
			}
		}
		sel.blur();
	}
	
	process = function (td, id, res) {
GM_log('ID: ' + id);
		var imdb;
		if (/^imdb\.rating\.run\((.*)\)$/.exec(res.responseText)) {
			imdb = JSON.parse(RegExp.$1);
			imdb.resource.rating = imdb.resource.rating ? imdb.resource.rating : '&empty;';
		} else {
			imdb = {
				resource: {
					  rating: "&empty;"
					, ratingCount: 0
				}
			};
		}
		
		if (imdb.resource.titleType) {
			var sel = document.getElementById('select-' + id);
			if (sel) {
				var found = false;
				for (var i=0; i<sel.options.length; i++) {
					if (sel.options[i].value == imdb.resource.titleType) {
						found = true;
					}
				}
				if (!found) {
					var opt = document.createElement('option');
					opt.value = imdb.resource.titleType;
					opt.text = imdb.resource.titleType;
					sel.appendChild(opt);
					
					var data = localStorage.getItem(nameId);
					var compartments = new Array();
					if (data) {
						compartments = JSON.parse(data);
					}
					
					for (var c in compartments) {
						if(compartments[c].id == id) {
							if (compartments[c].movieType) {
								if (compartments[c].movieType != 'ALL') {
									for (var i=0; i<sel.options.length; i++) {
										if (sel.options[i].value == compartments[c].movieType) {
											sel.options[i].selected = 'selected';
											var evt = document.createEvent('HTMLEvents');
											evt.initEvent('change', false, false);
											sel.dispatchEvent(evt);
										}
									}
								}
							}
						}
					}
				}
			}
		}
		
		//GM_log ('RATING: ' + imdb.resource.rating);
		var mr = td.parentNode.parentNode.parentNode.parentNode.parentNode;
		mr.setAttribute('movie-type', imdb.resource.titleType);
		var r = typeof (imdb.resource.rating) === "number" ? imdb.resource.rating.toFixed(1) : imdb.resource.rating;
		var w = typeof (imdb.resource.rating) === "number" ? Math.ceil(140*r/10) : 0;
		mr.setAttribute('movie-rating', typeof (imdb.resource.rating) === "number" ? imdb.resource.rating : 0);
		mr.setAttribute('movie-year', typeof (imdb.resource.year) === "number" ? imdb.resource.year : 9999);
		mr.setAttribute('movie-vote', typeof (imdb.resource.ratingCount) === "number" ? imdb.resource.ratingCount : 0);
		
		var ur = document.createElement('div');
		ur.className = 'user_rating';
		var rl = document.createElement('div');
		rl.className = 'rating rating-list';
		rl.style.backgroundColor = 'White';
		rl.setAttribute('data-ga-identifier', 'advsearch');
		rl.setAttribute('data-auth', '');
		rl.id = '';
		
		var rb = document.createElement('span');
		rb.className = 'rating-bg';
		rb.textContent = ' ';
		rl.appendChild(rb);
		
		var ri = document.createElement('span');
		ri.style.width = w + 'px';
		ri.style.display = 'block';
		ri.className = 'rating-imdb';
		ri.textContent = ' ';
		rl.appendChild(ri);
		
		var rr = document.createElement('span');
		rr.className = 'rating-rating';
		
		var v = document.createElement('span');
		v.className = 'value';
		v.innerHTML = r;
		rr.appendChild(v);

		var gs = document.createElement('span');
		gs.className = 'grey';
		var s = document.createTextNode('/');
		gs.appendChild(s);
		rr.appendChild(gs);

		var gt = document.createElement('span');
		gt.className = 'grey';
		var t = document.createTextNode('10');
		gt.appendChild(t);
		rr.appendChild(gt);

		rl.appendChild(rr);

		ur.appendChild(rl);
		
		td.appendChild(ur);
		
		var vv = td.parentNode.nextSibling.children[0];
		if (vv) {
			var rc;
			var tv = document.createElement('div');
			tv.style.color = '#666666';
			tv.style.fontSize = '11px';
			if (imdb.resource.ratingCount) {
				// tv.className = 'star-box-details';
				rc = document.createTextNode(addSpaces(imdb.resource.ratingCount) + ' votes');
				var a = document.createElement('a');
				a.href = imdb.resource.id + 'ratings';
				a.appendChild(rc);
				a.style.textDecoration = 'none';
				tv.appendChild(a);
			} else {
				rc = document.createTextNode('(awaiting 5 votes)');
				tv.appendChild(rc);
			}
			vv.appendChild(tv);
		}
		
		// td.parentNode.parentNode.parentNode.parentNode.parentNode.setAttribute('rating', rating);
		// td.addEventListener('mouseover', sortTable, true);
	}
	
	sortTable = function (e) {
		var td = e.target;
		var ico = new Image();
		ico.src = sortDesc;
		ico.style.position = 'absolute';
		ico.style.top = td.offsetTop;
		ico.style.left = td.offsetLeft;
		td.appendChild(ico);
	}
	
	var fg = document.getElementById('filmography');
	
	for (var s = 1; s < fg.children.length; s += 2) {
// -------------------------------------------------------------
		var sid = new String(fg.children[s-1].id);
		var tt = fg.children[s].getElementsByClassName('filmo-row');
		var st = document.createElement('table');
		st.id = 'sort-' + sid;
		st.style.width = '100%';
		st.setAttribute('cellpadding', 0);
		st.setAttribute('cellspacing', 0);
		var stb = document.createElement('tbody');

		str = document.createElement('tr');
		std = document.createElement('td');
		var sel = document.createElement('select');
		sel.id = 'select-' + sid;
		//sel.className = 'fixed';
		var opt = document.createElement('option');
		opt.text = 'Show all';
		opt.value = 'ALL';
		sel.appendChild(opt);
		(function(sid) {sel.addEventListener('change', function (event) {filter(event, sid)}, false)})(sid);
		std.appendChild(sel);
		str.appendChild(std);
		
		std = document.createElement('td');
		var txt = document.createTextNode(' ');
		std.appendChild(txt);
		std.style.fontSize = '11px';
		std.style.width = '100%';
		str.appendChild(std);
		
		std = document.createElement('td');
		txt = document.createTextNode('rating');
		std.appendChild(txt);
		std.style.borderLeft = '1px Dotted #cccccc';
		std.style.padding = '0 4px 0 4px';
		std.style.color = '#cccccc';
		std.style.fontSize = '11px';
		str.appendChild(std);

		std = document.createElement('td');
		var ico = new Image();
		ico.src = icoSort;
		ico.style.cursor = 'pointer';
		ico.id = 'ico-rating-' + sid;
		(function(sid) {ico.addEventListener('click', function (event) {tableSortRating(event, sid)}, false)})(sid);
		std.setAttribute('align', 'center');
		std.setAttribute('valign', 'middle');
		std.appendChild(ico);
		str.appendChild(std);

		std = document.createElement('td');
		txt = document.createTextNode('votes');
		std.appendChild(txt);
		std.style.borderLeft = '1px Dotted #cccccc';
		std.style.padding = '0 4px 0 4px';
		std.style.color = '#cccccc';
		std.style.fontSize = '11px';
		str.appendChild(std);

		std = document.createElement('td');
		var ico = new Image();
		ico.src = icoSort;
		ico.style.cursor = 'pointer';
		ico.id = 'ico-vote-' + sid;
		(function(sid) {ico.addEventListener('click', function (event) {tableSortVote(event, sid)}, false)})(sid);
		std.setAttribute('align', 'center');
		std.setAttribute('valign', 'middle');
		std.appendChild(ico);
		str.appendChild(std);

		std = document.createElement('td');
		txt = document.createTextNode('year');
		std.appendChild(txt);
		std.style.borderLeft = '1px Dotted #cccccc';
		std.style.padding = '0 4px 0 4px';
		std.style.color = '#cccccc';
		std.style.fontSize = '11px';
		str.appendChild(std);

		std = document.createElement('td');
		var ico = new Image();
		ico.src = sortDesc;
		ico.style.cursor = 'pointer';
		ico.id = 'ico-year-' + sid;
		(function(sid) {ico.addEventListener('click', function (event) {tableSortYear(event, sid)}, false)})(sid);
		std.setAttribute('align', 'center');
		std.setAttribute('valign', 'middle');
		std.appendChild(ico);
		str.appendChild(std);

		std = document.createElement('td');
		txt = document.createTextNode(' ');
		std.appendChild(txt);
		std.style.padding = '0 4px 0 0';
		std.style.fontSize = '11px';
		str.appendChild(std);

		stb.appendChild(str);
		st.appendChild(stb);

		var tc = document.createElement('table');
		tc.id = 'data-' + sid;
		tc.style.width = '100%';
		tc.setAttribute('cellpadding', 0);
		tc.setAttribute('cellspacing', 0);
		var tbc = document.createElement('tbody');

		for (var i=0; i<tt.length; i++) {
			var mid;

			trc = document.createElement('tr');
			tdc = document.createElement('td');
			tdc.style.border = 'none';
			tdc.style.width = '100%';
			var fr = tt[i].cloneNode(true);
			if((/\/title\/(tt\d{7})\//g).exec(fr.children[1].children[0].href)) {
				mid = RegExp.$1;
			}
			
			tdc.setAttribute('class', fr.className);
			fr.style.border = 'none';
			tdc.setAttribute('valign', 'top');
			tdc.appendChild(fr);
			
			var year = fr.getElementsByClassName('year_column')[0];
			var yearValue = year.textContent;
			trc.appendChild(tdc);
			
			tdc = document.createElement('td');
			tdc.style.border = 'none';
			tdc.setAttribute('nowrap', 'nowrap');
			tdc.setAttribute('valign', 'top');
			tdc.setAttribute('class', fr.className);

			var t = document.createElement('table');
			t.style.width = '140px';
			var tb = document.createElement('tbody');
			var tr = document.createElement('tr');

			var td = document.createElement('td');
			td.setAttribute('align', 'left');

			tr.appendChild(td);
			tb.appendChild(tr);
			
			GM_xmlhttpRequest({
				  method: 'GET'
				, url: 'http://p.media-imdb.com/static-content/documents/v1/title/' + mid + '/ratings%3Fjsonp=imdb.rating.run:imdb.api.title.ratings/data.json'
				, onload: process.bind( {}, td, fg.children[s-1].id )
			});
			
			tr = document.createElement('tr');
			td = document.createElement('td');
			td.setAttribute('align', 'right');
			td.id = mid + 'voters';
			tr.appendChild(td);
			tb.appendChild(tr);

			tr = document.createElement('tr');
			td = document.createElement('td');
			td.textContent = yearValue;
			td.setAttribute('align', 'right');
			tr.appendChild(td);
			tb.appendChild(tr);

			t.appendChild(tb);

			tdc.appendChild(t);
			trc.appendChild(tdc);
			
			tbc.appendChild(trc);
			year.parentNode.removeChild(year);
			tt[i].style.display = 'none';
		}
		tc.appendChild(tbc);
		fg.children[s].innerHTML = '';
		fg.children[s].appendChild(st);
		fg.children[s].appendChild(tc);
// -------------------------------------------------------------
	}

} ) ();