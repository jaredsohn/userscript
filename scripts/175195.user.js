 // ==UserScript==
// @name        Social Media
// @namespace   http://userscripts.org/scripts/review/162912
// @include     https://www.facebook.com/
// @include     http://noswearing.com/dictionary
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js
// @version     1
// ==/UserScript==


//string array that contains all the words
var str1 = new Array("arse","arsehole","ass","ass-hat","ass-jabber","ass-pirate","assbag","assbandit","assbanger","assbite",
"assclown","asscock","asscracker","asses","assface","assfuck","assfucker","assgoblin","asshat","asshead","asshole","asshopper",
"assjacker","asslick","asslicker","assmonkey","assmunch", "assmuncher", "assnigger","asspirate","ass-shit","asshole","asssucker",
"asswad","asswipe","axwound","bampot","bastard","beaner","bitch","bitchas","bitches","bitchtits", "bitchy","blow job", "blowjob",
"bollocks","bollox","boner","brotherfucker", "bullshit","bumblefuck","butt plug","butt-pirate","buttfucka","buttfucker");

//function to compare array
function compareArrays(){

    var textbox = document.getElementById("u_0_u").value;
    //get the id of textbox

    var a = textbox.split(" ");
    //split the string into array and store it in variable a

    for(var i=0; i<a.length; i++){
    //loops the content of var a to str1
        
       for(var j=0; j<str1.length; j++){
       //loops the content of str1 to search for the same words in a
       
           if(a[i]===str1[j]){
            //compare array a and str1  
           
            var r= confirm("Inappropriate content detected. Are you sure you want to post this?");
           //confirmbox that will prompt user if inappropriate content deteccted
                if(r==true){
                //if user clicks confirm it will return true
                return r;
                }else{
                //user clicks cancel it will proceed back to facebook mainpage
                   window.history.back();
                
                }
                
                
                }
            }
   } }
   
//adds event to the button
function addListen(){

    var button = document.getElementById("u_0_i").lastChild.lastChild.lastChild.lastChild.lastChild.lastChild;
    //seraches for the button using the form ID
    button.addEventListener("click", compareArrays, true);
    //adds event click to the button and proceeds to compareArrays()
   
}
addListen();
//activates the addlisten function