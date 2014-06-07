// ==UserScript==
// @name           FB Decline All Games
// @include        *facebook*game*
// @version                1.0
// ==/UserScript==
for (i=0;i<=document.getElementsByName("actions[reject]").length;i++)
{
if (document.getElementsByName("actions[reject]")[i].getAttribute("value").indexOf("all request")<0){
document.getElementsByName("actions[reject]")[i].click();
}
}