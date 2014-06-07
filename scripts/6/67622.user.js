// ==UserScript==
// @name           MultiGold
// @namespace      http://dirty.ru/*
// @description    Sets a tag for number of posts
// @include        http://dirty.ru/my/inbox/268330*
// @include        http://www.dirty.ru/my/inbox/268330*
// ==/UserScript==


document.onLoad=GoldenizeEm();

function Proc(n) {
  clearTimeout(T);
  function GoNext() {
    var sel=document.getElementsByName('sel')[0];
    var NextLink="";
    var lnks=new Array;
    for (var i=1;i<sel.length;i++) lnks[i-1]=sel.options[i].text;
    while ((NextLink=="")&&(lnks.length>0)) NextLink=lnks.shift();
    if (lnks.length>0) {
      console.value+=NextLink;
      console.scrollTop=console.scrollHeight;
      ifrm.src=NextLink;
      sel.remove(0);
    } else {
      console.value+="\nJob complete.\n";
      console.scrollTop=console.scrollHeight;
      var YTxt=document.getElementsByName('YTxt')[0];
      YTxt.innerHTML="Done!";
    }
  }
  var console=document.getElementsByName('LList')[0];
  var ifrm=document.getElementsByName('ifrm')[0];
/*  if(n==1) {
    console.value+=" checking tag;";
    console.scrollTop=console.scrollHeight;
    var TC=ifrm.contentDocument.getElementsByClassName('tag');
    var HasTag=false;
    var Gold=decodeURI('%D0%B7%D0%BE%D0%BB%D0%BE%D1%82%D0%BE%D0%B9%20%D0%BF%D0%BE%D1%81%D1%82');
    for (var i in TC) HasTag|=(TC[i].innerHTML==Gold);
    if (HasTag) {
      console.value+=" done.\n";
      console.scrollTop=console.scrollHeight;
      GoNext();
    } else {
      console.value+=" WTF, reloading;";
      console.scrollTop=console.scrollHeight;
      ifrm.src=ifrm.src;
      T=setTimeout("Proc(1);",5000);
    }
  } else { */
    console.value+=" - ok;\n";
    GoNext();
//  }
}

function ProcessList() {
  if (document.getElementsByName('sel').length>0) {
    window.location.reload();
    return false;
  } else {
    var List=document.getElementsByName('LList')[0];
    var Field=document.getElementsByName('FField')[0];
    var Tag=document.getElementsByName('FTag')[0].value;
    var Act=document.getElementsByName('Act')[0].selectedIndex;
    var uLinksList; //=(window.google)?window.LinksList:unsafeWindow.LinksList;
    uLinksList=List.value.split('\n');
    var mySite=(window.location+"").split('/')[2];
    for (var i in uLinksList) if (uLinksList[i]!="") {
      var s=(uLinksList[i]+"").split('/');
      s[2]=mySite;
      uLinksList[i]="http://dirty.ru/tagit/"+(Act?"del/":"new/")+s[4]; // many thanks DimDimych!
      uLinksList[i]+="/"+encodeURI(Tag);
    }
    uLinksList.push("end");
    var sel=document.createElement("SELECT");
    sel.name="sel";
    for (var i in uLinksList) sel.options.add(new Option(uLinksList[i]));
    sel.style.display="none";
    Field.appendChild(sel);
    var ifrm=document.createElement("IFRAME");
    ifrm.setAttribute("src",uLinksList[0]);
    ifrm.setAttribute("onLoad","var t=setTimeout('window.parent.Proc(0)',500);");
    ifrm.name="ifrm";
    ifrm.style.width="600px";
    ifrm.style.height="200px";
    ifrm.style.display="none";
    ifrm.lnks=new Array();
    ifrm.lnks=uLinksList;
    List.value=uLinksList[0];
    Field.appendChild(ifrm);
  }
}

function ToggleBox() {
  if (document.getElementsByName('FField').length==0) {
    var Field=document.createElement('div');
    Field.setAttribute("name","FField");
    document.body.appendChild(Field);
    Field.style.cssText='position:fixed;top:80px;left:50%;width:620px;margin-left:-320px;text-align:center;background:#fff;padding:10px;border:3px solid #999;z-index:1800;font-size:10px;overflow:auto;';
    var Act=document.createElement("SELECT");
    Act.name="Act";
    Act.options.add(new Option('Set'));
    Act.options.add(new Option('Remove'));
    Field.appendChild(Act);
    Field.appendChild(document.createTextNode(' tag '));
    var FTag=document.createElement('input');
    FTag.name='FTag';
    FTag.value=decodeURI('%D0%B7%D0%BE%D0%BB%D0%BE%D1%82%D0%BE%D0%B9%20%D0%BF%D0%BE%D1%81%D1%82');
    Field.appendChild(FTag);
    Field.appendChild(document.createTextNode(' on:\n'));
    var List=document.createElement('textarea');
    List.style.cssText='clear:both;width:600px;height:120px;';
    List.name='LList';
    Field.appendChild(List);
    List.value="http://dirty.ru/comments/500000\nhttp://dirty.ru/comments/5";
    Yarr=Field.appendChild(document.createElement('A'));
    Yarr.appendChild(document.createTextNode('Yarrr!'));
    Yarr.href="#";
    Yarr.addEventListener('click',ProcessList,true);
  } else {
    document.body.removeChild(document.getElementsByName('FField')[0]);
  }
}

function GoldenizeEm() {
  var SpecBtn=document.createElement('div');
  document.body.appendChild(SpecBtn);
  SpecBtn.style.cssText = 'position:fixed;top:0px;left:12px;background:#fff;padding:10px;border:1px solid #999;z-index:1200;font-size:10px; overflow:auto;';
  SpecBtn.id = 'SpecBtn';
  var BLnk=document.createElement('A');
  Btn=SpecBtn.appendChild(BLnk);
  Btn.appendChild(document.createTextNode('Tags control center'));
  Btn.href='#';
  Btn.addEventListener('click',ToggleBox,true);
  var scr=document.createElement("script");
  scr.type="application/javascript";
  scr.textContent="var T; "+Proc;
  document.body.appendChild(scr);
}
