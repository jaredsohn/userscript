/******************************************************************************
 *
 * ORF.at Ad Remover
 * version 0.1
 * 2007-06-16
 *
 * Released under the GPL license, version 2
 * http://www.gnu.org/copyleft/gpl.html
 *
 * ORF.at Ad Remover
 * Copyright (C) 2007 Martina Kainberger
 * 
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the GNU General Public License
 * as published by the Free Software Foundation; either version 2
 * of the License, or (at your option) any later version.
 * 
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 * 
 * You should have received a copy of the GNU General Public License
 * along with this program; if not, write to the Free Software
 * Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.
 * 
 * v0.1 - initial release
 *
 *******************************************************************************
 * 
 *  This is a Greasemonkey user script.  To install it, you need
 *  Greasemonkey 0.3 or later: http://greasemonkey.mozdev.org/
 *  Then restart Firefox and revisit this script.
 *  Under Tools, there will be a new menu item to "Install User Script".
 *  Accept the default configuration and install.
 * 
 *  To uninstall, go to Tools/Manage User Scripts,
 *  select "ORF.at Ad Remover", and click Uninstall.
 * 
 ******************************************************************************/

// ==UserScript==
// @name          ORF.at Ad Remover
// @namespace     http://www.mnm.at
// @description   Remove advertisements cluttering the pages on orf.at
// @include       http://*orf.at/*
// ==/UserScript==

//window.alert("loading page " + document.URL);

(function()
{
    var reAdWorx, reAdServer;
    var scriptNodes, scriptNode;
    var objectNodes, objectNode;
    var imgNodes, imgNodes;

    function xpath(query) {
        return document.evaluate(query, document, null,
            XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    }

    function killNode(target) {
        if(target.parentNode) {
            target.parentNode.removeChild(target);
        } else {
            delete(target);
        }
    }

    reAdWorx = new RegExp(".*adworx.*");
    reAdServer = new RegExp(".*adserve.*");
    

    // Create anonymous onLoad function to delete ads
    // because not all are visible during inital document construction.
    window.addEventListener("load", function(e) 
    {
        scriptNodes = document.getElementsByTagName("script");
    
        if (scriptNodes)
        {
            //window.alert("found " + e.length + " script nodes");
            for (i = 0; i <= scriptNodes.length; i++) 
            {
                scriptNode = scriptNodes[i];
                if (scriptNode && scriptNode.hasChildNodes() && scriptNode.childNodes[0].nodeType == 3)
                {
                    //window.alert("script content: " + scriptNode.childNodes[0].nodeValue);
                    if (reAdWorx.test(scriptNode.childNodes[0].nodeValue) ||
                        reAdServer.test(scriptNode.childNodes[0].nodeValue))
                    {
                        //window.alert("removing script node");
                        killNode(scriptNode);
                        //window.alert("removed");
                    }
                }
                
            }
        }

        objectNodes = xpath("//object/param[@name='movie']/@value");
//window.alert("found nodes" + objectNodes);
        for(var i = 0; i < objectNodes.snapshotLength; i++) 
        {
            objectNode = objectNodes.snapshotItem(i);
            if (objectNode)
            {
                //window.alert("object content: " + objectNode.nodeValue);
                if (reAdWorx.test(objectNode.nodeValue))
                {
                    //window.alert("removing object node");
                    killNode(objectNode.ownerElement.parentNode);
                    //window.alert("removed");
                }
            }
        }

        imgNodes = xpath("//img[contains(@src, 'adworx')]");
        for(var i = 0; i < imgNodes.snapshotLength; i++) 
        {
            imgNode = imgNodes.snapshotItem(i);
            if (imgNode)
            {
                //window.alert("img content: " + imgNode.getAttribute("src"));
                killNode(imgNode);
                //window.alert("removed");
            }
            
        }

        imgNodes = xpath("//img[contains(@src, 'adServe')]");
        for(var i = 0; i < imgNodes.snapshotLength; i++) 
        {
            imgNode = imgNodes.snapshotItem(i);
            if (imgNode)
            {
                //window.alert("img content: " + imgNode.getAttribute("src"));
                killNode(imgNode);
                //window.alert("removed");
            }
            
        }

    }, false);

}
)();
