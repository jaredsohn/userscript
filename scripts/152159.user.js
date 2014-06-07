// ==UserScript==
// @name        淘宝客栈返利助手
// @namespace   taobao
// @include     http://detail.tmall.com/*
// @include     http://item.taobao.com/*
// @grant       GM_log
// @grant       GM_xmlhttpRequest
// @version     2.2
// ==/UserScript==
//
(function (){

    //compatitable for chrome
	if(unsafeWindow === undefined){
		var unsafeWindow = window
	}
    
    if(GM_log === undefined){
        var GM_log=function(s){console.log(s)}
    }
	var gmQuery = function(){
		GM_log("query start\n")
		GM_xmlhttpRequest({
			method: "POST",
			url: "http://kezhan.etao.com",
			data: "url=" + encodeURIComponent(window.location.href) + '&nick=taobao.com',
			headers: {
				"Content-Type": "application/x-www-form-urlencoded"
			},
			onload: function(response) {
				GM_log(response.status)
				var regPrice = /data-price=\"(.*?)\"/
				var regRates = /data-rates=\"(.*?)\"/
				var regUser = /data-user=\"(.*?)\"/
				var regUrl = /data-url=\"(.*?)\"/
				var tpl = function(price, user, url, rate){
					var kezhanurl="http://kezhan.etao.com/" + "?url=" + encodeURIComponent(window.location.href) + '&nick='
					var ele = document.createElement("div")
					var link = document.createElement("a")
                    //common attributes
                    link.style.color="#FFFFFF"
                    link.style.height="15px"
                    link.style.padding="3px 5px"
                    link.style.fontWeight="normal"
                    link.setAttribute('target', "_blank")
                    link.style.margin="0 0px 0 0px"
                    link.style.verticalAlign="middle"
                    link.style.color="#FFFFFF"

					if(price && user && url && rates) {
						var text = (Math.round(price[1] * rate[1] ) / 100)
						var buylink = link.cloneNode(true)
						buylink.href = url[1]
                        buylink.setAttribute("target", "")
						buylink.textContent = buylink.text="直接下单"
                        
                        buylink.style.background="none repeat scroll 0 0 #A1001A"
                        buylink.style.borderRadius="0px 4px 4px 0px"


                        kzlink = link.cloneNode(true)
						kzlink.href = kezhanurl

                        kzlink.style.backgroundColor = "#5AA3C4"
                        kzlink.style.borderRadius="4px 4px 4px 4px"

						kzlink.textContent = link.text = "客栈佣金:"+ text 
						//link.style.color = "blue"
						ele.appendChild(kzlink)
						//enene, oooops
						//ele.appendChild(buylink)
					} else {
                        var elelink = link.cloneNode(true)
						elelink.href = kezhanurl
                        elelink.style.backgroundColor = "#5AA3C4"
						elelink.textContent = ele.text = "没有佣金信息(点击到客栈)"
                        elelink.style.borderRadius="4px 4px 4px 4px"
						ele.appendChild(elelink)
					}
                    if (/ali_trackid=/.test(window.location.href)){
                        GM_log("found tk id")
                        var nolink = link.cloneNode(true)
                        nolink.href = window.location.href.replace('ali_trackid=', 'blah=')
                        nolink.setAttribute("target", "")
                        nolink.style.backgroundColor = "#5AA3C4"
						nolink.textContent = ele.text = "taoke!"
						nolink.textContent = ele.text = "taoke!"
						nolink.style.margin = "0 2px"
						//ele.appendChild(nolink)
                    }

					return  ele
				}
				if(response.responseText.length > 200){
					var price = regPrice.exec(response.responseText)
					var user = regUser.exec(response.responseText)
					var url = regUrl.exec(response.responseText)
					var rates = regRates.exec(response.responseText)
					GM_log(price)
					GM_log(user)
					GM_log(url)
					GM_log(rates)

                    ele_id = "J_StrPriceModBox"
					var pricebox = document.getElementById(ele_id)

					if (pricebox === undefined) {
					var ele_id = "J_PromoBox"
						pricebox = document.getElementById(ele_id)
					}
					var priceNode = tpl(price, user, url, rates)
					GM_log(priceNode)
					GM_log(pricebox)
					pricebox.appendChild(priceNode)
				}
				unsafeWindow.gmKezhang=true
			}
		});
		GM_log("query end\n")
	}

	if(!unsafeWindow.gmKezhang) {
        window.setTimeout(gmQuery, 1000)
    }
})()
