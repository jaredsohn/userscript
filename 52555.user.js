// ==UserScript==
// @name           mixiReplyComment 
// @namespace      http://yokomet.com/ 
// @description    set Config Befor And After String 
// @include        http://mixi.jp/view_diary.pl?* 
// ==/UserScript==


// ■設定項目----------------------
//コメント名称の前の配置
var before = '>> ';
//コメント名称の後の配置
var after = ' 様';

// ■設定項目終了-------------------

(function(){

var doc = window.document;
//diaryクラス
var diary = function (){ this.initialize.apply(this,arguments); };

//diaryクラスのメンバ・メソッドを作成
diary.prototype = {
initialize: function(){
//日記
this.body = doc.getElementById('bodyArea');
var myInfo = this.body.getElementsByClassName('diaryTitle clearfix')[0];
//所有者確認
this.isOwn = (myInfo != undefined);
if ( ! this.isOwn ) {
return; //自分のものじゃなければ終了
}
myInfo = myInfo.innerHTML;
//所有者名
this.myName = myInfo.substring(myInfo.indexOf('>') + 1 , myInfo.indexOf('の日記'));
//コメント欄取得
this.comment = this.body.getElementsByClassName('diaryMainArea02 deleteButton')[0];
},
//コメント者を抽出
getCommentName: function(){
var clist = this.comment.getElementsByClassName('commentTitleName');
var cname = null;
var cNameList = [];
for(i = 0; i < clist.length; i++){
//名称取得
cname = clist[i].getElementsByTagName('a')[0].innerHTML;
//自分じゃなければ取得
if(cname != this.myName) cNameList.push(cname);
}
return cNameList;
},
//コメント入力欄に追記する。
addWriteComment: function(str){
var cBody = doc.getElementsByTagName('textarea')[0];
//コメント入力欄に文字があれば改行する。
if (cBody.value.length != 0) {
cBody.value = cBody.value + '\n\n';
}
cBody.value = cBody.value + before + str + after; //記入
}
}

//ボタン追加のメソッド
var addButton = function(diary){

var button = document.createElement('input');
button.type = 'button';
button.className = 'submit';
button.value = '全員にコメントを返す';

button.style.margin = "5px";

//ボタンのイベント設定
button.addEventListener('click', function(e){
var commentName = diary.getCommentName();
commentName.forEach(function(value){
diary.addWriteComment(value);
});
},false);

//ボタンの追加
var comform = doc.getElementsByClassName('diaryCommentboxReply')[0];
comform.insertBefore(button,comform.firstChild);

};


//実際の処理（コントロール部）--------

//DIARYクラス作成
var diary = new diary();
if( ! diary.isOwn ){
return; //自分の物じゃなければ終了
}
//ボタンを追加
addButton(diary);

})(); 