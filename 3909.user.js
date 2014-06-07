// --------------------------------------------------------------------
//
// ==UserScript==
// @name           eCritters Post Checkboxes
// @namespace      tag:JGunter1992@gmail.com,2006-04-20
// @description    Check the fourms you want deleted and click the delete button. Note: Still very ugly.
// @include        http://ecritters.biz/forums.php?page=viewtopic&id=*
// ==/UserScript==

(function ()
{
	// Stolen from Leif K-Brook's mturk script:
	var event_listeners = [];
	function myAddEventListener(obj, ev, handler, cap)
	{
		obj.addEventListener(ev, handler, cap);
		event_listeners.push({obj: obj, ev: ev, handler: handler, cap: cap});
	}
	function removeEventListeners(ev)
    	{
        	var listener;
		while (listener = event_listeners.pop())
		{
			listener.obj.removeEventListener(listener.ev, listener.handler, listener.cap);
	}
	}
	// End theft

	var deleting_link_node_list = document.evaluate('//a[onclick="return confirm('Are you sure you want to delete this post?')"]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	for(var i = 0; i < deleting_link_node_list.snapshotLength; i++)
	{
		var link = deleting_link_node_list.snapshotItem(i);
		link.innerHTML = "";
		link.type="checkbox";
		link.value=link.src;
		link.name="postDeleteCheckbox";
	}
	
	if(isPostsPage)
	{
		e = document.createElement('input');
		e.type = 'submit';
		e.id = 'postListSubmit';
		e.name = 'postListSubmit';
		e.value = 'Delete selected posts';
		myAddEventListener(e, 'click',
			function()
			{
				return function(event)
				{
					var checkboxes = document.getElementsByName('postDeleteCheckbox');
					var deleted = [];
					for(var i = 0; i < checkboxes.length; ++i)
					{
						if(checkboxes[i].checked)
						{
							var id = checkboxes[i].value;
							GM_log('Deleting post id ' + id + '.');
							var e = document.createElement('iframe');
							e.id = 'Post' + id + 'DeletionFrame';
							e.src = 'http://ecritters.biz/' + src;
							e.style.display = 'none';
							table.appendChild(e);
							// table.removeChild(checkboxes[i].parentNode);	// Makes errorness.
							checkboxes[i].parentNode.style.display = 'none';
							deleted.push(id);
						}
					}
					var p = document.createElement(p);
					var tn = document.createTextNode('Deleted ' + deleted.length + 'topic messages: ' + deleted.join(', '));
					p.appendChild(tn);
					table.insertBefore(p, null);
				};
			}(),
			false);
		table.appendChild(e);
	}

})();

