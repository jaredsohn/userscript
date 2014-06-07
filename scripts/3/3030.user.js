// By Sean Coates: sean@caedmon.net
// ==UserScript==
// @name		Form SSL Indicator
// @namespace		http://www.phpdoc.info/greasemonkey
// @description		Visibly indicates if forms post to SSL (not foolproof)
// @include		*

// ==/UserScript==
(function() {
	function xpath_to_array(expr, par)
	{
		var ret = new Array();
		var xpath_results = document.evaluate(expr, par, null, XPathResult.ANY_TYPE, null);
  
		while (this_result = xpath_results.iterateNext()) {
			ret.push(this_result);
		}
		return ret;
  }

	var lockSrc = "data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAWCAYAAAAfD8YZAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAABd0RVh0U29mdHdhcmUAUGFpbnQuTkVUIHYyLjW8h8n+AAADKUlEQVQ4T5WT/U+aVxTHm/pb/4Jlf8L+if05S5Z0WbqtWbPauFotrR1aRVQQEORNivUFtYoFBSpqi0pB8KXV4gsyK4qKqIDw2X1YIjbYJTvJfe597j2fc77n3Oe5ceMaA74X46rdvM6vYq9YLJJOn95NHaX5e3efvWRq4fw8R1VV1bf/GUACUwdHGA02/qx+RFurCr3OjM0+RCi8TD5/wbUBJDC6tEZdfSNtSu3I9vbOd9JePp/Hanph+O33WoILYaS9LwJIxWUyZww5XqHTWUoOkklOYroprd0uL+rOLpLJg8uzUhDpLbaxg7Klg/39VIU0cfxNLpdHJmsiEAhVwlP+eYf8WQvn2ey1dUmEUqkrmMy9lfBrt9/R1KQgm8t9FTZ09xbaVfpKeOSVN9yqUCHJ+8rdYzC+LDxvVn8JSw3yemboUKrICtkX+dytYuHiclAs3JJ8jEYbjY2KzGXHpTAhj2X9w1Q3u5EBjj+OkYnPkD2MkE0GySRmOY5Pk1hxEvXb8Pa3YFHe/ze79Fj0mteXfF0kQnbSa6OcbnjI7wU42/aRWh1lJ/iC6KSaqb6/GNbX0t34axkOe4zrK2/0wsnG8YcRMpsesiLjqZiTEQdbAQthVzteewNDuhr08l/KcNDdtRWZ1LA9Z+FwdZj0JzdncX9p/hzpJ/bWxPtxJZO2Jzi0NXTJ71yBXRpK8LyFg2WHgFycJ6ZF5kk+L/ay+c5McEwhYJmAH6Br+LkML7zWsOTVEhfw4aqDk9iEkD0t5E+wJ5q48c5E0NmKu6eeAc0DtFfhOWcHSz4dO+97RM3DnG2JmndnhHQfe9FBNgMis1OJ2/pYwNVonl7JHBhVsuzTEA9aOVgZJB0TNYvMJyLz7mIfsVkDC0K2y1JHf2c1nU9+Kst+O9JCxKNma95MSoJFo0qyRZBEuJdPs93MjzUzbq6lT30ftex2GZ4alBOa6GBzzkQy2sfR2riQ/oaTjQmhxs5Hv5YZ4TNmfIi9/R5tj34sw/26+rxD/5hRkwyXTY6r5zlOayvjPc0MaOt4qarBqvgD7dM7KB7epuHeD+Xvu7T6nyb9PP8AgwuHCQc/gYgAAAAASUVORK5CYII=";
   var lockDiv;
   var lockDivBG;
   var lockImage;
   var thisAction = '';
   var overlay_on = false;

   lockDivBG = document.createElement("div");
   lockDivBG.style.backgroundColor = 'white';
	lockDivBG.style.MozOpacity=0.8;
	lockDivBG.style.position = 'absolute';
	lockDivBG.style.visibility = 'hidden';
	lockDivBG.innerHTML = " ";
	document.body.appendChild(lockDivBG);

   lockDiv = document.createElement("div");
	lockDiv.style.position = 'absolute';
	lockDiv.style.display = 'inline';
	lockDiv.style.visibility = 'hidden';
	lockDiv.style.padding = '2px';
	lockDiv.style.border = '1px dashed grey';
	lockDiv.style.fontFamily = 'arial, sans-serif';
	lockDiv.style.fontSize = '9px';
	document.body.appendChild(lockDiv);

	lockImage = document.createElement("img");
	lockImage.src = lockSrc;
	lockImage.style.display = 'inline';
	lockDiv.appendChild(lockImage);
     
	actionDiv = document.createElement("div");
	actionDiv.style.display = 'inline';
	actionDiv.style.paddingLeft = '3px';
	lockDiv.appendChild(actionDiv);

	assign_events("//input[@type='submit']");
	assign_events("//input[@type='image']");
	assign_events("//input[@type='button']");
	
	function assign_events(xpath_exp)
	{
		var xpath_results = xpath_to_array(xpath_exp, document);
		for (n in xpath_results) {
			xpath_results[n].addEventListener("mouseout", roll_out, true);
			xpath_results[n].addEventListener('mousemove', show_overlay, true);
		}

	}

	function show_overlay(e)
	{
		var button = e.currentTarget;
		// turning it on
		if (
			(!button.form.action.match(/^:\/\//) && button.form.action.match(/^https:\/\//) ||
			document.location.href.match(/^https:\/\//))
		) {
			lockImage.style.display = 'inline';
		} else {
			lockImage.style.display = 'none';
		}
		actionDiv.innerHTML = "Action:<br />" + button.form.action;
		if (button.form.onsubmit) {
			actionDiv.innerHTML += "<br/><b>WARNING:</b> form has onSubmit";
		}
		if (button.onclick) {
			actionDiv.innerHTML += "<br/><b>WARNING:</b> button has onClick";
		}

		x = e.pageX;
		y = e.pageY;
		lockDiv.style.top = y + "px";
		lockDiv.style.left = x + 15 + "px";
		lockDiv.style.visibility = 'visible';
		
      lockDivBG.style.top = y + "px";
		lockDivBG.style.left = x + 15 + "px";
		lockDivBG.style.width = lockDiv.clientWidth + "px";
		lockDivBG.style.height = lockDiv.clientHeight + "px";
		lockDivBG.style.visibility = 'visible';
	}
   
	function roll_out(e)
	{
		lockDiv.style.visibility = 'hidden';
		lockDivBG.style.visibility = 'hidden';
	}

 })();
