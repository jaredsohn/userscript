// ==UserScript==
// @name        CPAE Link To Post PM
// @author      Emylbus
// @namespace   http://www.sublyme.net
// @description Makes PMing from a post that much easier!
// @include     *cpaelites.com/Thread*
// @version     1
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js
// ==/UserScript==


//This script was written by Emylbus from HF. I have converted it over to work with CPA Elites. The only thing I've done was change the classes and strip down all of HFES' features. I take virtually no credit in creating this script. Thank you, Emy.

function addPostPM(){
    var postData, i, pid, tid, message, holder, j, threadtitle, postcounter;
    postcounter = 0;
    postData = $('.tborder');
    tid = document.URL.split('Thread-')[1].split('?')[0];
    for(i=1; i<postData.length; i++){
        if(postData[i].innerHTML.indexOf('id="post_') != -1 && postData[i].innerHTML.indexOf('href="private.php?action=send') != -1){
            pid = postData[i].innerHTML.split('id="post_meta_')[1].split('">')[0];
            message = '&subject=Re%3A%20Your%20Post&message=[align%3Dright][size%3Dx-small][color=red][i][This%20PM%20is%20in%20regards%20to%20[url=http://www.cpaelites.com/Thread-'+tid+'?pid%3D'+pid+'%23pid'+pid+']a%20post%20you%20made[/url].][/i][/color][/size][/align]';
            $('.author_buttons a:contains("PM")')[postcounter].href += message;
            postcounter += 1;
        }
    }
    
}

addPostPM();