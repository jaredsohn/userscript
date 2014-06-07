// ==UserScript==
// @name          h2 to title phpbb 2 and 3
// @namespace     *
// @include       */viewtopic.php*
// @author		  Andreas Pilz
// @description   Takes the h2 title on a Threadpage and turns it into the title-tag, so tabs in Firefox show the threadname instead of the forumname
// @version     1.1.1


// ==/UserScript==

document.title = document.getElementsByClassName("titles")[0].innerHTML;

