// ==UserScript==
// @name           Smart.fm Drill Beta: Skip items' fade animations
// @namespace      http://smart.fm/users/ukurereh
// @description    Removes the unskippable fade-in/fade-out animations on the study/review tab. For impatient folks, I guess. Use with Drill Beta version 20100201.1. (Might not work with later versions.)
// @include        http://smart.fm/study/*
// ==/UserScript==

//This function executes javascript code directly in the page (outside the Greasemonkey sandbox).
//(adapted from http://wiki.greasespot.net/Content_Script_Injection)
function contentEval(source) {
  // Create a script node holding this  source code.
  var script = document.createElement('script');
  script.setAttribute("type", "application/javascript");
  script.textContent = source;
  // Insert the script node into the page, so it will run, and immediately
  // remove it to clean up.
  document.body.appendChild(script);
  document.body.removeChild(script);
}

new_populateStudyTab = function () {
        $('a.text-study-item').html(smart.t('Item'));
        $('a.text-sentences').html(smart.t('Sentences'));
        $('a.text-extra-info').html(smart.t('Info'));
        $('a.text-quiz-practice').html(smart.t('Spelling'));
        $("#item-card").hide().html(study.templates.flipside('cue') + '<div class="separator"></div>' + study.templates.flipside('response'));
        if (iknow.session.item.cue.content.sound) iknow.audio.play(iknow.session.item.cue.content.sound, null, null, iknow.audio.content_volume);
        var item = iknow.session.item;
		$('#flyovers').empty();
        $('#item-card').css({opacity: 1,display: "block",visibility: 'visible'});
}

contentEval("study.populateStudyTab = " + new_populateStudyTab);
