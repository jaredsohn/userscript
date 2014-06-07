// ==UserScript==



// @name            Fix Lifehacker Gizmodo Gawker



// @description	    Reduces clutter on lifehacker and some other gawker sites due to their new layout. Works best in "blog" view.



// @include         http://lifehacker.com/*
// @include         http://www.lifehacker.com/*

// @include         http://gawker.com/*

// @include         http://www.gawker.com/*
// @include         http://gizmodo.com/*
// @include         http://www.gizmodo.com/*



// ==/UserScript==





window.addEventListener("load", function() {


WIDTH_OF_CONTENT = "700px";


rightwrapper = document.getElementById('rightwrapper');

container = document.getElementById('container');

main_container = document.getElementById('main-container');

postTransitionOverlay = document.getElementById('postTransitionOverlay');

hNP = document.getElementById('hoveringNextPost');

hNPC = document.getElementById('hoveringNextPostContainer');
pdv = document.getElementById('post_date_views');



rightwrapper.style.visibility = "collapse";

rightwrapper.style.width = "0px";

rightwrapper.style.display = "none";



hNP.style.visibility = "collapse";

hNP.style.width = "0px";

hNP.style.display = "none";



hNPC.style.visibility = "collapse";

hNPC.style.width = "0px";

hNPC.style.display = "none";

pdv.style.visibility = "collapse";

pdv.style.width = "0px";

pdv.style.display = "none";



container.style.width = "100%";

container.style.margin = "20px 0px";

main_container.style.margin = "5px auto";

//postTransitionOverlay.style.margin = "auto";

main_container.style.width = WIDTH_OF_CONTENT;

//postTransitionOverlay.style.width = "100%";



document.body.style.fontFamily = "arial";



inner = document.getElementsByTagName('div')[2];

inner.style.width = "100%";

inner.style.margin = "15px 0px";



tc = document.getElementsByTagName('div')[3];

//tc.style.visibility = "collapse";

tc.style.width = "0px";
//tc.style.margin = "auto";

//tc.style.display = "none";



gmgrid = document.getElementsByTagName('div')[8];

gmgrid.style.width = "100%";

gmgrid.style.margin = "auto";





}, false);