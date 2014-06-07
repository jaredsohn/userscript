// ==UserScript==
// @name            Watchlist and Alerts on Every Page
// @description     Puts your watchlist and alerets box on every page.

// @include         http://*.roosterteeth.com/*
// @include         http://roosterteeth.com/*
// @include         http://redvsblue.com/*
// @include         http://strangerhood.com/*
// @include         http://achievementhunter.com/*
// @include         http://roosterteethcomics.com/*

// @exclude         http://redvsblue.com/members/
// @exclude         http://redvsblue.com/members/index.php*
// @exclude	        http://redvsblue.com/members/signin.php*
// @exclude     	http://strangerhood.com/members/
// @exclude     	http://strangerhood.com/members/index.php*
// @exclude	        http://strangerhood.com/members/signin.php*
// @exclude         http://achievementhunter.com/members/
// @exclude         http://achievementhunter.com/members/index.php*
// @exclude	        http://achievementhunter.com/members/signin.php*
// @exclude     	http://roosterteethcomics.com/members/
// @exclude     	http://roosterteethcomics.com/members/index.php*
// @exclude	        http://roosterteethcomics.com/members/signin.php*
// @exclude         http://*.roosterteeth.com/members/
// @exclude         http://*.roosterteeth.com/members/index.php*
// @exclude	        http://*.roosterteeth.com/members/signin.php*
// @exclude     	http://roosterteeth.com/members/
// @exclude     	http://roosterteeth.com/members/index.php*
// @exclude	        http://roosterteeth.com/members/signin.php*
// ==/UserScript==

(function(){
//set this to true to add a "Clear Watchlist" button to every page
var clearEnabled = false;

if(window.ActiveXObject){
  var httpRequest=new ActiveXObject("Microsoft.XMLHTTP");
}
else if(window.XMLHttpRequest){
  var httpRequest=new XMLHttpRequest();
}
httpRequest.open("GET",'http://'+document.domain+'/members/index.php', true); 
httpRequest.onreadystatechange=function(){
  if(httpRequest.readyState==4){
    if(httpRequest.status==200)
        {	
            var watchlist =document.createElement('div');
            var requestParts=httpRequest.responseText.split("View Watchlist</a></td></tr></table></td></tr></table>");

            var requestParts2=httpRequest.responseText.split("<td id='myAlertHolder'>");
            var alertlistParts=requestParts2[1].split("</td>");
            var alertlist=document.createElement('div');
            alertlist.innerHTML=alertlistParts[0];
            alertlist.getElementsByTagName("td")[0].background= "transparent";
            //alert(requestParts.parent.innerHTML);
            //var watchlistParts=requestParts[1].split("<tr><td height='16' /></tr>");
            //var requestholder = requestParts[1].split("</td></tr></table></div>");
            var requestholder = requestParts[1].split("<tr><td height='16' /></tr>");
            requestholder[0] += "</td></tr></table></div>";
            watchlist.innerHTML = requestholder[0];
            watchlist.innerHTML = watchlist.innerHTML.replace('id="Watching"', 'id="Watching" class="shown"');
            //watchlist = httpRequest.responseText.getElementById('Watching');
            var clear = document.createElement("a");
            clear.className = "small";
            clear.innerHTML = "<b>Clear Watchlist</b>";
            clear.href = "http://" + document.domain + "/members/clearWatchAlerts.php";
            
            var watchlisttest=/You have no new alerts\./i;
            var watchLength=watchlisttest.test(watchlist.innerHTML);

            if(watchLength != false)
            {
                watchlist.innerHTML="<b>Your watchlist is blank.</b>";
                    //getElementByClass('spacer', watchlist);
            }
            
            if(document.URL.search(/\/forum\//) != -1)
            {
                var Forum = document.getElementById("Forum");
                if(Forum == null)
                    Forum = document.getElementById("Group Forum");
                var trs = Forum.getElementsByTagName("tr");
                
                var clearEl = trs[0].getElementsByTagName("td")[5].childNodes[1];
                if(clearEnabled) {
                    clearEl.appendChild(document.createTextNode(" [ "));
                    clearEl.appendChild(clear);
                    clearEl.appendChild(document.createTextNode(" ] "));
                }
                //http://www.roosterteeth.com/members/clearWatchAlerts.php
                if(watchlist.innerHTML != "<b>Your watchlist is blank.</b>")
                {
                    try
                    {
                        var insidethedivs;
                        //var tr2 = watchlist.getElementsByTagName("td");
                        var tr2 = watchlist.getElementsByTagName("table");

                        //alert(tr2.length);
                        var innerdivs = watchlist.getElementsByTagName('div');

                        var dividernum;
                        //alert(watchlist.firstChild.firstChild.childNodes[1].firstChild);
                        for(i=1;i<innerdivs.length;i++)
                        {
                            if(innerdivs[i].className == "divider")
                            {
                                dividernum=i;
                            
                            }
                            
                            if(innerdivs[i].className != "divider")
                            {
                                innerdivs[i].style.width = "237px";
                                innerdivs[i].style.padding = "8px 0pt";
                                innerdivs[i].style.float = "left";
                                insidethedivs = innerdivs[i].getElementsByTagName("*");
                        
                            }
                        }

                      while(trs[4].hasChildNodes()) {
                        trs[4].removeChild(trs[4].firstChild);
                      }

                        trs[4].appendChild(document.createElement("td"));
                        trs[4].firstChild.appendChild(tr2[0]);
                        trs[4].firstChild.borderTop = "1px solid rgb(221, 221, 221)"; 
                        trs[4].firstChild.paddingTop = "3px";
                        trs[4].firstChild.colSpan = "2";
                   //     trs[4].innerHTML = "<td style='border-top: 1px solid rgb(221, 221, 221); padding-top: 3px;' colspan='2'><table>" + tr2[0].innerHTML + "</table></td>";
                    }
                    catch(err)
                    {
            
                        var tbodyneeded = Forum.getElementsByTagName("tbody");
                        var newtr = document.createElement("tr");
                        tbodyneeded[1].insertBefore(newtr, tbodyneeded[1].firstChild.nextSibling);
                        trs[4].innerHTML = "<td style='border-top: 1px solid rgb(221, 221, 221); padding-top: 3px;' colspan='2'><table>" + tr2[0].innerHTML + "</table></td>";
                        //console.log("WTF MATE");
                        var tables = Forum.getElementsByTagName("table");
                        //alert(trs[4].innerHTML);
                    }
                }
            }
            else
            {
                watchlist.setAttribute('align', 'center');
                if(watchlist.innerHTML != "<b>Your watchlist is blank.</b>" && clearEnabled) {
                    var clearDiv = document.createElement("div");
                    clearDiv.setAttribute('align', 'left');
                    
                    clearDiv.appendChild(document.createTextNode(" [ "));
                    clearDiv.appendChild(clear);
                    clearDiv.appendChild(document.createTextNode(" ] "));
                    
                    watchlist.insertBefore(clearDiv, watchlist.firstChild);
                }
                document.getElementById('pageContent').getElementsByTagName("table")[2]
                                                      .insertBefore(watchlist,document.getElementById('pageContent')
                                                                                        .getElementsByTagName("table")[2].firstChild);
            }
            document.getElementById('pageContent').getElementsByTagName("table")[2]
                                                      .insertBefore(alertlist,document.getElementById('pageContent')
                                                                                        .getElementsByTagName("table")[2].firstChild);
        }
        else
        {
            window.console=window.console||{log:opera.postError}||{log:alert};
            console.log("Error loading watchlist page\n"+ httpRequest.status +":"+ httpRequest.statusText);
        }
    }
  };
httpRequest.send(null);
})();

var allHTMLTags = new Array();

function getElementByClass(theClass, watchlist) 
{
    //Create Array of All HTML Tags
    var allHTMLTags=document.getElementsByTagName("*");

    //Loop through all tags using a for loop
    for (i=0; i<allHTMLTags.length; i++) 
    {
        //Get all tags with the specified class name.
        if (allHTMLTags[i].className==theClass) 
        {
            var holder = allHTMLTags[i].innerHTML;
            allHTMLTags[i].innerHTML = watchlist.innerHTML + "<br \>" + holder;
        }
    }
}
