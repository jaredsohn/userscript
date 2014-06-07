// ==UserScript==
// @name           douban book library collection
// @namespace      http://ktmud.com
// @include        http://book.douban.com/mine*wish*
// @include        http://book.douban.com/doulist/*
// @include        http://book.*.douban.com/doulist/*/
// @include        http://book.douban.com/people*
// @include        http://book.*.douban.com/mine*wish*
// @include        http://book.*.douban.com/people*
// @include        http://book.douban.com/subject_search*
// @include        http://book.*.douban.com/subject_search*


// @version        0.0.1
// ==/UserScript==

if (!/\.douban\.com$/i.test(location.hostname)) return;

var bookBorrowInfo = function() {
  
  
  
  var reg_img = /<img.*?>/g;
  
  $(function() {
    
    var links = $('.item .title a');
    
    if (!links.length) {
      links = $('.doulist_item div.pl2 a');
    }
        
    if (!links.length) {
      links = $('table tr.item div.pl2 a');
    }
    
    if (links.length) {
      
      links.each(function(i, item) {
        $.get(item.href, function(data) {
          data = data.replace(reg_img, '');
          $(data).find("#borrowinfo").appendTo(item.parentNode.parentNode);
        });
      });
      
      $('<style>#borrowinfo h2 { display: none; } \
#borrowinfo { border-radius: 4px; margin-top: 10px; } \
#borrowinfo li { display: inline-block; width: 30%; margin-right: 2%; } \
#borrowinfo ul.bs li:last-child { display: none; }</style>').appendTo(document.head);
    }
    
    /*
    $('#interest_sect_level a.colbutt:first').unbind('click').click(function() {
      var url = this.href;
      $.get(url, function(data) {
        data = data.match(/我读过了<\/a><script type="text\/javascript">\/\* <\!\[CDATA\[ \*\/([\s\S]*)\/\* \]\]> \*\//)[1];
        eval(data);
        $('.collect_btn', '#interest_sect_level').each(function(){
           Douban.init_collect_btn(this);
        });
      })
      return false;
    });
     */
    
  });
  
};

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
contentEval( bookBorrowInfo );
