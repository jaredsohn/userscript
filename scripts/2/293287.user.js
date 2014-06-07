// ==UserScript==
// @name       autoLoginSMS DTAC
// @namespace  
// @version    0.1
// @description  enter something useful
// @match      http://ts5.travian.asia/dorf1.php
// @match      http://eservice.dtac.co.th/bp3/bin/DpromptIndex
// @match      http://eservice.dtac.co.th/bp3/bin/Dspc/DpromptWelcome
// @copyright  2012+, Dechiro
// ==/UserScript==


/// หมายเลขโทรศัพท์
var telno = "00000";
// รหัสผ่าน
var telpass = "0000";

// เวลาหน่วงส่งข้อความใหม่อีกครั้ง  // เตือนทุก 15 วิ
var Delays = 15*60*1000;


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


var pat1 = new RegExp("DpromptIndex");
if(pat1.test(window.location))
{
    setTimeout(function(){
        var tmp_ = document.getElementsByName("inputUserName");
        var username = tmp_[0];
        
        tmp_ = document.getElementsByName("inputPassword");
        var password = tmp_[0];
        
        username.value = telno;
        password.value = telpass;
        
        setTimeout(function(){
            var f = document.getElementsByTagName("form");
            //alert(f.length);
            f[0].submit();
        },2000);
        
    },3000);
}

var pat2 = new RegExp("DpromptWelcome");
if(pat2.test(window.location))
{
    setTimeout(function(){
        // พอเข้าได้ อาจจะให้ปิดหน้าต่างหรืออยู่เฉยๆ
        window.close();
    },5000);
}

// ตรวจสอบเมื่อถูกโจมตี
var pat3 = new RegExp("dorf1.php");
if(pat3.test(window.location))
{
    var att = document.getElementsByClassName("att1");  /// มีทัพโจมตี อั๊ยย่ะ
    if(att.length > 0)
    {
        try{
            var OleTime = getCookie("SMSTIME");
            var d = new Date();
            var Time = d.getTime();
            if(Time - OleTime >  Delays)
            {
                setTimeout(function(){
                    window.open("http://eservice.dtac.co.th/bp3/bin/DpromptIndex","alertSMS");
                },5000);
            }
            setCookie("SMSTIME",Time);        
        }
        catch(err)
        {
            setCookie("SMSTIME","0")
        }
    }
}