// Neopets - Stock Market Summary
// by nungryscpro (nungryscpro@yahoo.com)
//
// ==UserScript==
// @name           Neopets - Stock Market Summary
// @namespace      http://userscripts.org/users/22349
// @description    V 1.05 - Adds a stock market summary module to the sidebar when you visit your stock portfolio.
// @include        http://www.neopets.com/stockmarket.phtml?type=portfolio*
// @include        http://neopets.com/stockmarket.phtml?type=portfolio*
// @include        http://www.neopets.com/process_stockmarket.phtml*
// @include        http://neopets.com/process_stockmarket.phtml*
// @version        1.05
// @updated        2009.04.10
// ==/UserScript==
//
// Click the '?' on the header to access the options.
//

if (document.location.href.match('process_stockmarket')){
  if (document.body.innerHTML.indexOf('You cannot afford that!') != -1){
    GM_setValue('newNeoDay', '');
  }
  if (document.body.innerHTML.match('errorpointer')){
    document.links[0].href = 'http://www.neopets.com/stockmarket.phtml?type=portfolio';
  }
}
else {
  function doScript(){
  
    function checknumber(value){
      var regex = /^\d+$/;
      if (value.search(regex) != -1){return true;}
      else {return false;}
    }

    function set_new_day(){
      var newNeoDay = new Date();
      var now = new Date();
      var nst = document.getElementById('nst').innerHTML;
      var nh = 0;

      if (nst.match('pm')){nh += 12;}

      nst = nst.replace(/(NST)|(am)|(pm)|(HSN)|(NSZ)|(\s)/gi, '').split(':');
      if (parseInt(nst[0]) == 12){nh += 0;}
      else {nh += parseInt(nst[0]);}
      var nm = parseInt(nst[1]);

      newNeoDay.setHours(now.getHours() - nh + 24);
      if ((now.getMinutes() - nm) > 30){newNeoDay.setMinutes(60, 0);}
      else {newNeoDay.setMinutes(0, 0);}

      GM_setValue('newNeoDay', newNeoDay.toString());
    }

    var now = new Date();
    var buyallowed = GM_getValue('newNeoDay');
    var buypricemin = parseInt(GM_getValue('buypricemin', '10'));
    var buypricemax = parseInt(GM_getValue('buypricemax', '20'));
    var sellpricemin = parseInt(GM_getValue('sellpricemin', '30'));

    if (buypricemax < buypricemin){
      GM_setValue('buypricemax', buypricemin);
      buypricemax = buypricemin;
    }

    thisDiv = document.getElementById('stockDiv');
    if (thisDiv){thisDiv.parentNode.removeChild(thisDiv);}

    var ticker = document.getElementsByTagName('marquee')[0];
    var tickername = new Array();
    var tickerprice = new Array();
    var collect = false;

    for (var x = 0, thisDiv; thisDiv = ticker.getElementsByTagName('b')[x]; x++){
      thisText = thisDiv.innerHTML.split(' ');
      if (collect == false && thisText[0] == 'AAVL' && x < 43){collect = true;}
      else if (collect == true && thisText[0] == 'AAVL' && x > 42){collect = false;}
      if (collect == true){
        tickername.push(thisText[0]);
        tickerprice.push(thisText[1]);
      }
    }
    var portname = new Array();
    var porthold = new Array();
    if (!document.body.textContent.match("You don't own shares in any company")){
      for (x = 0; x < document.forms.length; x++){
        if (document.forms[x].action.match('process_stockmarket.phtml')){
          var portfolio = document.forms[x];
        }
      }
      for (var x = 0, thisLink; thisLink = portfolio.getElementsByTagName('a')[x]; x++){
        if (thisLink.href.match('ticker=') && thisLink.parentNode.parentNode.getElementsByTagName('td')[3].textContent != '0'){
          portname.push(thisLink.textContent);
          porthold.push(thisLink.parentNode.parentNode.getElementsByTagName('td')[5].textContent.match(/[0-9,]+/)[0]);
          anchorCell = thisLink.parentNode.parentNode.getElementsByTagName('td')[0];
          anchorCell.valign = 'top';
          anchorCell.innerHTML = '<a name="'+thisLink.textContent+'">'+anchorCell.innerHTML;
          x+=2;
        }
      }
    }
    stockDiv = document.createElement('div');
    stockDiv.setAttribute('id', 'stockDiv');
    stockDiv.setAttribute('style', 'margin-bottom: 7px;');
    stockDiv.setAttribute('class', 'sidebarModule');
    var stockTable = '<table width="158" cellspacing="0" cellpadding="0" border="0" class="sidebarTable"><tbody><tr><td valign="middle" class="sidebarHeader medText"><img src="http://images.neopets.com/help/question_mark.png" id="open_options" title="Options" style="float: right; cursor: pointer; margin-right: 3px;" align="absbottom" border="0" height="13" width="13">Stock Summary</td></tr><tr id="ssm_pref" style="display: none;"><td class="activePet sf" style="padding: 5px;"><table border="0" cellpadding="0" cellspacing="0" class="sidebarTable"><tbody>';
    stockTable += '<tr><td style="background-color: rgb(239, 239, 239);" width="140" class="activePet sf"><b>Options</b></td></tr><tr><td class="activePet sf" align="center" valign="center" height="18"><center id="resethistory" style="cursor: pointer;">reset purchase history</center></td></tr><tr><td class="sf" align="center"><b>Buy Price</b></td></tr><tr><td align="center"><table width="100" border="0"><tr><td class="sf">Minimum</td><td><input id="buypricemin" type="text" value="'+buypricemin+'" size="3" maxlength="3" class="sf"></td></tr><tr><td class="sf">Maximum</td><td><input id="buypricemax" type="text" value="'+buypricemax+'" size="3" maxlength="3" class="sf"></td></tr></tbody></table></td></tr>';
    stockTable += '<tr><td class="sf" align="center"><b>Sell Price</b></td></tr><tr><td class="activePet sf" align="center"><table width="100" border="0"><tr><td class="sf">Minimum</td><td><input id="sellpricemin" type="text" value="'+sellpricemin+'" size="3" maxlength="3" class="sf"></td></tr></tbody></table></td></tr><tr><td class="sf" align="center" id="close_options" style="cursor: pointer;">close</td></tr></tbody></table>';
    stockTable += '</td></tr><tr><td align="center" valign="middle" class="activePet" height="150" style="padding:2px;"><img width="150" height="150" border="0" src="http://images.neopets.com/images/myportfolio.gif"></td></tr>';
    var buyTable = '<tr><td align="center" class="activePet sf" style="padding:2px;"><b>Buy</b></td></tr><tr><td align="center" class="activePet sf"><table width="100%" cellspacing="0" cellpadding="2" border="0" class="activePetInfo"><tbody>';
    var sellTable = '<tr><td align="center" class="activePet sf" style="padding:2px;"><b>Sell</b></td></tr><tr><td align="center" class="activePetInfo"><table width="100%" cellspacing="0" cellpadding="2" border="0" class="activePetInfo"><tbody>';
    var buycount = 0;
    var sellcount = 0;
    for (x in tickerprice){
      if (Date.parse(now) < Date.parse(buyallowed) && buycount == 0) {
        buyTable += "<tr><td align='center'><br>You've already purchased 1000 shares today.<br><br></td></tr>";
        buycount = -1;
      }
      if (tickerprice[x] <= buypricemax && tickerprice[x] >= buypricemin && buycount >= 0){
        if (buycount == 0){
          buyTable += '<tr style="background-color: rgb(239, 239, 239);"><td class="neopetPhrase" align="left">Ticker</td><td class="neopetPhrase" align="center">Price</td><td class="neopetPhrase" align="right">Holdings</td><td class="neopetPhrase" align="center">Buy</td></tr>';
        }
        buycount++;
        buyTable += '<tr><td align="left">'+tickername[x]+'</td><td align="center">'+tickerprice[x]+'</td><td align="right">';
        if (tickername[x] == portname[0]){
          buyTable += porthold[0]+'</td>';
          porthold.shift();
          portname.shift();
        }
        else {
          buyTable += '0</td>';
        }
        if (tickerprice[x] < 15){
          buyTable += '<td> </td></tr>';
        }
        else {
          buyTable += '<td align="center"><a href="/process_stockmarket.phtml?_ref_ck='+document.body.innerHTML.split("&_ref_ck=")[1].split("';")[0]+'&type=buy&ticker_symbol='+tickername[x]+'&amount_shares=1000" id="ssbuy'+buycount+'"><b>$$$</b></a></td></tr>';
        }
      }
      else if (tickerprice[x] >= sellpricemin && tickername[x] == portname[0]){
        if (sellcount == 0){
          sellTable += '<tr style="background-color: rgb(239, 239, 239);"><td class="neopetPhrase" align="left">Ticker</td><td class="neopetPhrase" align="center">Price</td><td class="neopetPhrase" align="right">Holdings</td><td class="neopetPhrase" align="center">Sell</td></tr>';
        }
        sellcount++;
        sellTable += '<tr><td align="left">'+tickername[x]+'</td><td align="center">'+tickerprice[x]+'</td><td align="right">'+porthold[0]+'</td><td align="center"><a href="#'+tickername[x]+'"><b>$$$</b></a></td></tr>';
        porthold.shift();
        portname.shift();
      }
      else if (tickername[x] == portname[0]){
        porthold.shift();
        portname.shift();
      }
    }
    if (buycount == 0){
      buyTable += '<tr><td align="center"><br>No stocks currently fit your Buy criteria.<br><br></td></tr>';
    }
    if (sellcount == 0){
      sellTable += '<tr><td align="center"><br>No stocks currently fit your Sell criteria.<br><br></td></tr>';
    }
    buyTable += '</tbody></table></td></tr>';
    sellTable += '</tbody></table></td></tr>';
    stockTable += buyTable+sellTable+'<tr><td style="background-color: rgb(255, 255, 255); padding:1px;"></td></tr></tbody></table>';
    stockDiv.innerHTML = stockTable;
    for (var x = 0, thisDiv; thisDiv = document.getElementsByTagName('td')[x]; x++){
      if (thisDiv.getAttribute('width') == '178' && thisDiv.getAttribute('align') == 'center' && thisDiv.getAttribute('class') == 'sidebar'){
        var sidebar = document.getElementsByTagName('td')[x];
      }
    }
    sidebar.insertBefore(stockDiv, sidebar.firstChild.nextSibling);

    document.getElementById('open_options').addEventListener('click',function(){
      var thisDiv = document.getElementById('ssm_pref');
      if (thisDiv.getAttribute('style') == ''){
        doScript();}
      else {
        thisDiv.setAttribute('style', '');
//        document.getElementById('open_options').setAttribute('style', 'display: none;');
      }
    }, false);

    document.getElementById('close_options').addEventListener('click',function(){
      doScript();
    }, false);

    document.getElementById('resethistory').addEventListener('click',function(){
      GM_setValue('newNeoDay', '');
      doScript();
    }, false);

    document.getElementById('buypricemin').addEventListener('change',function(){
      if (checknumber(this.value)){GM_setValue('buypricemin', this.value);}
      else {document.getElementById('buypricemin').value = GM_getValue('buypricemin');}
    }, false);

    document.getElementById('buypricemax').addEventListener('change',function(){
      if (checknumber(this.value)){GM_setValue('buypricemax', this.value);}
      else {document.getElementById('buypricemax').value = GM_getValue('buypricemax');}
    }, false);

    document.getElementById('sellpricemin').addEventListener('change',function(){
      if (checknumber(this.value)){GM_setValue('sellpricemin', this.value);}
      else {document.getElementById('sellpricemin').value = GM_getValue('sellpricemin');}
    }, false);

    if (buycount > 0){
      for (x = 1; x <= buycount; x++){
        var linkid = 'ssbuy'+x;
        if (document.getElementById(linkid)){
          document.getElementById(linkid).addEventListener('click',function(){
            set_new_day();
          }, false);
        }
      }
    }
  }
  doScript();
}