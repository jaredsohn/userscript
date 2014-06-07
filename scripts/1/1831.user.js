/*
Amazon/listal Helper

Version 0.05
(C) 2005 Joshua Frederick

Changelog: 
0.05 - Updated to work with Greasemonkey 0.6.4
0.04 - Code clean up, changed style, made button links clickable (so you can control click to open in a new tab) (2005.09.28)
0.03 - Updated Submit to work with latest web version (2005.09.27)
0.02 - Added Amazon.co.uk support
0.01 - First Version

*/

// ==UserScript==
// @name          Amazon/listal Helper
// @namespace     http://listal.com/
// @description   Creates a link on amazon.com pages to add the viewed item to your listal collection/wishlist
// @include       http://amazon.com*
// @include       http://www.amazon.com*
// @include       http://amazon.co.uk*
// @include       http://www.amazon.co.uk*
// ==/UserScript==

(function() {
    var listalButtons =
    {
        go: function()
        {
            itemASIN = this.getISBNorASIN();
            if (itemASIN != undefined){
                div = document.createElement("div");
                div.setAttribute("id", "listalButtons");
                div.style.position = 'absolute';
                div.style.color = '#663';
                div.style.top = '0';
                div.style.right = '0';
                div.style.margin = "0px";
                div.style.padding = "3px 10px 8px 3px";
                div.style.font = 'bold .8em arial';

                aCollection = this.createLink('collection', 'Add to collection');
                aWanted = this.createLink('wanted', 'Add to wanted');

                div.appendChild(aCollection);
                div.appendChild(aWanted);

                body = document.getElementsByTagName("body")[0];
                body.insertBefore(div, body.firstChild);
            }
        }

        ,createLink: function(id, text)
        {
            var link = document.createElement('a');
            link.id=id;
            link.style.color = '#663';
            link.style.margin = '2px';
            link.style.padding = '5px 10px';
            link.style.border = '1px solid #66c';
            link.style.background = '#ffc';
            link.href="http://www.listal.com/addasin/?asin="+listalButtons.getISBNorASIN()+"&"+id+"="+text;
            link.appendChild(document.createTextNode(text));
            link.addEventListener('click',this.addTolistal,true);
            //link.onclick = this.addTolistal;
            return link;
        }

        ,addTolistal: function(event){
            event.preventDefault();
            var command = this.innerHTML;
            var collection = this.id;
            var asin = listalButtons.getISBNorASIN();
            GM_xmlhttpRequest({
                method:"GET",
                url:"http://www.listal.com/addasin/?asin="+asin+"&"+collection+"="+command,
                onload:function(details) {
                response = details.responseText;
                if (/Added/g.test(response)){
                    document.getElementById('listalButtons').innerHTML='<p style="border: 1px solid #66c; font-weight: bold; margin: 2px; padding: 5px 10px; background: #ffc;">Item added to <a href="http://www.listal.com">listal</a>!</p>';
                }
                else {
                    document.getElementById('listalButtons').innerHTML='<p style="border: 1px solid #66c; font-weight: bold; margin: 2px; padding: 5px 10px; background: #ffc;">Error occured attempting to add item to listal.<br/>Are you logged in?<br/>Has listal been updated recently?</p>';
                }
            }
            });
            return false;
        }

        // borrowed from 'Amazon.*: XML Feeds' (http://userscripts.org/scripts/source/668.user.js)
        ,getISBNorASIN: function()
        {
            isbn = document.location.href.match(/\/([0-9A-Z]{10})(\/|\?|$)/);
            return isbn ? isbn[1] : null;
        }
    }   
    listalButtons.go();

})();

