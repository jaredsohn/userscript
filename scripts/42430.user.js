// ==UserScript==
// @name           Close Block
// @namespace      h13i32maru
// @include        http://d.hatena.ne.jp/*
// @exclude        http://d.hatena.ne.jp/*/draft*
// @exclude        http://d.hatena.ne.jp/*/edit* 
// ==/UserScript==
(function(){
  //{{{init(tagname)
  function init(tagname){
    var maxHeight = 400;
    var blocks = document.getElementsByTagName(tagname);
    for(var i = 0; i < blocks.length; i++){
      blocks[i].setAttribute("buffer" , "{{{ open by double click ...}}}".bold());
      blocks[i].addEventListener("dblclick" , toggle , true);//toggle func is exchange buffer and innerHTML
      if(blocks[i].clientHeight > maxHeight) toggle(null , blocks[i]);
    }
  }
  //}}}
  //{{{toggle(e , elm)
  function toggle(e , elm){
    if(elm){ var target = elm; }
    else{ target = this; }

    if(e){
      //if click-Yposition and the block-Yposition are greatly diffrent , scroll up to the diffrent
      var scrolled = e.pageY - Math.round(target.getBoundingClientRect().top + window.scrollY);
      if(scrolled > 200) window.scrollBy(0 , -1 * scrolled);
    }
    var tmp = target.innerHTML;
    target.innerHTML = target.getAttribute("buffer");
    target.setAttribute("buffer" , tmp);
  }
  //}}}

  init("blockquote");
  init("pre");
})()
