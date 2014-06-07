// ==UserScript==
// @name        Show authors on scripts page
// @namespace   rAthur's space
// @description Simply ad a "Author" column in the "Scripts" page's table, and show the average stars score of the authors. 
// @downloadURL https://userscripts.org/scripts/source/162803.user.js
// @updateURL   https://userscripts.org/scripts/source/162803.meta.js
// @include     http*://*userscripts.org/scripts*
// @exclude     http*://*userscripts.org/scripts/discuss*
// @version     1.3
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js
// @grant       GM_xmlhttpRequest
// ==/UserScript==
$('.la:eq(0)').after('<th class="la" width="1%">Author</th>');
$('.script-meat').each(function()
{
	var obj = $(this);
	obj.after('<td class="inv lp">Loading...</td>');
	var scriptURL = obj.find('.title').attr('href');
	GM_xmlhttpRequest(
	{
		method: 'GET',
		url: scriptURL,
		onload: function(data)
		{
			if (data.responseText)
			{
				if ($(data.responseText).find('.author').text()=='By deleted user')
				{
					var authorName = 'Deleted&nbsp;user';
					obj.next().html(authorName);
				}
				else
				{
					var authorObj = $(data.responseText).find('.author').find('a');
					var authorName = authorObj.text();
					var authorURL = authorObj.attr('href');
					var authorID = authorObj.attr('user_id');
					var version;
					$(data.responseText).find('.script_summary').each(function()
					{
						if ($(this).find('p:eq(0) b:eq(0)').text()=='Version:')
							version = $(this).find('p:eq(0)').html().split('</b>')[1].replace(/\n/g,'').replace(/ /g,'');
					});
					if (typeof(version)!='undefined')
						obj.find('a:eq(0)').after(' <span style="color: #666;">v'+version+'</span>');
					obj.next().html('<a href="'+authorURL+'">'+authorName+'</a>');
					GM_xmlhttpRequest(
					{
						method: 'GET',
						url: 'http://userscripts.org/users/'+authorID+'/scripts',
						onload: function(data)
						{
							if (data.responseText)
							{
								var nbReviews = 0;
								var totalReviews = 0;
								var nbReviewed = 0;
								$(data.responseText).find('.script-meat').each(function()
								{
									var reviewObj = $(this).next();
									if (reviewObj.find('.rating').size()>0)
									{
										nbReviewed++;
										reviewCount = reviewObj.find('a:eq(0)').text().split(' ')[0]*1;
										reviewStars = reviewObj.find('.number').text()*1;
										reviewTotal = reviewStars*reviewCount;
										nbReviews += reviewCount;
										totalReviews += reviewTotal;
									}
								});
								if (nbReviews>0)
								{
									var averageReview = totalReviews/nbReviews;
									obj.next().prepend('<span class="rating" title="Average scrore for '+authorName.replace(/"/g,'&quote')+' is '+(Math.round(averageReview*10)/10)+' stars based on '+nbReviews+' review'+((nbReviews>1)?'s':'')+' on '+nbReviewed+' reviewed script'+((nbReviewed>1)?'s':'')+'"><span class="stars" style="width: '+Math.round((averageReview)*60/5)+'px;"></span></span>');
								}
							}
						}
					});
				}
			}
		}
	});
});