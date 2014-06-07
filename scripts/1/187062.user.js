// ==UserScript==
// @name        DoubanBookBar
// @namespace   DoubanBookBar
// @author	Ticshot<Ticshot@gmail.com>
// @commiter    ElvisKang<kkx1993@gmail.com>
// @description (在亚马逊、京东、China-pub、苏宁易购)显示书籍的豆瓣评分和其他网站书本价格
// @include     *://www.amazon.cn/*
// @include	*://www.amazon.com/*、
// @include	*://item.jd.com/*
// @include	*://product.dangdang.com/*
// @include	*://product.china-pub.com/*
// @include	*://product.suning.com/*
// @version     ver 0.1
// @grant GM_xmlhttpRequest
// ==/UserScript==

//v0.1		第一版发布


(function() {

	var Site = {
		/*
			format of a new support site:
				name : (String) the name of the site 
				cName : (String) Chinese name of the site on douban
				logo : (String) the favicon of the site 
				checker : (RegExp Object) the regular expression to check whether the current site is belong to this site
				isComparable: (bool) whether this site joined into the price comparison 
				getISBN : (function) the function to get ISBN from current site
				createDoubanBar : (function) the function to create bar
			*if isComparable is false , then the variables : cName,logo is optional
		*/

		_siteList: [],
		_curSite: null,

		addSite: function(site) {
			if (Object.prototype.toString.call(site) === '[object Array]') {
				this._siteList = this._siteList.concat(site);
			} else {
				this._siteList = this._siteList.push(site);
			}
		},

		getCurSite: function(href) {
			try {
				if ( !! (this._curSite)) {
					return this._curSite;
				} else {
					for (var i = 0, len = this._siteList.length; i < len; i++) {
						if (Object.prototype.toString.call(this._siteList[i].checker) === "[object RegExp]") {
							if (this._siteList[i].checker.test(href)) {
								this._curSite = this._siteList[i];
								return this._siteList[i];
							}
						} else if (typeof this._siteList[i].checker === "function") {
							if (this._siteList[i].checker(href)) {
								this._curSite = this._siteList[i];
								return this._siteList[i];
							}
						}
					}
				}
			} catch (e) {
				//console.log(e);
				return {};
			}
			return {};
		},

		getComparableSite: function() {
			var comparableSites = [];
			for (var i = 0, len = this._siteList.length; i < len; i++) {
				if (this._siteList[i].isComparable) {
					comparableSites.push(this._siteList[i]);
				}
			}
			return comparableSites;
		},

		supportSite: function() {
			return _siteList.map(function(curSite) {
				return curSite.name;
			});
		}
	};

	var setCss = function(elem, css, fatherDom) {
		css = css || null;
		var elem_style = elem.style ? [elem.style] : (typeof elem !== "string") ? {} : Array.prototype.slice.call((fatherDom || document).querySelectorAll(elem), 0).map(function(e) {
			return e.style;
		});
		for (var name_text in css) {
			var style_name = name_text.replace(/\-[a-zA-z]/g, function(word) {
				return word.substring(1).toUpperCase();
			});
			elem_style.forEach(function(elem_styl) {
				elem_styl[style_name] = css[name_text];
			});
		}
	};

	var setAllCss = function(cssBunch) {
		/*
			cssBunch : Array
			Array container :
				dom : (object) HTMLDOM || selector
				css : (object) 
		*/
		for (var i = 0, len = cssBunch.length; i < len; i--) {
			setCss(cssBunch[i].dom, cssBunch[i].css);
		}
	};

	var setStarStyle = function(star, score, extraCss) {
		//base css
		setCss(star, {
			"background-image": 'url("http://img3.douban.com/pics/movie/bigstars.gif")',
			"width": "75px",
			"height": "14px",
			"display": "inline-block",
			"color": "#666",
			"position": "relative",
			"top": "1px",
			"background-position": "0 " + (-14) * (10 - Math.floor(parseFloat(score) + 0.8)) + "px"
		});

		setCss(star, extraCss);
	};

	var checkScore = function(num_raters, average_score, book_id) {
		var score_row;

		if (num_raters === 0) {
			score_show = '<span style="font-size:13px;">没有人评价这本书</span>';
		} else if (num_raters < 10) {
			score_show = '<span style="font-size:13px;">少于10人评价这本书</span>';
		} else if (num_raters >= 10) {
			score_show = '<span style="padding:5px;">' + average_score + '</span><a id="douban_collections" style="text-decoration:none;font-size:13px" href="http://book.douban.com/subject/' + book_id + '/collections" target="_blank">(共' + num_raters + '人评价)</a>';
		} else {
			score_show = null;
		}

		//console.log(score_show);
		return score_show;
	};

	var getPriceContent = function(icon_link, a_price_data, css) {
		a_price_data = a_price_data || {};
		var price_container = document.createElement("span"),
			link = document.createElement("a"),
			img = document.createElement("img");

		img.src = icon_link;
		img.style.height = "16px";
		img.style.width = "16px";
		link.href = a_price_data.href || "#";
		link.target = "_blank";
		if (a_price_data.price === undefined) {
			link.textContent = "[没找到]";
		} else {
			link.textContent = "￥" + a_price_data.price;
		}
		link.insertBefore(img, link.firstChild);
		price_container.appendChild(link);

		if (css.dom) {
			setAllCss(css);
		} else {
			setCss(price_container, css);
		}

		return price_container;
	};

	var getAllPriceContent = function(siteName, price_infos) {
		var prices = document.createElement("span");

		var price;
		var comparableSites = Site.getComparableSite();
		//console.log(comparableSites);
		prices.id = "show_price";
		//console.log(price_infos);
		for (var i = 0, len = price_infos.length; i < len; i++) {
			for (var j = 0, c_len = comparableSites.length; j < c_len; j++) {
				//console.log("siteName:"+siteName , "comparableSite["+j+"].name:"+comparableSites[j].name , "price_infos["+i+"].site:"+price_infos[i].site , "comparableSites["+j+"].cName:"+comparableSites[j].cName);
				if (siteName !== comparableSites[j].name && price_infos[i].site === comparableSites[j].cName) {
					price = getPriceContent(comparableSites[j].logo, price_infos[i], {
						"padding-left": "8px"
					});
					prices.appendChild(price);
				}
			}
		}
		//console.log(prices);
		if (price_infos.length === 0) {
			prices.innerHTML = "Sorry,豆瓣上找不到这本书相关的购买信息...";
		}

		return prices;
	};

	var createDoubanBar = function(book_info, price_infos, siteName, targetLi) {
		//console.log(JSON.stringify(book_info));
		//setScore
		var score_row = document.createElement("li"),
			label = document.createElement("th"),
			rating = document.createElement("td"),
			stars = document.createElement("span"),
			score = document.createElement("span"),
			raters = document.createElement("a"),
			link = document.createElement("span");
		if (siteName == "amazon") score_row = document.createElement("div");
		var book_id = book_info["id"],
			book_rating = book_info["rating"] || {},
			num_raters = book_rating["numRaters"],
			average_score = book_rating["average"],
			score_show;

		var link_style = link.style,
			score_style = score.style;

		label.innerHTML = "豆瓣评分：";
		label.style.lineHeight = "14px";

		score_show = checkScore(num_raters, average_score, book_id);
		if (score_show) {
			setStarStyle(stars, average_score);
			rating.appendChild(stars);

			link.innerHTML = '<span><a href="http://book.douban.com/subject/' + book_id + '/" target="_blank" >(去豆瓣看这本书)</a></span>';
			link_style.fontSize = "13px";
			link_style.color = "#007722";
			link_style.textDecoration = "none";
			link_style.display = "inline-block";
			link_style.lineHeight = "14px";
		} else {
			score_show = '<span><a href="http://book.douban.com" target="_blank" style="font-size:12px;color:#007722">没在豆瓣找到这本书,去豆瓣逛逛?</a></span>';
		}

		score.innerHTML = '<span>' + score_show + '</span>';
		score_style.marginLeft = "10px";
		score_style.marginRight = "10px";
		score_style.fontSize = "13px";
		score_style.display = "inline-block";
		score_style.lineHeight = "14px";
		rating.appendChild(score);

		rating.appendChild(link);
		rating.colSpan = "3";
		score_row.appendChild(label);
		score_row.appendChild(rating);

		//setPrice
		var price_content = getAllPriceContent(siteName, price_infos),
			price_wrapper = document.createElement("li"),
			price_label = document.createElement("span"),
			price_container = document.createElement("span");
		if (siteName == "amazon") price_wrapper = document.createElement("div");
		price_label.innerHTML = "比&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;价：";
		price_label.style.lineHeight = "14px";
		price_wrapper.appendChild(price_label);

		price_container.colSpan = 3;
		setCss(price_container, {
			"padding-top": "0px"
		});
		price_container.appendChild(price_content);
		price_wrapper.appendChild(price_container);
		if (siteName == "dangdang" || siteName == "amazon") {
			var bar = document.createElement("span");
			bar.appendChild(score_row);
			bar.appendChild(price_wrapper);
			bar.id = "douban_bar";
			if (siteName == "amazon")
				targetLi.parentNode.appendChild(bar);
			else
				targetLi.parentNode.insertBefore(bar, targetLi);
		} else {
			score_row.id = "douban_score";
			price_wrapper.id = "douban_price";
			targetLi.parentNode.insertBefore(score_row, targetLi);
			targetLi.parentNode.insertBefore(price_wrapper, targetLi);
		}
	};

	var Amazon = {

		name: "amazon",

		cName: "亚马逊",

		checker: /(https?:\/\/)?(www)?\.amazon\.(com|cn)\/.*/,

		logo: "http://www.amazon.cn/favicon.ico",

		isComparable: true,

		getISBN: function() {
			var contents = document.querySelectorAll("div.content b");
			var is_book = false;
			try {
				for (var i = 0; i <= contents.length; i++) {
					var info = contents[i];

					if (info.textContent === "ISBN:" || info.textContent === "条形码:") {
						//console.log(info.nextSibling.data.split(",")[0].substring(1));
						return info.nextSibling.data.split(",")[0].substring(1);
					}
				}
				return null;
			} catch (e) {
				return null;
			}
		},

		createBar: function(book_info, price_infos) {
			var targetLi = document.getElementById("priceBlock");
			createDoubanBar(book_info, price_infos, this.name, targetLi);
		}
	};

	var Jd = {

		name: "jd",

		cName: "京东商城",

		checker: /(https?:\/\/)?(www|item)?\.jd\.com\/.*/,

		logo: "http://www.jd.com/favicon.ico",

		isComparable: true,

		getISBN: function() {
			try {
				return document.getElementById("summary-isbn").getElementsByClassName("dd")[0].innerHTML;
			} catch (e) {
				return null;
			}
		},
		createBar: function(book_info, price_infos) {
			var targetLi = document.getElementById("summary-stock");
			createDoubanBar(book_info, price_infos, this.name, targetLi);
		}

	};

	var Dangdang = {

		name: "dangdang",

		cName: "当当网",

		checker: /(https?:\/\/)?(www|product)?\.dangdang\.com\/.*/,

		logo: "http://www.dangdang.com/favicon.ico",

		isComparable: true,

		getISBN: function() {
			try {
				var intros = document.getElementsByClassName("show_info")[0].getElementsByClassName("intro")[0].getElementsByTagName("li");
				var isbn = intros[intros.length - 1].getElementsByTagName("i")[0];
				if (isbn.innerHTML === "I S B N：") {
					//console.log(isbn.nextSibling.data);
					return isbn.nextSibling.data;
				}
				return null;
			} catch (e) {
				return null;
			}
		},
		createBar: function(book_info, price_infos) {
			var targetLi = document.getElementById("stock_html");
			createDoubanBar(book_info, price_infos, this.name, targetLi);
		}

	};

	var Chinapub = {

		name: "chinapub",

		cName: "China-pub",

		checker: /(https?:\/\/)?(product|www)\.china\-pub\.com\/.*/,

		logo: "http://www.china-pub.com/favicon.ico",

		isComparable: true,

		getISBN: function() {
			var list = document.querySelectorAll("#con_a_1 li");
			for (var i = 0; i < list.length; i++) {
				if (list[i].innerHTML.split("：")[0] === "ISBN") {
					return list[i].innerHTML.split("：")[1].replace(/\<.*?\>/g, "").match(/[0-9]*/g).join("");
				}
			}
			return null;
		},

		createBar: function(book_info, price_infos) {
			var targetLi = document.getElementsByClassName("pro_buy_bg")[0].previousSibling;
			createDoubanBar(book_info, price_infos, this.name, targetLi);
		}

	};

	var Suning = {

		name: "suning",

		cName: "苏宁易购",

		checker: /(https?:\/\/)?(product)\.suning\.com\/.*/,

		logo: "http://www.suning.com/favicon.ico",

		isComparable: true,

		getISBN: function() {
			try {
				var list = document.getElementById("total").getElementsByTagName("dl");
				var isbn = /i\s?s\s?b\s?n/i;
				for (var i = list.length - 1; i >= 0; i--)
					for (var j = 0, len = list[i].getElementsByTagName("dt").length; j < len; j++)
						if (isbn.test(list[i].getElementsByTagName("dt")[j].textContent))
							return list[i].getElementsByTagName("dd")[j].textContent;
				return null;
			} catch (e) {
				return null;
			}
		},
		createBar: function(book_info, price_infos) {
			var targetLi = document.getElementsByClassName("fix cl")[0];
			createDoubanBar(book_info, price_infos, this.name, targetLi);
		}
	};

	var setDoubanData = function(isbn) {
		if (!isbn) {
			return null;
		}

		GM_xmlhttpRequest({
			method: "get",
			url: "http://api.douban.com/v2/book/isbn/" + isbn,
			onload: function(result) {
				//console.log(result);
				var book_info = JSON.parse(result.responseText);
				setDoubanPrice(book_info.id, book_info);
			}
		});
	};

	var setDoubanPrice = function(douban_id, book_info) {
		douban_id = douban_id || null;
		var douban_link = "http://book.douban.com/subject/" + douban_id + "/buylinks";
		var price_infos = [];
		GM_xmlhttpRequest({
			method: "get",
			url: douban_link,
			onload: function(result) {
				//console.log(result.responseText);
				var container = document.createElement("div");
				container.innerHTML = result.responseText;
				var list = document.evaluate('//table[@id="buylink-table"]/tbody/tr', container, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
				//console.log(list);
				var price_check = /[0-9]+(\.[0-9]+)?/;

				for (var i = 1, len = list.snapshotLength; i < len; i++) {
					//console.log(list.snapshotItem(i));
					var part = list.snapshotItem(i);
					var link_info = part.querySelectorAll("td.pl2");

					var price_info = {
						"site": link_info[0].textContent.trim(),
						"href": link_info[0].getElementsByTagName("a")[0].href,
						"price": price_check.exec(link_info[1].textContent.trim())[0]
					};
					price_infos.push(price_info);
				}
				//console.log(price_infos);
				var curSite = Site.getCurSite();
				curSite.createBar(book_info, price_infos);
			}

		});

	};

	var init = function() {
		Site.addSite([Amazon, Jd, Dangdang, Chinapub, Suning]);
		var curSite = Site.getCurSite(location.href),
			isbn = curSite.getISBN();
		//console.log(curSite.name);
		// console.log(isbn);
		try {
			setDoubanData(isbn);
		} catch (e) {}

	};

	init();
})();