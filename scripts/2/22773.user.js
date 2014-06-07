// ==UserScript==
// @name           leumit
// @description    leumit's vbscripts
// @include        http://leumit.co.il/
// ==/UserScript==

/* should include http://www.leumit.co.il/ too */

myfunc = function(ev)
{
//	alert("under construction: " + ev.target.value);
//	alert("current name is " + document.getElementById("USER_EXTRA_ID").value);
	inp1 = document.getElementById("USER_ID").parentNode.parentNode.nextSibling.nextSibling.childNodes[1].childNodes;
	for (var i=0; i < inp1.length; i++)
	{
		if (inp1[i].type == "hidden")
			inp2 = inp1[i];
	}
	inp2.value = "IDENTIFYID";

	document.getElementById("frmOnLine").submit();
}

mysetup = function()
{
/* currently, we add a button. to make it visible, we should append a text
 * child inside it, not a "value" property.
 * in the future we will try to find the existing "ùìç" button and change its
 * own "click" event */
	mywrp = document.createElement("div");
	mywrp.id = "mywrp";
	document.body.appendChild(mywrp);

	mybtn1 = document.createElement("button");
	mybtn1.id = "mybtn1";
	mybtn1.value = "MY BTN!!!";
	mybtn1.style.height = "30px";
	mybtn1.style.width = "150px";
	mybtn1.addEventListener("click", myfunc, false);
	mywrp.appendChild(mybtn1);
}

mysetup();
//alert("we've got here: " + document.getElementsByTagName("FORM")[0].name);


/* todo:
 * take care of the next problematic page, where the lists appear:
 * https://online.leumit.co.il/leumit/AppointsManagment.process?actionType=preDrAppointSearch
 * however, that one is much harder, since it is all written in javascript, but
 * utilzes some "evil" methods.
 */
