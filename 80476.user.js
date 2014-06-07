// ==UserScript==
// @name           Taringa sin publicidad
// @namespace      taringa, no, ads
// @include        *taringa.net*
// ==/UserScript==

function $(passedstring) {
	return document.querySelector(passedstring)
}

document.addEventListener('DOMContentLoaded', function() {

	//Pagina principal
//	if($('#cuerpocontainer > #derecha')) $('#cuerpocontainer > #derecha').parentNode.removeChild($('#cuerpocontainer > #derecha'))
	if($('#google_ads_iframe_tar_h_468_general')) $('#google_ads_iframe_tar_h_468_general').parentNode.removeChild($('#google_ads_iframe_tar_h_468_general'))
	if($('#google_ads_div_tar_h_250_general')) {
		//Primera propaganda
		$('#google_ads_div_tar_h_250_general').parentNode.removeChild($('#google_ads_div_tar_h_250_general'))
		$('#cuerpocontainer > #derecha > .box_cuerpo').parentNode.removeChild($('#cuerpocontainer > #derecha > .box_cuerpo'))
		//Segunda propaganda
		$('#google_ads_div_tar_h_160_general').parentNode.removeChild($('#google_ads_div_tar_h_160_general'))
		$('#cuerpocontainer > #derecha > .box_cuerpo').parentNode.removeChild($('#cuerpocontainer > #derecha > .box_cuerpo'))
		if($('#google_ads_div_tar_h_250x170')) $('#google_ads_div_tar_h_250x170').parentNode.removeChild($('#google_ads_div_tar_h_250x170'))
	}
	
	//Posts
	if($('.byGoogle')) $('.byGoogle').parentNode.removeChild($('.byGoogle'))
	if($('.socialAds')) $('.socialAds').parentNode.removeChild($('.socialAds'))
	if($('.banner')) $('.banner').parentNode.removeChild($('.banner'))
	if($('.banner-300')) $('.banner-300').parentNode.removeChild($('.banner-300'))
	
	//Pagina principal de Comunidades
	if($('#google_ads_iframe_tar_ch_160_general')) $('#google_ads_iframe_tar_ch_160_general').parentNode.removeChild($('#google_ads_iframe_tar_ch_160_general'))
	
	//Temas
	if($('#google_ads_iframe_tar_c_120_diversion-esparcimiento')) $('#google_ads_iframe_tar_c_120_diversion-esparcimiento').parentNode.removeChild($('#google_ads_iframe_tar_c_120_diversion-esparcimiento'))
	
	// taringa.net/clima
	if($('#google_ads_div_tar_g_300_clima')) $('#google_ads_div_tar_g_300_clima').parentNode.removeChild($('#google_ads_div_tar_g_300_clima'))
	
}, false)