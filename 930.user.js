/*
BDGest Sidebar Removal - v1.2 18/04/2005
Copyright (c) 2005, Olivier Dehaybe http://www.dehaybe.be/
Released under the GPL http://www.gnu.org/copyleft/gpl.html

This is a Greasemonkey user script, see http://greasemonkey.mozdev.org/.

On BDGest.com, the left sidebar can be quite annoying but also contains some
useful information. So this script adds an icon (angry chef) on top of
BDGest to hide and show the sidebar.

Other contributors: Flore Allemandou, Eric Darchis

V1.0, Olivier Dehaybe, First release
v1.1, Eric Darchis   , Fixed for GM 0.3 and FF 1.0.3
v1.2, Eric Darchis   , Image is not linking to dehaybe.be anymore

*/
// ==UserScript==
// @name			BDGest Sidebar Removal
// @namespace		http://www.dehaybe.be/brol/bdgest
// @description		Remove the left sidebar of BDGest
// @include			http://www.bdgest.com*
// ==/UserScript==

(function() {
	function EcrireCookie(nom, valeur)
	{
		var argv=EcrireCookie.arguments;
		var argc=EcrireCookie.arguments.length;
		var expires=(argc > 2) ? argv[2] : null;
		var path=(argc > 3) ? argv[3] : null;
		var domain=(argc > 4) ? argv[4] : null;
		var secure=(argc > 5) ? argv[5] : false;
		document.cookie=nom+"="+escape(valeur)+
		((expires==null) ? "" : ("; expires="+expires.toGMTString()))+
		((path==null) ? "" : ("; path="+path))+
		((domain==null) ? "" : ("; domain="+domain))+
		((secure==true) ? "; secure" : "");
	}

	function getCookieVal(offset)
	{
		var endstr=document.cookie.indexOf (";", offset);
		if (endstr==-1) endstr=document.cookie.length;
		return unescape(document.cookie.substring(offset, endstr));
	}

	function LireCookie(nom)
	{
		var arg=nom+"=";
		var alen=arg.length;
		var clen=document.cookie.length;
		var i=0;
		while (i<clen)
		{
			var j=i+alen;
			if (document.cookie.substring(i, j)==arg) return getCookieVal(j);
			i=document.cookie.indexOf(" ",i)+1;
			if (i==0) break;
		}
		return null;
	}
	
	function toggle(){
		menu=-menu;
		EcrireCookie('BDGmenu',menu);
		affichage();
		return true;
	}

	function affichage() {
		if (menu==1) {
			putainDeMenuQuiChangeDePlaceToutLeTemps.style.display='table-cell';
		}
		else {
			putainDeMenuQuiChangeDePlaceToutLeTemps.style.display='none';
		}
	}

	var chefimg='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC0AAAAmCAYAAABQ3RJZAAAABmJLR0QA%2FwD%2FAP%2BgvaeTAAAACXBIWXMAAAs' + 
	'TAAALEwEAmpwYAAAAB3RJTUUH1QEUFioqwEcUeAAADuFJREFUeNrtmWuspVV5x39rrfeyr2fvffbeZ585Z87MmcsZLjMMA4wKI1DAItKJYlSCtLWlTaM0TWyM0T' +
	'atVYyN9PahprSxtrUmbSQmKkqsNwRkEEUGgRkYmJkzt3O%2F7rOv77vf61r9cNTEtlpFqV%2F6fF3vs95fnjx51n%2F9l%2BAVjnv%2B9B5x67XbMmkSmUNvvDv' +
	'4Rexp%2FTzJ77rrzTLVyrXcjCpli%2FRbLQK%2FT5zGXH%2FZBLdevZcnXupll%2Bab18fJQACf%2FaVC%2F8ndb5fdIJ5IUn21juK6tFLhIEmEIjaafj%2Bmt9' +
	'JnxETDvQX%2FlvWBV%2F6dO97y6L9%2B5vPNXwr0O3%2Fv10U7SrekqbkziuK3izAeKdsFUbBdAinphyF2L6VzromTant7lBYHbc%2BRQtwOfPz%2FFPob9%2F8' +
	'ls8tF27GXDx09dvatvY5%2FOIfcXnZsdSirGLFdjMiik5Q40eiuj69ThiybcqwpKHX7hY994rF6dfSlCzu7PP2908ItZORFU9scwtjq9zrKLhaST33iQX%2FvJa' +
	'Nmz9Qo1WrRHHzD%2B14e9Htuv0OcOr1UqNTdG5KN9AOVWB90sOW%2BUpbJjM3WbJb8kI0TpthBglYpy2FEmmqETBjIEGuQXr64vnGbq3KLZ0%2FPZoRO9jTnVkv' +
	'nwnTKkWJXFIWjnm6e05qv9%2FphuLDYOj9zfnUR0D8z9Of%2B6b3MXugWV9daN4WR%2BYP9tn1gZ6EgF4VNKgQLWjFnBOVEs0MZxmyBayQlIbCFoBWFnOr38Qam' +
	'uNZcuzFVg%2Bmm39lZse23NTAle2G9pJOkaKVptuMnvZJSh9utQb%2FnhV8V0vmU9%2B0js%2FlD16c%2FEfrUt%2F%2FdAeqAB3RWPN9t%2B%2BevWWrOvnMws' +
	'3DNgdKQU0QQZ%2FIMGpPUdkwSaM252fMstGfZn4V9hTxFo7FiON0NuOBFBKm2Z9vLV8RO8T1jyhrdFpvJ4cgoGaWgU4w2tJUslQv50jN9L53bCEedfFZ97Iv3' +
	'%2FwOw%2BAM%2B9V%2BB%2F%2Bj37yq%2FeHr%2BHSfPLd61NLN8XbDSWTgx2x5fWmn%2FmbfROXSx7RRGhMWJxMK%2B7BAHb7mZvVftY3LHBPWxCZoxnFpZoeA' +
	'I6sJGp%2BCFcKrn04oDsSXjZi%2FN5cd3CTXc8GOVDWPsJMVONY4wlGxF1bJJtJCzflAM0nRyomj3PnjnTac%2B%2BdUnAwDxQ9jf%2Bg1xw5uvuWRmceODY87g' +
	'9VOdXt6f65svLTaXb7p6v3j0%2BfNj%2By1hjboWz0UptdfeyqHX3UihoDj21MM0ezGHD7%2BVfpDwzNGnOP7QA9xSd9g6UJxe85gPAyYdqNguGcARhgwSZbtgB' +
	'NpopImJhY00Mf1U8GS7zRfW13Uml72wo1z6i0Yu%2F%2BlDN93sKYB73vdukigePnV28c6o3%2F%2Ftg1Fc2d7WqqqVdbI%2FKI%2FGUWkcIau2xUsbPU5bNjce' +
	'vpHhSp6jR77G57%2F4ZQaex%2F59l5ArlEhDn%2Bnz5xAZQ7WQRw5CJl2HYSlxpcJVFrZ0MQiMTjCkCGEwSmMZG6UMjgRpwbQXiIXBQASSM7ly%2BdmtwxVfAdx' +
	'w6GoLKa5oNMrvqio9ZRabsoKFKyXTscfebI5x5TA%2FGPCtVosNnVIu5Zk9N803Hj7ChdkVMAlb6lW6vQ5Hv3uEmZmzaBQ7tzbIegMWmj3mBh4RKRll4SgLoQ0A' +
	'wrIR0kIpiUZhtAYMlhTMhyFzYaS2VIYHE7Xq95QxyxaANwhcKcW%2B0pDauUtl5LGzAZlEcqA4xIjtkEaGSGgueCFLQUQQxzz66GOEYcLKeoswimmudnjise8Qo' +
	'3lhepo4GhCHMQtT4xTziiOtDc63u0zkXK6t1dlXVjhKAjbGstBCYDQgNChJqgWOlIy4Di7SDv3ByNrKWiHq9IUFsLC8JjMZqzDWcLJh3hazQYSONJOZLBN2jrww' +
	'NOOAmcDDSxLixDCzsEyaGJJEAxp%2FEPDs8RPEJqHn%2BQijWRVrLK4tsd1yiAU4Tp4AxXoEcQqurUAojFAgFUZIjE5IUaSkSKGpWS45KQmCiJ7yMWG8OfI0Et' +
	'%2BP9dJiz0QZRXOQ4NqC9ThiV8YBaTPb63Gh7%2BHHKRoQkcEAxmiMgDCJCLsxqdakaYISkm7HZ%2Fr5Ofxsnpl2n1dXh7mqNkLFyuBakAJSWggJGANCkigBElQ' +
	'qUUDOsrGFxBeavklJjdyEHmnsiH2vO7va6iz46WB4Sy6nRh2LlTCkZCmKTpZzXsR6mAAKW9k4tsIYQZzExHG0WXFpMAYMAg34Ucr0bBc5JHCxeGZtjfFshq31LE' +
	'putoORkBpItEYIBQYcKVFSgtEkgEHjCEVeCQrq%2B9BDpdHIyWWf6rT059bX%2BsVCGu4yKXjKpu7mUFZAM00RtkNWWLiOSz6bw7FdoiSm1x3Q8lbBgBACKRRSg' +
	'BGGtcinNBDsLuX55qrP0Y0Nxot5JgsFhFDEWpMYAcIgJThohNk8PgwS21JYliJn2Yw5LsOuiwT483vfq6cu2btUro%2F8GzLzSCwd2nFKwXKp2YpW4NFNY6rFIS' +
	'rlMrabIYwjjAkpFwqM1UfI5oZACIwxGGO%2BP%2F0FoTHMBQHzgU9qDDP9PmfbHQZJQiokERap5SAdB6UspFQYpYgxhMbQiVNSoxjOV9hWHWfP6OQmNMDOnZfGM' +
	'y%2BeGKpkihddV69xST7HWN5iKO%2FQJWXe9%2FCCANfNMFoeoVKokhoHgaCUyzBeqmOjvt%2BbhlQbUrOpdDyd8mLHIzYJG1HMt1bWeWGjTaBDlGVwlcY2Ccpo' +
	'UimI5SawxtA1KaGWlJ0GY8U9bBu%2BfPMYf%2FKbXxDTz357tDRUvuuGrdXbLhVpptcPGFUOVeXw7EaLp1pd%2FDDE97rYJOSyOQqFPFnHxQhI0oSm3yHVKVobj' +
	'NAYbQCBECCMYCiTpZopsuQFBEnCRL5EVlnYCKQRoCwCIdEpOMImSAxPb7ToxSzVVe4%2BE0Rf3v%2Fhd4YWQN8LbC%2FwL5dBeEtRq6LjRUwVCpQthS0F60GMTj' +
	'crGEYRC80VOn6PnJtHKRcEdIMeg8EAYdhsD5MipAShwAhSYHsuz8FanW8uL3K273Gm3WE466KlwBjQOsYWm2JOJwkrQY%2BOId23Zffpg43JF6bK1fCHKq%2FfH' +
	'wg%2FjOxBe8OKbZ8hJRjKOiAkRtr0Yo1BgAFtNkddexDQ8X0kEhBEOkEAQgoEAqMNQgjAYIzAYLi0WmF%2FbZgeCd9aWOa7rVUKOclUqUxR2SglkFqh0Qx0wrne' +
	'ADdb7e8b3%2FXIRLV2PHv3m2Ngs6d7PT%2Ban185u9hqzV9oNjU6xTYCqTVawkoQI4VASomSFkq5CGWTCkWsDUmqEcLFtrNIIRFCIqRicwCDwdDI5zkwXKeSz%2F'+
	'PqkRp7KzXmg4RvrKxyot3GjyNEGpEYiJKEpWDAMi7j9amzY0MTjxaKhfaPSNMHHvwyh2%2B52WhhxkzkX9GQJldUNhKJEHD%2FwgKxMSjLIpPNMblrD5lcnmDgI' +
	'RDkckNcduVrEQi8fnuzyoCSCiUFZSfLm3bt5vJyEUuCowRS2jQjydwgMK3Ax5hYuLbEsousRqE5HaWJKo6f2z6642Pj7shD%2Bd%2B9Pvxvevotb3rToFKtzC9s' +
	'NKcWe%2B2LXKFlXoEj4KFWDywHK5Njz979vO2OO6jVRlhZWSWbL%2FFrtx3m9b96A93WIksrSwi1KXYsqShlsvzK6Bg3NBqUHIklFYM0oRnFTIzu3vBz9RdnvL5' +
	'3YTBwTvV9a7ofBDOBWLHLY49Mbdn1d%2BP5oQe23H2j9z9et979%2Fj%2Fm8Ucenjt5ZvrB0z11sN3sbHtVIRZXDZeYLFZI3Dz9XI5rrrmOfXsvodGo44cDMHDZ' +
	'3u0sz52haCfsbAyz3u7Q8XwkgslSgSsbZYYzCkumIDWpMUSppl5wH98%2Fsv2%2BtSTakqTea5pGHeyGg5dygfvciCo%2F3mhsOzVarXs%2F8TZ%2B3U2viz%2F' +
	'8oQ8dadnFh1eWl24%2FmYbFPRga%2BRxTF19Fd6LBlVceoJjPodQwr7rqYhZm51g8e5KoPeDSqsOubTXOScXRWNNLYqq2RdV1cCWQRmhtCJKYAIlO9ImLtww%2F' +
	'9t2lUac8Unw8GGT2VMRgZvml2aWBn%2Fi7fvPa5KeyEMbHdy9KufKP%2Fa63vh5uvG1RqMlEGXnFvovhwF4qtTJp1Obcied48cWTWMTszii2DFtYq5puLCnk8ti' +
	'VmCfWN%2BgEPoOoj5EgZUqqDSt%2BxEYqlhpW9sS%2Bt78hBuKvP73knzg6s3BwqpFe94Ed%2BmfyPTKZUmTb%2Fe%2Fl8kXZjfzXeKXh7c3F80zPTzO21eHE8Q' +
	's8%2B%2FQJosjnsm01rigWqAQR4ewcrVZIP4KaI7m86HCqZ%2BEIB5EI0jAmEYqZnp%2B81PbPR5WxT5pC9aEf%2FPf1B7cYIP5p3AHx4xY%2B8fFPXXr65HMfr' +
	'UfNW7Md35nxfUQ2x5baGDvqDS4ahVrgYa92YWBo9T2%2But6mo2Our1fpJgOe7nhcU2uwrzxEFEec6fSioy3v2bmW97dBkj74L0ce8X%2BhDlOtUV04d0Y98fxs' +
	'9%2BpdMm3scFxKbp5Jx2Jr2sOc6dD1Q0qWhWMcclKxI5vhqU7IM502I7bNVCZLkYQznQ4zccqxZnhsxkv%2BPpbFrzxw5PP%2By7XF1I9b%2BMxn7g9ve%2BPhX' +
	'oLYNtdplVPHznrBgNV%2BWy51OsxstFkNAvKuRUHZKCEZcmwMKTM9n5xlERrB2UhHLwR6aSlXX5gL1L1x3P3SA19%2FsPuKeXnjE1tPJkbcS9a6OjdUuLY1t1jo' +
	'KXPRmol2tVY7joxSAmHYn03JI%2FAx9JOYlTBkRYrYHarNpk7pqLbcx0oj285b%2FZUj93%2F2nwc%2FrwEp%2FrcP7rvvPmGPFBwdRplgZSVTq%2BUuXlteecf' +
	'xF87cvL6%2BUSsJkakLIR1gYNAtraPYdtuFSvlrE5O7P%2B3mR44Hsd3KD1Xi9%2F%2FhnfoX4U%2BLl5P0139z7%2FbpU6eu63Y6NxqtDwSeNxoniXAdt%2B24' +
	'zrFatf6d4VrtPz5y71%2BdfSVeF16WP91ptmdybn6tMlF50hi9d3FuftyPAlkuDa07jnO83mjMX7rvsv4r9SQifp7khx%2F6inzh%2BAv288eOW%2F2BJxqNkbR' +
	'SGQ7v%2BchHNf8fPxr%2FCUnqflWkYLeBAAAAAElFTkSuQmCC';
	var menu;
	var putainDeMenuQuiChangeDePlaceToutLeTemps;

	menu=LireCookie('BDGmenu');
	if (menu==null) menu=1;
	
	putainDeMenuQuiChangeDePlaceToutLeTemps=document.evaluate("//td[@width='165']",document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;
	
	affichage();

	/* workaround for the everchanging bdgest structure  */

	ima=document.createElement('img');
	ima.src=chefimg;
	ima.style.display='block';
	ima.width='45';
	ima.onclick=function() {return toggle()};
	
	var vilainhacker=document.createElement('div');
	vilainhacker.setAttribute('id','vilainHacker');
	vilainhacker.appendChild(ima);
	vilainhacker.style.zIndex=1;
	vilainhacker.style.position='absolute';
	vilainhacker.style.top='13px';
	vilainhacker.style.left='140px';
	
	document.body.appendChild(vilainhacker);

})();

