// ==UserScript==
// @name           MB. release editor (RE) tab index fixes keyboard submit and cancel protector
// @description    Avoid release edits accidental cancellations in RE's last tab "review/edit note" (all options are on/off): 1. Tab-indexes fix. Next button after TAB from edit note becomes "Enter edit" instead of cancel. 2. cancel button becomes confirm protected. 3. set focus/cursor/select in edit note.
// @version        2012-02-16_1104
// @author         Tristan DANIEL (jesus2099)
// @contact        http://miaou.ions.fr
// @namespace      http://userscripts.org/scripts/show/111023
// @licence        GPL (http://www.gnu.org/copyleft/gpl.html)
// @include        http://*musicbrainz.org/release/*/edit
// @include        http://*musicbrainz.org/release/add*
// ==/UserScript==
(function () {
/* ---- CONFIGURATION START ---- */
var editNoteFocus         = false;
var editNoteSelect        = true;
var saveCancelTabIndexFix = true;
var confirmCancel         = true;
/* ---- CONFIGURATION  END  ---- */
var releaseEditor = document.getElementById("release-editor");
var editNote = document.getElementById("id-edit_note");
var cancelButton = document.getElementById("id-cancel");
var previousButton = document.getElementById("id-previous");
var saveButton = document.getElementById("id-save");
if (releaseEditor && editNote && cancelButton && previousButton && saveButton) {
	if (saveCancelTabIndexFix) {
		/* ## tabindex ## -1:exlude 0:flow 1:highest-priority n:lesser-priority (same-priority:flow)
		http://snook.ca/archives/accessibility_and_usability/elements_focusable_with_tabindex */
		editNote.setAttribute("tabindex", "1");
		saveButton.setAttribute("tabindex", "1");
		previousButton.setAttribute("tabindex", "2");
		cancelButton.setAttribute("tabindex", "3");
	}
	if (confirmCancel) {
		cancelButton.addEventListener("click", function(e) {
			var confi = confirm("Do you really want to cancel this release edit?");
			if (!confi) {
				e.cancelBubble = true;
				if (e.stopPropagation) e.stopPropagation();
				e.preventDefault();
				return false;
			}
		}, false);/*onclick surprisingly works for ENTER key as well*/
	}
	if (editNoteFocus) {
		editNote.focus();
	}
	if (editNoteSelect) {
		editNote.select();
	}
}
})();