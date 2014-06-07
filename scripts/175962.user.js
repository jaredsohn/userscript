// ==UserScript==
// @name       	Facebook Stealth
// @namespace  	NONE
// @version    	1.1
// @description	Facebook Stealth
// @match      	http://www.facebook.com/*
// @match      	https://www.facebook.com/*
// @run-at	document-start
// @copyright  	2013+, Marcus Ramse & Pierre BOYER
// ==/UserScript==

function Inject(nativeOpenWrapper, nativeSendWrapper){
    //<THANKS W3SCHOOL & STACKOVERFLOW>
    function setCookie(c_name,value,exdays){
        var exdate=new Date();
        exdate.setDate(exdate.getDate() + exdays);
        var c_value=escape(value) + ((exdays==null) ? "" : "; expires="+exdate.toUTCString());
        document.cookie=c_name + "=" + c_value;
    }
    function getCookie(k){return(document.cookie.match('(^|; )'+k+'=([^;]*)')||0)[2]}
    //</THANKS W3SCHOOL & STACKOVERFLOW>
    var stealthed = false;
    if(getCookie("fbstealth_stealthed")=="true"){stealthed=true;}
    
    function check(){
        var e = document.getElementById("sidebar-messenger-install-link");
        if(e!=null){
            e=e.parentNode;
            if(document.getElementById("fbstealth_active_li")==null){
                //var el = e.getElementsByTagName("ul")[0];
            
                var lis = document.createElement("li");
                lis.setAttribute("class","uiMenuSeparator");
                e.insertBefore(lis,document.getElementById("sidebar-messenger-install-link"));
                
                var li = document.createElement("li");
                li.setAttribute("class","uiMenuItem uiMenuItemCheckbox uiSelectorOption");
                li.setAttribute("data-label","Stealth");
                li.setAttribute("id","fbstealth_active_li");
                li.innerHTML='<a class="itemAnchor" role="menuitemcheckbox" tabindex="0" onclick="changeStealthed()" href="#" arie-checked="false" id="fbstealth_active_a"><span class="itemLabel fsm">Stealth</span></a>';
                e.insertBefore(li,lis);
            }else{
                if(stealthed){
                    document.getElementById("fbstealth_active_li").setAttribute("class","uiMenuItem uiMenuItemCheckbox uiSelectorOption checked");
                    setCookie("fbstealth_stealthed","true");
                }else{
                    document.getElementById("fbstealth_active_li").setAttribute("class","uiMenuItem uiMenuItemCheckbox uiSelectorOption");
                    setCookie("fbstealth_stealthed","false");
                }
            }
        	
        }
    	setTimeout(check,100);
    }
    window.onload=check;
    
    window.changeStealthed=function(){
        stealthed=!stealthed;
        document.getElementById("fbstealth_active_a").setAttribute("checked",stealthed.toString());
        if(stealthed){
            document.getElementById("fbstealth_active_li").setAttribute("class","uiMenuItem uiMenuItemCheckbox uiSelectorOption checked");
            setCookie("fbstealth_stealthed","true");
        }else{
            document.getElementById("fbstealth_active_li").setAttribute("class","uiMenuItem uiMenuItemCheckbox uiSelectorOption");
            setCookie("fbstealth_stealthed","false");
        }
    }
    
    XMLHttpRequest.prototype.open = function()
    {
        this.urlMatch = arguments[1] == "/ajax/messaging/typ.php" || arguments[1] == "/ajax/mercury/change_read_status.php";
        return nativeOpenWrapper.apply(this,arguments);
    }
    XMLHttpRequest.prototype.send = function(){
        if(!this.urlMatch||!stealthed){
            return nativeSendWrapper.apply(this,arguments);
        }
    }
}
var script = document.createElement("script");	
script.type = "text/javascript";
script.textContent = "(" + Inject + ")(XMLHttpRequest.prototype.open, XMLHttpRequest.prototype.send);";
document.documentElement.appendChild(script);