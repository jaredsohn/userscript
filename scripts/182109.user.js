// ==UserScript==
// @id             org.userscripts.users.Invicta.RealNiggasWelcome
// @name           Real Niggas Welcome
// @version        2013.11.6
// @author         Invicta
// @description    Replaces the normal logo with the "real niggas welcome" logo.
// @include        http*
// ==/UserScript==
var images = document.getElementsByTagName ("img");
var x=0;
while(x<images.length)
{
if(images[x].src == "http://x.hackforums.net/images/blackreign/logo.jpg")
{
images[x].src = "http://puu.sh/4Kmbi.jpg";
}
x=x+1;
}