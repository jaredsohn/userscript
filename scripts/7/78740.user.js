// ==UserScript==
// @name        Hatena Bookmark Ignore Entries
// @namespace   http://userscripts.org/scripts/show/78740
// @description Ignore Hatena Bookmark Entries including NG Tags.
// @include    http://b.hatena.ne.jp/
// @include    http://b.hatena.ne.jp/hotentry*
// @include    http://b.hatena.ne.jp/entrylist*
// @require    http://ajax.googleapis.com/ajax/libs/jquery/1.3.1/jquery.min.js
// @version    1.1
// ==/UserScript==
// Copyright (c) 2010 Ryuji Tsutsui <ryu22e@gmail.com>.
// Distributed under new BSD license
// http://blog.livedoor.jp/ryu22e/

var NAME_NG_TAGS = "NG_TAGS";

(function($) {
	// Create Object.
	var baseArea = $("<span style='-moz-border-radius: 0.5em; -webkit-border-radius: 0.5em; background-color: #F0FFFF; padding: 0.5em; font-weight: normal; font-size: 80%; margin-left: 0.5em;'>NGタグ:</span>");
	var displayArea = $("<span style='margin-left: 0.5em;'></span>");
	var editArea = $("<span style='margin-left: 0.5em;'></span>");
	baseArea.append(displayArea)
			.append(editArea);
	
	var labelNgTags = $("<span style='color : #FF0000;' title='複数登録する場合はカンマで区切って入力してください'></span>");
	var buttonEditNgTags = $("<img src='/images/edit.gif' alt='NGタグを編集する' title='NGタグを編集する' style='cursor: pointer;' />");
	displayArea.append(labelNgTags)
				.append(buttonEditNgTags);
	
	var textNgTags = $("<input type='text' style='width: 22em;' title='複数登録する場合はカンマで区切って入力してください' />");
	var buttonSave = $("<input type='button' value='保存する' />");
	var linkCancel = $("<a href='javascript:void(0);'>キャンセル</a>");
	editArea.append(textNgTags)
			.append(buttonSave)
			.append(linkCancel);

	// Define displayArea Event.
	displayArea.extend( {
		show : function() {
			labelNgTags.text(GM_getValue(NAME_NG_TAGS));
			$(this).show();
		}
	} );
	// Define labelNgTags Event.
	labelNgTags.dblclick( function() {
		buttonEditNgTags.click();
	} );
	// Define editArea Event.
	editArea.extend( {
		show : function() {
			textNgTags.val(GM_getValue(NAME_NG_TAGS));
			$(this).show();
		}
	} );
	// Define buttonEditNgTags Event.
	buttonEditNgTags.click(function() {
		displayArea.hide();
		editArea.show();
		textNgTags.focus();
	} );
	textNgTags.keypress(function(e) {
		//13 == Enter Key.
		if ( e.which == 13 ) 
			buttonSave.click();
		//0 == Esc Key.
		else if ( e.which == 0 )
			linkCancel.click();
	} );
	// Define buttonSave Event.
	buttonSave.click(function() {
		var textValue = textNgTags.val() == null ? "" : textNgTags.val();
		if ( 0 < textValue.length && !textValue.match(/^([^,]+)(,[^,]+)*$/) ) {
			alert("Invalid Tags.");
			return false;
		}
		GM_setValue(NAME_NG_TAGS, textValue);
		
		displayArea.show();
		editArea.hide();
		
		baseArea.runFilter();
	} );
	// Define linkCancel Event.
	linkCancel.click(function() {
		displayArea.show();
		editArea.hide();
	} );

	// Define Method.
	baseArea.extend( {
		runFilter : function() {
			if ( $("a.tag") == null || $("div.entry-body") == null )
				return;
			var gmValue = GM_getValue(NAME_NG_TAGS);
			if ( gmValue == null || gmValue.length <= 0 )
				return;
			$("div.entry-body").show();
			var ngTags = gmValue.split(",");
			var tag = $("a.tag").filter(function(index) {
				var tagText = $(this).text();
				return ngTags.indexOf(tagText) != -1;
			});
			if ( tag == null || tag.parent() == null
					|| tag.parent().parent() == null
					|| tag.parent().parent().parent() == null )
				return;
			tag.parent().parent().parent().hide();
			
			
		}
	});
	
	$("#navigation").append(baseArea);
	
	displayArea.show();
	editArea.hide();
	
	// Run Filter.
	baseArea.runFilter();
})(jQuery);
