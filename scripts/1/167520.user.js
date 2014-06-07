// ==UserScript==
// @name        EQD Tag Block
// @description Equestria Daily Tag Block
// @version     1.5.0
// @namespace   http://userscripts.org/users/512780
// @include     http://www.equestriadaily.com/*
// @grant       GM_getValue
// @grant       GM_setValue
// @grant       GM_registerMenuCommand
// @grant       GM_xmlhttpRequest
// @uso:script  167520
// ==/UserScript==
function $(i,p){if(!p)p=document;return p.getElementById(i);}
function _$(i,p){if(!p)p=document;var n=p.getElementById(i);if(n){n.parentNode.removeChild(n);return true;}return false;}
function $t(t,p){if(!p)p=document;return p.getElementsByTagName(t);}
function $$(t,a,c,e){var n=document.createElement(t);if(a){for(var i in a){n.setAttribute(i,a[i]);}}if(c){for(var i=0;i<c.length;i++){n.appendChild(c[i]);}}if(e){for(var i=0;i<e.length;i++){$$e(n,e[i]['t'],e[i]['f'],e[i]['c']?true:false);}}return n;}
function $$t(t){return document.createTextNode(t);}
function $$f(){return document.createDocumentFragment();}
function $$e(n,t,f,c){return n.addEventListener(t,f,c?true:false);}
function getElPos(n){var p={x:0,y:0,w:n.offsetWidth,h:n.offsetHeight};do{p.x+=n.offsetLeft;p.y+=n.offsetTop;}while((n = n.offsetParent));return p;}
//function dumper(o,p){if(!p)p='';var r='',np=p+'	',b1='[',b2=']',t=Object.prototype.toString.call(o).toLowerCase().replace(/^\[object (.+)\]$/,"$1");if(t=='undefined'||t=='null')r+=t;else if(t=='boolean'||t=='number')r+=o;else if(t=='string')r+='"'+o+'"';else if(t=='text')r+=o+' "'+o.nodeValue+'"';else if(t=='function')r+=o;else if(t=='array'||t=='object'){if(t=='object'){b1='{',b2='}'}r+=b1+"\n";for(var a in o)r+=np+a+' : '+dumper(o[a],np)+"\n";r+=p+b2;}else r+=o;if(!p)r='var = '+r;return r;}

function addCSS()
{
	$t('head')[0].appendChild( $$('style', {'type':'text/css'}, [ $$t("\
		.tagx{\
			color: #FF0000;\
			cursor: pointer;\
			font-weight: bold;\
			margin-left: 5px;\
		}\
		.post-block{\
			background-color: #FFFFFF;\
			border: 1px solid #DDDDDD;\
			margin: 0 -20px 20px;\
			padding: 15px 20px;\
		}\
		.lnk{\
			color: #336699;\
			cursor: pointer;\
		}\
		.lnk:hover{\
			text-decoration: underline;\
		}\
		.bad-taglist .tagx:after{\
			color: #333333;\
			content: ', ';\
			font-weight: 400;\
		}\
		.bad-taglist .tagx:last-child:after{\
			content: '';\
		}\
		#bad-taglist-popup{\
			background-color: #99CCEE;\
			border: 1px solid #BBBBBB;\
			margin-top: 20px;\
			min-width: 150px;\
			position: absolute;\
			box-shadow: -3px 3px 5px 2px #AAAAAA;\
			border-radius: 3px;\
		}\
		#bad-taglist-popup h3{\
			font-size: 15px;\
			margin: 0;\
			overflow: auto;\
			padding: 3px;\
			text-align: center;\
		}\
		#bad-taglist-popup > div{\
			background-color: #FFFFFF;\
			margin: 10px;\
			padding: 5px;\
		}\
		#bad-taglist-popup .limit-h{\
			max-height: 300px;\
			overflow: auto;\
			padding-right: 20px;\
		}\
		#bad-taglist-popup table{\
			border-spacing: 0;\
			width: 100%;\
		}\
		#bad-taglist-popup td{\
			border-bottom: 1px solid #808080;\
			white-space: nowrap;\
		}\
		.closebut{\
			background-color: #aa0000;\
			border: 2px outset #ff0000;\
			border-radius: 5px;\
			color: #ff0000;\
			cursor: pointer;\
			float: right;\
			font-weight: 700;\
			line-height: 20px;\
			margin-left: 10px;\
			width: 20px;\
		}\
	") ] ) );
}

var bad_tags = {};
var posts = [];
var all_tags = [];
/*
posts = [
	<postnum> : {
		node : <post node>
		hidden : <true|false>
		tags : {<tag1> : <x node>, ...}
		bad_tags : {<tag1> : 1, ...}
		bad_tag_count : <n>
	},
	...
];
*/
function getBadTags()
{
	bad_tags = {};
	var tagstr = GM_getValue('badtags', '');
	if(tagstr != '')
	{
		var tags = tagstr.split('|');
		for(var i=tags.length; i--; )
		{
			bad_tags[ decodeURIComponent(tags[i]) ] = 1;
		}
	}
}
function saveBadTags()
{
	var tags = [];
	for(var tag in bad_tags)
	{
		if(bad_tags.hasOwnProperty(tag)) tags.push( encodeURIComponent(tag) );
	}
	GM_setValue('badtags', tags.join('|'));
}

function addTag(e)
{
	var n = e.target;
	var tag = n.dataset.tag;
	if(!confirm("Blacklist the '"+tag+"' tag?")) return;

	getBadTags();
	bad_tags[tag] = 1;
	saveBadTags();
	checkPosts('a', tag);
	n.style.display = 'none';

	var postnum = n.dataset.postnum;
	var n_tlt;if(n_tlt = $('tag-list-table'))
	{
		n_tlt.innerHTML = '';
		n_tlt.appendChild( getTagListHTML(postnum) );
	}
	if(postnum && !$('bad-taglist-popup'))
	{
		$('postnum-'+postnum).scrollIntoView()
	}
}
function removeTag(e)
{
	var n = e.target;
	var tag = n.dataset.tag;
	if(!confirm("Remove '"+tag+"' tag from the blacklist?")) return;

	getBadTags();
	delete(bad_tags[tag]);
	saveBadTags();
	//_$('bad-taglist-popup');
	checkPosts('r', tag);
	n.style.display = 'none';

	var postnum = n.dataset.postnum;
	var n_tlt;if(n_tlt = $('tag-list-table'))
	{
		n_tlt.innerHTML = '';
		n_tlt.appendChild( getTagListHTML(postnum) );
	}
	if(postnum && !$('bad-taglist-popup'))
	{
		$('postnum-'+postnum).scrollIntoView()
	}
}

function hidePost(postnum)
{
	var post = posts[postnum];
	var n_taglist = $$f();
	for(var tag in post.bad_tags)
	{
		n_taglist.appendChild( $$t(tag) );
		n_taglist.appendChild( $$('span', {'class':'tagx', 'title':'Remove tag \''+tag+'\' from blacklist', 'data-tag':tag, 'data-postnum':postnum}, [ $$t('X') ], [{'t':'click', 'f':removeTag}]) );
	}
	var n_tl = $('hidden-post-taglist-'+postnum);
	n_tl.innerHTML = '';
	n_tl.appendChild(n_taglist);
	post.node.style.display = 'none';
	$('hidden-post-bit-'+postnum).style.display = 'block';
	post.hidden = true;
}
function showPost(postnum)
{
	posts[postnum].node.style.display = 'block';
	$('hidden-post-bit-'+postnum).style.display = 'none';
	posts[postnum].hidden = false;
}

function checkPosts(action, tag)
{
	for(var i=posts.length; i--; )
	{
		var post = posts[i];
		if(post.tags[tag])
		{
			if(action == 'a' && !post.bad_tags[tag])
			{
				post.bad_tags[tag] = 1;
				++post.bad_tag_count;
				post.tags[tag].style.display = 'none';
				hidePost(i);
			}
			else if(action == 'r' && post.bad_tags[tag])
			{
				delete(post.bad_tags[tag]);
				--post.bad_tag_count;
				post.tags[tag].style.display = 'inline';
				if(post.bad_tag_count > 0) hidePost(i);
				else showPost(i);
			}
		}
	}
}

function getTagListHTML(postnum)
{
	var tags = [];for(var tag in bad_tags){if(bad_tags.hasOwnProperty(tag)) tags.push(tag);} tags.sort();
	var n = $$f();
	if(tags.length > 0)
	{
		for(var i=0,l=tags.length; i<l; i++)
		{
			var tag = tags[i]
			n.appendChild( $$('tr', {}, [
				$$('td', {}, [ $$t(tag) ]),
				$$('td', {}, [ $$('span', {'class':'tagx', 'title':'Remove tag \''+tag+'\' from blacklist', 'data-tag':tag, 'data-postnum':postnum}, [ $$t('X') ], [{'t':'click', 'f':function(e){removeTag(e);}}]) ])
			]) );
		}
	}
	else
	{
		n.appendChild( $$('tr', {}, [ $$('td', {'colspan':2}, [ $$t('The list is empty!') ]) ]) );
	}
	return n;
}

function showTagList(e)
{
	var postnum = e.target.dataset.postnum;
	_$('bad-taglist-popup');

	getBadTags();

	var l_pos = getElPos(e.target);
	$t('body')[0].appendChild(
		$$('div', {'id':'bad-taglist-popup', 'class':'main-outer', 'style':'top:'+l_pos.y+'px;left:'+l_pos.x+'px;'}, [
			$$('h3', {}, [
				$$t('Tag Blacklist'),
				$$('span', {'class':'closebut'}, [ $$t('X') ], [{'t':'click','f':function(){_$('bad-taglist-popup');}}])
			]),
			$$('div', {}, [ $$('table', {'id':'tag-list-table'}, [getTagListHTML(postnum)] ) ]),
			$$('div', {}, [
				$$('input', {'type':'text','placeholder':'Search for tags', 'data-postnum':postnum}, [], [{'t':'keyup', 'f':doSearch}]),
				$$('div', {'class':'limit-h'}, [
					$$('table', {'id':'tag-search-results'})
				])
			])
		])
	);
}

function doSearch(e)
{
	var n = e.target;
	var v = n.value.toLowerCase().replace(/(^\s+|\s+$)/g, '');
	if(!$('tag-list-script'))
	{
		$t('head')[0].appendChild( $$('script', {'type':'text/javascript','id':'tag-list-script','src':'http://www.equestriadaily.com/feeds/posts/summary?alt=json&max-results=0&callback=getAllTags'}) );
	}
	if(all_tags.length < 1 || v.length < 2) return;
	var n_tbl = $('tag-search-results');
	n_tbl.innerHTML = '';
	for(var i=all_tags.length; i--; )
	{
		var tag = all_tags[i];
		if(!bad_tags[tag] && tag.toLowerCase().indexOf(v) >= 0)
		{
			n_tbl.appendChild( $$('tr', {}, [
				$$('td', {}, [ $$t(tag) ]),
				$$('td', {}, [ $$('span', {'class':'tagx', 'title':'Hide posts tagged with \''+tag+'\'', 'data-tag':tag, 'data-postnum':n.dataset.postnum}, [ $$t('X') ], [{'t':'click', 'f':addTag}]) ])
			]) );
		}
	}
}

unsafeWindow.getAllTags = function(data)
{
	for(var i=data.feed.category.length; i--; )
	{
		all_tags.push(data.feed.category[i].term);
	}
	all_tags.sort(function(a,b){return a.toLowerCase() < b.toLowerCase();});
};

function processPage()
{
	var n_posts = document.querySelectorAll("div[class*='post-outer']");
	for(var i=n_posts.length; i--; )
	{
		var n_post = n_posts[i];
		var post = {'node':n_post, 'hidden':false, 'tags':{}, 'bad_tags':{}, 'bad_tag_count':0};

		var n_f = $$f();
		n_f.appendChild( $$('a', {'id':'postnum-'+i}) );
		n_f.appendChild( $$('div', {'class':'post-block', 'style':'display:none;', 'id':'hidden-post-bit-'+i}, [
			$$t('Post hidden for containing tag(s): '),
			$$('span', {'class':'bad-taglist', 'id':'hidden-post-taglist-'+i}),
			$$('a', {'href':'javascript:///', 'style':'display:block', 'data-postnum':i}, [ $$t('Show Post') ], [{'t':'click','f':function(e){showPost(e.target.dataset.postnum);}}])
		]) );
		n_post.parentNode.insertBefore(n_f, n_post);
	
		var n_labelcont = n_post.querySelector("span[class*='post-labels']");
		n_labelcont.replaceChild( $$('span', {'class':'lnk', 'data-postnum':i}, [ $$t(n_labelcont.firstChild.textContent) ], [{'t':'click','f':showTagList}]), n_labelcont.firstChild);
		
		var n_tags = n_labelcont.querySelectorAll("a[rel='tag']");
		for(var t=n_tags.length; t--; )
		{
			var tag = n_tags[t].textContent.replace(/(^\s+|\s$)/g, '');
			post.tags[tag] = $$('span', {'class':'tagx', 'title':'Hide posts tagged with \''+tag+'\'', 'data-tag':tag, 'data-postnum':i}, [ $$t('X') ], [{'t':'click', 'f':addTag}]);
			n_tags[t].parentNode.insertBefore(post.tags[tag] , n_tags[t].nextSibling);
			if(bad_tags[tag])
			{
				post.bad_tags[tag] = 1;
				++post.bad_tag_count;
				post.tags[tag].style.display = 'none';
			}
		}
		posts[i] = post;
		if(post.bad_tag_count > 0) hidePost(i);
	}
}

// A modified version of http://userscripts.org/scripts/show/38017
var Updater = {
	id: /\/\/\s*@uso:script\s+(\d+)\s*\n/i.exec(GM_info.scriptMetaStr)[1],
	days: 7,
	name: GM_info.script.name,
	version_string: GM_info.script.version,
	version: GM_info.script.version.replace(/\./g, ''),
	time: ''+new Date().getTime(),
	update_url:'http://gmscripts.dyndns.org:81',
	call: function(response)
	{
		GM_setValue('updatechecked_'+this.id, this.time);
		GM_xmlhttpRequest({
			'method':'get',
			'url':this.update_url+'/u/'+this.id,
			'headers':{
				'Accept': 'text/javascript',
				'X-name':this.name,
				'X-version':this.version_string,
				'X-days':this.days,
				'X-token':GM_getValue('installtoken', '')
			},
			'onload':function(xpr){Updater.compare(xpr, response);}
		});
	},
	compare: function(xpr, response)
	{
		this.xversion = /\/\/\s*@version\s+(.*)\s*\n/i.exec(xpr.responseText);
		this.xname    = /\/\/\s*@name\s+(.*)\s*\n/i.exec(xpr.responseText);
		if(this.xversion[1] && this.xname[1] && this.xname[1] == this.name)
		{
			this.xversion = this.xversion[1].replace(/\./g, '');
		}
		else return;
		if(+this.xversion > +this.version)
		{
			if(confirm('A new version of the '+this.name+' user script is available. Do you want to update?'))
			{
				top.location.href = this.update_url+'/s/'+this.id+'.user.js';
			}
			else if(confirm('Do you want to turn off auto updating for this script?'))
			{
				GM_setValue('updatechecked_'+this.id, 'off');
				GM_registerMenuCommand("Auto Update "+this.name, function(){Updater.call(true);});
				alert('Automatic updates can be re-enabled for this script from the User Script Commands submenu.');
			}
		}
		else if(response) alert('No updates available for '+this.name);
	},
	check: function()
	{
		var update_check_time = GM_getValue('updatechecked_'+this.id, 0);
		if(update_check_time == 0)
		{
			GM_setValue('updatechecked_'+this.id, this.time);
			Updater.registerinstall();
		}
		else if(update_check_time == 'off') GM_registerMenuCommand("Enable "+this.name+" updates", function(){Updater.call(true);});
		else if(this.time > (+update_check_time + 86400000*this.days) ) this.call();
		else GM_registerMenuCommand("Check "+this.name+" for updates", function(){Updater.call(true);});
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
				'X-version':this.version_string
			},
			'onload':function(h){
				if(h.status == 200) GM_setValue('installtoken', h.responseText.replace(/[\s\t\n\r]+/g, ''));
			}
		});
	}
};

(function(){
	addCSS();
	getBadTags();
	processPage();
	if(self.location == top.location) Updater.check();
})();
