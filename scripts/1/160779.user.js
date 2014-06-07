// ==UserScript==
// @name          Colorful page background
// @namespace     http://userstyles.org
// @author        WuShengJun
// ==/UserScript==
(function(){
function getColor()
    {        
          var colorValue=[];        
          for ( var i=0; i<3; i++ ) 
              {         
                  colorValue[i]=Math.floor(Math.random()*25 + 230);   
              }       
          return 'rgb(' + colorValue.join() + ')';
    };
document.body.style.backgroundColor=getColor();
function compareColor(tg)
    {   return window.getComputedStyle(tg,null).backgroundColor=='rgb(255, 255, 255)';    };
function setColor(tg)
    {   tg.style.backgroundColor=getColor();   };
  
        var getRef =['html','body','div','ul','table','td','dl','pre','applet','object','h1','h2','h3','h4','h5','h6','p','blockquote','abbr','acronym','address','big','cite','code','del','dfn','em','font','img','ins','kbd','q','s','samp','small','strike','strong','sub','sup','tt','var','b','u','i','center','dt','dd','ol','li','fieldset','form','label','legend','caption','tbody','tfoot','thead','th','input','button','textarea','select','option','optgroup','span','a'];
                  for (var i=0, tag, tg; i<getRef.length; i++)
                       {
	                   tag=document.getElementsByTagName(getRef[i]);
                           for (var j=0; j<tag.length; j++)
                                {
                                   tg=tag[j];
                                   if (compareColor(tg))
                                        {  setColor(tg);  }
                                }
                       }            
})();
