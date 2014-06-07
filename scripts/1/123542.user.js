// ==UserScript==
// @name Kobe library books status checker
// @namespace      http://www.craftgear.net/
// @description    for those who like reading and live in Kobe.
// @include        https://www.lib.city.kobe.jp/opac/opacs/cart_display
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js
// ==/UserScript==
//
var log = function (m) {
  if (unsafeWindow.console) {
    unsafeWindow.console.log.apply(this, arguments);
  } else {
    console.log.apply(this, arguments);
  }
}
var main = function() {
  var status = $(document.createElement('div'))
  status.attr('id', 'querying')
  status.html('書籍情報を問い合わせ中です<br/>')
  status.css({
    'position': 'absolute',
    'z-index': '99',
    'color': 'white',
    'background-color': 'rgba(0,0,0,0.6)',
    'x': '10px',
    'y': '10px',
    'padding': '18px',
    'width': '240px',
    'height': '100px',
  })
  $('body').prepend(status)

  var TYPE_CART = 'cart'
  var page_type = TYPE_CART

  var td = $('table tr td');
  var books = [];
  $.each(td, function(key, value){
    var cell = $(this).html();
    if(cell.indexOf('PV:') > -1){
      var pv = cell.substr(cell.indexOf('PV:')+3, 10);
      books.push(pv);
    }
  });
  var mes = '';
  if(page_type == TYPE_CART){
    mes =  status.html() + 'カート内の書籍数:' + books.length + '<br/>'
  }
  else{
    mes =  status.html() + '予約済みの書籍数:' + books.length + '<br/>'
  }
  status.html(mes)
  //log(books.toSource(), books.length);

  var total = books.length
  if(total === 0){
    $('#querying').remove()
  }
  else{
    //var checkbox = $('input[type="checkbox"]')
    //todo 受取り可能の場合に問い合わせをしない
    while(pv = books.pop()){
      GM_xmlhttpRequest({
        method:"GET",
        url:"http://www.lib.city.kobe.jp/opac/opacs/find_detailbook?type=CtlgBook&pvolid=PV:"+pv,
        onload:function(x){
          $('#querying').html($('#querying').html() + '*')
          var result = x.responseText.trim();
          var td = '<td>'
          var status = '';
          status = result.substr(result.indexOf('所蔵冊数:'), result.indexOf('昨日までの予約件数:')-result.indexOf('所蔵冊数:')+29);

          status = status.replace(new RegExp('&nbsp;', 'g'), '');
          var key_str1 = '所蔵冊数:'
          var key_str2 = '昨日までの予約件数:'
          var stocked_count = Number(status.slice(status.indexOf(key_str1) + key_str1.length, status.indexOf('冊', status.indexOf(key_str1) + key_str1.length)))
          var reserved_count = Number(status.slice(status.indexOf(key_str2) + key_str2.length, status.indexOf('件', status.indexOf(key_str2) + key_str2.length)))

          td = td + key_str1 + stocked_count + '</td><td>' + '予約件数:' + reserved_count + '</td>'

          //貸し出し中冊数を数える
          var lent_count = 0;
          $(result).find('td').each(function(key, value){
            if($(value).html() == '貸出中'){
              lent_count++;
            }
          });
          td = td + '<td>貸し出し中:' + lent_count + '</td>'
          var pv = result.substr(result.indexOf('PV:')+3, 10);
          //log(pv);
          var bg_color = '#FFFFFF'
          var surplus = (stocked_count - lent_count - reserved_count)
          if(surplus > 0){
            bg_color = '#90ee90'
          }
          else if(surplus === 0){
            bg_color = '#FFEF85'
          }
          else if(surplus > -5){
            bg_color = '#EF7598'
          }
          else{
            bg_color = '#FF1D00'
          }

          var tr = ''
          if(page_type == TYPE_CART){
            var checkbox = $('input[id="cartbooks_PV:'+pv+'"]')
            tr = $(checkbox).parent().parent()
            //log(tr, checkbox)
          }
          tr.append(td);
          tr.css('background-color', bg_color)
          if(--total === 0){
            $('#querying').html('完了しました')
            setTimeout( function(){$('#querying').remove()}, 1000)
          }
        }
      })
    }
  }
}
main()
