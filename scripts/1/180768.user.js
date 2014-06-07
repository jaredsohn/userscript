// ==UserScript==
// @name        Easy Plain Text
// @namespace   electricjonny
// @description This adds a button to the top of the submit page that easily lets you toggle between richtext and plaintext mode.
// @include     http://www.deviantart.com/submit/deviation?no-overhead=1*
// @include     http://www.deviantart.com/submit/deviation
// @grant       none
// ==/UserScript==

var easyInput_script = document.createElement('script')

easyInputScript = freeFunctionString((function(){

// see if in richtext or plaintext
checkMode = false;

buttonStyle = '<style type="text/css">.switchmode {position:relative; top:-3px; background:linear-gradient(0deg, #FFFFFF, #E5E5E5); float:right; padding:2px; '+
				'box-shadow:1px 1px 2px rgba(0, 0, 0, 0.2); color:#444444!important; border:1px solid #999999; border-radius:6px; cursor:pointer; '+
				'width:125px; text-align:center;}'+
				'.switchmode:hover {background:#FFFFFF; text-decoration:none;}'+
				'.switchmode:active {background:linear-gradient(0deg, #E5E5E5, #FFFFFF);}</style>';

// stick the button style to the head
$('head').append(buttonStyle);

// html for button
var button = $('<a class="switchmode">Switch to plain text</a>');

// insert the button above the upload area
$('.ile-heading.ile-editor-main-heading').before(button);

// clicking the button
$('.switchmode').click(function() {
	if (checkMode == false) {
		// get rid of the description image...
		$('.ile-description textarea.ile-description-input.default-text, #ile-contents '+
		'.ile-keywords input.ile-keywords-input.default-text.text.small').css('background', '#FFFFFF');

		// the actual code that switches to plaintext
		Writer.active.switchToHtmlMode();
		Writer.active.restore_textarea_selection(Writer.active.get_textarea_selection());

		// change the button text
		button.html('Switch to rich text');

		// toggle the mode into plaintext
		checkMode = true;
	} else { // same as above, only reversed to go back
		$('.ile-description textarea.ile-description-input.default-text, #ile-contents '+
		'.ile-keywords input.ile-keywords-input.default-text.text.small').css('background', '#FFFFFF');

		Writer.active.switchToRichMode();
		Writer.active.restore_textarea_selection(Writer.active.get_textarea_selection());

		button.html('Switch to plain text');

		checkMode = false;
	};
});

}).toString());

easyInput_script.appendChild(document.createTextNode(easyInputScript));

document.getElementsByTagName('head')[0].appendChild(easyInput_script);

// taken from electricnet's SuperdAmn - http://electricnet.deviantart.com/art/SuperdAmn-145077131
function freeFunctionString(str){
	return str.replace(/^\s*function\s*\(\)\s*\{/, "").replace(/\}\s*$/, "")
}