// ==UserScript==
// @id             EHbsCmtChgr
// @name           EventHubs Comment Changer
// @version        0.2
// @namespace      
// @author         
// @description    
// @include        *eventhubs.com/news*
// @run-at         document-end
// ==/UserScript==
 commentsNL=document.getElementsByClassName('comment_box');
 commentNumbers=document.getElementsByClassName('comment_link2');

function toggleComment(comment)
{
var i=0;
	commentParaNL=comment.parentNode.getElementsByClassName('hideable');
	if(commentParaNL.item(0).style.display=='none')
	{
		displayStyle='block';
		labelTxt='Hide';
	}
	else
	{
		displayStyle='none';
		labelTxt='Show';
	}
	comment.innerHTML=labelTxt;

	for(i=0;i<commentParaNL.length;i++)
	{
		commentParaNL.item(i).style.display=displayStyle;
	}
	
}
function getComment(commentNumber)
{
	var i=0;
	for(i=0;i<commentNumbers.length;i++)
	{		
	if(commentNumber==commentNumbers.item(i).innerHTML.replace("#",""))
		{	
			//alert(commentNumbers.item(i).parentNode.parentNode.parentNode.innerHTML);
			return(commentNumbers.item(i).parentNode.parentNode.parentNode);
		}
	}
	return null;
}
function updateCommentBox(quoted, replier)
{
	//if(commentsNL.item(quoted-1)!==null)
	quotedComment=getComment(quoted);		
	if(quotedComment!==null)
	{
		replier.innerHTML="<div class='quote_box' style='width:96%; margin:0 auto; border:1px solid #a9a9a9; position:relative;'><span class='hider' style='position:absolute; top:10px; right:10px; cursor:pointer'>Hide</span><div class='hideable'><div style='margin:10px'>"+quotedComment.innerHTML.replace('<br>','')+"</div></div></div><br/>"+replier.innerHTML+"</div>";
		quoteBoxEl=replier.getElementsByClassName('quote_box').item(0);
		commentheaderEl=document.createElement('div');
		commentheaderEl.setAttribute('class', 'comment_head');
		commentheaderEl.style.margin="10px 0 10px 10px";
		commentLink=replier.getElementsByClassName('comment_link').item(0);
		commentInfo=replier.getElementsByClassName('comment_info').item(0);
		commentheaderEl.appendChild(commentLink);
		commentheaderEl.appendChild(commentInfo);
		quoteBoxEl.insertBefore(commentheaderEl, replier.getElementsByClassName('hideable').item(0));
	}
	
}

for(i=0;i<commentsNL.length;i++)
{
	commentParaNL=commentsNL.item(i).getElementsByTagName('p');
	if(commentParaNL.item(0)!==null)
	{
		for(x=0;x<commentParaNL.length;x++)
		{
			replies=null;
			replies=commentParaNL.item(x).innerHTML.replace(/\s/g,"").match(/@(#)?\d+/g);
			if(replies!==null)
			{	

				for(j=0;j<replies.length;j++)
				{
					updateCommentBox(replies[j].match(/\d+/), commentParaNL.item(x));
				}				
			}
		}
	}
}
hideBtns=document.getElementsByClassName('hider');
for(i=0;i<hideBtns.length;i++)
{
	hideBtns.item(i).addEventListener('mouseup', function(e) {toggleComment(e.target);}, false);
}