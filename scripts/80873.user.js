// ==UserScript==
// @name           FilmConnections
// @namespace      DScript
// @include        http://imdb.*
// @include        http://www.imdb.*
// @include        http://www.voddler.com*
// @include        http://*nyheter24.se/filmtipset*
// @include        http://*.filmtipset.se*
// @exclude        http://*.imdb.*/images/*
// ==/UserScript==

//http://james.padolsey.com/javascript/using-yql-with-jsonp/
var accessKey = 'xz1k2Kt3KvW70YNF04LmA';

// ---------------- XHR

function getUrl(url, callback) {
  // replace all calls to this with yql jsonp in due time...
  GM_xmlhttpRequest({
    method: "GET",
    url: url,
    onload: function(response) {
      callback( response.responseText );
    }
  });
}

function getJson(url, callback) {
  // replace w jsonp for voddler when it's available
  GM_xmlhttpRequest({
    method: "GET",
    url: url,
    onload: function(response) {
      callback( JSON.parse(response.responseText) );
    }
  });

}

// ---------------- GM NATIVE

GM_registerMenuCommand('FilmConnections: Filmtipset auth', function() {
	var usernr = prompt('For calculated grades from Filmtipset.se at Voddler and IMDb\nplease enter your Filmtipset.se user number below:', GM_getValue('ft-usernr', ''));
	if(usernr) {
		GM_setValue('ft-usernr', usernr);
		filmtipset.userNr = usernr;
	}
});

function getFilmtipsetNr() {
	return GM_getValue('ft-usernr', '');
}

// ---------------- CORE

function trim(s) {
   return s.replace(/^\s+|\s+$/g, '');
}

// ---------------- FILMTIPSET

var filmtipset = { accessKey: accessKey, userNr: getFilmtipsetNr() };

filmtipset.parseFilmPage = function() {
	var movie = {};

	movie.title = trim(document.getElementsByClassName('big_canvas')[0].getElementsByTagName('table')[0].getElementsByTagName('tr')[8].getElementsByTagName('td')[3].innerHTML);
	movie.year = trim(document.getElementsByClassName('big_canvas')[0].getElementsByTagName('table')[0].getElementsByTagName('tr')[8].getElementsByTagName('td')[8].innerHTML);

	return movie;
};

filmtipset.getById = function(id, callback) {
	var auth = !!filmtipset.userNr ? '&usernr=' + filmtipset.userNr : '';
	getJson('http://nyheter24.se/filmtipset/api/api.cgi?accesskey='+filmtipset.accessKey+auth+'&returntype=json&action=movie&id='+id, function(r) {
		if(r[0].data && r[0].data.length > 0) {
			callback(r[0].data[0].movie);
			return;
		}

		callback(null);
	});
};

filmtipset.getByTitleAndYear = function(movie, callback) {
	var auth = !!filmtipset.userNr ? '&usernr=' + filmtipset.userNr : '';
	getJson('http://nyheter24.se/filmtipset/api/api.cgi?accesskey='+filmtipset.accessKey+auth+'&returntype=json&action=search&id='+ encodeURIComponent(movie.title), function(r) {
		if(r[0].data && r[0].data.length > 0) {
			var hits = r[0].data[0].hits;

			if(hits && hits.length > 0) {
				for(var i = 0; i < hits.length; i++) {
					if(hits[i].movie.year == movie.year) {
						callback(hits[i].movie);
						return;
					}
				}
			}
		}

		callback(null);
	});
};

filmtipset.imdb = {};

filmtipset.imdb.getByCurrentPage = function(callback) {
	movie = imdb.parseFilmPage();
	filmtipset.imdb.getById(movie.id, callback);
};

filmtipset.imdb.getById = function(id, callback) {
	id = id.replace(/tt/, '');

	var auth = !!filmtipset.userNr ? '&usernr=' + filmtipset.userNr : '';
	getJson('http://nyheter24.se/filmtipset/api/api.cgi?accesskey='+filmtipset.accessKey+auth+'&returntype=json&action=imdb&id='+id, function(r) {
		if(r[0].data && r[0].data.length > 0) {
			if(r[0].data.length == 1) {
				callback(r[0].data[0]);
			} else {
				callback(r[0].data);
			}
			return;
		}

		callback(null);
	});
};

filmtipset.voddler = {};

filmtipset.voddler.getByCurrentPage = function(callback) {
	var movie = voddler.parseFilmPage();
	filmtipset.getByTitleAndYear(movie, callback);
};

filmtipset.voddler.getById = function(id, callback) {
	voddler.getById(id, function(res) {
		if(res === null) { callback(null); }

		var movie = { title: res.originalTitle, year: res.productionYear, id: id };
		filmtipset.getByTitleAndYear(movie, callback);
	});
};

// ---------------- IMDb

var imdb = {};

imdb.parseFilmPage = function() {

	var movie = {};

	var titleTag = document.getElementById('tn15title').getElementsByTagName('h1')[0];

	movie.title = titleTag.innerHTML.substring(0, titleTag.innerHTML.indexOf('<span>'));
	movie.year = titleTag.getElementsByTagName('a')[0].innerHTML;

	var url = location.href;
	movie.id = url.replace(/^.*title\/tt(\d+)\/.*/, '$1');

	return movie;
};

imdb.getById = function(id, callback) {
	id = id.replace(/tt/, '');

	getUrl('http://www.imdb.com/title/tt' + id + '/', function(r) {
		var movie = {};

		var titleTag = r.substring(r.indexOf('<title>')+7);
		titleTag = titleTag.substring(0, titleTag.indexOf('</title>'));

		movie.title = trim(titleTag.substring(0, titleTag.lastIndexOf('(')));

		movie.year = titleTag.substring(titleTag.lastIndexOf('(')+1);
		movie.year = movie.year.substring(0, movie.year.indexOf(')'));

		callback(movie);
	});
};

imdb.tryParseSearchResult = function(r, movie, headerTitle) {
	var d = document.createElement('div');
	d.innerHTML = r;

	var headers = d.getElementsByTagName('b');

	var header = null;
	for(var i = 0; i < headers.length; i++) {
		if(trim(headers[i].innerHTML).toLowerCase() == headerTitle) {
			header = headers[i];
			break;
		}
	}

	if(header === null) { return false; }

	var rows = header.parentNode.nextSibling.getElementsByTagName('tr');

	for(var i = 0; i < rows.length; i++) {
		var link = rows[i].getElementsByTagName('td')[2].getElementsByTagName('a')[0];

		if(!('year' in movie)) {
			var id = link.href.replace(/^.*\/tt(\d+)\/.*$/, '$1');
			movie.id = id;

			return movie;
		}

		var y = link.nextSibling;

		if(typeof y != 'string' && 'textContent' in y) {
			y = y.textContent;
		}

		y = trim(y);

		if(y == '(' + movie.year + ')') {
			var id = link.href.replace(/^.*\/tt(\d+)\/.*$/, '$1');
			movie.id = id;

			return movie;
		}
	}

	return false;
};

imdb.getByTitleAndYear = function(movie, callback) {
	getUrl('http://www.imdb.com/find?s=tt&q=' + encodeURIComponent(movie.title), function(r) {

		var match = imdb.tryParseSearchResult(r, movie, 'popular titles');

		if(!match) {
			match = imdb.tryParseSearchResult(r, movie, 'titles (exact matches)');
		}

		if(!match) {
			callback(null);
		} else {
			callback(match);
		}

	});
};

// ---------------- VODDLER

var voddler = {};

voddler.parseFilmPage = function() {
	var movie = {};

	var info = document.getElementById('video_info_page');
	
	movie.title = trim(info.getElementsByTagName('h2')[0].innerHTML);
	movie.year = document.getElementById('movieinfotop').getElementsByTagName('li')[1].innerHTML;

	var url = location.href;
	movie.id = url.replace(/^.*\/info\/(\d+)\/.*$/, '$1');

	return movie;
};

voddler.search = function(q, callback) {
   q = trim(q);
   getJson('http://api.voddler.com/metaapi/search/1?offset=0&count=10&q=' + encodeURIComponent(q), callback);
};

voddler.getById = function(id, callback) {
	getJson('http://api.voddler.com/metaapi/info/1?videoId=' + id, function(res) {
		if(res.success && res.data.count > 0) {
			callback(res.data.videos);
			return;
		}
		callback(null);
	});
};

voddler.getByTitleAndYear = function(movie, callback) {
	voddler.search(movie.title, function(r) {
		if(r.success && r.data.count > 0) {
			var res = r.data.videos;
			for(var i = 0; i < res.length; i++) {
				if(res[i].productionYear == movie.year) {
					callback(res[i]);
					return;
				}
			}
		}

		callback(null);
	});
};

voddler.imdb = {};

voddler.imdb.getByCurrentPage = function(callback) {
	var movie = imdb.parseFilmPage();
	voddler.getByTitleAndYear(movie, callback);	
};

voddler.imdb.getById = function(id, callback) {
	imdb.getById(id, function(res) {
		if(res === null) { callback(null); }
		voddler.getByTitleAndYear(res, callback);
	});	
};

voddler.filmtipset = {};

voddler.filmtipset.getByCurrentPage = function(callback) {
	var movie = filmtipset.parseFilmPage();
	voddler.getByTitleAndYear(movie, callback);
};

voddler.filmtipset.getById = function(id, callback) {
	filmtipset.getById(id, function(res) {
		if(res === null) { callback(null); }
		var movie = { title: res.orgname, year: res.year };
		voddler.getByTitleAndYear(movie, callback);
	});
};

// ---------------- IMPLEMENTATIONS

if(location.href.indexOf('nyheter24.se/filmtipset/film/') >= 0) {
	voddler.filmtipset.getByCurrentPage(function(vodMovie) {
		if(vodMovie === null) { return; }

		var tbody = document.getElementsByClassName('big_canvas')[0].getElementsByTagName('table')[0].getElementsByTagName('tr')[8].getElementsByTagName('td')[10].parentNode.parentNode;
		
		var tr = document.createElement('tr');

		var td1 = document.createElement('td');
		td1.width = '120';
		td1.valign = 'middle';
		td1.height = '20';
		td1.align = 'left';
		td1.innerHTML = '<img src="http://www.voddler.com/public/base/favicon.ico" align="left"/>&nbsp;<b>Voddler:</b>';

		tr.appendChild(td1);

		var td2 = document.createElement('td');
		td2.className = 'list';
		td2.valign = 'top';
		td2.align = 'left';

		var vodlink = document.createElement('a');
		vodlink.href = vodMovie.url;
		vodlink.target = '_blank';

		var linkname = 'Se filmen på Voddler';
		if(vodMovie.price == 'Free') {
			linkname += '&nbsp;<span style="color: #67B02C;">(Gratis)</span>';
		} else {
			linkname += '&nbsp;<span style="color: #CA318F;">(' + vodMovie.price + ')</span>';
		}

		vodlink.innerHTML = linkname;

		td2.appendChild(vodlink);
		tr.appendChild(td2);

		tbody.appendChild(tr);

		var tr2 = document.createElement('tr');
		tr2.innerHTML = '<td style="height: 20px;">&nbsp;</td>';

		tbody.appendChild(tr2);
	});
}

if(location.href.indexOf('voddler.com/movie/info') >= 0 || location.href.indexOf('voddler.com/documentary/info') >= 0) {

	var list = document.getElementById('movieinfotop').getElementsByTagName('ul')[0];

	filmtipset.voddler.getByCurrentPage(function(ftMovie) {
		if(ftMovie === null) { return; }

		var imdbli = document.createElement('li');

		var imdburl = 'http://www.imdb.com/title/tt' + ftMovie.imdb + '/';
		imdbli.innerHTML = '<a href="' + imdburl + '" target="_blank"><img src="http://buggarden.zhengzhong.net/static/hottywood/images/imdb_icon.gif" style="border: 0; margin: -5px 0 -3px 0;" /></a>';

		list.appendChild(imdbli);

		var li = document.createElement('li');

		var seen = '';
		var grade = 0;

		if(ftMovie.grade) {
			if(ftMovie.grade.type == 'seen') {
				seen = '_seen';
			}

			grade = ftMovie.grade.value;
		}

		var a = document.createElement('a');
		a.innerHTML = 'Filmtipset';
		a.href = ftMovie.url;
		a.target = '_blank';

		li.appendChild(a);

		if(grade > 0) {
			var img = document.createElement('img');
			img.src = 'http://images.filmtipset.se/grade_images/grade_' + grade + seen + '.gif';
			img.style.height = '11px';

			li.appendChild(document.createTextNode(' '));
			li.appendChild(img);
		}

		list.appendChild(li);
	});
} else if(location.href.indexOf('voddler.com') >= 0) {

	// find all movies
	var movies = [];

	var movieboxes = [];
	var boxnodes = document.getElementsByClassName('moviebox_profile');
	for(var i = 0; i < boxnodes.length; i++) { movieboxes.push(boxnodes[i]); }

	for(var i = 0; i < movieboxes.length; i++) {
		var box = movieboxes[i];
		var m = {};

		m.title = box.getElementsByClassName('title')[0].innerHTML;

		var stats = box.getElementsByClassName('stats')[0];
		
		m.year = stats.getElementsByClassName('delimiter')[0].nextSibling.nextSibling.innerHTML;
		if(!/^\d+$/.test(m.year)) {
			delete m.year;
		}

		m.stats = stats;

		movies.push(m);
	}

	// find all imdb ids
	voddler.imdbNonMatches = 0;
	voddler.imdbIds = [];
        voddler.tempMovies = movies;

	for(var i = 0; i < movies.length; i++) {
		imdb.getByTitleAndYear(movies[i], (function(x) {
			return function(r) {

				if(r === null) {
					voddler.imdbNonMatches++;
				} else {
					voddler.tempMovies[x].imdbId = r.id;
					voddler.imdbIds.push(r.id);
				}

				if(voddler.imdbIds.length + voddler.imdbNonMatches == voddler.tempMovies.length) {
					filmtipset.imdb.getById( voddler.imdbIds.join(','), function(res) {
						for(var ix = 0; ix < res.length; ix++) {
							var match = null;
							for(var y = 0; y < voddler.tempMovies.length; y++) {
								if(res[ix].movie.imdb == voddler.tempMovies[y].imdbId) {
									match = voddler.tempMovies[y];
									break;
								}
							}

							if(!match) { continue; }

							var delimiter = document.createElement('span');
							delimiter.className = 'delimiter';
							delimiter.innerHTML = '|';
							match.stats.appendChild(delimiter);

							var imdburl = 'http://www.imdb.com/title/tt' + res[ix].movie.imdb + '/';

							var im = document.createElement('span');
							im.className = 'yeargenre';
							im.innerHTML = '<a href="' + imdburl + '" target="_blank"><img src="http://buggarden.zhengzhong.net/static/hottywood/images/imdb_icon.gif" style="border: 0; margin-top: -4px;" /></a>';
							match.stats.appendChild(im);

							var delimiter2 = document.createElement('span');
							delimiter2.className = 'delimiter';
							delimiter2.innerHTML = '|';
							match.stats.appendChild(delimiter2);

							var ft = document.createElement('span');
							ft.className = 'yeargenre';
						
							var seen = '';
							var grade = 0;

							if(res[ix].movie.grade) {
								if(res[ix].movie.grade.type == 'seen') {
									seen = '_seen';
								}
					
								grade = res[ix].movie.grade.value;
							}
			
							var a = document.createElement('a');
							a.innerHTML = 'Filmtipset';
							a.href = res[ix].movie.url;
							a.target = '_blank';
				
							ft.appendChild(a);

							if(grade > 0) {
								var img = document.createElement('img');
								img.src = 'http://images.filmtipset.se/grade_images/grade_' + grade + seen + '.gif';
								img.style.height = '9px';
		
								ft.appendChild(document.createTextNode(' '));
								ft.appendChild(img);
							}	

							match.stats.appendChild(ft);							
						}
					});
				}
			};
		})(i));
	}
}

// voddler popups
var syn = document.getElementById('synopsises');
voddler.synopsisWorking = false;
if(syn) {
	setInterval(function() { checkSynopsis(syn); }, 500);
}

function checkSynopsis(syn) {
	var mid = syn.getElementsByClassName('s_mid')[0];
	var h3 = mid.getElementsByTagName('h3');

	if(h3.length < 1) { return; }

	if(voddler.synopsisWorking || mid.getElementsByClassName('imdblink').length > 0) { return; }
	voddler.synopsisWorking = true;

	var movie = {};

	movie.title = mid.getElementsByClassName('share_title')[0].value;
	movie.year = trim(mid.getElementsByClassName('year_genre')[0].getElementsByClassName('dark')[0].innerHTML);

	filmtipset.getByTitleAndYear(movie, function(ftMovie) {

		voddler.synopsisWorking = false;

		if(ftMovie === null) {
			var div = document.createElement('div');
			div.style.display = 'none';
			div.className = 'imdblink';

			mid.appendChild(div);
			return;
		}

		var p = document.createElement('p');
		p.className = 'year_genre';

		var spanImdb = document.createElement('span');
		spanImdb.className = 'dark imdblink';

		var imdburl = 'http://www.imdb.com/title/tt' + ftMovie.imdb + '/';
		spanImdb.innerHTML = '<a href="' + imdburl + '" target="_blank"><img src="http://buggarden.zhengzhong.net/static/hottywood/images/imdb_icon.gif" style="border: 0; margin: 2px 0 -4px 0;" /></a>';

		p.appendChild(spanImdb);
		p.appendChild(document.createTextNode(' | '));

		var seen = '';
		var grade = 0;

		if(ftMovie.grade) {
			if(ftMovie.grade.type == 'seen') {
				seen = '_seen';
			}

			grade = ftMovie.grade.value;
		}

		var a = document.createElement('a');
		a.innerHTML = 'Filmtipset';
		a.href = ftMovie.url;
		a.target = '_blank';

		p.appendChild(a);

		if(grade > 0) {
			var img = document.createElement('img');
			img.src = 'http://images.filmtipset.se/grade_images/grade_' + grade + seen + '.gif';
			img.style.height = '11px';

			p.appendChild(document.createTextNode(' '));
			p.appendChild(img);
		}

		mid.getElementsByClassName('year_genre')[0].appendChild(p);

	});
}