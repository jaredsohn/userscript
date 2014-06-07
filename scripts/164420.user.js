// ==UserScript==
// @name       BaiduMusicDownloadLinkResolver
// @namespace  http://openszone.com
// @author  Myfreedom614 <openszone@gmail.com>
// @version    1.0
// @description  登陆百度账号，在歌曲页面点击下载即可自动显示百度音乐多个码率的下载链接，无需VIP会员
// @homepage    https://userscripts.org/scripts/show/164420
// @updateURL   https://userscripts.org/scripts/source/164420.meta.js
// @downloadURL https://userscripts.org/scripts/source/164420.user.js
// @match      http://music.baidu.com/song/*/download*
// @grant none
// @copyright  2013,Myfreedom614
// ==/UserScript==

/* History
 * 2013-06-12 v1.0 各位端午快乐，此版本是对0.9的某些功能修正！
 * 2013-06-09 v0.9 对于可以直接下载 320KBPS 的音乐，不会弹出登录窗口，直接显示链接
 * 2013-06-06 v0.8 适用于百度音乐新版，支持受VIP限制下载的 320KBPS 解析，暂时不支持 无损品质 解析
 * 2013-06-06 v0.7 百度音乐改版，临时升级，暂时不支持VIP限制下载的KBPS，稍后更新版本会支持
 * 2013-04-19 v0.6 目前仅支持有版权音乐解析，目前问题是可能会弹出帐号登录界面，要求登陆
 * 2013-04-10 v0.5 改进对无版权音乐的支持
 * 2013-04-08 v0.4 支持解析因版权原因，不允许下载的百度音乐，且修改不允许点击的下载按钮为可点击
 * 2013-04-08 v0.3 百度音乐下载策略调整，原方式失效，改变下载链接获取方式
 * 2013-04-08 v0.2 改进Firefox兼容性;同时显示下载链接和下载按钮
 * 2013-04-07 v0.1 在本人浏览器书签版本基础上修改为UserScript版本，点击下载按钮自动显示结果页面
 * By Myfreedom614
 */

function vipcrack()
{
    var notvip=document.getElementsByClassName('not-vip-download')[0];
    notvip.className=notvip.className.replace('btn-f','btn-c').replace('not-vip-download','download');
}

//320KBPS不可直接下载
if(document.getElementsByClassName('not-vip-download')[0].id == "320" )
{
    var f = function()
    {   
        function vipcrack()
        {
            var notvip=document.getElementsByClassName('not-vip-download')[0];
            notvip.className=notvip.className.replace('btn-f','btn-c').replace('not-vip-download','download');
        }
        
        ting.connect.downloadSong(null,{songId:window.location.href.match(/song\/([^/]*)/)[1],rate:320},function(r){
            //alert('进入此函数');
            if(r.errorCode==22000)
            {
             link_320=r.data.linkList[0].link;
            }
            //alert(link_320);
            
            var url=location.href;
            var songid=url.match(/[1-9][0-9]*/);
            var kbps;
            var link;
            var songname=document.getElementsByClassName("song-link-hook")[0].getAttribute('title');
            var authorname=document.getElementsByClassName("author_list")[0].getAttribute('title');
            var isListenonly=document.getElementsByClassName('listen-only').length+(document.getElementsByClassName('li').length>0?0:1);
            //alert( url + '\n' + songid + '\n' + songname + '\n' + authorname + '\n' + isListenonly );

            var str = '<HTML><HEAD><BASE HREF="';
            str += document.URL;
            str += '"></HEAD><BODY>';
            str+='<h2>'+songname+' - '+authorname+'</h2>------------------------';
            if( isListenonly == 1 ){
                str +='<br><span style=\'color: red;\'>因为版权原因，百度不允许下载，暂时不支持解析！</span><br>';
            }
            else
            {
                vipcrack();vipcrack();
                var a=document.getElementsByClassName('download');
                for(i = 0; i < a.length; i++) 
                {
                    kbps='';
                    link='';
                    kbps=a[i].getAttribute("id");
                    if(kbps!="320" && kbps!="1000")
                    {
                        link=a[i].getAttribute("href").replace("/data/music/file?link=","");
                        if(link!='')
                            str +='<h3>'+ kbps +'kbps: </h3><a href=\''+link+'\' title=\'下载链接\' style=\'text-decoration: none;color: orange;\'>下载链接</a>   <input type="button" value="点击下载" onclick="window.open(\''+link+'\')"><br>';
                        else
                            str +='<h3>'+ kbps +'kbps: </h3><span style=\'color: red;\'>此KBPS无下载链接</span><br>';
                    }
                    else if(kbps=="320")
                    {
                        if(link_320!='')
                        {
                            str +='<h3>'+ kbps +'kbps: </h3><a href=\''+link_320+'\' title=\'下载链接\' style=\'text-decoration: none;color: orange;\'>下载链接</a>   <input type="button" value="点击下载" onclick="window.open(\''+link_320+'\')"><br>';
                        }
                        else
                        {
                            link=a[i].getAttribute("href").replace("/data/music/file?link=","");
                            if(link!='')
                                str +='<h3>'+ kbps +'kbps: </h3><a href=\''+link+'\' title=\'下载链接\' style=\'text-decoration: none;color: orange;\'>下载链接</a>   <input type="button" value="点击下载" onclick="window.open(\''+link+'\')"><br>';
                            else
                                str +='<h3>'+ kbps +'kbps: </h3><span style=\'color: red;\'>此KBPS无下载链接</span><br>';
                        }
                    }
                    else
                    {
                        //1000KBPS
                        str +='<h3>'+ kbps +'kbps: </h3><span style=\'color: red;\'>无损品质暂不支持</span><br>';
                    }
                }
            
            }
            str += '<br>Powered By <a href="http://openszone.com" title="About Myfreedom614" target="_blank">Myfreedom614</a></BODY></HTML>';
            for (var i = document.styleSheets.length - 1; i >= 0; i--) 
            {
                document.styleSheets[i].disabled = true;
            }
            document.head.innerHTML='<title>'+songname+' - '+authorname+'</title>';
            document.body.innerHTML=str;
        
        },function(){

        if(isListenonly!=''){
            str +='<br><span style=\'color: red;\'>因为版权原因，百度不允许下载，暂时不支持解析！</span><br>';
        }
        else
        {   
            vipcrack();vipcrack();
            
            var a=document.getElementsByClassName('download');
            for(i = 0; i < a.length; i++) 
            {
                kbps='';
                link='';
                kbps=a[i].getAttribute("id");
                link=a[i].getAttribute("href").replace("/data/music/file?link=","");
                if(link!='')
                    str +='<h3>'+ kbps +'kbps: </h3><a href=\''+link+'\' title=\'下载链接\' style=\'text-decoration: none;color: orange;\'>下载链接</a>   <input type="button" value="点击下载" onclick="window.open(\''+link+'\')"><br>';
                else
                    str +='<h3>'+ kbps +'kbps: </h3><span style=\'color: red;\'>此KBPS无下载链接</span><br>';
            }
        }
        str += '<br>Powered By <a href="http://openszone.com" title="About Myfreedom614" target="_blank">Myfreedom614</a></BODY></HTML>';
        for (var i = document.styleSheets.length - 1; i >= 0; i--) 
        {
            document.styleSheets[i].disabled = true;
        }
        document.head.innerHTML='<title>'+songname+' - '+authorname+'</title>';
        document.body.innerHTML=str;
    });//end of ting

},
s=document.documentElement.appendChild(document.createElement('script'));
s.textContent='('+f+')()';

}
else
{
    var url=location.href;
    var songid=url.match(/[1-9][0-9]*/);
    var kbps;
    var link,link_320='';
    var songname=document.getElementsByClassName("song-link-hook")[0].getAttribute('title');
    var authorname=document.getElementsByClassName("author_list")[0].getAttribute('title');
    var isListenonly=document.getElementsByClassName('listen-only').length+(document.getElementsByClassName('li').length>0?0:1);
    //alert( url + '\n' + songid + '\n' + songname + '\n' + authorname + '\n' + isListenonly );

    var str = '<HTML><HEAD><BASE HREF="';
    str += document.URL;
    str += '"></HEAD><BODY>';
    str+='<h2>'+songname+' - '+authorname+'</h2>------------------------';

    var a=document.getElementsByClassName('download');
    for(i = 0; i < a.length; i++) 
    {
        kbps='';
        link='';
        kbps=a[i].getAttribute("id");
        if(kbps!="1000")
        {
            link=a[i].getAttribute("href").replace("/data/music/file?link=","");
            if(link!='')
                str +='<h3>'+ kbps +'kbps: </h3><a href=\''+link+'\' title=\'下载链接\' style=\'text-decoration: none;color: orange;\'>下载链接</a>   <input type="button" value="点击下载" onclick="window.open(\''+link+'\')"><br>';
            else
                str +='<h3>'+ kbps +'kbps: </h3><span style=\'color: red;\'>此KBPS无下载链接</span><br>';
        }
        else
        {
            //1000KBPS
            str +='<h3>'+ kbps +'kbps: </h3><span style=\'color: red;\'>无损品质暂不支持</span><br>';
        }
    }
    str += '<br>Powered By <a href="http://openszone.com" title="About Myfreedom614" target="_blank">Myfreedom614</a></BODY></HTML>';
    for (var i = document.styleSheets.length - 1; i >= 0; i--) 
    {
        document.styleSheets[i].disabled = true;
    }
    document.head.innerHTML='<title>'+songname+' - '+authorname+'</title>';
    document.body.innerHTML=str;
}