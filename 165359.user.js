// ==UserScript==
// @name       My Fancy New Userscript
// @namespace  http://use.i.E.your.homepage/
// @version    0.1
// @description  enter something useful
// @match      http://*/*
// @copyright  2012+, You
// ==/UserScript==

/**
 * BTC-e JavaScript Trading API
 * https://btc-e.com/api/documentation
 *
 * Author: jsCoin
 * BTC : 151vumzopVBZMV9CtswFiumQBbEHcULPnG
 * LTC : Laoq3qsLvQFCnnbfcFGpQyjy5kcK58bpen
 *
 * Dependencies:
 *   jQuery - http://jquery.com/
 *   CryptoJS - http://code.google.com/p/crypto-js/
 *   CryptoJS HMAC SHA512 rollup -
 *     http://crypto-js.googlecode.com/svn/tags/3.0.2/build/rollups/hmac-sha512.js
 **/

/**
 * On object instantiation the getInfo method will be called to initialize
 * member variables.
 */
function API(key,secret){
  this.key = key;
  this.secret = secret;
  this.headers = {
    Key : this.key,
    Sign : ''
  };
  this.getInfo();
}
API.prototype.url = 'https://btc-e.com/tapi';
API.prototype.funds;
API.prototype.openOrders;
API.prototype.rights;
API.prototype.transactionCount;
/**
 * Send the request to the server synchronously.
 */
API.prototype.send = function(params, success){
    var time = new Date();
    params.nonce = time.getTime();
    var query = $.param(params);
    this.headers.sign = CryptoJS.HmacSHA512(query,this.secret).toString();
   $.ajax({
       async : false,
       type : 'POST',
       url : this.url,
       headers : this.headers,
       dataType : 'json',
       data : params,
       success : success
    });
}

/**
 * Retrieve account information and API key permissions.
 */
API.prototype.getInfo = function(){
  var self = this;
    var params = {
      method : "getInfo",
    };
    var obj;
    var success = function(data,text){
        if(data.success===1){
          obj = data.return;
          self.funds = data.return.funds;
          self.openOrders = data.return.open_orders;
          self.rights = data.return.rights;
          self.transactionCount = data.return.transaction_count;
        }else{
          obj = data.error;
        }
        return data;
    };
    this.send(params, success);
    
    return obj;
}

/**
 * Retrieve your transaction history. There are 7 possible parameters for this
 * function instead of having a terrible method signature this will take an
 * object of the desired parameters.
 * 
 * @param paramObj -
 *            object containing 0 or members
 * 
 * NOTE: Possible argument members are:
 * from,count,from_id,end_id,order,since,end Refer to BTC-e documentation for
 * parameter explanation.
 */
API.prototype.transHistory = function(paramObj){
  var params = {
    method : "TransHistory"
  };
  $.extend(params,paramObj);
  var obj;
  var success = function(data,text){
      if(data.success===1){
        obj = data.return;
      }else{
        obj = data.error;
      }
    }
  this.send(params, success);
  return obj;
}
/**
 * Retrieve your trade history. There are eight possible parameters for this
 * function instead of having a terrible method signature this will take an
 * object of the desired parameters.
 * 
 * @param paramObj -
 *            object containing 0 or members
 * 
 * NOTE: Possible argument members are:
 * pair,from,count,from_id,end_id,order,since,end Refer to BTC-e documentation
 * for parameter explanation.
 */
API.prototype.tradeHistory = function(paramObj){
  var params = {
      method : "TradeHistory"
    };
    $.extend(params,paramObj);
    var obj;
    var success = function(data,text){
        if(data.success===1){
          obj = data.return;
        }else{
          obj = data.error;
        }
    };
    this.send(params,success);
    return obj;
}
/**
 * Retrieve your open order list. There are nine possible parameters for this
 * function instead of having a terrible method signature this will take an
 * object of the desired parameters.
 * 
 * @param paramObj -
 *            object containing 0 or members
 * 
 * NOTE: Possible argument members are:
 * pair,active,from,count,from_id,end_id,order,since,end Refer to BTC-e
 * documentation for parameter explanation.
 */
API.prototype.orderList = function(paramObj){
  var params = {
      method : "OrderList"
    };
    $.extend(params,paramObj);
    var obj;
    var success = function(data,text){
        if(data.success===1){
          obj = data.return;
        }else{
          obj = data.error;
        }
      };
      this.send(params,success);
      return obj;
}
/**
 * Create a new trade. All parameters are required.
 * 
 * @param pair -
 *            currency pair in form btc_usd
 * @param type -
 *            buy or sell
 * @param rate -
 *            the price you would like to trade at
 * @param rate -
 *            how many coins you want
 * @return order stats or error
 */
API.prototype.trade = function(pair,type,rate,amount){
  var self = this;
  var params = {
      method : "Trade",
      pair : pair,
      type : type,
      rate : rate,
      amount : amount
    };
    var obj;
    var success = function(data,text){
        if(data.success===1){
          obj = data.return;
          self.funds = data.return.funds;
        }else{
          obj = data.error;
        }
      };
      this.send(params,success);
    return obj;
}
/**
 * Cancel the argument order.
 * 
 * @param order_id -
 *            order id of the desired order
 */
API.prototype.cancelOrder = function(order_id){
  var self = this;
  var params = {
      method : "CancelOrder",
      order_id : order_id
    };
    var obj;
    var success = function(data,text){
        if(data.success===1){
          self.funds = data.return.funds;
          obj = data.return;
        }else{
          obj = data.error;
        }
      };
      this.send(params,success);
      return obj;
}

// ********************** Public API **************************
/*
 * Quick implementation for Public API for completeness.
 */
API.prototype.ticker = function(pair){
  var obj;
$.ajax({
       async : false,
       type : 'GET',
       url : 'https://btc-e.com/api/2/'+pair+'/ticker',
       dataType : 'json',
       success : function(data){
         obj = data
       }
    });
    return obj;
}
API.prototype.trades = function(pair){
var obj;
$.ajax({
       async : false,
       type : 'GET',
       url : 'https://btc-e.com/api/2/'+pair+'/trades',
       dataType : 'json',
       success : function(data){
         obj = data
       }
    });
    return obj;
}
API.prototype.depth = function(pair){
var obj;
$.ajax({
       async : false,
       type : 'GET',
       url : 'https://btc-e.com/api/2/'+pair+'/depth',
       dataType : 'json',
       success : function(data){
         obj = data
       }
    });
    return obj;
}