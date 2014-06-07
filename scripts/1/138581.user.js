
// ==UserScript==
// @name           MyAnimeList Improver
// @namespace      hupotronic
// @version        1.0.1
// @description    Improves fansub group rankings on MAL.
// @include        http://myanimelist.net/fansub-groups.php*
// @include        http://myanimelist.net/anime.php*
// @include        http://myanimelist.net/anime/*
// ==/UserScript==

var currentPage;

var getCurrentPage = function()
{
	"use strict";
	
	var pageUrl = document.URL;
	if(pageUrl.match('fansub-groups.php'))
	{
		currentPage = 'group';
	} else
	if(pageUrl.match('anime.php') || pageUrl.match('\/anime\/'))
	{
		currentPage = 'anime';
	}
};

var parseGroups = function()
{
	"use strict";
	
	var ranks, rank,
		votes, voteText,
		comments, commentsCount, commentsCurrent,
		i, j;
		
	if(currentPage === 'group')
	{
		
		var totalvotes;
		
		totalvotes = document.querySelectorAll('div[class="spaceit_pad"]');
		
		totalvotes[1].style.display = 'none';
		totalvotes[1].parentNode.removeChild(totalvotes[1].nextSibling);
		
		ranks = document.querySelectorAll('div[style="border-width: 0; margin: 12px 0 0 0;"]');
		
		for ( i = 0; i < ranks.length; i++ )
		{
			
			var buttons;

			rank = ranks[i];
			
			buttons = rank.querySelectorAll('a');
			buttons[3].parentNode.removeChild(buttons[3]);
			
			if(rank.childNodes[4].childNodes[5])
			{
				votes = rank.childNodes[4].childNodes[5];
			} else {
				votes = null;
			}
			
			if(votes)
			{
				
				var commentsRegex;
				
				commentsCount = 0;
				commentsRegex = /[0-9]+ comments?/;
				
				voteText = votes.innerHTML;
				
				if(rank.childNodes[5])
				{
					comments = rank.childNodes[5].childNodes;
				}
				
				if(comments)
				{
					
					for ( j = 0; j < comments.length; j++ )
					{
						
						commentsCurrent = comments[j];
						
						if(commentsCurrent.getAttribute('style') === 'background-color: #f7e0e0;')
						{
							commentsCurrent.style.display = 'none';
						} else {
							
							commentsCount++;
							
							if(commentsCount % 2 === 0)
							{
								commentsCurrent.className = 'bgColor2 spaceit';
							} else {
								commentsCurrent.className = 'bgColor1 spaceit';
							}
							
						}
						
					}
					
				}
				
				if(commentsCount > 1)
				{
					voteText = voteText.replace(commentsRegex,commentsCount + ' comments');
					voteText = voteText.replace(/of [0-9]+ users approve/,'users approve');
				} else
				if(commentsCount === 1)
				{
					voteText = voteText.replace(commentsRegex,'1 comment');
					voteText = voteText.replace(/of [0-9]+ users approve/,'users approve');
				} else
				if(commentsCount === 0)
				{
					voteText = voteText.replace(commentsRegex,'');
					voteText = voteText.replace(/of [0-9]+ users approve, /,'users approve');
					if(rank.childNodes[5])
					{
						rank.removeChild(rank.childNodes[5]);
					}
				}
				votes.innerHTML = voteText;
				
			}
			
		}
		
	} else
	if(currentPage === 'anime')
	{
		
		var votingInfo, fansubGroups;
		
		votingInfo = document.querySelector('div[style="margin-bottom: 6px;"]');
		votingInfo.innerHTML = 'Which fansubbers do you like the best? Click + to approve of their subs for this show.';
		
		fansubGroups = document.querySelector('div[style="padding-left: 10px;"]');
		ranks = fansubGroups.querySelectorAll('div.spaceit_pad');
		
		for ( i = 0; i < ranks.length; i++ )
		{
			
			rank = ranks[i];
			
			if(!rank.id)
			{
				
				rank.removeChild(rank.childNodes[5]);
				
				votes = rank.querySelector('a.lightLink');
				
				if(votes)
				{
					
					voteText = votes.innerHTML;
					voteText = voteText.replace(/of [0-9]+ users approve/,'users approve');
					if(voteText.match(/[^0-9]+0 users approve/))
					{
						voteText = voteText.replace('0 users approve','');
					}
					votes.innerHTML = voteText;
					
					comments = ranks[i+1].childNodes;
					commentsCount = 0;
					
					for ( j = 0; j < comments.length; j++ )
					{
						
						commentsCurrent = comments[j];
						
						if(commentsCurrent.getAttribute('style') === 'background-color: #f7e0e0;')
						{
							commentsCurrent.style.display = 'none';
						} else {
							
							commentsCount++;
							
							if(commentsCount % 2 === 0)
							{
								commentsCurrent.className = 'bgColor2 spaceit';
							} else {
								commentsCurrent.className = 'bgColor1 spaceit';
							}
							
						}
					
					}
					
					if(commentsCount === 0 && comments.length > 0)
					{
						var emptyComment = document.createElement('div');
						emptyComment.className = 'bgColor1 spaceit';
						emptyComment.innerHTML = 'No comments available.';
						comments[0].parentNode.insertBefore(emptyComment,comments[0]);
					}
					
				}
				
			}
			
		}
		
	}

};

getCurrentPage();
parseGroups();