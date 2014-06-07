// ==UserScript==
// @name           TopLabels
// @namespace      GMAIL.Labels
// @description    Draws the labels on top of the active window so that you dont have to scroll down
// @include        https://mail.google.com/mail/*
// @include        http://mail.google.com/*
// @include 	   https://mail.google.com/a/*
// @include 	   http://mail.google.com/a/*
// ==/UserScript==


var GM_JQ = document.createElement('script');

// Ugly hack. Please don't laugh at me.
var toggleFuncStr =  "function toggleLabels(show) {";
toggleFuncStr += "if(document.getElementById('gmail.lazy.labels').style.display == 'none'){";
toggleFuncStr += "document.getElementById('gmail.lazy.labels').style.display = '';} else {";
toggleFuncStr += "document.getElementById('gmail.lazy.labels').style.display = 'none';}";
toggleFuncStr += "}";

GM_JQ.innerHTML = toggleFuncStr;
GM_JQ.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(GM_JQ);


window.addEventListener('load', function() {
    
    if (unsafeWindow.gmonkey) {

        unsafeWindow.gmonkey.load('1.0', function(gmail) {
            function drawLabels(){
               
		var lblLinkStr = '';
                var allnodes = gmail.getNavPaneElement().childNodes[0].childNodes;
                var labelsDiv = allnodes[3];
                var t = innerText(labelsDiv.innerHTML);
                t = t.replace(/&nbsp;/,"");
                t = t.replace(/Labels/ig,""); 
                t = t.replace(/\u25BC/ig,","); 
                
                // At this point, t is holding a comma seperated list of labels
                var lblArr = t.split(',');
                var lblLinkStr = "";
                for(i = 0; i < (lblArr.length - 1); i++){
                    lblLinkStr = lblLinkStr + " | ";
                    lblLinkStr = lblLinkStr +  getLblLink(lblArr[i],i);
                }
                
                var doka = gmail.getActiveViewElement();
                var fc = doka.firstChild;
                var selfId = fc.getAttribute("id");
                
                var labelTabs = document.createElement("div");
                var container = document.createElement("div");
                var showHide = document.createElement("div");
                showHide.innerHTML = "<a href=# style='font-family:verdana; font-color:#000055; font-size:small; text-decoration:none;' show=true onClick='  toggleLabels(this.show); this.show=!(this.show);'>Show/Hide Labels</a>";
                
                labelTabs.innerHTML = lblLinkStr;
                labelTabs.setAttribute("id","gmail.lazy.labels");
                container.setAttribute("id","gmail.lazy.labels.container");
                container.appendChild(showHide);
                container.appendChild(labelTabs);            
                
                if(selfId == "gmail.lazy.labels.container"){
                    doka.removeChild(doka.firstChild);
                }
                
                doka.insertBefore(container,doka.firstChild);	
            }
            
            gmail.registerViewChangeCallback(drawLabels);
            drawLabels();
            
        });
        	
    }
}, true);

function getLblLink(lbl,i){
    var style = " style='font-family:verdana; font-color:#000055; font-size:small; text-decoration:none;";
    if(hasUnreadEmails(lbl)){
        style = style + " background-color:#FFE5B4;";
    }
    style = style + "' ";
    var str = "<a href=#"+i + style +" id='"+ formatLabel(lbl) +"' onClick='document.getElementById(\":ra\").value=\"label:\"+this.id; document.getElementById(\":r9\").click()' >";
    str = str + lbl + "</a>";
    return str;
}

var regExp = /<\/?[^>]+>/gi;
function innerText(xStr){
    xStr = xStr.replace(regExp,"");
    return xStr;
}

function trim(str){
    return str.replace(/^\s+|\s+$/g,"");
}

function formatLabel(lbl){
    lbl = lbl.toLowerCase();
    lbl = lbl.replace(/\(\d*\)$/g,'');
    lbl = trim(lbl);
    lbl = lbl.replace(/\s+/g,'-');	
    lbl = lbl.replace(/\//g,'-');	
    lbl = lbl.replace(/&amp;/g,'-');
    return lbl;
}

function hasUnreadEmails(lbl){
    var x = lbl.replace(/\(\d*\)$/g,'');
    return (x != lbl);
}
