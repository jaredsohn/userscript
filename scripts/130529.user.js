// ==UserScript==
// @name           Ym! Pluss
// @namespace      http://q674jxhdb47nmlz79l234rzcp98.cbi
// @description    It do something i guess             
// @include        http://us.mg.mail.yahoo.com/neo/*
// @include        http://us.mg1.mail.yahoo.com/neo/*
// @include        http://us.mg2.mail.yahoo.com/neo/*
// @include        http://us.mg3.mail.yahoo.com/neo/*
// @include        http://us.mg4.mail.yahoo.com/neo/*
// @include        http://us.mg5.mail.yahoo.com/neo/*
// @include        http://us.mg6.mail.yahoo.com/neo/*
// @include        http://us-mg4.mail.yahoo.com/neo/*
// @include        http://us-mg5.mail.yahoo.com/neo/*
// @include        http://us-mg6.mail.yahoo.com/neo/*
// @include        http://ro.mg41.mail.yahoo.com/neo/*
// @include        http://ro-mg41.mail.yahoo.com/neo/*
// @include        http://ro-mg42.mail.yahoo.com/neo/*
// ==/UserScript==

            id   = function(i){return document.getElementById(i);}
            cls  = function(c){return document.getElementsByClassName(c);}
            tag  = function(t){return document.getElementsByTagName(t);}
            make = function(m){return document.createElement(m);}
            addc = function(Child,Parent){if(Parent==''){
                   return document.body.appendChild(Child);}
                   else{eval(Parent.appendChild(Child))}}
_css = 
 ['#slot_MON,#trendmastr-main,.inf-scroll-btn,.inf-scroll-top{display:none;}',
  '#shellnavigation{width:130px;}#pagetoolbar{margin-left:-50px;}',
  '#app-list li a i{font-size:10px;}#main,#toolbar{width:100% !important}',
  '#moIframeTab,#abIframeTab,#calendar{margin-left:50px;width:95.1% !important}',
  '.list-view-items{width:82.8% !important} .messagepane{width:82.8%; overflow:auto !important}',
  '#shellcontent{margin-left:-50px; width:105.15% !important}#rtetext{width:82.8% !important}',
  '#up-btn{position:absolute;visibility:hidden;display:block; z-index:9999;right:370px;top:425px;width:32px;height:32px;background-image:url("http://mail.yimg.com/ok/u/assets/sprite/fresh/freshsprites-32x32-ltr-94202.png");background-position:0px -512px;border-radius:3px;box-shadow:0px 0px 3px #888;cursor:pointer;background-color:#888;}',
  '#up-btn:hover{background-position:0px -544px;}'
   ].join('');
 if(top==self)
  {
   try{
       sl=id('slot_REC'); sl.parentNode.removeChild(sl);
       ad=id('theAd'); ad.parentNode.removeChild(ad);
       ss=make('style');
       ss.innerHTML=_css;
       addc(ss,'');
 
  headx = make('script');
  headxcont = 
 [
'q=""; ',
'function smothscroll(){obj=document.getElementsByClassName("list-view-items")[0];obj.scrollTop=obj.scrollTop-50;if(obj.scrollTop==0){clearInterval(q);}} ',
'function startsoftscroll() {q=setInterval("smothscroll()",25)} ','\n' ,
'id=function(i){return document.getElementById(i);}'
  ].join('');
 headx.innerHTML=headxcont;
 addc(headx,tag('head')[0]);
 upbtn=make('div');
 upbtn.id='up-btn';
 upbtn.onclick=startsoftscroll;
 addc(upbtn,id('msg-list'));
 
 cls('list-view-items')[0].onscroll=function(){
 if(this.scrollTop>100){id('up-btn').style.visibility='visible';} 
 else {id('up-btn').style.visibility='hidden';}}
 
 id('msg-list').onmouseover=function(){
 mail_list=document.getElementsByClassName('list-view-items')[0];
 if(mail_list!=null && mail_list.scrollTop>100){id('up-btn').style.visibility='visible';} 
 else {id('up-btn').style.visibility='hidden';}}
 
 id('msg-list').onmouseout=function(){id('up-btn').style.visibility='hidden';}
 
  }
catch(h){console.log(h.message);}
      }