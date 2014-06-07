// ==UserScript==
// @name          Quick View of Photo Comments
// @version       1.0
// @description	  Quick View of Photo Comments
// @namespace     http://webdev.yuan.cc/
// @include       http://flickr.com/photos/*
// @include       http://www*.flickr.com/photos/*

//
// by CK (http://flickr.com/photos/ckyuan/)
// 
// ==/UserScript==


if(unsafeWindow) w = unsafeWindow;
else w = window;
global_photos = w.global_photos;
// var nsid = w.global_nsid;

function _gt(e) { return document.getElementsByTagName(e); }
function _gi(e) { return document.getElementById(e); }
function _gc(e) { return w.document.getElementsByClass(e); }
function _ce(e) { return document.createElement(e); }
function _ct(e) { return document.createTextNode(e); }


function grabuserid() {
    text = _gc('Buddy')[0].innerHTML;
    buddyid = 'undefined';
    if (text.indexOf('buddyicon.jpg') != -1) { // no proper icon
	buddiarr = text.split('buddyicon.jpg?');
	if (buddiarr[1] != null) buddyid = (buddiarr[1].split('"'))[0];
    } else {
	buddiarr = text.split('/buddyicons/');
	if (buddiarr[1] != null) buddyid = buddiarr[1].split('.jpg')[0];
    }
    if ((buddyid == 'undefined') || (buddyid == null)) buddyid = (text.split('/'))[2];
    return (buddyid == null) ? 'undefined' : buddyid;
}

var icons = new Array();
var c_list = _gc('Activity');
var photo_url;

for(var i=0; i<c_list.length; i++) {
    link = c_list[i].getElementsByTagName('a')[0];
    if( !link.innerHTML.match(/comment/) ) 
	link = c_list[i].getElementsByTagName('a')[1];
    link.img_m = link.parentNode.parentNode.getElementsByTagName('img')[0].src;
    pid = link.href.split('/')[5];
    link.url = link.href;
    link.href = 'javascript:;';
    link.photo_id = pid;
    link.addEventListener('click', function() {
	photo_url = this.url;
	showComments(this.photo_id,this.img_m);
    }, true);
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


function showComments(id,img) {

    var url = 'http://www.flickr.com/services/rest/?' + sign({
	method:'flickr.photos.comments.getList',
	photo_id: id
    });

    GM_xmlhttpRequest({
	method: 'GET',
	url: url,
	headers: {
		'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey/0.6.4 Quick View of Photo Comments',
		'Accept': 'application/atom+xml,application/xml,text/xml',
	},
	onload: function(responseDetails) {

		var parser = new w.DOMParser();
		var dom = parser.parseFromString(responseDetails.responseText, "application/xml");
		var comments = dom.getElementsByTagName('comment');

		var str = '<img src="'+img+'" style="margin:5px;float:right;"/><br />';
		for(var i=0; i<comments.length; i++) {
			author = comments[i].getAttribute('author');
			authorname = comments[i].getAttribute('authorname');
			text = comments[i].firstChild.data;
			date_create = comments[i].getAttribute('date_create');
			permalink = comments[i].getAttribute('permalink');
			id = comments[i].getAttribute('id');
			if( !icons[author] ) {
				icons[author] = new Object();
				icons[author].id = author;
				icons[author].thumbs = new Array();
			}
			if( !icons[author].thumbs ) {
				icons[author].thumbs = new Array();
			}
			icons[author].thumbs[id] = id;

			str += '<div style="margin:10px;">';
			str += '<div style="margin:4px;width:48px;height:48px;display:inline;">';
			str += '<a href="' +permalink+ '">';
			str += '<img id="'+id+'" src="http://www.flickr.com/images/buddyicon.jpg" width="48" height="48" border="0" align="left" /></a>';
			str += '</div>';
			str += '<div style="font-size:12px">';
			str += '<a href="http://flickr.com/photos/' +author+ '/"><strong>' +authorname+ '</strong></a>: <br />' + text + '<br clear="all" />';
			str += '</div>';
			str += '</div>';
		}
		str += '<p><p>';
		lightBox(str);
		readIcons();
	}
    });
}

function readIcons() {

    for(var i in icons) {
	if( !icons[i].icon ) {
	    var url = 'http://www.flickr.com/services/rest/?' + sign({
		method:'flickr.people.getInfo',
		user_id: i
	    });

	    GM_xmlhttpRequest({
		method: 'GET',
		url: url,
		headers: {
		    'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey/0.6.4 Quick View of Photo Comments',
		    'Accept': 'application/atom+xml,application/xml,text/xml'
		},
		onload: function(responseDetails) {
		    var parser = new w.DOMParser();
		    var dom = parser.parseFromString(responseDetails.responseText, "application/xml");
		    var person = dom.getElementsByTagName('person');
		    if( person.length > 0 ) {
			var nsid = person[0].getAttribute('nsid');
			icons[nsid].iconserver = person[0].getAttribute('iconserver');
			icons[nsid].icon = 'http://static.flickr.com/' +icons[nsid].iconserver+ '/buddyicons/'+nsid+'.jpg'
			for(var j in icons[nsid].thumbs) {
			    _gi(icons[nsid].thumbs[j]).src = icons[nsid].icon;
			}
		    }
		    readIcons();
		    return;
		}
	    });
	    return;
	} else {
	    for(var j in icons[i].thumbs) {
//		GM_log( icons[i].thumbs[j] );
		if( _gi(icons[i].thumbs[j]) )
		_gi(icons[i].thumbs[j]).src = icons[i].icon;
	    }
	}
    }
}

function lightBox(comments) {

    var disabledZone = _ce('div');
    disabledZone.id = 'disabledZone';
    disabledZone.setAttribute('style', 'background-color: #000000; -moz-opacity: 0.7');
    disabledZone.style.position = 'absolute';
    disabledZone.style.zIndex = 2500000;
    disabledZone.style.left = '0px';
    disabledZone.style.top = '0px';
    disabledZone.style.width = '100%';
    disabledZone.style.height = '4000px';
    disabledZone.addEventListener('click', function() {
        document.body.removeChild(_gi('imgZone'));
        document.body.removeChild(this);
	for(var i in icons) delete icons[i].thumbs;
    }, true);
    document.body.appendChild(disabledZone);

    var imgZone = _ce('div');
    imgZone.id = 'imgZone';
    imgZone.style.position = 'fixed';
    imgZone.style.zIndex = 2500001;
    imgZone.style.top = '55px';
    imgZone.style.background = '#ffffff';
    imgZone.style.height = '80%';
    imgZone.style.padding = '0px';
//    imgZone.style.overflow = 'auto';
//    imgZone.style.left = (document.body.clientWidth-875)/2 + 'px';
    imgZone.style.left = '50px';
    var w = document.body.clientWidth -100;
    w = 600;
    imgZone.style.left = (1*document.body.clientWidth-600)/2 + 'px';
    var h = document.body.clientHeight-200;
    html = '<div style="width:'+w+'px;height:95%;text-align:left;padding:5px;overflow:auto;">' + comments + '</div>';
//    imgZone.innerHTML += '<div style="width:'+w+'px;height='+h+'px;text-align:left;padding:5px;overflow:auto;">' + comments + '</div>';
    html += '<div style="position:absolute;left:0px;bottom:0px;text-align:right;margin:0px;padding:4px;background:#ddd;font-size:12px"><span style="float:left"><a href="' +photo_url+ '" target="_blank"><b>Open Photo in new Window</b></a> | <a href="' +photo_url+ '"><b>Open in current window</b></a></span><span style="float:right"><a href="http://webdev.yuan.cc/" target="_blank">Powered by Yuan.CC</a></span></div>';
    imgZone.innerHTML = html;
    document.body.appendChild(imgZone);
}

