// ==UserScript==
// @name           FP Ratings Changer
// @namespace      Facepunch
// @include        http://www.facepunch.com/threads/*
// ==/UserScript==

(function() {

function Emote(e)
{
    return "http://imgkk.com/i/" + e;
}

function AltRating(rating)
{
    switch(rating)
    {
        case "moustache":
            return Emote("728r.png");
        default:
            return null;
    }
}

function main()
{
    var imagelist = document.getElementsByTagName("img");
    var rpref = "http://www.facepunch.com/fp/ratings/";
    
    for(var i=0;i<imagelist.length;i++)
    {
        var img = imagelist[i];
        
        if (img.src.substr(0, rpref.length) == rpref)
        {
            var rating = AltRating(img.src.substr(rpref.length, img.src.length-rpref.length-4));
            
            if (rating != null)
                img.src = rating;
        }
    }
}

main();

})();