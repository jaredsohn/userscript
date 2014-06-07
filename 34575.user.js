// ==UserScript==
// @name           OkCupid Images
// @namespace      NA
// @include        *okcupid*
// ==/UserScript==



function init2(evt) {
var swfurls = [];		
var infostring = "<p>This comment uses the GreaseMonkey script found at http://userscripts.org/scripts/show/34575 to embed images in OKCupid posts.</p>";
while (evt.target.innerHTML.indexOf(infostring) >= 0) {
	evt.target.innerHTML = evt.target.innerHTML.replace(infostring,"");
} 
 var swfRegExp = new RegExp("\\[IMG[\^\\[\]*\\]\(\[\^\\[\]*?\)\(\\[\\/IMG\\]\)","gi");
  var myCode = evt.target.innerHTML;
  var counter = 0;
  var swfs = swfRegExp.exec(myCode);
  var htRegExp = new RegExp("height=\(\[\^\\b\\]\]*\)\([\\b\\s\\]]\)","i");
  var wdRegExp = new RegExp("width=\(\[\^\\b\\]\]*\)\([\\b\\s\\]]\)","i");
  while(swfs != null) {
   var swfname = "swfiframe"+counter;
   var btnname = "swfbutton"+counter;
   var divname = "swfdiv"+counter;
   var urlRegExp = new RegExp("^\[http:\\/\\/\|https:\\/\\/\].*","i");
   if (urlRegExp.test(swfs[1])) {
    swfurls.push(swfs[1]);


    var ht = htRegExp.exec(swfs[0]);
    if (!ht) {
     ht = "300";
    } else {
     ht = ht[1];
    }
    var wd = wdRegExp.exec(swfs[0]);
    if (!wd) {
     wd = "400";
    } else {
     wd = wd[1];
    }
    myCode = myCode.replace(swfs[0],"<center><div id=\""+divname+"\" wd=\""+wd+"\" ht=\""+ht+"\" url=\""+swfs[1]+"\"><table><tr><td><input type=\"button\" value=\"Enable\" id=\""+btnname+"\" class=\"swfbutton\"></td><td><div id=\""+divname+"2\"><a href=\""+swfs[1]+"\">"+swfs[1]+"</a></div></td></tr></table><iframe width=\"0\" height=\"0\" id=\'"+swfname+"\' name=\'"+swfname+"\'></iframe></div></center>");
    swfs = swfRegExp.exec(myCode);
    counter++;
   } else {
    myCode = myCode.replace(swfs[0],"Invalid format: "+swfs[1]);
    swfs = swfRegExp.exec(myCode);
   }
  }//end while

if (counter > 0) {
   evt.target.innerHTML = myCode;
   var swfbtns = getElementsByAttribute(evt.target,"class","swfbutton",false);
    for (var i=0;i<swfbtns.length;i++) {
	var swfbtn = swfbtns[i];
     swfbtn.addEventListener("click", 
      function(ev) { 
      var btn = (ev.target);
	var dv = btn.parentNode.parentNode.parentNode.parentNode.parentNode;
      var frm = dv.getElementsByTagName('iframe')[0];
      var ur = dv.getAttributeNode('url').value;
      var ht = dv.getAttributeNode('ht').value;
      var wd = dv.getAttributeNode('wd').value;
      var sib = dv.getElementsByTagName('div')[0];
      if (btn.value == "Disable") { 
        sib.innerHTML="<a href="+ur+">"+ur+"</a>"; btn.value="Enable"; frm.width = 0; frm.height = 0; frm.src = "about:blank"; 
      } else {
        sib.innerHTML=ur; btn.value="Disable"; frm.src = ur; frm.width = wd; frm.height = ht;
      }
     }, false); 
   }//end for
}//end if

}//end init



function init3() {
var swfurls = [];		
var infostring = "<p>This comment uses the GreaseMonkey script found at http://userscripts.org/scripts/show/34575 to embed images in OKCupid posts.</p>";
while (document.body.innerHTML.indexOf(infostring) >= 0) {
	document.body.innerHTML = document.body.innerHTML.replace(infostring,"");
} 
 var swfRegExp = new RegExp("\\[IMG[\^\\[\]*\\]\(\[\^\\[\]*?\)\(\\[\\/IMG\\]\)","gi");
  var myCode = document.body.innerHTML;
  var counter = 0;
  var swfs = swfRegExp.exec(myCode);
  var htRegExp = new RegExp("height=\(\[\^\\b\\]\]*\)\([\\b\\s\\]]\)","i");
  var wdRegExp = new RegExp("width=\(\[\^\\b\\]\]*\)\([\\b\\s\\]]\)","i");
  while(swfs != null) {
   var swfname = "swfiframe"+counter;
   var btnname = "swfbutton"+counter;
   var divname = "swfdiv"+counter;
   var urlRegExp = new RegExp("^\[http:\\/\\/\|https:\\/\\/\].*","i");
   if (urlRegExp.test(swfs[1])) {
    swfurls.push(swfs[1]);


    var ht = htRegExp.exec(swfs[0]);
    if (!ht) {
     ht = "300";
    } else {
     ht = ht[1];
    }
    var wd = wdRegExp.exec(swfs[0]);
    if (!wd) {
     wd = "400";
    } else {
     wd = wd[1];
    }
    myCode = myCode.replace(swfs[0],"<center><div id=\""+divname+"\" wd=\""+wd+"\" ht=\""+ht+"\" url=\""+swfs[1]+"\"><table><tr><td><input type=\"button\" value=\"Enable\" id=\""+btnname+"\" class=\"swfbutton\"></td><td><div id=\""+divname+"2\"><a href=\""+swfs[1]+"\">"+swfs[1]+"</a></div></td></tr></table><iframe width=\"0\" height=\"0\" id=\'"+swfname+"\' name=\'"+swfname+"\'></iframe></div></center>");
    swfs = swfRegExp.exec(myCode);
    counter++;
   } else {
    myCode = myCode.replace(swfs[0],"Invalid format: "+swfs[1]);
    swfs = swfRegExp.exec(myCode);
   }
  }//end while

if (counter > 0) {
   document.body.innerHTML = myCode;
   var swfbtns = getElementsByAttribute(document.body,"class","swfbutton",false);
    for (var i=0;i<swfbtns.length;i++) {
	var swfbtn = swfbtns[i];
     swfbtn.addEventListener("click", 
      function(ev) { 
      var btn = (ev.target);
	var dv = btn.parentNode.parentNode.parentNode.parentNode.parentNode;
      var frm = dv.getElementsByTagName('iframe')[0];
      var ur = dv.getAttributeNode('url').value;
      var ht = dv.getAttributeNode('ht').value;
      var wd = dv.getAttributeNode('wd').value;
      var sib = dv.getElementsByTagName('div')[0];
      if (btn.value == "Disable") { 
        sib.innerHTML="<a href="+ur+">"+ur+"</a>"; btn.value="Enable"; frm.width = 0; frm.height = 0; frm.src = "about:blank"; 
      } else {
        sib.innerHTML=ur; btn.value="Disable"; frm.src = ur; frm.width = wd; frm.height = ht;
      }
     }, false); 
   }//end for
}//end if

}//end init


init3();


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