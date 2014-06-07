// ==UserScript==
// @name           Youtube subscription page like/dislike percentages
// @namespace      unionp-youtube-subscriptionlikepercentage
// @description    See the like % of a video in the Youtube subscription view (in the non-grid view).
// @description         Change entries starting at line 26 to hide videos you're not interested in.
// @description         Change the percentage in the textbox to filter out all videos with like % < value
// @include        http://www.youtube.com/my_subscriptions*
// ==/UserScript==

function $N(value, ifnull)
{
	if (value === null || value === undefined) return ifnull
    return value;
}

function filterVideos()
{
    var allDetails = document.getElementsByClassName(' vm-video-item ');
    var totalTime = 0;
    for (i = 0; i < allDetails.length; i++)
    {
        var detailsNode = allDetails[i];
        
        // Hide any videos with titles I'm not interested in
        var titleText = detailsNode.getElementsByClassName('vm-video-title')[0].getElementsByTagName('a')[0].innerText.toLowerCase();
        if (titleText.indexOf("diablo") != -1 ||
            titleText.indexOf("skyrim") != -1 ||
            titleText.indexOf("portal") != -1)
        {
            detailsNode.style.display = "none";
            continue;
        }
        
        var likeText = detailsNode.getElementsByClassName('vm-likes-dd')[0].innerHTML;
        var dislikeNode = detailsNode.getElementsByTagName("dl")[0].lastElementChild;
        var dislikeText = dislikeNode.innerHTML;
        
        var likes = parseInt(/\d+/.exec(likeText));
        var dislikes = parseInt(dislikeText);
        var percent = Math.floor((likes/(likes+dislikes))*100);
        
        // Hide remaining videos which are rated less than percent specified in textbox
        if (percent < localStorage['percentage'])
        {
            detailsNode.style.display = "none";
        }
        else
        {
            detailsNode.style.display = "inherit";
            if (!dislikeNode.innerHTML.match('%'))
            {
                dislikeNode.innerHTML += " <span class='vm-separator'>|</span> " + percent + "%";
            }
            var timeString = detailsNode.getElementsByClassName('video-time')[0].innerHTML;
            var pieces = timeString.split(':');
            var minutes = parseInt(pieces[0]);
            var seconds = parseInt(pieces[1]);
            totalTime += minutes * 60 + seconds;
        }
    }
    var hours = totalTime / 60 / 60;
    var minutes = totalTime / 60 % 60;
    var seconds = totalTime % 60;
    
    document.getElementById('totalTimeLabel').textContent = " [ " + Math.floor(hours) + ":" + Math.floor(minutes) + ":" + seconds + " ] "
}

// Total time label
var totalTimeLabel = document.createElement("label");
totalTimeLabel.id = 'totalTimeLabel'
document.getElementById('vm-page-subheader').appendChild(totalTimeLabel)

// Minimum percentage filter textbox
var percentageTextBox = document.createElement("input");
percentageTextBox.id = 'percentageTextBox'
percentageTextBox.type = "text"
percentageTextBox.value = $N(localStorage['percentage'], '99')
percentageTextBox.maxLength = "3"
percentageTextBox.style.width = 3 * 8 + 'px'  // each character is 8px, leave a little buffer
percentageTextBox.onchange = function() { localStorage['percentage'] = this.value; filterVideos(); }
document.getElementById('vm-page-subheader').appendChild(percentageTextBox)
document.getElementById('vm-page-subheader').appendChild(document.createTextNode("%"))

// Filter videos
filterVideos()