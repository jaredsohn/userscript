// ==UserScript==
// @name           gface
// @namespace      com.fishdan.greasemonkey
// @description    Allows posting of google+ posts to facebook
// @include        https://plus.google.com/
// ==/UserScript==
//alert('running script_pm');

var facebookMobileEmail='';


//google doesn't support GM storage values
if (!this.GM_getValue || (this.GM_getValue.toString && this.GM_getValue.toString().indexOf("not supported")>-1)) {
    this.GM_getValue=function (key,def) {
        return localStorage[key] || def;
    };
    this.GM_setValue=function (key,value) {
        return localStorage[key]=value;
    };
    this.GM_deleteValue=function (key) {
        return delete localStorage[key];
    };
}


if (!GM_getValue('facebookMobileEmail')) {
	facebookMobileEmail = prompt("Please enter your facebook mobile email address\nfrom http://www.facebook.com/mobile");
	GM_setValue('facebookMobileEmail', facebookMobileEmail);
} else {
	facebookMobileEmail = GM_getValue('facebookMobileEmail');
}



if(!document.getElementsByClassName){
  document.getElementsByClassName=function(cn){
    var allT=document.getElementsByTagName('*'), allCN=[], i=0, a;
    while(a=allT[i++]){
      a.className==cn?allCN[allCN.length]=a:null;
    }
    return allCN
  }
}

var mydivs=document.getElementsByClassName('a-f-i-bg');
for(var x=0;x<mydivs.length;x++){
    try{
        var myDiv=mydivs[x];
        var _a = document.createElement('a');
        _a.classname='d-h a-b-f-i-Zd-h';
        var _text = document.createTextNode('Make Facebook status')
        _a.appendChild(_text);
        var spacer=document.createTextNode(' - - ');
        myDiv.appendChild(spacer);
        myDiv.appendChild(_a);
        var parent=myDiv.parentNode;
        var subDivs=parent.getElementsByClassName('a-b-f-i-p-R');
        var subDiv=subDivs[0];
        var myTextNode = subDiv.innerHTML;
        //alert(myTextNode);
        var ta=myTextNode.split("<");
        ta[0]=ta[0].replace(/\'/g,"");
        ta[0]=ta[0].replace(/\+/g,"plus");
        //alert(ta[0]);
        var subject=encodeURIComponent(ta[0]);
        _a.href="mailto:"+GM_getValue('facebookMobileEmail')+"?subject="+ta[0];
    }
    catch(err){

    }
}