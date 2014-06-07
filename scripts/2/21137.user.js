// ==UserScript==
// @name           unreadmixi
// @namespace      http://d.hatena.ne.jp/sugarbabe335/
// @description    unreadmixi
// @include        http://mixi.jp/*
// ==/UserScript==

(function(){
    var lasturl=GM_getValue("lasturl");
    var url=GM_getValue("url");
    url=eval(url);
    nowurl=document.location.href;
    if(nowurl=="http://mixi.jp/home.pl" ||nowurl=="http://mixi.jp/"){
        toppage();
    }else{
        userpage();
    }
    
    function toppage(){
        loadurl();
    }
    
    function userpage(){
        for(var i=0, L=url.length; i<L;i++){
            if(nowurl==url[i]){
                url.splice(i,1);
            }
        }
        url=url.toSource();
        GM_setValue("url",url);
    }
    
    
    function loadurl(){
        if(lasturl==undefined){
            GM_xmlhttpRequest({
                method: 'get',
                url: "http://mixi.jp/new_friend_diary.pl",
                onload: function(req){
                    var last=req.responseText.match(/(<dd><a href=\")(.*)(\">.*<\/a>.*)/);
                    last="http://mixi.jp/"+RegExp.$2
                    GM_setValue("lasturl", last);
                    var url=new Array();
                    url=url.toSource();
                    GM_setValue("url",url);
                    drow("#E9E9E9");
                }
            });
            
        }else{
            GM_xmlhttpRequest({
                method:'get',
                url: "http://mixi.jp/new_friend_diary.pl",
                onload: function(req){
                     var unread=req.responseText.match(/<dd><a href="(.*)">/g);
                        for(var i=0, L=unread.length; i<L; i++){                    
                            unread[i]=unread[i].replace(/<dd><a href="/,"");
                            unread[i]=unread[i].replace(/".*/,"");
                            unread[i]="http://mixi.jp/"+unread[i];
                            if(unread[i]==lasturl){unread=unread.slice(0,i);break;}
                    }
                    if(unread.length!=0){
                    GM_setValue("lasturl",unread[0]);
                    url=url.merge(unread);
                    }
                    url=url.toSource();
                    GM_setValue("url",url);
                    url=eval(url);
                    if(url.length!=0){
                        drow("#ff9900");
                    }else{
                        drow("#E9E9E9");
                    }
                }
            });

           
        }
    }
    
    function drow(color){
        var node=document.getElementById('newFriendDiary');
        var targetnode=node.childNodes[1];
        node=targetnode.childNodes[3];
        targetnode=targetnode.childNodes[3].childNodes[1];
        var divnode=document.createElement("div");
        var linode=document.createElement("li");
        divnode.setAttribute('id','allmixi');
        divnode.setAttribute('style','padding:0px;margin:3px;position:relative;'+'background:'+color+';'+'top:3px;left:2px;'+'width:11px;height:11px;');
        linode.appendChild(divnode);
        node.insertBefore(linode,targetnode);
        divnode.addEventListener('click',opentab,true);
    }
    
    function opentab(){
        url=eval(url);
        if(url.length>0){
            for(var i=0, L=url.length; i<L;i++){
                GM_openInTab(url[i]);
            }
            var node=document.getElementById('allmixi');
            node.setAttribute('style','padding:0px;margin:3px;position:relative;'+'background:#E9E9E9;'+'top:3px;left:2px;'+'width:11px;height:11px;');
            url=new Array();
            url=url.toSource();
            GM_setValue("url",url);
        }
    }
    
    Array.prototype.indexOf = function(value){
        var i = this.length;
        while(i){
            if(this[--i] == value) return i;
        }
        return -1;
    };
    Array.prototype.merge = function(value, cap){
        var i = value.length;
        while(i){
            if(lasturl==value[i]){
                break;
            }
            if(this.indexOf(value[--i]) == -1){
                this.unshift(value[i])
            }
        }
        return (cap)? this.join(cap) : this;
    };


})();