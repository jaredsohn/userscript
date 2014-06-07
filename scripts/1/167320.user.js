// ==UserScript==
// @name		百度贴吧html+css-js
// @namespace		baidu
// @description		让百度贴吧回复内容支持html+css,不支持js
// @include		http://tieba.baidu.com/p/*
// @include		http://tieba.baidu.com/f?ct=*
// @homepage		https://userscripts.org/scripts/show/167320
// @updateURL		https://userscripts.org/scripts/source/167320.meta.js
// @downloadURL		https://userscripts.org/scripts/source/167320.user.js
// @version     	2013.5.12
// ==/UserScript==
(function(){

var  bd_htmlStr=document.body.innerHTML;
var  bd_flag_a='<div id="post_content_';
var  bd_flag_b='" class="d_post_content';
var  bd_flag_c='post_content_';
var  bd_flag_d='';
var  bd_reg = new RegExp( bd_flag_a+'.+'+ bd_flag_b,'g');
var  bd_bdReply= bd_htmlStr.match( bd_reg);
var  $ = function(arg){return document.getElementById(arg)}



//过滤可能潜在不安全因素的代码
function bd_replaceUnsafeCode(bd_n)
{
    //百度贴吧内运行JS有可能造成信息泄漏,请勿随意删除关键词
      //原文禁止unicode
    bd_n=bd_n.replace(/&#/ig,"&amp;#");
    
    //替换内容
	bd_n=bd_n.replace(/\+/g,"＋");//加号转全角
  bd_n=bd_n.replace(/\(/g,"（").replace(/\)/g,"）");//圆括号转全角
  bd_n=bd_n.replace(/\[/g,"［").replace(/\]/g,"］"); //中括号转全角
  bd_n=bd_n.replace(/(load)|(error)/ig,"_$1$2_");
  
  //	bd_n=bd_n.replace(/(')|(")/g," $1$2 ");
  
  
    bd_n=bd_n.replace(/\$/g,"X_$_X");
    bd_n=bd_n.replace(/(eval)|(write)|(cookie)|(script)|(form)|(action)|(submit)|(frame)|(link)/ig,"_$1$2$3$4$5$6$7$8$9_");
    bd_n=bd_n.replace(/(window)|(location)|(event)/ig,"_$1$2$3_");
  bd_n=bd_n.replace(/(click)|(mouse)|(alert)/ig,"_$1$2$3_");//禁止鼠标动作

    bd_n=bd_n.replace(/(active)|(xmlhttp)|(open)|(post)/ig,"_$1$2$3$4_");
    bd_n=bd_n.replace(/(fucntion)|(document)/ig,"_$1$2_");

    //bd_n=bd_n.replace(/http:\/\//ig,"");
    //防止破坏页面
    bd_n=bd_n.replace(/absolute|relative/ig,"block").replace(/position/ig,"display");
   


    return bd_n;
}


for(var  bd_i=0; bd_i< bd_bdReply.length; bd_i++){

    var  bd_replyContentId=  bd_bdReply[bd_i].replace( bd_flag_a, bd_flag_c).replace( bd_flag_b, bd_flag_d);
    var  bd_replyContent=$ ( bd_replyContentId);
    var  bd_reg1=new RegExp('<br>','g');
    var  bd_textStr= bd_replyContent.innerHTML;
    var  bd_textRows;

    //代码框rows
    if( bd_reg1.test(bd_textStr))
    {
        bd_textRows= bd_textStr.match(bd_reg1).length;
        if( bd_textRows<10)  bd_textRows=10;
        if( bd_textRows>20) bd_textRows=20;
    }else bd_textRows=10;
    bd_tmpHtml=bd_replyContent.innerHTML.replace(/&lt;/g,'<').replace(/&gt;/g,'>');
    bd_tmpHtml=bd_tmpHtml.replace(/"<a href\="(.*?)".*?<\/a>"/ig,'"$1"');//去掉百度自动添加的链接
    bd_tmpHtml=bd_tmpHtml.replace(/<script.*?>.*\/script>/ig,"").replace(/<br>/g,'\n');//去掉script
    //class="lzl_content_main"
    bd_replyContent.innerHTML='<div id="fffgg'+bd_i+'_div">'+bd_replyContent.innerHTML+'</div>'+
            '<textarea  wrap=off style="font-family:georgia;font-size:14px;color:green;background-color:#ECECDD;display:none" id="eefffgg'+bd_i+'_code"  cols="100" rows="'+bd_textRows+'">'+
            bd_replaceUnsafeCode(bd_tmpHtml)+'</textarea>'+
            '<br><div style="text-align:right">'+
            '<input style="background:white;" type="button" id="fffgg'+bd_i+'" value="修改"></input></div>';
    //原文div
    var bd_originalDivEl=$("fffgg"+bd_i+"_div");

    //文本框 键入即时显示网页预览
    var bd_textAreaEl=$("eefffgg"+bd_i+"_code");
    bd_textAreaEl.addEventListener("keyup",function()
    {
        var bd_htmldivId=this.id.replace("ee","").replace("_code","_div");//原文div 的id
        $(bd_htmldivId).innerHTML=bd_replaceUnsafeCode($(this.id).value);
        $(bd_htmldivId).style.display='block';
    },true);

    //修改
    var bd_editEl=$("fffgg"+bd_i);
    bd_editEl.addEventListener("click",function()
    {
        $(this.id+"_div").style.display='none';	//原文div
        $("ee"+this.id+"_code").style.display='block';	//代码框
        $("ee"+this.id+"_code").focus();
        $(this.id).disabled = 'false';
    },false);

    //插入html预览
    var bd_htmlReg = new RegExp("<html.*?/html>","i");
    var bd_str=bd_tmpHtml.replace(/\n/g,"<!换行>");
    if(bd_htmlReg.test(bd_str))
    {
        var bd_tipsStr="";
        if(/style/i.test(bd_str)) bd_tipsStr="<input onclick=\"this.style.display='none'\" type='button' value='开启style' >";
        bd_originalDivEl.innerHTML="<div style='border:1px solid green;'><div id='fgg"+bd_i+"' >"+
                    "<font size='1' color='green'><u>检测到html代码(不支持js).</u></font> "+bd_tipsStr+"</div><br>"+
                    bd_replaceUnsafeCode(bd_str.match(bd_htmlReg)[0]).replace(/<style.*?>/ig,"<!--asdfzxcv123").replace(/<\/style>/ig,"asdfzxcv123-->").replace(/<\/style>/ig,"asdfzxcv123-->").replace(/style/ig,"s_t_y_l_e").replace(/<!换行>/g,"\n")+
                    "</div><br>"+bd_originalDivEl.innerHTML.replace(/&lt;html.*?\/html&gt;/g,"");

        //恢复style标签 开启style
        $("fgg"+bd_i).addEventListener("click",function()
        {
            var c=$("ff"+this.id+"_div");
            c.innerHTML=c.innerHTML.replace("<!--asdfzxcv123","<style>").replace("asdfzxcv123-->","</style>").replace(/s_t_y_l_e/ig,"style");

        },false);
    }
}

})();