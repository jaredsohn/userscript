// ==UserScript==
// @name           post preview
// @namespace      127.0.0.1
// @include        http://boards.adultswim.com/*
// ==/UserScript==

var css = "position:fixed; "
        + "z-index:9999; "
        + "display: none;"
        + "color: #ccc;"
        + "background:#000; "
        + "max-width: " + (window.innerWidth/2) + "px;"
        + "max-Height: " + (window.innerHeight-50) + "px;"
        + "border: 1px #808080 Dotted; "
        + "margin: 0; "
        + "padding: 5px; "
        + "overflow: disable;";
var display = document.createElement('div');
				display.setAttribute("style", css);
				document.body.appendChild(display);

var thread = document.getElementsByClassName("page-link");
for(x=0;x<thread.length;x++){
	thread[x].addEventListener('mouseover',function(){
            display.innerHTML = '<i>Loading...</i>';
            display.style.right = (window.innerWidth-display.offsetWidth)/2 + 'px';
            display.style.bottom = (window.innerHeight-display.offsetHeight)/2 + 'px';
			display.style.display = 'block';	
                
		GM_xmlhttpRequest({
			method: "GET",
			url: this.href,
			onload: function(page){
				var post = page.responseText;
				
                var post1 = post.split('<div class="lia-message-body-content">');
				var post2 = post1[1].split("</div>");
                var post3 = post2[0].split("<div style");
				display.innerHTML =  post3[0];
                display.style.right = (window.innerWidth-display.offsetWidth)/2 + 'px';
                display.style.bottom = (window.innerHeight-display.offsetHeight)/2 + 'px';
                
			}
			});
			
	},false);
		thread[x].addEventListener('mouseout',function(){
			display.style.display = 'none';
		},false);


}

