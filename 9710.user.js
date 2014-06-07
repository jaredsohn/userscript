// ==UserScript==
// @name           Vibe me later
// @namespace      Aditya Mukherjee
// @description    Helps vote for stories on bVibes without having to go back to the story page
// @include        *
// @exclude        *bvibes.com*
// ==/UserScript==

function $(){
	return document.getElementById(arguments[0]);
}

function flash_button(){
    i=0;
    cancel = window.setInterval(function(){
        if($('vote_button_container').style.backgroundColor == 'black')
            $('vote_button_container').style.backgroundColor = 'yellow';
        else
            $('vote_button_container').style.backgroundColor = 'black';

        i++;
        if(i>5) window.clearInterval(cancel);
        }, 1000);
}


if(document.referrer.match(/bvibes.com/)){//if referring URL is a bVibes URL

window.addEventListener('load',function(){//anonymous function, onLoad handler for cleaner execution
	div = document.createElement('div');	
	div.setAttribute('style','position:fixed;bottom:0px; right:5px; padding:5px 0px 5px 5px; background: black; opacity: 0.90');
	div.id = 'vote_button_container';
	
	iframe = document.createElement('iframe'); //specifications for iFrame from (http://hackosphere.blogspot.com/2007/06/important-updates-about-bvibes.html)
	iframe.src = "http://bvibes.com/evb/evb.php?url="+window.location;
		iframe.setAttribute('height','80');
		iframe.setAttribute('width','60');
		iframe.setAttribute('scrolling','no');
		iframe.setAttribute('marginwidth','0');
		iframe.setAttribute('marginheight','0');
		iframe.setAttribute('frameborder','0');		
		iframe.setAttribute('hspace','0')
		iframe.setAttribute('vspace','0');
		
		div.appendChild(iframe);
		document.getElementsByTagName('body')[0].appendChild(div);
			window.setTimeout(flash_button, 3000);
}, true);
}//end of referrer check
	