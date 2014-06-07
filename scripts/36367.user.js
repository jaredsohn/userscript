		// ==UserScript==
                // @name        Wakabayoutube for wakaba-based imageboards
// @include http://www.2-ch.ru/*
// @include http://2-ch.ru/*
// @include http://www.desuchan.net/*
// @include http://desuchan.net/*
// @include https://www.desuchan.net/*
// @include https://desuchan.net/*
// @include http://*.420chan.org/*
// @include http://www.not420chan.com/*
// @include http://iichan.net/*
// @include http://*.iichan.net/*
// @include http://iichan.ru/*
// @include http://*.iichan.ru/*
// @include http://*.wakachan.org/*
// @include http://wakachan.org/*
// @include http://*.iiichan.net/*
// @include http://iiichan.net/*
// @include http://secchan.net/*
// @include http://*.secchan.net/*
// @include http://www.pooshlmer.com/wakaba/*
// @include http://pooshlmer.com/wakaba/*
// @include http://2ch.ru/*
// @include http://*.2ch.ru/*
// @include http://*.teamtao.com/*
// @include http://teamtao.com/*
// @include http://shanachan.*/*
// @include http://*.deadgods.net/*
// @include http://deadgods.net/*
// @include http://*.chiyochan.net/*
// @include http://chiyochan.net/*
// @include http://1chan.net/*
// @include http://*.1chan.net/*
// @include http://chupatz.com/*
// @include http://*.chupatz.com/*
// @include http://liarpedia.org/dorifuto/*
// @include http://*.koichan.net/*
// @include http://koichan.net/*
// @include http://raki-suta.com/*
// @include http://*.raki-suta.com/*
// @include http://img.7clams.org/*
// @include http://bokuchan.org/*
// @include http://www.bokuchan.org/*
// @include http://*.gurochan.net/*
// @include http://www.gurochan.net/*
// @include http://server50734.uk2net.com/*
// @include http://www.deltaxxiv.org/*
// @include http://voile.gensokyo.org/*                
// @description  Add's youtube player directly to the post, containing the link to youtube.com
		// ==/UserScript==
		re=/.*?youtube.com\/watch\?v=([\w_\-]*).*/i;
		i=-1;
		while(tab=document.getElementsByTagName('a')[++i])
		if(tab.innerHTML.match(re))	{
		tab.innerHTML=tab.innerHTML.replace(re,'<object width="320" height="262"><param name="movie" value="http://www.youtube.com/v/'+"$1"+'"></param><param name="wmode" value="transparent"></param><embed src="http://www.youtube.com/v/'+"$1"+'" type="application/x-shockwave-flash" wmode="transparent" width="320" height="262"></embed></object><br />'+tab.innerHTML);
		//tab.innerHTML=tab.innerHTML.replace(re,"$0");
		//alert(tab.innerHTML);
		
		}
