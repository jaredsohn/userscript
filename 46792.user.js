// ==UserScript==

// @name          NF Forums Ignore

// @description   This will ignore certain user's posts on the NavyField forums

// @include       http://www.navyfield.com/board/view.asp*

// @include       http://navyfield.com/board/view.asp*

// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js

// ==/UserScript==



var ignoredUsers = GM_getValue("ignoredUsers", "").split(',');

if (ignoredUsers[0] == "")

	ignoredUsers = Array();  //spliting an empty string doesnt return an empty array





function removePosts()

{

	var users = document.getElementsByTagName('span');

	var postsToRemove = new Array();

	

	//convert ignored user list to keyed array, for searching

	function oc(a)

	{

		var o = {};

		for(var i=0;i<a.length;i++)

		{

			o[a[i]]='';

		}

		return o;

	}

	usersToIgnore = oc(ignoredUsers);







	function findBadPost(users)

	{

		var posts = document.getElementsByTagName('span');

		for (var i=0; i<posts.length; i++)

		{

			if (posts[i].innerHTML in users)

			{

				return posts[i];

			}

		}

	}



	//find posts to ignore

	while (true)

	{

		var post = findBadPost(usersToIgnore);

		if (post)

		{

			if (post.parentNode.tagName == "A")

			{

				post = post.parentNode;

			}



			for (var j=0;j<6;j++) {post = post.parentNode; }

			post.parentNode.removeChild(post);

		} else

		{

			break;

		}

	}

}



removePosts();





function ignore(user)

{

	return function() { 

		if (confirm("Are you sure you want to ignore "+user+"?"))

		{

			ignoredUsers.push(user);

			GM_setValue("ignoredUsers", ignoredUsers.join(','));

			removePosts();

			createIgnoredUserList();

		}

	};

}





function createIgnoredUserList()

{

	$("#ignoredsection").remove();



	var content = '<div id=ignoredsection><p align=center>Ignored Users:';



	if (ignoredUsers.length > 0)

	{

		content += "<ul id=userlist>";

		for each (var user in ignoredUsers)

		{

			content += "<li><a href='javascript:void(0)'>"+user+"</a></li>"

		}

		content += "</ul>";

	} else

	{

		content += "<p align=center>None yet.  Not even <a id=bore href='javascript:void(0)'>Bore</a>?</p>";

	}

	content+= "</div>";



	$("td[background='/images/im_93.gif']").append(content);

	$("#userlist").find("a").click(function(event) {

		var user = event.target.innerHTML;

		var i = ignoredUsers.indexOf(user);

		if (i == -1)

			return;

	

		if (confirm("Are you sure you want to stop ignoring "+user+"?"))

		{

			ignoredUsers.splice(i, 1);

			GM_setValue("ignoredUsers", ignoredUsers.join(','));

		

			//TOTO: refresh page

			history.go(0);

		}

	});
	
	$("#bore").click(ignore("BoRe"));

}



createIgnoredUserList();



//add ignore links to user names

var users = document.getElementsByTagName('span');





for (var i=0; i<users.length; i++)

{



	var ignoreLink = document.createElement('a');

	ignoreLink.setAttribute('href', "javascript:void(0)");

	ignoreLink.innerHTML = 'ignore';

	ignoreLink.addEventListener("click", ignore(users[i].innerHTML), true);

	

	var br = document.createElement('br');

	

	var insertPoint = users[i];

	if (insertPoint.parentNode.tagName == "A")

	{

		insertPoint = insertPoint.parentNode;

	}

	

	insertPoint.parentNode.insertBefore(br, insertPoint.nextSibling);

	br.parentNode.insertBefore(ignoreLink, br.nextSibling);

}








