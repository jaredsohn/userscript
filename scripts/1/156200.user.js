// ==UserScript==
// @name	 	Radikal.ru ads remover
// @description Speed up site load, remove ads, stop scripts before load
// @version		2.1
// @match		http://*radikal.ru*
// @run-at		document-start
// @copyright Eugene Nichegovskiy
// ==/UserScript==
var change = 0;


function removeChatScript(e) {

    
	if (e.target.hasAttribute("src"))
	{
        if (e.target.src.search(/negolist|adv|cbn|Gallery|videoclick|teasertop|vkshow1|am10|adriver|ads/) != -1)
		{ 
			change++;
			e.preventDefault();
			e.stopPropagation();
		}
        if (e.target.src.search(/24smile|goodsblock|dt100|toget|smi2|rostok|tizer|adonweb/) != -1)
		{ 
			change++;
			e.preventDefault();
			e.stopPropagation();
		}
         if (e.target.src.search(/teaser-goods|teaser/) != -1)
		{ 
			change++;
			e.preventDefault();
			e.stopPropagation();
		}
    
	}
	if (change > 0)
	{
		window.removeEventListener(e.type, arguments.callee, true);
	}
}

function removeBadObject(e) {	

	var iframes = document.getElementsByTagName("iframe");
	for (var i = 0; i < iframes.length; i++) {
		iframes[i].parentNode.removeChild(iframes[i]);
	}
   
    var ids = new Array();
    ids[0] = 'aspnetForm';
    ids[1] = 'MainDivAdminTop';
    ids[2] = 'cdiv';
    ids[3] = 'foother_br';
    ids[4] = 'left_ban';
    ids[5] = 'left_ban2';
    ids[6] = 'left_ban_micro';
    ids[7] = 'left_ban_micro_2';
    ids[8] = 'top_ban';
    ids[9] = 'prmbn';
    ids[10] = 'am_sb';
    ids[11] = 'TGB_1129';
    
    var node;
    for (i = 0; i < ids.length; i++){
        if (node = document.getElementById(ids[i]))
           node.parentNode.removeChild(node); 
    }
    
}

function removeObj(){
    var node;
 if (node = document.getElementsByTagName('div')[0])
           node.parentNode.removeChild(node); 
     if (node = document.getElementById('MainDivAdminTop'))
           node.parentNode.removeChild(node); 
}


//remove ads scripts; for firefox and opera
document.addEventListener('beforescriptexecute', removeChatScript, true);
//remove scripts; for chrome
document.addEventListener('beforeload', removeChatScript, true);
//remove objects
document.addEventListener('load', removeBadObject, true);
document.addEventListener('error', removeBadObject, true);
document.addEventListener('abort', removeBadObject, true);
document.addEventListener('DOMContentLoaded', removeObj, true);