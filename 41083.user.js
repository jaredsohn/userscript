// ==UserScript==
// @name Tab-a-post
// @description tabs a post
// @include http://forums.somethingawful.com/showthread.php?*
// @include http://forum.somethingawful.com/showthread.php?*
// ==/UserScript==

// you can change your stylesheet if you real gay or somethin
document.body.innerHTML += "<style type='text/css'> \
.tap_box { border: thin solid black } \
.tap_tabs { float: left; width: 100%; border-bottom: thin solid black; background-color: black } \
.tap_tab { margin: 0.5em } \
.tap_tab:hover { background-color: white } \
.tap_tab a { color: white; text-decoration: underline } \
.tap_tab a:hover { color: black } \
</style>";

var TAP_REGEX = /%%TAP({[^}]*})/;

var posts = document.getElementsByClassName('postbody');
for(var p = 0; p < posts.length; p++)
{
	var match = TAP_REGEX.exec(posts[p].innerHTML);
	
	// loop to support multiple TAPs in one post
	while(match)
	{
		var tapid = Math.random();
		
		// I stole this shit from the RFC, I dunno what its even checking for
		var tabs = !(/[^,:{}\[\]0-9.\-+Eaeflnr-u \n\r\t]/.test(match[1].replace(/"(\\.|[^"\\])*"/g, ''))) && eval('(' + match[1] + ')');
		if(!tabs)
		{
			posts[p].innerHTML = posts[p].innerHTML.replace(TAP_REGEX, "<blink><b style='color: red'>HACKALERT</b>: <marquee>YOU BEEN HACKED FYI</marquee></blink>");
		}
		else
		{
			var html = "<div class='tap_box'>";
			html += "<span class='tap_tabs'>";
			for ( tab in tabs )
			{
				html += "<span class='tap_tab'><a onclick='javascript:document.getElementById(\"tp" + tapid + "\").innerHTML = \""
+ tabs[tab].replace('\'', "&apos;", 'g').replace('"', '\\"', 'g') + "\";'>";
				html += tab;
				html += "</a></span>";
			}
			html += "</span><div class='tap_post' id='tp" + tapid + "'>choose your destiny...</div>";
			html += "</div>";
			posts[p].innerHTML = posts[p].innerHTML.replace(TAP_REGEX, html);
		}
		
		match = TAP_REGEX.exec(posts[p].innerHTML);
	}
}