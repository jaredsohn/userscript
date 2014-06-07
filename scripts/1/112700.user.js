// ==UserScript==
// @name           My_Utils
// @version        1.0
// @namespace      
// @author         wysa
// @description    
// @include        null
// @run-at         document-end
// ==/UserScript==
function setCopy(_sTxt){ 
	try{ 
		if(unsafeWindow.netscape) {
			unsafeWindow.netscape.security.PrivilegeManager.enablePrivilege('UniversalXPConnect'); 
			var clip = unsafeWindow.Components.classes['@mozilla.org/widget/clipboard;1'].createInstance(Components.interfaces.nsIClipboard); 
			if(!clip) return false; 
			var trans = unsafeWindow.Components.classes['@mozilla.org/widget/transferable;1'].createInstance(Components.interfaces.nsITransferable); 
			if(!trans) return false; 
			trans.addDataFlavor('text/unicode'); 
			var str = new Object(); 
			var len = new Object(); 
			var str = unsafeWindow.Components.classes["@mozilla.org/supports-string;1"].createInstance(Components.interfaces.nsISupportsString); 
			var copytext = _sTxt; 
			str.data = copytext; 
			trans.setTransferData("text/unicode", str, copytext.length*2); 
			var clipid = unsafeWindow.Components.interfaces.nsIClipboard; 
			if (!clip) return false; 
			clip.setData(trans, null, clipid.kGlobalClipboard); 
			return true;
		} 
	}catch(e){
		return false;
	}
	return false;
} 

function wrapWithHtmlElement(list){
	var res="";
	var arg_list=list;
	for(var i=0;i<arg_list.length;i++){
		res=arg_list[i].name!='a'?res+"<"+arg_list[i].name+">":res+"<"+arg_list[i].name+" href=\""+arg_list[i].value+"\">";
		res=(arg_list[i].value instanceof Array )?res+wrapWithHtmlElement(arg_list[i].value):res+arg_list[i].value;
		res=res+"<"+arg_list[i].name+">";
	}
	return res;
}