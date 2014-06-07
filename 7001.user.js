/*

    Tabbable Textarea Plus
        by the DtTvB <mechakoopa@gmail.com>
    
    This user script lets you press the tab key in the textareas as well as some special features.
    
    Here is the list of special features of this program:
        - If you select more than one line, and press the tab key, it will indent the selected lines.
        - When you press enter, if you have any whitespaces on the line you press enter, it will be
          copied to the new line. So you don't have to press tab each time you start a new line.
          These symbols will be copied also:
            >     (blockquote)
            //    (c-style comment)
            #     (shell-style comment)
            ;     (ini-style comment)
            -     (list items)

*/

// ==UserScript==
// @name           Tabbable Textarea Plus
// @namespace      http://dttvb.yi.org/
// @description    When enabled, you can use tabs in textarea, to enable it, just press Ctrl+Alt+T.
// @include        *
// ==/UserScript==


(function() {

function gst(el) {
	return el.value.substr(el.selectionStart, el.selectionEnd - el.selectionStart);
}
var tbenabled = GM_getValue("tbenabled", 0);
var tbbusy = 0;

function createEnableDisable(x) {
	return function() {
		tbenabled = x;
	};
}
GM_registerMenuCommand('Disable TTP', createEnableDisable(0));
GM_registerMenuCommand('Enable TTP', createEnableDisable(1));

function handleTextarea(ev) {

	if (ev.keyCode == 0x54 && ev.altKey && ev.ctrlKey && !tbbusy) {
		var lastTitle = document.title;
		if (!tbenabled) {
			tbenabled = 1;
			document.title = '[ the DtTvB :: Tabbable Textarea Enabled ]';
		} else {
			tbenabled = 0;
			document.title = '[ the DtTvB :: Tabbable Textarea Disabled ]';
		}
		GM_setValue ("tbenabled", tbenabled);
		tbbusy = 1;
		setTimeout (function() {
			document.title = lastTitle;
			tbbusy = 0;
		}, 1500);
		ev.preventDefault ();
		return false;
	}

	if (!tbenabled) return;

	if (!ev.target) return;
	el = ev.target;
	if (el.nodeName != 'TEXTAREA') return;
	var lastx;
	var lasty;
	var oss;
	var osy;
	var i;
	var fnd;
	var selectedText = gst(el);
	if (ev.keyCode == 9) {
		lastx = el.scrollLeft;
		lasty = el.scrollTop;
		if (!selectedText.match(/\n/)) {
			oss = el.selectionStart;
			el.value = el.value.substr(0, el.selectionStart) + "\t" + el.value.substr(el.selectionEnd);
			el.selectionStart = oss + 1;
			el.selectionEnd = oss + 1;
		} else {
			oss = el.selectionStart;
			osy = el.selectionEnd;
			fnd = 0;
			for (i = oss - 1; i >= 0; i --) {
				if (el.value.charAt(i) == "\n") {
					oss = i + 1;
					fnd = 1;
					break;
				}
			} if (fnd == 0) {
				oss = 0;
			}
			fnd = 0;
			for (i = osy; i < el.value.length; i ++) {
				if (el.value.charAt(i) == "\n") {
					osy = i;
					fnd = 1;
					break;
				}
			} if (fnd == 0) {
				osy = el.value.length;
			}
			el.selectionStart = oss;
			el.selectionEnd = osy;
			selectedText = gst(el);
			ntext = selectedText.replace(/^(.)/mg, "\t$1");
			el.value = el.value.substr(0, el.selectionStart) + ntext + el.value.substr(el.selectionEnd);
			el.selectionStart = oss;
			el.selectionEnd = osy + (ntext.length - selectedText.length);
		}
		el.scrollLeft = lastx;
		el.scrollTop  = lasty;
		ev.preventDefault ();
		return false;
	} else if (ev.keyCode == 13) {
		lastx = el.scrollLeft;
		lasty = el.scrollTop;
		oss = el.selectionStart;
		osy = el.selectionEnd;
		var bfs = el.value.substr(0, el.selectionStart);
		var bfsm = bfs.split(/\r|\n/g);
		var spm = bfsm[bfsm.length - 1].match(/^(\s|\/\/|\#|\;|>|\-)*/);
		el.value = el.value.substr(0, el.selectionStart) + "\n" + spm[0] + el.value.substr(el.selectionEnd);
		el.selectionStart = oss + 1 + spm[0].length;
		el.selectionEnd = oss + 1 + spm[0].length;
		el.scrollLeft = lastx;
		el.scrollTop  = lasty;
		ev.preventDefault ();
		return false;
	}
}
document.addEventListener('keydown', handleTextarea, true);

})();
