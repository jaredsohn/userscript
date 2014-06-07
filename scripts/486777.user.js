// ==UserScript==
// @name		老洪_浮动按钮
// @namespace		test_baidu_com_hsz_floatbutton
// @version		1.0
// @author		yanzilisan183@sina.com
// @include		http://test.baidu.com/crowdtesteva/eva/doEva/eva_id/*
// @include   http://test.baidu.com/crowdtest/eva/doEva/eva_id/*
// @grant		none
// ==/UserScript==


(function(){
   var h=function(id){document.getElementById(id).style.display='none';};
   //按钮1
   var obtn1=document.createElement('DIV');
   obtn1.style.position='fixed';
   obtn1.style.zIndex='999';
   obtn1.style.fontSize='18px';
   obtn1.style.padding='30px';
   obtn1.style.left='0px';
   obtn1.style.bottom='0px';
   obtn1.style.textAlign='center';
   obtn1.style.border='#999999 1px solid';
   obtn1.style.backgroundColor='#F3F3F3';
   try{obtn1.style.opacity='0.85';}catch(e){}
   obtn1.innerHTML='选项一';
   obtn1.addEventListener('click', function(){
      // 选1并提交
      document.getElementsByTagName('LABEL')[0].click();
      window.setTimeout("document.getElementById('next_eva').click();",50);
      return;
   });
   document.getElementsByTagName('BODY')[0].appendChild(obtn1);
   //按钮2
   var obtn2=document.createElement('DIV');
   obtn2.style.position='fixed';
   obtn2.style.zIndex='999';
   obtn2.style.fontSize='18px';
   obtn2.style.padding='30px';
   obtn2.style.right='0px';
   obtn2.style.bottom='0px';
   obtn2.style.textAlign='center';
   obtn2.style.border='#999999 1px solid';
   obtn2.style.backgroundColor='#F3F3F3';
   try{obtn2.style.opacity='0.85';}catch(e){}
   obtn2.innerHTML='选项二';
   obtn2.addEventListener('click', function(){
      // 选2并提交
      document.getElementsByTagName('LABEL')[1].click();
      window.setTimeout("document.getElementById('next_eva').click();",50);
      return;
   });
   document.getElementsByTagName('BODY')[0].appendChild(obtn2);
   //按钮[跳过]
   var obtnR=document.createElement('DIV');
   obtnR.style.position='fixed';
   obtnR.style.zIndex='999';
   obtnR.style.fontSize='18px';
   obtnR.style.padding='30px';
   obtnR.style.right='0px';
   obtnR.style.top='0px';
   obtnR.style.textAlign='center';
   obtnR.style.border='#999999 1px solid';
   obtnR.style.backgroundColor='#F3F3F3';
   try{obtnR.style.opacity='0.85';}catch(e){}
   obtnR.innerHTML='跳过';
   obtnR.addEventListener('click', function(){
      // 跳过
      location.href=location.href;	// 测试中的 location.reload();
      return;
   });
   document.getElementsByTagName('BODY')[0].appendChild(obtnR);
    //按钮[提交]
   var obtnP=document.createElement('DIV');
   obtnP.style.position='fixed';
   obtnP.style.zIndex='999';
   obtnP.style.fontSize='18px';
   obtnP.style.padding='30px';
   obtnP.style.left='0px';
   obtnP.style.top='0px';
   obtnP.style.textAlign='center';
   obtnP.style.border='#999999 1px solid';
   obtnP.style.backgroundColor='#F3F3F3';

   try{obtnP.style.opacity='0.85';}catch(e){}
   obtnP.innerHTML='提交';
   obtnP.addEventListener('click', function(){
      // 提交
      document.getElementById('next_eva').click();
      return;
   });
   document.getElementsByTagName('BODY')[0].appendChild(obtnP);
   //隐藏顶栏
   document.getElementById('navi_menu').style.display='none';
   var divs=document.getElementsByTagName('DIV');
   for(var i=0;i<divs.length;i++){
      try{
         if(divs[i].className=='new-head-nav')divs[i].style.display='none';
      }catch(e){}
   }
   h('pen1');
   h('pen2');
   h('pen3');
   h('userfigure_tip_div');
   h('pen_gif');
   h('footer');
}());


