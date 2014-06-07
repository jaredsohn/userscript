// ==UserScript==
// @name           @games diary comment enhancement
// @namespace      makinamiscript
// @include        http://sns.atgames.jp/diary/*
// ==/UserScript==
(function (d, func) {
     if (!window.jQuery) {
          var h = d.getElementsByTagName('head')[0];
          var s1 = d.createElement("script");
          s1.setAttribute("src", "http://www.atgames.jp/atgames/html/common/js/lib/jquery.js");
          s1.addEventListener('load', function() {
               var s2 = d.createElement("script");
               s2.textContent = "jQuery.noConflict();(" + func.toString() + ")(jQuery);";
               h.appendChild(s2);
          }, false);
          h.appendChild(s1);
     }
})(document, function($) {
//start
if(jQuery('div.thisdiarycomments').length!=0)
{
//get comment form source
var i = jQuery('div.thisdiarybodycontent form[name=MainForm]');
//append comment form source
i.css('clear','both');
jQuery('body').append('<style>div.mod_mypage_unit01 ul.mydiarylist2 li form {float:right !important;    margin-top:10px !important;}div.mod_mypage_unit01 ul.mydiarylist2 li form div.thisdiarydetailcomment {    background-color: #8BDB6F !important;}div.mod_mypage_unit01 ul.mydiarylist2 li form div.thisdiarydetailcomment {    border-radius: 7px 7px 7px 7px !important;    margin-bottom: 10px !important;    padding-bottom: 15px !important;    padding-top: 2px !important;    width: 576px !important;}div.mod_mypage_unit01 ul.mydiarylist2 li form div.thisdiarydetailcomment h1 {  margin: 0 0 5px 15px !important;}div.mod_mypage_unit01 ul.mydiarylist2 li form div.thisdiarydetailcomment p {  background: none repeat scroll 0 0 #FFFFFF !important;  border-radius: 7px 7px 0 0 !important;  margin: 0 auto !important;  padding: 7px 10px 10px !important;  text-align: center !important;  width: 524px !important;}div.mod_mypage_unit01 ul.mydiarylist2 li form div.thisdiarydetailcomment p textarea {  background: none repeat scroll 0 0 transparent !important;  border: medium none !important;  color: #999999 !important;  height: 90px !important;  margin: 0 auto !important;  padding: 0 !important;  text-align: left !important;  width: 100% !important;}div.mod_mypage_unit01 ul.mydiarylist2 li form div.thisdiarydetailcomment ul {  background: none repeat scroll 0 0 #FFFFFF !important;  border-radius: 0 0 7px 7px !important;  margin: auto !important;  padding-bottom: 2px !important;  width: 544px !important;}div.mod_mypage_unit01 ul.mydiarylist2 li form div.thisdiarydetailcomment ul li {  background: url("http://img.atgames.jp/communicationtool/20110705/member_mypage_friendlist_bg1.png") repeat scroll 0 0 transparent !important;  border-radius: 0 0 7px 7px !important;  margin: 0 2px !important;  padding: 6px 0 4px !important;  text-align: center !important;}div.mod_mypage_unit01 ul.mydiarylist2 li form div.thisdiarydetailcomment ul li input {  margin-left: 13px !important;}</style>');
jQuery('div.mod_mypage_unit01 ul.mydiarylist2 > li').append(i);
}
});