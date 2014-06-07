
// ==UserScript==
// @name           Google Translate
// @author         Jesus Serrano <jesus.serrano@gmail.com>
// @description    Injects the query tranlated into selected language
// @include        http://www.google.*
// ==/UserScript==

var regexp_q= /q=([^&]*)&/

var ret=location.search.match(regexp_q);
//q=decodeURI(ret[1]).replace(/\+/g," ")


if(ret){
    

var q=ret[1];
var langpair=GM_getValue("gt_langpair", "en|es");

var gt_url='http://translate.google.com/translate_t?text='+q+'&langpair='+langpair;


window.getTranslate=function (gt_url){
  GM_xmlhttpRequest({
    method: 'GET',
    url: gt_url,
    headers: {
        'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
        'Accept': 'application/atom+xml,application/xml,text/xml',
    },
    onload: function(responseDetails) {
      showTranslate(responseDetails.responseText);
      
    },

    onreadystatechange: function(responseDetails){
      if(document.getElementById("gt_link")){
	document.getElementById("gt_link").innerHTML="Loading...";
      }else{
	document.getElementById("gt_greamonkey").innerHTML="Loading...";
      }
    }
});

}

window.showTranslate=function (body_str){
  
  var regexp_t=/<textarea\ name=q[^>]*>([^<]*)</
  var ret=body_str.match(regexp_t);

  var regexp_select_lang=/<select\ name=langpair\>(.*?)<\/select><input\ type=hidden\ name=hl/
  var ret_select=body_str.match(regexp_select_lang);

  var t_div="<div style='border-top: #3366cc 1px solid; background: #e5ecf9;font-size:12px;amily: Verdana, Tahoma, Helvetica, Arial;padding:5px'><b>Google Translate Search</b></div>";


  t_div+="<select name=lang>";
  t_div+=ret_select[1].replace("selected","").replace("value=\""+langpair+"\"" ,"value=\""+langpair+"\" selected")
  t_div+="</select>";


  t_div+="<div id='gt_link' style='background: #ffffff; font-size:12px; font-family: Verdana, Tahoma, Helvetica, Arial;padding:5px'>";
  cur_location=document.URL
  t_div+="<a href='"+cur_location.replace(/q=[^&]*/,"q="+ret[1])+"'>"
  t_div+=ret[1]+"</a></div>";

  document.getElementById("gt_greamonkey").innerHTML=t_div  
}




var countNodes=0;
var countNodes2=0;
var f = document.getElementsByTagName('font');
for (var i=0;i<f.length;i++) {
  if (f[i].className == 'a') {
    t = f[i].parentNode.parentNode.parentNode.parentNode.parentNode;
    if(t.style.display!='none') countNodes++;
  }
}


var s = document.getElementsByTagName('span');
for (var i=0;i<s.length;i++) {
  if (s[i].className == 'a') {
    countNodes2++;
    ch = s[i].parentNode.parentNode;
    if(ch.style.display!='none') countNodes2++;
  }
}

var gt_margin_right="5px";
var gt_margin_top=135;

if(countNodes>0){
  gt_margin_right="25%";
}

gt_margin_top+=(countNodes2*40);

var t_div="<div id=gt_gm_content style='font-size:12px;amily: Verdana, Tahoma, Helvetica, Arial;border-left: #e5ecf9 2px solid; position:absolute; padding:5px;right:"+gt_margin_right+"; top:"+gt_margin_top+"px;'><div id=gt_greamonkey></div></div>";
var mydiv = document.createElement("div");
mydiv.innerHTML=t_div;
document.body.insertBefore(mydiv, document.body.firstChild);





getTranslate(gt_url);




document.addEventListener('change', function(event) {
  if(event.target.name=="lang"){

    langpair=event.target.value;
    GM_setValue("gt_langpair",langpair);
    gt_url='http://translate.google.com/translate_t?text='+q+'&langpair='+langpair;
    getTranslate(gt_url);
  }
  event.stopPropagation();
  event.preventDefault();
}, true);


}
