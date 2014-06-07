// ==UserScript==
// @name           Scripture Extractor
// @namespace      http://
// @author         kimo
// @version        0.1
// @description    Opens all the scripture Slick windows then loops through extracting the data
// @copyright      2009-2010
// @include        http://www.thercg.org/*
// @include        http://*.thercg.org*
// @include        http://*.thercg.org/*

// ==/UserScript==
  function pageLoad() {


var anchors = document.getElementsByTagName('a');

for (var i=0; i<anchors.length; i++){
	var anchor = anchors[i];

	if (anchor.href == "javascript:void(0)"){
		anchor.id = "someId" + i;

		document.getElementById("someId" + i).onclick();
        }
}
	var dt = new Date();
	while ((new Date()) - dt <= 5000) { /* Do nothing */ }

alert("This messagebox needs to be here to pause the program, once it pops-up you can click okay.")

        var txtScripture; 
        $(".winContent").each( function () {
            txtScripture += "<p>" + 'Verse: ' + $(this).parent().children(".winBar").html() +  'Scripture: ' + $(this).html()  + "</p>";
 
           // alert($(this).parent().children(".winBar").html());
        });
	$('body').empty();
	$('body').append(txtScripture);
  }
