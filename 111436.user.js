// ==UserScript==
// @name                BW-pie-InventoryImprover
// @namespace           http://test.brokenworlds.com
// @description	        improves inventory mode
// @author        	Pietrovich and newWorm (mix MMM+Shenakim)
// @include             http://*.brokenworlds.com/inv.php?do=items
// @include             http://brokenworlds.com/inv.php?do=items
// @charset             windows-1251
// @version             1.0.4
// ==/UserScript==

unsafeWindow.ShowInvData = function()
{
        var arr1 = new Array;
        var mstr="";
        var arr2 = new Array;
	var s="";
	var s1="";
	var s2="";
	arr1=unsafeWindow.recieved_data.split('<OO>');
        for (i=0; i<(arr1.length-1);i++)
        {
                arr2=arr1[i].split('<O>');
		mstr+="<nobr style='float:left;width:70px;height:70px;'>";
		s=arr2[6];
//		title='"+arr2[3]+"'
		mstr+="<img src='http://img.brokenworlds.com/items/"+arr2[2]+"' width=64 height=64 border=0 style='cursor: hand;z-index: -1;' onMouseOver='MyMouseOver("+arr2[0]+");'onMouseOut='MyMouseOut();' onClick='javascript:fixedcell=false;MyMouseOver("+arr2[0]+");fixedcell=true;'myid='"+arr2[0]+"'>";
		mstr+="<span style='position:relative;bottom:1px;right:20%;width:1px;background:#C6A56B;border:solid 1px black;font-size:9px;padding:1px;'>"+arr2[4]+"</span>";
		mstr+="<span style='position:relative;top:-53px;right:100%;width:1px;background:#C6A56B;font-size:9px;padding:0px;'>"+arr2[4]*arr2[5]/1000+"<small>кг</small></span>";
		s2="none";
		if (s != ""){
		 s=s.split("<br>");
		 s=s[s.length-1].slice(11,-15); //прочность
		 s1=s.split("/");
		 if (s1[1]!=5){
		 s1=Math.round(64*s1[0]/s1[1]);
		 if (s1>48) {s2="#009240"}
		 else if (s1>32) {s2="#FCDB00"}
			else if(s1>16) {s2="#FF6000"}
				else {s2="#FF0000"}
		}}
		mstr+="<span style='float:left;position:relative;top:0px;left:0px;height:2px;width:"+s1+"px;font-size:2px;background:"+s2+";padding:0px;z-index: 0'>"+s+"</span>";
		mstr+="</nobr>"

		unsafeWindow.DATA_TYPE[arr2[0]]=arr2[1];
	        unsafeWindow.DATA_IMG[arr2[0]]=arr2[2];
		unsafeWindow.DATA_NAME[arr2[0]]=arr2[3];
	        unsafeWindow.DATA_QUANTITY[arr2[0]]=arr2[4];
	        unsafeWindow.DATA_WEIGHT[arr2[0]]=arr2[5];
	        unsafeWindow.DATA_OPIS[arr2[0]]=arr2[6];
        }
        unsafeWindow.document.getElementById("input_field").innerHTML=mstr;
//	unsafeWindow.document.getElementById("input_field").style.overflow="auto";
//	unsafeWindow.document.getElementById("input_field").style.Height="100%";
	
}



unsafeWindow.MyMouseOver = function(obj)
{


        if (unsafeWindow.fixedcell) return true;
		curID=obj;//.myid;
		var DATA_IMG = unsafeWindow.DATA_IMG;
		var DATA_NAME = unsafeWindow.DATA_NAME;
		var DATA_QUANTITY = unsafeWindow.DATA_QUANTITY;
		var DATA_WEIGHT = unsafeWindow.DATA_WEIGHT;
		var DATA_OPIS = unsafeWindow.DATA_OPIS;
		var DATA_TYPE = unsafeWindow.DATA_TYPE;

        mstr="<form name=form1 id=form1 method='get' onSubmit='return false;' style='paddind: 0px; margin: 0px;'>";
       // mstr+="<span style='font-size: 12px; float:left;'><img border=0 width=64 height=64 src='/_img/items/"+DATA_IMG[curID]+"' style='display: block;'></span>";
        mstr+="<span style='font-size: 12px'><!--Name: --><b>"+DATA_NAME[curID]+"</b>&nbsp;&nbsp;<a href=\"help.php?i=items&mode=showitem&id="+DATA_TYPE[curID]+"\" target=\"_blank\">?</a><br>";
        mstr+="<span style='font-size: 12px'>Количество:</span> <b style='font-size: 16px;'>"+DATA_QUANTITY[curID]+"</b><br>";
        mstr+="<span style='font-size: 12px'>Вес:</span> "+DATA_WEIGHT[curID]/1000+" x "+DATA_QUANTITY[curID]+" = <b style='font-size: 16px;'>"+Math.round(DATA_WEIGHT[curID]/1000*DATA_QUANTITY[curID]*1000)/1000+"</b> кг.<br>";

        mstr+=DATA_OPIS[curID];

        mstr+="<br>Количество: <input name='count' type='text' value='1' class='inv-input'  size='3' id='pie_DropAmount'>";
        mstr+="<input name='id' type='hidden' value='"+curID+"'>";
        mstr+=" &nbsp; <input name='inv_use' type='button' id='inv_use' value='Использовать' class='button_use' onClick='parent.GoTo(\"inv.php?id=\"+document.forms[\"form1\"].id.value+\"&inv_use=use&count=\"+document.forms[\"form1\"].count.value)'>&nbsp;";
        mstr+=" &nbsp; <input name='inv_use' type='button' id='inv_use' value='Выбросить' class='button_drop' onClick='if (confirm(\"&#1044;&#1077;&#1081;&#1089;&#1090;&#1074;&#1080;&#1090;&#1077;&#1083;&#1100;&#1085;&#1086; &#1074;&#1099;&#1073;&#1088;&#1086;&#1089;&#1080;&#1090;&#1100;?\")) parent.GoTo(\"inv.php?id=\"+document.forms[\"form1\"].id.value+\"&inv_use=throw&count=\"+document.forms[\"form1\"].count.value);'></center></span></form><br/>";

		var links = "<table id='pieDropHolder' cellpadding=0 cellspacing=0 border=0>";
		var c1 = "Использовать: <br/>";
		var c2 = "Выбросить: <br/>";
		var ama = new Array(1,2,3,4,5,10,20,30,40,50,100,200);
		var i = 0;
		for(i=0; i<ama.length;i++)
		{
			if (ama[i] > DATA_QUANTITY[curID]) break;
			c1+="<a class='pieUse' href='javascript:parent.GoTo(\"inv.php?id="+curID+"&inv_use=use&count="+ama[i]+"\");void(0);'>"+ama[i]+"</a> ";
			c2+="<a class='pieDrop' href='javascript:parent.GoTo(\"inv.php?id="+curID+"&inv_use=throw&count="+ama[i]+"\");void(0);'>"+ama[i]+"</a> ";
		}
		links+="<tr><td>"+c1+"</td>";
		links+="<td>"+c2+"</td></tr>";
		links+="<tr valign=center>";
		links+="<td><a class='pieUse' href='javascript:parent.GoTo(\"inv.php?id="+curID+"&inv_use=use&count="+DATA_QUANTITY[curID]+"\");void(0);'>ВСЕ</a></td>";
		links+="<td><a class='pieDrop' href='javascript:parent.GoTo(\"inv.php?id="+curID+"&inv_use=throw&count="+DATA_QUANTITY[curID]+"\");void(0);'>ВСЕ</a></td>";
		links+="</tr></table>";
        var ddd=unsafeWindow.parent.document.getElementById("information-div");
		if (ddd)
		{
	       ddd.innerHTML=mstr+links+"<br/><br/><br/><br/><br/>";
		}
}

function onLoad()
{
//получаем нужную таблицу (TBody) - путь через альпы :(
	var s=unsafeWindow.document.getElementById("xTooltipElement").previousSibling.previousSibling.previousSibling.lastChild.firstChild.childNodes[3].lastChild.childNodes[1].firstChild.childNodes[1].firstChild.lastChild;
	var i;
	var s1;
	var mstr;
	for (i=2;i<11;i+=4){ //по рядам
	 if(s.childNodes[i].childNodes[3].childNodes[0].localName=="A"){
	  s1=s.childNodes[i].childNodes[3].childNodes[0].innerHTML.split("(")[3].split("'");
	  if (i==10) {s.childNodes[i+2].childNodes[3].innerHTML+="<span style='font-size:11px;padding:0px;>"+s1[9]+"</span>";}
	  else {s.childNodes[i+2].childNodes[3].innerHTML+="<span style='font-size:11px;padding:0px;'>"+s1[3]+"</span>";}
	 }
	 if(s.childNodes[i].childNodes[7].childNodes[0].localName=="A"){
	  s1=s.childNodes[i].childNodes[7].childNodes[0].innerHTML.split("(")[3].split("'");
	  s.childNodes[i+2].childNodes[7].innerHTML+="<span style='font-size:11px;padding:0px;>"+s1[9]+"</span>";
	 }


	}
	
//	confirm(s);

}

window.addEventListener("load", onLoad, false);