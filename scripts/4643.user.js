// ==UserScript==
// @name          wgweasyreader_v2
// @namespace     http://www.codeandeffect.co.uk/greasemonkey
// @include       http://wgw.topmum.co.uk/forum/*
// @description   Removes sidebar, widens text area on this forum
// @exclude       http://wgw.topmum.co.uk/forum/profile.php*
 var wgwForumSidebar = document.getElementById('sidebar');
var toggleAsterisk = document.createElement('img');
toggleAsterisk.src = 'data:image/gif,GIF89a2%004%00%91%00%00%FC%FC%FC%00%00%00WWW%B0%B0%B0!%F9%04%00%00%00%00%00%2'+
'C%00%00%00%002%004%00%00%02%E7%8C%8F%A9%CB%ED%0F%A3%9C%B4%DA%8B%B3%DE%BC%FB%2C%00%A2%F0Y%E2YR%E1%09%0C%A'+
'9%B4%9E%E4%0B%0DlKG%F7%9C%3B%7B%FF%B0%A1hB%9EB%88c%C4%8C%3A%16%F3%10s-%90%22%D5%AD%F5%0C%C8%A6W%A9%E4%8A%3'+
'D%8E%C4%D7l%83%EAL%0C%A1%E8%EDD%D0%1EC%93%878%DD%0A%F6%DA%BC%F0%BC%F9%5Dv%000%13%23%F3w!P%E8%B2%97%C82%E0'+
'E%D3%07%16%06%94%D0V%A9t%03%89Yw%C5%C9%96G%99%F3%E8%18%B0%17%A0xh!%99f0hP8%A2%0A%11%EBfJW%2BW%C'+
'1%EAht%0A%DA5%8B%90%AB%EBZ5%3C%09%80%A7%B9%60%0B%3B)l%D06%F0%B4%A4%90%BB%F9%F0%C3%25%92-%7D%B3%EBly%E2'+
'%FD%7C%FC%02%FE%99%10%1B%9D%C2%AE%8E%80V%5E%F9%0E%FF%DDj%AF%C5%92%3FW%CC%FF%0F0%A0%C0%81%01%0B%00%00%3B';

var main2 = document.getElementById('main2');
var wgwForumSidebar2 = document.getElementById('sidebar2');
var wgwForumMain = document.getElementById('main');
var wgwForumMasthead = document.getElementById('masthead');
    
var btnDiv = document.createElement("div");
btnDiv.setAttribute("style", "border:0px solid red;float:right;");

var btn = document.createElement("a"); 
btn.setAttribute("href", "javascript:void(null);");


sidebarHidden = GM_getValue(sidebar);
//alert('sidebarHidden:'+sidebarHidden);
 
 btnDiv.setAttribute("title", "Toggle Easy Reader View");   
 
btn.addEventListener('click', function(event) {
    if (sidebarHidden) {
        show();
    }
    else    {
        hide();
    }
    
    event.stopPropagation();
    event.preventDefault();
}, true);
//Default Action
 

btn.appendChild(toggleAsterisk);
btnDiv.appendChild(btn);
    

    var parentDiv = main2.parentNode;
    parentDiv.insertBefore(btnDiv , main2);
    // document.getElementById('main').appendChild(toggleAsterisk);
    
 if (sidebarHidden) {
 hide();   
 }
    
    
function hide() {
   
        wgwForumSidebar2.style['display'] = 'none';
        wgwForumMain.style['width'] = '44em';
        wgwForumMasthead.style['height'] = '50px;';
        wgwForumMasthead.style['overflow'] = 'hidden';
        sidebarHidden = true;
        GM_setValue(sidebar, sidebarHidden);
      
}
function show() {
   
        wgwForumSidebar2.style['display'] = '';
        wgwForumMain.style['width'] = '410px';
        wgwForumMasthead.style['height'] = '211px';
        wgwForumMasthead.style['overflow'] = 'visible';
        sidebarHidden = false;
        GM_setValue(sidebar, sidebarHidden);
     
}    
function shift_right(findClass) {
var aElm=document.body.getElementsByTagName('*');
    for(var i=0; i<aElm.length; i++) {
        if(aElm[i].className==findClass) {
            aElm[i].style.cssFloat='right';
        }
    }
}
// ==/UserScript==