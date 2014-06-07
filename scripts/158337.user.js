// ==UserScript==
// @name           Github Star Note
// @description    star note of the repository on Github.
// @namespace      satoshi honda
// @include        https://github.com/stars*
// @include        https://github.com/*/*
// @author         satoshi honda <bin.honda@gmail.com>
// @namespace      http://userscripts.org/scripts/show/158337
// @version        0.0.2
// ==/UserScript==
(function (d, func) {
  var h = d.getElementsByTagName('head')[0];
  var s1 = d.createElement("script");
  s1.setAttribute("src", "https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js");
  s1.addEventListener('load', function() {
      var s2 = d.createElement("script");
      s2.textContent = "jQuery.noConflict();(" + func.toString() + ")(jQuery);";
      h.appendChild(s2);
  }, false);
  h.appendChild(s1);
})(document, function($) {

  var href = window.location.href;
  var pathname = window.location.pathname;

  var showStarNote = function() {
    $("div.search").prepend(
        '  <p>'
        + '  <input type="text" name="star_note_search" id="star-note-search" value="" class="filter_input" placeholder="Search starred notes.." autocapitalize="off" autocomplete="off" data-hotkey="/" tabindex="2" data-url="/stars/search">'
        + '</p>'
    );
    $("ul.repo_list li").each(function() {
      repo_full_name = $("a.js-navigation-open", this).text();
      if(localStorage.hasOwnProperty("github_star_note")) {
        var item = JSON.parse(localStorage.getItem("github_star_note"));
        if(item.hasOwnProperty(repo_full_name)) {
          $(this).append('<p class="description"><strong>' + item[repo_full_name] + '</strong></p>');
        }
      }
    });
    $("#star-note-search").keypress(function(e) {
      if (e.which == 13) {
        $(".repo_list").remove();
        showStarNoteSearch();
      }
    });
  }

  var editStarNote = function() {
    var repo_full_name = pathname.replace("/", "");
    $("a.unstarred").click(function() {
      if($("#star-note").length == 0) {
        $(".title-actions-bar").append(
           '<div style="text-align:right;" class="star-note">'
         +   '<input type="text" name="star_note" style="width:400px" value="" placeholder="Add a stars note to this repository"/>'
         +   '<span class="minibutton" id="star-note"><span class="js-select-button">Star Note</span></span>'
         + '</div>'
        );
      }
      $("span#star-note").click(function() {
        var item = {};
        if(localStorage.hasOwnProperty("github_star_note")) {
            item = JSON.parse(localStorage.getItem("github_star_note"));
        }
        item[repo_full_name] = $('input[name="star_note"]').val();
        localStorage.setItem("github_star_note", JSON.stringify(item));
        $(".star-note").remove();
      });
    });
    $("a.starred").click(function() {
        if(localStorage.hasOwnProperty("github_star_note")) {
            var item = JSON.parse(localStorage.getItem("github_star_note"));
            if(item.hasOwnProperty(repo_full_name)) {
              delete(item[repo_full_name]);
              localStorage.setItem("github_star_note", JSON.stringify(item));
            }
        }
    });
  }

  var showStarNoteSearch = function() {
    if(localStorage.hasOwnProperty("github_star_note")) {
      var item = JSON.parse(localStorage.getItem("github_star_note"));
      $.each(item, function(k, v) {
        var search_val = $('input[name="star_note_search"]').val();
        reg = new RegExp(search_val);
        if (v.match(reg)) {
          $("div.js-navigation-container").append(
              '<ul class="repo_list" id="js-repo-list">'
            + '  <li class="starred-repo public source js-navigation-item navigation-focus">'
            + '     <span class="mega-icon mega-icon-public-repo"></span>'
            + '    <h3><a href="/' + k + '" class="js-navigation-open">' + k + '</a></h3>'
            + '    <p class="description">' + v + '</p>'
            + '  </li>'
            + '</ul>'
            );
        }
      });
    }
  }

  var isStarsUrl = function() {
    return href.match(/stars/) ? true : false;
  }

  var isStarsSearch = function() {
    return href.match(/q=/) ? true : false;
  }

  $(document).ready(function(){
    if (isStarsUrl()) {
      showStarNote();
    } else {
      editStarNote();
    }
  });
});
