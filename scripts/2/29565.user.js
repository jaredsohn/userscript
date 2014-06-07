// Version 1.0
// (c) Sergei Stolyarov 
// Released under the GPL
// http://www.gnu.org/copyleft/gpl.html

// ==UserScript==
// @name           Livejournal.com quoter
// @namespace      http://regolit.com
// @description    Add text quoatation button.
// @include        http://*.livejournal.com/*
// ==/UserScript==

function regolit_com_lj_quoter_test()
{
    var text = document.selection.createRange().text;
    if ("" != text) {
        // format text
        text = '<div style="padding-left: 3pt; margin-left: 10px; border-color: blue; border-style: none none none solid; border-width: 4px;"><i>' + text + '</i></div>';
        var ta = document.getElementById("body");
        ta.value += text;
    }
}

(function ()
{
    var form = document.getElementById("qrform");
    var subject_editbox = document.getElementById("subject");
    var subject_row = subject_editbox.parentElement.parentElement;
    var tr = document.createElement('TR');
    subject_row.parentElement.insertBefore(tr, subject_row.nextSibling);
    tr.appendChild(document.createElement('TD'));
    td = document.createElement('TD');
    var td = document.createElement('TD');
    td.innerHTML = '<a href="" onclick="regolit_com_lj_quoter_test(); return false;" title="Quote selected text"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUBAMAAAB/pwA+AAAAA3NCSVQICAjb4U/gAAAALVBMVEUAAADl49ezsaiZmZlRUU0kJCKKiYLMzMx2dW/HxbszMzPb2c5hYFvs6t7///+wOyYkAAAAD3RSTlP//////////////////wDU3JihAAAACXBIWXMAAAsSAAALEgHS3X78AAAAFnRFWHRDcmVhdGlvbiBUaW1lADAxLzA4LzA0enMAIgAAACF0RVh0U29mdHdhcmUATWFjcm9tZWRpYSBGaXJld29ya3MgNC4w6iYndQAAAF1JREFUeJxjeG4MBXUMxXehwJzBFsa8DGRe3nv3di6EGXn3rglE9M7euxfXQphX7969MxfCnKAhe7XNFszcwMB7i4EZooCB9xIDG8QE1713VXshTCQrKGUiOR3hIQCSpoanVFCmnwAAAABJRU5ErkJggg==""/></a>';
    tr.appendChild(td);
})();
