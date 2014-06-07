// ==UserScript==
// @id             Auto-Redirecting for IEEE (NUS libproxy)
// @name           Auto-Redirecting for IEEE (NUS libproxy)
// @version        1.0
// @namespace      Auto-Redirecting for IEEE (NUS libproxy)
// @author         loms
// @description    auto click link after "Your organization might have access to this article on the publisher's site. To check, click on this link:"
// @include        http://ieeexplore.ieee.org.libproxy1.nus.edu.sg/*
// @run-at         document-end
// ==/UserScript==

element_a = document.querySelector('div[class=section]>p>a');
if (element_a && element_a.href.search('nus.edu.sg')>0)
{
    element_a.target="_self";
    element_a.click();
}