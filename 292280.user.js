// ==UserScript==
// @name       My Travian Botz
// @namespace  http://use.i.E.your.homepage/
// @version    0.1.1
// @description  enter something useful
// @match      http://ts5.travian.asia/dorf1.php*
// @match      http://ts5.travian.asia/build.php?id=*&botup=1
// @match      http://ts5.travian.asia/build.php?id=*&botfarm=1
// @copyright  2012+, BlackCatz
// ==/UserScript==

var resource_01 = 0;
var resource_02 = 0;
var resource_03 = 0;
var resource_04 = 0;
var stockBarFreeCrop = 0;  // ข้าวฟรี
var stockWarehouse = 0;
var stockGranary = 0;

var r1_lv = 99;
var r2_lv = 99;
var r3_lv = 99;
var r4_lv = 99;

var r1_link = "javascript:void(0);";
var r2_link = "javascript:void(0);";
var r3_link = "javascript:void(0);";
var r4_link = "javascript:void(0);";

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
            
            var g_res = parseInt(resource_01);
            var g_link = r1_link;
            if(g_res+0 > parseInt(resource_02))
            {
                g_res = parseInt(resource_02);
                g_link = r2_link;
            }
            if(g_res+0 > parseInt(resource_03))
            {
                g_res = parseInt(resource_03);
                g_link = r3_link;
            }
            if(g_res +0> parseInt(resource_04) || parseInt(stockBarFreeCrop) < 5)  // ข้าวน้อย หรือข้าวฟรีหมด
            {
                g_res= parseInt(resource_04);
                g_link = r4_link;
            }
            //alert(g_link);
            window.location.assign(g_link);
                
        },30000);
    }catch(err) {};
    // case login
    
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
}

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


// reset bot if have error
	setTimeout(function() {
	      window.location.assign("http://ts5.travian.asia/dorf1.php");
    },120000);