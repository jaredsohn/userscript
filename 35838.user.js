// ==UserScript==
// @name           Two-Step is boring
// @namespace      NA
// @include        *okcupid*
// ==/UserScript==



function init2(evt) {

var blockedUsers = ["Two-Step","ItsWayneBitch"];

var comments = getElementsByAttribute(evt.target,"class","commenter clearfix",false);

for (var i=0;i<comments.length;i++) {

var info = getElementsByAttribute(comments[i],"class","info",false)[0];

var user = info.getElementsByTagName('a')[0].textContent;
if (blockedUsers.indexOf(user) != -1) {

getElementsByAttribute(comments[i].parentNode,"class","journalCommentText",false)[0].textContent = "boring boring boring boring.";
} else {

}
}

}//end init





document.addEventListener("DOMNodeInserted",
	function(evt) {
		init2(evt);
	}, true);



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
// ==UserScript==
// @name           twostepisboring
// @namespace      NA
// @include        *okcupid*
// ==/UserScript==