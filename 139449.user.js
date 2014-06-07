// ==UserScript==
// @author      younger.shen (younger.x.shen@gmail.com)
// @name        easy_anime
// @namespace   easy_anime
// @include     http://www.imanhua.com/comic/*/*
// @version     1
// @grant       none
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js


// ==/UserScript==

if(!window.eanime){
    window.eanime = {}
}

(function(){

    var eanime = {};
    window.eanime = eanime;
    eanime.url = window.location.href;
    
    eanime.getCurrentImage = function(){
 
        return $('table')[0].getElementsByTagName('img')[0].src;
    }

    eanime.html_builder = function(){
        
        var anime_image =  "<img  src ="+ this.getCurrentImage() +" >"; 
        var html = "<div align = 'center' >" +  anime_image + "</div>";
      
        document.body.innerHTML = html;    
    }
    eanime.getSubBookPages = function(){
        var dom = $("option");
        eanime.bookPages = dom.length;
    }
    eanime.getSubBookListCount = function(){
      
        var baseURL = eanime.url.substring(0 ,eanime.url.lastIndexOf("\/") );
          
        if(baseURL.length > 1){
            
            $.get(
                    baseURL,function(res){
                                var dom  = eanime.tool.parseToDOM(res).getElementById("subBookList").getElementsByTagName("li");
                                eanime.subBookListURL = [];
                                for(var i = 0 ; i < dom.length ; i ++){
                                    var href = dom[i].getElementsByTagName("a")[0].href;
                                    eanime.subBookListURL.push(href);
                                }
                                
                                eanime.bookListCount = dom.length;
                            }
                    );
            }else{
                
                console.log("split page error");
            }
    }
    
    eanime.bindKey = function(){
        
            $(document).keydown(function(event){ 
                var code = event.keyCode;
                var currentPage = eanime.url.split("\?")[0];
                var pre = eanime.tool.checkPos(eanime.subBookListURL, currentPage);
                if(code == 90){
                    //pre
                    var pos = pre + 1;
                    if(pos > 0 && pos < eanime.subBookListURL.length){
                        window.location.href = eanime.subBookListURL[pos];
                    }
                    
                }else if(code == 88){
                    // next
                    var pos = pre - 1;
                    if(pos > 0 && pos < eanime.subBookListURL.length){
                        window.location.href = eanime.subBookListURL[pos];
                    }
                }else if(code == 86){
        
                }
        }); 
    }
    
    eanime.start = function(){
    
        this.getSubBookPages();
        this.getSubBookListCount();
        this.bindKey();
        this.html_builder();
    }
    
    eanime.tool = {};
    
    eanime.tool.checkPos = function(arr, str){
        for(var i = 0 ; i < arr.length ; i ++){
            if(str == arr[i]){
                return i;
            }
        }
    }
    
    eanime.tool.parseToDOM = function(str){
       var domParser = new  DOMParser();
       xmlDoc = domParser.parseFromString(str, 'text/html');
        return xmlDoc
    }
    
})();

eanime.start();
