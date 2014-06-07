// ==UserScript==
// @name       g.e-hentai.org downloader plus for chrome
// @namespace  http://g.e-hentai.org
// @version    0.2.2
// @description  g.e-hentai downloader plus for chrome
// @include        http://exhentai.org/s/*
// @include        http://g.e-hentai.org/s/*
// @copyright  2012+, kariball
// ==/UserScript==
var showTitle = '';
function clickLink(objid) {
    var a = document.getElementById(objid);
    var e = document.createEvent('MouseEvents');
    e.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
    a.dispatchEvent(e);
}
function parse_html(html)
{
    var m;
    var out = {};
    //Page 1 / 223
  var re_page = />([0-9]+)+<\/span> \/ <span.*>([0-9]+)<\/span>/
    m = re_page.exec(html);
    if (m)
    {
        out.current = parseInt(m[1]);
        out.total = parseInt(m[2]);
        //alert(m);
    }
    /*
    var retemp=out.current+1;
    var re_next = new RegExp('<a +href="([^"]*)"[^>]*>[ \t]*<img[^>]+alt="'+retemp);
    m = re_next.exec(html);
    
    if (m)
    {
        out.next_url = m[1];
        //alert(m[1]);
    }
    */
    
    //var re_img = /href="([^"]*)"[^>]*>[ \t]*<img +[id="img"]+ +src="([^"]{120,})"/;
    var re_img = /href="([^"]*)"[^>]*>[ \t]*<img[^s]*src="([^"]{120,})"/;
    m = re_img.exec(html);
    
    if (m)
    {
       out.next_url = m[1];
       var imgurl = m[2]
       if (imgurl.indexOf(".php") != -1){
           imgurl = imgurl.replace("amp;","");
       }
       out.img_url = imgurl;
    }
    
    var imgtitle = /<h1>([^>]*)<\/h1>/;
    m = imgtitle.exec(html);
    //alert(m);
    if (m)
    {
       out.title = m[1].replace(".","_")+'_';
       showTitle=m[1];
    }
	
    return out;
}
function parse_html_show(html)
{
    var m;
    var out = {};
    //Page 1 / 223
  var re_page = />([0-9]+)+<\/span> \/ <span.*>([0-9]+)<\/span>/
    m = re_page.exec(html);
    if (m)
    {
        out.current = parseInt(m[1]);
        out.total = parseInt(m[2]);
    }
    var re_img = /href="([^"]*)"[^>]*>[ \t]*<img[^s]*src="([^"]{120,})"/;
    m = re_img.exec(html);
    
    if (m)
    {
       out.next_url = m[1];
       var imgurl = m[2]
       if (imgurl.indexOf(".php") != -1){
           imgurl = imgurl.replace("amp;","");
       }
       out.img_url = imgurl;
    }
    
    var imgtitle = /<h1>([^>]*)<\/h1>/;
    m = imgtitle.exec(html);
    if (m)
    {
       out.title = m[1].replace(".","_")+'_';
        showTitle=m[1];
    }
	
    return out;
}
function build_ui()
{
    var mainimg=getimg();
    var main = mainimg.parentNode;
    var main2 = document.createElement('div');
    main2.innerHTML='<div id="__status__"></div><div id="__output__"></div>';
    main.parentNode.replaceChild(main2,main);
}
function append_output(html)
{
    document.getElementById('__output__').innerHTML += html;
}
function set_status(html)
{
    document.getElementById('__status__').innerHTML = html;
}
function do_current_down()
{
    var current_out = unsafeWindow.__currentout__;
    //Thanks neozone for the code
    if ('img_url' in current_out)
	{
		if(current_out.current<10){
            var filename = '00'+current_out.current+".jpg";
            append_output('<a id="'+filename+'" download="'+current_out.title+filename+'" href="'+current_out.img_url+'">'+filename+'</a>  ');
            clickLink(filename);
        }
		else if(current_out.current<100){
            var filename = '0'+current_out.current+".jpg";
            append_output('<a id="'+filename+'" download="'+current_out.title+filename+'" href="'+current_out.img_url+'">'+filename+'</a>  ');
            clickLink(filename);
        }
		else{
            var filename = current_out.current+".jpg";
            append_output('<a id="'+filename+'" download="'+current_out.title+filename+'" href="'+current_out.img_url+'">'+filename+'</a>  ');
            clickLink(filename);
        }
	}
    //ajax next
    setTimeout(do_next_down,5000);
    
}
function do_current_show()
{
    var current_out = unsafeWindow.__currentout__;
    if ('img_url' in current_out)
	{
            append_output('<img width="33%" src="'+current_out.img_url+'" />');
	}
    //ajax next
    setTimeout(do_next_show,3000);
    
}
function do_current_getlink()
{
    var current_out = unsafeWindow.__currentout__;
    //Thanks neozone for the code
    if ('img_url' in current_out)
	{
		if(current_out.current<10){
            var filename = '00'+current_out.current;
            append_output('<a id="'+filename+'" href="'+current_out.img_url+'">'+filename+'</a>  ');
        }
		else if(current_out.current<100){
            var filename = '0'+current_out.current;
            append_output('<a id="'+filename+'" href="'+current_out.img_url+'">'+filename+'</a>  ');
        }
		else{
            var filename = current_out.current;
            append_output('<a id="'+filename+'" href="'+current_out.img_url+'">'+filename+'</a>  ');
        }
	}
    //ajax next
    setTimeout(do_next_getlink,3000);
    
}
function do_next_down()
{
    var current_out = unsafeWindow.__currentout__;
     
    if (current_out.current < current_out.total &&
        'next_url' in current_out)
    {
        var url = current_out.next_url;
        var fetch_current=current_out.current+1;
        set_status('current:'+fetch_current+'/'+current_out.total+'<br/>fetch:'+url);
        function onload(resp)
        {
            if (resp.status!=200){do_error_down('download error:'+resp.statusText);return;}
            var out = parse_html(resp.responseText);
            //todo::handle parse error
            var items = [];
            for (x in out){items.push(x);}
            if (items.length<4)
            {
                //GM_log('error url:'+resp.finalUrl);
                //GM_log('error html:'+resp.responseText);
                do_error_down('Parse error:'+resp.responseText);
                return;
            }
            oldurl=unsafeWindow.__currentout__.next_url;
            unsafeWindow.__currentout__ = out;
            do_current_down();
        }
        GM_xmlhttpRequest({
            method:'GET',
            url:url,
            headers:{
                'User-Agent':'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_2) AppleWebKit/537.20 (KHTML, like Gecko) Chrome/25.0.1337.0 Safari/537.20',
                'Referer':oldurl,
                'Cookie':document.cookie
            },
            onload:onload,
            onerror:do_error_down
        });
        
    }
    else {
            alert(showTitle);
    }
}
function do_next_show()
{
    var current_out = unsafeWindow.__currentout__;
     
    if (current_out.current < current_out.total && 'next_url' in current_out && current_out.current % 50 != 0)
    {
        var url = current_out.next_url;
        var fetch_current=current_out.current+1;
        set_status('current:'+fetch_current+'/'+current_out.total+'<br/>fetch:'+url);
        function onload(resp)
        {
            if (resp.status!=200){do_error_show('download error:'+resp.statusText);return;}
            var out = parse_html(resp.responseText);
            //todo::handle parse error
            var items = [];
            for (x in out){items.push(x);}
            if (items.length<4)
            {
                //GM_log('error url:'+resp.finalUrl);
                //GM_log('error html:'+resp.responseText);
                do_error_show('Parse error:'+resp.responseText);
                return;
            }
            oldurl=unsafeWindow.__currentout__.next_url;
            unsafeWindow.__currentout__ = out;
            do_current_show();
        }
        GM_xmlhttpRequest({
            method:'GET',
            url:url,
            headers:{
                'User-Agent':'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_2) AppleWebKit/537.20 (KHTML, like Gecko) Chrome/25.0.1337.0 Safari/537.20',
                'Referer':oldurl,
                'Cookie':document.cookie
            },
            onload:onload,
            onerror:do_error_show
        });
        
    }
    else if(current_out.current % 50 == 0){
            alert("50 images!!!! Please Save!");
    }
    else {
            alert(showTitle);
    }
}
function do_next_getlink()
{
    var current_out = unsafeWindow.__currentout__;
     
    if (current_out.current < current_out.total &&
        'next_url' in current_out)
    {
        var url = current_out.next_url;
        var fetch_current=current_out.current+1;
        set_status('current:'+fetch_current+'/'+current_out.total+'<br/>fetch:'+url);
        function onload(resp)
        {
            if (resp.status!=200){do_error_getlink('download error:'+resp.statusText);return;}
            var out = parse_html(resp.responseText);
            //todo::handle parse error
            var items = [];
            for (x in out){items.push(x);}
            if (items.length<4)
            {
                //GM_log('error url:'+resp.finalUrl);
                //GM_log('error html:'+resp.responseText);
                do_error_getlink('Parse error:'+resp.responseText);
                return;
            }
            oldurl=unsafeWindow.__currentout__.next_url;
            unsafeWindow.__currentout__ = out;
            do_current_getlink();
        }
        GM_xmlhttpRequest({
            method:'GET',
            url:url,
            headers:{
                'User-Agent':'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_2) AppleWebKit/537.20 (KHTML, like Gecko) Chrome/25.0.1337.0 Safari/537.20',
                'Referer':oldurl,
                'Cookie':document.cookie
            },
            onload:onload,
            onerror:do_error_getlink
        });
        
    }
    else {
            alert(showTitle);
    }
}
function do_error_down(reason)
{
    //GM_log('do_error='+reason);
    var html = '<button id="__continue__">Continue</button><br/>';
    var txt = document.createTextNode(reason);
    var div = document.createElement('div');
    div.appendChild(txt);
    set_status(html+div.innerHTML);
    document.getElementById('__continue__').addEventListener('click',function(e){
        set_status('');
        do_next_down();
    },false)
}
function do_error_show(reason)
{
    //GM_log('do_error='+reason);
    var html = '<button id="__continue__">Continue</button><br/>';
    var txt = document.createTextNode(reason);
    var div = document.createElement('div');
    div.appendChild(txt);
    set_status(html+div.innerHTML);
    document.getElementById('__continue__').addEventListener('click',function(e){
        set_status('');
        do_next_show();
    },false)
}
function do_error_getlink(reason)
{
    //GM_log('do_error='+reason);
    var html = '<button id="__continue__">Continue</button><br/>';
    var txt = document.createTextNode(reason);
    var div = document.createElement('div');
    div.appendChild(txt);
    set_status(html+div.innerHTML);
    document.getElementById('__continue__').addEventListener('click',function(e){
        set_status('');
        do_next_getlink();
    },false)
}
function btn_download_click(e)
{
    document.getElementById('__btn_download__').disabled = true;
    oldurl=document.location.href;
    unsafeWindow.__currentout__ = parse_html(document.documentElement.innerHTML);
    build_ui();
    do_current_down();
}
function btn_show_click(e)
{
    var div = document.getElementById('i1');
    div.style.width = "99%";
    div.style.maxWidth = "99%";
    document.getElementById('__btn_showimg__').disabled = true;
    oldurl=document.location.href;
    unsafeWindow.__currentout__ = parse_html_show(document.documentElement.innerHTML);
    build_ui();
    do_current_show();
}
function btn_getlink_click(e)
{
    document.getElementById('__btn_showimg__').disabled = true;
    oldurl=document.location.href;
    unsafeWindow.__currentout__ = parse_html(document.documentElement.innerHTML);
    build_ui();
    do_current_getlink();
}
var tmp = document.getElementsByTagName('H1')[0];
if (tmp)
{
    var div = document.createElement('div');
    div.innerHTML = '<button id="__btn_getlink__">GetLink</button><button id="__btn_showimg__">Show</button><button id="__btn_download__">Download</button>';
 	tmp.parentNode.insertBefore(div,tmp.nextSibling.nextSibling.nextSibling);
    var btn = document.getElementById('__btn_download__');
    btn.addEventListener('click',btn_download_click,false);
    var btnshow = document.getElementById('__btn_showimg__');
    btnshow.addEventListener('click',btn_show_click,false);
    var btngetlink = document.getElementById('__btn_getlink__');
    btngetlink.addEventListener('click',btn_getlink_click,false);   
}
function getimg()
{
	var allLinks, thisLink;
	allLinks = document.evaluate(
    	'//img',
    	document,
    	null,
    	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    	null);
	for (var i = 0; i < allLinks.snapshotLength; i++) {
    	thisLink = allLinks.snapshotItem(i);
    	// do something with thisLink  
    	var re_img = /(.{120,})/;
    	var m = re_img.exec(thisLink.src);
 		if (m){return thisLink;}
	}
}