// ==UserScript==
// @name           NCore-Prev V2
// @namespace      torrent
// @description    A csatolt kép linkje helyett maga a kép jelenik meg.
// @include        http://*ncore.*/letoltes.php*
// ==/UserScript==

function doZoom()
{
    var zoomDiv = document.getElementById('zoomDiv');
    if (!zoomDiv)
    {
        var zoomDiv = document.createElement("div");
        zoomDiv.setAttribute('id', 'zoomDiv');
        zoomDiv.style.position = 'fixed';
        zoomDiv.style.backgroundColor = 'rgba(0, 0, 0, 0.85)';
        zoomDiv.style.top = '0px';
        zoomDiv.style.bottom = '0px';
        zoomDiv.style.left = '0px';
        zoomDiv.style.right = '0px';

        if (zoomDiv.addEventListener)
            zoomDiv.addEventListener("click",function(){ zoomDiv.style.display = 'none'; },false);
        else if (zoomDiv.attachEvent)
            zoomDiv.attachEvent("click",function(){ zoomDiv.style.display = 'none'; });

        var zoomImage = document.createElement("img");
        zoomDiv.setAttribute('id', 'zoomDiv');
        zoomImage.style.border = '15px solid rgba(0, 0, 0, 0.5)';
        zoomImage.style.maxWidth = '1000px';
        zoomImage.style.maxHeight = '600px';
        zoomImage.style.display = 'block';
        zoomImage.style.margin = '5% auto 0px auto';

    if (zoomImage.addEventListener)
        zoomImage.addEventListener("load",function(){ zoomImage.style.opacity = '1'; },false);
    else if (zoomImage.attachEvent)
        zoomImage.attachEvent("load",function(){ zoomImage.style.opacity = '1'; });

        zoomDiv.appendChild(zoomImage);
        document.body.appendChild(zoomDiv);
    } else {
        zoomDiv.style.display = 'block';
        var zoomImage = zoomDiv.getElementsByTagName("img")[0];
    }


    zoomImage.style.opacity = '.25';
    if (this.src.match(/fixed_thumbs/gi) == null)
    {
        zoomImage.src = this.src;
    }
    else
    {
        var imageID = this.src.substr(this.src.indexOf("fixed_thumbs")+15);
        zoomImage.src = "/ncorekep.php?kep=" + imageID;
    }
}

function createImage(divParent, url, Pic)
{
                var newa = document.createElement("a");
                newa.setAttribute("href", "javascript:return false;");
                var mainImg = document.createElement("img");
                mainImg.style.width = '225px';
                mainImg.src = url;

                if (mainImg.addEventListener)
                    mainImg.addEventListener("click",doZoom,false);
                else if (mainImg.attachEvent)
                    mainImg.attachEvent("click",doZoom);

                var subImg = document.createElement("img");

                subImg.src = 'http://cdn.iconfinder.net/data/icons/drf/PNG/zoom%20in.png';
                subImg.setAttribute("style", "background-color: rgba(0, 0, 0, 0.75); padding: 3px; -moz-border-radius: 5px; -webkit-border-radius: 5px; border-radius: 5px; margin-left: -38px;");
                subImg.setAttribute("onclick", "javascript:" + Pic.getAttribute('onclick'));

                newa.appendChild(mainImg);
                newa.appendChild(subImg);
                divParent.appendChild(newa);
}

function doEvent()
{
    var Id = parseInt(this.href.substring(19));
    var elementId = document.getElementById(Id);
    if (elementId.style.display == "none" && elementId.getAttribute("isOpened") == null)
    {
        elementId.setAttribute("isOpened", "true");
        var Pics = elementId.getElementsByTagName("a");
        for (var i = 0;i<Pics.length; i++)
        {
            var Pic = Pics[i];
            var x = Pic.href.indexOf("kep.php?kep=");
            var picTitle = Pic.title;
            if (x!=-1 || picTitle.length > 0)
            {
                var id = Pic.href.substring(x+12);
                var td = Pic.parentNode;
                var tr = td.parentNode;
                var table = tr.parentNode;
                var div = table.parentNode;
                var divParent = div.parentNode;

                if (Pic.href.match(/ncore/gi) == null)
                {
                    if (Pic.getElementsByTagName("img")[0]) createImage(divParent, Pic.href, Pic);
                }
                else
                {
                    var imagename = Pic.getAttribute('onclick').substr(Pic.getAttribute('onclick').indexOf("'") + 1);
                    imagename = imagename.substr(0, imagename.indexOf("'"));
                    createImage(divParent, 'kepek/fixed_thumbs/' + id.substring(0,1) + '/' + id.replace("&type=xxx", ""), Pic);
                }

                table.style.display = "none";
            }
        }
    }
}

var Tags = document.getElementsByTagName("a");
for (var i=0; i<Tags.length; i++)
{
    if (Tags[i].addEventListener)
        Tags[i].addEventListener("click",doEvent,false);
    else if (Tags[i].attachEvent)
        Tags[i].attachEvent("click",doEvent);
}