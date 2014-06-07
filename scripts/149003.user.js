// ==UserScript== 
// @name TC WW Competition
// @namespace viman/ 
// @description WW page enhancement
// @include http://www.torn.com/competitionworldwar.php*
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.7/jquery.min.js
// ==/UserScript== 


var myList = {};

function ajax(url, method, data, async, success, error) {
    jQuery.ajax({
            url:        url,
            type:       method,
            data:       data,
            cache:      false,
            async:      async,
            error:      function(xhr, err) { 
                            //alert("readyState: "+xhr.readyState+"\nstatus: "+xhr.status); 
                            //alert("responseText: "+xhr.responseText); 
                            error(xhr, err); 
                        },
            success:    function(result) {
                            success(result);
                        }
        });        
}

function myCountry() {
    var pageUrl = document.location.href;
    
    var theList = $('.list');
    
    myList = {};
    
    if (theList.length > 1) {
        
        var targetTrRow = $(theList[0]).find('tr').length - 3;
        var enlisted = parseInt($(theList).find('tr:eq(' + targetTrRow+ ')').find('td:eq(5)').html());

        var targetsTable = $(theList[theList.length - 1]);
        var tRows = targetsTable.find("tr");
        var headerRow = tRows[0];
        
        $(tRows).each(function(){
            var value = $(this).find('td:eq(2)').find('a').attr('href');
            //alert('1: ' + value);
            myList[value] = true;
        });

        //alert(Object.keys(myList).length);

        var k = 0;
        for (k = 0; k <= 6; k++) {
            //function ajax(url, method, data, async, success, error) {
            ajax(pageUrl, 'GET', null, false, function(data) {
                var moreData = getTheList(data);
                $(moreData).each(function(){
                    var value = $(this).find('td:eq(2)').find('a').attr('href');
                    if (myList[value] == null) {
                        myList[value] = true;
                        $(targetsTable).append($(this));
                    }
                });
            }); 
            // alert(Object.keys(myList).length);
            //alert("Iter: " + (k + 1) + "\nEnlisted: " + enlisted + "\nRetrieved: " + (Object.keys(myList).length - 1));
            if (Object.keys(myList).length - 1 == enlisted) {
                break;
            }
        }
        sortTable(targetsTable);
        alert("\nRetrieved: " + (Object.keys(myList).length - 1));
        //printProfileIds(myList);
    }
}

function printProfileIds(myList) {
    var theList = $('.list');
    var targetsTable = $(theList[theList.length - 1]);
    var dataTable = document.createElement("table");
    $(dataTable).insertAfter(targetsTable);
    $(dataTable).append("<tr>" 
        + "<th> COUNT </th>" 
        + "<th> ID  </th>" 
        + "<th> NAME </th>" 
        + "<th> LEVEL </th>" 
        + "<th> ATTACKS </th>" 
        + "</tr>");
    var count=0;
    $(targetsTable).find("tr").each(function() {
        if (count++ > 0) {
            var id = $(this).find('td:eq(2)').find('a').attr('href').substring("profiles.php?XID=".length + 1);
            var name = $(this).find('td:eq(2)').find('img').attr('title');
            var attacks = $(this).find('td:eq(6)').text();
            var level = $(this).find('td:eq(3)').text();
            // alert(count + "\nId: " + id + "\nName: " + name + "\nLevel: " + level + "\nAttacks: " + attacks);
            $(dataTable).append("<tr>" 
                + "<td>" + (count - 1) + "</td>" 
                + "<td>" + id + "</td>" 
                + "<td>" + name + "</td>" 
                + "<td>" + level + "</td>" 
                + "<td>" + attacks + "</td>" 
                + "</tr>");
        }
    });
}

//http://stackoverflow.com/questions/3160277/jquery-table-sort
function sortTable(vTable)
{
    var tRows = vTable.find("tr");
    
    var levelsOffline = {};
    var levelsOnline = {};
    var maxLevel = 0;
    for (var i = 1; i <= tRows.length - 1; i++)
    {
        var r1 = tRows[i];
        var lvl = parseInt($(r1).find('td:eq(3)').text());
        var online = $(r1).find('td:eq(0) li').attr('title');
        var key = $(r1).find('td:eq(2)').find('a').attr('href');
        if (online.indexOf('Online') != -1) {
            if (!levelsOnline[lvl])
                levelsOnline[lvl] = [];

            levelsOnline[lvl].push(r1);
        } else {
            if (!levelsOffline[lvl])
                levelsOffline[lvl] = [];

            levelsOffline[lvl].push(r1);
        }
        if (maxLevel < lvl) maxLevel = lvl;
    }
    
    $(vTable).find("tr:gt(0)").remove();

    var counter = 0;
    for (var i = maxLevel; i > 0 ; i--) {
        var items = levelsOnline[i];
        if (items) {
            $(items).each(function(){
                $(vTable).find('tr:last').after(this);
                counter++;
            });
        }
    }

    for (var i = maxLevel; i > 0 ; i--) {
        var items = levelsOffline[i];
        if (items) {
            $(items).each(function(){
                $(vTable).find('tr:last').after(this);
                counter++;
            });
        }
    }
    //alert("Total Targets: " + counter);
}


function getTheList(data)
{
    var theList = $(data).find('.list');
    if (theList.length > 1) {
        var targetsTable = $(theList[theList.length - 1]);
        var target = targetsTable.find("tr");
        //alert(target.length);
        return target;
    }
    return null;
}

function worldStats() {
    var theList = $('.list');
    var targetsTable = $(theList[theList.length - 1]);
    var rows = $(theList[theList.length - 1]).find('tr');
    var dataTable = document.createElement("table");
    $(dataTable).insertAfter(targetsTable);
    $(dataTable).append("<tr>" 
        + "<th>NAME</th>" 
        + "<th>WINS</th>" 
        + "<th>LOSSES</th>" 
        + "</tr>");

    for (var i = 0; i < 20; i++) {
        var r = rows[i + 1]
        var name = $(r).find('td:eq(1)').find('img').attr('title');
        var wl = $(r).find('td:eq(3)').text();
        $(dataTable).append("<tr>" 
            + "<td>" + name + "</td>" 
            + "<td>" + wl.replace(' / ', '</td><td>') + "</td>" 
            + "</tr>");
    }
}

function loadJQ(callback) { 
  var script = document.createElement("script"); 
  script.setAttribute("src", "//code.jquery.com/jquery-latest.min.js"); 
  script.addEventListener('load', function() { 
    var script = document.createElement("script"); 
    script.textContent = "jQuery.noConflict();(" + callback.toString() + ")();"; 
    document.body.appendChild(script); 
  }, false); 
  document.body.appendChild(script); 
} 

function director() {
    var pageUrl = document.location.href;
    if (pageUrl.indexOf('?ID=') > -1) {
        myCountry();
    } else {
        //worldStats();
    }
}

//jQuery(document).ready(function () {
//    myCountry();
//});    
loadJQ(director());

//26, 50, 70, 89, 108, 