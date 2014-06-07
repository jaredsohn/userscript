// ==UserScript==
// @name          Reddit comments
// @namespace     http://jeffpalm.com/redditcomments
// @description   Displays reddit comments inline
// @include       http://*.reddit.com*
// ==/UserScript==

/*
 * Copyright 2009 Jeffrey Palm.
 */

const TESTING = false;
var links2CurrentComment = new Array();

function addNewLink(d) {
  var nn = document.createElement('div');
  nn.style.marginLeft = '25px';
  d.appendChild(nn);
  var a = document.createElement('a');
  nn.appendChild(a);
  a.href = 'javascript:void(0);';
  a.innerHTML = 'inline comments';
  a.addEventListener('click',newFirstClickFunction(d,a),true);
}

function newNextCommentFunction(_newDiv,_comments,_inc,_href) {
  var newDiv = _newDiv;
  var comments = _comments;
  var inc = _inc;
  var href = _href;
  return function(e) {
    var i = links2CurrentComment[href];
    var nextI = i+inc;
    if (nextI>=comments.length) {
      nextI = 0;
    } else if (nextI<0) {
      nextI = comments.length-1;
    }
    links2CurrentComment[href] = nextI;
    var c = comments[nextI];
    newDiv.innerHTML = c;
  };    
}

function showFirstComment(res,href,nextCommentLink,d) {
  var txt = res.responseText;
  var res;
  var comments = new Array();
  if (res = txt.match(/<div class="md"><p>(.*)<\/p><\/div>/g)) {
    for (var i=1; i<res.length; i++) {
      comments.push(res[i]);
    }
  }
  var p = nextCommentLink.parentNode;
  p.removeChild(nextCommentLink);
  var al = document.createElement('a');
  var ar = document.createElement('a');
  p.appendChild(al);
  p.appendChild(document.createTextNode(' '));
  p.appendChild(ar);
  var newDiv = document.createElement('div');
  p.appendChild(newDiv);
  al.href = 'javascript:void(0)';
  al.innerHTML = 'next';
  al.addEventListener('click',newNextCommentFunction(newDiv,comments,-1,href),true);
  ar.href = 'javascript:void(0)';
  ar.innerHTML = 'prev';
  ar.addEventListener('click',newNextCommentFunction(newDiv,comments,+1,href),true);
  links2CurrentComment[href] = 0;
  newDiv.innerHTML = comments[0];
}

function newFirstClickFunction(_d,_a) {
  var d = _d;
  var a = _a;
  return function(e) {
    var as = d.getElementsByTagName('a');
    var href = null;
    for (var i in as) {
      if (as[i].className && as[i].className.match(/comments/)) {
        href = as[i].href;
        break;
      }
    }
    if (!href) return;
    var loadingDiv = document.createElement('em');
    var par = a.parentNode;
    loadingDiv.innerHTML = 'loading...';
    par.removeChild(a);
    par.appendChild(loadingDiv);
    GM_xmlhttpRequest({
      method:"GET",
          url:href,
          headers:{
          "User-Agent":"monkeyagent",
            "Accept":"text/monkey,text/xml,text/plain",
            },
          onload: function(res) {
          showFirstComment(res,href,loadingDiv,d);
				}
      });    
  }
}

function main() {
  var things = new Array();
  var divs = document.getElementsByTagName('div');
  for (var i in divs) {
    if (divs[i].className && divs[i].className.match(/thing/)) {
      addNewLink(divs[i]);
    }
  }
}

try {main();} catch (e) {if (TESTING) alert('Error: ' + e);}
