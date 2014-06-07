// ==UserScript==
// @name           WykopFM
// @namespace      soplowy
// @include        http://*.wykop.pl/*
// ==/UserScript==
// Credits: @soplowy (code), @zordziu (gfx), @Famina
if (unsafeWindow.jQuery) {
	var $ = unsafeWindow.jQuery;
	append();
} else {
	addJQuery(append);
}
function append() {
	var css = '<style type="text/css">.icon.wykopfm{background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAsCAYAAABVLInsAAAAB3RJTUUH3QwVDhQA5HMVogAAAAlwSFlzAAAN1gAADdYBkG95nAAAAARnQU1BAACxjwv8YQUAAAJqSURBVHjatZRdSBRRFMfvzA6FFtL2IoX6Vq9FCoE+FD75KPQW+rpSEYQ9SCAohkFvmhAIJigYKG1Bumxl0RZBrKasoutHLiR+FKZrHwuL6965/s86AzbNrHMHPPDfc87d+d17z70zhzEH45y3CiEKmKzpui5GovE35Tc75GACU+kd0dQT6pAGSRvbf/X2p+9qpEHS0tpm5kZn8Lxr8PqDAT0Ujefgj9OJbdRb6ArEgzp08eHg+8jO7q4YjMSmXINm/mp8/lGWc4FJeqRAsvWt3/HXXxZoF9WqzEmfOV3UVXGuJIMwIAXCwseP+dLwlbJgoU9VlyiQBUsXVzefwS9rMhQO7Gpj9/AnhGv/rIivoRg6YQdhvFpV1eCvVLoK6ZBqDJbhM+qDX4dSnOtJC+SD26i41VkE/3zi8Z2MhkE/NKUoyinzQUVh/vmVn1mEvv1c4bi7OYoBzZDXsO+7ByHTPse/Uf1jZg6Aw82YuQqowa6m6MKKgHvrdFBU46x1MBSdY5NfVykcdQI1rBj4kfwT47ooSHzfYqhNPAmP4UBYP/7/4AQq9IPC6SMdpomMHUxA7agrK3PPzJisJV+jyvfKtUC3vYBkzdQBvIAnoRHApbIg2VnopbVRHQZeggagC1CvaxDXEYPqEV6DarHqPZmt0gQv4OjVvE+NyjVowH1wESggBRoWhCq9gGGpGg8YXcmyF5BehG4v4BVo6D8QR10M2XY54xpyjYpyzRgsg2uD6mgy5EkLlOtyZqMiUzDoh09A1oY1jgcvO+2ZttpoA5E5NioTbHD4b/QwcNZmPG+jMg+HVrRrVIIdhe0B4LwydfCn354AAAAASUVORK5CYII=);height:22px;width:14px;}body.nightmode .icon.wykopfm{background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAsCAYAAABVLInsAAAAB3RJTUUH3QwVDygAlkIGagAAAAlwSFlzAAAN1gAADdYBkG95nAAAAARnQU1BAACxjwv8YQUAAAJdSURBVHjanZRBiBJhFMe/nV2FLNK8LAS7NxO8ZHkINmFBCLru0VPSQW8d9hB0kD1FeI08BCFjEMhSe6hkod3ListKGXXYSRACR8mDFGoJ6eA4/Z/MhE0z7nw++PO+742/ee993/gYszFFUXagc4zXAE1KpdK7RCJhCQvz4HA4fCsSiTzizjgajbROpzPJ5XK3uUFSo9FQMpnMFcdgOp2mPqdwtVrtol+Pox5brRZDmdcKhcJRKBTyxePxE0cZkWFi7Mvl8uPhcKjl8/lnZ2actWg0eq/X630JBAJ38cKYY5DM7/c/CQaDIyyTXCBs3+Vy/Ybf4AU9giB85epRtzWc9Et4eYUT3Mxms8fw3/7JiCtYhc5bEYjH4PYGg8FN+F1BD65DIr0J+oUv5YcJWobrJJPJiwSLoqisIHgJm8+QT9O0JePkZVkewxPA3G63irur0RrQKXnqcdsETU2SJHr23tgDUOFOjT2VmjJDZLVaTYM7tDslAiVzsFKpsHq9TssDO5DKSXW73U+qqnra7TZrNptasVhkqOI5nh3ZgdMS0Tj9Sd/oL6IKPkIP0deY854Z6/f7OxD/lAM0ge4vCv6EwnanOs8uQG8Br/GCZJeh14A9POB16AV0Fco57nFmvQUNoQdcoL6/A42hGBeoxw6hgtPDmbVX0MYi4L7TUzUbXYm8CEgfwtNFwE1o9z8QJ7YKWU45/Rr2vF6v8hdEcB0SmT7lsP5ugqZTDlDViC0hSFOOxrrPlOQDfnjDrmbKuG0BkdkOKgNM2Tw7OAuULOJzB5XRo+WgQn/8g8qJ/QFHAU1KC+KasQAAAABJRU5ErkJggg==);}a:hover .icon.wykopfm{background-position:0 -22px;}</style>';
	var html = '<div class="quickpoint fright"><a href="http://www.wykopfm.pl/" class="fright cfff tdnone quickicon tcenter zi2 rel" title="Radio WykopFM - jedyne takie radio" target="_blank"><span class="icon inlblk wykopfm"><span>WykopFM</span></span></a></div>';
	$('body').append(css);
	$('nav.main.medium.rel').append(html);
}
function addJQuery(callback) {
	var script = document.createElement("script");
	script.textContent = "(" + callback.toString() + ")();";
	document.body.appendChild(script);
}
