// ==UserScript==
// @name           wip_CrikeyCleanCommentPreview
// @namespace      2
// @description    Fix Comment Preview box on crikey blogs
// @include        http://blogs.crikey.com.au/*
// @include        http://www.crikey.com.au/*
// @require 		 http://github.com/sizzlemctwizzle/GM_config/raw/master/gm_config.js
// @version        4.00
// ==/UserScript==
// http://userscripts.org/scripts/edit_src/66745
// Ver 4.00
// New major version to deal with Crikey fixing their numbering mess up

////////////////////////////////////////////////////////////////////////////////
// Config settings dialog
GM_config.storage = 'BetterBludging';
GM_config.init('Better Bludging', 
	{
		oldfont: {
			label: 'Use the old Crikey font',
			type: 'checkbox',
			'default': true
		},
		stopfloat: {
			label: 'Stop the login bar from floating',
			type: 'checkbox',
			'default': true
		},
		hideavatars: {
			label: 'Hide avatars',
			type: 'checkbox',
			'default': false
		}
	},
	{
		save: function() { location.reload(); } // reload the page when configuration was changed
	}
);
function showConfigCCCP() {
	GM_config.open();
}
GM_registerMenuCommand('cccp Settings', showConfigCCCP);


////////////////////////////////////////////////////////////////////////////////
// First Thing - Get the next page if required
////////////////////////////////////////////////////////////////////////////////
var comments_list=document.getElementById("comments-list");
var comments_on = (comments_list != undefined);
var comments;
var uls;
var ul;
var req_dom;

if (comments_on) {
    comments=document.getElementById("comments");

    uls=comments_list.getElementsByTagName("ul");
    ul=uls[uls.length-1];
    req_dom=document.createElement('div');
}

// Remove color from <a> elements
// Revert to old font
if (document.styleSheets != undefined 
	&& document.styleSheets.length > 2)
{
	if (document.styleSheets[2].cssRules != undefined
		&& document.styleSheets[2].cssRules.length > 4)
	{
		document.styleSheets[2].cssRules[4].style.color = '';
		if (GM_config.get('oldfont') == true)
			document.body.style.cssText += ';font:13px verdana,clean,sans-serif;';
	} else if (document.styleSheets[2].rules != undefined
		&& document.styleSheets[2].rules.length > 4)
	{
		document.styleSheets[2].rules[4].style.color = '';
		if (GM_config.get('oldfont') == true)
			document.body.style.font="13px verdana,clean,sans-serif";
	}
}
////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////
function setupEmoticons() {
    var em = new Array();
	em["quotes.png"] = 'data:image/png;base64,'+
	'iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAAAsTAAALEwEAmpwYAAAK' +
	'TWlDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjanVN3WJP3Fj7f92UPVkLY8LGXbIEAIiOsCMgQ' +
	'WaIQkgBhhBASQMWFiApWFBURnEhVxILVCkidiOKgKLhnQYqIWotVXDjuH9yntX167+3t+9f7vOec' +
	'5/zOec8PgBESJpHmomoAOVKFPDrYH49PSMTJvYACFUjgBCAQ5svCZwXFAADwA3l4fnSwP/wBr28A' +
	'AgBw1S4kEsfh/4O6UCZXACCRAOAiEucLAZBSAMguVMgUAMgYALBTs2QKAJQAAGx5fEIiAKoNAOz0' +
	'ST4FANipk9wXANiiHKkIAI0BAJkoRyQCQLsAYFWBUiwCwMIAoKxAIi4EwK4BgFm2MkcCgL0FAHaO' +
	'WJAPQGAAgJlCLMwAIDgCAEMeE80DIEwDoDDSv+CpX3CFuEgBAMDLlc2XS9IzFLiV0Bp38vDg4iHi' +
	'wmyxQmEXKRBmCeQinJebIxNI5wNMzgwAABr50cH+OD+Q5+bk4eZm52zv9MWi/mvwbyI+IfHf/ryM' +
	'AgQAEE7P79pf5eXWA3DHAbB1v2upWwDaVgBo3/ldM9sJoFoK0Hr5i3k4/EAenqFQyDwdHAoLC+0l' +
	'YqG9MOOLPv8z4W/gi372/EAe/tt68ABxmkCZrcCjg/1xYW52rlKO58sEQjFu9+cj/seFf/2OKdHi' +
	'NLFcLBWK8ViJuFAiTcd5uVKRRCHJleIS6X8y8R+W/QmTdw0ArIZPwE62B7XLbMB+7gECiw5Y0nYA' +
	'QH7zLYwaC5EAEGc0Mnn3AACTv/mPQCsBAM2XpOMAALzoGFyolBdMxggAAESggSqwQQcMwRSswA6c' +
	'wR28wBcCYQZEQAwkwDwQQgbkgBwKoRiWQRlUwDrYBLWwAxqgEZrhELTBMTgN5+ASXIHrcBcGYBie' +
	'whi8hgkEQcgIE2EhOogRYo7YIs4IF5mOBCJhSDSSgKQg6YgUUSLFyHKkAqlCapFdSCPyLXIUOY1c' +
	'QPqQ28ggMor8irxHMZSBslED1AJ1QLmoHxqKxqBz0XQ0D12AlqJr0Rq0Hj2AtqKn0UvodXQAfYqO' +
	'Y4DRMQ5mjNlhXIyHRWCJWBomxxZj5Vg1Vo81Yx1YN3YVG8CeYe8IJAKLgBPsCF6EEMJsgpCQR1hM' +
	'WEOoJewjtBK6CFcJg4Qxwicik6hPtCV6EvnEeGI6sZBYRqwm7iEeIZ4lXicOE1+TSCQOyZLkTgoh' +
	'JZAySQtJa0jbSC2kU6Q+0hBpnEwm65Btyd7kCLKArCCXkbeQD5BPkvvJw+S3FDrFiOJMCaIkUqSU' +
	'Eko1ZT/lBKWfMkKZoKpRzame1AiqiDqfWkltoHZQL1OHqRM0dZolzZsWQ8ukLaPV0JppZ2n3aC/p' +
	'dLoJ3YMeRZfQl9Jr6Afp5+mD9HcMDYYNg8dIYigZaxl7GacYtxkvmUymBdOXmchUMNcyG5lnmA+Y' +
	'b1VYKvYqfBWRyhKVOpVWlX6V56pUVXNVP9V5qgtUq1UPq15WfaZGVbNQ46kJ1Bar1akdVbupNq7O' +
	'UndSj1DPUV+jvl/9gvpjDbKGhUaghkijVGO3xhmNIRbGMmXxWELWclYD6yxrmE1iW7L57Ex2Bfsb' +
	'di97TFNDc6pmrGaRZp3mcc0BDsax4PA52ZxKziHODc57LQMtPy2x1mqtZq1+rTfaetq+2mLtcu0W' +
	'7eva73VwnUCdLJ31Om0693UJuja6UbqFutt1z+o+02PreekJ9cr1Dund0Uf1bfSj9Rfq79bv0R83' +
	'MDQINpAZbDE4Y/DMkGPoa5hpuNHwhOGoEctoupHEaKPRSaMnuCbuh2fjNXgXPmasbxxirDTeZdxr' +
	'PGFiaTLbpMSkxeS+Kc2Ua5pmutG003TMzMgs3KzYrMnsjjnVnGueYb7ZvNv8jYWlRZzFSos2i8eW' +
	'2pZ8ywWWTZb3rJhWPlZ5VvVW16xJ1lzrLOtt1ldsUBtXmwybOpvLtqitm63Edptt3xTiFI8p0in1' +
	'U27aMez87ArsmuwG7Tn2YfYl9m32zx3MHBId1jt0O3xydHXMdmxwvOuk4TTDqcSpw+lXZxtnoXOd' +
	'8zUXpkuQyxKXdpcXU22niqdun3rLleUa7rrStdP1o5u7m9yt2W3U3cw9xX2r+00umxvJXcM970H0' +
	'8PdY4nHM452nm6fC85DnL152Xlle+70eT7OcJp7WMG3I28Rb4L3Le2A6Pj1l+s7pAz7GPgKfep+H' +
	'vqa+It89viN+1n6Zfgf8nvs7+sv9j/i/4XnyFvFOBWABwQHlAb2BGoGzA2sDHwSZBKUHNQWNBbsG' +
	'Lww+FUIMCQ1ZH3KTb8AX8hv5YzPcZyya0RXKCJ0VWhv6MMwmTB7WEY6GzwjfEH5vpvlM6cy2CIjg' +
	'R2yIuB9pGZkX+X0UKSoyqi7qUbRTdHF09yzWrORZ+2e9jvGPqYy5O9tqtnJ2Z6xqbFJsY+ybuIC4' +
	'qriBeIf4RfGXEnQTJAntieTE2MQ9ieNzAudsmjOc5JpUlnRjruXcorkX5unOy553PFk1WZB8OIWY' +
	'EpeyP+WDIEJQLxhP5aduTR0T8oSbhU9FvqKNolGxt7hKPJLmnVaV9jjdO31D+miGT0Z1xjMJT1Ir' +
	'eZEZkrkj801WRNberM/ZcdktOZSclJyjUg1plrQr1zC3KLdPZisrkw3keeZtyhuTh8r35CP5c/Pb' +
	'FWyFTNGjtFKuUA4WTC+oK3hbGFt4uEi9SFrUM99m/ur5IwuCFny9kLBQuLCz2Lh4WfHgIr9FuxYj' +
	'i1MXdy4xXVK6ZHhp8NJ9y2jLspb9UOJYUlXyannc8o5Sg9KlpUMrglc0lamUycturvRauWMVYZVk' +
	'Ve9ql9VbVn8qF5VfrHCsqK74sEa45uJXTl/VfPV5bdra3kq3yu3rSOuk626s91m/r0q9akHV0Ibw' +
	'Da0b8Y3lG19tSt50oXpq9Y7NtM3KzQM1YTXtW8y2rNvyoTaj9nqdf13LVv2tq7e+2Sba1r/dd3vz' +
	'DoMdFTve75TsvLUreFdrvUV99W7S7oLdjxpiG7q/5n7duEd3T8Wej3ulewf2Re/ranRvbNyvv7+y' +
	'CW1SNo0eSDpw5ZuAb9qb7Zp3tXBaKg7CQeXBJ9+mfHvjUOihzsPcw83fmX+39QjrSHkr0jq/dawt' +
	'o22gPaG97+iMo50dXh1Hvrf/fu8x42N1xzWPV56gnSg98fnkgpPjp2Snnp1OPz3Umdx590z8mWtd' +
	'UV29Z0PPnj8XdO5Mt1/3yfPe549d8Lxw9CL3Ytslt0utPa49R35w/eFIr1tv62X3y+1XPK509E3r' +
	'O9Hv03/6asDVc9f41y5dn3m978bsG7duJt0cuCW69fh29u0XdwruTNxdeo94r/y+2v3qB/oP6n+0' +
	'/rFlwG3g+GDAYM/DWQ/vDgmHnv6U/9OH4dJHzEfVI0YjjY+dHx8bDRq98mTOk+GnsqcTz8p+Vv95' +
	'63Or59/94vtLz1j82PAL+YvPv655qfNy76uprzrHI8cfvM55PfGm/K3O233vuO+638e9H5ko/ED+' +
	'UPPR+mPHp9BP9z7nfP78L/eE8/sl0p8zAAAABGdBTUEAALGOfPtRkwAAACBjSFJNAAB6JQAAgIMA' +
	'APn/AACA6QAAdTAAAOpgAAA6mAAAF2+SX8VGAAAG9klEQVR42sSXXYxdVRXHf3ufe8+5HzNDx3Y+' +
	'2g60BYpYQWtFbDTEIIq1SOuLJmgjjVGi1aTpE5kH52F4ICZtYk3jBBJDMJL0wRcMiTCMQ0PbgX5Q' +
	'QZuSWFNop0Oht52Z+332x9nbhzn39pZCHSCGnazsc/c9Z//+e+219llHeO/5NJvkU26Zj/vgiRMn' +
	'skBf6/eGDRve+TjziMVuwfHjxx8SQtwj4F7n/Y1AQYD1IATgvceDMsacNcZMFIvFP991113HPpGA' +
	'o0ePflFKOeqc25LP5VR3sRjl83mibJZMZsF5QggAkiQhSRKaStFoNpkvlzHWxo1G48D09PS27du3' +
	'X76ugBNMtQf1q3KplPIZKcTXly1d2vWZG25ACNGGtfrrNe89sVJcmp1lrlxmfn7+5ddff33Td4a/' +
	'0QTYwNc+WEA8xUbg8NLeXjnQ14cMAuQiwH6B+oFCkiTh7PnzlEol9e/Tpx/YuGP931sCrsqC+sFk' +
	'jxTihVVDQ7K3dwk2sSRJgvcebTTKaKy1bWDbvG/DrbXUG3XqzTrGGKy1xDpmoG8ZywcHo3Xr1r14' +
	'6PfHf3lNGlYO6DsE/OymoaGeTDZLpV7hyJGDmMSijObs9FucOvUGxiWQbkfbpGxfN1XMsdcOM/78' +
	's8xW5pmtzDP+wl859toUS5b0MNjfLz53++1/2L1794NXpWGSJFOrVq7sDsOQetzglUMvoZXGWoMy' +
	'mvHnnmX93RvboGuCN90eZWIO/O15dKwYuvnWhQw6eJgwF/H5O7/E4MAA2hhW3XTTXx5//PHlEmB8' +
	'fPy3+VwuyBUKIATKKI4cmmJw6EaSxHHhvXc4+ca/WHXzLWSDK9HfDszO2BCS+UqVuXKFarVMo15j' +
	'rlzhvfdKWJcghGD5wAADg4Mh8GsJ4JLke13FYsE5h7WWdy9e4D+nz1Br1FFa8eapk1SbMXOVMolz' +
	'C8AOqOgQFIU5vr11C6XLcyzpXcqa1WtZufYWrBAEQrbF39DTQ39//68kgLF2TblcplQqMTt3menp' +
	'c5Quz7Jv9++oNqucOzfN9PQMfxwbo9astXM+ce4aw3sQEp8JGBxYQRTlyBeK9K1cgUSitKYZxyil' +
	'yGQy/Zl0/60xBq01UgqyYURpdo6i1njvkUFAaXaOcq2G1Qaj9Yemo9KKqcNTfHnjV8nKDAmOAy+9' +
	'zM9/8QgCgVYKFcfEcUySJAtBaK0tKaW6s5kMAlg9tIr7Nt/P2rW3ks/m2Lz5AY4dPc6Ptm0jG2S5' +
	'3ukphWRZXz9btmwhzIRU6hXuve+brP/CBvCglEIpRb1eR2vdEN579u/f/2SYzf60u6sryOVyRFFE' +
	'mAsJZEAuyiEDiZACgSAKI4IguOpkbB04AFprvPAIL5BSYowh8QnOOpxzKKWI45i33n6bdy5cONza' +
	'gt/ESbItDMO8v/JiIQpDtNBk07NfBhLn3MJK09zvFOCcWxjz0Apo5xxJkmCsRWuNUopatUqsFM1m' +
	'c0/7KP7T008/mclkftzV1VUIw5C2ZbNkw5BsNks2k2mLCYIAKeVVx20L9v7eWosxBm0MWilmLlyg' +
	'VCqd3LVr153tg+gnDz/8yFNPPbXGVSr3dHd3R0mSLDyUzRIaQxiGRFGES73jAZmKb2WFtbZt7Uzp' +
	'EGCt5eLFi9RqtVocx5uuKUiMMfdba/drrTd1dXX1hGHYfrDlzpbHvPdIKa+4OM2izvs7RRhjuHT5' +
	'Ms1ms1Iul9cPDw/PfGg9MDY29i0hxNNBECzJ5/OFQqFAoVAgn8uRy+fJRRGZTAYhBM65NlxrjU4F' +
	'tMBaa6rVKs1mE2PMZL1ev394eDhZVEGyb9++B4UQPwC+K6UsdhWL4erVq4MwDNsFSQuitaZSraLT' +
	'KDfGoLR2zjmVJMmLcRz/8NFHH1UfuyTbu3fvHVLK59asWbOqu7sbKSXe+/b+nj9/nlqtZoQQJ51z' +
	'rwoh/gG8snPnzpOfuCYUC/km9+zZYz97223t1XvvF+AzMzQajcrp06fvfuKJJ8521CityV1qad1y' +
	'BZpZBFwC4Y4dO74ioKqU6jbGAHDp0iXm5ufRWv9zbGxs28zMjANWpLAkNQsowAA6HftIZXkA5Ht6' +
	'eh4Koygy1lKr1ZhfAM9NTEyMTk5Ovgn0dwBN2msgBppALf3fdXjm+gJargeinp6e7c1mkzNnzhDH' +
	'8buHDh16ZnJy8o0UUnwfOJOOixSq0nnSN7cQrW34nzEghAiBbmD51q1bvz8xMXG2Xq+TTtpIVxen' +
	'QN3hhaTD7Sq9xwDWe+8WHYRpDOSAHqAX6EpXYjrgrZXb1L2uo3cdglwag/4qAY899th1RYyMjMjU' +
	'rREQtsrIFJx0TO4ARkdHF/3Fu6hvw9HRUTcyMmJSYOsV6D8K6BN/G/6/2n8HAGRBRxNN7AZkAAAA' +
	'AElFTkSuQmCC';
	em["exclaim.png"] = 'data:image/png;base64,'+
	'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABmJLR0QA/wD/AP+gvaeTAAAACXBI' +
	'WXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH1gIQDictt+6SdwAAAehJREFUOMuVk8FKG2EUhb87mc40' +
	'iTODEJlK7UZDxCCGQUqaMASCSGODdBe6ECJddOcwG/EJXBt0ZcBCwEVJVgWtr1AIPoBQXAQKhRZc' +
	'1EBJMX831hLItPbAvYvL4Ttnc4UIhfDIgLcAA3jdgC/jfHoUwISjeXgOcAFHQHWcT4tI91KwWlhY' +
	'0J6kUloKVkPw7g0wYS8NemJ3l0yzSRp0E/buBQihOAXFbLksej6Pns+TLZdlCoohFPmXdqB7AsNe' +
	'p6M8z1Oe56lep6NOYLgD3b82CGHFhaWM74vh+ziOg+M4GL5PxvfFhaUQViIBJuxnwUgEAaJpWJaF' +
	'ZVmIppEIArJgmLA/FhDC+jSk5woFjFIJEcG2bWzbRkQwSiXmCgWmIR3C+gggBDGgsXibruk6IvKn' +
	'gQiarpMIAhbBMKARgsDtCuHVLLReLC8bk2dnEIuhlKLf7wOQTCYREbi54WptjQ/n54NLqDfgnYQQ' +
	'ewxXT8GaPz7mYbWKUgqlFLVaDYB2u42IICL8OD3lYmODLnz/DJOawGYczJlcjnilcmcUEVzXxXXd' +
	'kVu8UmEmlyMOpsCmbMPXl5CaPThgol6/S/89wAhARLhutbjc2uI9fJNDGD4DecD/6SfwEZT+CQ4H' +
	'8GYi4i+idA3DHjR/AZfefQgctOETAAAAAElFTkSuQmCC';
	em["face-angel.png"] = 'data:image/png;base64,'+
	'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAwpJREFU' +
	'OI1tkk1oXFUYhp9z7s9MJml+qkn8SRoFC8FaDRRLaKUoKtSNZKWCIoJCQTel1KUrl2oFhbSFICK4' +
	'UBBDNxUFcQqJEYtKYmhJ2mQmM4mZiTGZmUzvnXvPOZ+LwVrBZ/Ut3u+Hh08BFIvzfUayxxB30CQb' +
	'Y661OS5pfVh5YRZAbBKrYF9JZ+6d88P7fkPpZV/FsyMjj+6o5cLSZOB7b3R2dAWZMIPvB3ieDwig' +
	'aNOurTUYk9JKWjSjvTQ1dkrdLCzJyNCDOOfYre8QxbdITcr/EfgBHdkcvd19aK0plldRy4WlyUzg' +
	'nerMdetMmMX3fZTSd2zm9iUiDmMMrSSmeavuWqm9qGamGMncdXBh9Nn8vjQuYtUQxmlwFicWsGhS' +
	'oIXHNiRXCbvGWfr+xUayu3nY11n/zENHTnfm/BJ070d5PaB8EAvSQOw2uC3EbCBmlaQ1jTI1Djx8' +
	'svPGL5+e0Sg90dX/lBZTABWAxAgaQRAXgashtgqmhCSLbZnRLF39J7QSJrQzZlAH/WCrYMpc/jZP' +
	'vd4kn/+RSrVMpVol/1NIQ17hu7lRwOKSIkF2GOcYbNsSg0gdSa/xxOOKC+c/ZK9+nYHeDQZ6yzR3' +
	'5zh/4X3GD80iroVIcluwrzyvYluFA1o0YjfpDCPefmuoHTDriNvhuRO7nDy+iUlqmCQC3U8aFdCa' +
	'ihbsdL1y2eHf324wa4gpIKaI2DLYP8BVsGYHa+pY28DrOEpj64oTxbQmdudWrn60hz8K4sCUwKyB' +
	'KYJZw5kNTLKFTbexZgdRPfi5J1lb+HqPmHPeJ5eovT6RDNqkNNYzctq30c84s46zdeZnrlC8dp3t' +
	'SoW+fofoPnID77K++HHU/Gtl6thrfOEDrIXurLvxzVERdWT4sXcyNspjox84/PR74O0H18TEC/i5' +
	'ZygtfBBXV2d/LWc4+++PAotfEtZiJr2w7+UHxl4Ku+4e10F2GMSRRis0/pxzxfmvEpvUPu/J8uah' +
	'F0j+M+AfZj7jEa04JfA8jnsA0GwquOSEi8df5fc7838DZ1OizgC7vvcAAAAASUVORK5CYII=';
	em["face-angry.png"] = 'data:image/png;base64,'+
	'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAxdJREFU' +
	'OI1tk91rm2UAxX/P87x5kyZNmqbVlHZtA7Vz6mrMFEQY7TpQJ+q2i1F0otKrigzBXXqxP6G7UAZe' +
	'eKE4kU1kyLwQNtDCNmF+xS40pZasdKVJmyZN0ny9ed/n8cIPdHquzsXhXJzDT3CfPoGDtpRzAo67' +
	'xgwAWJDXxnzVgQ/fgDv/zIu/zCWwtZIXrO7Q6YmXj/kfOPCw9EeimIZDfX2DfDarl2/ebHvN5mcK' +
	'3p4B5++CS6C0UguJyWcOJedeD3A3g5fLoreKmLoGE8H0DdIZGmLx6tVmfnn5ZwsmZ8BTAKcsOZ84' +
	'/PRLqXdmu7zbX2JKWYRsInwg0JhGE7O2ibu2Tnxqylcvlfrq5XLfF/CNvAijvmBwNjn3Wpf3/WWE' +
	'tcP5WgwZt5B9ChFViLDgnE8h9/ZoXb/O/unpoLTt2YswKqWUZw+eeD7MRha8EjKq+Dq7w5OfFhER' +
	'iQgKjm1aXKs0UEpBtYqXyzE8MRGWcFZKwcn+iUelvrcCSoAFo1aBA+EKQgFSsK+0wf7qzh+rC4GT' +
	'yxEbG5PAScvTJu6PRNGLJWRMY+qSj0+NYDyDqWhoGz5KDuAVPLztDkZrvN1dAtEoBuIWgGk4bN0p' +
	'sr26TWSwh+hDfkLDYSxloWsap+TQ2KhRabrUalW6bJvAn/dbUohCaz0/0sg3uHHuPY6OjVP/boGt' +
	'hQXsYgGMoRWLEXzxBN6z03ybyfDC/Ps4u7sIKFhG6yub6cUzkd4+OTg8TM+hFN2HJ/HeKpNIJOi4' +
	'HVZ/WyESfxDHddhX36Onv5/86qoGrlga5pdv3XpzKvl4TzQUJHD7B3wLN4hnMrTqDQyGkUAX5rFH' +
	'EEeniXWHCEXCrP+SrmmYFwCfw/mnUk+ciVo+CyHQxSJaazzPw3VdXNcFrQkMDWHbNuWO4/6U/vWD' +
	'V+BdBTAD1+7l88/Vw+H+2JEjPlcpWtUq7VoNx3Fwg0HM+DgimWQpm22uLC39qODVy2D+BZMHF1Qg' +
	'cDqRSvl7R0el3duL1pp2uUxlbU3fTafbutX6L0z34+yDOeC4hgEACXngf3H+HY5FW7twqtEUAAAA' +
	'AElFTkSuQmCC';
	em["face-cool.png"] = 'data:image/png;base64,'+
	'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABmJLR0QA/wD/AP+gvaeTAAAAB3RJ' +
	'TUUH1wgOER8RqU5d7gAAAv5JREFUOI11k12IlGUYhq/3++Znx5lcrRl3pKaV7ecgY9sUQok6iH7A' +
	'YA+XyAo8kI1YD7bME1swWvAoFgwlYykKjdgwxAQ1gkob2VxSWjWt3J39mdUZZ9vdmW93vvl+3vfp' +
	'QApx84EHHrgvHrgPLsUdk/+Cxy3b7kasTtFhFkBZVgnkmBFz8Ok3uHQ7r/49Lg8Rq3nRA5F4eusj' +
	'm/tiqfuesaxYFiQg9MZwbn5vro3s97U/e7g5zlvru/D/ezA0hJ3zo6cfWL994/3te+MEV5DgL8AD' +
	'ImBcxEqhou1Mnt/tlcaO/1qM82xXFxqA4S+jA9Pnu13RC6Lrx8X4V0WMJ2ICEe2IhGUxjRHxZ3dL' +
	'WD8jY/nn3OFDDNzqPEjryNctVRNWRNdPieh5EdOQXe/2SiqVlFQqKbve2SbG/UHC2qDUiy+L75yQ' +
	'c18lq/lBWgHkbjtXuSJ/l/J3zQGxd+zo2dPW1kY6nSYejxOGIZ7noZRib38viZjDXC3J/zNgpdWR' +
	'sFicZnx8jEKhgOM4ZLMZ9n/0PmJmEV1mw2OLFKev3sZUaWlZzduvE6r851Zj86szcbP0KcpKg70W' +
	'VALEB6mBriD6BoQz6GCG0L9BGFRJrP2Mc9+86FnKtsvam0CJhegSF072MF/8lqD+O8abRPvXCdwZ' +
	'5kp/8lv+F4x2wcoQuBNYFuWIoI/Wyid6Vq152KLxMw92vMfU5QGWFqbQYQME7EiUZPMa1j3Zj9b9' +
	'RFIv4FROG1EcVflBWmP3rBrd0PndSnE+QcUeRa3YgrJzt6oAIksY/w+8+Y/xF8+QyHzA6KnttWBx' +
	'qV0BDB+yBloeeunNXEdfk17Yh+jrgCASILqB1ouYsIZY95LI7KF4aZ9bmTh7cNNr9EYApmJmp7l2' +
	'8ikRtTH3RF9cuz+h3R/RfgExHsrOEFm5hciK55m++GHjZuHshWKcnctkqjY4YMdWb13X8Uosld5k' +
	'RZtyIIbAHceZHTaTo0d87VcPNzfdIdMynRXdAp0YsgBYlBQcM8Iynf8B2FmzBtwsqycAAAAASUVO' +
	'RK5CYII=';
	em["face-crying.png"] = 'data:image/png;base64,'+
	'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAAlwSFlz' +
	'AAAN1wAADdcBQiibeAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAMxSURB' +
	'VDiNZZNNTFxlGIWf77u3zDBzQRiEwkAQrASJgdRCtQVtpm7c2DSNMWyqNDEmLlw0iC7cNIomJiTY' +
	'mBi7UtDoypqYLhqjBqyilJShZUi1LRQpvx1kgIEZ5ufe73VBNI2c9cmTk5w8SkR4MCODqkEpdcay' +
	'rYjxTDOA0ipmPDMsIgMdXXLnwb76FzAyqLTWutsqKH7vwOF3fMHQIV0QbABxyW7H2F4dNbMTn2Tc' +
	'/NY5MfR3dIn5DzAyqLRl21fK615orX/6U7/y/kLyMyBZUD7ABRyMrmVmrGcnsfBL1HhyrKNLjAbQ' +
	'WneX151oPXD0M382OcT7fZcYnQyjnZfRgZOM3qjkg/PXySR/4rEjfYWh6vZDStENoH4doGGfv/RG' +
	'24t/FKrcVT76fJ7OUydZWlqkan8pIjlW7icJh8NcvPg1r3fOoIKnmbh0Ip3PpQ5ar55SbzYc7Y0E' +
	'nFI1t17Cmv04zzxRSnVVOcVFBRQ7LuHyFI7vNr5QISZ/E8fvoyCw39pYjm5ry7YjwbJWfW3O4Xa8' +
	'ionZNAKICiAYkDRi1sG7z62N4/yZPs+30RICpS1aW0S08bzmgkADGzsP0VTjYGkBkwKzCSaJmAR4' +
	'ccRbpsyxaKoJEF1owl/UiDE027tvuqQSV7gQa6T9kQTiplHKQkwazOouTHZIxb/iwmQ7T1VcRuRZ' +
	'AGxt6VhuK9Z+vDHO4eopHKcS3ApE2bs3mo3dFWaTY/UxDoa+pDD4KJlkCVoTsz3XG95au3rk4eo2' +
	'7fjugl5j5e7vrMyOk95cBoRAcSmVtWHKKvz4rAyW00piZcozHsO2iAzMjn98NlQzFFDaQdx5Fu+M' +
	'Uffk2xSVPwfAVvx7Un9fxnPnwa6HfU3MT32YFWEAEWHkC9VzayiS9jLjklt9Q0xuWtz1XsnHX5Hc' +
	'SqfkVt+S7FqfbN97XnLJ7+Tmj23pkUF6RAQNIEb6Ews/R6d/O7uD/yW89A+4uXvks4vks0vkc3MY' +
	'k8Eqeo3psd6djeVrURH698ikNN227bxb23LaHwy1aJ/TCHhkkjG2E5PewtQ3WTefOifyP5n26swZ' +
	'bRExhuZdV4gZj2ER9uj8D61znuRg9erQAAAAAElFTkSuQmCC';
	em["face-devilish.png"] = 'data:image/png;base64,'+
	'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAyJJREFU' +
	'OI2VkM9Pm3UcgJ/v5+37toXagtC+BZ0wyKQ6hunBLP6YB7OjYcnMMCPqddE/wCxxiYm/4mlHEw5e' +
	'TJwTEzeX6DRZ5g/MMHpAVhhthSAQaEEG9Cd9277fryeN8eZzfvIcHjUdtle19gcQybUP2+9ouOuI' +
	'XFAw3jYmCRCAojbmRgumBI4HOgJv0dYpsaw1ddUSfebXGZV/8zy5mS2U2Hps/AXiqREJRrsw9Sa1' +
	'jU2K2azOzc4Yo7SVOtXPsfc/5csnT2l1VWTh0d7e48NjLnpQWN12eOyZp/BXs+idXUxNg4lievrJ' +
	'bS0wPKSwN2Als01+d3fROmvM72XPe+UhiVLMVXk4Hceqr6DkEGWDQmPqh5i1AkFP2L1XIlA13C0U' +
	'aPv+y2Igbyzx52plHnw6ieqocOWTRX7+bQvpsVBdFr+sF/k8v4Kq1HEch6VGA6NU20DeOifydvr8' +
	'mZNjZ06qkGwwt9zi+Xdfo7TvEQ5rGp5Qjxzh2cmXWMxkcWs1ulMpJBajVChY1oSoqROTL3ZZmxmU' +
	'3eDIiSBOYJX+viYhv02w2SbRqCLz93BrhlaziVepEB4dVYXFxb6Ar40bjHax9Ma3/B96Tp/GgCsA' +
	'pt5ERLh26SKV72/xQD5L+fZtHq/XOFY+YOfmV4SXMuzd+oZrly4iIv+EAqLUdmOj+EgoEmH46AC9' +
	'8TjJZJJ2y8e2bVCQSCRwXZdm02P46AChzk6aBwco2Baj9fXCfEaH+vsI7/yJUlAulxERqtUq1WoV' +
	'EYtSqYRCEd7bIxCPs7eyooHrouFybna20jmS4okffqLDcYhGo7iuSyQSIRKJkEjEicVihBybse9m' +
	'CA4NsZHJVDRctr6A0tl22/VgbLCj0w5+fROJxejojYMdwG96BPb3MXfu4Lz3AR3VGtn19Xrt/v2P' +
	'JuEzBTANlg8/uiMj6dF0Oiybm0i9jvI8ALRj0wqG8F2XpYWFw53l5bkAPDcBvvr75jQ4PnxohUKT' +
	'g+l0sHtgQJzubrTWePv7lNbW9B/z855uNK5Y8PoENAEU/+FjGLXhAjCuIQkgUARutGDqVVj4t/8X' +
	'ftddkLJAB60AAAAASUVORK5CYII=';
	em["face-embarrassed.png"] = 'data:image/png;base64,'+
	'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABmJLR0QA/wD/AP+gvaeTAAAAB3RJ' +
	'TUUH1wgOER8RqU5d7gAAAw5JREFUOI1lk11InXUcxz////Occ8wedeacVjMXzAo2bCCtNyYV3VQw' +
	'FpQMxroLIYJi7KpYQV30IpsQTRjsIspFyV5sbRBUYC2dMGaijhWbjpMn9LyE502f87z8/78uZBHz' +
	'd/W9+PG9+PL5KO648S/ZqR2nH9F7xcTtAErrZZDzVuyJp19j7v//6na4NkKyHCSG3NTmA11PHkl6' +
	'LXu0TraDRMTBPJXcT/bmleOhCQunmlK8saOP8L+CkRGcjjDx69Ydr/fc3/1Riug6Et0AAsAF8RE8' +
	'VLKb9NS7wfL8hauZFL19fRgAJr9ODC5O9ftiimLWLogN/xCxgYiNRExFJM6KrV2RsPCOxGuXZH78' +
	'OX9ymEEANX6SzmRT20zPy3ONEk6hU7v5eOA4+VyWowPvI3aVTwaGyOf+5tMPniEsn8NtepPpi6+U' +
	'o+pqt9Z17qGux9/ziBdQ7jbA4fSZs4x+dxEkBFvm9LkfGf1+AswSmGWMf4nO7lc96jjkovQ+r/VZ' +
	'LdEMyt0FtsjD27sIwwCxPtgSDz3oEd4XQWUWFWgMl/FaD2olX+xzbRy3abcFm7uOcmLEaWb487fA' +
	'a0VsAUyWr068BIU5yC+hY41J5Unc04G1tLkA+AXw89hyBtxNqKatwL2QEjB5WFuGSglWIrTV6AYH' +
	'7DoBrnKcrAkXH9CiEbsKUQSxA8ZCLIhdAbsCUkPEIFhUYgtxLY3WZLVgRsvFCSteJzQINCgkWUWc' +
	'PGIy68MlVjB1PqbBJ767BC07qRTGrChGNTV7bOHqZ1XV0guNd4FXhfoimDTTP59keuxb4ihPXP8P' +
	'kZcjataoTY+Rnj1bpcaxdZCG9eCtyy/4sT8hwdJ+qWV6pZbZI1F5WILc21KZ3y6lP7dI8cYjEhS/' +
	'kfnfnlq7DZIL8FfSHrY3f9gtono6Hj2SMv4vGH+MMP8hYgOU04rb+CJu/fMszh6t5W5N/J5JcXiD' +
	'TKUaQ06y+cC2XfuT3uYndKKuA8QS+QtUCpM2PXMmNGHpVFPdHTJt0FnRL7AXSzsAmmUF562wQed/' +
	'Aa7OobdwQPRmAAAAAElFTkSuQmCC';
	em["face-kiss.png"] = 'data:image/png;base64,'+
	'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAzRJREFU' +
	'OI1l019InXUAxvHv7/e+73nP0aMH/5wdY3rcTLPmMP8sUbbaikF3w1ZIsbZgMLZFN8Ggi1BGFxXD' +
	'LISsQRcVjUKoxiocWZCC4mpTmYqVzvTsKOePuXm0Hc/779dFFDGfq+fi4bn7CO7LyKfslZp2GiWP' +
	'KNcpAxBSJkBd8ZR3cf8Jpv+/F/+WmX58mZzRp5ulx2raOn3Bksel9JWBsnFyt9hI/eDN//K+5Vqr' +
	'l0ImL9d1YP130N+PVmEZw+V1p5p31r9lYs+i7DkgB+igsiiCCF89S+Ov5xK3vr0RN3miowNXAkQd' +
	'o7t8z8mm8vo3zc07P3LhvasMDBcg819C5j3LwHAx3X3zZNJfEG14zYxUPdUUtegGECMfUekLRW42' +
	'PzNdqKxxvh+yaWs7wMTEDfY8Uo3yMsz+ukxjYxOjI19xqOEb9NArTH73XMbe/KteO9Whv1G7/+0D' +
	'ZiAghFZGzUMt+P0Guyqj5OcXkB+w2V25A9NYp+qBSdzszygMAgVRYy09qekI2R4MPymVM4UwH8NZ' +
	'XWCmeh/oOuEzJwGb9IefgGNTe/0omAI3O0owfEIK9XG79BwnIo0wuClw4ljry4jCQqq7utgaGyd7' +
	'bYrqrvOIwhB25k/AxbOWMPwVeB4RHQDloFQGLzvDbM1ZABI9PYzFYgC0zs1jx1f4fd8KtXN1KGUB' +
	'CgBdaFrSzS1GpZIgUuyNX+C3458TSOZoP/vP2frQEJsHq6n6oARECkQYO7uIlCSlwr2cSQ546DvB' +
	'WUYPJCg4vpu15ArZwUGyg4OsJZcJvuBH+jO47gZaoIWN9LCnBJclW17PwvXeTfSHQXng3GbHYQOr' +
	'OUhsaYHY0gK5Ro2igy6ucwclQuh5h4hNfb3JFj0CYOwz+W7kwafPVDR0+t27vSh3hZVEjlT6Hsqz' +
	'KC7KUVZyDyWLCYTPE5/uzaYXRy+2vsirOkDM553z5q+2KCWaKx7tNN3sEJHIT5QW3UV5OYQWRgu0' +
	'oecd5vbUO1upP0Yn4ibntmFa36JP8xUd29XwvC9Y2ioNfwUoDzu7wMbqmLd080vLtdYvhfz3YdrG' +
	'WXBawRE8ygCQJARc8RTbOP8NeNBn/O+rHv4AAAAASUVORK5CYII=';
	em["face-laugh.png"] = 'data:image/png;base64,'+
	'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAwhJREFU' +
	'OI19k01oXGUUhp/v3rlzM02mabXJRKuxBERrhlSJjdpqF+LCIq1WJQgtotEQlC4EKwjFIoLoRkLB' +
	'RiQuVBIXATexNl1oRe2kgWqahIRazHRMOpaZyWQmyWT+7s93XMSIJNAXDpzFe87mfR/FBsW+JmqY' +
	'Zg9iHBbfawJQhpECGdaiP9//MtP/96v1ZWaI4ErV6gvYO47e+9h7wbrbnzCMYBOIi1eNU8j8oGcv' +
	'n3F8JztYb/NmayfOfw+GhjDvdqxf7mrtbt/Z9pGNexVx/wSqQAB0GTHqUFYbc+Mnq6n42d+TNgc6' +
	'O/EBGPvG6r0x3lMWf0n80lnRzh8iuiqiXRG/IOKlRVcui5M9KV7pV4nHniyPDdALoGJfcE+wPjLV' +
	'fmR6qzjjlL1WPv3sK6Ktu3nm4AFEFzk38iPTMwneeHUnlvcdgfrjTHz/4oq7WmwzuzsDH9y3/+PH' +
	'7VBIKbOJCz/PcOS5F1hczLGlxqBYzLG8YnDo0LOMjk2yqzGGYBEKN1u5hQlTXRoMzu19fqIZdwwV' +
	'fAilahEjDOKCnwWdRvyb4M6hnWm8agJNLaq2i8nzXfMB7XkRZYZZindtTPSWqtv+LloTCaxHobmN' +
	'mcV+Htgdxfc0jQ0N+L5PbinPllAI13PJ55eYn79OtOE1lDIBCCjTTPtOshksRkZGyeUh0hhBGdsI' +
	'h8MIPguLJTILGf5KJBi/8hvRYyZu5QaGQZrYgHF6MX7Kz19/Sh7paBHgltOxt0Wy1/ZIauaYHxvg' +
	'9FqM4W1Te57u3zo52s0nX+5DCGNZAUQE3/fXLrVGscrbr1wk+vD7TF84teKuFtvWijRg9CYuHSwX' +
	'0+9IZiok2cRbUl7+SaqlWSkWrkoufU5Ss8clM1UjheTrEr+4r7RepADAfFCf0LPnO0RU+533n7Er' +
	'+T5Kf/eDLv5LTAjbbsG+40NuXhuuZBKjV5I2JzbBtFyhzwxuP7rrwZeCdTseNQJ2BETjVZIUsmN6' +
	'bupbx3eWB+trNsC0CWdFj8BhNE0AGKQUDGthE87/AG3+i746WH5AAAAAAElFTkSuQmCC';
	em["face-monkey.png"] = 'data:image/png;base64,'+
	'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAv9JREFU' +
	'OI1lk0toXGUUx3/fd7+5M3fmzoQINU7bZGKTaiMRRamirTotRINg4yMFIXQWutKFZNOd4pBNpQqu' +
	'FFfFx0ZofYBGDIJYURvqIy0IorVJ00mmtTiTzCMzc+/c+30uhsQxntU5h///fx6cI9hmrx8jYYfy' +
	'OELktDb9CIyAgkF/UKlxMv8ZjW686A7yR7F7lfo5veeO4XRmJOa4N4ExNOprrCz+2ipe+e2Putb7' +
	'86fxNzmqW6BHqem+gaGhwb13xdaunGe9UQYhiDi9DI3cHwvb3t7g6uI06JObHLlVPYuSQj+/e+hu' +
	'Z6N4AccWSOMjjUc8KqmtLjAwfKeD4IV89t/C6q2juMaJnvHb7bEwRLjJHm4ZfhLLEtxYWgDg5j37' +
	'8Rtlrt8oE4Ymk0pL782pyFcV35uUxJ2Zvl2Dj0xM5mRgjHATUd4/F3Ls1c/ZkRllR2aUU982ee7E' +
	'WRJxh1AjJp7JyfSuwWzMcmakHzD14MHDMddNoTVIBF9/OUvQaFE6v0jpx0W+n5vFFgZLGLQxuMkU' +
	'Dz18OBoEZkr5GozpzKMNYELefWWMdqVF2PQAw9svHUQlo1Tr1Q4GMECgwTq0z9r5d6l8jw481fQ1' +
	't+8bIaIUylFEklGUG8OKKYQErTUrxSJKSH76ZcErlddPiXwW10/ZZ+IqeGzsyLO0ahUGBvqxLIuo' +
	'bRMEbYIwRAcBy1cLJFK9fPrxhxgRmVuv+pMq/w118MdnnhLh7nS/PHetwvzpj6hV1wjDsHNtQhCP' +
	'JxkevY8Dt/WhtQlPzPrj/zkkY6j7zXLqUDbLoxM5hHI6ZBkBDCZo0a4ss7ZyEWPERmcLXQJCcGm1' +
	'sHRv3HEIqoXtL7K1ueWlywjBn5spa9M5MELxr9VrT6RSiahEY1kKy+rot/0WtUqJQmGJs9/N15rt' +
	'YPqHS/z+v2d6+QjvRW3n6VszO92eZBzbtsFoPM9jvbrB5eXrdc/zPnntC3JbnW/v8vjjjEekeDHU' +
	'PBBq0yMAIUXFksy32+adN+aY7cb/A+NgQmm+0HWUAAAAAElFTkSuQmCC';
	em["face-plain.png"] = 'data:image/png;base64,'+
	'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABmJLR0QA/wD/AP+gvaeTAAAAB3RJ' +
	'TUUH1wgOER8RqU5d7gAAAvhJREFUOI1lk01onFUUhp97v2/+dGz86ZhAHVPR1EXLmDYQW8SiIriR' +
	'UEGDUHFXIuLG0pUSBV1oDRIQGmlxo6aCobVjbfF3ISkJgWLUkFLBppmkU5yfSJKZTL+Z77v3HheD' +
	'IslZncXL4Zz3PY9iU019xh7teUOIHhBrugCU1iWQ807cycdeZv7/evVvc2WCeK0VG/MT2w/3HBiO' +
	'p+95XOt4F0iEaS1Qr/zkrl0+Edpw5XRHgld3DxL+N2BiAi8bxibv232kb0fuvQTRVST6E2gBPkiA' +
	'kEbFcyzNvtkqLVz4pZjg4OAgFoCZL2KjN2aHArFrYm9dEBf+IeJaIi4SsXURUxbXvCzhyhtibl2S' +
	'hamngplxRgHU1Cd0xzs65/qem98m4Sw60c/7IyeoVsp8OPI24hocHxmjWrnJB+88QVg7h9/xGr9d' +
	'fL4WbTRyWif9oz2PvpXGXEf5OwGPM2e/Iv/1RZAQXI0z534k/8002L/AlrDBJbpzL6RJclSj9KF0' +
	'5kktpgAqBtLk4Z5d7OvNIS4At86uB9Ls3XM7El4BFDaYJp05qJVwyHfGdOpYBgkrYIqIdy/jnx4H' +
	'iRC3ArbM56eeBbOImGXA4sIlkndncY5OHwAxiNQgugpuDVSqvb7UwFbBrYJr4GwTcS1EQkAA8JXn' +
	'lW2rcL8WjdgSSgJQybbANRC3CvZvxK3h7AbOBqAzREEBrSlrweZr5W8d/g4wNxGzjJgCYpYQW2wb' +
	'58pYs4o1Nayt46X6qVcnnSjy7RjvuHNu38AP26R+it8nvyTYqG/+cAASKZ+H9naTyrzL3PdHatFG' +
	'I6cAZsb1aOeDz7yS7R1OKjyU19G2RqR9ilhELM6UEbtKcf6joFqYPrn/JV73AZbj7pi79l2/iOrL' +
	'PjKcsI08NvgZGy4iroXyMnipA/i3Pc2N+Y+blcXpX4sJjm2Bab3JmBe/6/DO3hfj6e37dSyZBXFE' +
	'wXXqKzNuae5saMP10x3JTTBtwVkxJDCAowsATUnBeSdswfkfZeadASz58EIAAAAASUVORK5CYII=';
	em["face-raspberry.png"] = 'data:image/png;base64,'+
	'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAxhJREFU' +
	'OI1lk09MXFUUxn/3zpsZKFMoAoUEsW0MNbHNWIviv9CoOxtDamNJGxI3pkGNq6YrDZp0oy1p2AiJ' +
	'jS5U6oJUi9pGqy5qEWzSQCyBUGNpAallAAPzYHgz7917j4sJxupZncWXL1/O+X2K/8zQp+zWsVgH' +
	'olvFmjoApfU8yNdO3IfPvML4v/VqY5noJ+EX4r1esrq98anORKqqRetEHUiEKUyxuvCju3mtJ7Th' +
	'0tmKJG/saiP8x6C/n1hDGL9y/66jTfXp95JEk0j0O1AAPJAAIYVKpJkZfbswP3VhZC7JvrY2LABX' +
	'P493/zHaEYhdEbt+QVx4Q8QVRFwkYldFTEZc/pqES2+JWR+UqaHng6t9dAOooY/YlqioHWt6abxc' +
	'wlF0spn3u3pYXMhwuutdxOU42dXL4sIdTp14ltA/j1fxJr9efNmP1nJprUu8Y41PvJPC3EJ524EY' +
	'5774koGvLoKE4HzOnf+BgW+Gwd4FO48NBtmWPpSihGMapQ+kap7TYqZBxUHyPNS4k7170ogLwGXZ' +
	'uSPFo7vLkHACUNhgmFTNPq2EA54zplbHa5BwAcwcEttK3ycnQSLELYHN8NmZF8HcRswsYHHhDCX3' +
	'NeActR4AYhDxIZoEtwKqtBhffLCL4JbB5XA2j7gCIiEgAHgqFsvYwvQDWjRi51ESgCopClwOcctg' +
	'/0LcCs6u4WwAuoYomEZrMlqwA37mW4dXD+YOYmYRM42YGcTOFQ/nMlizjDU+1q4SK21mdfGKE8VA' +
	'8Y2bt4ztbf2+XFbPgGS5PniJIOtT8mqRUl1VilIKjaPqRCXVR04zdumoH63l0kWQ+nT37V9eCEww' +
	'LIW7h8WuXxYX3pDrZ7tlRGvx29tl8uBB+bOlRcbqq2Xq56fXN0DyAGYT7ri7+V2ziGpqeKQzGa3/' +
	'hA0us2nTJFkRbC5HuTFs3r+fzKlxMhPDY3OVHP9fmbJ5emOJyvbtew4nUtVPamVr+O3BQ+x47XW8' +
	'sjJsLsetng/EPpzf+tgIS/cY3FNnRYdAK446Pah0fEArnadARNYYOh+39uMN/d8jCLByKqI4aAAA' +
	'AABJRU5ErkJggg==';
	em["face-sad.png"] = 'data:image/png;base64,'+
	'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABmJLR0QA/wD/AP+gvaeTAAAAB3RJ' +
	'TUUH1wgOER8RqU5d7gAAAxJJREFUOI1lk19olXUcxj/v733PH/O1rdrZBjZn1OxCOVjC+odSQRdB' +
	'iUGuQOiqGIRXsquiggjKRqwbF8Zuqik2pi5TCupKPWtsOVMmRvO4nTnz/IvtnLOz97x/fr9vF8MI' +
	'91w9Fw8Pz8XzsbhHmW/ZoWy7F1F7RUftAJZSeZAzRszR595i5v956665NkK86scGnUTLga5nPoi7' +
	'D+1WKt4OEhL5WWrFX82NqSOBDsrHmhK8u72H4L+CkRHsjiB2/uHt7+zanP40QXgdCWcBH3BAPAQX' +
	'K54mN/2+n8+evbSYYE9PDxqAieOxgVvTvZ7oZdGrZ8UEf4oYX8SEIromEhXENKYkKL8n0eoFyWZe' +
	'9CaGGQCwMkN0xpvaru56beZ+CaZRiW4+6z9CqVjgi/6PEFPncP8gpeJtPv/4eYLqaZymg/xx7vVq' +
	'uFJPK5V0DnU99aFLdBPL2QrYjJ48xdgP50ACMFVGT//C2I/joO+AzqO9C3Sm97skOaSw1D439YKS' +
	'aB6sGEiDx7u28eTONGI8MBW2PeLyxI6NSHANsNDeOG5qj7KEfY6JojYVSyFBEaJFxG5l+JvDICFi' +
	'yqALfPf1KxDNIdECoDFBjuSDHRhDmwOARIhUIbwOZhmsDWvzpQq6BGYJTB2jG4jxEQkAAcCxbLug' +
	'/fktShSi81jigZVcC5g6YpZA/4OYZYxewWgPVIrQm0cpCo6gx6qFnw42tz6maFykXLjE7ewV6pUS' +
	'OvJBwHYc7tu0gdbNLpuaGzjuS9RK541YjJEZonPq++aK9iYlKr4tv5/aIuW5oxLUs6LDmuiwJn59' +
	'VkrZL2VyNCVLfz0qjaXjMnliYyUzROfakYbVwNxvL3uRNy4mmJWg3Cf+36+Kt7hbVnPdsjLfLfXF' +
	'NyTyroi/fEKyF59dvXskBbAQN313bvw8vXD5E1+HZQwtRDok9IuEQRFjBOw2dJDj1sxXjcLc+OWF' +
	'OH3rYKo0GLTjDxzYuvPNuNvytIolO0AMoXeTWnnC5K6eDHRQOdaUvAemdThb9ArsxdDO2s68BWeM' +
	'sA7nfwHdgsj1PdjZwwAAAABJRU5ErkJggg==';
	em["face-smile-big.png"] = 'data:image/png;base64,'+
	'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAwlJREFU' +
	'OI19kctrXGUchp/vO7fMZCan1maSmjapSJA6TaAUhNLYRXEjErW0ZiNoDRSvf4BQBHGjCyGI14WL' +
	'CrVC3GmrFapBbULAGtKSkShN0zRpkqHpkEnndr5zzvdzpUgRn9W7eHkW76u4h0unKTqe8zKin5I0' +
	'6QZQWq+DfJ2m9tOhE5T+3Vd/h9I4/lbkfewGO57rP/imn7v/Ma39bpCYJFrgbvmivXb5I5OajS/C' +
	'gFeLI5h/BOPjOLuN9/Ou4skDPYPvBMTzSPwnEAEu2Cai8yhvgKWZU9H6wrnfVgIOj4yQAjB91htb' +
	'nnmpKemmpI1zYs28iI1EbCyS3hVJymJbv4rZOCVJ4xdZmDzSnD7DGICa/Iw+PyxcPXC01CFmhmZS' +
	'5MNPPmdfcS9PPnEYsXW+/e4H5kqLvPJiD17yDW74OrPnj2/Ftfqgc3LEffvhQ+8OBZmMUk43P/5U' +
	'4ugzx7hzp0K2TVOvV6huaYaHn2Zq+gp7CpMIHpl8r1e5PeuoqTP+0qPHZnvFTKP8/SjVjug8SAzp' +
	'Btgykq5CvIQ1cyTRIpZ2dG6UKxdGb7qSJl3KyXNrbvTeR/+X7n1vYC1drogNsA1U8BAm/IrA91lb' +
	'K9PX1wvAzeUVenp2EseGheuLdHZuJ7N1HLAgBK7SKkmT225b+046Cg8S+AHokEL3LgASm6XQVSAy' +
	'EfWWQxh2EEfbsXYTBdYFEknXXeVtI4oiAj8gSRJqtRoAcRxTq9UwscHzPIwxiMojaRU0xlWQSLKG' +
	'Ulm01lQqFXK5HLlcDgARIZvNUKvXaDQabAtDYkIkXkMJqascFhMTDShzESf6kmx2EFGd2LiB0nlc' +
	'XceadRxadN5XRqez+N7vJKYfrbnm2lQ+uDV/9v3dj7yWiTbHaFXXwbaI/mP5ABd0B154hOX5iUZq' +
	'eU9NTOAGK5zP79h76IH+4WxbOKAcP0QphdIBSIrYBBFD3FylUS3J6h/fN5vVxQsHr/OsApC30FN7' +
	'eFy5vKCE/VboATyxZFCIgpbWGBQ3EC6nwumh57kE8BeMBHinq9k9vQAAAABJRU5ErkJggg==';
	em["face-smile.png"] = 'data:image/png;base64,'+
	'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABmJLR0QA/wD/AP+gvaeTAAAAB3RJ' +
	'TUUH1wgOER8RqU5d7gAAAwtJREFUOI1lk01oXGUYhZ/73Ts/sWPiT8YE2ti6SF00jDWBaBWLuhFB' +
	'QgUNQsFdCair2pVSBV3YGkNWDVjcqKlIaG2sLf5EUBqTBkqjTFMi2Px2ojOTpJnMZHLnfvd+3+si' +
	'VKR5V2dxOBx4z+Nw1419QZty3R5EdYmJmgEcpfIgF6zYT59+nan/+5074sYQ8XIQG/ASjYdbDxyP' +
	'px58Rql4M0hIFMxQKf5sb149pY1eOdOQ4I193ej/AoaGcFt07PKufUc6dmY+ShBOI+FfQAB4ID5C' +
	'CieeYWHy3SA/c/FaLsHB7m4MABNfxfpvTfb4YkpiNi+K1X+K2EDEhiKmIhIVxNauil55R6LNUZkZ' +
	'e96fGKQfwBn7jN3xhqZsx8tT9aInUYlOTvSeYrlYoK/3fcRWOdk7wHJxiY8/eBZdPo/X8BZ/XHql' +
	'HG5UM0olvaOtT7yXIprF8fYALmfPfcPwt5dANNgyZ8+PMPzdOJh/wOQx/ii7M6+mSHJU4ahDqfRz' +
	'SqJ5cGIgNR5t3Uv7/gxifbDr7H0kxeNtOxB9A3Aw/jip9EHlCIc8G0VNKpZGdBGiHOI+xODnJ0FC' +
	'xK6AKfDl6ZcgmkOiRcBg9QLJB1qwliYPAIkQKUM4DbYETt1WfSmDWQa7BraKNTXEBohoQADwHNct' +
	'mGD+YSUKMXkc8cFJbhlsFbFrYFYRW8KaDazxQaUJ/XmUoqAEM1wufG/xdkK0xOTICW4v/YKuTmP0' +
	'AjbMEdYWWc3Pcv1KFmMquHWdVJYvW3EY3nrjvfdl27t+qpfKaW5X2slN9VEtLWEiDYDredxT38iu' +
	'treJywB16Q/J/nikHG5UM1tDGlT9c1de9CN/XMK1T8TUrok1ayJWi9hAbLQqYXVUqn+/KUHpa5n5' +
	'7anNO0PyABbj9pi9+UOniNPR8tjxRLgxgvF/xeg5xAY4bhq37gDejhe4db2vVpwb/z2X4Ng2mNZr' +
	'DLjx+w/v2f9aPNX4pIolW0AsoT9LZWXCLmTPaaPXzzQk74JpG84OPQJdWJoBUOQduGCFbTj/C8H3' +
	'uN+XWOgHAAAAAElFTkSuQmCC';
	em["face-smirk.png"] = 'data:image/png;base64,'+
	'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAxFJREFU' +
	'OI1lk19olXUcxj+/3/ueP2snZ+bZBnWYOWcXynFOSCsSsiKoGN40Aq07WUQXNYSgWARGq4sYCAnG' +
	'gahmxNIaZpjVRU3OODQ0WA6t3F+PubOdcOePe8953/f3+3YhjXDP1XPx8MDD9/tR3KHsZ2zXjtOL' +
	'6G4xYSuA0noB5LQVe/zRl7j0/7z6z0wOEy3XI8fc2MYDHQ/3RxP3PqZ1tBUkIKxPUVn8yV4d/8g3' +
	'fvFEU4xXtvXgrxYMD+Ok/Mjo/dsO7bovPRAjuIwEfwF1wAXxEBKoaJq5i2/VF6bOXMjH2NvTgwEg' +
	'90Vk8NrFXk/MspiVM2L9KyK2LmIDEVMRCQtia+PiF9+UcOW8TGX3ebkhBm9vztA2/lVLyYZLYlbO' +
	'iZibMvD+uyIiIqYoNpiTgffekL7XDkpYzshK/lnxK2fl1y8bS9kMbVrH3b6O3W8nCKdR7ibA4eSp' +
	'r2nf0g7igy1z8psfGfl2DMwNMAsY7zxt6ecTxOnTKL0/kXxcSzgLKgJS48GOrXR1phHrgS2x9YEE' +
	'O7c3Iv4koDDeGInkXq2E/a4NwxYdSSL+IoR5xGlm6NMPQALEFsEU+Pzj5yCcQcJ5wGD9OeIbUlhL' +
	'iwZAQkTKXPjuRUxtEgn+RII/IJwGcx3sTbC3sKaG2DoiPiAAaOU4BVOfRYmmqXUfl7NHqBZHsfUp' +
	'CK8jpgDmH8QuY00VazzQSQJvFq0puIIZKRfOvrq+eYve3LmT+ckIV3IZvOoS1oSrHxdriLHjkc0Y' +
	'U8FNPEVladSKYkRlM7RF714/0dX9wzqpfoJueAJiu1FOM6joaoGEN6jMdGFppCF5hIlzh8pB9VZa' +
	'AeSG9GBL+9Mvpzr742b5KGL+BgSRADE1jKliwzKiN9CQfIf8paPe0uzY8T0Hed0FmI/aw/bq9w+J' +
	'qF2pHf0x4/2C8X7G+DOIraOcJO66Z3DvepJrv39YW5wZ+y0f4/AamEo1jjnRew5s6nwhmti4R0fi' +
	'KRBL4E1TKebs3MQp3/ilE03xO2Bag7OiV6AbS+vtW7Gg4LQV1uD8L+4wraygVlwYAAAAAElFTkSu' +
	'QmCC';
	em["face-surprise.png"] = 'data:image/png;base64,'+
	'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABmJLR0QA/wD/AP+gvaeTAAAAB3RJ' +
	'TUUH1wgOER8RqU5d7gAAAxZJREFUOI1lk19olWUcxz/P877nj+7gwXJ/QNcWsRU4TquBpqVYXQUh' +
	'C2wEggQVg/AivCwsyIu0TYXCQTGSSoOGa2spXVSC04m0Gks9OKzN/XG0szNy5+ycvee853meX1dK' +
	'6ffqe/Hle/X5KO7LyFe0aM/rRPRusaYOQGm9ADLkxH327D6u/3ev7pZ0H9F8OdLjxzbsbdp2MJp4' +
	'eIfW0TqQCqY8ycriz+6v0ROhDZdOJ2O8vbmD8N5BXx9efRgZ3rT5rbaNqY9iVG4glT+BMuCDBAgJ' +
	'VDTFzNh75YXJs7/fjrGzowMLwJVvIsfnxjoDsctiV8+KCydEXFnEVUTsiojJiCuNSrj0rpjVizI5' +
	'8kJw5RTHAdRILw3RZO3Vtleur5NwDB3bwuGuE2QXMxzt+gBxRY509ZBdnOfjD3cR5gfwk/sZP7cn' +
	'XykUU1rH/QNNW99PYKZQfiPgcab/Owa/PwcSgstzZuAnBn+4DPZvsAvY4CINqVcTxDmgUbo9Uf28' +
	'FjMNKgJS4vGmZp5uTSEuAJej+dEET7VUIWEaUNjgMonqnVoJ7b4zplZHqpFwEcxtxKvh1JdHQCqI' +
	'WwKb4evPXwZzCzGzgMWFM8Qfqsc5an0AxCCSh8oNcMug1oCEiL1DKT9BLF5BuSLOlhBXRiQEBABf' +
	'eV7Glqcf0aIRu4CSAFScUjHLH79040wO7VeR2r4Nzy/gbAC6mkowjdZktGAH85kfHf5GMPOImUXM' +
	'NOlf+xk4b9h/2GfgPKTHb2JNHmtX8NZsYSU77EQxqCm5Y1O/fVLAfwLEgZkDM4v1W+g+WWR8wtB9' +
	'soiNbMWaO4hK4q/dxey1gQIljnlfDJF7oz2steFca7LhHd8Gozgzj656kXXJBpZzBTrf3MOO55qJ' +
	'R26ytuYQ8+lPg+I/U73bX+fbeyhvKqvhusdeaqt/8mDMBhcQM4VKHiIWr6FcyiKFXnS0hblrR0uL' +
	'ty6M3UX5fzLlSvR40fV7G1tfiyY2PKMj8UaUihOuplnJXnIzV/tDG+ZOJ+P3yfSAzopOgd046gDQ' +
	'LCgYcsIDOv8LDgegbYsEEhIAAAAASUVORK5CYII=';
	em["face-uncertain.png"] = 'data:image/png;base64,'+
	'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAxlJREFU' +
	'OI1lk0tsVGUYhp/zz5lLceigzLRNZCxEiiYlI1KDihEvcaMxDSbaNCHRuCBNDCvCSoMmbhQrqRsa' +
	'JW7UYkwDUhHirRuBlibESoaSqrSdFoqdS2PnwsyZOef8/+eiwRj6rd7Fmzdv8r2PxV039iXbVSDQ' +
	'h6hu0X4bgKVUFuSMEfPZU68z9X+/dUdcGyZUbgQH7XB8X8eTh0PRjU8rFWoD8fAbs1Tyo2bm8jFX' +
	'u8snYmHe6uzB/S9geJhA0g2e39S5v+v+1AdhvGnEuw40ABvEQYhihVIsTL7TyM6e/W0xzJ6eHjQA' +
	'E18HB25O9jmii6JrZ8W4f4iYhojxRHRFxM+JqV8Wd/lt8WsXZHbseWdiiAEAa+xz2kOx1nTXK1PN' +
	'4k6iwrv4sP8YhXyOo/3vIabKkf5BCvlbfPT+s7jl09ixA1w592rZu11NKRWxD3Y8/m4Ufw7L3gwE' +
	'OHnqW0a+Owfigilz8vQvjHw/DnoJdBbtXKA99VqUCAcVltobTTynxJ8HKwhS56GObezckUKMA6bE' +
	'ti1RHt1+D+JeAyy0M040sUdZwl7b+H6rCiYQNw/+IhJoYeiLIyAeYpZB5/jq+MvgZxD/BqAx7gKR' +
	'+5IYQ6sNgPiIlMGbBlMEq2m1vpRBF8CsgKlidB0xDURcQACwrUAgpxvzDyhRiM5iiQNWZNVgqohZ' +
	'wa//TSk/TbGwgB30iG9qx3PmUYqcLeiRcu6HAxtatirqFxFVQiRA5Z9blAozFAsZXKdOPLmb+IMv' +
	'0bS+FeNeoVI4b8RiZPWN6zekd3b/3CyV4yAl0mOjrIt1sjH5DNHEY4SatmDcv/Bql/DqU4Rjb5L+' +
	'aX/Zu11NrQ5pSA1kLr3o+M64NJZ6xSt9Kro2Kt7KJ1JfekMqc51S+rNFitcflkbxG5m9uLt2Z0g2' +
	'wI2QOWRmftwlYnUlHzkc1s6vuOWP0W4GMQ2sQAK7uRd73QvcvHq0ns+M/74Y5tAamEp1BgOhe/dt' +
	'3tEbisafUMFIEsTgOXNUlifMQvqUq93SiVjkLpjW4GzRJ9CNoQ0ARdaCM0ZYg/O/DZiuysOGuroA' +
	'AAAASUVORK5CYII=';
	em["face-wink.png"] = 'data:image/png;base64,'+
	'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABmJLR0QA/wD/AP+gvaeTAAAAB3RJ' +
	'TUUH1wgOER8RqU5d7gAAAw5JREFUOI1lk01oXGUUhp/7zX8cO2o6JFVD6yJuIqMYjFZRVNwIGira' +
	'IBS6CJaA6KbWVamIG6lasjKgBFpqqiVYG2r9d6FNE1OKsU5bbGoyaZIJziQpzm/u3Hu/7zsuxoo0' +
	'Z3UWh/dwzvs+DjfVxFHuU6HQAKJ6xeh2AEepAsgpK/ajx3Zz6f/zzo3m8ijRihcZCsc27+rcfiCa' +
	'bH1cqWg7SID25qiu/Ghnz3/oG3/tWCrGq119+P8JjI4S6vAjZ+7u2tN9V+bdGMEfSPAn4AFhsC6i' +
	'kjiRDAvT+73C3Olf8zGe6OvDADD1aWRwaXrAFVMSs35arH9FxHoiNhAxVRFdFNs4L/7aftHr4zI3' +
	'8bQ7NcIggDMxzNZoqi3b/cKlTeJPo2I94CRANNBAbJ2D7w+xurLMe+88iV85STj1Ghe+eqkS1OoZ' +
	'peLhvZ0Pv5VE53DC2xg+/BkHPzjE8OGjID7YCp+f/IGxLyfB/AWmgHHH2ZrZmSTO3jCO2pFMP6VE' +
	'X8SJPcQr/f3gREEMohfBlrn3niT+nQHiXwYcjDtJMr1bOXJkR9hq3aYiacRfAZ1HxP/3hACx18EU' +
	'+eTj50DPNwUxWH+B+B0dWEubAkA01pQ4N7YT688gwVUkmAGdA7MM9m+wdaxpINZrLkEAUE4oVDTe' +
	'NZQTJZHqYnX+C9BzYBZBLyOmCOY6YktYU8MaF1SawL2GUhSVYMYqxW8s4S109rxOLvs1+SsnMH4O' +
	'Mfnm42wRt1ZgaTaH1lVCiR6qq2esOIw1bbz1tuyDvd9vktoInvMis+fepLz2O4mWFkQsge9hrcOW' +
	'zudpbb1AIv022e/2VIJaPdMM0oganP/lWVe7k+IV+0VXj4tfvyqlwk9SLo6LW54RvX5W6oU3xCsd' +
	'l7mzj67fCFIYYDFq99nZb3tEnO6O+w/EtPszxj1CSBcR6xHUb8EmthNueYali4caK/OTv+Vj7NsA' +
	'U7nBUCh6+65tD7wcTW5+REXiHSCWwM1RXZuyC9kTvvHLx1Lxm2DagLPDgEAvlvamVxQcOGWFDTj/' +
	'A+owvr5ooDc4AAAAAElFTkSuQmCC';
	em["face-worried.png"] = 'data:image/png;base64,'+
	'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAxJJREFU' +
	'OI1lk11o1XUcxj//3/mfl/LgrDzboNaMNouUkzZYbzgq8qIIUaghCF0Zg/BKvIjCgm7KhuzKQbFg' +
	'1ZQ5trZMySih9Jw1HG5iipUe9+LCc84WOy/b/q+/37eLYYR7rp6Lh4fn4vlY3KPs12xVkUgHonaJ' +
	'DusBLKXyIKeMmM9ffJur/89bd821AWIVL9ptxzfua37+cCz50A6lYvUgAaGXo1r82dwcP+Zrf+F4' +
	'TZx3t7Tj/1cwMECkwY+ef2TLOy0Ppz+JE1xHghuAB9ggDkISK5ZmZuIDL587fWkuTlt7OxqAsRPR' +
	'rtsTHY7okuiV02L8P0SMJ2ICEV0VCQti3HHxF96XcOWC5LKvOGN9dAFY2R4aYzV1V1r2XF0v/gQq' +
	'3sqnnceYLxY42vkRYpY50tnNfPFvPvv4JfzKMHbNAS6febMSLC2nlUrYB5uf/TBJeAvL3gREGBz6' +
	'lpHvzoD4YCoMDv/EyPejoO+AzqOdCzSm30qS4KDCUruTqZeVhNNgRUFcnmjezDPb0ohxwJTZ/FiS' +
	'7VvXIf41wEI7oyRTbcoSdtsmDOtUNIX4RQjnkEgtfV8dAQkQswC6wDdfvAHhFBLOAhrjz5B4sAFj' +
	'qLMBkBCRCgTXwZTAum91vlRAz4NZBLOM0S5iPER8QACwrUikoL3pR5UoROexxAErsRowy4hZBP0P' +
	'YkoYvYTRDqgUgTONUhRsQY9UCj8c2FDbpHAzuO4sk+e+xAK279wPpsrkuZMI8FRrEypSxU7upDp/' +
	'3ojFCNkeGsdPbihr56KExf2S6UWC6o8SVM9KphfJ9CJeaUi8xX7J9CKLfz0u7uIJudi/rpztoXH1' +
	'SH2qa+q315zQGRXvzl5x59rEndsh4dKwBNVBqeaapPxnrZRuPCleqV9ymRdW7h7JBpiNmUPm5tlW' +
	'Eaul4enDce38inZ+wS+8hxgPK5LCXv869v2vcvv3o25xanRyLs6hNTCVXbojsQf2bdq2N5bc+JyK' +
	'JhpADIFzi+rCmJm5MuRrv3y8JnEPTGtwtugQ2IWhHgBF3oJTRliD87+0PbvbsYwBlAAAAABJRU5E' +
	'rkJggg==';
	em["idea.png"] = 'data:image/png;base64,'+
	'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABmJLR0QAAAAAAAD5Q7t/AAAACXBI' +
	'WXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH1QMCBiAyOlCc9wAAADV0RVh0Q29tbWVudAAoYykgMjAw' +
	'NCBKYWt1YiBTdGVpbmVyCgpDcmVhdGVkIHdpdGggVGhlIEdJTVCQ2YtvAAACq0lEQVQ4y5WSS0hU' +
	'cRTGv//cO+O9OtdHJllqZlI+CEUiE8ShBiXUpKKQbGLKcGG0CBOyRcsQMapFj02ii4igAgMDJcgQ' +
	'SXQmSkrNijSVTJ1xdJy5d6739W/loDURfqtz4Pt+nHM4BBFUXNnUTCkcBiUpIISYiDHLEPq0/2Vr' +
	'459edn1TVN6UwTCk72JtZVq5vQBxAg9VN+DxBVN7ej9cISbmLKV6SX9X69eIAJYlb++11G/fk7lj' +
	'LBBSRmd9khJaVVlF06NtJflZ6enJe1tuPXYBiF/LMGtFSdXV2/Xnj5YVH8z5rKi6m7eYFQBEpyCq' +
	'Tg3vSmiWi+YQzXM7dSYlc3L8bScAmMIkhj1Xbi9AIKSOsSxDLWbGIIRQUBiabiiUwuganOwuKswB' +
	'w3Kn1nJhwKpC4wUrD1nRV1XNSDQzpguJsZxzV7LgyN+91QElkDrlEf08zyEgqVxtXYNpww0IIUTR' +
	'dEiyajIMKiZYo+D1Sy5RCjErQUkbnpaGFUU3qaqxFuEBiGFADM9KXl8gRpRVy4qk+jOSYzH6w/de' +
	'VHQ6tyQp7m+LHsFqSfD6g4gTeLWjrVncsIKZ0QZ63gyDj2JzJ34tiwDw0yfqHye8/t7hmYUlUTZX' +
	'7E+rGHKNwcph4q8bbBNCxzu7+uWZ6fnstCTroWvtAzfPHM665P4yH2JYkui0Z1X7F5dy3IMjqsD6' +
	'SsOrr/+DY6cbq2QqPC8rLbIUHshGNM9B1XX4lkUMucbxzjWixXHS5SftNx5EBABAbV1DYohucQVk' +
	'pDtOJDGEACwLdHXPBRnNv6+j7c4U/qeaGrvV6bRRz2IfFWUX/T75jDqdNhrJy/6DoQLA/bsPkZ2b' +
	'jempaWxaTqeNzsy+MgLSEP00+sLY7AQAUFV98nqNIMQfWVhYeJ2XF/sokuk3Vkw2XnyKHQQAAAAA' +
	'SUVORK5CYII=';
	em["question.png"] = 'data:image/png;base64,'+
	'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAABl0RVh0' +
	'U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAM2SURBVDiNbZNbbFRlFIW/8//nWlEawIZO' +
	'ofQ27YBOqVOCBU1TLkYt+qKihsSEmBgTKwZJTCdBjGmirRck8UENiRHS+OCDCaBHI4KO1aAFaRla' +
	'24Jjp2KdoS1Qe5lpp3bO70NLA8Gd7JedvVfWXllLU0pxYxVvawkAzwB1QHB+3AVEgNa4G+67cV+7' +
	'DlC8rUUAjYtyzFd3PrrOvifgE5Xl+QCcv5ik80LCO3Ts18xkeqYJeDvuhr0FgPnjtvuqikItLz3s' +
	'nIoOcKI9Rk//MABrSvJ4oMbPxrWrCL//9dRPnQMdQG3cDXv6PJPGTetKQ2/uesjZs/9Lro2l2fvc' +
	'Zir9+aSnZvihI06r28nxX2K8u+cR55UDbvWPHfFGoJmi+uZAcPt7qb+Hx9TT4U9VUX2zerHliMpm' +
	'PdXTP6RGx9NKKaVOno6pmp0fqYa3vlCJkXEV3L4/XVTfHJC5/q0vv/Dkhk2j42nt0LGzABiGzmfH' +
	'z3PYPUd79188vuVuVi7P5fPvexkZTVG6YgklK5bKU9E/JwRQV1Xh0060xwCwTJ1Ll8dIXk1hWwZV' +
	'FT4Arv6TxjB0chyLzt+HCK0uEFKIOh0IBsuWE72YxDAkpmlgWQaWaRAKFLB7x0aUUhw82oFjWwih' +
	'kbgyyeriPDylgtdFRAgNQ9cxjbm2TIO9z9Zi6pLDX0XpuzRKjmMihMCxTDQ0NEAAXV2xy4QCBRiG' +
	'nGNh6Cy+3WYgOcaZ3gRt0UEc28SxLXIck/LCZcQGryGk6BJA5NyFhLdlfRm6LtF1iWHoaELwc/cg' +
	'p3uTSCmxbWMBpNKfR/cfQ14260UE0PrxkTOZDWtXsf6ulehSoktB7iKH3U/dS8Nj1eQ4JpZlYtsm' +
	'a4rvpMyXy4HWSEYp1SribrhvIpVp2vfBN1OvP7+ZUMCHlAIptQW/G/O6BAqX8ERtKa99+O30RCrT' +
	'FHfDfTdZeWuNv/qNhgftaGyYaGyYxJVJbHvu58rSZZTkL6bp4Mlpt63n7My/s7VxN+zdEqY7brP3' +
	'7dpxv11V4dPKC5eiaRrxxCi/9Y9473zyXWZ8crop63k3h+n/4iylqFNKBQGklF2zs9mIUuqWOP8H' +
	'ZvdMlKLbimEAAAAASUVORK5CYII=';
	em["stock_right.png"] = 'data:image/png;base64,'+
	'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAABl0RVh0' +
	'U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAHDSURBVDiNnVNNaxNRFD1vkmiooV0kjQQV' +
	'O4KuKogLIYoKCoqZpXv3+gveP3D+iH9AeOBacSFUQaj1a+JTk1RrWpOQmc5MPt5x0XYaYycBL7x3' +
	'F/ecc++7716QRNpZqT1+NCtOEoIk0sx2XF8I8YTkQ62kOQpjpbL3LFMqLj4QQjy1Hff4/wjg6pXV' +
	'/MqZk7eFEC9tx12ajguSsB23D6AwHcxlLdy7U8XYEHWvMfxYbzZJXtdKtqYFwtrdat6yDgsSAiCB' +
	'nh+j68eoFBewubk1Xn//rQPyplZyAwCyB4SRIVpbPZiUnra2A5TLy5lLmWzx7bv6K9txa1rJF4nA' +
	'IB5gN4xhDAAcqIjDWwA6jHC2vCTOnztd+OQ1ntmOaycCUTRAEMQwM771VKmATrcHT7d2AdzXSv5K' +
	'BIYjA7uy+BeBBLp+jN/9CJXiCQyiCB8+f/Vp6Ggln0/2YPT6zcZ4OmM2Y4nVixesXG4BYRDQ+9L0' +
	'Qd7SSq4lmH1fSh48YaOx6QyGJu/3++Z742cP5A2t5PokZt4oh8vl0rF2e2cb5DWtpPdPlans/Ta0' +
	'2zs/QFa1ko2jAPNGeQ3k5TTyXorZ61yYt85/ANR7LcV/o6ZXAAAAAElFTkSuQmCC';
        return em;
}
////////////////////////////////////////////////////////////////////////////////
function insertAfter (el,rf) {
    if (rf.nextSibling != null)
    {
      rf.parentNode.insertBefore(el, rf.nextSibling);
    } else {
      rf.parentNode.appendChild(el);  
    }
}
////////////////////////////////////////////////////////////////////////////////
function getByClass (className, parent) {
  parent || (parent=document);
  var descendants=parent.getElementsByTagName('*'), i=-1, e, result=[];
  while (e=descendants[++i]) {
    ((' '+(e['class']||e.className)+' ').indexOf(' '+className+' ') > -1) && result.push(e);
  }
  return result;
}
////////////////////////////////////////////////////////////////////////////////
//	Allow users to reommend cccp with the links required
function cccpRecommend() {
    cccp_comment.value = cccp_comment.value + '\nTo use the Crikey Clear Comment Preview script, install in order:\n<a href="http://www.mozilla.com/en-US/firefox/personal.html">Firefox</a>\n<a href="https://addons.mozilla.org/en-US/firefox/addon/748">Greasemonkey</a>\n<a href="http://userscripts.org/scripts/show/66745">cccp</a>\nor:\n<a href="http://www.google.com/chrome">Google Chrome</a>\n<a href="https://chrome.google.com/webstore/detail/dhdgffkkebhmkfjojejmpbldmpobfkfo">Tampermonkey</a>\n<a href="http://userscripts.org/scripts/show/66745">cccp</a>';
}
////////////////////////////////////////////////////////////////////////////////
//	Used to Hide/Show the help section
function helpToggle() {
	var cccp_helptoggle     = document.getElementById("cccp-helptoggle");
	var cccp_helpcheatsheet = document.getElementById("cccp-htmlcheatsheet");
	if (cccp_helpcheatsheet.style.display == 'none') {
		cccp_helpcheatsheet.style.display = 'block';
		cccp_helptoggle.innerHTML = 'Hide Help';
	} else {
		cccp_helpcheatsheet.style.display = 'none';
		cccp_helptoggle.innerHTML = 'Show Help';
	}
}
////////////////////////////////////////////////////////////////////////////////
// Replace space with &nbsp; in code blocks
function mungeCommentCode() {
    var codeTags = cccp_comment_dom.getElementsByTagName("code");
    for ( var i = 0; i < codeTags.length; i++ ) {
        codeTags[i].innerHTML=codeTags[i].innerHTML.replace(/ /g,'&nbsp;');
    }
}
//	Munge quote URLs into a pretty form
function mungeCommentQuoteURLs () {
	var qURLs = cccp_comment_dom.innerHTML.match(new RegExp('(?![">])(http:\/\/blogs.crikey.com.au\/.*#comment-[0-9]+)\\b(?!["<])', 'g'));

	var qId;
	var qLi = document.createElement('li'); 
	for (i in qURLs) {
		qId = qURLs[i].match(/comment-[0-9]+/);

		//	Get the quoted comment as an <li> node
		if (document.getElementById(qId)) {
			qLi = document.getElementById(qId).cloneNode(true);
			qLi.setAttribute("title" , '');
		} else {
			var req = new XMLHttpRequest();  
			req.open('GET', qURLs[i], false);   
			req.send(null);  
            if ((req.readyState == 4) && (req.status == 200)) {
				req_dom.innerHTML = req.responseText.replace(/id="/mig,'id="req-');;

				var qComments = req_dom.getElementsByClassName('byuser');
				for ( j in qComments ) {
					if (qComments[j] != undefined && qComments[j] != null && qComments[j].getAttribute('id') == 'req-'+qId) {
						qLi = qComments[j].cloneNode(true);
						break;
					}
 				}
				var titleElementDoc = document.getElementsByTagName('title')[0].innerHTML;
				var titleElementReq = req_dom.getElementsByTagName('title')[0].innerHTML;
			
				if (titleElementDoc != titleElementReq ) {
					qLi.setAttribute("title" , ' on ' + titleElementReq);
				} else {
					qLi.setAttribute("title" , '');
				}
			}
		}

		var qAuthor = qLi.getElementsByClassName('fn')[0].innerHTML.replace(/<a.*>(.*)<\/a>/,'$1');
		var qNumber = qLi.getElementsByClassName('comment-number')[0].innerHTML;
		var qThread = qLi.getAttribute("title");

		//	Remove header info from quoted comment
		for ( j=0; j<6; j++)  {
			qLi.removeChild(qLi.childNodes[0]);
		}
		var qText =  '\n<blockquote><i>\n' + qLi.innerHTML.replace(/^\s+|[\s\n]+$/g, '').replace(new RegExp('<[/]p>','g'), '\n').replace(removeHTML, '') + '</i></blockquote>\n';

		cccp_comment_dom.innerHTML = cccp_comment_dom.innerHTML.replace(qURLs[i], '<a href=\"' + qURLs[i] + '\">' + qAuthor + '@' + qNumber + qThread + '</a>' + qText);
	}
}
////////////////////////////////////////////////////////////////////////////////
// Very Easy Quotes
function veryEasyQuotes() {
    cccp_comment_dom.innerHTML += location.href.replace(/\/#.*/,'') + '/' + this.id;
    mungeComment();
}
////////////////////////////////////////////////////////////////////////////////
// Munge comment text before preview or submit
function mungeComment() {
    mungeCommentQuoteURLs();
    // Previous munges are copied back to cccp_comment;
    cccp_comment.value=cccp_comment_dom.innerHTML
    mungeCommentCode();
}
////////////////////////////////////////////////////////////////////////////////
// Preview comment (copy to DOM; munge; copy to hidden textarea; preview)
function previewComment() {
    cccp_comment_dom.innerHTML=cccp_comment.value;
    mungeComment();
    comment.value=cccp_comment_dom.innerHTML;
    acp_preview.click();
}
////////////////////////////////////////////////////////////////////////////////
// Submit comment (copy to DOM; munge; copy to hidden textarea; submit)
function submitComment() {
    cccp_comment_dom.innerHTML=cccp_comment.value;
    mungeComment();
    comment.value=cccp_comment_dom.innerHTML;
    submit.click();
}
////////////////////////////////////////////////////////////////////////////////
//	Main
////////////////////////////////////////////////////////////////////////////////

//	Init Global Variables
var removeHTML = new RegExp( '<[/]?([psu]|address|applet|area|base|basefont|bdo|big|body|br|button|caption|center|col|colgroup|dd|dfn|dir|div|dl|dt|fieldset|font|form|frame|frameset|head|h[1-6r]|html|iframe|img|input|ins|kbd|label|legend|li|link|map|menu|meta|noframes|noscript|object|ol|optgroup|option|param|pre|samp|script|select|small|span|style|sub|sup|table|tbody|td|textarea|tfoot|th|thead|title|tr|tt|ul|var:\w+)[^>]*?>', 'gi' );
var em = setupEmoticons();
var respond;
var respond_on;

var quotes_img = document.createElement('img');
quotes_img.setAttribute("src",em["quotes.png"]);
var quotes_lnk = document.createElement('a');
quotes_lnk.appendChild(quotes_img);
            
if (comments_on) {

    // Comments Box at the Bottom
    respond=document.getElementById("respond");
    respond_on=(respond != undefined);

    if (respond_on) {
        
		  var send_comments=document.getElementsByClassName('send-comment');
        for (var jj = 1; jj < send_comments.length; jj++)
       	  send_comments[jj].parentNode.parentNode.parentNode.removeChild(send_comments[jj].parentNode.parentNode);
        var clear=document.createElement('div');
        clear.setAttribute("class","clear");
		  comments.appendChild(clear);
		  var respNew = respond.cloneNode(1);
		  comments.appendChild(respNew); 

        //	Create a new: comment <textarea>; submit <input>; and acp-preview <input>. Hide the originals
        var comment=document.getElementById("comment");
        var submit=document.getElementById("submit");
        var acp_preview=document.getElementById("acp-preview");
        var cccp_comment = comment.cloneNode(0);
        var cccp_submit = submit.cloneNode(0);
        var cccp_acp_preview = acp_preview.cloneNode(0);
        cccp_comment.setAttribute("id","cccp_comment");
        cccp_comment.setAttribute("name","cccp_comment");
        cccp_submit.setAttribute("id","cccp_submit");
        cccp_submit.setAttribute("name","cccp_submit");
        cccp_acp_preview.setAttribute("id","cccp_acp_preview");
        cccp_acp_preview.setAttribute("name","cccp_acp_preview");
        comment.parentNode.insertBefore(cccp_comment,comment);
        submit.parentNode.insertBefore(cccp_submit,submit);
        acp_preview.parentNode.insertBefore(cccp_acp_preview,acp_preview);
        comment.style.display = "none";
        submit.style.display = "none";
        acp_preview.style.display = "none";
        cccp_submit.addEventListener("click", submitComment, true);
        cccp_acp_preview.addEventListener("click", previewComment, true);

        // Hide the horrible Crickey Help
        var send_help=submit.parentNode.childNodes[1];
        send_help.style.display = "none";

        //	Create a new cccp_comment_dom <div>
        var  cccp_comment_dom = document.createElement('div');

        //	Create a new cccp-option <div>
        var cccp_option = document.createElement('div');
        cccp_option.setAttribute("id","cccp-option");
        comments.appendChild(cccp_option); 
        comments.appendChild(clear.cloneNode(0)); 
        
        // Preview Box Next
        var ajax_comment_preview = document.getElementById("ajax-comment-preview");
        ajax_comment_preview.innerHTML="<div align=\"center\">Click the \"Preview\" button to preview your comment here.</div>";
        ajax_comment_preview.style.width="auto";
        ajax_comment_preview.style.margin="auto";
        comments.appendChild(ajax_comment_preview);

        //	Create the cccp helper section
        var cccp_helper   = document.createElement('div');
        cccp_option.appendChild(cccp_helper);
        cccp_option.appendChild(document.createElement('p'));
        cccp_helper.setAttribute("id","cccp-helper");
        cccp_helper.style.textAlign = 'center';
        cccp_helper.innerHTML = '<span style="float:left;clear:left;"><a id="cccp-helptoggle" style="color:blue">Show Help</a></span><span style="clear:both;"><a id="cccp-showconfig" style="color:blue">cccp Settings</a></span><span style="float:right;clear:right;"><a id="cccp-recommend">Recommend cccp</a></span><ul class="commentslist" list-style="none outside none" id="cccp-help"><li id="cccp-htmlcheatsheet" style="display:none"><p><big><big><b>HTML Cheatsheet</b></big></big><br />&lt;b&gt;<b>Bold</b>&lt;/b&gt;\t&lt;i&gt;<i>Italics</i>&lt;/i&gt;\t&lt;del&gt;<del>Deleted</del>&lt;/del&gt;<br />&lt;a href="http://google.com.au"&gt;<a href="http://google.com.au">URL Link</a>&lt;/a&gt;<br />&lt;abbr title="Abbreviation"&gt;<abbr title="Abbreviation">Abbr.</abbr>&lt;/abbr&gt; &lt;- Mouse-over to see text<br />&lt;code&gt;<code>Code text</code>&lt;/code&gt;<br />&lt;blockquote&gt;<blockquote style="blockquote">Block Quote</blockquote>&lt;/blockquote&gt;<br /></p><p><big><big><b>Very Easy Quotes</b></big></big><br />Click on the Quote Icon: <img src="'+em['quotes.png']+'" /> of each comment.</p><p><big><big><b>Easy Quotes</b></big></big><br />Right-Click on the <href>Permalink</href> link of the post you wish to quote.<br />Select <b>Copy Link Address</b> from the drop-down menu.<br />Paste the link into the Comment Box.<br />Click on the <b>Preview</b> button to get the Post text, and formatted link.<br /></p><big><big><b>Emoticons</b></big></big><br /><p id="cccp-emoticons"></p></li></ul>';
        var cccp_helptoggle = document.getElementById("cccp-helptoggle");
        var cccp_showconfig = document.getElementById("cccp-showconfig");
        var cccp_recommend  = document.getElementById("cccp-recommend");
        cccp_recommend.setAttribute("style","color:blue");
        cccp_helptoggle.addEventListener("click", helpToggle, false);
        cccp_showconfig.addEventListener("click", showConfigCCCP, false);
        cccp_recommend.addEventListener("click", cccpRecommend, false);
        var cccp_emoticons = document.getElementById("cccp-emoticons");
        
        cccp_emoticons.innerHTML = '<img src="'+em['face-uncertain.png']+'" /> :-/<br /><img src="'+em['face-monkey.png']+'" /> :monkey:<br /><img src="'+em['face-devilish.png']+'" /> :devil:<br /><img src="'+em['face-angel.png']+'" /> :angel:<br /><img src="'+em['face-smirk.png']+'" /> :smirk:<br /><img src="'+em['face-kiss.png']+'" /> :kiss:<br /><img src="'+em['face-plain.png']+'" /> :neutral:<br /><img src="'+em['face-surprise.png']+'" /> :shock:<br /><img src="'+em['face-smile.png']+'" /> :smile:<br /><img src="'+em['face-worried.png']+'" /> :???:<br /><img src="'+em['face-cool.png']+'" /> :cool:<br /><img src="'+em['face-smile-big.png']+'" /> :grin:<br /><img src="'+em['face-embarrassed.png']+'" /> :oops:<br /><img src="'+em['face-raspberry.png']+'" /> :razz:<br /><img src="'+em['face-wink.png']+'" /> :wink:<br /><img src="'+em['face-crying.png']+'" /> :cry:<br /><img src="'+em['face-surprise.png']+'" /> :eek:<br /><img src="'+em['face-laugh.png']+'" /> :lol:<br /><img src="'+em['face-angry.png']+'" /> :mad:<br /><img src="'+em['face-sad.png']+'" /> :sad:<br /><img src="'+em['exclaim.png']+'" /> :!:<br /><img src="'+em['question.png']+'" /> :?:<br /><img src="'+em['stock_right.png']+'" /> :arrow:<br /><img src="'+em['idea.png']+'" /> :idea:<br />';
        
    } // Respond section

	// Make sure every blockquote has italics
	Array.filter( document.getElementById('comments-list').getElementsByTagName('li'), function(elem){
		elem.innerHTML = elem.innerHTML.replace(/\<blockquote\>/g,'<i><blockquote>');
		elem.innerHTML = elem.innerHTML.replace(/\<\/blockquote\>/g,'</blockquote></i>');
	});

    // Reorder comments; clean up italics run-on; and add VEQ icons
    var i = ul.childNodes.length;
    
    while (i--) {
        if (ul.childNodes[i] != undefined && ul.childNodes[i].innerHTML != null) {
            var li = ul.childNodes[i];
            if ( li.className != null) {
					 if (li.className.indexOf("bypostauthor") > 0) { li.setAttribute("style","background: #ffb; "); }
                else if (i % 2 == 0) { li.setAttribute("style","background: #F5F6FC; "); }
            }
            if ( li.childNodes.length == 1 ) {
                var italics = (li.childNodes[0].childNodes.length == 1) ? li.childNodes[0].childNodes[0] : li.childNodes[0];
                for (var j = 0; j < italics.childNodes.length; j++) {
                  li.appendChild(italics.childNodes[j].cloneNode(1));
                }
                li.removeChild(li.childNodes[0]);
                li.setAttribute("style","display: block; ");
            }
            if (respond_on) {
                var a = quotes_lnk.cloneNode(1);
                a.setAttribute("id",'#'+li.id);
                a.addEventListener("click", veryEasyQuotes, false);
                li.childNodes[5].appendChild(a);
            }
        }
    }
} // Comments section

// Hide avatars
if (GM_config.get('hideavatars') == true) {
	Array.filter(document.getElementsByClassName('avatar'), function(elem){
		elem.height = 0;
	});
}

// Stop login nav bar from floating down the page
if (GM_config.get('stopfloat') == true) {
	var topNav = document.getElementById("top-nav");
	if (topNav != null)
		topNav.style.position = 'static';
}
