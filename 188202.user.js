// ==UserScript==
// @name         Anilist.co sidebar hover
// @version      2.2.4
// @description  Hides the new sidebar so the website it usable for smaller browser windows and ajaxifies the menu
// @match        *://anilist.co/*
// @match        *://www.anilist.co/*
// ==/UserScript==

/*
 * Copyright (C) 2014
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
 
/*
 * If the script takes a while to hide the sidebar and you are annoyed by that,
 * please install Stylish and add the userstyle at the end of the script
 */

var sidebar = $('#sideNav-wrap'),
    content = $('#containerInner');

var left = sidebar.css('left');
if(left === '0px') {
    left = '-195px';
    sidebar.css('left', left);
    content           
      .css('margin-left', '0px');
}

var loadPage = function(uri, callback) {
    $.get(uri, function(html) {
        var dom = $(html);
        // due to jQuery's way of 'parsing' html, finding the title tag would be an ugly procedure
        // let's use regex instead, which is a little bit simpler
        var title = html.match(/\<title\>(.*?)\<\/title\>/i)[1];
        $('title').html(title);
        content.html(dom.find('#containerInner').html());
        var sidebarMargin = dom.find('#sideNav-wrap').css('margin-top');
        sidebar.css('margin-top', sidebarMargin);
        typeof callback === 'function' &&
          callback({title: title});
    });
};

sidebar.hover(function() {
    sidebar
      .stop()
      .animate({'left': '0px'});
}, function() {
    sidebar
      .stop()
      .animate({'left': left});
})
  .find('ul > a')
  .click(function(e) {
    e.preventDefault();
    var uri = this.href;
    loadPage(uri, function(e) {
        history.pushState({}, e.title, uri);
    });
});

window.addEventListener('popstate', function(e) {
    loadPage(document.location);
}, false);

/*

THE USERSTYLE (is a bit faster than the script)

STYLE BEGINS ON THE NEXT LINE
@-moz-document
 url("anilist.co"),
 url-prefix(http://anilist.co),
 url-prefix(https://anilist.co),
 domain("www.anilist.co") {

#sideNav-wrap {
    left: -195px;
}

#containerInner {
    margin-left: 0 !important;
}

}
STYLE ENDS AT THE PREVIOUS LINE

*/

