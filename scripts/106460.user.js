// ==UserScript==
// @name          iFans Read More Expand.
// @namespace     127.0.0.1
// @description	  Allow iFans' read more button to simply expand and show the text, instead of leading you to a blog post.
// @include       http://*.ifans.com/*
// @include       http://www.ifans.com/*
// @include       http://ifans.com/*
// @exclude       http://ifans.com/forums
// @exclude       http://www.ifans.com/forums
// ==/UserScript==
if (location.href.indexOf('forum') == -1) {
	old = '';
		function index() {
			id = '';
			link = '';
			if (typeof (readMore) == "array") {
				for (i = 0; i < readMore.length; i++) {
					readMore[i] = ''
				}
			} 
			else
            readMore = new Array();
			a = document.getElementsByTagName('a');
			for (i = 0; i < a.length; i++) {
				if (a[i].innerHTML.toLowerCase().match('read more') != null) {
					readMore.push(a[i]);
				}
			}
			for (i = 0; i < readMore.length; i++) {
				readMore[i].onclick = function() {
					callLoad(this, this.href);
					return false;
				}
			}
		}
    index();
	
	function readLess(id){
		console.log(document.getElementById(id))
	}
	
    function callLoad(that, lin) {
        if (that.className.indexOf('more-link') == -1) { 
            id = that.parentNode.parentNode.parentNode.parentNode.id;
        } 
        else
            id = that.parentNode.parentNode.parentNode.id 
			link = lin
			console.log('stored');
    }
    
    
    document.getElementById('header2').innerHTML+='<input type=checkbox id="auto" onclick="localStorage.auto = this.checked.toString()";> Auto Expand';
    
    document.body.onclick = function() {
        console.log('click');
        loadMore(id, link)
    }
    document.body.onload=function() {
    	if(localStorage.auto == 'true')document.getElementById('auto').checked=true;
    }

    function loadMore(id, link, auto) {
    	which = -1;
        old = document.getElementById(id).innerHTML;
        ajax = new XMLHttpRequest();
        ajax.open('GET', link, true); 
        ajax.send(null);
        ajax.onreadystatechange = function() 
        {
            if (ajax.readyState == 4 && ajax.status == 200) 
            {
                page = document.body.innerHTML;
                document.body.innerHTML += "<span style='display:none'>" + ajax.responseText + "</span>";
                fullRead = document.getElementById(id.replace('id', '-')).parentNode.innerHTML; 
                document.body.innerHTML = page;
                document.getElementById(id).innerHTML = fullRead + '<p align="right"><a onclick=document.getElementById("'+id+'").innerHTML=unescape("'+escape(old)+'")> Read Less </a>';
                index();
            
            }
        }
    }
    
    function autoLoad(a) 
    {
        if (a == 1)
            i = 0;
			id='';
			link='';
			callLoad(readMore[i], readMore[i].href);
			which = -1;
			old = document.getElementById(id).innerHTML;
			ajax = new XMLHttpRequest();
			ajax.open('GET', link, true);
			ajax.send(null);
			ajax.onreadystatechange = function() 
			{
				if (ajax.readyState == 4 && ajax.status == 200) 
				{
					page = document.body.innerHTML;
					document.body.innerHTML += "<span style='display:none'>" + ajax.responseText + "</span>";
					fullRead = document.getElementById(id.replace('id', '-')).parentNode.innerHTML;
					document.body.innerHTML = page;
					document.getElementById(id).innerHTML = fullRead + '<p align="right"><a onclick=document.getElementById("'+id+'").innerHTML=unescape("'+escape(old)+'")> Read Less </a>';
					if (i < readMore.length) {
						i++;
						autoLoad(2)
					}
				}
			}
	}
    
    if (localStorage.auto == 'true') {
        autoLoad(1)
    }
}