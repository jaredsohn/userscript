//
// ==UserScript==
// @name          Eugene's jsbeta
// @namespace     http://em92.site88.net/
// @description   No description for you :D
// @include       http://vk.com/topic-*
// ==/UserScript==
//

function export_topic()
{
	alert('start')
	
	// выдергиваем дивы с сообщениями
	var posts = document.getElementById("bt_rows").getElementsByClassName('bp_post');

	for (var i=0; i<posts.length; i++)
	{
		// работаем с каждым сообщением
		post = posts[i];
		
		// выдергиваем имя автора, ссылку на его страницу и само сообщение
		element_postAuthor = post.getElementsByClassName('bp_author')[0];
		postAuthorName = element_postAuthor.innerHTML;
		postAuthorLink = element_postAuthor.href;
		postMessage = encodeURIComponent(post.getElementsByClassName('bp_text')[0].innerHTML);
		topicAndPostID = post.id;
		
		
		// отправляем запрос
		GM_xmlhttpRequest({
			method: "POST",
			url: "http://localhost/pub-win/jsbeta/ineedyourbrain.php",
			headers: {'X-Requested-With': 'XMLHttpRequest', 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
			data: "topic_post_id=" + topicAndPostID + "&authorName=" + postAuthorName + "&authorLink=" + postAuthorLink + "&message=" + postMessage,
			synchronous: true
		});
		
		
	}
	
	alert('done');
}

var footer = document.getElementById("footer");
var newdiv = document.createElement('div');
newdiv.innerHTML = '<button id="my_button">DoIt!</button>';
footer.appendChild(newdiv);

document.getElementById("my_button").addEventListener("click", export_topic, false);

