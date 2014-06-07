// ==UserScript==
@@ -3,7 +3,7 @@
 // @name     Pi
 // @include        http://*.freerice.*/*
 // @include        http://freerice.*/*
-// @version        1.0
+// @version        1.5
 // @require        http://sizzlemctwizzle.com/updater.php?id=89869
 
 // ==/UserScript==
@@ -146,13 +146,6 @@
   return null;
 }
 
-function clickObject(obj)
-{
-    var clickEvent = window.document.createEvent("MouseEvent");
-    clickEvent.initEvent("click", true, true);
-    obj.dispatchEvent(clickEvent);
-}
-
 var supportedModes = ['Multiplication Table'];
 var answered = false;
 var falseRetries = 0;
@@ -179,12 +172,13 @@
 			if(mode && mode == 'Multiplication Table') //No other mode supported right now. 
 			{
 				result = eval(question.replace('x','*').replace('X','*'));
-				var choices = getChildrenByXPath(document, "//div[@class='item-list']/ul/li/a");
+				var choices = getChildrenByXPath(document, "//a[@class='answer-item']");
 				for(i in choices)
 				{
 					if(choices[i].innerHTML.replace(/ /g,"") == result)
 					{
-						clickObject(choices[i]);
+						//Location Hack to circumvent their 'default click event' changes to the website. 
+						location.href = "javascript:ExternalGame.submitAnswer(" + choices[i].getAttribute("rel") + ");void(0);";
 						answered = true;
 						++countAnswered;
 						falseRetries = 0;