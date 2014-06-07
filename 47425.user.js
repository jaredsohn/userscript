// ==UserScript==
// @name           test
// @description    x
// @include        http://nasza-klasa.pl/poczta/*
// @author         x
// ==/UserScript==

        window.onload = wraps;
         
        var a = 0; 
        
        function limit() {
        	var dlugosc = document.getElementById('form1_content').value.length;
        
            window.status = dlugosc;
            
            if(a == 0 && dlugosc > 2000)
            {
            alert("Przekroczono limit");
            a++;
            }
            if(a == 1 && dlugosc < 5){
            a--;
            }
            
        }
        function wraps(){
        document.getElementById('form1_content').onkeyup = limit;
        alert(123);
        }