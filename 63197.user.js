// ==UserScript==
// @name           leproarchivator
// @namespace      leprosorium
// @include        http://leprosorium.ru/
// @include        http://*.leprosorium.ru/
// @include        http://www.leprosorium.ru/my/
// @include        http://leprosorium.ru/my/
// ==/UserScript==

var president = document.getElementById('president');
var today_date = new Date();
var today_day = today_date.getDate();
var today_month = today_date.getMonth() + 1;
var paragraph = document.createElement('p');
paragraph.appendChild(document.createTextNode('Сегодня: '));
var today_link = document.createElement('a');
today_link.setAttribute('href', '/archive/' + today_date.getFullYear() + (today_month<10?'0':'') + today_month + (today_day<10?'0':'') + today_day);
today_link.appendChild(document.createTextNode((today_day<10?'0':'') + today_day + '.' + (today_month<10?'0':'') + today_month + '.' + today_date.getFullYear()));
today_link.setAttribute('class', 'link');
paragraph.appendChild(today_link);
president.appendChild(paragraph);

var isTruncate = GM_getValue("isTruncate");

var posts = document.getElementsByClassName('post');
var users = document.getElementsByClassName('js-user_login');
var sdoms = document.getElementsByClassName('p');

var domains = new Array();

for ( var i in sdoms ) {
	if (sdoms[i].childNodes[3].firstChild.nodeType==3) {
		var re = new RegExp("^(\\w*)\\.leprosorium\\.ru", "ig");
		var arr = re.exec(sdoms[i].childNodes[3].firstChild.nodeValue);
		if (RegExp.$1) {
			if (domains[RegExp.$1]) {
				domains[RegExp.$1]++;
			} else {
				domains[RegExp.$1] = 1;
			}
		}
	}
}

Object.size = function(obj) {
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};

Object.sort = function(obj) {
	var aux = new Array();
	for (var key in obj)
	aux.push([key, obj[key]]);
	aux.sort(function () {return arguments[0][1] > arguments[1][1]});

	var ret = new Array();

	for (var i=aux.length-1; i>=0; i--) {
		ret[aux[i][0]] = aux[i][1];
	}
	
	return ret;
}

String.prototype.startsWith = function(str) {
//	GM_log('Matching "' + str + '" in "' + this + '": >' + this.match('/^'+str+'/i') + '<');
	return (this.substr(0, str.length)==str);
}

var selector = document.getElementsByName('sorttype')[0];

function processSelector () {
	switch (this.options[this.selectedIndex].value) {
		case '1':	document.getElementsByName('run')[0].value = 1;
					GM_setValue('selector', 0);
					document.getElementsByName('sorts')[0].submit();
					break;
		case '2':	document.getElementsByName('run')[0].value = 1;
					GM_setValue('selector', 0);
					document.getElementsByName('sorts')[0].submit();
					break;
		case '3':	GM_setValue('selector', this.options[this.selectedIndex].value);
					sortByUnread();
					break;
		case '4':	GM_setValue('selector', this.options[this.selectedIndex].value);
					sortByComments();
					break;
		case '5':	GM_setValue('selector', this.options[this.selectedIndex].value);
					sortByRatings();
					break;
		default:	if (Object.size(domains) > 0) {
						for ( var i in domains ) {
							if (this.options[this.selectedIndex].value == i) {
								GM_setValue('selector', this.options[this.selectedIndex].value);
								sortByDomain(this.options[this.selectedIndex].value);
								break;
							}
						}
					}
	}
	this.blur();
}

function swapNodes(itemx, itemy) {
	var itemtmp = itemx.cloneNode(1);
	var parent = itemx.parentNode;
	itemy = parent.replaceChild(itemtmp, itemy);
	parent.replaceChild(itemy, itemx);
	parent.replaceChild(itemx,itemtmp);
	itemtmp = null;
}

function sortByRatings () {
	var raitings = document.getElementsByClassName('rating');
	for (var i=0; i<raitings.length-1; i++) {
		var highestNode = raitings[i];
		for (var j=i+1; j<raitings.length; j++) {
			if (parseInt(highestNode.firstChild.innerHTML) < parseInt(raitings[j].firstChild.innerHTML)) {
				highestNode = raitings[j];
			}
		}
		if (raitings[i] != highestNode) {
			swapNodes(raitings[i].parentNode.parentNode.parentNode.parentNode, highestNode.parentNode.parentNode.parentNode.parentNode);
		}
	}
}

function sortByUnread () {
	var posts = document.getElementsByClassName('post');

	for (var i=0; i<posts.length-1; i++) {
	
		var highestNode = posts[i];
		var highestNodeUnreads = 0;
		var elHUnreads = document.evaluate("//a[contains(@href, '"+posts[i].id.substring(1)+"#new')]", document, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;
		if (elHUnreads) {
			highestNodeUnreads = parseInt(elHUnreads.firstChild.firstChild.nodeValue.split(' ')[0]);
		}
		for (var j=i+1; j<posts.length; j++) {
			var currentNodeUnreads = 0;
			var elCUnreads = document.evaluate("//a[contains(@href, '"+posts[j].id.substring(1)+"#new')]", document, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;
			if (elCUnreads) {
				currentNodeUnreads = parseInt(elCUnreads.firstChild.firstChild.nodeValue.split(' ')[0]);
			}
			if (highestNodeUnreads < currentNodeUnreads) {
				highestNode = posts[j];
				highestNodeUnreads = currentNodeUnreads;
			}
		}
		if (posts[i] != highestNode) {
			swapNodes(posts[i], highestNode);
		}
	}
}

function sortByComments () {
	var posts = document.getElementsByClassName('post');

	for (var i=0; i<posts.length-1; i++) {
	
		var highestNode = posts[i];
		var highestNodeUnreads = 0;
		var elHUnreads = document.evaluate("//a[contains(@href, '/comments/"+posts[i].id.substring(1)+"')]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
		if (elHUnreads) {
			highestNodeUnreads = parseInt(elHUnreads.firstChild.nodeValue.split(' ')[0]);
		}
		for (var j=i+1; j<posts.length; j++) {
			var currentNodeUnreads = 0;
			var elCUnreads = document.evaluate("//a[contains(@href, '/comments/"+posts[j].id.substring(1)+"')]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
			if (elCUnreads) {
				currentNodeUnreads = parseInt(elCUnreads.firstChild.nodeValue.split(' ')[0]);
			}
			if (highestNodeUnreads < currentNodeUnreads) {
				highestNode = posts[j];
				highestNodeUnreads = currentNodeUnreads;
			}
		}
		if (posts[i] != highestNode) {
			swapNodes(posts[i], highestNode);
		}
	}
}

function sortByDomain (domain) {
	var infos = document.getElementsByClassName('p');

	for ( var i in infos ) {
		var post = infos[i].parentNode.parentNode;
		var dc = infos[i].childNodes[3].firstChild;
		if (dc.nodeType==3) {
			var re = new RegExp("^(\\w*)\\.leprosorium\\.ru", "ig");
			var arr = re.exec(dc.nodeValue);
			if (post.className.split(' ')[0]=='post') {
				if (dc.nodeValue.startsWith('|')) {
					post.style.display = 'none';
				} else {
					if (RegExp.$1==domain) {
						post.style.display = 'block';
					} else {
						post.style.display = 'none';
					}
				}
			}
		}
	}

}

if (selector) {
	selector.setAttribute('onchange', '');
	//removeEventListener('change', unsafeWindow.resubmit, false);
	var selected = GM_getValue('selector');

	var option = document.createElement('option');
	option.appendChild(document.createTextNode('непрочитанным комментариям'));
	option.value = 3;
	if (parseInt(selected)==3) {
//		option.setAttribute('selected', 'selected');
	}
	selector.appendChild(option);

	option = document.createElement('option');
	option.appendChild(document.createTextNode('количеству комментариев'));
	option.value = 4;
	if (parseInt(selected)==4) {
//		option.setAttribute('selected', 'selected');
	}
	selector.appendChild(option);

	option = document.createElement('option');
	option.appendChild(document.createTextNode('рейтингу'));
	option.value = 5;
	if (parseInt(selected)==5) {
		option.setAttribute('selected', 'selected');
		sortByRatings();
	}
	selector.appendChild(option);
	
	if (Object.size(domains) > 0) {
		var og = document.createElement('optgroup');
		og.setAttribute('label', 'доменам');
		domains = Object.sort(domains);
		for ( var i in domains ) {
			option = document.createElement('option');
			option.appendChild(document.createTextNode((domains[i] < 10 ? ('0' + domains[i]):domains[i]) + ' в ' + i));
			option.value = i;
			if (selected==i) {
				option.setAttribute('selected', 'selected');
				sortByDomain(i);
			}
			og.appendChild(option);
		}
		selector.appendChild(og);
	}
	
	selector.addEventListener('change', processSelector, false);
}


var postsLoaded = posts.length;

if (isTruncate) {
	GM_registerMenuCommand("Не удалять прочитанные «Истчо»", setTruncate);
} else {
	GM_registerMenuCommand("Удалять прочитанные «Истчо»", setTruncate);
}

function setTruncate () {
	if (isTruncate) {
		GM_registerMenuCommand("Не удалять прочитанные «Истчо»", setTruncate);
		GM_setValue("isTruncate", false);
	} else {
		GM_registerMenuCommand("Удалять прочитанные «Истчо»", setTruncate);
		GM_setValue("isTruncate", true);
	}
	window.location.reload();
}

var anchorer = document.getElementsByClassName('load_more_posts')[0];

var ival;

function checkNewPosts () {
	posts = document.getElementsByClassName('post');
	if (posts.length > postsLoaded) {
		window.clearInterval(ival);
		ival = null;
		if (isTruncate) {
//			GM_log('Deleting «Истчо»');
			var cnt = 0;
			for (;postsLoaded>=1;postsLoaded--) {
//				GM_log('Deleting: [' + ++cnt + '] ' + posts[0].id);
				posts[0].parentNode.removeChild(posts[0]);
			}
			postsLoaded = posts.length;
			posts[0].scrollIntoView();
			process(0, postsLoaded);
//			GM_log('Осталось «Истчо»: ' + postsLoaded);
		} else {
			posts[postsLoaded].scrollIntoView();
			process(postsLoaded, posts.length);
			postsLoaded = posts.length;
		}
	}
}

if (anchorer) {
	anchorer.addEventListener('click', function () {
//			GM_log('INTERVAL: ' + ival);
			if (!ival) {
				ival = window.setInterval(checkNewPosts, 100);
			}
		}, false);
}

function process (from, to) {
	users = document.getElementsByClassName('js-user_login');
	for (var i=from; i<to; i++) {
		var dt = new Date();
		var ds = 'сегодня';
		node = users[i].nextSibling;
		if (node.nodeValue.match(new RegExp("^,\\s*вчера")) == ", вчера") {
			dt.setTime(dt.getTime()-24*60*60*1000);
			ds = 'вчера';
		} else {
			var re = new RegExp("^,\\s(\\d{2})\\.(\\d{2})\\.(\\d{4})");
			var arr = re.exec(node.nodeValue);
			var rs = RegExp.$1 + '.' + RegExp.$2 + '.' + RegExp.$3;
			if (rs.length == 10) {
			  ds = rs;
			  dt.setDate(RegExp.$1);
			  dt.setMonth(RegExp.$2.valueOf()-1);
			  dt.setFullYear(RegExp.$3);
			}
		}
		apply(node, dt, ds);
	}
}

function apply (node, dt, ds) {
//	GM_log("POSITION of ["+ds+"]: " + node.nodeValue.indexOf(ds) + " in " + node.nodeValue);
	if (node.nodeValue.indexOf(ds)>=0) {
		var span = document.createElement('span');
		span.appendChild(document.createTextNode(', '));
		var link = document.createElement('a');
		var month = dt.getMonth() + 1;
		var day = dt.getDate();
		link.setAttribute('href', '/archive/' + dt.getFullYear() + (month<10?'0':'') + month + (day<10?'0':'') + day /*+ '/#' + users[i].parentNode.parentNode.parentNode.id*/);
		link.appendChild(document.createTextNode(ds));
		span.appendChild(link);
		span.appendChild(document.createTextNode(node.nodeValue.substring(2 + ds.length)));
		node.parentNode.replaceChild(span, node);
	}
}

process(0, postsLoaded);
