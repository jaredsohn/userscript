// ==UserScript==
// @name        Bamboo
// @namespace   http://fluidapp.com
// @description Display a badgecount for the number of broken builds
// @include     */telemetry.action*
// @author      Stefan Saasen
// ==/UserScript==
(function () {
    if (window.fluid) {

		var getElementsByClassName = function(elementname, classname)  {
		    var a = [];
		    var regex = new RegExp('\\b' + classname + '\\b');
		    var elements = document.getElementsByTagName(elementname);
		    for(var i=0,j=elements.length; i<j; i++)
		        if(regex.test(elements[i].className))a.push(elements[i]);
		    return a;
		}
		var failedBuilds = getElementsByClassName("tr", "Failed").length;
		window.fluid.dockBadge = failedBuilds > 0 ? failedBuilds : "";

    }
})();