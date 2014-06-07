// CherryTAP Random Commenter
//
// Brought to you by snop.com
// Modified by VoidIndigo
//
// ==UserScript==
// @name          CherryTAP CommentBomb (v3)
// @namespace     http://www.voidindigo.com
// @description	  Appends a random comment when viewing a picture on CherryTAP. You need to edit the script to put in your own comments!
// @include .
// ==/UserScript==

(
	function() 
	{
		// TO ADD COMMENTS: Just change the values of these or add new lines.
		// Remember, the last line SHOULD NOT have a comma on the end. If you want
		// to place a " mark, type \" instead. Use HTML formatting if you want.
		var myComment = new Array
		(
			"Hi",
			":)",
			":P",
			":O",
			":D",
			"aaaa",
			"zzz",
			"qqq",
			":|",
			"eeee",
			"ffff",
			"sssss",
			"ppppp",
			"aaaa",
			"wwwww",
			":)",
			":P",
			"zzzz",
			"sssss",
			"ffff",
			"aaaaaa"
		);

		var credits = "";
        var gSeconds = 5; // global delay in seconds
        var gRandom = 3; // random seconds to add to delay
        var seconds = gSeconds + Math.floor(Math.random() * gRandom) + 1;
        var totSeconds = seconds; // used for doing percentage for timer bar
        var gTimer = 0;
        var gImageIndicator = null;

        function timedComment()
        {
            if ( --seconds == 0 )
            {
                AddComment();
            } else 
            {
                if ( gTimer == 0 ) {
                    gImageIndicator=document.createElement('div');
                	gImageIndicator.style.backgroundColor='gray';
                	gImageIndicator.style.position='fixed';
                	gImageIndicator.style.top='50%';
                	gImageIndicator.style.left='50%';
                	gImageIndicator.style.height='20px';
                	gImageIndicator.style.width='200px';
                	gImageIndicator.style.marginLeft='-100px';
                	gImageIndicator.style.marginTop='-10px';
                	var dImage=document.createElement('div');
                	dImage.style.height='20px';
                	dImage.style.width='1px';
                	dImage.style.textAlign='center';
                	dImage.style.backgroundColor='blue';
                	gImageIndicator.appendChild(dImage);
                	document.body.appendChild(gImageIndicator);
                } else {
                    clearTimeout(gTimer);
                }
                var perc=1-((totSeconds-seconds)/totSeconds);
                gImageIndicator.firstChild.style.width=(200*perc) +'px';
                gImageIndicator.firstChild.innerHTML = seconds+"s";                

                gTimer=setTimeout(timedComment, (1000));
            }
        }

		function AddComment()
		{
			// Get the comment field
			var comment = document.getElementsByName('comment_body');
			var button = document.getElementsByTagName('input');
			
			if(comment.item(0).value == "") {
				comment.item(0).value = myComment[Math.floor(Math.random() * myComment.length)] + credits;
			}
			var i = 0;
			for ( i=0; i < button.length; i++ ) {
				if(button.item(i).value == "submit") {
					button.item(i).click();
				}
			}
		}

		window.addEventListener("load", function(e) { timedComment(); }, true);

	}
)();