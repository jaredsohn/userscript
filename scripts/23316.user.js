   1. // CherryTAP Random Commenter
   2. //
   3. // Brought to you by snop.com
   4. // Modified by VoidIndigo
   5. //
   6. // ==UserScript==
   7. // @name          CherryTAP CommentBomb (v3)
   8. // @namespace     http://www.voidindigo.com
   9. // @description      Appends a random comment when viewing a picture on CherryTAP. You need to edit the script to put in your own comments!
  10. // @include .
  11. // ==/UserScript==
  12.
  13. (
  14.      function()
  15.      {
  16.          // TO ADD COMMENTS: Just change the values of these or add new lines.
  17.          // Remember, the last line SHOULD NOT have a comma on the end. If you want
  18.          // to place a " mark, type \" instead. Use HTML formatting if you want.
  19.          var myComment = new Array
  20.          (
  21.              "xxxxx",
  22.              "oooooooo",
  23.              "xoxoxoxo",
  24.              "LOVE",
  25.              "ME",   
  26.              ":)",      
  27.              "FOREVER",
  28.              "BOMB",
  29.              "THIS PICTURE",
  30.              "fghj",
  31.              "asdfg",
  32.              "cvbn",
  33.              "have a good day",
  34.              "cvbn",
  35.              "asdfasdf",
  36.              "hello"
  37.
  38.          );
  39.
  40.          var credits = "";
  41.          var gSeconds = 6; // global delay in seconds
  42.          var gRandom = 3; // random seconds to add to delay
  43.          var seconds = gSeconds + Math.floor(Math.random() * gRandom) + 1;
  44.          var totSeconds = seconds; // used for doing percentage for timer bar
  45.          var gTimer = 0;
  46.          var gImageIndicator = null;
  47.
  48.          function timedComment()
  49.          {
  50.              if ( --seconds == 0 )
  51.              {
  52.                  AddComment();
  53.              } else
  54.              {
  55.                  if ( gTimer == 0 ) {
  56.                      gImageIndicator=document.createElement('div');
  57.                      gImageIndicator.style.backgroundColor='gray';
  58.                      gImageIndicator.style.position='fixed';
  59.                      gImageIndicator.style.top='50%';
  60.                      gImageIndicator.style.left='50%';
  61.                      gImageIndicator.style.height='20px';
  62.                      gImageIndicator.style.width='200px';
  63.                      gImageIndicator.style.marginLeft='-100px';
  64.                      gImageIndicator.style.marginTop='-10px';
  65.                      var dImage=document.createElement('div');
  66.                      dImage.style.height='20px';
  67.                      dImage.style.width='1px';
  68.                      dImage.style.textAlign='center';
  69.                      dImage.style.backgroundColor='blue';
  70.                      gImageIndicator.appendChild(dImage);
  71.                      document.body.appendChild(gImageIndicator);
  72.                  } else {
  73.                      clearTimeout(gTimer);
  74.                  }
  75.                  var perc=1-((totSeconds-seconds)/totSeconds);
  76.                  gImageIndicator.firstChild.style.width=(200*perc) +'px';
  77.                  gImageIndicator.firstChild.innerHTML = seconds+"s";              
  78.
  79.                  gTimer=setTimeout(timedComment, (1000));
  80.              }
  81.          }
  82.
  83.          function AddComment()
  84.          {
  85.              // Get the comment field
  86.              var comment = document.getElementsByName('comment_body');
  87.             var button = document.getElementsByTagName('input');
  88.            
  89.              if(comment.item(0).value == "") {
  90.                 comment.item(0).value = myComment[Math.floor(Math.random() * myComment.length)] + credits;
  91.              }
  92.              var i = 0;
  93.              for ( i=0; i < button.length; i++ ) {
  94.                  if(button.item(i).value == "submit") {
  95.                      button.item(i).click();
  96.                  }
  97.              }
  98.          }
  99.
 100.          window.addEventListener("load", function(e) { timedComment(); }, true);
 101.
 102.      }
 103. )();