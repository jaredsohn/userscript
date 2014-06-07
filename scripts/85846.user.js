// ==UserScript==
// @name           Are They Real Hidden Comments or Fake Hidden Comments?
// @namespace      http://www.jonathanbuchanan.plus.com/repos/greasemonkey/
// @description    Shows hidden comments when film names which have associated comments are hovered over. Click to view a selectable version of the comment.
// @include        http://realorfake3d.com/
// ==/UserScript==

var INFO_ID = "tehInfo";

function doSomethingUsefulWithComments(p)
{
    for (var i = 0, l = p.childNodes.length; i < l; i++)
    {
        var n = p.childNodes[i];
        if (n.nodeType == 3 &&
            n.nodeValue.replace(/[\r\n]/g, '') != "" &&
            l != i+1 &&
            p.childNodes[i+1].nodeType == 8)
        {
            var s = document.createElement("span");
            s.appendChild(document.createTextNode(n.nodeValue));
            s.title = p.childNodes[i+1].nodeValue;
            s.style.cursor = "help";
            s.addEventListener("click", showInfo, false);
            p.replaceChild(s, n);
            i++;
        }
    }
}

function showInfo(e)
{
    hideInfo();

    var d = document.createElement("div");
    d.style.position = "absolute";
    var pos = objectPosition(this);
    var left = pos[0] + this.offsetWidth + 4;
    if (left + 322 >= window.innerWidth)
    {
        d.style.right = "0px";
    }
    else
    {
        d.style.left = left + "px";
    }
    d.style.top = (pos[1]) + "px";
    d.style.width = "300px";
    d.style.backgroundColor = "#fff";
    d.style.border = "1px solid #000";
    d.style.padding = "4px 8px";
    d.style.MozBorderRadius = "1em";
    d.id = INFO_ID;
    d.innerHTML = this.title;
    document.body.appendChild(d);
}

function objectPosition(obj)
{
    var curleft = 0;
    var curtop = 0;
    if (obj.offsetParent)
    {
        do
        {
              curleft += obj.offsetLeft;
              curtop += obj.offsetTop;
        } while (obj = obj.offsetParent);
    }
    return [curleft, curtop];
}

function hideInfo()
{
    var d = document.getElementById(INFO_ID);
    if (d != null)
    {
        d.parentNode.removeChild(d);
    }
}

var paras = document.evaluate(
    "//tbody/tr[position()!=1 and position()!=last()]//p",
    document,
    null,
    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
    null);
for (var i = 0, l = paras.snapshotLength; i < l; i++)
{
    doSomethingUsefulWithComments(paras.snapshotItem(i));
}
