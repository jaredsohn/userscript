// ==UserScript==
// @name          Tight Popgo BBS
// @namespace     YuJianrong@GMail.com
// @description	  使popgoBBS页面更紧凑
// @include       http://popgo.net/bbs/showthread.php*
// ==/UserScript==

function GetTheNodes(xPathStr)
{
    var nodehead = document.evaluate(xPathStr, document, null, XPathResult.ANY_TYPE, null);
    var Tnode= nodehead.iterateNext();
    var Nodes=new Array;
    while (Tnode)
    {
        Nodes.push(Tnode);
        Tnode= nodehead.iterateNext();
    }
    return Nodes;
}

var Nodes = GetTheNodes("/html/body/center/table/tbody/tr/td[2]/table/tbody/tr/td/table/tbody/tr[1]/td[1]");
for (var nodeindex in Nodes)
{
    var node = Nodes[nodeindex];
    if (node.childNodes.length >=14)
    {
        for (var Index = node.childNodes.length-1;Index>=0;--Index)
        {
            if ( typeof node.childNodes[Index] == "object" && node.childNodes[Index].nodeName != undefined)
            {
                if ( node.childNodes[Index].nodeName=="IMG" )
                {
        //            node.childNodes[Index].height /= 2;
        //            node.childNodes[Index].width /= 2;
                    if (node.childNodes[Index].attributes[0].nodeName=="width")
                        node.childNodes[Index].width = parseInt(node.childNodes[Index].attributes[0].nodeValue);
                    else if (node.childNodes[Index].naturalWidth != 0)
                    {
                        if (node.childNodes[Index].naturalWidth > 128)
                            node.childNodes[Index].width= node.childNodes[Index].naturalWidth /2;
                        else if (node.childNodes[Index].naturalWidth > 64)
                            node.childNodes[Index].width= 64;
                    }
                    else
                        node.childNodes[Index].width = 64;
                    continue;
                }else if ( node.childNodes[Index].nodeName=="TABLE" )
                    continue;
            }
            node.removeChild(node.childNodes[Index]);
        }
    }

}

var Nodes = GetTheNodes("/html/body/center/table/tbody/tr/td[2]/table/tbody/tr/td/table/tbody/tr[1]/td[2]");
for (var nodeindex in Nodes)
{
    var node = Nodes[nodeindex];
    if (node.childNodes.length >7)
    {
        var LastOne = node.childNodes.length -1;
        node.removeChild(node.childNodes[LastOne]);
        node.removeChild(node.childNodes[LastOne-1]);
        node.removeChild(node.childNodes[LastOne-2]);
        node.removeChild(node.childNodes[LastOne-3]);
    }
}

