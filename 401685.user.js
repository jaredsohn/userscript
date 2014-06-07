// ==UserScript==
// @name        kfo
// @namespace   komisaki
// @description 233
// @include     /^http://bbs.9(gal|baka).com\.*/
// @version     1
// @grant       none
// @require     http://jqueryjs.googlecode.com/files/jquery-1.3.2.min.js
// ==/UserScript==



var bgis=["https://farm3.staticflickr.com/2837/12902221814_4539ff8b18_o.jpg","https://farm8.staticflickr.com/7436/12901887795_3570c51af5_o.jpg","https://farm4.staticflickr.com/3786/12901904393_5d7761ed81_o.jpg","https://farm4.staticflickr.com/3817/12902282454_e430266bef_o.jpg","https://farm8.staticflickr.com/7325/12901722415_2f560b28a0_o.jpg","https://farm4.staticflickr.com/3739/12902272064_cc3ca27ec2_o.jpg","https://farm4.staticflickr.com/3717/12901841395_9816383cb6_o.jpg","https://farm4.staticflickr.com/3750/12902254714_5b6db9d0be_o.jpg","https://farm3.staticflickr.com/2824/12902247744_5c25a842ab_o.jpg","https://farm8.staticflickr.com/7299/12902240234_60e353e5bc_o.jpg","https://farm4.staticflickr.com/3730/12901788435_aec7b5415a_o.jpg","https://farm4.staticflickr.com/3768/12902203684_8ae2a79af7_o.jpg","https://farm4.staticflickr.com/3783/12901828253_1f8444dcb4_o.jpg","https://farm4.staticflickr.com/3703/12901868713_ea1cbd6452_o.jpg"];

var dt=new Date();
var h=dt.getHours(),m=dt.getMinutes();

var img="url('"+bgis[Math.floor((h*60+m)/5)%bgis.length]+"')";
$("body").css({"background-image":img,"background-attachment":"fixed"});
$('#top80').remove();
$('#alldiv').css("background-color",rgb2rgba($("#alldiv").css("background-color"),0.7));

function rgb2rgba(rgb,opc)
{
    var cl=rgb.replace(')',", "+opc+")");
    cl=cl.replace('rgb','rgba');
    return cl;
}