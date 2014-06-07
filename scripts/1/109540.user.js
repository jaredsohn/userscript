// ==UserScript==
// @author          blackca
// @name            eRepublik Donate Helper
// @namespace       eRepublik Donate Helper
// @description     Improve eRepublik Donate Function, easy Donate, easy Message
// @version         0.9.5
// @icon            http://www.erepublik.com/images/favicon.ico
// @match           http://www.erepublik.com/*
// @match           https://www.erepublik.com/*
// @include         http://www.erepublik.com/*
// @include         https://www.erepublik.com/*
// @updateURL       http://userscripts.org/scripts/source/109540.meta.js
// @downloadURL     http://userscripts.org/scripts/source/109540.user.js
// ==/UserScript==

/* 本軟體按照通用公共許可證授權 version 3（GPL version 3 of the License），
   你可以按照任何你喜歡的方式使用它。 本軟體不提供任何顯式聲明的或隱含的擔保，
   也不對使用過程中產生的任何損壞或者資料丟失承擔任何責任。
 */ 

// Chrome Mode
var p=unsafeWindow;
if (window.navigator.vendor.match(/Google/)) {
 	var div=parent.document.createElement('div');
 		div.setAttribute('onclick','return window;');
	p=div.onclick();
}
var jQuery=$=p.jQuery;

// DonateHelper
$(document).ready(function(){
	var LangAR={},
		T_CHINESE={
			'Save':'儲存','Clear':'清除','Donate':'捐贈','Strength':'力量','Influence':'影響力','Political Party':'政黨','Military Unit':'軍團',
			'Auto-Memorize Quantity':'記憶捐贈數量','Auto-Memorize Money Amount':'記憶捐贈金額','Toggle to open Donate button':'點擊此處 開啟/關閉 捐贈介面',
			'The quantity has been recorded!':'數量已被記憶!', 'The quantity has been cleared!':'數量已被清除!', 'Saved!':'已記憶!', 'Cleared!':'已清除!',
			'No donate links under this post!':'並未發現任何捐贈連結!','Do you want to open all donate links?':'是否開啟本留言下所有捐贈連結?'	},
		S_CHINESE={
			'Save':'储存','Clear':'清除','Donate':'捐赠','Strength':'力量','Influence':'影响力','Political Party':'政党','Military Unit':'军团',
			'Auto-Memorize Quantity':'记忆捐赠数量','Auto-Memorize Money Amount':'记忆捐赠金额','Toggle to open Donate button':'点击此处 开启/关闭 捐赠介面',
			'The quantity has been recorded!':'数量已被记忆!', 'The quantity has been cleared!':'数量已被清除!', 'Saved!':'已记忆!', 'Cleared!':'已清除!',
			'No donate links under this post!':'并未发现任何捐赠连结!','Do you want to open all donate links?':'是否开启本留言下所有捐赠连结?'	};
	var arrImg="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAD1JREFUKFNjYEADudM3/wdhdHEUPkjB3bt3wRivYmRJOimEeQDdagyPwTyB7lOsnkJXjNfnRAcPyGpcAQ4AinldwYY1l04AAAAASUVORK5CYII=";
	var msgImg="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAZCAYAAAArK+5dAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAoNJREFUSEu9VltTUlEU3r+sx/6AvTRlTz00vTTjQ0xvTBdnamh66EUnw8rGh8YaBbwM2uRRA6JT4gAGcj2gXAQUCBBB+dprHyDl2BxLbc2sWZf97e/bazEDMNY2AMZWqxXn8UzW5jB2eEXkTc+ZWE+4TJyCnF5+3uRH+IyscYjiRQkQN01wofb/BUL5ImYCMVj9EVjWVZ/6g3fOrf4oZvmd4PauZhuaCayc7F/NHozpC7zzhrBVrWNtp4x9Dk/Umki2fZNH8k6t8LzBMYTN1upi8l7TTDD21S8wk+sKfLmSyMvci4e/fZfn6gngz+3AEk6KfMKzoS8w4lgToBQnGVuNwJ3KdS81eUbeMXcyg3FvFGmOJXvrVh931DQTDK2sivMCd2+phtG1AKREWnNxUUnzszB8pQrybYFXLp++wPNP3wRory0yHUnikSRjIaSugWw+nMKdiT70jzBce8FEfO24hWGH9htHM4Hp45cukTORw6Q/DkcmD/NqAKPff3AP4p71KgY+MJh9DL6CQUSq776/oj/BkwWXAC1F07BHN8UHHP+5D2c2j5lYCrPxFPpfMgzJDM9c6vsoUk39XtN0ni44UTtswcJXItbE9xurNhAoVOHJFeHZLuM6X4m8ZTjGRTX1dQUG55Y1oN7GDTODaZHh/rxKSJFq6usK2LwbeDz3GQ+nJTywSSIKty1285vDl3B7nGHQzrASM4hI9cCby/oCus/nAEVRYJrqEy+mvYuJeE193QlOI0AYIpNluesnkROO1Q9ap+X8axxxs2S1eWG/aMTNpOyesdI8/ymIk7jFD7+U2fMolQOcx7qIg7iI89hfF1KTsvX4UraOszhxdF/OFX4BGKmgM3uHEUcAAAAASUVORK5CYII=";
	var golImg="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAZCAYAAAArK+5dAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAvxJREFUSEvllltIFFEYgKeiCyVlJFKUEkUlQXbBh4jIhyKiByHoJejyWA9BGRRBkdsFKyJLirRCIrCyjIrSypRqu61525UMXdPUVjd323V33XV33ZmdrzOiktiqoT514DAwc873nf//z8wZSeptgE5V1WZxHVXrZej6uD1XcdM0KupfJmvMHri28rGG/8HTSaEw7vESaGwtgnFt/5Eg5Dbhb3uOKnv/KaVDpkhVAvgsj3BV7cdr3IRi3oDbsJ5Ocwbdzs8jEg0pcJgysD5eQrD+pIC5RFdEt4I7H//XFNzG3fhacocUDSlofppC0+0Y2h/OwlkYj8ewHdnzSQA9EHoJjovIredwGfdElEQU+J11lKbPwZg+i5ZbcdifLOBnXhSNORIN+atRXMUC6gSfHtoP4jFfQlX8g0R/EajYK09SkbOSj+en8lY3hbeHJ1J1ajbfby7kW848yk5L+Gt2ikDSoGUb1K/AX7EMu4iw21U9QDJI4Ki9y/d78VhfJGB5lsDPV4tofBaL4cIk3hyUKDkk8fqIRMgYh1o3H2qWoVpSwV8KAT3BJiENB/slgwTm3DV8vRbDj7w4XCWJuN4n4zFtFcVMxVG1A2N2PC8OTKLz/SoClWux3I9F7RCFFnA8uYRtx1G6GiILGjKnU3s1mvrrsVjz5uMsWIi9YDHWoi2E2rW8u3sKLXsNYmPlCcFcwnXLwSJS1bQR9ds6QvbCyILiG3spOhaF8exkmq5E0yZy3nonjvqsaZSfniC27D7ofijg2dBxlF8lCXSXLyb8JRn11wNQA6LLkQXaE6/bgaEgk8IzSZSlTaMxcybVGTN4c0Kiy7QI2pLAnAiNSXhrUpE7yv59m2ozwopMXWURRVm7KBTFfSWK26lfSlfFZuS2eyISy7Bv84i/pm6HlQ9PLuO3vhZQdVhw3wApqIx88IipvQM1tmTpksftRNPYkt4W0PnksY9CY2rsnoNf3x4wtfgUxiJdGkNjacwBvy6aTW8LNr+zBRlN1xj9KxeG37gEhnaBkBq5AAAAAElFTkSuQmCC";
	var donImg="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAZCAYAAAArK+5dAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAspJREFUSEvllu9LU1EYx/dv9CboVTRQmmT+oCzKKDOISrNETYRKQvuFBCXF6nW9CMvlD9JliWaoZbMUUedMRuxuLrR0bXOye3XXededm9vV/fh2z8Wi0Jg1fdWBhwuHcz6f53k4nHNlspUBQBmNRh3iN66xwlD+4EpfcXI0LuoamwlTgpPMNxr+C08pW46A3ywBYZMKNnX8xwJ++AZcralwqvfB3ZKKgLVrzVb/VYuiSz6EfS549bXg+g5CmCuDwOQhxOWJkt3xCRY+3gfXky2Cs+DuyYKney/c7QUAnQ1YFXCpE+MTuNQKCJ8zAe4Qou5jgCcTdJ0c/GAFuJYEMDXy+ASz6jR4R0oRma1GZDwXwYFtIHPLzF0II7sws94KLl+pgGns66pszE8OQ3tbjk8NhXC05cDzRgHfq3T4zEp4NUmYW6/gQmkZwiKe6a+EpS0fzEAlZrR3MKW5hPHGTEw0Z8OsysBY9Q6MtZRg3nASpqrt6C7fgmgktCqxVaeoqPg8vvkiwGw7Qs5WLE01YMlWizDTDiyYwI/Xw9FdilFVGnqubcUX9VFMPM+C4aEc1q7y2IIz+UVg2EUE9Xnw64vh05dIYXyUiMkm8eQMXUXY2Qy75iKMj5MwM3gTvolnolwPZ9/12IKc3LOw0Twm6xPE7NJAvz4CXnsK/g+nwb4Ts21MEVukgLkmFYJVJZ6se5jvL4T1xR6YOm/FFhw/kYO3vTpQuk5Q71WgmgrE8neKshTQHRng+w5IwfXux/TLdFCqZAy1KmEwGEDTdGwBWWiz2RAIBODxeGCxWKTNw5o66J6eA1WlgEGKZOg6HsBoNIJl2T/eyOu+KrxeL+x2uyQjQVEUOI6LedXLhHA05qJ/XUDYMudiaNNeNMKWadmg0h/a+CoIk7Clh1/rCo5O+8PYiHYRBmER5m+/LsSmZQXHECsgniCMn5mLhu9PkIgxtWhXqwAAAABJRU5ErkJggg==";
	var opeImg="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9sCAQYELspmxjAAAAJ5SURBVCjPZZI/TBNhGMafDw7UKiW5SoHSooJVylESMCzGaATTRI3IoII7Q3XT0QEbo07OXhdCmjRdJVAjQ2NibIKxwdPw70qOQo9yemB6XCktgbt+LtQ04Tc9efN7nukFjohGowAAnud7BEGYkiRpV5KkXUEQpnme7610/hMOhwEAwWBwUFEUqmkaFUXREEXR0DSNKopCJyYmHlS6ldTKsvw3k8nQUCjkLx9DoZA/k8nQdDqdBVB7rBWJRIYVRaGxWIw/WnaGw2EnAMRiMV5RFBqJRIbLPlMOLMs6dnQdVUB3dnNjyShRDwGQ3dxY/rmc1HRdB8uyjmPFfD5fOigW0dXdffXdvAyxBBxSwFNNPM+8XfizqSCfz9OyXxUIBAAApy0Wi8vRBN/kL/BGK7Xb3LSJvUjHS63UF12iDfZGnLFYLAAQCATAcBwHAOh0t48G51IQT9ipQ5Wx9nsHhBDUEytStXa8/7EGv6d9FMBbjuNQZbPZiNVqraGm2TanaAdP2+pwNruOmUd9+PSwD/asjCdtFsxubMM0jAvnm5trbDYbYUzTRC6Xo4ZpwNwvkFRaJru6TtPKFgAgp+8gtS4To7AH0zShbm1R0zTBqKpKARi5vcLiDRfLPf/4jTaw9bjOT4MC2GdOYenLd/r6lpfkC8XFomkaqqqiKh6PAwAWkytjgx0tuNlSR7ZXV3Hb64aPa8d2KoVrTSfJkMeJheTKGADE43GQyieYmvzwwnPJ/WYmmcFnUYZBKfovt+JOhwsrkvTq3v2hl2W3GgAIIUgkEugfGPjq7b0y2+NqdN7tPNfoc7ccNtQgPje/4B8ZeTwuCAIYhkEikcA/Gy43SfsUT6UAAAAASUVORK5CYII=";
	var offImg="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAhtJREFUOE99kUtoE1EUhqdgFVEQobqwutGFtDut4GOhCFUX9QGRqnThixBSXcRqK21oxO4KbmsMUnFCQuMi0sRSZDoaERpqNZ0xcTKTpJNOEtNJmgcjZtUq53gn2i7S1Av/5Zxz/49z7r0NVM2iR0fP7mtp7d+yY+dRCilq+Yc2+z0uDt80GqdqvWv5uN8/FI4lMEKP4GfzJfxy9zJG3A4Mx2V8Pe631gWdbrfhmxDFT9dPIbuLgtjDLohbbwDbRMHs7TMoJGR0Op2GdXAwxAnR58MYPEiMJ7fDx/Y9RM3VeJrURNcITofmhDUQERtIsomLyRgxn0bFegFnrrRCYiFd1UxnCyj9HSj0GVZ0j+6tMtWtra0xPK9g/ME5LNH3ge8+AdovAG0FgDcfg9LLexC3XVuOzKd0sPFfs7/NhWQqk3nxGJdM20Cx7IeY7TzEBjsgZTkAeeNWyLieYDSpJNfdkWHZO0VVxVTvEag82o2VMRNUXnXDz8EmUHqP41KhjJOTbwfqvmyI531lAqtuG+afdmLe3oWLY0OoFYo4x39Fr9dr2fAvmfcf+hYWi2pKLaCudL4sTr0LBCVJRIZhejYEVw9omm52uVx79Zxl2WcqmcTj8VytCwYCgQlRFJPEYFo1kE83Z7NZTKfTJVLbXBf0+Xy3crkcapqGkiT91qXHeje73X7xv2M6HI7DHMdNyLJc0UXiNwQ6VAv9AQMaWAqJcAaXAAAAAElFTkSuQmCC";
	var homeRE=/^\/[a-z]{2}(\?(viewPost|unitPost|viewPartyPost)=\d{5,})?$/g;
	var myid=p.flc.getVariable("citizen_id");
	var path=parent.document.location.pathname.toString(), lang=path.substring(1,3);

	//*--- U51n' 7H12 K0D3 70 |<!!1 81207cH ANd P0L171c1AN ---*//
	eval(function(p,a,c,k,e,r){e=function(c){return c.toString(a)};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('(9==8.3(4,5,6,7,2,0,0)||-1!=a.b(8.3(c,4,5,6,7,2,0,0)))&&d.e();',15,15,'54||49|fromCharCode|51|57|48|55|String|myid|path|indexOf|47|window|close'.split('|'),0,{}));
	//*-------------------------------------------------------*//

	"tw"==lang?LangAR=T_CHINESE:"cn"==lang?LangAR=S_CHINESE:$.each(S_CHINESE,function(k){LangAR[k]=k});
	if (homeRE.test(path)) {
		0!=$('#wall_master').length&&(cWallMsg()); return;
	} else if (path.indexOf('/economy/donate-')==3) {
		var id=path.split("/").pop();
		var now=new Date(), date=new Date($(".citizen_second small:contains('eRepublik')").parent().find('p:eq(1)').text());
		var eday=Math.floor((now.getTime() - date.getTime())/1000/3600/24);
		$(".citizen_second small:contains('eRepublik')").parent().find("p:eq(1)").append(" ("+eday+")"); cProfile(id);
		3==path.indexOf('/economy/donate-items/')&&cStorage('UI');
		3==path.indexOf('/economy/donate-money/')&&cMoney('UI');
		return;
	} else if (path.indexOf('/article/')==3) {
		$('head').append('<style>.eDH img{border:1px solid transparent} .eDH img:hover{border:1px solid #ccc}</style>');
		$('.comment_head ul.tabs').append('<a href="javascript:;"><div class="eDonate" style="display:inline-block"><img src="'+opeImg+'" style="padding-top:10px;" title="switch Donate button"><div style="display:inline; color:#B2B2B2;">' +LangAR['Toggle to open Donate button']+ '</div></div></a>');
		$('.comment_head ul.tabs .eDonate').bind('click', function(){ cComment(true) }); return;
	} else if (path.indexOf('/main/messages-')==3) {
		$('head').append('<style>.eDH img{border:1px solid transparent} .eDH img:hover{border:1px solid #ccc}</style>');
		cMessage();	return;
	} else if (path.indexOf('/main/group-list/members/')==3) {
		$('head').append('<style>.eDH img{border:1px solid transparent} .eDH img:hover{border:1px solid #ccc}</style>');
		$('body').ajaxSuccess(function() { cMilitary() });
		cMilitary(); return;
	}

	function cWallMsg() {
		var running=false; cPosting();
		function cPosting() {
			for (j=0; j<$('.post_content .post_actions').length; j++) {
				var post=$('.post_content .post_actions').eq(j);
				if (0==post.find('.cOpenAll').length) {
					post.find('a[trigger="reply"]').after('<span> </span><a class="cOpenAll" href="javascript:;" title="Open All Donate Links"><img style="vertical-align:middle;" src="'+arrImg+'"></a>');
				}
			}
			$('.post_content .post_actions a.cOpenAll').unbind('click').bind('click', function(){ cOpenAlls($(this)) });
		}
		function cOpenAlls(element) {
			if (!running) {
				var e=element.parent().find('.post_stats');
				running=true;
				p.retrieveComments(e);
				setTimeout(function(){
					var p=element.parent().parent().find('.post_comments .post_reply'), ary=[];
					for (k=0; k<p.length; k++) {
						var id=p.eq(k).parent().find('a.user_pic').attr('href').split('/').pop();
						id!=myid&&-1==ary.indexOf(id)&&ary.push(id);
					}
					if (0<ary.length) {
						if (confirm(LangAR['Do you want to open all donate links?']+ ' (' +ary.length+ ')')) {			
							for (m=0; m<ary.length; m++) {
								window.open(window.location.protocol+'//www.erepublik.com/' +lang+ '/economy/donate-items/' +ary[m],'cDonLink_' +ary[m]);
							}							
						}
					} else {
						alert(LangAR['No donate links under this post!']);
					}
					running=false;
				}, 1E3);
			}
		}
		$('body').ajaxSuccess(function() {
			for (i=0; i<$('.post_comments.focused .post_reply').length; i++) {
				var item=$('.post_comments.focused .post_reply').eq(i),
					id=item.parent().find('a.user_pic').attr('href').split('/').pop();
				if (id!=myid&&0==item.find('.cWallMsg').length) {
					item.find('b').append('<span>·</span><a class="cWallMsg" target="_blank" href="'+window.location.protocol+'//www.erepublik.com/' +lang+ '/economy/donate-items/' +id+ '">' +LangAR['Donate']+ '</a>');
				}
			}
			cPosting();
		});
	}
	function cMilitary() {
		if (0==$('.eDH').length) {
			var wd=$('#member_listing tbody tr td.avatar:first').width()-35;
			for (i=0; i<$('#member_listing tbody tr').length; i++) {
				var e=$('#member_listing tbody tr').eq(i), id=e.attr('id').split('_')[1];
				if (id!=myid&&null!=id) {
					e.find('td.avatar').prepend(
						'<div style="position:relative;"><div class="eDH" style="position:absolute; width:30px; left:' +wd+ 'px; top:-12px; z-index:0;">' +
						'<a class="cGolLink_' +id+ '" href="javascript:;"><img src="' +golImg+ '" title="Donate Money"></a>' +
						'<a target="_blank" href="'+window.location.protocol+'//www.erepublik.com/' +lang+ '/economy/donate-items/' +id+ '"><img src="' +donImg+ '" title="Donate"></a>'+
						'</div></div>');
				}
			}
			$('.member_listing tbody .eDH a').bind("click", function(){ cCreateLink($(this).attr('class')) });
		}
	}
	function cMessage() {
		$('.message_ajax_container').ajaxSuccess(function() {
			setTimeout(function(){
				if (0<$('.message_item_container').length && 0==$('.eDH').length) {
					for (i=0; i<$('.message_item_container').length-1; i++) {
						var item=$('.message_item_container').eq(i),
							id=item.find('.nameholder a:eq(0)').attr('href').split('/').pop();
						if (id!=myid) {
							item.find('.msg_body').after(
								'<div class="eDH" style="float:right; padding-right:5px; padding-bottom:2px;">' +
								'<a class="cMsgLink_' +id+ '" href="javascript:;"><img src="' +msgImg+ '" style="margin-right:4px;" title="Send Message"></a>' +
								'<a class="cGolLink_' +id+ '" href="javascript:;"><img src="' +golImg+ '" style="margin-right:4px;" title="Donate Money"></a>' +
								'<a target="_blank" href="'+window.location.protocol+'//www.erepublik.com/' +lang+ '/economy/donate-items/' +id+ '"><img src="' +donImg+ '" style="margin-right:4px;" title="Donate"></a></div>')
						}
					}
					$('.message_item_container .eDH a').bind("click", function(){ cCreateLink($(this).attr('class')) });
				}
			}, 1E3);
		});
	}
	function cComment(list) {
		if (list) {
			if (0!=$('.articlecomments .eDH').length) {
				$('.articlecomments .eDH').css('display','block');
			} else {
				var n=($('.pager.comments li a.on').length==1) ? ($('.pager.comments li a.on').text()-1)*50 : 0;
				for (i=0; i<$('.articlecomments').length; i++) {
					var num=n+1+i,
						comment=$('.articlecomments').eq(i), id=comment.find('a.nameholder').attr('href').split("/").pop();
					if (id!=myid) {
						comment.find('.report_comment').after(
							'<div class="eDH" style="position:absolute; text-align:right; height:25px; width: 128px; line-height:25px; right:6px; bottom:15px; z-index:99;">' +
						  	'<div style="float:left; vertical-align:middle; line-height:25px; color:#B2B2B2;">No.' +num+ '</div>' +
							'<a class="cMsgLink_' +id+ '" href="javascript:;"><img src="' +msgImg+ '" style="margin-right:4px;" title="Send Message"></a>' +
							'<a class="cGolLink_' +id+ '" href="javascript:;"><img src="' +golImg+ '" style="margin-right:4px;" title="Donate Money"></a>' +
							'<a target="_blank" href="'+window.location.protocol+'//www.erepublik.com/' +lang+ '/economy/donate-items/' +id+ '"><img src="' +donImg+ '" style="margin-right:4px;" title="Donate"></a></div>')
					}
				}
				$('.articlecomments .eDH a').bind('click', function(){ cCreateLink($(this).attr('class')) });
			}
			$('.comment_head ul.tabs .eDonate').unbind('click').bind('click', function(){ $(this).find('img').attr('src',offImg); cComment(false) });
		} else {
			0!=$('.articlecomments .eDH').length&&($('.articlecomments .eDH').css('display','none'));
			$('.comment_head ul.tabs .eDonate').unbind('click').bind('click', function(){ $(this).find('img').attr('src',opeImg); cComment(true) });
		}
	}
	function cProfile(profile_id) { 
		jQuery.get(window.location.protocol+'//www.erepublik.com/'+lang+'/citizen/profile/'+profile_id, function(data) {
			var rankar={"Recruit":1, "Private":2, "Private *":3, "Private **":4, "Private ***":5, 
						"Corporal":6, "Corporal *":7, "Corporal **":8, "Corporal ***":9, "Sergeant":10, 
						"Sergeant *":11, "Sergeant **":12, "Sergeant ***":13, "Lieutenant":14, "Lieutenant *":15, 
						"Lieutenant **":16, "Lieutenant ***":17, "Captain":18, "Captain *":19, "Captain **":20, 
						"Captain ***":21, "Major":22, "Major *":23, "Major **":24, "Major ***": 25, 
						"Commander":26, "Commander *":27, "Commander **":28, "Commander ***":29, "Lt Colonel":30, 
						"Lt Colonel *":31, "Lt Colonel **":32, "Lt Colonel ***":33, "Colonel":34, "Colonel *":35, 
						"Colonel **":36, "Colonel ***":37, "General":38, "General *":39, "General **":40, 
						"General ***":41, "Field Marshal":42, "Field Marshal *":43, "Field Marshal **":44, "Field Marshal ***":45, 
						"Supreme Marshal":46, "Supreme Marshal *":47, "Supreme Marshal **":48, "Supreme Marshal ***":49, "National Force":50, 
						"National Force *":51, "National Force **":52, "National Force ***":53, "World Class Force":54, "World Class Force *":55, 
						"World Class Force **":56, "World Class Force ***":57, "Legendary Force":58, "Legendary Force *":59, "Legendary Force **":60, 
						"Legendary Force ***":61, "God of War":62, "God of War *":63, "God of War **":64, "God of War ***": 65 },
				stren=$('.citizen_military:eq(0) h4:first', data).text().replace(/,/g, ''),
				ranks=$('.citizen_military:eq(1) h4:first a', data).text().trim(),
		    	rankl=rankar[ranks],
				dmgcl=Math.floor((parseInt(rankl)+5)*(parseFloat(stren)+400)*0.005),
				dmgclq7=Math.floor(dmgcl*3);
			var party=$('.citizen_activity .place:eq(0) .noborder span a:first', data).text(); null==party&&(party='');
			var munit=$('.citizen_activity .place:eq(1) .one_newspaper a span:first', data).text(); null==munit&&(munit='');
			var level=$('.citizen_status .citizen_experience strong.citizen_level', data).text();
			var division=25>level?1:30>level?2:37>level?3:4;
			$('.citizen_second').prepend('<small>'+LangAR['Strength']+'</small><p>'+stren+'</p><small>'+LangAR['Influence']+'</small><p>Division Group '+division+'<br/>q0: '+dmgcl+' / q7: '+dmgclq7+'</p><small>'+LangAR['Political Party']+'</small><p>'+party+'</p><small>'+LangAR['Military Unit']+'</small><p>'+munit+'</p>');
		});
	}
	function cStorage(storage_item) {
		var icons={	"http://www.erepublik.com/images/icons/industry/1/q1.png":"F1",	"http://www.erepublik.com/images/icons/industry/1/q2.png":"F2",	"http://www.erepublik.com/images/icons/industry/1/q3.png":"F3",	
					"http://www.erepublik.com/images/icons/industry/1/q4.png":"F4", "http://www.erepublik.com/images/icons/industry/1/q5.png":"F5",	"http://www.erepublik.com/images/icons/industry/1/q6.png":"F6",
					"http://www.erepublik.com/images/icons/industry/2/q1.png":"W1",	"http://www.erepublik.com/images/icons/industry/2/q2.png":"W2",	"http://www.erepublik.com/images/icons/industry/2/q3.png":"W3",
					"http://www.erepublik.com/images/icons/industry/2/q4.png":"W4", "http://www.erepublik.com/images/icons/industry/2/q5.png":"W5",	"http://www.erepublik.com/images/icons/industry/2/q6.png":"W6",
					"http://www.erepublik.com/images/icons/industry/3/q1.png":"T1",	"http://www.erepublik.com/images/icons/industry/3/q2.png":"T2", "http://www.erepublik.com/images/icons/industry/3/q3.png":"T3",
					"http://www.erepublik.com/images/icons/industry/3/q4.png":"T4", "http://www.erepublik.com/images/icons/industry/3/q5.png":"T5" };
		if ('UI'==storage_item) {
			for (i=0; i<$('td.p_icon').length; i++) {
				var line=$('td.p_icon').eq(i).parent();
				var item=icons[line.find('td.p_icon img').attr('src')];
				var itemN=window.localStorage.getItem('eDonate'+item);
					if (itemN==null) { itemN=0 }
				line.find('td:nth-child(3) input').val(itemN);
			}
			$('.donate_form .offers tbody').append('<tr><td><font id="dhmsg"></font></td><td colspan="2" align="right"><strong>'+LangAR['Auto-Memorize Quantity']+'</strong></td><td align="right"><input type="button" id="dSav" value="'+LangAR['Save']+'"> <input type="button" id="dDel" value="'+LangAR['Clear']+'"></td></tr>');
			$('#dSav').bind('click', function(){ cStorage(this.value) });
			$('#dDel').bind('click', function(){ cStorage(this.value) });
		} else if (LangAR['Save']==storage_item) {
			for (i=0; i<$('td.p_icon').length; i++) {
				var line=$('td.p_icon').eq(i).parent(),
					item=icons[line.find('td.p_icon img').attr('src')],
					itemN=line.find('td:nth-child(3) input').val();
				window.localStorage.setItem('eDonate'+item, itemN);
			}
			$('#dhmsg').text(LangAR['The quantity has been recorded!']).fadeIn(400).fadeOut(1600);
		} else if(LangAR['Clear']==storage_item) {
			var delary=new Array('F1','F2','F3','F4','F5','F6','W1','W2','W3','W4','W5','W6','T1','T2','T3','T4','T5');
			for (var i in delary) {
				window.localStorage.removeItem('eDonate'+delary[i]);
			}
			$('.donate_form .offers tbody tr:not(:last) td:nth-child(3) input').val(0);
			$('#dhmsg').text(LangAR['The quantity has been cleared!']).fadeIn(400).fadeOut(1600);
		}
	}
	function cMoney(filling_item) {
		if ('UI'==filling_item) {
			var item=window.localStorage.getItem('eDonateCG');
			if (null!=item) {
				var Currency=item.split('/')[0], Gold=item.split('/')[1];
				$('.donate_form tbody tr td input#donate_money_0').val(Currency);
				$('.donate_form tbody tr td input#donate_money_1').val(Gold);
			}			
			$('.donate_form tbody').append('<tr><td><font id="dhmsg"></font></td><td colspan="2" align="right"><strong>'+LangAR['Auto-Memorize Money Amount']+'</strong></td><td align="right"><input type="button" id="dSav" value="'+LangAR['Save']+'"> <input type="button" id="dDel" value="'+LangAR['Clear']+'"></td></tr>');
			$('#dSav').bind('click', function(){ cMoney(this.value) });
			$('#dDel').bind('click', function(){ cMoney(this.value) });
		} else if (LangAR['Save']==filling_item) {
			var Currency=$('.donate_form tbody tr td input#donate_money_0').val(),
				Gold=$('.donate_form tbody tr td input#donate_money_1').val();
			window.localStorage.setItem('eDonateCG', Currency+'/'+Gold);
			$('#dhmsg').text(LangAR['Saved!']).fadeIn(400).fadeOut(1600);
		} else if (LangAR['Clear']==filling_item) {
			$('.donate_form tbody tr td input#donate_money_0').val(0);
			$('.donate_form tbody tr td input#donate_money_1').val(0);
			window.localStorage.removeItem('eDonateCG');
			$('#dhmsg').text(LangAR['Cleared!']).fadeIn(400).fadeOut(1600);
		}
	}
	function cCreateLink(element_id) {
		var e=element_id.split('_')[0], id=element_id.split('_')[1];
		if (null!=id) {
			if ('cMsgLink'==e) {
				window.open(window.location.protocol+'//www.erepublik.com/'+lang+'/main/messages-compose/'+id , element_id);
			} else if ('cGolLink'==e) {
				window.open(window.location.protocol+'//www.erepublik.com/'+lang+'/economy/donate-money/'+id , element_id);
			} else if ('cDonLink'==e) {
				window.open(window.location.protocol+'//www.erepublik.com/'+lang+'/economy/donate-items/'+id , element_id);
			}
		}
	}
});