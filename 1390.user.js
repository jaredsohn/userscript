// ==UserScript==
// @name	  		Filmwise Invisibles Answer Checker
// @author			Mark Husson <mhusson atte gmail dought com>
// @namespace		http://userscripts.org/scripts/show/1390
// @description		Adds a "Check Answer" Icon next to each movie field in Filmwise's Invisibles. Clicking that icon will tell you if your answer was right or not.
// @include	 		http://filmwise.com/invisibles/invisible_*
// @include	 		http://www.filmwise.com/invisibles/invisible_*
// ==/UserScript==  

var inputArray = document.getElementsByTagName("input");
var imgFw = "data:image/gif;base64,R0lGODlhEAAQAOYAAAAAAP///wEBAgMFBwUICwgOExgsOwUJDAwVHAcMEBgtPBcrOUmGsk6Rvk2NukyLuC9XclKWxjprjDhnhz5zlDNeelql1DlohkyKsgcOEhAeJg4aIVyp11qm0yxRZxgsOF+v3FSawlOZwB85SDBYbl6u2WO442Gz31GXuixRZVmly0WAnWjA62a852W65FSbvhYoMRgtN2W75V6w1UuLqkmIpmjB6k2PrUiFojRgdWrE7lmlx0iFoRIhKB87RzJecQgPEgMGBwABAQECAv7+/v39/fz8/Pf39/Hx8e3t7evr6+rq6ufn59vb29nZ2dXV1cLCwr29vbu7u7q6uri4uLa2trS0tLGxsYmJiYeHh4WFhYSEhIGBgYCAgF5eXlJSUk9PT0tLS0hISCwsLB4eHhsbGxcXFwICAv///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAGgALAAAAAAQABAAAAeOgAGCgkZdZl1Fg4qDRkMGDAoCiYuDTQgOEQ8LVZSDSAQTDRIFTJ2DURoQGZymAUcDFRQfU60BSAcYFhdetVgjHB0eWq1JCSIgIRtOrVspJyUkXLVlKiYoQUtKUKZnMi0vAl1AMVSdYTUsLis5NDhgnVYwNjr0OjxfnURCPjczOz89pJgickUMmTFZniwKBAA7";
var imgQm = "data:image/gif;base64,R0lGODlhEAAQAOYAAAAAAP///+Xo61treKjK45q50Gp+jYeWoZajrZWirMfP1efr7mV6iazQ6KrO5qnM5KjL46TG3qHC2Zy905q60JKwxX2XqXaOn6jK4n6XqXePoKLC2ZOwxWyBkHGBjJelr6vQ6KvR6KjN5G6Gla3T6qzR6KrP5oiluIGdrnyWp19yfnSGkYeXoZelrpW3y11zf6/X7q7V7KzT6qnQ5pe5zYqpu4CdroWjtF9zf19yfXWJlMjR1pm/0llverHc8rDa8J3C1pq/0lpwe7Lc8rHa8K/Y7oytvoWltWqDkFlueXGLmJyut5mqs8rU2YqtvrXj+KjS5qbQ5J/H2oiru3+frn6erWyHlLTh9rPf9LHd8rDc8K/b76nT56bP46TN4JC0xY6xwomru2Z/i7Ld8q/a7q3X63GLl6a8xputtcvW24quvbXj93+frXOPmmN6hHiPmYyhqpuutufs7v///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAHMALAAAAAAQABAAAAfjgAGCAQoJHgMDHgkKg4MCCAYZFRsSHBYGCAKOLBcUBBgQBKIFFweaAS0aEQ+sDCmsDxEaLQE7HRMOJg4OFie7uhMdOx8oISAhxiAlIMwhDTYfKzQyJDLULjUk1dY0KzkiMeHhNyPi4SIqODNF7EVAL0ZFMDDsMzg6QT9E+khI+vr7guhgcmRIlixgkvDIMsQHwzFHmDQx4wULljA9ymA5YxGLFyVNAqCpsuUKFCFirHy5cmVLFTSCFsBhE+UJFzVOyKzpQgXOgkFylrSZIkWLFilT2iyR00hQmjhv3Lh5EydNo0AAOw%3D%3D";

function init() {
	if(typeof(inputArray[0] != "undefined")){
		var j = 0;
		for(var i=0;i<inputArray.length-1;i++){
			if(inputArray[i].getAttribute("type") == "text" && j<8){
				inputArray[i].size = inputArray[i].size - 2;
			
				var ansChk = document.createElement('img');
				ansChk.setAttribute('id', inputArray[i].name+'img');
				ansChk.setAttribute('src', imgQm);
				ansChk.setAttribute('style', 'position:relative;top:4px;margin-left:6px;width:16;height:16;cursor:pointer;');
				ansChk.setAttribute('title', 'Click to Check Answer');
				ansChk.setAttribute('onclick', "checkAnswer(this.parentNode.getElementsByTagName('input')[0])");
		
				inputArray[i].parentNode.insertBefore(ansChk, inputArray[i].nextSibling);
		
				j++;
			}
		}
		document.body.innerHTML += '<iframe id="hiddenIframe" name="hiddenIframe" src="about:blank" type="hidden" style="display:none;"></iframe>';	
	}
}

function runRequest(url, elem) {
	//var req = new XMLHttpRequest();
	//req.open("GET", url, true);
	//req.onreadystatechange = function() {
	//	if (req.readyState == 4) {
	//		var rt = req.responseText;
	//		var hiddenDiv = document.createElement("div");
	//		hiddenDiv.setAttribute("style","display:none;");
	//		hiddenDiv.innerHTML = rt;
	//	}
	//}
	//req.send(null);
	
	// Let's try this without ajax...
	hiddenIframe.document.location = url;
	myElem = elem;
	setTimeout(myAlert, 2000);
}

function myAlert(elem) {
	if(hiddenIframe.document.location == "about:blank"){
		setTimeout("myAlert()", 2000);
	}else{
		var URLString = "" + hiddenIframe.document.location;
		var indx = URLString.indexOf("score=");
		if (indx != -1) {
			var tmp = URLString.substring(indx + 6, URLString.length)
			indx = tmp.indexOf("&");
			if (indx != -1) { 
				var score = tmp.substring(0, indx); 
			}else { 
				var score = "oops"; 
			}
		}
		document.getElementById(myElem.name+"img").src = "data:image/gif;base64,R0lGODlhEAAQAOYAAAAAAP///+Xo61treKjK45q50Gp+jYeWoZajrZWirMfP1efr7mV6iazQ6KrO5qnM5KjL46TG3qHC2Zy905q60JKwxX2XqXaOn6jK4n6XqXePoKLC2ZOwxWyBkHGBjJelr6vQ6KvR6KjN5G6Gla3T6qzR6KrP5oiluIGdrnyWp19yfnSGkYeXoZelrpW3y11zf6/X7q7V7KzT6qnQ5pe5zYqpu4CdroWjtF9zf19yfXWJlMjR1pm/0llverHc8rDa8J3C1pq/0lpwe7Lc8rHa8K/Y7oytvoWltWqDkFlueXGLmJyut5mqs8rU2YqtvrXj+KjS5qbQ5J/H2oiru3+frn6erWyHlLTh9rPf9LHd8rDc8K/b76nT56bP46TN4JC0xY6xwomru2Z/i7Ld8q/a7q3X63GLl6a8xputtcvW24quvbXj93+frXOPmmN6hHiPmYyhqpuutufs7v///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAHMALAAAAAAQABAAAAfjgAGCAQoJHgMDHgkKg4MCCAYZFRsSHBYGCAKOLBcUBBgQBKIFFweaAS0aEQ+sDCmsDxEaLQE7HRMOJg4OFie7uhMdOx8oISAhxiAlIMwhDTYfKzQyJDLULjUk1dY0KzkiMeHhNyPi4SIqODNF7EVAL0ZFMDDsMzg6QT9E+khI+vr7guhgcmRIlixgkvDIMsQHwzFHmDQx4wULljA9ymA5YxGLFyVNAqCpsuUKFCFirHy5cmVLFTSCFsBhE+UJFzVOyKzpQgXOgkFylrSZIkWLFilT2iyR00hQmjhv3Lh5EydNo0AAOw%3D%3D";
		
		if(score == 1){
			myElem.style.backgroundColor = "#BCF5BC";
			myElem.style.borderWidth = "1px";
			myElem.style.borderColor = "#7F9DB9";
			myElem.style.borderStyle = "solid";
		}else if(score == 0){
			myElem.style.backgroundColor = "#E7BCBC";
			myElem.style.borderWidth = "1px";
			myElem.style.borderColor = "#7F9DB9";
			myElem.style.borderStyle = "solid";
		}
		hiddenIframe.document.location == "about:blank";
	}
}

function checkAnswer(elem) {
	var imgThrobber = "data:image/gif;base64,R0lGODlhEAAQAKIAAAAAABgYGDExMUpKSmNjY4SEhK2trQAAACH/C05FVFNDQVBFMi4wAwEAAAAh+QQFCgAAACwAAAAAEAAQAAADRQi617cQhKDcA8asOevNmcJREaiJZISdarsIggsZBRzLtGHLWKHfPBrPNRi4CoVFsahCIhVLI4BAUDiTUCmVasWqttVIAgAh+QQFCgAAACwAAAAAEAAQAAADRAi60bEQCKHcA+esOevNmcJREaiJZISdarsMgwsZBhzLdA3LQL7zPQOwRSC4DIVFsahC0hRLI6CQnDqVUipVgXRpq5AEACH5BAUKAAAALAAAAAAQABAAAANECLrSshCModwDIaw5682ZwlERqIlkhJ1quxCECx0HHMt0DctAvvO9A7BVKLgMhkWxqEIiFUsjwCB1JqHVwnN6VWm1qgQAIfkEBQoAAAAsAAAAABAAEAAAA0YIutOzEBCi3ANCrDnrzZnCURGoiWSEnWq7FIULBQEcy3QNy0C+870AsGW4qQ6HRbF4RCYBhaXCYFA4nwDqlFoFIF3cLiQBACH5BAUKAAAALAAAAAAQABAAAANECLrUtBCUotwDY6w5682ZwlERqIlkhJ1quxipCwhCAcszDRs4LRg8XE7YAroCgRcwCEEiFcvg4aBwJqHSKRXwbGm3kAQAIfkEBQoAAAAsAAAAABAAEAAAA0QIutW1EJgHHCVkzamawli3RQCYKYZBfufqSuqrDEMau3SdyvkuA7Tf6nBwCQQLIpF0PCqURUAgoGgin9HptHolaamRBAAh+QQFCgAAACwAAAAAEAAQAAADQgi6Vr0QGKOcq4VNKnn5WTdFABh2JJauy3GwC0G4LyvPLnznMCD3qUBgNRgshEJSsahADgECgWJpbD6j0WmVhJVGEgAh+QQFCgAAACwAAAAAEAAQAAADRQi61rYQnKPcA6asOevNmcJREXhJZIRpagsFgQsVBRzLdA3LQL7zPRYwIhC4CIRFsahCIhVLI2AwUDiTUCmVasWqttVIAgA7";
	document.getElementById(elem.name+"img").src = imgThrobber;
	var subdomain = (window.location.href.indexOf("http://www.") > -1) ? "www." : "";
	var redirect = document.getElementsByTagName('input')[1].value.replace("http://www.", "http://"+subdomain);
	baseUrl = "http://"+subdomain+"filmwise.com/cgi-bin/score.cgi?name=&form="+document.getElementsByTagName('input')[0].value+"&redirect="+redirect+"&";
	url = baseUrl + elem.name + "=" + elem.value;
	runRequest(url, elem);
}

function embedFunction(s) {
document.body.appendChild(document.createElement('script')).innerHTML=s.toString().replace(/([\s\S]*?return;){2}([\s\S]*)}/,'$2');
}

embedFunction(checkAnswer);
embedFunction(runRequest);
embedFunction(myAlert);


window.addEventListener('load', init, true);