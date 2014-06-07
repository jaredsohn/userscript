// ==UserScript==
// @name        Добавляем в друзья
// @namespace   to_friends
// @include     http://vk.com/topic-25812247_28293871*
// @include     http://vk.com/*
// @version     1
// ==/UserScript==
try{
(function(){
	var timer = 0
	var count = 0
	var links = {}
	var list_timer = 5000
	var add_timer = 5000
	var friends_timer = 1000
	var offset = 0
	var topic_offset = "/topic-25812247_28293871?offset="
	var frends_list = "/friends"
	var my_profile = document.getElementById("myprofile").href
	var intervalID 
	var maxY
	
	function get_offset(text){
		var result = /offset=([0-9]+)/.exec(text)
		return 0+result[1]
	}
	
	function check_friends(){
		if (maxY == window.scrollMaxY){
			clearInterval(intervalID)
			
			var friends = document.getElementsByClassName("friends_field")
			links[my_profile] = true;
			for (friend of friends){
				var link = friend.getElementsByTagName("a")[0]
				if (link)
					links[link.href] = true;
			}
			console.log("check_topic ")
			intervalID = setInterval(check_topic, list_timer)
			unsafeWindow.nav.go(topic_offset+offset);
		}else{
			console.log("maxY "+maxY)
			maxY = unsafeWindow.scrollMaxY
			unsafeWindow.scrollTo(0, maxY)
		}
	}
	
	function find_and_click(elements, data){
		for (element of elements){
			if(element.onclick && element.onclick.toString().indexOf(data)>=0){
				element.onclick()
			}
		}
	}
	
	function add_msg(){
		var msg_box = document.getElementsByClassName("ba_text")
		msg_box.value="дoбавляйтесь с пoметкой небесa"
		find_and_click(  document.getElementsByTagName("button")
					  ,  "Board.sendPost()")
	}
	
	function check_topic(){
		var onlines = document.getElementsByClassName("bp_online")

		for (online of onlines){
			var author = online.parentNode.parentNode.getElementsByClassName("bp_author")[0]
			var url = author.href
			if (!links[url]){
				(function(url, timer){
					setTimeout(function(){window.open(url, "nebesa")}, timer)
				})(author.href, (timer=timer+add_timer))
				links[url] = true
				count += 1
			}else if(url==my_profile){
				find_and_click (  online.parentNode.parentNode.getElementsByTagName("a")
								, "Board.deletePost"										)
			}
		}
		console.log("new friends count "+count)
		if (offset>= 20){
			offset-=20
			unsafeWindow.nav.go(topic_offset+offset);
		}else{
			clearInterval(intervalID)
			add_msg()
		}
		if (timer>= list_timer) 
			timer=timer-list_timer;
	}
	

	
	function add_friend(){
		find_and_click(	  document.getElementsByTagName("button")
						, "return Profile.toggleFriend"				)
	}
	
	if (document.location.href.indexOf(topic_offset) >= 0) {
		console.log("go to friends")
		window.name = "nebesa_friends?offset="+get_offset(document.location.href)
		unsafeWindow.nav.go(frends_list)
	}else if(window.name.indexOf("nebesa_friends") >= 0){
		offset = get_offset(window.name);
		intervalID = setInterval(check_friends, friends_timer);
	}else if(window.name == "nebesa") 
		add_friend();
})()
}catch(e){console.error(e)}