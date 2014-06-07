// ==UserScript==
// @name          Ajax Photo Blogging in Flickr
// @version       0.2
// @description	  Post a story about the photo to your blog and add a description or comment on it automatically.
// @namespace     http://webdev.yuan.cc/
// @include       http://flickr.com/photos/*
// @include       http://www.flickr.com/photos/*

// v0.2 30/10/05
//  1. Support Atom API of Bloggers.com ( now support metaweblog & atom API )
//  2. Adding photo size preview
// v0.1	21/10/05	initial release
//
// Author: .CK ( http://www.flickr.com/photos/ckyuan/ )
// Web site: http://webdev.yuan.cc/
// Features:
//  1. Blogging in Ajax way in background.
//  2. Posting to blog via XMLRPC by GMxmlhttpRequest of greasemonkey.
//  3. Working fine and testing in Movable Type 3.2 now.
//  4. Adding the URL of new post to photo description or comment, depend on if you are the owner of photo or not.
//
// The code of adding comment and description is contributed by steeev in my GMiF project. Thank you.
// ==/UserScript==

(function() {

var re = /http:\/\/(www\.)?flickr\.com\/photos\/[^\/]+\/\d+/;
if( ! re.test(document.location) ) return;

if(unsafeWindow) w = unsafeWindow;
else w = window;
var global_photos = w.global_photos;

var YuanCC = new Object();		// define namespace
var insertPoint;

var js = document.createElement('script');
js.language = 'javascript';
js.src = 'http://webdev.yuan.cc/lib/xmlrpc.js';
document.body.appendChild(js);

YuanCC.sendRequest = function (url,data,method,callback) {

    GM_xmlhttpRequest({
	method: method,
	url: url,
	headers: {
	    'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey MTBlog XMLRPC',
	    'Accept': 'application/atom+xml,application/xml,text/xml',
	    'Content-type': 'text/xml',
	},
	data: data,
	onload: callback,
    });
}

YuanCC.getPhotoInfo = function() {

    for (var x in global_photos) {
	if( !document.getElementById('photoImgDiv'+x) ) continue;
	else {
	    YuanCC.photo_id = x;
            YuanCC.photo = global_photos[x];
	    YuanCC.isOwner = global_photos[x].isOwner;
	    YuanCC.ownersUrl = 'http://www.flickr.com' + global_photos[x].ownersUrl;
            YuanCC.title =  document.getElementById('title_div'+x).innerHTML;
            if( YuanCC.title == undefined ) YuanCC.title = '';
	    if( document.getElementById('description_div'+x) ) YuanCC.desc =  document.getElementById('description_div'+x).innerHTML;
            else YuanCC.desc = '';
            YuanCC.img = 'http://static.flickr.com/'+YuanCC.photo.server+'/'+x+'_'+ YuanCC.photo.secret+'.jpg';
            YuanCC.img_m = 'http://static.flickr.com/'+YuanCC.photo.server+'/'+x+'_'+ YuanCC.photo.secret+'_m.jpg';
            YuanCC.img_t = 'http://static.flickr.com/'+YuanCC.photo.server+'/'+x+'_'+ YuanCC.photo.secret+'_t.jpg';
            YuanCC.img_s = 'http://static.flickr.com/'+YuanCC.photo.server+'/'+x+'_'+ YuanCC.photo.secret+'_s.jpg';
        }
    }
    var el = document.getElementsByTagName('div');
    for(var i=0; i<el.length; i++) {
	if( el[i].className == 'Widget' ) {
	    YuanCC.author = el[i].getElementsByTagName('b')[0].innerHTML;
	}
    }
}

YuanCC.getBlogList = function() {

    url = 'http://www.flickr.com/services/rest/?method=flickr.blogs.getList&api_key=bc60075f4ce963fab3fac473d0741fe8';
    GM_xmlhttpRequest({
	method: 'GET',
	url: url,
	headers: {
	    'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey MTBlog XMLRPC',
	    'Accept': 'application/atom+xml,application/xml,text/xml',
	    'Content-type': 'text/xml',
	},
	onload: function(result) {
//	    if( result.status == 200 ) alert('Post to blog successfully.');
//	    document.body.appendChild(document.createTextNode(result.responseText));
	    if( result.status == 200 ) alert(result.responseText);
	},
    });
}

YuanCC.bloggerData = function(text) {

    var content = '';
    if( blog_size1.checked ) img = YuanCC.img_t;
    if( blog_size2.checked ) img = YuanCC.img_m;
    if( blog_size3.checked ) img = YuanCC.img;

    content += '<div class="blog_photo"><a href="' +document.location+ '"><img src="' + img + '" /></a>';
    if( blog_desc.checked ) content += '<div class="blog_desc">' + YuanCC.desc + '</div>';
    content += '<p class="blog_author">Photographed by <a href="' + YuanCC.ownersUrl + '">' + YuanCC.author + '</a></p>';
    content += '</div>';
    content += '<p class="blog_content">'+ text +'</p>';

    var xml = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>';
    xml += '<entry xmlns="http://purl.org/atom/ns#">';
    xml += '<title mode="escaped" type="text/plain">' + blog_title.value + '</title>';
//    xml += '<issued>2004-04-12T06:07:20Z</issued>';
    xml += '<generator url="http://webdev.yuan.cc">Greasemonkey: Ajax Photo Blogging in Flickr</generator>';
    xml += '<content type="application/xhtml+xml">';
    xml += '<div xmlns="http://www.w3.org/1999/xhtml">' + content + '</div>';
    xml += '</content>';
    xml += '</entry>';
 
    return xml;
}

YuanCC.blogData = function(username,passwd,blogid,text) {

    var content;
    if( blog_size1.checked ) img = YuanCC.img_t;
    if( blog_size2.checked ) img = YuanCC.img_m;
    if( blog_size3.checked ) img = YuanCC.img;

    var obj = new Object();
    obj.title = blog_title.value;
    content = '<![CDATA[ ';
    content += '<div class="blog_photo"><a href="' +document.location+ '"><img src="' + img + '" /></a>';
    if( blog_desc.checked ) content += '<div class="blog_desc">' + YuanCC.desc + '</div>';
    content += '<p class="blog_author">Photographed by <a href="' + YuanCC.ownersUrl + '">' + YuanCC.author + '</a></p>';
    content += '</div>';
    content += '<p class="blog_content">'+ text +'</p>';
    content += ']]>';
    obj.description = content;

    var msg = new XMLRPCMessage("metaWeblog.newPost");
//    var msg = new XMLRPCMessage("blogger.newPost");
    msg.addParameter(blogid);
    msg.addParameter(username);
    msg.addParameter(passwd);
    msg.addParameter(obj);
//    msg.addParameter(content);
    msg.addParameter(true);

    return msg.xml();
}

YuanCC.postData = function(username,passwd,postid) {

    var msg = new XMLRPCMessage("metaWeblog.getPost");
    msg.addParameter(postid);
    msg.addParameter(username);
    msg.addParameter(passwd);
    return msg.xml();
}

YuanCC.addcomment = function (text) {

    var comment = encodeURIComponent(text);

    var str = ''+document.location;
    if( str.match('www.flickr.com') ) www = 'www.';
    var url = '' + document.location;
    var data = 'addcomment=1&message=' + comment + '&submit=POST+COMMENT&magic_cookie='+global_auth_hash;
//    document.body.appendChild(document.createTextNode(data));
    GM_xmlhttpRequest({
      method: 'POST',
      url: url,
      headers: {
        'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
        'Content-type': 'application/x-www-form-urlencoded',
        'Accept': 'application/atom+xml,application/xml,text/xml',
        'Referer': url
      },
      data: data,
      onload: function(responseDetails) {
	blog_indicator.innerHTML = '<span style="color:#2b7dee"><i>Commend added. You need to reload this page to see the comment. Click to post again.</i></span>';
//          if (responseDetails.responseText.match(text))
//              alert('comment added successfully!');
//          else
//              alert('comment add failed!');
      }
    });
}

YuanCC.addtodescription = function(text) {

    var desc_div=eval('description_div'+YuanCC.photo_id);
    desc_div.startEditing();
    var ta = document.getElementsByTagName('textarea');
    for(var i=0;i<ta.length;i++) {
	if( ta[i].getAttribute('name') == 'content' ) textyarea = ta[i];
    }
    if (textyarea.value.length) textyarea.value=textyarea.value + '\n\n' + text;
    else textyarea.value = text;
    textyarea.nextSibling.nextSibling.click();
}

YuanCC.post_callback = function(result) {
    if( result.status == 200 ) {
	blog_waiting.style.display = 'none';
	blog_container.style.display = 'none';
	blog_indicator.style.display = 'block';
	blog_indicator.innerHTML = '<span style="color:#2b7dee"><i>Blogging this photo successfully. Click to post again.</i></span>';
	blog_content.disabled = false;
//	blog_content.value = '';

	var parser = new w.DOMParser();
	var dom = parser.parseFromString(result.responseText, "application/xml");
	var fault = dom.getElementsByTagName('fault');
	if( fault.length > 0 ) {
	    alert('Posting failed, please check your username, password, and XMLRPC endpoint URL');
//	    alert(result.responseText);
//	    document.body.appendChild(document.createTextNode(result.responseText));
	    return;
	}
	var param = dom.getElementsByTagName('string');
	var postid = param.item(0).firstChild.data;
	var url = (GM_getValue('blog_xmlrpc'))? GM_getValue('blog_xmlrpc'):'';
	var username = (GM_getValue('blog_username'))? GM_getValue('blog_username'):'';
	var passwd = (GM_getValue('blog_passwd'))? GM_getValue('blog_passwd'):'';
	var data = YuanCC.postData(username,passwd,postid);
	YuanCC.getpost_callback = function(result) {
	    var parser = new w.DOMParser();
	    var dom = parser.parseFromString(result.responseText, "application/xml");
	    var fault = dom.getElementsByTagName('fault');
	    if( fault.length > 0 ) {
	        alert('Get post info failed, please check your username, password, and XMLRPC endpoint URL');
	        return;
	    }
	    var members = dom.getElementsByTagName('member');
	    for(var i=0;i<members.length;i++) {
		var name = members[i].getElementsByTagName('name');
		if( name.item(0).firstChild.data == 'permaLink' ) 
		    YuanCC.permaLink = members[i].getElementsByTagName('string').item(0).firstChild.data;
	    }
	    var text = 'I post a story about this photo. Please visit my blog "<a href="' + YuanCC.permaLink + '">' + blog_title.value + '</a>"';
	    if( YuanCC.isOwner ) YuanCC.addtodescription(text);
	    else YuanCC.addcomment(text);
	}
	YuanCC.sendRequest(url,data,'post',YuanCC.getpost_callback);
    }
}

YuanCC.post_callback2 = function(result) {
    if( result.status == 200 ) {
	blog_waiting.style.display = 'none';
	blog_container.style.display = 'none';
	blog_indicator.style.display = 'block';
	blog_indicator.innerHTML = '<span style="color:#2b7dee"><i>Blogging this photo successfully. Click to post again.</i></span>';
	blog_content.disabled = false;
//	blog_content.value = '';
//	alert(result.responseText);
    } else {
	blog_waiting.style.display = 'none';
	blog_container.style.display = 'none';
	blog_indicator.style.display = 'block';
	blog_indicator.innerHTML = '<span style="color:#2b7dee"><i>Fail to blog this photo(' +result.statusText+ '). Click to post again.</i></span>';
	blog_content.disabled = false;
    }
}

// main program starts

YuanCC.getPhotoInfo();

var descdiv = document.getElementById('description_div'+YuanCC.photo_id);
var tables = document.getElementsByTagName('table');
for( var t in tables ) {
    if( tables[t].className == 'UnderPhoto' ) insertPoint = tables[t];
}
if(descdiv && descdiv.nextSibling) insertPoint = descdiv.nextSibling;

var blog_div = document.createElement('div');
var blog_this = document.createElement('h3');
blog_div.style.paddingTop = '10px';
// blog_div.style.paddingLeft = '4px';
blog_div.style.paddingBottom = '0px';
blog_div.style.marginBottom = '0px';
blog_this.innerHTML = 'Blogging';
blog_this.setAttribute('style', 'textDecoration:none;display:inline;');

var blog_options = document.createElement('a');
var blog_pref = document.createElement('div');
var blog_metaweblog = document.createElement('input');
var blog_atom = document.createElement('input');
var blog_xmlrpc = document.createElement('input');
var blog_username = document.createElement('input');
var blog_passwd = document.createElement('input');
var blog_id = document.createElement('input');
var blog_save = document.createElement('input');
var blog_send = document.createElement('input');
var blog_cancel = document.createElement('input');
var blog_site = document.createElement('span');
var blog_container = document.createElement('div');
var blog_img = document.createElement('img');
var blog_title = document.createElement('input');
var blog_desc = document.createElement('input');
var blog_size1 = document.createElement('input');
var blog_size2 = document.createElement('input');
var blog_size3 = document.createElement('input');
var blog_content = document.createElement('textarea');
var blog_indicator = document.createElement('div');
var blog_waiting = document.createElement('span');

blog_options.href = 'javascript:;';
blog_options.innerHTML = 'blog settings';
blog_pref.setAttribute('style', 'color:#000;font-size:11px; font-family:Arial, Helvetica, sans-serif;background:#eee;margin:2px;padding:5px;border:1px #888 solid;line-height:24px;');
blog_metaweblog.type = 'radio';
blog_metaweblog.name = 'API';
blog_metaweblog.checked = GM_getValue('blog_metaweblog');
blog_metaweblog.onclickHandler = function() {
    if(this.checked) {
	blog_id.disabled = false;
	blog_username.disabled = false;
	blog_passwd.disabled = false;
    } else {
	blog_id.disabled = true;
	blog_username.disabled = true;
	blog_passwd.disabled = true;
    }
}
blog_metaweblog.addEventListener('click', blog_metaweblog.onclickHandler, true);
blog_atom.type = 'radio';
blog_atom.name = 'API';
blog_atom.checked = GM_getValue('blog_atom');
blog_atom.onclickHandler = function() {
    if(this.checked) {
	blog_id.disabled = true;
	blog_username.disabled = true;
	blog_passwd.disabled = true;
    } else {
	blog_id.disabled = false;
	blog_username.disabled = false;
	blog_passwd.disabled = false;
    }
}
blog_atom.addEventListener('click', blog_atom.onclickHandler, true);
blog_container.setAttribute('style', 'font-size:11px; font-family:Arial, Helvetica, sans-serif;background:#eee;margin:2px;padding:5px;border:1px #888 solid;line-height:24px;');
blog_xmlrpc.type = 'text';
blog_xmlrpc.size = '40';
blog_xmlrpc.style.fontFamily = 'Arial, Helvetica, sans-serif';
blog_username.type = 'text';
blog_username.size = '6';
blog_username.style.fontFamily = 'Arial, Helvetica, sans-serif';
if( GM_getValue('blog_atom') ) blog_username.disabled = true;
blog_passwd.type = 'password';
blog_passwd.size = '10';
if( GM_getValue('blog_atom') ) blog_passwd.disabled = true;
blog_id.type = 'text';
blog_id.size = '1';
blog_id.style.fontFamily = 'Arial, Helvetica, sans-serif';
if( GM_getValue('blog_atom') ) blog_id.disabled = true;
blog_save.type = 'button';
blog_save.value = 'SAVE';
blog_save.className = 'Butt';
blog_save.onclickHandler = function() {
    GM_setValue('blog_atom', blog_atom.checked);
    GM_setValue('blog_metaweblog', blog_metaweblog.checked);
    GM_setValue('blog_xmlrpc', blog_xmlrpc.value);
    GM_setValue('blog_username', blog_username.value);
    GM_setValue('blog_passwd', blog_passwd.value);
    GM_setValue('blog_id', blog_id.value);
    blog_options.onclickHandler2();
}
blog_save.addEventListener('click', blog_save.onclickHandler, true);
blog_send.type = 'button';
blog_send.value = 'SEND';
blog_send.className = 'Butt';
blog_send.onclickHandler = function() {
    if( (blog_metaweblog.checked && (url == '' || username == '' || passwd == '' || blogid == '')) ||
	(blog_atom.checked && url == '') ) {
	alert('Pleaes set your blog preferences before posting.');
	return;
    }
    var url = (GM_getValue('blog_xmlrpc'))? GM_getValue('blog_xmlrpc'):'';
    if( blog_metaweblog.checked ) {
	var username = (GM_getValue('blog_username'))? GM_getValue('blog_username'):'';
	var passwd = (GM_getValue('blog_passwd'))? GM_getValue('blog_passwd'):'';
	var blogid = (GM_getValue('blog_id'))? GM_getValue('blog_id'):'';
	var data = YuanCC.blogData(username,passwd,blogid,blog_content.value);
	YuanCC.sendRequest(url,data,'post',YuanCC.post_callback);
    }
    if( blog_atom.checked ) {
	var data = YuanCC.bloggerData(blog_content.value);
//	alert(data);
	YuanCC.sendRequest(url,data,'post',YuanCC.post_callback2);
    }
    blog_content.disabled = true;
    blog_waiting.style.display = 'inline';
}
blog_send.addEventListener('click', blog_send.onclickHandler, true);

blog_cancel.type = 'button';
blog_cancel.value = 'CANCEL';
blog_cancel.className = 'Butt';
blog_cancel.onclickHandler = function() {
//    blog_content.value = '';
    blog_container.style.display = 'none';
    blog_indicator.style.display = 'block';
}
blog_cancel.addEventListener('click', blog_cancel.onclickHandler, true);
blog_site.innerHTML = 'Visit <a href="http://webdev.yuan.cc/" target="_blank">official site</a> for more info and document.</a>';
blog_site.setAttribute('style', 'family:Verdana, sans-serif;font-size:10px;');

blog_pref.appendChild(document.createTextNode('Blog API Type: '));
blog_pref.appendChild(blog_metaweblog);
blog_pref.appendChild(document.createTextNode('Metaweblog (Movable Type) '));
blog_pref.appendChild(blog_atom);
blog_pref.appendChild(document.createTextNode('ATOM (Blogger) '));
blog_pref.appendChild(document.createElement('br'));
blog_pref.appendChild(document.createTextNode('Blog API URL: '));
blog_pref.appendChild(blog_xmlrpc);
blog_pref.appendChild(document.createElement('br'));
blog_pref.appendChild(document.createTextNode('BlogID: '));
blog_pref.appendChild(blog_id);
blog_pref.appendChild(document.createTextNode(' '));
blog_pref.appendChild(document.createTextNode('Username: '));
blog_pref.appendChild(blog_username);
blog_pref.appendChild(document.createTextNode(' '));
blog_pref.appendChild(document.createTextNode('Password: '));
blog_pref.appendChild(blog_passwd);
blog_pref.appendChild(document.createTextNode(' '));
blog_pref.appendChild(blog_save);
blog_pref.style.display = 'none';

blog_options.onclickHandler1 = function() {
    blog_options.removeEventListener('click', blog_options.onclickHandler1, true);
    blog_xmlrpc.value = (GM_getValue('blog_xmlrpc'))? GM_getValue('blog_xmlrpc'):'';
    blog_username.value = (GM_getValue('blog_username'))? GM_getValue('blog_username'):'';
    blog_passwd.value = (GM_getValue('blog_passwd')) ?GM_getValue('blog_passwd'):'';
    blog_id.value = (GM_getValue('blog_id')) ?GM_getValue('blog_id'):'';
    blog_pref.style.display = 'block';
    blog_options.onclickHandler2 = function() {
	blog_pref.style.display = 'none';
	blog_options.removeEventListener('click', blog_options.onclickHandler2, true);
	blog_options.addEventListener('click', blog_options.onclickHandler1, true);
    }
    blog_options.addEventListener('click', blog_options.onclickHandler2, true);
}
blog_options.addEventListener('click', blog_options.onclickHandler1, true);

blog_indicator.innerHTML = '<span style="color:#888"><i>click here to post to Blog</i></span>';
blog_indicator.style.paddingBottom = '0px';
blog_indicator.style.marginBottom = '0px';
blog_indicator.style.color = '#888';
blog_indicator.onmouseoverHandler = function() {
    blog_indicator.style.backgroundColor = '#ffffd3';
}
blog_indicator.addEventListener('mouseover', blog_indicator.onmouseoverHandler, true);
blog_indicator.onmouseoutHandler = function() {
    blog_indicator.style.backgroundColor = '#ffffff';
}
blog_indicator.addEventListener('mouseout', blog_indicator.onmouseoutHandler, true);
blog_indicator.onclickHandler = function() {
    blog_indicator.style.display = 'none';
    blog_container.style.display = 'block';
//  make_send_to_div('sendToBlog',YuanCC.photo_id );
}
blog_indicator.addEventListener('click', blog_indicator.onclickHandler, true);

blog_img.src = YuanCC.img_m;
blog_title.value = YuanCC.title;
blog_title.type = 'text';
blog_title.size = '50';
blog_title.setAttribute('style', 'margin:2px;margin-top:5px;font:12px,Arial,Helvetica,sans-serif;background:#ffffd3;');
blog_content.setAttribute('style', 'margin:4px;font:12px,Arial,Helvetica,sans-serif;background:#ffffd3;');
blog_content.rows = 4;
blog_content.cols = 80;
// blog_content.value = YuanCC.desc;
blog_desc.type = 'checkbox';
blog_desc.checked = false;
blog_size1.type = 'radio';
blog_size2.type = 'radio';
blog_size3.type = 'radio';
blog_size1.setAttribute('name', 'size');
blog_size2.setAttribute('name', 'size');
blog_size3.setAttribute('name', 'size');
blog_size1.value = 't';
blog_size2.value = 's';
blog_size3.value = 'm';
blog_size2.checked = true;
blog_size1.onclickHandler = function(){ blog_img.src = YuanCC.img_t; }
blog_size2.onclickHandler = function(){ blog_img.src = YuanCC.img_m; }
blog_size3.onclickHandler = function(){ blog_img.src = YuanCC.img; }
blog_size1.addEventListener('click', blog_size1.onclickHandler, true);
blog_size2.addEventListener('click', blog_size2.onclickHandler, true);
blog_size3.addEventListener('click', blog_size3.onclickHandler, true);

blog_waiting.innerHTML = '<img src="http://www.flickr.com/images/pulser2.gif" border="0" style="border:0px;vertical-align:middle;margin:3px" /> Posting this photo to your blog......';
blog_waiting.style.display = 'none';
blog_waiting.style.color = '#800';

blog_container.appendChild(blog_img);
blog_container.appendChild(document.createElement('br'));
blog_container.appendChild(document.createTextNode('Title: '));
blog_container.appendChild(blog_title);
blog_container.appendChild(document.createElement('br'));
blog_container.appendChild(blog_content);
blog_container.appendChild(document.createElement('br'));
blog_container.appendChild(document.createTextNode('Photo Size: '));
blog_container.appendChild(blog_size1);
blog_container.appendChild(document.createTextNode(' Thumb '));
blog_container.appendChild(blog_size2);
blog_container.appendChild(document.createTextNode(' Small '));
blog_container.appendChild(blog_size3);
blog_container.appendChild(document.createTextNode(' Medium '));
blog_container.appendChild(blog_desc);
blog_container.appendChild(document.createTextNode(' Include description'));
blog_container.appendChild(document.createElement('br'));
blog_container.appendChild(blog_send);
blog_container.appendChild(document.createTextNode(' '));
blog_container.appendChild(blog_cancel);
blog_container.appendChild(document.createTextNode(' '));
blog_container.appendChild(blog_site);
blog_container.appendChild(blog_waiting);
blog_container.style.display = 'none';

var breakline = document.createElement('br');
breakline.setAttribute('clear', 'all');
blog_div.appendChild(blog_this);
blog_div.appendChild(document.createTextNode(' '));
blog_div.appendChild(blog_options);
blog_div.appendChild(blog_pref);
blog_div.appendChild(breakline);
blog_div.appendChild(blog_indicator);
blog_div.appendChild(blog_container);
insertPoint.parentNode.insertBefore(blog_div, insertPoint);


})();
