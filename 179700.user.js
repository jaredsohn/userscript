// ==UserScript==
// @name          ニコニコ動画 right click to see ID
// @namespace     http://userscripts.org/users/497722/scripts
// @description   コメント欄コンテキストメニューにID表示を追加。公式動画「非」対応
// @include       http://www.nicovideo.jp/watch/*
// @version       1.0.1
// @grant         GM_xmlhttpRequest
// @icon          data:image/png;base64,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
// ==/UserScript==

// 公式はAPIじゃないとダメ。なら最初からAPIで良いよね。面倒。
// this.commentListModel.getComment(a.resNo)で取れるみたいだけど・・・
// commentLists に userName ってあるけど、常に空文字が返るので騙されてはいけない（使えない）

var dbg = false
  , nickNameCache = {}
  , element_Added = false
  , showId = document.createElement("li")
  , id = new Text()
  , a = document.createElement("a")
  a.target = "_blank"
  a.style.marginLeft = "2em"
  showId.appendChild(id)
  showId.appendChild(a)

// <li>[Text]  <a></a></li>

document.getElementById("commentDefault").addEventListener("contextmenu", fn, true)

function fn(e) {
  var resNo = e.target.parentNode.childNodes[3].textContent.match(/\d+/)[0]
  dbg && console.log(resNo)
  if ( resNo && !element_Added ) {
    setTimeout(appendShowId, 4) // 要素が追加されるまで待つ
  }
  resNo && setUserName(resNo)
}


function appendShowId() {
  var ContextMenu = document.getElementById("commentContextMenuContainer")
    , ul = ContextMenu.getElementsByTagName("ul")[0]
  ul.appendChild(showId)
  element_Added = true
}

function setUserName(num) {
  // get user id
  var selectedCommentListName = document.querySelector(".threadList .selected").dataset.nicoThreadName
    , uCommemtsArray = unsafeWindow.WatchApp.namespace.init.PlayerInitializer.commentPanelViewController.commentPoolContainer._container[selectedCommentListName]
  dbg && console.log(selectedCommentListName)

  if ( !uCommemtsArray.length ) {
    return
  }

  for(var i=uCommemtsArray.length; i--;){
    if (uCommemtsArray[i].resNo == num) {
      id.nodeValue = uCommemtsArray[i].userID
      break
    }
  }


  dbg && console.log( id.nodeValue )

  if ( isNaN(id.nodeValue * 1) ) {
    a.style.display = "none"
    dbg && console.log("184")
  }else {
    a.style.display = ""
    getUserNamefromId(id.nodeValue)
    a.href = "http://www.nicovideo.jp/user/" + id.nodeValue
  }

}

function getUserNamefromId(userId) {
  if( nickNameCache[userId] ){
    a.textContent = nickNameCache[userId] || "誰かな"
    dbg && console.log("chached")
    return
  }

  if (this.GM_xmlhttpRequest) {
      GM_xmlhttpRequest({
        method: "GET",
        url: "http://seiga.nicovideo.jp/api/user/info?id=" + userId,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        onload: function(response) {
          var responseXML
          responseXML = new DOMParser().parseFromString(response.responseText, "text/xml")
          var nicknameEl = responseXML.getElementsByTagName("nickname")[0]
          dbg && console.log(nicknameEl)
          if (nicknameEl) {
            a.textContent = nicknameEl.firstChild.nodeValue
            nickNameCache[userId] = nicknameEl.firstChild.nodeValue
            dbg && console.log(nickNameCache)
          } else {
            // 名前が取れない場合もあるのでダミー文字がいる
            a.textContent = "誰かな"
          }
    
        }
      });
  }
  else {
    var data = {
    	'mode': 'details',
    	'link_id': "sm6301392",
    	'user_ids': userId, // スペース無しのコンマ区切り
    	'last_like_time': "2013-10-10 10:00:00",
    	'innerPage': 1
    };

    var xhr = new XMLHttpRequest();
    xhr.onload = function() {
      var nicknameEl = xhr.response.getElementsByClassName("userIcon")[0]
      if(nicknameEl){
        a.textContent = nicknameEl.title
        nickNameCache[userId] = nicknameEl.title
        dbg && console.log(nickNameCache)
      }else{
        a.textContent = "誰かな"
      }
    }
    var url = "/my/nicoru" + "?" + Object.keys(data).map(function(e){
      return (e + "=" + data[e])
    }).join("&")
    xhr.open("GET", url);
    xhr.responseType = "document"
    xhr.send();
  }
}
/*

// コメントをテーブルで表示する
// nicofinder開いたほうが便利じゃないですか?

document.getElementById("commentDefaultHeader").childNodes[0].insertAdjacentHTML("afterend", "<a id='all_commnet_table'>All")

document.getElementById("all_commnet_table").onclick = function(){

console.log(unsafeWindow, window, unsafeWindow.WatchApp, window.WatchApp, this)

var WApp = unsafeWindow.WatchApp.ns.model.player.NicoPlayerConnector
  , uCommemtsArray = WApp.commentLists[0].comments

var table = document.createElement("table")
table.border = "1"
table.insertAdjacentHTML("afterbegin", "<tbody><tr><td>time<td>comment<td>id<td>no.</tbody>")
var df = document.createDocumentFragment()

for(var i=0; i<uCommemtsArray.length; i++){
  var c = uCommemtsArray[i]
    , tr = table.rows[0].cloneNode(true)
    , td = tr.cells
  td[0].textContent = computeDuration(c["vpos"])
  td[1].textContent = c["message"]
  td[2].textContent = c["userID"]
  td[3].textContent = c["resNo"]
  df.appendChild(tr)
}

table.appendChild(df)
var win1 = window.open("")
win1.document.body.appendChild(table)

}

// ============================================

function computeDuration(ms){
    var h = String(Math.floor(ms / 3600000) + 100).substring(1);
    var m = String(Math.floor((ms - h * 3600000)/60000)+ 100).substring(1);
    var s = String(Math.round((ms - h * 3600000 - m * 60000)/1000)+ 100).substring(1);
    return h+':'+m+':'+s;
}

*/