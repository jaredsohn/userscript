// ==UserScript==
// @name       Hide posts
// @namespace  http://www.kitsis.ca/
// @version    0.16
// @description  Allow to hide old, readed or not intresting posts from website posts list
// @grant      unsafeWindow
// @updateURL  http://userscripts.org/scripts/source/178487.meta.js
// @installURL http://userscripts.org/scripts/source/178487.user.js
// @include    http://habrahabr.ru/*
// @include    http://warnet.ws/*
// @include    http://ibigdan.com/*
// @include    http://avaxhome.cc/*
// @include    http://good-zona.ru/*
// @copyright  2013+, Lev Kitsis
// ==/UserScript==


var btn_hide = '<div class="btn_hide" style="float:right;"><b>&nbsp;&nbsp;HIDE</b></div>';

function fn_habrahabr_hide(id, $post) {
  return function() {
    if($post.find('.infopanel .favorite .add').length === 1) {
      hide_post(id, $post);
    } else {
      alert('Remove it from Favorites');
    }
  };
};

function check_habrahabr_posts() {
  $('.content_left .posts_list .post').each(function(key, post) {
    var $post = $(post);
    var id = ~~$post.attr('id').replace("post_","");
    if(jQuery.inArray( id, hidden_posts) >= 0) {
      $post.remove();
    } else if($post.find('.btn_hide').length === 0) {
      if($post.find('.infopanel .favorite .add').length === 1) {
      	$post.find('.title').append(btn_hide);
      }
      $post.find('.infopanel').append(btn_hide);
      $post.find('.btn_hide').click(fn_habrahabr_hide(id, $post));
    }
  });
}

function check_posts(posts_selector, post_id_selector, post_id_attr, post_id_replace, hide_holder_selector) {
  if(posts_selector && typeof $ === 'function') {
    $(posts_selector).each(function(key, post) {
	    var $post = $(post);
	    var $post_id = $post;
	    var id = 0;
        
	    if($post && post_id_selector) {
	      $post_id = $post.find(post_id_selector);
	    }
	    
	    if($post_id && $post_id.attr(post_id_attr)) {
	      id = ~~$post_id.attr(post_id_attr).replace(post_id_replace, "");
	    }
	    
	    if(id > 0) {
	      if(jQuery.inArray( id, hidden_posts) >= 0) {
	        $post.remove();
	      } else if($post.find('.btn_hide').length === 0) {
	        $post.find(hide_holder_selector).append(btn_hide).click(hide_posts(id, $post));
	      }
	    }
	  });
  }
}

function inArray(strData, arrFind) {
  for(var i in arrFind) {
    if(strData.indexOf(arrFind[i]) >= 0) {
      return true;
    }
  }
  return false;
}

function uniqueArray(arr) {
  arr.sort();
  return arr.filter(function(value, index, self) {
    return self.indexOf(value) === index;
  });  
}

function hide_post(id, $post) {
  if($post) {
    $post.remove();
  }
  var hidden_posts = JSON.parse( unsafeWindow.localStorage.getItem("hidden_posts") || '[]' ) ;
  hidden_posts.push(id);
  unsafeWindow.localStorage.setItem("hidden_posts", JSON.stringify(uniqueArray(hidden_posts)));
}

function hide_posts(id, $post) {
  return function(eventObject) {
    hide_post(id, $post);
    eventObject.stopImmediatePropagation();
    return false;
  }
}

function unhide_post(id) {
  var hidden_posts = JSON.parse( unsafeWindow.localStorage.getItem("hidden_posts") || '[]' ) ;
  var index = hidden_posts.indexOf(id);
  if(index >= 0) {
    hidden_posts.splice(index, 1);
    unsafeWindow.localStorage.setItem("hidden_posts", JSON.stringify(uniqueArray(hidden_posts)));
  }
}

function unhide_posts(id) {
  return function() {
    unhide(id);
  }
}

var url = location.href;

unsafeWindow.unhide_post = unhide_post;

var hidden_posts = JSON.parse( unsafeWindow.localStorage.getItem("hidden_posts") || '[]' ) ;

if(typeof $ === 'function') {
  if(inArray(url, ['habrahabr.ru'])) {
    check_habrahabr_posts();
  } else if(inArray(url, ['warnet.ws'])) {
    check_posts('.main-block', 'h3 span', 'id', 'fav_span_', '.post-vote-widget #post-rate');
  } else if(inArray(url, ['ibigdan.com'])) {
    check_posts('#container #main .post.type-post', null, 'id', 'post-', 'h3:first');
  } else if(inArray(url, ['avaxhome.cc'])) {
    check_posts('#main-info-container .news', null, 'id', 'news-', '.title h1:first');
  } else if(inArray(url, ['good-zona.ru'])) {
    check_posts('#allEntries div[id*="entryID"', null, 'id', 'entryID', 'div#filmblock div:last');
  }
} else if(console && console.log) {
  console.log('Hide posts: jQuery is not defined');
}
