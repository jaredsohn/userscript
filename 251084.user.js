// ==UserScript==
// @name        reddit.com enhancer
// @namespace   tukkek
// @include     *reddit.com*
// @version     1
// ==/UserScript==
//opens links in iframes
var SCROLLCLASSES=['arrow','expand'];

function advance(){
  var navigator=document.querySelectorAll('span.nextprev a');
  var nextpage=navigator[navigator.length-1].href;
  var loc=document.location;
  if(loc.href==nextpage){
    alert('final page :(');
  } else {
    loc.href=nextpage;
  }
}
function inlinelink(link,scroll){
  var url=link.href;
  if(url==document.location.href){
    return;
  }
  link.allow=true;
  var parent=link;
  for(var j=0;j<3;j++){
    parent=link.parentNode;
  }
  var iframe=document.createElement('iframe');
  iframe.src=url;
  iframe.style.width='100%';
  iframe.style.height=Math.floor(window.innerHeight*8/10)+'px';
  parent.parentNode.insertBefore(iframe,parent.nextSibling);
  if(scroll){
    link.scrollIntoView();
  }
}

if(document.querySelectorAll('#siteTable .thing').length==0){
  advance();
  throw 'advancing...';
}
var commentspage=document.location.href.indexOf('/comments/')!=-1;
for(var i=0;i<SCROLLCLASSES.length;i++){
  var scroll=document.querySelectorAll('.'+SCROLLCLASSES[i]);
  for(var j=0;j<scroll.length;j++){
    scroll[j].addEventListener('click',function(e){
      var target=e.target;
      while(!target.classList.contains('thing')){
        target=target.parentNode;
      }
      if(commentspage){
        target.scrollIntoView();
        return;
      }
      var parent=target.parentNode;
      var removes=parent.querySelectorAll('.thing');//TODO rename
      for(var k=0;k<removes.length;k++){
        var remove=removes[k];
        var istarget=remove==target;
        var next=removes[k+1];
        //parent.removeChild(remove);
        if(istarget){
          while(!next.classList.contains('thing')){
            next=next.nextSibling;
            if(!next){
              advance();
            }
          }
          next.scrollIntoView();
          //inlinelink(next.querySelector('a.title'),true);
          break;
        }
      }
    });
  }
}
//inlinelink(document.querySelector('a.title',false));
var enhanceclasses=['.usertext div.usertext-body div.md a','.thing a.title'];
for(var j=0;j<enhanceclasses.length;j++){
  var links=document.querySelectorAll(enhanceclasses[j]);
  for(var i=0;i<links.length;i++){
    links[i].onclick=function(e){
      var link=e.target;
      if(commentspage){
        link.setAttribute('target','_blank');
      }
      if(link.allow){
        return true;
      }
      /*inlinelink(link,true);
      return false;*/
      return true;//TODO
    };
  }
}
//auto collapse comment
var downvotes=document.querySelectorAll('.down');
for(var i=0;i<downvotes.length;i++){
  downvotes[i].addEventListener('click',function(e){
    unsafeWindow.hidecomment(
      e.target.parentNode.parentNode.querySelectorAll('.expand')[1]);
  })
}
//inline images
var anchors=document.querySelectorAll('div.commentarea div.usertext-body a');
var extensions=['png','gif','jpg'];
for(var i=0;i<anchors.length;i++){
  var anchor=anchors[i];
  anchor.setAttribute('target','_blank');
  var href=anchor.href;
  for(var j=0;j<extensions.length;j++){
    if(href.endsWith('.'+extensions[j])){
      anchor.outerHTML+='<img src="'+href+'" style="display:block;width:100%;"/>';
      break;
    }
  }
}
document.querySelector('.side').style.display='none';
GM_addStyle('#sr-header-area{display:none;}');