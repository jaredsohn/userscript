// ==UserScript==
// @name           tumblr easily modify publishing
// @description    Easily modify publishing option(publish/private) in dashboard for tumblr. tumblr用:ダッシュボードでの公開オプション(publish/private)を簡単に変更
// @version        0.1.0
// @namespace      http://www.sharkpp.net/
// @author         Shark++ / sharkpp
// @include        http://www.tumblr.com/dashboard*
// @include        http://www.tumblr.com/tumblelog/*
// ==/UserScript==

function onModifyPublishState(e)
{
	var id = this.parentNode.parentNode.id.replace('post', '');
	var change_state = {"private":"private","publish":"0"}[this.innerHTML];
	var prompt = this.innerHTML.substr(0, 1).toUpperCase() +
	             this.innerHTML.substr(1) + ' this post?';

	if( confirm(prompt) )
	{
		var req = new XMLHttpRequest();
		req.open('GET', '/edit/'+id+'?redirect_to='+location.pathname, true);
		req.onreadystatechange = function (aEvt) {
			if (req.readyState == 4) {
				if(req.status == 200)
				{
					var body = document.getElementsByTagName('body')[0];
					// create element for DOM operation
					var domContainer = body.appendChild(document.createElement('div'));
					domContainer.style.cssText = "display: none;";
					// remove unnecessary element
					var text = req.responseText;
					text = text.replace(/^[\s\S]+?(<div id="container">[\s\S]+<\/div>)[\s\S]+/m, '$1');
					text = text.replace(/<(img|link)[\s\S]+?\/>]/g, '');
					text = text.replace(/<(script)[\s\S]*?>[\s\S]*?<\/$1>]/g, '');
					// apply for element
					domContainer.innerHTML = text;
					// search post form
					var post_form = document.forms[document.forms.length-1];
					// modify publish state
					for(var i = 0, elm; elm = post_form.elements[i]; i++) {
						if( 'post_state' == elm.id )
						{
							elm.value = change_state;
						}
					}
					// post article
					post_form.submit();
					// remove element
					body.remoeChild(domContainer);
				}
			}
		}
		req.send(null);
	}

	e.preventDefault();
	e.stopPropagation();
}

(function(){

	var item, items;

	items
		= document.evaluate(
			"//div[@class='post_controls']",
			document,
			null,
			XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
			null);

	for (var i = 0; i < items.snapshotLength; i++) {
		item = items.snapshotItem(i);
		var link = item.appendChild(document.createElement('a'));
		link.href = '#';
		link.addEventListener('click', onModifyPublishState, false);
		if( document.evaluate(
				"div[@class='post_info']",
				item.parentNode, null,
				XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
				null).snapshotLength )
			link.innerHTML = 'publish';
		else
			link.innerHTML = 'private';
	}

})();
