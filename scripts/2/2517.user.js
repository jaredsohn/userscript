// ==UserScript==
// @name           43things subscription comments
// @namespace      http://whee.dk/
// @description    Adds a comment on this to entries shown in your subscriptions list.
// @include        http://www.43people.com/subscriptions*
// ==/UserScript==

function showForm(event)
{
	event.target.parentNode.parentNode.lastChild.style.display = 'block';
	event.cancelBubble = true;
	event.returnValue = false;
	return false;
}

var tags = document.getElementsByTagName('h4');

for (cnt = 0; cnt < tags.length; cnt++)
{
	var tag = tags[cnt];
	
	if (tag.className == 'entry-type')
	{
		data = tag.firstChild.href.match(/\/entries\/view\/([0-9]+)(?:#comment([0-9]+))?/);
		
		if (data)
		{
			commentDiv = document.createElement('DIV');
			commentDiv.className = 'add-comment';
			commentDiv.style.display = 'none';

			commentForm = document.createElement('FORM');
			commentForm.action = 'http://www.43things.com/entries/save_comment';
			commentForm.enctype = 'multipart/form-data';
			commentForm.method = 'post';
						
			commentId = document.createElement('INPUT');
			commentId.name = 'comment[comment_id]';
			commentId.value = data[2];
			commentId.type = 'hidden';
			
			commentEntryId = document.createElement('INPUT');
			commentEntryId.name = 'comment[entry_id]';
			commentEntryId.value = data[1];
			commentEntryId.type = 'hidden';
			
			commentDL = document.createElement('DL');

			commentDT = document.createElement('DT');
			commentDT.innerHTML = 'Title <span>(optional)</span>';

			commentDL.appendChild(commentDT);
			
			commentDD = document.createElement('DD');
						
			commentEntryTitle = document.createElement('INPUT');
			commentEntryTitle.name = 'comment[title]';
			commentEntryTitle.type = 'text';

			commentDD.appendChild(commentEntryTitle);
			commentDL.appendChild(commentDD);

			commentDT = document.createElement('DT');
			commentDT.innerHTML = 'Your comment';

			commentDL.appendChild(commentDT);
			
			commentDD = document.createElement('DD');
			
			commentEntryBody = document.createElement('TEXTAREA');
			commentEntryBody.name = 'comment[body]';
			commentEntryBody.cols = 40;
			commentEntryBody.rows = 20;

			commentDD.appendChild(commentEntryBody);
			commentDL.appendChild(commentDD);

			commentDT = document.createElement('DT');
			commentDT.innerHTML = 'Related image\n<input name="image" type="file"><br><br>';
			commentDT.className = 'submit';
			
			commentEntryButton = document.createElement('INPUT');
			commentEntryButton.name = 'submit_button_preview';
			commentEntryButton.type = 'submit';
			commentEntryButton.value = 'Preview';

			commentDT.appendChild(commentEntryButton);

			commentEntryButton = document.createElement('INPUT');
			commentEntryButton.name = 'submit_button_comment';
			commentEntryButton.type = 'submit';
			commentEntryButton.value = 'Save this comment';

			commentDT.appendChild(commentEntryButton);
			commentDL.appendChild(commentDT);
			
			commentForm.appendChild(commentId);				
			commentForm.appendChild(commentEntryId);				
			commentForm.appendChild(commentDL);				
			
			commentDiv.appendChild(commentForm);

			comment = document.createElement('A');
			comment.href = '#whee';
			comment.className = 'admin';
			comment.innerHTML = 'Comment on this';
			comment.addEventListener('click', showForm, true);

			tag.parentNode.lastChild.previousSibling.appendChild(document.createTextNode('|\n\n'));

			tag.parentNode.lastChild.previousSibling.appendChild(comment);
			tag.parentNode.appendChild(commentDiv);
		}
	}
}                                                                                 