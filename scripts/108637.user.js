// ==UserScript==
// @name           Sumsplits for Garmin Connect
// @namespace      http://userscripts.org/scripts/show/108637
// @description    Highlight splits in Garmin Connect to view subtotals
// @include        http://connect.garmin.com/splits/*
// ==/UserScript==

location.href = "javascript:(" + function() {
    
    // Find which columns are in use and their position
    var headings = document.evaluate('//th/div/span/span/text()', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    var headindex = Array();
    for (var i = 0; i<headings.snapshotLength; i++) {
   	    headindex.push(headings.snapshotItem(i).textContent);
    }

    // Set up event listeners for all the split rows
    var unselectedRows = document.evaluate("//tr[contains(@class, 'splitsRow')]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    for (var i = 0; i < unselectedRows.snapshotLength; i++) {
        thisRow = unselectedRows.snapshotItem(i);
        thisRow.addEventListener('click', sumSplits, false)
    }
    
    // Locate the original Summary row and clone it
    var summaryFooter = document.evaluate(".//table[contains(@id, 'normalTable')]/tfoot", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    summaryRow = summaryFooter.snapshotItem(0).getElementsByTagName("tr")[0];
    subSummaryRow = summaryRow.cloneNode(true);
    
    // Now initialize the cloned row with empty values
    subSummaryCells = subSummaryRow.getElementsByTagName("td");
    subSummaryCells[0].innerHTML = 'Selected';
    clearAll();

    // Add the cloned row to the DOM
    summaryRow.parentNode.appendChild(subSummaryRow);
    
    // Primary event handler that summarizes all the selected splits
    function sumSplits(splitRow) {
        
        summary = new Array();
        
        // Find the selected splits
        var selectedRows = document.evaluate("//tr[contains(@class, 'splitsRowSelected')]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
     
        // Last selected row has been deselected, clear the sub summary row
        if (selectedRows.snapshotLength == 0) {
            clearAll();
            return;
        }
        // For each selected row, summarize each cell as appropriate and store the results
        for (var i = 0; i < selectedRows.snapshotLength; i++) {
            thisRow = selectedRows.snapshotItem(i);
            cells = thisRow.getElementsByTagName("td");
            for (j=0; j<cells.length; j++) {
		sumtype = headindex[j].toLowerCase();
		if (summary.length < j+1) {
                    summary[j] = 0.0;
                }
		if (sumtype.indexOf('split') > -1) {
			continue;
		}
		else if (sumtype.indexOf('time') > -1) {
                    summary[j] += time2seconds(cells[j].innerHTML);
                }
		else if (sumtype.indexOf('max') > -1) {
                    value = parseFloat(cells[j].innerHTML);
                    if (value > summary[j]) {
                        summary[j] = parseFloat(value);
                    }
                }
                else {
                    summary[j] += parseFloat(cells[j].innerHTML);
		}
            }
        }
        
        // Format and write results to the sub summary row
        for (i = 1; i<summary.length; i++) {
	    sumtype = headindex[i].toLowerCase()	
            if (sumtype.indexOf('time') > -1) {
                summary[i] = seconds2time(summary[i]);
            }
            else if (sumtype.indexOf('avg') > -1) {
                summary[i] = formatNumber(summary[i] / selectedRows.snapshotLength, 1);
            }
            else {
                summary[i] = formatNumber(summary[i], 2);
            }
            subSummaryCells[i].innerHTML = summary[i];
            
        } 
    }

    // Convert hh:mm:ss to seconds
    function time2seconds(text) {
    	seconds = text.split(':');
    	return(parseInt(seconds[0]) * 60 * 60 + parseInt(seconds[1]) * 60 + parseInt(seconds[2]));

    }

    // Convert seconds to hh:mm:ss
    function seconds2time(seconds) {
    	hours = pad(parseInt(seconds / (60 * 60)), 2);
    	minutes = pad(parseInt((seconds - (hours * 60 * 60)) / 60), 2);
    	seconds = pad(parseInt(seconds - (hours * 60 * 60) - (minutes * 60)), 2);
    	return(hours+':'+minutes+':'+seconds);
    }

    // Pad numbers with leading zeroes. Missing sprintf :(
    function pad(num, size) {
        var s = num+"";
        while (s.length < size) s = "0" + s;
        return s;
    }
    
    // Format numbers to n decimal places. Still missing sprintf :(
    function formatNumber(number, width) {
        return String(Math.round(number*Math.pow(10,width))/Math.pow(10,width));
    }
    
    // Reset the sub summary row to empty values
    function clearAll() {
        for (i=1; i<subSummaryCells.length; i++) {
               subSummaryCells[i].innerHTML = '-';
        }
    }
} + ")()";
