// ==UserScript==
// @name           Shanbay Keys Remap
// @author         nasdaq
// @description	   Don't need to press enter
// @version        1.0.0.2
// @namespace      http://www.shanbay.com/
// @include        http://www.shanbay.com*
// ==/UserScript==

(function() {
    
    //contentLoaded事件
    if($.browser.opera){
    	$(contentLoaded);//此种写法chrome上偶尔会不触发事件
    }else{
    	contentLoaded();
    }
    
    var willRun,willRun1 = false;
    //页面载入
    function contentLoaded() {

    	domChanged();
        document.addEventListener("DOMNodeInserted",domChangeRunOnce,false);
                
        $(document).keydown(function(e){
            if(e.keyCode == 190){
                nativeClick($("div.modal .btn-success")[0]);
            }
        });
        
        //短时间500ms内多次事件发生只执行一次
        function domChangeRunOnce(){
            if(willRun){return;}
            willRun = true;
            domChanged()
            setTimeout(function(){willRun = false;},500);
        }
   
        //domChanged
        function domChanged() {
            willRun = false;
            $("#answer-content").unbind( "keydown");
            $("#answer-content").keydown(function(e){
                if(e.keyCode == 190){
                    nativeClick($("#check:visible")[0]);
                }
            });
        }
    }
    
    //模拟点击
    function nativeClick(node){
        if(willRun1){return;}
        willRun1 = true;
        setTimeout(function(){willRun1 = false;},100);
        setTimeout(function(){
            try{
                var evt = document.createEvent("MouseEvents");  
                evt.initEvent("click", true, true);  
                node.dispatchEvent(evt);
            }catch(e){
                node.click();
            }
        },30);
    }
})();