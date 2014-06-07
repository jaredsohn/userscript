// ==UserScript==
// @name          Reddit 4chan Mode
// @namespace url(http://www.w3.org/1999/xhtml);
// @description   Reddit 4chan Mode
// @author        Muhs
// @include       http://www.reddit.com/r/*/comments/*
// @run-at document-start
// ==/UserScript==
GM_contentEval=function (source)
{
  source = '(' + source + ')();'
  var script = document.createElement('script');
  script.setAttribute("type", "application/javascript");
  script.textContent = source;
  document.body.appendChild(script);
  document.body.removeChild(script);
}
GM_contentEval(function()
{
  var container=$('<div></div>');
  $('.menuarea').append(container);
  container.addClass('spacer');

  // image toggler
  show_images=function(find_string, gonewild) {
    var gonewild = gonewild || '';
    var x=$(".content")
    .find(find_string)
    .each(function(){
    var re=new RegExp("[^a-zA-Z]"+gonewild+"[^a-zA-Z]","i");
    var href=$(this)
    .attr("href");
    var title_text=$(this).text();
    if(
      (!$(this).hasClass("drowsapMorphed"))
      && ($(this).next(".drowsapMorphed").length==0)
      && href
      && (gonewild =='' || title_text.match(re))
      && (href.indexOf('imgur.')>=0 
      || href.indexOf('.jpeg')>=0
      || href.indexOf('.jpg')>=0
      || href.indexOf('.gif')>=0)) {
      var ext=(href.indexOf('imgur.')>=0
        && href.indexOf('.jpg')<0
        && href.indexOf('.png')<0 
        & href.indexOf('.gif')<0) ? '.jpg' :'';
      var img=$("<a class='drowsapMorphed' href='"+href+"' onclick='window.open(this.href);return false;' style='display:block'><img style='display:block;max-width:720px;' src='"+href+ ext+"' /></a>");
      $(this).after(img);
      }});
  };
    show_images("#siteTable div.entry p.title a.title");
    show_images(".usertext-body a");

});