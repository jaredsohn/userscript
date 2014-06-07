// ==UserScript==
// @name           kraut_antiwortfilter
// @namespace      kraut
// @include        http://krautchan.net/b/*
// @version 2
// @grant none
// ==/UserScript==

var jQuery;
var kraut_removeWordfilter = function() {
    if((typeof jQuery === "undefined") || (typeof document.addSetting === "undefined")){
        window.setTimeout("kraut_removeWordfilter()", 50);
        return;
    }
    var removeWordfilter=function(input)
    {
        if(input==null)return "null";
        //idealerweise in der umgekehrten Reihenfolge wie auf Krautchan gefiltert wird
        return input.
            replace(/(Jassir Arafat|Annette von Droste-Hülshoff|Heinz Sielmann|Paul Breitner|Jodie Foster|Sexy Cora|Ludwig Boltzmann)/g, "<abbr title='$1'>Steve Krömer</abbr>").
            replace(/(Skeletor|Aquaman|Danger Mouse|Tank Girl|Morpheus|Professor X|Flash Gordon|Radioactive Man|Doctor Octopus)/g, "<abbr title='$1'>stevinho</abbr>").
            replace(/(P([^a-zA-Z<]*)e([^a-zA-Z<]*)s([^a-zA-Z<]*)t)/gi, "<abbr title='$1'>M$2a$3r$4a</abbr>").
            replace(/(Sören)/gi, "<abbr title='$1'>Kevin</abbr>").
            replace(/(Ansgar)/gi, "<abbr title='$1'>Justin</abbr>").
            replace(/(PENIS)/g, "<abbr title='$1'>xD</abbr>").
            replace(/(Vagina-Style)/g, "<abbr title='$1'>gnihihi</abbr>").
            replace(/(Dwight D.)/g, "<abbr title='$1'>Sascha</abbr>").
            replace(/(Eisenhower)/g, "<abbr title='$1'>Lobo</abbr>").
            replace(/(Liechtenstein)/g, "<abbr title='$1'>lachschon</abbr>").
            replace(/(Arbeitsamt)/g, "<abbr title='$1'>4fuckr</abbr>").
            replace(/(Lepra)/g, "<abbr title='$1'>Lena</abbr>").
            replace(/(Turing-vollständig)/g, "<abbr title='$1'>schwul</abbr>").
            replace(/(Süleyman der Prächtige)/g, "<abbr title='$1'>Sarrazin</abbr>").
            replace(/(Harkonnen)/g, "<abbr title='$1'>Guttenberg</abbr>").
            replace(/(harkonnen)/g, "<abbr title='$1'>guttenberg</abbr>").
            replace(/(Dissertation)/gi, "<abbr title='$1'>Kopierpaste</abbr>").
            replace(/(Thales von Milet)/g, "<abbr title='$1'>Enke</abbr>").
            replace(/(Arschbürger)/gi, "<abbr title='$1'>Asperger</abbr>").
            replace(/(Arschberger)/gi, "<abbr title='$1'>Asperger</abbr>").
            replace(/(Arschburger)/gi, "<abbr title='$1'>Asperger</abbr>").
            replace(/(Assburger)/gi, "<abbr title='$1'>Asperger</abbr>").
            replace(/(Ich lutsche übrigens gerne Schwänze)/g, "<abbr title='$1'>als ob</abbr>");
    }
    document.addSetting("removeWordfilter", true, "bool", "Wortfilter entfernen");
    if(document.getSetting("removeWordfilter", true) == true){
        jQuery('blockquote>p:not(.unfiltered)').each(function(){
            jQuery(this).html(removeWordfilter(jQuery(this).html()));
        }).addClass('unfiltered');
    }
}
script=document.createElement("script");
script.textContent="kraut_removeWordfilter = "+kraut_removeWordfilter.toString()+";kraut_removeWordfilter();"
document.body.appendChild(script);
