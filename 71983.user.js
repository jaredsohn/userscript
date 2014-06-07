// ==UserScript==
// @name           Scroll
// @namespace      http://www.mac.com/WebObjects/Comments.woa/wa/comment
// @description    Scroll to add comments in a small window!
// ==/UserScript==
// For use on iweb/mobile me blog comment entry windows.
// Only tested on http://web.me.com/jdkarman1/Honors_English_One/Blog/Blog.html, but should always work.
// I hereby give you, the user the rights to use this one line of code for any purpose, at your own risk.
// If you end up selling it and making a lot of money, I would gladly accept some.
// This line of code finds elements of the leftcolumn class, which is where our clipped content is.
// There's one before it, so I'll go to element 1 (the second one), and modify the style.
// Then there's a semicolon.
// Enjoy!
// be sure to visit http://becauseitsawesome.com
document.getElementsByClassName('leftcolumn').1.style.overflow='scroll';