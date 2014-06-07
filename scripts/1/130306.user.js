// ==UserScript==
// @name         Snappypancake
// @namespace    http://userscripts.org/users/4344
// @match        http://www.happypancake.com/*
// @author       johan.hahn@gmail.com
// @versiion     1.0
// @description  Gör happypancake.com lite trevligare att använda; ingen reklam, större bilder, mindre klickande
// ==/UserScript==

(function(){
  function main() {
    // remove ads
    $('span:contains("Annons")').hide().next('iframe').hide()
    
    // make mouseover images popup in the middle
    $main = $('td.main-column')
    var h = $main.height(), w = $main.width(), t = $main.offset().top, l = $main.offset().left
    $div = $('<div id="popupDiv"><div><div class="background"/><div class="info"/></div></div>').hide()
    $div.css({position:'absolute', 'text-align':'center', top:t, left:l, height:h, width:w}).appendTo('body')
    $div.find('.background').css({position:'absolute', 'background-color':'gray', height:h, width:w, opacity:0.9})
    $info = $div.find('.info').css({position:'relative'})
    $('.right-column ul').each(function() {
      var html = $(this).html().replace(/Small/g, 'Large')
      html = html.replace(/onmouseover=".*? src=&quot;(.*?)&quot; .*?"/g, 'profilePicture="$1"')
      html = html.replace(/onmouseout=".*?"/g, '')
      $(this).html(html)})
    .mouseleave(function() { $div.hide() })
    $('.right-column a[profilePicture]').hover(function() {
      $a = $(this)
      $info.stop().empty().css({opacity:1}).show()
      $div.show()
      $('<img/>').attr('src', $a.attr('profilePicture')).appendTo($info)
      $('<p/>').text($.trim($a.text())).appendTo($info)
    }, function() {
      $info.fadeOut()
    })

    // append photos and facts after presentation (by sending ajax request for those tabs)
    if ($('.presentation-text').size() > 0) {
      var tab2selector = {ctl00$MainContent$lnkPhotoAlbum:'.photo-holder:has(.photo)', ctl00$MainContent$lnkFacts:'.tab-content'}
      $.each(tab2selector, function(tab, selector){
        $('#__EVENTTARGET').val(tab)
        $.post('', $('form').serialize(), function(data){
          $(data).find(selector).appendTo('div.tab-content')
        })
      })
    }
  }

  // call main() from a context where jQuery is loaded
  var script = document.createElement("script")
  script.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/1.7/jquery.min.js")
  script.addEventListener('load', function() {
    var script = document.createElement("script")
    script.textContent = "(" + main.toString() + ")();"
    document.body.appendChild(script)
  }, false)
  document.body.appendChild(script)
})();