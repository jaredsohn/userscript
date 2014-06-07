// ==UserScript==
// @id             tieba.baidu.com-30b5c13e-ffb5-4ec9-bcd1-33a25b32c97c@cg
// @name           贴吧公式助手
// @version        1.0
// @namespace      latexfortieba
// @author         cg
// @description    
// @include        http://tieba.baidu.com/*
// @include        http://tieba.baidu.com.cn/*
// @run-at         document-end
// ==/UserScript==
$ = unsafeWindow.$;
sbId = unsafeWindow.rich_postor._dom_id.add_post_submit.replace('aps', '');
var button = '';
button1 = '&nbsp;<input type="button" value="插入" class="subbtn_bg" id="latexTransferToImage" />';
button2 = '&nbsp;<input type="button" value="恢复" class="subbtn_bg" id="recover" />';
button = '<tr><td width="49"></td><td>&nbsp;'+button1+'&nbsp'+button2+'</td></tr>';
textbox = '<tr><td valign="top">Latex:</td><td><div class="tb-editor-editarea" style="height:193px;min-height:193px;display:block;position:relative;" id="latexSource" contenteditable="true"></div></td></tr>'
$('#pu' + sbId).parent().parent().append(button+textbox);
//$('form').after('<form><table width="100%"><tbody>'+button+'<tr><td>&nbsp</td></tr>'+textbox+'</tbody></table></form>');
$('#latexTransferToImage')[0].addEventListener("click",latexTransferToImage, false);
$('#recover')[0].addEventListener("click",recover,false);
recoverstr = "";
function debug(){
	alert("debug");
}
function latexTransferToImage(){
	recoverstr = unsafeWindow.rich_postor._editor.editArea.innerHTML;
	textsend = $('#latexSource')[0].innerHTML.replace(/&nbsp;/gi, ' ')
	textsend = textsend.replace(/\<br\>/g,"\\\\");
	textsend = textsend.replace(/\+/g,"%2B");
	textsend = textsend.replace(/\&/g,"%26");
	GM_xmlhttpRequest({
		method : 'POST',
		url : 'http://www.artofproblemsolving.com/Resources/texer.php' ,
		data : 'mode=Image&tex='+textsend,
		headers : {
			"Content-Type" : "application/x-www-form-urlencoded"
		},
		onload : function(data) {
			var temp = data.responseText.replace(/\\/g,"");
			if(temp.search(/error/)!=-1){
				alert("表达式有误,输出错误信息");
			}
			temp = temp.replace(/\{"image":"/,"http:");
			temp = temp.replace(/"\}/,"");
			imagesource = '<img class="BDE_Image" src="'+temp+'" unselectable="on"/>'; 
			unsafeWindow.rich_postor._editor.editArea.innerHTML += imagesource;
		}
	});
}
function recover(){
	unsafeWindow.rich_postor._editor.editArea.innerHTML = recoverstr;
}