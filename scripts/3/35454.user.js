// ==UserScript==
// @name           Hatena Bookmark on Bookmark Comment
// @namespace      http://www.henshi.net/k/
// @description    display bookmark links beside comments on Hatena Bookmark
// @include        http://b.hatena.ne.jp/*
// ==/UserScript==

(function(){
    function users_img_uri(uri){
	return 'http://b.hatena.ne.jp/entry/image/' + uri.replace(/#/,'%23')
    }
    function bookmark_uri(uri){
	return 'http://b.hatena.ne.jp/entry/' + uri.replace(/#/,'%23')
    }
    function users_image(uri){
	var img = document.createElement('img')
	img.src = users_img_uri(uri)
	var anchor = document.createElement('a')
	anchor.href = bookmark_uri(uri)
	anchor.appendChild(img)
	return anchor
    }
    function bookmark_image(uri){
	var img = document.createElement('img')
	var img_uri = 'http://d.hatena.ne.jp/images/b_entry.gif'
	img.src = img_uri

	var anchor = document.createElement('a')
	anchor.href = bookmark_uri(uri)
	anchor.appendChild(img)
	return anchor
    }
    function add_image(node){
	var comment_uri =
	    node.getElementsByClassName("username")[0].href
	node.appendChild(bookmark_image(comment_uri))
	node.appendChild(users_image(comment_uri))

    }

    if(location.toString().match(/b.hatena.ne.jp\/entry/)){
        var users = document.getElementById("bookmarked_user")
	if(users){
	    var elems = users.childNodes
	    for(var i in elems){
		var node = elems[i]
		var id = node.id
		if(id && id.match(/bookmark-user-/)){
		    add_image(node)
		}
	    }
	}
    }
    else if(location.toString().match(/b.hatena.ne.jp\/(.*?)\//)){
	var username = RegExp.$1
	var mines = document.getElementsByClassName("mine")
	for(var i in mines){
	    var node = mines[i]
	    add_image(node)
	}
	var others = document.getElementsByClassName("others")
	for(var i in others){
	    var node = others[i]
	    add_image(node)
	}
    }
})();