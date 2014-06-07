// ==UserScript==
// @name         ph in zhihu plus 
// @namespace    ph.in.zhihu.com
// @include      *://ph.in.zhihu.com/*
// @author       filod 
// @description  在 ph 中 自定义快速链接
// ==/UserScript==


// a function that loads jQuery and calls a callback function when jQuery has finished loading
function addJQuery(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "http://lib.sinaapp.com/js/jquery/1.8/jquery.min.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "(" + callback.toString() + ")();";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}
// the guts of this userscript
function main() {
  $(window).on('beforeunload',function(){
    localStorage['shortcut'] = $('.ph-plus')[0].outerHTML
  })
  var shortcuts = localStorage['shortcut'] || '<div class="ph-plus"><button class="addLink">加链接</button> <button class="clear" style="float:right">清空</button></div>'
  $(shortcuts).appendTo('.aphront-side-nav-navigation').on('click','.addLink', function (e) {
    var link, linkadd, linkname;
    linkadd = prompt('输入链接地址')
    if(linkadd.indexOf('http://') === -1){
      linkadd = 'http://' + linkadd 
    }
    linkname = prompt('输入链接名称')
    $('.ph-plus').append( '<div class="link-item"><a href="'+ linkadd +'" >'+linkname+'</a></div>' )
  }).on('click','.clear',function (e) {
    $('.ph-plus .link-item').remove()
  })
}
// load jQuery and execute the main function
addJQuery(main);
