// ==UserScript==
// @name           Yelp Image Viewer
// @namespace      http://www.kennyocracy.com
// @include        http://www.yelp.com/*
// ==/UserScript==

loading =  "data:image/bmp;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAwBQTFRFwQUArCQIvwAAyjgp7Nzc6svG%2FPX0%2F%2F7+5MC5q0Uz3XxyzYZ38tXS7rm0vREAuQwA9%2FDvnRUAumRZxisbxi4fzj4wzCUG+ebj22xh8c3K1J6T67GrwzQlqhsBxhoJ0JKMwgoAyE0%2F2WZb23BmwgwA7rizxFVJ1VVMtBwC%2F%2F39yTMk9t7cmB8J5a2n+vf2rQwAxBAAxRQC+u7spBIDshYB5bWuzjssxiYW0TYWqykOyiMGyjco0U9EyjIj9tzZ55+XzioI%2FPLx5pmS+erpuhwN9tjVzEc54IR7oSsb23Rr8cK9wHZs115RvSAE+uzqzkEywhkC4q6qtRwL6bq0xh0Lww4AuTAi+ejmxiMSxDopzzAPxy8OzDgp4pKKtgQA01BD3Hlu%2Fvr6%2Ffn5xA4AxxkC4paOzDYnzSoNxx8OwhIAyzQkyi8gyjQmyToszTQlzDor6qmioQwAySoayiQG%2Ffz9owIA+vLxzDUnwi0N5ZePxiUHxxwRzScHzj0uxRYH78G7zy8O7766wh4ExhgH7bexxyAPzZGKwh4OyjYoyi4es1lOnQkA0UU2yB8Jxx8E%2Ffv7wycI+%2Fn6666o2mle1XJo1WlerywRzzkp8+fmxyIF7ry3sgwA56eiuW5lzkI17s7L4Lmx9%2FLy4L664sXA8tPPvhgI56ScxRsOoCcQ%2FP3+sCYN0qeh2LGq3raywSgH12JV2MTC1mNY%2Ffz72GFVyicMpTMbzk5B8tva%2Fff29drY8MfD8+Hey4yF8MjFrwMA0Ih+woBy+N%2Fd2YuBqxQA9u3r0JiRvk5C4ZuTqxkL5puUyjIhmxwVxYZ4xGtizpmNySoeyC0cwxUH%2FPr5wAwA%2FPTzww0CwCUV06GW3qaf9dfTxBMBxRIA8uHg9OTiwCgIxysIyDEithEKyjEhy4B1vB8ExGZczmFVyZaOzpSN0UU4001AzTkq+vTzv1tHxyIK4KCZ56GZwCADwyAFxBUBwSUD2IJ534R634d+y0I1yj0sz0Y3y2hd8NjWxhkHxBIA%2F%2F%2F%2FXIznMQAAA3NJREFUeNpM0nlcE0cUB%2FBxt0hFAyqCUghdYREIFSaIpEXQRAQ8EFAyihCRCqYkBKJRGrGISoyKKOB99NJab%2F14YUs92mprLfUorUfbULWivbSHimc1+5zdhOpv97%2F57sx7bxbpkqQoFEajwlrSVlLG6tlB7KDSUlZnpvFDxpaaEpq2X77xzen1KDU1yGI0lRnLTEaryWQysmakVyiS6GP0VX208mS2x%2Fv9+wUF6a2L9HQfnY6lO9y06hdZWX1N6r%2FdQMrPXwWVsmvMZjY+3hwfn4n0FkuLpUX18EOA3rdGhPf5BI6Mm+Dnymy%2FzPeQtp1GWTUFju371sYzWAYnBmwOdmpVqpok6+zM%2F5AN05CFKVDA8AST4DAKfAiPBcHhUCqVKuQUaPDmgTDPzgkCCZbBH9PyF+YYeIO4INhcQOAnXIIHHJbAqGm%2FBWYfH+bTKi443QDnP96esYSTwOKeYjNjxnrj54Bw7uoYOFpMRLBgLQSGjIcfY7xbnwHC5497Avcl8BcEbGXSNfBrjOF%2FgNP7B%2Fa79n3TnxztAjJ0HOYq4MnXPoZWF%2FBZNZme+mUTBHxXKANYQegnxcnLznzqBoXDPoblzXSU4Nl84BhswQLmEVoPC8q9XUege8uiOCZnxPxYsfxYO2KQPTEtGUaVexskwIyEbOLgGduNofUUhJeEVMzRAHxwKsbQ7gJhEEbEVhhnAN1i%2FOAmgI073x1eG9depJXAVJDRayDYXqARD0mhJc%2FYvbg2LquoaKkEKqAbwW8tGaqBzhpPCKlqS%2FvpPEQOHNsBUJ%2F6171Cxf+ld+KkFNhDpyAkvhM747O3s1yAWKJcP1N9OqOcD1F22ifHNMOL5Vl1%2F0iD4kJGZnhS4IXEUcNEXhzuHDhRW13XKAFMVKGRAFN4LIHOqZyD8Yrs3uWL6oRG910g3xcgUEuk646GQ8FM+Jvwco+I6oQ33LdZeHEvpF3gCO8Mg9+jYWJoMmx6RT46oa4DEO1UgCE6O1LOg56f76f1bBpO1%2F39OwAmNw7T6chCCzI8u%2FTo6uFxdpv8+jr%2FZ0DAjr7XNkSLve7aFhG347UBEaNnTX8e0DpjVv%2Fd9aUfTh+UNzTcvn15VkOlurJSPRfZhA5x525EXKdOcvnlK2q1f6VaTV81BcVOd6oac%2FPy8mbOzMsVMzfXlVefCjAA770mmwHUsKUAAAAASUVORK5CYII=";

function sqr(x) { return (x*x) }
eventThingX = 0;
eventThingY = 0;
var globalTimer;
var newDiv = document.createElement('div');
var inner = newDiv.appendChild(document.createElement('div'));
newDiv.setAttribute('id', 'yelpImageViewer');
newDiv.setAttribute('style', 'padding:3px;position:fixed;display:none;z-index:100;top:20px;left:20px;background-color:#c41200;');
document.body.appendChild(newDiv);
newDiv.addEventListener(
  'mouseover',
  function(event) {
    this.style.display = "inline";
  },
  true);
newDiv.addEventListener(
  'mouseout',
  function(event) {
    window.clearTimeout(globalTimer);
    this.style.display = "none";
  },
  true);
newDiv.addEventListener(
  'mousemove',
  function(e) {
    if (sqr(eventThingX - e.pageX) + sqr(eventThingY - e.pageY) > 1337) {
      window.clearTimeout(globalTimer);
      this.style.display = "none";
    }
  },
  true);
var allImages = document.evaluate('//img', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
for (var i=allImages.snapshotLength-1; i>=0; i--){
	var thisImage = allImages.snapshotItem(i);
	var src = thisImage.src;
	var thumbnailSizes = ["xss.jpg", "m.jpg", "ms.jpg", "60s.jpg", "30s.jpg", "ss.jpg"];
	var size = src.substring(src.lastIndexOf('/')+1, src.length);
	if (thumbnailSizes.indexOf(size) > -1){
  thisImage.addEventListener(
    'mouseover',
    function(event) {
      fullsize=this.src.substring( 0, this.src.lastIndexOf('/') + 1 ) + 'ls.jpg';
      thisImage = this;
      globalTimer = window.setTimeout(
        function (thisImage) {return function(result) {
          inner.setAttribute('style', 'background:url("'+loading+'");min-height:'+100+'px;min-width:'+100+'px;');
          inner.innerHTML = "<a href="+thisImage.parentNode.href+"><img style = 'max-height: "+ (parseInt(window.innerHeight) - 40) +"px; margin-bottom: -3px; cursor: crosshair;' src='" + fullsize + "'></a></div>";
          newDiv.style.display = "inline";
        }}(thisImage),500
      );
    },
    true);
  thisImage.addEventListener(
    'mouseout',
    function(event) {
      window.clearTimeout(globalTimer);
      newDiv.style.display = "none";
    },
    true);
  thisImage.addEventListener(
    'mousemove',
    function(e) {
      eventThingX = e.pageX;
      eventThingY = e.pageY;
    },
    true);
  }
}