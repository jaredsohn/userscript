// ==UserScript==
//
// @namespace https://www.facebook.com/ongspxm
// @name SMB Redesigned
// @description SMB with a new look
// @include http://messages.hci.edu.sg/
// @include http://messages.hci.edu.sg/*
// 
// ==/UserScript==

// Login.JS

function getPage(){
  var a = window.location.href.split('/');
  var aa = a[a.length-1].split('?')[0];
  return a[a.length-2]+aa+' '+a[3];
}

function getText(obj){
  if(document.all){
    return obj.innerText;
  }else{
    return obj.textContent;
  }
}

function setText(obj, txt){
  if(document.all){
    obj.innerText = txt;
  }else{
    obj.textContent = txt;
  }
}

function add(){
  document.getElementById('aa').innerHTML = document.getElementById('hidden').innerHTML;
  document.theForm.submit();
}

function startLogin(){
  document.getElementsByTagName('html')[0].innerHTML = "<html> <head> <title>SMB Redesigned</title> </head> <style type='text/css'> body{ margin:0; padding:0; background:url('https://lh5.googleusercontent.com/-R8BJ57LHnuE/UQB7N9KNfaI/AAAAAAAAAxI/D36MxGPptdc/s300/blackorchid.png'); font-family:Times New Roman; } input:hover{ cursor:pointer; } #container{ padding:1em; width:100%; height:100%; } #header{ vertical-align:middle; height:3em; width:30em; } #header span.title{ color:#B8B7B5; font-size:250%; font-weight:800; } #changePassword{ float:right; } #changePassword button{ background:#EBE6E2; border-radius:0.5em; padding:0.5em 1em; margin:0.5em 0 0 0; } #content{ background:#EAEAEA; border-radius:2em; width:30em; padding:3em; } #content span.title{ font-size:150%; } #content .field{ color:#555555; font-size:120%; } #content .field input{ color:#000000; background:#FAFFBD; border:1px solid #C01F2F; width:20em; padding:0.2em 0.4em; } .login{ background:#CD4B52; padding:0.6em 2em; font-size:130%; border-radius:0.5em; color:#FFFFFF; font-weight:800; } </style> <body> <div id='container' align='center'> <form action='http://messages.hci.edu.sg/cgi-bin/smb/login.pl' method='post' onsubmit='return Validator(this);' name='theForm' _lpchecked='1'> <div style='height:1em'></div> <div id='header' align='left'> <img src='http://messages.hci.edu.sg/smb/hci.png' height='100%' valign='bottom'/><span class='title'> EMBs</span> <span id='changePassword'> <button onClick='add();' type='button'>Change Password</button> </span> </div> <div style='height:1em'></div> <div id='content'> <span class='title'>LOG IN</span> <div style='height:0.5em;'></div> <div class='field'> Username: <input type='text' name='userid' /> </div> <div style='clear:both;'></div> <div class='field'> Password: <input type='password' name='password' /> </div> <div style='height:0.5em;'></div> <input type='submit' value='LOG IN' class='login' onClick='localStorage.userid=document.theForm.userid.value;localStorage.pass=document.theForm.password.value;localStorage.link=window.location.href;'/> <div id='aa' style='display:none;'> <input type='hidden' name='login' value='LOG IN'/> </div> </div> </form> <script type='text/javascript'> document.theForm.userid.focus(); </script> <div style='display:none' id='hidden'> <input type='hidden' value='Change Password' name='change_psw' /> </div> <iframe style='display:none' src='http://messages.hci.edu.sg/cgi-bin/smb/logoutxyz.pl'  onload='this.parentNode.removeChild(this);'></iframe> </div> </body> </html>";
  
  sc = document.createElement('script');
  sc.textContent = add.toString();
  sc.setAttribute('type', 'text/javascript');
  document.head.appendChild(sc);
  
  if(localStorage.userid && localStorage.pass){
    document.getElementsByName('userid')[0].value=localStorage.userid;
		document.getElementsByName('password')[0].value=localStorage.pass;
  }
}

// Main.JS

var type1=[], type2=[], type3=[], type4=[], typea=[], html1='', html2='';
var body="<div id='container'> <div id='header'> <p class='header'><a href='' id='backLink' target='_self'><img src='https://lh5.googleusercontent.com/-Df639QvsVqY/UQH-eiHRUII/AAAAAAAAAyY/sr85mmpkvnM/s171/back_icon.png' height='100%'/></a> <a href='#' onClick='reloadType();'><img src='https://lh5.googleusercontent.com/-1j6eSTsX98c/UQEWVOa7tvI/AAAAAAAAAxo/-AJzBzhXm7k/s117/hci.png' height='100%;'onMouseOver='chgImg(this,2);' onMouseOut='chgImg(this,1);' class='hci'/></a> <span class='title' id='mainTitle'>EMBs</span><span class='logos'><a href='#' onClick='markAllAsRead();' target='_self'><img src='https://lh6.googleusercontent.com/-zcAWWDhad8I/UPrbFkHpfMI/AAAAAAAAAvE/-LeB0mQPRxs/s85/2509059225_575d95c47b.png' height='100%' valign='middle' title='Mark All As Read'/></a><a href='#' onClick='reloadTypeArchive();' target='_self'><img src='https://lh6.googleusercontent.com/-SfxoQKqR60U/UPresMiDajI/AAAAAAAAAvc/RKTpNA8o5jk/s76/120px-TK_archive_icon.svg.png' height='100%' valign='middle' title='Archive'/></a><a href='/cgi-bin/smb/logoutxyz.pl' target='_self'><img src='https://lh3.googleusercontent.com/-LqaSPrHp2ic/UPrgrt4OfQI/AAAAAAAAAv4/3urdaZ0nQmU/s163/onoff.png' height='100%' valign='middle' title='Log out'/></a></span></p> </div> <div id='error' align='center'></div> <div id='navi'> <script type='text/javascript'>reloadType();</script> </div> <div id='content'> <script type='text/javascript'>addHTML(1);</script> </div> <div id='hidden'> </div> </div>";
var css="::-webkit-scrollbar { width: 10px; } ::-webkit-scrollbar-track { -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3); border-radius: 8px; } ::-webkit-scrollbar-thumb { border-radius: 10px; -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.5); } body{ margin:0; padding:0; background:#EBE6E2; overflow:hidden; } #container{ margin:0; padding:0; width:100%; z-index:100; } #header{ background:#0E0E0E; width:100%; height:2em; padding:0.5em; position:fixed; z-index:100; } #header img.hci{ margin:0 0.3em 0 1em; } #header p.header{ margin:0; padding:0; } #header span.title{ color:#B8B7B5; font-weight:800; font-size:150%; font-family:'Times New Roman'; position:relative; top:-0.4em; } #header span.logos{ float:right; padding:0 1.5em 0 0; } #header span.logos img{ margin:0 0 0 1em; } #error{ color:#ff0000; font-weight:900; padding:0.3em 0; position:fixed; top:3em; width:100%; background:#D5D5D5; z-index:500; opacity:0.95; box-shadow: 0 0 1em #BAB5B2 inset; display:none; } #navi{ width:27em; float:left; background-color:#D4CFCB; border-right:1px solid #AFAAA6; overflow-y:scroll; overflow-x:hidden; height:100%; z-index:50; } #oneT, #twoT{ background:#CAC5C1; padding:0.2em 0.5em; font-family:Times New Roman; box-shadow: 0 0 1em #BAB5B2 inset; border-bottom:2px #6B6866 solid; } #oneT:hover, #twoT:hover{ cursor:pointer; } .message{ padding:0.25em 0 0 1em; border-top:1px solid #E6E3DE; border-bottom:1px solid #C3BEBB; } .message p{ font-family:'Times New Roman'; } .message:hover{ cursor:pointer; background:#EBE6E2; } .type1{ box-shadow:0.7em 0 #FF23A3 inset; font-weight:800; } .type2{ box-shadow:0.7em 0 #1CFF1C inset; font-weight:800; } .type3{ box-shadow:0.7em 0 #FF88A3 inset; } .type4{ box-shadow:0.7em 0 #88FF88 inset; } .message p.header{ margin:0; padding:0 2em 0 0; font-size:80%; } .message span.date{ float:right; } .message p.title{ margin:0; padding:3px 2em 0 15px; font-size:105%; } .message p.footer{ margin:0; padding:0 2em 0 0; text-align:right; font-size:90%; color:#86827F; } #content{ width:auto; height:100%; box-shadow:-0.5em 0 0.8em #B9B2AC; z-index:50; overflow-y:scroll; overflow-x:hidden; }";

function getLink(){
  http = new XMLHttpRequest();
  http.open('get','http://messages.hci.edu.sg/cgi-bin/emb/menu_htm.pl');
  http.onreadystatechange = function(){
    if(http.readyState==4){
      var html = http.responseText;
      var div = document.getElementById('hidden');
      div.innerHTML = html;
      document.getElementById('backLink').href = (div.getElementsByTagName('a')[3].href);
    }
  };
  http.send();
}

function toggle(v){
  if(v==1){
    var div = document.getElementById('one');
    var div2 = document.getElementById('oneA');
  }else{
    var div = document.getElementById('two');
    var div2 = document.getElementById('twoA');
  }
  if(div.style.display == 'none'){
    div.style.display = 'block';
    div2.innerHTML = "&#9650;";
  }else{
    div.style.display = 'none';
    div2.innerHTML = "&#9660;";
  }
}

function share(){
  window.open('http://www.facebook.com/sharer/sharer.php?u=http://pancake.io/6db767/SMBRedesigned/newSMB.html', 'Share', 'width=640,height=460');
}

function showError(mes){
  document.getElementById('error').innerHTML = mes;
  document.getElementById('error').style.display = 'block';
  setTimeout("document.getElementById('error').style.display = 'none';document.getElementById('error').innerHTML = '';", 3000);
}

function loadData(tr,s){
  tds = tr.getElementsByTagName('td');
  date = getText(tds[s]);
  from = getText(tds[s+1]);
  link = tds[s+2].getElementsByTagName('a')[0].getAttribute('href');
  title = getText(tds[s+2]);
  to = getText(tds[s+3]);
  data = [date,from,title,link,to];
  color = tds[s+1].getAttribute('bgcolor');
  if(s!=1){
    typea.push(data);
  }else if(color=='#ff6999'){
    type1.push(data);
  }else if(color=='#00ff00'){
    type2.push(data);
  }else if(color=='#ff88A3'){
    type3.push(data);
  }else{
    type4.push(data);
  }
};

function reloadType(){
  document.getElementById('navi').innerHTML = '<div align="center" style="padding:4em;"><img src="https://lh3.googleusercontent.com/-ttBTxkNVqbE/UPoX_dCHXFI/AAAAAAAAAuk/ayN0F-nyKcc/s128/350.gif" width="64px"></div>';
  var http = new XMLHttpRequest();
  http.open('get','http://messages.hci.edu.sg/cgi-bin/emb/view.pl?date??');
  http.onreadystatechange = function(){
    if(http.readyState==4){
      document.getElementById('hidden').innerHTML = http.responseText;
      type1=[],type2=[],type3=[],type4=[];
      
      var trs = document.getElementById('hidden').getElementsByTagName('tr');
      for(var i=1; i<(trs.length-1); i++){
        loadData(trs[i], 1);
      }
      
      printType(1);
      document.getElementById('navi').innerHTML = "<div style='height:3em;'></div><div onClick='toggle(1);' id='oneT'>Urgent Messages (<span id='n1'>"+type1.length.toString()+"</span>) <span id='oneA'>&#9650;</span> </div><div id='one'>"+html1+"</div><div onClick='toggle(2)' id='twoT'>Normal Messages (<span id='n2'>"+type2.length.toString()+"</span>) <span id='twoA'>&#9650;</span> </div><div id='two'>"+html2+"</div>";
      document.getElementById('mainTitle').innerHTML = "EMBs (<span id='nt'>"+(type1.length+type2.length).toString()+"</span>)";
    }
  };
  http.onerror = function(){
    showError('Unable to reload message list, trying again in a moment...');
    setTimeout('reloadType();', 10000);
  };
  http.send();
}

function reloadTypeArchive(){
  document.getElementById('navi').innerHTML = '<div align="center" style="padding:4em;"><img src="https://lh3.googleusercontent.com/-ttBTxkNVqbE/UPoX_dCHXFI/AAAAAAAAAuk/ayN0F-nyKcc/s128/350.gif" width="64px"></div>';
  var http = new XMLHttpRequest();
  http.open('get','http://messages.hci.edu.sg/cgi-bin/emb/view_archive.pl?date');
  http.onreadystatechange = function(){
    if(http.readyState==4){
      document.getElementById('hidden').innerHTML = http.responseText;
      typea = [];
      
      var trs = document.getElementById('hidden').getElementsByTagName('tr');
      for(var i=1; i<(trs.length-1); i++){
        loadData(trs[i],0);
      }
      
      printType(2);
      document.getElementById('navi').innerHTML = "<div style='height:3em;'></div>" + html1;
      setText(document.getElementById('mainTitle'), 'Archive');
    }
  };
  http.onerror = function(){
    showError('Unable to reload message list, trying again in a moment...');
    setTimeout('reloadTypeArchive()', 10000);
  };
  http.send();
}

function printType(v){
  if(v==1){
    html1 = '';
    html2 = '';
    for(var i=0; i<(type1.length); i++){
      mes = type1[i];
      html1+="<div class='message type1' onClick='loadMessage("+'"'+mes[3]+'"'+", this);'>";
      html1+="<p class='header'><span class='from'>"+mes[1]+"</span><span class='date'>"+mes[0]+"</span></p>";
      html1+="<p class='title'>"+mes[2]+"</p>";
      html1+="<p class='footer'><font class='to'>"+mes[4]+"</font></p>";
      html1+="</div>";
    }
    for(var i=0; i<(type3.length); i++){
      mes = type3[i];
      html1+="<div class='message type3' onClick='loadMessage("+'"'+mes[3]+'"'+", this);'>";
      html1+="<p class='header'><span class='from'>"+mes[1]+"</span><span class='date'>"+mes[0]+"</span></p>";
      html1+="<p class='title'>"+mes[2]+"</p>";
      html1+="<p class='footer'><font class='to'>"+mes[4]+"</font></p>";
      html1+="</div>";
    }
    for(var i=0; i<(type2.length); i++){
      mes = type2[i];
      html2+="<div class='message type2' onClick='loadMessage("+'"'+mes[3]+'"'+", this);'>";
      html2+="<p class='header'><span class='from'>"+mes[1]+"</span><span class='date'>"+mes[0]+"</span></p>";
      html2+="<p class='title'>"+mes[2]+"</p>";
      html2+="<p class='footer'><font class='to'>"+mes[4]+"</font></p>";
      html2+="</div>";
    }
    for(var i=0; i<(type4.length); i++){
      mes = type4[i];
      html2+="<div class='message type4' onClick='loadMessage("+'"'+mes[3]+'"'+", this);'>";
      html2+="<p class='header'><span class='from'>"+mes[1]+"</span><span class='date'>"+mes[0]+"</span></p>";
      html2+="<p class='title'>"+mes[2]+"</p>";
      html2+="<p class='footer'><font class='to'>"+mes[4]+"</font></p>";
      html2+="</div>";
    }
  }else{
    html1 = '';
    for(var i=0; i<(typea.length); i++){
      mes = typea[i];
      html1+="<div class='message type4' onClick='loadMessage("+'"'+mes[3]+'"'+", this);'>";
      html1+="<p class='header'><span class='from'>"+mes[1]+"</span><span class='date'>"+mes[0]+"</span></p>";
      html1+="<p class='title'>"+mes[2]+"</p>";
      html1+="<p class='footer'><font class='to'>"+mes[4]+"</font></p>";
      html1+="</div>";
    }
  }
}

function chgImg(img,v){
  switch(v){
    case 1:
      img.src='https://lh5.googleusercontent.com/-1j6eSTsX98c/UQEWVOa7tvI/AAAAAAAAAxo/-AJzBzhXm7k/s117/hci.png';
      break;
    case 2:
      img.src='https://lh6.googleusercontent.com/-M1MuIJXRCmo/UQEO4_8h6hI/AAAAAAAAAxY/iNv3UdcZUEo/s69/Button%2520Reload.png';
      break;
  }
}

function addHTML(v){
  switch(v){
    case 1:
      document.getElementById('content').innerHTML=("<div style='padding:5.5em;' align='center'><button onClick='share();' style='background:#627AAC;color:#FFFFFF;font-weight:800;padding:0.2em 0.8em;border-radius:0.5em;'>Share</button> <span style='font-weight:800;font-family:Times New Roman;'>SMB Redesigned</span><br /><span></span></div>");
      break;
    default:
      break;
  }
}

function defaultReload(){
  reloadType();
  setTimeout('defaultReload();', 600000);
}

function markAllAsRead(){
  var http = new XMLHttpRequest();
  http.open('get','http://messages.hci.edu.sg/cgi-bin/emb/view.pl?date??');
  http.onreadystatechange = function(){
    if(http.readyState==4){
      document.getElementById('hidden').innerHTML = http.responseText;
      type1=[],type2=[],type3=[],type4=[];
      
      var trs = document.getElementById('hidden').getElementsByTagName('tr');
      for(var i=1; i<(trs.length-1); i++){
        loadData(trs[i], 1);
      }
      
      for(var i=0; i<type1.length; i++){
        html1 += '<iframe src="'+type1[i][3]+'"></iframe>';
      }
      for(var i=0; i<type2.length; i++){
        html1 += '<iframe src="'+type2[i][3]+'"></iframe>';
      }
      document.getElementById('hidden').innerHTML = html1;
      
      var t1s = document.getElementsByClassName('type1');
      for(var i=0; i<t1s.length; i++){
        t1s[i].className = 'message type3';
      }
      
      var t2s = document.getElementsByClassName('type2');
      for(var i=0; i<t2s.length; i++){
        t2s[i].className = 'message type4';
      }
    }
  };
  http.onerror = function(){
    showError('Unable to access message list, trying again in a moment...');
    setTimeout('markAllAsRead();', 10000);
  };
  http.send();
}

function loadMessage(link, div){
  document.getElementById('content').innerHTML = '<div align="center" style="padding:4em;"><img src="https://lh3.googleusercontent.com/-ttBTxkNVqbE/UPoX_dCHXFI/AAAAAAAAAuk/ayN0F-nyKcc/s128/350.gif" width="64px"></div>';
  var http = new XMLHttpRequest();
  http.open('get',link);
  http.onreadystatechange = function(){
    if(http.readyState==4){
      document.getElementById('content').innerHTML = http.responseText;
      document.getElementById('content').getElementsByTagName('div')[0].setAttribute('style', 'position:relative;top:3.2em;left:0.4em;padding:0 1em 0 0;');
      
      n1 = document.getElementById('n1');
      n2 = document.getElementById('n2');
      nt = document.getElementById('nt');
      if(div.className=='message type1'){
        div.className='message type3';
        setText(n1, (parseInt(getText(n1))-1));
        setText(nt, (parseInt(getText(nt))-1));
      }else if(div.className=='message type2'){
        div.className='message type4';
        setText(n2, (parseInt(getText(n2))-1));
        setText(nt, (parseInt(getText(nt))-1));
      }
    }
  };
  http.onerror=function(){
    addHTML(1);
    showError('SMB is offline, so we are unable to load the message...');
  };
  http.send();
}

function startMain(){
  var doc = document.getElementsByTagName('html')[0];
  doc.innerHTML = "<html><head><title>SMB Reloaded</title></head><body></body></html>";
  
  var js = "var type1=[], type2=[], type3=[], type4=[], typea=[], html1='', html2='';";
  js += reloadType.toString();
  js += reloadTypeArchive.toString();
  js += loadData.toString();
  js += printType.toString();
  js += loadMessage.toString();
  js += showError.toString();
  js += share.toString();
  js += toggle.toString();
  js += chgImg.toString();
  js += addHTML.toString();
  js += getText.toString();
  js += setText.toString();
  js += defaultReload.toString();
  js += markAllAsRead.toString();

  var script = document.createElement('script');
  script.setAttribute('type', 'text/javascript');
  script.textContent = js;
  document.head.appendChild(script);
  
  var style = document.createElement('style');
  style.setAttribute('type', 'text/css');
  style.textContent = css;
  document.head.appendChild(style);
  
  document.body.innerHTML += body;
  defaultReload();
  getLink();
  addHTML(1);
}

// Menu.JS

var html3='';
function printLinks(){
  var trs = document.getElementsByTagName('tr');
  for(var i=1; i<trs.length; i++){
    var tds = trs[i].getElementsByTagName('td');
    var title = getText(tds[0]).split('_')[1];
    var link = tds[0].getElementsByTagName('a')[0].href;
    html3+="<a href='"+link+"'><div class='link'><p>"+title+"</p></div></a>";
  }
}

function startMenu(){
  printLinks();
  document.getElementsByTagName('html')[0].innerHTML="<html><head><title>SMB Redesigned</title></head><style type='text/css'>body{margin:0;padding:2em 0 0 0;background:url('https://lh5.googleusercontent.com/-R8BJ57LHnuE/UQB7N9KNfaI/AAAAAAAAAxI/D36MxGPptdc/s300/blackorchid.png');}p{margin:0;}a{text-decoration:none;}#header{color:#B8B7B5;}#header img{height:3em;}#header span{margin:0;font-size:400%;}#content{width:39em;}.link{background:#D4CFCB;width:10em;height:10em;border-radius:1em;margin:0.5em 1.5em;float:left;box-shadow:0 0 3em #6B6866 inset;}.link:hover{background:#EBE6E2;cursor:pointer;}.link p{line-height:5em;font-size:200%;font-weight:800;color:#000000;}.utils{color:#EBE6E2;text-decoration:none;font-size:130%;padding:0.3em 1em;}.utils:hover{color:#BDBDBD;border-radius:0.5em;border:1px #ffffff solid;}</style><body><div id='container'  align='center'><div id='header'><p align='center'><img src='https://lh5.googleusercontent.com/-1j6eSTsX98c/UQEWVOa7tvI/AAAAAAAAAxo/-AJzBzhXm7k/s117/hci.png' height='100%' /><span> EMBs</span></p></div><div id='content'>"+html3+"</div><div style='clear:both;height:1em;'></div><a href='menu_util.pl' class='utils'>Edit User Details</a></div></body></html>";
}

var page = getPage();
var page1 = page.split(' ')[1];
var page2 = page.split(' ')[0];
switch(page2){
  case 'smb':
    if(!localStorage.link){
      window.location.href='http://messages.hci.edu.sg/smb/college_student/';
    }else{
      window.location.href=localStorage.link;
    }
    break;
  case 'embmenu.pl':
    startMain();
    break;
  case 'smbmenu.pl':
    startMenu();
    break;
  case 'embview.pl':
    startMain();
    break;
  default:
    if(page1=='smb'){
      startLogin();
    }
    break;
}
