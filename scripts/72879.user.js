// ==UserScript==
// @name          One button to collapse all comments, one to show all images; One toggle children button for each root comment
// @namespace url(http://www.w3.org/1999/xhtml);
// @description   reddit_bookmarklets++
// @author        klawd kamundo
// @include       http://*reddit.com/*
// @include       https://*reddit.com/*
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

  // comment toggler
  $('div.commentarea > div.sitetable > div.thing > div.child').each(function(){
    var t=$(this);
    if(!t.children('div').length)
	  return;
	var toggler=$('<a href="#" class="toggler">toggle children</a>');
	var buttons=$(t.prev().find('.buttons'));
	var li=$('<li></li>');
	li.append(toggler);
	buttons.append(li);
	toggler.click(function(e){
	  var toggler=$(this);
      t.children('div').toggle();
	  e.preventDefault();
    })
  });
  var toggler=$('<a href="#">[ toggle comments ]</a>');
  toggler.css('color', 'gray');
  toggler.css('font-size', '12px');
  toggler.css('font-weight', 'bold');
  toggler.click(function(e) {
    $('.toggler').each(function(){
        $(this).click();
    });
    e.preventDefault();
  });
  $('.toggler').each(function(){
      $(this).click();
  });
  container.append(toggler);
  container.append(' ');

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
  
  var toggler=$('<a href="#" style>[ show images ]</a>');
  toggler.css('color', 'gray');
  toggler.css('font-size', '12px');
  toggler.css('font-weight', 'bold');
  toggler.click(function() {
    show_images("#siteTable div.entry p.title a.title");
    show_images(".usertext-body a");
    $(this).remove();
  });
  container.append(toggler);
});