// ==UserScript==
// @name        Hacker News Inline Images
// @namespace   kennethrapp1@gmail.com
// @description display large thumbnails for embedded imgur links
// @include     *news.ycombinator.com*
// @version     1
// @grant       none
// ==/UserScript==

var HackerNewsImgurLink = {

 AffectDOMPath: function(expression, callback){    
        
        var result = document.evaluate(expression,document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);    
        
        if(result.snapshotLength){ 
            for(i = 0; i <= result.snapshotLength - 1; i++){
                callback.call(this, result.snapshotItem(i));
            }
        }
        
    },
    
    Run: function(){
        
        this.AffectDOMPath("//a[contains(@href, 'i.imgur.com/')]", function(node){
           
            //console.log(node);
            
            var regex = /(http|https)?\:\/\/(i.)?imgur.com\/(.*)(.jpg|.png|.gif)?/;
           
            var match = regex.exec(node.href);
            
            console.log(match);
            
            //var scheme = match[1];
            var id = match[3];
           // var type = match[4];
            
             node.innerHTML = '';
            
            var img =  document.createElement('img');
            
            img.src = "https://i.imgur.com/" + id + 'm.png';
            img.setAttribute("style","width:100%");
           
            node.setAttribute("style","display:block;margin-top:15px;margin-bottom:15px");
            node.setAttribute("target", "_blank");
            node.appendChild(img);
            
        })
    }

}.Run();