// ==UserScript==
// @name           thrillion
// @namespace      thrillion: egy protekciós ismerős
// @description    autoTK
// @include        http://thrillion.hu/action/work.php*
// @include        http://thrillion.hu/char.php*
// @include        http://www.thrillion.hu/action/work.php*
// @include        http://www.thrillion.hu/char.php*
// ==/UserScript==
//<script>
function setCookie(c_name,value,expiredays){
  var exdate=new Date();
  exdate.setDate(exdate.getDate()+expiredays);
  document.cookie=c_name+ "=" +escape(value)+ ((expiredays==null) ? "" : ";expires="+exdate.toGMTString());
}
function getCookie(c_name){
	if (document.cookie.length>0){
		c_start=document.cookie.indexOf(c_name + "=")
		if (c_start!=-1){
			c_start=c_start + c_name.length+1 
			c_end=document.cookie.indexOf(";",c_start)
			if (c_end==-1) c_end=document.cookie.length
			return unescape(document.cookie.substring(c_start,c_end))
		}
	}
	return "";
}

function xPath(xpathExpr) {
	return document.evaluate(xpathExpr, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );
}

function work(){
//if(location.href=="http://thrillion.hu/action/work.php"){
if(document.body.innerHTML.indexOf("meghaladta")===-1){
var table=document.querySelector("form table");

/*
try{
  if(document.body.innerHTML.indexOf("gezted")===-1){
    var table = document.body.childNodes[3].lastChild.rows[2].cells[0].childNodes[1].lastChild.childNodes[0].cells[0].childNodes[7].firstChild.rows[0].cells[0].childNodes[1].lastChild;
  }else{
    var table = document.body.childNodes[3].lastChild.rows[2].cells[0].childNodes[1].lastChild.childNodes[0].cells[0].childNodes[9].firstChild.rows[0].cells[0].childNodes[1].lastChild;
  }
}catch(e){
  if(document.body.innerHTML.indexOf("gezted")===-1){
    var table = document.body.childNodes[3].lastChild.rows[2].cells[0].childNodes[1].lastChild.childNodes[0].cells[0].childNodes[4].firstChild.rows[0].cells[0].childNodes[1].lastChild;
  }else{
    var table = document.body.childNodes[3].lastChild.rows[2].cells[0].childNodes[1].lastChild.childNodes[0].cells[0].childNodes[6].firstChild.rows[0].cells[0].childNodes[1].lastChild;
  }
}*/
//    var table = document.body.childNodes[3].lastChild.rows[2].cells[0].childNodes[1].lastChild.childNodes[0].cells[0].childNodes[*]
  //4 vagy 6 ha ninc.firstChild.rows[0].cells[0].childNodes[1].lastChild;s reklám
  //7 vagy 9 ha van reklám
  //var table=document.getElementById("munkak")
  
  try{
  for(var i=0,max=table.rows.length,munkak=[];i<max;i++){
		var tds=table.rows[i].cells;
		var kell=tds[1].textContent.replace(/[^a-z0-9 ]/gi,"").match(/(Er|gyess|szs|szlel)\w* (\d+)/);
		var van=[ero,ugy,ege,esz][["Er","gyess","szs","szlel"].indexOf(kell[1])]
		kell=kell[2];
		/*
		space=td1.innerHTML.indexOf("(");
		munka_nev=td1.innerHTML.substring(0,space-1)
		kell_hozza=td1.innerHTML.substring(space+1,1000);
		space=kell_hozza.indexOf(" ");
		next=kell_hozza.substring(space,1000);
		kell_hozza=kell_hozza.substring(0,space);
		kell=next.substring(1,3);

		if(kell_hozza.indexOf("Er")!==-1){min=ero}else
		if(kell_hozza.indexOf("gyess")!==-1){min=ugy}else
		if(kell_hozza.indexOf("szs")!==-1){min=ege}else
		if(kell_hozza.indexOf("szlel")!==-1){min=esz}else{
		alert("Nem találtam ebben semmit, ami az indexOf ra reagált volna:\n"+td1.innerHTML)}
		*/
		if(van<kell){
			table.rows[i].style.backgroundColor="red";
			munkak[i]=0;
		}else{
			table.rows[i].style.backgroundColor="gray";
			munkak[i]=tds[2].textContent.match(/\d+/)*1;
		}
  }
  var bst=0;
  for(var i=0;i<max;i++){
  if(munkak[i]>munkak[bst]){bst=i;}
  }
  table.rows[bst].style.backgroundColor="green";
  table.querySelectorAll("input")[bst].checked=true;
  document.querySelector("form input.input").style.height="200px"
  document.querySelector("form input.input").style.width="200px"
  
  }catch(e){alert("exception:"+e);}
}else{
  alert("VÉTKEZTEM, elnézést, kérlek kegyelmezz!(aszongya h nem tod megcsinálni szal ez van...)");
}
}

if(location.href.indexOf("char")!=-1){
  /*var table=document.body.childNodes[3].lastChild
  table=table.rows[2].cells[0].childNodes[1].lastChild.childNodes[0]
  table=table.cells[0]
  table=table.childNodes[8]
  table=table.childNodes[1]
  table=table.rows[0]
  table=table.cells[0]
  table=table.childNodes[1]
  table=table.lastChild
  table=table.rows[7]
  table=table.cells[0]
  table=table.childNodes[1]
  table=table.childNodes[7]
  table=table.lastChild*/
  var l=document.querySelectorAll("td>b>a")
	for(var m=[],q=[],i=0;i<l.length;i++){
		m[i]=l[i].parentNode.parentNode.nextElementSibling.nextElementSibling;
		if(m[i]!=null && m[i].textContent){
			q.push(m[i].textContent);
		}
	}
  ero=q[0];
  ugy=q[1];
  ege=q[2];
  esz=q[3];
  setCookie("settings","ok"+ero+ugy+ege+esz,10);
}else{
  settings=getCookie("settings");
  if(settings.substring(0,2)=="ok"){
    var ero=settings.substring(2,4);
    var ugy=settings.substring(4,6);
    var ege=settings.substring(6,8);
    var esz=settings.substring(8,10);
    //console.log("ok\n"+ero+"\n"+ugy+"\n"+ege+"\n"+esz)
    window.addEventListener("load",work,false);
  }else{
    if(confirm("nem kaptam meg a beállításokat. Tovább?")){
      location.href="http://thrillion.hu/char.php";
    }
  }
}