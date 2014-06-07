// ==UserScript==
// @name		SingSnap Duet Finder
// @namespace	http://www.manlymen.org/
// @author		Anthony F. Miller
// @version		0.1
// @description	Puts a link to the original recording allowing you to comment on it.  Original recording opens in a new tab / window.
// @license		GNU GPL v3 (http://www.gnu.org/copyleft/gpl.html) 
// @match		http://www.singsnap.com/karaoke/record/record?duet_id=*
// ==/UserScript==

(function(){
    var recordURL = window.location.href;
    var recordURLArray = recordURL.split("?");
    for (var i=recordURLArray.length-1; i>0; i--) {
        urlElement = recordURLArray[i];
        // Only run this if it's a duet (has a duet ID)
        if(urlElement.search("duet_id") != -1) {
            urlElementArray=urlElement.split("=");
            duetID = urlElementArray[1]
            // Create the link
            var a = document.createElement('a');
            a.setAttribute('href','http://www.singsnap.com/karaoke/watchandlisten/play/' + duetID);
            a.innerHTML = 'Go to original link';
            a.target = '_blank';
            // Append the anchor to the chosen element ID
            document.getElementById('recording_step_display').appendChild(a);
            break;
        } 
    }
}
)();
