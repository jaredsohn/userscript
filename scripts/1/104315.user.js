// ==UserScript==
// @name           taobao_stock
// @namespace      taobao
// @author         leo
// @version        1.0.20110826
// @homepage       http://userscripts.org/scripts/show/104315
// @updateURL      https://userscripts.org/scripts/source/104315.meta.js
// @include        http://trade.taobao.com/trade/itemlist/list_sold_items.htm*
// ==/UserScript==
// 重写GM函数
var trace = function(msg){
    var debug = 0
    if (debug == 1) {
        GM_log(msg)
    }
}

var getStock= function(responseDetails){

    //trace("getStock!!!")
    
    var r = responseDetails.responseText
    
    //条码
    var barCode         = r.match(/<div id=BarCode>(.*?)<\/div>/)[1]
    //库存
    var stock           = r.match(/<div id=Stock>(-*[0-9]*)/)[1]
    //捕获订购
    var stockOrdered    = r.match(/<div id=StockOrdered>(-*[0-9]*)/)[1]
    //净库存
    var stockNet        = r.match(/<div id=StockNet>(-*[0-9]*)/)[1]
    //是否组合装
    var isFit           = r.match(/<div id=IsFit>(.*?)<\/div>/)[1]
    //商品所在items序列号
    var itemId          = r.match(/<div id=ItemId>(.*?)<\/div>/)[1]
    //商品所在bizOrderId序列号 
    var bizOrderId      = r.match(/<div id=BizOrderId>(.*?)<\/div>/)[1]
    //本订单订购商品数
    var orderCount      = r.match(/<div id=OrderCount>(.*?)<\/div>/)[1]
    //订单是否付款 0：等待付款 1：付款
    var orderStatus     = r.match(/<div id=OrderStatus>(.*?)<\/div>/)[1]
    //本订单收录标志
    var calcFlag        = r.match(/<div id=GotFlag>(.*?)<\/div>/)[1]
    if (calcFlag > 0) {
        calcFlag=0
    } else {
        calcFlag=1
    }
    
    trace("orderStatus"+orderStatus)
    //获取具体商品信息    
    var item = items[itemId]

    barCodeMatch=barCode+"<"
    
    if( item.innerHTML.match(barCodeMatch) ) {

        var itemDiv = item.getElementsByTagName("div")

        if (itemDiv[1]) {
            itemDiv = itemDiv[1]
            
            
            var s = '<p>'
            
            //是否组合装 <div id=isfit>1</div>
            if (isFit==1) {
                s+='&nbsp;&nbsp;<span style="font-weight:bold;color:#ff0000;">组合装</span>'
            }
            if (orderStatus==0) {
                s+='&nbsp;&nbsp;<span style="font-weight:bold;color:#ff0000;">未付款订单</span>'
            }
            if (orderStatus==1 && calcFlag==1) {
                s+='&nbsp;&nbsp;<span style="font-weight:bold;color:#ff0000;">本单尚未捕获</span>'
            }
            s+='</p>'
            
            var orderCountAll   = Number(orderCount) * calcFlag + Number(stockOrdered)
            var stockNet        = stock - orderCountAll
            
            var stockColor="blue"
            var stockStatus="可售" 
            if (stockNet<0 || stockNet=="null") {
                stockColor="red"
                stockStatus="缺货"
            }
            
            //是否缺货 当前 本单 本单捕获标志 本地待发 剩余
            s+='<table style="padding=0;margin=0">'
            s+='<tr><td>状态</td>                                                         <td>库存</td>     <td>订购</td>          <td>总订购</td>           <td>剩余</td></tr>'
            s+='<tr><td style="font-weight:bold;color:'+stockColor+'">'+stockStatus+'</td><td>'+stock+'</td><td>'+orderCount+'</td><td>'+orderCountAll+'</td><td style="font-weight:bold;color:'+stockColor+'">'+stockNet+'</td></tr>'
            s+='</table>'
          
            itemDiv.innerHTML = itemDiv.innerHTML + s
        }

    } else {

    }

}

trace(window.location.href)

//本页面订单商品总列表
var items = new Array()
var itemsSeq
    
var bizOrderId = "";
var orderStatus;

//获取订单编号
var listOrder = document.evaluate(".//tbody[@class='order'] | .//tbody[@class='order closed-order']",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null)

for (var i_order = 0; i_order < listOrder.snapshotLength; i_order++) {
    
    var curOrder = listOrder.snapshotItem(i_order)
    
    //<label for="cb90493374047484">订单编号：90493374047484</label>
    bizOrderId = curOrder.innerHTML.match(/label for="cb(.*)"/)
    if (bizOrderId){
      bizOrderId=bizOrderId[1]
    }
    
    orderStatus = curOrder.innerHTML.match(/<strong class="J_TradeStatus status wait">/)
    //trace("curOrder:"+curOrder.innerHTML)
    if (orderStatus){
      orderStatus=0
    } else {
      orderStatus=1
    }
    trace("orderStatus:"+orderStatus)
    
    //trace("curOrder:"+curOrder)
            
    var listItem = document.evaluate(".//div[@class='txt-info']",curOrder,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null)
    var listItemOrderCount = document.evaluate(".//td[@class='num']",curOrder,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null)
    
    trace("listItem length:"+listItem.snapshotLength)
     
    for (var i = 0; i < listItem.snapshotLength; i++) {
        var item = listItem.snapshotItem(i)
        var itemOrderCount = listItemOrderCount.snapshotItem(i)
        
        //trace("item.innerHTML:"+item.innerHTML)
        
        //<div style="word-wrap:break-word;word-break:break-all;">商家编码: 6931025809115</div>
        var barCode = item.innerHTML.match(/\u5546\u5BB6\u7F16\u7801\u003A (.*)<\/div>/)
        
        //判断编号是否为空
        if (barCode){
            barCode=barCode[1]
        
            if (isNaN(itemsSeq)) {
                itemsSeq=0
            } else {
                itemsSeq++
            }
            
            //<td title="2" class="num">2</td>
            var orderCount = itemOrderCount.getAttribute("title")
            //trace("orderCount:"+orderCount)
            
            var itemStockUrl = 'http://xgss2000-server/getstock.asp?barcode='+barCode+'&itemId='+itemsSeq+'&bizOrderId='+bizOrderId+'&orderCount='+orderCount+'&orderStatus='+orderStatus   
            
            trace("itemStockUrl:"+itemStockUrl)
    
            //此处为异步调用
            items.push(item)
            
            GM_xmlhttpRequest({method: 'GET',url: itemStockUrl,onload: getStock})

        }
    }
    
     
}