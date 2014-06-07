// ==UserScript==
// @name        wiki-reference
// @namespace   torvin
// @include     https://www.ncbi.nlm.nih.gov/pubmed/*
// @include     http://www.ncbi.nlm.nih.gov/pubmed/*
// @include     http://adsabs.harvard.edu/abs/*
// @include     http://adsabs.harvard.edu/doi/*
// @include     http://ufn.ru/ru/articles/*
// @include     http://books.google.*/books?*
// @include     http://www.sciencedirect.com/science/article/*
// @include     http://gen.lib.rus.ec/scimag/*
// @include     http://onlinelibrary.wiley.com/doi/*
// @include     http://www.jstor.org/stable/*
// @include     http://www.jstor.org/discover/*
// @version     1.5.2
// @description Позволяет генерировать ссылки в формате {{Статья}} и {{книга}} для ру-вики
// @grant       GM_xmlhttpRequest
// ==/UserScript==

const templates = {
	article: 'Статья',
	book: 'книга',
};

var Template = function(name) {
	var attrs = [];

	this.add = function(name, value) {
		attrs.push({
			name: name, 
			value: value
		});
		return this;
	};

	var getAttr = function(x) { 
		return "|" + x.name + (x.value === undefined ? "" : " = " + x.value);
	};

	this.toWiki = function() {
		if (attrs.length == 1)
			return "{{" + name + getAttr(attrs[0]) + "}}";
		else
			return "{{" + name + "\n" + attrs.map(function(x) { return " " + getAttr(x)}).join("\n") + "\n}}";
	};
};

var pubmed = {
	'автор': {
		selector: 'Article > AuthorList > Author',
		map: function(node) { return [ node.querySelector('LastName'), node.querySelector('Initials') ] },
		mapText: function(nodes) { return new Template('nobr').add(nodes[0] + ' ' + nodes[1].replace(/(.)/g, "$1. ").trim()).toWiki() },
	},
	'заглавие': {
		selector: 'Article > ArticleTitle',
		mapText: function(text) { return text.replace(/^(.*?)\.?$/, "$1") },
	},
	'издание': { 
		selector: 'Article > Journal > Title',
	},
	'год': {
		selector: 'Article > Journal > JournalIssue > PubDate',
		mapText: function(text) { return /^\s*(\d{4})/.exec(text)[1] },
	},
	'выпуск': {
		selector: 'Article > Journal > JournalIssue > Issue',
	},
	'том': {
		selector: 'Article > Journal > JournalIssue > Volume',
	},
	'страницы': {
		selector: 'Article > Pagination > MedlinePgn',
	},
	'issn': {
		selector: 'Article > Journal > ISSN[IssnType=Electronic]',
	},
	'doi': {
		selector: 'ArticleIdList > ArticleId[IdType=doi]',
	},
	'pmid': {
		selector: 'ArticleIdList > ArticleId[IdType=pubmed]',
	},
	'ссылка': { const: "" },
	'ref': { const: "" },
	'archiveurl': { const: "" },
	'archivedate': { const: "" },
};

var getText = function(node) {
	return node instanceof Element ? node.textContent : node;
};

var ajax = function(params) {
	setTimeout(function() {
		GM_xmlhttpRequest(params)
	}, 0);	
}

var clone = function(obj) {
	var target = {};
	for (var i in obj) {
		var value = obj[i];
		if (value instanceof Function)
			;
		else if (typeof value == 'string')
			;
		else
			value = clone(value);
		target[i] = value;
	}
	return target;
}

var getWpFromXml = function(name, rules, xml) {
	var article = new Template(name);

	for(var name in rules) {
		var rule = rules[name];
		article.add(name, rule.const ||
			Array.slice(xml.querySelectorAll(rule.selector)).map(function(node) {
				if (rule.map)
					node = rule.map(node);
				return Array.isArray(node) ? node.map(getText) : getText(node);
			}).map(function(item) {
				return rule.mapText ? rule.mapText(item) : item;
			}).join(rule.separator || ', ')
		);
	}

	return article.toWiki();
};

var Parser = function(sourceText, index, tokens) {
	var _match;
	var _isEof;

	//var _tokenRegex = /(\s*)(\{|\}|,|=|\\\W|\\[\w]+|[^\{\},\\=\s])/g;
	var _tokenRegex = new RegExp("(\\s*)(" + tokens.map(function(x) { return x.source || x }).join('|') + ")", 'g');
	_tokenRegex.lastIndex = index;

	var getToken = function() {
		if (_isEof)
			throw new Error("EOF");

		var index = _tokenRegex.lastIndex;

		var res = _tokenRegex.exec(sourceText);
		if (!res) {
			_isEof = true;
			return null;
		}
		_match = {
			match: res[0],
			token: res[2],
			space: res[1].replace(/\s+/g, ' '),
			index: index,
		}
	}

	this.matchAny = function() {
		var res = _match;
		getToken();
		return res;
	}

	this.match = function(str) {
		if (_match.token !== str)
			throw new Error("Parser error at pos " + _tokenRegex.lastIndex + ". Expected '" + str + "', found '" + _match.token + "'.");
		return this.matchAny();
	}

	this.matchIgnoreCase = function(str) {
		if (_match.token.toUpperCase() !== str.toUpperCase())
			throw new Error("Parser error at pos " + _tokenRegex.lastIndex + ". Expected '" + str + "', found '" + _match.token + "'.");
		return this.matchAny();
	}

	this.matchAnyIgnoreCase = function(strs) {
		if (strs.every(function(str) { return _match.token.toUpperCase() !== str.toUpperCase(); }))
			throw new Error("Parser error at pos " + _tokenRegex.lastIndex + ". Expected any of: '" + strs.join("', '") + "', found '" + _match.token + "'.");
		return this.matchAny();
	}

	this.matchNot = function(strs) {
		if (strs.indexOf(_match.token) != -1)
			throw new Error("Parser error at pos " + _tokenRegex.lastIndex + ". Unexpected '" + _match.token + "'.");
		return this.matchAny();
	}

	this.index = function() {
		return _match.index;
	}

	Object.defineProperty(this, "token", { get: function() { return _match.token; }});

	getToken();
}

var Bibtex = function(sourceText, index, entryTypes) {
	var _plainText = /[^\{\},\\=\s]+/;
	const _tokens = [
		/\{/,
		/\}/,
		/,/,
		/=/,
		/@/,
		/\\\W/,
		/\\[\w]+/,
		_plainText,
	];

	var _parser = new Parser(sourceText, index, _tokens);

	var entry = function() {
		_parser.match("{");
		var id = fieldValue();
		_parser.match(",");
		var f = fields();
		_parser.match("}");

		f.bibcode = id;
		return f;
	}

	var comment = function() {
		_parser.match("{");
		var text = fieldValue();
		_parser.match("}");
		return { comment: text };
	}

	var type = function() {
		_parser.match('@');
		var token = _parser.token;
		if (entryTypes.length)
			_parser.matchAnyIgnoreCase(entryTypes);
		else
			_parser.matchAny();
		return token;
	}

	var fields = function() {
		var res = {};
		for(;;) {
			var f = field();
			res[f.name] = f.value;
			if (_parser.token !== ",") break;
			_parser.match(",");
			if (_parser.token === "}") break;
		}
		return res;
	}

	var quoted = function() {
		return _parser.match("{").space + quotedValue() + _parser.match("}").space;
	}

	var diacritics = {
		'`': '\u0300',
		'\'': '\u0301',
		'^': '\u0302',
		'~': '\u0303',
		'=': '\u0304',
		'u': '\u0306',
		'.': '\u0307',
		'"': '\u0308',
		'r': '\u030a',
		'H': '\u030b',
		'v': '\u030c',
		'c': '\u0327',
		'k': '\u0328',
		'd': '\u0323',
		'b': '\u0331',
		't': '\u0361',
	};

	var ligatures = {
		'L': '\u0141',
		'l': '\u0142',
		'AA': '\u00c5',
		'aa': '\u00e5',
		'AE': '\u00c6',
		'ae': '\u00e6',
		'O': '\u00d8',
		'o': '\u00f8',
		'OE': '\u0152',
		'oe': '\u0153',
		'i': '\u0131',
		'j': '\u0237',
		'ss': '\u00df',
	};

	var entity = function() {
		if (_parser.token[0] != '\\')
			throw new Error("Expected entity, found " + _parser.token);

		var cmd = _parser.matchAny().token.substr(1);

		var value = ligatures[cmd];
		if (value)
			return value;

		value = diacritics[cmd];
		if (value)
			return fieldValue() + value;

		return cmd;
	}

	var quotedValue = function() {
		var res = "";
		for(;;) {
			if (_parser.token === "{")
				res += quoted();
			else if (_parser.token === "}")
				break;
			else if (_parser.token[0] === '\\')
				res += entity();
			else
				res += _parser.matchAny().match;
		}
		return res;
	}

	var fieldValue = function() {
		var res = "";
		for(;;) {
			if (_parser.token == "{")
				res += quoted();
			else if (_parser.token[0] === '\\')
				res += entity();
			else if (_plainText.test(_parser.token))
				res += _parser.matchAny().match;
			else
				break;
		}
		return res.trim().replace(/^"?(.*?)"?$/, '$1').replace(/---?/g, '—');

	}

	var field = function() {
		var name = fieldValue();
		_parser.match("=");
		var value = fieldValue();

		return {
			name: name,
			value: value
		}
	}

	if (!entryTypes)
		entryTypes = []
	else if (typeof entryTypes == 'string' || entryTypes instanceof String)
		entryTypes = [ entryTypes ];
	var realType = type(entryTypes);

	if (realType.toLowerCase() == 'comment')
		var result = comment();
	else
		var result = entry();

	result.type = realType;
	result._index = _parser.index();
	return result;
}

var bibtexBase = {
	'автор': {
		selector: 'author',
		getAuthors: function(text) {
			return text.split(' and ').map(function(name) {
				return name.replace(/~/g, ' ').replace(',', '');
			});
		},
		getWiki: function(authors) {
			return authors.map(function(name) {
				return new Template('nobr').add(name).toWiki() 
			}).join(', ');
		},
		map: function(text) {
			var me = bibtexBase['автор'];
			return me.getWiki(me.getAuthors(text));
		},
	},
	'заглавие': {
		selector: 'title',
		map: function(text) {
			return text.replace(/^"|"$/g, '')
		}
	},
	'издание': { 
		selector: 'journal',
		map: function(text) {
			return {
				aj: 'Astronomical Journal',
				actaa: 'Acta Astronomica',
				araa: 'Annual Review of Astron and Astrophys',
				apj: 'Astrophysical Journal',
				apjl: 'Astrophysical Journal, Letters',
				apjs: 'Astrophysical Journal, Supplement',
				ao: 'Applied Optics',
				apss: 'Astrophysics and Space Science',
				aap: 'Astronomy and Astrophysics',
				aapr: 'Astronomy and Astrophysics Reviews',
				aaps: 'Astronomy and Astrophysics, Supplement',
				azh: 'Astronomicheskii Zhurnal',
				baas: 'Bulletin of the AAS',
				caa: 'Chinese Astronomy and Astrophysics',
				cjaa: 'Chinese Journal of Astronomy and Astrophysics',
				icarus: 'Icarus',
				jcap: 'Journal of Cosmology and Astroparticle Physics',
				jrasc: 'Journal of the RAS of Canada',
				memras: 'Memoirs of the RAS',
				mnras: 'Monthly Notices of the RAS',
				na: 'New Astronomy',
				nar: 'New Astronomy Review',
				pra: 'Physical Review A: General Physics',
				prb: 'Physical Review B: Solid State',
				prc: 'Physical Review C',
				prd: 'Physical Review D',
				pre: 'Physical Review E',
				prl: 'Physical Review Letters',
				pasa: 'Publications of the Astron. Soc. of Australia',
				pasp: 'Publications of the ASP',
				pasj: 'Publications of the ASJ',
				rmxaa: 'Revista Mexicana de Astronomia y Astrofisica',
				qjras: 'Quarterly Journal of the RAS',
				skytel: 'Sky and Telescope',
				solphys: 'Solar Physics',
				sovast: 'Soviet Astronomy',
				ssr: 'Space Science Reviews',
				zap: 'Zeitschrift fuer Astrophysik',
				nat: 'Nature',
				iaucirc: 'IAU Cirulars',
				aplett: 'Astrophysics Letters',
				apspr: 'Astrophysics Space Physics Research',
				bain: 'Bulletin Astronomical Institute of the Netherlands',
				fcp: 'Fundamental Cosmic Physics',
				gca: 'Geochimica Cosmochimica Acta',
				grl: 'Geophysics Research Letters',
				jcp: 'Journal of Chemical Physics',
				jgr: 'Journal of Geophysics Research',
				jqsrt: 'Journal of Quantitiative Spectroscopy and Radiative Transfer',
				memsai: 'Mem. Societa Astronomica Italiana',
				nphysa: 'Nuclear Physics A',
				physrep: 'Physics Reports',
				physscr: 'Physica Scripta',
				planss: 'Planetary Space Science',
				procspie: 'Proceedings of the SPIE',
			}[text] || text;
		},
	},
	'год': {
		selector: 'year',
	},
	'выпуск': {
		selector: 'number',
	},
	'том': {
		selector: 'volume',
	},
	'страницы': {
		selector: 'pages',
	},
	'издательство': { 
		selector: 'publisher',
	},
	'issn': {
		selector: 'issn',
	},
	'doi': {
		selector: 'doi',
	},
	'arxiv': {
		selector: 'eprint',
		map: function(text) {
			const prefix = 'arXiv:';
			if (text.indexOf(prefix) == 0)
				text = text.substr(prefix.length);
			return text;
		}
	},
	'ссылка': { const: "" },
	'ref': { const: "" },
	'archiveurl': { const: "" },
	'archivedate': { const: "" },
};

var adsabsBibcode = (function() {
	var bibtex = clone(bibtexBase);
	bibtex.bibcode = { selector: 'bibcode' };
	return bibtex;
})();

var ufnBibtex = (function() {
	var bibtex = clone(bibtexBase);

	var nameRegex = /^(.+) (\S+)$/;
	var author = bibtex['автор'];
	author.map = function(text) {
		return author.getWiki(author.getAuthors(text).map(function(name) {
			var match = nameRegex.exec(name);
			if (!match) return name;
			return match[2] + ' ' + match[1];
		}));
	}
	return bibtex;
})();

var googleBibtex = function(url) {
	var bibtex = clone(bibtexBase);
	bibtex.серия = { 'selector': 'series' };
	bibtex.страниц = { const: "" };
	bibtex.isbn = { 'selector': 'isbn' };
	delete bibtex.ссылка;
	delete bibtex.archiveurl;
	delete bibtex.archivedate;
	delete bibtex.ref;
	bibtex.ссылка = { const: url };
	bibtex.ref = { const: "" };
	return bibtex;
};

var sciencedirectBibtex = (function() {
	var bibtex = clone(bibtexBase);
	bibtex.ссылка = { selector: 'url' };
	bibtex.doi.map = function(text) {
		var res = /http:\/\/dx\.doi\.org\/(.*)$/.exec(text) || [];
		return res[1] || text;
	}
	bibtex.страницы.map = function(text) {
		return text.replace(' - ', '—')
	}
	return bibtex;
})();

var libGenesisBibtex = (function() {
	var bibtex = clone(bibtexBase);
	bibtex.выпуск = { selector: 'issue' };
	bibtex.страницы = { selector: 'page' };
	return bibtex;
})();

var wileyBibtex = (function() {
	var bibtex = clone(bibtexBase);
	bibtex.ссылка = { selector: 'url' };
	return bibtex;
})();

var jstorBibtex = (function() {
	var bibtex = clone(bibtexBase);
	bibtex.ссылка = { selector: 'url' };
	bibtex.выпуск.selector = function(obj) {
		return obj['number'] || obj['jstor_issuetitle'];
	}
	bibtex.страницы.map = function(text) {
		return text.replace(/^p?p\. /, "").replace('-', '—');
	};
	return bibtex;
})();

var getWpFromObj = function(name, rules, obj) {
	var article = new Template(name);

	for(var name in rules) {
		var rule = rules[name];

		var value;
		if (rule.const !== undefined)
			value = rule.const
		else {
			if (typeof rule.selector === "function")
				value = rule.selector(obj);
			else
				value = obj[rule.selector];
			if (!value)continue;
		}

		if (rule.map)
			value = rule.map(value, obj);

		article.add(name, value);
	}

	return article.toWiki();
}

var testUrl = function(regex) {
	return regex.exec(window.location.href)
}

var createWpButton = function(onclick, tag) {
	var element = document.createElement(tag || 'a');
	element.setAttribute('href', '#');
	element.textContent = 'WP';
	element.addEventListener('click', function(e) {
		e.preventDefault();
		onclick();
	});
	return element;
}

var pages = [
	// pubmed
	{
		test: function() {
			return testUrl(/\/pubmed\/(\d+)$/);
		},
		process: function(match) {
			var $ = unsafeWindow.jQuery;
			var id = match[1];
			$('#messagearea').after(
				$('<div>').append(
					$('<a>').attr('href', '#').text('WP').click(function(e) {
						e.preventDefault();

						ajax({
							method: "GET",
							url: id + '?dopt=Abstract&report=xml&format=text',
							onload: function(response) {
								var html = new DOMParser().parseFromString(response.responseText, "text/html");
								var xml = new DOMParser().parseFromString(html.body.textContent, "text/xml");
								alert(getWpFromXml(templates.article, pubmed, xml));
							}
						});
					})
				)
			);
		},
	},
	// adsabs
	{
		test: function() {
			return testUrl(/adsabs\.harvard\.edu\/(abs|doi)\/(.*)$/);
		},
		process: function(match) {
			var id = match[2];
			var button = createWpButton(function() {
				ajax({
					method: "GET",
					url: '/cgi-bin/nph-bib_query?data_type=BIBTEX&bibcode=' + id,
					onload: function(response) {
						var index = response.responseText.indexOf('@ARTICLE{');
						if (index == -1) {
							alert('bibtex not found');
							return;
						}

						try {
							alert(getWpFromObj(templates.article, adsabsBibcode, Bibtex(response.responseText, index, 'article')));
						} catch(e) {
							alert(e + '\n' + e.stack);
						}
					}
				});
			}, false);
			var heading = document.body.querySelector('h3');
			heading.appendChild(document.createTextNode(' '));
			heading.appendChild(button);
		},
	},
	// ufn
	{
		test: function() {
			return testUrl(/\/ufn\.ru\/ru\/articles\/(\d+\/\d+\/\w+)\//);
		},
		process: function(match) {
			var id = match[1];

			var button = createWpButton(function() {
				ajax({
					method: "GET",
					url: '/ru/articles/' + id + '/citation/ru/bibtex.html',
					onload: function(response) {
						var html = new DOMParser().parseFromString(response.responseText, "text/html");

						var node = html.body.querySelector('.cit_code > pre');
						if (!node) {
							alert('bibtex not found');
							return;
						}

						try {
							alert(getWpFromObj(templates.article, ufnBibtex, Bibtex(node.textContent, 0, 'article')));
						} catch(e) {
							alert(e + '\n' + e.stack);
						}
					}
				});
			});

			var node = document.body.querySelector('#print > table tr > td').nextSibling;
			var td = document.createElement('TD');
			td.appendChild(button);
			node.parentNode.insertBefore(td, node);
		},
	},
	// google books
	{
		test: function() {
			return window.self == window.top && testUrl(/http:\/\/books\.google\.\w+\/books\?id=([^&$]+)/);
		},
		process: function(match) {
			var id = match[1];

			var button = createWpButton(function() {
				ajax({
					method: "GET",
					url: 'http://books.google.us/books/download/?id=' + id + '&output=bibtex',
					onload: function(response) {
						try {
							alert(getWpFromObj(templates.book, googleBibtex('http://books.google.com/books?id=' + id), Bibtex(response.responseText, 0, 'book')));
						} catch(e) {
							alert(e + '\n' + e.stack);
						}
					}
				});
			});
			button.setAttribute('class', 'gb-button')
			button.setAttribute('style', 'margin-left: 4px')

			var item = document.body.querySelector('.metadata_value > .gb-button:last-child');
			if (item !== null)
				item.parentNode.appendChild(button);
		},
	},
	// sciencedirect
	{
		test: function() {
			return testUrl(/sciencedirect\.com\/science\/article\//);
		},
		process: function() {
			var $ = unsafeWindow.jQuery;
			var button = createWpButton(function() {
				var params = [];
				$('form[name=exportCite] input[type=hidden]').each(function(i, hidden) {
					params.push(encodeURIComponent($(hidden).attr('name')) + '=' + encodeURIComponent($(hidden).val()));
				})
				ajax({
					method: "GET",
					url: $('form[name=exportCite]').attr('action') + params.join('&') + '&citation-type=BIBTEX',
					onload: function(response) {
						try {
							alert(getWpFromObj(templates.article, sciencedirectBibtex, Bibtex(response.responseText, 0, 'article')));
						} catch(e) {
							alert(e + '\n' + e.stack);
						}
					}
				});
			}, 'input');

			$('.exportTxt').after($('<div />').append(
				$(button).attr('type', 'button').val('WP').css({
					'border-radius': '5px',
					'padding': '3px 5px 3px 24px',
					'border': '1px solid rgb(204, 204, 204)',
					'color': '#0156AA',
					'background': '#FFF',
					'margin-left': '2px',
					'cursor': 'pointer',
					'height': '24px',
					'margin-bottom': '5px',
					'font-weight': 'bold',
				})
			));
		},
	},
	// Library Genesis
	{
		test: function() {
			return testUrl(/gen\.lib\.rus\.ec\/scimag\//);
		},
		process: function() {
			var node = document.querySelector('form[name=search]');
			while(node && node.nodeName != 'TABLE') {
				node = node.nextSibling;
			}
			var rows = node.querySelectorAll('tr');
			for(var i = 0; i < rows.length; i++) {
				let doi = rows[i].querySelector('td:first-child').textContent;
				var button = createWpButton(function() {
					ajax({
						method: "GET",
						url: 'http://gen.lib.rus.ec/scimag/bibtex.php?doi=' + doi,
						onload: function(response) {
							var html = new DOMParser().parseFromString(response.responseText, "text/html");
							try {
								alert(getWpFromObj(templates.article, libGenesisBibtex, Bibtex(html.querySelector('textarea#bibtext').value, 0, 'article')));
							} catch(e) {
								alert(e + '\n' + e.stack);
							}
						}
					});
				});
				rows[i].querySelector('td:last-child').appendChild(button);
				button.style.fontWeight = 'bold';
			}
		}
	},
	// wiley
	{
		test: function() {
			return testUrl(/onlinelibrary\.wiley\.com\/doi\//)
		},
		process: function() {
			var $ = unsafeWindow.$;
			var doi = /^DOI:\s+(.+)$/.exec($('#doi').text().trim());
			if (!doi) return;
			doi = doi[1];

			var button = createWpButton(function() {
				ajax({
					method: 'POST',
					url: '/documentcitationdownloadformsubmit',
					data: 'doi=' + encodeURIComponent(doi) + '&fileFormat=BIBTEX&hasAbstract=CITATION',
					headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
					onload: function(response) {
						try {
							var bibtex = Bibtex(response.responseText, 0);
							bibtex.url = window.location.href;

							var template = { 
								'article': templates.article,
							}[bibtex.type.toLowerCase()];

							if (!template) {
								alert('unknown type: ' + bibtex.type);
								return;
							}
							alert(getWpFromObj(template, wileyBibtex, bibtex));
						} catch(e) {
							alert(e + '\n' + e.stack);
						}
					}
				});
			});
			setTimeout(function() {
				$('#toggleAddInfo').append(button);
			}, 500);
		}
	},
	// jstor
	{
		test: function() {
			return testUrl(/www\.jstor\.org\/[^\/]+\/(.*?)($|\?)/)
		},
		process: function(doi) {
			doi = decodeURIComponent(doi[1]);
			var button = createWpButton(function() {
				ajax({
					method: 'GET',
					url: '/action/downloadSingleCitationSec?userAction=export&format=bibtex&include=abs&singleCitation=true&noDoi=yesDoi&doi=' + doi,
					onload: function(response) {
						try {
							var txt = response.responseText.trim();
							const header = 'JSTOR CITATION LIST';

							var index = txt.indexOf(header);
							if (index == -1)
								throw new Error('header not found');
							index += header.length;

							while(index < txt.length) {
								var bibtex = Bibtex(txt, index, [ 'article', 'comment', 'book' ]);
								if (bibtex.type != 'comment')
									break;
								index = bibtex._index;
							}

							if (!bibtex)
								throw new Error('bibtex not found');

							var template = { 
								'article': templates.article,
								'book': templates.book,
							}[bibtex.type.toLowerCase()];
							alert(getWpFromObj(template, jstorBibtex, bibtex));
						} catch(e) {
							alert(e + '\n' + e.stack);
						}
					}
				});
			});

			document.querySelector('#navSearchContainer').appendChild(button);
			button.style.marginLeft = "10px"
		}
	},
];

try {
	pages.forEach(function(page) {
		var res = page.test();
		if (res) {
			page.process(res);
			return false; // break
		}
	});
} catch(e) {
	alert(e);
}
