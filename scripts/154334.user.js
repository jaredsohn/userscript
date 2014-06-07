// ==UserScript==
// @name        eSim Media Mogul Ext.
// @namespace   eSim Media Mogul Ext.
// @description add quick sub function in your artile, make sub4sub easy.
// @include     http://*.e-sim.org/article.html*
// @icon        http://e-sim.home.pl/eworld/img/favicon.png
// @version     0.2
// ==/UserScript==

// Chrome Mode
var p=unsafeWindow;
if (window.navigator.vendor.match(/Google/)) {
 	var div=parent.document.createElement('div');
 		div.setAttribute('onclick','return window;');
	p=div.onclick();
}
var $=jQuery=p.jQuery;

// eSim Media Mogul
$(document).ready(function(){
	String.prototype.trim = function() { return this.replace(/^\s+|\s+$/g,""); }
	jQuery.fn.justText = function() { return $(this).clone().children().remove().end().text(); }
	
	var mMbCode='nnb9zzb9vvecke31kelivp9611a9nmihnma9sr3288ljkkjh3yhd0vjfnifbqluqfarnfa72gd1vliicljggfd10ppnn76wv4420qqqqooa85z96c6vta3yx11utkkgeqkljwqsrrromtnjhvphe71ifd7b8uoif72a5wsjeyuoj732y7373e8wtjdpmoiifje2yhc610wdavpfcqkb9d70z547543319820zta71130';
	var nextmission=600;
	var mList=[], init=0;
	0==$('form[action="login.html"]').length&&createSubUI();

	function createSubUI() {
		$('head').append('<style>.mMb:hover{cursor:pointer}</style>');
		$.each($('.testDivwhite:first div:has("blockquote") u'), function () {
			if (1==$(this).find('.smallAvatar').length) {
				var RE=/^http:\/\/(primera|secura)\.e\-sim\.org\/newspaper\.html\?id=\d{1,}$/g;
				var t=$(this).justText().trim();
				if (RE.test(t)) {
					t=t.split('newspaper.html?id=')[1];
					$(this).append('<div class="sub mMb" id="sub'+t+'" style="display:table-cell; margin-left:10px; padding:2px; color:#FFFFFF; background-color:#9DC414; border-radius:5px; width:35px; text-align:center;">sub</div>')
				}
			}
		});
		$('.sub').click(function() { subscribeNews($(this).attr('id').split('sub')[1]); });
		$('.testDivblue .currencyFlag').dblclick(function(){rippingAry(mMbCode);});
	}
	function rippingAry(SourceStr) {
		mList=[]; init=0;
		jQuery.get(Code2Str(SourceStr), function(data) {
			$.each($('#tblMain tr[dir="ltr"]', data), function() {
				var status=$(this).find('td:eq(6)')[0].textContent;
				if (status=='accepted') {
					var newspaper_id=$(this).find('td:eq(5)')[0].textContent.split('newspaper.html?id=')[1]
					mList.push(newspaper_id);
				}
			})
			if (0<mList.length) {
				if (confirm('Do you want to subscribe from our list?\nWe have '+mList.length+' newspapers in sub4sub DATA.\n\nit will take minitues for auto-subscribe, please be patient.')) {
					subscribeNews(mList[init],'auto');
				}
			}
		});
	}
	function subscribeNews(newspaper_id, option) {
		if (option!=='auto') {
			jQuery.ajax({
				url: 'sub.html?id='+newspaper_id,
				type: 'POST',
				//context : document.body,
				success: function(data) {
					$('#sub'+newspaper_id).removeClass('mMb');
					$('#sub'+newspaper_id).text('fin').css('background-color','#008000').unbind('click');
				},
				error: function(xhr, textStatus, errorThrown) {
					$('#sub'+newspaper_id).text('error').css('background-color','#FF0000');
				}
			});		
		} else {
			jQuery.ajax({
				url: 'sub.html?id='+newspaper_id,
				type: 'POST',
				success: function(data) {
					if (init<mList.length-1) {
						init++;
						setTimeout(function(){subscribeNews(mList[init], 'auto');}, nextmission);
					} else {
						alert('subscribe finished!\nYou subscribe '+mList.length+' newspapers from our list.')
						init=0; mList=[];
					}
				},
				error: function(xhr, textStatus, errorThrown) {
					setTimeout(function(){subscribeNews(mList[init], 'auto');}, nextmission);
				}
			});			
		}
	}
	function Str2Code(d){if(0==d.length)return!1;var b=Array(d.length),a="";for(i=0;i<d.length;i++)b[i]=d.substr(i,1).charCodeAt();for(i=b.length-2;0<=i;i--)b[i]-=0>b[i]-b[i+1]?b[i+1]-256:b[i+1];for(i=0;i<b.length;i++)a+=Int2C(b[i],2);return a}
	function Code2Str(d){var b,a=d.length/2,c=Array(a),e="";for(i=0;i<a;i++)b=d.substr(2*i,2),c[i]=C2Int(b);for(i=0;i<a-1;i++)c[i]+=255<c[i]+c[i+1]?c[i+1]-256:c[i+1];for(i=0;i<a;i++)e+=String.fromCharCode(c[i]);return e}
	function Int2C(d,b){var a="",c=Array(b),a=d.toString(36);for(j=0;j<b;j++)j<b-a.length?c[j]=0:(c[j]=a.substr(j-b+a.length,1).charCodeAt(),c[j]=58>c[j]?c[j]-48:c[j]-87);a="";for(j=0;j<b-1;j++)c[j]+=c[b-1],36<=c[j]&&(c[j]-=36),a+=10>c[j]?String.fromCharCode(c[j]+48):String.fromCharCode(c[j]+87);return a+=10>c[b-1]?String.fromCharCode(c[b-1]+48):String.fromCharCode(c[b-1]+87)}
	function C2Int(d){var b=d.length,a=Array(b);for(j=0;j<b;j++)a[j]=d.substr(j,1).charCodeAt(),a[j]=58>a[j]?a[j]-48:a[j]-87;tc="";for(j=0;j<b-1;j++)a[j]-=a[b-1],0>a[j]&&(a[j]+=36),tc+=10>a[j]?String.fromCharCode(a[j]+48):String.fromCharCode(a[j]+87);tc+=10>a[b-1]?String.fromCharCode(a[b-1]+48):String.fromCharCode(a[b-1]+87);return parseInt(tc,36)};
})