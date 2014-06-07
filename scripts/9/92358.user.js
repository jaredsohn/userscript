// ==UserScript==
// @name           korean2latin
// @namespace      korean2latin
// @description    transforms korean to latin alphabet
// @include        *
// ==/UserScript==

//lead jamo
var leadarray=["","g","gg","n","d","dd","r","m","b","bb","s","ss","","j","jj","c","k","t","p","h"];

//vowel jamo
var vowelarray=["","a","ae","ya","yae","eo","e","yeo","ye","o","wa","wae","oe","yo","u","weo","we","wi","yu","eu","yi","i"];

//tail jamo
var tailarray=["","g","gg","gs","n","nj","nh","d","l","lg","lm","lb","ls","lt","lp","lh","m","b","bs","s","ss","ng","j","c","k","t","p","h"];


function choise(hangulchar) {
if('가'<=hangulchar && hangulchar<='힣')
         { 
hangulcharcode= hangulchar.charCodeAt(0);

var tail = parseInt((hangulcharcode - 44032) % 28);

var vowel =parseInt(1 + ((hangulcharcode - 44032 - tail) % 588)/28);
 
var lead = parseInt(1 + (hangulcharcode - 44032)/588);

var latintext=leadarray[lead]+vowelarray[vowel]+tailarray[tail];

return latintext;
}else{
return hangulchar;
}
}


var alltextnodes = document.evaluate('.//text()[normalize-space(.) != ""]',document.body,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);

var currentchar ='';

var tmptext='';

for (var j = 0, l = alltextnodes.snapshotLength ; j < l; j++)
{
   
   for (var i = 0, ll=alltextnodes.snapshotItem(j).data.length; i <ll; i++)
     {
       currentchar=alltextnodes.snapshotItem(j).data[i];     
       currentchar=choise(currentchar);
       tmptext=tmptext+currentchar;
     }
   
   alltextnodes.snapshotItem(j).data = tmptext;
   tmptext='';
}
