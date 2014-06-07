// ==UserScript==
// @name       		The Old Reader Hebrew fixer
// @description  	
// @match      		*://theoldreader.com/*
// ==/UserScript==


String.prototype.isHebrew = function() {
    return (this.match(/[\u0591-\u05F4]/) !== null);
};

window.setInterval(
        function() {
            var sourceInfoArr = document.querySelectorAll(".sourceInfo");
            var condensedToolsArr = document.querySelectorAll(".condensedTools");

            for (var i = 0; i < sourceInfoArr.length; i++) {
                for (var j = 0; j < sourceInfoArr[i].textContent.length; j++) {
                    if (sourceInfoArr[i].textContent.charAt(j).isHebrew() === true) {
                        sourceInfoArr[i].style.cssFloat = "left";
                        condensedToolsArr[i].style.cssFloat = "left";
                        break;
                    }
                }
            }

        },
        3000);