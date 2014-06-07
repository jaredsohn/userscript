//  Copyright (C) 2008  Daniel Dawson
//
//  This program is free software; you can redistribute it and/or modify
//  it under the terms of the GNU General Public License as published by
//  the Free Software Foundation; either version 2 of the License, or
//  (at your option) any later version.
//
//  This program is distributed in the hope that it will be useful,
//  but WITHOUT ANY WARRANTY; without even the implied warranty of
//  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
//  GNU General Public License for more details.
//
//  You can download a copy of the GNU General Public License at
//  http://www.fsf.org/licensing/licenses/gpl.html or get a free printed
//  copy by writing to the Free Software Foundation, Inc., 51 Franklin
//  Street, Fifth Floor, Boston, MA 02110-1301, USA.
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
// 
// To install, you need Greasemonkey: http://www.greasespot.net/
// Then restart Firefox and revisit this script. A dialog should pop up
// asking you to confirm you really want to install the script. Click
// "install", and that's it; the next page you visit will be modified by
// the script (if it applies).
//
// To uninstall, go to Tools/Greasemonkey/Manage User Scripts,
// select "Table Floaters", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name           Table Floaters
// @namespace      http://www.icehouse.net/ddawson/
// @description    Keeps table headers visible; useful for long tables where you would otherwise scroll back and forth just to see what the columns mean.
// @author         Daniel Dawson (ddawson at icehouse dot net)
// @version        1.3.4
// @date           2008-08-11
// @homepage       http://www.icehouse.net/ddawson/software.html
// @copyright      Licensed under GPL v2
// @include        *
// ==/UserScript==
//
// Changes in 1.3.4:
//   * Added logo.
//
// Changes in 1.3.3:
//   * Updated list of style properties to be copied on cloning.
//
// Changes in 1.3.2:
//   * Fixed bug in setup: adding anonymous function as event handler for the
//     scroll event. Since all anonymous functions are distinct, another
//     redundant copy would be added every time setup ran, causing performance
//     to get gradually worse.
//   * Added config to allow a delay after setup is called through the
//     DOMSubtreeModified event, to improve performance, especially in Web 2.0
//     applications.
//
// Changes in 1.3.1:
//   * Fixed infinite loop in FF 3 caused by modifying the tree in function
//     handling DOMSubtreeModified event (fixed by temporarily removing event
//     handler in setup).
//
// Changes in 1.3:
//   * Now compensates for user-adjusted font sizes.
//   * Now rounds up header cell widths; fixes visual glitch with cell text
//     wrapping inappropriately.
//
// Changes in 1.2.1:
//   * Fixed this-qualification bug in clone-first-row-without-TH code.
//
// Changes in 1.2:
//   * Added a nice little XUL configure dialog in place of the awkward use of
//     GM userscript commands. Now just go to (Options/Tools) > Greasemonkey >
//     User Script Commands > Configure Table Floaters...
//   * Fixed an issue with floaters appearing on printouts by classing all
//     floaters as 'tableFloaterCell' and inserting an !important rule applying
//     to 'print' media.
//
// Changes in 1.1:
//   * Merged fixed-positioning and absolute-positioning versions; you now
//     choose the mode through a user script command (look under Tools >
//     Greasemonkey).
//   * Added the possibility to clone the first row of each table that defines
//     neither a 'thead' nor any 'th' cells in the first row, as a last
//     fallback. As this will catch tables that really aren't supposed to have
//     a header (e.g. the vast number of pages using tables for grid layouts!),
//     the option is disabled by default. Use the appropriate command if you
//     want to try it.
//
// Changes in 1.0:
//   * Fixed bug causing floater to disappear when cell has z-index 'auto' but
//     ancestor has non-auto z-index.
//
// Changes in 0.3:
//   * Eliminated error when none of a table's cells is cloned.
//   * Now inserts clones at beginning of body, instead of at end;
//     unfortunately, they still appear on top in FF 2 (seems to violate CSS
//     2.1).
//   * Now handles headers for multiple tables concurrently. A header for a
//     nested table is handled, so long as none of the ancestor tables has
//     its own header.
//
// Changes in 0.2:
//   * Now correctly handles theads with multiple rows.
//   * Display now properly constrained so cloned cells never show below any of
//     the real table cells (aside from delayed scroll events).
//   * Tables with no body rows are no longer even considered.
//
// Known issues:
//   * Text inside cloned cells is always top-aligned, regardless of style
//     settings (vertical-align only applies inside line boxes and table
//     cells). I know of no easy solution to this.
//   * Floaters should be stacked only just above the rest of the flow;
//     currently, if there are any fixed-position elements, the floaters will
//     appear above them, instead of below as they should. I know of no
//     solution to this.
//   * Watch out for theads that are as high or nearly as high as the window;
//     you won't be able to see anything else.
//   * You have to wait until the page finishes loading to see the floaters,
//     since page layout isn't finalized until then.
//   * There are no events for style changes in DOM 2; thus, if a property is
//     changed that affects one or more header cells, this script cannot
//     react.
//   * If any floaters are active, and you go to Print Preview, when you
//     return, new floaters will be created, but the old copies will still be
//     there where you left them, and they will be stuck in place and refuse to
//     go away. Apparently, a 'resize' event has been triggered, but why hasn't
//     the cleanup method been called?
//   * Some floaters are positioned and/or sized incorrectly. One of these days
//     I'll find out why and fix it. I suspect it involves table nesting.
//
// TODO:
//   * Maybe handle headers on the left-hand side?
//   * Maybe handle tfoot?

(function () {
  const tableFloaters = {
    checkForNestedTable: function (tableElem) {
      var elem = tableElem.parentNode;
      function eqElem (obj) { return obj == elem; }
      for (; elem; elem = elem.parentNode)
        if (elem && elem.nodeType == 1
            && (elem.tagName == 'table' || elem.tagName == 'TABLE')
            && this.processedTables.some(eqElem))
          return true;
      return false;
    },
  
    getElementOffset: function (elem) {
      offset = { x: elem.offsetLeft, y: elem.offsetTop };
      elem = elem.offsetParent;
      while (elem != null) {
        offset.x += elem.offsetLeft;
        offset.y += elem.offsetTop;
        elem = elem.offsetParent;
      }
      return offset;
    },
  
    getElementOffsetX: function (elem) {
      offset = elem.offsetLeft;
      elem = elem.offsetParent;
      while (elem != null) {
        offset += elem.offsetLeft;
        elem = elem.offsetParent;
      }
      return offset;
    },
  
    getElementOffsetY: function (elem) {
      offset = elem.offsetTop;
      elem = elem.offsetParent;
      while (elem != null) {
        offset += elem.offsetTop;
        elem = elem.offsetParent;
      }
      return offset;
    },
    
    copiedProps: [/*'azimuth',*/ 'background-attachment', 'background-color',
                  'background-image', 'background-position',
                  'background-repeat', 'border-bottom-style',
                  'border-bottom-width', 'border-collapse', 'border-image',
                  'border-left-color', 'border-left-style',
                  'border-left-width', 'border-right-color',
                  'border-right-style', 'border-right-width', 'border-spacing',
                  'border-top-color', 'border-top-style', 'border-top-width',
                  'bottom', 'box-shadow', 'caption-side', 'clear', 'clip',
                  'color', 'content', 'counter-increment', 'counter-reset',
                  /*'cue',*/ 'cursor', 'direction', 'display', /*'elevation',*/
                  'empty-cells', 'float', 'font-family', 'font-size-adjust',
                  'font-stretch', 'font-style', 'font-variant', 'font-weight',
                  'height', /*'ime-mode',*/ 'left', 'letter-spacing',
                  'line-height', 'list-style-image', 'list-style-position',
                  'list-style-type', 'margin-bottom', 'margin-left',
                  'margin-right', 'margin-top', 'marker-offset', /*'marks',*/
                  'max-height', 'max-width', 'min-height', 'min-width',
                  'opacity', 'orphans', 'outline-color', 'outline-offset',
                  'outline-style', 'outline-width', 'overflow', 'overflow-x',
                  'overflow-y', 'padding-bottom', 'padding-left',
                  'padding-right', 'padding-top', /*'page...', 'pause',
                  'pitch', 'play-during',*/ 'position', 'quotes',
                  /*'richness',*/ 'right', /*'size', 'speak', 'speech-rate',
                  'stress',*/ 'table-layout', 'text-align', 'text-decoration',
                  'text-indent', 'text-rendering', 'text-shadow',
                  'text-transform', 'top', 'unicode-bidi', 'vertical-align',
                  'visibility', /*'voice-family', 'volume',*/ 'white-space',
                  'window', 'width', 'word-spacing', '-moz-appearance',
                  '-moz-background-clip', '-moz-background-inline-policy',
                  '-moz-background-origin', '-moz-binding',
                  '-moz-border-bottom-colors', '-moz-border-end-color',
                  '-moz-border-end-style', '-moz-border-end-width',
                  '-moz-border-image', '-moz-border-left-colors',
                  '-moz-border-radius-bottomleft',
                  '-moz-border-radius-bottomright',
                  '-moz-border-radius-topleft', '-moz-border-radius-topright',
                  '-moz-border-right-colors', '-moz-border-start-color',
                  '-moz-border-start-style', '-moz-border-start-width',
                  '-moz-border-top-colors',
                  '-moz-box-align', '-moz-box-direction', '-moz-box-flex',
                  '-moz-box-flexgroup', '-moz-box-ordinal-group',
                  '-moz-box-orient', '-moz-box-pack', '-moz-box-shadow',
                  '-moz-box-sizing', '-moz-column-count', '-moz-column-gap',
                  '-moz-column-width', '-moz-column-rule-width',
                  '-moz-column-rule-style', '-moz-column-rule-color',
                  '-moz-float-edge', '-moz-force-broken-image-icon',
                  '-moz-image-region', '-moz-margin-end', '-moz-margin-start',
                  '-moz-opacity', '-moz-outline-color', '-moz-outline-offset',
                  '-moz-outline-radius-bottomleft', 
                  '-moz-outline-radius-bottomright',
                  '-moz-outline-radius-topleft',
                  '-moz-outline-radius-topright', '-moz-padding-end',
                  '-moz-padding-start', '-moz-stack-sizing', '-moz-user-focus',
                  '-moz-user-input', '-moz-user-modify', '-moz-user-select'],
  
    copyStyle: function (newElem, oldElem) {
      var oldStyle = window.getComputedStyle(oldElem, null);
      for each (var prop in this.copiedProps)
        newElem.style.setProperty(
            prop,
            oldStyle.getPropertyValue(prop),
            'important');
      newElem.style.setProperty(
        'font-size',
        (parseFloat(oldStyle.getPropertyValue('font-size'))
         *this.fontSizeCompensate + 'px'),
        'important');
      var newChildren = newElem.childNodes, oldChildren = oldElem.childNodes;
      for (var i = 0; i < newChildren.length; i++)
        if (newChildren[i].nodeType == 1)
          this.copyStyle(newChildren[i], oldChildren[i]);
    },
  
    getFinalBG: function (elem) {
      const bgProps = ['background-image', 'background-repeat',
                       'background-attachment', 'background-position',
                       'background-color'];
      var theStyle = new Object();
    
      for each (var prop in bgProps) {
        var tElem = elem;
        var val;
        do {
          var stl = window.getComputedStyle(tElem, null);
          val = stl.getPropertyValue(prop);
          tElem = tElem.parentNode;
        } while (tElem && (val == 'inherit' || val == 'transparent'));
        theStyle[prop] = val;
      }
      return theStyle;
    },
  
    getProperZIndex: function (elem) {
      while (elem.tagName) {
        var s =
          window.getComputedStyle(elem, null).getPropertyValue('z-index');
        if (s != 'auto') return Number(s)+1;
        elem = elem.parentNode;
      }
      return 'auto';
    },
  
    cloneRow: function (row, cellList, cloneAll) {
      var cells = row.cells;
      for (var i = 0, j = 0; i < cells.length; i++) {
        var tn = cells[i].tagName;
        if (!cloneAll && tn != 'TH' && tn != 'th') continue;
        cellList[j] = {
          elem: cells[i].cloneNode(true),
          left: this.getElementOffsetX(cells[i]),
          top: 0
        };
      
        this.copyStyle(cellList[j].elem, cells[i]);
        cellList[j].elem.setAttribute('class', 'tableFloaterCell');
        with (cellList[j].elem.style) {
          setProperty('display', 'none', 'important');
          setProperty('position', this.useFixedPos ? 'fixed' : 'absolute',
                      'important');
          setProperty('width',
                      Math.ceil(
                        parseFloat(window.getComputedStyle(cells[i],
                                                           null).width))+'px',
                      'important');
          if (this.useFixedPos)
            setProperty('top', '0px', 'important');
          else
            setProperty('left', '' + this.getElementOffsetX(cells[i]) + 'px',
                        'important');
          setProperty('z-index', this.getProperZIndex(cells[i]), 'important');
        
          var opaqueStyle = this.getFinalBG(cells[i]);
          for (var prop in opaqueStyle)
            setProperty(prop, opaqueStyle[prop], 'important');
        }
      
        cellList[j].elem.removeAttribute('id');
        document.body.insertBefore(cellList[j].elem, this.firstElem);
        j++;
      }
      if (!cloneAll && this.cloneFirstRowWithoutTH && cellList.length == 0)
        this.cloneRow(row, cellList, true);
    },
  
    makeClonedHdrCells: function (tableElem) {
      var cellList = [];

      if (tableElem.tHead) {
        var cellNum = 0;
        var rows = tableElem.tHead.rows;
        var firstPos = -1;
      
        for (var i = 0; i < rows.length; i++) {
          var row = rows[i];
          var cells = row.cells;
        
          for (var j = 0; j < cells.length; j++) {
            var tn = cells[j].tagName;
            if (tn != 'TD' && tn != 'td' && tn != 'TH' && tn != 'th') continue;
            var offset = this.getElementOffset(cells[j]);
            cellList[cellNum] = {
              elem: cells[j].cloneNode(true),
              left: offset.x
            };
            
            if (!this.useFixedPos) {
              if (firstPos >= 0)
                cellList[cellNum].top = offset.y - firstPos;
              else {
                firstPos = offset.y;
                cellList[cellNum].top = 0;
              }
            }
            
            this.copyStyle(cellList[cellNum].elem, cells[j]);
            cellList[cellNum].elem.setAttribute('class', 'tableFloaterCell');
            with (cellList[cellNum].elem.style) {
              setProperty('display', 'none', 'important');
              setProperty('position', this.useFixedPos ? 'fixed' : 'absolute',
                          'important');
              setProperty('width',
                          Math.ceil(
                            parseFloat(window.getComputedStyle(cells[j],
                                                               null).width))
                          + 'px',
                          'important');
              if (this.useFixedPos) {
                if (firstPos >= 0)
                  setProperty('top', '' + (offset.y - firstPos) + 'px',
                              'important');
                else {
                  firstPos = offset.y;
                  setProperty('top', '0px', 'important');
                }
              } else
                setProperty('left',
                            '' + this.getElementOffsetX(cells[i]) + 'px',
                            'important');
              setProperty('z-index', this.getProperZIndex(cells[i]),
                          'important');
            
              var opaqueStyle = this.getFinalBG(cells[j]);
              for (var prop in opaqueStyle)
                setProperty(prop, opaqueStyle[prop], 'important');
            }
          
            cellList[cellNum].elem.removeAttribute('id');
            document.body.insertBefore(cellList[cellNum].elem, this.firstElem);
            cellNum++;
          }
        }
      } else if (tableElem.tBody) {
        this.cloneRow(tableElem.tBody.rows[0], cellList, false);
      } else {
        this.cloneRow(tableElem.rows[0], cellList, false);
      }
      return cellList;
    },
    
    compensateUserFontSizeAdjust: function () {
      var testElem = document.createElement('th');
      testElem.style.setProperty('font-size', '100px', 'important');
      this.fontSizeCompensate = (
        100/parseFloat(window.getComputedStyle(testElem, null).fontSize));
    },
  
    setup: function (evt) {
      document.removeEventListener('DOMSubtreeModified', callTFSetup, false);
      if (this.tableInfo) this.cleanup();
      this.compensateUserFontSizeAdjust();
      this.tableInfo = [];
      this.processedTables = [];
      this.firstElem = document.body.firstChild;
      this.lastElem = document.body.lastChild;
      var tables = document.getElementsByTagName('table');
      var numTables = tables.length;
    
      for (var i = 0, j = 0; i < numTables; i++) {
        if (this.checkForNestedTable(tables[i]) || !tables[i].tBodies[0]
            || tables[i].tBodies[0].rows.length == 0)
          continue;
        var numRows = tables[i].rows.length;
        var topOffset = this.getElementOffsetY(tables[i].rows[0]);
        var lastRowCell = tables[i].rows[numRows - 1].cells[0];
        var lrcStl = window.getComputedStyle(lastRowCell, null);
        var bottomOffset = this.getElementOffsetY(lastRowCell)
          + parseInt(lrcStl.borderTopWidth)
          + parseInt(lrcStl.height)
          + parseInt(lrcStl.borderBottomWidth);
        var ti = {
          tableTop: topOffset,
          tableBot: bottomOffset,
          clonedHdrCells: this.makeClonedHdrCells(tables[i])
        };
        if (ti.clonedHdrCells.length == 0) continue;
        
        if (this.useFixedPos) {
          var lastStl =
            ti.clonedHdrCells[ti.clonedHdrCells.length - 1].elem.style;
          ti.tableBot -=
            (parseInt(lastStl.top) + parseInt(lastStl.borderTopWidth)
             + parseInt(lastStl.height)
             + parseInt(lastStl.borderBottomWidth) + 10);
        } else {
          var lastCell = ti.clonedHdrCells[ti.clonedHdrCells.length - 1];
          var lastTop = lastCell.top;
          var lastStl = lastCell.elem.style;
          ti.tableBot -= (lastTop + parseInt(lastStl.borderTopWidth)
             + parseInt(lastStl.height)
             + parseInt(lastStl.borderBottomWidth) + 10);
        }
        this.tableInfo.push(ti);
        this.processedTables.push(tables[i]);
        j++;
      }
      document.addEventListener('scroll', this.callHandleScroll, false);
      this.handleScroll();

      if (evt && evt.type == 'DOMSubtreeModified' && this.delayAfterDSTM > 0)
        window.setTimeout(
          function () {
            document.addEventListener('DOMSubtreeModified', callTFSetup,
                                      false);
          }, this.delayAfterDSTM);
      else
        document.addEventListener('DOMSubtreeModified', callTFSetup, false);
    },
    
    callHandleScroll: function (evt) { tableFloaters.handleScroll(); },
    
    handleScroll: function () {
      var scrollX = window.scrollX, scrollY = window.scrollY;
      var ti = this.tableInfo;
      for each (var tbl in ti) {
        if (scrollY >= tbl.tableTop && scrollY <= tbl.tableBot) {
          if (this.useFixedPos)
            for each (var cell in tbl.clonedHdrCells) {
              cell.elem.style.setProperty('left',
                                          '' + (cell.left - scrollX) + 'px',
                                          'important');
              cell.elem.style.setProperty('display', 'block', 'important');
            }
          else
            for each (var cell in tbl.clonedHdrCells) {
              cell.elem.style.setProperty('top',
                                          '' + (scrollY + cell.top) + 'px',
                                          'important');
              cell.elem.style.setProperty('display', 'block', 'important');
            }
        } else
          for each (var cell in tbl.clonedHdrCells)
            cell.elem.style.setProperty('display', 'none', 'important');
      }
    },
    
    cleanup: function () {
      for (var i = 0; i < this.tableInfo.length; i++) {
        var cells = this.tableInfo[i].clonedHdrCells;
        for (var j = 0; j < cells.length; j++) {
          var cell = cells[j].elem;
          cell.parentNode.removeChild(cell);
        }
      }
    }
  };
  
  function callTFSetup (evt) { tableFloaters.setup(evt); }
  window.addEventListener('load', callTFSetup, false);
  window.addEventListener('resize', callTFSetup, false);
  document.addEventListener('DOMSubtreeModified', callTFSetup, false);
  
  var printHideStl = document.createElement('style');
  printHideStl.appendChild(
    document.createTextNode('\
      @media print{.tableFloaterCell{display:none!important}}'));
  document.getElementsByTagName('head')[0].appendChild(printHideStl);
  
  function makeConfigWindow (menuLbl, cfgDescriptor) {
    // This URI creates a XULDocument when opened in a window.
    const initXULDoc = 'data:application/vnd.mozilla.xul+xml,' +
      encodeURIComponent('\
<?xml version="1.0" encoding="iso-8859-15"?>\
<?xml-stylesheet href="chrome://global/skin/" type="text/css"?>\
<window class="dialog" \
xmlns="http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul" \
xmlns:html="http://www.w3.org/1999/xhtml"/>');
    var win;
    
    // Event handler for radiogroup interaction.
    function handleBRGCommand (evt) {
      var target = evt.currentTarget, cfgVar = target.id,
        cfgVal = target.wrappedJSObject.selectedIndex;  // Why must I unwrap?
      cfgDescriptor.cfgObj[cfgVar] = cfgVal;
      GM_setValue(cfgVar, Boolean(cfgVal));
      setTimeout(callTFSetup, 1, null);
    }
    
    // Event handler for checkbox interaction.
    function handleCBCommand (evt) {
      var target = evt.currentTarget, cfgVar = target.id,
        cfgVal = target.wrappedJSObject.checked;  // Why must I unwrap?
      cfgDescriptor.cfgObj[cfgVar] = cfgVal;
      GM_setValue(cfgVar, Boolean(cfgVal));
      setTimeout(callTFSetup, 1, null);
    }
    
    // Event handler for number interaction.
    function handleNumChange (evt) {
      var target = evt.currentTarget, cfgVar, cfgVal, min, max;
      cfgVar = target.id;
      cfgVal = parseInt(target.wrappedJSObject.value);  // Why must I unwrap?
      min = parseInt(target.getAttribute('min'));
      max = parseInt(target.getAttribute('max'));
      
      if (isNaN(cfgVal))
        cfgVal = GM_getValue(cfgVar);
      else if (cfgVal < min)
        cfgVal = min;
      else if (cfgVal > max)
        cfgVal = max;
      
      target.wrappedJSObject.value = cfgVal;
      cfgDescriptor.cfgObj[cfgVar] = cfgVal;
      GM_setValue(cfgVar, cfgVal);
      setTimeout(callTFSetup, 1, null);
    }
    
    // Called asynchronously after the window is opened.
    function populateCfgWindow () {
      var doc = win.document, winElem = doc.documentElement;
      doc.title = cfgDescriptor.title;
      with (winElem) {
        setAttribute('id', cfgDescriptor.id);
        setAttribute('title', cfgDescriptor.title);
        setAttribute('orient', 'vertical');
        setAttribute('align', 'start');
      }
      var hb = doc.createElement('hbox');
      var img = doc.createElement('image');
      img.setAttribute('src', cfgDescriptor.logoSrc);
      var lbl = doc.createElement('label');
      lbl.setAttribute('value', cfgDescriptor.title);
      hb.appendChild(img);
      hb.appendChild(lbl);
      winElem.appendChild(hb);
      
      for each (var item in cfgDescriptor.structure) {
        var cfgVal = cfgDescriptor.cfgObj[item.cfgVar];
        
        switch (item.type) {
        case 'boolRadioGrp':
          var cont;
          if (item.caption) {
            cont = doc.createElement('groupbox');
            var capt = doc.createElement('caption');
            capt.setAttribute('label', item.caption);
            cont.appendChild(capt);
            winElem.appendChild(cont);
          } else
            cont = winElem;
          
          var rg, rf = doc.createElement('radio'),
            rt = doc.createElement('radio');
          rf.setAttribute('label', item.labels[0]);
          if (!cfgVal) rf.setAttribute('selected', 'true');
          rt.setAttribute('label', item.labels[1]);
          if (cfgVal) rt.setAttribute('selected', 'true');
          
          with (rg = doc.createElement('radiogroup')) {
            setAttribute('id', item.cfgVar);
            allowEvents = true;
            addEventListener('command', handleBRGCommand, false);
            appendChild(rf);
            appendChild(rt);
            selectedIndex = cfgVal ? 1 : 0;
          }
          cont.appendChild(rg);
          break;
          
        case 'checkbox':
          var cb;
          with (cb = doc.createElement('checkbox')) {
            setAttribute('label', item.label);
            setAttribute('checked', cfgVal);
            setAttribute('id', item.cfgVar);
            addEventListener('command', handleCBCommand, false);
          }
          winElem.appendChild(cb);
          break;
          
        case 'number':
          var hb = doc.createElement('hbox'),
            tb = doc.createElement('textbox'),
            lb = doc.createElement('label');
          with (tb) {
            setAttribute('type', 'number');             // For FF 3 only
            setAttribute('min', item.min);              // For FF 3 only
            setAttribute('max', item.max);              // For FF 3 only
            setAttribute('increment', item.increment);  // For FF 3 only
            setAttribute('value', cfgVal);
            setAttribute('id', item.cfgVar);
            setAttribute('tooltiptext', item.tooltip);
            setAttribute('flex', 1);
            addEventListener('change', handleNumChange, false);
          }
          hb.appendChild(tb);
          with (lb) {
            setAttribute('control', item.cfgVar);
            setAttribute('value', item.label);
            setAttribute('tooltiptext', item.tooltip);
            setAttribute('flex', 4)
          }
          hb.appendChild(lb);
          winElem.appendChild(hb);
          break;
          
          // ... Other types might be added later
          
        default:
          GM_log('Unknown configuration element type');
        }
      }
    }
    
    for each (var item in cfgDescriptor.structure) {
      var cfgVal = GM_getValue(item.cfgVar, item.defaultVal);
      cfgDescriptor.cfgObj[item.cfgVar] = cfgVal;
    }
    
    GM_registerMenuCommand(
      menuLbl,
      function () {
        win = open(initXULDoc, cfgDescriptor.title,
                   'width=' + cfgDescriptor.width
                   + ',height=' + cfgDescriptor.height);
        // Workaround: the window always contains about:blank until the script
        // terminates, so I use a callback to get the real document.
        setTimeout(populateCfgWindow, 0);
      });
  }
  
  makeConfigWindow(
    'Configure Table Floaters...',
    {
      cfgObj: tableFloaters,
      id: 'tableFloaters-config',
      logoSrc: 'data:image/png;base64,\
iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAAAXNSR0IArs4c6QAAAVNQTFRF\
AAAAAAIEAAMFAwMDAAUKAAcMAAkQCQkJAAsSCgoKAA0WAA0YAA8bCA4UBQ8WBw8WBhAYCBEY\
CBEZEBAQCBIZABQkERERAhQiCRMbEhISChQcExMTDxYbFRUVABksAhkrFhYWAhosDhgfABsx\
FxcXGBgYBRwuGxsbHBwcACM/ASM+ASQ/Hx8fICAgISEhGSMqIiIiAClIIyMjJCQkJiYmJycn\
KCgoKioqADRcLCwsADVcADVeLS0tAjZdMjIyADxrNTU1NjY2Nzc3ODg4Ozs7PDw8PT09AEqD\
AE2JR0dHSUlJTExMTk5OT09PAF6nUFBQU1NTVFRUVVVVAHDHaGhoaWlpbW1tbm5ub29vAJD/\
enp6gICAhoaGh4eHiYmJj4+Pl5eXn5+fpqamrq6ur6+vx8fH0NDQ0dHR09PT2dnZ2tra5+fn\
8vLy8/Pz9PT0/f39////hfEGvAAAAAF0Uk5TAEDm2GYAAAABYktHRACIBR1IAAAACXBIWXMA\
AAFbAAABWwFy1guMAAAAB3RJTUUH2AgLCjsuODufAwAAAStJREFUOMvNz9k3AnEYxvGffU+W\
MkpkyYwlYiRrm7I0SLTQqkWFxP9/5Tcz79PJcePK6Xvzfi6eMwvrMlGDfVDvMNTNGDM9UZfH\
0NotNP9jcASttwYL9p62wSm00Rqs3lvbBge/n7AYNrPRB8q3Ay1fQDNnU6x/ZHp7ySIIwsS4\
0SBojU0ajBosc1ez/DNt1+GgX02W/JQkayd4HjXzgf1OiWh53RHK7dWvErPywf5rvVZVK6Sq\
VKqgnVr9zckHh82GXilDaGRK+v1o7vLBySdVzkLZMiSrgy+qkoNyFUgdOJ+peBSKxiGRD7aK\
VDIGxZKQ+JdX/MNAeqSUEBRSoBU+2Huh8gkokYc2O+QvHDdUwAN5ApCNDzzvVDENpYuQq0P+\
YshFiQ7IIUID32z1TbD++YXiAAAAAElFTkSuQmCC',
      title: 'Table Floaters configuration',
      width: 400,
      height: 400,
      structure: [
        { type: 'boolRadioGrp', cfgVar: 'useFixedPos',
            caption: 'Floating method',
            labels: [ 'Use scrollable floaters (fast but jittery)',
                      'Use fixed floaters (smooth but slow)' ],
            defaultVal: true },
        { type: 'boolRadioGrp', cfgVar: 'cloneFirstRowWithoutTH',
            caption: 'Agressiveness',
            labels: [ 'No floaters without THEAD/TH',
                      'Clone first rows even without THEAD/TH' ],
            defaultVal: false },
        { type: 'number', cfgVar: 'delayAfterDSTM',
            label: 'Delay after dynamic change',
            tooltip: 'Delay this many milliseconds after responding to a '
            + 'dynamic change in content, before responding again (FF 3 users '
            + 'may want to set a nonzero value)',
            min: 0, max: 10000, increment: 100, defaultVal: 0 }]});
})();
