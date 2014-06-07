// ==UserScript==
// @name        Remove subscription overlay on The Age website
// @namespace   http://localhost/the-age-subscription-overlay-remover
// @description Remove the subscription overlay from articles on theage.com.au
// @include     http://*theage.com.au/*
// @grant       none
// @version     1
// ==/UserScript==

function removeSubscriptionOverlay() {
    var subscriptionOverlay = document.getElementById('subscription-overlay');
    if (!subscriptionOverlay) {
        return;
    }

    subscriptionOverlay.parentNode.removeChild(subscriptionOverlay);

    // Paywalled articles set overflow:hidden on <html> to prevent scrolling
    var html = document.getElementsByTagName('html')[0];
    html.style.overflow = 'auto';
}
removeSubscriptionOverlay();