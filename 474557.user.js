// ==UserScript==
// @name        osump_rank
// @namespace   osump_rank
// @description Adds ranks of players in osu mp links
// @include     http://osu.ppy.sh/mp/*
// @include     https://osu.ppy.sh/mp/*
// @version     1
// @grant       none
// ==/UserScript==
 
function numberWithCommas(x) {
    var parts = x.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
}
 
function createCell(cell, text, style) {
    var div = document.createElement('div'), // create DIV element
        txt = document.createTextNode(text); // create text node
    div.appendChild(txt);                    // append text node to the DIV
    div.setAttribute('class', style);        // set DIV class attribute
    div.setAttribute('className', style);    // set DIV class attribute for IE (?!)
    cell.appendChild(div);                   // append DIV to the table cell
}
 
test();
 
function test()
{
    console.log("hi");
    body = document.getElementsByTagName("body")[0];
    tables = body.getElementsByTagName("table");
    var regexp = /([0-9]+)/;
    var regexpusr = /<a href=\"\/u\/[0-9]+\">(.*)<\/a>.*/;
    var scoresNpeeps = [[]];
    var players = 0;
   
    for(i = 0; i < tables.length; i++)
    {
       
        if(tables[i].parentNode.parentNode.innerHTML.match(/.*strong>Winner:<\/strong>.-*/) != null)
        {
            scoresNpeeps.length = 0;
        }
        else
        {
            try
            {
                rows = tables[i].getElementsByTagName("tr");
                players = rows.length - 1;
               
                for(x = 0; x < players; x++){
                    scoresNpeeps[x] = {};
                   
                        scoresNpeeps[x][0] = Number(regexp.exec(tables[i].rows[x+1].cells[1].innerHTML.replace(/[,]/g, ""))[1]); //score
                    scoresNpeeps[x][1] = tables[i].rows[x+1].cells[3].innerHTML; //name
                }
               
               
               
                scoresNpeeps = scoresNpeeps.sort(function(a,b){
                    return a[0] < b[0];
                });
               
                var a = document.createElement("div");
                a.innerHTML = "<strong>Winner:</strong> " + scoresNpeeps[0][1] + " (Score: " + numberWithCommas(scoresNpeeps[0][0]) + ")";
               
                tables[i].parentNode.insertBefore(a, tables[i].previousSibling);
             
             
                var tbl = tables[i].tBodies[0];
               
                var store = [];
                for(var c=0, len=tbl.rows.length; c<len; c++){
                    var row = tbl.rows[c];
                    var sortnr = parseFloat(row.cells[1].textContent.replace(" FAIL", "").replace(/,/g, ""));
                    if(!isNaN(sortnr)) store.push([sortnr, row]);
                }
                store.sort(function(x,y){
                    return y[0] - x[0];
                });
                for(var y=0, len=store.length; y<len; y++){
                    tbl.appendChild(store[y][1]);
                }
                store = null;
               
               
                scoresNpeeps.length = 0;
            }
            catch(err)
            {
                console.log("nope " + err);
            }
        }
    }
    setTimeout(function(){test();},2000);
   
}