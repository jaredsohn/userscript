// ==UserScript==
// @name       TumblrFollowingSort
// @namespace  http://comingsoon.doesntexist.yet
// @version    0.5.1
// @description          A simple script to gather and sort your followers and who you follow on their respective pages.
// @match                http://www.tumblr.com/following
// @match                http://www.tumblr.com/blog/*/followers
// @include	             http://www.tumblr.com/following
// @include		           http://www.tumblr.com/blog/*/followers
// @copyright  2012+, Bradley
// ==/UserScript==

var $ = unsafeWindow.jQuery;

$(function() {

  function sortByName(a, b) {
    return ($(a).find('.name a').text() < $(b).find('.name a').text()) ? -1 : 1;
  }

  var tfs = (function() {

    return {

      sortFollowing: function() {
        var $column = $('body').find('.left_column'),
          $following = $column.children().slice(1, -1),
          elementString = '';

        $following.sort(sortByName);

        $following.each(function (index, ele) {
          $column.children().last().before(ele);
        });
      },

			sortFollowers: function() {
				var $list = $('.left_column').find('.followers'),
          $followers = $list.children();

				$followers.sort(sortByName);

        /**
        * TODO: Figure out a better way to do this...
        **/

        var unique = [],
          duplicates = [];

        $followers.each(function(index, ele) {
          if ( $(ele).find('.name a').text() !== $(unique).last().find('.name a').text() ) {
            unique.push(ele);
          } else {
            duplicates.push(ele);
          }
        });

        $(duplicates).remove();
        $list.append($(unique));
			},

      getFollowing: function() {
        var numFollowing = $('.selected').html().match(/\d+/),
          $column = $('.left_column'),
          pages = Math.ceil(numFollowing/25) + 1,
          loaded = 0,
          i;

        for (i = 2; i <= pages; i++) {
          $.get('http://www.tumblr.com/following/page/' + i, function (data) {
            loaded++;
            var $followees = $(data).find('.left_column').children().slice(1, -1);

            $column.children().last().before($followees);

            if (loaded === pages - 1) {
              tfs.sortFollowing();
              FollowingList.init();
            }
          });
        }
      },

			getFollowers: function() {
				var $list = $('.followers').last(),
					blog = window.location.pathname.match(/\/blog\/([a-zA-Z0-9\-\_]*)\/followers/)[1],
					numFollowers = $('.title_and_controls').find('h1').html().match(/\d+/),
					pages = Math.ceil(numFollowers/40) + 1,
          loaded = 0,
          i;

				for (i = 2; i <= pages; i++) {
					$.get('http://www.tumblr.com/blog/' + blog + '/followers/page/' + i, function(data) {
            loaded++;
						var $followers = $(data).find('.followers').last().children();

						$list.append($followers);

            if (loaded === pages - 1) {
              tfs.sortFollowers();
              Tumblr.FollowPage.init();
            }
					});
				}
			}
    };
  })();

  window.tfs = tfs;

	if (window.location.pathname.match(/\/blog\/[a-zA-Z0-9\-\_]*\/followers/)) {
    $('.follow_button').unbind('click');
    $('.follower a.ignore').unbind('click');
		tfs.getFollowers();
	} else if (window.location.pathname.match(/\/following*/)) {
    $('.follow_button, .unfollow_button').unbind('click');
		tfs.getFollowing();
	}

});
