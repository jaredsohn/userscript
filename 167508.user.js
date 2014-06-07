// ==UserScript==
// @name       B吧绅士用对尾巴宝具
// @namespace  FireAway-剑仙乘仙剑
// @version    0.2
// @description Encoder And Decoder For B's Gentelmen
// @include      *://tieba.com/*
// @include      *://tieba.baidu.com/*
// @require    http://ajax.googleapis.com/ajax/libs/jquery/1.8.0/jquery.min.js
// @copyright  FireAwayH
// @author     FireAwayH
// @run-at     document-end
// ==/UserScript==

////判断是否为我大B吧
var isChrome = navigator.userAgent.indexOf("AppleWebKit") != -1;
var isFirefox = navigator.userAgent.indexOf("Firefox") != -1;

var tab_forumname = $(".tab_forumname")[0];
var isBilibili = tab_forumname==undefined? -1 : tab_forumname.innerHTML.search("bilibili");
if(isBilibili>-1){

    initTieba();
}

////工具集合
var utils = {
    toggleWindow: function(obj){
        obj.fadeToggle("slow");
    },
    showDes:function(obj){
        obj.fadeIn("slow");
    },
    removeDes:function(obj){
        obj.fadeOut("slow");
    },
    format:function(obj){
        var str = obj.val();
        var s1 = str.replace(/[^A-Z0-9‖ ]+/igm,"");
        var s2 = s1.replace(/ /igm,"\n");
        var A2 = s2.replace(/2A+/igm,"AA");
        var A3 = A2.replace(/3A+/igm,"AAA");
        var A4 = A3.replace(/4A+/igm,"AAAA");
        var A5 = A4.replace(/5A+/igm,"AAAAA");
        var B2 = A5.replace(/2B+/igm,"BB");
        var B3 = B2.replace(/3B+/igm,"BBB");
        var B4 = B3.replace(/4B+/igm,"BBBB");
        var B5 = B4.replace(/5B+/igm,"BBBBB");
        var s3 = B5.replace(/‖/igm,"\n-\n");
        utils.replace(obj,s3);
    },
    replace:function(obj,str){
        var s1 = str.replace(/A/igm,"o")
        var s2 = s1.replace(/B/igm," ");
        utils.decode(obj,s2);
    },
    decode:function(obj,str){
        utils.setValue(obj,str);
    },
    reset:function(obj){
        try{
            obj.val("");
        }catch(e){
        }
        try{
            obj.text("");
        }catch(e){
        }
        try{
            obj.html("");
        }catch(e){
        }        
        try{
            obj.value = "";
        }catch(e){
        }
        try{
            obj.innerHTML = "";
        }catch(e){
        }
    },
    setValue:function(obj,str){
        try{
            obj.val(str);
        }catch(e){
        }
        try{
            obj.text(str);
        }catch(e){
        }
        try{
            obj.html(str);
        }catch(e){
        }        
        try{
            obj.value = str;
        }catch(e){
        }
        try{
            obj.innerHTML = str;
        }catch(e){
        }
    },
    getValue:function(obj){
        try{
            return obj.val();
        }catch(e){
        }
        try{
            return obj.text();
        }catch(e){
        }
        try{
            return obj.html();
        }catch(e){
        }        
        try{
            return obj.value;
        }catch(e){
        }
        try{
            return obj.innerHTML;
        }catch(e){
        }
    },
    addFunctionToUI:function(){
        $("#small").click(function(){
            utils.toggleWindow($("#fire_des"));
        });
        
        $("#img").mouseover(function(){
            utils.showDes($("#fire_des"));
        });
        
        $("#small").mouseout(function(){
            //removeDes($("#fire_des"));
        });
        
        $("#clear").click(function(){
            utils.reset($("#fire_text"));
        });
        
        $("#fire_decode").click(function(){
            utils.format($("#fire_text"));
        });
        
        $("#fire_result").focus(function(){
            if(utils.getValue(this)=="输入解密后看到的图案"){
                utils.reset(this);
            }
        });
        
        $("#fire_result").blur(function(){
            if(utils.getValue(this)==""){
                utils.setValue(this,"输入解密后看到的图案");
            }
        });                             
    }
}

////初始化
function initTieba(){
    var toolBar = $(".tbui_aside_float_bar")[0];
    if(!toolBar){
        return setTimeout(initTieba,1000);
    }else{
        addBoard(toolBar);
    }
}
////UI
function addBoard(toolBar){
    var small = document.createElement("div");
    var img = document.createElement("img");
    
    small.className = "t_qreply";
    small.id = "small";
    small.style.position = "absolute"
    small.style.top = "-50px"; 
    small.style.display= "block";
    
    img.id = "img";
    img.src = "http://d.hiphotos.baidu.com/album/s%3D1600/sign=aad5e6abb7fd5266a32b38129b28962b/3812b31bb051f819ad06e90adbb44aed2e73e74b.jpg";
    img.alt = "B吧绅士用对尾巴宝具";
    img.style.width = "30px";
    img.style.height = "30px";
    
    small.appendChild(img);
    toolBar.appendChild(small);
    
    var t_r_container = document.createElement("div");
    t_r_container.className = "t_r_container";
    t_r_container.id = "fire_des";
    t_r_container.setAttribute("style","z-index: 50011; display: none; width: 296px;");
    
    var text = document.createElement("textarea");
    text.id = "fire_text";
    text.style.position = "relative";
    text.style.top = "-45px";
    text.style.left = "-5px";
    text.style.width = "294px";
    text.style.height = "130px";
    text.style.resize = "none";
    
    var result = document.createElement("input");
    result.id = "fire_result";
    result.style.position = "absolute";
    result.style.top = "0px";
    result.style.left = "-175px";
    result.value = "输入解密后看到的图案";
    
    var button_div = document.createElement("div");
    button_div.style.position = "relative";
    button_div.style.cursor = "pointer";
    button_div.style.top = "142px";
    button_div.style.left = "170px";
    
    var input = document.createElement("span");
    input.id = "fire_decode";
    input.innerHTML = "小尾巴解码!"
    input.className = "l_lzonly";
    input.style.position = "relative";
    input.style.cursor = "pointer";
    input.style.top = "-3px";
    input.style.left = "-18px";
    
    var clear = document.createElement("span");
    clear.id = "clear";
    clear.innerHTML = "清空";
    clear.className = "l_lzonly";
    clear.style.position = "relative";
    clear.style.top = "-28px";
    clear.style.left = "54px";
    
    button_div.appendChild(result);
    button_div.appendChild(input);
    button_div.appendChild(clear);
    
    t_r_container.appendChild(button_div);
    t_r_container.appendChild(text);
    
    var tb = $(".tbui_aside_float_bar")[0];
    
    tb.appendChild(t_r_container);
    
    utils.addFunctionToUI();
};