// ==UserScript==
// @name           IMDb: Add ratings from vote histories
// @description    Inserts ratings from other vote history lists into title pages.
// @author         kuehlschrank
// @version        2013.11.4
// @homepage       http://userscripts.org/scripts/show/93627
// @include        http://*.imdb.com/title/tt*/
// @include        http://*.imdb.com/title/tt*/?*
// @include        http://*.imdb.com/title/tt*/reference*
// @include        http://*.imdb.com/title/tt*/maindetails*
// @include        http://*.imdb.com/title/tt*/combined*
// @exclude        http://*.imdb.com/title/tt*/board/threads/
// @updateURL      https://userscripts.org/scripts/source/93627.meta.js
// @downloadURL    https://userscripts.org/scripts/source/93627.user.js
// ==/UserScript==

if(window.self != window.top) return;

var cacheLifetimeHours = 24;
var lists = loadLists();

var titleId;
try {
	titleId = parseInt(window.location.pathname.match(/\/tt0*(\d+)\//)[1], 10);
} catch(ex) { GM_log('Title ID could not be parsed:' + ex); return; }

var container;
try {
	container = insertContainer();
} catch(ex) { GM_log('Container could not be inserted: ' + ex); return; }

if(lists.length == 0) {
	container.textContent = 'No lists yet';
	insertAddListLink(container, lists);
} else {
	searchRatings(titleId, lists, container, cacheLifetimeHours);
}




function insertContainer() {
	GM_addStyle('#overview-top .other-ratings { margin-top: 10px } #overview-top .other-ratings > * { display: inline } #overview-top .other-ratings h5 { font-weight: normal; } .other-ratings a { text-decoration: none; color: black; } .other-ratings img { position: relative; bottom: -1px; } .other-ratings a.add { margin: 0 0 0 12px; } .other-ratings a.context { margin: 0 0 0 3px; display:none; } .other-ratings span + a.add { display:none; } .other-ratings:hover a.add, .other-ratings span:hover a.context { display: inline; }');
	var outer = document.createElement('div');
	outer.className = 'other-ratings';
	outer.innerHTML  = '<h5>Other Ratings:</h5>\n';
	var inner = document.createElement('div');
	outer.appendChild(inner);
	if(document.getElementById('overview-top')) {
		// new design
		document.querySelector('#overview-top div.star-box').appendChild(outer);
	} else {
		// old design (reference view)
		outer.className += ' info';
		inner.className = 'info-content';
		var node = document.getElementById('tn15rating');
		node.parentNode.insertBefore(outer, node.nextSibling);
	}
	return inner;
}


function insertAddListLink(container, lists) {
	var a = document.createElement('a');
	a.className = 'add';
	a.title = 'Add a vote history';
	a.href = '#';
	a.innerHTML = '<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAMAAABFNRROAAABAlBMVEX///+En1mEn1mEn1mEn1mEn1kAAACEn1mEn1mEn1mEn1mEn1mEn1mEn1mEn1mEn1mEn1mEn1mEn1mEn1mEn1mEn1mEn1mEn1mEn1mEn1mEn1mEn1mEn1mEn1mEn1mEn1mEn1mEn1mEn1mEn1n///+o2ljA1KGTuFmayFGcy1Kl1lafzlOry3ig0FWdyFek1Vah0VSMq1nd5s+cx1iPsFmaxFjH2KyFoVmVwU6dx1ieuXGk01efzVWYwFiYxVClyG6Vu1iMrFmWvFnc5c6dyFiVu1nL2LaYwFeh0FSi0FaVulnu8uebylGMtUmh0VWcxliLq1mJp1mPslm6y56St1m8zZ+7aHuSAAAAJHRSTlMAA58M+eoArvZLGEI/5FHbfmxmgQk2kJw5FUjSD8Mt/OeKMyQndLX5AAAAjklEQVR4XjWMVQ6EUAADi7Pq7oKz7u7uev+rbHiE+WkmTQsLtysYilEgUBGxu1ZbAS8xWp00Nd14sB4A/rfcWLT7utzxMUCufp+Ppc3NNL5hgK1Vf3vp8lGuPRrRgalIhOFIALip083iQGLp7FZJIMVt7c8dDQBp8XDU9NM5k7WMzwuF56tYYnjYUOUKyT+JFxWas9eqPgAAAABJRU5ErkJggg=="/>';
	a.addEventListener('click', function(e) {
		e.preventDefault();
		var listId = parseInt(window.prompt('Enter ratings URL, e.g. "http://www.imdb.com/user/ur12345678/ratings":').match(/\d{3,}/), 10);
		if(isNaN(listId)) {
			window.alert('Ratings URL could not be parsed.\n\nA vaild URL looks like this:\nhttp://www.imdb.com/user/ur12345678/ratings');
			return;
		}
		var name = prompt('Display name of your choice:');
		if(name) {
			if(addList(name, listId, lists)) {
				if(lists.length <= 2) {
					window.alert("This page will now reload and the import of all ratings will start. It shouldn't take longer than 10 seconds.\n\nDon't leave the page until import is finished.");
				}
				container.innerHTML = 'Reloading page...';
				window.location.reload();
			}
		}
	}, false);
	container.appendChild(a);
	a = null;
}


function insertRemoveListLink(container, list, lists) {
	var a = document.createElement('a');
		a.className = 'context';
		a.title = 'Remove list "' + list.name + '"';
		a.href = '#';
		a.innerHTML = '<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAIAAAD9iXMrAAAACXBIWXMAAAsTAAALEwEAmpwYAAACD0lEQVQokQXBX0gTARwH8O/d7m67zW3SmmZiIhiVD4UjeukfBIFEPRgURBGJ+RCBBbGXnsqH6GFTIWyE/YHaQ/WS1XwqFK0eCtHM8C9zbrfNcrv9uZ23trvbr8+HoZoJswbdhKEjmULjDrA1oApRAM+qpXKd2wtYORgmAKgKavQk8DC2uswJjMGzJdJHIpE6TgABBJCikqYZK0sDly7QwgzNTNHqHP2Y0L9PXOncT9t5UgtKQmKoqCK7FXxw/3b/zfj6sijwakauVXVTNzt8R/r6boxOf4PoACWSA2fPUHRx/tVjiv1cex1KhEPrIwHalNaDAX1s/O7J08XZ3xwcQimXNbbSdqugxKLtXV2zoae+nutroVEpkW7r8OklzbW3ncOm5PHWcy0tlYVfUlZuSGd813qL7z6wutm2pxU2WyqVgqZxaG0qVDRlabG5cVdiacV7/uJsYMh360529HlUkprlrKvBA4edA89qbM3ucsfjyYNXe6UXYbfgnAsOd/r98cHBjVK2YudhAUOFDdjtlw8ffTn0aH7ySyWntDTtzihKplo+dOrEvaHh0Mf3sIogKpCRp+28//gxmvxKn6aVZ+Hy27H8eKT7wD7K/SFDk1MJRlH/OsU6KBo0o/9ct8hwsiy7Gjwprfhm6jPcTlhYkIUhMiulbfZfhXfWo2qAZSDL2OmBBbCgmJM5m83hdv0HBL4VG0RAPCQAAAAASUVORK5CYII="/>';
		a.addEventListener('click', function(e) {
			if(window.confirm('Remove list "' + list.name + '"?')) {
				if(removeList(list.id, lists)) {
					container.parentNode.innerHTML = 'Reloading page...';
					window.location.reload();
				}
			}
			e.preventDefault();
		}, false);
	container.appendChild(a);
	a = null;
}


function insertRefreshListLink(container, list, lists) {
	var a = document.createElement('a');
	a.className = 'context';
	a.title = 'Refresh cache';
	a.href = '#';
	a.innerHTML = '<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAIAAAD9iXMrAAAACXBIWXMAAAsTAAALEwEAmpwYAAABz0lEQVQokQXBu2tTYRgH4Pf3ft93kjRN2zRCRQi0pZV46+AggljBy1/goqCjCE7q6ialooubU7GDIHTRTVEHFekgirV08YKkEkyqVk5Om8vJ+S6vz4M4aVMQEc+siQKRJgoQIiJiiHgSEYam4AEDCBEppkLkAZEQ9b0NLjBrERESLSIMJ8RG04+/vPozbMXYN+aOTalahZc/Dk5Nc7UMDY6IMk1qZS0sPO9ubjs47Y07stecPpBf+ZC+vDaUY2hCiDh69sVefxyPF/P3z5dm9nCjzXdexA9epcNDkjMjHkEbRur88usOrFu6nD9zSCe76tG77p/WwGZZd8DOegG0QtjqhPWvyfxkbn421x+EuJO1kvTG2YI2RSYaLrL3VgciErhuGjlNStt+vzKChYujUEaIydle11vHOgQZL6mT09H7jWSj3j06U+ylAyJa+5Y1W/0TcyUwAEJ7J9YKbz8Prtxer04Ub16a3F8t1Ju9xYebv2P79N7h2pTObEC7vSMIkcGTN//uLtUbzT4L9ZyrjKpbV2sXzk0YBlFAHCeAB0uO9femW/203fjVGysXjs+VD84WlWRMSkSQJAkoWIgKbCIUjCFFzmI39eI8MwEgkf+DE+5yWAKbzgAAAABJRU5ErkJggg=="/>';
	a.addEventListener('click', function(e) {
		e.preventDefault();
		delete list.ratings;
		delete list.lastUpdate;
		saveLists(lists);
		container.parentNode.innerHTML = 'Reloading page...';
		window.location.reload();
	}, false);
	container.appendChild(a);
	a = null;
}


function searchRatings(titleId, lists, container, cacheLifetimeHours)
{
	var now = Date.now();
	var cacheLifetimeMillis = cacheLifetimeHours * 3600000;
	container.innerHTML = '';
	for(var i = 0, len = lists.length; i < len; i++) {
		var list = lists[i];
		var a = document.createElement('a');
		a.href = 'http://www.imdb.com/user/ur' + list.id + '/ratings?view=compact';
		a.innerHTML = list.name + ' <b>...</b>';
		a.id = 'other-ratings-list-' + list.id;
		var span = document.createElement('span');
		span.appendChild(a);
		insertRefreshListLink(span, list, lists);
		insertRemoveListLink(span, list, lists);
		container.appendChild(span)
		if(i < lists.length - 1) {
			container.appendChild(document.createTextNode(' | '));
		}
		if(!list.ratings || !(now - list.lastUpdate <= cacheLifetimeMillis)) {
			a.title = 'Cache is being updated...';
			updateRatings(list, function(list) {
				showRating(list, titleId, cacheLifetimeMillis);
				saveLists(lists);
				if(!list.ratings || !list.ratings.length) {
					window.alert('List ' + list.id + ' (' + list.name + ') is empty or does not exist.');
				}
			});
		} else {
			showRating(list, titleId, list.lastUpdate + cacheLifetimeMillis - now);
		}
	}
	insertAddListLink(container, lists);
}


function updateRatings(list, onFinished)
{
	var requestTime = Date.now();
	GM_xmlhttpRequest({
		method:	'GET',
		url: 'http://www.imdb.com/list/export?list_id=ratings&author_id=ur' + list.id,
		onload: function(req) {
			var parseTime = Date.now();
			var ratings = { length:0 };
			var lines = req.responseText.split('\n');
			for(var i = 1, len = lines.length; i < len; i++) {
				var parts = lines[i].split('","');
				if(parts.length < 9) {
					continue;
				}
				var titleId = parseInt(parts[1].substr(2), 10);
				var rating = parseInt(parts[8], 10);
				if(titleId && rating) {
					ratings[titleId] = rating;
					ratings.length++;
				} else {
					GM_log('Parse error: ' + lines[i]);
				}
			}
			GM_log(list.name + ': ' + ratings.length + ' ratings, loaded in ' + (parseTime - requestTime) +  ' ms, parsed in ' + (Date.now() - parseTime) + ' ms');
			if(ratings.length) {
				list.ratings = ratings;
				list.lastUpdate = requestTime;
			}
			onFinished(list);
		},
		onerror: function(req) {
			GM_log(list.name + ': HTTP Error '+ req.status);
			onFinished(list);
		}
	});
}


function showRating(list, titleId, timeUntilRefreshMillis) {
	var node = document.getElementById('other-ratings-list-' + list.id);
	if(node) {
		var mins = Math.round(timeUntilRefreshMillis / 60000);
		node.innerHTML = list.name + ': <b>' + ((list.ratings && list.ratings[titleId]) ? list.ratings[titleId] : 'N/A') + '</b>';
		node.title = (list.ratings ? list.ratings.length : 0) + ' ratings, next cache update in ' + ((mins > 119) ? Math.round(mins/60) + ' hours' : mins + ' minutes');
	}
}


function loadLists() {
	try {
		var lists = JSON.parse(GM_getValue('lists'));
		if(typeof lists.length != 'undefined') {
			return lists;
		}
	} catch(ex) { }
	return [];
}


function saveLists(lists) {
	GM_setValue('lists', JSON.stringify(lists));
}


function removeList(listId, lists) {
	var index = getListIndex(listId, lists);
	if(index > -1) {
		lists.splice(index, 1);
		saveLists(lists);
		return true;
	}
	return false;
}


function addList(name, id, lists) {
	var index = getListIndex(id, lists);
	if(index == -1) {
		lists.push({'name':name, 'id':id});
		saveLists(lists);
		return true;
	}
	return false;
}


function getListIndex(listId, lists) {
	for(var i = 0, len = lists.length; i < len; i++) {
		if(lists[i].id == listId) {
			return i;
		}
	}
	return -1
}