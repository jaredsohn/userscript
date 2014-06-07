// ==UserScript==
// @name       ACE editor for T4
// @namespace  http://wolstenhol.me
// @version    0.1
// @description  Use ACE editor when editing raw HTML/CSS/JS/PHP
// @include      */SiteManager?ctfn=content&fnno=30*
// @copyright  2014+, Phil Wolstenholme
// ==/UserScript==

if (jQuery('#t4_content_element_CodeBody,#t4_content_element_PHPcontent').length === 1) {

	jQuery.ajax({
		url: '//ajaxorg.github.io/ace-builds/src-min-noconflict/ace.js',
		dataType: "script",
		success: success
	});

	function success() {

        if (jQuery('#t4_content_element_CodeBody').length === 1) { var textareaTarget = '#t4_content_element_CodeBody'; }
        if (jQuery('#t4_content_element_PHPcontent').length === 1) { var textareaTarget = '#t4_content_element_PHPcontent'; }
        
		var textareaWidth = jQuery(textareaTarget).css( "width" )
		var textareaHeight = jQuery(textareaTarget).css( "height" )
		var textarea = jQuery(textareaTarget).hide();

		var d = document.createElement('div');
		jQuery(d).attr( "id", "editor" );
		jQuery(d).css( "width", textareaWidth );
		jQuery(d).css( "height", textareaHeight );
		jQuery( d ).appendTo( jQuery( textarea ).parent() );
		//append to #t4_content_element_CodeBody parent div
		
		var editor = ace.edit("editor");
		editor.getSession().setUseWorker(false);
		editor.setTheme("ace/theme/chrome");
        editor.setShowPrintMargin(false);
		editor.getSession().setMode("ace/mode/html");
		editor.getSession().setValue(textarea.val());
		editor.getSession().on('change', function(){
		  textarea.val(editor.getSession().getValue());
		});
		
		var options = '<select id="mode" size="1"><option value="ace/mode/css">css</option><option value="ace/mode/html">html</option><option value="ace/mode/javascript" selected>js</option><option value="ace/mode/php">php</option></select>'
		jQuery( options ).prependTo( jQuery( "#editor" ).parent() );
		
		jQuery('#mode').change (function (ev) {
			var mode = jQuery('option:selected').attr('value');
			editor.getSession().setMode(mode);
		});
		
	}
}