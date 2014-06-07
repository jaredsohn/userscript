// ==UserScript==
// @name           WikipediaFootnotePopup
// @namespace      com.nogoodatcoding.greasemonkey
// @description    Displays the footnotes in Wikipedia articles when you hover over the numbered superscript for a citation. Original script by Lukas Mathis [http://ignorethecode.net/blog/2010/04/20/footnotes/]. Modified by no.good.at.coding [http://nogoodatcoding.com/projects/wikipedia-footnote-popup-script]
// @include        http://*.wikipedia.org/wiki/*
// @include        https://*.wikimedia.org/*
// @version 0.5
// ==/UserScript==
(function() {
    var sups = document.getElementsByTagName('sup');
    var footnotehtml = [];
    window.footnoteinuse = false;
    for(var i=0; i<sups.length; i++) {
        var sup = sups[i];
        if(sup['id']) {
            if(!sup.childNodes[0]) continue;
        
        var child = sup.childNodes[0];
        if(!child['href']) continue;

        var hrefValue = child['href'];
        var footnr = hrefValue.substr(hrefValue.indexOf('#')+1);

        var footnote = document.getElementById(footnr);
        if(!footnote) continue;
        
        footnotehtml[i] = footnote.innerHTML;
        sup.setAttribute('footnoteindex',i);
        sup.addEventListener('mouseover',
                                function(event) {
                                    window.footnoteinuse = false;
                                    var footnotepopup = document.getElementById('footnotepopup');
                                    if(footnotepopup) footnotepopup.parentNode.removeChild(footnotepopup);
                                    var index = parseInt(this.getAttribute('footnoteindex'));

                                    var popup = document.createElement('div');
                                    popup.innerHTML = footnotehtml[index];
    
                                    popup.id = 'footnotepopup';
                                    popup.style.position = 'absolute';
                                    popup.style.left = (event.pageX - 50) + 'px';
                                    popup.style.top = (event.pageY + 10) + 'px';
                                    popup.style.width = 'auto';
                                    popup.style.textAlign = 'left';
                                    popup.style.backgroundColor = '#F9F9F9';
                                    popup.style.border = '1px solid #636363';
                                    popup.style.padding = '10px';
                                    popup.style.zIndex = '99';
                                    popup.className = 'references-small';
    
    
                                    popup.addEventListener('mouseover', function(event){
                                    window.footnoteinuse = true;
                                },
                                true);
            
                                popup.addEventListener('mouseout',
                                                        function(event){
                                                            window.footnoteinuse = false;
                                                                
                                                            var footnotepopup = document.getElementById('footnotepopup');
                                                            window.setTimeout(function(){
                                                                                if(footnotepopup && !window.footnoteinuse && footnotepopup.parentNode) {
                                                                                    footnotepopup.parentNode.removeChild(footnotepopup);
                                                                                }
                                                                            },
                                                                            150);
                                                        }, 
                                                        true);
                                /*Click listeners for popup and the whole page to allow dismissing of popup by clicking outside it*/  
                                popup.addEventListener('click',
                                                        function(event){
                                                            event.stopPropagation();
                                                            return false;
                                                        },
                                                        true);
                                                        
                                document.getElementsByTagName('body')[0].addEventListener('click',
                                                        function(event){
                                                            window.footnoteinuse = false;
                                                            var footnotepopup = document.getElementById('footnotepopup');
                                                            if(footnotepopup){
                                                                footnotepopup.parentNode.removeChild(footnotepopup);
                                                            }
                                                        },
                                                        false);
                                                        
                                document.body.appendChild(popup);
                                },
                                true);
        
        
        sup.addEventListener('mouseout',
                            function(event) {
                                var footnotepopup = document.getElementById('footnotepopup');
                                window.setTimeout(function(){
                                    if(footnotepopup && !window.footnoteinuse && footnotepopup.parentNode) {
                                        footnotepopup.parentNode.removeChild(footnotepopup);
                                    }
                                },
                                150);
                            },
                            true);
        }
    }
})();