// ==UserScript==
// @name       Learn@UW Points Counter
// @namespace  http://spoons.io
// @version    0.1
// @description  Tallies points and assigns a grade based on 2014 CS577 grading scale
// @match      https://uwmad.courses.wisconsin.edu/d2l/lms/grades/my_grades/main.d2l*
// @require 
// @copyright  2014+, Spencer Buyansky
// ==/UserScript==

function addJQuery(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "//ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "window.jQ=jQuery.noConflict(true);(" + callback.toString() + ")();";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}
function main(){
    jQ(document).ready(function(){
        var pointsPossible = 0;
        var pointsEarned = 0;
        jQ("label").each(function(){
           var splitScore = jQ(this).text().split("/");
           pointsEarned += Number(splitScore[0]);
           pointsPossible += Number(splitScore[1]);
        });
        var grade;
        if(pointsEarned >= 200){
            grade = "A";
        }
        else if(pointsEarned >= 190){
            grade = "AB";
        }
        else if(pointsEarned >= 170){
            grade = "B";
        }
        else if(pointsEarned >= 160){
            grade = "BC";
        }
        else if(pointsEarned >= 140){
            grade = "C";
        }
        else if(pointsEarned >= 100){
            grade = "D";
        }
        else{
            grade = "F";
        }    
        
        var newDiv = jQ('<div/>');
        jQ('<p/>', {
            text: "You have earned " + pointsEarned + "/" + pointsPossible
        }).appendTo(newDiv);	
        jQ('<p/>', {
            text: "You have a(n): " + grade
        }).appendTo(newDiv);	
        newDiv.appendTo("body");
        newDiv.css("bottom", 10);
        newDiv.css("right", 10);
        newDiv.css("background-color", "#AFD6FF");
        newDiv.css("border-radius", 10);
        newDiv.css("border", "2px solid");
        newDiv.css("font-size", 16);
        newDiv.css("font-weight", "bold");
        newDiv.css("padding", 10);
        
        newDiv.css("position", "absolute");
 	});
}
// load jQuery and execute the main function
addJQuery(main);