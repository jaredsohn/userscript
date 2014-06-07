// ==UserScript==
// @name          TheSixtyOne Growl Notifications
// @description   TheSixtyOne
// @author        John Rees
// @include       http://*thesixtyone.com/*
// ==/UserScript==

if (t61.is_logged_in) {
window.fluid.showGrowlNotification({
    title: "logged in", 
    description: t61.points.cur_points + "points", 
    priority: 1, 
    sticky: false,
    identifier: "foo"
});
}

if(t61._bump_in_progress) {
alert('ahh');
}

t61.notice.create("Arses.");