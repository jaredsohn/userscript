// ==UserScript==

// @name		Englosorium
// @author		Vizzy
// @namespace	http://en.leprosorium.ru/
// @description At last, the Sovereign English Leprosorium can actually have an English interface
// @include		http://en.leprosorium.ru/*

// ==/UserScript==

//header
var myThings = document.getElementById('things').childNodes[0].childNodes[0].childNodes[0];
var favorites = document.getElementById('favorites').childNodes[0].childNodes[0].childNodes[0];
var fraud = document.getElementById('fraud-menu').childNodes[0].childNodes[0].childNodes[0];
var newPost = document.getElementById('private').getElementsByTagName('p')[0];
var people = document.getElementById('stat').getElementsByTagName('p')[0];
var search = document.getElementById('search_value');
var superSearch = document.getElementById('search').getElementsByTagName('p')[0].childNodes[0];

var textThings = myThings.innerHTML.split(' ');
myThings.innerHTML = 'my stuff ' + textThings[2];

favorites.innerHTML = 'favourites';
fraud.innerHTML = 'shop';
newPost.innerHTML = 'Everyone is <a href="/asylum/">waiting</a> for a new post!';

var numPeople = people.getElementsByTagName('a')[0].innerHTML.split(' ')[0];
people.innerHTML = '<nobr>There are</nobr> <a href="http://leprosorium.ru/users/" class="nobr blue">' + numPeople + ' of us</a> <nobr>at the moment</nobr>';

search.setAttribute('value', 'search');
superSearch.innerHTML = 'super search';

//body

//sidePanel
var government = document.getElementById('parlament').getElementsByTagName('a')[0];
var blogs = document.getElementById('domains_unread').getElementsByTagName('strong')[0].childNodes[0];

government.innerHTML = 'Government';
blogs.innerHTML = 'Imperial Blogs';

//posts
if ((/^http:\/\/en\.leprosorium\.ru(\/)?$/.test(document.URL)))
{	
	var posts = document.getElementsByClassName('p');
	var postData, postInfo, dateInfo;
	
	for (x in posts)
	{
		postInfo = posts[x].innerHTML;

		//translating general post info
		postData = postInfo.split('<a');
		postData[0] = 'Posted by ';
		postInfo = postData.join('<a');

		//translating date info
		dateInfo = postInfo.split('a>,');
		dateInfo[1] = dateInfo[1].replace(/ в /, ' at ');

		if (dateInfo[1].indexOf('сегодня') != -1)
		{
			dateInfo[1] = dateInfo[1].replace(/сегодня/, 'today');
			postInfo = dateInfo.join('a>');
		} 
		else if (dateInfo[1].indexOf('вчера') != -1)
		{
			dateInfo[1] = dateInfo[1].replace(/вчера/, 'yesterday');
			postInfo = dateInfo.join('a>');
		} 
		else
		{
			postInfo = dateInfo.join('a> on');
		}

		posts[x].innerHTML = postInfo;

		//translating comment info
		var commentInfo = posts[x].getElementsByTagName('span')[0].getElementsByTagName('a');

		postData = commentInfo[0].innerHTML.split(' ');

		if (postData[0] == 'комментировать')
		{
			postData[0] = 'comment on this';
		}
		else
		{
		postData[1] = 'comment' + checkNumber(postData[0]);	
		}

		commentInfo[0].innerHTML = postData.join(' ');

		try
		{
			postData = commentInfo[1].childNodes[0].innerHTML.split(' ');
			postData[1] = 'new one' + checkNumber(postData[0]);
			commentInfo[1].childNodes[0].innerHTML = postData.join(' ');
		}
		catch (err){}
		
		try
		{
			posts[x].innerHTML = posts[x].innerHTML.replace(/я - у руля!/, 'I rule!');
		}
		catch (err){}

	}
}

//comments
if ((/^http:\/\/en\.leprosorium\.ru\/comments\/\d+(\/)?$/.test(document.URL)))
{
	var comments = document.getElementsByClassName('p');
	var commentInfo, dateInfo, commentDate;

	//replace everything to do with general buttons
	var replyLink = document.getElementById('reply_link_default').getElementsByTagName('a')[0];
	replyLink.innerHTML = "I'd like to comment on this";
	
	var picLink = document.getElementById('reply_form_pic_show').getElementsByTagName('span')[0];
	picLink.innerHTML = 'It could be better with a picture';
	
	var picHideLink = document.getElementById('reply_form_pic_hide').getElementsByTagName('span')[0];
	picHideLink.innerHTML = "Actually, forget the picture";
	
	var commentsThresholdNum = document.getElementById('js-comments_trashhold_count');
	commentInfo = commentsThresholdNum.innerHTML.split(' ');
	commentInfo[1] = 'out of';
	commentInfo[3] = 'comments';
	commentsThresholdNum.innerHTML = commentInfo.join(' ');
	
	var commentsThresholdText = document.getElementsByName('comments_threshold')[0].getElementsByTagName('span')[0];
	commentsThresholdText.innerHTML = 'You are looking at comments';
	
	var commentsThresholdOpts = document.getElementById('post_status').getElementsByTagName('option');
	commentsThresholdOpts[0].innerHTML = 'from 5 and above';
	commentsThresholdOpts[1].innerHTML = 'from 0 and above';
	commentsThresholdOpts[2].innerHTML = 'from -5 and above';
	commentsThresholdOpts[3].innerHTML = 'from -25 and above';
	commentsThresholdOpts[4].innerHTML = 'with any rating';
	
	var showNew = document.getElementById('show_new');
	showNew.childNodes[0].innerHTML = 'new ones';
	
	//comment specific buttons
	for (x in comments)
	{	
		commentInfo = comments[x].innerHTML.split('&nbsp;</a>');
		
		dateInfo = commentInfo[1].split('<a');
		
		dateInfo[0] = 'Posted by ';
		commentInfo[1] = dateInfo.join('<a');
		
		dateInfo = commentInfo[1].split('</a>,');
		dateInfo[1] = dateInfo[1].replace(/ в /, ' at ');
		
		if (dateInfo[1].indexOf('сегодня') != -1)
		{
			dateInfo[1] = dateInfo[1].replace(/сегодня/, 'today');
			commentInfo[1] = dateInfo.join('</a>');
		} 
		else if (dateInfo[1].indexOf('вчера') != -1)
		{
			dateInfo[1] = dateInfo[1].replace(/вчера/, 'yesterday');
			commentInfo[1] = dateInfo.join('</a>');
		} 
		else
		{
			commentInfo[1] = dateInfo.join('</a> on ');
		}
		
		
		try
		{
			commentInfo[1].getElementsByClassName('show_link')[0].innerHTML = "what's written there?";
		} catch (err) {}
		
		comments[x].innerHTML = commentInfo.join('&nbsp;</a>');

		comments[x].innerHTML = comments[x].innerHTML.replace(/ответить/, 'reply');

		if (x == 0)
		{	
			comments[x].innerHTML = comments[x].innerHTML.replace(/обновить комментарии/, 'refresh comments');
			try
			{
				comments[x].innerHTML = comments[x].innerHTML.replace(/в избранное/, 'add to favourites');
				comments[x].innerHTML = comments[x].innerHTML.replace(/в мои вещи/, 'add to my stuff');
			}
			
			catch (err){}
		}
		
		try
		{
			comments[x].innerHTML = comments[x].innerHTML.replace(/я - у руля!/, 'I rule!');
		}
		catch (err){}	
	}

}

//this function returns endings of words. s for plural and nothing for singular
function checkNumber (number)
{
	return (number>1)? 's' : '';
}