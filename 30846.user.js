// Copyright (C) 2008 Etienne Dechamps

// ==UserScript==
// @name           Nofrag blogs: quote feature
// @namespace      http://www.e-t172.net/
// @description    Adds a quote feature for writing comments on blogs.nofrag.com.
// @include        http://blogs.nofrag.com/*
// ==/UserScript==

/*
 * --- LICENCE ---
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 *
 */

/*
 * --- AUTHOR ---
 *
 * By e-t172 <e-t172@akegroup.org>
 *
 */

/*
 * --- VERSION ---
 *
 * 1.0.0, 30/07/2008
 *
 */

/*
 * --- NOTES ---
 *
 * Tested on Mozilla Firefox v3.0.1
 *
 */

var commentForm = getCommentForm();
if (!commentForm)
	return;

var article = getArticle();
if (article)
	alterArticle(article, commentForm);

var comments = getComments();
for (var i = 0; i < comments.snapshotLength; i++)
{
	var comment = comments.snapshotItem(i);
	alterComment(comment, commentForm);
}

function alterComment(comment, commentForm)
{
	var adminBox = getCommentAdminBox(comment);
	alterAdminBox(adminBox, function() { quoteComment(comment, commentForm); } );
}

function alterArticle(article, commentForm)
{
	var adminBox = getArticleAdminBox(article);
	alterAdminBox(adminBox, function() { quoteArticle(article, commentForm); } );
}

function alterAdminBox(adminBox, callback)
{
	var quoteLink = document.createElement('a');
	quoteLink.setAttribute('href', '#');
	quoteLink.addEventListener(
		'click',
		function (event) {
			callback();
			event.preventDefault();
		},
		false
	);

	var quoteLinkText = document.createTextNode('Citer');

	quoteLink.appendChild(quoteLinkText);
	
	if (getAdminBoxLinks(adminBox).snapshotLength > 0)
		adminBox.appendChild(document.createTextNode(' | '));

	adminBox.appendChild(quoteLink);
}

function quoteComment(comment, commentForm)
{
	var author = getCommentAuthorLink(comment);
	var body = getCommentBody(comment);
	var url = getCommentURL(comment);

	var authorURL = author.getAttribute('href');
	var authorName = author.firstChild.nodeValue;

	addQuote(commentForm, authorName, authorURL, url, body);
}

function quoteArticle(article, commentForm)
{
	var author = getArticleAuthorLink(article);
	var body = getArticleBody(article);
	var url = getArticleURL(article);

	var authorURL = author.getAttribute('href');
	var authorName = author.firstChild.nodeValue;

	addQuote(commentForm, authorName, authorURL, url, body);
}

function addQuote(commentForm, authorName, authorURL, bodyURL, bodyNode)
{
	var commentFormText = getCommentFormText(commentForm);

	if (commentFormText.value.length > 0 && commentFormText.value.substr(-1) != '\n')
		commentFormText += '\n';

	commentFormText.value += '[b][url=' + authorURL + ']' + authorName + '[/url] a [url=' + bodyURL + ']écrit[/url] :[/b]' + '\n';

	var quoteBody = bbcode(bodyNode);

	quoteBody = '[b]>[/b] ' + quoteBody;
	quoteBody = quoteBody.replace('\n', '\n[b]>[/b] ', 'g');

	commentFormText.value += '[i]' + quoteBody + '[/i]' + '\n';
	commentFormText.value += '\n';
}

function bbcode(rootNode)
{
	var result = '';

	for (var i = 0; i < rootNode.childNodes.length; i++)
	{
		var node = rootNode.childNodes[i];

		if (node.nodeType == 3) // 3 == TEXT_NODE
		{
			result += node.nodeValue;
		}
		else
		{
			switch (node.nodeName.toLowerCase())
			{
				case 'a':
					if (
						node.getAttribute('class') != null &&
						node.getAttribute('class').substr(0, 4) == 'abp-'
					)
						// Adblock Plus "block" button
						break;

					result += '[url=' + node.getAttribute('href') + ']' + bbcode(node) + '[/url]';
					break;

				case 'img':
					result += '(image)';
					// If you want images:
					// result += '[img]' + node.getAttribute('src') + '[/img]';
					break;

				case 'object':
					result += '(vidéo)';
					break;

				case 'u':
					result += '[u]' + bbcode(node) + '[/u]';
					break;

				case 'strong':
					result += '[b]' + bbcode(node) + '[/b]';
					break;

				case 'em':
					// <em> is ignored
					result += bbcode(node);
					break;
			}
		}
	}

	return result;
}

function getCommentForm()
{
	return commentForm = document.getElementById('commentform');
}

function getCommentFormText(comment)
{
	return document.evaluate(
		'.//textarea[@name="body"]',
		comment,
		null,
		XPathResult.ANY_UNORDERED_NODE_TYPE,
		null
	).singleNodeValue;
}

function getComments()
{
	return document.evaluate(
		'//node()[starts-with(@class, "comment")]',
		document,
		null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		null
	);
}

function getArticle()
{
	return document.evaluate(
		'//div[@id="article"]/div[@class="article"]',
		document,
		null,
		XPathResult.ANY_UNORDERED_NODE_TYPE,
		null
	).singleNodeValue;
}

function getCommentAdminBox(comment)
{
	return document.evaluate(
		'div[@class="admin"]',
		comment,
		null,
		XPathResult.ANY_UNORDERED_NODE_TYPE,
		null
	).singleNodeValue;
}

function getArticleAdminBox(article)
{
	return document.evaluate(
		'div[@class="admin"]',
		article,
		null,
		XPathResult.ANY_UNORDERED_NODE_TYPE,
		null
	).singleNodeValue;
}

function getAdminBoxLinks(adminBox)
{
	return document.evaluate(
		'a',
		adminBox,
		null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		null
	);
}

function getCommentBody(comment)
{
	return document.evaluate(
		'div[@class="body"]',
		comment,
		null,
		XPathResult.ANY_UNORDERED_NODE_TYPE,
		null
	).singleNodeValue;
}

function getArticleBody(article)
{
	return document.evaluate(
		'div[@class="body"]',
		article,
		null,
		XPathResult.ANY_UNORDERED_NODE_TYPE,
		null
	).singleNodeValue;
}

function getCommentURL(comment)
{
	for (
		node  = comment.previousSibling;
		node != null && node.nodeName.toLowerCase() != 'a';
		node  = node.previousSibling
	);

	if (node == null || node.getAttribute('name') == null)
		return;

	return '#' + node.getAttribute('name');
}

function getArticleURL(article)
{
	return '#article';
}

function getCommentAuthorLink(comment)
{
	return document.evaluate(
		'div[@class="author"]//a',
		comment,
		null,
		XPathResult.ANY_UNORDERED_NODE_TYPE,
		null
	).singleNodeValue;
}

function getArticleAuthorLink(article)
{
	return document.evaluate(
		'//div[@id="title"]//span[@class="author"]//a',
		document,
		null,
		XPathResult.ANY_UNORDERED_NODE_TYPE,
		null
	).singleNodeValue;
}
