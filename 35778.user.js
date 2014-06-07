// ==UserScript==
// @name           Douban saveto Delicious
// @namespace      http://npchen.blogspot.com
// @description    推荐和回复时自动保存delicious书签(v1.5.1稳定版)
// @include        http://www.douban.com/*
// @include        http://9.douban.com/*
// @exclude        http://www.douban.com/group/*/new_topic
// @exclude        http://www.douban.com/subject/*/new_review
// @exclude        http://www.douban.com/subject/*/new_post
// @exclude        http://www.douban.com/note/create*
// @exclude        http://www.douban.com/event/create*
// @exclude        http://www.douban.com/event/*/new_post
// @exclude        http://www.douban.com/photos/album/create
// @exclude        http://www.douban.com/photos/album/*/upload
// @exclude        http://www.douban.com/event/album/*/upload
// @exclude        http://www.douban.com/contacts/*
// @exclude        http://www.douban.com/mine/board*
// @exclude        http://www.douban.com/people/*/board*
// @exclude        http://www.douban.com/*/edit
// @exclude        http://www.douban.com/group/*/group_edit
// @exclude        http://www.douban.com/doumail/*
// @require        http://userscript-autoupdate-helper.googlecode.com/svn/trunk/autoupdatehelper.js
// @author         NullPointer
// @version        1.5
/* @reason
   1.5.1 增加对9点推荐的支持，
   @end*/
// ==/UserScript==

var thisScript = {
   name: "Delicious自动保存",
   id: "35778",
   version:"1.5.1"
}

var updater = new Updater(thisScript);
updater.check();   

var ptitle = "";
var purl = window.location.href;
var tag = "douban"; //可以自定义的默认标签
var mark = "标记"; //可以自定义的关键字，有关键字或有{}都会触发书签保存
var tag_pattern = /{(.)+?(?=})/g; 
//你可以在一对花括号{}中间括住任何你想额外补充的标签，
//标签直接用空格隔开，比如{movie 影评}, 
//你也可以在回复里放上多对{}标记，{movie}adfdf&*&#% {电影 八卦}这样
//如果你看不懂这行的正则表达式，就不要改它。

var classifier = {
   group: "小组",
   note: "日记",
   photos: "相册",
   doulist: "豆列",
   review: "评论",
   event: "活动",
   artist: "音乐人",
   subject: "书影音",
   album: "相册",
   discussion: "论坛",
}  

window.addEventListener('submit', newsubmit, true);

HTMLFormElement.prototype._submit = HTMLFormElement.prototype.submit;
HTMLFormElement.prototype.submit = newsubmit;

function newsubmit(event) {
    var target = event ? event.target : this;
    var d = get_data(target);
    if (d!=null) saveto_delicious(d);
    this._submit();
}

function saveto_delicious(d){
   if (GM_xmlhttpRequest){
     GM_xmlhttpRequest({
       method: 'POST',
       headers: {'User-Agent': 'Mozilla/4.0 (compatible) Greasemonkey',
          'Accept': 'application/atom+xml,application/xml,text/xml',
          'Content-type': 'application/x-www-form-urlencoded'},
       url: 'https://api.del.icio.us/v1/posts/add',
       data: d,
       onload: function(responseDetails) {
                 if (responseDetails.status == 200)
                      window.status="添加delicious书签成功! "+tag;
                 else
                      window.status="添加delicious书签失败："+responseDetails.status;
                }       
       });   
    }
    else alert('请升级GreaseMonkey到最新版本！');
}

function get_class(url) {
    words = url.split('\/');
    var c = classifier[words[3]];
    if (c==undefined) c = classifier[words[5]];
    if (c!=undefined) return c;
    if (words[2]=='9.douban.com') return '博客';
    return "未定义";
}

function get_data(target) {
    var t = target.getElementsByTagName('textarea')[0].value;
    var tags=t.match(tag_pattern); 
    if ((t.search(mark)==-1)&&(tags==null)) return null;
    
    if (tags!=null){
      for (i=0; i<tags.length; i++){
        tag += " "+tags[i].substring(1);
      }
    }
    else tag += ' temp';
    
    ptitle = document.getElementsByTagName('title')[0].text;
    purl = purl.replace(/[?#](.)+$/,"");
    tag += " "+get_class(purl);
    
    return 'url='+encodeURIComponent(purl)+'&description='+encodeURIComponent(ptitle)+'&extended='+encodeURIComponent(purl)+'&tags='+tag+'&shared=no';
}


 

