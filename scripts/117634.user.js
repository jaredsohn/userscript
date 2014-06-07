// ==UserScript==
// @name           AiClassScrollbars
// @description    Add scrollbars to the list of units on ai-class.com
// @include        https://www.ai-class.com/course/video/videolecture/*
// @include        https://www.ai-class.com/course/video/quizquestion/*
// ==/UserScript==
id = document.getElementById("left_col");
id.style.height = '500px';
id.style.overflow = 'auto';
