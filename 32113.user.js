// ==UserScript==
// @author max7+TiGR
// @name           habr_highlights_comments
// @namespace      http://userscripts.org
// @description    Highlights Comments
// @include        http://habrahabr.ru/*
// @include        http://habrahabr.ru/blog/*
// @include        http://*.habrahabr.ru/blog/*
// @include        http://*habrahabr.ru/*/comments/
// @include        http://*habrahabr.ru/*.html*
// ==/UserScript==

var def_color = '#eee';     

var highlight_users_colors = 
{
    'Shoohurt':      '#fef',
    'deniskin':      '#fef',
    'Aist':          '#fef',
    'rossomachin':   '#fef',
    'juks':          '#fef',

    'eugenga':       '#efe',
    'rumkin':        '#efe',
    'oleganza':      '#efe',
    'OneManStartup': '#efe',
    'amIwho':        '#efe',
    'Covex':         '#efe',
    'romanser':      '#efe',
    'AlexeyTokar':   '#efe',
    
    'constructor':   null
};

var highlight_topic_style = 
    '-moz-border-radius: 0.6em !important; '+
    '-moz-outline: 1px solid #CCC !important; '+
    '-moz-outline-radius: 0.6em !important; padding: 4px;'; 


var setHighlightTopicStyle = function(node)
{ 
   node.setAttribute("style",node.getAttribute("style")+';'+highlight_topic_style);
}; 

var highlightComments = function () 
{
   if (this.lastFired != undefined) 
      if ((new Date()).valueOf() - this.lastFired < 2000) 
      {
         this.lastFired = (new Date()).valueOf();
         return;
      }
            
   this.lastFired = (new Date()).valueOf();
            
   if (document.getElementsByClassName == undefined)
      document.getElementsByClassName = unsafeWindow.document.getElementsByClassName;
                
   var memberName = undefined;
            
   if ((memberName = document.getElementsByClassName('habrauser')[0]) != undefined) 
      memberName = memberName.text;

   var authorName = document.getElementsByClassName('fn nickname url')[0].text;
            
   var comments_holders = document.getElementsByClassName('comment_holder vote_holder');

   for (var i = 0; i<comments_holders.length; ++i) 
   {
      var comment_holder = comments_holders[i]; 
      
      if(comment_holder.getAttribute('comment_highlight') == 'true')
         continue;
         
      comment_holder.setAttribute('comment_highlight','true');   

      var nickname = comment_holder.getElementsByClassName('fn nickname username')[0];
                    
      if(nickname == undefined) // NLO
         continue;
                    
      nickname = nickname.getElementsByClassName('url')[0].text;

      var c1 = comment_holder.getElementsByClassName('msg-meta')[0];
      var c2 = comment_holder.getElementsByClassName('entry-content')[0];

      if (( memberName != undefined) && (nickname == memberName)) 
      {

         setHighlightTopicStyle(c2);
         c2.style.backgroundColor='#f8f8ff';
         c2.style.padding='0px 5px';
         c2.style.border='1px dotted #bbf';
                    
         //if(c1.className == 'msg-meta new-reply')
         //{
         //}
      }
      else if (nickname == authorName) 
      {
         setHighlightTopicStyle(c2);
         c2.style.backgroundColor='#ffe';
         c2.style.padding='0px 5px';
                    
         if(c1.className == 'msg-meta new-reply')
         {              
            alert(nickname + ': new author comment in <'+ document.getElementsByClassName('topic')[0].text+'>');
         }
      }
      else if (highlight_users_colors[nickname])
      {
         setHighlightTopicStyle(c2);
         c2.style.backgroundColor = highlight_users_colors[nickname];
         c2.style.padding='0px 5px';
         c2.style.border='1px dotted #bbf';
                    
         if(c1.className == 'msg-meta new-reply')
         {
            alert(nickname + ': new highlight user comment in <'+ document.getElementsByClassName('topic')[0].text+'>');
         }
                    
      }
      else
      {
         //setHighlightTopicStyle(c2);
         c2.style.backgroundColor = def_color;
         c2.style.padding='0px 5px';
         c2.style.border='1px dotted #bbf';
                    
         if(c1.className == 'msg-meta new-reply')
         {
            c2.style.backgroundColor='#efd9ef';
            //alert(nickname + ': new comment in <'+ document.getElementsByClassName('topic')[0].text+'>');
         }
      }
   }
};


window.addEventListener("load", function(e) 
{
    if (document.getElementById('comments')) 
    {
        highlightComments();
        document.addEventListener("DOMNodeInserted", highlightComments, false);
    }
}, false);

