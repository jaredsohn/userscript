// ==UserScript==
// @name           TestforJQueryUI
// @namespace      http://userscripts.org/scripts/show/70543
// @description    Test
// @include        *
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @require       http://ajax.googleapis.com/ajax/libs/jqueryui/1.7.2/jquery-ui.min.js
// @require       http://courses.ischool.berkeley.edu/i290-4/f09/resources/gm_jq_xhr.js
// @require       http://userscripts.org/scripts/source/70452.user.js
// @resource       jquery-ui-1.7.2.custom.css http://dl.dropbox.com/u/1130474/JQuery/css/custom-theme/jquery-ui-1.7.2.custom.css
// @resource       ui-bg_flat_0_aaaaaa_40x100.png http://dl.dropbox.com/u/1130474/JQuery/css/custom-theme/images/ui-bg_flat_0_aaaaaa_40x100.png
// @resource       ui-bg_flat_75_f2f2f2_40x100.png http://dl.dropbox.com/u/1130474/JQuery/css/custom-theme/images/ui-bg_flat_75_f2f2f2_40x100.png
// @resource       ui-bg_glass_75_e6e6e6_1x400.png http://dl.dropbox.com/u/1130474/JQuery/css/custom-theme/images/ui-bg_glass_75_e6e6e6_1x400.png
// @resource       ui-bg_highlight-hard_55_f4e280_1x100.png http://dl.dropbox.com/u/1130474/JQuery/css/custom-theme/images/ui-bg_highlight-hard_55_f4e280_1x100.png
// @resource       ui-bg_highlight-soft_25_1f1f1f_1x100.png http://dl.dropbox.com/u/1130474/JQuery/css/custom-theme/images/ui-bg_highlight-soft_25_1f1f1f_1x100.png
// @resource       ui-bg_highlight-soft_35_d9d9d9_1x100.png http://dl.dropbox.com/u/1130474/JQuery/css/custom-theme/images/ui-bg_highlight-soft_35_d9d9d9_1x100.png
// @resource       ui-bg_highlight-soft_75_a3a3a3_1x100.png http://dl.dropbox.com/u/1130474/JQuery/css/custom-theme/images/ui-bg_highlight-soft_75_a3a3a3_1x100.png
// @resource       ui-bg_inset-soft_55_f34451_1x100.png http://dl.dropbox.com/u/1130474/JQuery/css/custom-theme/images/ui-bg_inset-soft_55_f34451_1x100.png
// @resource       ui-icons_1b2e3b_256x240.png http://dl.dropbox.com/u/1130474/JQuery/css/custom-theme/images/ui-icons_1b2e3b_256x240.png
// @resource       ui-icons_5c5c5c_256x240.png http://dl.dropbox.com/u/1130474/JQuery/css/custom-theme/images/ui-icons_5c5c5c_256x240.png
// @resource       ui-icons_1973f5_256x240.png http://dl.dropbox.com/u/1130474/JQuery/css/custom-theme/images/ui-icons_1973f5_256x240.png
// @resource       ui-icons_242424_256x240.png http://dl.dropbox.com/u/1130474/JQuery/css/custom-theme/images/ui-icons_242424_256x240.png
// @resource       ui-icons_424242_256x240.png http://dl.dropbox.com/u/1130474/JQuery/css/custom-theme/images/ui-icons_424242_256x240.png
// @resource       ui-icons_e9302b_256x240.png http://dl.dropbox.com/u/1130474/JQuery/css/custom-theme/images/ui-icons_e9302b_256x240.png
// @resource       ui-icons_ededed_256x240.png http://dl.dropbox.com/u/1130474/JQuery/css/custom-theme/images/ui-icons_ededed_256x240.png
// ==/UserScript==
(function() {
    
 var resources = {
      'ui-bg_flat_0_aaaaaa_40x100.png': GM_getResourceURL("ui-bg_flat_0_aaaaaa_40x100.png"),
      'ui-bg_flat_75_f2f2f2_40x100.png': GM_getResourceURL('ui-bg_flat_75_f2f2f2_40x100.png'),
      'ui-bg_glass_75_e6e6e6_1x400.png': GM_getResourceURL('ui-bg_glass_75_e6e6e6_1x400.png'),
      'ui-bg_highlight-hard_55_f4e280_1x100.png': GM_getResourceURL('ui-bg_highlight-hard_55_f4e280_1x100.png'),
      'ui-bg_highlight-soft_25_1f1f1f_1x100.png': GM_getResourceURL('ui-bg_highlight-soft_25_1f1f1f_1x100.png'),
      'ui-bg_highlight-soft_35_d9d9d9_1x100.png': GM_getResourceURL('ui-bg_highlight-soft_35_d9d9d9_1x100.png'),
      'ui-bg_highlight-soft_75_a3a3a3_1x100.png': GM_getResourceURL('ui-bg_highlight-soft_75_a3a3a3_1x100.png'),
      'ui-bg_inset-soft_55_f34451_1x100.png': GM_getResourceURL('ui-bg_inset-soft_55_f34451_1x100.png'),
      'ui-icons_1b2e3b_256x240.png': GM_getResourceURL('ui-icons_1b2e3b_256x240.png'),
      'ui-icons_5c5c5c_256x240.png': GM_getResourceURL('ui-icons_5c5c5c_256x240.png'),
      'ui-icons_1973f5_256x240.png': GM_getResourceURL('ui-icons_1973f5_256x240.png'),
      'ui-icons_242424_256x240.png': GM_getResourceURL('ui-icons_242424_256x240.png'),
      'ui-icons_424242_256x240.png': GM_getResourceURL('ui-icons_424242_256x240.png'),
      'ui-icons_e9302b_256x240.png': GM_getResourceURL('ui-icons_e9302b_256x240.png'),
      'ui-icons_ededed_256x240.png': GM_getResourceURL('ui-icons_ededed_256x240.png')
    };    
    

var css = GM_getResourceText('jquery-ui-1.7.2.custom.css');

//console.log(resources);
console.log('resources');
//$.each(resources, function(resourceName, resourceUrl) {
//      console.log(resourceName + ': ' + resourceUrl);
//      css = css.replace( 'images/' + resourceName, resourceUrl);
//    });

//res = GM_getResourceURL("ui-bg_flat_0_aaaaaa_40x100.png");
});