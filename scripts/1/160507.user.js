// ==UserScript==
// @name        MuyLinux
// @namespace   MuyUbuntu
// @include     http://www.muylinux.com/*
// @version     1
// @grant       none
// ==/UserScript==




function setCookie(c_name,value,exdays)
{
var exdate=new Date();
exdate.setDate(exdate.getDate() + exdays);
var c_value=escape(value) + ((exdays==null) ? "" : "; expires="+exdate.toUTCString());
document.cookie=c_name + "=" + c_value;
}

function getCookie(c_name)
{
var i,x,y,ARRcookies=document.cookie.split(";");
for (i=0;i<ARRcookies.length;i++)
  {
  x=ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
  y=ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
  x=x.replace(/^\s+|\s+$/g,"");
  if (x==c_name)
    {
    return unescape(y);
    }
  }
}

function del_cookie(name) {
    document.cookie = name +
    '=; expires=Thu, 01-Jan-70 00:00:01 GMT;path=/;';
} 

function sum(id){
    $("#PDRTJS_2430156_comm_"+ id +"_nero_1").click();
}

function res(id){
    $("#PDRTJS_2430156_comm_"+ id +"_nero_2").click();
}

function del(id){
   
    del_cookie("PDRTJS_nero_2430156_comm_"+id);
}

function rld(){
    location.reload();
}

$(function(){

    $("[id^='comment-']").append("<button class='sum'>+</button><button class='res'>-</button><button id='_stop'>|X|</button>")
    $(".sum").click(function(){
        var iden=$(this).parent().attr('id');
        iden=iden.replace("comment-", "");
        setCookie("objetivo",iden,1);
        setCookie("tipo","sumar",1);
        setCookie("stop","1",360);
        window.setTimeout(rld, 5000);
    });
    
    $(".res").click(function(){
        var iden=$(this).parent().attr('id');
        iden=iden.replace("comment-", "");
        setCookie("objetivo",iden,1);
        setCookie("tipo","restar",1);
        setCookie("stop","1",360);
        window.setTimeout(rld, 5000);
    });
    
    $("#_stop").click(function(){
        setCookie("stop","0",360);
        del_cookie(objetivo);
        del_cookie(tipo);
        window.setTimeout(rld, 5000);
    });
    
    
     var elemID=getCookie("objetivo");
     var oper=getCookie("tipo");
     var status=getCookie("stop");
     if(status=="1"){
         window.setTimeout(del, 5000, elemID);   
         if(oper=="sumar"){
            window.setTimeout(sum, 10000, elemID);   
         }
         else{
             window.setTimeout(res, 10000, elemID);   
         }
        window.setTimeout(rld, 15000);
     }
     

})