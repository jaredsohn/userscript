// ==UserScript==
// @name			Ask.fm Auto Like by NahuelDelCAp
// @namespace                   http://userscripts.org/
// @version			2.3
// @copyright		        http://ask.fm/NahuelitDelCap
// @description		        Auto Like Ask.fm
// @author			(http://userscripts.org)
// @include			http://ask.fm/nahuelitdelcap*
// @icon			http://s3.amazonaws.com/uso_ss/icon/138450/large.gif?1342345458
// Like Automatico Para Ask.FM
// Version numero 2
// COM A ATUALIZAÇÃO PRA 2.3 QUALQUER ALTERAÇÃO NO CÓDITO SCRIPT PARA DE FUNCIONAR NO SEU IP! 
// MANUNTEÇÃO CONCLUIDA COM SUCESSO ALEF RUAN
// ==/UserScript==
// ==Profile==
body = document.body;
if(body != null) {
    div = document.createElement("div");
    div.setAttribute('id','like1');
    div.style.position = "fixed";
    div.style.display = "block";
    div.style.width = "125px"; 
    div.style.opacity= 1.00;
    div.style.bottom = "+87px";
    div.style.left = "+6px";
    div.style.backgroundColor = "#000000";
    div.style.border = "1px solid #555";
    div.style.padding = "2px";
    div.innerHTML = "<div style='background-color: #ff0000; color: #FFFFFF; border: 1px solid #fff000;'><center><a style='color: #fff000;' <a href='http://www.twitter.com/NAHUELIT123' target='_blank' title=''>Meu Twitter</a></div>"
    div2 = document.createElement("div");
    div2.setAttribute('id','spoiler');
    div2.style.position = "fixed";
    div2.style.width = "125px";
    div2.style.opacity= 0.90;
    div2.style.bottom = "+65px";
    div2.style.left = "+6px";
    div2.style.backgroundColor = "#000000";
    div2.style.border = "1px solid #555";
    div2.style.padding = "2px";
    div2.innerHTML = "<div style='background-color: #ff0000; color: #FFF000; border: 1px solid #fff000;'><a style='color: #FFF000;' onclick='spoiler()' title='Click Para Ocultar'>&laquo;</a> &#8226; <a href='http://ask.fm/Nahuelitdelcap' title='Preguntame :)' style='color: #FFF000;' onclick='alert(\'Thanks for install this script\');'>Ask Nahuu</a></div> "
    
    body.appendChild(div);
    body.appendChild(div2);
    
    unsafeWindow.spoiler = function() {
        var i;
        for(i=1;i<=20;i++) {
            var x=document.getElementById('like'+i);
            if (x.style.display=="none") {
                x.style.display="block";
                div2.innerHTML = "<a onclick='spoiler()' title='Mostrar :) Mi Ask Nahuelitdelcap'>&laquo;</a> &#8226; <a href='http://ask.fm/NahuelitDelCap' title=''>Preguntame!</a>"
            }
            else {
                x.style.display="none";
                div2.innerHTML = "<a onclick='spoiler()' title='Click Para Mostrar'> Mostrar Auto Like &raquo;</a>"
            }
        }
    };
}

// ==============
// ==Like All==
body = document.body;
if(body != null) {
    div = document.createElement("div");
    div.setAttribute('id','like2');
    div.style.position = "fixed";
    div.style.display = "block";
    div.style.width = "125px"; 
    div.style.opacity= 0.90;
    div.style.bottom = "+42px";
    div.style.left = "+6px";
    div.style.backgroundColor = "#eceff5";
    div.style.border = "1px solid #94a3c4";
    div.style.padding = "2px";
    div.innerHTML = "<img src='https://lh4.googleusercontent.com/-D1HYuLwPnNQ/TxPK6cm_THI/AAAAAAAAAIE/ynATGaxGbv0/s16/Facebook%252520Like%252520Small.jpg' width='16' height='14' align='absmiddle' />&nbsp;&nbsp;<a onclick='OtomatisLike()'>ganhar curtidas</a>"
    
    body.appendChild(div);
    
    unsafeWindow.OtomatisLike = function() {
        document.getElementsByClassName("submit-button-more")[0].click();
        document.getElementsByClassName("like hintable")[0].click();
        document.getElementsByClassName("like hintable")[0].click();
        document.getElementsByClassName("like hintable")[0].click();
        document.getElementsByClassName("like hintable")[0].click();
        document.getElementsByClassName("like hintable")[0].click();
        document.getElementsByClassName("like hintable")[0].click();
        document.getElementsByClassName("like hintable")[0].click();
        document.getElementsByClassName("like hintable")[0].click();
        document.getElementsByClassName("like hintable")[0].click();
        document.getElementsByClassName("like hintable")[0].click();
        document.getElementsByClassName("like hintable")[0].click();
        document.getElementsByClassName("like hintable")[0].click();
        document.getElementsByClassName("like hintable")[0].click();
        document.getElementsByClassName("like hintable")[0].click();
        document.getElementsByClassName("like hintable")[0].click();
        document.getElementsByClassName("like hintable")[0].click();
        document.getElementsByClassName("like hintable")[0].click();
        document.getElementsByClassName("like hintable")[0].click();
        document.getElementsByClassName("like hintable")[0].click();
        document.getElementsByClassName("like hintable")[0].click();
        document.getElementsByClassName("like hintable")[0].click();
        document.getElementsByClassName("like hintable")[0].click();
        document.getElementsByClassName("like hintable")[0].click();
        document.getElementsByClassName("like hintable")[0].click();
        document.getElementsByClassName("like hintable")[0].click();				
        document.getElementsByClassName("like hintable")[0].click();
        document.getElementsByClassName("like hintable")[0].click();
        document.getElementsByClassName("like hintable")[0].click();
        document.getElementsByClassName("like hintable")[0].click();
        document.getElementsByClassName("like hintable")[0].click();
        document.getElementsByClassName("like hintable")[0].click();
        document.getElementsByClassName("like hintable")[0].click();
        document.getElementsByClassName("like hintable")[0].click();
        document.getElementsByClassName("like hintable")[0].click();
        document.getElementsByClassName("like hintable")[0].click();
        document.getElementsByClassName("like hintable")[0].click();
        document.getElementsByClassName("like hintable")[0].click();
        document.getElementsByClassName("like hintable")[0].click();
        document.getElementsByClassName("like hintable")[0].click();
        document.getElementsByClassName("like hintable")[0].click();
        document.getElementsByClassName("like hintable")[0].click();
        document.getElementsByClassName("like hintable")[0].click();
        document.getElementsByClassName("like hintable")[0].click();
        document.getElementsByClassName("like hintable")[0].click();
        document.getElementsByClassName("like hintable")[0].click();
        document.getElementsByClassName("like hintable")[0].click();
        
        buttons = document.getElementsByTagName("button");
        for(i = 0; i < buttons.length; i++) {
            myClass = buttons[i].getAttribute("class");
            if(myClass != null && myClass.indexOf("like") >= 0)
            if(buttons[i].getAttribute("name") == "likern false;")
                buttons[i].click();
        }
        
    };
}
