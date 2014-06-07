// ==UserScript==
                // @version 0.0.1
                // 2009-4-23
                // Released under the GPL license
                // http://www.gnu.org/copyleft/gpl.html
                // @name Ticket Style        
                // @author Jesus Bustos
// ==/UserScript==
                        
                mystylesheet =  '' +
                'body {font-family: Verdana, sans-serif; color: black; background: #FFE;margin: 100px 300px auto; padding: 0px;text-align:left
                        +;}' +
                        'h1 {font: 12pt Georgia, serif;position: relative;left: 60px;}' +
                        'h2 {font-size: 12pt;position: relative;left: 60px;}' +
                        'h3 {font-size: 11pt;position: relative;left: 60px;}' +
                        'h4 {font-size: 10pt;position: relative;left: 60px;}' +
                        'a:link {color: #00A;text-decoration: none; position: relative;left: 5px;}' +
                        'a:visited {color: #666;text-decoration: none;position: relative;left: 5px;}' +
                        'a:hover {color: #008; background: #EEF;text-decoration: none;position: relative;left: 5px;}' +
                        'a, div, p, dd, li {font-size: 11pt; line-height: 170%;}'
                        
                        window.addEventListener("load", function(e) {
                            // Remove the existing embedded and linked stylesheets
                            var styles = document.getElementsByTagName('style')
                            while (styles[0])
                                styles[0].parentNode.removeChild(styles[0])
                            var links = document.getElementsByTagName('link')
                            for (var i=0; i < links.length; ++i ) {
                                var link = links[i]
                                if (link.getAttribute('rel').toLowerCase() == 'stylesheet') {
                                    link.parentNode.removeChild(link)
                                    i-- // Since we popped a node, the indexes shift by 1
                                }
                            }
                        
                            // Define the new stylesheet for the page & attach it
                            var newstyle = document.createElement("style")
                            newstyle.type = "text/css"
                            var css = document.createTextNode(mystylesheet)
                            newstyle.appendChild(css)
                            document.getElementsByTagName('head')[0].appendChild(newstyle)
                        }, false)
                        