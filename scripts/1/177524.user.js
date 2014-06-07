// ==UserScript==
// @name        Laaptu Reloaded-Sac4Temp
// @namespace   Laaptu Quizr
// @description Just Login script will do all
// @include     *laaptu.*
// @include     *laaptu.com/*
// @require		https://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @version     0.1
// @grant       none
// @copyright   open to all
// @author      Sac4Temp
// ==/UserScript==
$(function(){
    var path = window.location.pathname;
    var url = window.location.href;
    var ele = document.getElementsByTagName('a');
    var h3 = document.getElementsByTagName('h3');
    var pattern = '';
        
    pattern=/^http:\/\/u.laaptu.com\/homepage/g;
    if(url.search(pattern)==0)
    {
        window.location.href=url.replace("homepage","quiz");
    }
    /************************Quiz Class Begin***********************/
    
    if(url.match("quiz")){
        divFlotShow = true;
        for (var i = 0; i < ele.length; i++){
            if(ele[i].clientHeight=="26" && ele[i].clientLeft=="0" && ele[i].clientTop=="0" && ele[i].clientWidth=="136" && ele[i].textContent=="Continue"){
                if(url.match("mathquiz"))
                	document.getElementById('menuFact').click();
                else
                	document.getElementById('menuQuiz').click();
                //====start==========================================================
                //commented this for skipping one Next Question page....
				//window.location = ele[i].href;
                //==== end ==========================================================
                    
                //ele[i].click();
            }
            if(ele[i].style.display!="none" && ele[i].clientHeight=="40" && ele[i].clientLeft=="1" && ele[i].clientTop=="1" && ele[i].clientWidth=="301"){
                ele[i].click();
                //setInterval(checkAnswer(), 100);
            }
            if(ele[i].style.display!="none" && ele[i].clientHeight=="26" && ele[i].clientLeft=="0" && ele[i].clientTop=="0" && ele[i].clientWidth=="131"){
                divFlotShow = true;
                qno=document.getElementById('hidQNO').value;
                clickSchemenew(50,true);
                setTimeout('caller()', 300);
                //ele[i].click();
            }
            if(ele[i].style.display!="none" && ele[i].clientHeight=="26" ){
                //alert('26');
                //alert(ele[i]);
                //setTimeout("'"+ ele[i] +"')", 10);
                ele[i].click();                    
            }
            if(ele[i].style.display!="none" && ele[i].clientHeight=="26" && ele[i].clientLeft=="0" && ele[i].clientTop=="0" && ele[i].clientWidth=="181"){
                window.location = ele[i].href;
                //ele[i].click();                    
            }
            /*
                if(ele[i].clientHeight=="26" && ele[i].clientLeft=="0" && ele[i].clientTop=="0" && ele[i].clientWidth=="136" && ele[i].textContent=="Continue"){
                    ele[i].click();
                }
                if(ele[i].clientWidth=="0" && ele[i].clientHeight!="40" && ele[i].innerHTML=="Fun Quiz"){
                    ele[i].click();
                }
           */
            }
        for (var i = 0; i < h3.length; i++){
            if(h3[i].innerHTML=="Today's Fun quiz is completed"){
                document.getElementById('menuFact').click();
            }
        }
    }

	if(url.match("lost")){
        window.location.href=url.replace("lost","login1");
    }

    /***********Redirect page*******************/
    /*
    if(url.match("homepage")){
        document.getElementById('menuFact').click();
    }
    */
    /******************End Redirect page****************************/
    /*********************Script End********************************/
    
});