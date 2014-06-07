// ==UserScript==
// @name       fsre.nl clear missing strains
// @namespace  http://userscripts.org/users/531833
// @version    0.1
// @description  Clears the missing strains from the strain list
// @match      http://fsre.nl/?page_id=165
// @copyright  2012+, You
// ==/UserScript==
var $ = unsafeWindow.jQuery;

postContent = document.getElementById('post-content');
$('<style>del,span[style="text-decoration: line-through;"]{opacity:0.1;}</style>').appendTo(postContent);
