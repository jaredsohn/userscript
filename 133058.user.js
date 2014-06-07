// ==UserScript==
// @name            aScImprover
// @version         0.01alpha
// @include         *edupage.org/*
// @updateVersion   3
// @run-at          document-start
// ==/UserScript==

var headID = document.getElementsByTagName("head")[0];         
var newScript = document.createElement("script");
newScript.type = "text/javascript";
newScript.charset = "utf-8";
newScript.src = "data:application/x-javascript;base64,c2V0VGltZW91dChmdW5jdGlvbigpIHsNCmlmKHdpbmRvdy5sb2NhdGlvbi5ocmVmLmluZGV4T2YoInN0dWRlbnRzLyIpID49IC0xKSB7DQp2YXIgc3R5bCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoInN0eWxlIik7DQpzdHlsLmlubmVySFRNTCA9ICIubWVza2EgeyBiYWNrZ3JvdW5kOiAjRkYwMDAwOyB9IC5tZXNrYSB0ZCB7IGNvbG9yOiAjRkZGICFpbXBvcnRhbnQ7IH0iOw0Kc3R5bC50eXBlID0gInRleHQvY3NzIjsNCmRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCJoZWFkIilbMF0uYXBwZW5kQ2hpbGQoc3R5bCk7DQp2YXIgcHJpY2hvZHkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgicHJpY2hvZHkiKS5nZXRFbGVtZW50c0J5VGFnTmFtZSgidHIiKTsNCnZhciBocmFuaWNhID0gWzcsIDUwLCAwXTsNCmZvcih2YXIgaSA9IDA7IGkgPCBwcmljaG9keS5sZW5ndGg7IGkrKykgew0KdmFyIHRkID0gcHJpY2hvZHlbaV0uZ2V0RWxlbWVudHNCeVRhZ05hbWUoInRkIilbMV07DQppZih0eXBlb2YgdGQgIT0gInVuZGVmaW5lZCIpIHsNCnZhciBzcCA9IHRkLmlubmVySFRNTC5zcGxpdCgiOiIpOw0KaWYoKHBhcnNlRmxvYXQoc3BbMF0pID49IGhyYW5pY2FbMF0gJiYgcGFyc2VGbG9hdChzcFsxXSkgPj0gaHJhbmljYVsxXSkgfHwgcGFyc2VGbG9hdChzcFswXSkgPiBocmFuaWNhWzBdKSB0ZC5wYXJlbnROb2RlLnNldEF0dHJpYnV0ZSgiY2xhc3MiLCAibWVza2EiKQ0KfQ0KfQ0KfQ0KfSwgNTAwMCk7";
headID.appendChild(newScript);