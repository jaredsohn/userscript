// ==UserScript==
// @name       Block specific user's status
// @namespace  http://daix.me
// @version    0.1
// @description  Block specific users' status(including repost)
// @match      http://www.douban.com/*
// @copyright  2014+, Simon
// ==/UserScript==
Do(function() {
    // block
    var block_list = JSON.parse(localStorage.getItem('monkeyscript_block_list')) || []
      , r_block = new RegExp(block_list.join('|'))
    $('.usr-pic img').each(function(i, img) {
        if (!block_list.length) return false
        if (img.src.match(r_block)) {
        	$(img).closest('.status-item').hide()
        }
    })
    
    // add to block list
    var $list = $('.more-opt .user-group-list')
    if (!$list.length) return
	var matches = $('#profile img').attr('src').match(/ul(\d+)/),
   		id
    if (!matches || matches.length < 2) return
	id = matches[1]
    if (block_list.filter(function(num) {return num == id}).length) { // already blocked
        $list.prepend('<li><a href="javascript:;" class="cancel-block">取消屏蔽</a></li>')
    } else {
        $list.prepend($('<li><a href="javascript:;" class="block-status">屏蔽信息</a></li>'))
    }
    $list.delegate('.cancel-block', 'click', function() {
        block_list = block_list.filter(function(num) { return id != num})
        localStorage.setItem('monkeyscript_block_list', JSON.stringify(block_list))
        $list.hide()
        $(this).removeClass('cancel-block').addClass('block-status').text('屏蔽信息')
    }).delegate('.block-status', 'click', function() {
		block_list.push(parseInt(id, 10))
        localStorage.setItem('monkeyscript_block_list', JSON.stringify(block_list))
        $list.hide()
        $(this).removeClass('block-status').addClass('cancel-block').text('取消屏蔽')
    })
})
