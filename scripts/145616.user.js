// ==UserScript==
// @name       代码搜索增加系统owner旺旺
// @namespace  http://use.i.E.your.homepage/
// @version    0.1
// @description  enter something useful
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.6/jquery.min.js
// @match      http://sg.alipay.net/source/*
// @copyright  2012+, You
// ==/UserScript==




var $ = unsafeWindow.jQuery;

$(document).ready(function(){ 
    $('body').append('<script type="text/javascript"> function getAliWangUrl(aliwang){  var arr=new Array;  arr[0]="aliim:sendmsg?uid=cntaobao&touid=cntaobao";   arr[1]=aliwang;   arr[2]="&siteid=cntaobao&status=1&charset=%75%74%66%2D%38&v=%32&s=%32";    var url=arr.join("");  window.location.href =url;} </script>');
});

$('[class="f"]').each(function(i){
    
    
    
    var sysHref=this.children[0]
        
    $(sysHref).attr("target","_blank")
        
    var sysText=$(sysHref).attr("href")
        
    sysText=(sysText.substring(13,sysText.length))    
    
    var sys=sysText.substring(0,sysText.indexOf("/"))
     
       
        
    var queryUrl="http://appinfo.alipay.net/app/appList.htm;jsessionid=91E10CF9F1BEAE720D79F8E2EC2DBAE4?_form_token=3T7JcgGrrU9QeIBays3Es6w5Faz6yMFf&currentPage=1&action=quicksearch&sysName="+sys  
        
    $(this).after("<div id='"+sys+"' />")    
    $.ajax({  type: "get", url: queryUrl,dataType:"html", success: function(data){
           
            data=data.replace("/img/ww.gif","http://appinfo.alipay.net/img/ww.gif")
           
            $("#"+sys).html($(data).find('.user-names').eq(0).html())   
          },
                 
    });  
     
            
       
                
                
})
    
    
    
    

