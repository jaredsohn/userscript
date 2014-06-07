// ==UserScript==
// @name          Super Batch Processing for Flickr
// @version       1.0
// @description	  Create a list of arbitrary photos in Flickr for batch operations
// @namespace     http://webdev.yuan.cc/
// @include       http://flickr.com/*
// @include       http://www.flickr.com/*

// v1.0 18/5/05
//  fix for Flickr Gamma
// v0.2 30/10/05	
//  1. Add an 'update script' link to menu
//  2. Add a 'move to top' feature. 
// v0.1	25/10/05	initial release
//
// Author: .CK ( http://www.flickr.com/photos/ckyuan/ )
// Web site: http://webdev.yuan.cc/
//
// Flickr is lacking of creating a list of arbitrary photos for batch operations.
// This script provides a "shopping cart" for you to collect your photos to process.
// After you added a number of photos in cart, you can edit as a batch, make
// an album, a slideshow, or a mosaic. Items in cart will be saved in greasemonkey 
// storage and will be remembered while you're visiting different pages in flickr.
//  
// Features:
//  1. A cart to collect photos you select, up to 100 photos
//  2. A checkbox attached on the upper-right corner of the photo
//  3. Editing as a batch beyond sets, tagged photos, date-based photos
//  4. Connecting to external flickr tools, such as Flcikr Album Maker, Photo Mosaic, or Slideshow
//
// Special thanks to fd/John (http://flickr.com/photos/john/) for his permission
// to feed the list of photos to his flickr toys. (slideshow and mosaic)
// 
// ==/UserScript==

(function() {

function _gt(e) { return document.getElementsByTagName(e); }
function _gi(e) { return document.getElementById(e); }
function _ce(e) { return document.createElement(e); }
function _ct(e) { return document.createTextNode(e); }

if(unsafeWindow) w = unsafeWindow;
else w = window;

function add_to_cart(id) {
    id = '' + id;
    var found = false;
    var str = GM_getValue('batch_list');
    if( !str ) str = '';
    var items = str.split(',');
    if( items.length >= 100 ) {
	alert('Sorry, you have reached the max. number of photos limit.');
	return false;
    }
    for(var i=0;i<items.length;i++) {
	if( ''+items[i] == id ) {
	    found = true;
	    break;
	}
    }
    if( !found ) {
	if( str != '' ) str += ',' + id;
	else str += id;
	GM_setValue('batch_list', str);
	cart_stats();
	get_photo_info();
    }
    cart.done = false;
    return true;
}

function remove_from_cart(id) {
    id = '' + id;
    var newstr = '';
    var str = GM_getValue('batch_list');
    if( !str ) str = '';
    var items = str.split(',');
    for(var i=0;i<items.length;i++) {
	if( ''+items[i] != id ) {
	    if( newstr == '' ) newstr = items[i];
	    else newstr += ',' + items[i];
	}
    }
    GM_setValue('batch_list', newstr);
    cart_stats();
    if( list[id] ) list[id].checkbox.checked = false;
}

function cart_stats() { item_num.innerHTML = num_in_cart() + ' photos in cart (' + num_of_photoinfo() + ')'; }

var num_in_cart = function() {
    var str = GM_getValue('batch_list');
    if( !str ) str = '';
    if( str=='' ) return 0;
    var items = str.split(',');
    return items.length;
}

function num_of_photoinfo() {
    var x=0;
    for(var j in photos) if( photos[j].id != undefined ) x++;
    return x;
}

function photoinfo_done() {

    var str = GM_getValue('batch_list');
    if( !str ) return true;

    var items = str.split(',');
    for(var i=0; i<items.length; i++) 
	if( !photos[items[i]] || photos[items[i]].id == undefined ) return false;
    return true;
}

function item_in_cart(id) {
    id = '' + id;
    var str = GM_getValue('batch_list');
    if( !str ) str = '';
    if( str=='' ) return false;
    var items = str.split(',');
    for(var i=0;i<items.length;i++) {
	if( ''+items[i] == id ) return true;
    }
    return false;
}

function get_photo_info() {
    var str = GM_getValue('batch_list');
    if( !str || str == '' | str == ',' ) return;
    var items = str.split(',');
//    callAPI_photo_info(items.length-1);
    callAPI_photo_info(items);
}

function callAPI_photo_info(plist) {

    var url;

    if( plist.length == 0 ) {
	if( callback != null ) callback();
	callback = null;
	status_msg.hide();
	return;
    }
    var id = plist.pop();
    while( id == '' && plist.length > 0 ) id = plist.pop();
    if( id == '' ) {
	if( callback != null ) callback();
	callback = null;
	status_msg.hide();
	return;
    }

    if( photos[id] ) {
	callAPI_photo_info(plist);
	return;
    }

    url =  'http://www.flickr.com/services/rest/?method=flickr.photos.getInfo';
    url += '&api_key=bc60075f4ce963fab3fac473d0741fe8';
    url += '&photo_id=' + id;
    GM_xmlhttpRequest({
	method: 'GET',
	url: url,
	headers: {
		'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey/Super Batch Processing in Flickr',
	        'Accept': 'application/atom+xml,application/xml,text/xml',
	},
	onload: function(responseDetails) {
//	        alert( ': Request for Atom feed returned ' + responseDetails.status +
//	              ' ' + responseDetails.statusText + '\n\n' +
//	              'Feed data:\n' + responseDetails.responseText);
	    var parser = new w.DOMParser();
	    var dom = parser.parseFromString(responseDetails.responseText, "application/xml");
	    var stat = dom.getElementsByTagName('rsp')[0].getAttribute('stat');
	    if( stat == 'ok' ) {
		var photo_id = dom.getElementsByTagName('photo')[0].getAttribute('id');
		photos[photo_id] = new Object();
		photos[photo_id].id = photo_id;
		photos[photo_id].secret = dom.getElementsByTagName('photo')[0].getAttribute('secret');
		photos[photo_id].server = dom.getElementsByTagName('photo')[0].getAttribute('server');
		photos[photo_id].owner_nsid = dom.getElementsByTagName('owner')[0].getAttribute('nsid');
		photos[photo_id].owner_username = dom.getElementsByTagName('owner')[0].getAttribute('username');
		photos[photo_id].url = dom.getElementsByTagName('url')[0].firstChild.data;
		photos[photo_id].img_s = 'http://static.flickr.com/' + photos[photo_id].server + '/' + photo_id + '_' + photos[photo_id].secret + '_s.jpg';
		cart_stats();
		if( status_msg.on )
		    status_msg.show('Start to fetch photo info, please wait for a few seconds...... ' + (num_in_cart()-num_of_photoinfo()));
	    } else {
		photos[photo_id] = new Object();
		photos[photo_id].id = photo_id;
//		remove_from_cart(id);
	    }
	    callAPI_photo_info(plist);
	}
    });
}

var str='',username, callback = null;
if( GM_getValue('batch_checkbox') == undefined ) GM_setValue('batch_checkbox',false);

// insert status message box

// var ptags = _gt('div');
// for(var i=0;i<ptags.length;i++) if( ptags[i].className == 'TopBar' ) { var ip = ptags[i]; break; }
var ip = _gi('Main');

var status_msg_container = _ce('div');
status_msg_container.style.width = '760px';
status_msg_container.style.zIndex = 60000;
status_msg_container.style.overflow = 'visible';
status_msg_container.style.position = 'absolute';
status_msg_container.style.display = 'none';
status_msg_container.style.textAlign = 'center';
status_msg_container.innerHTML = '<span id="status_msg" style="position:relative;top:100px;z-index:60000;overflow:visible;background:#ffffff;padding:10px;font:bold 12px Arial, Helvetica, sans-serif; color:#000000;border:solid 1px #ccddee;"></span>';

// ip.appendChild(status_msg_container);
ip.insertBefore(status_msg_container, ip.firstChild);

var status_msg = _gi('status_msg');
status_msg.on = false;
status_msg.show = function(msg) {
    this.innerHTML = '<img src="http://www.flickr.com/images/pulser2.gif" style="vertical-align:middle;margin-right:4px;border:0px #ffffff" />';
    this.innerHTML += msg;
    status_msg_container.style.display = 'block';
}
status_msg.hide = function() {
    status_msg.on = false;
    status_msg_container.style.display = 'none';
}

// insert view cart dialog

var cart_container = _ce('div');
cart_container.style.width = '730px';
cart_container.style.padding = '10px';
cart_container.style.zIndex = 35000;
cart_container.style.overflow = 'visible';
cart_container.style.position = 'absolute';
cart_container.style.display = 'none';
cart_container.style.textAlign = 'center';
cart_container.innerHTML = '<div id="cart" style="position:relative;top:50px;overflow:visible;background:#ddeeff;padding:10px;font:bold 12px Arial, Helvetica, sans-serif; color:#ff0084;border:solid 1px #ccddee;text-align:left;"></div>';

// ip.appendChild(cart_container);
ip.insertBefore(cart_container, ip.firstChild);

var cart = _gi('cart');
cart.on = cart.done = false;
cart.show = function(msg) {
    if( this.done && num_in_cart()>0 ) {
	cart_container.style.display = 'block';
	return;
    }
//    this.innerHTML = '<table width="100%" border=0><tr><td align=center><h3 id="cart_title">Photos in Cart (' + num_in_cart() + ' items)</h3></td><td align=right><p style="font-size:11px"><a href="javascript:;" onclick="document.getElementById(\'cart\').hide()">CLOSE</a></p></td></tr></table>';
    this.innerHTML = '<table width="100%" border=0><tr><td align=center><h3 id="cart_title">Photos in Cart (' + num_in_cart() + ' items)</h3></td><td align=right><p style="font-size:11px"><a id="close_cart" href="javascript:;">CLOSE</a></p></td></tr></table>';
    var str = GM_getValue('batch_list');
    if( !str || str=='' ) return true;
    var items = str.split(',');
    for(var i=0; i<items.length; i++) 
	if( items[i] != '' && photos[items[i]] && photos[items[i]].img_s ) {
//	    this.innerHTML += '<p style="float:left;padding:4px 4px 10px 4px;font-size:11px;border:1px solid #ddd;background:#fff;margin:6px;text-align:center"><a href="' +photos[items[i]].url + '"><img src="' +photos[items[i]].img_s+ '" /></a><br /><a id="remove_' +items[i]+ '" href="javascript:;" rel="' +items[i]+ '" onclick="document.getElementById(\'cart\').remove(this)">Remove</a></p>';
	    this.innerHTML += '<p style="float:left;padding:4px 4px 10px 4px;font-size:11px;border:1px solid #ddd;background:#fff;margin:6px;text-align:center"><a href="' +photos[items[i]].url + '"><img src="' +photos[items[i]].img_s+ '" /></a><br /><a id="remove_' +items[i]+ '" href="javascript:;" rel="' +items[i]+ '">Remove</a></p>';
	}
    this.innerHTML += '<br clear=all>';
    this.done = true;
    cart_container.style.display = 'block';
    _gi('close_cart').addEventListener('click', cart.hide, true);
    for(var i=0; i<items.length; i++) 
	_gi('remove_' +items[i]).addEventListener('click', cart.remove, true);
}
cart.hide = function() {
    cart.on = false;
    cart_container.style.display = 'none';
}
cart.remove = function() {
    var x = this;
    var id = '' + x.getAttribute('rel');
    var tmp = document.getElementById('cart_title');
    x.parentNode.style.display = 'none';
    remove_from_cart(id);
    tmp.innerHTML = 'Photos in Cart (' + num_in_cart() +' items)';
//  alert(tmp);
    if( num_in_cart() == 0) cart.hide();
}

// insert pulldown menu
var menu_you = _gi('candy_nav_menu_you');
var you_a = menu_you.getElementsByTagName('a');
for(var i=0;i<you_a.length;i++) {
    if( you_a[i].innerHTML == 'Recent Activity' ) {
	var recent_activity = you_a[i];
	break;
    }
}


var atags = _gt('a');
var re2 = /http:\/\/(www.)?flickr.com\/explore\//;
for( var i=0;i<atags.length;i++) {
    var str = '' + atags[i].href;
    if( atags[i].innerHTML == 'Your Photos' ) {
	var pattern = /http:\/\/(www.)?flickr.com\/photos\/(\w+)\//;
	var result = pattern.exec(str);
	username = result[2];
	break;
    }
}


//    if( re2.test(str) && atags[i].innerHTML == 'Explore' ) {
	var s = _ce('span');
	var batch = _ce('a');
	var b_menu = _ce('div');

	s.innerHTML = '&bull;';
	s.setAttribute('style', 'color: #ccc;');
	batch.innerHTML = 'Your Super Batch';
	batch.href = 'javascript:;';
	batch.clickat = null;
	batch.onclickHandler1 = function() {
	    if( batch.clickat == 'body' ) {
		batch.clickat = null;
		return;
	    }
	    if( b_menu.style.display == 'none' ) {
//	    batch.removeEventListener('click', batch.onclickHandler1, true);
//	    batch.addEventListener('click', batch.onclickHandler2, true);
		b_menu.style.display = 'inline';
	    } else {
		b_menu.style.display = 'none';
	    }
	}
	batch.onclickHandler2 = function() {
	    batch.removeEventListener('click', batch.onclickHandler2, true);
	    batch.addEventListener('click', batch.onclickHandler1, true);
	    b_menu.style.display = 'none';
	    batch.status = false;
	}
	batch.onclickHandler3 = function() {
	    b_menu.style.display = 'none';
	}
//	batch.addEventListener('mouseover', batch.onclickHandler1, true);
	batch.addEventListener('click', batch.onclickHandler1, true);
	b_menu.id = 'b_menu';
	b_menu.style.zindex = 20000;
	b_menu.style.overflow = 'visible';
	b_menu.style.position = 'absolute';
	b_menu.style.display = 'none';
	b_menu.innerHTML = '<div id="batchmenu" style="position:relative;z-index:40000;left:10px;top:4px;overflow:visible;background:#ffffd3;padding:5px;font: 11px Arial, Helvetica, sans-serif; color:#000000; border:solid 1px #ccddee;"></div>';

	var item_num = _ce('span');
	var show_checkbox = _ce('a');
	var hide_checkbox = _ce('a');
	var keep_checkbox = _ce('a');
	var view_cart = _ce('a');
	var check_all = _ce('a');
	var clear_items = _ce('a');
//	var batch_edit = _ce('a');
	var album_maker = _ce('a');
	var fd_slide = _ce('a');
	var fd_mosaic = _ce('a');
	var to_top = _ce('a');
	var update_script = _ce('a');
	var close_menu = _ce('a');

	item_num.style.color = '#FB0084';
	cart_stats();
	show_checkbox.href = 'javascript:;';
	show_checkbox.innerHTML = 'Show Checkbox';
	show_checkbox.style.textDecoration = 'none';
	hide_checkbox.href = 'javascript:;';
	hide_checkbox.innerHTML = 'Hide Checkbox';
	hide_checkbox.style.textDecoration = 'none';
	keep_checkbox.href = 'javascript:;';
	keep_checkbox.checked = GM_getValue('batch_checkbox');
	if( keep_checkbox.checked ) keep_checkbox.innerHTML = 'Keep Checkbox Hidden';
	else keep_checkbox.innerHTML = 'Keep Checkbox Shown';
	keep_checkbox.style.textDecoration = 'none';
	view_cart.href = 'javascript:;';
	view_cart.innerHTML = 'View Cart';
	view_cart.style.textDecoration = 'none';
	check_all.href = 'javascript:;';
	check_all.innerHTML = 'Add All in this Page';
	check_all.style.textDecoration = 'none';
	clear_items.href = 'javascript:;';
	clear_items.innerHTML = 'Clear Photos in Cart';
	clear_items.style.textDecoration = 'none';
//	batch_edit.href = 'javascript:;';
//	batch_edit.innerHTML = 'Edit as a Batch';
//	batch_edit.style.textDecoration = 'none';
	album_maker.id = 'album_maker';
	album_maker.href = 'javascript:;';
	album_maker.innerHTML = 'Create an Album';
	album_maker.style.textDecoration = 'none';
	fd_slide.href = 'javascript:;';
	fd_slide.innerHTML = 'Create a Slideshow';
	fd_slide.style.textDecoration = 'none';
	fd_mosaic.href = 'javascript:;';
	fd_mosaic.innerHTML = 'Create a Mosaic';
	fd_mosaic.style.textDecoration = 'none';
	to_top.href = 'javascript:;';
	to_top.innerHTML = 'Move to Top';
	to_top.style.textDecoration = 'none';
	to_top.title = 'Change the posted date of photos to current';
	update_script.href = 'http://webdev.yuan.cc/greasemonkey/flickr.batch.user.js';
	update_script.innerHTML = 'Get Latest Version';
	update_script.style.textDecoration = 'none';
	close_menu.href = 'javascript:;';
	close_menu.innerHTML = 'Close Menu';
	close_menu.style.textDecoration = 'none';

//	atags[i].parentNode.appendChild(_ct(' '));
//	atags[i].parentNode.appendChild(s);
//	atags[i].parentNode.appendChild(_ct('\n'));
//	atags[i].parentNode.appendChild(batch);
//	atags[i].parentNode.appendChild(b_menu);

//	nav_bar.appendChild(batch);
//	nav_bar.appendChild(b_menu);
	recent_activity.parentNode.insertBefore(batch, recent_activity);
	recent_activity.parentNode.insertBefore(b_menu, recent_activity);

	var batchmenu = _gi('batchmenu');
	batchmenu.onMouseOutHandler = function() {
	    b_menu.style.display = 'none';
	}
//	batchmenu.addEventListener('mouseout', batchmenu.onMouseOutHandler, true);
	batchmenu.appendChild(item_num);
	batchmenu.appendChild(_ce('hr'));
	batchmenu.appendChild(show_checkbox);
//	batchmenu.appendChild(_ce('br'));
	batchmenu.appendChild(hide_checkbox);
//	batchmenu.appendChild(_ce('br'));
	batchmenu.appendChild(keep_checkbox);
	batchmenu.appendChild(_ce('hr'));
	batchmenu.appendChild(view_cart);
//	batchmenu.appendChild(_ce('br'));
	batchmenu.appendChild(check_all);
//	batchmenu.appendChild(_ce('br'));
	batchmenu.appendChild(clear_items);
	batchmenu.appendChild(_ce('hr'));
//	batchmenu.appendChild(batch_edit);
//	batchmenu.appendChild(_ce('br'));
	batchmenu.appendChild(album_maker);
//	batchmenu.appendChild(_ce('br'));
	batchmenu.appendChild(fd_slide);
//	batchmenu.appendChild(_ce('br'));
	batchmenu.appendChild(fd_mosaic);
//	batchmenu.appendChild(_ce('br'));
	batchmenu.appendChild(to_top);
	batchmenu.appendChild(_ce('hr'));
	batchmenu.appendChild(update_script);
//	batchmenu.appendChild(_ce('br'));
	batchmenu.appendChild(close_menu);

	show_checkbox.onclickHandler = function() {
	    for( var i in list ) list[i].mark.style.display = 'inline';
	    b_menu.style.display = 'none';
	}
	show_checkbox.addEventListener('click', show_checkbox.onclickHandler, true);

	hide_checkbox.onclickHandler = function() {
	    for( var i in list ) list[i].mark.style.display = 'none';
	    b_menu.style.display = 'none';
	}
	hide_checkbox.addEventListener('click', hide_checkbox.onclickHandler, true);

	keep_checkbox.onclickHandler = function() {
	    keep_checkbox.checked = !keep_checkbox.checked;
	    if( keep_checkbox.checked ) {
		show_checkbox.onclickHandler();
		keep_checkbox.innerHTML = 'Keep Checkbox Hidden';
		GM_setValue('batch_checkbox', true);
	    } else {
		keep_checkbox.innerHTML = 'Keep Checkbox Shown';
		GM_setValue('batch_checkbox', false);
	    }
	    b_menu.style.display = 'none';
	}
	keep_checkbox.addEventListener('click', keep_checkbox.onclickHandler, true);

	view_cart.onclickHandler = function() {
	    if( !photoinfo_done() ) {
		get_photo_info();
		callback = view_cart.onclickHandler;
		status_msg.on = true;
		status_msg.show('Start to fetch photo info, please wait for a few seconds......');
		return;
	    }
	    cart.show();
	    b_menu.style.display = 'none';
	}
	view_cart.addEventListener('click', view_cart.onclickHandler, true);

	check_all.onclickHandler = function() {
	    for( var i in list ) {
		list[i].checkbox.checked = true;
		if( !add_to_cart(i) ) break;
	    }
	    b_menu.style.display = 'none';
	}
	check_all.addEventListener('click', check_all.onclickHandler, true);

	clear_items.onclickHandler = function() {
	    GM_setValue('batch_list', '');
	    cart.on = cart.done = false;
	    cart_stats();
	    for( var i in list ) list[i].checkbox.checked = false;
	    b_menu.style.display = 'none';
	}
	clear_items.addEventListener('click', clear_items.onclickHandler, true);

/*
	batch_edit.onclickHandler = function() {
	    var str = GM_getValue('batch_list');
	    if( !str ) {return;}
	    var url = 'http://www.flickr.com/photos_batch.gne?ids=' + str;
	    url += '&return=%2Fphotos%2F' + username + '%2F&date=&date_single=&stream=1&page=1';
	    document.location = url;
	    b_menu.style.display = 'none';
	}
	batch_edit.addEventListener('click', batch_edit.onclickHandler, true);
*/

	album_maker.onclickHandler = function() {
	    var str = GM_getValue('batch_list');
	    if( !str ) {return;}
	    if( !photoinfo_done() ) {
		get_photo_info();
		callback = album_maker.onclickHandler;
		status_msg.on = true;
		status_msg.show('Start to fetch photo info, please wait for a few seconds......');
		return;
	    }
	    b_menu.style.display = 'none';
	    var count=0, text = '';

//	    if( !str ) str = '';
	    var items = str.split(',');
	    for(var i=0;i<items.length;i++) {
		if( items[i] == '' || !photos[items[i]] ) continue;
		text += '<p><a href="' + photos[items[i]].url + '" target="_blank" class="flickrImage">';
		text += '<img src="http://static.flickr.com/' + photos[items[i]].server + '/' + photos[items[i]].id + '_' + photos[items[i]].secret + '_s.jpg" border="0" class=""></a></p>\n';
		count++;
	    }
	    var d = _ce('div'); d.style.display = 'none';
	    var f = _ce('form'); f.method = 'post'; f.action = 'http://webdev.yuan.cc/famaker.php'; // f.target = '_blank';
	    var t = _ce('input'); t.type = 'hidden'; t.name = 'showtitle'; t.value = '1';
	    var i = _ce('input'); i.type = 'hidden'; i.name = 'showicon'; i.value = '1';
	    var h = _ce('input'); h.type = 'hidden'; h.name = 'htmlbody'; h.value = '1';
	    var p = _ce('input'); p.type = 'hidden'; p.name = 'text'; p.value = text;
	    var b = _ce('input'); b.type = 'hidden'; b.name = 'batch'; b.value = '1';
	    var n = _ce('input'); n.type = 'hidden'; n.name = 'num'; n.value = count;
	    var u = _ce('input'); u.type = 'hidden'; u.name = 'username'; u.value = username;
	    f.appendChild(t); f.appendChild(i); f.appendChild(h); f.appendChild(p); f.appendChild(b); f.appendChild(n); f.appendChild(u); 
	    d.appendChild(f);
	    document.body.appendChild(d);
	    f.submit();
	}
	album_maker.addEventListener('click', album_maker.onclickHandler, true);

	fd_slide.onclickHandler = function() {
	    if( !photoinfo_done() ) {
		get_photo_info();
		callback = fd_slide.onclickHandler;
		status_msg.on = true;
		status_msg.show('Start to fetch photo info, please wait for a few seconds......');
		return;
	    }
	    var i,str,name,url, d = _gt('div');
	    for(i=0; i<d.length; i++) {
		if( d[i].className == 'LoginBar' ) {
		    s = d[i].getElementsByTagName('span');
		    name = s[0].innerHTML;
		}
	    }
	    url  = 'http://flagrantdisregard.com/flickr/slideshow.php?step=2&nextButton=Next&kind=urls'; 
	    url += '&showtitle=My+Slideshow&authorname=' + name;
	    str = GM_getValue('batch_list');
//	    if( !str ) str = '';
	    if( !str ) {return;}
	    var items = str.split(',');
	    var count = 0;
	    for(i=0; i<items.length; i++) {
		if( photos[items[i]] && photos[items[i]].url != undefined ) {
		    url += '&image[]=' + photos[items[i]].url;
		    count++;
		    if( count >= 36 ) break;
		}
	    }
	    b_menu.style.display = 'none';
//	    window.open(url,'_blank');
	    document.location = url;
	}
	fd_slide.addEventListener('click', fd_slide.onclickHandler, true);

	fd_mosaic.onclickHandler = function() {
	    if( !photoinfo_done() ) {
		get_photo_info();
		callback = fd_mosaic.onclickHandler;
		status_msg.on = true;
		status_msg.show('Start to fetch photo info, please wait for a few seconds......');
		return;
	    }

	    var i,str,url,count=0,rows,cols;

	    str = GM_getValue('batch_list');
	    if( !str ) {return;}
	    var items = str.split(',');

	    for(var j in photos) if( photos[j].id != undefined ) count++;
	    count = ( items.length<count ) ? items.length : count;
	    if(count >= 36) { rows=6; cols=6;}
	    if(count < 36) { rows=5; cols=5;}
	    if(count < 25) { rows=4; cols=4;}
	    if(count < 16) { rows=3; cols=3;}
	    if(count < 9)  { rows=2; cols=2;}
	    if(count < 4) { alert('At least 4 pics to make a mosaic'); return; }

	    url  = 'http://flagrantdisregard.com/flickr/mosaic.php?layout=tile&kind=urls';
	    url += '&rows=' + rows + '&cols=' + cols;

	    for(i=0; i<items.length && i<rows*cols; i++) {
		if( photos[items[i]] && photos[items[i]].url != undefined )
		    url += '&urls[]=' + photos[items[i]].url;
	    }
	    b_menu.style.display = 'none';
//	    window.open(url,'_blank');
	    document.location = url;
	}
	fd_mosaic.addEventListener('click', fd_mosaic.onclickHandler, true);

	to_top.onclickHandler = function() {

	    str = GM_getValue('batch_list');
	    if( !str ) {return;}
	    if( ! confirm('Warning: Moving to top of the photostream will change the posted date of photos in cart. This action is permanent and can\'t be rollback. Do you want to proceed?') ) return;
	    var i,str,id,data;
	    function pad02d(num) { return ( num < 10 ? '0' + num : num ); }

	    var items = str.split(',');

	    for(i=0; i<items.length; i++) {
		var now = new Date();
		var now_10m = Date.parse(now.toString()) - 10*60*1000;
		var x = new Date(now_10m);
		var now_date = (x.getMonth()+1) + '/' + x.getDate() + '/' + x.getFullYear();
		var now_time = pad02d(x.getHours()) + ':' + pad02d(x.getMinutes()) + ':' + pad02d(x.getSeconds());
// added for debug ......
//		alert(now_date + ' ' + now_time);

		id = items[i];
		data = 'done=1&id=' + id + '&date=' + now_date + '&time=' + now_time;
		GM_xmlhttpRequest({
		    method: 'POST',
		    url: 'http://www.flickr.com/photo_date_posted.gne',
		    headers: {
			'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey/Super Batch Processing in Flickr',
			'Content-Type' : 'application/x-www-form-urlencoded',
		    },
		    data: data,
		    onload: function(responseDetails) {
//			alert( responseDetails.status + ' ' + responseDetails.statusText + '\n\n' +
//			'Feed data:\n' + responseDetails.responseText);
//			var x = _ce('textarea');
//			x.rows = 30;
//			x.cols = 80;
//			x.innerHTML = responseDetails.responseText;
//			document.body.appendChild(x);
		    }
		});
	    }
	    b_menu.style.display = 'none';
	}
	to_top.addEventListener('click', to_top.onclickHandler, true);

	close_menu.onclickHandler = function() {
	    b_menu.style.display = 'none';
	}
	close_menu.addEventListener('click', close_menu.onclickHandler, true);


//	break;
//    }
// }

var imgs = _gt('img');
var re = /http:\/\/static\.flickr\.com\/\d+\/(\d+)_\w+(_[s|t|m|o])?\.jpg/;
var list = new Array();
var photos = new Array();

for(var i=0;i<imgs.length;i++) {
    var ary = re.exec(imgs[i].src);
    if( ary ) {
	var photo_id = '' + ary[1];
	list[photo_id] = new Object();
	imgs[i].info = list[photo_id];
	list[photo_id].photo_id = ary[1];
	list[photo_id].img = imgs[i];
	list[photo_id].src = imgs[i].src;
	list[photo_id].mark = _ce('div');
	list[photo_id].mark.style.zIndex = 30000;
	list[photo_id].mark.style.overflow = 'visible';
	list[photo_id].mark.style.position = 'absolute';
	list[photo_id].mark.style.display = 'none';
	list[photo_id].mark.innerHTML = '<div style="position:relative;left:-20px;width:20px;overflow:visible;background:transparent"><input type="checkbox" id="batch' +list[photo_id].photo_id+ '" value="' + list[photo_id].photo_id + '"></div>';
	if( imgs[i].parentNode.nodeName == 'A' ) var target = imgs[i].parentNode;
	else var target = imgs[i];
	if( target.nextSibling )
	    target.parentNode.insertBefore(list[photo_id].mark, target.nextSibling);
	else
	    target.parentNode.appendChild(list[photo_id].mark);

	var ck = _gi('batch'+list[photo_id].photo_id);
	list[photo_id].checkbox = ck;
	ck.value = list[photo_id].photo_id;
	ck.checked = item_in_cart(ck.value);
	ck.onclickHandler = function() {
	    if( this.checked ) {
		add_to_cart(this.value);
	    } else {
		remove_from_cart(this.value);
	    }
	}
	ck.addEventListener('click', ck.onclickHandler, true);
    }
}

if( keep_checkbox.checked ) show_checkbox.onclickHandler();

document.body.addEventListener('click', 
    function() {
	if( b_menu.style.display == 'inline' ) {
	    b_menu.style.display = 'none';
	    batch.clickat = 'body';
	} else batch.clickat = null;
    }, true);

// get_photo_info();

})();
