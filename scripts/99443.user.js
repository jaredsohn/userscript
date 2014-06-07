// ==UserScript==
// @name           XSelect
// @version        0.0.5
// @description    inline xpath expression tester
// @author         stolenapples
// @email          mailw7@gmail.com
// @copyright      2011
// @include        *
// ==/UserScript==

function $id(id)          { return document.getElementById(id); }
function $switch(element) { element.style.display = element.style.display == 'none' ? '' : 'none'; }

$xpath = function(expression)
{
    return document.evaluate(expression, document, null, XPathResult.ANY_TYPE, null);
};

function xquery()
{
   query  = $id("query")
   response = $xpath(query.textContent)

    switch (response.resultType)
    {
        case XPathResult.STRING_TYPE:
            response = response.stringValue + '' //concat to fit
            break;
        case XPathResult.NUMBER_TYPE:
            response = response.numberValue + ''
            break;
        case XPathResult.BOOLEAN_TYPE:
            response = response.booleanValue + ''
            break;
        case XPathResult.UNORDERED_NODE_ITERATOR_TYPE:
            var nodes = [], node;
            while (node = response.iterateNext())
            {
                nodes.push(node);
                console.log(node);
            }
            if (nodes.length > 0)
            {
                console.log('---')
                response = nodes.length + ' items'
            }
            else    
                response = '?' 
    }  

   $id("result").innerHTML = response
};

function show()
{
    $switch($id('f'))
};

self_init = function(event)
{
    console.log('...')
    xselect = document.createElement("div");
    xselect.id = "xselect";
    xselect.innerHTML = xselect_html
    document.body.appendChild(xselect); 
    $id('s').addEventListener('click', show, false)
    $id('query').addEventListener('keyup', xquery, false) 

    query = $id("query");
    //query.contentEditable = true; 
    query.spellcheck = false;
};

var xselect_html = " \
    <a id='s' href='#s'>x</a> \
    <div id='f' style='margin:10px; display:none'> \
        <div>XPath expression<sup> </sup></div> \
        <div style='border-color: #ddd; border-radius: 5px; background-attachment: scroll; border-style: solid; border-width: 1px; width: 90%; box-shadow: #ddd 0px 0px 3px 0px; -moz-box-shadow: #ddd 0 0 3px; -moz-border-radius: 5px 0 0 5px;'>  \
        <div contentEditable='true' tabindex='0' \
            style='color:#black; font-size: 19px; padding:10px; font-family:monospace; border:none; outline-style: none; width: 93%;position:relative;z-index:0;' \
            id='query' \
            type='text'/></div> \
            <div id='result' style='position:relative; z-index:4; padding:2px; float: left; font-weight:bold; font-size: 13px; border-color: #afd700; border-radius: 5px; border-style: solid; border-width: 1px; box-shadow: #afd700 0px 0px 2px 0px; -moz-box-shadow: #ddd 0 0 1px; -moz-border-radius: 5px 0 0 5px; margin: 1px; background-color:#afd700; margin-top: -7px; margin-left:12px;'>Enter XPath expression</div> \
        </div> <br/> \
        <div id='show'></div> \
    </div> ";

document.addEventListener("DOMContentLoaded", self_init, true);
self_init();