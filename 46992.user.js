// ==UserScript==
// @name          Between2
// @description   Between2
// @author        baabthe
// @include       http://apps.facebook.com/bestwedding/challenge*
// @include       http://apps.facebook.com/coolcat/challenge*
// @include       http://apps.facebook.com/top_dog/challenge*
// @include       http://apps.facebook.com/cutestbaby/challenge*
// ==/UserScript==

for(i=0; i < document.getElementsByTagName('a').length; i++)
{
if(document.getElementsByTagName('a')[i].href.match("cast_"))
{
document.location = document.getElementsByTagName('a')[i].href;
break;
}
}



//thanks to mutants_r_us_guild for turning my idea into reality