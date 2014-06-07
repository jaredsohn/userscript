// ==UserScript==
// @name           Sets git as the default protocol in GitHub
// @description    Automatically selects the git protocol as the default protocol for cloning GitHub repositories.
// @author         Víctor Pimentel
// @namespace      http://victorpimentel.com
// @include        http://github.com/*
// @include        https://github.com/*
// @version        1.0
// ==/UserScript==
// Only for public repositories where we have read-only permissions
if (!document.getElementById('private_clone_url') && document.getElementById('public_clone_url')) {
  // Dirty-quick-dontdoit hack to use the jQuery included in the unsafe window (from GitHub itself)
  window.location = "javascript:$('#public_clone_url a').click();return false;";
}
