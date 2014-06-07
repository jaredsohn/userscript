// ==UserScript==
// @name          Slashdot No Sidebars (new /. style)
// @description   Remove slashdot.org sidebars. Compatible with the new CSS based Slashdot design.
// @include       http://*slashdot.org/*
// ==/UserScript==



(function()
{
    try
    {
        // this turns off the left hand sidebar
        div = document.getElementById("links");
        div.style["display"] = "none";

        // this increases the width of the main body
        main = document.getElementById("contents");
        main.style["width"] = "100%";
	main.style.left = "-7.1em";

	// on comments pages, things are a little different.
        if ( !document.location.href.match('slashdot.org/comments.pl') &&
             !document.location.href.match('slashdot.org/search.pl') )
        {
		// this turns off the right hand sidebar
		div2 = document.getElementById("slashboxes");
		div2.style["display"] = "none";

	        // this increases the width of the main body
	        main2 = document.getElementById("articles");
	        main2.style["width"] = "100%";
	}

    }
    catch (e)
    {
        alert("Slashdot No Sidebars - script exception: " + e );
    }
}
)();