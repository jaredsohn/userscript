// ==UserScript==
// @name           Quick Mall
// @namespace      kol.interface.unfinished
// @description    Speeds up buying and selling operations in the Kingdom of Loathing, and tracks spending.
// @include        http://*kingdomofloathing.com/charpane.php
// @include        http://*kingdomofloathing.com/mall.php*
// @include        http://*kingdomofloathing.com/mallstore.php*
// @include        http://*kingdomofloathing.com/managestore.php*
// @include        http://*kingdomofloathing.com/manageprices.php*
// @include        http://*kingdomofloathing.com/storelog.php
// @include        http://*kingdomofloathing.com/account.php
// @include        http://127.0.0.1:*/charpane.php
// @include        http://127.0.0.1:*/mall.php*
// @include        http://127.0.0.1:*/mallstore.php*
// @include        http://127.0.0.1:*/managestore.php*
// @include        http://127.0.0.1:*/manageprices.php*
// @include        http://127.0.0.1:*/storelog.php
// @include        http://127.0.0.1:*/account.php
// @version        2.4
// ==/UserScript==

//Version 2.4
// - fix for searchmall.php being deprecated
// - record spending history for 2 weeks instead of 48hrs
//Version 2.3
// - added an account option for turning off the lowest price feature
//Version 2.2
// - added ability to easily check lowest prices when in a mall store
//Version 2.1
// - updated for mall changes in game
//Version 2.0
// - updated for the new mall interface
// - adds the missing buy links for stores that disable buying from the 
//   search screen (they show up in green)
// - nb: no longer does pajama papering, since lines are underlined in 
//   the new interface
//Version 1.3
// - now records which store you bought things from, and adds a link
//   in the log so you can go back there (click on the 'bought' text).
//Version 1.2.2
// - improved pajama-papering in mall search screen
//Version 1.2.1
// - added pajama-papering in mall search screen
//Version 1.2
// - Now tracks the item you bought as well as the price and date.
// - Interleaves your actual spending history in with the list of items
//   bought from your store in your store log.
//Version 1.1
// - Now tracks spending history for the last 48hrs and shows a summary
//   in your store log page.  This includes the total spent, as well
//   as some rudimentary ability to edit/reset the spending history:
//   (re)set, add an entry, and delete last entry.
//   Includes a display of profit relative to your mall income.
//   
// - A trivial fix to use the lower quantity as a default in the mall
//   search buy quantity boxes when someone sells things with a limit 
//   greater than the number they actually have.

////////////////////////////////////////////////////////////////////////////////
// stolen and adapted from Anti-Marty's fortune cookie script
////////////////////////////////////////////////////////////////////////////////
// parse the char pane for the player name
// revised version! now taken directly from kolpreviousnadventures to handle compact mode
function getPlayerNameFromCharpane() {
    var username = document.getElementsByTagName("b");
    if (!username || username.length < 1) return false;
    username = username[0];
    if (!username) return false;
    username = username.firstChild;
    if (!username) return false;
    // in full mode the link is <a><b>Name</b></a>
    // in compact mode it's <b><a>Name</a></b>
    // so have to handle this, and also can use it to tell
    // whether it's in compact mode or not.
    var fullmode = true;
    while (username && username.nodeType == 1)
    {
        username = username.firstChild;
        fullmode = false;
    }
    if (!username) return false;
    username = username.nodeValue;
    if (!username) return false;
    username = username.toLowerCase();
    //alert("found username " + username + ", fullmode: " + fullmode);
    GM_setValue("currentPlayer", username);  // store for other functions that need to know who's playing
    //return {'username': username, 'fullmode': fullmode};
}

// get pwdhash (and player name) from charpane and save it
function getPwdHash() {
    getPlayerNameFromCharpane();
    var player = GM_getValue("currentPlayer","");
    if (player=="")
        return;
    var page = document.documentElement.innerHTML;
    var find = 'pwdhash = '
    if (page.indexOf(find) >= 0) {
        var i = page.indexOf(find);
        var j = find.length;
        var ps = page.substr(i+j+2);
        var foundit = page.substr(i+j+1,ps.indexOf('"')+1);
        GM_setValue(player+"_kolhash", foundit);  // not very secure
        //GM_log('found script: '+foundit);
    } 
}

// process the mall search page
function domall() {
    var player = GM_getValue("currentPlayer","");
    if (player=="")
        return;
    var pwdhash = GM_getValue(player+"_kolhash","");
    if (pwdhash=="") {
        //GM_log("no pwd");
        return;
    }
    var listing = document.getElementsByClassName('buyone');
    for (var i=0;i<listing.length;i++) {
        var aref=listing[i];
        aref.addEventListener('click',recordBuyone,true);
    }
    listing = document.getElementsByClassName('buysome');
    for (var i=listing.length-1;i>=0;i--) {
        var aref=listing[i];
        var msg='';
        var q=document.createElement('input');
        q.setAttribute('type','text');
        q.setAttribute('class','text');
        q.setAttribute('size','2');
        q.setAttribute('name','quickmall_quantity_'+i);
        // find default qty
        var qty = 1;
        var p  = aref.parentNode;
        while(p && p.tagName!='TR')
            p = p.parentNode;
        if (p) {
            var stock=p.getElementsByClassName('stock');
            if (stock.length>0) {
                qty = Number(stock[0].innerHTML.replace(/[^0-9]/g,''));
                // see if limited by /day
                var perday=stock[0].nextSibling;
                if (perday) {
                    perday = perday.innerHTML.replace(/[^0-9]/g,'');
                    if (perday.length>0) {
                        perday = Number(perday);
                        if (perday < qty) {
                            qty = perday;
                        } 
                    }
                }
                // add a handler to the store link to the record the choice there
                var storelinktd=stock[0].previousSibling;
                if (storelinktd) {
                    var storelink = storelinktd.getElementsByTagName('A');
                    if (storelink.length>0) {
                        storelink[0].addEventListener('click',recordSearchChoice,true);
                    }
                }
            }
        }
        q.setAttribute('value',qty);
        q.setAttribute('style','font-size:7pt;');
        if (aref.previousSibling)
            aref.parentNode.replaceChild(document.createTextNode(']\u00a0'),aref.previousSibling);
        if (aref.nextSibling)
            aref.parentNode.removeChild(aref.nextSibling);
        aref.parentNode.setAttribute('width','15%');
        aref.parentNode.replaceChild(q,aref);
        if (qty!=1)
            changeBuyQty(q,qty);
        q.addEventListener('change',handleBuysome,true);
    }
}

// handler for the replace buysome
// whenever the text changes, it updates the buyone quantity 
function handleBuysome(e) {
    var q = this['value'];//(e.target) ? e.target.getAttribute('value') : e.srcElement.getAttribute('value');

    //var q = this.getAttribute('value');
    var p = this.parentNode.getElementsByClassName('buyone');
    if (p.length==1) {
        p = p[0];
        var s = p.getAttribute('href');
        if (!s) 
            return;
        s = s.replace(/\&quantity\=[0-9]*/,'&quantity='+q);
        //alert('buying '+q+' so will replace with '+s);
        p.setAttribute('href',s);
    } 
}

// utility function to change the buyone quantity
function changeBuyQty(buysome,q) {
    //var q = this.getAttribute('value');
    var p = buysome.parentNode.getElementsByClassName('buyone');
    if (p.length==1) {
        p = p[0];
        var s = p.getAttribute('href');
        if (!s) 
            return;
        s = s.replace(/\&quantity\=[0-9]*/,'&quantity='+q);
        //alert('buying '+q+' so will replace with '+s);
        p.setAttribute('href',s);
    } 
}

// handler for buyone clicking
function recordBuyone(e) {
    var stuff=this.getAttribute('href');
    var stuffs=stuff.substr(stuff.indexOf('?')+1).split('&');
    var item,price,store,hash,quant;
    for (var j=0;j<stuffs.length;j++) {
        var kv = stuffs[j].split('=');
        switch (kv[0]) {
        case 'whichitem':
            var s = kv[1];
            item = Math.floor(s/1000000000);
            price = s - item*1000000000;
            break;
        case 'whichstore':
            store = kv[1];
            break;
        case 'pwd':
            hash = kv[1];
            break;
        case 'quantity':
            quant = kv[1];
            break;
        }
    }
    if (!item || !price || !store || !hash || !quant)
        return true;
    // now find descid and item information
    var descitem='';
    var itemimage;
    var textdesc='thing';

    var p  = this.parentNode;
    while(p && p.tagName!='TR')
        p = p.parentNode;
    if (p) {
        var me = p.rowIndex;
        while(p && p.tagName!='TABLE')
            p = p.parentNode;
        var rows=p.rows;
        for (me=me-1;me>=0;me--) {
            var row=p.rows[me];
            var imgs=row.getElementsByTagName('img');
            for (var i=0;i<imgs.length;i++) {
                var onc=imgs[i].getAttribute('onclick');
                if (onc) {
                    descitem=onc.replace(/[a-z()]/g,'');
                    itemimage=imgs[i];
                    var pi = imgs[i].parentNode.nextSibling;
                    if (pi) {
                        var pia = pi.getElementsByTagName('A');
                        textdesc = pia[0].innerHTML;
                    }
                    me=-1;
                    break;
                } 
            }
        }
    }
    // create the selling form
    createSellBar(item,price,quant,store,descitem,hash,itemimage,textdesc);
    var player = GM_getValue("currentPlayer","");
    // and record the purchase--bit optimistic, but no other solution
    if (player!="")
        addNewAmount(player,quant*price,quant+" "+textdesc,store);
    return true;
}

// creates the form for selling, or updates it if it exists
function createSellBar(item,price,qty,store,descitem,hash,itemimage,textdesc) {
    var sellarea = document.getElementById('quickmall_sell');
    if (sellarea) {
        updateSellform(item,qty,descitem,hash,itemimage,textdesc);
        //sellarea.innerHTML="Hello. item="+item+", price="+price+", store="+store+', descitem='+descitem;
    } else {

        var d = document.createElement('div');
        d.setAttribute('style','display:block;');
        var dc = document.createElement('center');
        var dct = document.createElement('table');
        dct.setAttribute('cellspacing','0');
        dct.setAttribute('cellpadding','0');
        dct.setAttribute('width','95%');
        var dctr = document.createElement('tr');
        var dctrc = dctr.insertCell(-1);
        dctrc.setAttribute('bgcolor','blue');
        dctrc.setAttribute('align','center');
        dctrc.setAttribute('style','color:white;');
        var dctrcb = document.createElement('b');
        dctrcb.innerHTML='Sell in the Mall';
        dctrc.appendChild(dctrcb);
        dct.appendChild(dctr);
        
        dctr = document.createElement('tr');
        dctrc = dctr.insertCell(-1);
        dctrc.setAttribute('style','border:1px solid blue; padding:5px');
        // here's where we add our content
        var dctrcc = document.createElement('center');
        dctrcc.setAttribute('id','quickmall_sell');

        createSellform(dctrcc,item,qty,descitem,hash,itemimage,textdesc);
        //dctrcc.innerHTML="Hello. item="+item+", price="+price+", store="+store+', descitem='+descitem;
        dctrc.appendChild(dctrcc);
        dct.appendChild(dctr);
        
        dctr = document.createElement('tr');
        dctrc = dctr.insertCell(-1);
        dctrc.setAttribute('height','4');
        dct.appendChild(dctr);
        dc.appendChild(dct);
        d.appendChild(dc);
        document.body.insertBefore(d,document.body.firstChild);
    }
    
    return true;
}

// updates the selling form
function updateSellform(item,quant,descid,hash,itemimage,textdesc) {
    var qh = document.getElementById('quickmall_hash');
    qh.setAttribute('value',hash);
    var qq = document.getElementById('quickmall_quant');
    qq.setAttribute('value',quant);
    var qid = document.getElementById('quickmall_itemdesc');
    qid.setAttribute('value',item);
    qid.setAttribute('descid',descid);
    var qimg = document.getElementById('quickmall_itemimage');
    if (qimg) {
        qimg.removeAttribute('id');
        if (itemimage) {
            //GM_log("updating "+descid+","+item+" image...: "+itemimage.getAttribute('src'));
            var img = itemimage.cloneNode(false);
            img.setAttribute('title',textdesc);
            img.setAttribute('id','quickmall_itemimage');
            qimg.parentNode.insertBefore(img,qimg);
        }  
        qimg.parentNode.removeChild(qimg);
    } else if (itemimage) {
        //GM_log("updating "+descid+","+item+" image(2)...: "+itemimage.getAttribute('src'));
        var img = itemimage.cloneNode(false);
        img.setAttribute('id','quickmall_itemimage');
        img.setAttribute('title',textdesc);
        qq.parentNode.insertBefore(img,qq);
    }
}

// actually creates the sell form
function createSellform(d,item,quant,descid,hash,itemimage,textdesc) {
    var form = document.createElement('form');
    form.setAttribute('name','sellform');
    form.setAttribute('action','managestore.php');
    form.setAttribute('method','post');
    form.setAttribute('style','display:inline;');
    var input = document.createElement('input'); 
    input.setAttribute('type','hidden');
    input.setAttribute('name','action');
    input.setAttribute('value','additem');
    form.appendChild(input);
    input = document.createElement('input'); 
    input.setAttribute('id','quickmall_hash');
    input.setAttribute('type','hidden');
    input.setAttribute('name','pwd');
    input.setAttribute('value',hash);
    form.appendChild(input);
    if (itemimage) {
        var img = itemimage.cloneNode(false);
        img.setAttribute('id','quickmall_itemimage');
        img.setAttribute('title',textdesc);
        form.appendChild(img);
    }
    input = document.createTextNode('Qty:'); 
    form.appendChild(input);
    input = document.createElement('input'); 
    input.setAttribute('id','quickmall_quant');
    input.setAttribute('name','qty1');
    input.setAttribute('size','3');
    input.setAttribute('value',quant);
    form.appendChild(input);
    
    input = document.createElement('input'); 
    input.setAttribute('id','quickmall_itemdesc');
    input.setAttribute('type','hidden');
    input.setAttribute('name','item1');
    input.setAttribute('value',item);
    input.setAttribute('descid',descid);
    form.appendChild(input);
    
    input = document.createTextNode('Price:'); 
    form.appendChild(input);
    input = document.createElement('input'); 
    input.setAttribute('name','price1');
    input.setAttribute('size','9');
    form.appendChild(input);
    input = document.createTextNode('Limit:'); 
    form.appendChild(input);
    input = document.createElement('input'); 
    input.setAttribute('name','limit1');
    input.setAttribute('size','3');
    form.appendChild(input);
    input = document.createElement('input'); 
    input.setAttribute('class','button');
    input.setAttribute('type','submit');
    input.setAttribute('value','Add Items to Store');
    form.appendChild(input);
    // and then insert it
    // add a row above this tdnode
    var tbl = document.createElement('table');
    var row = document.createElement('tr');
    var cell = document.createElement('td');
    //cell.setAttribute('colspan','2');
    cell.appendChild(form);
    row.appendChild(cell);
    tbl.appendChild(row);
    d.appendChild(tbl);
}


// main function to handle a store view
function storeform() {
    //GM_log('storeform');
    var player = GM_getValue("currentPlayer","");
    if (player=="")
        return;
    var pwdhash = GM_getValue(player+"_kolhash","");
    if (pwdhash=="") {
        //GM_log("no pwd");
        return;
    }
    var item = GM_getValue(player+"_lastbought","");
    if (item=="") {
        //GM_log('no last bought');
        return;
    }
    //GM_log('storeform: '+item);

    // find out if there's a Results section
    if (document.documentElement.innerHTML.indexOf('Results:')>0) {
        // find You acquire
        var ya = document.documentElement.innerHTML.indexOf('You acquire ');
        if (ya>0) {
            var listing = document.getElementsByTagName('td');
            var boughtDescr='';
            for (var i=0;i<listing.length;i++) {
                var tdnode = listing[i];
                var text = tdnode.firstChild;
                if (text)
                    text = text.data;
                if (text && text.indexOf('You acquire ')==0) {
                    // found the place
                    // get what you bought
                    boughtDescr = (tdnode.getElementsByTagName('b')[0]).innerHTML;
                    var imgnode;
                    imgnode = tdnode.parentNode.firstChild.firstChild;
                    // get descid
                    var onclick = imgnode.getAttribute('onClick');
                    if (!onclick) {
                        //GM_log("no descid");
                        return;
                    }
                    //GM_log("onclick "+onclick);
                    var descid=onclick.substr(9);
                    descid = descid.substr(0,descid.length-1);
                    // try and get quantity
                    var moretext = tdnode.firstChild.nextSibling.firstChild.data;
                    //GM_log("found quant text: "+moretext);
                    var quant = '1';
                    if (moretext.match("[0-9][0-9]* ")) {
                        // more than 1
                        quant=parseInt(moretext.substr(0,moretext.indexOf(' ')));
                        if (quant==0)
                            quant='1';
                        else
                            quant=String(quant);
                    }
                    //GM_log('parsed quant as '+quant);
                    // create the form
                    var form = document.createElement('form');
                    form.setAttribute('name','sellform');
                    form.setAttribute('action','managestore.php');
                    form.setAttribute('method','post');
                    form.setAttribute('style','display:inline;');
                    var input = document.createElement('input'); 
                    input.setAttribute('type','hidden');
                    input.setAttribute('name','action');
                    input.setAttribute('value','additem');
                    form.appendChild(input);
                    input = document.createElement('input'); 
                    input.setAttribute('type','hidden');
                    input.setAttribute('name','pwd');
                    input.setAttribute('value',pwdhash);
                    form.appendChild(input);
                    input = document.createTextNode('Qty:'); 
                    form.appendChild(input);
                    input = document.createElement('input'); 
                    input.setAttribute('name','qty1');
                    input.setAttribute('size','3');
                    input.setAttribute('value',quant);
                    form.appendChild(input);

                    input = document.createElement('input'); 
                    input.setAttribute('type','hidden');
                    input.setAttribute('name','item1');
                    input.setAttribute('value',item);
                    input.setAttribute('descid',descid);
                    form.appendChild(input);

                    input = document.createTextNode('Price:'); 
                    form.appendChild(input);
                    input = document.createElement('input'); 
                    input.setAttribute('name','price1');
                    input.setAttribute('size','9');
                    form.appendChild(input);
                    input = document.createTextNode('Limit:'); 
                    form.appendChild(input);
                    input = document.createElement('input'); 
                    input.setAttribute('name','limit1');
                    input.setAttribute('size','3');
                    form.appendChild(input);
                    input = document.createElement('input'); 
                    input.setAttribute('class','button');
                    input.setAttribute('type','submit');
                    input.setAttribute('value','Add Items to Store');
                    form.appendChild(input);
                    // and then insert it
                    // add a row above this tdnode
                    var ctr = document.createElement('center');
                    var tbl = document.createElement('table');
                    var row = document.createElement('tr');
                    var cell = document.createElement('td');
                    //cell.setAttribute('colspan','2');
                    cell.appendChild(form);
                    row.appendChild(cell);
                    tbl.appendChild(row);
                    ctr.appendChild(tbl);
                    tdnode.parentNode.parentNode.parentNode.parentNode.appendChild(ctr);
                } else if (text && text.indexOf('You spent ')==0) {
                    // and update total spent
                    var newtotal = GM_getValue(player+"_spent","0");
                    var amt = text.substr(10,text.indexOf(' Meat')-10);
                    amt = parseInt(amt.replace(/,/g,''));
                    // figure out store if possible
                    var storelist = document.getElementsByTagName('a');
                    var store='';
                    for (var k=0;k<storelist.length;k++) {
                        var h = storelist[k].getAttribute('href');
                        if (h && h.indexOf('showplayer.php?who=')==0) {
                            store = h.substr(19);
                            //GM_log('bought from store: '+store);
                            break;
                        }
                    }
                        
                    addNewAmount(player,amt,boughtDescr,store);
                    //GM_log("Spent: "+amt);
                }
            }
        }
    }
    
}

// handler for when a new purchase was made, record amount spent and date
function addNewAmount(player,amt,descr,str) {
    var d = new Date();
    var sumlist = retrieveSumlist(player);
    sumlist[sumlist.length] = {date:d,amt:amt,desc:descr,store:str};
    //GM_log("Storing new entry: "+d+" $"+amt+", '"+descr+"'");
    storeSumlist(player,sumlist);
    //GM_log("Current total: "+currentSum(sumlist));
}

// save the purchase history
function storeSumlist(player,sumlist) {
    var s='';
    for (var i=0;i<sumlist.length;i++) {
        var entry = sumlist[i];
        s=s+entry.date.getTime()+':'+entry.amt+':'+entry.desc+':'+entry.store+';';
        //GM_log("Storing entry["+i+"]="+entry.date+" for "+entry.amt+" meat");
    }
    //GM_log("Storing string: "+s);

    GM_setValue(player+'_sumlist',s);
}

// return the purchase history, filtered to the last 2 weeks
function retrieveSumlist(player) {
    var sumlist=new Array();
    var s=GM_getValue(player+"_sumlist",'');
    if (s.length==0) {
        var d = new Date();
        sumlist[0] = {date:d,amt:0,desc:'',store:''};
        return sumlist;
    }
    var oldd = new Date();
    oldd.setTime(oldd.getTime()-14*24*60*60*1000);
    var entries = s.split(';');
    var ecount=0;
    for (var i=0;i<entries.length;i++) {
        var pieces = entries[i].split(':');
        if (pieces[0].length==0)
            continue;
        var d = new Date();
        d.setTime(pieces[0]);
        var amt = parseInt(pieces[1]);
        if (amt!=0 && String(amt)!='NaN' && d>=oldd) {
            //GM_log("Entry["+ecount+"]="+d+" for "+amt+" meat");
            var descr = (pieces.length>2) ? pieces[2] : '';
            var str = (pieces.length>3) ? pieces[3] : '';
            sumlist[ecount++] = {date:d,amt:amt,desc:descr,store:str};
        } 
//      else {
//          GM_log("Skipping old entry: "+d+" for "+amt+" meat");
//      }
    }
    return sumlist;
}

// find how much was spent in the sumlist. 
function currentSum(sumlist) {
    var total=0;
    for (var i=0;i<sumlist.length;i++) {
        var entry = sumlist[i];
        if (entry.amt>0) {
            total += entry.amt;
        }
    }
    return total;
}

// main function to alter the store log to show amount spent, profit etc
function dolog() {
    var player = GM_getValue("currentPlayer","");
    if (player=="")
        return;
    var sumlist = retrieveSumlist(player);
    intersperseSumlist(sumlist);
    var total = currentSum(sumlist);
    var listing = document.getElementsByTagName('p');
    for (var i=0;i<listing.length;i++) {
        var pnode = listing[i];
        if (pnode.firstChild && pnode.firstChild.data && pnode.firstChild.data.indexOf('Total income: ')==0) {

            var income=pnode.firstChild.data.substr(14,pnode.firstChild.data.indexOf(' Meat')-14);
            income=parseInt(income.replace(/,/g,''));
            addSpentText(pnode,total,income,sumlist.length);

            return;
        }
    }

    // if we make it down here we couldn't find where to add stuff
    // must be that there are no transactions
    listing = document.getElementsByTagName('span');
    for (var i=0;i<listing.length;i++) {
        var pnode = listing[i];
        if (pnode.firstChild && pnode.firstChild.data && pnode.firstChild.data.indexOf('Your store has had no recent transactions.')==0) {

            addSpentText(pnode.firstChild,total,0,sumlist.length);
            return;
        }
    }
}

// weaves spent information in with the store bought information
function intersperseSumlist(sumlist) {
    if (sumlist.length==0)
        return;
    // first compute time zone offset for correct calculation.
    // for some annoying reason the mall list is always in mountain
    var listing = document.getElementsByTagName('a');
    var nlist;
    for (var i=0;i<listing.length;i++) {
        var a = listing[i];
        var ahref = a.getAttribute('href');
        if (a.getAttribute('class')=='nounder' && ahref && ahref.indexOf('showplayer.php')==0) {
            // found one of the entries
            var p = a.parentNode;
            if (p.tagName != 'SPAN') 
                return; // not the right parent...

            var n = parseStorelog(p);
            nlist = mergeSumlist(sumlist,n.lst);
            
            // and finally to replace the previous list with this one
            // delete previous entries
            for (var j=0;j<n.marker;j++) {
                p.removeChild(p.childNodes[0]);
            }
            // and add new ones
            for (var j=nlist.length-1;j>=0;j--) {
                var e = nlist[j];
                for (var k=e.length-1;k>0;k--) {
                    p.insertBefore(e[k],p.firstChild);
                }
                p.insertBefore(document.createTextNode(textFromDate(e[0])+" "),p.firstChild);
            }
            return;
        }
    }

    listing = document.getElementsByTagName('span');
    for (var i=0;i<listing.length;i++) {
        var p = listing[i];
        if (p.innerHTML=="Your store has had no recent transactions.") {
            nlist = mergeSumlist(sumlist,new Array());
            // and add new ones
            p.appendChild(document.createElement('br'));
            p.appendChild(document.createElement('br'));
            for (var j=0;j<nlist.length;j++) {
                var e = nlist[j];
                p.appendChild(document.createTextNode(textFromDate(e[0])+" "));
                for (var k=1;k<e.length;k++) {
                    p.appendChild(e[k]);
                }
            }
            break;
        }
    }
}

// parse store log list and return a list of entries.  p is the span containing the list.
function parseStorelog(p) {
    // need to fix up mall store log dates
    var tzoff = new Date().getTimezoneOffset(); 
    tzoff = tzoff * 60000; // convert to ms
    // asymmetric is at UTC-7, or -25200000ms
    tzoff = 25200000 - tzoff; 
    var nlist = new Array(); // for creating a new list of entries
    var endMarker = p.childNodes.length;
    for (var j=0;j<p.childNodes.length;j++) {
        var c = p.childNodes[j];
        if (c.tagName=='P') { // end of list
            endMarker = j;
            break;
        }
        // first entry should be a date
        var x = c.data.split(' ');
        var days = x[0];
        var times = x[1];
        var k = days.indexOf('/');
        var month = parseInt(days.substr(0,k),10);
        days = days.substr(k+1);
        k = days.indexOf('/');
        var day = parseInt(days.substr(0,k),10);
        var year = parseInt(days.substr(k+1),10)+2000;
        
        k = times.indexOf(':');
        var hour = parseInt(times.substr(0,k),10);
        times = times.substr(k+1);
        k = times.indexOf(':');
        var minute = parseInt(times.substr(0,k),10);
        var second = parseInt(times.substr(k+1),10);
        
        var d = new Date(year,month-1,day,hour,minute,second);
        d = new Date(d.getTime()+tzoff); //7200000;
        //GM_log('Entry: '+d + " from "+c.data);
        
        // we put the date together with all the children
        var e = new Array();
        e[0] = d;//document.createTextNode(d.toLocaleDateString());
        do {
            j++;
            c = p.childNodes[j];
            e[e.length] = c;
        } while(c.tagName!='BR');
        nlist[nlist.length] = e;
    }
    return {lst:nlist,marker:endMarker};
}

// merge together sumlist and nlist
function mergeSumlist(sumlist,nlist) {
    //GM_log("weaving "+sumlist.length+ " entries in with "+nlist.length+" entries");
    // now to actual interweave entries
    for (var ni=0,sli=sumlist.length-1;sli>=0;ni++) {
        var sl = sumlist[sli];
        if (ni>=nlist.length) {
            var accumulatedAmt = 0;
            var accumulatedDate = sl.date;
            var accumulatedEndDate;
            var accumulatedDesc;
            var accumulatedStore;
            var aCount = 0;
            do  {
                accumulatedAmt += sl.amt;
                accumulatedEndDate = sl.date;
                accumulatedDesc = sl.desc;
                accumulatedStore = sl.store;
                sli--;
                aCount++;
                if (sli<0)
                    break;
                sl=sumlist[sli];
            } while(true);
            
            if (aCount>1) {
                nlist.push(textFromMultiSumlist(accumulatedEndDate,accumulatedDate,accumulatedAmt,sumlist,sli+1,aCount));
            } else {
                nlist.push(textFromSumlist(accumulatedDate,accumulatedAmt,accumulatedDesc,accumulatedStore));
            }
        } else {
            var e = nlist[ni];
            if (sl.date.getTime()>e[0].getTime()) {
                var accumulatedAmt = 0;
                var accumulatedDate = sl.date;
                var accumulatedEndDate;
                var accumulatedDesc;
                var accumulatedStore;
                var aCount = 0;
                do  {
                    accumulatedAmt += sl.amt;
                    accumulatedEndDate = sl.date;
                    accumulatedDesc = sl.desc;
                    accumulatedStore = sl.store;
                    sli--;
                    aCount++;
                    if (sli<0)
                        break;
                    sl=sumlist[sli];
                } while(sl.date.getTime()>e[0].getTime());
                if (aCount>1) {
                    nlist.splice(ni,0,textFromMultiSumlist(accumulatedEndDate,accumulatedDate,accumulatedAmt,sumlist,sli+1,aCount));
                } else {
                    nlist.splice(ni,0,textFromSumlist(accumulatedDate,accumulatedAmt,accumulatedDesc,accumulatedStore));
                }
            }
        }
    }
    return nlist;
}

// convert a date into the mall text date format
function textFromDate(d) {
    function d2(x) { return (x<10) ? ('0'+x) : (''+x); }
    return (d2(d.getMonth()+1))+'/'+d2(d.getDate())+'/'+d2((d.getFullYear()-2000))+' '+d2(d.getHours())+':'+d2(d.getMinutes())+':'+d2(d.getSeconds());
}

// converts a sumlist entry into a storelog text line (array)
function textFromSumlist(d,amt,desc,str) {
    var line = new Array();
    line[0] = d;//document.createTextNode(sl.date.toLocaleString());

    line[1] = document.createTextNode('You ');
    var i=2;
    var bought = document.createElement('a');
    if (desc && desc.length>0) {
        if (!desc.match('[0-9][0-9]* '))
            desc = '1 '+desc;
        bought.appendChild(document.createTextNode('bought'));
        line[i++] = bought;
        line[i++] = document.createTextNode(' '+desc+' for ');
    } else {
        bought.appendChild(document.createTextNode('spent'));
        line[i++] = bought;
        line[i++] = document.createTextNode(' ');
    }
    if (str && str.length>0) {
        bought.setAttribute('href','mallstore.php?whichstore='+str);
        bought.setAttribute('title','Click to go the store from which you purchased this.');
    }
    var f = document.createElement('font');
    f.setAttribute('style','color:red');
    f.appendChild(document.createTextNode(String(amt)));
    line[i++] = f;
    line[i++] = document.createTextNode(' Meat.');
    line[i++] = document.createElement('br');
    return line;
}

// converts a span of sumlist entries into a storelog text line (array)
function textFromMultiSumlist(ds,de,amt,sumlist,firstindex,count) {
    var line = new Array();
    line[0] = ds;//document.createTextNode(sl.date.toLocaleString());
    var x = document.createTextNode("- "+textFromDate(de)+' ');
    var w = document.createTextNode('You spent ');
    var y = document.createTextNode(' Meat in '+count+' transactions.');
    var f = document.createElement('font');
    f.setAttribute('style','color:red');
    f.appendChild(document.createTextNode(String(amt)));
    var idx=1;
    var link = document.createElement('a');
    link.setAttribute('destid','multisumset_'+firstindex);
    link.setAttribute('title','Click to toggle details.');
    link.addEventListener("click", expandDiv, true);
    link.appendChild(x);
    link.appendChild(w);
    link.appendChild(f);
    link.appendChild(y);
    line[idx] = link; idx++;
    line[idx] = document.createElement('br'); idx++;
    line[idx] = document.createElement('div');
    line[idx].setAttribute('style','display:none'); 
    line[idx].setAttribute('id','multisumset_'+firstindex); 
    for (var i=count-1;i>=0;i--) {
        var slt = textFromSumlist(sumlist[firstindex+i].date,sumlist[firstindex+i].amt,sumlist[firstindex+i].desc,sumlist[firstindex+i].store);
        line[idx].appendChild(document.createTextNode(textFromDate(slt[0])+' '));
        for (var j=1;j<slt.length;j++)
            line[idx].appendChild(slt[j]);
        //line[idx].appendChild(document.createElement('br'));
    }
    return line;
}

function expandDiv() {
    var d = this.getAttribute('destid');
    if (d) {
        var x=document.getElementById(d); 
        if (x) {
            if (x.getAttribute("style")=="") 
                x.setAttribute("style","display:none");
            else 
                x.setAttribute("style",""); 
        }
    }
}

// actual function that creates html for spent text and profit
function addSpentText(pnode,total,income,transacts) {
    var x = document.createElement('p');
    pnode.parentNode.appendChild(x);

    var link=document.createElement('a');
    x = document.createTextNode('Total spent: '+makeThousands(String(total))+' Meat ');
    link.appendChild(x);
    link.setAttribute("title", 'over '+transacts+' transaction'+((transacts==1)? '': 's'));
    pnode.parentNode.appendChild(link);
    var link=document.createElement('a');
    link.addEventListener("click", resetSpent, true);
    link.setAttribute("total", total);
    link.setAttribute("title", 'wipe history and set spent amount');
    x = document.createTextNode('[reset]');
    link.appendChild(x);
    pnode.parentNode.appendChild(link);

    x = document.createTextNode(' ');
    pnode.parentNode.appendChild(x);
    link=document.createElement('a');
    link.addEventListener("click", addSpent, true);
    link.setAttribute("title", 'add an additional expense');
    x = document.createTextNode('[add]');
    link.appendChild(x);
    pnode.parentNode.appendChild(link);

    x = document.createTextNode(' ');
    pnode.parentNode.appendChild(x);
    link=document.createElement('a');
    link.addEventListener("click", removeSpent, true);
    link.setAttribute("title", 'remove the last added expense');
    x = document.createTextNode('[remove]');
    link.appendChild(x);
    pnode.parentNode.appendChild(link);

    //figure out profit
    var profit = income-total;
    // figure out ratio
    var ratio = (total==0) ? 0 : profit*100/total;
    if (ratio==0)
        ratio=' Meat';
    else
        ratio=' Meat ('+ratio.toFixed(1)+'%)';

    x = document.createElement('p');
    pnode.parentNode.appendChild(x);
    x = document.createTextNode('Profit: ');
    pnode.parentNode.appendChild(x);

    x = document.createElement('b');
    if (profit<0) {
        profit=makeThousands(String(-profit));
        x.appendChild(document.createTextNode('-'+profit+ratio));
        var y = document.createElement('font');
        y.setAttribute('color','red');
        y.appendChild(x);
        x=y;
    } else {
        profit=makeThousands(String(profit));
        x.appendChild(document.createTextNode(profit+ratio));
    }
    pnode.parentNode.appendChild(x);
}

// handler to reset spent amount
function resetSpent() {
    var player = GM_getValue("currentPlayer","");
    if (player=="")
        return;
    var total = this.getAttribute('total');
    var selected = prompt("Set spent value to (no commas):\n", total);
    if (selected!=null) {
        var d = new Date();
        var newamt = parseInt(selected);
        var sumlist = new Array({date:d,amt:newamt,desc:'amount of stuff',store:''});
        storeSumlist(player,sumlist);
        window.location.reload();
    }
}

// handler to add a new spent amount
function addSpent() {
    var player = GM_getValue("currentPlayer","");
    if (player=="")
        return;
    var selected = prompt("Add another cost as of now (no commas):\n", "0");
    if (selected!=null) {
        var d = new Date();
        var newamt = parseInt(selected);
        if (newamt>0) {
            var sumlist = retrieveSumlist(player);
            sumlist[sumlist.length] = {date:d,amt:newamt,desc:'thing?',store:''};
            storeSumlist(player,sumlist);
            window.location.reload();
        }
    }
}

// find most recent transaction
function getLastRecord(sumlist) {
    var oldestDate=new Date();
    var oldestIndex=-1;
    oldestDate.setTime(0);
    for (var i=0;i<sumlist.length;i++) {
        var entry = sumlist[i];
        if (entry.amt>0 && entry.date>oldestDate) {
            oldestDate=entry.date;
            oldestIndex=i;
        }
    }
    return oldestIndex;
}

// handler to remove a record
function removeSpent() {
    var player = GM_getValue("currentPlayer","");
    if (player=="")
        return;
    var sumlist = retrieveSumlist(player);
    var lastrecord=getLastRecord(sumlist);
    if (lastrecord>=0) {
        var entry=sumlist[lastrecord];
        var etext="";
        if (entry.desc && entry.desc!="") {
            var desc=entry.desc;
            if (!entry.desc.match('[0-9][0-9]* '))
                desc="1 "+desc;
            etext=" buying "+desc;
        }           
        var selected = confirm("Remove last expense"+etext+" for "+makeThousands(String(entry.amt))+" Meat, on "+textFromDate(entry.date)+"?");
        if (selected) {
            sumlist[lastrecord].amt=0;
            storeSumlist(player,sumlist);
            window.location.reload();
        }
    }
}

// make a number (string) into thousands form
function makeThousands(num) {
    var s = '';
    var i=0;
    while(num.length>0) {
        if (num.length<=3) {
            s=num+s;
            num='';
        } else {
            s=','+num.substr(num.length-3,3)+s;
            num=num.substr(0,num.length-3);
        }
    }
    return s;
}

// in store view add handlers to record any purchases
function dostore() {
    var listing = document.getElementsByTagName('input');
    for (var i=0;i<listing.length;i++) {
        var inpnode = listing[i];
        if (inpnode.getAttribute('name')=='whichitem') {
            var value = inpnode.getAttribute('value');
            inpnode.addEventListener('click',recordChoice,true);
        }
    }
}

// handler to record store purchases
function recordSearchChoice(e) {
    //var val = (e.target) ? e.target.getAttribute('href') : e.srcElement.getAttribute('href');
    var val = this['href'];
    //GM_log("Recording from value "+val);
    // decode it
    var item = val.replace(/^.*&searchitem=/,'');
    item = item.replace(/[^0-9].*/,'');
    if(item) {
        var player = GM_getValue("currentPlayer","");
        if (player=="")
            return;
        GM_setValue(player+"_lastbought",item); 
    }
}

// handler to record store purchases
function recordChoice(e) {
    var val = (e.target) ? e.target.getAttribute('value') : e.srcElement.getAttribute('value');
    //GM_log("Recording from value "+val);
    // decode it
    var item = val.substr(0,val.length-9);
    if(item) {
        var player = GM_getValue("currentPlayer","");
        if (player=="")
            return;
        GM_setValue(player+"_lastbought",item); 
    }
}

// function to add a search mall link
function addSearchLink(after) {
    var listing = document.getElementsByTagName('a');
    for (var i=0;i<listing.length;i++) {
        var imgnode = listing[i];
        if (imgnode.getAttribute('href')==after) {
            var newlink = document.createElement('a');
            newlink.setAttribute('href','mall.php');
            newlink.appendChild(document.createTextNode('Mall Search'));
            imgnode.parentNode.appendChild(document.createElement('br'));
            imgnode.parentNode.appendChild(document.createElement('br'));
            imgnode.parentNode.appendChild(newlink);
        }
    }
}

// restores missing buyone and buysome links
function addMissing() {
    //GM_log('storeform');
    var player = GM_getValue("currentPlayer","");
    if (player=="")
        return;
    var pwdhash = GM_getValue(player+"_kolhash","");
    if (pwdhash=="") {
        //GM_log("no pwd");
        return;
    }
    var listing=document.getElementsByClassName('buyers');
    for (var i=0;i<listing.length;i++) {
        var x = listing[i];
        if (!x.firstChild || !x.firstChild.nextSibling) {
            var line = x.parentNode;
            var linea = line.getElementsByTagName('A');
            var mref;
            if (linea.length>0 && (mref=linea[0])) {
                var mhref = mref.getAttribute('href');
                if (mhref) {
                    var vals=mhref.substr(mhref.indexOf('?')+1).split('&');
                    var store,item,price;
                    for (var j=0;j<vals.length;j++) {
                        var kv=vals[j].split('=');
                        switch(kv[0]) {
                        case 'whichstore':
                            store=kv[1];
                            break;
                        case 'searchitem':
                            item=kv[1];
                            break;
                        case 'searchprice':
                            price=kv[1];
                            break;
                        }
                    }
                    if (store && price && item) {
                        var priceitem = Number(item) * 1000000000 + Number(price);
                        var buyone=document.createElement('a');
                        buyone.setAttribute('href','mallstore.php?buying=1&quantity=1&whichitem='+priceitem+'&ajax=1&pwd='+pwdhash+'&whichstore='+store);
                        buyone.setAttribute('class','buyone');
                        var f = document.createElement('font');
                        f.setAttribute('color','green');
                        f.appendChild(document.createTextNode('buy'));
                        //GM_log('creating link for item '+item+': '+buyone.getAttribute('href'));
                        buyone.appendChild(f);
                        var buysome=document.createElement('a');
                        buysome.setAttribute('rel','mallstore.php?buying=1&whichitem='+priceitem+'&ajax=1&pwd='+pwdhash+'&whichstore='+store+'&quantity=');
                        buysome.setAttribute('href','#');
                        buysome.setAttribute('class','buysome');
                        buysome.appendChild(document.createTextNode('buy\u00a0some'));
                        if (x.firstChild) x.removeChild(x.firstChild);
                        x.appendChild(document.createTextNode('['));
                        x.appendChild(buyone);
                        x.appendChild(document.createTextNode(']\u00a0['));
                        x.appendChild(buysome);
                        x.appendChild(document.createTextNode(']'));
                    }
                }
            }
        }
    }
}


function GM_post( dest, vars, callback, external) {
    var theHost = (external)?"":document.location.host;
     GM_xmlhttpRequest({
        method: 'POST',
        url: 'http://'+theHost + dest,
        headers: {'Content-type': 'application/x-www-form-urlencoded'},
            data: vars,
            onload:function(details) {
                if( typeof callback=='function' ){
                    callback( details.responseText);
                }
            }
    });
}

function addBestPriceLinks() {
    var hrs = document.evaluate( '//b[text()="Item:"]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
    for (var i=0;i<hrs.snapshotLength;i++) {
        var b = hrs.snapshotItem(i);
        if (b.parentNode && b.parentNode.tagName=='TD') {
            var p = b.parentNode.parentNode;
            while (p && p.tagName!='TABLE')
                p = p.parentNode;
            if (p && p.rows && p.rows.length>0) {
                var rows = p.rows;
                var td = document.createElement('td');
                var t = document.createElement('b');
                t.appendChild(document.createTextNode('Lowest:'));
                t.setAttribute('title','Showing lowest price for each item. You can disable this QuickMall feature in your account options.')
                td.appendChild(t);
                rows[0].appendChild(td);
                for (var j=1;j<rows.length-1;j++) {
                    var x = document.createElement('span');
                    x.setAttribute('style','color:pink;font-size:small;');
                    x.appendChild(document.createTextNode('check lowest price'));
                    x.addEventListener('mousemove',fetchBestPrice,false);
                    td = document.createElement('td');
                    td.appendChild(x);
                    rows[j].appendChild(td);
                }
                break;
            }
        }
    }
}

function fetchBestPrice(e) {
    this.removeEventListener('mousemove',fetchBestPrice,false);
    this.removeEventListener('click',fetchBestPrice,false);
    this.setAttribute('style','color:gray;font-size:small;');
    this.replaceChild(document.createTextNode('checking...'),this.firstChild);
    this.addEventListener('click',fetchBestPrice,false);

    doMallSearch(this,this.parentNode.previousSibling.previousSibling.innerHTML);
}

function unencodeChars(str) {
    var tbl = {'\u00A4':'curren',
               '\u00A9':'copy',
               '\u00C0':'Agrave',
               '\u00C1':'Aacute',
               '\u00C2':'acirc',
               '\u00C3':'Atilde',
               '\u00CE':'Icirc',
               '\u00B1':'plusmn',
               '\u00B2':'sup2',
               '\u00B6':'para',
               '\u00BD':'frac12',
               '\u00BF':'iquest',
               '\u00E4':'auml',
               '\u00E6':'aelig',
               '\u00E9':'eacute',
               '\u00F1':'ntilde',
               '\u00F6':'ouml',
               '\u00F8':'oslash',
               '\u016B':'#363',
               '\u2030':'permil',
               '\u2122':'trade',
               '\u25CA':'loz',
               '\u2021':'Dagger'};
    var s = '';
    for (var i=0;i<str.length;i++) {
        var c = str.charAt(i);
        if (tbl[c])
            s += '&'+tbl[c]+';';
        else {
            if (str.charCodeAt(i)>0x7f) {
                GM_log('cannot convert: '+str.charCodeAt(i));
                s += '&#'+str.charCodeAt(i)+';';
            } else
                s += c;
        }
    }
    return s;
}

// code adapted from the "UPDATED Manage Prices" script
function doMallSearch(component,itemName) {
    itemName = itemName.replace(/^\s*\<b\>\s*/,'').replace(/<\/b\>.*/,'')
    itemName = itemName.replace(/&nbsp;/gi,'').replace(/&amp;/g,'&');
    itemName = encodeURIComponent('"'+unencodeChars(itemName)+'"').replace(/%20/g,' ');
    //GM_log('itemName="'+itemName+'"');
    GM_post('/mall.php','didadv=0&pudnuggler='+itemName+'&category=allitems&nolimits=0&justitems=0',showBest);
    
    function showBest(data) {
        //GM_log('data received="'+data+'"');
        if(typeof dataHolder == 'undefined') {
            dataHolder = document.createElement('div');
        } 
        dataHolder.innerHTML = data;
        var tables=dataHolder.getElementsByClassName('itemtable');
        if (!tables || !tables[0]) {
            //            component.replaceChild(document.createTextNode('failed--click to try again'),component.firstChild);
            // if (!tables)
            //  GM_log('no itemtable found');
            // else 
            //  GM_log('no entries in the itemtable: '+tables.length);
            component.removeEventListener('click',fetchBestPrice,false);
            component.setAttribute('style','color:pink;font-size:small;');
            component.replaceChild(document.createTextNode('check lowest price'),component.firstChild);
            component.addEventListener('mousemove',fetchBestPrice,false);
         } else {
            component.removeEventListener('click',fetchBestPrice,false);

            var rows = tables[0].getElementsByTagName('tr');

            for(var i=2,j=10;i<j;i++) {
                if (!rows[i])
                    break;
                var cells = rows[i].getElementsByTagName('td');
                if (!cells || cells.length<2)
                    break;
                var source = cells[1].firstChild.href;

                var storeNodes = cells[1].firstChild.childNodes;
                var str = new Array();

                for(var x=0,y=storeNodes.length;x<y;x++) {
                    if(storeNodes[x].nodeType==3) {
                        str.push(storeNodes[x].nodeValue);
                    }
                }
                var storeName = /<b>([^>]+)<\/b>/.exec(cells[1].innerHTML)[1];
                var limit = /\d+/.exec(cells[3].innerHTML);
                if(!limit)limit= '-';
                var quantity = /[0-9,]+/.exec(cells[2].innerHTML);
                var price = /([0-9,]+)&nbsp;Meat/.exec(cells[4].innerHTML)[1];
                
                var link = document.createElement('a');

                link.appendChild(document.createTextNode(price+' Meat'));
                link.href=source;
                link.title = storeName;
                component.replaceChild(link,component.firstChild);
                var pp = component.parentNode.previousSibling.innerHTML;
                if (Number(pp.replace(/[^0-9]*/g,'')) > Number(price.replace(/[^0-9]*/g,'')))
                    link.setAttribute('style','color:red;');
                else
                    link.setAttribute('style','color:green;');
                break;
            }
        } 
    }
}

// --------------------------------------------
// ---------- account menu option -------------
// --------------------------------------------

// Charon's code
function buildPrefs() {
    if (!document.querySelector('#privacy'))
        return;
    if (!document.querySelector('#scripts')) {
        //scripts tab is not built, do it here
        var scripts = document.querySelector('ul').appendChild(document.createElement('li'));
        scripts.id = 'scripts';
        var a = scripts.appendChild(document.createElement('a'));
        a.href = '#';
        var img = a.appendChild(document.createElement('img'));
        img.src = 'http://images.kingdomofloathing.com/itemimages/cmonkey1.gif';
        img.align = 'absmiddle';
        img.border = '0';
        img.style.paddingRight = '10px';
        a.appendChild(document.createTextNode('Scripts'));
        a.addEventListener('click', function (e) {
                //make our new tab active when clicked, clear out the #guts div and add our settings to it
                e.stopPropagation();
                document.querySelector('.active').className = '';
                document.querySelector('#scripts').className = 'active';
                document.querySelector('#guts').innerHTML = '<div class="scaffold"></div>';
                document.querySelector('#guts').appendChild(getSettings());
            }, false);
    } else {
        //script tab already exists
        document.querySelector('#scripts').firstChild.addEventListener('click', function (e) {
                //some other script is doing the activation work, just add our settings
                e.stopPropagation();
                document.querySelector('#guts').appendChild(getSettings());
            }, false);
    }
}

function getSettings() {
    //build our settings and return them for appending
    var contents = document.createElement('div');
    contents.id = 'quickmallprefs';
    var fieldset = contents.appendChild(document.createElement('fieldset'));
    fieldset.setAttribute('style', 'width:33%; margin-top:20px');
    var legend = fieldset.appendChild(document.createElement('legend'));
    legend.className = 'subhead';
    legend.textContent = 'QuickMall';
    var section = fieldset.appendChild(document.createElement('div'));
    section.className = 'indent';
    section.appendChild(buildSettings());
    return contents;
}

function buildSettings() {
    var d = document.createElement('div');
    d.appendChild(document.createTextNode('Show lowest prices in stores: '));
    var ar = document.createElement('a');
    ar.setAttribute('href','#');
    if (GM_getValue('showlowest','1')!='1') {
        ar.appendChild(document.createTextNode('No'));
        ar.setAttribute('title','Lowest price for each store item is not currently shown.  Click to toggle.');
    } else {
        ar.appendChild(document.createTextNode('Yes'));
        ar.setAttribute('title','Lowest price for each store item is currently shown .  Click to toggle.');
    }
    ar.addEventListener('click',toggleLock,false);
    ar.setAttribute('id','quickmalltoggle');
    d.appendChild(ar);
    return d;
}

function toggleLock() {
    var ar = document.getElementById('quickmalltoggle');
    if (GM_getValue('showlowest','1')=='1') {
        GM_setValue('showlowest','0');
        ar.replaceChild(document.createTextNode('No'),ar.firstChild);
        ar.setAttribute('title','Lowest price for each store item is not currently shown.  Click to toggle.');
    } else {
        GM_setValue('showlowest','1');
        ar.replaceChild(document.createTextNode('Yes'),ar.firstChild);
        ar.setAttribute('title','Lowest price for each store item is currently shown .  Click to toggle.');
    }
}


if(window.location.pathname=='/charpane.php') {
    // get and store player name and pwdhash
    getPwdHash();
} else if(window.location.pathname=='/mall.php') {
    // add links to buy directly 
    addMissing();
    domall();
} else if(window.location.pathname=='/mallstore.php') {
    // record purchases and accumulate spending
    storeform();
    dostore();
    if (GM_getValue('showlowest','1')=='1')
        addBestPriceLinks();
} else if(window.location.pathname=='/managestore.php') {
    // just add a search link
    addSearchLink('storelog.php');
} else if(window.location.pathname=='/storelog.php') {
    // show and manipulate spending, profit, and add a search link
    dolog();
    addSearchLink('managestore.php');
} else if(window.location.pathname=='/manageprices.php') {
    // show and manipulate spending, profit, and add a search link
    addSearchLink('managestore.php');
} else if (window.location.pathname.indexOf('/account.php')==0) {
    buildPrefs();
}
