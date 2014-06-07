// ==UserScript==
// @name        Tieba-Ignore
// @description 隐藏帖吧主题或者主题作者
// @include     http://tieba.baidu.com/f?kw=*
// @require     http://code.jquery.com/jquery-latest.js
// @grant       GM_setValue
// @grant       GM_getValue
// @namespace   https://github.com/leoleozhu
// @version     0.1.0
// ==/UserScript==


function isInArray(array, search){
    return (array.indexOf(search) >= 0) ? true : false; 
}

IGNORED_TOPICS = 'ignored_topics'
ignored_topics_str = GM_getValue(IGNORED_TOPICS, '[]')
ignored_topics = $.parseJSON(ignored_topics_str)

function addIgnoredTopic(topic_id) {
    if (!isInArray(ignored_topics, topic_id)) {
    	ignored_topics.push(topic_id)
    	GM_setValue(IGNORED_TOPICS, JSON.stringify(ignored_topics))
		console.log(topic_id + ' 已经隐藏')
    }
}

IGNORED_AUTHORS = 'ignored_authors'
ignored_authors_str = GM_getValue(IGNORED_AUTHORS, '[]')
ignored_authors = $.parseJSON(ignored_authors_str)

function addIgnoredAuthor(author) {
    if (!isInArray(ignored_authors, author)) {
    	ignored_authors.push(author)
    	GM_setValue(IGNORED_AUTHORS, JSON.stringify(ignored_authors))
		console.log(author + ' 已经隐藏')
    }
}


$(function() {
    $('li.j_thread_list').each(function() {
        var item = $(this);
        var data = $.parseJSON(item.attr('data-field'))
        var topic_id = data.id
        var author = data.author_name

        // if this topic is already blocked
        if (isInArray(ignored_topics, topic_id)) {
            console.log(topic_id + ' 被隐藏')
            item.hide()
            return
        }
        
        // if this author is already blocked
        if (isInArray(ignored_authors, author)) {
            console.log(topic_id + ' 被隐藏，发帖者被屏蔽')
            item.hide()
            return
        }
        
        // add ignore topic button
        var ignore_topic = $('<a href="#" style="float:right">屏蔽主题</a>')
        ignore_topic.click(function() {
            addIgnoredTopic(topic_id)
            item.hide()
            return false
        })
        item.append(ignore_topic)
        
        // add ignore user button
        var ignore_author = $('<a href="#" style="float:right">屏蔽用户</a>')
        ignore_author.click(function() {
            addIgnoredAuthor(author)
            item.hide()
            return false
        })
        item.append(ignore_author)
        
    })
})