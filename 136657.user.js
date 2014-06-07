// ==UserScript==
// @name        imba(Chrome)
// @namespace   游戏风云强化
// @description 游戏风云论坛及菠菜功能强化
// @version     0.9
// @include     http://bbs.gamefy.cn/*
// ==/UserScript==


//当前网页类型 ：1是论坛 2是菠菜;
var this_page=1
    if (location.href.search(/plugin.*/i)!=-1){
        this_page=2
            }


//辅助函数
Array.max=function(array){
    return Math.max.apply(Math,array);
}
    
    Array.min=function(array){
        return Math.min.apply(Math,array);
    }
        function loadStyle(css){
            if(typeof GM_addStyle!='undefined'){
                GM_addStyle(css);
            }else{
                var heads=document.getElementsByTagName('head');
                if(heads.length>0){
                    var node=document.createElement('style');
                    node.type='text/css';
                    node.appendChild(document.createTextNode(css));
                    heads[0].appendChild(node);
                }
            }
        }

//参数
if(typeof GM_getValue('fast_input')==='undefined'){
    GM_setValue('fast_input','0');
}
var fast_input=GM_getValue('fast_input');

if(typeof GM_getValue('fixed_content')==='undefined'){
    GM_setValue('fixed_content', "");
}
var fixed_content=GM_getValue('fixed_content');

if(typeof GM_getValue('bocai_num')==='undefined'){
    GM_setValue('bocai_num', '0');
}
if(typeof GM_getValue('bocai_rate')==='undefined'){
    GM_setValue('bocai_rate', '0');
}

if(typeof GM_getValue('hide_fun')==='undefined'){
    GM_setValue('hide_fun', '0');
}
var hide_fun=GM_getValue('hide_fun')
    
    if(typeof GM_getValue('imba_set') === 'undefined'){
        GM_setValue('imba_set', '1');
    }
var imba_set=GM_getValue('imba_set');

if(typeof GM_getValue('hide_code')==='undefined'){
    GM_setValue('hide_code', "");
}
var hide_code=GM_getValue('hide_code');

if(GM_getValue('bocai_num')=='1'){
    var bocai=1}
else if(GM_getValue('bocai_rate')=='1'){
    var bocai=2
        }

//主体
setTimeout(function(){
    if(imba_set==1){
        imbaSet();
    }
    
    if(this_page==1 && fast_input==1){
        fastinput();
    }
    
    if(this_page==2 && bocai==1){
        inputmoney();
        determine_by_num();
    }
    else  if (this_page==2 && bocai==2){
        inputmoney();
        determine_by_rate();
    }
    
    if(hide_fun==1){
        if (hide_code=="浮云"){always_be_millionaire();}
        switch(hide_code){
            case "⑨":
                if (this_page==1){               
                    hide_function_9();
                }
                break
                    case "FC":
                        if (this_page==1){               
                            hide_function_fc();
                        }
                break
                    case "500":
                        if (this_page==1){               
                            hide_function_500();
                        }
                break
                    case "A2B":
                        if (this_page==1){               
                            hide_function_A2B();
                        }
                break
                    case "蓝":
                        if (this_page==1){               
                            hide_function_lan();
                        }
                break
                    }
    }
},0);


//快速回复
function fastinput(){
    var fpm=document.getElementById('fastpostmessage')
        if (fpm){
            fpm.value=fixed_content;
            var AB=document.getElementsByTagName('textarea');
            window.setInterval(function fastinput2(){
                if (AB.length>1){
                    for (var n=0;n<AB.length;n++){
                        if (AB[n].value==''){    
                            AB[n].value=fixed_content;
                        }
                    }
                }
            },500);
        }
}


//萌化
function hide_function_9(){
    var image='';
    image+='    <a title="快速回页面顶部" href="#" onclick="javascript:amutop();return false;">';
    image+='      <img border="0" alt="⑨被玩坏掉了【UP】" src="http://bbs.gamefy.cn/data/attachment/album/201206/18/14561565fhh3yf6fykr5h4.gif">';
    image+='    </a>';
    image+='    <a title="快速移到页面底部" href="#" onclick="javascript:amubutton();return false;">';
    image+='      <img border="0" alt="⑨被玩坏掉了【DOWN】" src="http://bbs.gamefy.cn/data/attachment/album/201206/18/145616qhzq334a1hih0rhh.gif">';
    image+='    </a>';
    document.getElementById('fixedLayertop').innerHTML=image;
    document.getElementById('fixedLayertop').style.width='100px';
    document.getElementById('fixedLayertop').style.top='70%';
    document.getElementById('fixedLayertop').style.lineHeight='0';
    document.getElementById('fixedLayertop').style.right='0';
}

function hide_function_fc(){
    var image='';
    image+='    <a title="快速回页面顶部" href="#" onclick="javascript:amutop();return false;">';
    image+='      <img border="0" alt="骸音什么的最萌了【UP】" src="http://bbs.gamefy.cn/data/attachment/album/201206/19/154248n91qrc6sn955f9dq.gif">';
    image+='    </a>';
    image+='    <a title="快速移到页面底部" href="#" onclick="javascript:amubutton();return false;">';
    image+='      <img border="0" alt="骸音什么的最萌了【DOWN】" src="http://bbs.gamefy.cn/data/attachment/album/201206/19/154249r53rc47847m37gyr.gif">';
    image+='    </a>';
    document.getElementById('fixedLayertop').innerHTML=image;
    document.getElementById('fixedLayertop').style.width='150px';
    document.getElementById('fixedLayertop').style.top='68%';
    document.getElementById('fixedLayertop').style.lineHeight='0';
    document.getElementById('fixedLayertop').style.right='0';
}

function hide_function_500(){
    var image='';
    image+='    <a title="快速回页面顶部" href="#" onclick="javascript:amutop();return false;">';
    image+='      <img border="0" width="200" alt="下雨了...【UP】" src="http://bbs.gamefy.cn/data/attachment/album/201206/19/1542518nq255z25muyfumm.gif">';
    image+='    </a>';
    image+='    <a title="快速移到页面底部" href="#" onclick="javascript:amubutton();return false;">';
    image+='      <img border="0" width="200" alt="下雨了...【DOWN】" src="http://bbs.gamefy.cn/data/attachment/album/201206/19/154252f43kfkkf5f63f9r4.gif">';
    image+='    </a>';
    document.getElementById('fixedLayertop').innerHTML=image;
    document.getElementById('fixedLayertop').style.width='200px';
    document.getElementById('fixedLayertop').style.top='60%';
    document.getElementById('fixedLayertop').style.lineHeight='0';
    document.getElementById('fixedLayertop').style.right='0';
}

function hide_function_A2B(){
    var image='';
    image+='    <a title="快速回页面顶部" href="#" onclick="javascript:amutop();return false;">';
    image+='      <img border="0" alt="呆唯被吃掉了【UP】" src="http://bbs.gamefy.cn/data/attachment/album/201206/19/174552i16m6vsnr236n8mv.gif">';
    image+='    </a>';
    image+='    <a title="快速移到页面底部" href="#" onclick="javascript:amubutton();return false;">';
    image+='      <img border="0" alt="呆唯被吃掉了【DOWN】" src="http://bbs.gamefy.cn/data/attachment/album/201206/19/17455396zz9k6b99l026bb.gif">';
    image+='    </a>';
    document.getElementById('fixedLayertop').innerHTML=image;
    document.getElementById('fixedLayertop').style.width='100px';
    document.getElementById('fixedLayertop').style.top='80%';
    document.getElementById('fixedLayertop').style.lineHeight='0';
}

function hide_function_lan(){
    var image='';
    image+='    <a title="快速回页面顶部" href="#" onclick="javascript:history.back();return false;;">';
    image+='      <img border="0" alt="王の消失♂【BACK】" src="http://bbs.gamefy.cn/data/attachment/album/201206/19/174551ngg0ym0nfmym5509.gif">';
    image+='    </a>';
    document.getElementById('fixedLayertop').innerHTML=image;
    document.getElementById('fixedLayertop').style.width='100px';
    document.getElementById('fixedLayertop').style.top='81.8%';
    document.getElementById('fixedLayertop').style.lineHeight='0';
}



//菠菜
function inputmoney(){                      //输入注额
    var money=document.getElementById('hcredit_2').innerHTML;
    if (money/200>10){
        document.getElementById('guess_money').value=parseInt(money/200,10);}
    else {
        document.getElementById('guess_money').value='10'
            }
}

function determine_by_rate(){                      //按赔率
    var r=new Array();
    var gamble=new Array();
    var sum=0;var s=0
        var span=document.getElementsByClassName('c_grey2')
            var option=document.getElementsByTagName('option')
                for (var i=0;i<span.length/4;i++){
                    gamble[i]=Number(span[4*i+3].innerHTML.substr(3))
                        sum=sum+gamble[i]
                            }
    for (var j=0;j<span.length/4;j++){
        r[j]=1-gamble[j]/sum;
        s=s+r[j];
    }
    for (var k=0;k<span.length/4;k++){
        r[k]=r[k]/s;
    }
    var ma=Array.max(r);
    var max=0;
    for (var n=0;n<span.length/4;n++){
        if (r[n]==ma){
            max=n;
            option[max+1].selected='selected';
        }
    }
}

function determine_by_num(){                      //随大流
    var max=0;
    var num=new Array();
    var span=document.getElementsByClassName('c_grey2')
        var option=document.getElementsByTagName('option')
            for (var i=0;i<span.length/4;i++){
                num[i]=Number(span[4*i+1].innerHTML)
                    }
    var ma=Array.max(num);
    for (var n=0;n<span.length/4;n++){
        if (num[n]==ma){
            max=n;
            option[max+1].selected='selected'
                }
    }
}


function always_be_millionaire(){
    document.getElementById('hcredit_2').innerHTML='9999999'
        var j=0;
    var k=0;
    var d=document.getElementsByTagName('dd')
        var name=new Array();
    var n=new Array();
    var a=document.getElementsByTagName('a')
        for (var i=0;i<a.length;i++){
            if (a[i].className=='vwmy'){
                name[j]=a[i].innerHTML;
                j=j+1;
            }
            if (a[i].className=='xw1'){
                n[k]=a[i].innerHTML;
                k=k+1;
            }
        }
    for (var q=0;q<a.length;q++){
        if (n[q]==name[0]){
            d[20*q+2].innerHTML='9999999 枚 '
                d[20*q+13].innerHTML='9999999 枚 '
                    }
    }
}


//设置菜单
function imbaSet(){
    var css="@namespace url(http://www.w3.org/1999/xhtml);";
    css+='#imbaSetting_Mask{display:none;position:fixed;z-index:1200;top:0px;left:0px;width:100%;height:100%;background-color:#222222;}';
    css+='#imbaSetting_Show{text-shadow:2px 2px 2px #BFD9FF;}';
    css+='#imbaSetting_Dialog{display:none;position:fixed;z-index:1400;width:300px !important;top:28%;left:'+(window.innerWidth-300)/2+'px;background-color:#FCFCFC;padding:4px;border:2px;border-radius:8px;box-shadow:4px 4px 10px #DDDDDD;}';
    css+='#imbaSetting_Dialog fieldset{margin:5px;border:2px solid #DDDDDD;border-radius:4px;text-shadow:1px 1px 2px #888A85;}';
    css+='#imbaSetting_Dialog fieldset legend{text-shadow:4px 4px 4px #888A85;height:}';
    css+='#imbaSetting_Dialog > div{text-align:right;margin:8px 4px 4px 0px;}';
    css+='#imbaSetting_Dialog input[type="button"]{border:1px solid #BBBBBB;border-radius:3px;background-color:#FCFCFC;}';
    css+='#C_Input{width:180px}'
        loadStyle(css);
    
    var mask=document.createElement('div');
    mask.id='imbaSetting_Mask';
    document.body.appendChild(mask);
    var show_button=document.createElement('a')
        show_button.id='imbaSetting_Show';
    show_button.innerHTML='Setting'
        document.getElementById('usersetup_menu').appendChild(show_button);
    show_button.addEventListener('click',function(){
        var opac=0.0;
    var mask=document.getElementById("imbaSetting_Mask");
    var dialog=document.getElementById("imbaSetting_Dialog");
    mask.setAttribute("style","opacity:0.0;display:block;");
    dialog.setAttribute("style","opacity:0.0;display:block;");
    var timer_id=setInterval(function(){
        if(opac<0.6){
            opac+=0.1;
            mask.style.opacity=opac;
            dialog.style.opacity=opac;
        }else if(opac<0.9){
            opac+=0.1;
            dialog.style.opacity=opac;
        }else{
            clearInterval(timer_id);
        }
    }, 50);
},false);
    
    var box='<fieldset>';
    box+='    <lengend> 固 定 格 式 回 复 </lengend>';
    box+='        <div><input id="C_fastinput" type="checkbox" '+(GM_getValue("fast_input")=='1'?'checked="true"':'')+' /><label> 在 回 复 时 用 固 定 格 式 的 说</label></div>';
    box+='        <div><label>&nbsp;&nbsp;&nbsp;&nbsp;固 定 格 式 </label><input id="C_Input" type="text" size="4" value="'+GM_getValue("fixed_content")+'"></div>';
    box+='</fieldset>';
    box+='<fieldset>';
    box+='    <legend> 快 速 菠 菜 </legend>';
    box+='        <div><input id="C_Bocai_num" type="checkbox" '+(GM_getValue("bocai_num")=='1'?'checked="true"':'')+' /><label> 按  照 人 数 菠 菜 的 说</label></div>';
    box+='        <div><input id="C_Bocai_rate" type="checkbox" '+(GM_getValue("bocai_rate")=='1'?'checked="true"':'')+' /><label> 按 照 概 率 菠 菜 的 说</label></div>';
    box+='</fieldset>';
    box+='<fieldset>';
    box+='    <legend> 隐 藏 功 能 </legend>';
    box+='        <div><input id="C_hiden_fun" type="checkbox" '+(GM_getValue("hide_fun")=='1'?'checked="true"':'')+' /><label>  我 要 隐 藏 福 利 的 说</label></div>';
    box+='        <div><label>&nbsp;&nbsp;&nbsp;&nbsp;输 入 密 码 的 说 </label><input  id="C_code" type="text" size="4" value="'+GM_getValue("hide_code")+'"></div>';
    box+='</fieldset>';
    box+='<div>';
    box+='    <input id="imbaSetting_Save" type="button" value="就 这 样 了 的 说">';
    box+='    <input id="imbaSetting_Cancel" type="button" value="算 了 的 说 ">';
    box+='</div>';
    
    var node=document.createElement('div');
    node.id='imbaSetting_Dialog';
    node.innerHTML=box;
    document.body.appendChild(node);
    
    var cbn=document.getElementById('C_Bocai_num')
        var cbr=document.getElementById('C_Bocai_rate')
            cbn.addEventListener('click',function(){
                if (cbn.checked==true&&cbr.checked==true)
                    cbr.checked=false;
            },false)
                cbr.addEventListener('click',function(){
                    if (cbn.checked==true&&cbr.checked==true)
                        cbn.checked=false;
                },false)
                    
                    document.getElementById('imbaSetting_Save').addEventListener("click", function(){
                        GM_setValue('fast_input', document.getElementById('C_fastinput').checked?'1':'0');
                        GM_setValue('fixed_content', document.getElementById('C_Input').value);
                        GM_setValue('bocai_num', document.getElementById('C_Bocai_num').checked?'1':'0');
                        GM_setValue('bocai_rate', document.getElementById('C_Bocai_rate').checked?'1':'0');
                        GM_setValue('hide_fun', document.getElementById('C_hiden_fun').checked?'1':'0');
                        GM_setValue('hide_code', document.getElementById('C_code').value);
                        window.location.reload();
                    }, false);
    
    document.getElementById('imbaSetting_Cancel').addEventListener('click', function(){   //淡出对话框
        var opac=1.0;
        var mask=document.getElementById("imbaSetting_Mask");
        var dialog=document.getElementById("imbaSetting_Dialog");
        var timer_id=setInterval(function(){
            if(opac>0.6){
                opac-=0.1;
                dialog.style.opacity=opac;
            }else if(opac>0.1){
                opac-=0.1;
                mask.style.opacity=opac;
                dialog.style.opacity=opac;
            }else{
                mask.setAttribute("style","display:none;");
                dialog.setAttribute("style","display:none;");
                clearInterval(timer_id);
            }
        },50);
    }, false);
}