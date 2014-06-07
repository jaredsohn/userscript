// ==UserScript==
// @name          Manga Loader
// @description   Load all manga in current page, only available on 178.com and dm5.com
// @author        Chris (http://chrisyip.im)
// @include       http://*.178.com/*
// @include       http://*.dm5.com/*
// @include       http://*.dmzj.com/*
// @include       http://www.manhua8.com/manhua/*
// @include       http://www.manhua8.net/manhua/*
// @include       http://www.manhua1.com/manhua/*
// @include       http://www.manhua2.com/manhua/*
// @version       1.3.8.4
// ==/UserScript==

;(function(window){
  var style, script, init, resize

  resize = function(){
    document.body.style.width = getComputedStyle(document.querySelector('html')).width
  }

  init = function(){
    var load_dm5, load_178, load_manhua8, selector, callback

    load_dm5 = function(){
      var image_div = document.querySelector( selector )
      if (!image_div) return;

      // make image clickable when there's only a image
      image_div.id = ''
      image_div.innerHTML = ''

      var pid = DM5_CID
        , current_page = DM5_PAGE
        , last_page = DM5_IMAGE_COUNT
        , key = document.getElementById('dm5_key').value
        , url = 'chapterimagefun.ashx'
        , img = document.createElement('img')
        , page_index = DM5_PAGE + 1
        , new_img, jump_to_page, _showNext, _showPre, _setURL, _showEnd
        , load_image, next_chapter_box, set_bookmark

      jump_to_page = function(e){
        var page = parseInt(this.getAttribute('data-index'), 10) - 1
        if (e.button == 0 || e.button == 1) {
          _showNext(page)
        } else if (e.button == 2) {
          _showPre(page)
        }
      }

      _setURL = function(page){
        var _url = GetUrlFormat(window.location.href), next_url
        if (page < 1) {
          next_url = false
        } else {
          next_url = _url.replace("{0}", "-p" + (page))
        }
        !!next_url && (location.href = next_url)
      }

      _showPre = function(page) {
        if (page > 1) {
          _setURL(page - 1)
          getimage()
          SetFace()
          SetReadHistory(DM5_CID, DM5_MID, page - 1, DM5_USERID)
        } else {
          alert("当前已经是第一页");
        }
      }

      _showNext = function(page){
        if (page < DM5_IMAGE_COUNT) {
          _setURL(page + 1)
          SetReadHistory(DM5_CID, DM5_MID, page, DM5_USERID)
          getimage()
          SetFace()
        } else _showEnd()
      }

      _showEnd = function(){
        if (!next_chapter_box.hasAttribute('data-show')) {
          $.ajax({
            url: DM5_CURL_END,
            dataType: 'html',
            success: function (data) {
              var div = $(data).find('#index_mian a[href="javascript:addfavorite();"]').get(0).parentElement
              , link = div.querySelector('a[href*=m]')
              , s, rect
              s = link ? '继续观看：' + link.outerHTML : '这已经是最新章节。'
              next_chapter_box.innerHTML += s;
              document.body.appendChild(next_chapter_box)
              next_chapter_box.style.display = 'block'
              rect = next_chapter_box.getBoundingClientRect()
              next_chapter_box.style.marginTop = '-' + (rect.height / 2) + 'px'
              next_chapter_box.style.marginLeft = '-' + (rect.width / 2) + 'px'
              next_chapter_box.setAttribute('data-show', true)
            },
            error: function(){
              location.href = DM5_CURL_END
            }
          })
        } else {
          'none' === next_chapter_box.style.display && (next_chapter_box.style.display = 'block')
        }
      }

      set_bookmark = function(){
        var imgs = document.querySelectorAll('.manga_image')

        if ( !imgs.length ) return;

        var body_index = parseInt(document.body.getAttribute('data-index'), 10) ||
        parseInt(imgs[0].getAttribute('data-index'), 10)
        , next_index = body_index
        , innerHeight = window.innerHeight
        , middle_loc = parseInt((innerHeight / 2), 10)

        for (var i = 0, len = imgs.length, rect; i < len; i++) {
          if (body_index - 1 == i) continue;
          rect = imgs[i].getBoundingClientRect()
          if ((middle_loc <= rect.bottom && innerHeight >= rect.bottom) ||
              (0 <= rect.top && middle_loc >= rect.top)) {
            next_index = parseInt(imgs[i].getAttribute('data-index'), 10)
            break
          }
        }
        if (next_index !== body_index) {
          SetReadHistory(DM5_CID, DM5_MID, next_index, DM5_USERID)
          document.body.setAttribute('data-index', next_index)
        }
      }

      img.className = 'manga_image'

      next_chapter_box = document.createElement('div')
      next_chapter_box.id = 'next_chapter_box'
      next_chapter_box.style.display = 'none'
      next_chapter_box.innerHTML = '<a class="close">X</a><p>已经是最后一页。<a class="add-bookmark">加入书签</a>。</p>'
      next_chapter_box.addEventListener('click', function (e) {
        if (-1 < e.target.className.indexOf('add-bookmark')) {
          this.style.display = 'none'
          SetBookmarker(DM5_CID, DM5_MID, DM5_IMAGE_COUNT, DM5_USERID)
        }
        if (-1 < e.target.className.indexOf('close')) {
          this.style.display = 'none'
        }
      }, false)

      ;(function(page){
        var that = arguments.callee
        $.ajax({
          url: url,
          data: {
            cid: pid,
            page: page,
            language: 1,
            key: key
          },
          success: function(data){
            var d
            eval(data)

            if (!Array.isArray(d)) return;

            for (var i = 0, len = d.length, url; i < len; i++) {
              current_page++
              url = d[i].trim()
              if ('' == url || !!image_div.querySelector('img[src="' + url + '"]')) continue;
              var el = img.cloneNode()
              el.src = d[i]
              el.setAttribute('data-index', page_index++)
              el.addEventListener('mouseup', jump_to_page, false)
              image_div.appendChild(el)
              if (current_page > last_page) break;
            }

            if (current_page <= last_page) {
              that.call(null, current_page)
            }
          }
        })
      })(current_page)

      window.addEventListener('scroll', set_bookmark, false)
    }
    // end load_dm5

    load_178 = function(){
      var img = document.querySelector( selector )
      if (!img) return;
      var parent = img.parentElement
        , currentPage = parseInt(document.querySelector('#jump_select2').value, 10)
        , url_taste = /(.*\/\d+)(?:-\d+)?(\..*)/i.exec(location.href)
        , url = {
          prefix: url_taste[1] + '-',
          format: url_taste[2]
        }
        , callback = function(){
          var page = parseInt(this.getAttribute('data-index'), 10)
          if (page < COMIC_PAGE.page_count) {
            window.location.href = url.prefix + (page + 1) + url.format
            return;
          } else {
            if ($('#next_chapter').size() > 0) {
              nextChapterMsgBox()
            } else {
              if (final_page_url) {
                window.location.href=final_page_url
                return;
              }
              alert('你已经浏览完所有内容。')
              window.location.href = 'http://manhua.178.com'
            }
          }
        }

      for (var i = currentPage, len = arr_pages.length, el; i < len; i++) {
        el = document.createElement('img')
        el.src = img_prefix + arr_pages[i]
        el.setAttribute('data-index', i + 1)
        el.addEventListener('mouseup', callback, false)
        parent.appendChild(el)
      }
    }

    load_manhua8 = function(){
      var img = document.querySelector( selector )
      if (!img) return;
      var parent = img.parentElement
        , pager = document.querySelector( '#topSelect' )
        , total_page = pager.querySelector( 'option:last-child' ).value
        , current_page = parseInt( pager.value, 10 )
        , url_taste = /(.+?)(\d+)(\.[a-z]{3,4})$/i.exec( img.src )
        , url = {
          prefix: url_taste[1],
          page_num_length: url_taste[2].length,
          format: url_taste[3]
        }
        , formatURL = function ( index ) {
          index = String(index)
          var len = url.page_num_length - index.length
          while ( len ) {
            index = '0' + index
            len--
          }
          return url.prefix + index + url.format
        }

      while ( ++current_page <= total_page ) {
        el = document.createElement( 'img' )
        el.classList.add( 'ImgComic' )
        el.src = formatURL( current_page )
        el.setAttribute( 'data-index', current_page )
        parent.appendChild( el )
      }
    }

    if ( /dmzj\.com|178\.com/.test( location.host ) ) {
      selector = 'img[id*=bigimg]'
      callback = load_178
    } else if ( ~location.host.indexOf( 'dm5.com' ) ) {
      selector = '#showimage'
      callback = load_dm5
    } else if ( /manhua\d+.(com|net)/.test( location.host ) ) {
      selector = '#comicImg'
      callback = load_manhua8
    }

    (function(){
      if ( document.querySelector( selector ) ) {
        callback.call()
        return;
      }

      if ( document.readyState !== 'complete' ) {
        setTimeout( arguments.callee, 1000 )
      }
    })()
  } // end init()

  document.body.style.minHeight = (screen.availHeight + 100) + 'px'
  resize()
  window.addEventListener('resize', resize, false)
  document.body.style.minWidth = '980px'

  style = document.createElement('style')
  style.innerHTML = '.content .ImgComic, .inner_img img, .manga_image{box-sizing:border-box;padding:1px!important;border:2px solid gray!important;margin:0 auto 10px!important;display:block!important;max-width:99%!important;width:auto!important;height:auto!important;cursor:pointer;}#next_chapter_box{background:#333;position:fixed;top:50%;left:50%;margin:0;z-index:999999;padding:20px;color:#fff;font-size:16px;box-shadow:0 0 15px #000;border-radius:5px;}#next_chapter_box a{color:#FF4E00;cursor:pointer;}.close{position:absolute;top:5px;right:5px;font-size:12px;}'
  document.head.appendChild(style)

  script = document.createElement( 'script' )
  script.textContent = '(' + init.toString() + ')( window )'
  document.head.appendChild( script )
})(window);
