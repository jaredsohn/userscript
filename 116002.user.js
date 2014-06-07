// ==UserScript==
// @name           phpbb enhancer
// @namespace      tukkek
// @description    Clean phpBB thread pages, offering a toogle button to display full content
// @include        *
// ==/UserScript==
function getPosts(){
  return body.getElementsByClassName("postbody");
}

var body = document.body;
if (!body.id||body.id!='phpbb'||getPosts().length==0){
  return;
}

var posts=getPosts();
var output="";
for (post in posts){
  var p = posts[post];
  if (p.tagName=="DIV"){
    output+=p.innerHTML+'<hr/>';
  }
}

var full=body.innerHTML;
body.innerHTML=output+document.getElementById("pagecontent").childNodes[1].innerHTML+'<br/>';

var back = document.createElement('button');
back.innerHTML='Back to full page';
body.appendChild(back);
back.addEventListener("click", function(){
  document.body.innerHTML=full;
}, true);
