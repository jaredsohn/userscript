// ==UserScript==
// @name        Tweakblogs filter
// @namespace   net.weejewel.doeimetdienaretweakblogs
// @include     *tweakers.net*
// @version     1
// @grant       GM_setValue
// @grant       GM_getValue
// @grant       GM_deleteValue
// ==/UserScript==
console.log("WeeJeWel's Tweakblogs filter geladen!");

var blacklist;

var runBlacklist = function(){
    
    blacklist = GM_getValue("blacklist");
    
//      alert(typeof blacklist);
    
    if(typeof blacklist == 'undefined') {
        blacklist = [];   
    } else {
       blacklist = blacklist.split(',');    
    }
    
    var links = document.querySelectorAll('#tracker-weblogs li a:not(.blacklist_done)');

    for( var i = 0; i < links.length; i++ ) {
       var author = getAuthorFromUri( links[i].href );
       
       for( var j = 0; j < blacklist.length; j++ ) {
           if( blacklist[j] == author ) {
               links[i].parentNode.remove();
           }
       }
        
       // add blacklist button per link
       var blacklist_link = document.createElement('span');
        blacklist_link.className = 'blacklist_link';
        blacklist_link.innerHTML = '[x] ';
        blacklist_link.title = 'Blog toevoegen aan je blacklist';
        blacklist_link.style.display = 'none';
        blacklist_link.style.cursor = 'pointer';
        blacklist_link.style.position = 'absolute';
        blacklist_link.style.zIndex = '10';
        blacklist_link.style.right = '10px';
        blacklist_link.style.backgroundColor = '#313232';
        
        blacklist_link.onclick = function(){ 
           var author = getAuthorFromUri( this.parentNode.querySelector('a').href );
            
           if( confirm( '`' + author + '` toevoegen aan je blacklist?') ) {
              addToBlacklist( author );
           }
           return false;
        }
        links[i].parentNode.onmouseover = function(){
           var blacklist_link = this.querySelector('.blacklist_link');
            blacklist_link.style.display = 'block'; 
        }
        links[i].parentNode.onmouseout = function(){
           var blacklist_link = this.querySelector('.blacklist_link');
           blacklist_link.style.display = 'none';
        }
        blacklist_link.onmouseover = function(){
           this.style.color = 'red';
        }
        blacklist_link.onmouseout = function(){
           this.style.color = 'inherit';
        }
        
        links[i].parentNode.insertBefore(blacklist_link, links[i]);
    
        
        // set 'done' flag
        links[i].className = links[i].className + ' blacklist_done';
        
    }
    
    // add blacklist reset button        
    if( blacklist.length > 0 ) {
        if( document.querySelector('.blacklist_reset') === null ) {
            var blacklist_reset = document.createElement('span');
            blacklist_reset.className = 'blacklist_reset';
            blacklist_reset.innerHTML = 'Leeg blacklist';
            blacklist_reset.style.cssFloat = 'right';
            blacklist_reset.style.cursor = 'pointer';
            blacklist_reset.style.fontWeight = 'normal';
            blacklist_reset.style.opacity = '0.25';
            blacklist_reset.style.float = 'right';
            blacklist_reset.onmouseover = function(){
                this.style.opacity = 1.0;  
                this.style.color = 'red';
            }
            blacklist_reset.onmouseout = function(){
                this.style.opacity = 0.25;  
                this.style.color = 'inherit';    
            }
            blacklist_reset.onclick = function(){
                
                if( confirm('Weet je zeker dat je je blacklist wil legen?' + "\n" + 'Op dit moment worden de volgende blogs gefiltert: ' + "\n\n" + blacklist.join("\n")) ) {
                    GM_deleteValue("blacklist");
                    blacklist = [];
                    alert("Blacklist is geleegd! Bij het herladen zie je alles weer.");
                }
            }
            
            document.querySelector('#tracker-weblogs h4').appendChild(blacklist_reset);
        }
    }
}

var addToBlacklist = function( author ){
    blacklist.push( author );
    GM_setValue("blacklist", blacklist.join(',') );
    alert('`' + author + '` is toegevoegd aan je blacklist!');
}
    
var getAuthorFromUri = function( uri ) {
    author = uri;
    author = author.replace('http://', '');
    author = author.replace('https://', '');
    author = author.split('.');
    author = author[0]; 
    return author;
}

window.onload = function() {
    setInterval(runBlacklist, 1000);   
    runBlacklist();
}