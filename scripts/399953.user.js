// ==UserScript==
// @name          Goodreads high count giveaways
// @namespace     randomecho.com
// @description   Remove First Reads giveaways offering a low number of books
// @include       https://www.goodreads.com/giveaway*
// @include       http://www.goodreads.com/giveaway*
// @grant         none
// @copyright     2014 Soon Van
// @author        Soon Van - randomecho.com
// @license       http://opensource.org/licenses/BSD-3-Clause
// @version       1.0
// ==/UserScript==

var minimum_books = 5;

function wipeOut(minimum_books)
{
  var listBooks = document.getElementsByClassName('listElement');
  listBooks = Array.prototype.slice.call(listBooks);

  for (i = 0; i < listBooks.length; i++)
  {
    var book_entry = listBooks[i];
    
    // Drill down to the right side of the entry
    var copies_block = book_entry.querySelectorAll('div.content230 div.sansSerif div');
    copies_block = Array.prototype.slice.call(copies_block);

    // Since the block with the count is not the first unclassed DIV seen
    var copies_info = copies_block[1].innerHTML.trim();
    copies_info = copies_info.split('\n');

    // Grab the number from the "X copies" text
    var copies_count = parseInt(copies_info[0].replace(/cop(ies|y)/i, ''));

    if (copies_count < minimum_books)
    {
      book_entry.style.display = 'none';
    }
  }
}

window.onload = wipeOut(minimum_books);