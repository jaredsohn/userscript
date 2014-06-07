// ==UserScript==
// @name          Rllmuk search and replace
// @namespace     http://thedespinator.com/rllmuksearchreplace
// @description   Performs a bunch of search & replace operations on rllmuk posts
// @include       http://www.rllmukforum.com/*
// @include       http://www.rpsoft.co.uk/*
// @include       http://www.extranoise.co.uk/*
// @include       http://rllmukforum.com/*
// @include       http://rpsoft.co.uk/*
// @include       http://extranoise.co.uk/*
// ==/UserScript==

function regExRepl(str, pattern, replace)
{
    var regex = new RegExp(pattern, "g");
    return str.replace(regex, replace);
}

function wordRepl(str, word, replace)
{
    var pattern = "([^\\w])" + word + "(?!\\w)"
    var replPattern = "$1" + replace;
    var regex = new RegExp(pattern, "gi");
    return str.replace(regex, replPattern);
}

var allDivs = document.getElementsByTagName("DIV");
var id_regex = new RegExp('^post-[0-9]+$');

for (var i = 0; i < allDivs.length; i++)
{
    var thisDiv = allDivs.item(i);
    var divId = thisDiv.id;
    if(divId.match(id_regex))
    {
        var originalContent = thisDiv.innerHTML;
        var divContent = originalContent;

        // regular expression replacements
        divContent = divContent.replace(/ *Just( *?)((\.)+?)( *?)no\./g, ""); // Just... no.
        divContent = divContent.replace(/([WwCc]ould) of/g, "$1 have"); // would of / could of
        divContent = divContent.replace(/[Cc]ase in point/g, "example"); // I don't like "case in point"
        divContent = divContent.replace(/[Pp]re\-?order cancell?ed([\!\.])/g, "I am a moron$1"); // stupid in-joke, comedy effect
        divContent = divContent.replace(/([Ww])an\'t/g, "$1ant"); // wan't -> want
        divContent = divContent.replace(/([^\w])[Ii]([dm])(?!\w)/g, "$1I'$2"); // id, im -> I'd, I'm
        divContent = divContent.replace(/([^\w])(isn|wasn|weren|don|haven)t(?!\w)/g, "$1$2't"); // isnt, wasnt, etc have apostrophe
        divContent = divContent.replace(/([^\w])(is|was|were|do|have)'nt(?!\w)/g, "$1$2n't"); // isnt, wasnt, etc have apostrophe
        divContent = divContent.replace(/dnt(?!\w)/g, "dn't"); // didnt -> didn't
        divContent = divContent.replace(/d\'nt(?!\w)/g, "dn't"); // did'nt -> didn't
        divContent = divContent.replace(/([^\w])mr(s?)(?!\w)/g, "$1Mr$2"); // mr, mrs -> Mr and Mrs
        divContent = divContent.replace(/s ftw/gi, "s are great"); // stupid FTW (plural)
        divContent = divContent.replace(/ ftw/gi, " is great"); // stupid FTW (singular)
        divContent = divContent.replace(/(micro)\$(oft)/gi, "$1s$2"); // silly dollar signs
        divContent = divContent.replace(/ (but|and),/g, ", $1"); // comma after "but" or "and"
        divContent = divContent.replace(/,? ?fella([^\w])/g, "$1"); // BoyAtSea's "fella" tic
        divContent = divContent.replace(/\?+/g, "?"); // multiple question marks
        divContent = divContent.replace(/\!+/g, "!"); // multiple !
        divContent = divContent.replace(/\?(\?|!)+/g, "?"); // ?!!?!?!?
        divContent = divContent.replace(/\!(\?|!|1)+/g, "!"); // !!!?!?!?111

        // simple whole-word replacements
        divContent = wordRepl(divContent, "i(?!\\.\\w)", "I");
        divContent = wordRepl(divContent, "(i)nfact", "$2n fact");
        divContent = wordRepl(divContent, "(a)nymore", "$2ny more");
        divContent = wordRepl(divContent, "(t)hier", "$2heir");
        divContent = wordRepl(divContent, "(w)ierd", "$2eird");
        divContent = wordRepl(divContent, "(b)tw", "$2y the way");
        divContent = wordRepl(divContent, "(t)heres", "$2here's");
        divContent = wordRepl(divContent, "(t)eh", "$2he");
        divContent = wordRepl(divContent, "(d)efinately", "$2efinitely");
        divContent = wordRepl(divContent, "(c)ant", "$2an't");
        divContent = wordRepl(divContent, "(a)(re?)nt", "$2ren't");
        divContent = wordRepl(divContent, "\\.:::", "");

        // capitalise first letter of sentences
        var capsRegEx = ;

        if(divContent != originalContent)
        {
            thisDiv.innerHTML = divContent;
        }
    }
 }