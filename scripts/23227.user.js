   1.  // CherryTAP Random Commenter
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
  21.              "qwert",
  22.              "hello",
  23.              "win",
  24.              "xxxx",
  25.              "ooooooo",   
  26.              "kxoxoxox",      
  27.              ":)",
  28.              "xxxxooooxxxx",
  29.              "kasdf",
  30.              "mnbv",
  31.              "lets bomb"
  32.          );
  33.
  34.          var credits = "";
  35.          var gSeconds = 8; // global delay in seconds
  36.          var gRandom = 1; // random seconds to add to delay
  37.          var seconds = gSeconds + Math.floor(Math.random() * gRandom) + 1;
  38.          var totSeconds = seconds; // used for doing percentage for timer bar
  39.          var gTimer = 0;
  40.          var gImageIndicator = null;
  41.
  42.          function timedComment()
  43.          {
  44.              if ( --seconds == 0 )
  45.              {
  46.                  AddComment();
  47.              } else
  48.              {
  49.                  if ( gTimer == 0 ) {
  50.                      gImageIndicator=document.createElement('div');
  51.                      gImageIndicator.style.backgroundColor='gray';
  52.                      gImageIndicator.style.position='fixed';
  53.                      gImageIndicator.style.top='50%';
  54.                      gImageIndicator.style.left='50%';
  55.                      gImageIndicator.style.height='20px';
  56.                      gImageIndicator.style.width='200px';
  57.                      gImageIndicator.style.marginLeft='-100px';
  58.                      gImageIndicator.style.marginTop='-10px';
  59.                      var dImage=document.createElement('div');
  60.                      dImage.style.height='20px';
  61.                      dImage.style.width='1px';
  62.                      dImage.style.textAlign='center';
  63.                      dImage.style.backgroundColor='blue';
  64.                      gImageIndicator.appendChild(dImage);
  65.                      document.body.appendChild(gImageIndicator);
  66.                  } else {
  67.                      clearTimeout(gTimer);
  68.                  }
  69.                  var perc=1-((totSeconds-seconds)/totSeconds);
  70.                  gImageIndicator.firstChild.style.width=(200*perc) +'px';
  71.                  gImageIndicator.firstChild.innerHTML = seconds+"s";              
  72.
  73.                  gTimer=setTimeout(timedComment, (1000));
  74.              }
  75.          }
  76.
  77.          function AddComment()
  78.          {
  79.              // Get the comment field
  80.              var comment = document.getElementsByName('comment_body');
  81.             var button = document.getElementsByTagName('input');
  82.            
  83.              if(comment.item(0).value == "") {
  84.                 comment.item(0).value = myComment[Math.floor(Math.random() * myComment.length)] + credits;
  85.              }
  86.              var i = 0;
  87.              for ( i=0; i < button.length; i++ ) {
  88.                  if(button.item(i).value == "submit") {
  89.                      button.item(i).click();
  90.                  }
  91.              }
  92.          }
  93.
  94.          window.addEventListener("load", function(e) { timedComment(); }, true);
  95.
  96.      }
  97. )();