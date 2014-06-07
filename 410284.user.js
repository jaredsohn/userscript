// ==UserScript==
// @name        百度音乐助手
// @author      有一份田
// @description 百度音乐下载助手,突破百度音乐会员限制,带您自由畅享高品质音乐
// @namespace   http://userscripts.org/scripts/show/175746
// @updateURL   https://userscripts.org/scripts/source/175746.meta.js
// @downloadURL https://userscripts.org/scripts/source/175746.user.js
// @icon        http://img.duoluohua.com/appimg/script_baidumusicscript_icon_48.png
// @license     GPL version 3
// @encoding    utf-8
// @date        12/08/2013
// @modified    31/12/2013
// @include     http://music.baidu.com/song/*
// @include     http://y.baidu.com/*
// @resource    loadingimg_1 http://tieba.baidu.com/tb/img/loading.gif
// @resource    loadingimg_2 http://tieba.baidu.com/tb/static-ihome/img/loading2.gif
// @resource    downimg http://bcs.duapp.com/opensource/images/appimg/min_red_download.png
// @grant       GM_xmlhttpRequest
// @grant       GM_getResourceURL
// @run-at      document-end
// @version     1.2.6
// ==/UserScript==




/*
 * === 说明 ===
 *@作者:有一份田
 *@官网:http://www.duoluohua.com/download/
 *@Email:youyifentian@gmail.com
 *@Git:http://git.oschina.net/youyifentian
 *@转载重用请保留此信息
 *
 * */


var APPCFG={
    "appname":"\u767e\u5ea6\u97f3\u4e50\u52a9\u624b",
    "author":"\u6709\u4e00\u4efd\u7530",
    "version":"1.2.6",
    "hostname":location.hostname,
    "hostlist":['music.baidu.com','y.baidu.com'],
    "imgres":{
        "loadingimg_1":"",
        "loadingimg_2":"",
        "mouseleft":"http://static.tieba.baidu.com/tb/static-album/img/mouseleft.cur",
        "mouseright":"http://static.tieba.baidu.com/tb/static-album/img/mouseright.cur",
        "downimg":""
    }
};
var t=new Date().getTime();
var $=unsafeWindow.$;
(function(){
    var O=APPCFG['imgres'];
    for(var _ in O){
        if(O.hasOwnProperty(_)){
            var S = O[_];
            APPCFG['imgres'][_]=isUrl(S) ? S : GM_getResourceURL(_);
        }
    }
})();
(function(){
    if($.inArray(APPCFG['hostname'],APPCFG['hostlist'])!=0){return;}
    var filesInfo={},albumImgCache=[],albumImgIndex=0,
    modalJS=getModalJs(),songInfo=getSongInfo();
    loadJs(modalJS);
    querySong(songInfo);
    function getSongInfo(id,title,artist){
        var path=window.location.pathname,arr=path.split('/'),id=arr[2] || id,p=arr[3],
        type=p && 'download'==p.toLowerCase();
        return {
            "id":"song"==arr[1].toLowerCase() ? id : "",
            "title":title || "",
            "artist":artist || "",
            "boxCss": type ? "ul" : "info-holder",
            "addNodeFun":type ?  "appendChild" : "insertBefore",
            "child": type ? "lastChild" : "firstChild",
            "boxWidth": type ? "670px" : ""
	    };
    }
    function querySong(opt){
        if(!opt['id']) return;
        var box=document.getElementsByClassName(opt['boxCss']);
        if(!box.length)return;
        var node=document.createElement('div'),o=box[0];
        node.style.display='block';
        o[opt['addNodeFun']](node,o[opt['child']]);
        try{
            o.parentNode.parentNode.parentNode.style.minWidth=opt['boxWidth'];
        }catch(err){}
        if(!GM_xmlhttpRequest){
            showDownHtml(node,4);
            return;
        }
        showDownHtml(node,1);
        var id=opt.id,title=opt.title,artist=opt.artist,
            url='http://musicmini.baidu.com/app/link/getLinks.php?linkType=1&isLogin=1&clientVer=8.2.10.23&isHq=1&songAppend=&isCloud=0&hasMV=1&songId='+id+'&songTitle='+title+'&songArtist='+artist;
        GM_xmlhttpRequest({
            "method":"GET",
            "url":url,
            "onload":function(response) {
                showDownHtml(node,0,JSON.parse(response.responseText));
            },
            onerror: function(response) {
                showDownHtml(node,2);
            },
            ontimeout: function(response) {
                showDownHtml(node,3);
            }
        });
    }
    function setSongsInfo(opt){
        var o=opt[0],id=o.song_id,lyric=o.lyric_url,albumImg=o.album_image_url,
        artist=o.song_artist,title=o.title,fileslist=o.file_list,files=[];
        for(var i=0;i<fileslist.length;i++){
            files.push(formatSongInfo(fileslist[i],lyric));
        }
        return {
            "id":id,
            "title":title,
            "artist":artist,
            "albumImg":albumImg,
            "lyric":lyric,
            "files":files
        };
    }
    function formatSongInfo(file){
        var url=file.url,format=file.format.toLowerCase(),size=file.size,
        rate=file.kbps,i=0,ratetitle=['\u65e0 \u635f','\u8d85 \u9ad8','\u9ad8 \u8d28','\u6807 \u51c6','\u4f4e \u8d28','\u5176 \u4ed6'];
        if(rate>320 && format!="mp3"){
            i=0;
        }else if(rate>256 && rate<=320){
            i=1;
        }else if(rate>128 && rate<=256){
            i=2;
        }else if(rate>64 && rate<=128){
            i=3;
        }else if(rate<=64){
            i=4;
        }else{
            i=5;
        }
        size=Math.round(size/1048576*10)/10+'M';
        return {
            "index":i,
            "format":format,
            "rate":rate,
            "ratetitle":ratetitle[i],
            "size":size,
            "url":url
        };
    }
    function showDownHtml(node,index,opt){
        filesInfo=opt ? setSongsInfo(opt) : {};
        var msg=[
            '',
            '\u6570\u636e\u8d76\u6765\u4e2d',
            '\u8bf7\u6c42\u51fa\u9519,\u8bf7\u91cd\u8bd5\u6216\u68c0\u67e5\u662f\u5426\u4e3a\u6700\u65b0\u7248\u672c',
            '\u8bf7\u6c42\u8d85\u65f6,\u8bf7\u5237\u65b0\u9875\u9762\u91cd\u8bd5',
            '\u60a8\u7684\u6cb9\u7334\u5b50\u6269\u5c55\u6682\u65f6\u4e0d\u652f\u6301\u8be5\u811a\u672c,\u8bf7\u66f4\u65b0\u6269\u5c55\u6216\u811a\u672c\u5230\u6700\u65b0\u7248\u672c'
        ],text=msg[index],html=makeHtml(filesInfo,text,index-1);
        node.innerHTML=html;
        node.title=APPCFG['appname']+' - '+APPCFG['author'];
        checkUpdate();
        if(opt){
            $(node).find('a#showalbumimg').click(function(){
                setTimeout(function(){showAlbumImg();},0);
            });
        }
    }
    function makeHtml(filesInfo,text,type){
        var files=filesInfo.files || [],html='',file='',url='',albumImg=filesInfo.albumImg,lyric=filesInfo.lyric;
        html+='<div style="border:2px solid #A1CBE4;width:560px;padding-left:25px;margin:5px 0px 10px 0px;line-height:25px;">';
        html+='<div>';
        html+='<a href="'+getUpdateUrl('getnewversion',1)+'" style="float:right;" target="_blank">';
        html+='<img id="updateimg" title="'+APPCFG['author']+'" style="border:none;display:none;"/></a>';
        html+=text ? '<font color="'+(type ? '#FF0000' : '#A1CBE4')+'"><b>'+text+'...</b></font>' : '';
        for(var i=0;i<files.length;i++){
            file=files[i];
            url="http://music.baidu.com/data/music/file?link="+file.url;
            html+='<span style="display:inline-block;min-width:200px;">';
            html+='<a style="text-decoration:underline;" href="'+url+'" title="'+file.ratetitle+'"><b>'+file.ratetitle+'</b></a>';
            html+='<span><b>&nbsp;&nbsp;&nbsp;'+file.size+'</b></span>';
            html+='<span style="color:#999999;">&nbsp;&nbsp;&nbsp;'+file.format+'&nbsp;&nbsp;'+file.rate+'kbps</span>';
            html+='</span>';
            if(i%2==1)html+='</div><div>';
        }
        html+='</div><div>';
        html+=albumImg ? '<span style="margin-right:100px;"><a style="text-decoration:underline;" id="showalbumimg" href="javascript:;" title="\u4e13\u8f91\u5c01\u9762">\u4e13\u8f91\u5c01\u9762</a></span>' : '';
        html+=lyric ? '<span><a style="text-decoration:underline;" href="'+lyric+'" title="\u4e0b\u8f7d\u6b4c\u8bcd">LRC\u6b4c\u8bcd</a></span>' : '';
        html+='</div></div>';
        return html;
    }
    function showAlbumImg(){
        var url='http://tingapi.ting.baidu.com/v1/restserver/ting?method=baidu.ting.song.play&songid='+songInfo['id'],
        httpHwnd=null,mousePosition=0,albumImgKey=['pic_small','pic_big','pic_radio','pic_premium','pic_huge'],
        imgres=[
            APPCFG['imgres']['mouseleft'],//'http://static.tieba.baidu.com/tb/static-album/img/mouseleft.cur',
            APPCFG['imgres']['mouseright'],//'http://static.tieba.baidu.com/tb/static-album/img/mouseright.cur',
            APPCFG['imgres']['loadingimg_1']//'http://tieba.baidu.com/tb/img/loading.gif'    
        ],modal= new $.modal({show: true}),box=$('<div/>').css({
            "left":"50%",
            "top":"50%",
            "position":"absolute",
            "min-height":"240px",
            "min-width":"240px",
            "z-index":$.getzIndex()
        }).appendTo("body"),
        dialogClose=function(){
            if(httpHwnd){httpHwnd.abort();}
            modal.remove();
            box.remove();
        },
        loadingImg=$('<img src="'+imgres[2]+'"/>').css({
            "height":"32px",
            "width":"32px",
            "margin-left":"-16px",
            "margin-top":"-16px"
        }).appendTo(box),
        loadImg=function(){
            var img = new Image();
            img.src = albumImgCache[albumImgIndex];
            img.onload=function(){
                var h=img.height,w=img.width,o=$(img);
                loadingImg.remove();
                o.attr('title',w+'x'+h).css({
                    "height":h+"px",
                    "width":w+"px",
                    "margin-left":"-"+w/2+"px",
                    "margin-top":"-"+h/2+"px",
                    "border-radius":"3px",
                    "box-shadow":"0 0 10px rgba(127, 173, 220, 0.8), 0 0 10px #7FADDC inset"
                }).mousemove(function(e){
                    var i = o.offset();
                    mousePosition=(e.pageX - i.left < w / 2) ? 0 : 1;
                    o.css({"cursor":'url("'+imgres[mousePosition]+'"), pointer'});
                }).mouseout(function(){
                    o.css({"cursor":"pointer"});
                }).click(function(event){
                    changeAlbumImg(o);
                    event.stopPropagation();
                }).appendTo(box);
            }
        },
        changeAlbumImg=function(o){
            var len=albumImgCache.length,_=albumImgIndex;
            albumImgIndex +=mousePosition ? 1 : -1;
            albumImgIndex = albumImgIndex >=len ? len-1 : (albumImgIndex <=0 ? 0 : albumImgIndex);
            if(_!=albumImgIndex){
                o.remove();
                loadingImg.appendTo(box);
                loadImg();
            }
        };
        if(albumImgCache.length){
            loadImg();
        }else{
            httpHwnd=GM_xmlhttpRequest({
                "method":"GET",
                "url":url,
                "onload":function(response) {
                    var html=response.responseText,o=JSON.parse(html);
                    if(o.error_code=='22000'){
                        var C=o.songinfo;
                        for(var i=0;i<albumImgKey.length;i++){
                            var _=albumImgKey[i];
                            if(isUrl(C[_])){
                                 albumImgCache.push(C[_]);
                            }
                        }
                    }
                    if($.inArray(filesInfo.albumImg,albumImgCache)==-1){
                        albumImgCache.push(filesInfo.albumImg);
                    }
                    loadImg();
                }
            });
        }
        box.click(dialogClose);
        modal.element.click(dialogClose);
    }

})();

(function(){
    if($.inArray(APPCFG['hostname'],APPCFG['hostlist'])!=1){return;}
    var songInfo={"songids":[],"songbox":[]},domBox=[];
    $('#pageWrapper').bind('DOMNodeInserted',function(e){
        var o=$(this).find('.playlist');
        if(o.length){
            var tmpBox=[];
            $.each(o,function(k,v){
                if($.inArray(v,domBox)==-1){
                    domBox.push(v);
                    tmpBox.push(v);
                }
            });
            if(tmpBox.length){
                var tmpInfo=getSongInfo(tmpBox);
                setTimeout(function(){querySong(tmpInfo);},0);
            }
        }
    });
    function getSongInfo(arr){
        var idArr=[],boxArr=[];
        for(var i=0;i<arr.length;i++){
            var e=arr[i],o=$(e).find('li.song');
            boxArr=$.merge(boxArr,o);
            for(var j=0;j<o.length;j++){
                var id=$(o[j]).attr('data-id');
                idArr.push(id);
            }
        }
        songInfo['songids']=$.merge(idArr,songInfo['songids']);
        songInfo['songbox']=$.merge(boxArr,songInfo['songbox']);
        return {
            "songids":idArr,
            "songbox":boxArr
        };
    }
    function querySong(opt){
        showDownloadHtml();
        var url='http://y.baidu.com/data/songlink',data='songIds='+encodeURIComponent(opt.songids.join(','));
        GM_xmlhttpRequest({
            "method": 'POST',
            "url": url,
            "data": data,
            "headers": {"Content-Type": "application/x-www-form-urlencoded"},
            "onload": function(response) {
                var html=response.responseText,o=JSON.parse(html);
                if(o['errorCode']=='22000'){
                    showDownloadHtml(o['songs']);
                }
            }
        });
    }
    function getDownloadUrl(o,id,url){
        var data=o.attr('data-song'),obj=JSON.parse(data),baseurl='http://music.baidu.com/data/music/file?link=';
        if(obj['is_charge']==='0' && obj['artist_info']['fr_type']=='2'){
            //url='http://y.baidu.com/data/song/download?songId='+id+'&myfn='+encodeURIComponent(obj['title']+'.mp3');
        }
        return baseurl+encodeURIComponent(url);
    }
    function showDownloadHtml(opt){
        var boxs=songInfo['songbox'],icons=[
            APPCFG['imgres']['downimg'],//'http://bcs.duapp.com/opensource/images/appimg/min_red_download.png',
            APPCFG['imgres']['loadingimg_2']//'http://tieba.baidu.com/tb/static-ihome/img/loading2.gif'
        ],titles=[APPCFG['appname']+' - '+APPCFG['author'],'\u6570\u636e\u6b63\u5728\u52a0\u8f7d\u4e2d...'];
        for(var i=0;i<boxs.length;i++){
            var e=boxs[i],o=$(e),id=o.attr('data-id'),url='javascript:;',index=1;
            if(e.queryFinish){continue;}
            var box=e.box || $('<span style="margin:0px 5px;"/>').insertAfter(o.find('span.title'));
            if(opt && opt[id]){
                url=getDownloadUrl(o,id,opt[id]['link']);
                index=0;
                e.queryFinish=true;
            }
            box.html('<a href="'+url+'" title="'+titles[index]+'"><img src="'+icons[index]+'" alt="'+titles[index]+'"></a>');
            e.box=box;
        }
    }
})();
function getModalJs(){
    return '(function(b,c){var a=function(e){var d=this;this.cfg=b.extend({},{className:"dialogJmodal",resizeable:true},e);this.element=b("<div />").appendTo(document.body).css({display:"none",left:"0px",top:"0px",position:"absolute",backgroundColor:"#FFF",opacity:"0.7",zIndex:b.getzIndex(),width:this.width(),height:this.height()});if(this.cfg.show){this.show()}this.resizeFunc=function(){d.css("width",d.width());d.css("height",d.height());d.triggerHandler("resize")};if(this.cfg.resizeable){b(window).bind("resize",this.resizeFunc)}};a.prototype={constructor:a,show:function(){this.element.show.apply(this.element,arguments);this._processTages(1)},hide:function(){this.element.hide.apply(this.element,arguments);this._processTages(0)},width:function(){return b(window).width()},height:function(){return Math.max(b(document).height(),b("body").height(),b("html").height())},css:function(){this.element.css.apply(this.element,arguments)},triggerHandler:function(){this.element.triggerHandler.apply(this.element,arguments)},bind:function(){this.element.bind.apply(this.element,arguments)},remove:function(){this._processTages(0);this.element&&this.element.remove();b(window).unbind("resize",this.resizeFunc);for(var d in this){delete this[d]}},_processTages:function(g){var e=this;e.special=e.special||[];if(g){if(e.special.length>0){return}var h=b("SELECT,OBJECT,EMBED");if(this.cfg.safety){h=h.filter(function(i){return e.cfg.safety.find(this).length==0})}h.each(function(){var i=b(this);e.special.push({dom:this,css:i.css("visibility")});i.css("visibility","hidden")})}else{for(var f=0,d=e.special.length;f<d;f++){b(e.special[f].dom).css("visibility",e.special[f].css||"");e.special[f].dom=null}}}};b.modal=a;b.getzIndex=function(){b.zIndex=(b.zIndex||50000);return b.zIndex++}})($);';
}
function checkUpdate(){
    var js='var upinfo=document.getElementById("updateimg");';
    js+='upinfo.src="'+getUpdateUrl('checkupdate',1)+'";';
    js+='upinfo.onload=function(){';
    js+='upinfo.style.display="inline-block";';
    js+='};';
    js+='$(upinfo).parent("a").tooltip({str: \''+APPCFG['appname']+APPCFG['version']+' - <a href="http://www.duoluohua.com/download/"target="_blank">'+APPCFG['author']+'</a>\'}).tooltip("show");';
    loadJs(js);
}
function isUrl(url) {
    return /^(http|https):\/\/([\w-]+(:[\w-]+)?@)?[\w-]+(\.[\w-]+)+(:[\d]+)?([#\/\?][^\s<>;"\']*)?$/.test(url);
}
function getUpdateUrl(action,type){
    return 'http://app.duoluohua.com/update?action='+action+'&system=script&appname=baidumusicscript&apppot=scriptjs&frompot=songweb&type='+type+'&version='+APPCFG['version']+'&t='+t;
}
function loadJs(js){
    var oHead=document.getElementsByTagName('head')[0],
    oScript= document.createElement('script'); 
    oScript.type = 'text/javascript'; 
    oScript.text =js;
    oHead.appendChild( oScript); 	
}
function googleAnalytics(){
    var js="var _gaq = _gaq || [];";
    js+="_gaq.push(['_setAccount', 'UA-43134902-1']);";
    js+="_gaq.push(['_trackPageview']);";
    js+="function googleAnalytics(){";
    js+="	var ga = document.createElement('script');ga.type = 'text/javascript';";
    js+="	ga.async = true;ga.src = 'https://ssl.google-analytics.com/ga.js';";
    js+="	var s = document.getElementsByTagName('script')[0];";
    js+="	s.parentNode.insertBefore(ga, s)";
    js+="}";
    js+="googleAnalytics();";
    js+="_gaq.push(['_trackEvent','query_gm',String('"+APPCFG['version']+"')]);";
    loadJs(js);
}
googleAnalytics();






