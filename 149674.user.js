// ==UserScript==
// @name           is-programmer 后台评论地理位置显示
// @namespace      http://lilydjwg.is-programmer.com/
// @description    通过 JSONP 查询 IP 地址对应的地理位置并显示
// @include        http://*.is-programmer.com/admin/comments*
// @include        http://*.is-programmer.com/admin/messages*
// ==/UserScript==

var qurl = function(ips){
  return 'http://localhost:2000/queryip?q=' + ips.join(',') + '&cb=?';
};

var letsJQuery = function(){
  var ip_header = document.evaluate('//th[@class="helpHed" and text()="IP"]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
  $(ip_header).after('<th class="helpHed">地址</th>');
  var ip_cells = document.getElementsByClassName('comment_ip_col');
  var ips = [];
  var i;
  for(i=0, len=ip_cells.length; i<len; i++){
    ips.push(ip_cells[i].textContent);
  }
  $.getJSON(qurl(ips), function(data){
    var ans = data.ans;
    for(i=0, len=ip_cells.length; i<len; i++){
      $(ip_cells[i]).after('<td class="comment_addr_col">'+ans[i]+'</td>');
    }
  });
};

function GM_wait(){
  if(typeof unsafeWindow.jQuery == 'undefined') {
    window.setTimeout(GM_wait, 500);
  }else{
    $ = unsafeWindow.jQuery;
    letsJQuery();
  }
}

GM_wait();