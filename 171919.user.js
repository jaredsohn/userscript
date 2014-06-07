// ==UserScript==
// @name       Themex
// @namespace  http://www.icoding.me/
// @version    0.1
// @description  Themex
// @match      http://bbs.themex.net/*
// @copyright  2012+, Hubert
// ==/UserScript==

function loadjscssfile(filename,filetype){

    if(filetype == "js"){
        var fileref = document.createElement('script');
        fileref.setAttribute("type","text/javascript");
        fileref.setAttribute("src",filename);
    }else if(filetype == "css"){
    
        var fileref = document.createElement('link');
        fileref.setAttribute("rel","stylesheet");
        fileref.setAttribute("type","text/css");
        fileref.setAttribute("href",filename);
    }
   if(typeof fileref != "undefined"){
        document.getElementsByTagName("head")[0].appendChild(fileref);
    }
    
}
loadjscssfile("http://libs.baidu.com/jquery/1.8.3/jquery.min.js","js");

//设置一个加载时间
setTimeout(function(){
	$(document).ready(function(){
        
        $("#posts .alt1>div.btop2>table tr td>a").each(function(i,val){
        	var alt = $(this).find("img").attr("alt");
            if(alt=="回复时引用此帖"){
            	$(this).html("引用");
            }else if(alt=="多重引用本帖"){
            	$(this).html("多重引用");
            }else if(alt=="快速回复此帖"){
        		$(this).html("快速回复");
            }else if(alt=="致谢"){
        		$(this).html("致谢");
            }else if(alt=="编辑/删除帖子"){
        		$(this).html("编辑");
            }
        });
        
        $("td.postbit.bright .avatar").hover(function(){
        	$(this).next("div").show();
        },function(){
        	$(this).next("div").hide();
        });
        
	})
},1000);
