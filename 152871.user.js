// ==UserScript==
// @name       CS2 Nav Expander
// @namespace  CS
// @version    1.1									
// @match      http://*.chosenspace.com/index.php?view=*
// @match      http://*.chosenspace.com/index.php?go=nav_computer
// @require    http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.js
// @copyright  2011, 'Arvy' CS
// ==/UserScript==

var startLinkNum = 13;
var maxLinks = 12;

var maxLinkCounter = startLinkNum + maxLinks;

if(typeof(Storage)!=="undefined"){
    
    if(typeof(localStorage.links) == "undefined"){
        localStorage.links = [];
    }
    
    if($("input:[value='Scan Grid']").length > 0){
        var list = "";
        for(i=startLinkNum;i<maxLinkCounter;i++){
            if(localStorage.getItem('link-' + i) != null){
                list += "<input style='width:22px;float:left;text-align:center;margin:1px;padding: 1px 4px;' class='forms_btn nav_links' onclick=\"location.href=('" + localStorage.getItem('link-' + i) + "')\" value='" + i + "' />";
            }else{
                list += "<input style='width:22px;float:left;text-align:center;margin:1px;padding: 1px 4px;' class='forms_btn nav_links' onclick=\"localStorage.setItem('link-"+i+"',location.href);this.value='" + i + "';this.onclick='';\" value='-' />";
            }
        }
        list += '<img style="clear:both;" src="images/clear.gif" height="6" width="10" border="0">';
        $(list).insertBefore("input:[value='Scan Ion Trails']");
        
        $("input:[value='Scan Grid']").parent().css('width','100px');
        
    }else if($("td:contains('Computer')")){
        
        var list = "";
        for(i=startLinkNum;i<maxLinkCounter;i++){
            if(localStorage.getItem('link-' + i) != null){
                var link = localStorage.getItem('link-' + i);
                
                var galaxy, sector, grid;
                galaxy=link.split("system_id=")[1].split("&")[0];
                
                var label = "Galaxy " + galaxy;
                
                if(link.split("sector_id=")[1] != null){
                    sector=link.split("sector_id=")[1].split("&")[0];
                    label += " - Sector " + sector;
                }
                
                if(link.split("grid_id=")[1] != null){
                    grid=link.split("grid_id=")[1].split("&")[0];
                    label += " - Grid " + grid;
                }
                
                list += "<tr>";
                list += "<td>" + i + "</td>";
                list += "<td></td>";
                list += "<td><a href='" + link + "'>" + label + "</a></td>";
                list += "<td></td>";
                list += "<td><input onclick=\"localStorage.removeItem('link-" + i + "');this.parentNode.parentNode.style.display = 'none';\" type='submit' class='forms_btn' value='Remove' /></td>";
                list += "</tr>";
            }
        }
        
        $(list).insertAfter("td:contains('Computer') tr:last");
    }
    
}