// ==UserScript==
// @name           New LJ Comments (A Sturdy Gesture)
// @namespace      http://www.livejournal.com/
// @include        http://*.livejournal.com/*
// ==/UserScript==


function getElementsByClassName(parent,tagName,className){
  var boxes = new Array();
  var divs = parent.getElementsByTagName(tagName);
  var regexp = new RegExp('(?:^|\s)'+className+'(?:$|\s)');
  for each (div in divs) if (regexp.test(div.className)) boxes.push(div);
  return boxes;
}

function removeTags(str){
  return str.replace(/<[^>]+>/g,'');
}

function countViewed(postId){
  var spans = document.getElementsByTagName('span');
  var regexp = new RegExp('^ljcmt([0-9]+)$');
  var commentList = GM_getValue('commentList_'+postId,'');  
  var commentCount = GM_getValue('commentCount_'+postId,0);
  
  for each (span in spans) if (match = regexp.exec(span.id)){
    var commentId = match[1];
    var findComment = new RegExp(':'+commentId+'(?:$|:)');
    if (!findComment.test(commentList)) {
      commentList +=':'+commentId;
      commentCount++;
      if (bar = document.getElementById('cmtbar'+commentId)){
        bar.bgcolor = '#FFBBBB';
        bar.style.border = 'solid 1px #FF0000';
      }
    }
  }
  GM_setValue('commentList_'+postId,commentList);
  GM_setValue('commentCount_'+postId,commentCount);
}

function updateLinks(){
  var body = document.getElementById('body'); 
  var boxes = getElementsByClassName(body,'div','box');
  
  var updateBox = document.createElement('div');
  updateBox.className = 'box';
  updateBox.innerHTML = '<h2>Update Info</h2>';
  body.insertBefore(updateBox,body.childNodes[0]);
  var updateList = document.createElement('ul');
  updateBox.appendChild(updateList);
  var updates = 0;
  for each (box in boxes){
    var postUrl = box.getAttribute('postid');
    if (postUrl==null) {
      var permalink = getElementsByClassName(box,'div','permalink')[0];
      if (permalink==null) continue;
      postUrl = permalink.childNodes[0].href;
      if (postUrl==null) continue;
    }
    var postId = urlToPostId(postUrl);
    var newPost = (!GM_getValue('seenPost_'+postId,false));
    var newComments = false;
    GM_setValue('seenPost_'+postId,true);
    
    // Anchor headings
    var h2s = box.getElementsByTagName('h2');
    if (h2s.length==0) continue;
    h2 = h2s[0];
    var head = h2.innerHTML;
    head = removeTags(head.substr(head.indexOf('<br')));
    var bookmark = document.createElement('a');
    bookmark.name = postId;
    h2.appendChild(bookmark);
        
    var talklinks = getElementsByClassName(box,'div','talklinks');
    if (talklinks.length==0) continue;
    if (commentLink = talklinks[0].getElementsByTagName('a')[2]){
      var linkText = commentLink.childNodes[0].nodeValue;
      if (match = /[0-9]+/.exec(linkText)){
        var currComments = match[0];
        var seenComments = GM_getValue('commentCount_'+postId,0);
        unseenComments = currComments - seenComments;
        if (unseenComments!=0) {
          if (newComments = (seenComments!=0))
            commentLink.appendChild(document.createTextNode(' ('+unseenComments+' new)'));   
          else {
            commentLink.childNodes[0].nodeValue = unseenComments+' unseen comments';
          }  
        }  
      }
    }
    if (newPost||newComments){
      var postLink = '<a href="#'+postId+'">'+head+'</a>';        
      if (newPost)
        updateList.innerHTML += '<li>New Post: '+postLink+'</li>';
      else 
        updateList.innerHTML += '<li>'+postLink+': <a href="'+commentLink.href+'#comments">'+unseenComments+' new comments</a></li>';
      updates++;
    }
  }  
  if (updates==0) updateList.appendChild(document.createElement('li').appendChild(document.createTextNode('No Updates')));
}

function urlToPostId(url){  
  match = /^http:\/\/(?:syndicated|community)\.livejournal\.com\/([a-z0-9\_]+)\/([0-9]+)\.html/.exec(url);
  if (!match) match = /^http:\/\/([a-z0-9\-]+)\.livejournal\.com\/([0-9]+)\.html/.exec(url);
  if (!match) return null;
  return match[1]+':'+match[2];
}

var here = window.location.href;
var postId = urlToPostId(here);
if (postId)
  countViewed(postId)
else if (/\.livejournal\.com\/friends/.test(here))
  updateLinks();
 