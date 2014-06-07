// ==UserScript==
// @name       Indentador de replies (Versão Botão)
// @version    0.1
// @description  Coloca a resposta na frente do post respondido
// @include   http://*.brchan.org/*/res/*
// @copyright  2012+, You
// ==/UserScript==

var btnFunction="(function(){"+
	"var thread=document.getElementsByClassName('thread')[0];"+
    "var replies=thread.getElementsByClassName('reply');" +
    "var borderStyle='2px dashed #65ab6b';"+
    "for (var i=0;i<replies.length;i++){"+
        "var isIndented=false;"+
        "var childReply=replies[i].parentNode.parentNode.parentNode;"+
    	"var anchors=replies[i].getElementsByTagName('blockquote')[0].getElementsByTagName('a');"+
        "for (var j=0;j<anchors.length;j++){"+
            "if (anchors[j].hash.length>0){"+
            	"var parentReply=document.getElementById(anchors[j].hash.replace('#', 'reply'));"+
                "if (parentReply){"+
                    "parentReply.parentNode.parentNode.parentNode.style.border=borderStyle;"+
                    "childReply.style.border=borderStyle;"+
                    "if (isIndented){"+
                        "var childCopy=childReply.cloneNode(true);"+
                        "parentReply.parentNode.insertBefore(childCopy, parentReply.nextSibling);"+
                        "if(childReply.parentNode==childCopy.parentNode)"+
                            "childCopy.parentNode.removeChild(childCopy);"+
                    "}"+
                    "else{"+
                		"isIndented=true;"+
                    	"parentReply.parentNode.insertBefore(childReply, parentReply.nextSibling);"+
                    "}"+
                "}"+
            "}"+
        "}"+
    "}"+
"}).call(this);";
var btnDiv=document.createElement('div');
btnDiv.innerHTML='<input type="button" value="Agrupar respostas" onclick="'+btnFunction+'">';
var thread=document.getElementsByClassName('thread')[0];
thread.parentNode.insertBefore(btnDiv,thread);