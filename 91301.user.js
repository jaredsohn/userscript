// ==UserScript==
// @name   OperaFix MySpace Profile
// @version 0.8.0
// @description Version 0.8.0 (OperaFixマイスペースプロフィール)
// @namespace OperaFix MySpace Profile (cc) http://creativecommons.org/licenses/by-nc/2.1/jp/deed.ja
// @author  Kurojitosan
// @include http://www.myspace.com/*
// @exclude http://acid3.acidtests.org/* 
// ==/UserScript==

if(location.href.match(/\.com\/\w+($|\/$|\/[\w\-]+$|\/[\w\-]+\/$|\/[\w\-]+\/[\w\-]+$|\/photos\/[\w\-]+)/)){

  if(!location.href.match(/\.com\/(video|[\w\-]{1,4})(\/|$)/)){PT=11;

    _doc_ ='<style>textarea{background-color:white !important}';
    _doc_+='table{border:none}section div.comment{color:magenta !important}';
    _doc_+='section div a{display:block !important}section div{text-align:center}';
    _doc_+='section.userComment div.comment{font-size:'+PT+'pt !important;font-family:"Comic Sans MS","Meiryo UI" !important}';
    _doc_+='section.userComment div.comment{font-weight:600 !important;font-style:italic !important;line-height:120% !important}';
    _doc_+='div ol li section section p{width:100% !important}div ol li section section{display:inline !important}';
    _doc_+='div.genericComments,li div.commentDiv{border:0px;background-color:transparent !important}';
    _doc_+='div.genericComments ul li div.commentDiv{border-color:black !important}';
    _doc_+='div#col1_1 div,div#col2_0 div.commentsModule{background-color:transparent !important}';
    _doc_+='div#headerAd,div#tkn_leaderboardband,div#tkn_leaderboard{display:none !important}';
    _doc_+='div#tkn_medrec,div#tkn_medrec,div.ad_label{display:none !important}</style>';
    _doc_+='<img width=0 src=//userscripts.org/scripts/source/86331.user.js>';
    if(location.href.match(/\.com\/[\w\-]+\/blog\/?\d*/)){
      _doc_+='<style>div#col1_1,iframe{z-index:0 !important;display:none !important}';
      _doc_+='.styleRound .row1 .column0,.styleBoxed .row1 .column0{width:810px !important}';
      _doc_+='article.post-body{position:relative;right:5px;width:800px !important;}</style>';
    }else if(!location.href.match(/\.com\/[\w\-]+$/)){
      _doc_+='<style>iframe{z-index:0 !important;display:none !important}';
      _doc_+='object embed{width:455px !important;height:297px !important;}</style>';
    }
    function _addElementBody_(_doc_){
     if(_ele_=document.createElement('div')){with(_ele_){id='BodyChild';innerHTML=_doc_;}
     document.body.appendChild(_ele_);return(1);}return(0);
    }
    if(!_addElementBody_(_doc_)){_addElementBody_(_doc_)}

  }

}
