// ==UserScript==
// @name           Funnyness in a bottle 
// @namespace           PullJosh
// @description    This script changes some of the words on the scratch website. For example, person changes to living toaster.
//@include         scratch.mit.edu/*
//@exclude         scratch.mit.edu/projects/*
// ==/UserScript==

document.body.innerHTML = document.body.innerHTML.replace(/yes/gi, "yep");
document.body.innerHTML = document.body.innerHTML.replace(/neigh/gi, "some horse that will destroy scratch");
document.body.innerHTML = document.body.innerHTML.replace(/gone/gi, "never to be seen again");
document.body.innerHTML = document.body.innerHTML.replace(/facepalm/gi, "a smack to my face with my hand");
document.body.innerHTML = document.body.innerHTML.replace(/person/gi, "living toaster");
document.body.innerHTML = document.body.innerHTML.replace(/javascript/gi, "java... in a script");
document.body.innerHTML = document.body.innerHTML.replace(/pizza/gi, "a round, very yummy, thing that has sause and cheese");
