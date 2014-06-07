// ==UserScript==
// @name           Webop Torrent Bookmarks
// @namespace      http://webop.me/727747325
// @description    Adds static torrent bookmarking facilities to torrent pages
// @include        http://webop.me/*
// @exclude        http://webop.me/forum/*
// @exclude        http://webop.me/cgi-bin/*
// @version        2012.11.13
// ==/UserScript==

/**
 * Add new bookmark string to storage.
 * @param info {object} Data to add to the array
 */
function addbkmk(info) {
	var list = [];
	var data = localStorage.getItem('bookmarks');
	if (data)
		list = JSON.parse(data);
	if (!data || data.indexOf('"id":' + info.id + ',') == -1)
		list.push(info);
	localStorage.setItem('bookmarks', JSON.stringify(list));
}

/**
 * Remove bookmark from storage.
 * @param rowNr {Integer} The number of the row to remove from the array
 */
function rmbkmk(rowNr) {
	var list = JSON.parse(localStorage.getItem('bookmarks'));
	list.splice(rowNr, 1);
	localStorage.setItem('bookmarks', JSON.stringify(list));
}

/**
 * Add bookmark menu items
 */
function inject() {
	var userctrl = document.getElementById("usercontrolbox");
	var tmenu = document.getElementById("torrentcontrols");
	var dlcells = document.querySelectorAll('.torrentlist tr.tabletext td:nth-child(2)');
	var newstyle, newDiv, bmrksEl, cell;

	// initialize and add new needed elements
	if (userctrl) {
		// create styles
		newstyle = document.createElement('style');
		newstyle.setAttribute('type', 'text/css');
		newstyle.setAttribute('id', 'bkmkstyle');
		newstyle.textContent = '#bkmks {font-size:70%;} #bkmks table {margin-top:0} #bkmks .warning {display:table-cell;}';

		// create display and data areas
		newDiv = document.createElement('div');
		newDiv.setAttribute('id', 'bkmks');
		newDiv.style.display = 'none';

		// insert styles and data areas
		document.getElementsByTagName('head')[0].appendChild(newstyle);
		userctrl.parentNode.insertBefore(newDiv, userctrl.nextSibling);

		var ii, title, info, li, span, cleantitle, bookmarkimage =
			'<img src="data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACMUlEQVR42pVTXUiTYRQ+U2n9LcqbootuorBAIoooKIIupHXdZUFEFxHYRdTS7Nu01YYXXaQOK4PICYPJVIiGVkQJUaMf5ljopDCWc+owCCH3873n6bwbEdEG7YWH73B+nnPe87wfUYUDB9mUk0bhohZBHVV7pGib8tYnlGdjQttVExScZMfwmQJCp/KFa2SvmkC51/k5HmSO+lm51/j/f3SimnwbHWRfYw4LceBbBNzVkNM+Hfu3k0EOGHRJ0KJc5FMdqwa5c3MKX0YVlheApc/AxweKvZtSylU7qHN0rq4puOg4ieMDunYqjF0GXhjA227g+wzwcwn4kQIyCWA2AsSDwMhZoL8J6N0Ddq9mUSlGOYMalWdDhEfOmchMStEssJwufXX39ATwdRyYHAbe9QJPHeCeXaZqt0RyrdRQvEZGa+6qG5KNr2AuWuq6KGRpsZOvgekwMDEAjHuBu3tXpPOQrvl7eRdovXLWBBC+aBZHTr4BZl5K8RMgFgAiPcCjJlOKAzq3rAJ5gw6xbzdj6jGQEHwKAdF+2UsX8LwNfHsr65zKEhp0lO/sUHjfhyIi3aWxxxxA6DS4s57lVR6upL9FJO3jh8cKRTXCzYzgScbAiRLuHwBurjUlp6PS298iwRj8duDefpNv2eblvq0afMM6D7fVhMsCyXuFZrKWG/+Iaq+dg8eWZYOeZa/Q9t8xbWsfnJQVwmlcLfNzCcE+CSalw/nFMlvWPh0Toilc/0P+C0a+oyJe7NB2AAAAAElFTkSuQmCC" width="14" height="14" alt="BK">';

		// get client data if any
		var clientdata = localStorage.getItem('bookmarks');

		if (document.getElementById('torrentList')) {
			for (ii = 0; dlcells[ii]; ii++) {
				cell = dlcells[ii];
				info = browseInfo(cell);
				if(!is_bookmarked(info.id, clientdata)){
					span = document.createElement('span');
					cleantitle = (info.title.replace(/"/g, '&rdquo;')).replace(/'/g, '&rsquo;');
					span.setAttribute('title', 'BOOKMARK: ' + cleantitle);
					span.className = 'jsclick';
					span.innerHTML = bookmarkimage;
					span.addEventListener('click', function (ev) {
						var cell = ev.target.parentNode.parentNode;
						var info = browseInfo(cell);
						addbkmk(info);
						updateList();
					}, false);
					cell.appendChild(span);
				}
			}
		}
		if (document.getElementById('torrentdetail')) {
			info = detailInfo();
			if(!is_bookmarked(info.id, clientdata)){
				li = document.createElement('li');
				li.className = 'jsclick';
				li.setAttribute('title', 'BOOKMARK: ' + info.title);
				li.addEventListener('click', function () {
					addbkmk(info);
					updateList();
				}, false);
				li.innerHTML = bookmarkimage + '&nbsp;Bookmark';
				tmenu.appendChild(li);
			}
		}
		if (clientdata) {
			li = document.createElement('li');
			li.title = 'Toggle bookmarks';
			li.textContent = 'Bookmarks ';
			li.className = 'jsclick';
			li.addEventListener('click', function () {
				bmrksEl = document.getElementById("bkmks");
				if (bmrksEl.style.display == 'none') {
					updateList();
				} else {
					bmrksEl.style.display = 'none';
					bmrksEl.removeAttribute("class");
				}
			}, false);
			userctrl.querySelector('ul').appendChild(li);
		}
	}
}

function updateList() {
	var clientdata = localStorage.getItem('bookmarks'), bmrksEl, table;
	if (clientdata) {
		bmrksEl = document.getElementById("bkmks");
		bmrksEl.innerHTML = "";
		table = createTable(JSON.parse(clientdata));
		table.className = "striped block";
		bmrksEl.appendChild(table);
		bmrksEl.style.display='block';
	}
}

/**
 * Extract torrent info from details page
 * @returns {object}
 */
function detailInfo() {
	var info = {}, infomatch, uploadermatch, i, entry;
	info.id = parseInt(document.getElementById("torrentidnumber").textContent);
	info.title = trimWS(document.getElementById("pagetitle").textContent);
	info.link = document.querySelector('#torrentcontrols li:first-child a').href;
	info.link = info.link.substring(0, info.link.lastIndexOf('/'));

	var infokey, infoval, infoboxentries = document.querySelectorAll("#info li");
	for (i = 0; entry = infoboxentries[i]; ++i) {
		if(infomatch = entry.innerHTML.match(/^(.+):\s+(.+)$/)){
			infokey = trimWS(infomatch[1]).toLowerCase();
			infoval = trimWS(infomatch[2]);
			switch (infokey) {
				case "uploader":
					uploadermatch = infoval.match(/^<a[^>]+?>(.+?)<\/a>/i);
					info.poster = uploadermatch[1];
					break;
				case "size":
					info.size = infoval.replace(/ /, '');
					break;
				case "files":
					info.fileCnt = parseInt(infoval);
					break;
				case "shared":
					info.shareDate = Math.round(((new Date(infoval)).getTime()) / 1000);
			}
		}
	}
	return info;
}
/**
 * Extract torrent info from torrent list page
 * @param cell {HTMLTableCellElement}
 * @returns {object}
 */
function browseInfo(cell) {
	var info = {}, row = cell.parentNode,
		tlink = row.cells[0].getElementsByTagName('a')[0],
		tdate = trimWS(row.parentNode.querySelector('.tablehead th[colspan]').textContent);

	info.id = parseInt(tlink.href.match(/torrents\/(\d+)/i)[1]);
	info.title = tlink.textContent;
	info.link = tlink.href;
	info.poster = row.cells[7].textContent;
	info.size = row.cells[4].textContent;
	info.fileCnt = parseInt(row.cells[2].textContent);
	info.shareDate = Math.round(((new Date(tdate)).getTime()) / 1000);
	return info;
}


/**
 * trim whitespace from both ends
 * @param {string} text
 * @returns {string}
 */
function trimWS(text) {
	return text.replace(/^\s+|\s+$/, '');
}

/**
 * Create HTML table from array of bookmark objects
 * @param data {Array}
 * @returns {HTMLTableElement}
 */
function createTable(data) {
	var table = document.createElement('table'), trow, tcell, a, sdate, thead, cellName,
		months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
		delimg = '<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACh0lEQVR42pWTW0hUYRSFN+M0aKIFXans8lRYOjdHmyG1aBJrQAofIiVDmAFLorwEkeGDF+zFkmo0KKNCerDIjDBQYqyXjAqESCtSS4WEgjDUOWc8/179c0aEmEbowHk6/1rr+/fah0SWqYl9uT/EUfMEskwXp9ZRIv3PI7w503gbYIwNM1cfUYTD0IqtFL+UZi6VNofSyQYiI3GRbRJjQwxtHpj9DWmiCmd83b9MpMCk2Y2VyN8wC0+KEI5l10k4TbVcfVjFzDQwNwNMjTNXFkSRIJVMwm5o5iJrEB3NjBu1zPtWBQnplCgyDG3SRMH3ccavn9JkAnzWo8r56CThZOEwnueSzCCe3gO6bgJ1pSycy3t194lNlCB2m+q5okCVJtDfz4PMp/MVaX5LJvv5RFYQzzoYPR1AUxmQnTQKM+1cvJ9uEiY5c0jBp0HG14/A8DugzK1xqUtD4DHw/CFw9RwjJ3lUktuiprtIUp6vYkiKP7wBBvqAF0+A/m7gShU4LDaTNWZFCyS3cdKtYaAXeC0NXkqD+y3MuSvnQ7vIteReLEy7Vcfu74qI+zqBB20sG1CFnWLvyV/TDjyCfm+ZHBaj0w+0N4ILd6iy4ug9iSRTMx/PkFXdZT31cgXC2HLZQmhvAPw1QKOP2bMlmkTLMFTwMXMQ3e2QBkBLFSN7xUgojZzycBsXblfQ4GXUFAPleUBusqLZyBdJT6dtnLd+BncuSVyJ2uADZyePwErmxcE6DPXsSVFx6gBQbAXca5nt9E03CMlacHCjBv8FRm0J8x65JBayRLUTJslJUuBew8iMY9jpvf4xIP8qkRl3DftXh9iV8ApplBarYs1CXthoUtjoy7yF9v4BQqXFnMpa/68AAAAASUVORK5CYII=" width="14" height="14" alt="del" title="delete bookmark">';
	var cap=table.createCaption();
	cap.textContent = 'Bookmarks ';
	var link=document.createElement('a');
	link.className='jsclick';
	link.textContent='get live data';
	link.addEventListener('click',function(ev){
		queryBookmarks();
		this.parentNode.removeChild(this);
	});
	cap.appendChild(link);
	for (var row, ii = 0; row = data[ii]; ii++) {
		if (row) {
			trow = table.insertRow(-1);
			trow.addEventListener('click', function (ev) {
				if (ev.target.nodeName.toLowerCase() == 'img') {
					rmbkmk(this.sectionRowIndex);
					updateList();
				}
			}, false);
			tcell = trow.insertCell(-1);
			tcell.innerHTML = delimg;
			for (cellName in row) {
				switch (cellName) {
					case 'title':
						a = document.createElement('a');
						a.textContent = row[cellName];
						a.href = row['link'];
						tcell = trow.insertCell(-1);
						tcell.appendChild(a);
						break;
					case 'shareDate':
						sdate = new Date(row[cellName] * 1000);
						smonth = months[sdate.getMonth()];
						sday = sdate.getDate();
						syear = sdate.getFullYear();
						sdate = smonth + " " + sday + ", " + syear;
						tcell = trow.insertCell(-1);
						tcell.textContent = sdate;
						break;
					case 'id':
					case 'link':
						continue;
					default:
						tcell = trow.insertCell(-1);
						tcell.textContent = row[cellName];
				}
			}
		}
	}
	thead = table.createTHead();
	trow = thead.insertRow(0);
	trow.appendChild(document.createElement('th'));
	trow.appendChild(document.createElement('th')).textContent = 'Title';
	trow.appendChild(document.createElement('th')).textContent = 'Poster';
	trow.appendChild(document.createElement('th')).textContent = 'Size';
	trow.appendChild(document.createElement('th')).textContent = 'Files';
	trow.appendChild(document.createElement('th')).textContent = 'Shared';
	return table;
}

/**
 * @param table {Element}
 * @param rownr [int} Table row number of the bookmark entry
 * @param tid {int} TorrentID
 * @param what {Array} The properties to add as column
 */
function updateTableRow(table, rownr, tid, what){
	var xhr=new XMLHttpRequest(), data, cells=[], cell, col=0;
	var uri='http://webop.me/torrents/'+tid;
	xhr.open("GET",uri,true);
	xhr.setRequestHeader("Accept","application/json");
	xhr.onreadystatechange=function() {
		if (xhr.readyState==2) {
			for(col in what){
				cell = table.rows[rownr].insertCell(-1);
				var img=document.createElement('img');
				img.setAttribute('src','data:image/gif;base64,R0lGODlhEAALAPQAAP///x6Q/97u/tXq/uz1/iOS/h6Q/0aj/pDI/nK5/sLg/jue/l+w/pfL/na7/sXi/j+g/iGR/mKx/ujz/tzt/vX5/k+o/uDv/vP4/r7e/qvV/tDn/u/3/gAAAAAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCwAAACwAAAAAEAALAAAFLSAgjmRpnqSgCuLKAq5AEIM4zDVw03ve27ifDgfkEYe04kDIDC5zrtYKRa2WQgAh+QQJCwAAACwAAAAAEAALAAAFJGBhGAVgnqhpHIeRvsDawqns0qeN5+y967tYLyicBYE7EYkYAgAh+QQJCwAAACwAAAAAEAALAAAFNiAgjothLOOIJAkiGgxjpGKiKMkbz7SN6zIawJcDwIK9W/HISxGBzdHTuBNOmcJVCyoUlk7CEAAh+QQJCwAAACwAAAAAEAALAAAFNSAgjqQIRRFUAo3jNGIkSdHqPI8Tz3V55zuaDacDyIQ+YrBH+hWPzJFzOQQaeavWi7oqnVIhACH5BAkLAAAALAAAAAAQAAsAAAUyICCOZGme1rJY5kRRk7hI0mJSVUXJtF3iOl7tltsBZsNfUegjAY3I5sgFY55KqdX1GgIAIfkECQsAAAAsAAAAABAACwAABTcgII5kaZ4kcV2EqLJipmnZhWGXaOOitm2aXQ4g7P2Ct2ER4AMul00kj5g0Al8tADY2y6C+4FIIACH5BAkLAAAALAAAAAAQAAsAAAUvICCOZGme5ERRk6iy7qpyHCVStA3gNa/7txxwlwv2isSacYUc+l4tADQGQ1mvpBAAIfkECQsAAAAsAAAAABAACwAABS8gII5kaZ7kRFGTqLLuqnIcJVK0DeA1r/u3HHCXC/aKxJpxhRz6Xi0ANAZDWa+kEAA7AAAAAAAAAAAA');
				cell.appendChild(img);
				cells.push(cell);
			}
		}
		if (xhr.readyState==4 && xhr.status==200) {
			data=JSON.parse(xhr.responseText);
			for (var ii = 0, ll=cells.length; ii<ll; ii++) {
				if(what[ii]=='seeders' && data[what[ii]]<5)
					cells[ii].setAttribute('class','warning');
				cells[ii].textContent = data[what[ii]];
			}
		}
	};
	xhr.send(null);
}

function queryBookmarks(){
	var data = JSON.parse(localStorage.getItem('bookmarks')), rows, table, cell, tid;
	var what=['seeders','leechers'];
	if (data) {
		table=document.querySelector('#bkmks table');
		rows = table.rows;
		for (var col, jj = 0; col = what[jj]; jj++) {
			rows[0].appendChild(document.createElement('th')).textContent = col;
		}
		for (var ii = 0; data[ii]; ii++) {
			updateTableRow(table,ii+1,data[ii].id, what);
		}
	}
}

function is_bookmarked(tid, data){
	var list = JSON.parse(data), ii, entry, result=false;
	if(list==null) return result;
	for (ii = 0; entry=list[ii]; ii++) {
		if(entry.id==tid){
			result=true;
			break;
		}
	}
	return result;
}
inject();
