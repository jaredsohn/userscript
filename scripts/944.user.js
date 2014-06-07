// ==UserScript==
// @namespace     http://www.geocities.com/hunt_share
// @name          Yahoo Bookmarks Extras
// @description   Enables sorting of Yahoo Bookmarks Web UI tables
// @include       http://e.my.yahoo.com/config/set_bookmark*
// @include       http://bookmarks.yahoo.com/config/set_bookmark*
// ==/UserScript==

(function() {

  var tables = document.bookmarks_form.getElementsByTagName("table")
    var table = null
    for (var i = 0; i < tables.length; i++) {
      if (tables[i].rows.length > 0
          && tables[i].rows[0].cells[0].textContent == "Name"
          && tables[i].rows[0].cells[1].textContent == "Comments"
          && tables[i].rows[0].cells[3].textContent == "Edit") {
        table = tables[i]
        break
      }
    }

  var row = table.rows[0]
    row.cells[0].style.cursor = row.cells[1].style.cursor = row.cells[2].style.cursor = "pointer"
    row.cells[0].style.color = row.cells[1].style.color = row.cells[2].style.color = "#0000d0"
    row.cells[0].style.textDecoration = row.cells[1].style.textDecoration = row.cells[2].style.textDecoration = "underline"

    row.cells[0].onclick = row.cells[1].onclick = row.cells[2].onclick = function() {
    var getTableBodies = function(tableEl) {
      var parentEl = tableEl.parentNode
      while (parentEl.nodeName != "TABLE") {
        parentEl = parentEl.parentNode
        if (parentEl.nodeName == "BODY") {
          return null
        }
      }
      return parentEl.tBodies
    }
    
    this.sortColumn = function(clickedCol) {
      var tableBodyEls = getTableBodies(clickedCol)
      if(tableBodyEls && tableBodyEls[0].rows.length <= 2) {
        return
      }

      var columnData = new Array(tableBodyEls[0].rows.length)

      for (var i = 1; i < tableBodyEls[0].rows.length; i++) {
        columnData[i] =
        tableBodyEls[0].rows[i].cells[clickedCol.cellIndex].textContent
        if (clickedCol.cellIndex == 2) {
          columnData[i] =
          Date.parse(columnData[i].replace(/(\d+)-(\D+)-(\d+)/, "$2 $1, $3"))
        }
      }

      columnData.sort()
      if (this._order == 1) {
        columnData.reverse()
        this._order = -1
      } else {
        this._order = 1
      }

      for (var i = 0; i < columnData.length; i++) {
        for (var j = 1; j < tableBodyEls[0].rows.length; j++) {
          var tc = 
          tableBodyEls[0].rows[j].cells[clickedCol.cellIndex].textContent
          if (clickedCol.cellIndex == 2) {
            tc = Date.parse(tc.replace(/(\d+)-(\D+)-(\d+)/, "$2 $1, $3"))
          }
          if (columnData[i] == tc) {
            tableBodyEls[0].appendChild(tableBodyEls[0].rows[j])
            break
          }
        }
      }

    }

    this.sortColumn(this)
  };

 })();
