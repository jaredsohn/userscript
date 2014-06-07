// ==UserScript==
// @name           Trondheimkino - available seats
// @namespace      bjorninge.net
// @include        https://trondheimkinosales.clients.newmanonline.org.uk/book/seating
// @version        0.5
// ==/UserScript==

//var log=function(){var a="history";log[a]=log[a]||[];log[a].push(arguments);window.console&&console.log[console.firebug?"apply":"call"](console,Array.prototype.slice.call(arguments))};window.logargs=function(a){log(a,arguments.callee.caller.arguments)};

function append(row, props) {
    var td = document.createElement("td"), prop;
    row.appendChild(td);
    for (prop in props) {
        if (props.hasOwnProperty(prop)) {
            td[prop] = props[prop];
        }
    }
    return td;
}


function updateAvailables(el) {
//el = document.getElementById("seating_content");
    var available = 0;
    var total = 0;
    if (el) {   
        available = el.querySelectorAll("img.seat_avail, img.seat_avail_booked").length;
        total = el.querySelectorAll("img.seat").length;
    }
    
    // Table is always available from the beginning
    var table = document.querySelector("table.two_cols.seating");
    
    var t = document.getElementById("__gm_total");
    var a = document.getElementById("__gm_avail");
    
    // Just update the totals and availables, as they exists in the document
    if (t && a) {
        t.innerHTML = "<span>" + total + "</span>";
        a.innerHTML = "<span>" + available + "</span>";
        return;
    }
    
    // totals and availables do not exist in the document,
    // create and populate them with defaults values.
    
    var row1 = document.createElement("tr");
    var row2 = document.createElement("tr");
    

        
    append(row1, { className: "firstcol", innerHTML: "Plasser:"});  
    append(row1, {className: "nopad colspacer", innerHTML: ""}); 
    append(row1, { className: "rightcol", id: "__gm_total", colSpan: 2,
        innerHTML: "<span> " + total + " (kalkulerer..)</span>"
     
    });
  
    append(row2, {className: "firstcol", innerHTML: "Ledige:"});  
    append(row2, {className: "nopad colspacer", innerHTML: ""});
    append(row2, {className: "rightcol", id: "__gm_avail", colSpan: 2,
           innerHTML: "<span> " + available + " (kalkulerer..)</span>"});
    

    table.appendChild(row1);
    table.appendChild(row2);
    
    
    
    return;
    
    
    
}

var imgIds = [];



//document.querySelectorAll("div.seating_grid img.seat_avail, div.seating_grid img.seat_avail_booked");


var container = document.querySelector("div.dialog.panel_inset");


updateAvailables();
//a seating div will be dynamically added, listen to its children
if (container) {
    container.addEventListener("DOMNodeInserted", function seatsContainerAdded(e) {
        var target = e.target;
        if (target && target.id === "seating_content") {
            // Mutation listeners are expensive. Do not listen any more, we found our seating container
            container.removeEventListener("DOMNodeInserted", seatsContainerAdded, true);
            
           
            
            //when seating_content is available, its content is also fully available 
            updateAvailables(e.target);
            
            
        }

    }, true);
}