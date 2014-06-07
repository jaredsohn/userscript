// ==UserScript==
// @name          Prosper Listing Detail Extensions
// @namespace     http://retireme99.googlepages.com/firefoxextension
// @description   Adds functionality to the Prosper Listing Detail page.
// @include http://prosper.com/lend/listing.aspx*
// @include https://prosper.com/lend/listing.aspx*
// @include http://www.prosper.com/lend/listing.aspx*
// @include https://www.prosper.com/lend/listing.aspx*
// ==/UserScript==

var m_popupLeft;
var m_popupTop;
function CalcPopupLocationDapper(counter)
{
    try
    {
        var scrollInfo = null;

        if (counter.offsetParent != null)
        {
            m_popupLeft = counter.offsetLeft + /*win.screenLeft*/0;
            m_popupTop = counter.offsetTop /*+ win.screenTop*/ + counter.offsetHeight;

            scrollInfo = counter;
            m_popupLeft -= scrollInfo.scrollLeft;
            m_popupTop -= scrollInfo.scrollTop;

            while ((counter = counter.offsetParent) != null)
            {
                m_popupLeft += counter.offsetLeft;
                //if (counter.offsetParent != null)
                {
                    scrollInfo = counter;
                    m_popupLeft -= scrollInfo.scrollLeft;
                }
                m_popupTop += counter.offsetTop;
                if (scrollInfo != null)
                    m_popupTop -= scrollInfo.scrollTop;

                scrollInfo = null;
            }
        }
    }
    catch (err)
    {
        m_popupTop = 160;
        m_popupLeft = 300;
    }
}

function AddLinks()
{
    var elemAddLinks = document.getElementById("lblListingStartRate");
    if (elemAddLinks != null)
    {
        CalcPopupLocationDapper(document.getElementById("lblListingStartRate"));
        var newElem = document.createElement('span');
        newElem.innerHTML = 
            '<span id="SilverHolder" style="PADDING-RIGHT: 0px; DISPLAY: inline; PADDING-LEFT: 0px; Z-INDEX: 100; LEFT: 20px; VISIBILITY: visible; PADDING-BOTTOM: 0px; MARGIN: 10px; WIDTH: 800px; PADDING-TOP: 0px; POSITION: absolute; TOP: ' + (m_popupTop+200) + 'px; BACKGROUND-COLOR: white"><table class="table_head" width="100%" cellPadding=0 cellSpacing=0><tbody><tr><td class="table_head_title">Must remain visible for Extension to work</td>' + 
            "<td class=\"table_head_links\" align=\"right\"></td></tr></tbody></table>" +
            "<span style=\"CURSOR: pointer; TEXT-DECORATION: none\"><TABLE class=\"table_body\" width=\"100%\" cellPadding=0 cellSpacing=0><TBODY>" +
            "<span id=\"PutItHere\"></span>" + 
			"</tbody></table></span></span>";
	    elemAddLinks.appendChild(newElem);
    }
}
AddLinks();

var p = unsafeWindow;
function waitForProto() {
    if (typeof p.Silverlight=='undefined')
	// set to check every 100 milliseconds if the libary has loaded
        window.setTimeout(waitForProto, 100);
    else
    {
        if (document.getElementById('myid') != null)
            return;
        // call the rest of your code
        p.Silverlight.createObject('http://retireme99.webstrikesolutions.com/ClientBin/SilverlightApplication2.xap',
        //p.Silverlight.createObject('http://localhost:56526/ClientBin/SilverlightApplication2.xap',
                            document.getElementById('PutItHere'), 'myid',
                                {width:'800', height:'40', 
                                inplaceInstallPrompt:true, background:'white', 
                                isWindowless:'false', framerate:'24', version:'2.0',
                                enableHtmlAccess:'true'}, 
                                {onError:null, onLoad:null}, null);
        
    }
}
function loadProto() {
	// dynamically creates a script tag
        var proto = document.createElement('script');
        proto.type = 'text/javascript';
        //proto.src = 'http://localhost:56526/Silverlight.js';
        proto.src = 'http://retireme99.webstrikesolutions.com/Silverlight.js';
        document.getElementsByTagName('head')[0].appendChild(proto);
        waitForProto();
}
window.addEventListener('load', loadProto(), false);