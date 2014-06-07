// ==UserScript== 
// @name                Ads Killer for facebook
// @version	            0.91
// @run-at              document-start
// @author              churenpoto
// @include             *facebook*
// @include             *facebook.com/profile.php?id=*
// ==/UserScript== 

var lastAdNode = 0;
var newStyle = document.createElement("style");
newStyle.type = "text/css";
document.getElementsByTagName("head").item(0).appendChild(newStyle);
css = document.styleSheets.item(0);
var idx = document.styleSheets[0].cssRules.length;
css.insertRule("#rightCol{display:none;}", idx);
css.insertRule(".uiStreamStoryAttachmentOnly{display:none;}", idx);

function ParsePage() {
	var AdNodes = document.getElementsByClassName("hidden_add_comment");
	if(AdNodes.length > lastAdNode){
		for(var i=lastAdNode;i<AdNodes.length;i++){
			if(AdNodes[i].parentNode.parentNode.parentNode.parentNode.parentNode.className.indexOf("Timeline") == -1)
				AdNodes[i].parentNode.parentNode.parentNode.parentNode.parentNode.style.display = "none";
			}
		}
		lastAdNode = i;
	}
	return;
}
document.addEventListener("DOMNodeInserted", ParsePage, true);
