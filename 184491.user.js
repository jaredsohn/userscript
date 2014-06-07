// ==UserScript==
// @name       ILBE 신고버튼 글쓰기
// @namespace  찾음@일베
// @version    0.1
// @description  신고버튼 누르면 건게에 신고글 올라감
// @match      http://*.ilbe.com/*
// @copyright  찾음@일베
// ==/UserScript==




singo_button=jQuery('.procDocumentDeclare')[0]
singo_button.className="button"
singo_button.href="#"
singo_button.onclick = function(){ sug_title=prompt('신고글 제목','신고');sug_content=prompt('신고글 내용','ㅈㄱㄴ');if(sug_content==null){exit();};sug_xml='<?xml version=\"1.0\" encoding=\"utf-8\" ?><methodCall><params><module><![CDATA[board]]></module><document_srl><![CDATA[]]></document_srl><act><![CDATA[procBoardInsertDocument]]></act><is_secret><![CDATA[Y]]></is_secret><category_srl><![CDATA[883640501]]></category_srl><mid><![CDATA[suggestion]]></mid><content><![CDATA['+sug_content+']]></content><extra_vars1><![CDATA['+location.href+']]></extra_vars1><title><![CDATA['+sug_title+']]></title></params></methodCall>';jQuery.ajax({url:'http://www.ilbe.com/index.php',type:'POST',dataType:'xml',data:sug_xml,contentType:'text/plain'});exit();}
