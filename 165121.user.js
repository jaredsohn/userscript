// ==UserScript==
// @description Select data in tables the same way you select cells in a spreadsheet.
// @homepageURL http://nottheoilrig.com/cellect
// @name Cellect
// @namespace http://nottheoilrig.com
// @version 1.0.5
// ==/UserScript==

(function () {

function innerHeight(elt) {
  var style = getComputedStyle(elt);

  return elt.offsetHeight - parseFloat(style.borderTopWidth) - parseFloat(style.borderBottomWidth);
}

function innerWidth(elt) {
  var style = getComputedStyle(elt);

  return elt.offsetWidth - parseFloat(style.borderLeftWidth) - parseFloat(style.borderRightWidth);
}

function offset(elt) {
  var bcr = elt.getBoundingClientRect();

  return { left: bcr.left + pageXOffset, top: bcr.top + pageYOffset };
}

function off(target, type, listener) {
  target.removeEventListener(type, listener, true);
}

function on(target, type, listener) {
  target.addEventListener(type, listener, true);
}

// http://stackoverflow.com/questions/5598743/finding-elements-position-relative-to-the-document

// http://stackoverflow.com/questions/3680429/click-through-a-div-to-underlying-elements
var cellection = document.createElement('div');
cellection.style.background = 'rgba(135, 206, 235, .7)';
cellection.style.border = '3px double';
cellection.style.boxSizing = 'content-box';
cellection.style.MozBoxSizing = 'content-box';
cellection.style.WebkitBoxSizing = 'content-box';
cellection.style.display = 'none';
cellection.style.pointerEvents = 'none';
cellection.style.position = 'absolute';
cellection.style.zIndex = 32767;

document.body.appendChild(cellection);

var textarea = document.createElement('textarea');
textarea.style.borderRadius = 0;
textarea.style.MozBorderRadius = 0;
textarea.style.WebkitBorderRadius = 0;
textarea.style.margin = 0;
textarea.style.opacity = 0;
textarea.style.position = 'absolute';
textarea.style.top = '-32767px';
textarea.style.zIndex = 32767;
document.body.appendChild(textarea);

var anchor, anchorOffset, table,
  single = false, double = false, timeout, tableOffset,
  colWise = false, rowWise = false,
  height, left, top, width;

// Firefox collapseFix eq 0, Chrome collapseFix eq 1
var elt = document.body.appendChild(document.createElement('table'));
elt.style.borderCollapse = 'collapse';
elt.style.visibility = 'hidden';

elt = elt.appendChild(document.createElement('tr'));
elt = elt.appendChild(document.createElement('td'));
elt.style.border = '1px solid';
elt.style.padding = 0;
elt.style.width = '1px';

var collapseFix = innerWidth(elt) - 1;

// Synthetic mousedown doesn't deselect, so browser detection for now :-P
var contextmenuFix = /chrome/i.test(navigator.userAgent) ? 'contextmenu' : 'mousedown';

function cancelDouble(evt) {
  if (!evt.relatedTarget || !this.contains(evt.relatedTarget)) {
    off(this, 'mouseout', cancelDouble);

    single = false;
  }
}

// http://stackoverflow.com/questions/16157351/allow-copy-current-selection-vs-deselect-when-right-click-outside-the-selecti
function contextmenu(evt) {
  if (evt.button === 2 && evt.pageX > left && evt.pageX < left + width + 6 && evt.pageY > top && evt.pageY < top + height + 6) {
    textarea.style.left = evt.pageX + 'px';
    textarea.style.top = evt.pageY + 'px';

    textarea.select();

    setTimeout(function () { textarea.style.top = -32767 });
  }
}

function mousedown(evt) {
  if (evt.button === 0) {
    if (evt.shiftKey && !evt.ctrlKey) {
      if (anchor.nodeName.toLowerCase() === 'td' || anchor.nodeName.toLowerCase() === 'th') {
        if (table.contains(evt.target) && !anchor.contains(evt.target)) {
          var focus = evt.target;
          while (focus.nodeName.toLowerCase() !== 'td' && focus.nodeName.toLowerCase() !== 'th' && focus !== table) {
            focus = focus.parentNode;
          }

          if (focus.nodeName.toLowerCase() === 'td' || focus.nodeName.toLowerCase() === 'th') {
            redraw(focus);
          } else {
            cellection.style.display = 'none';

            off(document.body, contextmenuFix, contextmenu);
          }
        } else {
          cellection.style.display = 'none';

          off(document.body, contextmenuFix, contextmenu);
        }

        on(table, 'mouseover', mouseenter);
        on(document, 'mouseup', mouseup);
      }
    } else {
      cellection.style.display = 'none';

      off(document.body, contextmenuFix, contextmenu);

      if (!evt.shiftKey) {
        anchor = evt.target;
        while (anchor.nodeName.toLowerCase() !== 'td' && anchor.nodeName.toLowerCase() !== 'th' && anchor !== this) {
          anchor = anchor.parentNode;
        }

        if (anchor.nodeName.toLowerCase() === 'td' || anchor.nodeName.toLowerCase() === 'th') {
          anchorOffset = offset(anchor);

          table = anchor.parentNode;
          while (table.nodeName.toLowerCase() !== 'table') {
            table = table.parentNode;
          }

          if (!evt.ctrlKey) {
            on(table, 'mouseover', mouseenter);
            on(document, 'mouseup', mouseup);

            clearTimeout(timeout);
            timeout = setTimeout(function () { single = false }, 400);

            if (single) {
              double = true;
              tableOffset = offset(table);
            } else {
              single = true;
              double = false;

              on(anchor, 'mouseout', cancelDouble);
            }
          }

          colWise = rowWise = false;
        }
      }
    }
  }
}

function mouseenter(evt) {
  var focus = evt.target;
  while (focus.nodeName.toLowerCase() !== 'td' && focus.nodeName.toLowerCase() !== 'th' && focus !== this) {
    focus = focus.parentNode;
  }

  if (focus.nodeName.toLowerCase() === 'td' || focus.nodeName.toLowerCase() === 'th') {
    if (!evt.relatedTarget || !focus.contains(evt.relatedTarget)) {
      if (focus === anchor) {
        table.style.cursor = '';
        table.style.userSelect = '';
        table.style.MozUserSelect = '';
        table.style.WebkitUserSelect = '';

        cellection.style.display = 'none';
      } else {
        redraw(focus);
      }
    }
  }
}

function mouseleave(evt) {
  if (!evt.relatedTarget || !this.contains(evt.relatedTarget)) {
    cellection.style.display = 'none';
  }
}

function mouseup(evt) {
  off(this, 'mouseup', mouseup);

  table.style.cursor = '';
  table.style.userSelect = '';
  table.style.MozUserSelect = '';
  table.style.WebkitUserSelect = '';

  off(table, 'mouseover', mouseenter);
  off(table, 'mouseout', mouseleave);

  if (table.contains(evt.target) && !anchor.contains(evt.target)) {
    var focus = evt.target;
    while (focus.nodeName.toLowerCase() !== 'td' && focus.nodeName.toLowerCase() !== 'th' && focus !== table) {
      focus = focus.parentNode;
    }

    if (focus.nodeName.toLowerCase() === 'td' || focus.nodeName.toLowerCase() === 'th') {
      function callback(row) {
        function callback(cell) {
          result = cell.textContent.trim().replace(/\s+/g, ' ');

          // http://tools.ietf.org/html/rfc4180
          if (result.indexOf('"') !== -1) {
            return '"' + result.replace(/"/g, '""') + '"';
          } else {
            return result;
          }
        }

        if ((rowWise || double && focus.parentNode.rowIndex !== anchor.parentNode.rowIndex) && !colWise) {
          var cells = Array.prototype.map.call(row.cells, callback);

          rowWise = true;
        } else {
          if (focus.cellIndex > anchor.cellIndex) {
            var begin = anchor.cellIndex,
              end = focus.cellIndex;
          } else {
            var begin = focus.cellIndex,
              end = anchor.cellIndex;
          }

          var cells = Array.prototype.slice.call(row.cells, begin, end + 1).map(callback);
        }

        return cells.join('\t');
      }

      if ((colWise || double && focus.cellIndex !== anchor.cellIndex) && !rowWise) {
        var rows = Array.prototype.map.call(table.rows, callback);

        colWise = true;
      } else {
        if (focus.parentNode.rowIndex > anchor.parentNode.rowIndex) {
          var begin = anchor.parentNode.rowIndex,
            end = focus.parentNode.rowIndex;
        } else {
          var begin = focus.parentNode.rowIndex,
            end = anchor.parentNode.rowIndex;
        }

        var rows = Array.prototype.slice.call(table.rows, begin, end + 1).map(callback);
      }

      textarea.value = rows.join('\n');
      textarea.select();

      on(document.body, contextmenuFix, contextmenu);
    }
  }
}

function redraw(focus) {
  table.style.cursor = 'cell';
  table.style.userSelect = 'none';
  table.style.MozUserSelect = 'none';
  table.style.WebkitUserSelect = 'none';

  on(table, 'mouseout', mouseleave);

  getSelection().collapseToStart();

  var focusOffset = offset(focus);

  if ((colWise || double && focus.cellIndex !== anchor.cellIndex) && !rowWise) {
    height = innerHeight(table) - 2,
      top = tableOffset.top + parseFloat(getComputedStyle(table, null).borderTopWidth) - 2;

    if (getComputedStyle(table, null).borderCollapse === 'collapse') {
      if (collapseFix) {
        height -= 2;
        top += 1;
      } else {
        height -= 1;
      }
    }
  } else {
    if (focusOffset.top > anchorOffset.top) {
      var bottomElt = focus,
        bottomTop = focusOffset.top,
        topElt = anchor,
        topTop = anchorOffset.top;
    } else {
      var bottomElt = anchor,
        bottomTop = anchorOffset.top,
        topElt = focus,
        topTop = focusOffset.top;
    }

    height = bottomTop - topTop + innerHeight(bottomElt) - 2,
      top = topTop + parseFloat(getComputedStyle(topElt, null).borderTopWidth) - 2;

    if (collapseFix && getComputedStyle(table, null).borderCollapse === 'collapse') {
      height += 1;
    }
  }

  if ((rowWise || double && focus.parentNode.rowIndex !== anchor.parentNode.rowIndex) && !colWise) {
    left = tableOffset.left + parseFloat(getComputedStyle(table, null).borderLeftWidth) - 2,
      width = innerWidth(table) - 2;

    if (getComputedStyle(table, null).borderCollapse === 'collapse') {
      if (collapseFix) {
        left += 1;
        width -= 2;
      } else {
        width -= 1;
      }
    }
  } else {
    if (focusOffset.left > anchorOffset.left) {
      var leftElt = anchor,
        leftLeft = anchorOffset.left,
        rightElt = focus,
        rightLeft = focusOffset.left;
    } else {
      var leftElt = focus,
        leftLeft = focusOffset.left,
        rightElt = anchor,
        rightLeft = anchorOffset.left;
    }

    left = leftLeft + parseFloat(getComputedStyle(leftElt, null).borderLeftWidth) - 2,
      width = rightLeft - leftLeft + innerWidth(rightElt) - 2;

    if (collapseFix && getComputedStyle(table, null).borderCollapse === 'collapse') {
      width += 1;
    }
  }

  cellection.style.display = '';
  cellection.style.height = height + 'px';
  cellection.style.left = left + 'px';
  cellection.style.top = top + 'px';
  cellection.style.width = width + 'px';
}

on(document.body, 'mousedown', mousedown);

  })();
