// ==UserScript==
// @name           Funnyjunk Stupid Sticky Remover
// @description    Removes stupid sticky
// @author         posttwo (Post15951)
// @include        *funnyjunk.com*
// @version        2
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js
// ==/UserScript==
 


$(document).ready(function ()
{
    $(document).keydown(function(e)
{
if (e.keyCode == 82) {
setTimeout(remove_smiles,1000)
}
});
    function remove_smiles()
{
        $("div[id='cc96820539']").remove();
}
    remove_smiles();
})