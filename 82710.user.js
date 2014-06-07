// ==UserScript==
// @name           deviantART: Adjust LiteratureBox scroll speed
// @description    This userscript allows you to adjust the scrolling speed of the literature preview-boxes on deviantart.com. You can also select what parts of the literature-boxes you need to hover your mouse over to make the text scroll or rewind.
// @namespace      http://www.n-regen.bplaced.de
// @include        http://*.deviantart.com/*
// ==/UserScript==

/*
    Original scroll function (hover):

    A = A.getElementsByTagName("q")[0];
		Station.stopAnimation(A);
		Station.run(A, "top", {
			from: parseInt(Station.read(A, "top") || 0),
			to: parseInt(Station.read(A, "top") || 0) - 3000,
			time: 3000 * 25 * 3
		})

    Original rewind function (out):

    A = A.getElementsByTagName("q")[0];
		Station.stopAnimation(A);
		Station.run(A, "display", {
			to: "block",
			time: 100
		}, "top", {
			from: parseInt(Station.read(A, "top") || 0),
			to: 0,
			f: Interpolators.pulse,
			time: 600
		})

*/

document = unsafeWindow.document;

GM_registerMenuCommand("Set LitBox scroll speed",
    function()
    {
        if (document.getElementById("litboxsettings") == null)
        {
            var layer = document.createElement("div");
            layer.style.background = "#c5d3c3";
            layer.style.position = "fixed";
            layer.style.top = "0px";
            layer.style.left = "0px";
            layer.style.width = "550px";
            layer.style.height = "240px";
            layer.style.marginLeft = ((screen.availWidth-550)/2)+"px";
            layer.style.marginTop = "150px";
            layer.style.textAlign = "center";
            layer.style.border = "3px solid #4d625d";
            layer.style.zIndex = "30";
            layer.style.font = "";
            layer.id = "litboxsettings";
            layer.innerHTML = '<br /><br /><label>Scroll speed: </label><input type="text" id="litboxsettingsscrollspeed" '+
                              'value="'+GM_getValue("rolltime", 225000)+'" /><br />'+
                              '<small>(the higher the number, the slower the scrolling; default value: 225000)</small><br />'+
                              '<label>Scroll text when the mouse is hovering over </label><select size="1" id="litboxsettingsscrollobject">'+
                              '<option value="text">the text</option><option value="imagebar">the imagebar</option>'+
                              '<option value="box">either the text or the imagebar</option></select><br /><br />'+
                              '<label>Rewind speed: </label><input type="text" id="litboxsettingsrewindspeed" '+
                              'value="'+GM_getValue("rewindtime", 600)+'" /><br />'+
                              '<small>(the higher the number, the slower the scrolling; default value: 600)</small><br />'+
                              '<label>Rewind text when the mouse is hovering over </label><select size="1" id="litboxsettingsrewindobject">'+
                              '<option value="text">the text</option><option value="imagebar">the imagebar</option>'+
                              '<option value="box">neither the text nor the imagebar</option></select><br /><br />'+
                              '<input type="button" value="Save settings" id="litboxsettingssave" />&nbsp;&nbsp;'+
                              '<input type="button" value="Close" '+
                              'onclick="document.body.setAttribute(\'onunload\', \'\'); document.getElementById(\'litboxsettings\').parentNode.'+
                              'removeChild(document.getElementById(\'litboxsettings\'))" /><br />'+
                              '<small>You need to reload the page for the changes to take effect.</small>';
            document.body.appendChild(layer);
            document.getElementById("litboxsettingsscrollobject").value = GM_getValue("rollobject", "text");
            document.getElementById("litboxsettingsrewindobject").value = GM_getValue("rewindobject", "box");
            document.getElementById("litboxsettingssave").addEventListener(
                "click",
                function()
                {
                    GM_setValue("rollobject", document.getElementById("litboxsettingsscrollobject").value);
                    GM_setValue("rewindobject", document.getElementById("litboxsettingsrewindobject").value);
                    GM_setValue("rolltime", document.getElementById("litboxsettingsscrollspeed").value);
                    GM_setValue("rewindtime", document.getElementById("litboxsettingsrewindspeed").value);
                },
                true
            );
            document.body.setAttribute("onunload", "document.getElementById('litboxsettings').parentNode.removeChild(document.getElementById('litboxsettings'))");
        }
    }
);

document.addEventListener(
    "load",
    function(e)
    {
        document = unsafeWindow.document;

        for (var atags = document.getElementsByTagName('a'), i=0, j=atags.length; i<j; i++)
        {
            if (atags[i].getAttribute("onmouseover") == "if(window.LitBox)LitBox.hover(this)")
            {
                atags[i].setAttribute("id", "litbox"+i);

                stop = "A = document.getElementById('litbox"+i+"').getElementsByTagName('q')[0]; Station.stopAnimation(A);";

                rolltime = GM_getValue("rolltime", 3000 * 25 * 3);
                roll = "A = document.getElementById('litbox"+i+"').getElementsByTagName('q')[0]; Station.stopAnimation(A); Station.run(A, 'top', {from: parseInt(Station.read(A, 'top') || 0), to: parseInt(Station.read(A, 'top') || 0) - 3000, time: "+rolltime+"})";

                rewindtime = GM_getValue("rewindtime", 600);
                rewind = "A = document.getElementById('litbox"+i+"').getElementsByTagName('q')[0]; Station.stopAnimation(A); Station.run(A, 'display', {to: 'block', time: 100}, 'top', {from: parseInt(Station.read(A, 'top') || 0), to: 0, f: Interpolators.pulse, time: "+rewindtime+"})";

                atags[i].setAttribute("onmouseover", "");
                atags[i].setAttribute("onmouseout", "");

                if (GM_getValue("rollobject", "text") == "imagebar")
                {
                    // Text vorrollen, wenn Maus über Seitenbild
                    atags[i].getElementsByTagName("img")[1].setAttribute("onmouseover", roll);
                    if (GM_getValue("rewindobject", "box") != "imagebar")
                    {
                        atags[i].getElementsByTagName("img")[1].setAttribute("onmouseout", stop);
                    }
                }
                else
                if (GM_getValue("rollobject", "text") == "box")
                {
                    // Text vorrollen, wenn Maus über Box
                    atags[i].setAttribute("onmouseover", roll);
                    if (GM_getValue("rewindobject", "box") != "box")
                    {
                        atags[i].setAttribute("onmouseout", stop);
                    }
                }
                else
                if (GM_getValue("rollobject", "text") == "text")
                {
                    // Text vorrollen, wenn Maus über Text
                    atags[i].getElementsByTagName("q")[0].setAttribute("onmouseover", roll);
                    if (GM_getValue("rewindobject", "box") != "text")
                    {
                        atags[i].getElementsByTagName("q")[0].setAttribute("onmouseout", stop);
                    }
                }

                if (GM_getValue("rewindobject", "box") == "imagebar")
                {
                    // Text zurückrollen, wenn Maus über Seitenbild
                    atags[i].getElementsByTagName("img")[1].setAttribute("onmouseover", rewind);
                    if (GM_getValue("rollobject", "text") != "imagebar")
                    {
                        atags[i].getElementsByTagName("img")[1].setAttribute("onmouseout", stop);
                    }
                }
                else
                if (GM_getValue("rewindobject", "box") == "text")
                {
                    // Text zurückrollen, wenn Maus über Text
                    atags[i].getElementsByTagName("q")[0].setAttribute("onmouseover", rewind);
                    if (GM_getValue("rollobject", "text") != "text")
                    {
                        atags[i].getElementsByTagName("q")[0].setAttribute("onmouseout", stop);
                    }
                }
                else
                if (GM_getValue("rewindobject", "box") == "box")
                {
                    // Text zurückrollen, wenn Box verlassen
                    atags[i].setAttribute("onmouseout", rewind);
                    if (GM_getValue("rollobject", "text") != "box")
                    {
                        atags[i].setAttribute("onmouseover", rewind);
                    }
                }
            }
        }
    },
    true
);

window.addEventListener(
    "load",
    function(e)
    {
        document = unsafeWindow.document;

        for (var atags = document.getElementsByTagName('a'), i=0, j=atags.length; i<j; i++)
        {
            if (atags[i].getAttribute("onmouseover") == "if(window.LitBox)LitBox.hover(this)")
            {
                atags[i].setAttribute("id", "litbox"+i);

                stop = "A = document.getElementById('litbox"+i+"').getElementsByTagName('q')[0]; Station.stopAnimation(A);";

                rolltime = GM_getValue("rolltime", 3000 * 25 * 3);
                roll = "A = document.getElementById('litbox"+i+"').getElementsByTagName('q')[0]; Station.stopAnimation(A); Station.run(A, 'top', {from: parseInt(Station.read(A, 'top') || 0), to: parseInt(Station.read(A, 'top') || 0) - 3000, time: "+rolltime+"})";

                rewindtime = GM_getValue("rewindtime", 600);
                rewind = "A = document.getElementById('litbox"+i+"').getElementsByTagName('q')[0]; Station.stopAnimation(A); Station.run(A, 'display', {to: 'block', time: 100}, 'top', {from: parseInt(Station.read(A, 'top') || 0), to: 0, f: Interpolators.pulse, time: "+rewindtime+"})";

                atags[i].setAttribute("onmouseover", "");
                atags[i].setAttribute("onmouseout", "");

                if (GM_getValue("rollobject", "text") == "imagebar")
                {
                    // Text vorrollen, wenn Maus über Seitenbild
                    atags[i].getElementsByTagName("img")[1].setAttribute("onmouseover", roll);
                    if (GM_getValue("rewindobject", "box") != "imagebar")
                    {
                        atags[i].getElementsByTagName("img")[1].setAttribute("onmouseout", stop);
                    }
                }
                else
                if (GM_getValue("rollobject", "text") == "box")
                {
                    // Text vorrollen, wenn Maus über Box
                    atags[i].setAttribute("onmouseover", roll);
                    if (GM_getValue("rewindobject", "box") != "box")
                    {
                        atags[i].setAttribute("onmouseout", stop);
                    }
                }
                else
                if (GM_getValue("rollobject", "text") == "text")
                {
                    // Text vorrollen, wenn Maus über Text
                    atags[i].getElementsByTagName("q")[0].setAttribute("onmouseover", roll);
                    if (GM_getValue("rewindobject", "box") != "text")
                    {
                        atags[i].getElementsByTagName("q")[0].setAttribute("onmouseout", stop);
                    }
                }

                if (GM_getValue("rewindobject", "box") == "imagebar")
                {
                    // Text zurückrollen, wenn Maus über Seitenbild
                    atags[i].getElementsByTagName("img")[1].setAttribute("onmouseover", rewind);
                    if (GM_getValue("rollobject", "text") != "imagebar")
                    {
                        atags[i].getElementsByTagName("img")[1].setAttribute("onmouseout", stop);
                    }
                }
                else
                if (GM_getValue("rewindobject", "box") == "text")
                {
                    // Text zurückrollen, wenn Maus über Text
                    atags[i].getElementsByTagName("q")[0].setAttribute("onmouseover", rewind);
                    if (GM_getValue("rollobject", "text") != "text")
                    {
                        atags[i].getElementsByTagName("q")[0].setAttribute("onmouseout", stop);
                    }
                }
                else
                if (GM_getValue("rewindobject", "box") == "box")
                {
                    // Text zurückrollen, wenn Box verlassen
                    atags[i].setAttribute("onmouseout", rewind);
                    if (GM_getValue("rollobject", "text") != "box")
                    {
                        atags[i].setAttribute("onmouseover", rewind);
                    }
                }
            }
        }
    },
    false
);

