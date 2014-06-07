// ==UserScript==
// @name       RYM: save list item fix
// @version    0.2
// @description  after saving or deleting a list item, goes back to the page item was on instead of page 1 or the next page
// @match      http://rateyourmusic.com/lists/new_item_a?list_id=*&page=*
// @match      http://rateyourmusic.com/lists/edit?list_id=*
// @copyright  2013+, thought_house
// ==/UserScript==

/*var $ = unsafeWindow.jQuery; 
if ($('#page').length) {
    var params = location.search;
    //var param = params.match(/page=\d*)[0];
    /*var page = param.split('=')[1];
    $('#page').val(page);
}
else {
    //fix for removing items
    $('.deletebutton').live('click', function(event) {
        //check if the href matches what is expected - just in case
        if ($(this).attr('href').match(/javascript:deleteItem\('\d+'\);/)) {
            event.preventDefault();
            unsafeWindow.currentPage--;
            var itemidx = $(this).attr('href').match(/\d+/)[0];
            unsafeWindow.deleteItem(itemidx);
            unsafeWindow.currentPage++;
        }
    });
}*/ fixed in RYM