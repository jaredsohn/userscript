// ==UserScript==
// @id             www.khanacademy.org-5c9a4404-f226-d449-af16-520016b731ab@scriptish
// @name           shut up i'm trying to learn
// @version        1.0
// @namespace      
// @author         neko
// @description    hides inane questions and comments under Khan videos
// @include        http://www.khanacademy.org/*/v/*
// @run-at         document-end
// ==/UserScript==


GM_addStyle(".video_questions {display: none !important;}");
GM_addStyle(".video_comments {display: none !important;}");
GM_addStyle(".extra-link-bar {display: inline !important;}");