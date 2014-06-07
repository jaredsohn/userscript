// ==UserScript==
// @name           MyPlacesRewrite
// @namespace      http://www.erepublik.com/en/newspaper/freedom-post-180922/1
// @include        *.erepublik.com/*
// ==/UserScript==


var meLink = document.getElementsByClassName("citizen_name")[0].href;

var menu = document.getElementById('menu2');

menu.innerHTML = menu.innerHTML + '<ul><li><a href="' +meLink+ '">Profile</a></li><li><a href="http://economy.erepublik.com/en/work">Company</a></li><li><a href="http://economy.erepublik.com/en/train">Training</a></li><li><a href="http://economy.erepublik.com/en/study">Library</a></li><li><a href="http://economy.erepublik.com/en/entertain">Entertain</a></li><li><a href="http://erepublik.com/en/my-places/organizations">Organizations</a></li><li><a href="http://erepublik.com/en/my-places/party">Party</a></li><li><a href="http://erepublik.com/en/my-places/newspaper">Newspaper</a></li><li><a href="http://erepublik.com/en/chat/rooms">Chat</a></li></ul>';
