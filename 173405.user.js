// ==UserScript==
// @name        Ask.fm Auto Like by greenieZ1
// @namespace   Ask.fm Auto Like 2.2 (Deutsche Version)
// @description Auto Like Deutsche Version
// @include     http://ask.fm/*
// @version     2.2
// @icon        http://s3.amazonaws.com/uso_ss/icon/138450/large.gif?1342345458
// ==/UserScript==
body = document.body;
if(body != null) {
        div = document.createElement("div");
        div.setAttribute('id','like1');
        div.style.position = "fixed";
        div.style.display = "block";
        div.style.width = "125px";
        div.style.opacity= 1.00;
        div.style.bottom = "+105px";
        div.style.left = "+6px";
        div.style.backgroundColor = "#000000";
        div.style.border = "1px solid #000000";
        div.style.padding = "0px";
        div.innerHTML = "<div style='background-color: #000000; color: #000000; border: 1px solid #000000;'><center><a style='color: #FFFFFF;' <a target='_blank'>Ask.fm Like Bot Deutsch</a></div>"
        div2 = document.createElement("div");
        div2.setAttribute('id','spoiler');
        div2.style.position = "fixed";
        div2.style.width = "125px";
        div2.style.opacity= 0.90;
        div2.style.bottom = "+70px";
        div2.style.left = "+6px";
        div2.style.backgroundColor = "#FF0F00";
        div2.style.border = "1px solid #FF0F00";
        div2.style.padding = "0px";
        div2.innerHTML = "<div style='background-color: #FF0F00; color: #FF0F00; border: 1px solid #FF0F00;'><a style='color: #FFFFFF;' onclick='spoiler()' title='Mit einem Klick verbergen'>Übersetzerprofil</a><a href='http://ask.fm/greenieZ1' title='Ask.fm Profil vom Übersetzer' style='color: #FFFFFF;' onclick='alert(\'Danke für die Installation dieses Scripts\');'>Hier klicken</a></div> "

        body.appendChild(div);
        body.appendChild(div2);

        unsafeWindow.spoiler = function() {
                var i;
        for(i=1;i<=20;i++) {
                var x=document.getElementById('like'+i);
                if (x.style.display=="none") {
                x.style.display="block";
                div2.innerHTML = "<a style='color: #FFFFFF;' onclick='spoiler()' title='Mit einem Klick'>Übersetzerprofil</a><a href='http://ask.fm/greenieZ1' title='Daniel Hrdlicka'>Hier klicken</a>"
                }
                else {
                        x.style.display="none";
                        div2.innerHTML = "<a onclick='spoiler()' title='Klick um zu sehen'>Auto Like sehen</a>"
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
        div.style.bottom = "+52px";
        div.style.left = "+6px";
        div.style.backgroundColor = "#F4E809";
        div.style.border = "1px solid #F4E809";
        div.style.padding = "0px";
        div.innerHTML = "<img src='https://lh4.googleusercontent.com/-D1HYuLwPnNQ/TxPK6cm_THI/AAAAAAAAAIE/ynATGaxGbv0/s16/Facebook%252520Like%252520Small.jpg' width='16' height='14' align='absmiddle' />&nbsp;&nbsp;<a onclick='OtomatisLike()'>Hier Klicken</a>"

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

                buttons = document.getElementsByTagName("button");
                for(i = 0; i < buttons.length; i++) {
                        myClass = buttons[i].getAttribute("class");
                        if(myClass != null && myClass.indexOf("like") >= 0)
                                if(buttons[i].getAttribute("name") == "likern false;")
                                        buttons[i].click();
                }

        };
}