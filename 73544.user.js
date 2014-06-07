// ==UserScript==
// @name           Travian login + Multi Language 
// @author         Koponya
// @Development      Dream1
// @description    A travianban egyszeru felhasznalovaltas.
// @version        2.0.3
// @include        http://*.travian.*/*
// @exclude        http://forum.travian.*/*
// @exclude        http://help.travian.*/*
// @exclude        http://ads.travian.*/*



var version = 0.1;
var menu;
var comString;
var userStop;
var Host = window.location.hostname;
//var serverLang = window.location.toString().split("/")[2].split(".")[2].trim(); 
//var serverType = window.location.toString().split("/")[2].split(".")[0].trim();
var server = Host;
if(!GM_getValue(server+"num", false))
        GM_setValue(server+"num","0");

mlang="com";
checkLang();

switch (mlang) {
        case "com":default:
                titlestring = ["Users:", "New User","Delete all","Enter your user name","Enter the password"," has been successfully recorded!","All user entered will be lost! \n Continue?","Another process is taking place","About"];
                break;
        case "ae":
        case "sa":
        case "sy":
        case "eg":
                titlestring = ["العضويات:", "عضوية جديدة","حذف الكل","أدخل اسم المستخدم الخاص بك","أدخل كلمة المرور"," تم أضافته بنجاح!","جميع العضويات التي تم اضافتها سيتم حذفها!\nأستمرار?","تجري عمليات أخرى","حول"];
                break;
                
}

function run()
{
        setTimeout(run,200);
        if(comString.innerHTML == "new user")
        {
                comString.innerHTML = "semmi";
                var userName = "";
                var userPass = "";
                if(userName = prompt(titlestring[3],''))
                {
                        if( userPass = prompt(titlestring[4],''))
                        {
                                GM_setValue(server+GM_getValue(server+"num")+"name",userName)
                                GM_setValue(server+GM_getValue(server+"num")+"pass",userPass)
                                GM_setValue(server+"num", (GM_getValue(server+"num","0")*1 + 1).toString());
                                alert(userName + titlestring[5]);
                                window.location = window.location.toString();
                        }
                }
        }
        else if(comString.innerHTML == "clear user")
        {
                comString.innerHTML = "semmi";
                if(confirm(titlestring[6]))
                {         
                        GM_setValue(server+"num","0");
                        window.location = window.location.toString();
                }
        }
        else if(comString.innerHTML.substring(0,5) == "login")
        {
                var loginId = comString.innerHTML.substr(6);
                comString.innerHTML = "semmi";
                userStop.style.height = "100%";
                GM_setValue(server+"run","run "+loginId);
                window.location = "http://"+Host+"/login.php";
        }
        else if(comString.innerHTML == "About")
        {
                comString.innerHTML = "semmi";
                alert("Travian Login\nversion 2.0.1\nWeb Site: http://userscripts.org/users/64559\nCoder: Koponya \nDeveloper: Dream1\nتطوير : منصور العتيبي\nCopyright © 2010-2011");
                } 
}

function createMenu()
{
	GM_addStyle('#maaa { background-color:rgba(255,255,255,0.9);border-radius:5px;padding:5px;margin:4px auto;width:160px;box-shadow:0 0 2px #222; }'+
	'#maaa h1 {font-size:12px;color:#333;text-align:left;}'+
	'#maaa li {list-style:none;padding-left:5px;} #maaa li a {color:#555;}');

        if(!menu)
        {
                userMenu = document.createElement('div');
				userMenu.id = 'maaa';
                document.getElementById('side_info').appendChild(userMenu);
        }
        userMenu.innerHTML = "<h1><b>"+titlestring[0]+"</b></h1>";
        for(var i=0; i<GM_getValue(server+"num","0"); i++)
        {
                var js = "";
                js += "var comString = document.getElementById('comString');\n";
                js += "if(comString.innerHTML == 'semmi')\n";
                js += "comString.innerHTML = 'login " + i + "';\n";
                js += "else\n";
                js += "alert(titlestring[7]);\n";
                userMenu.innerHTML += "<li><a href=\"javascript: void(0);\" onclick=\"" + js + "\">" + GM_getValue(server+i+"name","") + "</a></li>";
        }
        js = "";
        js += "var comString = document.getElementById('comString'); ";
        js += "if(comString.innerHTML == 'semmi') ";
        js += "comString.innerHTML = 'new user'; ";
        js += "else ";
        js += "alert(titlestring[7]);";
        userMenu.innerHTML += "<li><a href=\"javascript: void(0);\" onclick=\"" + js + "\">"+titlestring[1]+"</a></li>";
        if(GM_getValue(server+"num","0") != "0")
        {
                js = "";
                js += "var comString = document.getElementById('comString'); ";
                js += "if(comString.innerHTML == 'semmi') ";
                js += "comString.innerHTML = 'clear user'; ";
                js += "else ";
                js += "alert(titlestring[7]);";
                userMenu.innerHTML += "<li><a href=\"javascript: void(0);\" onclick=\"" + js + "\">"+titlestring[2]+"</a></li>";
                }

                js = ""; 
                js += "var comString = document.getElementById('comString'); ";
                js += "if(comString.innerHTML == 'semmi') ";
                js += "comString.innerHTML = 'About'; ";
                js += "else ";
                js += "alert(titlestring[7]);";
                userMenu.innerHTML += "<li><a href=\"javascript: void(0);\" onclick=\"" + js + "\">"+titlestring[8]+"</a></li></ul></div>";  
			
}

function createComString()
{
        comString = document.createElement("div");
        document.getElementsByTagName("body")[0].appendChild(comString);
        comString.setAttribute("id","comString");
        comString.style.color = "white";
        comString.innerHTML = "semmi";
}

function createUserStop()
{
        userStop = document.createElement('div');
        document.getElementsByTagName('body')[0].appendChild(userStop);
        userStop.setAttribute("id","userStop");
        userStop.style.background = "black";
        userStop.style.position = "fixed";
        userStop.style.top = "0px";
        userStop.style.left = "0px";
        userStop.style.width = "100%";
        if(GM_getValue(server+"run","semmi").split(" ")[0] == "run") userStop.style.height = "100%";
        else userStop.style.height = "0%";
        userStop.style.zIndex = "9999"
        userStop.style.opacity = "0.5";
}

function loginNow(Id)
{
        var lgform = document.getElementById("login_form");
        lgform.getElementsByTagName("input")[0].value = GM_getValue(server+Id+"name","");
        lgform.getElementsByTagName("input")[1].value = GM_getValue(server+Id+"pass","");
        GM_setValue(server+"run","semmi");
        var forms = document.getElementsByTagName("form");
        for(var i=0; i<forms.length; i++)
        {       
                if(forms[i].name == "snd")
                {
                        forms[i].getElementsByTagName("button")[0].click();
                }
        }
}
function checkLang()
{
  var host = window.location.hostname;
  hosts = host.split(".");
  mlang = hosts[hosts.length-1];
}
function start()
{
        if(document.getElementById("login_form") && (GM_getValue(server+"run","semmi").substring(0,3) == "run"))
        {
                createUserStop();
                loginNow(GM_getValue(server+"run","semmi").substr(4));
        }
        else if(document.getElementById('side_info'))
        {
                createMenu();
                createComString();
                createUserStop();
                run();
        }
        else
        {
                setTimeout(start,10);
        }
}
start();





// ==/UserScript==