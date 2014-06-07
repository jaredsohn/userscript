// ==UserScript==
// @name       Wei Photo
// @namespace  http://weiphoto.rix.li/
// @version    0.1
// @description  A useful plugin for Ghost article image url generation.
// @match      http://photo.weibo.com/*
// @require    http://libs.baidu.com/jquery/2.0.0/jquery.js
// @copyright  2012+, RixTox
// ==/UserScript==

var links=[];
var includeTitle = true;
var wrapMarkdown = true;

$('.m_share_like').append($('<span style="position: relative;"><a id="getExternalLinks" class="M_linkb M_transmit_bg" href="#"><span class="bg"><span class="M_ico M_icon8"></span>Links</span></a><div id="externalLinksWrap" style="right: 0;position: absolute;background: #fff;padding: 10px;display: none;text-align: right;z-index: 9999;"><div><input id="externalLinksTitle" type="checkbox" checked>Include Title</div> <div><input id="externalLinksMarkdown" type="checkbox" checked>Wrap Markdown</div><div><textarea id="externalLinks" style="min-height: 200px;min-width: 300px;"></textarea></div></div></span>'));

$('#getExternalLinks').click(function(){$('#externalLinksWrap').toggle()});

$('#externalLinksTitle').change(function(){
  includeTitle = $(this).is(':checked');
  updateLinks();
});

$('#externalLinksMarkdown').change(function(){
  wrapMarkdown = $(this).is(':checked');
  updateLinks();
});

function updateLinks() {
  var str = '';
  if(wrapMarkdown) {
    for(var i in links) {
      var link = links[i];
      var url = 'http://ww1.sinaimg.cn/large/' + link.pic_name;
      var text = '![' + (includeTitle?link.caption:'') + '](' + url + ')\n';
      str += text;
    }
  }else{
    for(var i in links) {
      var link = links[i];
      var url = 'http://ww1.sinaimg.cn/large/' + link.pic_name;
      str += url + '\n';
    }
  }
  $('#externalLinks').val(str);
}

function getAlbumLinks(uid, album, page) {
  page = page || 1;
  $.get('http://photo.weibo.com/photos/get_all?uid=' + uid + '&album_id=' + album + '&page=' + page, function(result){
    for(var i in result.data.photo_list)
      links.push(result.data.photo_list[i]);
    if(page * result.data.photo_list.length < result.data.total)
      getAlbumLinks(uid, album, page + 1);
  	updateLinks();
  })
}

function getPhotoLink(uid, photoid) {
  $.get('http://photo.weibo.com/photos/get_multiple?uid=' + uid + '&ids=' + photoid, function(result){
    links.push(result.data[photoid]);
  	updateLinks();
  })
}

var match = location.pathname.match(/\/(\d+)\/albums\/detail\/album_id\/(\d+)/);

if(match) {
  getAlbumLinks(match[1], match[2]);
}else{
  match = location.pathname.match(/\/(\d+)\/photos\/detail\/photo_id\/(\d+)/);
  if(match) {
    getPhotoLink(match[1], match[2]);
  }
}