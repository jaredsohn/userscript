// ==UserScript==
//
// @name        Better V2EX Improved (Vayn)
// @namespace   vayn.v2ex.com
// @description 仿 Twitter 侧滑读贴，提高 V2EX 的浏览体验
// @include     /^https?://(www\.|neue\.)?v2ex\.com/$/
// @include     /^https?://(www\.|neue\.)?v2ex\.com/(recent|changes|\?tab).*$/
// @include     /^https?://(www\.|neue\.)?v2ex\.com/go/.*$/
// @exclude     /^https?://(www\.|neue\.)?v2ex\.com/t/.*$/
// @version     3.0.4
//
// ==/UserScript==

var $ = unsafeWindow.$

var html_str = '<div style="margin:0pt auto; width:960px; height:600px; position:absolute; top:68px;">\
  <div id="detail" class="box">\
    <div class="cell" style="padding:0; border-top:2px solid #eee; background-color:#eee;">\
      <a id="closeButton" href="#">x</a>\
      <div class="c"></div>\
    </div>\
    <div id="contentList" class="cell"></div>\
  </div>\
  <div id="loading" style="display:none; position:fixed; top:300px; width:20px; margin-left:790px; z-index:9;">\
    <img src="http://si0.twimg.com/a/1310750171/phoenix/img/loader.gif">\
  </div>\
</div>'

var reply = '<div style="margin-top:5px"><span class="fade">现在就加盖一层</span>\
<form id="mobform" action="/t/{topic_id}" method="post">\
  <div class="sep5"></div>\
  <textarea name="content" class="mob mll" style="width:465px"></textarea>\
  <div class="sep5"></div>\
  <input type="submit" class="mob super normal button" value="Reply">\
</form>\
</div>'

var last_focused_cell
var is_detail_pane_shown = false

$('#Main, #Rightbar').css({
  position: 'relative',
  zIndex: 8
})

$(html_str).appendTo($('.content'))

var show_detail = function(cell) {
  if (!is_detail_pane_shown) {
    $('#detail').show()
    $('#detail').animate({
      marginLeft: '+=410'
    }, 100, function() {
      $('#loading').show()
    })
    $('#Main').animate({
      left: '-=100'
    }, 100)
    $('#Rightbar').fadeOut('fast')
    is_detail_pane_shown = true
  } else {
    $('#loading').show()
  }
  var title = cell.find('span.item_title').text()
  var topic_url = cell.find('span.item_title a').attr('href')
  $('#contentList').html('')
  var topic_id = topic_url.match(/t\/(\d+)/)[1]
  setTimeout(function() {
    GM_xmlhttpRequest({
      method: "GET",
      url: "http://vasa.sinaapp.com/v2ex/mob/" + topic_id,
      onload: function(response) {
        $('#loading').hide()
        var contentList = $('#contentList')
        contentList.html('')
        var resp = response.responseText
        $(resp).find('.box').appendTo(contentList)
        if (document.cookie.search('auth') != -1) {
          $(reply.replace('{topic_id}', topic_id)).appendTo(contentList)
          ajaxReply(topic_url)
        }
        else
          last.css('display', 'block')
      }
    })
  }, 0)
}

var ajaxReply = function(url) {
  var btn = $('.mob.button')
  $('#mobform').submit(function() {
    var content = $('textarea.mob').val()
    if (!content)
      return false
    else {
      btn.val('Sending...').attr('disabled', 'disabled')
      $.ajax({
        type: 'POST',
        url: url,
        dataType: 'html',
        data: {'content': content},
        success: function() {
          $('textarea.mob').val('')
          var last = $('#contentList').find('.cell').last()
          var clone = last.clone()

          var rc = clone.find('.reply_content')
          rc.html(content)

          var fade = clone.find('.fade')
          fade.html('刚刚')

          var no = clone.find('.no')
          no.html(no.html().replace(
            /(\d+)/, function(match, num) {
              return +num+1
          }))

          var member = $('#Top .top').eq(1).text()
          var mlink = clone.find('.dark')
          mlink.attr('href', '/member/'+member)
          mlink.text(member)

          var img = clone.find('td').first().find('img')
          img.attr('src', 'http://www.v2ex.com/static/img/avatar_normal.png')

          clone.insertAfter(last)
        },
        error: function(xhr) {
          console.log(xhr.responseText)
          alert('发送失败，请稍候再试')
        },
        complete: function() {
          btn.val('Reply').removeAttr('disabled')
        }
      })
      return false
    }
  })
}

var close = function() {
  $('#detail').animate({
    marginLeft: '-=410'
  }, 100, "linear", function() {
    $('#detail').hide()
    $('#contentList').html('')
  })
  $('#Main').animate({
    left: '+=100'
  }, 100)
  is_detail_pane_shown = false
  last_focused_cell.removeClass('focused-cell')
  last_focused_cell = null
  $('#loading').hide()
  $('#Rightbar').fadeIn('slow')
  return false
}

if (window.location.pathname == '/')
  var cells = $('#Main .box').eq(0).children('.item')
else
  var cells = $('#Main .box').eq(0).children('.cell')

cells.on('click', function(e) {
  if ($(e.target).is('a')) { return }
  if (last_focused_cell) {
    if (last_focused_cell[0] == $(this)[0]) {
      close()
      return
    }
    last_focused_cell.removeClass('focused-cell')
  }
  $(this).addClass('focused-cell')
  last_focused_cell = $(this)
  show_detail($(this))
})

$('#closeButton').click(close)

var resize_pane = function() {
  $('#contentList').css('height', $(this).height() - 150)
}

$(window).resize(resize_pane)

resize_pane()

GM_addStyle((<><![CDATA[
  .cell {
    -webkit-transition:background-color .5s ease-in-out;
    -moz-transition:background-color .5s ease-in-out;
  }
  .cell[class*="item"]:hover,
  .cell[class*="item"]:active {
    background-color:#f9f9f9;
    cursor:pointer;
  }
  .focused-cell {
    background-color:#ebebff;
  }
  #detail {
    display:none;
    position:fixed;
    width:500px;
    height:590px;
    margin-left:160px;
    border-top:0 none;
    border-right:0 none;
    z-index:7;
  }
  #detail h1 {
    font-size:18px;
    line-height:120%;
    padding:0;
  }
  #contentList {
    height:540px;
    overflow-x:hidden;
    overflow-y:auto;
  }
  #contentList .cell {
    line-height:18px;
  }
  #closeButton {
    text-decoration:none;
    margin:5px 8px;
    float:right;
    color:#888888;
    font:bold 14px Tahoma,Arial,sans-serif;
  }
  .ago {
    font-size:10px;
    font-weight:bold;
    color:#ccc;
    line-height:10px;
  }
  .transparent {
    margin-top:5px;
  }
  img[src*="avatar"] {
    display:inline-block !important;
    -webkit-border-radius:2px !important;
    -moz-border-radius:2px !important;
    border-radius:2px !important;
    -webkit-box-shadow:0 1px 2px rgba(0, 0, 0, .4) !important;
    -moz-box-shadow:0 1px 2px rgba(0, 0, 0, .4) !important;
    box-shadow:0 1px 2px rgba(0, 0, 0, .4) !important;
    -moz-background-size:50px 50px !important;
    -webkit-background-size:50px 50px !important;
    background-size:50px 50px !important;
  }
]]></>).toString())
