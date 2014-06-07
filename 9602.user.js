// ==UserScript==
// @name           FitDay WW Points
// @namespace      infinitesteps.blogspot.com
// @description    Weight Watchers Points for FitDay
// @include        http://www.fitday.com/WebFit/DayFoodsTab.asp
// ==/UserScript==

function do_buildWW() {

    //Find summary table
    var tables = document.getElementsByTagName("table");
    for(var i=0; i<tables.length; i++){
        if(tables[i].getAttribute('class') == 'data_sheet'){
            var data_sheet = tables[i];
        }
    }
    
    //Get the tbody
    data_sheet_tbody = data_sheet.getElementsByTagName("tbody")[0];
    
    //Get values
    numre = new RegExp("([0-9]+)"); 
    var myrows = data_sheet_tbody.getElementsByTagName('tr');
    var mycols;
    
    //Loop through the summary table to extract the values
    for(var j=0; j<myrows.length; j++){
        
        mycols = myrows[j].getElementsByTagName('td');
        for(var k=0; k<mycols.length; k++){
            
            //Calories
            if(j == 1 && k == 2){
                myMatches = mycols[k].innerHTML.match(numre);
                var calories = myMatches[1];
                //alert('Calories = '+myMatches[1]);
            }
            
            //Fiber
            if(j == 7 && k == 1){
                myMatches = mycols[k].innerHTML.match(numre);
                var fiber = myMatches[1];
                //alert('Fiber = '+myMatches[1]);
            }
            
            //Fat
            if(j == 2 && k == 1){
                myMatches = mycols[k].innerHTML.match(numre);
                var fat = myMatches[1];
                //alert('Fat = '+myMatches[1]);
            }
        }      
    }
    
    //The magic ww calculation
    if(fiber > 4){
        fiber = 4;
    }
	points = Math.round(calories/50 + fat/12 - fiber/5);
	    
    //Build new row
    var row = document.createElement("TR");
    var cell_1 = document.createElement("TD");
    var cell_2 = document.createElement("TD");
    var cell_3 = document.createElement("TD");
    var cell_4 = document.createElement("TD");
    
    //Add cell contents
    cell_1.innerHTML = 'WW Points:';
    cell_2.innerHTML = points+'&nbsp;';
    
    //Decorate
    row.setAttribute('style', 'background-color:white');
    cell_1.setAttribute('class', 'data_sheet_highlight');
    cell_2.setAttribute('class', 'data_sheet_highlight');
    cell_2.setAttribute('align', 'right');
    
    row.appendChild(cell_1);
    row.appendChild(cell_2);
    row.appendChild(cell_3);
    row.appendChild(cell_4);
    data_sheet_tbody.appendChild(row); 
    
}


do_buildWW();