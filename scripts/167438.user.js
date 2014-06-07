// ==UserScript==
// @name           Funnyjunk Anti Smiley
// @description    Replace emoticons on Funnyjunk with the text variants.
// @author         posttwo <http://www.funnyjunk.com/user/posttwo> (Post15951 <http://userscripts.org/users/512342>)
// @author         irvea <http://www.funnyjunk.com/user/irvea> (1RV34 <http://userscripts.org/users/517347>)
// @include        http://funnyjunk.com/*
// @include        http://www.funnyjunk.com/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js
// @version        3
// @updateURL      http://userscripts.org/scripts/source/167438.user.js
// ==/UserScript==
 
$(document).ready(function ()
{
        setTimeout(bigFatPosttwo, 2500);
        remove_smiles();
});
 
function bigFatPosttwo()
{
        var originalFn = unsafeWindow.refreshCollapsibleComments;
 
        unsafeWindow.refreshCollapsibleComments = function ()
        {
                originalFn(); // call the original function
                remove_smiles();
        };
}
 
function remove_smiles()
{
        $("span[class='emoticon emoticon-angry']").replaceWith("<span>:angry:</span>");
        $("span[class='emoticon emoticon-arrogant']").replaceWith("<span>:arrogant:</span>");
        $("span[class='emoticon emoticon-at-wits-end']").replaceWith("<span>:at-wits-end:</span>");
        $("span[class='emoticon emoticon-big_grin']").replaceWith("<span>:D</span>");
        $("span[class='emoticon emoticon-blushing']").replaceWith("<span>:$</span>");
        $("span[class='emoticon emoticon-broken_heart']").replaceWith("<span>&lt;/3</span>");
        $("span[class='emoticon emoticon-bulgy-eyes']").replaceWith("<span>:bulgy-eyes:</span>");
        $("span[class='emoticon emoticon-clap']").replaceWith("<span>:clap:</span>");
        $("span[class='emoticon emoticon-confused']").replaceWith("<span>:S</span>");
        $("span[class='emoticon emoticon-curse']").replaceWith("<span>:curse:</span>");
        $("span[class='emoticon emoticon-disappointed']").replaceWith("<span>:disappointed:</span>");
        $("span[class='emoticon emoticon-freaked-out']").replaceWith("<span>:freaked-out:</span>");
        $("span[class='emoticon emoticon-kiss']").replaceWith("<span>:*</span>");
        $("span[class='emoticon emoticon-love']").replaceWith("<span>&lt;3</span>");
        $("span[class='emoticon emoticon-pissed-off']").replaceWith("<span>:pissed-off:</span>");
        $("span[class='emoticon emoticon-question']").replaceWith("<span>:?</span>");
        $("span[class='emoticon emoticon-sad']").replaceWith("<span>:(</span>");
        $("span[class='emoticon emoticon-smile']").replaceWith("<span>:)</span>");
        $("span[class='emoticon emoticon-surprise']").replaceWith("<span>:o</span>");;
        $("span[class='emoticon emoticon-tongue']").replaceWith("<span>:P</span>");
}
 
//remove_smiles();
 
//$(document).keydown(function(e)
//{
//if (e.keyCode == 82) {
//setTimeout(remove_smiles,1000)
//}
//});