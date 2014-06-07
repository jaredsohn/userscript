// ==UserScript==

// @name           Bear411 Pic Unlock

// @namespace      http://userscripts.org/users/109085

// @description    If you don't have paid Bear411 this allows you to see all pics 

// @include        http://www.bear411.com/*

// ==/UserScript==





var allLinks = document.getElementsByTagName('a');



for (var i = 0; i < allLinks.length; i++) {



    thisLink = allLinks[i];

    // do something with thisLink

	//alert(thisLink.attributes.getNamedItem("onClick").value);



	var onclick = thisLink.attributes.getNamedItem("href");

	if (onclick != null) 

		onclick = onclick.value;

	else

		onclick = "";

	if (onclick.match("thumbmsg.php") != null) {

		var img = thisLink.getElementsByTagName("img")[0];

		var parts = img.attributes.getNamedItem("src").value.split('./bears/');

		parts=parts[1].split('/th_');

		var clickString = "Showpic('http://www.bear411.com/bears/" +parts[0] + '/' + parts[1] + "', 'secThumb2'); return false;";

		var href = "javascript:Showpic('http://www.bear411.com/bears/"+parts[0] + '/' + parts[1] + "', 'secThumb1')";

		thisLink.attributes.getNamedItem("onclick").value = clickString;

		thisLink.attributes.getNamedItem("href").value = href;

	}

}

