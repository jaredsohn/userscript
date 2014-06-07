// ==UserScript==
// @name          NYTimes.com Interstitial Ad Jumper
// @namespace     none
// @description   Jumps NYT Interstitial Ads directly
// @include       *nytimes.com*
// ==/UserScript==

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
