// ==UserScript==
// @name       Dechiro TVB
// @namespace  http://use.i.E.your.homepage/
// @version    1.2.2
// @description  enter something useful
// @match      http://ts5.travian.asia/dorf1.php*
// @match      http://ts5.travian.asia/dorf2.php*
// @match		http://ts5.travian.asia/build.php?id=*&botup=1
// @copyright  2012+, You
// ==/UserScript==

// config สำหรับอัพแร่
var r1_lv_max = 7;  // ไม้
var r2_lv_max = 7;  // โคลน
var r3_lv_max = 7;  // เหล็ก
var r4_lv_max = 7;  // ข้าว


/// สำหรับอัพในบ้าน
var buildorder = new Array();
var buildorder_lv = new Array();

/// อัพบ้านข้าว
var upcrop_home = 0;

buildorder[buildorder.length] = "อาคารหลัก";
buildorder_lv[buildorder_lv.length] = 5;
buildorder[buildorder.length] = "ที่พักอาศัย";
buildorder_lv[buildorder_lv.length] = 10;
buildorder[buildorder.length] = "สถานศึกษา";
buildorder_lv[buildorder_lv.length] = 10;
buildorder[buildorder.length] = "โกดัง";
buildorder_lv[buildorder_lv.length] = 3;
buildorder[buildorder.length] = "ยุ้งฉาง";
buildorder_lv[buildorder_lv.length] = 3;
buildorder[buildorder.length] = "โกดัง";
buildorder_lv[buildorder_lv.length] = 5;
buildorder[buildorder.length] = "ยุ้งฉาง";
buildorder_lv[buildorder_lv.length] = 5;
buildorder[buildorder.length] = "ที่ซ่อนเสบียง";
buildorder_lv[buildorder_lv.length] = 0;
buildorder[buildorder.length] = "อาคารหลัก";
buildorder_lv[buildorder_lv.length] = 10;


var resource_01 = 0;
var resource_02 = 0;
var resource_03 = 0;
var resource_04 = 0;
var stockBarFreeCrop = 0;  // ข้าวฟรี
var stockWarehouse = 0;
var stockGranary = 0;

/// จำนวนบ่อแต่ละแบบ
var count_resource_01 = 0;  // ไม้
var count_resource_02 = 0; 	// โคลน
var count_resource_03 = 0;  // เหล็ก
var count_resource_04 = 0;  // ข้าว

var r1_lv = 99;  // lv ไม้
var r2_lv = 99; // ดิน
var r3_lv = 99; // หิน
var r4_lv = 99;  //ข้าว

var r1_link = "";
var r2_link = "";
var r3_link = "";
var r4_link = "";

function setCookie(cname,cvalue)
{
	var d = new Date();
	document.cookie = cname + "=" + cvalue + "; ";
}
function getCookie(cname)
{
var name = cname + "=";
var ca = document.cookie.split(';');
for(var i=0; i<ca.length; i++) 
  {
  var c = ca[i].trim();
  if (c.indexOf(name)==0) return c.substring(name.length,c.length);
  }
return "";
}

function getResource()
{
    var dcu = document.getElementById('stockBar');
    
    resource_01 = dcu.getElementById('l1').innerHTML.replace(",","");
    resource_02  = dcu.getElementById('l2').innerHTML.replace(",","");
    resource_03 = dcu.getElementById('l3').innerHTML.replace(",","");
    resource_04 = dcu.getElementById('l4').innerHTML.replace(",","");
    
    //alert(resource_01);
    stockWarehouse = document.getElementById('stockBarWarehouse').innerHTML.replace(",","");
    stockGranary = document.getElementById('stockBarGranary').innerHTML.replace(",","");   
    stockBarFreeCrop = document.getElementById('stockBarFreeCrop').innerHTML.replace(",","");   
    
}

function getlv(str)
{
  	var lv =   parseInt(str.match(/\d+$/)[0], 10);  
    return lv;
}

function getBuilding_dorf1()
{
    var area = document.getElementsByTagName('area');
    //alert(area.length);
    var pat1 =new RegExp("โรงตัดไม้");
    var pat2 =new RegExp("บ่อโคลน");
    var pat3 =new RegExp("เหมืองเหล็ก");
    var pat4 =new RegExp("ทุ่งธัญพืช");
    var patnone = new RegExp("อยู่ระหว่าง");
    for (i = 0; i < area.length; i++)
    {
      	  if(pat1.test(area[i].alt))  // โรงไม้
          {
               count_resource_01++;        
           	  var arealv = getlv(area[i].alt);
              if(r1_lv > arealv)
              {
					r1_lv = arealv;
					r1_link = area[i].href+"&botup=1";    
              }
              continue;
          }
      	  if(pat2.test(area[i].alt))  // บ่อโคลน
          {
              count_resource_02++;                
           	  var arealv = getlv(area[i].alt);
              if(r2_lv > arealv)
              {
					r2_lv = arealv;
					r2_link = area[i].href+"&botup=1";          
              }
              continue;
          }
      	  if(pat3.test(area[i].alt))  // เหมืองเหล็ก
          {
              count_resource_03++;                  
           	  var arealv = getlv(area[i].alt);
              if(r3_lv > arealv)
              {
					r3_lv = arealv;
					r3_link = area[i].href+"&botup=1";        
              }
              continue;
          }
      	  if(pat4.test(area[i].alt))  // ข้าว
          {
              count_resource_04++;               
           	  var arealv = getlv(area[i].alt);
              if(r4_lv > arealv)
              {
					r4_lv = arealv;
					r4_link = area[i].href+"&botup=1";           
              }
              continue;
          }
    }
}

function getBuilding_dorf2()  // คืนค่าเป็น link กลับไปเลย
{
    var imgs = document.getElementsByTagName("area");
    for(bi = 0; bi < buildorder.length; bi++)
    {
        var b2Pat = new RegExp(buildorder[bi]);
        var lv = 99;
        var b_link = "";
        
        for(i = 0; i< imgs.length; i++)
        {
              if(b2Pat.test(imgs[i].alt))
              {
                  imgs_span = imgs[i].alt.split("<span class=\"level\">");
                  imgs_span = imgs_span[1].split("</span>");
                  lv = getlv(imgs_span[0]);
                  b_link = imgs[i].href;
              }
        }
                
        if(buildorder_lv[bi] > lv)
        {
            return b_link;      
        }
    }
    return "";
}

function bot_msg(msg)
{
    
    var tb = document.getElementById('sidebarBoxVillagelist').getElementsByClassName('sidebarBoxInnerBox');
    //alert(tb.length);
    tb = tb[0];
    //alert(r1_link);
    
    tb.innerHTML += msg;   
    
}

try{
	bot_msg("<div class='innerBox content'>บอทของนู๋<div>");
}catch(err) {};
// start

/// dorf1 
var Pat = new RegExp("dorf1");
if(Pat.test(window.location))
{
    try{
        getResource();
        getBuilding_dorf1();
        
        var mymsg = "<div class='innerBox content'> ไม้ : "+ resource_01+"<br> ดิน : "+resource_02+"<br> เหล็ก : "+resource_03+"<br> ข้าว : "+ resource_04+" <br> ข้าวฟรี : "+stockBarFreeCrop+"</div>";
        bot_msg(mymsg);
        
        //goto upgrade page
        setTimeout(function() {
            var g_link = "";
            var g_res = 9000000;
            
            if(g_res+0 > parseInt(resource_01) && r1_lv < r1_lv_max)
            {
                g_res = parseInt(resource_01);
                g_link = r1_link;
            }
            if(g_res+0 > parseInt(resource_02) && r2_lv < r2_lv_max)
            {
                g_res = parseInt(resource_02);
                g_link = r2_link;
            }
            if(g_res+0 > parseInt(resource_03) && r3_lv < r3_lv_max)
            {
                g_res = parseInt(resource_03);
                g_link = r3_link;
            }
            if((g_res +0> parseInt(resource_04) && r4_lv < r4_lv_max) || parseInt(stockBarFreeCrop) < 5 || (upcrop_home == 1 && count_resource_04 == 15 ))  // ข้าวน้อย หรือข้าวฟรีหมด
            {
                g_res= parseInt(resource_04);
                g_link = r4_link;
            }
            if(upcrop_home == 0 && count_resource_04 == 15 )
            {
               g_link = "";  
            }
          	if(g_link != "")
            {
            	window.location.assign(g_link);
            }else{
                //alert("lv เต็ม");
            }
                
        },30000);
    }catch(err) {};
    // case login
    
}

var Pat2 = new RegExp("dorf2");
if(Pat2.test(window.location))
{
    try{
        setTimeout(function(){
            var b_link = getBuilding_dorf2();
            if(b_link != "")
            {
                window.location.assign(b_link+"&botup=1");
            }
        },30000);        
    }catch(err){ }
};


/// build.php
Pat = new RegExp("build.php");
Pat2 = new RegExp("botup=1");
if(Pat.test(window.location) && Pat2.test(window.location))
{
	//alert('building');   
    
    // upgrade
    setTimeout(function() {
      	var btnPat = new RegExp("อัพเกรดเป็นระดับ");  
        var btn = document.getElementsByTagName('button');
        for(i = 0; i < btn.length; i++)
        {
          	if(btnPat.test(btn[i].value))
            {
              	//alert(btn[i].onclick);  
                var str = btn[i].onclick+"";
                str = str.split('\'');
                //alert(str[1]);
                window.location.assign(str[1]);
            }
        }
        
    },10000);
    
}


	setTimeout(function() {        
		var state = getCookie("state");
		if(state == "" )
		{
			setCookie("state","1");
			window.location.assign("http://ts5.travian.asia/dorf1.php");
		}else if(state == "1"){
			setCookie("state","2");
			window.location.assign("http://ts5.travian.asia/dorf2.php");
        }else{
            var vstate = getCookie("vstate");
            var vlinks = document.getElementsByTagName("a");
            var vPat = new RegExp("newdid");
            var newdid = new Array();
            for (i=0; i<vlinks.length; i++)
            {
              if(vPat.test(vlinks[i].href))
              {
                  temps = vlinks[i].href.split("newdid=");
                  temps = temps[1].split("&");
                  newdid[newdid.length] = temps[0];
              }
            }
            try{
                if(vstate == "" || vstate >= newdid.length)
                {
                    vstate = 0;
                }
                 setCookie("state","");
                ve = vstate;
                vstate++;
                setCookie("vstate",vstate);
                window.location.assign("http://ts5.travian.asia/dorf2.php?newdid="+newdid[ve]+"&");
            }catch(err){
              	setCookie("vstate","0");  
                window.location.assign("http://ts5.travian.asia/dorf2.php");
            }
            
            setCookie("state","");
        }
    },60000);

setTimeout(function() {
    
    try{
        var PatLog = new RegExp("เข้าสู่ระบบ");
        var myform = document.getElementsByTagName("form");
        for(i = 0; i < myform.length; i++)
        {
            if(PatLog.test(myform[i].innerHTML))
            {
                setTimeout(function() {
                    myform[i].submit();
                },3000);
                break;
            }
        }
    }catch(err) {};
},3000);