// ==UserScript==
// @name      		What.cd Find Pictures
// @version			1.06
// @namespace    	http://userscripts.org
// @description  	Find Pictures by clicking on a link in people's profiles
// @include      	*//what.cd/user.php?id=*
// @include      	*//*.what.cd/user.php?id=*
// @encoding		UTF-8
// @grant			none
// ==/UserScript==


var newLink = document.createElement('a');
newLink.href = '#'
newLink.innerHTML = 'Find Pictures';
newLink.className = 'find_user_pics';
var linkbox = document.querySelector('div.thin div.linkbox');
linkbox.appendChild(document.createTextNode(' ['));
linkbox.appendChild(newLink);
linkbox.appendChild(document.createTextNode(']'));
		var userName = document.querySelector('div.thin h2 a[href^="user.php?id="]').textContent;
		var userName_URL = '/forums.php?action=search&threadid=126&search=[img]&user='+userName;
		var userpic_container_style = '.user_pictures_container img { max-width: 150px;max-height: 200px;   }  .user_pictures_container .error{ color:red;font-size:12pt;}';
		$('#profilediv').prepend('<div class="user_pictures_container"><style>'+userpic_container_style+'</style><div class="user_pictures"></div></div>')
		var userpic_container = $('.user_pictures');

$('.find_user_pics').click(function() {
	var usersearch_result = '';
	$.ajax({ 
			type: 'GET',
			url: userName_URL,
			async: true,
			cache: true,
			contentType: 'text/json; charset=utf-8',
			dataType: 'html',
			crossDomain: true,
			error: function(xhr, textStatus, errorThrown){	
				console.log(textStatus+'\n'+url);
			},
			success: function(data, textStatus){ 
				usersearch_result = data;
				userpic_container.empty();
				var count_pics = 0;
				$('tr[id^="post_"] td > img.scale_image', $(usersearch_result)).each(function(){
					count_pics++
					var imgurl = $(this).attr('src');
					var postid = $(this).parent().parent().attr('id').match(/[0-9]{1,}/)
					if(typeof imgurl !== 'undefined'){
						userpic_container.append('<a href="/forums.php?action=viewthread&threadid=126&postid='+postid+'#post'+postid+'"><img src="'+imgurl+'"></a>')
					};
				});
				if(count_pics === 0){
					userpic_container.append('<span class="error">Sorry, no pics found. <a href="'+userName_URL+'">Full search results</a>.</span>')
				}
			}
		});	
		return false;
});



