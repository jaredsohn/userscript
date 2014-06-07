// ==UserScript==
// @name        CodeProject
// @namespace   http://www.codeproject.com/
// @include     http://www.codeproject.com/*
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==

/* just a quickhack... nothing fancy */

/* mostly mainpage */
var banner         = $(".banner.fluid");
var actiontiles    = $(".action-tiles td");
var extendedpadded = $(".extended.padded");

banner.css("margin-top","-11px");
actiontiles.remove();
extendedpadded.css("padding", "0");

var contentlistheader    = $(".content-list-header");
var articleicon          = contentlistheader.find("h2 img:first");
var articleheader        = contentlistheader.find("h2");
var contentitem          = $("#Articles .content-list-item");
var contentitemtitle     = contentitem.find(".title");
var featurearticleheader = $(".feature-article .header");
var articlesflyout       = $(".tooltip-flyout.category-list.article-types");
var categoriesflyout     = $(".tooltip-flyout.category-list");

contentlistheader.css("font-size", "18px");
contentlistheader.css("height", "35px");
contentitem.css("margin", "0");
//contentitemtitle.css("background-color", "#FF9900");
featurearticleheader.css("margin-bottom", "0px");
articlesflyout.css("margin", "5px");
categoriesflyout.css("margin", "5px");
articleicon.remove();
articleheader.css("font-size", "18px");

var messagecount = $(".count");
var messageitem  = $(".message-list-item");

messagecount.css("padding", "0 0 2px");
messageitem.css("padding", "0 0 2px");

var surveybrief    = $(".survey.brief");
var surveycontent  = $(".survey .content");
var surveyquestion = $(".survey .question td");

surveybrief.css("padding", "2px");
surveycontent.css("padding", "0 3px 3px");
surveyquestion.css("padding", "0");


/* our beloved posts */
var subjectline        = $(".subject-line");
var subjectlineindent  = subjectline.find(".indent");
var subjectlinesubject = subjectline.find(".subject");
var subjectlineicon    = subjectline.find(".icon");
var subjectlineauthor  = subjectline.find(".author");
var subjectlinedate    = subjectline.find(".date");

subjectlineindent.css("padding", "0 5px 0 0");
subjectlinesubject.css("padding", "0 0 0px");
subjectlinesubject.css("font-size", "12px");
subjectlineicon.css("padding", "0");
subjectlineauthor.css("padding", "0 0 0 2px");
subjectlinedate.css("padding", "0");

