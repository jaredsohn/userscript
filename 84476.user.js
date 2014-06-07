// ==UserScript==
// @name           Remove forums cancer
// @match        http://forums.somethingawful.com/showthread.php?*
// @match        http://forums.somethingawful.com/newreply.php?*
// ==/UserScript==
(function()
{
  var cancers = document.getElementsByClassName("cancerous");
  var posts = [];
  for (var ii = 0; ii < cancers.length; ii++)
  {
    var postbody = cancers[ii].parentNode;
    posts.push(postbody.parentNode.parentNode.parentNode);
  }
  for (var ii = 0; ii < posts.length; ii++)
  {
    var post = posts[ii];
    post.parentNode.removeChild(post);
  }
})();
