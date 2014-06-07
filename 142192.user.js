// ==UserScript==
// @name       Comunio TM
// @version    1.0
// @description  Displays transfermarkt.de marktwert on the transfer page of the german version of comunio (pro players only)
// @include    http://www.comunio.de/exchangemarket.phtml*
// @require    http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// ==/UserScript==

var trs = document.getElementsByTagName('tr');
for (i=0; i<trs.length; i++) {
    
    $(trs[i]).attr("id","row"+i);
    $(trs[i]).prepend("<td><input type=\"checkbox\" id=\"hiderow"+i+"\"></td>");
    $("#hiderow"+i).click({row: i}, function(event) { $("#row"+event.data.row).hide(); });    
    
    parseRow(trs[i]);
}

function hideRow(row) {
    $(row).css("display","none");
}

function parseRow(row){
    var elem = row.getElementsByTagName("td");
    try {
        var link = elem[1].getElementsByTagName("a")[0].href;
        var match = link.match(/http:\/\/www.comunio.de\/bundesligaspieler\/([0-9]+)-(.+)\.html/);
        if (match) {
            getPlayerInfo(row,link,match[1]);
        }
    } catch (e) { }
}

function getPlayerInfo(row,link,id) {
    
    $.ajax({
        url: link,
        dataType: 'text',
        success: function(data) {
            try {
                
                var last5points = [];
                var maxday = 0;
                $(data).find("table.tablecontent03").find("tr").each( function(index) {
                    
                    var cols = $(this).find("td");
                    if(cols.length == 10) {
                        var day = parseInt(cols.first().text());
                        if (day >= 1 && day <= 34) {
                            if (day > maxday) { maxday = day }; 
                            last5points[day] = cols.last().text();
                        }
                    }
                    
                });
                if(maxday == 0) {
                    $(row).append("<td>n/a</td>");
                } else {
                    $(row).append("<td><b>"+maxday+"</b><br />"+last5points.slice(maxday-5>=0?maxday-5:0,maxday).join("|")+"</td>");
                }
            } catch (e) { alert(e); }
            
            
            $(data).find("a").each( function(index) {
                try {
                    if (this.href.indexOf("transfermarkt") != -1) {
                        var link2 = this.href.replace(/transfermarkt.de\/de\/spieler\/([0-9]+)\/\/aufeinenblick.html/,
                                                      "transfermarkt.mobi/de//profil/spieler_$1.html");
                        getTransferMarktInfo(row,link2);
                    }
                } catch (e) { }
            });
        }
    });
    
    $.ajax({
        url: "http://stats.comunio.de/profil.php?id="+id,
        success: function(data) {
            try {
                var seasonpoints = [];
                $(data).find("tr").each( function(index) {
                    
                    var cols = $(this).find("td");
                    if(cols.length == 2 && cols.first().text().match(/[0-9]+\/[0-9]+/)) {
                        seasonpoints.push(cols.last().text());
                    }
                    
                });
                var avg = 0;
                for (i=0; i<seasonpoints.length && i<4; i++) {
                    avg = avg + parseInt(seasonpoints[i]);
                }
                avg = avg>0?avg/i:0;
                $(row).append("<td><b>"+avg.toFixed(0)+"</b><br />"+seasonpoints.slice(0,4).join("|")+"</td>");
            } catch (e) { }
        }
    });
}

function getTransferMarktInfo(row,link) {
    
    //for (var i = 0; i < 3; i++) {
        GM_xmlhttpRequest ( {
            method:     "GET",
            url:        link,
            onload:     function (response) {
                try {
                    var match = response.responseText.match(/<td class="note">([0-9\.]*)/);
                    if(match != null && $(row).find("td").length < 14) {
                        $(row).append("<td><a href=\""+link+"\">"+match[1]+"</a></td>");
                    }
                } catch(e) { }
            }
        } );
    //}
    
    
}