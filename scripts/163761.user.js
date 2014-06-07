// ==UserScript==
// @name        HF Thread Citing
// @author      Emylbus
// @namespace   sublyme.net
// @description Makes citing threads convenient and useful!
// @include     *.hackforums.net/showthread.php*
// @exclude     *.hackforums.net/showthread.php*&*
// @version     1
// @grant       none
// ==/UserScript==

function getThreadTitle(){
    // Grab the title from the navigation menu.
    var navArray = document.getElementsByClassName('navigation')[0].innerHTML.split('\n');
    for(i = 0; i < navArray.length; i++){
        // The open page is given an "active" class, coupled with my @include I can know that this will give me the thread name.
        if(navArray[i].indexOf('class="active"') != -1)
        {
            // Screw regex, yay ugly string splitting! &nbsp; is the character between thread tags and their title.
            var threadTitle = navArray[i].split('class="active">')[1].split('</span>')[0].replace('&nbsp;',' ');
            var threadString = "[url="+window.location+"][b]"+threadTitle+"[/b][/url]";
            return threadString;
        }
    }
    return "ERROR: Could not determine the thread name! :(";
}

function getThreadOP(){
    // Grab the user name and profile link from the first post. Coupled with my @exclude I know that this will only get the first post on the first page, hence OP.
    var authorArray = document.getElementsByClassName("post_author")[0].getElementsByClassName("largetext")[0];
    var authorProfile = authorArray.getElementsByTagName("a")[0];
    
    // For some reason trying to parse a staff member's name, I would constantly get fucked up by this strong tag. Don't need it for my purposes anyway.
    var authorName = authorProfile.innerHTML.replace("<strong>","");
    
    // Again, screw regex!
    authorName = authorName.replace(">","<").split("<");
    
    // Some tricksy stuff to grab the name from the middle of tags.
    authorName = authorName[Math.floor(authorName.length/2)];
    var authorString = "[url="+authorProfile+"]"+authorName+"[/url]";
    return authorString;
}

function generateCitation(){
    var citation = getThreadTitle()+" by "+getThreadOP();
    window.prompt("Press Ctrl+C to copy thread citation!",citation);
}

function main(){
    // This took me forever to figure out, turns out userscripts aren't directly injected into the site code so you need to use an event listener.
    document.getElementsByClassName('navigation')[0].innerHTML = document.getElementsByClassName('navigation')[0].innerHTML + '<small><a title="Cite this thread!" href="javascript:void(0);" id="citer">[cite]</a></small>';
    var elementLink = document.getElementById('citer');
    elementLink.addEventListener("click", generateCitation, true);
}

main(); // Dunno if I should be putting javascript in a main() function, but that's how I grew up with other languages so :P