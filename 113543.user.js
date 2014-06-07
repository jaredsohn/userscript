// ==UserScript==
// @name           AisO
// @namespace      AisO
// @description    Changes A's to O's on the LtUaE board 
// @include        http://www.gamefaqs.com/boards/402-life-the-universe-and-everything/*
// ==/UserScript==

var aRawPosts = document.getElementsByClassName("msg_body");

for (var i = 0; i < aRawPosts.length; i++ )
{
	var aPost = aRawPosts[i].innerHTML.replace(/<br>/g, " OisOnewline ").split(' ');
	var s = '';
	for (var j = 0 ; j < aPost.length; j++ )
	{
		if ( aPost[j].match(/^http.*?/) )
		{
			s += aPost[j] + ' ';
			continue;
		}
		aPost[j] = aPost[j].replace(/A/g, 'O');
		aPost[j] = aPost[j].replace(/a/g, 'o');
		s += aPost[j] + ' ';
	}
	aRawPosts[i].innerHTML = s.replace(/( OisOnewline )/g, "<br>");
}