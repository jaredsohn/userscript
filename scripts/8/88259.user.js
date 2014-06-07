// ==UserScript==
// @name           SafeTuenti
// @namespace      YanDark88
// @description    SafeTuenti te protege del phishing de Tuenti
// @include        http://*.*
// @exclude        http://*.tuenti.com/*
// @exclude        https://*.tuenti.com/*
// @version        1.2.1
// ==/UserScript==

var version='1.2.1',id='88259';
GM_registerMenuCommand('SafeTuenti: Web',function(){
    document.location.href = 'http://userscripts.org/scripts/show/'+id;
});

var ST = {
    'blacklist': [
        'http://tuentii.netne.net/',
        'http://aplicaciones-tuenti.comyr.com/',
        'http://www.canhaveral.com/Acceso%20a%20Tuenti.htm',
        'http://tuenti-company.hostzi.com/',
        'http://neps347.galeon.com/',
        'http://tuenticopiapaco.freeiz.com/',
        'http://mantenimiento-tuenti.net84.net/',
        'http://www.wix.com/nacho39/fans-de-tuenti',
        'http://supertuenti24.blogspot.com/',
        'http://tu-fourtin.com/'
    ],
    'htmlBlacklist': [
        'www.tuenti.com/?m=Login&amp;func=do_login',
        'www.tuenti.com/?remember_pass=1',
        '?m=Login&amp;func=view_request_new_password'
    ],
    'checkUrl': function(){
        for(i=0;i<ST.blacklist.length;i++) location.href.indexOf(ST.blacklist[i]) != -1 && ST.phishingDetected(true);
    },
    'checkHtml': function(){
        var html = document.getElementsByTagName('body')[0].innerHTML;
        if(html.toLowerCase().indexOf('tuenti') == -1 || !(document.querySelectorAll('input[type="text"]')[0] && document.querySelectorAll('input[type="password"]')[0])) return;
        for(i=0;i<ST.htmlBlacklist.length;i++) html.indexOf(ST.htmlBlacklist[i]) != -1 && ST.phishingDetected();
    },
    'phishingDetected': function(isInBlackList){
        alert('\u00a1Atenci\u00f3n!\n'+ (isInBlackList ? 'La web a la que intentas acceder se encuentra en la lista negra de SafeTuenti.' : 'SafeTuenti ha detectado un posible phishing en esta web.') +'\n\nNo introduzcas tus datos de Tuenti ya que podr\u00edan ser "robados".');
        ST.phishingDetected = function(){};
    }
};
//-------------------------------------------------------------------------------------------//

ST.checkUrl();
ST.checkHtml();

GM_xmlhttpRequest({
    method:'GET',
    url:'http://userscripts.org/scripts/source/' +id+ '.meta.js',
    onload:function(resp){
        resp.responseText.match(/@version\s+([\d.]+)/);
        var updatedversion = RegExp.$1;
        
        if(!updatedversion || !version || version==updatedversion || top.location!=location.href) return;
        
        GM_xmlhttpRequest({
            method:'GET',
            url:'http://userscripts.org/scripts/show/'+id,
            onload:function(resp){
                var resp=resp.responseText,
                a=resp.indexOf('<h3><center>Lista de cambios:</center></h3>'),
                b=resp.substring(a,resp.indexOf('</li></ul>',a)),
                log='\n\nLista de cambios (v' +updatedversion+ '):\n-'+b.substring(b.indexOf('<li>')+4,b.length).replace(/<\/li><li>/g,'\n-');
                
                alert('Se ha encontrado una actualizaci\u00f3n de SafeTuenti.' +log+ '\n\nHaz click para actualizar.');
                document.location.href = 'http://userscripts.org/scripts/source/' +id+ '.user.js';
            }
        });
    }
});