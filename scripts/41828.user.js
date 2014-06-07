// 
// version 1.4.2 (lite)
// 2008-05-21
// author - immortalnights
// contributions by - wphilipw and ecamanaut
//
// homepage - http://www.ikaraimlibrary.com/
// for up to date details and version, please check the home page.
//
// Please do not remove the above details; it is impossible to ensure
// all copys of this script are kept upto date, people need to know
// where they can go to get the most up to date version.
//
// For full version history please see, http://www.ikariamlibrary.com/
//
// ==UserScript==
// @name           Ikariam_Fix_Patch_1.4
// @namespace      ikariamScript
// @description    Add the confirmbox to many pages : Donate page, Recruit page, Workshop page. Add attack/def info in Barrack
// @include        http://*.ikariam.*/*
// @exclude        http://board.ikariam.*/*
// ==/UserScript==

function preventWarning()
{
	var warning = document.getElementById('notices');
  if (warning)
  {
  	var str=warning.innerHTML;  	
  	if (str.indexOf("Hiệp ước văn hóa") != -1)
  	if (str.indexOf("Người dân của bạn sẽ không tán thành cuộc tấn công này") != -1)
  	{  		
  		var m = document.getElementById('mainview');  		  		  		  		
  		var len=m.innerHTML.length;  		
  		var pos2=m.innerHTML.lastIndexOf("<input class=")
  		var pos3=m.innerHTML.substring(pos2,len).indexOf(">");  		  		
  		m.innerHTML=m.innerHTML.substring(0,pos2-1)+"<b><br><br><br><br><div class='warning'><p>Bạn Không nên tấn công thành phố này nếu ko. Dân số sẽ bị giảm về 40! Nếu muốn tấn công trước hết phải hủy bỏ hiệp ước văn hóa trong viện bảo tàng.</b></p></div><br><br>"+m.innerHTML.substring(pos2+pos3+1,len);			  			  		
  		//<input class="button" type="submit" value="Đánh cướp thành phố!" />
  	}
  }
}

function Debug(str)
{
}


var unitMen=[4,2,4,1,7,8,6,8,6,4,24,10];
var unitWood=[94,47,155,36,320,1125,1035,178,576,468,2043,308];
var unitSulfur=[58,16,77,0,139,603,644,115,0,0,790,209];

var unitName = [
    "Phalanx",
    "Kiếm sỹ",
    "Cung thủ",
    "Ném đá",
    "Xạ thủ"
    ,"Trực thăng"
    ,"Người máy hơi nước"
    ,"Ram"
    ,"Bác sỹ"
    ,"Đầu bếp"
    ,"Pháo thủ"
    ,"Máy bắn đá"
    ];
var unitVar = [
    "textfield_phalanx",
    "textfield_swordsman",
    "textfield_archer",
    "textfield_slinger",
    "textfield_marksman"
    ,"textfield_gyrocopter"
    ,"textfield_steamgiant"
    ,"textfield_ram"
    ,"textfield_medic"
    ,"textfield_cook"
    ,"textfield_bombardier"
    ,"textfield_catapult"
    ];
var attkdef = [
	24,40,6,10
	,18,14,4,3
	,40,40,10,10
	,7,6,2,2
	,80,64,18,14
	,112,112,25,25
	,100,140,20,30
	,14,18,3,4
	,4,28,0,0
	,6,26,0,0
	,200,165,45,35
	,36,28,9,7
];    
var unitVar1 = [
    "phalanx",
    "swordsman",
    "archer",
    "slinger",
    "marksman"
    ,"gyrocopter"
    ,"steamgiant"
    ,"ram"
    ,"medic"
    ,"cook"
    ,"bombardier"
    ,"catapult"
    ];

var shipMen=[6,10,5,5,22,12,16];
var shipWood=[56,173,72,105,456,513,493];
var shipSulfur=[21,76,29,77,282,167,0];

var shipName = [
    "Tàu Ram",
    "Tàu bắn đá",
    "Tàu Ballista",
    "Tàu phun lửa",
    "Tàu thần công"
    ,"Tàu hơi nước"
    ,"Tàu ngầm"
		];
var shipVar = [
    "textfield_ship_ram",
    "textfield_ship_catapult",
    "textfield_ship_ballista",
    "textfield_ship_flamethrower",
    "textfield_ship_steamboat"
    ,"textfield_gyrocopter"
    ,"textfield_ship_submarine"
		];
var shipVar1 = [
    "ram",
    "catapult",
    "ballista",
    "flamethrower",
    "steamboat"
    ,"motar"
    ,"submarine"
		];
		
var attkdef_ship = [
	16,16,4,4
	,60,60,12,12
	,20,28,5,7
	,40,40,10,10
	,100,90,20,18
	,160,160,35,35
	,110,155,20,30
];   


function MyInsert(s,s1,pos)
{	
	return s.substring(0,pos)+s1+s.substring(pos,s.length);
}

function AddUnitInfo()
{
	Debug("AddUnitInfo");
		
	var mainview = document.getElementById('mainview');		
  if (mainview.innerHTML.indexOf("value=\"Chiêu mộ\"")>-1)
  {
  	Debug("AddUnitInfo: Found chieu mo menu");
  	//Debug(MyInsert("Hoang Anh Tuan","Love",3));
  	for (var i=0;i<unitVar1.length;i++)
    {    	
    	var pos1= mainview.innerHTML.indexOf("<li class=\"unit "+unitVar1[i]+"\">");    	    	    	
    	var pos_e= mainview.innerHTML.indexOf("</ul>",pos1);    	
    	
    	var unitstr=mainview.innerHTML.substring(pos1,pos_e);
    	    	    	
    	var pos2= mainview.innerHTML.indexOf("<ul class=\"resources\">",pos1);
    	//Debug(unitVar1[i]+" : "+pos1+" ; "+pos2);
    	//Debug(mainview.innerHTML.substring(pos2,pos2+600));
    	var attk=attkdef[i*4];
    	var def=attkdef[i*4+1];
    	//Debug("Attack : "+attk);
    	//Debug("Def : "+def);
    	
    	//<img src="skin/layout/sword-icon2.gif" class="att-icon" title="Giáo sắt" /><img src="skin/layout/shield-icon1.gif" class="def-icon" title="Khiên thép" />
			var weapon_str="";
			var shield_str="";
			var total_attk=attk;
			var total_def=def;
			var specialstr="";
			///skin/unitdesc/unit_boom.gif
			
			//<li class="upkeep" title="Lương mỗi giờ"><span class="textLabel">Lương mỗi giờ: </span>72</li>
			//Debug("upkeep : "+unitstr.indexOf("<li class=\"upkeep\""));
			var upkeep=MyExtract2(unitstr,"<li class=\"upkeep\"","</span>","</li>");
			//Debug("Upkeep : "+upkeep);			
			
			if (unitVar1[i].indexOf("sword")>-1 || unitVar1[i].indexOf("bombar")>-1)
			{
				specialstr="+<img src=\"skin/unitdesc/unit_boom.gif\"  title=\"Đột kích (+30% tấn công)\" align=\"absmiddle\" width=18/>";
			}	
			w1=0;
			d1=0;
						
			if (unitstr.indexOf("sword-icon3")>-1) {weapon_str="+"+(attkdef[i*4+2]);w1=attkdef[i*4+2];}
			if (unitstr.indexOf("sword-icon2")>-1) {weapon_str="+"+(attkdef[i*4+2]*2);w1=attkdef[i*4+2]*2;}
			if (unitstr.indexOf("sword-icon1")>-1) {weapon_str="+"+(attkdef[i*4+2]*3);w1=attkdef[i*4+2]*3;}
			
			if (unitstr.indexOf("shield-icon3")>-1) {shield_str="+"+(attkdef[i*4+3]);d1=attkdef[i*4+3];}
			if (unitstr.indexOf("shield-icon2")>-1) {shield_str="+"+(attkdef[i*4+3]*2);d1=attkdef[i*4+3]*2;}
			if (unitstr.indexOf("shield-icon1")>-1) {shield_str="+"+(attkdef[i*4+3]*3);d1=attkdef[i*4+3]*3;}
			
			var total_astr="";
			
			if (unitVar1[i].indexOf("cook")==-1 && unitVar1[i].indexOf("medic")==-1)
			{
				ta=attk+w1;
				if (specialstr.length>0) ta=Math.round(ta+ta*30/100);
				var av=""+(ta/parseInt(upkeep));
				var tt=av.length-av.indexOf(".");			
													
				if (tt>2)
					av=av.substring(0,av.indexOf(".")+3);
					
				total_astr=" (<b>"+ta+"</b> - "+av+")";
			}
				
			//skin/unitdesc/unit_attack.gif
			
			var specialstr1="";
			if (unitVar1[i].indexOf("pha")>-1 || unitVar1[i].indexOf("steam")>-1)
			{
				specialstr1="+<img src=\"skin/unitdesc/unit_boom.gif\"  title=\"Kháng cự (+30% phòng thủ)\" align=\"absmiddle\" width=18/>";
			}	
			var total_dstr="";
			if (unitVar1[i].indexOf("cook")==-1 && unitVar1[i].indexOf("medic")==-1)
			{
				var ta=def+d1;
				if (specialstr1.length>0) ta=Math.round(ta+ta*30/100);
				var av=""+(ta/parseInt(upkeep));
				var tt=av.length-av.indexOf(".");																
				if (tt>2)
					av=av.substring(0,av.indexOf(".")+3);					
				total_dstr=" (<b>"+ta+"</b> - "+av+")";
			}
			
    	var s1="<ul class=\"resources\"> <img src=\"skin/layout/sword-icon2.gif\"  title=\"Tấn công - Tấn công/Vàng\" align=\"absmiddle\" /> "+attk+weapon_str+specialstr+total_astr+" <img src=\"skin/layout/shield-icon1.gif\"  title=\"Phòng thủ\" align=\"absmiddle\" /> "+def+shield_str+specialstr1+total_dstr+"</ul>";
    	
    	
    	if (pos1>-1)
    		mainview.innerHTML=MyInsert(mainview.innerHTML,s1,pos2);
  	}			
  }
  
  if (mainview.innerHTML.indexOf("value=\"Xây dựng!\"")>-1)	
  {
  	Debug("AddUnitInfo: Found chieu mo menu");
  	//Debug(MyInsert("Hoang Anh Tuan","Love",3));
  	for (var i=0;i<shipVar1.length;i++)
    {    	
    	var pos1= mainview.innerHTML.indexOf("<li class=\"unit ship_"+shipVar1[i]+"\">");    	    	    	
    	var pos_e= mainview.innerHTML.indexOf("</ul>",pos1);    	
    	
    	var unitstr=mainview.innerHTML.substring(pos1,pos_e);
    	    	    	
    	var pos2= mainview.innerHTML.indexOf("<ul class=\"resources\">",pos1);
    	//Debug(shipVar1[i]+" : "+pos1+" ; "+pos2);
    	//Debug(mainview.innerHTML.substring(pos2,pos2+600));
    	var attk=attkdef_ship[i*4];
    	var def=attkdef_ship[i*4+1];
    	//Debug("Attack : "+attk);
    	//Debug("Def : "+def);
    	
    	//<img src="skin/layout/sword-icon2.gif" class="att-icon" title="Giáo sắt" /><img src="skin/layout/shield-icon1.gif" class="def-icon" title="Khiên thép" />
			var weapon_str="";
			var shield_str="";
			var total_attk=attk;
			var total_def=def;
			var specialstr="";
			///skin/unitdesc/unit_boom.gif
			
			//<li class="upkeep" title="Lương mỗi giờ"><span class="textLabel">Lương mỗi giờ: </span>72</li>
			//Debug("upkeep : "+unitstr.indexOf("<li class=\"upkeep\""));
			var upkeep=MyExtract2(unitstr,"<li class=\"upkeep\"","</span>","</li>");
			//Debug("Upkeep : "+upkeep);			
			
			if (shipVar1[i].indexOf("flame")>-1 || shipVar1[i].indexOf("steam")>-1)
			{
				specialstr="+<img src=\"skin/unitdesc/unit_boom.gif\"  title=\"Đột kích (+30% tấn công)\" align=\"absmiddle\" width=18/>";
			}	
			w1=0;
			d1=0;
						
			if (unitstr.indexOf("sword-icon3")>-1) {weapon_str="+"+(attkdef_ship[i*4+2]);w1=attkdef_ship[i*4+2];}
			if (unitstr.indexOf("sword-icon2")>-1) {weapon_str="+"+(attkdef_ship[i*4+2]*2);w1=attkdef_ship[i*4+2]*2;}
			if (unitstr.indexOf("sword-icon1")>-1) {weapon_str="+"+(attkdef_ship[i*4+2]*3);w1=attkdef_ship[i*4+2]*3;}
			
			if (unitstr.indexOf("shield-icon3")>-1) {shield_str="+"+(attkdef_ship[i*4+3]);d1=attkdef_ship[i*4+3];}
			if (unitstr.indexOf("shield-icon2")>-1) {shield_str="+"+(attkdef_ship[i*4+3]*2);d1=attkdef_ship[i*4+3]*2;}
			if (unitstr.indexOf("shield-icon1")>-1) {shield_str="+"+(attkdef_ship[i*4+3]*3);d1=attkdef_ship[i*4+3]*3;}
			
			var total_astr="";
			
			//if (specialstr.length>0 || w1>0)
			{
				var ta=attk+w1;
				if (specialstr.length>0) ta=Math.round(ta+ta*30/100);
				var av=""+(ta/parseInt(upkeep));
				var tt=av.length-av.indexOf(".");			
													
				if (tt>2)
					av=av.substring(0,av.indexOf(".")+3);
					
				total_astr=" (<b>"+ta+"</b> - "+av+")";
			}
				
			var specialstr1="";
			if (shipVar1[i].indexOf("subma")>-1 || shipVar1[i].indexOf("bal")>-1)
			{
				specialstr1="+<img src=\"skin/unitdesc/unit_boom.gif\"  title=\"Kháng cự (+30% phòng thủ)\" align=\"absmiddle\" width=18/>";
			}	
			var total_dstr="";
			{
				var ta=def+d1;
				if (specialstr1.length>0) ta=Math.round(ta+ta*30/100);
				var av=""+(ta/parseInt(upkeep));
				var tt=av.length-av.indexOf(".");																
				if (tt>2)
					av=av.substring(0,av.indexOf(".")+3);					
				total_dstr=" (<b>"+ta+"</b> - "+av+")";
			}
			
			//skin/unitdesc/unit_attack.gif
			
    	var s1="<ul class=\"resources\"> <img src=\"skin/layout/sword-icon2.gif\"  title=\"Tấn công - Tấn công/Vàng\" align=\"absmiddle\" /> "+attk+weapon_str+specialstr+total_astr+" <img src=\"skin/layout/shield-icon1.gif\"  title=\"Phòng thủ - Phòng thủ/Vàng\" align=\"absmiddle\" /> "+def+shield_str+specialstr1+total_dstr+"</ul>";
    	
    	
    	if (pos1>-1)
    		mainview.innerHTML=MyInsert(mainview.innerHTML,s1,pos2);
  	}			
  }  
  
}



function Workshop_Confirm()
{
	
	//<td class="object" title="Người ném đá"><img src="skin/characters/military/x60_y60/y60_slinger_faceright.gif" />
	//<td class="upgrade">Đá sắt<br />
  //                              	<span class="effect">Tấn công +2</span><br />
  //<a class="button" href="?action=CityScreen&function=buyUpgrade&actionRequest=4855f498154b47935513da6df89f0fa0&id=58563&position=6&militaryTypeId=222&unitTypeId=301&upgradeTypeId=1051">Cải tiến!</a>	
	//<a href="#" class="button inactive" title="Thiếu hụt tài nguyên">N/A</a>
	
	Debug("Start worshop_confirm()");
	var mainview = document.getElementById('mainview');	
	if (mainview.innerHTML.indexOf("skin/workshop/")>-1)
  {
  	Debug("AddUnitInfo: Found Xuong xay dung");
  	
  	//mainview.innerHTML=MyReplace(mainview.innerHTML,"action=CityScreen","");
  	//mainview.innerHTML=MyReplace(mainview.innerHTML,"actionRequest=","");
  	
  	var pos1=-1;
  	for (var i=0;i<100;i++)
  	{
  		pos1=mainview.innerHTML.indexOf("function=buyUpgrade",pos1+1);
  		
  		if (pos1>-1)
  		{
  			//Debug(i+" : "+mainview.innerHTML.substring(pos1-60,pos1+60));  		
  			//var s1=mainview.innerHTML.substring(pos1-300,pos1);  			  			
  			
  			Debug(i+" : pos1 = "+pos1);
  			var pos2=mainview.innerHTML.lastIndexOf("object",pos1);
  			//Debug("pos2 = "+pos2);
  			//Debug("s : "+mainview.innerHTML.substring(pos2,pos2+60));
  			var s1=mainview.innerHTML.substring(pos2,pos1);
  			var s2=mainview.innerHTML.substring(mainview.innerHTML.lastIndexOf("resources",pos1),pos1);
  			
  			var effect=MyExtract1(s1,"<span class=\"effect\">","</span>");
  			var upgrade=MyExtract1(s1,"<td class=\"upgrade\">","<br");
  			var unit=MyExtract1(s1,"title=\"","\"><img");
  			var gold=MyExtract1(s1,"<li class=\"gold\" title=\"","\"><span");
  			var crystal=MyExtract1(s1,"<li class=\"glass\" title=\"","\"><span");
  			Debug("Effect : "+effect);
  			Debug("upgrade : "+upgrade);
  			Debug("unit : "+unit);
  			//Debug("gold : "+gold);
  			//Debug("crystal : "+crystal);
  			
  			var msg="Bạn có muốn nâng cấp ?";
  			msg+="\\r\\n-------------"+unit+"-------------";
  			msg+="\\r\\nNghiên cứu : "+upgrade;
  			msg+="\\r\\nHiệu quả : "+effect;
  			msg+="\\r\\n"+gold;
  			msg+="\\r\\n"+crystal;  			
  			msg=MyReplace(msg,"Kosten","Chi Phí");
  			
  			Debug("msg : "+msg);  			
  			
  			var pos3=mainview.innerHTML.lastIndexOf("href",pos1);
  			Debug("pos3 = "+pos3);
  			
  			//msg="Bạn có muốn nâng cấp ? \\r\\ndsfa asdf";
  			//msg+="\r\nNghiên cứu : "+upgrade;
  			//msg+="\r\n-------------"+unit+"-------------";
  			mainview.innerHTML=MyInsert(mainview.innerHTML," onClick=\" return confirm('"+msg+"');\" ",pos3);
  			
  			Debug("s : "+mainview.innerHTML.substring(pos1-20,pos1+30));
  		}
  		if (pos1<0) break;  		
  	}
  }
}


function unitsubmit(event) {
    		var target = event ? event.target : this;
    		// do anything you like here
    		//alert('Submitting form to ' + target.action+'; name : '+target.name+'; id : '+target.id);
    		// call real submit function
    		//this._submit();

    		var mainview = document.getElementById('mainview');
    		var build_str="Bạn có muốn chiêu mộ?";
    		var total=0;
    		var total_sulfur=0;
    		var total_wood=0;
    		var total_men=0;
    		for (var i=0;i<unitVar.length;i++)
    		{
    			if (mainview.innerHTML.indexOf(unitVar[i])>-1)
    			{
    				var val=0;
    				val=parseInt(document.getElementById(unitVar[i]).value);
    				//Debug(unitVar[i]+" : "+unitName[i]+" : "+val);
    				if (val>0){
    					build_str+="\r\n"+unitName[i]+" : "+val;
    					total_men+=unitMen[i]*val;
    					total_sulfur+=unitSulfur[i]*val;
    					total_wood+=unitWood[i]*val;
    				}
    				total=total+val;
    			}
    		}

    		build_str+="\r\n****************************************";
    		build_str+="\r\nTốn số tài nguyên : "+total_wood+" gỗ, "+total_sulfur+" lưu huỳnh, "+ total_men+" dân!";

    		//Debug("Total : "+total);

    		if (total==0)
    		{
    			alert('Hãy chọn 1 số quân để chiêu mộ!');
    			event.stopPropagation();
    			event.preventDefault();
    		}else
    		if (confirm(build_str))
    		{
    			this._submit();
    		}else
    		{
    			event.stopPropagation();
    			event.preventDefault();
    		}
			}

			function shipsubmit(event) {
    		var target = event ? event.target : this;
    		// do anything you like here
    		//alert('Submitting form to ' + target.action+'; name : '+target.name+'; id : '+target.id);
    		// call real submit function
    		//this._submit();

    		var mainview = document.getElementById('mainview');
    		var build_str="Bạn có muốn xây dựng?";
    		var total=0;
    		var total_sulfur=0;
    		var total_wood=0;
    		var total_men=0;
    		for (var i=0;i<shipVar.length;i++)
    		{
    			if (mainview.innerHTML.indexOf(shipVar[i])>-1)
    			{
    				var val=0;
    				val=parseInt(document.getElementById(shipVar[i]).value);
    				//Debug(shipVar[i]+" : "+shipName[i]+" : "+val);
    				if (val>0){
    					build_str+="\r\n"+shipName[i]+" : "+val;
    					total_men+=shipMen[i]*val;
    					total_sulfur+=shipSulfur[i]*val;
    					total_wood+=shipWood[i]*val;
    				}
    				total=total+val;
    			}
    		}

    		build_str+="\r\n****************************************";
    		build_str+="\r\nTốn số tài nguyên : "+total_wood+" gỗ, "+total_sulfur+" lưu huỳnh, "+ total_men+" dân!";

    		//Debug("Total : "+total);

    		if (total==0)
    		{
    			alert('Hãy chọn 1 số tàu để xây dựng!');
    			event.stopPropagation();
    			event.preventDefault();
    		}else
    		if (confirm(build_str))
    		{
    			this._submit();
    		}else
    		{
    			event.stopPropagation();
    			event.preventDefault();
    		}
			}

function NewBuildConfirm()
{
		var mainview = document.getElementById('mainview');
  	if (mainview.innerHTML.indexOf("value=\"Chiêu mộ\"")>-1)
  	{
  		Debug("Found chieu mo menu");


  		window.addEventListener('submit', unitsubmit, true);
			HTMLFormElement.prototype._submit = HTMLFormElement.prototype.submit;
			HTMLFormElement.prototype.submit = newsubmit;

  		//mainview.innerHTML=MyReplace(mainview.innerHTML,"<input class=\"button\" value=\"Chiêu mộ\"","<input class=\"button\" value=\"Chiêu mộ1\" onClick=\" alert('asdfasdf')  \"");
  		Debug("***************End debug***************");
  	}else
  	if (mainview.innerHTML.indexOf("value=\"Xây dựng!\"")>-1)
  	{
  		Debug("Found xay dung menu");


  		window.addEventListener('submit', shipsubmit, true);
  		HTMLFormElement.prototype._submit = HTMLFormElement.prototype.submit;
			HTMLFormElement.prototype.submit = newsubmit;
			
  	}
}

//get the string between 2 string.
function MyExtract1(s,s1,s2)
{
	var pos1=s.indexOf(s1);
	var pos2=s.indexOf(s2,pos1);
//	Debug("pos1 : "+pos1);
//	Debug("pos2 : "+pos2);
	if (pos1>-1 && pos2>-1)
	{
		return s.substring(pos1+s1.length,pos2);
	}
	return "";
}

function MyExtract2(s,s1,s2,s3)
{
	var pos1=s.indexOf(s1);
	var pos2=s.indexOf(s2,pos1);
	var pos3=s.indexOf(s3,pos2);
//	Debug("pos1 : "+pos1);
//	Debug("pos2 : "+pos2);
	if (pos1>-1 && pos2>-1 && pos3>-1)
	{
		return s.substring(pos2+s2.length,pos3);
	}
	return "";
}


function UpgradeConfirm()
{
	Debug("Update confirm");
	var mainview = document.getElementById('buildingUpgrade');
	if (!mainview) Debug("Not found update building");
	if (mainview)
	{
		Debug("Found building upgrade");
		var bread=document.getElementById('breadcrumbs');
		if (bread)
		{
			var building_name=MyExtract1(bread.innerHTML,"<span class=\"building\">","</span>");
			
			//<li class="wood" title="Vật liệu xây dựng"><span class="textLabel">Vật liệu xây dựng: </span>842</li>
			//<li class="time" title="Thời gian xây dựng"><span class="textLabel">Thời gian xây dựng: </span>5h</li>
			//<div class="buildingLevel"><span class="textLabel">Cấp độ </span>13</div>
			var building_level=parseInt(MyExtract2(mainview.innerHTML,"<div class=\"buildingLevel\"><span class=\"textLabel\">","</span>","</div>"))+1;
			
			var building_time=MyExtract2(mainview.innerHTML,"<li class=\"time\" title=","</span>","</li>");
			var pos2=building_time.indexOf("h");
			if (pos2>-1)
			{
				Debug("Hour : "+building_time.substring(0,pos2));
				var hour=parseInt(building_time.substring(0,pos2));
				if (hour>3)
				{
					var pos1=mainview.innerHTML.indexOf("href=\"?action=CityScreen");
			//Debug(mainview.innerHTML.substring(pos1,pos1+80));
					var onclick_str="onclick=\" return confirm('Bạn có muốn nâng cấp công trình *"+building_name+"* lên cấp "+building_level+"?')\"";
			
					mainview.innerHTML=MyReplace(mainview.innerHTML,"href=\"?action=CityScreen",onclick_str+" href=\"?action=CityScreen");
				}
			}
			/*var building_wood=MyExtract2(mainview.innerHTML,"<li class=\"wood\" title=","</span>","</li>");
			var building_stone=MyExtract2(mainview.innerHTML,"<li class=\"marble","</span>","</li>");
			var building_crystal=MyExtract2(mainview.innerHTML,"<li class=\"glass","</span>","</li>");
			var building_wine=MyExtract2(mainview.innerHTML,"<li class=\"wine","</span>","</li>");
			
			Debug("Building : ["+building_name+"]");
			Debug("building_level : ["+building_level+"]");
			Debug("building_time : ["+building_time+"]");
			Debug("Resource : ");
			Debug("building_wood : ["+building_wood+"]");
			Debug("building_stone : ["+building_stone+"]");
			Debug("building_wine : ["+building_wine+"]");
			Debug("building_crystal : ["+building_crystal+"]");*/
			
			//<a href="?action=CityScreen&function=upgradeBuilding&id=22237&position=9&level=13&actionRequest=4c7958ae576e324677837d348a133102" title="Nâng cấp công trình"><span class="textLabel">Nâng cấp</span></a>			
			Debug("pos1 : "+pos1);
		}
		//<div id="breadcrumbs"><h3>Bạn đang ở đây:</h3><a href="?view=worldmap_iso&amp;islandX=74&amp;islandY=50" title="Trở về Bản đồ thế giới"><img src="skin/layout/icon-world.gif" alt="Thế giới" /></a><span>&nbsp;&gt;&nbsp;</span><a href="?view=island&amp;id=1117" title="Trở về hòn đảo"><img src="skin/layout/icon-island.gif" alt="Nyuios" /> [74:50]</a><span>&nbsp;&gt;&nbsp;</span><a href="?view=city&amp;id=22237" class="city" title="Trở về thành phố">Vinh City</a><span>&nbsp;&gt;&nbsp;</span><span class="building">Trại lính</span></div><!---------------------------------------------------------------------------------------
	}
}

function BuildConfirm()
{
		var mainview = document.getElementById('mainview');
  	if (mainview.innerHTML.indexOf("value=\"Chiêu mộ\"")>-1)
  	{
  		Debug("Found chieu mo menu");
  		//mainview.innerHTML=FirstReplace(mainview.innerHTML,"</div>","</div><script type=\"text/javascript\"> function ArmyDetail(){var str=\"Phanlanx : 10\"; return str; }</script>");  		  		
  		//marksman,ram,catapult,steamgiant,gyrocopter,bombardier,medic,cook
  		
  		var str_return="value=\"Chiêu mộ\" onClick=\"return confirm('Bạn thực sự muốn chiêu mộ số quân này?' ";
  		if (mainview.innerHTML.indexOf("textfield_phalanx")>-1)
  			str_return+="+'\\r\\nPhanlanx : '+document.getElementById('textfield_phalanx').value";
  		if (mainview.innerHTML.indexOf("textfield_swordsman")>-1)
  			str_return+="+'\\r\\nKiếm sỹ : '+document.getElementById('textfield_swordsman').value";
  		if (mainview.innerHTML.indexOf("textfield_archer")>-1)
  			str_return+="+'\\r\\nCung thủ : '+document.getElementById('textfield_archer').value";
  		if (mainview.innerHTML.indexOf("textfield_slinger")>-1)
  			str_return+="+'\\r\\nNém đá : '+document.getElementById('textfield_slinger').value";
  		if (mainview.innerHTML.indexOf("textfield_marksman")>-1)
  			str_return+="+'\\r\\nXạ thủ : '+document.getElementById('textfield_marksman').value";
  		if (mainview.innerHTML.indexOf("textfield_gyrocopter")>-1)
  			str_return+="+'\\r\\nMáy Bay : '+document.getElementById('textfield_gyrocopter').value";
  		if (mainview.innerHTML.indexOf("textfield_steamgiant")>-1)
  			str_return+="+'\\r\\nKhổng Lồ : '+document.getElementById('textfield_steamgiant').value";
  		if (mainview.innerHTML.indexOf("textfield_ram")>-1)
  			str_return+="+'\\r\\nRam : '+document.getElementById('textfield_ram').value";
  		if (mainview.innerHTML.indexOf("textfield_medic")>-1)
  			str_return+="+'\\r\\nBác sỹ : '+document.getElementById('textfield_medic').value";
  		if (mainview.innerHTML.indexOf("textfield_cook")>-1)
  			str_return+="+'\\r\\nĐầu bếp : '+document.getElementById('textfield_cook').value";
  		if (mainview.innerHTML.indexOf("textfield_bombardier")>-1)
  			str_return+="+'\\r\\nPháo thủ : '+document.getElementById('textfield_bombardier').value";
  		if (mainview.innerHTML.indexOf("textfield_catapult")>-1)
  			str_return+="+'\\r\\nMáy bắn đá : '+document.getElementById('textfield_catapult').value";
  		str_return+=")\"";
  		
  		mainview.innerHTML=MyReplace(mainview.innerHTML,"value=\"Chiêu mộ\"",str_return);  		
  	}
  	Debug("Test other");
  	//Debug("Check xay dung : "+mainview.innerHTML);
  	//<input class="button" type=submit value="Xây dựng!">
  	//ship_ram,mortar,steamboat,submarine
  	if (mainview.innerHTML.indexOf("value=\"Xây dựng!\"")>-1)
  	{  		
  		Debug("Found xay dung menu");
  		var str_return="value=\"Xây dựng!\" onClick=\"return confirm('Bạn thực sự muốn chiêu mộ số quân này?' ";
  		if (mainview.innerHTML.indexOf("textfield_ship_ram")>-1)
  			str_return+="+'\\r\\nTàu Ram : '+document.getElementById('textfield_ship_ram').value";
  		if (mainview.innerHTML.indexOf("textfield_ship_catapult")>-1)
  			str_return+="+'\\r\\nTàu bắn đá : '+document.getElementById('textfield_ship_catapult').value";
  		if (mainview.innerHTML.indexOf("textfield_ship_ballista")>-1)
  			str_return+="+'\\r\\nTàu Ballista : '+document.getElementById('textfield_ship_ballista').value";
  		if (mainview.innerHTML.indexOf("textfield_ship_flamethrower")>-1)
  			str_return+="+'\\r\\nTàu phun lửa : '+document.getElementById('textfield_ship_flamethrower').value";
  		if (mainview.innerHTML.indexOf("textfield_ship_mortar")>-1)
  			str_return+="+'\\r\\nTàu thần công : '+document.getElementById('textfield_ship_mortar').value";
  		if (mainview.innerHTML.indexOf("textfield_ship_steamboat")>-1)
  			str_return+="+'\\r\\nTàu hơi nước : '+document.getElementById('textfield_ship_steamboat').value";
  		if (mainview.innerHTML.indexOf("textfield_ship_submarine")>-1)
  			str_return+="+'\\r\\nTàu ngầm : '+document.getElementById('textfield_ship_submarine').value";
  		str_return+=")\"";
  		mainview.innerHTML=MyReplace(mainview.innerHTML,"value=\"Xây dựng!\"",str_return);
  		  		  		
  	}
  	//document.write(mainview.innerHTML);
}

function DonateSubmit(event)
{		
				var target = event ? event.target : this;
				Debug("Form : "+target.id);
				
				if (target.id!="donateForm")
					return;
					
				var donate_str="Bạn có muốn đóng góp "+document.getElementById("donateWood").value+" gỗ!";
				if (confirm(donate_str))
    		{
    			this._submit();
    		}else
    		{
    			event.stopPropagation();
    			event.preventDefault();
    		}
}

function DonateConfirm()
{
	//<form id="donateForm" action="index.php"  method="POST">
	//<input id="donateWood" name="donation" type="text" autocomplete="off" class="textfield" />
	Debug("Donate Confirm te te");
	var mainview = document.getElementById('resUpgrade');	
	
	if (mainview)
  if (mainview.innerHTML.indexOf("donateForm")>-1)
  {
  	Debug("Found donate site");
  	window.addEventListener('submit', DonateSubmit, true);
  }
}

function ArmyDetail()
{
	var str="Phanlanx : 10";
	return str;
}

function FirstReplace(str,sub_str,new_str)
{		
	str=str.replace(sub_str,new_str);		
	return str;
}
function MyReplace(str,sub_str,new_str)
{	
	/*while (str.indexOf(sub_str)>-1)
	{		
		str=str.replace(sub_str,new_str);
	}*/
	return str.split(sub_str).join(new_str);
}

UpgradeConfirm();
preventWarning();
NewBuildConfirm();
AddUnitInfo();
Workshop_Confirm();
DonateConfirm();