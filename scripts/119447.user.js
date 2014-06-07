// ==UserScript==
// @name           bgm38theworld
// @namespace      mewing
// @include        http://*
// @include        https://*
// ==/UserScript==
var bgm38Regexp=/\(bgm38\)/;
var splitRegexp = /([\s\S]*?)(\(bgm38\))([\s\S]*)/m;

a2=document.body.childNodes;
changeit(a2);
function changeit(nodelist){
	for(var i=0;i<nodelist.length;i++){
		changeit(nodelist[i].childNodes);
		if(nodelist[i].nodeType!=3)  continue;
		var textNode=nodelist[i];
		
		if (textNode.parentNode.nodeName == 'TEXTAREA') return;
		while (textNode.nodeValue.match(bgm38Regexp)) {
			textNodeSplit = splitRegexp.exec(textNode.nodeValue);
			textNode.nodeValue = '';
			var rightHalfNode = document.createTextNode(textNodeSplit[3]);
			textNode.parentNode.insertBefore(rightHalfNode, textNode);  
			var logo=createbgm38();
			textNode.parentNode.insertBefore(logo, rightHalfNode);
			textNode.parentNode.insertBefore(document.createTextNode(textNodeSplit[1]), logo);
			textNode = rightHalfNode;
		}
	
	}
}

function createbgm38(){
	var logo = document.createElement('img');
	logo.src = 'data:image/gif;base64,R0lGODlhFQAVAOYAAAAAAP////9lmf9mmf9nmf60zv/l7v9wo/5ypf98rf61z/20zv5yqf9zqP5z'+
	'qv90qf51qf51qv51q/11qv+Wvv+Wv/+Xv/9Pnf9Lnv9Nnv9Nn/4ojf4ojv0ojf4pjv8rj/5Kof5K'+
	'ov8xmf8yl/8ymP8ymf8zmP8zmv80mv41mf82mv5Dof9Eof9Io/+12/86ov88o/89o/+02+ZRpPYX'+
	'oORcr+tItupKt+lKuOBbwt1HxNpHwtNxz8SazsOZzuDP69rG6dnG6dXM6dTM66LW6aLV6KPW6c3s'+
	'96LW6M3t+Mzs9////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
	'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
	'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5'+
	'BAEAAEsALAAAAAAVABUAAAf/gEuCgjtDg4dLQT6IhwY6QoxLOZGHMjc/iDQylIcuNkCDOC6ciDI1'+
	'oD08pIgzHBweHyWUJSglJCQlKSMnKCq2JyUlJyYnSyLAFRULywrNzQsK0NAVwSUWFAHZ2tvbBgYn'+
	'MTDY3OTcLyssCuXr2SwtIOoBHBsdHeUdGx4BIRkY6hwBPADUt02fvg0aLlxQR8FCsobcHlKocEEA'+
	'ARcuAihRckRJgIzZZGg8ciTAAAQHRGrk6FGBwA3qNpY84IAByI5JiATYoA1gEZIBGkh4oDIJEiQ6'+
	'AyqwF6BIESMBEkSAsCCbEqRFtMULYARJEQUPFkQYK0EJka4TIkiQoDaCESJIFCQoWGKgQLMjTo1I'+
	'e7aAiF8DSwIBADs=';
	return logo;
}

