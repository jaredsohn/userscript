// ==UserScript==
// @name           ShowJiShaoComment4TGFC
// @namespace      tealeaf.net
// @description    Set TGFC JiShao Dialog Comment Control writable
// @include        http://club.tgfcer.com/*
// @author      tealeaf
// @version     0.3.0
// ==/UserScript==

(function(window) {

function showJiShaoComment(id, retry) {
    if (retry <= 0) return;
    var $dialog = document.getElementById("ajax_rate_"+id+"_menu");
    if (!$dialog) {
        setTimeout(function() {showJiShaoComment(id, retry-1);}, 1000);
        return;
    }

    var $area = null;
    var $areas = $dialog.getElementsByTagName("textarea");
    for (var i=0;i<$areas.length;i++) {
        if ($areas[i].id=='reason') {
            $area = $areas[i];
            break;
        }
    }
    if (!$area) {
        setTimeout(function() {showJiShaoComment(id, retry-1);}, 30);
        return;
    }
    if ($area.readOnly) $area.readOnly = false;

    var $inputs = $dialog.getElementsByTagName("input");
    for (var i=0;i<$inputs.length;i++) {
        if ($inputs[i].name=="sendreasonpm") {
            $inputs[i].disabled=false;
        }
    }
}
function setupJiShaoComment() {
	var list=document.getElementsByTagName('a');
	var pattern=/^ajax_rate_(\d+)$/;
	for (var i=0;i<list.length;i++) {
		var node=list[i];
        var mat = node.id.match(pattern);
		if (mat) {
			node.onclick = (function(id) {
                return function() {
                    window.ajaxmenu(event, this.id, 9000000, null, 0);
                    showJiShaoComment(id, 100);
                };
            })(mat[1]);
		}
        delete node;
	}
    delete list;
}
window.setTimeout(setupJiShaoComment,1000);

})(unsafeWindow);
