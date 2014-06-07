// Diggscuss 0.90 for Digg v4
//
// Created:     2007-03-22
// Last update: 2007-03-25
//
// Copyright (c) 2007, Sami Samhuri
//
// Released under the GPL license v2.
// http://www.gnu.org/copyleft/gpl.html
//
// This code is _not_ licensed under any future version of the GPL
// unless explicitly stated by myself.
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// The idea for this is the Digg Reply to Reply user script written by David Bendit.
// http://userscripts.org/scripts/show/4664
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Digg Reply to Reply", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Diggscuss
// @namespace     http://sami.samhuri.net/files/diggscuss.user.js
// @description   Adds reply and quote links to each comment. Text accumulates in the comment textarea.
// @include       http://digg.com/*
// @include       http://www.digg.com/*
// @exclude       http://digg.com/api/*
// ==/UserScript==

// some things you just can't live without
function $(id)
{
  return document.getElementById(id);
} 


// XPath helpers

function findNode(expr, rootNode)
{
  if (rootNode == null) {
    rootNode = document;
  }
  return document.evaluate(expr, rootNode, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
}

function findNodes(expr, rootNode)
{
  if (rootNode == null) {
    rootNode = document;
  }
  return document.evaluate(expr, rootNode, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
}

function xpString(expr, rootNode)
{
  if (rootNode == null) {
    rootNode = document;
  }

  var node = findNode(expr, rootNode);
  if (node.singleNodeValue) {
    node = node.singleNodeValue;
  }
  return node.nodeValue;
}


/* Structure of comments on Digg v4
 *
 * <ol>                 comment container (zero or one)
 *  <li>                parent comments (one or more)
 *    <ol>              reply container (zero or one)
 *      <li>            replies (one or more)
 *      +
 *    </ol>?
 *  </li>
 *  +
 * </ol>
 */

// store some context about the comment into the div element it lives in
function initComment(comment)
{
  comment.setAttribute('commentId', comment.id.substr(1));
  comment.setAttribute('username', xpString('div[@class="c-info"]/a/img/@alt', comment));
  comment.setAttribute('commentBody',
                       $('cbody-inside-' + comment.getAttribute('commentId'))
                                                  .innerHTML
                                                  .replace(/<a[^<>]+>(.+)<\/a>/g, "$1")
                                                  .replace(/<br>/g, "")
                                                  .replace(/<div[^<>]+>.+<\/div>/g, "")
                                                  .replace(/\s+$/, '')
  );
  return comment;
}

// replies are quite similar to parent commets, just store the parentId as well
function initReply(reply, parentId)
{
  var parent = $('c' + parentId);
  reply = initComment(reply);
  reply.setAttribute('parentId', parentId);
  return reply;
}
  
// setup a reply link to comment with this id
function replyLinkTo(id)
{
  var link = document.createElement('a');
  link.href = '#creplyform';
  link.className = 'c-reply';
  link.innerHTML = '[reply]';

  // I want to do this
  // link.setAttribute('onclick', "return(replyToComment())");
  // but in greasemonkey's sandbox we need to keep the reference to the function or it goes out of scope
  link.addEventListener('click', replyToComment, false);
  
  link.setAttribute('commentId', id);
  
  return link;
}

// setup a quote link to a comment with this id
function quoteLinkTo(id)
{
  var link = document.createElement('a');
  link.href = '#creplyform';
  link.className = 'c-reply';
  link.innerHTML = '[quote]';
  link.addEventListener('click', quoteComment, false);
  
  // store the comment id for easy acces in quoteComment
  link.setAttribute('commentId', id);
  return link;
}

// a div with the reply & quote links in it
function replyLinks(id)
{
  var cline = document.createElement('div');
  cline.setAttribute('class', 'c-line');
  cline.appendChild(replyLinkTo(id));
  cline.appendChild(document.createTextNode(' - '));
  cline.appendChild(quoteLinkTo(id));
  return cline;
}


// this does all the work
function enhanceComments()
{
  var comment, commentNodes, replyNodes, reply, origReplyLink, bodyInside;
  var i, j;

  // iterate through parent comments
  commentNodes = findNodes('//div[@class="comment"]/ol/li[@class!=""]');
  for (i = 0; i < commentNodes.snapshotLength; i++)
  {
    comment = initComment(commentNodes.snapshotItem(i));
    
    bodyInside = $('cbody-inside-' + comment.getAttribute('commentId'));
    origReplyLink = findNode('div[@class="c-line"]', bodyInside);
    bodyInside.removeChild(origReplyLink.singleNodeValue);
    
    bodyInside.appendChild(replyLinks(comment.getAttribute('commentId')));
    
    replyNodes = findNodes('ol/li', comment);
    if (replyNodes.snapshotLength > 0)
    {
      for (j = 0; j < replyNodes.snapshotLength; j++)
      {
        reply = initReply(replyNodes.snapshotItem(j), comment.getAttribute('commentId'));        
        bodyInside = $('cbody-inside-' + reply.getAttribute('commentId'));
        bodyInside.appendChild(replyLinks(reply.getAttribute('commentId')));
      }
    }
  }
}

// make the changes
enhanceComments();


// digg's setupcreply & cancelcreply functions (need to be re-declared in sandbox)

function setupcreply(parentid, parentusername) {
  var info = document.getElementById('cforminfo');
  var baseurl = window.location.href.replace(/(\?.+)?\#.*$/i, '');
  info.innerHTML = 'Replying to comment by '+parentusername+' (<a href="'+baseurl+'#creplyform" onclick="return(cancelcreply())">cancel</a>)';
  info.style.display = '';
  document.getElementById('cformreplyto').value = parentid;
  var creturn = document.getElementById('cformreturn');
  creturn.value = creturn.value.replace(/\#.*$/i,'')+'#c'+parentid;
  document.getElementById('comment').focus();
}

function cancelcreply()
{
  var info = document.getElementById('cforminfo');
  info.style.display = 'none';
  info.innerHTML = '';
  var creplyto = document.getElementById('cformreplyto');
  var parentid = creplyto.value;
  creplyto.value = '';
  var creturn = document.getElementById('cformreturn');
  creturn.value = creturn.value.replace(/\#.*$/i,'');
  document.getElementById('comment').focus();
  return false;
}


// called by reply and quote links, can't use $ here it's out of scope by now

function replyToComment()
{  
  var id = this.getAttribute('commentId');
  var comment = document.getElementById('c' + id);
  var username = comment.getAttribute('username');
  var commentField = document.getElementById('comment');

  if (commentField.value.length > 0) {
    commentField.value += "\n\n";
  }
  commentField.value += '@' + username + ': ';

  // original digg handler
  setupcreply(id, username);
  
  // why is this necessary? because we can't return from greasemonkey?
  window.setTimeout("document.getElementById('comment').focus()", 100);
  
  return false;
}


function quoteComment()
{
  var id = this.getAttribute('commentId');
  var comment = document.getElementById('c' + id);
  var username = comment.getAttribute('username');
  var commentField = document.getElementById('comment');

  if (commentField.value.length > 0) {
    commentField.value += "\n\n";
  }
  commentField.value += username + ' said: "' + comment.getAttribute('commentBody') + '"' + "\n\n";

  // original digg handler
  setupcreply(id, username);
  
  // why is this necessary? because we can't return from greasemonkey?
  window.setTimeout("document.getElementById('comment').focus()", 100);
  
  return false;
}
