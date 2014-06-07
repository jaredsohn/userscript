// ==UserScript==
// @name           Bilddagboken - Show more on hover
// @namespace      arvid.jakobsson@gmail.com
// @include        http://*.bilddagboken.se/p/friends.html
// ==/UserScript==

var BDBShowMoreOnHover = {
  init: function () {
    var that = this;
/*
    var friendRows = $x("//div[@class='friend']");
    for (var i = 0; friendRow = friendRows[i]; i++) {
      var infoBox =
	$xs("./following-sibling::div[starts-with(@id, 'infoBox')]", friendRows);
      var holder = document.createElement('div');
      friendRow.parentNode.insertBefore(holder,
					friendRow);
      holder.appendChild(friendRow);
      holder.appendChild(infoBox);

    }
      */

    $x("//div[@class='friend']").forEach(function (friendRow) {
					   var infoBox =
					     $xs("./following-sibling::div[starts-with(@id, 'infoBox')]", friendRow);
					   var holder = document.createElement('div');
					   friendRow.parentNode.insertBefore(holder, friendRow);
					   holder.appendChild(friendRow);
					   holder.appendChild(infoBox);
					   holder.addEventListener("mouseover", curry(that.toggleRow, that,
										      holder, true), false);
					   holder.addEventListener("mouseout", curry(that.toggleRow, that,
										     holder, false), false);

					 });
  },
  toggleRow: function (holder, visibility) {
//    console.log(row);
//    console.log(visibility);

    f = $xs(".//*[starts-with(@id, 'friend')]", holder);
    d = $xs(".//*[starts-with(@id, 'dropdown')]", holder);
    e = $xs(".//*[starts-with(@id, 'infoBox')]", holder);
    l = $xs(".//*[starts-with(@id, 'latestImage')]", holder);

    if(visibility) {
      l.setAttribute('src', l.getAttribute('title'));
      e.style.display = "block";
      d.setAttribute('src', 'http://images4.bilddagboken.se/img/icon_dropdown_open.gif');
      f.style.backgroundColor = "#e9f5ff";
      f.style.borderBottom = "0px";
      /*
       l.attr("src", l.attr("title"));
       e.show();//slideDown("fast");
       d.attr("src","http://images4.bilddagboken.se/img/icon_dropdown_open.gif");
       f.css("backgroundColor", "#e9f5ff");
       f.css("border-bottom", "0px");
       */
    } else {
      e.style.display = "none";
      d.setAttribute('src', 'http://images4.bilddagboken.se/img/icon_dropdown_closed.gif');
      f.style.backgroundColor = "#fff";
      f.style.borderBottom = "1px solid #90cefd";
      /*
       e.hide();//slideUp("fast",function() {
       d.attr("src","http://images4.bilddagboken.se/img/icon_dropdown_closed.gif");
       f.css("backgroundColor", "#fff");
       f.css("border-bottom", "1px solid #90cefd");
       */
    }

  }
};

BDBShowMoreOnHover.init();
/* STD - functions */
var tictac = {
  now: function () {
    return new Date();
  },
  tic: function() {
    this.times = this.times || [];
    return this.times.push(new Date());
  },
  tac: function() {
    this.times = this.times || [];
    return this.now() - this.times.pop();
  }
};

function profile(obj){
  var tictac = {
    now: function () {
      return new Date();
    },
    tic: function() {
      this.times = this.times || [];
      return this.times.push(new Date());
    },
    tac: function() {
      this.times = this.times || [];
      return this.now() - this.times.pop();
    }
  };

  for (var prop in obj) {
    if (obj[prop].constructor == Function) {
      console.log("adding profiling for " + prop);
      obj["_" + prop] = obj[prop];
      obj[prop] = (function(prop) {
		     return function () {
		       console.log("profiling " + prop);
		       tictac.tic();
		       console.log($A(arguments).join(", "));
		       obj["_" + prop].apply(obj, arguments);
		       console.log(prop + ": " + tictac.tac() + " ms");
		     };
		   })(prop);
    }
  }
  return obj;
}

function parseRelDate(relDateStr) {
  var dateParts = relDateStr.replace("ago", "").trim().split(","), now = (new Date());
  for (var i = 0; i < dateParts.length; i++) {
    var m = dateParts[i].trim().split(/\W+/);
    var value = m[0], unit = m[1];
    if (unit.match(/weeks?/)) {
      now.setDate(now.getDate() - value*7);
    }
    else if (unit.match(/days?/)) {
      now.setDate(now.getDate() - value);
    }
    else if (unit.match(/hours?/)) {
      now.setHours(now.getHours() - value);
    }
    else if (unit.match(/minutes?/)) {
      now.setMinutes(now.getMinutes() - value);
    }
  }
  return now;
}



function parseIntSort(a,b,asc) {
  return sortf(parseInt(a,10), parseInt(b,10), asc);
}

function sortf(a, b, asc) {
  if (asc)
    return (a-b);
  else
    return -sortf(a,b, true);
}

function sortstr(a, b, asc) {
  if (asc)
    return (a > b) ? 1 : -1;
  else
    return !sortf(a, b, true);
}

function dateSort(a, b, asc) { return sortf(parseRelDate(a), parseRelDate(b), asc); };

function $x(xpath, root) { // From Johan Sundström
  var doc = root ? root.evaluate ? root : root.ownerDocument : document, next;
  var got = doc.evaluate(xpath, root||doc, null, null, null), result = [];
  while((next = got.iterateNext())) {
	  result.push(next);
  }
  return result;
}

function $xs(xpath, root) { return $x(xpath, root)[0]; }
String.prototype.trim = function() { return this.replace(/^\W+|\W+$/gi, ""); };

function bind(method, obj) {
  return function() {
    method.apply(obj, arguments);
  };
}

function curry(method, obj) {
  var curryargs = $A(arguments).slice(2);
  return function() { return method.apply(obj || window, curryargs.concat($A(arguments))); };
}

function $A(arr) {
  var r = [], len = arr.length;
  while (len--) r.unshift(arr[len]);
  return r;
}

function sprintf(str) {
  var a;
  args = $A(arguments);
  args.shift();
  while ((a = args.shift()) !== undefined)
    str = str.replace("\f", a);
  return str;
}

function $(id) {
  return document.getElementById(id);
}
