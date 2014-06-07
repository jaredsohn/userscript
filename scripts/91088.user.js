// ==UserScript==
// @name         FG Ignored User Post Remove
// @description  Completely removes the posts of users on your ignore list. Also removes posts that quote certain users.
// @version      0.3
// @date         2010-11-30
// @creator      FG Lurker
// @include      http://www.fuckedgaijin.com/forums/showthread.php*
// ==/UserScript==

function filter_run() {
  var all_tr_elements, one_tr_element, div_elements, one_div_element;
  var nuked_post_count = 0;


  // FG doesn't make it easy to view a list of users on your ignore list that could then
  // be used to remove messages that quote such users. It would be far more elegant to use
  // the ignore list, but since that would require quite a bit of work I've just hardcoded the
  // 3 users I wish to remove all trace of. You can edit this list to add or remove users.
  // Note: This list is case sensitive so be sure to use the exact username, including spaces:

  var ignored_users = new Array("iHUMAN","McTojo","TOKYO JOE");



  // Get all the TR elements in the posting page. 
  // Each forum post is within a TR so these are the elements we need to check:
  all_tr_elements = document.getElementsByTagName('tr');
  
  // We cycle through all the TR posts. We skip the first one as it never contains a post
  // and processing it could cause errors for the script:
  for (var i = 1; i < all_tr_elements.length; i++) {
    one_tr_element = all_tr_elements[i];
    
    // Look to see if the current TR element contains a forum post:
    if(one_tr_element.innerHTML.indexOf("<!-- message -->")!=-1) {

      // Get all the DIV elements inside the post's TR element:
      div_elements = one_tr_element.getElementsByTagName('div');

      for (var j = 0; j < div_elements.length; j++) {
        one_div_element = div_elements[j];

        // FG doesn't put any text in place of an ignored post, so we look to see if the total length of the
        // post is zero characters. If it is, we don't want to see it at all:
        if(one_div_element.innerHTML.length == 0) {
          one_tr_element.parentNode.style.display = 'none';
        }
        
        
        // This traverses the array of ignored_users (declared above) and looks for posts that quote them.
        // Posts that quote these users are not displayed:
        for (var k = 0; k < ignored_users.length; k++) {
          if(one_div_element.innerHTML.indexOf("Originally Posted by <strong>" + ignored_users[k] + "</strong>") != -1) {
            one_tr_element.parentNode.style.display = 'none';
          }
        }
      }

      // This keeps track of how many posts on a given page have been nuked:
      if (one_tr_element.parentNode.style.display == 'none') {
        nuked_post_count++;
      }
    }
  }
  // This writes the number of nuked posts to the log. Useful for debugging purposes.
  GM_log('Nuked posts on this page: ' + nuked_post_count);
}

// Main routine
// GM_log(location.href);
filter_run();
// End
