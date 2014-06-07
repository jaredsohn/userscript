// ==UserScript==
// @name           g.e-hentai.org downloader and showimage and redirector
// @namespace      http://g.e-hentai.org
// @description    g.e-hentai redirector & showimg & downloader
// @include        http://g.e-hentai.org/*
// @include        http://95.211.99.82/s/*
// ==/UserScript==

    (function()
{
if (window.location.href.indexOf ("g.e-hentai.org") > 0){
 window.location.href = window.location.href.replace ("g.e-hentai.org", "95.211.99.82"); }
redricthref();

var tmp = document.getElementsByTagName('H1')[0];
if (tmp){
var mainimg=getimg();
imgold=mainimg.src;
//getImg(mainimg, mainimg.src);
h=1;
//unix_time=Math.round(new Date().getTime()/1000);
    //xmlcookie=document.cookie;
var div = document.createElement('div');
    div.innerHTML = '<button id="__btn_download__">Download</button>';
    tmp.parentNode.insertBefore(div,tmp.nextSibling.nextSibling.nextSibling);
    var btn = document.getElementById('__btn_download__');
    btn.addEventListener('click',btn_download_click,false);
    

}
}

)();

/*function getImg(img, imgUrl){
	GM_xmlhttpRequest({
			method: "GET",
			url: imgUrl,
overrideMimeType: 'text/plain; charset=x-user-defined',			
onload: function(rsp)

                {
var data = data_string(rsp.responseText);
 var data_url = 'data:' + mime_from_data(data) + ';base64,' + btoa(data); 
img.src=data_url;

//alert (img.src);
				}
	});
}
*/

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
   var re_img = /(.{80,})/;
    var m = re_img.exec(thisLink.src);
 if (m){return thisLink;}
}
}

function redricthref()
{
var re = /g\.e-hentai\.org/ig;
var allLinks, thisLink;
allLinks = document.evaluate(
    '//*[@href]',
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
for (var i = 0; i < allLinks.snapshotLength; i++) {
    thisLink = allLinks.snapshotItem(i);
    // do something with thisLink
if (thisLink.href.indexOf ("g.e-hentai.org") > 0)
         {

   thisLink.href = thisLink.href.replace(re,"95.211.99.82");}
}
}

/*function data_string(data) // Generates the binary data string from character / multibyte data

{

        var data_string='';

       for(var i=0,il=data.length;i<il;i++)

data_string+=String.fromCharCode(data[i].charCodeAt(0)&0xff);

        return data_string;

};


function mime_from_data(data) // Simple function that checks for JPG, GIF and PNG from image data. Otherwise returns false.

{

        if('GIF'==data.substr(0,3))return 'image/gif';

        else if('PNG'==data.substr(1,3))return 'image/png';

        else if('JFIF'==data.substr(6,4))return 'image/jpg';

        return false;

};*/

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
        //alert(m[2]);
    }
   /* var retemp=out.current+1;
    var re_next = new RegExp('<a +href="([^"]*)"[^>]*>[ \t]*<img[^>]+alt="'+retemp);
    m = re_next.exec(html);
    if (m)
    {
        out.next_url = m[1];
    }*/
    var re_img = /<a +href="([^"]*)"><img +src="([^"]{80,})"/;
    m = re_img.exec(html);
    //alert(m[1]);
    if (m)
    {
        out.next_url = m[1];
        out.img_url = m[2];
        //alert(m[1]);
    } //else {out.img_url = imgold;}
	

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
function do_current()
{
    var current_out = unsafeWindow.__currentout__;

    
//Thanks neozone for the code
    if ('img_url' in current_out)
	{
               /* if(current_out.img_url.indexOf ("data:image/") != -1) {current_out.img_url=imgold;
}*/
		if(current_out.current<10)
		append_output('<a href="'+current_out.img_url+'">00'+current_out.current+'</a>  ');
		else if(current_out.current<100)
		append_output('<a href="'+current_out.img_url+'">0'+current_out.current+'</a>  ');
		else
		append_output('<a href="'+current_out.img_url+'">'+current_out.current+'</a>  ');
	}
    //ajax next
    setTimeout(do_next,5000);

}
function do_next()
{
    
    var current_out = unsafeWindow.__currentout__;
    if (current_out.current < current_out.total &&
        'next_url' in current_out)
    {
if (current_out.next_url.indexOf ("g.e-hentai.org") > 0){
 current_out.next_url =current_out.next_url.replace ("g.e-hentai.org", "95.211.99.82"); 
 }
      var url =current_out.next_url;  
       var fetch_current=current_out.current+1;
        set_status('current:'+fetch_current+'/'+current_out.total+'<br/>fetch:'+url);
//check cookie and rewrite cookie 
   /* var re_cookie=/__utmb=([0-9]+)\.([0-9]+).([0-9]+)\.([0-9]{10});/;
    var cookies = re_cookie.exec(xmlcookie);
    if (unix_time-cookies[4]>3600)
    {
    	var cookie4=unix_time;
    	xmlcookie=xmlcookie.replace(cookies[4],cookie4);
    	}
        //alert (xmlcookie);
        var cookie2=cookies[2]-1+h+1;
        var cookie3=cookies[3];
        if (cookie2>99){
        	cookie2=1; 
        	var cookie3=cookies[3]-1+10+1;
        	if(cookie3>90){cookie2=1;cookie3=10;var cookie4=unix_time;
        		xmlcookie=xmlcookie.replace(cookies[4],cookie4);}
        	}
        xmlcookie=xmlcookie.replace("__utmb="+cookies[1]+"."+cookies[2]+"."+cookies[3]+".","__utmb="+cookies[1]+"."+cookie2+"."+cookie3+".");
        //document.cookie=xmlcookie;
        //alert (xmlcookie);*/
        

        function onload(resp)
        {
            if (resp.status!=200){do_error('download error:'+resp.statusText);return;}
            var out = parse_html(resp.responseText);
            //todo::handle parse error
            var items = [];
            for (x in out){items.push(x);}
            if (items.length<4)
            {
                //GM_log('error url:'+resp.finalUrl);
                //GM_log('error html:'+resp.responseText);
                do_error('Parse error:'+resp.responseText);
                return;
            }
            oldurl=unsafeWindow.__currentout__.next_url;
            unsafeWindow.__currentout__ = out;
            do_current();
        }
        GM_xmlhttpRequest({
            method:'GET',
            url:url,
            headers:{
                'User-Agent': 'Mozilla/5.0 (Windows; U; Windows NT 5.1; zh-CN; rv:1.9.1.3) Gecko/20090824 Firefox/3.5.3',
                'Referer':url,
                'Cookie':document.cookie
            },
            onload:onload,
            onerror:do_error
        });
        /*var xmlhttp = new XMLHttpRequest();
        xmlhttp.open("get", url);
        xmlhttp.setRequestHeader('User-Agent','Mozilla/5.0 (Windows; U; Windows NT 5.1; zh-CN; rv:1.9.1.3) Gecko/20090824 Firefox/3.5.3');
        xmlhttp.setRequestHeader('Referer',oldurl);
        xmlhttp.setRequestHeader('Cookie',document.cookie);
        xmlhttp.onreadystatechange = function()
            {
                if(xmlhttp.readyState == 4)
                    onload(xmlhttp);
            };
        xmlhttp.send(null);*/
    }
}
function do_error(reason)
{
    //GM_log('do_error='+reason);
    var html = '<button id="__continue__">Continue</button><br/>';
    var txt = document.createTextNode(reason);
    var div = document.createElement('div');
    div.appendChild(txt);
    var re_warning=/You are opening pages too fast, thus placing a heavy load on the server\. Back down, or your IP address will be automatically banned\./;
    var m;
    m = re_warning.exec(reason);
    if (m){unsafeWindow.__currentout__.next_url=oldurl;
    	unsafeWindow.__currentout__.img_url='';
    	h=0;
    	} else {h=1;}
    set_status(html+div.innerHTML);
    document.getElementById('__continue__').addEventListener('click',function(e){
        set_status('');
        do_next();
    },false)
}
function btn_download_click(e)
{
    document.getElementById('__btn_download__').disabled = true;
    oldurl=document.location.href;
    unsafeWindow.__currentout__ = parse_html(document.documentElement.innerHTML);
    build_ui();
    do_current();
}