// ==UserScript==
// @name       Sassjolras
// @namespace  alexajane
// @version    0.7
// @description  Feed the fangirls.
// @include    *
// @copyright  2014+, Alexajane
// ==/UserScript==

var fangirl = new Array();
fangirl[0] = "http://25.media.tumblr.com/5e9cf416bfb0a173dbc59a25e76ce5e4/tumblr_ml7y0wPKke1s6do96o1_500.jpg";
fangirl[1] = "http://24.media.tumblr.com/0558af899c55b187711cec4719e6ef4f/tumblr_mjmf8cMwSO1s6do96o1_500.jpg";
fangirl[2] = "http://31.media.tumblr.com/3040169f61503f8a8531afd8140e987a/tumblr_mknpiurRcr1s6do96o1_1280.jpg";
fangirl[3] = "http://31.media.tumblr.com/cce4b1398a536c55da2765712faeec9d/tumblr_mirapfpnC11s6do96o1_500.jpg";
fangirl[4] = "http://24.media.tumblr.com/bf690ccd8fa1a8de84c664fcc45ed32b/tumblr_mlqjzv8wJL1s6do96o1_500.jpg";
fangirl[5] = "http://31.media.tumblr.com/af2468f664032386987e75908607ef89/tumblr_mjd6bd2cRv1s6do96o1_500.jpg";
fangirl[6] = "http://25.media.tumblr.com/a0cef96757631349694917983bd52005/tumblr_ml9tdmasno1s6do96o1_500.jpg";
fangirl[7] = "http://24.media.tumblr.com/3ac23f4f4ed8eb7cdce99eeb96662d08/tumblr_mrg3hi6jAf1s6do96o1_500.jpg";
fangirl[8] = "http://25.media.tumblr.com/1596e6845ed1578e1ca5f97a83772231/tumblr_mnq804hMoE1s6do96o1_500.jpg";
fangirl[9] = "http://25.media.tumblr.com/764d4e5230188552cfa25cff856913c9/tumblr_mnov4u9Xk01s6do96o1_500.jpg";
fangirl[10] = "http://25.media.tumblr.com/926aa569702460c45e575f17c1804e5a/tumblr_mpfvv1acpg1s6do96o1_500.jpg";
fangirl[11] = "http://media-cache-ec0.pinimg.com/236x/ab/11/9c/ab119c1eea97ff5c8051257ab329ef8a.jpg";
fangirl[12] = "http://24.media.tumblr.com/75139755e0296478c970a79a37d1891e/tumblr_mnq7o4g8d61s6do96o1_500.jpg";
fangirl[13] = "http://25.media.tumblr.com/347f663bdf971980cc64a6be3a3be7df/tumblr_miaai2LIDx1r8cua2o1_500.jpg";
fangirl[14] = "http://25.media.tumblr.com/3f80205817e57743081ec6a25e8acb99/tumblr_mj64bjYDrn1s6do96o1_500.jpg";
fangirl[15] = "http://media-cache-ec0.pinimg.com/736x/5b/b5/eb/5bb5ebbb1f7aface552d4b40ef86594c.jpg";
fangirl[16] = "http://25.media.tumblr.com/896b486af6c83062af76ae20c021029b/tumblr_ml805iVnYF1s6do96o1_500.jpg";
fangirl[17] = "http://25.media.tumblr.com/347e038e28144e5150a4a5d5e061be1a/tumblr_mjj3muPLJW1s6do96o1_500.jpg";
fangirl[18] = "http://31.media.tumblr.com/ab558953d97335595d26add64d4d27a8/tumblr_mjihnhHLEq1s6do96o1_500.jpg";
fangirl[19] = "http://31.media.tumblr.com/07c50ab30939e88d89d5d25e76ce9625/tumblr_ml80hjoIsn1s6do96o1_500.jpg";
fangirl[20] = "http://25.media.tumblr.com/9439c6f5243fc16cb0938feeca8f0dc5/tumblr_mlqk2dgoG61s6do96o1_500.jpg";
fangirl[21] = "http://media.tumblr.com/0e2fe1db538251e98892643eced961cd/tumblr_inline_msbjzdwnvI1r4wam2.jpg";
fangirl[22] = "http://24.media.tumblr.com/4c20334e54d3b3e10124bba3612a8d16/tumblr_mnq810mBTn1s6do96o1_500.jpg";
fangirl[23] = "http://24.media.tumblr.com/2f834fa965a9f4ab41e547d10b82b6be/tumblr_mq21k0KJGc1s6do96o1_500.jpg";
fangirl[24] = "http://25.media.tumblr.com/585720486c5f7973b70eaf6b470a97e6/tumblr_mjmf62UGcj1s6do96o1_500.jpg";
fangirl[25] = "http://25.media.tumblr.com/85ff5f68733db5e12bfc714217f4d3cc/tumblr_mjvosoPQW41s6do96o1_500.jpg";


var last_number = 0;

var images = document.getElementsByTagName("img");
for(var i = 0; i < images.length; i++){
    var min_number = 0;
    var max_number = fangirl.length;
    var random = Math.floor(Math.random() * (max_number - min_number + 1)) + min_number;
    
    if(last_number == random)
        random = Math.floor(Math.random() * (max_number - min_number + 1)) + min_number;
    
    images[i].src = fangirl[random];
    last_number = random;
}
