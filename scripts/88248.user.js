// ==UserScript==
// @name          PageTime
// @namespace     PT
// @description   Labels every page with the time it was loaded.
// @match         *
// ==/UserScript==

var PageTime = {
  createBox : function () {
    var getTimeText = function () {
      var zp = function (num) {
        return (num.length == 1 || num < 10) ? "0" + num : num;
      };
      var dateObj = new Date();
      return zp(dateObj.getHours())+":"+zp(dateObj.getMinutes())+":"+zp(dateObj.getSeconds());
    };
    var time_box = document.createElement("div");
    var time_span = document.createElement("span");

    time_box.style.backgroundColor = "white";
    time_box.style.border = "1px solid black";
    time_box.style.color = "black";
    time_box.style.height = "16px";
    time_box.style.left = "2px";
    time_box.style.lineHeight = "12px";
    time_box.style.paddingTop = "2px";
    time_box.style.position = "fixed";
    time_box.style.textAlign = "center";
    time_box.style.top = window.innerHeight - 22 + "px";
    time_box.style.width = "58px";
    time_box.style.zIndex = "999";

    time_span.style.fontSize = "12px";
    time_span.style.fontFamily = "Arial";
    time_span.style.fontStyle = "normal";
    time_span.style.lineHeight = "12px";

    time_span.innerHTML = getTimeText();
    time_box.appendChild(time_span);

    document.body.appendChild(time_box);
  }
};

PageTime.createBox();