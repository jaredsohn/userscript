// ==UserScript==
// @name       NNMThank
// @namespace  http://nnm-club.me/
// @include    http://nnm-club.me/forum/viewtopic.php?t*
// @version    0.1
// @description  NNTThank from Odinn
// @copyright  2012+, Odinn
// @require	  http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js
// @run-at         document-end
// ==/UserScript==
function ajax_do(b){
    var a=document.location.href,c=a.lastIndexOf("/")+1;
	a=a.substring(0,c);
    if(b.substring(0,4)!="http"){
    	var u=b;
        b=a+b;
   	}
	a=document.createElement("SCRIPT");
	a.type="text/javascript";
	a.src=b;
	document.body.appendChild(a);
    u=u.replace(/\D/g, '');
   	setTimeout(function() { window.location = "download.php?id="+u }, 1000);
}

var th = $("img[src='images/sps.gif']");
var thtit = th.attr("title");
//if (th.visible) alert(123)
if(thtit !==undefined){

//if (typeof(thtit)!== "undefined") alert(123) else alert(24)

var ur = '<br/><br/><a id="myu" href="javascript:void(0);" style="color:#423189;font-size:15px;" rel="nofollow">Скачать+ </a><br/>';
	$("a[href^='download']").parent().append(ur);
	$("#myu").bind('click', function(){
       eval(th.attr("onclick"));
   });
}
