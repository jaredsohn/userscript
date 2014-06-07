// ==UserScript==
// @name           Twitter follow message
// @namespace      http://web.zgo.jp/
// @include        http://twitter.com/*
// @include        https://twitter.com/*
// @exclude        http://twitter.com/home
// @exclude        https://twitter.com/home
// @description    When press follow button, send out update
// ==/UserScript==

var prefix = ".";          // prefix
var postfix = " をフォローしました。";// suffix
var alwaysUseTemplate = true;// コメントを入力した時もsuffix(接尾辞)を使う
// falseの場合 ".@username コメント内容" となる。

// prefix @username postfix
    function post(status) {
      GM_xmlhttpRequest({
        method : 'post',
        url    : 'http://twitter.com/statuses/update.json',
        headers: {
          'Content-type': 'application/x-www-form-urlencoded',
        },
        data   : 'status=' + encodeURIComponent(status),
        onload : function(res) {
          //if (useAlert) alert('twittered!')
          debug('Loaded - ' + status + ' - ' + res.status + ': ' + res.statusText)
        },
        onerror: function(res) {
          if (useAlert) alert('post failed!')
          error('Failed - ' + status + ' - ' + res.status + ': ' + res.statusText)
        },
      })
    }
   function init(comment) {
      var m = document.getElementsByName("page-user-screen_name")[0].content;
      if (m == null) return
      if(!alwaysUseTemplate){//コメントがあった場合は接尾辞を抜く
        if(comment){
          var s = prefix + "@" + m + " " + comment;
        }else{
          var s = prefix + "@" + m + postfix;
        }
      }else{
          var s = prefix + "@" + m + postfix + comment;
      }
      post(s);
    }
var isFollowing = document.getElementsByClassName("user following ")[0];
if(isFollowing)
  return;
var fl_button = document.getElementsByClassName("follow-action")[0];
if(!fl_button)
  return;
var comment = document.createElement("input");
  	comment.type = "text";
  	comment.value = "";
    comment.setAttribute("class", "follow_button_message");
    comment.size = 30;
var input1 = document.createElement("input");
    input1.setAttribute('name','follow_button_check');
    input1.setAttribute('type','checkbox');
    input1.checked = true;
var txt1 =document.createTextNode('通知する');
fl_button.addEventListener('click',function(){
  fl_button.removeEventListener('click', arguments.callee, false);
  if(input1.checked)
    init(comment.value);
}, false);
var kara = document.createElement("li");
kara.id = "GM_Twitter_follow_message"
kara.appendChild(input1);
kara.appendChild(txt1);
kara.appendChild(comment);
insertAfter(kara, fl_button);
GM_addStyle(<><![CDATA[
  .follow_button_message{
      font-size:large !important;
      margin: 1px 3px;
  }
  #GM_Twitter_follow_message{
	  margin: 1px auto;
	  height: auto;
  }
]]></>); 

function insertAfter(newNode, node) {
	return node.parentNode.insertBefore(newNode, node.nextSibling);
}

