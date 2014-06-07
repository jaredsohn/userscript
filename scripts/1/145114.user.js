// ==UserScript==
// @name		infowars.com ad blocker
// @namespace	http://infowars.com
// @include		*infowars.com*
// @grant		none
//

// ==/UserScript==
jQuery(function($) {
    var $promo_ad = $('#paul_contest');
    $promo_ad.hide();
    var $ads = $('#nBodyRight');
    var space = $ads.width();
    $ads.add('.nBannerAd')
        .add('#nHeader > div.floatLeft')
        .add('#nHeader > div.floatRight')
        .hide();
    
    var $content = $('#nBodyLeft');
    $('#nContainer')
            .add('#nBody')
            .add('#nHeader')
            .add('#nHeaderLogo')
            .add('#nHeaderNavigation')
            .add('#nFooter')
            .add($promo_ad.parent()).each(function(i, elm) {
        var $this = $(this);
        $this.width($this.width() - space);
    });
    $('#nHeaderNavigation').css('top', '100px');
    $('#nHeaderLogo img').width($('#nContainer').width());
});
