// ==UserScript==
// @name          Yahoo TV Listings Enhancer
// @description   Enhances Yahoo TV listings under my.yahoo.com
// @include       http://my.yahoo.com/*
// ==/UserScript==
//
// author rchandran@gmail.com
(function() {
    
    // Edit this list of shows to highlight here
    var shows = new Array(
    'good eats', 'mythbusters');


    function clickHandler(event) {
        if( this.href.indexOf("&progutn=") == -1 ) {
            return true;
      }

        event.stopPropagation();
        event.preventDefault();
        var d = document.getElementById('myahgm');
        
        if(!d){
            d = document.createElement("div");
            d.id = "myahgm";
            d.style.position = "absolute";
            d.style.left = 0;
            d.style.top = 0;
            //d.style.background = "#aaccaa";
            //d.style.border = "1px solid #337733";
d.style.background = "#ccccaa";
d.style.border = "1px solid #000";
d.style.color = "#000";
            d.style.width = "300px";
            d.style.padding = "15px";
            d.style.overflow = "hidden";
            d.style.display = "none";
            d.addEventListener("click", function(e){d.style.display = "none";}, false);
            document.body.appendChild(d);        
        }
        
        var xx = findPosX(this);
        var yy = findPosY(this);
        
        GM_xmlhttpRequest({
            method:"GET",
            url:this.href,
            headers:{
                "User-Agent":"monkeyagent",
                "Accept":"text/monkey,text/xml",
            },
            onload:function(details) {
                var d = document.getElementById('myahgm');
                d.style.display = "none";
                var justDetails = details.responseText;
                var title = event.target.innerHTML;
                var xyz = justDetails.substring(justDetails.indexOf(title) + title.length);
                xyz = xyz.substring(xyz.indexOf(title) + title.length);
                justDetails=xyz.substring(xyz.indexOf(title), xyz.indexOf('<hr'));
                d.innerHTML = justDetails;
                d.style.left = xx;
                d.style.top = yy;
                d.style.display = "block";
            }
        });
        return false;
    }    
    // from http://www.quirksmode.org/js/findpos.html
    function findPosX(obj)
    {
        var curleft = 0;
        if (obj.offsetParent)
        {
            while (obj.offsetParent)
            {
                curleft += obj.offsetLeft
                obj = obj.offsetParent;
            }
        }
        else if (obj.x)
            curleft += obj.x;
        return curleft;
    }
    
    function findPosY(obj)
    {
        var curtop = 0;
        if (obj.offsetParent)
        {
            while (obj.offsetParent)
            {
                curtop += obj.offsetTop
                obj = obj.offsetParent;
            }
        }
        else if (obj.y)
            curtop += obj.y;
        return curtop;
    }
    
    
    function timebar() {
        //var ct = document.getElementById("ymyptb");
        var ct = document.getElementById("63847_bx");
        var x = document.createElement("div");
        
        var u = document.location.href;
        var ui = u.indexOf("?");
        u = u.substring(ui + 1);
        u = u.substring(u.indexOf("=") + 1);   
        u = parseInt(u);
    
        x.style.textAlign = "center";
        x.style.margin = "0px";
        x.style.color = "red";
        var nw = new Date();
        var hh = nw.getHours();
    
        y="<style>a.yxxtime{text-decoration:none;padding:3px;margin: 0 3 0 3;color:black;}</style>";
        y+="<table align=center cellpadding=0 cellspacing=0><tr><td><a href='index.html?.tvsh=" + hh + "'>Now</a></td>";
        for(var h=0;h<24;h++) {        
            var stl = (h == u) ? "font-size: 150%;background-color: #d2e4fc;" : "";
            var sst = (h < hh) ? "background-color:#e0e0e0;" : "";
            var hr = (h==0)? "12a" : ((h==12) ? "12p" : ((h>12) ? ((h-12) + "p") : (h + "a")));
            y+= "<td style='" + sst + "'>" + 
            "<a class='yxxtime' style='" + stl + "' href='index.html?.tvsh=" + h + "'>" + hr + "</a> "
            y+= "</td>";
        }

        y+= "</tr></table>";
        x.innerHTML = y;

        ct.insertBefore(x, ct.firstChild.nextChild);
    }

    // from http://alistapart.com
    function stripe(id) {

        // the flag we'll use to keep track of 
        // whether the current row is odd or even
        var even = false;
        
        // if arguments are provided to specify the colours
        // of the even & odd rows, then use the them;
        // otherwise use the following defaults:
        var evenColor = arguments[1] ? arguments[1] : "#fff";
        var oddColor = arguments[2] ? arguments[2] : "#eee";
        
        // obtain a reference to the desired table
        // if no such table exists, abort
        var table = document.getElementById(id);
        if (! table) { return; }
        
        
        
        var tab = table.getElementsByTagName("table").item(1);
        //tab.style.emptyCell = "show";
        tab.border = 0;    
        
        
        
        // by definition, tables can have more than one tbody
        // element, so we'll have to get the list of child
        // &lt;tbody&gt;s 
        var tbodies = table.getElementsByTagName("tbody");
        
        
        
        // and iterate through them...
        for (var h = 0; h < tbodies.length; h++) {
            
            // find all the &lt;tr&gt; elements... 
            var trs = tbodies[h].getElementsByTagName("tr");
            
            // ... and iterate through them
            for (var i = 0; i < trs.length; i++) {

                trs[i].style.backgroundColor = even ? "#fefefe" : "#f0fff0";
                {
                    
                    // get all the cells in this row...
                    var tds = trs[i].getElementsByTagName("td");
                    
                    
                    // and iterate through them...
                    for (var j = 0; j < tds.length; j++) {
                        
                        var mytd = tds[j];
                        mytd.style.padding = "5px";
                        mytd.style.border = "0px solid red";
                        mytd.style.borderBottom = "1px solid #cfcfcf";
                        mytd.style.borderLeft   = "1px solid #cfcfcf";
                        
                        var sow = mytd.getElementsByTagName("a");
                        if(sow.length == 1)
                        {
                            var lnk = sow.item(0);
                            lnk.style.textDecoration= "none";
                            lnk.addEventListener('click', clickHandler, true);
                            
                            var cellv = lnk.innerHTML.toLowerCase();
                            for(var ss=0;ss<shows.length;ss++) {
                                var tvs = shows[ss];                    
                                var found = false;
                                if(tvs.charAt(0) == '+'){
                                    found = (cellv == tvs.substring(1)); 
                                } else {
                                    found = (cellv.indexOf(shows[ss]) != -1);
                                }
                                if(found){
                                    mytd.style.backgroundColor = "#ffffdf";
                                    lnk.style.color = "#a05555";
                                    break;
                                }
                            }
                        }
                    }
                }
                // flip from odd to even, or vice-versa
                even =  ! even;
            }
        }
    }
    
    stripe("m_63847"); // magic id of the yahoo tv listing portlet

    var banner = document.getElementById('m_63847');
    if(banner) {
        var tbl = banner.firstChild;
        if( tbl.tagName == "TABLE") {
            banner.removeChild(tbl);
        }
    }

    document.addEventListener('click', function(){var d = document.getElementById('myahgm');if(d){d.style.display="none";}}, true)

    timebar();
})();
