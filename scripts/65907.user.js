// ==UserScript==
// @name           Autoupdate
// @namespace      by
// @description    Simonz1
// @include        http://*.nettby.*
// ==/UserScript==

function removeElement(http://img.nettby.no/img/statistics.gif) {
  var d = document.getElementBySrc('http://img.nettby.no/img/statistics.gif');
  var olddiv = document.getElementBySrc(http://img.nettby.no/img/statistics.gif);
  d.removeChild(olddiv);
}

var notificator = new alertNotification();

notificator.register('action_log', function(alerts) {
if (alerts > 0) {
$('notificator_action_log').update(' ('+alerts+')');
} else {
$('notificator_action_log').update('');
}
});

notificator.register('action_log_private', function(alerts) {
if (alerts > 0) {
$('notificator_action_log_private').update(' ('+alerts+')');
} else {
$('notificator_action_log_private').update('');
}
});

notificator.register('status_message', function(alerts) {
if (alerts > 0) {
$('notificator_status_message').update(' ('+alerts+')');
} else {
$('notificator_status_message').update('');
}
});

notificator.register('im', function(alerts) {
var new_plural = 'lynmeldinger';
var new_singular = 'lynmelding';

if (alerts > 0) {
if (alerts > 1) {
$('notificator_im').down(1).update(alerts+' '+new_plural);
} else {
$('notificator_im').down(1).update(alerts+' '+new_singular);
}
$('notificator_im').setStyle({'display': 'block'});
} else {
$('notificator_im').setStyle({'display': 'none'});
}
});

notificator.register('message', function(alerts) {
var new_plural = 'nye brev';
var new_singular = 'nytt brev';

if (alerts > 0) {
if (alerts > 1) {
$('notificator_message').down(1).update(alerts+' '+new_plural);
} else {
$('notificator_message').down(1).update(alerts+' '+new_singular);
}
$('notificator_message').setStyle({'display': 'block'});
} else {
$('notificator_message').setStyle({'display': 'none'});
}
});

notificator.register('guestbook', function(alerts) {
var new_plural = 'nye gjestebok';
var new_singular = 'ny gjestebok';

if (alerts > 0) {
if (alerts > 1) {
$('notificator_guestbook').down(1).update(alerts+' '+new_plural);
} else {
$('notificator_guestbook').down(1).update(alerts+' '+new_singular);
}
$('notificator_guestbook').setStyle({'display': 'block'});
} else {
$('notificator_guestbook').setStyle({'display': 'none'});
}
});

notificator.register('friend_request', function(alerts) {
var new_plural = 'nye venner';
var new_singular = 'ny venn';

if (alerts > 0) {
if (alerts > 1) {
$('notificator_friend_request').down(1).update(alerts+' '+new_plural);
} else {
$('notificator_friend_request').down(1).update(alerts+' '+new_singular);
}
$('notificator_friend_request').setStyle({'display': 'block'});
} else {
$('notificator_friend_request').setStyle({'display': 'none'});
}
});


notificator.register('tag_request', function(alerts) {
var new_plural = 'nye tagger';
var new_singular = 'ny tag';

if (alerts > 0) {
if (alerts > 1) {
$('notificator_tag_request').down(1).update(alerts+' '+new_plural);
} else {
$('notificator_tag_request').down(1).update(alerts+' '+new_singular);
}
$('notificator_tag_request').setStyle({'display': 'block'});
} else {
$('notificator_tag_request').setStyle({'display': 'none'});
}
});

notificator.register('relationship_request', function(alerts) {
var new_plural = 'nye forhold';
var new_singular = 'nytt forhold';

if (alerts > 0) {
if (alerts > 1) {
$('notificator_relationship_request').down(1).update(alerts+' '+new_plural);
} else {
$('notificator_relationship_request').down(1).update(alerts+' '+new_singular);
}
$('notificator_relationship_request').setStyle({'display': 'block'});
} else {
$('notificator_relationship_request').setStyle({'display': 'none'});
}
});
