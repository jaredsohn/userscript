// ==UserScript==
// @name        LoadExtImage
// @namespace   LoadExtImage
// @include     http://192.168.10.*/*
// @include     http://www.freedl.org/*
// @version     0.0.6
// ==/UserScript==


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

//--------------------------------------------------------------------------------
var hosts=[
    //{t:HTMLAnchorElement,m:/imagekitty\.com\/[0-9a-zA-Z]+\/.+\.(jpe?g|png)/,r:null,get:imgkitty}, //imgkitty.com

    {t:HTMLAnchorElement,m:/imgchili\.(com|net)\/show\/[0-9]+\/.+\.(jpe?g|png)/,r:null,get:imgchili},     //imgchili.com
    {t:HTMLAnchorElement,m:/mrjh\.org\/gallery\.php\?entry=/,r:null,get:mrjh},                  //mrjh.org
    {t:HTMLAnchorElement,m:/pixup\.us\/img-[a-z0-9]+\.html/,r:null,get:pixup},  //pixup.us
	{t:HTMLAnchorElement,m:/imgcloud\.co\/img-[a-z0-9]+\.html/,r:null,get:imgcloud},  //imgcloud.co
	{t:HTMLAnchorElement,m:/imgserve\.net\/img-[a-z0-9]+\.html/,r:null,get:imgserve},  //imgserve.net
    {t:HTMLAnchorElement,m:/piclambo\.net\/.+\/.+\.(jpe?g|png)\.html/,r:null,get:piclambo},    //piclambo.net
	{t:HTMLAnchorElement,m:/picleet\.com\/.+\/.+\.(jpe?g|png)\.html/,r:null,get:picleet},     //picleet.com

	//no checked
    {t:HTMLAnchorElement,m:/imagetwist.com\/.+\.(jpe?g|png).html/,r:null,get:imagetwist},       //imagetwist.com
    {t:HTMLAnchorElement,m:/imgiga.com\/img\.php/,r:null,get:imgiga},                           //imgiga.com
    {t:HTMLAnchorElement,m:/turboimagehost\.com\/p(.+)\.html/,r:null,get:turboimagehost},       //turboimagehost.com
    {t:HTMLAnchorElement,m:/postimage\.org\/image\//,r:null,get:turboimagehost},                    //postimage.org
    {t:HTMLAnchorElement,m:/imageporter\.com\/.+\/.+\.(jpe?g|png)\.html/,r:null,get:imageporter}, //imageporter.com
    {t:HTMLAnchorElement,m:/yankoimages\.net\/.+\/.+\.(jpe?g|png)\.html/,r:null,get:imageporter}, //yankoimages.net
    {t:HTMLAnchorElement,m:/imagedax\.net\/.+\/.+\.(jpe?g|png)\.html/,r:null,get:imageporter},    //imagedax.net
    {t:HTMLAnchorElement,m:/pictureturn\.com\/.+\/.+\.(jpe?g|png)\.html/,r:null,get:imageporter}, //pictureturn.net
    {t:HTMLAnchorElement,m:/imagedunk\.com\/.+\/.+\.(jpe?g|png)\.html/,r:null,get:imageporter},   //imagedunk.com    
    {t:HTMLAnchorElement,m:/picturedip\.com\/.+\/.+\.(jpe?g|png)\.html/,r:null,get:imageporter}  //picturedip.com

    //{t:HTMLAnchorElement,m:/imagehyper\.com\/img\.php/,r:/http:\/\/.+\.imagehyper.com\/img\/[0-9|a-z|\-]+\/.+\.(jpe?g|png)/,get:getimgfrompage}, //imagehyper.com
    //{t:HTMLAnchorElement,m:/imagesnake\.com\/img\//,r:/http:\/\/.+\.imagesnake.com\/.+\.(jpe?g|png)\?id=[0-9|a-z]+/,get:getimgfrompage}, //imagesnake.com
];

function getpage (url) {  // synchronous request

    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, false);
    xhr.send(null);

    return xhr.responseText;
}

function getpage2(link,refer,func_cb){

    var req = GM_xmlhttpRequest({
        method:'GET',
        url:link,
		timeout:30000,
        headers:{'Referer' : refer},
        onload: function(req) {
            func_cb(req.responseText);
        },
		ontimeout: function(req){
            func_cb('error');
        },
        onerror: function(req){
            func_cb('error');
        }
    });
}

function postpage (link,refer,postdata,func_cb) {  // synchronous request

    var req = GM_xmlhttpRequest({
        method:'POST',
		timeout:30000,
        headers: { 'Content-type' : 'application/x-www-form-urlencoded','Referer' : refer},
        data: postdata,
        url:link,
        onload: function(req) {
            func_cb(req.responseText);
        },
		ontimeout: function(req){
            func_cb('error');
        },
        onerror: function(req){
            func_cb('error');
        }
    });
}

function getimage(url, referer,func_cb) {

    var req = GM_xmlhttpRequest({
        method: 'GET',
		timeout:30000,
        url: url,
        overrideMimeType:'text/plain; charset=x-user-defined',
        headers: {'Accept':'image/png,image/*;q=0.8,*/*;q=0.5','Referer':referer},
        onload: function(req) {
            var d = '';
            for(var i = 0; i < req.responseText.length; i++) {
                d += String.fromCharCode(req.responseText.charCodeAt(i) & 0xff);
            }
            b64='data:;base64,' + window.btoa(d);
            func_cb(b64);
        },
		ontimeout: function(req){
            func_cb('error');
        },
        onerror: function(req){
            func_cb('error');
        }
    });
}

function imgserve(element){

    function func_cb(page)
    {
        if(page=='error')
        {
            extimg.imgcb(page);
            return;
        }

		var r=new RegExp("http:\/\/s[0-9].imgserve\.net\/images\/big\/[0-9a-z//]+\.(jpe?g|png)");
        var result=r.exec(page);		

        if(result)
		{
            getimage(result[0],element.href,extimg.imgcb);
		}
        else
		{
			extimg.imgcb('error');
		}
    }

	getpage2(element.href,element.href,func_cb);
}

function imgcloud(element){

    function func_cb(page)
    {
        if(page=='error')
        {
            extimg.imgcb(page);
            return;
        }

		var r=new RegExp("http:\/\/imgcloud\.co\/upload\/big\/[0-9a-z//]+\.(jpe?g|png)");
        var result=r.exec(page);		

        if(result)
		{
            getimage(result[0],element.href,extimg.imgcb);
		}
        else
		{
			extimg.imgcb('error');
		}
    }

    postpage(element.href,element.href,"imgContinue=Continue to image ...",func_cb);
}

function pixup(element){

    function func_cb(page)
    {
        if(page=='error')
        {
            extimg.imgcb(page);
            return;
        }

		//http:\/\/pixup\.us\/upload\/big\/.+\.(jpe?g|png)
        var r=new RegExp("http:\/\/pixup\.us\/upload\/big\/[0-9a-z//]+\.(jpe?g|png)");
        var result=r.exec(page);		

        if(result)
            getimage(result[0],element.href,extimg.imgcb);
        else
		{
			extimg.imgcb('error');
		}
    }

    postpage(element.href,element.href,"imgContinue=Continue to image ...",func_cb);
}

function imgkitty(element){

    if (!element.href.match(/imagekitty\.com\/[0-9a-zA-Z]+\/.+\.(jpe?g|png)/))
        return null;

    var r1=element.href.split('/');
    var code=r1[3];
    var url='http://img4.imagekitty.com/i/00002/'+code+'.jpg';

    getimage(url,element.href,extimg.imgcb);

    function func_cb(page)
    {
        if(page=='error')
        {
            extimg.imgcb(page);
            return;
        }

        var r=new RegExp("http:\/\/.+\.imagekitty\.com\/i\/[0-9]+\/"+code+"\.(jpe?g|png)");
        var result=r.exec(page);

        if(result)
            getimage(result[0],element.href,extimg.imgcb);
        else
            extimg.imgcb('error');
    }

    getpage2(element.href,element.href,func_cb);

    return 'processing';
}

//http://imgchili.net/show/35056/35056229_kawd455b.jpg
//http://imgchili.com/show/35056/35056229_kawd455b.jpg
function imgchili(element){

    getimgfrompage(element,/imgchili\.(com|net)\/show\/[0-9]+\/.+\.(jpe?g|png)/,/http:\/\/i[0-9]\.imgchili\.(com|net)\/[0-9]+\/[a-zA-Z0-9_]+\.(jpe?g|png)/);

    return 'processing';
}

function mrjh(element){

    var result = element.href.split(/http:\/\/www\.mrjh\.org\/gallery\.php\?entry=/);

    getimage('http://www.mrjh.org/'+result[1],element.href,extimg.imgcb);
}

function imagetwist(){
    extimg.imgcb('error');
}

function imgiga(){
    extimg.imgcb('error');
}

function turboimagehost(){
    extimg.imgcb('error');
}

function piclambo(element){

    var result_array = element.href.split('/');
    var code=result_array[3];

    if(code==null || !code.length)
    {
        extimg.imgcb('error');
        return;
    }

    function func_cb(page)
    {
        if(page=='error')
        {
            extimg.imgcb('error');
            return;
        }

        var r=new RegExp("http:\/\/(.+)\.piclambo\.net\/(.+)\/"+code+"\.(jpe?g|png)");
        var result=r.exec(page);

        if(result)
            getimage(result[0],element.href,extimg.imgcb);
        else
            extimg.imgcb('error');
    }

    getpage2(element.href,element.href,func_cb);
}

function picleet(element){

    var result_array = element.href.split('/');
    var code=result_array[3];

	clog("code:"+code);
	
    if(code==null || !code.length)
	{
		extimg.imgcb('error');
        return null;
	}

    function func_cb(page)
    {
        if(page=='error')
        {
            extimg.imgcb('error');
            return;
        }

        var r=new RegExp("http:\/\/img[0-9]+\.picleet\.com\/i\/[0-9]+\/"+code+"\.(jpe?g|png)");
        var result=r.exec(page);
		
		clog(result);

        if(result)
            getimage(result[0],element.href,extimg.imgcb);
        else
            extimg.imgcb('error');
    }

    getpage2(element.href,element.href,func_cb);
}

function imageporter(element){

    var result_array = element.href.split('/');
    var code=result_array[3];

    if(code==null || !code.length)
	{
		extimg.imgcb('error');
        return null;
	}

    function func_cb(page)
    {
        if(page=='error')
        {
            extimg.imgcb('error');
            return;
        }

        var r=new RegExp("http:\/\/(.+)\.imageporter\.com\/(.+)\/"+code+"\.(jpe?g|png)");
        var result=r.exec(page);

        if(result)
            getimage(result[0],element.href,extimg.imgcb);
        else
            extimg.imgcb('error');
    }

    getpage2(element.href,'http://www.imageporter\.com/',func_cb);
}

function getimgfrompage(element,m,r){

    if (!element.href.match(m))
        return null;


    function func_cb(page){


        if(page=='error'){
            extimg.imgcb('error');
            return;
        }

        var result=page.match(r);
        if(result)
            getimage(result[0],element.href,extimg.imgcb);
        else
            extimg.imgcb('error');
    }
    getpage2(element.href,element.href,func_cb);
}

//--------------------------------------------------------------------------------

//main class
var extimg = {
    //members
    data_errimg:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAnRJREFUeNpsU01ME0EUfjuzu2BKlraGGEqlNW2MqMSiXtBEuZjQgxdIBBNJTAwXuUgiXjxojEcT40E9qAe9SC+CXDh6QAN6IWKKyo9iSISmP2CBtLsz3fXN0i4b2pdMduZ973vz3vdmJcuyYL/dlmWvn5AunyzHQJIgw9jUmmnOPuM8tz9WcicYQeJxTXt8NBC4ftjvB0WWARBnuFZzOVjIZp9+SqXuveQ8W5XgrqLEzrW0jLW3toZZOg16NgsmYyCVA6mqAvV6YcE0k69WVi69Y2zNSTCMN19obp7tCAbD/5aWbKJzg7tcsSiFeVVNvk+nu95yniECiHo8t06GQuHs8jI09PRAx+YmeLq7gSMmUol9DH1aXx8YpRIcKRZPtNXV3XEqmIhENkKK4t1eX4fzGFixH/399vfY6Kjjm8Y2RCXzhvH3RqEQJUOyfPFQY6M3j30Lsb6VSRWim5xEjJdFPUhpoJfSs0QjRCKcQxGXKDc1OQlfXUkqJnwCY+W2FByvCdAk63jQUTTmEoxDtZXKxIqYogoxP5IzzT+ZQmGvNBTsjKvsip1Gnz8ed4TNYexPHKkt4hOf73ewVAqLwN58fk8wVF1YZyLh+MY1bbclw1i8r+un7DEu7uw82DJNO/PM4KAdMIXkVexZrI/lRF8QEzEbGDvH+SO8vCANKYoNNhDypk1RBqgk1XxAFRNtftb1ieeMXRHyuTEyrKqvI7J8zUNITfIWkucMY/wFYwN43LafuAu3Oikd+875tGFZTTidqFC+gKQMvr5fnH+YYWwkwflDdBehlmEFcFX8gbsXH7isqqGb9fXtuBfK0TilVZz/AgwAM0Qm2/mw9RoAAAAASUVORK5CYII=",
    data_loadingimg:"data:image/gif;base64,R0lGODlhEAAQALMMAKqooJGOhp2bk7e1rZ2bkre1rJCPhqqon8PBudDOxXd1bISCef///wAAAAAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh+QQFAAAMACwAAAAAEAAQAAAET5DJyYyhmAZ7sxQEs1nMsmACGJKmSaVEOLXnK1PuBADepCiMg/DQ+/2GRI8RKOxJfpTCIJNIYArS6aRajWYZCASDa41Ow+Fx2YMWOyfpTAQAIfkEBQAADAAsAAAAABAAEAAABE6QyckEoZgKe7MEQMUxhoEd6FFdQWlOqTq15SlT9VQM3rQsjMKO5/n9hANixgjc9SQ/CgKRUSgw0ynFapVmGYkEg3v1gsPibg8tfk7CnggAIfkEBQAADAAsAAAAABAAEAAABE2QycnOoZjaA/IsRWV1goCBoMiUJTW8A0XMBPZmM4Ug3hQEjN2uZygahDyP0RBMEpmTRCKzWGCkUkq1SsFOFQrG1tr9gsPc3jnco4A9EQAh+QQFAAAMACwAAAAAEAAQAAAETpDJyUqhmFqbJ0LMIA7McWDfF5LmAVApOLUvLFMmlSTdJAiM3a73+wl5HYKSEET2lBSFIhMIYKRSimFriGIZiwWD2/WCw+Jt7xxeU9qZCAAh+QQFAAAMACwAAAAAEAAQAAAETZDJyRCimFqbZ0rVxgwF9n3hSJbeSQ2rCWIkpSjddBzMfee7nQ/XCfJ+OQYAQFksMgQBxumkEKLSCfVpMDCugqyW2w18xZmuwZycdDsRACH5BAUAAAwALAAAAAAQABAAAARNkMnJUqKYWpunUtXGIAj2feFIlt5JrWybkdSydNNQMLaND7pC79YBFnY+HENHMRgyhwPGaQhQotGm00oQMLBSLYPQ9QIASrLAq5x0OxEAIfkEBQAADAAsAAAAABAAEAAABE2QycmUopham+da1cYkCfZ94UiW3kmtbJuRlGF0E4Iwto3rut6tA9wFAjiJjkIgZAYDTLNJgUIpgqyAcTgwCuACJssAdL3gpLmbpLAzEQA7",
    data_empty:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAadEVYdFNvZnR3YXJlAFBhaW50Lk5FVCB2My41LjEwMPRyoQAAACBJREFUOE9j+P//PwMlmCLNIItHDRgNg9F0AMmEA58XAMWt/R/F69ERAAAAAElFTkSuQmCC",
    queue:null,
    index:-1,
    done:-1,
    current:null,
    flag_next:1,
    curimg:null,
    popupimg:null,
    popup_style:
    "position:absolute;display:none;z-index:3000;background-color:black;",

    //methods
    init:null,
    uninit:null,
    mouseover:null,
    mouseout:null,
    addqueue:null,
    addq:null,
    download:null,
    imgcb:null,
    showimg:null,
    showpopup:null,
    hidepopup:null
}

extimg.mouseout=function(e){

    if(extimg.current)
        extimg.current=null;

    if(extimg.curimg)
        extimg.curimg=null;
}

extimg.mouseover=function(e){

    var element = e.target;
    var target  = null;

    function check(host) {

        //nodeType==Element
        if (element.nodeType == 1 && element instanceof host.t)
            target=element;

        if(target){
            if(element.href.match(host.m)){
                extimg.current=element;
            }
        }
    }
    hosts.some(check);

    if (element.nodeType == 1 && element instanceof HTMLImageElement && element.id=="extimg"){
        extimg.curimg=element;
    }
}

extimg.hidepopup=function(){
    extimg.popupimg.style.width = '16px';
    extimg.popupimg.style.height = '16px';
    extimg.popupimg.style.display = "none";
}

extimg.init=function(_i){

    clog("init");

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

    _i.popupimg.addEventListener('click',_i.hidepopup,false);

    _i.queue=new Array();
    document.addEventListener('mouseover', _i.mouseover, false);
    document.addEventListener('mouseout', _i.mouseout, false);
    setTimeout(_i.download,1000);

    var blocks=document.getElementsByTagName("BLOCKQUOTE");
    var idx;
    for(idx=0;idx<blocks.length;idx++)
    {
        var anchors=blocks[idx].getElementsByTagName("A");
        if(anchors.length)
		{
			_i.addq(_i,anchors[0]);
			if(anchors.length>=2)
				_i.addq(_i,anchors[1]);
		}
    }
}

extimg.uninit=function(_i){
    clog("uninit");
    document.removeEventListener('mouseover', _i.mouseover, false);
    document.removeEventListener('mouseout', _i.mouseout, false);
}

extimg.addq=function(_i,e){ //e:element

    clog("addqueue:"+e.href);
    e.innerHTML="<img src=\""+_i.data_loadingimg+"\" \\>";
    _i.queue[_i.index+1]=e;
    _i.index++;
}

extimg.addqueue=function(_i,e){ //e:event

    if(_i.current){
        _i.addq(_i,_i.current);
        _i.current=null;
    }
}

extimg.download=function(){

    var e=null;//target element

    function proc(host,idx){
        if(e.href.match(host.m)){
            host.get(e);
			return true;
        }
		return false;
    }

    while(extimg.index>extimg.done && extimg.flag_next==1){
        extimg.flag_next=0;
        extimg.done++;
        e=extimg.queue[extimg.done];
		//clog("proc:"+e.href);
        if(!hosts.some(proc))
			extimg.flag_next=1;
    }

    setTimeout(extimg.download,1000);
}

extimg.imgcb=function(base64){

    if(base64=='error')
        base64=extimg.data_errimg;

    extimg.showimg(base64);
}


extimg.showimg=function(base64){

    extimg.queue[extimg.done].innerHTML="<img id=\"extimg\" width='auto' height='200px' src=\""+base64+"\" \\>";
	
	if(extimg.queue[extimg.done].href.match(hosts[0].m))
	{
		clog("delay 3sc");
	}
	
	extimg.flag_next=1;
		
}

extimg.showpopup=function(_i)
{
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

    _i.popupimg.src=extimg.curimg.src;
    _i.popupimg.style.left = scrollx.toString() + 'px';
    _i.popupimg.style.top  = scrolly.toString() + 'px';
    _i.popupimg.style.width = 'auto';
    _i.popupimg.style.height= 'auto';
    _i.popupimg.style.display = "inline";
}

//proc keyboard event
var keyevent={

    proc:function(e){

        //clog("char:"+e.charCode);

        if (e.charCode == 119)
            extimg.addqueue(extimg,e);
        else if(e.charCode == 108){
            //for test
            clog("queue size:"+(extimg.index+1));
            for(i=0;i<=extimg.index;i++)
            {
                clog("["+i+"]"+extimg.queue[i].href);
            }
        }
        else if(e.charCode == 102){

            if(extimg.curimg){
                if(extimg.popupimg.style.display == "none")
                    extimg.showpopup(extimg);
                else
                    extimg.hidepopup(extimg);
            }
            else
                extimg.hidepopup(extimg);
        }
    }
};

//start
window.addEventListener("load",   function() { extimg.init(extimg); },   false);
window.addEventListener("unload", function() { extimg.uninit(extimg); }, false);

// Add keypress event handler
document.addEventListener('keypress', keyevent.proc, false);

