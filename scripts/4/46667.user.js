// ==UserScript==
// @name           Google Images QuickImgGet
// @namespace      PRANSHU
// @description    Add a button to direct open the image
// @include        http*//images.google.com*
// ==/UserScript==

/// <summary>
/// Ajax Request Page handle in Func
/// </summary>
/// <Param name="Page">Url</Param>
/// <Param name="Func">Function to handle</Param>
function AjaxRequestExtern(Page, Func)
{
    var CurrentUrl = window.location.href.match(/^(http:\/\/[^/]+)/)[0];
    var Url = Page + "cache=" + (new Date().getTime());
    GM_xmlhttpRequest({
        method: 'GET',
        url: Url,
        onload: Func
    });
}
// #endregion

try
{
    var View = document.createElement("div");
    View.style.position = "absolute";
    View.style.display = "none";
    View.style.zIndex = "9999";
    View.style.backgroundColor = "black";
    View.style.cursor = "pointer";
    View.addEventListener("click", function () { this.style.display = "none"; }, false);
    document.body.insertBefore(View, document.body.firstChild);
    for (i = 0; i < 18; ++i)
    {
        var DataImage = document.getElementById("tDataImage" + i);
        DirectLink = DataImage.getElementsByTagName("a")[0];
        DirectLink = DirectLink.href.match(/imgurl=([^&]+)/)[1];
        
        DataImage.addEventListener("mouseover",
            function (e)
            {
                var DirectLink = this.getElementsByTagName("a")[0];
                DirectLink = DirectLink.href.match(/imgurl=([^&]+)/)[1];
                var ImageSrc = "<img alt='' src='" + DirectLink + "' style='max-width: 300px; max-height: 300px' />";
                var PosX = this.id.replace(/[a-z]+/i, "");
                PosX = parseInt(PosX);
                if (PosX == 5 || PosX == 11 || PosX == 17)
                    PosX = -250;
                else PosX = 5;
                View.innerHTML = ImageSrc;
                View.style.display = "";
                View.style.left = e.pageX + PosX;
                View.style.top = e.pageY + 5;
            }, false);
        DataImage.addEventListener("mouseout",
            function (e)
            {
                View.style.display = "none";
            }, false);
        
        var DataText = document.getElementById("tDataText" + i);
        var Button = document.createElement("div");
        var Link = document.createElement("a");
        Link.href = DirectLink;
        Link.target = "_blank";
        Link.innerHTML = "Open Image";
        Link.style.color = "white";
        Link.setAttribute("onmouseover", "this.style.color = 'red';");
        Link.setAttribute("onmouseout", "this.style.color = 'white';");
        Link.setAttribute("onclick", "this.style.color = 'green';");
        Button.appendChild(Link);
        Button.style.backgroundColor = "black";
        Button.style.color = "white";
        Button.style.fontSize = "11px";
        Button.style.border = "1px solid blue";
        Button.style.margin = "0px 20px 0px 20px";
        
        DataText.insertBefore(Button, DataText.firstChild);
    }
}
catch (ex) {}