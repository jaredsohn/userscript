// ==UserScript==
// @name           ImagePreview
// @namespace      ImagePreview
// @include        *
// @exclude	       https://cacoo.com/*
// @exclude	       http://192.168.10.*/*
// @exclude	       http://www.freedl.org/*
// @version        0.0.9
// ==/UserScript==

//--------------------------------------------------------------------------------
var hosts=[    
    {t:HTMLAnchorElement,auto:false,m:null,r:/edgesuite\.net\/.+\.(jpe?g)$/,get:nextmedia}, //nextmedia.com
    {t:HTMLAnchorElement,auto:false,m:null,r:/ytimg\.com\/.+([A-Za-z0-9]+)\/.+\.(jpe?g)$/,get:get_src}, //youtube.com
    {t:HTMLAnchorElement,auto:false,m:null,r:null,get:wretch}, //wretch.cc
    {t:HTMLAnchorElement,auto:false,m:null,r:null,get:xuite}, //photo.xuite.net
    {t:HTMLAnchorElement,auto:true ,m:null,r:null,get:mrjh}, //mrjh.org
    {t:HTMLAnchorElement,auto:true ,m:null,r:null,get:imagezilla}, //imagezilla.net
    {t:HTMLAnchorElement,auto:true ,m:null,r:null,get:imgchili}, //imgchili.com
    {t:HTMLAnchorElement,auto:true ,m:null,r:null,get:imagetwist}, //imagetwist.com
    {t:HTMLAnchorElement,auto:true ,m:null,r:null,get:imgiga}, //imgiga.com
	{t:HTMLAnchorElement,auto:true ,m:null,r:null,get:imgkitty}, //imgkitty.com
    {t:HTMLAnchorElement,auto:true ,m:null,r:null,get:turboimagehost}, //postimage.org ,turboimagehost.com  
    {t:HTMLAnchorElement,auto:true ,m:null,r:null,get:imageporter}, //piclambo.net ,yankoimages.net ,imagedax.net ,pictureturn.net ,imageporter.com,imagedunk.com,http://picleet.com,picturedip.com
    {t:HTMLAnchorElement,auto:true ,m:/imagehyper\.com\/img\.php/,r:/http:\/\/.+\.imagehyper.com\/img\/[0-9|a-z|\-]+\/.+\.(jpe?g|png)/,get:getimgformpage}, //imagehyper.com
    {t:HTMLAnchorElement,auto:true ,m:/imagesnake\.com\/img\//,r:/http:\/\/.+\.imagesnake.com\/.+\.(jpe?g|png)\?id=[0-9|a-z]+/,get:getimgformpage}, //imagesnake.com 
    {t:HTMLAnchorElement,auto:false,m:null,r:/\.(bmp|gif|jpe?g|png)$/i,get:get_href},//all
];

var history={page_url:null,page_data:null,img_url:null,img_data:null};

//--------------------------------------------------------------------------------
//helper functions

function clog(string)
{
    console.log(string);
}

//get position
function getpos(pos){

    var scrollx, scrolly;
    if ( self.pageYOffset ) {
            scrollx = self.pageXOffset;
            scrolly = self.pageYOffset;
    } else if ( document.documentElement && document.documentElement.scrollTop ) {
            scrollx = document.documentElement.scrollLeft;
            scrolly = document.documentElement.scrollTop;
    } else if ( document.body ) {
            scrollx = document.body.scrollLeft;
            scrolly = document.body.scrollTop;
    }

    var cw, ch;
    if ( self.innerHeight ) {
            cw = self.innerWidth;
            ch = self.innerHeight;
    } else if ( document.documentElement && document.documentElement.clientHeight ) {
            cw = document.documentElement.clientWidth;
            ch = document.documentElement.clientHeight;
    } else if ( document.body ) {
            cw = document.body.clientWidth;
            ch = document.body.clientHeight;
    }
    
    if(pos.x==-1 && pos.y==-1)
    {
        //center of screen
        pos.x=scrollx+(cw - pos.w)/2;
        pos.y=scrolly+(ch - pos.h)/2;
    }
    else
    {
        var w,h;
        var sx=1,sy=1;

        if(pos.x>(cw/2))
        {
            w=pos.x;sx=-1;
        }
        else
            w=cw-pos.x;
            
        if(pos.y>(ch/2))
        {
            h=pos.y;sy=-1;
        }
        else
            h=ch-pos.y;

        if(pos.w>w || pos.h>h)
        {
            if( (pos.w/w)>(pos.h/h) )
            {
                pos.w=w;
                pos.h=(pos.h*w)/pos.w;
            }
            else
            {
                pos.w=(pos.w*h)/pos.h;
                pos.h=h;
            }
        }

        pos.x=window.scrollX+(sx>0?(pos.x+10):(pos.x-pos.w-10));
        pos.y=window.scrollY+(sy>0?(pos.y+10):(pos.y-pos.h-10));
    }
    return pos;
}

function getpage (url) {  // synchronous request

    if(url==history.page_url)
        return history.page_data;

    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, false);  
    xhr.send(null);

    history.page_url=url;
    history.page_data=xhr.responseText;
    return xhr.responseText;
}

function getpage2(link,refer,func_cb){

    if(link==history.page_url)
    {
        func_cb(history.page_data);
        return;
    }

    var req = GM_xmlhttpRequest({
        method:'GET',
        url:link,
        headers:{'Referer' : refer},
        onload: function(req) {
            history.page_url=link;
            history.page_data=req.responseText;
            func_cb(req.responseText);
        },
        onerror: function(req){
            func_cb('error');
        }
    });
}

function getimage(url, referer,func_cb,autoload) {

    if(url==history.img_url)
    {
        func_cb(history.img_data);
        return;
    }

	var req = GM_xmlhttpRequest({
		method: 'GET',
		url: url,
		overrideMimeType:'text/plain; charset=x-user-defined',
		headers: {'Accept':'image/png,image/*;q=0.8,*/*;q=0.5','Referer':referer},
        onload: function(req) {
            var d = '';
            for(var i = 0; i < req.responseText.length; i++) {
                d += String.fromCharCode(req.responseText.charCodeAt(i) & 0xff);
            }
            b64='data:;base64,' + window.btoa(d);
            history.img_url=url;
            history.img_data=b64;
            func_cb(b64,autoload);
        },
        onerror: function(req){
            func_cb('error',autoload);
        }
	});
}

function func_cb_img(base64,autoload)
{
    if(autoload)
        return;
    if(base64=='error')
        base64=previewimg.data_errimg;

    previewimg.preloadimg(previewimg,base64);
}

//--------------------------------------------------------------------------------
//hosts
function get_href(element){
    if(element.href)
        return element.href;
    return null;
}

function get_src(element){
    
    result=element.getElementsByTagName("IMG");
    for(i=0;i<result.length;i++)
    {
        if(result[i].src)
            return result[i].src;
    }
    return null;
}

function getimgformpage(element,m,r){

    if (!element.href.match(m))
        return null;
	var autoload=element.autoload;
    function func_cb(page){
        if(page=='error'){
            func_cb_img('error',autoload);
            return;
        }

        var result=page.match(r);
        if(result)
            getimage(result[0],element.href,func_cb_img,autoload);
        else
            func_cb_img('error',autoload);
    }
    getpage2(element.href,element.href,func_cb);
    return 'processing';
}

function nextmedia(element){

    if (element.href.match(/nextmedia\.com\//) ||
		element.href.match(/appledaily.com.tw\//))
        return get_src(element);

    if (element.href.match(/edgesuite\.net\//))
        return element.href;

    return null;
}

function wretch(element){

    if (!document.location.href.match('wretch.cc/album/album.php'))
        return;

    var r=/http:\/\/.+\.yimg\.com\/.+thumbs\/t[0-9]+\.jpg/;

    if(element.firstChild instanceof HTMLImageElement && element.firstChild.src)
    {
        var thumbnail=r.exec(element.firstChild.src);
        var newlink = thumbnail[0].replace(/\/thumbs\/t?/, '/');
        var page=getpage(element.href);
        var start=page.indexOf(newlink);
        var end=page.indexOf('\'',start);
        newlink=page.slice(start,end);

        return newlink;
    }
    return null;
}

function xuite(element){

    if (!document.location.href.match(/photo\.xuite\.net\/(.+)\/([0-9]+)\*?[0-9]*$/))
        return null;

    if(element.parentNode.className.match('photo_item') && element.firstChild instanceof HTMLImageElement && element.firstChild.src)
        return element.firstChild.src.replace('_c', '_l');

    if(element.parentNode.className.match('photo_info_title'))
        return 'pass';

    return null;
}

function mrjh(element){

    if (!element.href.match(/mrjh\.org\/gallery\.php\?entry=/))
        return null;

    var result = element.href.split(/http:\/\/www\.mrjh\.org\/gallery\.php\?entry=/);
	var autoload=element.autoload;

    //clog('mrjh:http://www.mrjh.org/'+result[1]);
    getimage('http://www.mrjh.org/'+result[1],element.href,func_cb_img,autoload);
    
    return 'processing';
}

function imgchili(element){

    if (!element.href.match(/imgchili\.com\/show\/[0-9]+\/.+\.(jpe?g|png)/))
        return null;

    var decnt=3;
    var img=null;
    var e=element.firstChild;
    while(e && decnt>0)
    {
        if(e && e instanceof HTMLImageElement && e.src)
        {
            img=e;
            break;
        }
        e=e.firstChild;
        decnt--;
    }
    var autoload=element.autoload;
    if(img)
    {
        r1=img.src.split('/');
		r2=element.href.split("http:\/\/imgchili\.com\/show");
		
        result='http://i'+r1[2].substr(1)+r2[1];
        getimage(result,element.href,func_cb_img,autoload)
    }
    else
	{
		getimgformpage(element,/imgchili\.com\/show\/[0-9]+\/.+\.(jpe?g|png)/,/http:\/\/i[0-9]\.imgchili\.com\/[0-9]+\/[a-zA-Z0-9_]+\.(jpe?g|png)/);
    }
    
    return 'processing';
}

//http://www.imagekitty.com/0eib1yo870xj/EBOD-201B-01.jpg.html
//http://www.imagekitty.com/i/00001/0eib1yo870xj.jpg
function imgkitty(element){

    if (!element.href.match(/imagekitty\.com\/[0-9a-zA-Z]+\/.+\.(jpe?g|png)/))
        return null;

	var r1=element.href.split('/');
	var code=r1[3];
	var url='http://img4.imagekitty.com/i/00002/'+code+'.jpg';
	var autoload=element.autoload;
	getimage(url,element.href,func_cb_img,autoload);

	function func_cb(page)
    {
        if(page=='error')
        {
            func_cb_img(page,autoload);
            return;
        }

        var r=new RegExp("http:\/\/.+\.imagekitty\.com\/i\/[0-9]+\/"+code+"\.(jpe?g|png)");
        var result=r.exec(page);

        if(result)
            getimage(result[0],element.href,func_cb_img,autoload);
        else
            func_cb_img('error',autoload);
    }

    getpage2(element.href,element.href,func_cb);
	
    return 'processing';
}

function imagezilla(element){

    if (!element.href.match(/imagezilla\.net\/show/))
        return null;

    var result = element.href.replace('show','images');
	var autoload=element.autoload;
    getimage(result,element.href,func_cb_img,autoload);
    return 'processing';
}

function imageporter(element){

    if ( !element.href.match(/piclambo\.net\/.+\/.+\.(jpe?g|png)\.html/) &&
		 !element.href.match(/yankoimages\.net\/.+\/.+\.(jpe?g|png)\.html/) &&
		 !element.href.match(/imagedax\.net\/.+\/.+\.(jpe?g|png)\.html/) && 
		 !element.href.match(/pictureturn\.com\/.+\/.+\.(jpe?g|png)\.html/) &&
		 !element.href.match(/imagedunk\.com\/.+\/.+\.(jpe?g|png)\.html/) &&
		 !element.href.match(/picleet\.com\/.+\/.+\.(jpe?g|png)\.html/) &&
		 !element.href.match(/picturedip\.com\/.+\/.+\.(jpe?g|png)\.html/) &&
		 !element.href.match(/imageporter\.com\/.+\/.+\.(jpe?g|png)\.html/) )
        return null;

    var result_array = element.href.split('/');
    var code=result_array[3];

    if(code==null || !code.length)
        return null;
    var autoload=element.autoload;
    function func_cb(page)
    {
        if(page=='error')
        {
            func_cb_img('error',autoload);
            return;
        }

        var r=new RegExp("http:\/\/(.+)\.imageporter\.com\/(.+)\/"+code+"\.(jpe?g|png)");
        var result=r.exec(page);

        if(result)
            getimage(result[0],element.href,func_cb_img,autoload);
        else
            func_cb_img('error',autoload);
    }

    getpage2(element.href,'http://www.piclambo\.net/',func_cb);
    
    return 'processing';
}

function turboimagehost(element){

    if (!element.href.match(/postimage\.org\/image\//) &&
        !element.href.match(/turboimagehost\.com\/p(.+)\.html/))
        return null;

    var src=get_src(element);
    var site=src?src.split('/')[2]:null;
	var autoload=element.autoload;
    if(site==null)
        return null;

    function func_cb(page)
    {
        if(page=='error')
        {
            func_cb_img(page,autoload);
            return;
        }

        clog("site:"+site);
        var r=new RegExp("http:\/\/"+site+"\/(.+)\.(jpe?g|png)");
        var result=r.exec(page);

        if(result)
            getimage(result[0],element.href,func_cb_img,autoload);
        else
            func_cb_img('error',autoload);
    }

    getpage2(element.href,element.href,func_cb);

    return 'processing';
}

function imagetwist(element){

    if (!element.href.match(/imagetwist.com\/.+\.(jpe?g|png).html/))
        return null;
        
    var img_src=get_src(element);
    var autoload=element.autoload;
    if(img_src && img_src.match(/imagetwist.com\/th\/.+\.(jpe?g|png)/))
    {
        result=img_src.replace('imagetwist.com/th/','imagetwist.com/i/');
        if(result)
        {
            clog('imagetwist:'+result);
            getimage(result,element.href,func_cb_img,autoload)
        }
        else
            return null;
    }
    else
    {
        return getimgformpage(element,/imagetwist.com\/.+\.(jpe?g|png).html/,/http:\/\/img[0-9].imagetwist.com\/i\/[0-9]+\/[A-Za-z0-9_]+\.(jpe?g|png)/);
    }
    
    return 'processing';
}

function imgiga(element){

    if (!element.href.match(/imgiga.com\/img\.php/))
        return null;
        
    var base=element.href.match(/http:\/\/[a-z0-9]+\.imgiga\.com\//);
	var autoload=element.autoload;
    function func_cb(page)
    {
        if(page=='error')
        {
            func_cb_img('error',autoload);
            return;
        }

        //clog("imgiga page:"+page);
        var result=page.match(/http:\/\/[0-9\.]+\/image\/[0-9\/]+\.(jpe?g|png)\/[a-z0-9\/]+/);
        clog("imgiga 2:"+result[0]);
        if(result)
            getimage(result[0],element.href,func_cb_img,autoload);
        else
            func_cb_img('error',autoload);
    }

    function func_cb1(page)
    {
        if(page=='error')
        {
            func_cb_img('error',autoload);
            return;
        }

        var nextpage=page.match(/imgiga\/showimg\.php\?id=[0-9_]+&v=[0-9_]+&ru=/);
        clog("imgiga 1:"+base+nextpage);
        if(nextpage)
            getpage2(base+nextpage,element.href,func_cb);
        else
            func_cb_img('error',autoload);
    }

    
    getpage2(element.href,element.href,func_cb1);
    
    return 'processing';
}
//--------------------------------------------------------------------------------
//main class
var previewimg = {
    //members
    data_errimg:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAnRJREFUeNpsU01ME0EUfjuzu2BKlraGGEqlNW2MqMSiXtBEuZjQgxdIBBNJTAwXuUgiXjxojEcT40E9qAe9SC+CXDh6QAN6IWKKyo9iSISmP2CBtLsz3fXN0i4b2pdMduZ973vz3vdmJcuyYL/dlmWvn5AunyzHQJIgw9jUmmnOPuM8tz9WcicYQeJxTXt8NBC4ftjvB0WWARBnuFZzOVjIZp9+SqXuveQ8W5XgrqLEzrW0jLW3toZZOg16NgsmYyCVA6mqAvV6YcE0k69WVi69Y2zNSTCMN19obp7tCAbD/5aWbKJzg7tcsSiFeVVNvk+nu95yniECiHo8t06GQuHs8jI09PRAx+YmeLq7gSMmUol9DH1aXx8YpRIcKRZPtNXV3XEqmIhENkKK4t1eX4fzGFixH/399vfY6Kjjm8Y2RCXzhvH3RqEQJUOyfPFQY6M3j30Lsb6VSRWim5xEjJdFPUhpoJfSs0QjRCKcQxGXKDc1OQlfXUkqJnwCY+W2FByvCdAk63jQUTTmEoxDtZXKxIqYogoxP5IzzT+ZQmGvNBTsjKvsip1Gnz8ed4TNYexPHKkt4hOf73ewVAqLwN58fk8wVF1YZyLh+MY1bbclw1i8r+un7DEu7uw82DJNO/PM4KAdMIXkVexZrI/lRF8QEzEbGDvH+SO8vCANKYoNNhDypk1RBqgk1XxAFRNtftb1ieeMXRHyuTEyrKqvI7J8zUNITfIWkucMY/wFYwN43LafuAu3Oikd+875tGFZTTidqFC+gKQMvr5fnH+YYWwkwflDdBehlmEFcFX8gbsXH7isqqGb9fXtuBfK0TilVZz/AgwAM0Qm2/mw9RoAAAAASUVORK5CYII=",
    data_loadingimg:"data:image/gif;base64,R0lGODlhEAAQALMMAKqooJGOhp2bk7e1rZ2bkre1rJCPhqqon8PBudDOxXd1bISCef///wAAAAAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh+QQFAAAMACwAAAAAEAAQAAAET5DJyYyhmAZ7sxQEs1nMsmACGJKmSaVEOLXnK1PuBADepCiMg/DQ+/2GRI8RKOxJfpTCIJNIYArS6aRajWYZCASDa41Ow+Fx2YMWOyfpTAQAIfkEBQAADAAsAAAAABAAEAAABE6QyckEoZgKe7MEQMUxhoEd6FFdQWlOqTq15SlT9VQM3rQsjMKO5/n9hANixgjc9SQ/CgKRUSgw0ynFapVmGYkEg3v1gsPibg8tfk7CnggAIfkEBQAADAAsAAAAABAAEAAABE2QycnOoZjaA/IsRWV1goCBoMiUJTW8A0XMBPZmM4Ug3hQEjN2uZygahDyP0RBMEpmTRCKzWGCkUkq1SsFOFQrG1tr9gsPc3jnco4A9EQAh+QQFAAAMACwAAAAAEAAQAAAETpDJyUqhmFqbJ0LMIA7McWDfF5LmAVApOLUvLFMmlSTdJAiM3a73+wl5HYKSEET2lBSFIhMIYKRSimFriGIZiwWD2/WCw+Jt7xxeU9qZCAAh+QQFAAAMACwAAAAAEAAQAAAETZDJyRCimFqbZ0rVxgwF9n3hSJbeSQ2rCWIkpSjddBzMfee7nQ/XCfJ+OQYAQFksMgQBxumkEKLSCfVpMDCugqyW2w18xZmuwZycdDsRACH5BAUAAAwALAAAAAAQABAAAARNkMnJUqKYWpunUtXGIAj2feFIlt5JrWybkdSydNNQMLaND7pC79YBFnY+HENHMRgyhwPGaQhQotGm00oQMLBSLYPQ9QIASrLAq5x0OxEAIfkEBQAADAAsAAAAABAAEAAABE2QycmUopham+da1cYkCfZ94UiW3kmtbJuRlGF0E4Iwto3rut6tA9wFAjiJjkIgZAYDTLNJgUIpgqyAcTgwCuACJssAdL3gpLmbpLAzEQA7",
    data_empty:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAadEVYdFNvZnR3YXJlAFBhaW50Lk5FVCB2My41LjEwMPRyoQAAACBJREFUOE9j+P//PwMlmCLNIItHDRgNg9F0AMmEA58XAMWt/R/F69ERAAAAAElFTkSuQmCC",
    popup_style:
    "position:absolute;display:none;z-index:5000;background-color:black;",
    img:{url:'',w:0,h:0},
    popupimg:null,
    cur_x:0,
    cur_y:0,

    //methods
    init:null,
    uninit:null,
    mouseover:null,
    mousemove:null,
    mouseout:null,
    preloadimg:null,
    popupimg_onclk:null,
    hidepopup:null,
    showimg:null,
    fullscreen:null,
    setloading:null,
}

previewimg.loading=function(_i,show){

    if(show)
    {
        var pos=getpos({x:_i.cur_x,y:_i.cur_y,w:16,h:16});
        _i.popupimg.style.display = "none";
        _i.popupimg.src=_i.data_empty;
        _i.popupimg.style.left = pos.x.toString() + 'px';
        _i.popupimg.style.top  = pos.y.toString() + 'px';
        _i.popupimg.style.width = '16px';
        _i.popupimg.style.height= '16px';
        _i.popupimg.src=_i.data_loadingimg;
        _i.popupimg.style.display = "inline";
    }
    else
        _i.popupimg.style.display = "none";
}

previewimg.init=function(_i){
   
    //set loading icon.
    pos=getpos({x:-1,y:-1,w:16,h:16});
    _i.popupimg=document.createElement("img");
    _i.popupimg.style.cssText = _i.popup_style;    
    _i.popupimg.style.left = pos.x.toString() + 'px';
    _i.popupimg.style.top  = pos.y.toString() + 'px';
    _i.popupimg.style.width = '16px';
    _i.popupimg.style.height= '16px';
    _i.popupimg.style.display = "none";
    _i.popupimg.setAttribute('src', _i.data_loadingimg);
    _i.popupimg.imgflag=false;
    document.body.appendChild(_i.popupimg);

    _i.hidepopup=function(e){
        _i.popupimg.style.width = '16px';
        _i.popupimg.style.height= '16px';
        _i.popupimg.style.display = "none";
        keyevent.fi_flag=0;
    }
    
    _i.popupimg.addEventListener('click',_i.hidepopup,false);

    _i.mouseover=function(e){

        var element = e.target;
        var target  = null;
        
        if(!keyevent.sw_flag)
            return;

        function check(host) {            

            //nodeType==Element
            if (element.nodeType == 1 && element instanceof host.t)
                    target=element;

            var parent = element.parentNode;
            var decnt=3;
            while(parent && decnt>0 && target == null)
            {
                //clog("parent.nodeType:"+parent.nodeType+" parent:"+parent);
                if(target == null && parent.nodeType == 1 && parent instanceof host.t)
                {
                    target=parent;
                    break;
                }
                parent=parent.parentNode;
                decnt--;
            }

            if(target){
                var realLink= (host.m && host.r)?host.get(target,host.m,host.r):host.get(target);
                if(realLink && (host.r==null?0:((host.r && host.m)?0:realLink.search(host.r)))>=0){
                    //clog("match");
                    //mouse position
                    _i.cur_x=e.clientX;
                    _i.cur_y=e.clientY;
                    if(realLink=='pass')//do not thing
                        return true;
                    else if(realLink=='processing')//async call,wait result
                        _i.loading(_i,true);
                    else
                        _i.preloadimg(_i,realLink);
                    return true;
                }
            }
            return false;
        }

        hosts.some(check);
    }
    
    _i.mouseout=function(e){
        if(keyevent.fi_flag==0)
        {
            //clog("mouseout hide");
            _i.hidepopup(e);
        }
        else
        {
            //clog("mouseout nohide");
        }
    }

	if(document.location.href.match(/plurk.com/))
	{
		window.onmousemove = _i.mouseover;
		window.onmouseout = _i.mouseout;
	}
	else
	{
		document.addEventListener('mouseover', _i.mouseover, false);
		document.addEventListener('mouseout', _i.mouseout, false);
	}

    if (!document.location.href.match(/twed2k.org/))
        return null;
		
    anchors=document.getElementsByTagName("A");
    function autocheck(host)
    {
        var result=null;
        if(!host.auto)
            return;
        for(i=0;i<anchors.length;i++)
        {
            anchors[i].autoload=true;
            if(host.m && host.r)
                result=host.get(anchors[i],host.m,host.r);
            else 
                result=host.get(anchors[i]);
            anchors[i].autoload=false;

            if(result)
            {
				clog("auto:"+anchors[i].href);
                anchors[i].style.borderBottom="2px solid #FF0000";
                return;
            }
        }
    }
    hosts.some(autocheck);
}

previewimg.uninit=function(_i){

    document.removeEventListener('mouseover', _i.mouseover, false);
    document.removeEventListener('mouseout', _i.mouseout, false);
}

//load image and show it
previewimg.preloadimg=function(_i,link){  

    //show image
    showimg=function(){
        if(!_i.popupimg.imgflag)//the image still loading
            return;
        pos=getpos({x:_i.cur_x,y:_i.cur_y,w:_i.img.w,h:_i.img.h});
        //_i.popupimg.style.display = "none";
        _i.popupimg.src=_i.img.url;
        _i.popupimg.style.left = pos.x.toString() + 'px';
        _i.popupimg.style.top  = pos.y.toString() + 'px';
        _i.popupimg.style.width = pos.w.toString() + 'px';//'auto';
        _i.popupimg.style.height= pos.h.toString() + 'px';//'auto';        
        _i.popupimg.style.display = "inline";
    }

    if(_i.img.url!=link)//it's a new link
    {
        _i.img.url=link;
        _i.popupimg.imgflag=false;//the image is loading,don't show it

        _i.loading(_i,true);
        //open a imgae
        var tmpimg=new Image();
        tmpimg.addEventListener('load' ,function(e){
            //image loaded
            _i.popupimg.style.display = "none";
            _i.popupimg.src=_i.data_empty;
            _i.img.w=e.target.naturalWidth;
            _i.img.h=e.target.naturalHeight;
            setTimeout(showimg,50);
            _i.popupimg.imgflag=true;
            keyevent.fi_flag=0;
            //showimg();
        },false);

        tmpimg.addEventListener('error',function(e){
            //load failed
            _i.popupimg.style.display = "none";
            _i.popupimg.src=_i.data_errimg;
            _i.popupimg.style.width = '16px';
            _i.popupimg.style.height= '16px';
            _i.popupimg.style.display = "inline";
            setTimeout(_i.hidepopup,1000);
        },false);
        
        //start loading image
        tmpimg.src=link;
    }
    else
    {
        //the image has loaded,just show it
        //_i.popupimg.style.display = "none";
        setTimeout(showimg,50);
    }
}

//open a full size image in a div
previewimg.fullscreen=function(index)
{
    _i=previewimg;
    var pos={x:0,y:0};
    var scrollx, scrolly;
    if ( self.pageYOffset ) {
            scrollx = self.pageXOffset;
            scrolly = self.pageYOffset;
    } else if ( document.documentElement && document.documentElement.scrollTop ) {
            scrollx = document.documentElement.scrollLeft;
            scrolly = document.documentElement.scrollTop;
    } else if ( document.body ) {
            scrollx = document.body.scrollLeft;
            scrolly = document.body.scrollTop;
    }

    var cw, ch;
    if ( self.innerHeight ) {
            cw = self.innerWidth;
            ch = self.innerHeight;
    } else if ( document.documentElement && document.documentElement.clientHeight ) {
            cw = document.documentElement.clientWidth;
            ch = document.documentElement.clientHeight;
    } else if ( document.body ) {
            cw = document.body.clientWidth;
            ch = document.body.clientHeight;
    }

    if(cw>=_i.img.w)
        pos.x=scrollx+(cw-_i.img.w)/2;
    else
        pos.x=scrollx

    if(ch>=_i.img.h)
        pos.y=scrolly+(ch-_i.img.h)/2;
    else
        pos.y=scrolly

    _i.popupimg.src=_i.img.url;
    _i.popupimg.style.left = pos.x.toString() + 'px';
    _i.popupimg.style.top  = pos.y.toString() + 'px';
    _i.popupimg.style.width = _i.img.w.toString() + 'px';//'auto';
    _i.popupimg.style.height= _i.img.h.toString() + 'px';//'auto';        
    _i.popupimg.style.display = "inline";    
}

//proc keyboard event
var keyevent={
    
    sw_flag:true,
    fi_flag:0,
    count:0,
    proc:function(e){
   
        clog("char:"+e.charCode);
       
        if (e.charCode == 102)//102='f'
        {
            if(previewimg.popupimg.imgflag)
            {
                keyevent.fi_flag=1;//(keyevent.fi_flag+1)%2;
                previewimg.fullscreen(keyevent.fi_flag);
            }
        }

        if (e.charCode == 103)//103='g'
            keyevent.count++;
        else
            keyevent.count=0;

        if(keyevent.count==2){
            keyevent.sw_flag=keyevent.sw_flag?false:true;
            keyevent.count=0;
        }
        
        if(e.keyCode==27)//escape key
        {
            previewimg.hidepopup();
        }
    }
};

//start
window.addEventListener("load",   function() { previewimg.init(previewimg); },   false);
window.addEventListener("unload", function() { previewimg.uninit(previewimg); }, false);
// Add keypress event handler
document.addEventListener('keypress', keyevent.proc, false);
