// ==UserScript==
// @id             okcshowall
// @name           OKC Show All
// @namespace      nomonkeynodeal
// @description    Changes Everyone's posts/comments link to display all available content regardless of match preferences.
// @include        *okcupid.com/journal*
// @include        *okcupid.com/profile/*/journal*
// @include        *okcupid.com/relevant
// @include        *okcupid.com/relevant*
// @run-at         document-end
// ==/UserScript==


var postlink="strangers=1&type=JOURNAL_POST&gentation=63&age_min=18&age_max=99";
var commentlink="strangers=1&type=BOARD_COMMENT&gentation=63&age_min=18&age_max=99";

var blah=getElementsByAttribute(document,"class","tab_content_nav",false)[0];

if(blah!=undefined){
  blah.innerHTML=blah.innerHTML.replace(/<a href="\/journal\?strangers=1">Everyone.+?posts/i,"<a href=\"/journal?"+postlink+"\">Everyone's posts (no match filter)").replace(/<a href="\/journal\?strangers=1&amp;type=BOARD_COMMENT">Everyone.+?comments/i,"<a href=\"http://www.okcupid.com/journal?"+commentlink+"\">Everyone's comments (no match filter)");

  //.replace("</ul>","<li class=\"\"><a href=\"/journal?"+postlink+"\">Everyone's posts (no match filter)</a></li><li class=\"\"><a href=\"/journal?"+commentlink+"\">Everyone's comments (no match filter)</a></li></ul>");  
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