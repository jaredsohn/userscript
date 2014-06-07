// ==UserScript==
// @name           Lord Give Me Even Better Ps
// @namespace      okcupidstalker
// @include        *okcupid.com/profile/*/journal*
// ==/UserScript==


if (document.addEventListener) {
document.addEventListener("DOMContentLoaded", init(), false);
}



function init() {

addform_submit_array = getElementsByAttribute(document,"class","add_submit",false);

for (i=0;i<addform_submit_array.length;i++) {

	var addform_submit_button = addform_submit_array[i].childNodes[1];
	addform_submit_button.setAttribute('onclick',"");

	addform_submit_button.addEventListener("click", 
	function(evt) {
	var addform_ta = getElementsByAttribute(evt.target.parentNode.parentNode,"class","addform_ta",false)[0];
	
		var form = document.forms.namedItem(id);
		var text = form.elements.namedItem("text");
		var button = form.elements.namedItem("button");
		var id1 = id.replace("cmtadd_","comment_add_");
		var id2 = id.replace("cmtadd_","comment_submit_message_");
		text.value = '<p>' + text.value
		text.value = text.value.replace(/(\n+)/g,'</p><p>$1');
		text.value = text.value + '</p>'
		location.href = "javascript:void(addComment(\'" + id + "\'));";

	}, true);


}

}



function getElementsByAttribute(frst,attrN,attrV,multi){
	attrV=attrV.replace(/\|/g,'\\|').replace(/\[/g,'\\[').replace(/\(/g,'\\(').replace(/\+/g,'\\+').replace(/\./g,'\\.').replace(/\*/g,'\\*').replace(/\?/g,'\\?').replace(/\//g,'\\/');
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

