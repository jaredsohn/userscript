// ==UserScript==
// @name        reddit.com : no I in Internet
// @namespace   tukkek
// @include     *reddit.*/r/*/comments/*/
// @version     1
// @grant       none
// ==/UserScript==
var DEBUG=false;
var MAX_COMMENTS=100;
var STOPS=['.','\n','-',':','!','?'];
var BLACKLIST=['i','me','my','im','i\'ll','i\'ve','i\'m','mine','i\'d'];
var BLACKLISTWHOLE=['edit:','tl;dr','tl/dr','tl:dr','tldr','itt:','nitt:'];
var BLACKLISTSTART=['honestly','well','wow'];
var CAUSESCORE='score';
var CAUSEDELETED='deleted';

function remove(p,cause){
  if(getcomments().length<=MAX_COMMENTS&&cause!=CAUSEDELETED){
    return;
  }
  if(!DEBUG||cause==CAUSESCORE){
//TODO only filter comment when >100
    p.parentNode.removeChild(p);
  }else if(DEBUG){
    p.title=cause;
    p.style['background']='lightgrey';
    //MAX_COMMENTS++;
  }
}
function getvotes(p,classname){
  return parseInt(p.getAttribute(classname));
}
function getcomments(){
  return document.querySelectorAll('.comment');
}
function debug(x){
  if(false)alert(x);
}

debug('deleted');
var deleted=document.querySelectorAll('.deleted');
for(var i=0;i<deleted.length;i++){
  remove(deleted[i],CAUSEDELETED);
}
debug('noi');
var comments=getcomments();
var worst=Number.MAX_VALUE;
var best=Number.MIN_VALUE;
commentloop:for(var i=0;i<comments.length;i++){
  var p=comments[i].querySelector('.md>*');
  if(!p){
    debug('null p @ '+i);
    //comments[i].scrollIntoView();
    continue;
  }
  var first=' '+p.textContent.toLowerCase();//TODO factor
  while(!p.classList.contains('usertext')){
    p=p.parentNode;
  }
  var start=p.textContent.toLowerCase();//TODO factor
  var text=' '+start;
  var comment=p;
  while(!comment.classList.contains('comment')){//TODO factor
    comment=comment.parentNode;
  }
  for(var j=0;j<BLACKLISTSTART.length;j++){
    var word=BLACKLISTSTART[j];
    if(start.indexOf(word)==0){
      remove(comment,word);
      continue commentloop;
    }
  }
  for(var j=0;j<BLACKLISTWHOLE.length;j++){
    var word=BLACKLISTWHOLE[j];
    if(text.indexOf(word)!=-1){
      remove(comment,word);
      continue commentloop;
    }
  }
  //if(first.indexOf('work in')!=-1)alert(text);//TODO debug
  text=first;//TODO
  var sentence=Number.MAX_VALUE;
  for(var j=0;j<STOPS.length;j++){
    var stop=text.indexOf(STOPS[j]);
    if(stop!=-1&&stop<sentence){
      sentence=stop;
    }    
  }
  if(sentence!=Number.MAX_VALUE){
    text=text.substr(0,sentence)+' ';
  }
  for(var j=0;j<BLACKLIST.length;j++){
    var word=BLACKLIST[j];
    if(text.indexOf(' '+word+' ')!=-1){
      remove(comment,word);
      continue commentloop;
    }
  }
  var score=getvotes(comment,'data-ups')-getvotes(comment,'data-downs');
  comment.setAttribute('score',score);
  if(score<worst){
    worst=score;
  }
  if(score>best){
    best=score;
  }
}
debug('trim');
trim:for(var j=worst;j<=best;j++){
  var cut=document.querySelectorAll('.comment[score="'+j+'"]');
  for(var i=cut.length-1;i>=0;i--){
    remove(cut[i],CAUSESCORE);
  }
}
document.querySelector('div.panestack-title span.title').innerHTML='filtered '+document.querySelectorAll('.comment').length+' comments';
