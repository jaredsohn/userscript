// ==UserScript==
// @name           StevieisCancerMcHitlershit
// @namespace      blah
// @description   Replaces instances of usernames with alternate text.
// @include        http://www.okcupid.com*
// ==/UserScript==


var username = ["Stevie217","harpy61","BlueBuffellow","eliteromance","AliceInPervland","hazeyjanes","eric-the-read","thustotyrants","wutzalldisden","chinkajew"];
var altname = ["Cancer McHitlershit","herpy","harpy61b","Princess Cumgargle","MOARHAMZ","MANBROW","eric-the-red-tard","thrusto","wutzalldisden is the best","crooked mongreloid"];



var imgnames = ["Stevie217","thustotyrants"];
var userimg = ["http://www.smh.com.au/ffximage/2008/04/22/hitler_narrowweb__300x431,0.jpg","http://i137.photobucket.com/albums/q209/Johnnieboi32/Midget20Wrestler20Fuzzy20Cupid.jpg"];

// Sorry, didn't really bother to come up with anything good ^ :(


function init2(evt) {

var comusers = getElementsByAttribute(document,"class","comment_user",false);
		
for (var j=0;j<comusers.length;j++) {
var comuser = comusers[j];
var usernm = getElementsByAttribute(comuser,"class","user_name",false)[0].getElementsByTagName('a')[0].textContent;

var ind = imgnames.indexOf(usernm);
if (ind != -1) {
var img = comuser.getElementsByTagName('img')[0];
img.setAttribute('src',userimg[ind]);
}
}

for (var i=0;i<imgnames.length;i++) {
var imgs = getElementsByAttribute(document,"alt","An image of "+imgnames[i],false);
for (var j=0;j<imgs.length;j++) {
imgs[j].setAttribute('src',userimg[i]);
}
}
	

elements = document.getElementsByTagName('a');

  for (var i = 0;i<elements.length;i++) {
      a = elements[i];
      
      if (username.indexOf(a.innerHTML) != -1) {
      
        for (var j = 0; j<username.length;j++) {
          if(username[j]==a.innerHTML){
            a.innerHTML=altname[j];
          }
        }
      }
  }   




 

}



init2(0);


function getElementsByAttribute(frst,attrN,attrV,multi){
	

attrV=attrV.replace(/\|/g,'\\|').replace(/\[/g,'\\[').replace(/\(/g,'\\(').replace(

/\+/g,'\\+').replace(/\./g,'\\.').replace(/\*/g,'\\*').replace(/\?/g,'\\?').replace

(/\//g,'\\/');
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



document.addEventListener("DOMNodeInserted",
	function(evt) {
		init2(evt);
	}, true);