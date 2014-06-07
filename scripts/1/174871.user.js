// ==UserScript==
// @id             startpage.com-504d00f0-739d-4d28-9443-9695f30476ba@daud@de.su
// @name           Startpage JS eval search query
// @version        1.0
// @namespace      daud@iciware.com
// @author         DAud_IcI
// @description    Adds an option to eval the search query as JS code and print the output above theresuts at a button press. It's an alternative to Google Search's calculator feature
// @include        https://startpage.com/do/search?
// @include        https://startpage.com/do/search
// @include        https://startpage.com/do/search*
// @run-at         document-end
// ==/UserScript==


var id = function(id,parent)
{
    if (arguments.length < 2) parent = document;
    return parent.getElementById(id);
};
var query = id('query_top').value;
if (query.match(/;\s*$/))
{
    var cont = id('results');
    var work = document.createElement('div');
    cont.insertBefore(work,cont.firstChild);
    work.innerHTML = '<input id="eval_button" type="button" value="evaluate query"></input>';
    eval_button = id('eval_button');
    eval_button.onclick = function(e)
    {
        work.innerHTML = "" + eval(query);
    };
}

