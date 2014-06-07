// ==UserScript==
// @name          爱问共享资料豆瓣插件2
// @namespace     http://ishare.iask.sina.com.cn
// @version	      v1.03
// @include       http://movie.douban.com/subject/*
// @include       http://music.douban.com/subject/*
// @include       http://book.douban.com/subject/*
// @exclude       http://movie.douban.com/
// @exclude       http://music.douban.com/
// @exclude       http://book.douban.com/
// @exclude       http://www.douban.com/*
// @exclude       http://9.douban.com/*
// @exclude       http://*.douban.com/subject/*/edit
// @exclude       http://*.douban.com/subject/*/update_image
// @exclude       http://*.douban.com/subject/*/edit?mine
// @exclude       http://*.douban.com/subject/*/new_version
// @exclude       http://*.douban.com/subject/*/offers
// @exclude       http://*.douban.com/subject/*/new_offer
// @exclude       http://*.douban.com/subject/offer/*/
// @exclude       http://*.douban.com/subject/*/cinema?view=ticket
// @exclude       http://*.douban.com/subject/*/doulists
// @exclude       http://*.douban.com/subject/*/all_photos
// @exclude       http://*.douban.com/subject/*/mupload
// @exclude       http://*.douban.com/subject/*/comments
// @exclude       http://*.douban.com/subject/*/reviews
// @exclude       http://*.douban.com/subject/*/new_review
// @exclude       http://*.douban.com/subject/*/group_collectors
// @exclude       http://*.douban.com/subject/*/discussion/
// @exclude       http://*.douban.com/subject/*/wishes
// @exclude       http://*.douban.com/subject/*/doings
// @exclude       http://*.douban.com/subject/*/collections
// ==/UserScript==

var isakFunction = function(){
  var title = $('html head title').text();
  var keyword1 = title.replace( '(豆瓣)', '' ).trim();
  var keyword2 = encodeURIComponent( keyword1 );
  var url = 'http://api.iask.sina.com.cn/api/isharesearch.php?key=' + keyword2 + '&datatype=json&start=0&num=5&keycharset=utf8';
  var html_title = '<div class="da3" style="margin-bottom:0px;padding-bottom:1px;"><dl><dt style="display:inline;"><img src="http://iask.com/favicon.ico" width="15px;" height="15px;" style="margin-bottom:-2px;" /> <b><a href="http://ishare.iask.sina.com.cn/" target="_blank">爱问共享资料</a>推荐：</b></dt><a href="http://ishare.iask.sina.com.cn/upload/" target="_blank">我要分享资料</a><dd>最大的中文在线资料分享站，数百万资料免费下载</dd></dl></div>'
    var html_body_start = '<div class="indent" id="db-doulist-section" style="padding-left:5px;border:1px #F4F4EC solid;"><ul class="bs">';
  var html_body_yes = '';
  var html_body_no = '<li>没有找到相关资料，<a href="http://ishare.iask.sina.com.cn/upload/" title="资料上传" target="_blank"><b>立即上传</b></a>即可与豆友们分享！</li>';
  var html_body_end = '</ul>';
  var html_body_endmore = '<div style="text-align:right; padding:5px 10px 5px 0px;"><a href="http://api.iask.sina.com.cn/api/search2.php?key=' + keyword2 + '&format=" target="_blank">更多&hellip;</a></div>';
  var html_body_endend = '</div>';
  var length = 30;
  var unitname = new Array('Y','Z','E','P','T','G','M','K');
  var unitsize = new Array(1024 * 1024 * 1024 * 1024 * 1024 * 1024 * 1024 * 1024,1024 * 1024 * 1024 * 1024 * 1024 * 1024 * 1024,1024 * 1024 * 1024 * 1024 * 1024 * 1024,1024 * 1024 * 1024 * 1024 * 1024,1024 * 1024 * 1024 * 1024,1024 * 1024 * 1024,1024 * 1024,1024);

  $.ajax(
      {
        type : 'GET',
    dataType : 'script',
    url : url,
    success : function() {
      if( iaskSearchResult.sp.m > 0 ) {
        var title,title2, image, filesize, url, unit;
        var	regex = /([A-Z\u0391-\uffe5])/g;
        for( key in iaskSearchResult.sp.result ) {
          title = iaskSearchResult.sp.result[key].title;
          //title2 = title.replace( regex, "$1*" );
          //ellipsis = title2.length > length ? '..' : '' ;
          //title2 = title2.substr( 0, length ).replace( /\*/g, '' ) + ellipsis;
          image = iaskSearchResult.sp.result[key].format;
          filesize = iaskSearchResult.sp.result[key].filesize;
          price = iaskSearchResult.sp.result[key].price;
          if( filesize < 1024 ) filesize = filesize+'B';
          for( var i=0; i<unitname.length; i++ ){
            if( filesize > unitsize[i] || filesize==unitsize[i] ){
              filesize = Math.round( filesize / unitsize[i] * 10 ) / 10 + unitname[i];
            }
          }
          url = iaskSearchResult.sp.result[key].url;
          html_body_yes += '<li><img src="http://www.sinaimg.cn/pfp/ask/images/' + image + '.gif" style="margin-bottom:-2px;" /> <a href="' + url + '" target="_blank">' + title + '</a><span class="pl">(大小:' + filesize + ' 积分:' + price + ')</span></li>';
        }
        $( '.aside' ).prepend( html_title + html_body_start + html_body_yes + html_body_end + html_body_endmore + html_body_endend );
      } else {
        $( '.aside' ).prepend( html_title + html_body_start + html_body_no + html_body_end + html_body_endend );
      }
    }
      }
  );
}
function contentEval( source ) {
  if ('function' == typeof source) {
    source = '(' + source + ')();'
  }
  var script = document.createElement('script');
  script.setAttribute("type", "application/javascript");
  script.textContent = source;
  document.body.appendChild(script);
  document.body.removeChild(script);
}
contentEval( isakFunction );
