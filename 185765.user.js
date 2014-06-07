// ==UserScript==
// @name         Remove SCEditor + CodeMirror
// @namespace    http://devs.forumvi.com/
// @version      0.4
// @description  Thêm tùy chọn vô hiệu hóa SCEditor và CodeMirror khi tạo hoặc chỉnh sửa code trong Forumotion
// @include	   http://*/admin/index.forum*
// @match        http://*/admin/index.forum*
// @copyright    2013+, Zzbaivong
// @run-at       document-end
// @grant        none
// ==/UserScript==
$(function () {
    function afterBtn(a){
        $("form[action^='/admin/index.forum'] input:submit:last").after('<button id="remove_' + a + '" class="icon_cancel" type="button">&nbsp;Vô hiệu hóa ' + a + '</button>'); 
        $("#remove_" + a).css({
            "font-family": "'Lucida Sans Unicode', Verdana, Helvetica, Arial, sans-serif",
            "font-size": "100%",
            "vertical-align": "middle"
    	});
    }
    if($.sceditor !== undefined) {
        afterBtn("SCEditor");
        $("#remove_SCEditor").click(function(){            
            $("#text_editor_textarea").height($(".sceditor-container").height()).width($(".sceditor-container").width());
            $("#text_editor_textarea").sceditor("instance").destroy();
            $(this).remove();
    	});
    }
    if(editor) {
        afterBtn("CodeMirror");
        $("#remove_CodeMirror").click(function(){ 
            $("#text_editor_textarea").height($(".CodeMirror").height()).width($(".CodeMirror").width());
            editor.toTextArea();
            $("#codemirror_search").parent().parent().remove();
            $(this).remove();
        });
    }
});