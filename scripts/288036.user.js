// ==UserScript==
// @name       AoCZoneScroll
// @namespace  http://rene.kooi.me
// @version    0.1
// @description  Near-infinite scroll for AoCZone
// @match      http://aoczone.net/viewtopic.php?*
// ==/UserScript==


var next = $('.tbl').next(),
  loading = false,
  totalPosts = parseInt( $('.pagination').text().match(/(\d+) posts/)[1], 10 ),
  startPost = parseInt( $('.pagination strong').first().text(), 10 ) * 10 - 10;

function loadPage(start) {
  if (loading) return;
  loading = $('<h2>').css('text-align', 'center').text('Loading...');
  next.before(loading);
  $('<div>').load(location.href + '&start=' + start + ' .tbl', function () {
    next.before($(this).find('.tbl'));
    loading.remove();
    loading = false;
  });
}

var doc = $(document);
doc.bind('scroll', a);

$('<div>')
  .css({
    position: 'fixed',
    bottom: 0,
    right: 0,
    background: '#fff',
    borderTop: '1px solid #000',
    borderLeft: '1px solid #000',
    borderRadius: '3px 0 0 0',
    padding: '5px',
    cursor: 'pointer',
    fontSize: '110%'
  })
  .text('Disable autoload')
  .bind('click', function b() {
    doc.unbind('scroll', a);
    $(this).unbind('click', b).text('Disabled').css('cursor', '');
    setTimeout($.proxy($(this).remove, $(this)), 2000);
  })
  .appendTo('body');

function a() {

  var posts = $('.tbl .post'), last = posts.last(), count = startPost + posts.length;
  if (window.scrollY + window.innerHeight >= last.offset().top) {
    if (count < totalPosts) {
      loadPage(count);
    }
    else {
      next.before($('<h4>').css('text-align', 'center').text('-- end of topic --'));
      doc.unbind('scroll', a);
    }
  }

}