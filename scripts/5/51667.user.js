// ==UserScript==
// @name 		LeproUserNumbers
// @author 		Din, al-dexter
// @version 		2.1
// @namespace 		http://leprosorium.ru/*
// @description   	Shows user numbers
// @include 		http://*leprosorium.ru/comments/*
// @include 		http://*leprosorium.ru/*
// @include 		http://*leprosorium.ru/users/*
// ==/UserScript==


(function(){
    
    appendUserNumbers(document.getElementsByClassName("ddi"));
    
    
    // Appends user number after username in comment
    function appendUserNumbers(ddis) {
        //Adding user number
        for (var i = 0; i < ddis.length; i++) {
            var ddi = ddis[i];
            var cUser = ddi.getElementsByClassName("c_user")[0];
            
            //User number
            var number = cUser.getAttribute("data-user_id");
            
            //Creating new node
            var numberElement = document.createElement("span");
            numberElement.innerHTML = " " + number.toString() + ", ";
            
            //Appending to the lower line of comment
            var jsDate = ddi.getElementsByClassName("js-date").item(0);
            ddi.insertBefore(numberElement, jsDate);
        }
    }
    
    // If DOM changed
    document.addEventListener("DOMNodeInserted", handleComment, false);	
    function handleComment(e) {
        if (e.target.className.indexOf("comment") > -1) {
            appendUserNumbers(e.target.getElementsByClassName('ddi'));
        }
    }  
    
})();
