
// ==UserScript==
// @name       Udemy course stats
// @namespace  https://github.com/kotteavi
// @version    0.1
// @description  Show time for total course length, lessons completed and lessons leftover.
// @match      https://www.udemy.com/*
// ==/UserScript==

window.onload = function () {

    // Computes time for total course length, lessons completed and lessons leftover
    var courseInfo = function () {

        var totalCourseLength = "00:00:00";
        var courseComplete = "00:00:00";
        var courseIncomplete = "00:00:00";

        function lesson(lengthTime, complete) {
            this.lengthTime = lengthTime; // String
            this.isComplete = complete;   // boolean
        }

        // fetch video lesson time and completion values
        function parseCourse() {

            var lessonLengths = document.querySelectorAll(".ci-details > .ng-scope");
            var progressIndicators = document.querySelectorAll(".ci-progress-mask");

            var lessons = new Array();
            var len = lessonLengths.length;
            var i, aLesson, lessonLength, lessonComplete, lengthContent, progressContent;
            for (i = 0; i < len; i++) {

                lengthContent = lessonLengths.item(i).innerHTML.trim();
                // lesson video content has time format '00:00'
                if (lengthContent.length == 5) {
                    lessonLength = "00:" + lengthContent.substring(0, 5);
                }
                // other lesson indicators and nont-video content has 'text' 'x quesions'
                else {
                    lessonLength = "";
                }

                // all lessons have a progress indicators regardless of actual video content
                progressContent = progressIndicators.item(i).style.width;
                if (progressContent == "100%") lessonComplete = true;
                else lessonComplete = false;

                // must be a valid video lesson
                if (lessonLength != "" && lessonLength.length == 8) {
                    aLesson = new lesson(lessonLength, lessonComplete);
                    lessons.push(aLesson);
                }
            }

            return lessons;
        }

        // Add two different times in the string format 00:00:00 (hours, min, sec)
        function timeAdd(s1, s2) {
            // Split hours, minutes, and seconds
            var a1 = s1.split(/:/);
            var a2 = s2.split(/:/);
            var v = new Array(parseInt(a1[0]) + parseInt(a2[0]), parseInt(a1[1]) + parseInt(a2[1]), parseInt(a1[2]) + parseInt(a2[2]));

            //  add times
            var hours = v[0] + Math.floor(v[1] / 60);
            var min = v[1] % 60 + Math.floor(v[2] / 60);
            var secs = v[2] % 60;

            // format string to 00:00:00
            if (hours.toString().length == 1) hours = "0" + hours;
            if (min.toString().length == 1) min = "0" + min;
            if (secs.toString().length == 1) secs = "0" + secs;

            return hours + ':' + min + ':' + secs;
        }

        var isStatsComputed = false;

        // compute the total length of video courses, amount of time completed and amount not yet complete
        function computeStats() {
            var lessons = parseCourse();

            var i, len, timeVal;
            for (i = 0, len = lessons.length; i < len; i++) {

                timeVal = lessons[i].lengthTime;

                totalCourseLength = timeAdd(totalCourseLength, timeVal);

                if (lessons[i].isComplete == true) courseComplete = totalCourseLength;
                else courseIncomplete = timeAdd(courseIncomplete, timeVal);

            }
            isStatsComputed = true;
        }

        function getTotalLength() {
            if (isStatsComputed != true) computeStats();
            return totalCourseLength;
        }

        function getLenthComplete() {
            if (isStatsComputed != true) computeStats();
            return courseComplete;
        }

        function getLengthIncomplete() {
            if (isStatsComputed != true) computeStats();
            return courseIncomplete;
        }

        return {
            getTotalLength: getTotalLength,
            getLenthComplete: getLenthComplete,
            getLengthIncomplete: getLengthIncomplete
        }
    }();

    //
    function injectCourseInfo() {
        var info = ["Course Length: " + courseInfo.getTotalLength(), "Time Completed: " + courseInfo.getLenthComplete(),
            " Time Remaining: " + courseInfo.getLengthIncomplete()];

        console.log(info);

        // Insert course info into
        var infoDiv = document.createElement("div");
        infoDiv.className = "custom-course-progress";

        var listNode = document.createElement("ul");

        var listItem;
        for (var i = 0; i < 3; i++) {
            listItem = document.createElement("li");
            listItem.appendChild(document.createTextNode(info[i]));

            listNode.appendChild(listItem);
        }

        infoDiv.appendChild(listNode);

        document.querySelector(".user-course-progress").appendChild(infoDiv);

        var sheet = document.styleSheets[2];
        sheet.insertRule(".custom-course-progress li { display:inline; padding-right:10px ;padding-left:10px;}", 0);
        sheet.insertRule(".custom-course-progress { padding-top:20px; } ", 0);
    }

    var observeDOM = (function () {
        var MutationObserver = window.MutationObserver || window.WebKitMutationObserver,
            eventListenerSupported = window.addEventListener;

        return function (obj, callback) {
            if (MutationObserver) {
                // define a new observer
                var obs = new MutationObserver(function (mutations, observer) {
                    if (mutations[0].addedNodes.length || mutations[0].removedNodes.length)
                        callback();
                });
                // have the observer observe foo for changes in children
                obs.observe(obj, { childList: true, subtree: true });
            }
            else if (eventListenerSupported) {
                obj.addEventListener('DOMNodeInserted', callback, false);
                obj.addEventListener('DOMNodeRemoved', callback, false);
            }
        }
    })();

    // Observe a specific DOM element, and then wait to load.
    observeDOM(document.querySelector(".curriculum-items-list"), function () {
        // watch for added content and wait till full process is complete, varies between courses
        // inefficient
        setTimeout(function () {
            injectCourseInfo();
        }, 4000);
    });

};