// ==UserScript==
// @name       Facebook Video Download Link
// @version    0.2
// @description  create a download link for facebook videos
// @include     https://www.facebook.com/*
// @include     http://www.facebook.com/*
// @author		Marcos Campos
// ==/UserScript==

var h_add_btn_func = function add_btn_func ()
{
   	if (document.domain == 'facebook.com')
    {
        var flash_stuff = [];
        for (var name in parent.window.frames)
        {
            if (name.indexOf("swf_id_") >= 0)
            {
                aux = document.getElementById(name);
                if (aux) { flash_stuff.push(aux); }
            }
        }
        
        // get video url. need SERIOUS improvement.
        try
        {
            if (typeof flash_stuff[0] != "undefined")
            {
                base = unescape(flash_stuff[0].getAttribute("flashvars"));
                st = base.indexOf('"sd_src":"');
                nd = base.indexOf('","thumbnail_src');
                link = base.substring(st+10, nd);
                        
                // create download link
                var a = document.createElement('a');
                a.appendChild(document.createTextNode("[ Download ]"));
                a.title = "download_btn";
                a.href = link;
                a.target = "_blank";
               
                document.getElementById("fbPhotoPageActions").appendChild(a);
            }
            else
            {
                /*
                var a = document.createElement('a');
                a.appendChild(document.createTextNode("[ retry ]"));
                a.title = "download_btn";
                a.href = '#';
				a.onclick = add_btn_func;
                a.target = "_blank";
               
                document.getElementById("fbPhotoPageActions").appendChild(a);
                */
                
                setTimeout(add_btn_func, 200);
            }
        }
        catch (err)
        {
            // do nothing..
            //alert("algum outro bode");
        }
    }
}

window.addEventListener('DOMContentLoaded', h_add_btn_func, false);