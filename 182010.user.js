// ==UserScript==
// @id             thins.me
// @name           thins_dic
// @version        1.0
// @namespace      
// @author         
// @description    
// @include        *.*
// @run-at         document-idle
// @require        http://code.jquery.com/jquery.js
// ==/UserScript==

function showdata(data){
	alert(data);
}

var _ml=0;
var _mt=0;

;$("body").click(function(e){ 
    $("#id_pop").remove();
    _ml=mousePos(e).x;
    _mt=mousePos(e).y;
});

;$("body").keyup(function(e){ 
    var _select=$.trim(window.getSelection());
    if((e.keyCode===192)&&(_select!="")){
        $("#id_pop").remove();
    	//google style div
        var _loading="http://baidudl.duapp.com/baidudl.php?shareid=4024102329&uk=218823641";
        var _div_style="box-shadow: 0 2px 20px rgba(0, 0, 0, 0.4);background: none repeat scroll 0 0 #FFFFFF; border: 1px solid #D6D6D6; position: absolute; z-index: 1100; margin-left: 20px;";
        var _div='<div id="id_pop" style="'+_div_style+'"><img src="'+_loading+'">'+_select+'</div>';
        $("body").append(_div);
        $("#id_pop").css("left",_ml+20).css("top",_mt);
        
        //百度翻译 api ： http://openapi.baidu.com/public/2.0/bmt/translate?client_id=YourApiKey&q=today&from=auto&to=auto
        //词典api返回内容太TM简单了，简直是坑爹，果断弃之
        
        var _api_key="Flm73lLkKx7jKgS6z3A9D6vh";
        var _api_baid_dict="http://openapi.baidu.com/public/2.0/bmt/translate?client_id="+_api_key+"&q="+_select+"&from=auto&to=auto";
        $.getJSON(_api_baid_dict,function(data){
    			//alert(data.from);
    	}) 
        
               
        var _dicurl_qq="http://dict.qq.com/dict?q="+_select;
        var _dicurl_bd="http://fanyi.baidu.com/v2transapi?from=en&to=zh&query=";
        //通过jsonp实现跨域
        var _curl_url="http://localhost/api/thins.php?key=thins_dict&q="+_select+"&url="+encodeURIComponent(_dicurl_bd);
        
        $.getJSON(_curl_url,function(data){
			alert(data.trans_result[0].from);
        }) 
                 
       
    }
	
     
});

function dictDataOk(target){alert(123);
	var _backData = target.contents().find("body").html();
	alert(_backData);
}

function mousePos(e){
    var x,y;
    var e = e||window.event;
    return {
        x:e.clientX+document.body.scrollLeft+document.documentElement.scrollLeft,
        y:e.clientY+document.body.scrollTop+document.documentElement.scrollTop
    };
};



