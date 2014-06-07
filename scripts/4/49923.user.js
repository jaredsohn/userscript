// ==UserScript==
// @name           Twitter Pager
// @description    Replaces Ajax "more" loader with ol’ plain links.
// @namespace      twitter.pager
// @include        http://twitter.com/*
// @include        https://twitter.com/*
// ==/UserScript==

(function() {
  
  if (document.querySelector && document.querySelectorAll) {

    /**
     * Configuration
     */
    conf = {
      content_id: 'content',
      pagination_id: 'pagination',
      sidebar_id: 'side',
      section_query: '.wrapper > .section',
      button_classes: 'round more',
      in_page_link: 'in-page-link',
      in_page_list_link: 'in-page-list-link'
    };

    /**
     * Utilities
     */

    var hasClass = function(element, classNames) {
      var classes = element.className.split(' ');
      var r = false;
      for (var i = classes.length - 1; i >= 0; i--){
        for (var j = classNames.length - 1; j >= 0; j--){
          if (classes[i] == classNames[j]) {
            r = true;
            break;
          }
        };
      };
      return r;
    };
    
    var hasId = function(element, ids) {
      var r = false;
      for (var i = ids.length - 1; i >= 0; i--){
        if (element.id == ids[i]) {
          r = true;
          break;
        }
      };
      return r;
    };

    /**
     * Function replacing default Ajax pagination with plain HTML links
     */
     
    var replacePagination = function() {
      var pagination = document.getElementById(conf.pagination_id);
      if (pagination) {

        var links = pagination.getElementsByTagName('a');
        if (links.length) {
          
          var more = links[0],
              href = more.href.split('?'),
              params = href[1].split('&'),
              next_page = 2,
              user = '';

          for (var i=0; i < params.length; i++) {
            var param = params[i].split('=');
            switch (param[0]) {
              case 'page': {
                next_page = parseInt(param[1]);
                break;
              }
              case 'user': {
                user = param[1];
                break;
              }
            }
          }
          
          var url = href[0];
          // workaround for incomplete URL in favorites
          if ((url.indexOf('twitter.com/favorites') > -1) && (user != '')) {
            url = url.replace('/favorites', '/' + user + '/favorites');
          }
          
          // workaround for my favorites URL
          if (url.indexOf('twitter.com/timeline/') > -1) {
            url = url.replace('/timeline/', '/');
          }
          
          var createButton = function(url, page_index, caption, position) {
            var button = document.createElement('a');
            var label = document.createTextNode(caption);
            button.className = conf.button_classes;
            button.style.cssText = 'margin-bottom: 2em; width: auto; padding: 6px 10px; float: ' + position;
            button.href = url + '?page=' + page_index; 
            button.appendChild(label);
            pagination.appendChild(button);
          };

          pagination.innerHTML = '';

          if (next_page > 2) {
            createButton(url, next_page - 2, 'previous page', 'left');
          }

          createButton(url, next_page, 'next page', 'right');  

        }
      }
    };

    /**
     * Replace pagination on DOMContentReady (default exec spot for Greasemonkey/Greasekit)
     * Exclude Search, Followers/Following and List memberships
     */
    if (!hasId(document.body, ['search', 'followers', 'following', 'list_memberships'])) {
      replacePagination();
    }

    /**
     * Handle Ajax links
     */

    var performAjax = false;
    var counter = 0;
    var last_counter = 0;
    var called_once = false;
    
    var subtreeModified = function() {
      // console.log('DOMSubtreeModified #', counter, performAjax);
      counter++;
      setTimeout(function() {
        checkIfLast(counter);
      }, 10);
    };

    var checkIfLast = function(last_counter) {
      if (called_once) { return; } else { called_once = true; }
      if (counter == last_counter) {
        if (performAjax) {
          // console.log('replacing pagination on counter #', last_counter);
          section.removeEventListener('DOMSubtreeModified', subtreeModified, false);
          replacePagination();
          called_once = false;
          performAjax = false;
          section.addEventListener('DOMSubtreeModified', subtreeModified, false);
        }
      } else {
        last_counter = counter;
      }
    };

    var section = document.getElementById(conf.content_id).querySelector(conf.section_query);
    var links = document.getElementById(conf.sidebar_id).getElementsByTagName('a');
    for (var i = links.length - 1; i >= 0; i--){
      var link = links[i];
      if (hasClass(link, [conf.in_page_link, conf.in_page_list_link])) {
        link.addEventListener('click', function() {
          section.addEventListener('DOMSubtreeModified', subtreeModified, false);
          performAjax = true;
          counter = 0;
          last_counter = 0;
          called_once = false;
        }, false);
      }
    };

  }
  
})();