// ==UserScript==
// @name          del.icio.us Flickr Contacts
// @version       2.0
// @description   Tag your Flickr contacts to del.icio.us social bookmarks service
// @namespace     http://webdev.yuan.cc/
// @include       http://www*.flickr.com/*
// @include       http://flickr.com/*

// created by CK ( .CK at flickr.com )
// For more information, please see http://www.flickr.com/groups/flickr_tools/
//
// Bugs fixed:
// 2006.6.21. v2.0 compatible with Flickr GAMMA
// 2005.8.26. v1.3 fixed to locate correct position (cid not found problem)
// 2005.6.24. buddyicon bug (quas)
// 2005.7.22. replace GM_xmlhttpRequest to XMLHttpRequest
//
// ==/UserScript==


(function() {

function _gt(e) { return document.getElementsByTagName(e); }
function _gi(e) { return document.getElementById(e); }
function _ce(e) { return document.createElement(e); }
function _ct(e) { return document.createTextNode(e); }

if(unsafeWindow) w = unsafeWindow;
else w = window;

var contact_path;

function buildTags(tags,href) {

    var tagary = tags.split(' ');

    for(j=0; j<tagary.length;j++) {
	var a = _ce('a');
	a.href = 'javascript:;';
	a.name = tagary[j];
	a.innerHTML = tagary[j];
	a.style.textDecoration = 'none';
	a.style.color = '#888';
	a.onclickHandler = function() {
	    searchTag(this.name);
	}
	a.addEventListener('click', a.onclickHandler, true);
	tagspan[href].appendChild(a);
	tagspan[href].appendChild(_ct(' '));
   }
   tagspan[href].appendChild(_ce('br'));
}

function searchTag(tag) {

    var paginator;
    var tmpdiv = _gt('div');
    var searchBox = _gi('delicious_search');
    var container = _gi('container');
    var closeicon = _gi('closeicon');
    var pblank = _gi('pblank');
    var maindiv = _gi('Main');
    for(var k=0;k<tmpdiv.length;k++) if( tmpdiv[k].getAttribute('class') == 'paginator' ) paginator = tmpdiv[k];
    if( !searchBox ) {
	searchBox = _ce('div');
	searchBox.id = 'delicious_search';
	searchBox.setAttribute("style", "float:none;");
	searchBox.style.marginTop = '10px';
	searchBox.style.padding = '8px';
//	searchBox.style.borderColor = '#444444';
	searchBox.style.background = '#f8f8f8';
	searchBox.style.width = '100%';
//	searchBox.style.border = 'solid #444444 1px';
	searchBox.innerHTML = '<h3 id="delicious_result" style="margin:0px;"><img src="http://del.icio.us/favicon.ico"> Search del.icio.us contacts by tag: ' + tag + '</h3>';
    } else {
	searchBox.innerHTML = '<h3 id="delicious_result" style="margin:0px;"><img src="http://del.icio.us/favicon.ico"> Search del.icio.us contacts by tag: ' + tag + '</h3>';
	searchBox.appendChild(pblank);
    }
    if( !_gi('closeicon') ) {
	closeicon = _ce('span');
	closeicon.id = 'closeicon';
	closeicon.setAttribute("style", "float:right;");
//	closeicon.style.top = 10;
//	closeicon.style.right = 10;
//	closeicon.style.zIndex = 100;
//	closeicon.style.display = 'inline';

	closeA = _ce('a');
	closeA.innerHTML = 'close';
	closeA.onclickHandler = function() {
	    maindiv.removeChild(container);
	}
	closeA.addEventListener('click', closeA.onclickHandler, true);
	closeicon.appendChild(closeA);
	searchBox.insertBefore(closeicon,searchBox.firstChild);
    }
    if( !container ) {
	container = _ce('div');
	container.id = 'container';
	container.style.width = '100%';
	container.style.margin = '0px';
	container.style.padding = '0px';
	container.appendChild(searchBox);
	if(fid) maindiv.appendChild(container);
	else maindiv.insertBefore(container, maindiv.firstChild.nextSibling.nextSibling.nextSibling.nextSibling);
    }
    if( !_gi('pblank') ) {
	pblank = _ce('p');
	pblank.id = 'pblank';
	pblank.style.textAlign = 'right';
/*
	var brimg = _ce('img');
	brimg.src = 'http://www.flickr.com/images/placeholder_last_photo.gif';
	brimg.width = maindiv.clientWidth;
	brimg.height = 0;
	pblank.appendChild(brimg)
*/
	pblank.innerHTML = '<br clear="all"><a id="delicious_link" href="http://del.icio.us/" target="_blank">Link to del.icio.us</a>';
//	pblank.innerHTML = '<br clear="all">';
	searchBox.appendChild(pblank);
    }

    GM_xmlhttpRequest({
	method: 'GET',
	url: 'http://del.icio.us/api/posts/all?tag=' + tag,
	headers: { 'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey FlickrContactsTagger',
		   'Accept': 'application/atom+xml,application/xml,text/xml', },
	onload: function(result) {
	    if( result.status != 200 ) alert('Connection to del.icio.us fail.');
//	    alert('Request for Atom feed returned ' + result.status + ' ' + result.statusText + '\n\n' + 'Feed data:\n' + result.responseText);

	    var nsid, iconserver, locationplace;
	    var parser = new w.DOMParser();
	    var dom = parser.parseFromString(result.responseText, "application/xml");
	    var user = dom.getElementsByTagName('posts').item(0).getAttribute('user');
	    var posts = dom.getElementsByTagName('post');

	    _gi('delicious_link').href = 'http://del.icio.us/' +user+ '/flickr:contacts%2B' +tag;
	    var showUser = function(post,nsid,iconserver,locationplace) {
		var re = /'s Flickr Photos/i;
		var description = post.getAttribute('description').replace(re, '');
		var p = _ce('p'); 
		p.setAttribute("style", "float:left;margin:10px;text-align:center;");
		var a = _ce('a');
		a.href = post.getAttribute('href');
		var img = _ce('img');
		if( 1*iconserver ) img.src = 'http://static.flickr.com/' +iconserver+ '/buddyicons/'+nsid+'.jpg';
		else img.src = 'http://www.flickr.com/images/buddyicon.jpg';
		a.appendChild(img);
		a.appendChild(_ce('br'));
		a.appendChild(_ct(description));
		p.appendChild(a);
		p.appendChild(_ce('br'));
		p.appendChild(_ct(locationplace));
		searchBox.insertBefore(p,pblank);
	    }

	    var callFlickrUser = function(i) {
		if( i == posts.length ) return;
		var re = /flickr:contacts/i;
		if( !re.test(posts[i].getAttribute('tag')) ) {
		    callFlickrUser(i+1);
		} else {
		    var x = posts[i].getAttribute('href');
		    var p = posts[i];

// Begin flickr API calls by GM_xmlhttpRequest
		    var www;
		    var url_str = ''+document.location;
		    if( url_str.match('www.flickr.com') ) www = 'www.';
		    else www = '';

		    GM_xmlhttpRequest({
			method: 'GET',
			url: 'http://'+www+'flickr.com/services/rest/?api_key=bc60075f4ce963fab3fac473d0741fe8&' + 
			     'method=flickr.urls.lookupUser&url=' + x,
			headers: { 'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey FlickrContactsTagger',
				   'Accept': 'application/atom+xml,application/xml,text/xml', },
			onload: function(result) {
			    if( result.status != 200 ) alert('Call to flickr API fail.');
//			    alert('Request for Atom feed returned ' + result.status + ' ' + result.statusText + '\n\n' 
//				+ 'Feed data:\n' + result.responseText);
			    var parser = new w.DOMParser();
			    var dom = parser.parseFromString(result.responseText, "application/xml");
			    nsid = dom.getElementsByTagName('user')[0].getAttribute('id');
			    var www;
			    var url_str = ''+document.location;
			    if( url_str.match('www.flickr.com') ) www = 'www.';
			    else www = '';
			    GM_xmlhttpRequest({
				method: 'GET',
				url: 'http://'+www+'flickr.com/services/rest/?api_key=bc60075f4ce963fab3fac473d0741fe8&' + 
				     'method=flickr.people.getInfo&user_id=' + nsid,
				headers: { 'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey FlickrContactsTagger',
					   'Accept': 'application/atom+xml,application/xml,text/xml', },
				onload: function(result) {
				    if( result.status != 200 ) alert('Call to flickr API fail.');
//				    alert('Request for Atom feed returned ' + result.status + ' ' + result.statusText + '\n\n' 
//					+ 'Feed data:\n' + result.responseText);
				    var parser = new w.DOMParser();
				    var dom = parser.parseFromString(result.responseText, "application/xml");
				    iconserver = dom.getElementsByTagName('person')[0].getAttribute('iconserver');
				    var tmpobj = dom.getElementsByTagName('person')[0].getElementsByTagName('location').item(0).firstChild;
				    locationplace = (tmpobj)? tmpobj.data : '';
				    showUser(p,nsid,iconserver,locationplace);
				    callFlickrUser(i+1);
				}
			    });
			}
		    });
// End of flickr API calls

		}
	    }
	    callFlickrUser(0);
	}
    });
}

function addBuddyMenu() {
    var person_menu = _gi('person_menu_other_div');
    var clink = _gi('personmenu_photos_link').parentNode;

    var input_tag = _ce('input');
    input_tag.id = 'contact_tag';
    input_tag.type = 'text';
    input_tag.size = '14';
    input_tag.style.fontSize = '10px';
    input_tag.style.fontFamily = 'arial';

    var add_tag = _ce('input');
    add_tag.type = 'button';
    add_tag.setAttribute('class','SmallButt');
    add_tag.value = 'Add Tags';
    add_tag.addEventListener('click', function() {
	var url = '' + _gi('personmenu_photos_link').href;
	var name = /^.*flickr\.com\/(people|photos)\/([^\/]+)\//.exec(url)[2];
	var tags = _gi('contact_tag').value + ' flickr:contacts';
	GM_xmlhttpRequest({
	    method: 'GET',
	    url: 'http://del.icio.us/api/posts/add?'+'&url=' + url + '&tags=' + tags + '&description=' + name + '\'s Flickr Photos',
	    headers: {
		'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey FlickrContactsTagger',
		'Accept': 'application/atom+xml,application/xml,text/xml',
	    },
	    onload: function(result) {
		if( result.status == 200 ) alert('Post to del.icio.us successfully.');
//		alert('Request for Atom feed returned ' + result.status + ' ' + result.statusText + '\n\n' + 'Feed data:\n' + result.responseText);
	    }
	});
    }, true);

    var input_box = _ce('div');
    input_box.className = 'menu_item_line_above';
    input_box.appendChild(input_tag);
    input_box.appendChild(add_tag);
    person_menu.insertBefore(input_box, clink);
    
}

// Main codes start 

var re = /flickr.com\/photos\/[^\/]+\/$|flickr.com\/photos\/[^\/]+\/page.*\/$|flickr.com\/people\/[^\/]+\/contacts\/$/i;
var re2 = /flickr.com\/photos\/[^\/]+\/\d+\/?/i;
var re3 = /flickr.com\/people\/[^\/]+\/$/i;
var re4 = /flickr.com\/search\/people/;

addBuddyMenu();

if( re.test(document.location) || re2.test(document.location) || re3.test(document.location) || re4.test(document.location) ) {

    var input_tag,h;
    var hid=null,fid=null;
    contact_path=true;
    var no_addtags = false;
    if( re.test(document.location) ) {
	h = _gt('h4');
	for(var i=0; i<h.length; i++) {
	    if( h[i].innerHTML == 'Search your photos' ||
		h[i].innerHTML == 'Search her photos' ||
		h[i].innerHTML == 'Search his photos' ||
		h[i].innerHTML == 'Search for people' ||
		h[i].innerHTML == 'Search by tag' ||
		/Search \w+'s photos/.test(h[i].innerHTML) ) hid = h[i];
	}
    }
    if( re2.test(document.location) ) {
	h = _gt('div');
	for(var i=0; i<h.length; i++) {
	    if( h[i].className == 'ContextTop' ) hid = h[i];
	}
    }
    if( re3.test(document.location) ) {
	h = _gt('h3');
	for(var i=0; i<h.length; i++) {
	    if( /Testimonials/.test(h[i].innerHTML) ) hid = h[i];
	}
    }
    if( re4.test(document.location) ) {
	var m = _gi('Main');
	var s = _ce('div');
	hid = _ce('span');
	s.style.backgroundColor = '#f8f8f8';
	s.style.textAlign = 'center';
	s.appendChild(hid);
	m.appendChild(s);
	no_addtags = true;
	fid = m;
    }
    if( hid ) {
	h = (re3.test(document.location) || re4.test(document.location)) ?_ce('h3'):_ce('h4');
	h.innerHTML = 'Contacts in del.icio.us';
	input_tag = _ce('input');
	input_tag.type = 'text';
	input_tag.size = '20';
	search_tag = _ce('input');
	search_tag.type = 'button';
	search_tag.setAttribute('class','SmallButt');
	search_tag.value = 'SEARCH';
	search_tag.onclickHandler = function() {
	    var insertPoint;
	    var h = _gt('div');
	    var re = /image_.+_normal/i;
	    for(var i=0; i<h.length; i++) if( re.test(h[i].id) ) insertPoint = h[i];
	    searchTag(input_tag.value);
	}
	search_tag.addEventListener('click', search_tag.onclickHandler, true);
	if( re4.test(document.location) ) input_tag.addEventListener('change', search_tag.onclickHandler, true);
	add_tag = _ce('input');
	add_tag.type = 'button';
	add_tag.setAttribute('class','SmallButt');
	add_tag.value = 'ADD TAGS';
	add_tag.onclickHandler = function() {
	    var name = /^.*flickr\.com\/(people|photos)\/([^\/]+)\//.exec(document.location)[2];
	    var url = 'http://www.flickr.com/photos/' + name + '/';
	    var tags = input_tag.value + ' flickr:contacts';
	    GM_xmlhttpRequest({
		method: 'GET',
		url: 'http://del.icio.us/api/posts/add?'+'&url=' + url + '&tags=' + tags + '&description=' + name + '\'s Flickr Photos',
		headers: {
		    'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey FlickrContactsTagger',
		    'Accept': 'application/atom+xml,application/xml,text/xml',
		},
		onload: function(result) {
		    if( result.status == 200 ) alert('Post to del.icio.us successfully.');
//		    alert('Request for Atom feed returned ' + result.status + ' ' + result.statusText + '\n\n' + 'Feed data:\n' + result.responseText);
		}
	    });
	}
	add_tag.addEventListener('click', add_tag.onclickHandler, true);
	hid.parentNode.insertBefore(h,hid);
	hid.parentNode.insertBefore(input_tag,hid);
	if( re2.test(document.location) ) hid.parentNode.insertBefore(_ce('br'),hid);
	hid.parentNode.insertBefore(search_tag,hid);
	hid.parentNode.insertBefore(_ct(' '),hid);
	if( !no_addtags) hid.parentNode.insertBefore(add_tag,hid);
	if( re2.test(document.location) ) hid.parentNode.insertBefore(_ce('br'),hid);
	if( re2.test(document.location) ) hid.parentNode.insertBefore(_ce('br'),hid);
	contact_path=false;
    }
} // end of URL is something like ..../photos/

re = /flickr.com\/people\/.*\/contacts\/\?see=contacts/i;
if( re.test(document.location) || contact_path ) {

GM_xmlhttpRequest({
    method: 'GET',
    url: 'http://del.icio.us/api/posts/all?tag=flickr:contacts',
    headers: {
        'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey FlickrContactsTagger',
        'Accept': 'application/atom+xml,application/xml,text/xml',
    },
    onload: function(responseDetails) {
	var i,j,tagary,re,tags,href;
	var parser = new w.DOMParser();
	var dom = parser.parseFromString(responseDetails.responseText, "application/xml");
	var posts = dom.getElementsByTagName('post');
	for(i=0;i<posts.length; i++) {
	    href = posts[i].getAttribute('href');
	    re = /flickr:contacts/;
	    tags = posts[i].getAttribute('tag').replace(re,'');
	    if( tagspan[href] ) buildTags(tags,href);
	    contacts[href] = new Object();
	    contacts[href].description = posts[i].getAttribute('description');
	    contacts[href].extended = posts[i].getAttribute('extended');
	    contacts[href].hash = posts[i].getAttribute('hash');
	    contacts[href].tag = posts[i].getAttribute('tag');
	    contacts[href].time = posts[i].getAttribute('time');
	}
    }
});

var cid,t,i,j;
var tagspan = new Array();
var contacts = new Array();

cid = _gi('Main');
s = cid.getElementsByTagName('a');
t = cid.getElementsByTagName('td');

j=0;
for(i=0; i<s.length && j<t.length;) {
    if( s[i].getAttribute('href') == 'javascript:;' ) {
	i++;
	continue;
    }
//    if( t[j].getAttribute('width') == '230' ) {
    if( t[j].className == 'Icon' ) contactIcon = t[j].getElementsByTagName('img')[0].src;
    if( t[j].className == 'Who' ) {
//	var contactURL = s[i].getAttribute('href');
//	var contactName = t[j].getElementsByTagName('span')[0].innerHTML;
//	var contactIcon = s[i].parentNode.getElementsByTagName('img')[0].src;
	var contactURL = t[j].getElementsByTagName('a')[0].href;
	var contactName = t[j].getElementsByTagName('h2')[0].innerHTML;
	var tags = _ce('span');
	var deliciousTags = _ce('span');
	var info = _ce('input');
	var a = _ce('a');
	info.type = 'hidden';
	info.value = contactName + ':=:' +contactURL + ':=:' + contactIcon;
	deliciousTags.style.color = '#888';
	deliciousTags.style.fontSize = '11px';
	deliciousTags.style.backgroundColor = '#ffffcc';
	tagspan['http://www.flickr.com'+contactURL] = deliciousTags;
	a.name = contactName + ':=:' +contactURL + ':=:' + contactIcon;
	a.href = 'javascript:;';
	var tmpFun = function() {
	    var tmp = this.parentNode.getElementsByTagName('input')[0].value;
	    var name = tmp.split(':=:')[0];
	    var url = 'http://www.flickr.com' + tmp.split(':=:')[1];
	    var text = _ce('input');
	    text.style.fontSize = '12px';
	    text.style.fontStyle = 'Arial';
	    text.type = 'text';
	    text.size = '20';
	    var re = /flickr:contacts/;
	    if( contacts[url] ) text.value = contacts[url].tag.replace(re,'');
	    else contacts[url] = new Object();
	    var b = _ce('input');
	    b.style.fontSize = '12px';
	    b.style.fontStyle = 'Arial';
	    b.type = 'button';
	    b.value = 'add';
	    b.onclickHandler = function() {
		var tmp = this.parentNode.getElementsByTagName('input')[0].value;
		var name = tmp.split(':=:')[0];
		var url = 'http://www.flickr.com' + tmp.split(':=:')[1];
		var icon = tmp.split(':=:')[2];
		var tags = text.value + ' flickr:contacts';
		GM_xmlhttpRequest({
		    method: 'GET',
		    url: 'http://del.icio.us/api/posts/add?'+'&url=' + url + '&tags=' + tags + '&description=' + name + '\'s Flickr Photos',
		    headers: {
		        'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey FlickrContactsTagger',
		        'Accept': 'application/atom+xml,application/xml,text/xml',
		    },
		    onload: function(result) {
			if( result.status == 200 ) alert('Post to del.icio.us successfully.');
//			alert('Request for Atom feed returned ' + result.status + ' ' + result.statusText + '\n\n' + 'Feed data:\n' + result.responseText);
		    }
		});
		var re = /flickr:contacts/;
		tags = tags.replace(re,'');
		tagspan[url].innerHTML = '';
		if( tagspan[url] ) buildTags(tags,url);
	    }
	    b.addEventListener('click', b.onclickHandler, true);
	    this.parentNode.insertBefore(text,this);
	    this.parentNode.insertBefore(b,this);
	    this.parentNode.insertBefore(_ce('br'),this);
	    this.onclickHandler = function() {
		b.style.visibility = 'visible';
		text.style.visibility = 'visible';
	    }
	    this.addEventListener('click', this.onclickHandler, true);
	    this.parentNode.removeChild(this);
	}
//	a.onclick = tmpFun;
	a.addEventListener('click', tmpFun, true);
	a.innerHTML = 'Add tags?';
	a.style.fontSize = '11px';
	tags.appendChild(info);
	tags.appendChild(a);

	t[j].appendChild(_ce('br'));
	t[j].appendChild(deliciousTags);
	t[j].appendChild(tags);
	i++; j++;
    } else j++;
}
} // end of URL is something like ..../contacts/?see=contacts


})();

