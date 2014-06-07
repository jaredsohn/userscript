// Version 0.5c
//
// ==UserScript==
// @name          AADL to Mel to world cat
// @namespace     http://hyperphor.com
// @description   Puts a link to Worldcat on Amazon book pages
// @include       *.amazon.*/*

// ==/UserScript==
//
// Version 0.5c - Updated for new Aadl catalog scripts

(function() {
  var Drag = function(){ this.init.apply( this, arguments ); };

  Drag.fixE = function( e ) {
    if( typeof e == 'undefined' ) e = window.event;
    if( typeof e.layerX == 'undefined' ) e.layerX = e.offsetX;
    if( typeof e.layerY == 'undefined' ) e.layerY = e.offsetY;
    return e;
  };

  Drag.prototype.init = function( handle, dragdiv ) {
    this.div = dragdiv || handle;
    this.handle = handle;
    if( isNaN(parseInt(this.div.style.left)) ) this.div.style.left  = '0px';
    if( isNaN(parseInt(this.div.style.top)) ) this.div.style.top = '0px';
    this.onDragStart = function(){};
    this.onDragEnd = function(){};
    this.onDrag = function(){};
    this.onClick = function(){};
    this.mouseDown = addEventHandler(this.handle, 'mousedown', this.start, this);
  };

  Drag.prototype.start = function(e) {
    e = Drag.fixE(e);

    this.started = new Date();
    var y = this.startY = parseInt(this.div.style.top);
    var x = this.startX = parseInt(this.div.style.left);
    this.onDragStart(x, y);
    this.lastMouseX = e.clientX;
    this.lastMouseY = e.clientY;
    this.documentMove = addEventHandler(document, 'mousemove', this.drag, this);
    this.documentStop = addEventHandler(document, 'mouseup', this.end, this);
    if (e.preventDefault) e.preventDefault();
    return false;
  };

  Drag.prototype.drag = function( e ) {
    e = Drag.fixE(e);
    var ey = e.clientY;
    var ex = e.clientX;
    var y = parseInt(this.div.style.top);
    var x = parseInt(this.div.style.left);
    var nx = ex + x - this.lastMouseX;
    var ny = ey + y - this.lastMouseY;
    this.div.style.left = nx + 'px';
    this.div.style.top  = ny + 'px';
    this.lastMouseX = ex;
    this.lastMouseY = ey;
    this.onDrag(nx, ny);
    if (e.preventDefault) {
      e.preventDefault();
    }
    return false;
  };

  Drag.prototype.end = function() {
    removeEventHandler( document, 'mousemove', this.documentMove );
    removeEventHandler( document, 'mouseup', this.documentStop );
    var time = (new Date()) - this.started;
    var x = parseInt(this.div.style.left),  dx = x - this.startX;
    var y = parseInt(this.div.style.top), dy = y - this.startY;
    this.onDragEnd( x, y, dx, dy, time );
    if( (dx*dx + dy*dy) < (4*4) && time < 1e3 ) {
      this.onClick( x, y, dx, dy, time );
    }
  };

  function removeEventHandler( target, eventName, eventHandler ) {
    if( target.addEventListener ) {
      target.removeEventListener( eventName, eventHandler, true );
    } else if( target.attachEvent ) {
      target.detachEvent( 'on' + eventName, eventHandler );
    }
  }

  function addEventHandler( target, eventName, eventHandler, scope ) {
    var f = scope ? function(){ eventHandler.apply( scope, arguments ); } : eventHandler;
    if( target.addEventListener ) {
      target.addEventListener( eventName, f, true );
    } else if( target.attachEvent ) {
      target.attachEvent( 'on' + eventName, f );
    }
    return f;
  }

  try {
    var isbn = window.content.location.href.match(/\/(\d{7,9}[\d|X])(\/|$)/)[1];
  } catch (e) {
      // window.alert("Could not locate ISBN");
    return;
  }
  

  var url_a = 'http://www.aadl.org/catalog/search/keyword/'+ isbn
  var url_m = 'http://elibrary.mel.org/search/i?SEARCH='+ isbn
  var url_w = 'http://worldcat.org/isbn/'+ isbn
  var url_r ='http://www.aadl.org/contactus'
  var name_a = 'AADL'
  var name_m = 'Mel Cat'
  var name_w = 'World Cat'
  var name_r = 'Not Found'
  var notFound = /Sorry, your search produced no results/
  var notFound_m = /No matches found; nearby ISBNS/
  var notFound_w = /The page you tried was not found/

  //var iconUrl = 'http://outgoing.typepad.com/photos/uncategorized/worldcat48.gif';
  var logo_a = 'data:image/gif;base64,R0lGODlhMAAwAPcAAAAAAP%2F%2F%2F3Neo%2Ff29%2Bzp7fb09%2FTy9d7a4urn7e7s8Pf2%2BNzW4%2BTg6dnT4dnU4Onm7efk69HK3NbQ3%2BHd5'+
	'%2FDu88e%2B18O60svD2M3G2dXP39PN3c%2FJ2ezp8ern75GAsp2OurOox7mvzLiuy72zz7uxzcC30drV43Vgo3dipIBtqYNwrIJvq4Vyrop4r4t6sIx7sI59spB%2FtJGAtJSEt5ODtZiIuJq'+
	'LupqLuZ6PvZ%2BRvaibw6ufw62hxbGmyLClx7yy0bqwzr%2B20sC30720z8jA2M3G3NDJ3s3G29jS5NfR49zX5uLe6ujl7u3r8evp7%2FX092JLmGNMmWRNmmZPm2dQm2hSnGpTnWlTnWtUnmp'+
	'UnWxWn21XoG5Yn25ZoHFbom9aoXBboXFconJdonFcoXRfo3Nfo3VhpHllpntnqHllpXpnp31pqnxpqX1qqX5rqX9sqYFuq4JvrIZ0rpKCtpaHuJeIuKOVwrClydrV5fLx9f39%2Ft3d1Nvb0ub'+
	'm3%2BXl3ujo4ufn4f7%2B%2Bezs5%2F39%2BfHx7f%2F%2F%2FPX18vT08fLy7%2F7%2B%2FPf39f%2F%2F%2Fvz8%2B%2Fv7%2BvT083BuSX99XIF%2FX4SCY6mokq2sl7q5p7e2pL28q7y7q'+
	'ru6qcPCsl5bMmViO2ZjPGdkPmhlP2xpQ2toQ25rRm1qRW9sR3BtSW9sSHFuSnJvTHd0UXt4Vnp3VXx5WH57Wn16Wo2Lbo%2BNcJKQdJWTeJuZf52bgpyagaKgiKCehp%2BdhaSii6OhiqWjjKa'+
	'kjsXEtcnIus3Mv8zLvs%2FOwtLRxdbVympmQG5qRXh0UoOAYYiFZ4yJbIuIa5CNcZGOcqyqlauplKqok6mnkq%2Btma2rl7OxnrWzoLSyn9jXzdfWzNTTydnYzt3c09zb0tva0djXzoSAYailj'+
	'6ajjb%2B9rcG%2Fr8XDteTj297d1ePi2%2BLh2uHg2d%2Fe1%2BXk3eTj3LSxnrGum%2Bjn4ebl3%2Bvq5ejn4uzr5%2FDv7Pj39fb18%2Fv6%2Bf79%2Ffz7%2B%2FPy8v7%2B%2Fv39%2Ffr'+
	'6%2Bvn5%2Bfj4%2BP%2F%2F%2FyH5BAEAAP8ALAAAAAAwADAAAAj%2FAB316%2BdvoL%2BCBwkOXMgwocKGBh8yXOgogMWLGDNq3Mixo0V9HkOKDHDIX0ZFGfeNXJnx1ytjwSzuA6RLWkqWOAM'+
	'gwtRJmEV0xzZRyngvJ853pLJZXKTukU2MiYyyRCdKqUV7rp5lBCl15Lli1i42OjbppsdG8OZpZASP0EZDfeadSyr2mFaMXDnyqcbrWDNGF7lVAxfp70VGlcA5s4XMlNUAY%2B9ejMoRmCyU4kD'+
	'9sfiLmaEAvT75ubhrmr0AjKIRexzZ7EZYuiyWM6XNIjNcFsmV2sP5mEqLfkSFvWrXtUZAhyyOE8U7gLvkAXyJKmcxli2MVFmTNb7R2iV2p6hf%2F%2ByWiRoq8ZCgYRd%2B0V5xqB0bTWpGKB2'+
	'p5o2aQZtHLrxFb8tgdE5VdUlmEWUbZZIKYN2Mco5FmKTSSADakGKORd948uBPoXBzmCTNXLSNIB7hcgog7jQTSjjZ7JNLKe%2FEI82K19gjjzGQmLPPH7xwIotSjRCyii306IMNJ5KgxNEwrCR'+
	'DDTztsGJJIty0ogw1f0yjCjWArZOMJLc8M8wsulwTgCaz1FILLe68Ewkt%2FXikyGcW0RmAItAFYKdFhCDy0UX4AAaZSv78tlZXXS2S0QD1ICqVoBdFwICjRgWC0T43MKFRIZR6NAFGRnhgqEV'+
	'NENBpRxdgNMcMGRUQwhOncv9EwkVOeEFHRj4AEStHNlzEAxQiYFQBGRzsulENgHGAQhUbXIQAGDPk1Z6ip7bxQAB3XIEFBhZ1sAIVqWLUzwUG7MoGAY3I0QUWRwRQCA1TrMAPRk18IIGxZziAQ'+
	'RZicJGEPjpscYUOGC1Ahg%2FGBoCGCm2E8UUKhfxQRRhj4GGRAj1cIcO8xrLxhRdkiHEGCGd4sQUMFkFAgxRnJJBwAGwIILMAYmgRhgBaEBGAEChocYXOGjUyiKMxzzxzGGccsIMVYFyxg7QBN'+
	'DGCBghKVbTRMpNhhhYCcNECrBYxYkIOKWSgB6VXY02zAGGggIBFDwwBQxQvLHFq2moLgIUIeQSgQcMJV1CBw4SnrpG30V7E4cYVXGyxhQXUFn444mAIsEUaFSSM9%2BRjuPD2RowUAClOhk8%2'+
	'Bsxdq5MPIAPRMUEQEJcyBQwkQVM3S5oeXEQMcb6RwwhRQpMGDEqPnhPvhXXjxxRVVpEBCRWibrrYWXMTwQ7l3Sz%2BzGGLU0UDCZ2gvsxhkOEBBHsaysMYabLTv%2FvtssB8%2FGnLgYAcRSAx'+
	'ie04BAQA7';	

  var logo_m = 'data:image/gif;base64,R0lGODlhMAAwAPcAAAAAAP%2F%2F%2F%2B7u7nNeo%2Ff19v78%2Fvz7%2FPn4%2Bff29%2Fj2%2Bfbz%2BPr5%2B%2Fn4%2Bu%2Fs8%2B3q8fPx9vH'+
	'v9J2LvMa72cW71sS70%2Bjk75uJvKyfxce92sa%2B1dLK4c3F3GFHmm5VpGlRnW1UoGxTnmtUnW5WoGxVnm5Wn2xVnXFao3JbpHJbo3FaoW5YnXVepnRdpHNdo3JcoXReo3plqHhjpX9sp4Zyr'+
	'3xroYl3sIx6sY59s5OBt419r5aFupaFuI5%2FrpiIuZmKuZyNvKSWwq6gyrSm0LCjy6%2Biyq6hybSnz6%2BjybGlybOoy7yx1Leszrarzb%2B11MC21MrA3sa92cK51crC28jA2M7H3NLM3tf'+
	'S4ern8OTi6GRLm2pSo2ZOnGVOm2RNmWNMl21VpWxVo2lTn2pTn2hRm25WpG1WpGpUoGdRmm5Wo2xWompUn2pTnWlTnWtUnmxWoG9Yom5YoWtWnmxWnnFapG1YoGtWnWxWnXNdp29aoW5Zn25an'+
	'3NdpHFconNepHFcoXZhpnNfonlkqHpmqntnqXRhn3toqXlmpn9srX1qqntop39rq4FurYNwr4NwrXppooRxrntqo3tqoYZ0r4Vzrox7tYp5s4Nzqol5r4p6r5ODupGBt49%2FtIl6rZeHvZODt'+
	'5aGupSFuJOEtpWHtp2Ov5%2BRwJ%2BSvqGUwIV6nqaaw7Wp0bGmzLOozbqw0riuz7Wry7yy0rqxz8O619HK4s3G3tLL4tHK4dDJ4M3G3dPN4d3Y6OHd6t%2Fb6NvX5OXh7mBKmWJMmmZRnGlUn'+
	'XBcpm1Zn3FdpG1anX5tqoNyr4Z1sHZnm4R0rYt7tYd3r419tXptnI5%2FtZOEuJSGuX5ynYx%2FrZ6Rv5yQvIh%2FoLet0Lasz4uEnr210czF3s7I3d3Z5%2BPg6%2B3r8op9rpiMvJaMtZaTo'+
	'Ofl7pGOnZOQou3s9PT09%2Fz8%2FZ6foaCjoaSoof7%2F%2Ffr7%2BaitobbDn7XCnq63n6yzoKuyn8TXn7nInrvJn%2F%2F%2F%2Fvv7%2Bvr5%2BfX19fLy8uvr693d3f%2F%2F%2FyH5BAE'+
	'AAP8ALAAAAAAwADAAAAj%2FAP3xE0CwoMGDCBMqVMjPX78AECNKnEixosWLAQQ8xMixY0eNHkOKlAhypMmPG0%2BqrFhypcuILV%2B6jClTJc2aJgVUsSWrVs9aGjTUGko0KNGfRJPKomUUqFB'+
	'ZSIdqwEJixAg5ccyYUaN1hBquW7d6DXtVjpqycty4kXPValo5duLUCRGHi7gWA%2FLq3cu3r9%2B%2FgOWAwwu4sOHDeeVMI4z4bwo4efAwbqzYRJsQbdqEocNnD7E4bMIEY%2FPhBDFiwvi8y'+
	'EOi0DJNku6ASAHIBQu8LULgOUEGTBo0aMpoyVEJCgUJEpA0knNCBI5XGCRAIcKHxYsBKEDY4OYu4rlrhkgM%2F3jBAgWiCZ2kvWPHnt07a5hGBVjAoHs%2BasM2BGin70CAXHm00IcJfDSBDwN'+
	'SoFIKErsE0MAN4g2AxzEBpOLMPO9k%2BM482WDyQwClDADDM908YEUA2iwiyAC2eBMgH35UEQAViRhCzQWfDAANOg0EkoKEjQRwjQcdFFnkF2vwEEEAFqwxhxoD9ILiGG%2FM4cE23uiRWxQBu'+
	'OKLKelEBAEOxiyQwQgSPhKAENLYE8%2Bb8dhTziVLRiBHHyuMcU0AjLzRRx9tzOKiHKEEMIUXogRgRSbKkHJFADYAgQ8yeOChZiqEmKOppuNIg0mddgywhxiquCPICXkF6mIduBxQCB7k8P%2F'+
	'ixS9n%2BAKIA7rMEEASuqmJjQqOBBssJC7kAKqopOYzyBypChoCI%2Fg0kcUmAegigRTYxuINPpp8g0uvARjRJjzkwnPPnMeOqoqyzA6g6hg9BDDKFjsEkAABCOSbwAMQhHKFFXJYGgA2YqBgs'+
	'MEnuGFsABGEqi67zXpzBikBgOLBJAEoYUIgHAcCwx%2BLtBOFGgIbkcw66qSszjqnfMqww8kuGzG8AfwAAh667MLGGyb0PMcW1QQQDQkCq5KMPPQkTY882dD5MrLryjyAGs7WEMAqIbjhQwCwx'+
	'NEGHCKMgYyJAVoarSGHpK02CuB8%2BAPMqxhQSLsh2NKLCi98swsdLZj%2F8UoAvFBTiSawLACBDG8MIMIjBgSAD0WoWIIIEoiMEcIaXNRwQR4ehBDCGDqUMkYXsASwiRouuMBEAvu1Azgz4rV'+
	'AgzFHBFEEEbjjnoQxnMSyyitOBO%2FEK0s0IbwTrFwTiymEOOBAIiK0UEIhN4CCgyR64C1GJPWMs0IrS4QvPhOsnDjSAYpQm0sMaPoBBwl04DEAH2ygYkE2yTxxkQAn5TIGEAEghw3OQIIU8IE'+
	'PcGCDH7QRAFxwwBQY4d9JbgGMcCQgH1HwhCJiAANJoMIbMypGDxaAj8exZCVWAMQfpOC6AiiAARBxgA%2B4gIoF7MeEFJGgSiAAhDwgwhSvgEIUUIhwAxUcQ0YfcZ1LKjCETVCiGc2oxChuEab'+
	'9cEQABMDJTPahxZUIgItdPMkXwyhGMJJRJGM8IxrNqMaPsLGNEXwjHC2SxjnG0Y5XlCMeSRIQADs%3D';

var logo_w = 'data:image/gif;base64,R0lGODlhMAAwAPcAADF7tTl7vTmEvUKEvUKcQkqMvUqcQkqcSlKUxlKcSlKlSlKlUlqUxlqlWmNKlGNSlGOcxmOczmOtWmOtY2tSlGtSnGtanGuczmulz'+
	'mutY2uta2u1a3NanHNjnHNjpXOlznO1c3tjpXtrpXut1nu1c3u1e3u9e4RzrYSt1oS11oS9hIx7rYx7tYy11oy9hIzGjJSEtZS11pS93pTGlJyMvZyUvZy93pzGlJzOnKWUvaXG3qXOpa05c61'+
	'Cc61Ce61Ke62cxq2lxq3G3q3G563Opa3O563WrbVKe7VShLVajLWlzrWtzrXO57XWtb1jjL1jlL1rlL2tzr211r3W573etb3evcZznMZ7nMaEpca91sbevcbexsbnxs6Epc6Mrc6Urc6Utc7G3'+
	's7O3s7e787nzs7n1s7n79actdalvdbO59bn1tbn79bn99bv1t6txt61xt61zt7W597e597v3t7v9%2BeMMeeUMeeUOeeUQuecQuecSuecUuelUuelWue9zue91ufG1ufO1ufO3ufe7%2Bfn7%2'+
	'Bfv5%2Bfv9%2Bf35%2B%2BtY%2B%2Bta%2B%2B1c%2B%2B1e%2B%2B9hO%2B9jO%2FGjO%2FGlO%2FO3u%2FW5%2B%2Fe5%2B%2Fn7%2B%2Fn9%2B%2Fv9%2B%2F35%2B%2F37%2B%2F39%2B%'+
	'2F3%2F%2FfOnPfOpffWrffWtffevffexvfnzvfn7%2Ffv7%2Ffv9%2Ff39%2Ff3%2F%2Ff%2F9%2Ff%2F%2F%2F%2Fnzv%2Fv1v%2Fv3v%2Fv5%2F%2F35%2F%2F37%2F%2F39%2F%2F3%2F%2'+
	'F%2F%2F9%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F'+
	'%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2'+
	'F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%'+
	'2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F'+
	'%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2'+
	'F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%'+
	'2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FyH5BAEAAFkALAAAAAAwADAAAAj%2BAGMJHEiwoEGBleRkAQLjRIcOHCx0ECFCSaWDG'+
	'DMeJCRlRYgHDxyAdEBh5AMKQTQaxCQEAgMhmDYq6SASZMmbJ3M%2B6EBIJUEdAQAAECDEIKEVNnXiVPrAQk%2BfsTAhECqUASmCaUTkxFkyqVIYMaGOoRqUwUWBhE6I7NrVAcmmES1QoHAiDlS'+
	'BLYQGBdBiYCUaSW9yYBEkSxxClQhRIsQ4LFRSEADsBTBmYBYLW08GSXP2rsYxBagCYPC0ktquD0JkuerZpw7JQwGgYC2G64MwBSdF8uOmNxxIlFp%2FEB1gikBSOTLnYB3rDZQkP3z0mN7jh5M'+
	'rcJhnJDWVaoGnhLT%2BduUgZqAg6ujT97ACSCWmAXoBQBiYhu0DFo69qO8hPf0PNNoVRMheAgDwgWU6OSDFQKRgQV1%2F%2B03nwxcBDjSWaH0JFMRaIeE2kB8RPpieGxhNER8AMQyUA4cPyEE'+
	'QKV4g8UMSUHgBBhhYOAEhdT%2B0Z5CJotkwEGA2UfAUg5JIMglzlUzihxMi9uBEZxZKVqBsA4Vxkkg0tBYLIVeoR6KAVwo1H0JLUETDkZ5NAoWE0yXBZiykhObdGgVVmNEqqxAUyA8jGjQcbLJ'+
	'ReZcrjyDSxyN9CqQfekkYJESZQwmhp0ab1HFHHXU04opAkQAKp49%2BMXDiAEV5Rgoimt5xhx7%2BoAzkIHU8gPGjaFR9UNljiLjqah2LDASJqHEGRxAmg%2B4VVAE24OnTI626qocqAlHyJo%'+
	'2BBGHUBVZSi6pMrrPp6xyMDgSGiFwetYSquVc15UKbi9nFWIOlFulEKynq3q0aq9BEtHtTGUkkS6PkgMBVVXHKsDvAJVeB3BgVISiPR1vHJQI9O54QaGRxwQANVCNiCnQMISZAaKjSgARXMfVL'+
	'xJqxFcm0SgJRwgAE3L7CDoWPE0EKqA13SMc4NkDEQKOLWQe5Ak6CBRiSxLICzxzeXoManDBo0RwlTG2DADAOtkjTMGGkwNdUGNLBzRnOQcPbNLwz0yaa%2Fkn0QGRPgfDb5zhnsUAjWAl3SRMc'+
	'3U130QBT7arFGHL%2FtMc4TzFAFGWQQYXPhjx%2Bww0Cq6CHuHbFqVMgMmKPtcQIHLJA52gnswJorjCQtL1SD60116aYX7vpAneDxud0%2BzfGC1KsXf7MBExDRsufi7lGIl1uUkMDet3t9AAh'+
	'zEPQJ87%2FesYmXCHExQwOo227AAiQkTFAne9DtayKWgE%2FQJVXg8IIKKsxAxBxUrvKI77ILnfzyVAlXVGgVivjcpvTwiUsN8F16iNav9tDAB95lFQD8HAUdaMGCPMJ9v0rE8zp4F2gp7g6NG'+
	'CEJoaIK33FqD53g4AoN0ok%2B6KEPoJAhRgICADs%3D';

 var logo_r = 'data:image/gif;base64,R0lGODlhMAAwAMQAAAAAAP%2F%2F%2F4Nxr4x7tcG418rC3XFdpHpnqpWGu56Qwaaaxq%2BkzLiu0tLM4tvW6Pb1%2BeTh7u3r9P%2F%2F%2FwAAAAAA'+
	'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAABIALAAAAAAwADAAAAX%2FYCCOZGmeaKqubOu%2BcCzPdG2bj0MwPONEt1ZkMTAYj0eBwhE8RRRIgwBBLSIRzKaIkVxkSx'+
	'CC1ZB4BB9WQaHlQBgPEBtEYGTEGgfDYT175A8NMxBWXy9oenE0h3AxC0aFfXkDMA5GBE0QdS90CCUPUAd2Jg2ciSNcB0AsDY8lUEd8IxFIAp55Cy0JBp0lUbynUZCoLA9GsSN5RwklBFGmIrMG'+
	'gSqVBmYlXEeQfke%2FJEWiKVyTJwUICZDQCggM1yWO3idQy1okzbUqbuH1AdUr%2BvxG%2BMtnYF%2B9gSnc4AoYgJWBFVziaYm4ooAeMA4yatzIkWMJXQpWZDLwzE2Ukygfe5LIc2kFnYUiTK'+
	'acqVKEQ1UqULlr4kaiE01aqh1T4SiVliLkWjygk9TGq3TUjIS0YbGgjKpTZ2Cl8WrAThddv8JopmcoNSsKxN5JpkbtiAYyDdb4dIVBAY0NGCRItutZkyc0u0HV8qDBAgR8dykogJOh48eQI0ue'+
	'TFlyCAA7';

  var libraryLookup = {

    insertGLink: function(lname, lurl, llogo) {
	var body = document.getElementsByTagName('body')[0];
	var div = document.createElement('div');
	div.setAttribute('style','left:200px;top:0px;z-index:999;color:#000000;padding: 0px;position: absolute;');

      var title = document.createElement('div');
	var label = document.createTextNode( lname );
	title.appendChild(label);
	title.setAttribute('style','background:#FFFF99;cursor:move;color:black;border:1 px;');
	div.appendChild(title);

	var link = document.createElement('a');

	link.setAttribute('href', lurl);
	link.setAttribute('target', '_blank');

	var img = document.createElement('img');
	img.src = llogo
	//img.setAttribute('src', iconUrl);	
	link.appendChild(img);
	div.appendChild(link);
	body.appendChild(div);

      title.drag = new Drag(title, div);
    }
}
    function doLookup ( isbn )
        { 
        GM_xmlhttpRequest
            ({
            method:'GET',
            url: url_a,
            onload:function(results)
                {
                page = results.responseText;
                if ( notFound.test(page) )
                    {
				        GM_xmlhttpRequest
            				({
            				method:'GET',
            				url: url_m,
            				onload:function(results)
                					{
                					page = results.responseText;
                					if ( notFound_m.test(page) )
                    					{
									GM_xmlhttpRequest
            								({
            								method:'GET',
            								url: url_w,
            								onload:function(results)
                									{
                									page = results.responseText;
                									if ( notFound_w.test(page) )
                    									{
												libraryLookup.insertGLink( name_r, url_r, logo_r);
                    									}
                					 				else
                    									{
												libraryLookup.insertGLink( name_w, url_w, logo_w);
                    									}
               									 }
           					 				});
                    					}
                					 else
                    					{
								libraryLookup.insertGLink( name_m, url_m, logo_m);
                    					}
               					 }
           					 });
                    }
                 else
                    {
				libraryLookup.insertGLink( name_a, url_a, logo_a);
                    }
                }
            });
        }


  //libraryLookup.insertGLink( name_a, url_a, logo_a);
//libraryLookup.insertGLink( name_m, url_m, logo_m);
//libraryLookup.insertGLink( name_w, url_w, logo_w);
//libraryLookup.insertGLink( name_r, url_r, logo_r);

doLookup(isbn);

}
)();
