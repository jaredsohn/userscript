// ==UserScript==
// @name           Remove Shared Analytics Accounts
// @namespace      http://www.designfox.org
// @description    Removes unwanted shared analytics accounts
// @include        https://www.google.com/analytics/*
// ==/UserScript==

//Put your shared accounts here, like "profile:123456", "profile:234567" etc
var unwantedAccounts = new Array("profile:123456", "profile:234567");

window.addEventListener ("load", function() {
        unsafeWindow.removeAccount = function() {



                function checkLoading() {
                isItLoading = document.getElementsByClassName('loading');
                        if (isItLoading.length > 1) {

                                window.setTimeout('removeAccount()', 200);
                        } else {
                                       
										
                                        for (x in unwantedAccounts) {
                                                unwantedAccountDiv = document.getElementById(unwantedAccounts[x]);
                                                if (unwantedAccountDiv) {
                                                        unwantedParent = unwantedAccountDiv.parentNode;
                                                        unwantedParentParent = unwantedParent.parentNode;
                                                        if (unwantedParentParent) {
                                                                unwantedParentParent.style['display'] = 'none';
                                                        }
                                                }
                                        }
                        }
                }
                checkLoading();
        }





    window.setTimeout('removeAccount()', 200);
        

}, false);