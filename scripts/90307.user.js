// ==UserScript==
// @author         Hic2h
// @name           GreenZoner Auto-Login
// @namespace      *greenzoner*
// @include        *greenzoner*
// ==/UserScript==
var email = "email@hic2h"
var password = "password-here"
document.getElementById('fLogin').value = email
document.getElementById('fPass').value = password
document.getElementById('fSubmitLogin').click()
