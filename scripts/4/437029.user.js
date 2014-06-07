// ==UserScript==
// @name        Playfire Rewards Enhanced
// @namespace   https://twitter.com/mckack
// @description Adds some handy functionality to Playfire Rewards lists on the Playfire blog
// @include     http://blog.playfire.com/*
// @match       http://blog.playfire.com/*
// @version     1.0.4
// ==/UserScript==

// Function - Convert to simple names
function simplename(foo) {
    // Strip away encoded URL characters
    foo = foo.replace(/%\d{2}/ig, '');
    
    // If an achievement
    if (foo.indexOf('+achievement') > -1){
        bar = foo.replace(/.*q=(.*?)\+achievement.*/ig, '$1');
    // If play for first time
    } else {
        bar = foo.replace(/.*>(.*)<\/a>.*/ig, '$1playfirst');
    }
    return bar.toLowerCase().replace(/[^\w]/ig, '');
}

// Function - Make search friendly
function searchfriendly(foo) {
    bar = foo.replace(/%\d{2}/ig, ' ');
    //bar = foo.replace(/.*q=(.*?)\+achievement.*/ig, '$1');
    return bar.replace(/[^\w\s+%]/ig, '');
}

// Function - Add custom CSS
function addCSS(foo) {
    var style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = foo;
    document.getElementsByTagName('head')[0].appendChild(style);
}

// Function - Change style based on check state and save it
function checkstyle() {
    if (this.checked === true) {
        this.parentNode.className = 'rewardoff';
        window.localStorage.setItem(this.id, 'off');
    } else {
        this.parentNode.className = 'rewardon';
        window.localStorage.setItem(this.id, 'on');
    }
}

// Function - Show tooltip
//function showtooltip() {
//    document.body.getElementById('pftooltip').setAttribute('style','top: '+(mouse.y-48)+'px; left: '+(mouse.x+16)+'px; display: block; opacity: 1.0;');
//}

// Function - Hide tooltip
//function hidetooltip() {
//    document.body.getElementById('pftooltip').setAttribute('style','top: '+(mouse.y-48)+'px; left: '+(mouse.x+16)+'px; display: none; opacity: 0.0;');
//}

// Variables
var posttitle = document.body.querySelector('.post-title').innerText;
var isposturl = new RegExp('.*blog.playfire.com/\\d{4}/\\d{2}/.*').test(document.URL);
var isspecial = new RegExp('.*\\sspecial$','i').test(posttitle);

var postgame = '';
var gameid = '';
if (isspecial){ postgame = posttitle.replace(/.*-\s(.*)\sspecial/i, '$1'); gameid = simplename(postgame);}
var mouse = {x: 0, y: 0};

document.addEventListener('mousemove', function(e){ 
    mouse.x = e.clientX+document.body.scrollLeft || e.pageX; 
    mouse.y = e.clientY+document.body.scrollTop || e.pageY; 
}, false);

// If a reward post
if ((isposturl) && (posttitle.toLowerCase().indexOf('rewards') > -1)){

    // Add custom CSS
    addCSS('.rewardon { opacity: 1; transition:all .25s; } .rewardoff { opacity: 0.35; transition:all .25s; } .rewardcheck { position: relative; top: 0.1em; } .post-body li { list-style-type: none; } #pftooltip { background-color: #fff; border: 2px solid #ccc; border-radius: 10px 10px 10px 0px; padding: 5px; position: absolute; z-index:1000; }');

    // Add empty tooltip DIV for later use
    //var tooltip = document.createElement('div');
    //tooltip.id = 'pftooltip';
    //tooltip.style.cssText = 'top: 0; left: 0; display: none; opacity: 0.0;';
    //tooltip.innerHTML = 'Tooltip';
    //document.body.appendChild(tooltip); 

    // Process lists
    var ulist = document.body.getElementsByTagName('ul');

    for (var i = 0; i < ulist.length; i++) {

    }

    // Process list items
    var list = document.body.getElementsByTagName('li');
    console.log('List length: ' + list.length);

    for (var i = 0; i < list.length; i++) {

        // Play for the first time
        if (list[i].innerText.toLowerCase().indexOf('play for the first time') > -1) {
      
            // Regular
            list[i].innerHTML = list[i].innerHTML.replace(/<b>(.*?)(<\/b>.*play\sfor\sthe\sfirst\stime.*)/i,'<input type="checkbox" name="pfirst" value="" class="rewardcheck" /><b><a href="http://www.greenmangaming.com/search/?q=$1&gmgr=jelexavo" alt="Find $1 on Green Man Gaming" title="Find $1 on Green Man Gaming" target="_blank">$1</a>$2');
            
            // Special post with unusual list format
            list[i].innerHTML = list[i].innerHTML.replace(/^play\sfor\sthe\sfirst\stime(.*)/i,'<input type="checkbox" name="pfirst" value="" class="rewardcheck" /><b><a href="http://www.greenmangaming.com/search/?q=' + postgame + '&gmgr=jelexavo" alt="Find ' + postgame + ' on Green Man Gaming" title="Find ' + postgame + ' on Green Man Gaming" target="_blank">' + postgame + '</a></b> - play for the first time$1');
        }

        // Achievement unlock
        if (list[i].innerText.toLowerCase().indexOf('unlock') > -1) {
            
            var xlnk = 'iVBORw0KGgoAAAANSUhEUgAAAAkAAAAJCAYAAADgkQYQAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAFZJREFUeNpi/P//PwM6OHHiBIogIzZF6IpZ0HVZWFgwwhSA2CCaBVkCKskPpB4iizEcP378P8hKEAay+YH4A4wPwyiKkDGyOBMDEYAoRSzYwgUdAAQYAP8bVoFHLptvAAAAAElFTkSuQmCC';
            
            // Regular
            list[i].innerHTML = list[i].innerHTML.replace(/.*<b>(.*?)(<\/b>.*?<b>)(.*?)<\/b>(.*)/i,'<input type="checkbox" name="unlock" value="" class="rewardcheck" /><b><a href="http://www.greenmangaming.com/search/?q=$1&gmgr=jelexavo" alt="Find $1 on Green Man Gaming" title="Find $1 on Green Man Gaming" target="_blank">$1</a>$2<a href="https://www.google.com/search?q=$1+%22$3%22+achievement" target="_blank" alt="Search for solution to: $3" title="Search for solution to: $3" class="achlink">$3</a></b> <img alt="" src="data:image/png;base64,'+ xlnk +'" style="border:none; padding:0; margin:0;"/>$4');
            
            // Special post with unusual list format
            list[i].innerHTML = list[i].innerHTML.replace(/^unlock\s<b>(.*?)<\/b>(.*)/i,'<input type="checkbox" name="unlock" value="" class="rewardcheck" /><b><a href="http://www.greenmangaming.com/search/?q=' + postgame + '&gmgr=jelexavo" alt="Find ' + postgame + ' on Green Man Gaming" title="Find ' + postgame + ' on Green Man Gaming" target="_blank">' + postgame + '</a></b> - unlock <b><a href="https://www.google.com/search?q=' + postgame + '+%22$1%22+achievement" target="_blank" alt="Search for solution to: $1" title="Search for solution to: $1" class="achlink">$1</a></b> <img alt="" src="data:image/png;base64,'+ xlnk +'" style="border:none; padding:0; margin:0;"/>$2');
            
        }
    }

    // Assign onchange event and load previously saved states to checkmarks
    var checkmark = document.body.querySelectorAll('.rewardcheck');

    for (var i = 0; i < checkmark.length; i++) {
      checkmark[i].id = simplename(checkmark[i].parentNode.innerHTML);
      checkmark[i].onchange = checkstyle;

      if (window.localStorage.getItem(checkmark[i].id) == 'off'){
        checkmark[i].parentNode.className = 'rewardoff';
        checkmark[i].checked = true;
      }
    }

    // Assign onmouseover/onmouseout event and for achievements
    //var alist = document.querySelectorAll('.achlink');

    //for (var i = 0; i < alist.length; i++) {
    //  alist[i].onmouseover = showtooltip;
    //  alist[i].onmouseout = hidetooltip;
    //};

}