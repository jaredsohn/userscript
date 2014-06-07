// ==UserScript==
// @name           Hatena Bookmark Related Entry Viewer
// @namespace      http://ame.yumenosora.net/
// @description    shows related entries from Hatena Bookmark.
// @author         Yune Kotomi
// @version        0.1
// @include        *
// @exclude        http://b.hatena.ne.jp/*
// @exclude        http://localhost:3000/*
// @exclude        http://reader.livedoor.com/reader/
// @exclude        http://www.google.co.jp/search*
// ==/UserScript==

GM_xmlhttpRequest({
  method: "GET", 
  url: 'http://b.hatena.ne.jp/entry/json/?url=' + 
    encodeURIComponent(location.href),
  
  onload: function(x){
    var data = eval(x.responseText);
    if(data == null || data.related == null){ return }
    
    if(data.related.length > 0){
      /* 関連エントリー一覧を開くためのアイコン */
      var icon = document.createElement('div');
      with(icon.style){
        width = "10px";
        height = "10px";
        position = "fixed";
        backgroundColor = "#b5b8e8";
        top = "3px";
        right = "15px";
        zIndex = "1000";
      }
      document.body.appendChild(icon);
      icon.addEventListener('mouseover', function(){
        this.nextSibling.style.display = "block";
      }, false);
      
      /* 関連エントリーを入れる箱 */
      var related = data.related;
      var relatedBox = document.createElement('div');
      document.body.appendChild(relatedBox);
      with(relatedBox.style){
        top = "3px";
        right = "15px";
        position = "fixed";
        color = "black";
        backgroundColor = "white";
        borderColor = "#b5b8e8";
        borderStyle = "solid";
        borderWidth = "1px";
        textAlign = "left";
        padding = "3px";
        zIndex = "1000";
        display = "none";
      }
      
      /* リストを閉じるボタン */
      var relatedClose = document.createElement('div');
      with(relatedClose.style){
        bottom = "0px";
        right = "0px";
        position = "absolute";
        backgroundColor = "white";
        width = "5ex";
        fontSize = "10px";
      }
      relatedClose.innerHTML = "close";
      
      relatedClose.addEventListener('mouseover', function(){
        this.parentNode.style.display = "none";
      }, false);
      relatedBox.appendChild(relatedClose);
      
      /* リスト本体 */
      var relatedList = document.createElement('ul');
      relatedList.style.fontSize = "12px";
      relatedList.style.paddingLeft = "25px";
      relatedBox.appendChild(relatedList);
      
      var max = related.length;
      if(max > 5){
        max = 5
      }
      
      /* リスト生成処理 */
      for(var index = 0; index < max; index++){
        var entry = related[index];
        var line = document.createElement('a');
        line.href = entry.url;
        line.style.color = "black";
        line.innerHTML = entry.title;
        
        var li = document.createElement('li');
        li.appendChild(line);
        li.style.listStyleImage = "url('http://favicon.hatena.ne.jp/?url=" + 
          encodeURIComponent(entry.url) + "')";
        
        relatedList.appendChild(li);
      }
      
      var bookmarkIcon = document.createElement('a');
      bookmarkIcon.href = 
        "http://b.hatena.ne.jp/entry/" + location.href;
      
      var bookmarkIconImage = document.createElement('img');
      bookmarkIconImage.src = 
        "http://b.hatena.ne.jp/entry/image/" + location.href;
      
      bookmarkIcon.appendChild(bookmarkIconImage);
      relatedBox.appendChild(bookmarkIcon);
    }
  }
});
