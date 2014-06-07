// ==UserScript==
// @name render_ranks
// @description render guokr.ranks page and make it provide more information
// ==/UserScript==
function render_ranks() {
    $('div.gmain ul.ranks li').each(function(ind ,el) {
        var group_id = parseInt($('a.group-head', el).attr('data-group_id'));
        render_group(group_id, el);
    });
    function render_group(group_id, el) {
        render_posts_count(group_id ,el); 
        render_digests_count(group_id, el);
        render_founder(group_id ,el);
    }
    function render_posts_count(group_id, el) {
        $.get('/apis/group/group/'+ group_id +'.json',
              {},
              render_span);
        function render_span(data) {
            $('span.rank-left', el).append('&nbsp;&nbsp;<span>'+ data.result.posts_count +'个帖子</span>');
        }
    }
    function render_digests_count(group_id, el) {
        $.get('/apis/group/post.json',
              {'retrieve_type': 'digest_post_by_group',
               'group_id': group_id,
               'limit': 1},
              render_span);
        function render_span(data) {
            $('span.rank-left', el).append('&nbsp;&nbsp;<a target="_blank" href="/group/'+ group_id +'/posts/digest/">'+ data.total +'个精华帖</a>');
        }
    }
    function render_founder(group_id, el) {
        $.get('/apis/group/member.json',
              {'retrieve_type': 'by_group',
               'group_id': group_id,
               'role': 'founder',
               'limit': 1},
              render_span);
        function render_span(data) {
            var user = data.result[0].user;
            $('span.rank-left', el).append('&nbsp;&nbsp;组长 <a target="_blank" href="'+ user.url +'"><img src="'+ user.avatar.small +'"/>'+ user.nickname +'</a>');
        }
    }
};

render_ranks();
