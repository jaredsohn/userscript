// ==UserScript==
// @name StackOverflow Reviews
// @description Automatic enters to review section
// @match http://stackoverflow.com/review
// @copyright 2014+, Rw
// @grant yes
// ==/UserScript==

var Reviews = (function() {
   
   var reviewTypes = [{
       "Top": true,
       "Close Votes": true,
       "First Posts": true,
       "Late Answers": true,
       "Low Quality Posts": true,
       "Late Answers": true,
       "Reopen Votes": true,
       "Suggested Edits": true,
   }][0],
       rTKeys = Object.keys(reviewTypes),
       // based on above reviewTypes index, false for random reviews
       targetReview = localStorage.getItem("targetReview") || rTKeys[0],
       rev = {};
   
   var container = document.createElement("div");
   
   var containerSelect = document.createElement("select");
   
   var containerStrong = document.createElement("strong"),
       containerStrongText = document.createTextNode("Selected review: ");
   
   containerStrong.appendChild(containerStrongText);
   container.appendChild(containerStrong);
   
   rTKeys.forEach(function (val, key) {
       var containerOption = document.createElement("option"),
       	containerOptionText = document.createTextNode(val);
       
       containerOption.setAttribute("value", val);
       
       if (val === targetReview) {
           containerOption.setAttribute("selected", "selected");
       }
       
       containerOption.appendChild(containerOptionText);
       containerSelect.appendChild(containerOption);
   });
   
   container.appendChild(containerSelect);
   
   container.style.position = "absolute";
   container.style.right = "0";
   container.style.top = "34px";
   container.style.zIndex = "999";
   container.style.backgroundColor = "white";
   container.style.padding = "10px";
   container.style.border = "2px solid #000000";
   container.style.borderRight = container.style.borderTop = 0;
   document.body.appendChild(container);
   
   containerSelect.addEventListener("change", function () {
       var previousText = localStorage.getItem("targetReview"),
           newText = this.value;
       
       if (previousText !== newText) {
           if (reviewTypes[newText]) {
               localStorage.setItem("targetReview", newText);
               location.reload();
           } else {
               alert("Invalid Review Type");
           }
       }
   }, false);
   
   rev.di = document.getElementById('mainbar').querySelectorAll('.dashboard-item');

   rev.selectTargetReview = function () {
       var num_of_posts = 0, navigate_to_it = "", curIndex = 0;
       
       if (targetReview === "Top") {
           num_of_posts = parseInt(this.di[0].querySelector('.dashboard-num').getAttribute('title'), 10);
           navigate_to_it = this.di[0].querySelector('.dashboard-title').getElementsByTagName('a')[0].getAttribute('href');
       } else if (reviewTypes[targetReview]) {
           for(; curIndex < this.di.length; curIndex++) {
               var staticContent = this.di[curIndex].querySelector('.dashboard-title').getElementsByTagName('a')[0].textContent;
               
               if (staticContent === targetReview) {
                   curIndex = curIndex;
                   break;
               }
           }
           
           num_of_posts = parseInt(this.di[curIndex].querySelector('.dashboard-num').getAttribute('title'), 10);
           navigate_to_it = this.di[curIndex].querySelector('.dashboard-title').getElementsByTagName('a')[0].getAttribute('href');
       }
           
       if (num_of_posts < 1) {
           this.pageRefresher();
       } else {
           window.location.href = navigate_to_it;
       }
   };
   
   rev.pageRefresher = function () {
       setTimeout(function (){
           window.location.reload();
       }, 10000);
   };
   
   return rev;
}());

document.addEventListener('DOMContentLoaded', function (event) {
   Reviews.selectTargetReview();
}, false);