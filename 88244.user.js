// ==UserScript==
// @name           travian village columnizer
// @namespace      ru.adelaide
// @include        http://s*.travian.*/*
// @include        http://x*.travian.*/*
// @exlcude        http://forum.travian.*/*
// ==/UserScript==

// global const, depends on layout
var CELLS_IN_VIL_ROW = 3;
var $ = document.getElementById;
try {

// load preferences
var prefs = unsafeWindow.JSON.decode(unsafeWindow.localStorage.villageColumnizer)
// set defaults on first time
  || {enabled: true, vilsPerColumn:30, columns:2, columnWidth:250, splitType:"height", fontSize:100, lineHeight:120};

var isNewGraphicPack = document.styleSheets.length == 4;

if (isNewGraphicPack) {
  // move main block to the left side
  $('mid').style.width = "auto";
  // fix resource panel then
  var resWrap = $('resWrap');
  resWrap.style.position = "static";
  resWrap.style.marginLeft = "155px";
  // and server timer  
  $('ltimeWrap').style.margin = "0 40px";
  $('ltimeWrap').style.width = "150px";
  // and top menu
  $('mtop').style.position = "static";
  $('mtop').style.margin = "-7px 0 0 240px";
}

// work with village list
var vil_table = $('vlist');
// insert options editor
var prefsCell = vil_table.rows[0].insertCell(1);
prefsCell.style.textAlign = 'center';
prefsCell.style.cursor = 'pointer';

var vilNum = vil_table.rows.length - 1;
if (prefs.splitType == "height") {
  prefsCell.innerHTML = "[h="+prefs.vilsPerColumn+"]";
  var colsNum = Math.ceil(vilNum/prefs.vilsPerColumn);
  var perCol = prefs.vilsPerColumn;
} else if (prefs.splitType == "columns") {
  prefsCell.innerHTML = "[c="+prefs.columns+"]";
  var colsNum = prefs.columns;
  var perCol = Math.ceil(vilNum/prefs.columns);
}
var colspan = 2;
if (prefs.enabled) {
  colspan += (colsNum-1)*CELLS_IN_VIL_ROW;
} else {
  prefsCell.style.color = "silver";
}
vil_table.rows[0].cells[0].colSpan = colspan;


var styleSheet = document.styleSheets[0];
styleSheet.insertRule("#vc_prefsHolder div { padding:3px; }", 1);
styleSheet.insertRule("div#side_info #vlist td { font-size:"+prefs.fontSize+"%; line-height:"+prefs.lineHeight+"%; }", 1);
styleSheet.insertRule("div#side_info #vlist td.dot { font-size:"+prefs.fontSize*0.85+"%; }", 2);
prefsCell.addEventListener('click', function() {
  if (!$('vc_prefsHolder')) {
    var html =
    "<div id='vc_prefsHolder' style='position:absolute; left:900px; top:200px; z-index:10000; border:solid gray 2px; background:white; -moz-box-shadow:0 0 10px gray;'><form id='villageColumnizerPrefs'>" +
    "<div><input type='checkbox' name='vc_enabled' " +(prefs.enabled?"checked='checked'":"")+ "/> enabled</div>" +
    "<div>font size: <select name='vc_fontSize'><option value='100'>100%</option><option value='90'>90%</option><option value='80'>80%</option><option value='70'>70%</option><option value='60'>60%</option></select></div>" + 
    "<div>line height: <select name='vc_lineHeight'><option value='120'>100%</option><option value='114'>-5%</option><option value='108'>-10%</option><option value='102'>-15%</option><option value='96'>-20%</option><option value='90'>-25%</option><option value='84'>-30%</option><option value='78'>-35%</option><option value='72'>-40%</option></select></div> " + 
    "<div><input type='radio' name='vc_splitType' value='height' "+(prefs.splitType=="height"?"checked='checked'":"")+ "/> " + 
    "MAX <input style='width:25px; padding:0;' maxlength='3' value='"+prefs.vilsPerColumn+"' name='vc_vilsPerColumn'/> villages per column</div>" +
    "<div><input type='radio' name='vc_splitType' value='columns' "+(prefs.splitType=="columns"?"checked='checked'":"")+ "/> " + 
    "split all villages into <input style='width:15px; padding:0;' maxlength='1' value='"+prefs.columns+"' name='vc_columns'/> columns</div>" +
    "<div><input style='width:35px; padding:0;' maxlength='3' value='"+prefs.columnWidth+"' name='vc_columnWidth'/>px per column</div>" +
    "<div style='text-align:center;'><input type='button' id='vc_savePrefs' value='save' /> <input type='button' id='vc_closePrefs' value='cancel' /></div>" +
    "</form></div>";
    document.body.innerHTML += html;
    document.getElementsByName("vc_fontSize")[0].value = prefs.fontSize;
    document.getElementsByName("vc_lineHeight")[0].value = prefs.lineHeight;
    // add function for saving
    $('vc_savePrefs').addEventListener('click', function() {
      var form = $('villageColumnizerPrefs');
      console.log(document);
      prefs.splitType = document.getElementsByName("vc_splitType")[0].checked ? "height" : "columns";

      prefs.fontSize = document.getElementsByName("vc_fontSize")[0].value;
      prefs.lineHeight = document.getElementsByName("vc_lineHeight")[0].value;
      prefs.enabled = form.querySelector("*[name=vc_enabled]").checked;
      
      var val = parseInt(form.querySelector("*[name=vc_vilsPerColumn]").value, 10);
      if (!isNaN(val)) prefs.vilsPerColumn = val;

      var val = parseInt(form.querySelector("*[name=vc_columns]").value, 10);
      if (!isNaN(val)) prefs.columns = val;
      
      var val = parseInt(form.querySelector("*[name=vc_columnWidth]").value, 10);
      if (!isNaN(val)) prefs.columnWidth = val;
    // save preferences
      unsafeWindow.localStorage.villageColumnizer = unsafeWindow.JSON.encode(prefs);
    // hide form
      $('vc_prefsHolder').style.display = "none";
    }, false);
    $('vc_closePrefs').addEventListener('click', function() {
      $('vc_prefsHolder').style.display = "none";
    }, false);
  } else {
    window.status = "not first time";
    $('vc_prefsHolder').style.display = $('vc_prefsHolder').style.display == "none" ? "block" : "none";
  }
}, false);

if (prefs.enabled && colsNum && perCol) {
  for (var c = 1; c < colsNum; c++) {
    for (var r = 0; r < perCol; r++) {
      if (!vil_table.rows[c*perCol+r+1]) break;
      for (var i = 0; i < CELLS_IN_VIL_ROW; i++) {
        var cell = vil_table.rows[r+1].insertCell(i+c*CELLS_IN_VIL_ROW);
        var oldCell = vil_table.rows[c*perCol+r+1].cells[i];
        cell.innerHTML = oldCell.innerHTML;
        cell.className = oldCell.className;
      }
    }
  }
  vil_table.style.width = prefs.columnWidth*colsNum + "px";
  for (var r = vilNum; r >= perCol+1; r--) {
    vil_table.deleteRow(r);
  }
}

} catch(e) {
  window.status = e;
}