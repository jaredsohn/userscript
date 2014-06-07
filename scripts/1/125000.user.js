// ==UserScript==
// @name           Tumblr Edit Tags
// @namespace      http://sidebr.tumblr.com/
// @description    Edit a post's tags directly from the dashboard
// @version        1.4
// @include        http://www.tumblr.com/dashboard*
// @include        http://www.tumblr.com/blog/*
// ==/UserScript==

/*

(C) 2012 Caleb Leung
Creative Commons Attribution-ShareAlike 3.0 Unported License (http://creativecommons.org/licenses/by-sa/3.0/)

History
-------

2012-02-26 - Hopefully fixed the special character parsing issue (testing says yes)
2012-02-24 - Fixed link positioning. (Tumblr added .corner_mask class to posts, breaking the position)
2012-02-20 - Fixed an incompat. with promotion posts. 
Hopefully if it doesn't see any mention of what kind of 'promotion,' it will use whatever value it had. 
Otherwise, it's going to remove the promotion. I'm not wasting a buck to test it out.
2012-02-06 - Gave functions unique names for backwards compatibility 
2012-02-05 - Created.

*/

function embedElement(element, toEmbed, exec)
{
	var tag = document.createElement(element);
	tag.textContent = toEmbed.toString();
	if (exec) tag.textContent = "(" + tag.textContent + ")();";
	document.body.appendChild(tag);
}

function newTagLinks(postID, tags)
{
	tag = tags.split(",");
	postTags = 'post_tags_' + postID;
	$(postTags).innerHTML = "";

	for (i = 0; i < tag.length; i++)
	{
		var addLabel = document.createElement('a');
			addLabel.setAttribute('href', '/tagged/' + tag[i]);
			addLabel.innerHTML = "#" + tag[i];
		$(postTags).appendChild(addLabel);
	}
}

function editTags(postID, tags)
{
	var editPost = '/edit/' + postID;

	new Ajax.Request(editPost, {
		onSuccess: function(response) {
			r = response.responseText;
			dataStart = r.indexOf('<form');
			dataEnd = r.indexOf('</form');

			html = r.substring(dataStart, dataEnd);

			var inputs = html.match(/<input[^>]*>/g);
			var textareas = html.match(/<textarea[^>]*>[^<]*<\/textarea>/g);
			var params = {};
			var name;


			for (i=0; i<inputs.length; i++) {
				name = inputs[i].match(/name="([^"]*)"/);
				if (name) {
					if (String(inputs[i].match(/value="([^"]*)"/)) == 'null')
						params[name[1]] = null;
					else {
						params[name[1]] = decodeContentTags(inputs[i].match(/value="([^"]*)"/)[1]).unescapeHTML();	
						}
			   }
			}
			for (i=0; i<textareas.length; i++) {
				name = textareas[i].match(/name="([^"]*)"/);		// Doesn't need a check b/c it should have <p></p> at the very least
				if (name && !(/id="custom_tweet"/.test(textareas[i]))) 
					params[name[1]] = decodeContentTags(textareas[i].replace(/<(?!\s*\/?\s*p\b)[^>]*>/gi, '')).unescapeHTML()
			}

			params["post[tags]"] = tags;
			delete params["post[promotion_type]"];
			delete params["preview_post"];


			new Ajax.Request(editPost, {

				method: 'post',
				parameters: params,
				onSuccess: function(transport) {
					newTagLinks(postID, tags);
					$('tagEdit-' + postID).innerHTML = "done!";
					$('tagEdit-' + postID).setAttribute('onClick', 'displayTags(' + postID + ')');
					setTimeout(function() {$('tagEdit-' + postID).innerHTML = "edit tags";},1500);
				},
				onFailure: function() {
					$('tagEdit-' + postID).innerHTML = "x_x";
					$('tagEdit-' + postID).setAttribute('title', 'Please reload!');

				},
			});






		}
	});

}

function displayTags(postID)
{
	existingTags = "";
	hasTags = true;

	/*if (String($('post_tags_' + postID)) != 'null')
	{
		for (i = 0; i < $('post_tags_' + postID).childElements().length; i++)
			existingTags += $('post_tags_' + postID).down(i).innerHTML.substr(1) + ",";
		existingTags = existingTags.slice(0, -1)
	}
	else
		hasTags = false;*/
	
	if (String($('post_tags_' + postID)) != 'null')
		for (i = 0; i < $('post_tags_' + postID).childElements().length; i++)
			existingTags += $('post_tags_' + postID).down(i).innerHTML.substr(1) + ",";
	existingTags = existingTags.slice(0, -1)
		
	tags = prompt("Tags", existingTags);
	
	if (tags != null)
	{
		$('tagEdit-' + postID).innerHTML = "working...";
		$('tagEdit-' + postID).removeAttribute('onClick');
		editTags(postID, tags);
	}
}	

function addTagEdit(postControl, postID)
{
	
	var addLabel = document.createElement('a');
		addLabel.setAttribute('id', 'tagEdit-' + postID);
		addLabel.setAttribute('style', 'cursor: pointer;');
		addLabel.setAttribute('onClick', 'displayTags(' + postID + ')');
		addLabel.innerHTML = 'edit tags';
	
	postControl.appendChild(addLabel); 
}	

function getPostsTags(startNum)
{
	//var allPosts = document.getElementById("posts").getElementsByTagName('li');
	var allPosts = $$('li.is_mine.:not(li.new_post)');
	
	for (var i = startNum; i < allPosts.length; i++)
	{
		postID = allPosts[i].getAttribute('id').substr(5);
		addTagEdit(allPosts[i].down().next(), postID);
	}
	
	return allPosts.length + startNum;
}

function mainTags()
{
	var startNum = 0;
	var pageLength = $$('li.is_mine.:not(li.new_post)').length;

	startNum = getPostsTags(startNum);


	Ajax.Responders.register({
		onLoaded: function() 
		{
		checkPage = setInterval(function() {
			
			//var newLength = document.getElementById('posts').getElementsByTagName('li').length;
			var newLength = $$('li.is_mine.:not(li.new_post)').length;
			
			if (pageLength < newLength)
			{
				getPostsTags(pageLength);
				pageLength = newLength;
			}
			window.clearInterval(checkPage);
			return;
		}, 5000);		
			
		},
	});

}

// via http://stackoverflow.com/a/6699665

function decodeContentTags(str) { 
    var div = document.createElement('div');
    div.innerHTML = str;
    return div.innerHTML;
}


embedElement("script", decodeContentTags, false);
embedElement("script", newTagLinks, false);
embedElement("script", displayTags, false);
embedElement("script", editTags, false);
embedElement("script", addTagEdit, false);
embedElement("script", getPostsTags, false);
embedElement("script", mainTags, true);