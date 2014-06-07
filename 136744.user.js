// ==UserScript==
// @name        Difference points
// @namespace   arreloco
// @include     http://www.kongregate.com/accounts/*
// @version     1
// ==/UserScript==

script = 'pts = document.getElementsByClassName("user_metric_stat")[1].childNodes[0].childNodes[0].innerHTML;difference = unsafeWindow.active_user._attributes._object.points-parseInt(pts);document.getElementsByClassName("user_metric_stat")[1].childNodes[0].innerHTML+= "<p style=\"color:#900\">("+difference+")</p>";';
document.getElementsByTagName("head")[0].innerHTML += "<script>"+script+"</script>";