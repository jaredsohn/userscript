// ==UserScript==
// @name           SAY YES!
// @namespace           coolgem923
// @description    Replaces most words meaning yes, to yes. Suggest features!
//@include         *
//@exclude         userscripts.org
// ==/UserScript==

document.body.innerHTML = document.body.innerHTML.replace(/uh huh/gi, "yes");
document.body.innerHTML = document.body.innerHTML.replace(/yep/gi, "yes");
document.body.innerHTML = document.body.innerHTML.replace(/yeah/gi, "yes");
document.body.innerHTML = document.body.innerHTML.replace(/okie dokie/gi, "yes");
document.body.innerHTML = document.body.innerHTML.replace(/ya/gi, "yes");
document.body.innerHTML = document.body.innerHTML.replace(/yea/gi, "yes");
document.body.innerHTML = document.body.innerHTML.replace(/yup/gi, "yes");
document.body.innerHTML = document.body.innerHTML.replace(/absolutely/gi, "yes");