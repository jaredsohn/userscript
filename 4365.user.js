// ==UserScript==
// @name          Flickr Virtual Sets
// @version       2.0
// @description	  Adding virtual sets to photo pages
// @namespace     http://webdev.yuan.cc/
// @include       http://flickr.com/*
// @include       http://www.flickr.com/*

// Author: .CK ( http://www.flickr.com/photos/ckyuan/ )
// Web site: http://webdev.yuan.cc/
//
// v1.0	06/27/06	initial release
// v1.1 06/30/06	Add "Your Favorites he/she owns" and "Your 
//			Favorited Photos"
// v1.2 07/01/06	Mortimer? (Pierre Andrews) contributes "User most 
//			interesting" and "Your most interesting"
// v1.3 07/01/06        Mortimer? (Pierre Andrews) contributes "Your photos
//                      in that pool" and "This user's photos in that pool"
// v2.0 07/12/06	Add virtual sets in "SET" page
//			allow users to add photos in virtual sets to a real set
//
// A Virtual Set is not a real photoset in Flickr. It's a set of photos
// sharing common properties or "things", say, your favorites, same tags,
// or same privacy settings. This script builds a navigating photostream
// box for each pre-defined virtual set. When you surfing photo pages,
// if a photo is in any of the virtual sets, the photostream box(es) will
// be opened automatically.
//
// In the "You" menu, this script will insert a link - "Your Virtual Sets"
// to let you choose which virtual sets you want to enable. The preference
// is stored in your Firefox. Now we have 6 pre-defined virtual sets:
//
// 1. Your Favorites - a collection of favorite photos
// 2. Recent Photos of Contacts - recent uploaded photos of your contacts,
//    one photo per user
// 3. Your Private Photos - all your private photos (not for friends and family)
// 4. Today Interesting - 500 interesting photos on uploaded day
// 5. Geotagged Photos - photos with "tag: geotagged" of the current user
// 6. Friends Only - photos only visible to friends of current user
// 7. Your Favorites owned by xxx - your favorites owned by current user 
// 8. Your Favorited Photos - your photos favorited by others
// 9. User Most Interesting - most interesting photos of current user
// 10. Your Most Interesting - most interesting photos of you
// 11. Your photos in that pool
// 12. This user's photos in that pool
//
// In the "Photo Sets" page, either yours or others, the virtual sets will be 
// inserted. Click any of the virtual sets, a floating div will pop up to show 
// the photo thumbs in that set. If it the virtual set belongs to you, you can 
// add them to a real set, either a new created one or an existing one.
// 
// ==/UserScript==

(function() {

var DEBUG = false;
if(DEBUG) GM_log('Starting GM Flickr Virtual Sets');

if(unsafeWindow) w = unsafeWindow;
else w = window;
var global_photos = w.global_photos;
var global_nsid = w.global_nsid;

function _gt(e) { return document.getElementsByTagName(e); }
function _gi(e) { return document.getElementById(e); }
function _ce(e) { return document.createElement(e); }
function _ct(e) { return document.createTextNode(e); }

var photo_id,ownersUrl,nsid,widget,posted,posted2;
var _fwd=false, _bwd=false;
var vsets = new Array();
var headers = { 'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey/Flickr Favorites Photostream', 'Accept': 'application/atom+xml,application/xml,text/xml' };
var context_loading = 'data:image/gif;base64,R0lGODlhSwBLAIAAAPPz8wAAACH5BAAAAAAALAAAAABLAEsAAAKDhI+py+0Po5y02ouz3rz7D4biSJbmiabqyrbuC8fyTNf2jef6zvf+DwwKh8Si8YhMUgIVJsB5g0qkOGhAerVeDc4swsvqchPi59iMLq/KWvbZjV6/52k6XM5tt+0H8P2nlrSlRFhoeIiYqLjI2Oj4CBkpOUlZaXmJmam5ydnp+QnaUQAAOw==';
// var context_loading = 'http://www.flickr.com/images/context_loading.gif';
w.showSet = new Array();
w.addtoSet = new Array();

var favorites = { 
    title: 'Your Favorites',
    slide: 'http://www.flickr.com/photos/' +global_nsid+ '/favorites/show/',
    browse: 'http://www.flickr.com/photos/' +global_nsid+ '/favorites/', 
    paged: true,
    api_paged: true,
    perpage: 36,
    params: {
        method: 'flickr.favorites.getList',
        page: 1,
        per_page: 500,
        user_id: global_nsid
    },
    cache: true
}

var contacts = {
    title: 'Recent Contacts Photos',
    slide: 'http://www.flickr.com/photos/friends/show/', 
    browse: 'http://www.flickr.com/photos/friends/',
    paged: true,
    api_paged: false,
    perpage: 24,
    params: {
        method: 'flickr.photos.getContactsPhotos',
        count: 500,
        single_photo: 1
    },
    cache: false
}

var d = _gt('div');
for(var i in d) if(d[i].className == 'Widget') widget = d[i];
if(widget) {
    posted = widget.getElementsByTagName('a')[1].href;
    alias = widget.getElementsByTagName('a')[2].firstChild.innerHTML;
    posted = posted.replace( /^.*date-posted\// , ''); 
    posted2 = posted;
    posted = posted.replace( /\//g , '-'); 
    posted = posted.replace( /-$/ , ''); 
    nsid = widget.getElementsByTagName('img')[0].src;
    nsid = nsid.replace( /^.*buddyicons\//, '');
    nsid = nsid.replace( /\.jpg.*$/, '');
}
var t = _gi('SubNav');
if(t) {
    nsid = t.getElementsByTagName('img')[0].src;
    nsid = nsid.replace( /^.*buddyicons\//, '');
    nsid = nsid.replace( /\.jpg.*$/, '');
    if( nsid == global_nsid ) isOwner = true;
    else isOwner = false;
}

var interestingness = { 
    title: 'Today Interesting',
    slide: 'http://www.flickr.com/explore/',
    browse: 'http://www.flickr.com/explore/interesting/'+ posted2,
    paged: true,
    api_paged: true,
    perpage: 10,
    params: {
        method: 'flickr.interestingness.getList',
	date: posted,
        page: 1,
        per_page: 500
    },
    cache: true
}

//var nsid = w.nextprev_currentContextID.replace(/stream/,'');
var geotagged = { 
    title: 'Geotagged Photos',
    slide: 'http://www.flickr.com/photos/' +nsid+ '/tags/geotagged/show/',
    browse: 'http://www.flickr.com/photos/' +nsid+ '/tags/geotagged/',
    paged: true,
    api_paged: true,
    perpage: 20,
    params: {
        method: 'flickr.photos.search',
	user_id: nsid,
	tags: 'geotagged',
        page: 1,
        per_page: 500
    },
    cache: true
}

var friends = { 
    title: 'Friends Only',
    slide: 'http://www.flickr.com/photos/' +nsid+ '/',
    browse: 'http://www.flickr.com/photos/' +nsid+ '/',
    paged: false,
    api_paged: true,
    perpage: 20,
    params: {
        method: 'flickr.photos.search',
	user_id: nsid,
	privacy_filter: 2,
        page: 1,
        per_page: 500
    },
    filters: {
	isfriend: '1'
    },
    cache: true
}

var private = { 
    title: 'Your Private Photos',
    slide: 'http://www.flickr.com/photos/' +global_nsid+'/',
    browse: 'http://www.flickr.com/photos/' +global_nsid+ '/',
    paged: false,
    api_paged: true,
    perpage: 20,
    params: {
        method: 'flickr.photos.search',
	user_id: global_nsid,
	privacy_filter: 5,
        page: 1,
        per_page: 500
    },
    cache: true
}

var favorites2 = { 
    title: 'Your Favs Owned by User',
    slide: 'http://www.flickr.com/photos/' +global_nsid+ '/favorites/show/',
    browse: 'http://www.flickr.com/photos/' +global_nsid+ '/favorites/', 
    paged: true,
    api_paged: true,
    perpage: 36,
    params: {
        method: 'flickr.favorites.getList',
        page: 1,
        per_page: 500,
        user_id: global_nsid
    },
    filters: {
	owner: nsid
    },
    cache: true
}

var favorited = { 
    title: 'Your Favorited Photos',
    slide: '',
    browse: 'http://www.flickr.com/photos/' +global_nsid+ '/popular-faves/', 
    paged: true,
    api_paged: true,
    perpage: 20,
    funct: searchFaved,
    params: { },
    filters: { },
    cache: false
}

var userinteresting = {
   title: 'This User Most Interesting',
   slide: '',
   browse: 'http://interestingby.isaias.com.mx/pm.php?id='+nsid+'&theme=white',
   paged: false,
   api_paged: false,
   perpage: 100,
   params: {
       method: 'flickr.photos.search',
       page: 1,
       per_page: 100,
       user_id: nsid,
       sort: 'interestingness-desc'
   },
   filters: {},
   cache: true
}

var yourinteresting = {
   title: 'Your Most Interesting',
   slide: '',
   browse: 'http://www.flickr.com/photos/'+global_nsid+'/popular-interesting/',
   paged: true,
   api_paged: false,
   perpage: 20,
   params: {
       method: 'flickr.photos.search',
       page: 1,
       per_page: 200,
       user_id: global_nsid,
       sort: 'interestingness-desc'
   },
   filters: {},
   cache: true
}

var group_name = /\/in\/pool-([^\/]+)/.exec(document.location.pathname);
if(group_name) {
    group_name = group_name[1]; 
    group_id = w.nextprev_currentContextID.replace(/pool/,'');
} else {
    group_name ='';
    group_id = '';
}
var yourphotoinpool = {
   title: 'Your Photos in that pool',
   slide: '',
   browse: 'http://www.flickr.com/groups/'+group_name+'/pool/'+global_nsid+'/',
   group_name: group_name,
   paged: true,
   api_paged: true,
   perpage: 30,
   params: {
	method: 'flickr.groups.pools.getPhotos',
	page: 1,
	per_page: 200,
	group_id: group_id,
	user_id: global_nsid
   },
   filters: {},
   cache: true
}

var photoinpool = {
   title: 'This user\'s photos in that pool',
   slide: '',
   browse: 'http://www.flickr.com/groups/'+group_name+'/pool/'+nsid+'/',
   group_name: group_name,
   paged: true,
   api_paged: true,
   perpage: 30,
   params: {
	method: 'flickr.groups.pools.getPhotos',
	page: 1,
	per_page: 200,
	group_id: group_id,
	user_id: nsid
   },
   filters: {},
   cache: true
}


vsets['vset1'] = { enabled: function() { return GM_getValue('vset1',false); }, config: favorites };
vsets['vset2'] = { enabled: function() { return GM_getValue('vset2',false); }, config: contacts };
vsets['vset3'] = { enabled: function() { return GM_getValue('vset3',false); }, config: private };
vsets['vset4'] = { enabled: function() { return GM_getValue('vset4',false); }, config: interestingness };
vsets['vset5'] = { enabled: function() { return GM_getValue('vset5',false); }, config: geotagged };
vsets['vset6'] = { enabled: function() { return GM_getValue('vset6',false); }, config: friends };
vsets['vset7'] = { enabled: function() { return GM_getValue('vset7',false); }, config: favorites2 };
vsets['vset8'] = { enabled: function() { return GM_getValue('vset8',false); }, config: favorited };
vsets['vset9'] = { enabled: function() { return GM_getValue('vset9',false); }, config: userinteresting };
vsets['vset10'] = { enabled: function() { return GM_getValue('vset10',false); }, config: yourinteresting };
vsets['vset11'] = { enabled: function() { return GM_getValue('vset11',false); }, config: yourphotoinpool };
vsets['vset12'] = { enabled: function() { return GM_getValue('vset12',false); }, config: photoinpool };


function addCandyMenu() {

    if(DEBUG) GM_log('Call addCandyMenu()');

    var your_sets;
    var links = _gi('candy_nav_menu_you').getElementsByTagName('a');
    for(var i=0;i<links.length;i++) 
	if(links[i].innerHTML=='Your Sets') your_sets = links[i];

    if(DEBUG && your_sets) GM_log(your_sets.innerHTML);

    var your_virtualsets = _ce('a');
    your_virtualsets.title = 'Your virtual sets';
    your_virtualsets.innerHTML = 'Your Virtual Sets';
    your_virtualsets.href = 'javascript:;';
    your_virtualsets.addEventListener('click', function() {
	if( ! _gi('vset_menu') ) {
	    var vset_menu = _ce('div');
	    vset_menu.id = 'vset_menu';
	    vset_menu.style.position = 'absolute';
	    vset_menu.style.textAlign = 'left';
	    vset_menu.style.zIndex = 6000;
	    vset_menu.style.padding = '0px 10px 10px 10px';
	    vset_menu.style.margin = '60px 0px 0px 120px';
	    vset_menu.style.border = '1px solid #000';
	    vset_menu.style.color = '#4358c6';
	    vset_menu.style.font = '11px tahoma';
	    vset_menu.style.background = '#dfefff';

	    vset_menu.innerHTML = '<h4>Virtual Sets Settings</h4>';
	    for(var v in vsets) 
		vset_menu.innerHTML += '<input id="' +v+ '" type="checkbox"> ' +vsets[v].config.title+ '<br />';
	    vset_menu.innerHTML += '<input id="vset_save" type="button" class="Butt" value="Save"> ';
	    vset_menu.innerHTML += '<input id="vset_cancel" type="button" class="Butt" value="Cancel">';

	    _gi('Main').insertBefore(vset_menu, _gi('Main').firstChild);
	    _gi('vset_save').addEventListener('click', function() {
		_gi('vset_menu').style.display = 'none';
		for(var v in vsets) GM_setValue(v, _gi(v).checked);
		newPStreams();
	    }, true);
	    _gi('vset_cancel').addEventListener('click', function() {
		_gi('vset_menu').style.display = 'none';
	    }, true);
	} else vset_menu = _gi('vset_menu');
	_gi('vset_menu').style.display = 'block';
	for(var v in vsets) _gi(v).checked = (GM_getValue(v,false)=='1') ? true : false;
    }, true );
    your_sets.parentNode.insertBefore(your_virtualsets, your_sets.nextSibling);

    var your_popular = _ce('a');
    your_popular.title = 'Your popular photos';
    your_popular.innerHTML = 'Your Popular';
    your_popular.href = your_sets.href.replace( /\/sets\//, '/popular-interesting/');
    your_sets.parentNode.insertBefore(your_popular, your_virtualsets.nextSibling);
}

addCandyMenu();

var re = /http:\/\/(www\.)?flickr\.com\/photos\/[^\/]+\/\d+/;
var re2 = /http:\/\/(www\.)?flickr\.com\/photos\/[^\/]+\/sets\/$/;
var re3 = /http:\/\/(www\.)?flickr\.com\/photos\/[^\/]+\/sets\/\d+\//;
if( ! re.test(document.location) && ! (re2.test(document.location) || !re3.test(document.location))) return;

for(var i in global_photos) photo_id = global_photos[i].id;
if( photo_id ) {
    var ownersUrl = global_photos[photo_id].ownersUrl;
    var isPublic = global_photos[photo_id].isPublic;
    var isOwner = global_photos[photo_id].isOwner;
}

function sign(params) {

    params.api_key = w.global_magisterLudi;
    params.auth_hash = w.global_auth_hash;
    params.auth_token = w.global_auth_token;

    var _11=[], _12='';
    for(var p in params) {
	params[p]=params[p];
	_11.push(p);
	_12+="&"+p+"="+w.escape_utf8(params[p]);
    }
    _11.sort();
    var cal=w.global_flickr_secret;
    if(cal!="") {
	for(var i=0;i<_11.length;i++) cal+=_11[i]+params[_11[i]];
	cal=w.md5_calcMD5(cal);
	_12="api_sig="+cal+_12;
    }
    return _12;
}

function searchPhoto(params,callback,list,paged,filters) {

    if(DEBUG) GM_log('Call searchPhoto()');
    var _index = -1;

    this.list = list;

    var callAPI = function(url) {

	GM_xmlhttpRequest({
	    method: 'GET', url: url, headers: headers,
	    onload: function(responseDetails) {
		var parser = new w.DOMParser();
		var dom = parser.parseFromString(responseDetails.responseText, "application/xml");
		var stat = dom.getElementsByTagName('rsp')[0].getAttribute('stat');
		if( stat == 'ok' ) {
		    var pages = dom.getElementsByTagName('photos')[0].getAttribute('pages');
		    var page = dom.getElementsByTagName('photos')[0].getAttribute('page');
		    var total = dom.getElementsByTagName('photos')[0].getAttribute('total');
		    var photos = dom.getElementsByTagName('photo');
		    for(var i=0;i<photos.length;i++) {
			skip = false;
			for(var j in filters) if( photos[i].getAttribute(j) != filters[j] ) skip = true;
			if( skip ) continue;
			var index = list.length;
			list[index] = new Object();
			list[index].id = photos[i].getAttribute('id');
			list[index].owner = photos[i].getAttribute('owner');
			list[index].secret = photos[i].getAttribute('secret');
			list[index].server = photos[i].getAttribute('server');
			list[index].img_s = 'http://static.flickr.com/'+list[index].server+'/'+list[index].id+'_'+list[index].secret+'_s.jpg';
			list[index].img_m = 'http://static.flickr.com/'+list[index].server+'/'+list[index].id+'_'+list[index].secret+'_m.jpg';
			list[index].url = 'http://www.flickr.com/photos/' + list[index].owner + '/'+ list[index].id +'/';
			if( photo_id == list[index].id ) _index = index+1;
		    }
		    if( paged && pages>page ) {
			params.page++;
			url = 'http://www.flickr.com/services/rest/?' + sign(params);
			callAPI(url);
		    } else callback(_index,list,total);
		} else callback(-1, new Array(),0);
	    }
	});
    }
    var url = 'http://www.flickr.com/services/rest/?' + sign(params);
    callAPI(url);
}

function searchFaved(params,callback,favs,paged,filters) {

    var url = 'http://www.flickr.com/photos/' +global_nsid+ '/popular-faves/';
    var _index=-1, total=0;

    function callHTML(url,page) {
	url1 = url + 'page' + page +'/';
	if(DEBUG) GM_log(url1);
	GM_xmlhttpRequest({
	    method: 'GET', 
	    url: url1,
	    headers: headers,
	    onload: function(responseDetails) {
		if(DEBUG) GM_log('Faved page' +page+ ' loaded');
		var i=(page-1)*20;
		var html = ''+responseDetails.responseText;
		var rExp = /[\r\t\n\f]/g;
		html = html.replace(rExp, '');

		if(page==1) {
		    rExp = /<div class="Results">\((\d+) photos\)<\/div>/;
		    var r = rExp.exec(html);
		    total = 1*r[1];
		    favs[total-1] = new Object();
		}
		rExp = /(http:\/\/static.flickr.com\/\d+\/\d+_\w+_s\.jpg)/;
		var imgExp = /http:\/\/static.flickr.com\/(\d+)\/(\d+)_(\w+)_s\.jpg/;
		while( rExp.test(html) ) {
		    var m = rExp.exec(html);
		    var n = imgExp.exec(m[1]);
		    html = html.replace(rExp,'');

		    favs[i] = new Object();
		    favs[i].id = n[2];
		    favs[i].owner = global_nsid;
		    favs[i].secret = n[3];
		    favs[i].server = n[1];
		    favs[i].img_s = m[1];
		    favs[i].img_m = 'http://static.flickr.com/'+favs[i].server+'/'+favs[i].id+'_'+favs[i].secret+'_m.jpg';
		    favs[i].url = 'http://www.flickr.com/photos/' + favs[i].owner + '/'+ favs[i].id +'/';
		    if( photo_id == favs[i].id ) _index = i+1;
		    i++;
		}
//		if( page < (total-total%20)/20+1 ) callHTML(url,page+1);
//		else callback(_index,favs);
		if( paged && page==1 ) {
		    for(var j=2; j<= (total-total%20)/20+1; j++) callHTML(url,j);
		}
		if( _index>-1 ) {
		    var _i = _index;
		    _index = -1;
		    callback(_i,favs,total,false);
		} else callback(-1,favs,total,true);
	    }
	});
    }
    callHTML(url,1);
}

function checkCache(id,key) {

    var timestamp = 1*GM_getValue(id + '_time', '0');
    var now = new Date();
    if(DEBUG) GM_log(now.getTime() + ', ' + timestamp);
    if( now.getTime() - timestamp > 2*60*60*1000 ) {
	if(DEBUG) GM_log('Cache expired');
	return true;
    } else {
	if(DEBUG) GM_log('Cache valid');
	var str = GM_getValue(id, '');
	var pairs = str.split(':');
	if( pairs[0]!=key ) return true;

	var items = pairs[1].split(',');
	for(var i=0; i<items.length; i++) 
	    if( items[i] == photo_id ) return true;
	return false;
    }
}

function Photostream(config) {

    if(DEBUG) GM_log('Load ' + config.title );

    var index, box,  _fwd, _bwd;
    var arrow_next, arrow_prev, div, box, browse_link, thumb_prev, thumb_next;

    this.div = div;
    this.photos = new Array();
    this.config = config;

    var key='';
    var id = config.title.replace(/ /g, '_');

    for(var i in config) {
	if( typeof(config[i]) == 'object' ) for(var j in config[i]) key += j+config[i][j];
	else key += i+config[i];
    }
    key = w.md5_calcMD5(key);
    if( config.cache && !checkCache(id, key) ) return;
    if(DEBUG) GM_log('Cache miss');

    var insertPoint = _gi('other_contexts_p');
    var load_vset = _ce('div');
    load_vset.style.border = '1px solid #e3e3e3';
    load_vset.style.background = '#f3f3f3';
    load_vset.style.padding = '4px';
    load_vset.innerHTML = '<img src="http://www.flickr.com/images/pulser2.gif" /> Loading ' + config.title;
    if( insertPoint.nextSibling )
	insertPoint.parentNode.insertBefore(load_vset,insertPoint.nextSibling);
    else insertPoint.parentNode.appendChild(load_vset);

    var move = function(photos,index) {
	if( _fwd || _bwd ) { p = index-1; q = index; }
	else { p = index-2; q = index; }
	_fwd = false; _bwd = false;

	if(p>=0) {
	    thumb_prev.src = context_loading;
	    thumb_prev.src = photos[p].img_s;
	    thumb_prev.parentNode.href = photos[p].url + ( (config.group_name) ? 'in/pool-'+config.group_name: '') +'/';
	} else {
	    thumb_prev.src = 'http://www.flickr.com/images/placeholder_first_photo.gif';
	    thumb_prev.parentNode.href = '#';
	}
	if(q<=photos.length-1) {
	    thumb_next.src = context_loading;
	    thumb_next.src = photos[q].img_s;
	    thumb_next.parentNode.href = photos[q].url + ( (config.group_name) ? 'in/pool-'+config.group_name: '') +'/';
	} else {
	    thumb_next.src = 'http://www.flickr.com/images/placeholder_last_photo.gif';
	    thumb_next.parentNode.href = '#';
	}
	page = (index-index%config.perpage)/config.perpage + 1;
	browse_link.href = config.browse + ((config.paged) ? ('page'+page+'/') : '');
    }

    var callback = function(index,photos,total,wait) {
	var str = key +':';
	for(var i=0;i<photos.length;i++) {
	    if(photos[i]) str += photos[i].id +',';
	}
	var now = new Date();
	GM_setValue(id,str);
	GM_setValue(id+'_time', '' + now.getTime());

	if( index<0 ) {
	    if( !wait ) insertPoint.parentNode.removeChild(load_vset);
	    return;
	}

	var page = (index-index%config.perpage)/config.perpage + 1;
	var divs = _gt('div');
	for(var i=0;i<divs.length; i++) {
	    if( divs[i].className == 'ContextTop' ) {
		ps = divs[i];
		break;
	    }
	}
//	var _bb = w.document.getElementById('nextprev_button_'+w.nextprev_currentContextID);
	if( ! w.nextprev_currentContextID.match(/stream.*/) ) ps = _gi('contextDiv_'+w.nextprev_currentContextID);

	div = ps.cloneNode(true);
	div.id = 'fav_stream';
	insertPoint.style.display = 'block';

	var trs = div.getElementsByTagName('tr');
	for(var i=0;i<trs.length;i++) trs[i].id = '';
	trs[1].style.display = 'table-row';
	trs[1].id = 'favorites';
	box = trs[1];

	var imgs = div.getElementsByTagName('img');
	for(var i=0;i<imgs.length;i++) {
	    if( imgs[i].className == 'nextprev_button' ) var t_np = imgs[i];
	    if( imgs[i].className == 'nextprev_arrows_img_next' ) {
		arrow_next = imgs[i];
		arrow_next.style.visibility = 'visible';
		arrow_next.addEventListener('click', function() {
		    index++;
		    if( index > photos.length ) index = photos.length;
		    _fwd = true;
		    move(photos,index);
		}, true);
	    }
	    if( imgs[i].className == 'nextprev_arrows_img_prev' ) {
		arrow_prev = imgs[i];
		arrow_prev.style.visibility = 'visible';
		arrow_prev.addEventListener('click', function() {
		    index--;
		    if( index < 0 ) index = 0;
		    _bwd = true;
		    move(photos,index);
		}, true);
	    }
	}

	var tbox_open = true;
	t_np.src = 'http://www.flickr.com/images/context_open.gif';
	t_np.onclickHandler = function() {
	    if( tbox_open ) {
		box.style.display = 'none';
		this.src = 'http://www.flickr.com/images/context_closed.gif';
	    } else {
		box.style.display = 'table-row';
		this.src = 'http://www.flickr.com/images/context_open.gif';
	    }
	    tbox_open = !tbox_open;
	}
	t_np.addEventListener('click', t_np.onclickHandler, true);

	load_vset.parentNode.replaceChild(div, load_vset);

	var elms = div.getElementsByTagName('a');
	for(var i=0; i<elms.length; i++) {
//	    if( elms[i].className == 'currentContextLink' || elms[i].className == 'Grey' ) {
	    if( elms[i].className == 'currentContextLink' ) {
		elms[i].href = config.browse;
		elms[i].innerHTML = config.title + ' <br />(Virtual Set)';
	    }
	    if( elms[i].className == 'contextThumbLink' ) {
		browse_link = elms[i];
		browse_link.href = config.browse + ((config.paged) ? ('page'+page+'/') : '');
	    }
	}

	var divs = div.getElementsByTagName('div');
	for(var i=0; i<divs.length; i++) {
	    if(divs[i].className == 'nextprev_contextThumbsDiv') var target = divs[i];
	    if(divs[i].className == 'photosNum') divs[i].innerHTML = photos.length;
	    if(divs[i].className == 'showLink') {
		if( config.slide=='' ) divs[i].style.display = 'none';
		else divs[i].getElementsByTagName('a')[0].href = config.slide;
	    }
	}
	var imgs = target.getElementsByTagName('img');
	thumb_prev = imgs[0];
	thumb_next = imgs[1];
	thumb_prev.src = context_loading;
	thumb_next.src = context_loading;

	move(photos,index);
    }
    if(!config.funct) var stream = new searchPhoto(config.params,callback, this.photos, config.api_paged, config.filters);
    else var stream = new config.funct(config.params,callback, this.photos, config.api_paged, config.filters);
}

function VirtualSet(config) {

    if(DEBUG) GM_log('Load ' + config.title );

    var index, box,  _fwd, _bwd;
    var arrow_next, arrow_prev, div, box, browse_link, thumb_prev, thumb_next;

    this.div = div;
    this.config = config;
    this.photos = new Array();

    var key='';
    var id = config.title.replace(/ /g, '_');

    for(var i in config) {
	if( typeof(config[i]) == 'object' ) for(var j in config[i]) key += j+config[i][j];
	else key += i+config[i];
    }
    key = w.md5_calcMD5(key);
//    if( config.cache && !checkCache(id, key) ) return;
    if(DEBUG) GM_log('Cache miss');

    var insertPoint = _gi('SubNav');
    var load_vset = _ce('div');
    load_vset.className = 'Sets';
    load_vset.innerHTML = '<div class="SetCase"><div class="setLinkDiv"><a id="vsetlink_' +id+ '" href="#" class="setLink"><img id="vsethumb_' +id+ '" src="'+context_loading+'" class="setThumb"></a></div></div>';
    load_vset.innerHTML += '<h4><a id="vsetlink2_' +id+ '" href="#" class="Seta">' +config.title+ '</a></h4>';
    load_vset.innerHTML += '<p style="color:#ff0084"><b id="vsetnum_'+id+'"></b> photos<br /><i>in this Virtual Set</i></p>';
    if( insertPoint.nextSibling )
        insertPoint.parentNode.insertBefore(load_vset,insertPoint.nextSibling);
    else insertPoint.parentNode.appendChild(load_vset);

    var callback = function(index,photos,total,wait) {
	var setDiv;
	var max = photos.length;
	config.photos = photos;
	if( photos.length<=0 ) {
	    insertPoint.parentNode.removeChild(load_vset);
	    return;
	}
	for(var i=0;i<photos.length;i++) if(!photos[i]) {
	    if(DEBUG) GM_log(config.title + ' not loaded yet ' + i +','+total);
	    return;
	}

	function showSet(page) {
	    var perpage = 24;
	    var total = photos.length;
	    if(page==undefined) page=1;
	    pages = (total-total%perpage)/perpage+1;
	    var str = '<table cellspacing="30">';
	    str += '<tr>';
	    str += '<td><h2>'+config.title+'</h2></td>';
	    str += '<td align="right"><a href="javascript:;" onclick="this.parentNode.parentNode.parentNode.parentNode.parentNode.style.display=\'none\';">Close</a></td>';
	    str += '</td></tr>';
	    str += '<tr><td width="240" valign="top">';
	    str += '<p><img src="' +photos[0].img_m+ '"></p>';
	    str += '<p><small>There are ' + total + ' photos in this virtual set.</small></p>';
	    if(isOwner) {
		str += '<p><b>Add to a real set?</b><br /><a href="javascript:;" onclick="addtoSet[\''+id+'\'](false)">Add to an existing set</a> | <a href="javascript:;" onclick="addtoSet[\''+id+'\'](true)">Add to a new set</a></p>';
		str += '<div id="photoset_list"></div>';
		str += '<p><span id="vset_log"></span></p>';
	    }
	    str += '</td>';
	    str += '<td width="320" valign="top"><div style="width:320px">';
	    var num = ((total/perpage)>page)? page*perpage: total;
	    if(DEBUG) GM_log('Page=' + page +' total='+total+' num='+num);
	    for(var i=(page-1)*perpage;i<num;i++) 
		str += '<a href="' +photos[i].url+ '" class="thumb_link"><img src="' +photos[i].img_s+ '" width=75 height=75 style="margin:0px 3px 3px 0px;" /></a>';
	    str += '</div></td></tr>';
	    str += '<tr><td colspan="2" align="center"><div class="Paginator">';
	    for(i=1;i<=pages;i++) {
		if(i==page) str += '<span class="this-page">'+i+'</span>';
		else str += '<a title="'+id+'" href="#vset" onclick="showSet[\''+id+'\']('+i+')">'+i+'</a> ';
	    }
	    str += '</div></td></tr></table>';
	    if( !_gi('setdiv_'+config.title) ) {
	        setDiv = _ce('div');
	        setDiv.id = 'setdiv_'+config.title;
	        setDiv.style.position = 'absolute';
	        setDiv.style.overflow = 'visible';
	        setDiv.style.width = '650px';
	        setDiv.style.padding = '0px 25px 0px 25px';
	        setDiv.style.margin = '4px';
	        setDiv.style.zIndex = 1000;
	        setDiv.style.display = 'none';
	        setDiv.style.border = '15px solid #eaeaea';
	        setDiv.style.background = '#ffffff';
		if( insertPoint.nextSibling ) insertPoint.parentNode.insertBefore(setDiv,insertPoint.nextSibling);
		else insertPoint.parentNode.appendChild(setDiv);
		ntag = _ce('a');
		ntag.name="vset";
		setDiv.parentNode.insertBefore(ntag,setDiv);
	    } else setDiv = _gi('setdiv_'+config.title);
	    setDiv.innerHTML = str;
	}
	w.showSet[id] = showSet;

	function addtoSet(newset,setid,setitle) {

	    var photosetid,photoseturl,ok=1,fail=0;

	    function addPhoto(id) {
		if(DEBUG) GM_log('add photo #' + id);
		if(id>=max) {
		    if(setitle!=undefined) title = setitle;
		    _gi('vset_log').innerHTML += '<p>Adding Completed.<br />Goto the set "<a href="'+photoseturl+'">'+title+'</a>".</p>';
		    return;
		}
		var url = 'http://www.flickr.com/services/rest/?' + sign({
		    method:'flickr.photosets.addPhoto',
		    photoset_id: photosetid,
		    photo_id: photos[id].id
		});
		GM_xmlhttpRequest({
		    method: 'GET', url: url, headers: headers,
		    onload: function(responseDetails) {
			var parser = new w.DOMParser();
			var dom = parser.parseFromString(responseDetails.responseText, "application/xml");
			var stat = dom.getElementsByTagName('rsp')[0].getAttribute('stat');
			if( stat == 'ok' ) ok++; 
			else {
			    fail++;
			    if(DEBUG) GM_log(responseDetails.responseText);
			}
			_gi('vset_log').innerHTML = ok + ' photos added ';
			_gi('vset_log').innerHTML += (fail) ? (', ' + fail +' photos fail.') : '';
			id++;
			addPhoto(id);
		    }
		});
	    }

	    if(newset) {
		var title = prompt('New set title?');
		if(title==null) return;
		max = prompt('How many photos to add?\n (can use to add your top N photos or the first N photos in virtual set)',max);
		max = 1*max;
		if( max<=0 || max>photos.length) return;
		var url = 'http://www.flickr.com/services/rest/?' + sign({
		    method:'flickr.photosets.create',
		    title: title,
		    primary_photo_id: photos[0].id
		});
		if(DEBUG) GM_log(url);
		GM_xmlhttpRequest({
		    method: 'GET', url: url, headers: headers,
		    onload: function(responseDetails) {
			var parser = new w.DOMParser();
			var dom = parser.parseFromString(responseDetails.responseText, "application/xml");
			var stat = dom.getElementsByTagName('rsp')[0].getAttribute('stat');
			if( stat == 'ok' ) {
			    _gi('vset_log').innerHTML = 'Creating set....';
			    photosetid = dom.getElementsByTagName('photoset')[0].getAttribute('id');
			    photoseturl = dom.getElementsByTagName('photoset')[0].getAttribute('url');
			    addPhoto(1);
			} else {
			    var err = dom.getElementsByTagName('err')[0].getAttribute('msg');
			    _gi('vset_log').innerHTML = 'Photoset created fail: ' + err;
			}
		    }
		});
	    } else {
		if(setid==-1) return;
		if(setid==undefined) {
		    max = prompt('How many photos to add?\n (can use to add your top N photos or the first N photos in virtual set)',max);
		    max = 1*max;
		    if( max<=0 || max>photos.length) return;
		    _gi('vset_log').innerHTML = 'Loading your photosets....';
		    var url = 'http://www.flickr.com/services/rest/?' + sign({
			method:'flickr.photosets.getList'
		    });
		    GM_xmlhttpRequest({
			method: 'GET', url: url, headers: headers,
			onload: function(responseDetails) {
			    _gi('vset_log').innerHTML = '';
			    var parser = new w.DOMParser();
			    var dom = parser.parseFromString(responseDetails.responseText, "application/xml");
			    var stat = dom.getElementsByTagName('rsp')[0].getAttribute('stat');
			    if( stat == 'ok' ) {
				var photosets = dom.getElementsByTagName('photoset');
				var str = '<select onchange="addtoSet[\''+id+'\'](false,this.value,this.options[this.selectedIndex].text)"><option value="-1">Select Photoset....</optiom>';
				for(var i=0;i<photosets.length;i++) {
				    photosetid = photosets[i].getAttribute('id');
				    primary = photosets[i].getAttribute('primary');
				    secret = photosets[i].getAttribute('secret');
				    server = photosets[i].getAttribute('server');
				    photoseturl = 'http://www.flickr.com/photos/'+global_nsid+'/sets/'+photosetid+'/';
				    text = new String(photosets[i].getElementsByTagName('title').item(0).firstChild.data);
				    title = text.substr(0,25) + ((text.length>25)?'...':'');
				    str += '<option value="'+photosetid+'">'+title+'</option>';
				}
				str += '</select>';
				_gi('photoset_list').innerHTML = str;
			    } else {
				var err = dom.getElementsByTagName('err')[0].getAttribute('msg');
				_gi('vset_log').innerHTML = 'Photoset created fail: ' + err;
			    }
			}
		    });
		    return;
		}
		photosetid = setid;
		photoseturl = 'http://www.flickr.com/photos/'+global_nsid+'/sets/'+photosetid+'/';
		ok=0;
		addPhoto(0);
	    }
	}
	w.addtoSet[id] = addtoSet;

	_gi('vsethumb_' +id).src = photos[0].img_s;
//	_gi('vsetlink_' +id).href = photos[0].url;
	_gi('vsetlink_' +id).href = 'javascript:;';
	_gi('vsetlink_' +id).addEventListener('click', function() {
	    if( !_gi('setdiv_'+config.title) ) {
		showSet();
	    }
	    if( setDiv.style.display == 'none' ) setDiv.style.display = 'block';
	    else setDiv.style.display = 'none';
	}, true);
	_gi('vsetlink2_' +id).href = 'javascript:;';
	_gi('vsetlink2_' +id).addEventListener('click', function() {
	    if( !_gi('setdiv_'+config.title) ) {
		showSet();
	    }
	    if( setDiv.style.display == 'none' ) setDiv.style.display = 'block';
	    else setDiv.style.display = 'none';
	}, true);
	_gi('vsetnum_' +id).innerHTML = photos.length;
    }
//    config.api_paged = false;
//    config.params.per_page=1;
    if(!config.funct) var stream = new searchPhoto(config.params,callback, this.photos, config.api_paged, config.filters);
    else var stream = new config.funct(config.params,callback, this.photos, config.api_paged, config.filters);
}

function showVirtualSet() {
}

function getGroupId(vset) {
    var group_name = /\/in\/pool-([^\/]+)/.exec(document.location.pathname);
    if(group_name) {
	group_name = group_name[1];
	vsets[vset].config.browse = 'http://www.flickr.com/groups/'+group_name+'/pool/'+vsets[vset].config.params.user_id+'/';
	vsets[vset].config.params.group_id = w.nextprev_currentContextID.replace(/pool/,'');
	vsets[vset].config.group_name = group_name;
	
	var url = 'http://www.flickr.com/services/rest/?' + sign({
	    method:"flickr.urls.lookupGroup",
	    url: "http://www.flickr.com/groups/"+group_name
	});
	GM_xmlhttpRequest({
	    method: 'GET', url: url, headers: headers,
	    onload: function(responseDetails) {
		var params = vsets[vset].config;
		params.browse = 'http://www.flickr.com/groups/'+group_name+'/pool/'+params.params.user_id+'/';
		var matches = /id="(.+?)"/.exec(responseDetails.responseText);
		if(matches) params.params.group_id = matches[1];
		vsets[vset].config.group_name = group_name;
		vsets[vset].stream = new Photostream(vsets[vset].config);
	    }
	});
    }
}

function newPStreams() {
    var re = /http:\/\/(www\.)?flickr\.com\/photos\/[^\/]+\/\d+/;
    if( ! re.test(document.location) ) return;

    if( isOwner ) {
	if(vsets['vset3'].enabled() && !vsets['vset3'].stream && isPublic == 0 ) vsets['vset3'].stream = new Photostream(private);
	if(vsets['vset8'].enabled() && !vsets['vset8'].stream && _gi('fave_countSpan').innerHTML != '0 people' ) vsets['vset8'].stream = new Photostream(favorited);
	if(vsets['vset10'].enabled() && !vsets['vset10'].stream ) vsets['vset10'].stream = new Photostream(yourinteresting);
	if(vsets['vset11'].enabled() && !vsets['vset11'].stream && (document.location.pathname.indexOf('/in/pool-') >= 0)) vsets['vset11'].stream = new Photostream(vsets['vset11'].config);
    } else {
	if(vsets['vset1'].enabled() && !vsets['vset1'].stream && _gi('photo_gne_button_add_to_faves').src.match(/\/a_fave_grey.gif/) ) vsets['vset1'].stream = new Photostream(favorites); 
	if(vsets['vset7'].enabled() && !vsets['vset7'].stream && _gi('photo_gne_button_add_to_faves').src.match(/\/a_fave_grey.gif/) ) vsets['vset3'].stream = new Photostream(favorites2); 
	if(vsets['vset2'].enabled() && !vsets['vset2'].stream ) vsets['vset2'].stream = new Photostream(contacts);
	if(vsets['vset9'].enabled() && !vsets['vset9'].stream ) vsets['vset9'].stream = new Photostream(userinteresting);
	if(vsets['vset12'].enabled() && !vsets['vset12'].stream && (document.location.pathname.indexOf('/in/pool-') >= 0)) vsets['vset12'].stream = new Photostream(vsets['vset12'].config);
    }

    if(vsets['vset4'].enabled() && !vsets['vset4'].stream ) {
	vsets['vset4'].stream = new Photostream(interestingness);
    }

    if(vsets['vset5'].enabled() && !vsets['vset5'].stream ) {
	for(var i in global_photos[photo_id].tagsA ) 
	    if( global_photos[photo_id].tagsA[i] == 'geotagged' ) 
		vsets['vset5'].stream = new Photostream(geotagged);
    }

    if( vsets['vset6'].enabled() && !vsets['vset6'].stream && isPublic == 0 ) vsets['vset6'].stream = new Photostream(friends);
}

function newVsets() {
    var re = /http:\/\/(www\.)?flickr\.com\/photos\/[^\/]+\/sets\//;
    var re2 = /http:\/\/(www\.)?flickr\.com\/photos\/[^\/]+\/sets\/\d+\//;
    if( ! re.test(document.location) || re2.test(document.location) ) return;

    if(DEBUG) GM_log('In set page ' + isOwner);

    if( isOwner ) {
	if(vsets['vset3'].enabled() && !vsets['vset3'].stream ) vsets['vset3'].stream = new VirtualSet(private);
	if(vsets['vset8'].enabled() && !vsets['vset8'].stream ) vsets['vset8'].stream = new VirtualSet(favorited);
	if(vsets['vset10'].enabled() && !vsets['vset10'].stream ) vsets['vset10'].stream = new VirtualSet(yourinteresting);
    } else {
//	if(vsets['vset1'].enabled() && !vsets['vset1'].stream ) vsets['vset1'].stream = new VirtualSet(favorites); 
	if(vsets['vset7'].enabled() && !vsets['vset7'].stream ) vsets['vset3'].stream = new VirtualSet(favorites2); 
//	if(vsets['vset2'].enabled() && !vsets['vset2'].stream ) vsets['vset2'].stream = new VirtualSet(contacts);
	if(vsets['vset9'].enabled() && !vsets['vset9'].stream ) vsets['vset9'].stream = new VirtualSet(userinteresting);
    }
    if(vsets['vset4'].enabled() && !vsets['vset4'].stream ) {
//	vsets['vset4'].stream = new VirtualSet(interestingness);
    }

    if(vsets['vset5'].enabled() && !vsets['vset5'].stream ) {
	vsets['vset5'].stream = new VirtualSet(geotagged);
    }

    if( vsets['vset6'].enabled() && !vsets['vset6'].stream ) vsets['vset6'].stream = new VirtualSet(friends);
}

newPStreams();
newVsets();

})();
