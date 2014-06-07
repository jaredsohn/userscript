// ==UserScript==
// @name           Soccer without bloody eyes
// @namespace      Soccer
// @include        http://www.11strong.com/*
// ==/UserScript==

function getElementsByClassName(classname, par){
  var a=[];   
  var re = new RegExp('\\b' + classname + '\\b');      
  var els = par.getElementsByTagName("*"); 
  for(var i=0,j=els.length; i<j; i++){       
    if(re.test(els[i].className)){  
      a.push(els[i]);
    }
  }
  return a;
};

var post = getElementsByClassName('col_wrapper forum_table alternate2 post_row', document)
for(var i=0,j=post.length; i<j; i++) {
	post[i].setAttribute('style', 'border: 1px solid darkgray; border-collapse: collapse;')
}

document.body.setAttribute('style', 'background-color:#999999')

var post2 = getElementsByClassName('col col_12', document)[2]
post2.setAttribute('style', 'background-color:#dddddd')

var post = post2.getElementsByTagName('a')
for(var i=0,j=post.length; i<j; i++) {
	post[i].setAttribute('style', 'color:darkgreen;')
}

var post = getElementsByClassName('display_block', document)
for(var i=0,j=post.length; i<j; i++) {
	post[i].setAttribute('style', 'color:darkgreen; text-decoration: underline; font-size: 15px; font-weight: bold')
	i = i+1
}

var post3 = document.getElementById('nav')
var post = post3.getElementsByTagName('a')
for(var i=0,j=post.length; i<j; i++) {
	post[i].setAttribute('style', 'font-weight: bold')
}

var post = getElementsByClassName('forum_header title', document)
post[0].setAttribute('style', 'color: white')
var post = getElementsByClassName('forum_header txt_center last_post_title', document)
post[0].setAttribute('style', 'color: white')
var post = getElementsByClassName('forum_header txt_center thread_count', document)
post[0].setAttribute('style', 'color: white')

var post = document.getElementById('postdata')
post.setAttribute('style', "font-family:'Myriad Pro','Calibri','Helvetica Neue',helvetica,arial,sans-serif; font-size: 100%")