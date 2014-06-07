// ==UserScript==

// @name           Travian Market Overflow/Depletion w incoming amounts

// @namespace      market_overflow_depletion

// @description    Travian Market Overflow/Depletion timers and incoming amount for resources/crop considering arriving merchants

// @version        1.0.3

// @author         benuix

// @include        http://s*.travian*.*/build.php*

// @include        http://s*.travian*.*/dorf1.php*

// @include        http://s*.travian*.*/dorf2.php*

// @exclude        http://s*.travian*.*/build.php*t=*

// ==/UserScript==

// Included page: marketplace - send recources



var lang=new Array();

lang['gr']="Δικοί μου έμποροι στον δρόμο";

lang['com']="Own merchants underway";

lang['dk']= "Dine handelsmænd er på vej";





function getElementsByClass(searchClass,node,tag) {

	var classElements = new Array();

	if ( node == null )

		node = document;

	if ( tag == null )

		tag = '*';

	var els = node.getElementsByTagName(tag);

	var elsLen = els.length;

	var pattern = new RegExp("(^|\\s)"+searchClass+"(\\s|$)");

	for (i = 0, j = 0; i < elsLen; i++) {

		if ( els[i].className==searchClass ) {

			classElements[j] = els[i];

			j++;

		}

	}

	return classElements;

}




function isIframe(){
	return (self != top);

}

function isDorfPage() {
	var ind=location.href.lastIndexOf("/");
	var path=location.href.substring(ind+1);
	return ((path.indexOf("dorf1.php")+1) || (path.indexOf("dorf2.php")+1));
}



function isMarketSendResourcesPage() {

		var boolMLink1 = false;

		var boolMLink2 = false;

		var boolMarketResources = false;

		var forms=document.getElementsByTagName("form");	

		for(i=0;i<forms.length;i++)

		if (forms[i].name=='snd' && forms[i].action.indexOf('build.php')!=-1) {



			var mLinks = document.getElementsByTagName("a");

			for (xi = 0; xi < mLinks.length; xi++) {

				if (mLinks[xi].href.indexOf("&t=1") != -1) boolMLink1 = true;

				if (mLinks[xi].href.indexOf("&t=2") != -1) boolMLink2 = true;

			}

			var inputs=document.getElementsByTagName("input");

			var sn=0;

			for(j=0;j<inputs.length;j++)

				if(inputs[j].type=="text")sn++;

			if (boolMLink1 && boolMLink2 && sn > 6) boolMarketResources = true;

		}

		return boolMarketResources;

	}



function finddepletiontime(res,incomingLinks){

	var croptd=document.getElementById('l'+res);

	var croparr=croptd.innerHTML.split("/");

	var crop=croparr[0];

	var maxcropstorage=croparr[1];

	var cropproduction=croptd.title/3600;



	var sum=crop;

	var mul=1;

	var ret="<td ><font color='red'>";

	if(cropproduction<0){

		cropproduction*=-1;

		if(crop<=0){t--;return ret+"00:00:00</font></td>";}

	}else{ 

		sum=maxcropstorage-crop;

		mul=-1;

		ret="<td ><font color='black'>";

		if(sum<=0){t--;return ret+"00:00:00</font></td>";}

	}



	var savedtime=0;

	var remaining=0;



	for(i=0;i<incomingLinks.length;i++){

		remaining=sum/cropproduction;



		var timerhtml=document.getElementById("timer"+(i+1)).innerHTML;

		var timerarr=timerhtml.split(":");



		var incomingtime=Number(timerarr[0])*3600+Number(timerarr[1])*60+Number(timerarr[2])-savedtime;

		var income_html=incomingLinks[i].innerHTML;

		var income_array=income_html.split("|");

			var income=income_array[4-res];

			var ind=income.lastIndexOf(">");

			var num=Number(income.substring(ind+1));



				if(remaining>=incomingtime){

					sum-=cropproduction*incomingtime;

					sum+=mul*num;

					if(mul==1){
						if(sum>maxcropstorage)sum=maxcropstorage;
					}else{
						if(sum<0)sum=0;

					}

					savedtime+=incomingtime;

				}else break;

	}

	remaining=savedtime+sum/cropproduction;



	var h=Math.floor(remaining/3600);

	var m=Math.floor((remaining-h*3600)/60);

	var s=Math.floor(remaining-h*3600-m*60);



	ret+="<span id='timer"+t+"'>"+h+":"+m+":"+s+"</span></font></td>";

	return ret;

}







function incomingMerchants(incomingLinks){

	var ret="<tr>";

	var res=new Array();

	for(j=0;j<4;j++){

		res[j]=0;

	}

	for(i=0;i<incomingLinks.length;i++){

		var income_html=incomingLinks[i].innerHTML;

		var income_array=income_html.split("|");

		for(j=0;j<4;j++){

			var income=income_array[j];

			var ind=income.lastIndexOf(">");

			var num=Number(income.substring(ind+1));

			res[j]+=num;

		}

	}

        var flag=true;

	for(j=0;j<4;j++){

		ret+="<td>"+res[j]+"</td>";

                if(res[j]!=0)flag=false;

	}

        if(flag) return "";

	ret+="</tr>";

	return ret;

}





var t=1;

function createTable(){

	var htmlbody=document.body.cloneNode(true);

	 var sLang = location.hostname.substring(location.hostname.lastIndexOf('.') + 1);



	var ind=htmlbody.innerHTML.indexOf(lang[sLang]+":</p>");

	var newhtmlbody=htmlbody;

	if(ind!=-1){

		newhtmlbody.innerHTML=htmlbody.innerHTML.substring(0,ind)+"</p>";

	}



	var incomingLinks = getElementsByClass("f10",newhtmlbody,"span");


	
	if(isIframe())	while(parent.document.getElementById("timer"+t)){t++;}
	else	while(document.getElementById("timer"+t)){t++;}



	var wood=finddepletiontime(4,incomingLinks);
t++;
	var clay=finddepletiontime(3,incomingLinks);
t++;
	var iron=finddepletiontime(2,incomingLinks);
t++;
	var crop=finddepletiontime(1,incomingLinks);

	


	if(isIframe()  && self.name=="marketFrame"){
		var res=parent.document.getElementById("res");
		var restable=res.getElementsByTagName("TBODY")[0];

		var row=restable.insertRow(1);
		row.align='center';
		var rowtd=document.createElement("TD");
		rowtd.innerHTML="&nbsp";
		row.appendChild(rowtd);
		var rowtd1=document.createElement("TD");
		rowtd1.innerHTML=wood;
		row.appendChild(rowtd1);
		var rowtd=document.createElement("TD");
		rowtd.innerHTML="&nbsp";
		row.appendChild(rowtd);
		var rowtd2=document.createElement("TD");
		rowtd2.innerHTML=clay;
		row.appendChild(rowtd2);
		var rowtd=document.createElement("TD");
		rowtd.innerHTML="&nbsp";
		row.appendChild(rowtd);
		var rowtd3=document.createElement("TD");
		rowtd3.innerHTML=iron;
		row.appendChild(rowtd3);
		var rowtd=document.createElement("TD");
		rowtd.innerHTML="&nbsp";
		row.appendChild(rowtd);
		var rowtd4=document.createElement("TD");
		rowtd4.innerHTML=crop;
		row.appendChild(rowtd4);
		removeFrame();
	}else{
		var incoming=incomingMerchants(incomingLinks);



		var tablehtml="<table  style='background-color:#F5F5F5;border:1px solid silver;'><tr>"+

		"<td '><img class=\"r1\" src=\"img/x.gif\" alt=\"Ξύλο\" title=\"Ξύλο\"></td>"+

		"<td ><img class=\"r2\" src=\"img/x.gif\" alt=\"Πηλός\" title=\"Πηλός\"></td>"+

		"<td ><img class=\"r3\" src=\"img/x.gif\" alt=\"Σίδερο\" title=\"Σίδερο\"></td>"+

		"<td ><img class=\"r4\" src=\"img/x.gif\" alt=\"Σιτάρι\" title=\"Σιτάρι\"></td>"+

		"</tr><tr>"+wood+clay+iron+crop+"</tr>"+incoming+"</table>";

		var ps=document.getElementById("btn_ok").parentNode.nextSibling.nextSibling.nextSibling;



		var table=document.createElement("table");

		table.innerHTML=tablehtml;

		ps.parentNode.insertBefore(table,ps);

	}

}


function removeFrame(){
     var mf=parent.document.getElementById('marketFrame');  
     var mfp=mf.parentNode;   
     mfp.removeChild(mf);
}



if(isMarketSendResourcesPage()) createTable();
else if(isDorfPage()){
var content=document.getElementById("content");
content.innerHTML=content.innerHTML+"<iframe name='marketFrame' id='marketFrame' src='build.php?gid=17' width=301 height=52 style='visibility:hidden;'></iframe>";
}