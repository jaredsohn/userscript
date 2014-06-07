// ==UserScript==
// @name           Hide Questions
// @namespace      hide_questions_face
// @description    Hide Questions in Facebook
// @include        http://*.facebook.com/*

// @include        https://*.facebook.com/*
// ==/UserScript==

function addStyle(css) {
	if (typeof GM_addStyle !== 'undefined') { return GM_addStyle(css); }
	else if (heads = document.getElementsByTagName('head')) {
		var style = document.createElement('style');
		try { style.innerHTML = css; }
		catch(x) { style.innerText = css; }
		style.type = 'text/css';
		heads[0].appendChild(style);
	}
}

addStyle('.fbQuestionsBlingBox,.fbQuestionsBlingBox:hover,.fbQuestionsBlingBox span,.fbQuestionsBlingBox .img,.fbQuestionsBlingBox .img:first-child,.fbQuestionsBlingBox .img,.fbEigenpoll .fbEigenpollCheckbox,.fbEigenpoll .fbEigenpollCheckbox input,.fbEigenpoll .fbEigenpollResults,.fbEigenpoll .fbEigenpollPager,.fbEigenpoll .fbEigenpollAddOption,* .fbEigenpoll .fbEigenpollAddOption,.fbEigenpollFeed,.fbEigenpollRow,.fbEigenpollRow ~ .fbEigenpollAddOption,.fbEigenpollRow + .fbEigenpollAddOption,.fbEigenpoll .fbEigenpollPager,.fbEigenpoll .fbEigenpollResults,.fbEigenpoll .fbEigenpollFacepile,.fbEigenpollFacepile .uiTooltipWrap,.fbEigenpoll .fbEigenpollCheckbox:hover + .fbEigenpollResults div,.fbEigenpoll .fbEigenpollResults:hover div,.fbEigenpoll .fbEigenpollSelected div,.fbEigenpoll .fbEigenpollResults:active div,.fbEigenpoll .fbEigenpollCheckbox:hover + .fbEigenpollResults .auxlabel,.fbEigenpoll .fbEigenpollResults:hover .auxlabel,' + 
	'.fbEigenpoll .fbEigenpollCheckbox:hover + .fbEigenpollResults .fbQuestionsPollAttachment,.fbEigenpoll .fbEigenpollResults:hover .fbQuestionsPollAttachment,.fbEigenpoll .fbEigenpollUfi,.fbEigenpoll .fbEigenpollRow,.fbEigenpoll .fbEigenpollPager,.fbEigenpoll .fbEigenpollRow + .fbEigenpollAddOption,.fbEigenpoll .fbEigenpollHighlight,.fbEigenpoll .fbEigenpollRemoveButton,.uiFacepile .questionsFacepileEllipsisItem,.fbOpinionPollHighlight .questionsFacepileEllipsisItem,.fbEigenpollHighlight .questionsFacepileEllipsisItem,.uiFacepile .questionsFacepileEllipsisItem:hover,.fbQuestionFollowLink .followBackup,.fbQuestionFollowWrap .async_saving .followMain,.fbQuestionFollowWrap .async_saving .followBackup,.fbQuestionFollowLink .followMain,.fbQuestionFollowWrap .async_saving .followBackupButton,.fbQuestionFollowButton .followMain,.profileHeader .fbQuestionFollowWrap,.pollOptions,.pollOptions .pollRadioBtn,' + 
	'.pollOptions .fbOpinionPollHighlight .pollRadioBtn,.pollOptions .pollRadioBtn input,.pollOptions .pollRadioBtn,.pollOptions .pollResultsFacepile,.pollOptions .pollResultsFacepile .uiFacepile,.pollResultsFacepile .uiTooltipWrap,.pollOptions .pollRadioBtn:hover + .pollResultsBar div,.pollOptions .pollResultsBar:hover div,.pollOptions .selectedPollOption div,.pollOptions .pollResultsBar:hover .fbQuestionsPollAttachment,.pollOptions .pollRadioBtn:hover + .pollResultsBar .fbQuestionsPollAttachment,.pollOptions .pollResultsBar:hover .auxlabel,.pollOptions .pollRadioBtn:hover + .pollResultsBar .auxlabel,.pollOptions .pollResultsBar,.pollOptions .fbOpinionPollHighlight,.fbQuestionsPollPager,.fbQuestionsPollPager span,.fbQuestionsPollPager:hover,.fbQuestionsPollPager:hover span,.fbQuestionsPollResultsBar,.fbQuestionsPollResultsBar .shaded,.fbQuestionsPollResultsBar .full,.fbQuestionsPollResultsBar .label,' + 
	'.fbQuestionsPollResultsBar .auxlabel,.fbQuestionsPollResultsBar .fbQuestionsPollClickTargetWithAttachment,.fbQuestionsPollResultsBar .auxlabelWithAttachment,.fbQuestionsPollResultsBar .fbQuestionsPollAttachmentContainer,.fbQuestionsPollResultsBar .fbQuestionsPollAttachment,.fbQuestionsPollResultsBar .fbQuestionsPollAttachmentIcon:hover,.fbQuestionsPollResultsBar .fbQuestionsPollClickTarget,#bootloader_c0ME_,.pepeluis{display:none;!important}');

function BuscarQ(){
	var _div = document.evaluate("//li", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

	for (i=0; i<_div.snapshotLength; i++){
		_tdiv = _div.snapshotItem(i);
		if (_tdiv.id.indexOf("stream_story_") >= 0){
			var VC = document.getElementById(_tdiv.id);
			if (VC.innerHTML.indexOf("l6XHVF8ChWK.png") >= 0){
				_tdiv.className= "pepeluis";
			}
		}
	}
}

BuscarQ();
T2 = window.setTimeout(BuscarQ,8000);