// ==UserScript==
// @name           Beon fast friend ajaxed
// @namespace      *
// @include        http://beon.ru/online/    
// @description    Add friends with one click
// ==/UserScript==

var loading=document.createElement("img");
loading.src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///zg4OM/Pz2trazg4OISEhJ2dnampqSH/C05FVFNDQVBFMi4wAwEAAAAh/h1CdWlsdCB3aXRoIEdJRiBNb3ZpZSBHZWFyIDQuMAAh/hVNYWRlIGJ5IEFqYXhMb2FkLmluZm8AIfkECQoAAAAsAAAAABAAEAAAAzMIutz+MMpJaxNjCDoIGZwHTphmCUWxMcK6FJnBti5gxMJx0C1bGDndpgc5GAwHSmvnSAAAIfkECQoAAAAsAAAAABAAEAAAAzQIutz+TowhIBuEDLuw5opEcUJRVGAxGSBgTEVbGqh8HLV13+1hGAeAINcY4oZDGbIlJCoSACH5BAkKAAAALAAAAAAQABAAAAM2CLoyIyvKQciQzJRWLwaFYxwO9BlO8UlCYZircBzwCsyzvRzGqCsCWe0X/AGDww8yqWQan78EACH5BAkKAAAALAAAAAAQABAAAAMzCLpiJSvKMoaR7JxWX4WLpgmFIQwEMUSHYRwRqkaCsNEfA2JSXfM9HzA4LBqPyKRyOUwAACH5BAkKAAAALAAAAAAQABAAAAMyCLpyJytK52QU8BjzTIEMJnbDYFxiVJSFhLkeaFlCKc/KQBADHuk8H8MmLBqPyKRSkgAAIfkECQoAAAAsAAAAABAAEAAAAzMIuiDCkDkX43TnvNqeMBnHHOAhLkK2ncpXrKIxDAYLFHNhu7A195UBgTCwCYm7n20pSgAAIfkECQoAAAAsAAAAABAAEAAAAzIIutz+8AkR2ZxVXZoB7tpxcJVgiN1hnN00loVBRsUwFJBgm7YBDQTCQBCbMYDC1s6RAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P4wykmrZULUnCnXHggIwyCOx3EOBDEwqcqwrlAYwmEYB1bapQIgdWIYgp5bEZAAADsAAAAAAAAAAAA=";
var req=0;
var reqa=0;


function friend_add(e){
	if(req){
		window.setTimeout(function(){friend_add(e)},300);
	}
	else{
		link=e.target;
		link.parentNode.appendChild(loading);
		
		req=1;
		r=new XMLHttpRequest();
		
		r.open("GET",link.href,true);
		r.setRequestHeader("Referer", window.location);
		r.send('');
		
		r.onreadystatechange = function(){
			if(r.readyState==4){
				link.parentNode.removeChild(link.parentNode.lastChild);
				req=0;
			}
		};
	}
	e.preventDefault();
	return false;
}

function init() 
{
		var all = document.getElementsByTagName('a')
		for (var i = 0, o; o = all[i]; i++) {
			var username = o.href.match("http:\/\/(.*?)\.beon\.ru");
			if(username){
				o.href='http://beon.ru/p/request_for_friendship.cgi?login='+username[1];
				o.style.color='green';
				o.addEventListener("click",friend_add,false);
			}
		}
}
init();
