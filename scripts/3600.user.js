// ==UserScript==
// @name            StumbleUpon Quick tag
// @namespace       http://www.jonasjohn.de/
// @description     This script adds an small panel to the new review page which allowes you to add top popular tags and top personal tags in a fast way to new sites. This function is inspired by the add link form of del.icio.us. 
// @include         http://www.stumbleupon.com/url/*
// @license         Modified BSD license (URL: http://www.jonasjohn.de/lab/swe/sqt_license.txt)
// @version	        0.2
// ==/UserScript==

(function(){

    var sqt_ver = '0.2';
    var sqt_str0 = 'Quick Tag [hide]';
    var sqt_str1 = 'Quick Tag [show]';
    
    function sqt_setup(){

        var sqt_str2 = " / Your top tags: ";
        var sqt_str3 = "Popular tags for this link: ";
        var sqt_xp_root = "id('body')/center/table[2]/tbody/tr[3]/td[2]/table/tbody/";
           
        var sbtn = GM_getValue('sqt_show', true);
    
        var xp = sqt_xp_root + "tr[3]/td/table/tbody/tr[1]/td[2]";
        var parentTd = document.evaluate(xp, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
        if (parentTd.snapshotLength == 1){
            
            var title = (sbtn) ? sqt_str0 : sqt_str1;
            var rbtn = " - <b><a href=\"javascript:void(0);\" id=\"sqt_toggle_btn\">"+title+"</a></b>";
    
            xp = sqt_xp_root + "tr[4]/td/table/tbody/tr/td[1]";
            var r = document.evaluate (xp, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null );
            if (r.snapshotLength == 1){
                
                var links = r.snapshotItem(0).getElementsByTagName('a');
                var style = (sbtn) ? ' display:block' : ' display: none';
                var box = '';
                
                var lnk = "<a href=\"javascript:void(0)\" onclick=\"var tt=document.getElementById('tagtext');tt.value+=(tt.value=='')?this.innerHTML:', '+this.innerHTML;tt.value=tt.value.replace(', , ',', ');\">";
                
                for (var l=0; l < links.length; l++){
                    box += lnk + links[l].innerHTML + "</a>";
                    if ((links.length-1) != l){ box += ", "; }
                }
                
                box += sqt_str2;
                
                // get top 5 tags from select box ~ hxseven
                for (var l=1; l <= 5; l++){
                    try {
                        box += lnk + document.getElementById('addtag').options[l].value + "</a>";
                        if (5 != l){ box += ", "; }
                    }
                    catch(e) { continue; }
                }
                
                // add box:
                parentTd.snapshotItem(0).innerHTML += rbtn + "<div id=\"sqt_box\" style=\"padding: 5px 0px 5px 0px; font-size: 85%; margin: 1px 0px 1px 0px;"+style+"\">" + sqt_str3 + box + "</div>";
            
                xp = sqt_xp_root + "tr[3]/td/table/tbody/tr[1]/td[1]";
                var r = document.evaluate (xp, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
                if (r.snapshotLength == 1){ r.snapshotItem(0).style.verticalAlign="top"; }
            
                // add a event to the link
                document.getElementById('sqt_toggle_btn').addEventListener('click', sqt_toggle, false);
    
            }
            
        }

    }

    function sqt_toggle(){
        
        var p = document.getElementById('sqt_box');         
        GM_setValue('sqt_show', (p.style.display=='none') ? true : false);
        this.innerHTML = (p.style.display=='none') ? sqt_str0 : sqt_str1;
        p.style.display = (p.style.display=='none') ? 'block' : 'none';
        
    }

    // start? ;-)
    if (document.getElementById('tagtext')){
        sqt_setup();
    }

    
}) ();

