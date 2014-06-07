// ==UserScript==
// @name           Titulky.com - Direct Download
// @namespace      http://userscripts.org/users/useridnumber
// @include        http://www.titulky.com/*
// ==/UserScript==

function checkLink(){	
	if(document.getElementById('downdiv').style.display!='block') setTimeout(checkLink,5);
	else{
		var link=document.getElementById('downlink');
  		document.location=link.getAttribute('href');
	}
}

function Load(){
	
	if(document.location.href.indexOf("idown.php")>-1){
		if(document.forms[0]) document.forms[0].elements[0].focus();
		setTimeout(checkLink,1000);
	}
	else{
		c=document.getElementById("contwrap");
		c.innerHTML='<div id="downinfo"></div><iframe id="idown" frameborder="0"></iframe>'+c.innerHTML;
	
		t=document.getElementsByTagName("tr");
		for(i=0;i<t.length;i++){
			if(t[i].getAttribute("class")=="row1" || t[i].getAttribute("class")=="row2"){
				id=t[i].cells[0].firstChild.getAttribute("href").split("-");
				id=id[id.length-1].split(".")[0];
				/*l=id.length;
				fid="";
				for(j=1;j<=10-l;j++) fid+="0";
				fid+=id;*/					
			
				dlink=t[i].cells[1].innerHTML==""?'<img src="img/ico/rel.gif" atl="release"/>':t[i].cells[1].innerHTML;
				t[i].cells[1].innerHTML='<a title="'+t[i].cells[1].getAttribute("title")+'" href="javascript:void(0)" onClick="OpenDownload(\''+id+'\',\'z\',\'\'); return false">'+dlink+'</a>';
			}
			else if(t[i].getAttribute("class")=="row_head"){
				t[i].cells[1].innerHTML="Download"
			}
		
		
		}
	}
}

document.addEventListener('load',Load(),false);
