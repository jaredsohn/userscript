// ==UserScript==
// @name        EQD Blogger Comments
// @description Add a button to restore old blogger comments on Equestria Daily
// @version     2.1.0
// @namespace   http://userscripts.org/users/512780
// @include     http://www.equestriadaily.com/*.html
// @include     http://www.equestriadaily.com/*.html?*
// @include     http://www.equestriadaily.com/*.html#*
// @updateURL   https://userscripts.org/scripts/source/381894.meta.js
// @downloadURL https://userscripts.org/scripts/source/381894.user.js
// @grant       GM_getValue
// @grant       GM_setValue
// @grant       GM_registerMenuCommand
// @grant       GM_xmlhttpRequest
// @uso:script  EQD_BC
// ==/UserScript==

function $(i,p){if(!p)p=document;return p.getElementById(i);}
function $$(t,a,c,e){var n=document.createElement(t);if(a){for(var i in a){n.setAttribute(i,a[i]);}}if(c){for(var i=0;i<c.length;i++){n.appendChild(c[i]);}}if(e){for(var i=0;i<e.length;i++){$$e(n,e[i]['t'],e[i]['f'],e[i]['c']?true:false);}}return n;}
function $$t(t){return document.createTextNode(t);}
function $$f(){return document.createDocumentFragment();}
function $$e(n,t,f,c){return n.addEventListener(t,f,c?true:false);}

function hide(n, e)
{
	if(!n) return;
	if(e) n.innerHTML = '';
	var d = getComputedStyle(n, null).display;
	if(d != 'none') n.dataset._display = d;
	n.style.display = 'none';
}
function unhide(n, e)
{
	if(!n) return;
	if(e) n.innerHTML = '';
	if(getComputedStyle(n, null).display == 'none') n.style.display = n.dataset._display || '';
}

function formatDateTime(dt)
{
	if(!dt || typeof(dt) !== 'object') return dt;
	var months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
	var days   = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
	var date = new Date(dt);
	var mn = ''+months[date.getMonth()];
	var dt = date.getDate()   ; if(dt < 10) dt = '0'+dt;
	var hr = date.getHours()  ; if(hr < 10) hr = '0'+hr;
	var mi = date.getMinutes(); if(mi < 10) mi = '0'+mi;
	var sc = date.getSeconds(); if(sc < 10) sc = '0'+sc;
	return days[date.getDay()] + ', ' + dt + '-' + mn.substr(0,3) + '-' + date.getFullYear() + ' ' + hr + ':' + mi + ((sc!='00')?(':'+sc):'');
}

function addCSS()
{
	document.getElementsByTagName('head')[0].appendChild($$('style', {'type':'text/css'}, [$$t("\
#comment_toggle{\
	background: url('http://s.intensedebate.com/themes/universal/images/idc-universal.png?=3') no-repeat scroll -516px -899px;\
	cursor: pointer;\
	display: inline-block;\
	font-size: 16px;\
	height: 26px;\
	padding-top: 2px;\
	text-align: center;\
	width: 300px;\
}\
#comment_toggle:hover{\
	background-position: -516px -925px;\
}\
#comment_toggle:active{\
	background-position: -516px -951px;\
	padding-top: 3px;\
}\
#blogger-comment_count{\
	font-size: 22px !important;\
}\
#idc-container #blogger-comments_perpage{\
	margin-left: 20px;\
}\
#idc-container .pagination{\
	margin: 10px 0;\
}\
#idc-container .pagination > span.lnk{\
	color: #0000ff;\
	cursor: pointer;\
	margin: 2px;\
}\
#idc-container .pagination > span.cur{\
	font-weight: 700;\
	margin: 2px;\
}\
#idc-container .option_selected{\
	background-color: #f0f0ff;\
	border: 1px solid #0000ff;\
	border-radius: 10px;\
	font-weight: 700 !important;\
	margin: 5px;\
	padding: 1px 4px !important;\
}\
#idc-container .idc-c{\
  border: 1px solid #E0E0E0 !important;\
  border-radius: 5px;\
  padding: 2px 2px 2px 12px !important;\
}\
")]));
}

var data = {
	'per_page' : GM_getValue('blogger-comments_perpage', 50),
	'postid' : '',
	'blogid' : '',
	'order' : GM_getValue('blogger-comment_order', 'a'),
	'total_results' : 0,
	'total_pages' : 0,
	'cur_page' : 1,
	'pages' : {},
	'comments': []
};

var blogger_loading = true;
var blogger_loaded = false;
var blogger_firstload = true;

function getCommentData(start_offset, max_results, callback)
{
	blogger_loaded = false;
	blogger_loading = true;

	GM_xmlhttpRequest({
		'method':'get',
		'url':'http://www.equestriadaily.com/feeds/'+data.postid+'/comments/default?alt=json&start-index='+start_offset+'&max-results='+max_results,
		'overrideMimeType':'application/json',
		'onload':function(r)
		{
			var cdata = JSON.parse(r.responseText);
			var cs = cdata.feed.entry;
			var comments = [];
			if(cs)
			{
				for(var i=cs.length; i--;)
				{
					comments.push({
						 'id' : cs[i].id.$t.match(/(\d+)$/)[1],
					   'time' : new Date(cs[i].published.$t),
					 'author' : cs[i].author[0].name.$t,
					   'icon' : cs[i].author[0].hasOwnProperty('gd$image') ? cs[i].author[0].gd$image.src : '',
					    'uri' : cs[i].author[0].hasOwnProperty('uri') ? cs[i].author[0].uri.$t : false,
					'content' : cs[i].content.$t
					});
				}
			}
			data.total_results = parseInt(cdata.feed.openSearch$totalResults.$t, 10);
			data.comments = comments;
			if(data.total_results > 0) calcPagination();
			//console.dir(data);
			callback();
		}
	});
}

function calcPagination()
{
	data.total_pages = Math.floor(data.total_results / data.per_page) + ((data.total_results % data.per_page == 0) ? 0 : 1);
	data.pages = {};

	data.pages[1] = {
		'start_num' : 1,
		'end_num'   : (data.total_results > data.per_page) ? data.per_page : data.total_results,
		'start_offset' : {
			'a' : (data.total_results > data.per_page) ? (1 + data.total_results - data.per_page) : 1,
			'd' : 1
		},
		'max_results' : {
			'a' : data.per_page,
			'd' : data.per_page
		},
	};

	for(var p=2; p<=data.total_pages; p++)
	{
		var prev = data.pages[p-1];
		data.pages[p] = {
			'start_num' : prev.start_num + data.per_page,
			'end_num'   : (prev.end_num + data.per_page > data.total_results) ? data.total_results : (prev.end_num + data.per_page),
			'start_offset' : {
				'a' : (prev.start_offset.a > data.per_page) ? (prev.start_offset.a - data.per_page) : 1,
				'd' : prev.start_offset.d + data.per_page
			},
			'max_results' : {
				'a' : (prev.start_offset.a > data.per_page) ? data.per_page : (data.total_results - prev.end_num),
				'd' : prev.max_results.d
			}
		};
	}
	//console.dir(data);
}

function addBloggerComments()
{
	$('blogger-comment_count').innerHTML = 'Comments (' + data.total_results + ')';
	$('blogger-comments_start').innerHTML = data.pages[data.cur_page].start_num;
	$('blogger-comments_end').innerHTML = data.pages[data.cur_page].end_num;

	var n_bcpt = $('blogger-comments_pagination_t');n_bcpt.innerHTML = '';
	var n_bcpb = $('blogger-comments_pagination_b');n_bcpb.innerHTML = '';
	if(data.total_pages > 1)
	{
		var n_p = $$f();
		n_p.appendChild($$t('Show page: '));
		if(data.cur_page > 1) n_p.appendChild( $$('span', {'class':'lnk', 'data-page':(data.cur_page - 1)}, [$$t('\u00ab Previous ')]) );
		for(var page in data.pages)
		{
			n_p.appendChild($$t(' '));
			if(data.cur_page == page) n_p.appendChild( $$('span', {'class':'cur option_selected'}, [$$t(page)]) );
			else n_p.appendChild( $$('span', {'class':'lnk', 'data-page':page}, [$$t(page)]) );
		}
		if(data.cur_page < data.total_pages) n_p.appendChild( $$('span', {'class':'lnk', 'data-page':(data.cur_page + 1)}, [$$t('  Next \u00bb')]) );

		n_bcpb.appendChild(n_p.cloneNode(true));
		n_bcpt.appendChild(n_p);
	}

	var n_cc = $('blogger-comments');n_cc.innerHTML = '';
	for(var i=data.comments.length; i--; )
	{
		var _i = (data.order == 'a') ? (data.comments.length - i - 1) : i;
		var c = data.comments[_i];
		var n_text = $$('div', {'class':'idc-c-t'});n_text.innerHTML = c.content.replace(/[^\s\t\n\r]{70}/g, "$& ").replace(/(['"=])?(https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b(?:(?:[-a-zA-Z0-9@:%_\+.~#?//=]|&amp;)*))/gi, function($0,$1,$2){return $1?$0:'<a target="_blank" href="'+$2+'">'+$2+'</a>'}); // fix this properly later
		var n_uri_attrs = c.uri ? {'href':c.uri, 'target':'_blank'} : {};
		n_cc.appendChild(
			$$('div', {'class':'idc-c', 'id':'c'+c.id}, [
				$$('div', {'class':'idc-c-h'}, [
					$$('div', {'class':'idc-c-h-inner'}, [
						$$('a', {'class':'idc-a'}, [
							$$('a', n_uri_attrs, [
								$$('img', {'class':'idc-avatar', 'src':c.icon})
							])
						]),
						$$('p', {'class':'idc-i'}, [
							$$('a', n_uri_attrs, [
								$$t(c.author)
							]),
							$$('em', {'class':'idc-time'}, [
								$$t(' \u00b7 '),
								$$('a', {'href':'#c'+c.id}, [
									$$t(formatDateTime(c.time))
								])
							])
						])
					])
				]),
				n_text,
				$$('div', {'class':'idc-c-b'}, [
					$$('a', {'class':'idc-right', 'href':'https://www.blogger.com/delete-comment.g?blogID='+data.blogid+'&postID='+c.id}, [$$t('Delete')]),
					$$('a', {'class':'idc-btn_s', 'target':'_blank', 'href':'https://www.blogger.com/comment.g?blogID='+data.blogid+'&postID='+data.postid+'&isPopup=true&postBody=%40%3Ca%20href%3D%22%23c'+c.id+'%22%3E'+encodeURIComponent(c.author)+'%3C%2Fa%3E#form'}, [
						$$('span', {}), $$('span', {'class':'idc-r'}, [$$t('Reply')])
					])
				])
			])
		);
	}

	n_bcpt.style.opacity = '1';
	n_bcpb.style.opacity = '1';
	if(!blogger_firstload) $('blogger-container').scrollIntoView();
	else if(/^#c\d+$/.test(window.location.hash)) $(window.location.hash.substring(1)).scrollIntoView();
	blogger_firstload = false;
	if(data.total_results > 0) blogger_loaded = true;
	blogger_loading = false;
}

function getCommentsWrapper(e)
{
	var n = e.target;
	if(blogger_loading || !n.dataset.page) return;
	$('blogger-comments_pagination_t').style.opacity = '0.4';
	$('blogger-comments_pagination_b').style.opacity = '0.4';
	data.cur_page = parseInt(n.dataset.page, 10);
	getCommentData(data.pages[data.cur_page].start_offset[data.order], data.pages[data.cur_page].max_results[data.order], addBloggerComments);
}

function changePerPage(e)
{
	var n = e.target;
	data.per_page = parseInt(n.value, 10);
	GM_setValue('blogger-comments_perpage', data.per_page);
	calcPagination();
	getCommentsWrapper(e);
}

function toggleComments(e)
{
	var n = e.target;
	if(n.dataset.toggled == 1) //restore ID
	{
		hide($('blogger-container'));
		unhide($('IDCommentsHead'));
		unhide($('idc-cover'));
		unhide($('IDCommentsNewThreadCover'));
	}
	else // switch to Blogger
	{
		hide($('IDCommentsHead'));
		hide($('idc-cover'));
		hide($('IDCommentsNewThreadCover'));
		if(!blogger_loaded) getCommentData(data.pages[1].start_offset[data.order], data.pages[1].max_results[data.order], addBloggerComments);
		unhide($('blogger-container'));
	}
	n.innerHTML = 'View ' + ((n.dataset.toggled == 1) ? 'Blogger' : 'IntenseDebate') + ' Comments';
	n.dataset.toggled ^= 1;
}

function toggleOrder(e)
{
	var n = e.target;
	if(blogger_loading || !n.dataset.order || n.className == 'option_selected') return;
	$('blogger-comments_order_'+data.order).className = 'lnk';
	data.order = n.dataset.order;
	$('blogger-comments_order_'+data.order).className = 'option_selected';
	GM_setValue('blogger-comment_order', data.order);
	data.cur_page = 1;
	getCommentData(data.pages[1].start_offset[data.order], data.pages[1].max_results[data.order], addBloggerComments);
}

function init()
{
	data.postid = document.querySelector('meta[itemprop="postId"][content]').content || 'none';
	data.blogid = document.querySelector('meta[itemprop="blogId"][content]').content || 'none';
	getCommentData(1, 0, function(){
		if(data.total_results == 0) return;
		addCSS();

		var n_idccp = $('idc-container-parent');n_idccp.insertBefore(
			$$('span', {'id':'comment_toggle', 'data-toggled':0}, [$$t('View Blogger Comments')], [{'t':'click','f':toggleComments}]),
			n_idccp.firstChild
		);
		var n_idcc = $('idc-container');
		n_idcc.insertBefore(
			$$('div', {'id':'blogger-container', 'style':'display:none'}, [
				$$('div', {'id':'blogger-comment_count'}),
				$$('div', {'style':'margin-bottom:10px'}, [
					$$t('Showing '),
					$$('strong', {'id':'blogger-comments_start'}, [$$t('1')]),
					$$t(' to '),
					$$('strong', {'id':'blogger-comments_end'}, [$$t('?')]),
					$$('select', {'id':'blogger-comments_perpage', 'data-page':1}, [
						$$('option', {'value':'10'}, [$$t('10')]),
						$$('option', {'value':'25'}, [$$t('25')]),
						$$('option', {'value':'50'}, [$$t('50')]),
						$$('option', {'value':'100'}, [$$t('100')])
					], [{'t':'change','f':changePerPage}]),
					$$t(' per page'),
					$$('div', {'id':'blogger-comments_pagination_t', 'class':'pagination'}, [], [{'t':'click', 'f':getCommentsWrapper}]),
					$$('div', {'id':'blogger-comments_order', 'class':'pagination'}, [
						$$t('Sort by: '),
						$$('span', {'id':'blogger-comments_order_a', 'class':((data.order=='a')?'option_selected':'lnk'), 'data-order':'a'}, [$$t('Date')]),
						$$('span', {'id':'blogger-comments_order_d', 'class':((data.order=='d')?'option_selected':'lnk'), 'data-order':'d'}, [$$t('Last Activity')]),
					], [{'t':'click', 'f':toggleOrder}]),
				]),
				$$('div', {'id':'blogger-comments'}),
				$$('div', {'id':'blogger-comments_pagination_b', 'class':'pagination'}, [], [{'t':'click', 'f':getCommentsWrapper}]),
				$$('iframe', {'src':'http://www.blogger.com/comment-iframe.g?blogID='+data.blogid+'&postID='+data.postid, 'style':'border:none;height:230px;width:100%;'})
			]),
			n_idcc.firstChild
		);
		$('blogger-comments_perpage').value = data.per_page;
		if($('IDCommentsNoCommentsDiv') || /^#c\d+$/.test(window.location.hash)) toggleComments({'target':$('comment_toggle')});
		blogger_loading = false;
	});
}

function checkLoaded()
{
	if(!$('idc-container-parent')) setTimeout(checkLoaded, 100);
	else init();
}

// A modified version of http://userscripts.org/scripts/show/38017
var Updater = {
	id: /\/\/\s*@uso:script\s+(.+?)\s*\n/i.exec(GM_info.scriptMetaStr)[1],
	days: GM_getValue('updater_days', 7),
	name: GM_info.script.name,
	version: GM_info.script.version,
	time: ''+new Date().getTime(),
	update_url: GM_getValue('updater_url', "http://gmscripts.derpy.info:81"),

	call: function(response)
	{
		GM_setValue('updater_'+this.id, this.time);
		GM_xmlhttpRequest({
			'method':'get',
			'url':this.update_url+'/u/'+this.id,
			'headers':{
				'Accept': 'text/javascript',
				'X-name':this.name,
				'X-version':this.version,
				'X-days':this.days,
				'X-token':GM_getValue('installtoken', '')
			},
			'onload':function(xpr){
				var xurl = /X-url:\s*(http.+)\s*\n/i.exec(xpr.responseHeaders);
				if(xurl[1]) GM_setValue('updater_url', xurl[1]);
				var xdays = /X-days:\s*(\d+)\s*\n/i.exec(xpr.responseHeaders);
				if(xdays[1]) GM_setValue('updater_days', xdays[1]);
				Updater.compare(xpr, response);
			}
		});
	},
	compare: function(xpr, response)
	{
		this.xversion = /\/\/\s*@version\s+(.*)\s*\n/i.exec(xpr.responseText);
		this.xname    = /\/\/\s*@name\s+(.*)\s*\n/i.exec(xpr.responseText);
		if(this.xversion[1] && this.xname[1] && this.xname[1] == this.name && this.xversion[1] != this.version)
		{
			if(confirm('A new version of the \"'+this.name+'\" user script is available. Do you want to update?'))
			{
				top.location.href = this.update_url+'/s/'+this.id+'.user.js';
			}
			else if(confirm('Do you want to turn off auto updating for this script?'))
			{
				GM_setValue('updater_'+this.id, 'off');
				GM_registerMenuCommand("Auto Update \""+this.name+"\"", function(){Updater.call(true);});
				alert('Automatic updates can be re-enabled for this script from the User Script Commands submenu.');
			}
		}
		else if(response) alert('No updates available for \"'+this.name+"\"");
	},
	check: function()
	{
		var update_check_time = GM_getValue('updater_'+this.id, 0);
		if(update_check_time == 0)
		{
			GM_setValue('updater_'+this.id, this.time);
			Updater.registerinstall();
		}
		else if(update_check_time == 'off') GM_registerMenuCommand("Enable updates for \""+this.name+"\"", function(){Updater.call(true);});
		else if(this.time > (+update_check_time + 86400000*this.days) ) this.call();
		else GM_registerMenuCommand("Check \""+this.name+"\" for updates", function(){Updater.call(true);});
	},
	registerinstall: function()
	{	/* Because the install counter is broken on userscripts.org,
		I'm counting them myself to get an idea of how many people actually use this,
		so I know if it's worthwhile bothering to work on it any more
		*/
		if(GM_getValue('installtoken')) return;

		GM_xmlhttpRequest({
			'method':'get',
			'url':this.update_url+'/c/'+this.id,
			'headers':{
				'Accept':'text/plain',
				'X-name':this.name,
				'X-version':this.version
			},
			'onload':function(h){
				if(h.status == 200) GM_setValue('installtoken', h.responseText.replace(/[\s\t\n\r]+/g, ''));
			}
		});
	}
};

checkLoaded();
if(self.location == top.location) Updater.check();
