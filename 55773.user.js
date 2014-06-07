// ==UserScript==
// @name          Modified splash album viewer
// @namespace     http://userscripts.org/
// @scriptsource  http://userscripts.org/scripts/show/55773
// @scriptsource  http://souponly-for-otherwebsites.googlecode.com/files/Modified_splash_album_viewer.user.js
// @description   Show large pictures dynamically when viewing albums
// @version       0.2
// @date	  2009-08-25
// @author        soup
// @include       http://www.wretch.cc/album/*
// @include       http://www.wretch.cc/blog/*
// @include       http://*.pixnet.net/album*
// @include       http://*.pixnet.net/alb/*
// @include       http://photo.xuite.net/*
// @include       http://photo.pchome.com.tw/*
// @include       http://pic.twbbs.org/*
// @include       http://*.flickr.com/*
// @include       http://meeya.cc/*
// @include       http://www.ipernity.com/doc/*
// @include       http://*.ipernity.com/*
// @include       http://album.blog.yam.com/*
// @include       http://*.blog.yam.com/*

// @exclude       http://www.flickr.com/cameras/*
// ==/UserScript==

// Original author: Andro Lee (http://www.wretch.cc/blog/sunday777)
// splash album viewer is modified by soup(麻糬) 
/* Changelog:
0.2 (2009.08.25)
	- add new album - yam (天空部落格之相簿)      
0.1 (2009.08.16)
	- add new album - ipernity      
*/


// =============================================================================
// Wretch AD remover
// =============================================================================
function wretch_ad_remover()
{
    var p;

    p = document.getElementById("Wretch-ysm");
    if (p)
        p.parentNode.removeChild(p);

    p = document.getElementById("ad_banner");
    if (p)
        p.parentNode.removeChild(p);

    p = document.getElementById("ad_button");
    if (p)
        p.parentNode.removeChild(p);

    p = document.getElementById("rmflashdiv");
    if (p)
        p.parentNode.removeChild(p);

}

// =============================================================================
// Wretch Album List Expander
// =============================================================================

function wretch_album_list_expander()
{
    // album list starts with http:\\www.wretch.cc\album\xxxx
    var re = /^http:\/\/www.wretch.cc\/album\/\w+/;
    var alb_name = re.exec(location.href);
    if (!alb_name)
        return;

    // excludes a single album view
    if (location.href.indexOf("album.php?id=") != -1 ||
        location.href.indexOf("show.php?") != -1
        )
        return;

    // is there a "next page" link?
    var id_next;
    if (!(id_next = document.getElementById("next")))
        return;

    var max_page = +(id_next.previousSibling.previousSibling.innerHTML);

    id_next.parentNode.innerHTML = "All " + max_page + " pages of albums are listed!";

    if (!(id_next = document.getElementById("next")))
        return;

    id_next.parentNode.innerHTML = "All " + max_page + " pages of albums are listed!";

    var xmlHttp = new XMLHttpRequest();

    /* this is used only in async mode.
            xmlHttp.onreadystatechange = function()
            {
                if(xmlHttp.readyState == 4)
                {
                    alert(xmlHttp.responseText);
                }
            };
    */

    // find album table body
    var album_body = document.getElementById("ad_square").getElementsByTagName("tbody")[0];

    //re = /<table\sid="ad_square"[^>]*>[\w\s\S]*<\/td>[\s]*<\/tr>[\s]*<\/table>/;
    for (var i = 2; i <= max_page; i++)
    {
        var next_alb;

        xmlHttp.open("GET", alb_name + "&page=" + i, false);
        xmlHttp.send(null);

        next_alb = xmlHttp.responseText;
        next_alb = next_alb.substr(next_alb.indexOf('id="ad_square"'));
        next_alb = next_alb.substr(next_alb.indexOf("<tr>"));
        next_alb = next_alb.slice(0, next_alb.indexOf("</table>"));
        album_body.innerHTML += next_alb;
    }
}

// =============================================================================
// Album Floating Window Viewer
// =============================================================================
function Wretch_pic_finder(thumb)
{
    var idx = thumb.src.indexOf("thumbs/t");
    if (idx == -1)
       return -1
    else
       return thumb.src.slice(0, idx) + thumb.src.substr(idx + 8);
}

function Wretch_album_finder()
{
    var p;
    if ((p = document.getElementById("ad_square")) ||
        (p = document.getElementById("album"))
       )
        return p.getElementsByTagName("img");
    else
        return null;
}

function Flickr_pic_finder(thumb)
{
    var idx;
    if ((idx = thumb.src.indexOf("_s")) == -1 &&
        (idx = thumb.src.indexOf("_m")) == -1 &&
        (idx = thumb.src.indexOf("_t")) == -1 )
        return -1;
        else
    return thumb.src.slice(0, idx) + thumb.src.substr(idx + 2);
}

function Flickr_album_finder()
{
    var p = document.getElementById("Main");
    if (p)
        return p.getElementsByTagName("img");
    else
        return null;
}

function BS2_pic_finder(thumb)
{
    var idx = thumb.src.indexOf(".small.");
    if (idx == -1)
       return -1
    else
       return thumb.src.slice(0, idx) + ".sized." + thumb.src.substr(idx + 7);
}

function BS2_album_finder()
{
    var p = document.getElementById("main_td");
    if (p)
        return p.getElementsByTagName("img");
    else
        return null;
}

function Pixnet_pic_finder(thumb)
{
    var idx = thumb.src.indexOf("thumb_");
    if (idx == -1)
       return -1
    else
       return thumb.src.slice(0, idx) + thumb.src.substr(idx + 6);
}

function Pixnet_album_finder()
{
    var p;
    if ((p = document.getElementById("contentBody")) == null &&
        (p = document.getElementById("album-main")) == null)
        return null;
    else
        return p.getElementsByTagName("img");
}

function Xuite_pic_finder(thumb)
{
    var idx = thumb.src.indexOf("/t/");
    if (idx == -1)
        return -1;
    else
        return "http://o." + thumb.src.slice(7, idx) + thumb.src.substr(idx + 2);
}

function Xuite_album_finder()
{
    var p;
    if (p = document.getElementById("yui-main"))
        return p.getElementsByTagName("img");
    else
    {
        p = document.getElementsByTagName("body")[0].childNodes[3];
        if (p.nodeName.toLowerCase() == "table")
        {
            return p.getElementsByTagName("img");
        }    
        return null;
    }
}

function meeya_pic_finder(thumb)
{
    var idx;
    if ((idx = thumb.src.indexOf("/t_")) == -1 &&
        (idx = thumb.src.indexOf("/s_")) == -1
        )
       return -1;
    else
       return thumb.src.slice(0, idx+1) + 'n' + thumb.src.substr(idx+1 + 1);
}

function meeya_album_finder()
{
    var p;
    if ((p = document.getElementById("album")) ||
        (p = document.getElementById("panel"))
        )
        return p.getElementsByTagName("img");
    else
        return null;
}

function pchome_pic_finder(thumb)
{
    var idx;
    if ((idx = thumb.id.indexOf("s.")) == -1)
       return -1;
    else
       return thumb.id.slice(4, idx) + thumb.id.substring(idx+1, thumb.id.length-1);
}

function pchome_album_finder()
{
    var p;
    if (p = document.getElementById("pic"))
        {GM_log(p.innerHTML);return p.parentNode.getElementsByTagName("span");}
    else
        return null;
}

function ipernity_pic_finder(thumb)
{
    var idx;
    if ((idx = thumb.src.indexOf(".s")) == -1 &&
    	(idx = thumb.src.indexOf(".m")) == -1 &&
        (idx = thumb.src.indexOf(".t")) == -1 )
        return -1;
    else
    return thumb.src.slice(0, idx) + thumb.src.substr(idx + 6)+ '.560.jpg';
}


function ipernity_album_finder()
{
	var p;
    if ((p = document.getElementById("body"))
    	)
    	return p.getElementsByTagName("img");
       else
    	return null;
}

function yam_pic_finder(thumb)
{
    var idx;
    if ((idx = thumb.src.indexOf("s_")) == -1 &&
        (idx = thumb.src.indexOf("t_")) == -1 )
        return -1;
        else
    return thumb.src.slice(0, idx) +  thumb.src.substr(idx+ 2);
}


function yam_album_finder()
{
    var p = document.getElementById("mainFrame");
    if (p)
        return p.getElementsByTagName("img");
    else
        return null;
}


// -----------------------------------------------------------------------------

function album_floating_window_viewer()
{
    var border_px = 5;
    var offset_px = 60;

    var sty_head = "position: fixed !important; z-index: 1165535 !important;";
    var sty_block = "display: block !important;";
    var sty_none  = "display: none !important;";
    var sty_px = "px !important;";
    var sty_lt = "left: ";
    var sty_tp = "top: ";
    var sty_mw = "max-width: ";
    var sty_mh = "max-height: ";

    // -------------------------------------------------------------------------

    // set album checker strings
    var pic_finder = null;
    var album_finder = null;

    if (location.href.indexOf("www.wretch") != -1)
    {
        pic_finder = Wretch_pic_finder;
        album_finder = Wretch_album_finder;
    }
    else if (location.href.indexOf("pixnet.net") != -1)
    {
        pic_finder = Pixnet_pic_finder;
        album_finder = Pixnet_album_finder;
    }
    else if (location.href.indexOf("flickr.com") != -1)
    {
        pic_finder = Flickr_pic_finder;
        album_finder = Flickr_album_finder;
    }
    else if (location.href.indexOf("pic.twbbs.org") != -1)
    {
        pic_finder = BS2_pic_finder;
        album_finder = BS2_album_finder;
    }
    else if (location.href.indexOf("photo.xuite.net") != -1)
    {
        pic_finder = Xuite_pic_finder;
        album_finder = Xuite_album_finder;
    }
    else if (location.href.indexOf("meeya") != -1)
    {
        pic_finder = meeya_pic_finder;
        album_finder = meeya_album_finder;
    }
    else if (location.href.indexOf("photo.pchome.com.tw") != -1)
    {
        pic_finder = pchome_pic_finder;
        album_finder = pchome_album_finder;
    }
	else if (location.href.indexOf("ipernity.com") != -1)
    {
        pic_finder = ipernity_pic_finder;
        album_finder = ipernity_album_finder;
    }
    else if (location.href.indexOf("yam.com") != -1)
    {
        pic_finder = yam_pic_finder;
        album_finder = yam_album_finder;
    }
    

    // create an image element
    var pic_stat;
    var pic = document.createElement("img");
    pic.border = border_px;
    pic.alt = "Downloading...";
    pic.setAttribute("style", sty_none);

    pic.addEventListener("mouseout", function (event) {
        this.setAttribute("style", sty_none);
        pic_stat = "onbig";
    }, false);

    pic.addEventListener("click", function (event) {
        this.setAttribute("style", sty_none);
        pic_stat = "onbig";
    }, false);

    // put the img as first node in HTML body.
    var img_span = document.createElement("span");
    img_span.appendChild(pic);
    var body_node = document.getElementsByTagName("body")[0];
    body_node.insertBefore(img_span, body_node.firstChild);

    // find album table
    var img_all = album_finder();
    if (!img_all)
        return;

    for (var i = 0; i < img_all.length; i++)
    {
        var img_node;
        var isrc;
        var idx;
        var img_hidden;
        var big_width, big_height, ratio_w, ratio_h, ratio_max, sty, mw, mh;

        img_node = img_all[i];


        if ((isrc = pic_finder(img_node)) != -1)
        {
            // load original picture
            img_hidden = document.createElement("img");
            img_hidden.src = isrc;
            img_hidden.style.display = "none";
            img_span.appendChild(img_hidden);
            img_node.id = isrc;

            img_node.addEventListener("mouseover", function (event)
            {
                if (pic.src == this.id && pic_stat == "onbig")
                {
                    pic_stat = "in";
                    return;
                }

                pic.src = this.id;

                big_width = pic.width + border_px*2;
                big_height = pic.height + border_px*2;
                ratio_w = big_width / window.innerWidth;
                ratio_h = big_height / window.innerHeight;
                ratio_max = ratio_w > ratio_h ? ratio_w : ratio_h;

                if (ratio_max > 1)
                {
                    big_width /= ratio_max;
                    big_height /= ratio_max;
                }

                if (event.clientX >= big_width + offset_px)
                    lt = event.clientX - big_width - offset_px;
                else if(window.innerWidth - event.clientX >= big_width + offset_px)
                    lt = event.clientX + offset_px;
                else if (event.clientX > window.innerWidth / 2)
                    lt = 0;
                else
                    lt = window.innerWidth - big_width;


                if (event.clientY >= big_height + offset_px)
                    tp = event.clientY - big_height - offset_px;
                else if(window.innerHeight - event.clientY >= big_height + offset_px)
                    tp = event.clientY + offset_px;
                else if (event.clientY > window.innerHeight / 2)
                    tp = 0;
                else
                    tp = window.innerHeight - big_height;

                sty = sty_head + sty_block + sty_lt + lt + sty_px + sty_tp + tp + sty_px;

                if (ratio_w > ratio_h)
                {
                    mw = window.innerWidth - border_px*2;
                    sty += sty_mw + mw + sty_px;
                }
                else
                {
                    mh = window.innerHeight - border_px*2;
                    sty += sty_mh + mh + sty_px;
                }
                pic.setAttribute("style", sty);

                if (event.clientX < pic.offsetLeft ||
                    event.clientX > pic.offsetLeft + pic.width + border_px*2 ||
                    event.clientY < pic.offsetTop ||
                    event.clientY > pic.offsetTop + pic.height + border_px*2)
                    pic_stat = "out";
                else
                    pic_stat = "in";

            }, false);

            img_node.addEventListener("mousemove", function (event)
            {
                if (event.clientX >= big_width + offset_px)
                    lt = event.clientX - big_width - offset_px;
                else if(window.innerWidth - event.clientX >= big_width + offset_px)
                    lt = event.clientX + offset_px;

                if (event.clientY >= big_height + offset_px)
                    tp = event.clientY - big_height - offset_px;
                else if(window.innerHeight - event.clientY >= big_height + offset_px)
                    tp = event.clientY + offset_px;

                if (pic_stat == "out")
                {
                    sty = sty_head + sty_block + sty_lt + lt + sty_px + sty_tp + tp + sty_px;

                    if (ratio_w > ratio_h)
                        sty += sty_mw + mw + sty_px;
                    else
                        sty += sty_mh + mh + sty_px;

                    pic.setAttribute("style", sty);
                }

            }, false);

            img_node.addEventListener("mouseout", function (event) {
                if (pic_stat == "out")
                    pic.setAttribute("style", sty_none);
            }, false);
        }
    }
}
// =============================================================================
// main
// =============================================================================
wretch_album_list_expander();
album_floating_window_viewer();
wretch_ad_remover();
