// ==UserScript==
// @name           TLsqueezer
// @author         Extaliones 
// @description    TorrentLeech.org Squezer
// @namespace      http://userscripts.org/users/extaliones
// @include        http://torrentleech.org/torrents/*
// @include        http://www.torrentleech.org/torrents/*
// @grant          none
// @updateURL      https://userscripts.org/scripts/source/161121.user.js
// @version        0.13
// @license        MIT
// ==/UserScript==

function contentEval(source) {
  var script = document.createElement('script')
  script.setAttribute("type", "application/javascript")
  script.textContent = '(' + source + ')();'

  document.body.appendChild(script)
  document.body.removeChild(script)
}

contentEval(function() {
  //                      movies     serials
  var title_regexp = /.*?([12]\d\d\d|S\d\dE\d\d)/i 

  function guess_title(title) { 
    var guessed = title_regexp.exec(title)
    return guessed ? guessed[0] : title 
  }

  function fix_odd_even() {
    var odd = true
    var count = 0
    var was_odd = false

    $('#torrents tr').each(function () {
      var tr = $(this)
      if (tr.hasClass('squeezer')) {
        count = parseInt(tr.attr('data-count')) + 1
        was_odd = odd
      }
      tr.removeClass('odd even').addClass(odd ? 'odd' : 'even')
      odd = --count == 0 ? !was_odd : !odd
    })
  }

  $(document).ready(function() {
    var elements = $('#torrents tr')

    elements.each(function() {
      var tr = $(this)
      this.guessed_title = guess_title(tr.find('.title a').text())
      this.guessed_title_lowercase = this.guessed_title.toLowerCase()
      this.seeds = parseInt(tr.find('.seeders').text())
      this.peers = parseInt(tr.find('.leechers').text())
    })

    for (var x = 0; x < elements.length; ++x) {
      var el = elements[x]
      if (el.processed) 
        continue

      var found_elements = ['#' + $(el).attr('id')]
      var peers = el.peers
      var seeds = el.seeds

      for (var y = elements.length - 1; y > x; y--) {
        var other = elements[y]
        if (!other.processed && el.guessed_title_lowercase == other.guessed_title_lowercase) {
          $(el).after(other);
          other.processed = true
          peers = Math.max(other.peers, peers)
          seeds = Math.max(other.seeds, seeds)
          found_elements.push('#' + $(other).attr('id'))
        }
      }
      if (found_elements.length > 1) {
        var row = '<tr class="squeezer" data-count="' + found_elements.length + '">' 
          + '<td class="category" style="font-size: 20px; line-height: 44px">' 
          + found_elements.length + '</td>' 
          + '<td class="name"><span class="title"><a href="javascript:">' 
          + el.guessed_title + '</a></span></td>'
          + '<td class="quickdownload"></td><td></td><td></td><td></td>' 
          + '<td class="seeders">' + seeds + '</td>' 
          + '<td class="leechers">' + peers + '</td><td></td></tr>'

        var new_row = $(el).before(row).prev()
        var ids = $(found_elements.join(','))

        ids.hide()

        if (ids.find('.newicon').length > 0) 
          new_row.find('.name').append('<span class="newicon"> (NEW)</span>')

        new_row.data('ids', ids)
        new_row.data('show', false)

        ids.find('.title a').each(function () {
          this.innerHTML = this.innerHTML.substr(el.guessed_title.length)
        })

        ids.find('.category img').css({position: 'relative', left: '50px' })
        ids.find('td.name').prepend('<div style="float: left; width: 55px; height: 20px"></div>')

        new_row.click(function () {
          var show = $(this).data('show')
          var ids  = $(this).data('ids')
          show ? $(ids).hide() : $(ids).show()
          $(this).data('show', !show)
        })

        fix_odd_even()
      }
    }
  })
})
