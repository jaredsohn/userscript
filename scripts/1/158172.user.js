// Advice: to do a quick script use some code snippets from userscripts.org
// to understand what the code should do (code conventions, some statements and so on). It works for me, at least

// USAGE and detailed description:
  // this script is, in few words, a redirect script (for quora.com). It needs some knowledge by the user, in fact he should use
  // a bit the quora shuffle to identify (manually) some questions or answers that are shown too often for a random
  // selection. So the users must select the unique identificator, in the address bar, of the question/answer.
  // For example: 
  //   from the url http://www.quora.com/What-is-it-like-to-major-in-math-at-the-University-of-Washington?__shuffle__=all
  //   the user select "What-is-it-like-to-major-in-math-at-the-University-of-Washington" and then add it
  //   to greasemonkey, with "manage script->script settings->user include" and the  with the wildcard characters, in this way:
  //   *What-is-it-like-to-major-in-math-at-the-University-of-Washington* . Then every time quora select "randomly" that question
  //   the script will be triggered and will do a redirection to another question randomly selected.
  //
  // hint: The next button of quora shuffle doesn't work really well, sometimes it go back to quora home so
  // add a bookmark in the bookmark toolbar that point to www.quora.com/shuffle :)

// This program is free software; you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation; either version 2, or (at your option)
// any later version.
// 
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// ==UserScript==
// @name           help-Quora-Shuffle
// @namespace      Pierfag
// @description    Quora shuffle doesn't work really well, some questions are shown too often. So to avoid manual clicking on "shuffle"
//                 this script helps the user to do an automatic shuffle. How are recognized the questions shown too often? By the user ( for now )
//                 and then he should modify the list of includes through greasemonkey "manage script".
// @version        0.1

// on which urls script works
  // test regexp
    // include        /\.quora\.com/
// @exclude       *
// @include       thisSiteDoesntExists
  //by default, doesn't work on any site on the web
  
// when the script is active: prior the page load.
// @run-at document-start
// ==/UserScript==

//testing notes
  //notes on include: regexp works better than simple urls, at least in my testing.
  //notes on redirect: using includes (that can be modify directly by greasemonkey) to check the
    // url and do a redirect. Seems a working script if url are included with wildcards.

//test
  //window.alert("i'm working!");
document.location = "http://www.quora.com/shuffle";