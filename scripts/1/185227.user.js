// ==UserScript==
// @name        Economist
// @namespace   economist
// @include     http://www.economist.com/
// @version     1
// @grant       none

// ==/UserScript==

var script = document.createElement('script');script.src = "https://ajax.googleapis.com/ajax/libs/jquery/1.6.3/jquery.min.js";document.getElementsByTagName('head')[0].appendChild(script);

// mpu economist
$('#block-ec_ads-bottom_right_mpu_ad .content .ec-ads').html('<p class="ec-ads-label">Advertisement</p>');
var economist = document.createElement('iframe');
economist.height = 250;
economist.width = 300;
economist.src = "http://s3.amazonaws.com/tags.digitaleditions/economist-mpu.html"
$('#block-ec_ads-bottom_right_mpu_ad .content .ec-ads,block-ec_ads-bottom_mpu_ad .content .ec-ads').append(economist);

// mpu ibtimes
var ibtimes = document.createElement('iframe');
ibtimes.height = 250;
ibtimes.width = 300;
ibtimes.src = "http://s3.amazonaws.com/tags.digitaleditions/ibtimes-mpu.html"
$(".ads_rectangle.mg_b15").last().html(ibtimes);


// mpu kiplinger
var ibtimes = document.createElement('iframe');
ibtimes.height = 250;
ibtimes.width = 300;
ibtimes.src = "http://s3.amazonaws.com/tags.digitaleditions/kiplinger-mpu.html"
$(".kip-advertisement").last().html(ibtimes);


//mpu nymag
var nymag = document.createElement('iframe');
nymag.height = 250;
nymag.width = 300;
nymag.src = "http://s3.amazonaws.com/tags.digitaleditions/nymag-mpu.html"
$("#DFP-bottom-todo").last().html(nymag);

// mpu technology review
var tr = document.createElement('iframe');
tr.height = 250;
tr.width = 300;
tr.src = "http://s3.amazonaws.com/tags.digitaleditions/technologyreview-mpu.html"
$("#dfp-ad-tr_www_body_content_portrait_in_story-wrapper,#dfp-ad-tr_www_body_rail_right_bottom_portrait_only_300x250-wrapper, #dfp-ad-tr_www_body_rail_right_top_portrait_only_300x250-wrapper").last().html(tr);





