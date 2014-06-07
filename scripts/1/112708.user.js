// ==UserScript==
// @name           Automatické presmerovanie pre Divoké kmene
// @description  Zadáte čas vo formáte hh:mm:ss a url vo formáte http://...
// @author         ivanko91
// @include        http://*.divoke-kmene.sk/*
// @include        *.divoke-kmene.sk*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.js
// @version        1.2
// ==/UserScript==
var jqscr=document.createElement("script");
jqscr.src="http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.js";
jqscr.type="text/javascript";
document.getElementsByTagName("head")[0].appendChild(jqscr);
var scr=document.createElement("script");
scr.type="text/javascript";
scr.innerHTML='(function(){$("head").append($("<style/>").html(".inputT{width:200px;padding:2px;font-family:Trebuchet Ms;font-size:14px;background:#FFFFFF;display:block;border-radius:5px;border:1px solid #888888;position:absolute;top:120px;left:10px;box-shadow:0px 0px 5px 0px #707070;}"));$.each(["URL","čas"],function(i,val){$inp=$("<input/>").addClass("inputT").css("top",60+i*30).val(val).bind("focus blur",function(e){if(e.type=="focus")$(this).val(($(this).val()==val)?"":$(this).val());else if(e.type=="blur")$(this).val(($(this).val()=="")?val:$(this).val());}).attr("id",val.toLowerCase().replace("č","c")).attr("type","text");$("body").append($inp);});$("body").append($("<input/>").addClass("inputT").css("width",100).val("Načasovať").bind("click",function(){if($("#url").val()!="URL"&&$("#cas").val()!="čas"){$("#nacasuj").css("display","none");$("#url,#cas").attr("disabled",true);$urlToLocate=$("#url").val();$casEventu=$("#cas").val();setInterval(function(){if($("#serverTime").text()==$casEventu){window.location.href=$urlToLocate;}},500);}}).attr("type","button").attr("id","nacasuj"));})();';
document.getElementsByTagName("head")[0].appendChild(scr);