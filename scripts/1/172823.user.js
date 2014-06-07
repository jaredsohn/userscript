// ==UserScript==
// @name       	Feever (Fever RSS Reader Skin)
// @namespace  	http://henningschumann.org/feever
// @version    	0.1
// @description Takes some inspiration from Reeder for Mac to Fever. Makes item text bigger and better readable and some other small changes for now. Only tested with Google Chrome.
// @match      	http://fever.*.*/*
// @match		http://*/fever/*
// @copyright  	no
// ==/UserScript==

GM_addStyle(" i.favicon { border-radius: 2px; } .content h1 { font-size: 22px; line-height:120%; } div .item-content { font-size: 16px;  max-width: 500px; line-height: 200%; } .item-content img {max-width: 100%} .item-content a { font-weight: bold; text-decoration: none; border-bottom: 1px #ccc dashed;  } .item-content a:hover { padding: 1px; color: white; font-weight: bold; text-decoration: none; border-bottom: none; border-radius: 5px; background-color: #A10; box-shadow: 1px 1px 2px #470000; } .item-content ul, .item-content ol { margin-left: 1.5em; } .item-content blockquote { margin-left: 1.5em; } embed { width: 100%; !important; }");