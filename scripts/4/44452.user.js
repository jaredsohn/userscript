// ==UserScript==
// @name           TSR front page
// @namespace      awesomeness
// @description    Add inner thread links on front page
// @include        http://www.thestudentroom.co.uk/
// ==/UserScript==

$ = unsafeWindow.jQuery;

// Config
var postsPerPage = 20;
var threads = '#lastest-discussions-recent-primary table tbody tr';
var descriptionCell = 'td:eq(0)';
var replyCountCell = 'td:eq(3)';

// Get posts count
$(threads).each(function(){
  var postCount = parseInt($(this).children(replyCountCell).text()) + 1;
  var descCell = $(this).children(descriptionCell);

  // Too many posts for one page
  if (postCount > postsPerPage)
  {
    // Create a page number holder
    $(descCell).append('<br /><span class="widgetfont11">Page: </span>');
    holder = $(descCell).children('span:last');

    // Base page url, without page number
    linkHref = $(descCell).children('a:eq(1)').attr('href');

    // Loop for each page there should be
    numPages = Math.ceil(postCount / postsPerPage);
    for (i = 1; i <= numPages; i++) {
      $(holder).append('<a href="'+linkHref+'&page='+i+'">'+i+'</a>');

      // Add a comma if it isn't the last page
      if (i != numPages)
      {
        $(holder).append(', ');
      }
    }
  }
});
