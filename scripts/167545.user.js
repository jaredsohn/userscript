// ==UserScript==
// @name        LARA Hide On Hold Rows
// @namespace   rjvdboon.lara
// @include     *Job_search_results.aspx*
// @version     1
// @grant       none
// ==/UserScript==
var resultTable = document.getElementById("GrJobSearchResult");
var statusColumn = -1;
if (resultTable && resultTable.rows && resultTable.rows.length > 1) {
    if (statusColumn < 0) {
        var rows = resultTable.rows;
        for(var c = 0; c < rows[0].cells.length; c++) {
            if (rows[0].cells[c].textContent == "Status"){
                statusColumn = c;
                break;
            }
        }
        if (statusColumn < 0) { // fallback to the last column
            console.warn('Setting the statusColumn to the columnnumber of the last column of the first row as a fallback');
            statusColumn = rows[0].cells.length - 1;
        }
    }
            
    function newtogglebutton(title, statusText, invert) {
        var togglebutton = document.createElement("a");
        togglebutton.textContent = "Hide " + title;
        togglebutton.className = "bodytext";
        togglebutton.style.color = "orange";
        togglebutton.statusTextFilter = statusText;
        togglebutton.titlePart = title;
        togglebutton.invertMatch = invert;
        togglebutton.isVisible = true;
        togglebutton.isMatch = function(cell) {
            if (!cell)
                return false;
            if (!cell.textContent)
                return false;
            var m = cell.textContent == togglebutton.statusTextFilter;
            if (togglebutton.invertMatch)
                return !m;
            return m;
        }
        togglebutton.addEventListener("click", function(e){
            var that = e.target;
            that.isVisible = !that.isVisible;

            var rows = resultTable.rows;

            var toggled = 0;
            for (var r = 1; r < rows.length; r++) {
                var cell = rows[r].cells[statusColumn];
                if (that.isMatch(cell)){
                    toggled++;
                    if (!that.isVisible)
                        rows[r].style.display = "none";
                    else
                        rows[r].style.display = "";
                }
            }
            var newTitle = that.isVisible ? "Hide " : "Show ";
            newTitle += that.titlePart + " (" + toggled + ")";
            that.textContent = newTitle;
        });
        return togglebutton;
    }
    var onHoldButton = newtogglebutton("On Hold", "On Hold", false);
    resultTable.parentNode.insertBefore(onHoldButton, resultTable);
    onHoldButton.click();
    var sep = document.createElement("span");
    sep.textContent = "   ";
    resultTable.parentNode.insertBefore(sep, resultTable);
    var otherButton = newtogglebutton("Other", "On Hold", true);
    resultTable.parentNode.insertBefore(otherButton, resultTable);
}
