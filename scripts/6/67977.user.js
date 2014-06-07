// ==UserScript==
// @name           AE Scout Here
// @namespace      http://www.gatevo.com/js/userscripts/ae_scout_here.user.js
// @include        http://*.astroempires.com/map.aspx*
// @include        http://*.astroempires.com/base.aspx*
// @include        http://*.astroempires.com/fleet.aspx?loc=*
// ==/UserScript==

var button = document.createElement('div');

var server = document.location.href.match(/http:\/\/(.*?).astroempires.com/);

server = server[1];

button.style.display = 'block';
button.style.position = 'absolute';
button.style.top = '333px';
button.style.left = '133px';
button.style.width = '80px';
button.style.height = '20px';
button.innerHTML = '<a id="scout_here" href="http://'+server+'.astroempires.com/fleet.aspx">Scout Here!</a>';



window.addEventListener('load',function(){
    
    var loc = '';
    if(document.location.href.match('http://'+server+'.astroempires.com/map.aspx')){
        var temp = document.location.href.split('=');
        
        loc = temp[1];
    } 
    if(document.location.href.match('http://'+server+'.astroempires.com/base.aspx')){
        var temp = document.getElementById('local-header_content').getElementsByTagName('a');
        
        var temp1 = temp[(temp.length-1)].href;
        
        temp1 = temp1.split('=');
        
        loc = temp1[1];
    }
    
    
    if(loc.length >= 12 && (!document.location.href.match('view='))){
        document.getElementById('background-content').appendChild(button);
        document.getElementById('scout_here').addEventListener('click',function(){
            GM_setValue('scout_loc',loc);
    },false);
    
       
    }
     var stored_loc = GM_getValue('scout_loc',false);
    
    if(stored_loc && document.location.href.match('http://'+server+'.astroempires.com/fleet.aspx') && document.location.href.match('view=move')){
        document.getElementById('destination').value = stored_loc;

        unsafeWindow.calc_distance();
        GM_setValue('scout_loc',false);
    }
    
    GM_log(GM_getValue('scout_loc',false));

}, false);