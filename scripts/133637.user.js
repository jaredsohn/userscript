// ==UserScript==
// @name          Eksi Defans
// @namespace     http://www.eksisozluk.com
// @description   eksi sozluk savunma aracı
// @include       http://antik.eksisozluk.com/*
// @copyright  2013+, b w n s p
// ==/UserScript==

function addJQuery(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "(" + callback.toString() + ")();";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}

// the guts of this userscript
function main() {
  var enterance = "0000";
  var validEnterance = false;
  $(".but a").css("opacity","0.5");
  $(".but").removeAttr("onclick");
  $(".but").click(function(){
	var html = $(this).find("a").html();
	if(html==retVal("sub-etha")){
		if(checkUser()==false)
			return false;
		else
			top.sozmain.location.href='sub_etha.asp';
	}else if(html==retVal("rastgele")){
		top.sozindex.location.href='index.asp?a=rn';
	}else if(html==retVal("bir gün")){
		top.sozindex.location.href='index.asp?a=rd';
	}else if(html==retVal("ukte")){
		top.sozindex.location.href='index.asp?a=rq';
	}else if(html==retVal("kenar")){
		top.sozindex.location.href='index.asp?a=dr';
	}else if(html==retVal("istatistikler")){
		top.sozindex.location.href='stats.asp';	
	}else if(html==retVal("kontrol merkezi")){
		if(checkUser()==false)
			return false;
		else
			top.sozmain.location.href='cc.asp';
	}else if(html==retVal("iletişim")){
		top.sozmain.location.href='iletisim.asp';	
	}else if(html==retVal("terk")){
		if(checkUser()==false)
			return false;
		else{
			javascript:bye();
			return false;
		}
	
	}else if(html==retVal("bugün")){
		top.sozindex.location.href='index.asp?a=td';
	}else if(html==retVal("dün")){
		top.sozindex.location.href='index.asp?a=yd';
	}else if(html==retVal("badi")){
		top.sozindex.location.href='index.asp?a=fv';
	}else if(html==retVal("son")){
		top.sozindex.location.href='index.asp?a=fl';
	}else if(html==retVal("fokur")){
		top.sozindex.location.href='index.asp?a=he';
	}else if(html==retVal("?")){
		top.sozmain.location.href='pick.asp?p=v';
	}else if(html==retVal("f")){
		top.sozindex.location.href='index.asp?a=sr&so=y&kw=*';
	}else if(html==retVal(":)")){
		top.sozmain.location.href='pick.asp?p=g';
	}else if(html==retVal("kullanıcı girişi")){
		javascript:top.sozmain.location.href='login.asp?ref='+encodeURIComponent(top.sozmain.location.href);
		return false;
	}
	
  });
  
  $(".but a").click(function(){
	var html = $(this).html();
	var val = $(this).attr("value"); 
	 if(html=="&nbsp;ben&nbsp;" || html=="&nbsp;terk&nbsp;" || html=="&nbsp;sub-etha&nbsp;" || html=="&nbsp;kontrol merkezi&nbsp;" || val == "yolla"){
		if(checkUser()==false)
		  return false;
	} 
  });
  
  $("input").click(function(){
	var type = $(this).attr("type");
	if(type=="submit"){
		if(checkUser()==false)
		  return false;
	}
  });
  
  $(".pi a").click(function(){
	if(checkUser()==false)
		return false;
  });
  
  function checkUser(){
	if(validEnterance==true)
		return true;
	var pass = prompt("buraya sadece ben girebilirim : ");
	if(pass==enterance){
		validEnterance=true;
		return true;
	}
	else{
		validEnterance=false;
		return false;
	}
  }
  
  function retVal(val){
	return "&nbsp;"+val+"&nbsp;";
  }
}

// load jQuery and execute the main function
addJQuery(main);