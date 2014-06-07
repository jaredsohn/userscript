// ==UserScript==
// @name          Flickr Organize Tools
// @description	  Add 3rd party tools to Flickr Gamma Organize
// @namespace     http://webdev.yuan.cc/
// @include       http://flickr.com/photos/organize/*
// @include       http://www.flickr.com/photos/organize/*
// ==/UserScript==

// Author: .CK at Flickr (http://webdev.yuan.cc/)
// Group: http://flickr.com/groups/flickr_tools/


(function() {

    var lfvr,links,loc,re,res,target;

    function _gt(e) { return document.getElementsByTagName(e); }
    function _gi(e) { return document.getElementById(e); }
    function _ce(e) { return document.createElement(e); }
    function _ct(e) { return document.createTextNode(e); }

    if(unsafeWindow) w = unsafeWindow;
    else w = window;

    var global_nsid = w.global_nsid;
    var photos_url = w.photos_url;
    var pattern = /\/photos\/(\w+)\//;
    var result = pattern.exec(photos_url);
    var username = result[1];

    var batch = new Array();
    var candy_button_tools = 'data:image/gif;base64,R0lGODlhNwAWAIAAAJycnP///yH5BAEAAAEALAAAAAA3ABYAAAJOjI+py+0Po5y02ouz3rxHAIIQ4H0SWT5oEB4ta7wpgq6kDeNLyFu1C4sFRQ7eivIT4o7HHdEnVAJvwGLG9nzVnrOu9wsOi8fksvmMVhQAADs=';
    var candy_button_tools_selected = 'data:image/gif;base64,R0lGODlhNwAWAMQAAPLy8vz9/PP09O3s7e7t7vn5+ff49/j3+Ozt7fn5+uzs7fTz9AAAAPj39+zt7Pb19fz7+/X29vv7+/39/e7u7fDw8N7e3uzs7O7u7urq6v7+/lVVVdbe1+vr6////////yH5BAEAAB8ALAAAAAA3ABYAAAX/4PdxnEWaZnmuaduSqyq/sCWOWK5jRE9QvqBwSOARf5SkUmnjIJ7Qi3Q6cEwvVux1i81yB+DwAIoodc7otHrNbrvbpIx8Tq/b7/g83vzu+/9rJGRPFwtXCgNXiReLXFJgjhcKk5QKZCRDSRubm0ueShufGJ9KOzpBJBWqq6wbrK+vrrCztK8WFgC5ursbupy+m7m9AL+7xsfHJALLzAvOCxsLAtHO0dTQ2NfXzwsM3t8MzOImEeXm5Q8PG+nr7BHrEery6u3o6ffgDPcP5yQG/wAPCDyw4YCBggILIiTIcGDBBgMjHvgGsOK/WwUyakyQIOOGAgk+eiwgkqTJkiU1cKpkwLFlR40kJMicSXODBAgSOM3UmVMmT5pAIQgdinMmiQlIkyINwDTAhKZQo0p1OpWp0qtISWjYyrWr169gw4oNS8KD2bNo06pdy7Yt27Ju48qdqxYu3bt4647Iyxcvhxs0UMRIMbgGi8IzDv/9EAIAOw==';
    var candy_button_tools_hover = 'data:image/gif;base64,R0lGODlhNwAWAMQAAPn5+vT09Pz9/Ozt7fv8+/Tz8+3s7e7t7vj39+/v8PHy8vLx8ff49/Dw8Ozt7O/v7/X19fz7+/X29vv7++7u7f39/d7e3uzs7P7+/urq6u7u7tbe11VVVevr6////////yH5BAEAAB8ALAAAAAA3ABYAAAX/4CZulliWJjmea6q+L4rC1vd5m6fvfO//wKBv88kJj8jk0KhsOpfPaFSEqVqv2Kx2y92KKuAwmEMmi89jtHqtFk3e8Alhzpnb7/c6fs8nxOMiAIKDhByCZYOIAIaLZISPkJEAFhYMlpcMCJocCJybnZqgnJ6goaZlqKGYIhKtrhIQsRwQs7K0sbccsGS4uLC4qLqvriQBxscBBcocBczLzcrQzs/R1dFl1sgiCtzdCgvgHAvi4ePg5hwK5Obn3+fl7wvelA/19g8J+Rz6ZPkJZfr47fNHsGC+Bggb3BNxoKHDAxoiSpxIsaLFixEpaKTwUMSAjyAHXBhpwMBIkiZPXJa8sPKky5YuY14IKaKDzZs4c+rcybMnzxIZggodSrSo0aNIj9b0ybSpU50lQoI86cCBy6pXrWKVeWEr15M0D1jYuBGj2bNoJRIhIWMEW7eU4LaNYWKujLlEPoQAADs=';

//    alert(w.window.organizr_should_be_loaded);

    function add_CandyButton() {

	var style = '.ck_candy_menu {text-align:left; display:none; position:absolute; border:1px solid #D6DED7; background-color:white; width:210px;} ';
	style += '.ck_candy_menu a, .ck_candy_menu a:link {display:block; margin:1px; padding:4px; font:normal 11px arial, sans-serif, Helvetica, sans-serif; text-decoration:none !important; color:black !important;} ';
	style += '.ck_candy_menu a:hover,.ck_candy_menu a:active { color:#FFFFFF !important; background:#0063DC; }';
	addGlobalStyle(style);

	var menu_down = false;
	var oo = _gi('candy_button_o_group');
	var tools = _ce('img');
	tools.id = 'candy_button_o_tools';
//	tools.className = 'candy_button';
	tools.src = candy_button_tools;
	tools.style.cursor = 'pointer';
	tools.clickat = 'body';
	tools.hover = function() {
	    this.src = candy_button_tools_hover;
	}
	tools.hout = function() {
	    this.src = candy_button_tools;
	}
	tools.mousedown = function() {
	    this.src = candy_button_tools_selected;
	}
	tools.click = function() {
	    if( tools.clickat == 'body' ) {
		tools.clickat = 'menu';
		return;
	    }
	    if( menu_down ) {
		menu_down = false;
		tools_div.style.display = 'none';
	    } else {
		menu_down = true;
		tools_div.style.display = 'block';
	    }
	    tools.clickat = 'menu';
	}
	tools.addEventListener('mouseover', tools.hover, true);
	tools.addEventListener('mouseout', tools.hout, true);
	tools.addEventListener('mousedown', tools.mousedown, true);
	tools.addEventListener('click', tools.click, true);

	var tools_div = _ce('div');
	tools_div.id = 'candy_menu_o_tools';
	tools_div.className = 'ck_candy_menu';
	tools_div.style.top = '25px';
	tools_div.style.left = '528px';
	tools_div.innerHTML = '<a href="javascript:;" onclick="album_maker();">Flickr Album Maker</a> <a href="javascript:;" onclick="fd_slide();">fd Slideshow</a> <a href="javascript:;" onclick="fd_mosaic();">fd Mosaic</a>';

	oo.parentNode.insertBefore(tools_div, oo.nextSibling);
	tools_div.parentNode.insertBefore(tools, tools_div);

//	_gi('tabl_mats_div').addEventListener('click',
	document.body.addEventListener('click',
	    function() {
		if( menu_down ) {
		    menu_down = false;
		    tools_div.style.display = 'none';
		    tools.clickat = 'body';
		} else tools.clickat = 'menu';
	    }, true);

    }

    function addGlobalStyle(css) {
	var head, style;
	head = document.getElementsByTagName('head')[0];
	if (!head) { return; }
	style = document.createElement('style');
	style.type = 'text/css';
	style.innerHTML = css;
	head.appendChild(style);
    }

    function batch_list() {

	var batch_div = _gi('batch_photos_div');
	var batch_photos = _gt('div');
	var photo_id = /batch_photo(\d+)/;
	var photo_info = /http:\/\/static.flickr.com\/(\d+)\/(\d+)_([0-9a-zA-Z]+)_s.jpg/;

	for(var i=0; i<batch_photos.length; i++) {
	    a = photo_id.exec( batch_photos[i].id );
	    if( a ) {
//		batch.length = a[1];
		var id = a[1];
		batch[id] = new Object();
		var img = batch_photos[i].getElementsByTagName('img');
		var b = photo_info.exec(img[0].src);
		batch[id].id = id;
		batch[id].server = b[1];
		batch[id].photoid = b[2];
		batch[id].secret = b[3];
		batch[id].url = 'http://www.flickr.com/photos/' + username + '/' + id +'/';
	    }
	}

    }

    function album_maker() {
	batch_list();
	if( batch.length==0 ) {return;}
	var count=0, text = '';

	for(var i in batch ) {
	    text += '<p><a href="' + batch[i].url + '" target="_blank" class="flickrImage">';
	    text += '<img src="http://static.flickr.com/' + batch[i].server + '/' + batch[i].id + '_' + batch[i].secret + '_s.jpg" border="0" class=""></a></p>\n';
	    count++;
	}
	var d = _ce('div'); d.style.display = 'none';
	var f = _ce('form'); f.method = 'post'; f.action = 'http://webdev.yuan.cc/famaker.php'; f.target = '_blank';
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
    w.album_maker = album_maker;
//    album_maker.addEventListener('click', album_maker.onclickHandler, true);

    function fd_slide() {
	var i,str,name,url;

	batch_list();
	if( batch.length==0 ) {return;}

	url  = 'http://flagrantdisregard.com/flickr/slideshow.php?step=2&nextButton=Next&kind=urls';
	url += '&showtitle=My+Slideshow&authorname=' + username;
	var count = 0;
	for(var i in batch ) {
	    if( batch[i] && batch[i].url != undefined ) {
		url += '&image[]=' + batch[i].url;
		count++;
		if( count >= 36 ) break;
	    }
	}
//	document.location = url;
	window.open(url,'_blank');
    }
    w.fd_slide = fd_slide;

    function fd_mosaic() {
	var i,str,url,count=0,rows,cols;

	batch_list();
	if( batch.length==0 ) {return;}

	for(var j in batch) if( batch[j].id != undefined ) count++;
	if(count >= 36) { rows=6; cols=6;}
	if(count < 36) { rows=5; cols=5;}
	if(count < 25) { rows=4; cols=4;}
	if(count < 16) { rows=3; cols=3;}
	if(count < 9)  { rows=2; cols=2;}
	if(count < 4) { alert('At least 4 pics to make a mosaic'); return; }

	url  = 'http://flagrantdisregard.com/flickr/mosaic.php?layout=tile&kind=urls';
	url += '&rows=' + rows + '&cols=' + cols;

	j = 0;
	for(var i in batch) {
	    if( batch[i] && batch[i].url != undefined ) url += '&urls[]=' + batch[i].url;
	    j++;
	    if( j>= rows*cols) break;
	}
//	document.location = url;
	window.open(url,'_blank');
    }
    w.fd_mosaic = fd_mosaic;

    add_CandyButton();
    
})();
