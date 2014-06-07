// ==UserScript==
// @name           Lord Give Me AddAComments
// @namespace      okcupidstalker
// @include        *okcupid.com/profile/*/journal*
// ==/UserScript==


if (document.addEventListener) {
document.addEventListener("DOMContentLoaded", init(), false);
}



function init() {

addform_submit_array = 

getElementsByAttribute(document,"class","add_submit",false);

for (i=0;i<addform_submit_array.length;i++) {

	var addform_submit_button = addform_submit_array[i].childNodes[1];
	var mainform = addform_submit_button.parentNode.parentNode;
	var bid = mainform.elements.namedItem("bid").value;
	var commentaddlink = document.getElementById("comment_add_link_"+bid);
	var newLI = document.createElement('li');
	newLI.innerHTML = commentaddlink.innerHTML;
	newLI.setAttribute('class',commentaddlink.getAttribute('class'));
	commentaddlink.parentNode.insertBefore(newLI,commentaddlink);
	commentaddlink.setAttribute('style','display:none;');
	

}

}



function getElementsByAttribute(frst,attrN,attrV,multi){
	

attrV=attrV.replace(/\|/g,'\\|').replace(/\[/g,'\\[').replace(/\(/g,

'\\(').replace(/\+/g,'\\+').replace(/\./g,'\\.').replace(/\*/g,'\\*'

).replace(/\?/g,'\\?').replace(/\//g,'\\/');
    	var multi=typeof multi!='undefined'?
            multi:
            false,
        cIterate=frst.getElementsByTagName('*'),
        aResponse=[],
        attr,
        re=new RegExp(multi?'\\b'+attrV+'\\b':'^'+attrV+'$'),
        i=0,
        elm;
    while((elm=cIterate.item(i++))){
        attr=elm.getAttributeNode(attrN);
        if(attr &&
            attr.specified &&
            re.test(attr.value)
        )
            aResponse.push(elm);
    }
    return aResponse;
}

