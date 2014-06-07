// ==UserScript==
// @name          		Usmieszki Fora.pl
// @namespace     	http://www.asperger.fora.pl/profile.php?mode=viewprofile&u=768
// @author			wazniak, oryginalna wersja death2y
// @description     	Zamienia MnM'sy na normalne usmieszki; na podstawie What.cd? Sexy Smileys
// @include      	 	http://*.fora.pl/*
// ==/UserScript==

(function () {

var images = document.getElementsByTagName("img");
for (var i=0;i<images.length;i++) {
    if (images[i].src.search(/smiles\/_smile.gif$/) != -1)
        images[i].src = "http://www.asperger.fora.pl/images/smiles/icon_smile.gif";
    else if (images[i].src.search(/smiles\/_wink.gif$/) != -1)
        images[i].src = "http://www.asperger.fora.pl/images/smiles/icon_wink.gif";
    else if (images[i].src.search(/smiles\/_D.gif$/) != -1)
        images[i].src = "http://www.asperger.fora.pl/images/smiles/icon_biggrin.gif";
    else if (images[i].src.search(/smiles\/_jezor.gif$/) != -1)
        images[i].src = "http://www.asperger.fora.pl/images/smiles/icon_razz.gif";
    else if (images[i].src.search(/smiles\/_wicked.gif$/) != -1)
        images[i].src = "http://www.asperger.fora.pl/images/smiles/icon_evil.gif";
}

}) ();

