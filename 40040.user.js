typeof(CheckForUpdate)!='undefined' && CheckForUpdate.init(<>
// ==UserScript==
// @name           Userscripts : Sticky Topics
// @namespace      http://gm.wesley.eti.br/userscripts
// @description    Hides Sticky topics or applies a different background color to it according to its recent activity
// @author         w35l3y
// @email          w35l3y@brasnet.org
// @copyright      w35l3y 2008
// @license        GNU GPL
// @homepage       http://www.wesley.eti.br
// @version        1.0.0.2
// @include        http://userscripts.org/forums/*
// @include        http://userscripts.org/scripts/discuss/*
// @require        http://userscripts.org/scripts/source/38788.user.js
// @cfu:meta       http://userscripts.org/scripts/source/@cfu:id.meta.js
// @cfu:url        http://userscripts.org/scripts/source/@cfu:id.user.js
// @cfu:id         uso:script
// @cfu:version    version
// @uso:script     40040
// @uso:timestamp  01:02 01/15/2009
// ==/UserScript==
</>);

(function()
{	// script scope

	var topics = document
	.evaluate("id('content')/table/tbody/tr[td[2]/strong]", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

	if (topics.snapshotLength)
	{
		function displayTopics(topics, link)
		{
			var isHidden = !link.textContent && GM_getValue('isHidden', true) || /^Un/.test(link.textContent);
			link.textContent = ( isHidden ? 'H' : 'Unh' ) + 'ide topics'; // Hide/Unhide topics
	
			for ( var topic, i = topics.snapshotLength ; topic = topics.snapshotItem(--i) ; )
			{
				topic.style.backgroundColor = '#F6F6F6';

				if (/grey/.test(topic.cells[0].childNodes[1].getAttribute('class')))	// no recent activity
					topic.style.display = ( isHidden ? 'table-row' : 'none' );
			}

			GM_setValue('isHidden', isHidden);
		}

		var ahide = document.createElement('a');
		ahide.setAttribute('class', 'utility');
		ahide.setAttribute('href', '#');
		ahide.addEventListener('click', function(e)
		{
			displayTopics(topics, e.target);

			e.preventDefault();
		}, false);

		var phide = document.createElement('p');
		phide.setAttribute('style', 'float:right; margin-top:0pt; margin-left:10pt;');
		phide.appendChild(ahide);

		var subtitle = document
		.evaluate("id('content')/p[@class='subtitle']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null)
		.singleNodeValue;

		subtitle.parentNode.insertBefore(phide, subtitle.nextSibling);

		displayTopics(topics, ahide);
	}
})();