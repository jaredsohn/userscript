// ==UserScript==
// @name        Lexisnexis: Jump headlines
// @namespace   http://userscripts.org/users/507621
// @include     http*://www.lexisnexis.com/at/recht/*
// @require			http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @version     1
// ==/UserScript==

this.$ = this.jQuery = jQuery.noConflict(true);

//$('frameset[id="fs_resultscontent"] frame').attr('id', 'mainframe');
$('body[onunload="parent.storeScrollPos()"]').attr('id', 'mainbody');

//
// only show buttons when there is more than one headline
//       
var no_headlines = $('div[class="SS_L2"]').length;    // how many headlines there are
var headerno = 0;                                     // no of current headline                                                                   
if( no_headlines > 1 )
{       
  $(document).keydown(function(event){
    if(event.ctrlKey)
    {       
      if(event.which == 40)
      {
        nextHeader();      
      }      
      else if(event.which == 38) 
      {
        prevHeader();      
      }
    }    
  });
  
  /*  
  $(document).keydown(function (e) {
      if(e.ctrlKey)
      {
        var keyCode = e.keyCode || e.which,
          arrow = {left: 37, up: 38, right: 39, down: 40 }, $status = $('#status');

        switch (keyCode) {
          case arrow.left:
            $status.html('left!');
          break;
          case arrow.up:
            $status.html('up!');
          break;
          case arrow.right:
            $status.html('right!');
          break;
          case arrow.down:
            $status.html('down!');
          break;
        }  
      }      
    });
  */
  
  //alert('no hl:'+no_headlines);          
  
  /**
   *
   *   FUNCTION LIST
   *     
   **/ 
  
  // adds styles to GM
  function addStyle(styles)
  {
    GM_addStyle(styles.join("\r\n"));
  }
  
  // jump
  function jump()
  {
    //window.scrollTo(0, $('div[class="SS_L2"]').eq(headerno).offset().top-100);
    $('html, body').animate({scrollTop:$('div[class="SS_L2"]').eq(headerno).offset().top-100}, 'slow');
  }
  
  function nextHeader()
  {
    if(headerno < no_headlines)
      headerno++;
    jump(); 
  } 
  function prevHeader()
  {
    if(headerno > 0)
      headerno--;
    jump();
  }
  
  
  /**
   *
   *  init buttons
   *  
   **/
  addStyle([
    '#jhDiv { background-color:#FAFAFA; border:1px solid #E5E5E5; border-bottom-width:2px; color:#707070; padding:4px; font-weight:bold; position: fixed; font-family: Verdana; font-size: 10pt; right: 0px;}',
    '#nextButton, #prevButton {}',
    '#nextButton:hover, #prevButton:hover {color:#FF9300; cursor: pointer}'
  ]);
  $('#mainbody').prepend('<div id="jhDiv"><span id="status"></span><span id="nextButton">nächste Überschrift</span> &middot; <span id="prevButton">vorherige Überschrift</span></div>');
  $('#nextButton').click(function(){
    nextHeader();
  });
  $('#prevButton').click(function(){
    prevHeader();
  });

}
  