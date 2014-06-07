// ==UserScript==
// @name        Hacker News Greentext
// @namespace   kennethrapp1@gmail.com
// @include     *news.ycombinator.com*
// @description greentext for Hacker News Wat?!
// @version     6
// ==/UserScript==



var HackerNewsGreentext = {

    AffectDOMPath: function(expression, callback){    
        
        var result = document.evaluate(expression,document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);    
        
        if(result.snapshotLength){ 
            for(i = 0; i <= result.snapshotLength - 1; i++){
                callback.call(this, result.snapshotItem(i));
            }
        }
        
    },
    
    Run: function(){
        
	var regex;
        
        this.AffectDOMPath("//span[@class='comment']", function(node){

            regex = new RegExp('>&gt;(.+?)<','gim');
			
            node.innerHTML = node.innerHTML.replace(regex, '><font color="#195708">&gt;$1</font><');
        });
        
    }

}.Run();