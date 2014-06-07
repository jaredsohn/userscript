// ==UserScript==
// @name           NicoVideo Simple UI
// @namespace      http://endflow.net/
// @description    UI enhancement for NicoVideo.
// @include        http://www.nicovideo.jp/*
// ==/UserScript==
// @author         Yuki KODAMA (twitter:kuy, skype:netkuy)
// @version        0.1.1 [2008-06-23]
// @history        [2008-06-23] 0.1.0 first release
//                 [2008-06-23] 0.1.1 add more options

(function(){
var tasks = [{
    xpath:'//div[contains(@class,"ads_")]//div[contains(@id,"web_pc_")]/..',
    limit:2,
    retry:10,
    passOne:function(e){
        e.parentNode.removeChild(e);
    }
},{
    xpath:'id("billboard_container")',
    style:"body{background:#ffffff;}",
    passOne:function(e){
        e.parentNode.removeChild(e);
    }
},{
    xpath:'//div[@class="user_bg"]/table/tbody/tr/td',
    style:"div.user_bg table tbody tr td{padding:0px 0px 0px 6px;} div.user_bg input.search{background:#ffffff;}",
    passAll:function(elems){
        var user = document.createElement('TD');
        user.nowrap = 'nowrap';
        var anchor = $x('id("PAGEHEADER")/div/table/tbody/tr/td/a')[0];
        user.innerHTML = '<a href="' + anchor.href + '><strong>' + anchor.firstChild.innerHTML + '</strong></a>';

        var shortcuts = document.createElement('TD');
        shortcuts.width = '100%';
        var ranking = $x('id("PAGEHEADER")//a').filter(function(a){return a.href.indexOf('ranking') != -1})[0];
        shortcuts.innerHTML = '<a href="http://www.nicovideo.jp/">トップ</a>'
            + ' | ' + '<a href="' + ranking.href + '">ランキング</a>';

        var menu = document.createElement('TD');
        menu.nowrap = 'nowrap';
        menu.innerHTML = <><![CDATA[
            <select onchange="jumpMENU('parent',this,0)">
            <option selected="">メニュー</option>
            <option value="http://www.nicovideo.jp/newarrival">新着動画</option>
            <option value="http://www.nicovideo.jp/random">きまぐれ検索</option>
            <option value="http://www.nicovideo.jp/tag">注目のタグ</option>
            <option value="http://www.nicovideo.jp/my">マイページ</option>
            <option value="http://www.nicovideo.jp/history">最近見た動画</option>
            <option value="https://secure.nicovideo.jp/secure/logout">ログアウト</option>
            </select>
        ]]></>;

        var search = document.createElement('TD');
        search.nowrap = 'nowrap';
        search.innerHTML = <><![CDATA[
            <form action="search" method="get" onsubmit="var target=this.tag.flag?'tag':'search';location.href='http://www.nicovideo.jp/'+target+'/'+encodeURIComponent(this.s.value.strip()).replace(/%20/g, '+'); return false;">
            <input name="ref" value="top" type="hidden">
            <div style="padding: 0px 2px; background-color: transparent; background-repeat: no-repeat; background-attachment: scroll; background-position: center center;">
            <table summary="検索" style="margin: 0px auto;" border="0" cellpadding="0" cellspacing="0" height="32">
            <tbody><tr>
            <td style="padding: 0px;"><input name="s" value="" class="search" type="text"></td>
            <td><input class="submit" value="キーワード" type="submit" name="keyword" onclick="this.flag=true"></td>
            <td><input class="submit" value="タグ" type="submit" name="tag" onclick="this.flag=true"></td>
            </tr>
            </tbody></table>
            </div>
            </form>
        ]]></>;

        // remove all
        var parent = elems[0].parentNode;
        elems.forEach(function(e){
            e.parentNode.removeChild(e);
        });

        // append all
        parent.appendChild(user);
        parent.appendChild(shortcuts);
        parent.appendChild(menu);
        parent.appendChild(search);
    }
},{
    xpath:'id("PAGEHEADER")/table',
    passOne:function(e){
        e.parentNode.removeChild(e);
    }
}];
var sweeper = function(){
    var count = 0;
    tasks.forEach(function(task){
        if(task.done) return;
        count++;
        if(task.style) GM_addStyle(task.style);
        var result = $x(task.xpath);
        if(result && result.length != 0){
            var ret = task.passOne ? task.passOne(result[0]) : task.passAll(result);
            if(ret !== false){
                if(task.limit){
                    if(!task.count) task.count = 0;
                    task.count++;
                    if(task.limit <= task.count) task.done = true;
                }else{
                    task.done = true;
                }
            }
        }
        if(task.retry){
            if(!task.retryCount) task.retryCount = 0;
            task.retryCount++;
            if(task.retry <= task.retryCount) task.done = true;
        }
    });
    if(count != 0) setTimeout(sweeper, 250);
}
setTimeout(sweeper, 10);
function $x(x,c){c=c||document;var res=document.evaluate(x,c,null,XPathResult.UNORDERED_NODE_ITERATOR_TYPE,null);
for(var i,nodes=[];i=res.iterateNext();nodes.push(i));return nodes;}
})();
