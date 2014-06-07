// ==UserScript==
// @name           NicoVideo Post to SBM with selected tags
// @namespace      http://web.zgo.jp/
// @description    allows to search or post to SBM with multiple tags from tag list in NicoVideo watching page.
// @include        http://*.nicovideo.jp/watch/*
// ==/UserScript==
/*
  orignal Script  NicoVideo Multiple Tag Search Tool
  author  Yuki KODAMA (Twitter: kuy, Skype: netkuy)

  resource
  button-download.com [ http://www.button-download.com/ ]
*/
(function(){
// config
var useDelicious = true;// del.icio.usを使うかどうか
var deliciousShared = true;// shareするか(デフォルトON)

// はてブポスト機構を追加するGreasemonkeyスクリプト - nastackの日記 [ http://d.hatena.ne.jp/nastack/20080610/1213100873 ]が必要
/* Hatebu Poster
 * NicoVideo Post to SBM with selected tags
 * の順番に並べる
 * */
var useHatena = {
      "isUse" : false,// 使用するか
      "userName" : "",//ユーザー名
      "password" : ""//パスワード
}
/* 置換したいをタグのリスト
 * 完全マッチ
 * "置換したいタグ" : "置換した結果のタグ"',   の形で足していく。
 * */
var useReplaceList = true;// タグの置換を行う
var replaceLists = {
  "音楽" : "music",
  "歌ってみた" : "music",
  "演奏してみた" : "music",
}


// config 終わり


const title = unsafeWindow.Video.title;
var url = "http://www.nicovideo.jp/watch/" + unsafeWindow.Video.id;
insertCheckbox();

// functions
function sendRequest(posturl){
  GM_xmlhttpRequest({
    method: 'GET',
    url: posturl,
    onload:function(res) {
         log(res)
    }
  });
}
function replaceListTags(resTags){
  var aryTags = new Array();
  var replaceflag = false;
  for(var j=0;j<resTags.length;j++){
    for (var i in replaceLists) {
      reg = new RegExp(i, 'g');
      //console.log(reg +"→　"+replaceLists[i]);
      if(reg.test(resTags[j])){
          aryTags.push(resTags[j].replace(reg, replaceLists[i]));
          replaceflag = true;
          break;
      }else{
          replaceflag = false;
      }
    }
    if(!replaceflag)
        aryTags.push(resTags[j].replace(reg, replaceLists[i]));
  }
  //console.log(aryTags);
  return aryTags;
}
var SBMpost = {
  init : function(comment){
     this.comment = comment;
     var selectedTags = $x('id("video_tags")//input[@type="checkbox"]')
          .filter(function(cb){return cb.checked})
          .map(function(cb){return cb.value});
     if(useReplaceList){
       var useTags = replaceListTags(selectedTags);
     }else{
       var useTags = selectedTags
     }
     //console.log(this.comment);
     useTags = useTags.concat(this.commentToTags(this.comment));
     this.post(useTags);
  },
  post: function(useTags){
     if(useDelicious){
        var deliciousTags = useTags.join(' ');
        var shared = (deliciousShared) ? "yes" : "no";
        var posturl = 'https://api.del.icio.us/v1/posts/add?'
          + 'url='         + url
          + '&description='+ title
          + '&extended='   + this.comment + " <q>＊"+encodeURIComponent(unsafeWindow.Video.description.replace(/<\/?[^>]+>/gi, ""))+"</q>"
          + '&tags='       + deliciousTags
          + '&shared='     + shared;
        sendRequest(posturl);
     }
     if(useHatena.isUse){
       if(useHatena.userName && useHatena.password){
         if(!window.Hatebu)return; //ポスト機構ができていなかったら終了する
          var atom = new window.Hatebu(
            useHatena.userName, //ID
            useHatena.password //パスワード
          ).include(this);
          atom.post(
            url, //ブックマークするURL
            useTags, //タグ
            this.comment, //コメント
            function (){ //ポストが完了時実行される
              //console.log("post!")
            }
          )
       }
     }
  },
  commentToTags : function(comment){
    var ary = new Array();
    var reg = /\[([^\[\]]*?)\]/g
    var res = comment.match(reg);
    this.comment = comment.replace(reg, "")
    if(res){
      if(res.length == 1){
         ary = res[0].slice(1,-1).split(" ");
      }else if(res.length > 1){
         for(var i=0;i<res.length;i++){
          [].push.apply(ary,res[i].slice(1,-1).split(" "));
         }
      }
    }
    return ary;
  }
};
function insertCheckbox(){
    var tagElement = $x('id("video_tags")//a[@class="nicopedia"]')
    $if(tagElement, function(tags){
        tags.forEach(function(tag){
            tag.className += ' nvmtst';
            var span = $n('span');
            span.innerHTML = '<input type="checkbox" value="' + tag.innerHTML
                + '"onclick="nvmtst_onclick();" />';
            tag.parentNode.insertBefore(span, tag);
        });
        insertSearchButton();
        insertPostButton();
        hookEditButton();

    }, function(){
        setTimeout(insertCheckbox, 200);
    });
}
function insertPostButton(){
  var intPoint = $x('id("video_tags")/p')[0];
  var comment = document.createElement("input");
      comment.type = "text";
      comment.value = "";
      comment.size = 40;
      comment.setAttribute("class","postToSBM_form");

  var postButon = document.createElement("img");
      postButon.setAttribute("class","txticon");
      postButon.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACUAAAAOCAYAAACo9dX2AAACUklEQVRIic3OvWvqYBQGcP8X45sISkQifvEiEXG1EKSj6Fg7ioOTg7qIiFik2I+hk+KgILg5qJsxSUerdFR349bhucNFY9pcuZsN/CDncM55HxvDMM+EkLnD4VCujRAyZxjm2UYIeXe73V+/BSHk3cZx3Ec0GoUoilcXjUbBcdyHjWXZpSiKoJRa6vV60DQNmqah1+shmUyCUorX11ccDgdomoZCoQBKKZLJJGazGY5fJpMx7R9VKhXLt0RRBMuySxvLsstIJIJQKGRJVVV0u11ks1ms12t0u12USiXouo5UKoVGowEAkCQJo9EI0+kUoVAIkiQhHo8jlUqddkejEbLZLCRJsnwrEokYoSil8Pv9llRVxdPTE/x+PzqdDiaTCSaTCTqdzmlmt9shn8+jXq9jtVrh5ubm4p1/oZQaocLhMARBsKQoCobDIWq1GrbbLXK5HBRFQbvdNs0ca0VRoOs6isXijzvnO1bC4bARKhAIwOPxWFosFthut1gsFnh8fDz1jv/HulqtnupqtQpd13F7e2uaOd+xEggEjFA+nw8ul8uSLMtotVqmXqvVgizLcLlcCAaDAIB0Om2aGQwGGAwGF+985/P5jFCCIMDpdFqaz+d4eHgw9WKxGPb7PcbjMTabDZbLJZxOJ/r9Pvr9Pt7e3rDf73F/f3/xzneCIBihvF4vCCGWEokERFH80RcEAeVyGXd3d6bZZrOJcrmMRCLxX3fOeb1eIxTP87Db7VfH8/zfUBzHffI8j9+C47hPG8MwL4QQ2eFwqNdGCJEZhnn5A6H9qZheoauQAAAAAElFTkSuQmCC";
      postButon.addEventListener("click",function(evt){
        intPoint.appendChild(comment);
        comment.focus();
        postButon.removeEventListener('click', arguments.callee, false);

        comment.addEventListener('keypress', function(e) {
            var c = (e.ctrlKey);
            var v = (e.keyCode == 13);
            if(c && v){
              SBMpost.init(comment.value);
              intPoint.removeChild(comment);
              comment.removeEventListener('keypress', arguments.callee, false);
            }
        },false);
        postButon.addEventListener("click",function(evt){
          SBMpost.init(comment.value);
          intPoint.removeChild(comment);
          postButon.removeEventListener('click', arguments.callee, false);
        },false);
      },false);
  intPoint.appendChild(postButon);
}

function insertSearchButton(){
    if($('nvmtst_search')) return;
    $x('id("video_tags")/p')[0].innerHTML
        += '<nobr>&nbsp;&nbsp;<a style="color: rgb(0,51,255);" href="javascript:void(0);" id="nvmtst_search">【タグ検索】</a></nobr>'
        +  '<nobr>&nbsp;&nbsp;<a style="color: rgb(0,51,255);" href="javascript:void(0);" id="nvmtst2_search">【文字検索】</a></nobr>';
}
function hookEditButton(){
    $IF($x('id("video_tags")/p//a[not(@id) and starts-with(@href,"javascript:")]'), function(edit){
        edit.addEventListener('click', function(){hookFinishButton()}, false);
    }, function(){
        setTimeout(hookEditButton, 200);
    });
}
function hookFinishButton(){
    $IF($x('id("tag_edit_form")//form[starts-with(@action,"javascript:")]/input'), function(finish){
        finish.addEventListener('click', function(){insertCheckbox()}, false);
    }, function(){
        setTimeout(hookFinishButton, 200);
    });
}
unsafeWindow.nvmtst_onclick = function(){
    var button = $('nvmtst_search');
    var useTags = $x('id("video_tags")//input[@type="checkbox"]')
            .filter(function(cb){return cb.checked})
            .map(function(cb){return cb.value})
            .join('+');
    button.href = 'http://www.nicovideo.jp/tag/' + useTags
    var button2 = $('nvmtst2_search');
        button2.href = 'http://www.nicovideo.jp/search/' + useTags;
}

GM_addStyle(['',
'  .postToSBM_form{',
'      border:2px solid #e8e8e8;',
'      -moz-border-radius: 5px;',
'  }',
'  .postToSBM_form:focus{',
'    background-color: #cceeff;',
'  }',
''].join("\n"));
// utils
function $if(a,t,f,o){(a!=null&&0<a.length)?t.call(o,a):f.call(o)}
function $IF(a,t,f,o){(a!=null&&0<a.length)?t.call(o,a[0]):f.call(o)}
function $x(x,c){c=c||document;var r=document.evaluate(x,c,null,4,null);
for(var i,nodes=[];i=r.iterateNext();nodes.push(i));return nodes}
function $(id){return document.getElementById(id)}
function $n(tagName){return document.createElement(tagName)}
function log(m) {
    if (unsafeWindow.console) {
        unsafeWindow.console.log(m);
    }else{
        console.log(m); //GM_log(m)でも同じ。
    }
}
})();