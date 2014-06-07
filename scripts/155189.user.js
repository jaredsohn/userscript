// ==UserScript==
// @id             stdownvote
// @name           synchtube downvote
// @version        1.0
// @namespace      
// @author         GrixM
// @description    Allows one to vote down videos on all synchtube rooms
// @include        http://www.synchtube.com/r/*
// @run-at         document-end
// ==/UserScript==

document.getElementById("votedown").innerHTML = '<span><img src="/images/icons/arrow_down.png"></span>';
document.getElementById('votedown').style.display = 'block';