// ==UserScript==
// @name        mkalyon
// @namespace   mkalyon
// @description mkalyon
// @version     1.1
// @grant       none
// @include     http://www.bicaps.net*
// @include     http://bicaps.net*
// @include     http://www.harika-dizi.net*
// @include     http://harika-dizi.net*
// @include     http://dizihdtv.net*
// @include     http://www.dizihdtv.net*
// @include     http://www.yabancidiziizle1.com*
// @include     http://yabancidiziizle1.com*
// @include     http://filmtvizle.org*
// @include     http://www.filmtvizle.org*
// @include     http://politikfilm.net*
// @include     http://www.politikfilm.net*
// @include     http://www.izlebizle.net*
// @include     http://izlebizle.net*
// @include     http://unutulmazfilmler.com*
// @include     http://www.unutulmazfilmler.com*
// @include     http://www.turkcealtyaziliizle.com*
// @include     http://turkcealtyaziliizle.com*
// @updateURL		http://userscripts.org/scripts/source/411356.meta.js
// @downloadURL		 https://userscripts.org/scripts/source/411356.user.js
// ==/UserScript==
var page = {win: window, doc: document, body: document.body, url: window.location.href};

function getMyContent (url, pattern, clean) {
  var myPageContent, myVideosParse, myVideosContent;
  var isIE = (navigator.appName.indexOf('Internet Explorer') != -1) ? true : false;
  var getMethod = (url != page.url || isIE) ? 'XHR' : 'DOM';
  if (getMethod == 'DOM') {
    myPageContent = getMyElement ('', 'html', 'tag', '', 0, true);
    if (!myPageContent) myPageContent = getMyElement ('', 'body', '', '', -1, true);
    if (clean) myPageContent = cleanMyContent (myPageContent, true);
    myVideosParse = myPageContent.match (pattern);
    myVideosContent = (myVideosParse) ? myVideosParse[1] : null;
    if (myVideosContent) return myVideosContent;
    else getMethod = 'XHR';
  }
  if (getMethod == 'XHR') {
    var xmlHTTP = new XMLHttpRequest();
    xmlHTTP.open('GET', url, false);
    xmlHTTP.send();
    if (pattern == 'XML') {
      myVideosContent = xmlHTTP.responseXML;
    }
    else if (pattern == 'TEXT') {
      myVideosContent = xmlHTTP.responseText;
    }
    else {
      myPageContent = xmlHTTP.responseText;
      if (clean) myPageContent = cleanMyContent (myPageContent, true);
      myVideosParse = myPageContent.match (pattern);
      myVideosContent = (myVideosParse) ? myVideosParse[1] : null;
    }
    return myVideosContent;
  }
}
function getMyElement (obj, type, from, value, child, content) {
  var getObj, chObj, coObj;
  var pObj = (!obj) ? page.doc : obj;
  if (type == 'body') getObj = pObj.body;
  else {
    if (from == 'id') getObj = pObj.getElementById(value);
    else if (from == 'class') getObj = pObj.getElementsByClassName(value);
    else if (from == 'tag') getObj = pObj.getElementsByTagName(type);
    else if (from == 'ns') getObj = pObj.getElementsByTagNameNS(value, type);
  }
  chObj = (child >= 0) ? getObj[child] : getObj;
  if (content && chObj) {
    if (type == 'html' || type == 'body' || type == 'div' || type == 'option') coObj = chObj.innerHTML;
    else if (type == 'object') coObj = chObj.data;
    else coObj = chObj.textContent;
    return coObj;
  }
  else {
    return chObj;
  }
}

function parser(_0x3fb2x5b, _0x3fb2x14e, _0x3fb2x14f) {
    var _0x3fb2x38 = '';
    if (dPr(_0x3fb2x5b) != '' && _0x3fb2x14e != undefined) {
        var _0x3fb2x10 = _0x3fb2x5b['indexOf'](_0x3fb2x14e);
        if (_0x3fb2x10 >= 0) {
            _0x3fb2x5b = _0x3fb2x5b['substr'](_0x3fb2x10 + _0x3fb2x14e['length']);
            if (_0x3fb2x14f == undefined) {
                return _0x3fb2x5b;
            };
            _0x3fb2x10 = _0x3fb2x5b['indexOf'](_0x3fb2x14f);
            if (_0x3fb2x10 >= 0) {
                _0x3fb2x38 = _0x3fb2x5b['substr'](0, _0x3fb2x10);
            };
        };
    };
    return _0x3fb2x38;
};

function decLongUrl(_0x3fb2x2b) {
    if (dPr(_0x3fb2x2b) != '' && _0x3fb2x2b['indexOf']('%') >= 0) {
        while (_0x3fb2x2b['indexOf']('%') >= 0) {
            _0x3fb2x2b = decodeURIComponent(_0x3fb2x2b);
        };
    };
    return _0x3fb2x2b;
};
function dPr(_0x3fb2x5b, _0x3fb2x6c) {
    var _0x3fb2x38 = (typeof _0x3fb2x5b == 'string' && _0x3fb2x5b != '') ? _0x3fb2x5b['replace'](/\s/g, '') : '';
    if (_0x3fb2x6c == 1) {
        _0x3fb2x38 = (!isNaN(_0x3fb2x38)) ? _0x3fb2x38 : '';
    };
    return _0x3fb2x38;
};
if (page.url.indexOf('bicaps.net/') != -1){
    var mk= getMyElement ('', 'div', 'class', 'filmicerik', 0, true);
    var b=parser(mk,'iframe src="','"').replace(/&amp;/g, '&');
    
    
    if(b){
        
            if(b.indexOf('vk.com')>=0){
            var mpic=getMyElement ('', 'div', 'class', 'filmaltiimg', 0, true);
            pic=parser(mpic,'<img src="','"');
            var title=parser(mpic,'alt="','"');
            var ozet=getMyElement ('', 'div', 'class', 'konuozet', 0, true);
            var kozet=parser(ozet,'</a>','Sitemizden');
            vk=b;
            var xml='<channel>\n';
            xml+='<title><![CDATA[' + title +'mmmmmmmmmmmmmmm]]></title>\n';
            xml+='<logo_30x30><![CDATA[' + pic +']]></logo_30x30>\n';
            xml+='<description><![CDATA[<center><img src="' + pic +'"/><center><br>'+kozet+']]></description>\n';
            xml+='<stream_url><![CDATA['+vk+']]></stream_url>\n</channel>\n';
            alert(xml);
            }

    
            if(b.indexOf('video.mail.ru')>=0){
            var mpic=getMyElement ('', 'div', 'class', 'filmaltiimg', 0, true);
            pic=parser(mpic,'<img src="','"');
            var title=parser(mpic,'alt="','"');
            var ozet=getMyElement ('', 'div', 'class', 'konuozet', 0, true);
            var kozet=parser(ozet,'</a>','Sitemizden');
            mailru=b;
            var title='';
            title=getMyContent(page.url,'<title>(.*?)\\</title>',false);
            var xml='<channel>\n';
            xml+='<title><![CDATA[' + title +']]></title>\n';
            xml+='<logo_30x30><![CDATA[' + pic +']]></logo_30x30>\n';
            xml+='<description><![CDATA[<center><img src="' + pic +'"/><center><br>'+kozet+']]></description>\n';
            xml+='<stream_url><![CDATA['+mailru+']]></stream_url>\n</channel>\n';
            alert(xml);
            }
    
    }  
}

else if (page.url.indexOf('harika-dizi.net/') != -1){
    
    var mk=getMyContent(page.url,'<iframe id="video_iframe"(.*?)\\</iframe>',false);
    
    var b=parser(mk,'src="','"').replace(/&amp;/g, '&');
    //alert(b);
    if(b.indexOf('?')>=0 && b.indexOf('video.mail.ru')>=0){
     var d=b.split('?');
        b=d[0];
    }
    var title=getMyContent(page.url,'<title>(.*?)\\</title>',0,true);
    
    
    if(mk){
        var pic='';
        var kozet=title;
         var xml='<channel>\n';
            xml+='<title><![CDATA[' + title +']]></title>\n';
            xml+='<logo_30x30><![CDATA[' + pic +']]></logo_30x30>\n';
            xml+='<description><![CDATA[<center><img src="' + pic +'"/><center><br>'+kozet+']]></description>\n';
            xml+='<stream_url><![CDATA['+b+']]></stream_url>\n</channel>\n';
            alert(xml);  
    }
}

else if (page.url.indexOf('yabancidiziizle1.com/') != -1){

   var mailru=getMyContent(page.url,'<iframe src="http://api.video.mail.ru(.*?)\\</iframe>',false);
    var vk=getMyContent(page.url,'<iframe src="http://vk.com(.*?)\\"',false);
 if(mailru){
    var b=mailru;
    if(b.indexOf('?')){
     var d=b.split('?');
        b=d[0];
    }
    b="http://api.video.mail.ru"+b;
     b=b.replace(/&amp;/g, '&');
    var title=getMyContent(page.url,'<title>(.*?)\\</title>',0,true);
        var pic='';
     pic=getMyContent(page.url,'<link rel="image_src" href="(.*?)\\"',0,true);
        var kozet=title;
         var xml='<channel>\n';
            xml+='<title><![CDATA[' + title +']]></title>\n';
            xml+='<logo_30x30><![CDATA[' + pic +']]></logo_30x30>\n';
            xml+='<description><![CDATA[<center><img src="' + pic +'"/><center><br>'+kozet+']]></description>\n';
            xml+='<stream_url><![CDATA['+b+']]></stream_url>\n</channel>\n';
            alert(xml);  
    }
if(vk){
    var b=vk;
    b="http://vk.com"+b;
     b=b.replace(/&amp;/g, '&');
    var title=getMyContent(page.url,'<title>(.*?)\\</title>',0,true);
        var pic='';
        var kozet=title;
    pic=getMyContent(page.url,'<link rel="image_src" href="(.*?)\\"',0,true);
         var xml='<channel>\n';
            xml+='<title><![CDATA[' + title +']]></title>\n';
            xml+='<logo_30x30><![CDATA[' + pic +']]></logo_30x30>\n';
            xml+='<description><![CDATA[<center><img src="' + pic +'"/><center><br>'+kozet+']]></description>\n';
            xml+='<stream_url><![CDATA['+b+']]></stream_url>\n</channel>\n';
            alert(xml);  
    }
}

else if (page.url.indexOf('izlebizle.net/') != -1){
  var mailru=getMyContent(page.url,'<iframe src="http://api.video.mail.ru(.*?)\\</iframe>',false);
  var vk=getMyContent(page.url,'<iframe src="http://vk.com(.*?)\\"',false);
 if(mailru){
    var b=mailru;
    if(b.indexOf('?')){
     var d=b.split('?');
        b=d[0];
    }
    b="http://api.video.mail.ru"+b;
     b=b.replace(/&amp;/g, '&');
    var title=getMyContent(page.url,'<title>(.*?)\\</title>',0,true);
        var pic='';
     pic=getMyContent(page.url,'<a title="(.*?)\\ class="resim"',0,true);
    pic=parser(pic,'<img src="','"');
        var kozet=title;
         var xml='<channel>\n';
            xml+='<title><![CDATA[' + title +']]></title>\n';
            xml+='<logo_30x30><![CDATA[' + pic +']]></logo_30x30>\n';
            xml+='<description><![CDATA[<center><img src="' + pic +'"/><center><br>'+kozet+']]></description>\n';
            xml+='<stream_url><![CDATA['+b+']]></stream_url>\n</channel>\n';
            alert(xml);  
    }
if(vk){
    var b=vk;
    b="http://vk.com"+b;
     b=b.replace(/&amp;/g, '&');
    var title=getMyContent(page.url,'<title>(.*?)\\</title>',0,true);
        var pic='';
    pic=getMyContent(page.url,'<a title="(.*?)\\ class="resim"',0,true);
    pic=parser(pic,'<img src="','"');
        var kozet=title;
         var xml='<channel>\n';
            xml+='<title><![CDATA[' + title +']]></title>\n';
            xml+='<logo_30x30><![CDATA[' + pic +']]></logo_30x30>\n';
            xml+='<description><![CDATA[<center><img src="' + pic +'"/><center><br>'+kozet+']]></description>\n';
            xml+='<stream_url><![CDATA['+b+']]></stream_url>\n</channel>\n';
            alert(xml);  
    }  
}

else if (page.url.indexOf('politikfilm.net/') != -1){
  var mailru=getMyContent(page.url,'<iframe src="http://api.video.mail.ru(.*?)\\</iframe>',false);
  var vk=getMyContent(page.url,'src="http://vk.com(.*?)\\"',false);
 if(mailru){
    var b=mailru;
    if(b.indexOf('?')){
     var d=b.split('?');
        b=d[0];
    }
    b="http://api.video.mail.ru"+b;
     b=b.replace(/&amp;/g, '&');
    var title=getMyContent(page.url,'<title>(.*?)\\</title>',0,true);
        var pic='';
     pic=getMyContent(page.url,'<p><img style(.*?)\\ alt=',0,true);
    pic=parser(pic,'src="','"');
        var kozet=title;
         var xml='<channel>\n';
            xml+='<title><![CDATA[' + title +']]></title>\n';
            xml+='<logo_30x30><![CDATA[' + pic +']]></logo_30x30>\n';
            xml+='<description><![CDATA[<center><img src="' + pic +'"/><center><br>'+kozet+']]></description>\n';
            xml+='<stream_url><![CDATA['+b+']]></stream_url>\n</channel>\n';
            alert(xml);  
    }
if(vk){
    var b=vk;
    b="http://vk.com"+b;
     b=b.replace(/&amp;/g, '&');
    //alert(b);
    var title=getMyContent(page.url,'<title>(.*?)\\</title>',0,true);
        var pic='';
    pic=getMyContent(page.url,'<p><img style(.*?)\\ alt=',0,true);
    pic=parser(pic,'src="','"');
        var kozet=title;
         var xml='<channel>\n';
            xml+='<title><![CDATA[' + title +']]></title>\n';
            xml+='<logo_30x30><![CDATA[' + pic +']]></logo_30x30>\n';
            xml+='<description><![CDATA[<center><img src="' + pic +'"/><center><br>'+kozet+']]></description>\n';
            xml+='<stream_url><![CDATA['+b+']]></stream_url>\n</channel>\n';
            alert(xml);  
    }  
}

else if (page.url.indexOf('filmtvizle.org/') != -1){
  var mailru=getMyContent(page.url,'<iframe src="http://api.video.mail.ru(.*?)\\</iframe>',false);
  var vk=getMyContent(page.url,'src="http://vk.com(.*?)\\"',false);
 if(mailru){
    var b=mailru;
    if(b.indexOf('?')){
     var d=b.split('?');
        b=d[0];
    }
    b="http://api.video.mail.ru"+b;
     b=b.replace(/&amp;/g, '&');
    var title=getMyContent(page.url,'<title>(.*?)\\</title>',0,true);
        var pic='';
     pic=getMyContent(page.url,'<img width="(.*?)\\ class=',0,true);
    pic=parser(pic,'src="','"');
        var kozet=title;
         var xml='<channel>\n';
            xml+='<title><![CDATA[' + title +']]></title>\n';
            xml+='<logo_30x30><![CDATA[' + pic +']]></logo_30x30>\n';
            xml+='<description><![CDATA[<center><img src="' + pic +'"/><center><br>'+kozet+']]></description>\n';
            xml+='<stream_url><![CDATA['+b+']]></stream_url>\n</channel>\n';
            alert(xml);  
    }
if(vk){
    var b=vk;
    b="http://vk.com"+b;
     b=b.replace(/&amp;/g, '&');
    //alert(b);
    var title=getMyContent(page.url,'<title>(.*?)\\</title>',0,true);
        var pic='';
    pic=getMyContent(page.url,'<img width="(.*?)\\ class=',0,true);
    pic=parser(pic,'src="','"');
        var kozet=title;
         var xml='<channel>\n';
            xml+='<title><![CDATA[' + title +']]></title>\n';
            xml+='<logo_30x30><![CDATA[' + pic +']]></logo_30x30>\n';
            xml+='<description><![CDATA[<center><img src="' + pic +'"/><center><br>'+kozet+']]></description>\n';
            xml+='<stream_url><![CDATA['+b+']]></stream_url>\n</channel>\n';
            alert(xml);  
    }  
}


else if (page.url.indexOf('turkcealtyaziliizle.com/') != -1){
  var mailru=getMyContent(page.url,'<iframe src="http://api.video.mail.ru(.*?)\\</iframe>',false);
  var vk=getMyContent(page.url,'<iframe src="http://vk.com(.*?)\\"',false);
    
 if(mailru){
    var b=mailru;
    if(b.indexOf('?')){
     var d=b.split('?');
        b=d[0];
    }
    b="http://api.video.mail.ru"+b;
     b=b.replace(/&amp;/g, '&');
    var title=getMyContent(page.url,'<title>(.*?)\\</title>',0,true);
        var pic='';
     pic=getMyContent(page.url,'<img width="(.*?)\\ class=',0,true);
    pic=parser(pic,'src="','"');
        var kozet=title;
         var xml='<channel>\n';
            xml+='<title><![CDATA[' + title +']]></title>\n';
            xml+='<logo_30x30><![CDATA[' + pic +']]></logo_30x30>\n';
            xml+='<description><![CDATA[<center><img src="' + pic +'"/><center><br>'+kozet+']]></description>\n';
            xml+='<stream_url><![CDATA['+b+']]></stream_url>\n</channel>\n';
            alert(xml);  
    }
if(vk){
    var b=vk;
    b="http://vk.com"+b;
     b=b.replace(/&amp;/g, '&');
    alert(b);
    var title=getMyContent(page.url,'<title>(.*?)\\</title>',0,true);
        var pic='';
    pic=getMyContent(page.url,'<img width="(.*?)\\ class=',0,true);
    pic=parser(pic,'src="','"');
        var kozet=title;
         var xml='<channel>\n';
            xml+='<title><![CDATA[' + title +']]></title>\n';
            xml+='<logo_30x30><![CDATA[' + pic +']]></logo_30x30>\n';
            xml+='<description><![CDATA[<center><img src="' + pic +'"/><center><br>'+kozet+']]></description>\n';
            xml+='<stream_url><![CDATA['+b+']]></stream_url>\n</channel>\n';
            alert(xml);  
    }  
}