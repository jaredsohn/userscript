// ==UserScript==
// @name           NYT Ultra-Cleanup
// @namespace      http://www.gabrielroth.com
// @description    Removes peripheral content from NYT story pages
// @include        http://nytimes.com/*
// @include        http://*.nytimes.com/*
// ==/UserScript==


// ** AD JUMPER -- removes interstitial ads
if(/NY Times Advertisement/.test(document.title)
|| /^The New York Times$/.test(document.title) )
{
        var Metas  = document.getElementsByTagName('meta');
        var redirect;
        for (var i = 0; i < Metas.length; i++) {
                if(/refresh/.test(Metas[i].getAttributeNode("http-equiv").nodeValue)){
                        redirect = Metas[i].getAttributeNode("content").nodeValue;
                        break;
                }
        }
        window.location.href = redirect.replace(/^\d+;url=/,"http://nytimes.com/");
}
else if (/Slide Show/.test(document.title)){
    var proceed = 0;
    var imgs = document.getElementsByTagName('img');
    for(var i = 0; i < imgs.length; i++){
        var src= imgs[i].getAttributeNode("src").nodeValue;
        if(/mm_skip_ad/.test(src)){
            proceed = 1;
            break;
        }
    }
    if(proceed){
            var links  = document.getElementsByTagName('a');
            for (var i = 0; i < links.length; i++) {
                    var link =  links[i].getAttributeNode("href").nodeValue;
                    if(/_1\.html/.test(link)){
                            if(!/http/.test(link)){
                                    var newurl = "http://www.nytimes.com" + links[i].getAttributeNode("href").nodeValue;
                                    window.location.href = newurl;
                            }
                            else{
                                    window.location.href = link;
                            }
                    }
            }
    }
}


// add jQuery
    var GM_JQ = document.createElement('script');
    GM_JQ.src = 'http://jquery.com/src/jquery-latest.js';
    GM_JQ.type = 'text/javascript';
    document.getElementsByTagName('head')[0].appendChild(GM_JQ);

// check if jQuery is loaded
    function GM_wait() {
        if(typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(GM_wait,100); }
    else { $ = unsafeWindow.jQuery; letsJQuery(); }
    }
    GM_wait();

// all GreaseMonkey code goes inside this function
    function letsJQuery() {
// remove the <a> tags from links in text
		$('#articleBody p').each(function() {
			$(this).html(
				$(this).html().replace(/<a\shref="http:\/\/topics.+?>/gi,"")
			); // end html
		}); // end each

// remove all the non-story material on article pages.
		$('.printInfo').remove();
		$('#articleExtras').remove();
		$('#insideNYTimesHeader').remove();
		$('#insideNYTimesBrowser').remove();
		$('.nextArticleLink').remove();
		$('#bColumn').remove();
		$('.tabs').remove();
		$('#memberTools').remove();
		$('.toolsContainer').remove();
		$('#inlineBox').remove();
		$('.inlineVideo').remove();
		$('#subnavUS > li').remove();
		$('#cCol').remove();
		$('#subnavOpinion').remove();
		$('#respond').remove();
		$('#content > .nav').remove();
		$('.entry-meta').remove();
		$('#nytSearchWidget').remove();
		$('#footer').remove();
		$('#readerscomment').remove();
		$('div[id$=SearchBar]').remove();
		$('#comments').remove();
		$('.subNavigation').remove();
		$('#politicsNavBar').remove();
		$('.articleTools').remove();





    }	// end letsJQuery