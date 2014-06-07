// ==UserScript==
// @name           tromaktiko show full article
// @namespace      http://mike.thedt.net
// @description    Shows the full article in the same page when clicking "Read more" on tromaktiko so that you don't have to navigate away from the main page.
// @include        http://tro-ma-ktiko.blogspot.com/*
// @version        1.0
// ==/UserScript==

function linkClicked(event)
{
	event.preventDefault();
	this.blur();
	this.innerHTML='<img src="data:image/png;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH+GkNyZWF0ZWQgd2l0aCBhamF4bG9hZC5pbmZvACH5BAAKAAAAIf8LTkVUU0NBUEUyLjADAQAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQACgABACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkEAAoAAgAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkEAAoAAwAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkEAAoABAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQACgAFACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQACgAGACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAAKAAcALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" alt="Loading..."/>'
	var thelink = this;
	GM_xmlhttpRequest
	({
		method: 'GET',
		url: this.href,
		onload: function(responseDetails) {
			post = responseDetails.responseText.match(/<div class='post-body entry-content'>([\s\S]*?)<\/div>([\s\S]*?)<\/div>/);
			thelink.style.display="none";
			document.getElementsByClassName("post-body entry-content")[thelink.id].innerHTML=post[1]+"</div>"+post[2];
			document.getElementsByClassName("separator")[thelink.id].style.textAlign="left";
		}
	});
}

var posts=document.getElementsByClassName("post hentry");
GM_log(posts.length);
for (var i=0; i<posts.length; i++)
{
	var links=posts[i].getElementsByTagName("a");
	for (var j=0; j<links.length; j++)
	{
		if (links[j].innerHTML=="Διαβάστε περισσότερα »")
		{
			GM_log("aa");
			links[j].id = i;
			links[j].addEventListener("click", linkClicked, false);
			break;
		}
	}
}