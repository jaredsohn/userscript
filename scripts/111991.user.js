// ==UserScript==
// @name           editDMHYlink
// @namespace      http://share.dmhy.me
// @include        http://share.dmhy.me/*
// @include        http://share.dmhy.org/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.5.2/jquery.min.js
// @version 0.1.7
// ==/UserScript==


function initScript() {
	$(function () {
		var XL_UID = localStorage.getItem('XL_UID');
		var pagelink = escape(location.href);
		XL_UID = XL_UID ? XL_UID : "UID";
		$('.top_sort .nav').append('<li><input type="text" id="XL_UID" value="' + XL_UID + '" style="width:90px;background-color:transparent;color:white"/></li>');
		$('#XL_UID').live('change', function () {
			if ($(this).val() != XL_UID) {
				localStorage.setItem('XL_UID', $(this).val());
				XL_UID = $(this).val();
				// requestURL = "http://dynamic.cloud.vip.xunlei.com/user_task?userid=" + XL_UID + "&st=0&furl=" + linkURL + "&ref_url=" + pagelink;
				requestURL = "http://dynamic.cloud.vip.xunlei.com/user_task?userid=" + XL_UID + "&st=0&furl=" + linkURL;

				$('#addTask').attr('href', requestURL);

			}
		});
		$('#XL_UID').live('focus', function () {
			$('#XL_UID').select();
		});
		if(location.href.match(/topics\/view\//))
		{
			var archor = document.getElementsByTagName('a');
			var quickDown = "";
			var magUrl = "";


			for (var i = 0; i < archor.length; i++) {
				if (archor[i].innerHTML.match(/點此立刻下載種子/)) {
					//console.log(archor[i]);
					quickDown = archor[i];
				}
				else if (archor[i].href.match(/magnet.*/)) {
					magUrl = archor[i].href;
				}
			}
			quickDown.href = magUrl;

			var linkURL = escape(magUrl);
			// var requestURL = "http://dynamic.cloud.vip.xunlei.com/user_task?userid=" + XL_UID + "&st=0&furl=" + linkURL + "&ref_url=" + pagelink;
			var requestURL = "http://dynamic.cloud.vip.xunlei.com/user_task?userid=" + XL_UID + "&st=0&furl=" + linkURL;

			$('#addTask').live('click', function () {
				if (XL_UID == 'UID') {
					alert('请先输入渣雷UID');
					$('#XL_UID').focus();
					return false;
				}
			});
			$(quickDown).before('<a href="' + requestURL + '" id="addTask"><img width="14px" height="14px" src="data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAKQ2lDQ1BJQ0MgcHJvZmlsZQAAeNqdU3dYk/cWPt/3ZQ9WQtjwsZdsgQAiI6wIyBBZohCSAGGEEBJAxYWIClYUFRGcSFXEgtUKSJ2I4qAouGdBiohai1VcOO4f3Ke1fXrv7e371/u855zn/M55zw+AERImkeaiagA5UoU8Otgfj09IxMm9gAIVSOAEIBDmy8JnBcUAAPADeXh+dLA//AGvbwACAHDVLiQSx+H/g7pQJlcAIJEA4CIS5wsBkFIAyC5UyBQAyBgAsFOzZAoAlAAAbHl8QiIAqg0A7PRJPgUA2KmT3BcA2KIcqQgAjQEAmShHJAJAuwBgVYFSLALAwgCgrEAiLgTArgGAWbYyRwKAvQUAdo5YkA9AYACAmUIszAAgOAIAQx4TzQMgTAOgMNK/4KlfcIW4SAEAwMuVzZdL0jMUuJXQGnfy8ODiIeLCbLFCYRcpEGYJ5CKcl5sjE0jnA0zODAAAGvnRwf44P5Dn5uTh5mbnbO/0xaL+a/BvIj4h8d/+vIwCBAAQTs/v2l/l5dYDcMcBsHW/a6lbANpWAGjf+V0z2wmgWgrQevmLeTj8QB6eoVDIPB0cCgsL7SViob0w44s+/zPhb+CLfvb8QB7+23rwAHGaQJmtwKOD/XFhbnauUo7nywRCMW735yP+x4V//Y4p0eI0sVwsFYrxWIm4UCJNx3m5UpFEIcmV4hLpfzLxH5b9CZN3DQCshk/ATrYHtctswH7uAQKLDljSdgBAfvMtjBoLkQAQZzQyefcAAJO/+Y9AKwEAzZek4wAAvOgYXKiUF0zGCAAARKCBKrBBBwzBFKzADpzBHbzAFwJhBkRADCTAPBBCBuSAHAqhGJZBGVTAOtgEtbADGqARmuEQtMExOA3n4BJcgetwFwZgGJ7CGLyGCQRByAgTYSE6iBFijtgizggXmY4EImFINJKApCDpiBRRIsXIcqQCqUJqkV1II/ItchQ5jVxA+pDbyCAyivyKvEcxlIGyUQPUAnVAuagfGorGoHPRdDQPXYCWomvRGrQePYC2oqfRS+h1dAB9io5jgNExDmaM2WFcjIdFYIlYGibHFmPlWDVWjzVjHVg3dhUbwJ5h7wgkAouAE+wIXoQQwmyCkJBHWExYQ6gl7CO0EroIVwmDhDHCJyKTqE+0JXoS+cR4YjqxkFhGrCbuIR4hniVeJw4TX5NIJA7JkuROCiElkDJJC0lrSNtILaRTpD7SEGmcTCbrkG3J3uQIsoCsIJeRt5APkE+S+8nD5LcUOsWI4kwJoiRSpJQSSjVlP+UEpZ8yQpmgqlHNqZ7UCKqIOp9aSW2gdlAvU4epEzR1miXNmxZDy6Qto9XQmmlnafdoL+l0ugndgx5Fl9CX0mvoB+nn6YP0dwwNhg2Dx0hiKBlrGXsZpxi3GS+ZTKYF05eZyFQw1zIbmWeYD5hvVVgq9ip8FZHKEpU6lVaVfpXnqlRVc1U/1XmqC1SrVQ+rXlZ9pkZVs1DjqQnUFqvVqR1Vu6k2rs5Sd1KPUM9RX6O+X/2C+mMNsoaFRqCGSKNUY7fGGY0hFsYyZfFYQtZyVgPrLGuYTWJbsvnsTHYF+xt2L3tMU0NzqmasZpFmneZxzQEOxrHg8DnZnErOIc4NznstAy0/LbHWaq1mrX6tN9p62r7aYu1y7Rbt69rvdXCdQJ0snfU6bTr3dQm6NrpRuoW623XP6j7TY+t56Qn1yvUO6d3RR/Vt9KP1F+rv1u/RHzcwNAg2kBlsMThj8MyQY+hrmGm40fCE4agRy2i6kcRoo9FJoye4Ju6HZ+M1eBc+ZqxvHGKsNN5l3Gs8YWJpMtukxKTF5L4pzZRrmma60bTTdMzMyCzcrNisyeyOOdWca55hvtm82/yNhaVFnMVKizaLx5balnzLBZZNlvesmFY+VnlW9VbXrEnWXOss623WV2xQG1ebDJs6m8u2qK2brcR2m23fFOIUjynSKfVTbtox7PzsCuya7AbtOfZh9iX2bfbPHcwcEh3WO3Q7fHJ0dcx2bHC866ThNMOpxKnD6VdnG2ehc53zNRemS5DLEpd2lxdTbaeKp26fesuV5RruutK10/Wjm7ub3K3ZbdTdzD3Ffav7TS6bG8ldwz3vQfTw91jicczjnaebp8LzkOcvXnZeWV77vR5Ps5wmntYwbcjbxFvgvct7YDo+PWX6zukDPsY+Ap96n4e+pr4i3z2+I37Wfpl+B/ye+zv6y/2P+L/hefIW8U4FYAHBAeUBvYEagbMDawMfBJkEpQc1BY0FuwYvDD4VQgwJDVkfcpNvwBfyG/ljM9xnLJrRFcoInRVaG/owzCZMHtYRjobPCN8Qfm+m+UzpzLYIiOBHbIi4H2kZmRf5fRQpKjKqLupRtFN0cXT3LNas5Fn7Z72O8Y+pjLk722q2cnZnrGpsUmxj7Ju4gLiquIF4h/hF8ZcSdBMkCe2J5MTYxD2J43MC52yaM5zkmlSWdGOu5dyiuRfm6c7Lnnc8WTVZkHw4hZgSl7I/5YMgQlAvGE/lp25NHRPyhJuFT0W+oo2iUbG3uEo8kuadVpX2ON07fUP6aIZPRnXGMwlPUit5kRmSuSPzTVZE1t6sz9lx2S05lJyUnKNSDWmWtCvXMLcot09mKyuTDeR55m3KG5OHyvfkI/lz89sVbIVM0aO0Uq5QDhZML6greFsYW3i4SL1IWtQz32b+6vkjC4IWfL2QsFC4sLPYuHhZ8eAiv0W7FiOLUxd3LjFdUrpkeGnw0n3LaMuylv1Q4lhSVfJqedzyjlKD0qWlQyuCVzSVqZTJy26u9Fq5YxVhlWRV72qX1VtWfyoXlV+scKyorviwRrjm4ldOX9V89Xlt2treSrfK7etI66Trbqz3Wb+vSr1qQdXQhvANrRvxjeUbX21K3nShemr1js20zcrNAzVhNe1bzLas2/KhNqP2ep1/XctW/a2rt77ZJtrWv913e/MOgx0VO97vlOy8tSt4V2u9RX31btLugt2PGmIbur/mft24R3dPxZ6Pe6V7B/ZF7+tqdG9s3K+/v7IJbVI2jR5IOnDlm4Bv2pvtmne1cFoqDsJB5cEn36Z8e+NQ6KHOw9zDzd+Zf7f1COtIeSvSOr91rC2jbaA9ob3v6IyjnR1eHUe+t/9+7zHjY3XHNY9XnqCdKD3x+eSCk+OnZKeenU4/PdSZ3Hn3TPyZa11RXb1nQ8+ePxd07ky3X/fJ897nj13wvHD0Ivdi2yW3S609rj1HfnD94UivW2/rZffL7Vc8rnT0Tes70e/Tf/pqwNVz1/jXLl2feb3vxuwbt24m3Ry4Jbr1+Hb27Rd3Cu5M3F16j3iv/L7a/eoH+g/qf7T+sWXAbeD4YMBgz8NZD+8OCYee/pT/04fh0kfMR9UjRiONj50fHxsNGr3yZM6T4aeypxPPyn5W/3nrc6vn3/3i+0vPWPzY8Av5i8+/rnmp83Lvq6mvOscjxx+8znk98ab8rc7bfe+477rfx70fmSj8QP5Q89H6Y8en0E/3Pud8/vwv94Tz+4A5JREAAAAGYktHRAD/AP8A/6C9p5MAAAAJcEhZcwAACxMAAAsTAQCanBgAAAAHdElNRQfbCxwOMhQkBjJ8AAAAInRFWHRDb21tZW50AENyZWF0ZWQgd2l0aCBHSU1QIG9uIGEgTWFjh6h3QwAAAU5JREFUOMvt1C9olVEYx/HPnRcMlgmmixoEhyArOzAuWkw2sRxWdcEggicZnSwsLJ5s0CynmGT+waJbOgsiWAciK6IYBkMvzPIOLpd32zux6dOeh+/5Pef58fDwP44bIZUzIZVH+3n/AOgizmMe9/Cq5rjYws1iFUv7tV4LdAr9muOPJr+C9xjUHLfHuBtNw5Wa4+6BP6w57kyUNvANM9gOqfRwG1s1x4eT73sdfXqDx1jDTTyvOX5vY/sdvf+Ia/hac3x6GDjVUXCEvZrj66PA/hGjTuM61nGnS+epQ8RmMV9zfIZNXPpjwWYlRjXHl03pM86GVE4fSzCkMh1SSXhXc/w0tkojfMGws4chlRncwnLN8WcL+wF38SKkchJX8bbmuDcOnWjELmAF92uOv9o6D4YLO3gwGC7MYRdrk2Ljoz4JqZz7mxfj8r9zH38DjHVpPG2D54sAAAAASUVORK5CYII="/></a>');
		}
		else
		{
			$('.download-arrow').click(function(){

					if (XL_UID == 'UID') {
						alert('请先输入渣雷UID');
						$('#XL_UID').focus();
						return false;
					}
					else
					{
						// var requestURL = "http://dynamic.cloud.vip.xunlei.com/user_task?userid=" + XL_UID + "&st=0&furl=" + $(this).parent().parent().find('.arrow-magnet').attr('href') + "&ref_url=" + pagelink;
						var requestURL = "http://dynamic.cloud.vip.xunlei.com/user_task?userid=" + XL_UID + "&st=0&furl=" + $(this).parent().parent().find('.arrow-magnet').attr('href');

						if(GM_openInTab)
						{
							GM_openInTab(requestURL);	
						}
						else
						{
							location.href=requestURL;
						}
						return false;
					}
			});
		}
	})
}

function run()
{
	if( !window.jQuery )
	{
		if (!unsafeWindow.jQuery)
		{
			window.setTimeout(run,1000);
			
		}
		else
		{
			initScript();
		}
	}
	else
	{
		initScript();
	}
}
run();