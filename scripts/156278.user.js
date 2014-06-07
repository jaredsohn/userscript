// ==UserScript==
// @name        Block youtube users
// @namespace   #perunaonparas
// @include     *youtube.com/*
// @exclude     *my_videos*
// @grant       GM_getValue
// @grant       GM_setValue
// @require http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @require https://gist.github.com/raw/2625891/waitForKeyElements.js
// @version     2.992
// ==/UserScript==


function opensettings()
{
    var settingsDiv = '<div style="padding:10px;" id="blocksettingsdiv"><p>Blocks:</p> <textarea id="blockslist" cols="90" rows="10">'+blocks+'</textarea><br>Don'+"'"+'t show the video on watchpage (if you are watching a video from this user): <input type="checkbox" id="checkb"><br> <input type="submit" id="saveblocks" value="SAVE"><div id="saved"></div></div>';
    //$(settingsDiv).insertBefore('#masthead-expanded-acct-sw-container');
  	$('body').prepend(settingsDiv);
    document.getElementById("checkb").checked=blockvideo;
    $("#saveblocks").click(savesettings);
    $("#myButton").unbind("click");
}


function savesettings()
{
    GM_setValue("savedblocks", $('#blockslist').val());
    GM_setValue("blockvideo", document.getElementById("checkb").checked);
    $("#saved").append("<strong>SAVED!</strong>");
}

function filter(jNode) 
{
    try{
        var temp = jNode[0];
        var badword = temp.innerHTML;
        if(censors.indexOf(badword.trim().toLowerCase()) != -1)
        {
            temp = temp.parentNode;
            for (var a=0; a<15; a++) {
                if(temp == null) {break;}
                temp = temp.parentNode;
                
                if(temp.tagName == "LI") {
                    if(temp.parentNode != null) {
                    temp.parentNode.removeChild(temp);
                    }
                    break;	
                }
                
                
                if(temp.id == "watch7-main") {
                    if(blockvideo == true){
                         var temptemp = temp.parentNode;
                        if(temptemp != null) {
                         temptemp.removeChild(temp);
                        }
                        $( "#player" ).remove();
                        temptemp.innerHTML="<div align='center'><p style='font-size:16px'>Video uploaded by "+badword+" and therefore blocked.</p><p style='font-size:9px'>You can watch this video by changing the setting from <i>Edit Blocks</i>.</div>";
                    }
                    break;
                }
                
                
            }
        }
    } catch(e) {}
}


var blocks = GM_getValue('savedblocks', 'PewDiePie,TobyGames,Smosh Games');
var blockvideo = GM_getValue('blockvideo', true);
var censors = blocks.split(",");

for (var i = 0; i < censors.length; i++) {
    censors[i] = censors[i].trim().toLowerCase();
}


var t = document.querySelector("#guide-container .guide-user-links");
if( t != null){
    var d = document.createElement("li");
	d.className="guide-channel";
    d.innerHTML = '<a class="guide-item yt-uix-sessionlink yt-valign" id="myButton" href="#" title="Edit Blocks"> <span class="yt-valign-container"> <span class="display-name"> <span>Edit Blocks</span> </span> </span> </a>';
    t.appendChild(d);
    $("#myButton").click (opensettings);
}

if(window.location.href == "http://www.youtube.com/#editblocks") { opensettings(); }
waitForKeyElements('.g-hovercard', filter);
waitForKeyElements('.yt-user-name', filter);
waitForKeyElements('.qualified-channel-title', filter);
waitForKeyElements('.qualified-channel-title-text', filter);
waitForKeyElements('.shelf-title', filter);
waitForKeyElements('.yt-uix-sessionlink', filter);