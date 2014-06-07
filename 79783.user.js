// ==UserScript==
// @name           OKC More Relevant
// @namespace      nomonkeynodeal
// @description    Shows journal authors in favorites' & your own comments, filters unwanted journals.
// @include        *okcupid.com/journal*BOARD_COMMENT*
// @include        *okcupid.com/relevant*comments*
// @include        *okcupid.com/relevant*mycomm*
// ==/UserScript==

GM_registerMenuCommand("-------okcmrrlvnt--------", function(){});

GM_registerMenuCommand("Setup More Relevant journal filtering", function() {

  var newjournals=prompt("Hide comments favorites make to journals by these users:", GM_getValue("OKCfilteredjournals","sethwantsagirl,odieonekanobe"));

  GM_setValue("OKCfilteredjournals", newjournals);
  
  var newjournals=prompt("Number of comments your favorites can make to hidden journal before you will begrudgingly look at it:", GM_getValue("OKCcommenttolerance","3"));

  GM_setValue("OKCcommenttolerance", "3");
  
  location.reload(true);
  
});


var commenttolerance=parseInt(GM_getValue("OKCcommenttolerance","3"));
var journalsbyfilter=GM_getValue("OKCfilteredjournals"," ").toLowerCase().split(",");

var blah=getElementsByAttribute(document,"class","post clearfix",false);

var jauthor, delcount=0, num=blah.length-1, tolerated=new Array();

for(var j=0;j<=num;j++) {
  
  //journal entry author
  jauthorpreservecase=blah[j].innerHTML.match(/class="commented">Commented on <a href="\/?profile\/(.+?)\/journal\//i)[1];
  jauthor=jauthorpreservecase.toLowerCase();
  
  //build list of blocked journal authors on whose journals people are frequently commenting
  if(journalsbyfilter.indexOf(jauthor)!=-1 && tolerated.indexOf(jauthor)==-1){
    var myregex=new RegExp("<a class=\"readmore\" href=\"\/?profile\/"+jauthor, "gi");
    var numoccurences=document.body.innerHTML.match(myregex).length;
    
    //if there are more comments than our tolerance, permit their comments
    if(numoccurences>commenttolerance) tolerated.push(jauthor);
  }

  if(journalsbyfilter.indexOf(jauthor)!=-1 &&
      location.href.indexOf("mycomm")==-1 &&
      tolerated.indexOf(jauthor)==-1){
      
    GM_log("balete");

    var postclearfix=getElementsByAttribute(document,"class","post clearfix",false)[j-delcount];
    postclearfix.parentNode.removeChild(postclearfix);
    delcount++;
  }else{

    //apostrophe
    jauthorpreservecase+=(jauthorpreservecase.substring(jauthorpreservecase.length-1,jauthorpreservecase.length)=="s" ? "'" : "'s");

    //show post author
    blah[j].innerHTML=blah[j].innerHTML.replace("this post", jauthorpreservecase + " " + "post");
    
    //fix dropped tags
    blah[j].innerHTML=blah[j].innerHTML.replace("<a class=\"readmore\"","</i></i></b></b><a class=\"readmore\"");
    
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