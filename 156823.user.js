// ==UserScript==
// @name        ニコニコ動画にライトを付ける
// @namespace   http://userscripts.org/users/497722
// @description Dailymotionみたいに。
// @include     http://www.nicovideo.jp/watch/*
// @version     0.1.1
// @grant       none
// ==/UserScript==

// 詰めが甘いと思うけどｷﾆｼﾅｲ
(function(){
// 原宿とQ
if (document.getElementById("videoHeader")){
  var target = document.getElementById("videoHeader")
  var target2 = document.getElementById("videoHeader")
}
else {
  var target = document.getElementById("video_controls")
  var target2 = document.getElementById("video_controls")
}

//==================================
// スクリーン
var screen=document.createElement("div");
screen.style.display="none";
screen.style.width="100%";
screen.style.height="100%";
screen.style.background="black";
screen.style.opacity = "0.91";
  screen.style.position="fixed";
  screen.style.top="0";
  screen.style.left="0";
  screen.style.zIndex="9999"; //コメントを残すなら3 でも邪魔なニコメンドも出る。スクリーンを追加すればいいだけですけどね…
target.insertBefore(screen, target.firstChild);

//==================================
// ボタン
var e=document.createElement("button");
e.innerHTML="●";
e.title="スクリーンon/off"
e.style.color="yellow";
e.style.border="none";
e.style.background="none";
e.style.cursor="pointer";
e.style.zIndex="10000";
  if (document.getElementById("videoHeader")){
    e.style.position="absolute";
    e.style.bottom="5px"
    e.style.right="190px";
  }
  else{
    e.style.position="relative";
    e.style.left="620px";
  }
target2.insertBefore(e, target2[5]); //ここ適当

//==================================
// スクリーンon/off
var showhide = function (){
  if(screen.style.display=="none") {
    screen.style.display='';
  }
  else{
    screen.style.display='none';
  }
};

e.addEventListener('click', function() {
  showhide();
}, false);
//==================================
})()