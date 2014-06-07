// ==UserScript==
// @name           MWTurbo Enhanced
// @namespace      http://userscripts.org/users/78432
// @include        http://apps.facebook.com/mobwars*
// @include        https://apps.facebook.com/mobwars*
// @license        GNU General Public License v3 or later. http://www.gnu.org/copyleft/gpl.html
// @version        5.1.24E
// ==/UserScript==

// Original was @copyright      (c) 2008 Tim Smart and MWTurbo.com, since released under the GNU General Public License on 7/7/09.
// Version 9

/*
Forked off of the Tim/MWTurbo GNU public release on 7/7/2009.
.
.

It should be noted that per the GNU:

"When you convey a copy of a covered work, you may at your option remove any additional permissions from that copy, or from any part of it."

"All other non-permissive additional terms are considered “further restrictions” within the meaning of section 10. If the Program as you received it, or any part of it, contains a notice stating that it is governed by this License along with a term that is a further restriction, you may remove that term."
.
.
As such, there are no restrictions imposed on this work, outside of the GNU v3, or later, itself.
.
.
Currently, the only major changes are the support for the Captcha Solver service. This script is totally free, and usage of this service is totally voluntary. The addition of this service to the code is simply for convenience and simplicity.
.
.
Future versions are intended to continue to diverge from the original source, while keeping in close relation to the original to maintain consistency.
.
.
This script is provided as a service to the community, for those who like MWTurbo but wish to use other options available for solving captchas. At least one other captcha solving option is planned for a future release. Feel free to fork off this source and add other services if you desire.
.
.
If you enjoy Mob Wars, other scripts you may consider using:
Full Mob Wars helper scripts:
..The original MWTurbo - http://userscripts.org/scripts/show/53234
....--The script this forked off from. Has been released in various versions from
......paid only, to under the GNU, to under a version of the Creative Commons.
FB MobWars Auto Helper(TM) - http://userscripts.org/scripts/show/40917
....--Supported by ads, but is the most popular of scripts. Also has options for
......removing the ads (by donation), and supports the Captcha Solver(TM) service
......as well.
..MobWars Helper - http://userscripts.org/scripts/show/29870
....--Not well supported anymore. But may be worth a look.
..FBMW* - http://userscripts.org/scripts/show/39510
....--Also not well supported anymore. But may still be worth a look.

Interesting addons:
(Much of this functionality may be included in the scripts above. It should also be noted, that GreaseMonkey scripts don't often play well togethor, so they may conflict with each other and/or those above)
..MobWars Auto Searcher - http://userscripts.org/scripts/show/43844
....--helps you get GF points with the MobWars toolbar. USE AT YOUR OWN RISK
..MobWars Invite Mobs - http://userscripts.org/scripts/show/44909
....--Helps with the tedious task of inviting mobs into your mob.
..MobWars Next Best Buy - http://userscripts.org/scripts/show/37436
....--Helps you with figuring out what the next best purchase is in your cities. 
*/

var product_name = "MWTurbo Enhanced";
var script_version = "5.1.24E";
var Modules = [];
var version_timestamp = 1247064552157;
function updateCheck(forced)
{
	if ((forced) || (parseInt(GM_getValue("lastUpdate", "0")) + 86400000 <= (new Date().getTime()))) // Checks once a day (24 h * 60 m * 60 s * 1000 ms)
	{
		try
		{
			GM_xmlhttpRequest(
			{
				method: "GET",
				url: "http://www.SecureWorldHosting.com/MWTurboEnhanced/Version.php",
				headers: {'Cache-Control': 'no-cache'},
				onload: function(xhrResponse)
				{
					GM_setValue("lastUpdate", new Date().getTime() + "");
					var rt = xhrResponse.responseText;
					if (parseInt(rt.substr(4)) > parseInt(version_timestamp))
					{
					    if (forced) {
 						  if (confirm("There is an update available for \"MWTurbo Enhanced\"\nWould you like to go to the install page now?"))
							{GM_openInTab("http://www.SecureWorldHosting.com/MWTurboEnhanced/Update.html");}
					    }
						var temp = document.getElementById('scriptupdate');
	  					if (temp) {
	    					temp.innerHTML = '<center><a id="update">There is an update available. Would you like to go to the install page now?<br>(will open in a new tab)</a><br><br></center>';
	    					var button = document.getElementById('update');
        					if (button) button.addEventListener('click', function() {
            							GM_openInTab("http://www.SecureWorldHosting.com/MWTurboEnhanced/Update.html");
            							boss.updateavailable = 0;
            							boss.save();
            						}, false);
        				}
					}
					else {
                      if (forced) {
						alert("No update is available for \"MWTurbo Enhanced\"");
					  }
					  var temp = document.getElementById('scriptupdate');
	  					if (temp) {
	    					temp.innerHTML = '';
						}
				    }
				}
			});	
		}
		catch (err)
		{
			ActivityLog("An error occurred while checking for updates: " + err, 2);
			if (forced) {
				alert("An error occurred while checking for updates:\n" + err);
           	} else {
				
			}
		}
	}
}
GM_registerMenuCommand("MWTurbo Enhanced - Manual Update Check", function() {updateCheck(true);});
String.prototype.trim = function() {
  return this.replace(/^\s*|\s*$/g, '');
};
String.prototype.ltrim = function() {
  return this.replace(/^\s*/g, '');
};
String.prototype.rtrim = function() {
  return this.replace(/\s*$/g, '');
};
var usoLib = $ = function(a, b) {
  return new usoLib.fn.init(a, b)
};
usoLib.fn = usoLib.prototype = {
  init: function(a, e) {
    a = a || document;
    e = e || document;
    if (a.nodeType) {
      a = [a]
    } else {
      if (typeof a == "string") {
        var d = a.split(" || "),
        a = [],
        c = 0,
        b = [];
        while (a = d[c++]) {
          if (a[0] === "#") {
            if (element = e.getElementById(a.substr(1))) {
              b = b.concat([element])
            }
          } else {
            if (a[0] === "/") {
              b = b.concat(this.xpath("." + a, e))
            } else {
              if (match = a.match(new RegExp("^(.*?)\\.(.*)$"))) {
                if (match[1] == "") {
                  if (document.getElementsByClassName) {
                    b = b.concat(this.make_array(e.getElementsByClassName(match[2])))
                  } else {
                    b = b.concat(this.xpath(".//*[contains(concat(' ',@class,' '),' " + match[2] + " ')]", e))
                  }
                } else {
                  b = b.concat(this.xpath(".//" + match[1] + "[contains(concat(' ',@class,' '),' " + match[2] + " ')]", e))
                }
              } else {
                b = b.concat(this.make_array(e.getElementsByTagName(a)))
              }
            }
          }
        }
        a = b
      }
    }
    return this.set_array((a.constructor.toString().indexOf("Array") !== -1) ? a: this.make_array(a))
  },
  set_array: function(a) {
    this.length = 0;
    Array.prototype.push.apply(this, a);
    return this
  },
  make_array: function(c) {
    var b = c.length,
    a = [];
    while (b) {
      a[--b] = c[b]
    }
    return a
  },
  xpath: function(f, d) {
    var e = d = d || document,
    b = [],
    c = 0;
    if (e != document) {
      e = d.ownerDocument
    }
    var a = e.evaluate(f, d, null, 7, null);
    while (element = a.snapshotItem(c++)) {
      b.push(element)
    }
    return b
  },
  each: function(a) {
    return usoLib.each(this, a)
  },
  get: function(a) {
    return this[a] ? usoLib(this[a]) : null
  },
  count: function() {
    return this.length
  },
  find: function(a) {
    if (this.length === 1) {
      return usoLib(a, this[0])
    }
    return usoLib(a)
  },
  hide: function(a) {
    if (typeof a === "number") {
      return this.animate({
        opacity: "0"
      },
      a, function() {
        usoLib(this).hide()
      })
    } else {
      return this.each(function() {
        this.$old_display = usoLib.get_style(this, "display");
        this.style.display = "none"
      })
    }
  },
  show: function(a) {
    if (typeof a === "number") {
      usoLib(this).css({
        opacity: "0",
        display: (this.$old_display ? this.$old_display: "")
      });
      return this.animate({
        opacity: "1"
      },
      a)
    } else {
      return this.each(function() {
        usoLib(this).css({
          display: (this.$old_display ? this.$old_display: ""),
          opacity: "1"
        })
      })
    }
  },
  css: function(a) {
    return this.each(function(c, b) {
      usoLib.each(a, function(d) {
        b.style[d] = this
      })
    })
  },
  bind: function(b, a) {
    return this.each(function() {
      this.addEventListener(b, a, false)
    })
  },
  remove: function() {
    return this.each(function() {
      this.parentNode.removeChild(this)
    })
  },
  append: function(a) {
    return this.each(function() {
      this.appendChild(a.cloneNode(true))
    })
  },
  html: function(a) {
    if (a) {
      return this.each(function() {
        this.innerHTML = a.toString();
      })
    } else {
      return this[0] ? this[0].innerHTML: null
    }
  },
  attr: function(a, b) {
    if (!a) {
      return
    } else {
      if (typeof b === "string") {
        return this.each(function() {
          this.setAttribute(a, b)
        })
      }
    }
    return this[0] ? this[0].getAttribute(a) : null
  },
  animate: function(d, e, f) {
    if (!this.animation_queue) {
      this.animation_queue = []
    }
    if (this.animating) {
      this.animation_queue.push(arguments);
      return this
    }
    this.animating = true;
    var a = 40,
    e = e ? Math.round(e * (1 / a)) * a: 1000,
    c = e / a,
    b = this;
    setTimeout(function(g) {
      g.animating = false;
      if (g.animation_queue.length > 0) {
        g.animate.apply(g, g.animation_queue[0]);
        g.animation_queue.shift()
      }
    },
    e + 1, this);
    return this.each(function() {
      var g = [],
      j = this,
      h = 0;
      usoLib.each(d, function(k) {
        var n = usoLib.get_style(j, k),
        i = /\d(px|%|in|em|pt|pc|ex)$/,
        m = (match = n.match(i)) ? match[1] : "",
        l = parseFloat(this);
        if (m != ((match = this.match(i)) ? match[1] : "")) {
          return
        } else {
          if (typeof(n = parseFloat(n)) !== "number") {
            return
          }
        }
        g.push({
          key: k,
          step: (l - n) / c,
          start: n,
          suffix: m
        })
      });
      j.timer = setInterval(function() {
        h++;
        usoLib.each(g, function() {
          j.style[this.key] = this.start + (this.step * h) + this.suffix
        });
        if (h === c) {
          clearInterval(j.timer);
          if (f && (f.constructor.toString().indexOf("Function") !== -1)) {
            f.call(j)
          }
        }
      },
      a)
    })
  },
  stop: function() {
    return this.each(function() {
      if (this.timer) {
        clearInterval(this.timer)
      }
    })
  }
};
usoLib.fn.init.prototype = usoLib.fn;
usoLib.each = function(b, f) {
  var c = 0,
  d = b.length,
  a;
  if (d === undefined) {
    for (a in b) {
      if (f.call(b[a], a, b[a]) === false) {
        break
      }
    }
  } else {
    for (var e = b[0]; c < d && f.call(e, c, e) !== false; e = b[++c]) {}
  }
  return b
};
usoLib.get_style = function(c, a) {
  if (c.style[a]) {
    return c.style[a]
  } else {
    if (c.currentStyle) {
      return c.currentStyle[a]
    } else {
      if (document.defaultView && document.defaultView.getComputedStyle) {
        var b = document.defaultView.getComputedStyle(c, "");
        return b && b.getPropertyValue(a.replace(/([A-Z])/g, "-$1").toLowerCase())
      } else {
        return null
      }
    }
  }
};
usoLib.fn.slide_out = function() {
  return this.each(function() {
    usoLib(this).css({
      overflow: "hidden"
    }).animate({
      height: "0px",
      opacity: "0"
    },
    100, function() {
      usoLib(this).attr('style', '').hide();
    });
  });
};
Array.prototype.remove = function(from, to) {
  this.length = from < 0 ? this.length + from: from;
  return this.push.apply(this, this.slice((to || from) + 1 || this.length));
};
String.prototype.ucwords = function() {
  return (this + '').replace(/^(.)|\s(.)/g, function($1) {
    return $1.toUpperCase();
  });
};
Mwcaptcha = {
  trans_id: '',
  image: '',
  solution: '',
  username: '',
  password: '',
  stop: false,
  solving: false,
  getting: false,
  add: function(image) {
	 if (!Settings.mwcaptcha) return;

	  GM_xmlhttpRequest({method: 'GET',
							url: image,
							overrideMimeType: 'text/plain; charset=x-user-defined',
							onload: function(r) {
								var bytes = '';
								var data = r.responseText;
								var il = data.length;
								for (var i = 0; i < il; i++)
									bytes += String.fromCharCode(data.charCodeAt(i) & 0xff);
							    var b64 = btoa(bytes);
								
								var base;
								
								if('GIF'==data.substr(0,3)) base = 'data:image/gif;base64,';
						        else if('PNG'==data.substr(1,3)) base = 'data:image/png;base64,';
						        else if('JFIF'==data.substr(6,4)) base = 'data:image/jpg;base64,';
								else base = 'data:image/huh;base64,';

								GM_xmlhttpRequest(
								{
									method: "POST",
									url: "http://www.SecureWorldHosting.com/MWAutoHelper/Solver/enterc.php",
									data:'&version='+encodeURIComponent("GreaseMW")+'&client=MWturbo&type='+encodeURIComponent("any")+'&prod=40&key='+encodeURIComponent("123456789")+'&user='+encodeURIComponent(Mwcaptcha.username)+'&pass='+encodeURIComponent(Mwcaptcha.password)+'&imagedata='+encodeURIComponent((base+b64)),
									headers: {"Content-type" : "application/x-www-form-urlencoded"},
									onload: function(xhr) {
										Mwcaptcha.handle_response( xhr.responseText, function( resp ) {
        								    Page.captcha_submit(resp);
								        });
									}
								});
							}
						});

  },
  get: function() {
  },
  result: function(success) {
	  if (success == false) {
		var CaptchaSolver = eval(GM_getValue('CaptchaSolver', '({})'));
		if (CaptchaSolver.transid) {
		    GM_xmlhttpRequest(
			{
				method: "POST",
				url: "http://www.SecureWorldHosting.com/MWAutoHelper/Solver/badc.php",
				data:'&client=MWturbo&prod=40&time=false&transid='+encodeURIComponent(CaptchaSolver.transid),
				headers: {"Content-type" : "application/x-www-form-urlencoded"},
				onload: function(xhrResponse)
				{
				}
			});
		}
	  }
  },
  points: function() {
    
  },
  handle_response: function( response, callback ) {
    var respsplit = response.split('|');
	var CaptchaSolver = new Object();
	CaptchaSolver.transid = respsplit[1].substr(4);
	if (parseInt(respsplit[0].substr(6)) != 0) {
		CaptchaSolver.valid = respsplit[0].substr(6) * 1000;
	}
	if (parseInt(respsplit[3].substr(5)) != 0) {
		CaptchaSolver.Sys = parseInt(respsplit[3].substr(5));
		CaptchaSolver.LFT = parseInt(respsplit[4].substr(5));
	}
	GM_setValue('CaptchaSolver', CaptchaSolver.toSource());
	var checkresponse = respsplit[2];
    switch ( checkresponse ) {
	case 'OFFLINE':
		alert("The Captcha Solver service is currently offline.");
		break;
	case 'EXP_ACCOUNT':
		alert("Your Captcha Solver account expired");
		break;
	case 'MAX_USAGE':
		alert("You've used the Captcha Solver the maximum allowed times.  If you have an unlimited subscription, you can receive more by contacting 'Donations@SecureWorldHosting.com'.<br><br>If this is a PPC account, you may add to your usage allotment at any time.  Simply go into preferences and click on the link provided.");
		break;
	case 'NO_ACCOUNT':
		alert("There is no Captcha Solver account with that username and password");
		break;
	case 'TYPE':
		callback( '0' );
		break;
	case 'PASS':
		alert("You must enter your Captcha Solver account password before you can use this service");
		break;
	case 'USER':
		alert("You must enter your Captcha Solver account user name before you can use this service");
		break;
	case 'NO_IMAGE':
	case 'GEN_FAIL':
	case 'FAIL':
	case 'NODATA':
	case 'BAN':
	case 'CREDITS':
	case 'UNKNOWN':
	case 'GENERAL_ERROR':
	case 'MAX_SIZE':
	case 'NET_ERROR':
	case 'L_ERROR':
	case 'ADD':
		callback( '0' );
		break;
    default:
		var returnresp = checkresponse.split(':');
		
		if (returnresp.length > 1) {
	        callback( returnresp[1] );
		} else {
			callback( '0' );
		}
        break;
    }
  }
};
var script_log_viewer=<><![CDATA[
<div class="generic_dialog_popup" style="top: 95px; width:570px !important;">
  <table id="pop_dialog_table" class="pop_dialog_table" style="width:570px !important;">
  <tbody>
    <tr>
      <td class="pop_topleft"></td>
      <td class="pop_border pop_top"></td>
      <td class="pop_topright"></td>
    </tr>
    <tr>
      <td class="pop_border pop_side"></td>
      <td id="pop_content" class="pop_content">
        <h2 class="dialog_title"><span id="a_title">Log Viewer</span></h2>
        <div class="dialog_content">
          <div id="a_content" class="dialog_body">
            <h3 class="mwt_pref_title">Filter</h3>
            <center>Bounty Wins <input type="checkbox" id="mwtlv_bounty" /> -
            Fights Won <input type="checkbox" id="mwtlv_fightswon" /> -
            Fights Lost <input type="checkbox" id="mwtlv_fightslost" /> -
            Jobs Done <input type="checkbox" id="mwtlv_jobs" /><br />
            Purchases <input type="checkbox" id="mwtlv_property" /> -
            Hospital <input type="checkbox" id="mwtlv_hospital" /> -
            Bank <input type="checkbox" id="mwtlv_bank" /> -
            Level <input type="checkbox" id="mwtlv_level" /></center>
            <h3 class="mwt_pref_title">Result</h3>
            <textarea readonly="readonly" id="mwtlv_log" style="width:520px;height:250px;"></textarea>
          </div>
          <div class="dialog_buttons">
            <input id="mwtlv_close" value="Close" name="cancel" class="inputsubmit inputaux" type="button">
          </div>
        </div>
      </td>
      <td class="pop_border pop_side"></td>
    </tr>
    <tr>
      <td class="pop_bottomleft"></td>
      <td class="pop_border pop_bottom"></td>
      <td class="pop_bottomright"></td>
    </tr>
  </tbody>
  </table>
</div>
]]></>.toString();
var Log = {
  memory: [],
  show: function() {
    var div = document.createElement('div');
    div.setAttribute('style', 'z-index:100 !important;');
    div.id = "mwt_log_viewer";
    div.className = "generic_dialog pop_dialog";
    div.innerHTML = script_log_viewer;
    document.body.insertBefore(div, document.body.lastChild);
    $('#mwtlv_close').bind('click', function() {
      Log.hide();
    });
    $("//div[@id='mwt_log_viewer']//input").bind('change', function() {
      Log.update();
    });
    Log.update();
    return;
  },
  hide: function() {
    $('#mwt_log_viewer').animate({
      opacity: "0"
    },
    100, function() {
      $(this).remove();
    });
  },
  update: function(filter) {
    var array = Log.memory,
    filters = filter || [],
    filter = [];
    $("//div[@id='mwt_log_viewer']//input").each(function() {
      filter = [];
      if (this.checked) {
        var name = this.id.match(new RegExp('mwtlv_(.*)'))[1];
        switch (name) {
        case 'bounty':
          filter.push({
            name:
            'Script',
            match: 'Hitlist'
          });
          filter.push({
            name: 'Action',
            match: 'Bounty Claimed'
          });
          filters.push(filter);
          break;
        case 'fightswon':
          filter.push({
            name:
            'Action',
            match: 'Fight Won'
          });
          filters.push(filter);
          break;
        case 'fightslost':
          filter.push({
            name:
            'Action',
            match: 'Fight Lost'
          });
          filters.push(filter);
          break;
        case 'jobs':
          filter.push({
            name:
            'Script',
            match: 'Job'
          });
          filter.push({
            name: 'Action',
            match: 'Doing Job'
          });
          filters.push(filter);
          break;
        case 'property':
          filter.push({
            name:
            'Script',
            match: 'Property'
          });
          filter.push({
            name: 'Action',
            match: 'Buying'
          });
          filters.push(filter);
          break;
        case 'hospital':
          filter.push({
            name:
            'Action',
            match: 'Healing'
          });
          filters.push(filter);
          break;
        case 'bank':
          filter.push({
            name:
            'Action',
            match: 'Banking'
          });
          filters.push(filter);
          break;
        case 'level':
          filter.push({
            name:
            'Script',
            match: 'Level'
          });
          filters.push(filter);
          break;
        default:
          break;
        }
      }
    });
    var include = false,
    text = '',
    match = false,
    matches = 0;
    $.each(array, function() {
      details = this;
      include = false;
      if (filters.length > 0) {
        $.each(filters, function(j) {
          filter = this;
          matches = 0;
          $.each(filter, function(k) {
            match = false;
            $.each(details, function(l) {
              if (this.name == filter[k].name) if (this.value.match(filter[k].match)) match = true;
            });
            if (match) matches++;
          });
          if (matches == filter.length) include = true;
        });
      } else include = true;
      if (include) {
        $.each(details, function() {
          if (this.name == "Time")
            text += 'Time: ' + (this.value.getMonth() + 1) + '/' + this.value.getDate() + '/' + this.value.getFullYear() + ' ' + this.value.toLocaleTimeString();
          else
            text += this.name + ": " + this.value + "; ";
        });
        text += "\n";
      }
    });
    $('#mwtlv_log')[0].value = text;
  }
};
var Utility = {
  make_number: function(string) {
    var number = 0,
      number_string = '',
      character = '';
    for (var i = 0; character = string[ i++ ]; ) {
      number = parseInt(character, 0);
      if ( number > -1 )
        number_string += number;
    }
    return parseInt(number_string, 0);
  },
  a_timer: function(details) {
    this.fn = details.fn || function() {};
    if (details.time == 0) {
      this.time = 0;
    } else {
      this.time = details.time || 5;
    }
    this.message = details.message || false;
    this.stopping = false;
    this.stop = function() {
      this.stopping = true;
      return;
    }
    this.start = function() {
      if (this.stopping) {
        this.stopping = false;
        return;
      }
      this.time = parseInt(this.time, 0);
      if (this.message) {
        $('#mwta_close')[0].value = this.message.replace('[time]', this.time);
      }
      if (this.time > 0) {
        this.time = this.time - 1;
        var func = function(ob) {
          ob.start();
        };
        setTimeout(func, 1000, this);
      } else {
        this.fn();
      }
      return true;
    }
  },
  timer: function(details) {
    this.fn = details.fn ||
    function() {};
    if (details.time == 0) {
      this.time = 0;
    } else {
      this.time = details.time || 5;
    }
    this.message = details.message || false;
    this.script = details.script || false;
    this.stopping = false;
    this.stop = function() {
      this.stopping = true;
      return;
    };
    this.start = function() {
      if (Page.bcast(this.script) === false || this.stopping) {
        return;
      }
      this.time = parseInt(this.time, 0);
      if (this.message) {
        var html = this.message.replace('[time]', Utility.seconds_to_string(this.time));
        Console.status(this.script, html);
      }
      if (this.time > 0) {
        this.time = this.time - 1;
        var func = function(ob) {
          ob.start();
        };
        setTimeout(func, 1000, this);
      } else {
        this.fn();
      }
      return true;
    };
    return;
  },
  seconds_to_string: function(seconds) {
    if (seconds > 60) {
      var minutes = Math.floor(seconds / 60);
      seconds = seconds - (minutes * 60);
      if (minutes > 60) {
        var hours = Math.floor(minutes / 60);
        minutes = minutes - (hours * 60);
        return hours + 'h:' + minutes + 'm:' + seconds + 's';
      }
      return minutes + 'm:' + seconds + 's';
    }
    return seconds + 's';
  },
  int_dollars: function(num) {
    num = num || 0;
    var str = "";
    var tmp;
    while (num >= 1000) {
      tmp = num % 1000;
      if (tmp > 99) tmp = "" + tmp;
      else if (tmp > 9) tmp = "0" + tmp;
      else tmp = "00" + tmp;
      str = "," + tmp + str;
      num = Math.floor(num / 1000);
    }
    str = "$" + num + str;
    return str;
  },
  play_sound: function(src) {
    $('#sound_player').html( '<embed src="' + src + '" hidden="true" autostart="true" loop="false">' );
  },
  textarea_array: function(string) {
    if ( matches = string.match( new RegExp('.+', 'g') ) ) {
      if (matches.length > 0)
        return matches;
    }
    return [];
  }
};
var script_console=<><![CDATA[
<div class="generic_dialog_popup" style="top: 50px; width:600px !important;">
  <table id="pop_dialog_table" class="pop_dialog_table" style="width:600px !important;">
  <tbody>
    <tr>
      <td class="pop_topleft"></td>
      <td class="pop_border pop_top"></td>
      <td class="pop_topright"></td>
    </tr>
    <tr>
      <td class="pop_border pop_side"></td>
      <td id="pop_content" class="pop_content">
        <h2 class="dialog_title" style="position:relative;"><span>MWTurbo Console</span>
          <img id="mwt_working" style="display:none; position: absolute; top: 6px; right: 6px;" src="http://www.mwturbo.com/work.gif" />
        </h2>
        <div class="dialog_content">
          <div class="dialog_body">
            <h3 class="mwt_pref_title" style="margin-top:0;">Stats</h3>
            <table class="mwt_stats" style="width:100%;border:none:padding:0;margin:0;">
            <tbody>
              <tr>
                <td width="50%">Cash: <span id="mwt_cash">$0</span></td>
                <td width="50%">Health: <span id="mwt_health">0/0</span></td>
              </tr>
            <table class="mwt_stats" style="width:100%;border:none:padding:0;margin:0;">
            <tbody>
              <tr>
                <td width="50%">Energy: <span id="mwt_energy">0/0</span></td>
                <td width="50%">Stamina: <span id="mwt_stamina">0/0</span></td>
              </tr>
            <table class="mwt_stats" style="width:100%;border:none:padding:0;margin:0;">
            <tbody>
              <tr>
                <td width="50%">Total Damage Dealt: <span id="mwt_damaged">0</span></td>
                <td width="50%">Total Damage Recieved: <span id="mwt_damager">0</span></td>
              </tr>
            </tbody>
            </table>
            <table class="mwt_stats" style="width:100%;border:none:padding:0;margin:0;">
            <tbody>
              <tr>
                <td width="50%">Total $ Won: <span id="mwt_won">$0</span></td>
                <td width="50%">Total Exp Gain: <span id="mwt_exp">0</span></td>
              </tr>
            </tbody>
            </table>
            <table class="mwt_stats" style="width:100%;border:none:padding:0;margin:0;">
            <tbody>
              <tr>
                <td width="50%">Total Bounties: <span id="mwt_bount">0</span></td>
                <td width="50%">Total Wins: <span id="mwt_wins">0</span></td>
              </tr>
            </tbody>
            </table>
            <h3 class="mwt_pref_title">Status</h3>
            <table id="mwt_status" style="width:100%;border:none:padding:0;margin:0;">
            <tbody>
              <tr>
                <td class="script_name"><span id="mwt_hitlist">Hitlist</span></td>
                <td id="status_hitlist">Click to begin</td>
              </tr>
              <tr>
                <td class="script_name"><span id="mwt_revenge">Revenge</span></td>
                <td id="status_revenge">Click to begin</td>
              </tr>
              <tr>
                <td class="script_name"><span id="mwt_fight">Fight</span></td>
                <td id="status_fight">Click to begin</td>
              </tr>
              <tr>
                <td class="script_name"><span id="mwt_job">Job</span></td>
                <td id="status_job">Click to begin</td>
              </tr>
              <tr>
                <td class="script_name"><span id="mwt_property">Property</span></td>
                <td id="status_property">Click to begin</td>
              </tr>
              <tr>
                <td class="script_name"><span id="mwt_defend">Defend</span></td>
                <td id="status_defend">Click to begin</td>
              </tr>
            </tbody>
            </table>
            <h3 class="mwt_pref_title">Log <span style="font-size:10px;"><a id="mwtc_lv" href="#" onclick="return false;">[Log Viewer]</a> <a id="mwtc_clearlog" href="#" onclick="return false;">[Clear]</a></span></h3>
            <select multiple="multiple" id="mwt_logger" style="width:100%;height:120px;"></select>
            <div id="mwt_captcha_box" style="display:none;"><h3 class="mwt_pref_title">Captcha Found!</h3>
            <img id="captcha_image" style="display: block;float:left;" src="" alt="captcha" />
            <input id="captcha_answer" style="display: block;float:left;width: 150px;margin:18px 0 0 15px;" type="text" />
            <input id="captcha_submit" style="display: block;float:left;margin: 17px 0pt 0pt 15px;" value="Submit" name="save" class="inputsubmit" type="button">
            <div style="clear:both;"></div></div>
            <div id="mwc_captcha_box" style="display:none;"><h3 class="mwt_pref_title">You have a MWcaptcha to solve!</h3>
            <img id="mwcaptcha_image" style="display: block;float:left;" src="" alt="captcha" />
            <input id="mwcaptcha_answer" style="display: block;float:left;width: 150px;margin:18px 0 0 15px;" type="text" />
            <input id="mwcaptcha_submit" style="display: block;float:left;margin: 17px 0pt 0pt 15px;" value="Submit" name="save" class="inputsubmit" type="button">
            <div style="clear:both;"></div></div>
          </div>
          <div class="dialog_buttons">
            <input id="mwtc_close" value="Shut Down" name="save" class="inputsubmit" type="button">
          </div>
        </div>
      </td>
      <td class="pop_border pop_side"></td>
    </tr>
    <tr>
      <td class="pop_bottomleft"></td>
      <td class="pop_border pop_bottom"></td>
      <td class="pop_bottomright"></td>
    </tr>
  </tbody>
  </table>
</div>
]]></>.toString();
var script_announce=<><![CDATA[
<div class="generic_dialog_popup" style="top: 95px;">
  <table id="pop_dialog_table" class="pop_dialog_table">
  <tbody>
    <tr>
      <td class="pop_topleft"></td>
      <td class="pop_border pop_top"></td>
      <td class="pop_topright"></td>
    </tr>
    <tr>
      <td class="pop_border pop_side"></td>
      <td id="pop_content" class="pop_content">
        <h2 class="dialog_title"><span id="a_title"></span></h2>
        <div class="dialog_content">
          <div id="a_content" class="dialog_body"></div>
          <div class="dialog_buttons">
            <input id="mwta_close" value="Close" name="cancel" class="inputsubmit inputaux" type="button">
          </div>
        </div>
      </td>
      <td class="pop_border pop_side"></td>
    </tr>
    <tr>
      <td class="pop_bottomleft"></td>
      <td class="pop_border pop_bottom"></td>
      <td class="pop_bottomright"></td>
    </tr>
  </tbody>
  </table>
</div>
]]></>.toString();
var Console = {
  a_timer: null,
  visable: false,
  toggle: function() {
    if (this.visable) {
      Page.halt();
      Mwcaptcha.stop = true;
      $('#mwt_console_pop').animate({
        opacity: "0"
      },
      100, function() {
        $(this).remove();
      });
      this.visable = false;
      return;
    }
    var div = document.createElement('div');
    div.setAttribute('style', 'z-index:99 !important;');
    div.id = "mwt_console_pop";
    div.className = "generic_dialog pop_dialog";
    div.innerHTML = script_console;
    document.body.insertBefore(div, document.body.lastChild);
    var div = document.createElement('div');
    div.setAttribute('style', 'z-index:101 !important;display:none;');
    div.id = "mwt_a";
    div.className = "generic_dialog pop_dialog";
    div.innerHTML = script_announce;
    document.body.insertBefore(div, $('#mwt_console_pop')[0]);
    $('#mwtc_close').bind('click', function() {
      Console.toggle();
    });
    $("//table[@id='mwt_status']//span").bind('click', function() {
      Page.toggle(this.id.match(/mwt_(.+)/)[1]);
    });
    $('#mwtc_lv').bind('click', function() {
      Log.show();
    });
    $('#mwtc_clearlog').bind('click', function() {
      document.getElementById('mwt_logger').textContent = '';
      Log.memory = [];
      alert('Log Memory Cleared!');
    });
    $('#captcha_submit').bind('click', function() {
      Page.captcha_submit();
    });
    $('#captcha_answer').bind('keyup', function(event) {
      if (event.keyCode == 13) Page.captcha_submit();
    });
    $('#mwcaptcha_answer').bind('keyup', function(event) {
      if (event.keyCode == 13) Page.mwcaptcha_submit();
    });
    $('#mwcaptcha_submit').bind('click', function() {
      Page.mwcaptcha_submit();
    });
    $('#mwta_close').bind('click', Console.a_close);
    Boss.update(document.body.innerHTML);
    this.visable = true;
    if (Settings.mwcaptcha === true && Settings.mwc_earn === true) {
      Mwcaptcha.stop = false;
      if (Mwcaptcha.solving == false) {
        Mwcaptcha.solving = true;
        Mwcaptcha.solve();
      }
    }
    return;
  },
  log: function(details) {
    if (!details)
      return;
    var time = new Date(),
      min = time.getMinutes(),
      seconds = time.getSeconds(),
      h = "",
      option = document.createElement('option'),
      log = $('#mwt_logger')[0];
    if (10 > min)
      min = '0' + min;
    if (10 > seconds)
      seconds = '0' + seconds;
    details.push({
      name: 'Time',
      value: time
    });
    Log.memory.push(details);
    for (var i = 0, il = details.length; i < il; i++) {
      if (details[i].name == "Time")
        h += 'Time: ' + time.getHours() + ':' + min + ':' + seconds;
      else
        h += details[i].name + ": " + details[i].value + "; ";
    }
    option.appendChild( document.createTextNode( h ) );
    log.insertBefore( option, log.firstChild );
    if ( log.options.length >= 100 )
      log.options[ log.options.length - 1 ].parentNode.removeChild( log.options[ log.options.length - 1 ] );
    log.selectedIndex = 0;
  },
  clear: function() {
    $('#mwt_logger').html('');
  },
  status: function(script, str) {
    $('#status_' + script).html(str);
  },
  update_stats: function() {
    $('#mwt_cash').html(Boss.cash_str);
    $('#mwt_health').html(Math.floor(Boss.health * 100) + '%');
    $('#mwt_energy').html(Boss.energy[0] + '/' + Boss.energy[1]);
    $('#mwt_stamina').html(Boss.stamina + '/' + Boss.stamina_total);
  },
  announce: function(details) {
    $('#a_title').html(details.title);
    $('#a_content').html(details.content);
    $('#mwt_a').show();
    if (Console.a_timer) {
      Console.a_timer.stop();
    }
    Console.a_timer = new Utility.a_timer({
      time: 5,
      message: 'Close [[time]]',
      fn: Console.a_close
    });
    Console.a_timer.start();
  },
  a_close: function() {
    if (Console.a_timer) {
      Console.a_timer.stop();
    }
    $('#mwt_a').hide();
    if (Page.special_pause === true) {
      Page.resume();
    }
  }
};
var Ajax = function(url, fn, method) {
  method = (method || 'GET').toUpperCase(),
  url = url.replace('?_fb_q=1', '');
  if (method == 'POST') {
    url = url.match(new RegExp('^(.*?)\\?(.*)$'));
    return GM_xmlhttpRequest({
      method: 'POST',
      url: url[1],
      data: url[2],
      headers: {
        'Content-type': 'application/x-www-form-urlencoded'
      },
      onload: fn
    });
  }
  return GM_xmlhttpRequest({
    method: 'GET',
    url: url,
    onload: fn
  });
};
var Task = {
  leveling: false,
  level_ajax: false,
  level: function(html) {
    if (Boss.leveling) {
      return;
    }
    Boss.leveling = true;
    var array = [{
      name: 'Attack',
      action: 'attack',
      aim: Settings.level_attack,
      current: null,
      difference: null
    },
    {
      name: 'Defence',
      action: 'defense',
      aim: Settings.level_defence,
      current: null,
      difference: null
    },
    {
      name: 'Energy',
      action: 'energy_max',
      aim: Settings.level_energy,
      current: null,
      difference: null
    },
    {
      name: 'Health',
      action: 'health_max',
      aim: Settings.level_health,
      current: null,
      difference: null
    },
    {
      name: 'Stamina',
      action: 'recovery_max',
      aim: Settings.level_stamina,
      current: null,
      difference: null
    }],
      result = html.match(new RegExp('<td>([0-9].*?)</td>', 'g')),
      aim_ratio_total = 0,
      ratio_total = 0,
      re = new RegExp('<td>(.*?)</td>'),
      j = 0;
    Boss.exp_points = 0;
    if (match = html.match(new RegExp('You have <b>([0-9]+)<'))) {
      Boss.exp_points = Utility.make_number(match[1]);
    }
    for (var i = 0; i < array.length; i++) {
      if (array[i].aim == 0) {
        array.remove(i);
        i--;
      } else {
        array[i].current = parseInt(result[j].match(re)[1], 0);
        aim_ratio_total += array[i].aim;
        ratio_total += array[i].current;
      }
      j++;
    }
    if (!array.length > 0) {
      Boss.leveling = false;
      Settings.level = false;
      return;
    }
    for (i = array.length - 1; i >= 0; i--) {
      aim_ratio = array[i].aim / aim_ratio_total;
      ratio = array[i].current / ratio_total;
      array[i].difference = aim_ratio - ratio;
    }
    array = array.sort(function(a, b) {
      return b.difference - a.difference;
    });
    var fn = function() {
      Boss.leveling = false;
    };
    if (array[0].name == "Stamina" && 2 > Boss.exp_points) {
      setTimeout(fn, 300000);
      return;
    }
    Console.log([{
      name: 'Script',
      value: 'Level'
    },
    {
      name: 'Action',
      value: 'Raising Boss\'s ' + array[0].name
    }]);
    Task.level_ajax = true;
    Ajax(Page.domain + '/mobwars/profile/do.php?action=increase&type=' + array[0].action, function(xhr) {
      Page.captcha(xhr.responseText);
      if (Page.pausing === true)
        return;
      Task.announce(xhr.responseText);
      Task.level_ajax = false;
      Boss.leveling = false;
      Boss.update(xhr.responseText);
    });
    fn = function() {
      if (Task.level_ajax) {
        Task.level_ajax = false;
        Boss.leveling = false;
      }
      return;
    };
    setTimeout(fn, 20000);
  },
  bank: function(cb) {
    Cache.banking = true;
    if (cb) {
      Cache.bank_cb = cb;
    }
    Ajax(Page.domain + '/mobwars/bank/do.php?action=deposit&deposit_amount=' + Boss.cash, function(xhr) {
      Page.captcha(xhr.responseText);
      if (Page.pausing === true) {
        Page.pause_cb(function() {
          Task.bank();
          return;
        });
        return;
      };
      Cache.banking = false;
      Boss.update(xhr.responseText);
      Cache.bank_cb();
      return;
    },
    'POST');
    return;
  },
  heal: function(cb) {
    Cache.healing = true;
    if (cb) {
      Cache.heal_cb = cb;
    }
    Ajax(Page.domain + '/mobwars/hospital/do.php?action=heal', function(xhr) {
      Page.captcha(xhr.responseText);
      if (Page.pausing === true) {
        Cache.heal_v = false;
        Page.pause_cb(function() {
          Task.heal();
        });
        return;
      };
      Boss.update(xhr.responseText);
      if (Boss.health >= Settings.max_health) {
        Cache.healing = false;
        Cache.heal_cb();
        return;
      }
      Task.heal();
    });
  },
  announce: function(html) {
    if (match = html.match(new RegExp('<div.*?class="announcement".*?>(?:.|\\s)*?</div></div>')))
      html = match[0];
    var are = new RegExp('<span class="announceTitle">(.*?)</span>((?:.|\\s)*)</div>'),
      b_re = new RegExp('claimed the bounty of (\\$[0-9]{1,4}(?:,[0-9]{3})*?)\\.'),
      bounty = false,
      bounty_win = 0;
    if (divh = html.match(are)) {
      Console.announce({
        title: divh[1],
        content: divh[2]
      });
    }
    if (m = html.match(b_re)) {
      bounty = true;
      bounty_win = Utility.make_number(m[1]);
      Cache.tb++;
      document.getElementById('mwt_bount').textContent = Cache.tb;
    }
    if ( m = html.match( /You won the fight, taking (\d+?) damage and dealing (\d+?) damage to your enemy.*?You gained (.+?) and (\d+?) experience/ ) ) {
      var dr = parseInt(m[1], 0),
        dd = parseInt(m[2], 0),
        cash = Utility.make_number(m[3]) + bounty_win,
        exp = parseInt(m[4], 0);
      Cache.tdd += dd;
      Cache.tdr += dr;
      Cache.texp += exp;
      Cache.tw += cash;
      Cache.twins++;
      document.getElementById('mwt_damaged').textContent = Cache.tdd;
      document.getElementById('mwt_damager').textContent = Cache.tdr;
      document.getElementById('mwt_won').textContent = Utility.int_dollars(Cache.tw);
      document.getElementById('mwt_exp').textContent = Cache.texp;
      document.getElementById('mwt_wins').textContent = Cache.twins;
      return {
        bounty: bounty,
        won: true,
        lost: false,
        damager: dr,
        damaged: dd,
        cash_str: m[3],
        cash: cash,
        exp: exp
      };
    }
    if ( m = html.match( /lost the fight, taking (\d+?) damage and dealing (\d+?) damage/ ) ) {
      var damager = parseInt(m[1], 0),
        damaged = parseInt(m[2], 0);
      Cache.tdd += damaged;
      Cache.tdr += damager;
      Cache.tw += bounty_win;
      document.getElementById('mwt_damaged').textContent = Cache.tdd;
      document.getElementById('mwt_damager').textContent = Cache.tdr;
      document.getElementById('mwt_won').textContent = Utility.int_dollars(Cache.tw);
      return {
        bounty: bounty,
        cash: bounty_win,
        won: false,
        lost: true,
        damager: damager,
        damaged: damaged
      };
    }
    var re = new RegExp('<div class="error">(.*?)<br');
    if (m = html.match(re)) {
      return {
        won: false,
        lost: false,
        captcha: false,
        message: m[1]
      };
    }
    return null;
  },
  chain_check: function( html, fn ) {
    var doc = document.createElement('div'),
      feed = {},
      array = [],
      key,
      c_user = [],
      item;
    doc.innerHTML = html; // Parse HTML
    // Grab news feed items only with negative association. E.g. do damage to our boss
    $( "//div[@class='feedItem' and (contains(.,' second') or contains(.,' minute') or contains(.,' hour')) and " +
        "(contains(.,'fight') or contains(.,'hitlist') or contains(.,'punched'))]", doc ).each(function( i ) {
      var time_match = this.textContent.match( /(\d+) (second|minute|hour)s? ago/ ),
        feed_item = {
          user_id: parseInt( $("//a[contains(@href,'user_id=')]", this)[0].href.match( /user_id=(\d+)/ )[1] ),
          type: this.textContent.match( /(fight|hitlist|punch)/ )[1],
          time: time_match[2] === "hour" ? parseInt( time_match[1] ) * 60 * 60 : time_match[2] === "minute" ? parseInt( time_match[1] ) * 60 : parseInt( time_match[1] ),
          iteration: i
        };
      if ( feed[ feed_item.user_id ] instanceof Array )
        feed[ feed_item.user_id ].push( feed_item );
      else
        feed[ feed_item.user_id ] = [ feed_item ];
    });
    doc = html = null; // Clear some memory
    // Now we need to check if they chained
    for ( key in feed ) {
      c_user = [ feed[ key ][0] ];
      for ( var i = 1, feed_item; feed_item = feed[ key ][ i ]; i++) {
        if ( 1 < feed_item.time / Settings.chain_time ) { // We are in in-accurate feed stages
          if ( feed_item.iteration - feed[ key ][ i - 1 ].iteration <= 3 )
            c_user.push( feed_item );
          else
            c_user = [ feed_item ];
        }
        else { // We are in normal feed stages
          if ( feed_item.time - c_user[0].time <= Settings.chain_time ) { // We are good
            item = null;
            c_user.push( feed_item );
          }
          else
            c_user = [ feed_item ];
        }
        if ( c_user.length >= Settings.chain_attacks ) {
          array.push( key );
          if ( typeof fn === "function" )
            fn( key );
          break;
        }
      }
    }
    return array;
  }
};
var Boss = {
  cash: 0,
  cash_str: '$0',
  stamina: 0,
  stamina_total: 0,
  energy: [0, 0],
  health: 1,
  exp_points: 0,
  ignore: [],
  update: function(html) {
    if (m = html.match(/<span id="app8743457343_cur_cash" fbcontext=".*?">(.*?)<\/span>/)) {
      Boss.cash_str = m[1];
      Boss.cash = Utility.make_number(Boss.cash_str);
    }
    if (m = html.match(new RegExp('<span id="app8743457343_cur_health" fbcontext=".*?">(.*?)</span>/([0-9]*)'))) {
      Boss.health = parseInt(m[1], 0) / parseInt(m[2], 0);
    }
    if (m = html.match(new RegExp('<span id="app8743457343_cur_energy" fbcontext=".*?">(.*?)</span>/([0-9]*)'))) {
      Boss.energy = [parseInt(m[1], 0), parseInt(m[2], 0)];
    }
    if (m = html.match(new RegExp('<span id="app8743457343_cur_recovery" fbcontext=".*?">(.*?)</span>/([0-9]*)'))) {
      Boss.stamina = parseInt(m[1], 0);
      Boss.stamina_total = parseInt(m[2], 0);
    }
    if ( new RegExp('>Level Up.*?</a>').test( html ) && Settings.level ) {
      Ajax(Page.domain + '/mobwars/profile/', function(xhr) {
        if (Page.pausing)
          return;
        Task.level(xhr.responseText);
      });
    }
    Console.update_stats();
  }
};
var pref_textarea = <><![CDATA[
<div class="generic_dialog_popup" style="top: 95px;">
  <table id="pop_dialog_table" class="pop_dialog_table" style="width:400px !important;">
  <tbody>
    <tr>
      <td class="pop_topleft"></td>
      <td class="pop_border pop_top"></td>
      <td class="pop_topright"></td>
    </tr>
    <tr>
      <td class="pop_border pop_side"></td>
      <td id="pop_content" class="pop_content">
        <h2 class="dialog_title"><span id="a_title" class="mwtp_textarea_title">Enter Mobs</span></h2>
        <div class="dialog_content">
          <div id="a_content" class="dialog_body">
            <center>Type in the Mob 'ID's below, with ONLY one ID per line.</center>
            <textarea id="mwtp_textarea" style="width:350px;height:200px;"></textarea>
          </div>
          <div class="dialog_buttons">
            <input id="mwtp_textarea_save" value="Save" name="save" class="inputsubmit" type="button">
            <input id="mwtp_textarea_cancel" value="Cancel" name="cancel" class="inputsubmit inputaux" type="button">
          </div>
        </div>
      </td>
      <td class="pop_border pop_side"></td>
    </tr>
    <tr>
      <td class="pop_bottomleft"></td>
      <td class="pop_border pop_bottom"></td>
      <td class="pop_bottomright"></td>
    </tr>
  </tbody>
  </table>
</div>
]]></>.toString();
var pref_html = <><![CDATA[
<div class="generic_dialog_popup" style="top: 30px;">
  <table id="pop_dialog_table" class="pop_dialog_table">
  <tbody>
    <tr>
      <td class="pop_topleft"></td>
      <td class="pop_border pop_top"></td>
      <td class="pop_topright"></td>
    </tr>
    <tr>
      <td class="pop_border pop_side"></td>
      <td id="pop_content" class="pop_content">
        <h2 class="dialog_title"><span>MWTurbo Enhanced Preferences</span></h2>
        <div class="dialog_content">
          <div class="dialog_body" style="overflow-y:auto;height:450px;">
            <h3 class="mwt_pref_title" style="margin-top:0;">General</h3>
            <setline>
              <preflabel>Bank Cash:</preflabel>
              <input id="pref_bank" type="checkbox" style="display:block;float:left;" />
              <description title="Do you want to bank your cash went it reaches the limit?">?</description>
            </setline>
            <setline>
              <preflabel>Bank Limit:</preflabel>
              <input id="pref_bank_limit" type="text" class="pref number" />
              <description title="Bank cash when reaches this amount?">?</description>
            </setline>
            <setline>
              <preflabel>Heal:</preflabel>
              <input id="pref_heal" type="checkbox" style="display:block;float:left;" />
              <description title="Do you want your boss healed when below set health?">?</description>
            </setline>
            <setline>
              <preflabel>Min Health: (%)</preflabel>
              <input id="pref_min_health" type="text" class="pref number" />
              <description title="Minimum health as a %">?</description>
            </setline>
            <setline>
              <preflabel>Max Health: (%)</preflabel>
              <input id="pref_max_health" type="text" class="pref number" />
              <description title="Stops healing once above this %. Maximum is 60%.">?</description>
            </setline>
            <setline>
              <preflabel>Min Refresh:</preflabel>
              <input id="pref_min_refresh" type="text" class="pref number" />
              <description title="Minimum page refresh time in seconds.">?</description>
            </setline>
            <setline>
              <preflabel>Max Refresh:</preflabel>
              <input id="pref_max_refresh" type="text" class="pref number" />
              <description title="Maximum page refresh time in seconds.">?</description>
            </setline>
            <setline>
              <preflabel>Script Repeat:</preflabel>
              <input id="pref_script_repeat" type="text" class="pref number" /> <span class="infinite">[Infinite]</span>
              <description title="How many times you want to do a action.">?</description>
            </setline>
            <setline>
              <preflabel>Avoid Mobs:</preflabel>
              <input id="pref_avoid_mobs" type="text" class="pref number text" style="display:none;" /><span class="text_pref" description="Avoid Mobs" updates="#pref_avoid_mobs">Click here to input Mobs</span>
              <description title="Choose Mob's that you don't want to attack on all scripts here. Comes preset with a few including Enforcers.">?</description>
            </setline>
            <setline>
              <preflabel>Use Exp Points:</preflabel>
              <input id="pref_level" type="checkbox" style="display:block;float:left;" />
              <description title="Do you want MWT to automatically spend your Level up points?">?</description>
            </setline>
            <setline>
              <preflabel>Skill ratio:</preflabel>
              <span class="pref_text">A:</span> <input id="pref_level_attack" type="text" class="pref small" />
              <span class="pref_text">D:</span> <input id="pref_level_defence" type="text" class="pref small" />
              <span class="pref_text">E:</span> <input id="pref_level_energy" type="text" class="pref small" />
              <span class="pref_text">H:</span> <input id="pref_level_health" type="text" class="pref small" />
              <span class="pref_text">S:</span> <input id="pref_level_stamina" type="text" class="pref small" />
              <description title="Choose how Experience points should be distributed. A=Attack, D=Defence, E=Energy, H=Health, S=Stamina">?</description>
            </setline>
            <setline>
              <preflabel>Insider:</preflabel>
              <input id="pref_insider" type="checkbox" style="display:block;float:left;" />
              <description title="Check this if you are a Mob Wars Insider, and would like the timers re-accounted for.">?</description>
            </setline>
            <setline>
              <preflabel>Captcha Sound:</preflabel>
              <input id="pref_captcha_sound" type="checkbox" style="display:block;float:left;" />
              <description title="Do you want to play a sound when a captcha is found?">?</description>
            </setline>
            <h3 class="mwt_pref_title">Chain Attack Detection</h3>
            <setline>
              <preflabel>Chain Time:</preflabel>
              <input id="pref_chain_time" type="text" class="pref number" />
              <description title="The maximum time in seconds between attacks to be considered a chain atacker.">?</description>
            </setline>
            <setline>
              <preflabel>Chain Attacks:</preflabel>
              <input id="pref_chain_attacks" type="text" class="pref number" />
              <description title="The minimum number of attacks before considered a chain attacker.">?</description>
            </setline>
            <h3 class="mwt_pref_title">Fight Script</h3>
            <setline>
              <preflabel>Start Stamina:</preflabel>
              <input id="pref_fight_stamina_start" type="text" class="pref number" />
              <description title="When stamina reaches this amount, start fighting.">?</description>
            </setline>
            <setline>
              <preflabel>Stop Stamina:</preflabel>
              <input id="pref_fight_stamina_stop" type="text" class="pref number" />
              <description title="When stamina reaches this amount, recharge to 'Start Stamina'.">?</description>
            </setline>
            <setline>
              <preflabel>Max Mob Size:</preflabel>
              <input id="pref_max_mob_size" type="text" class="pref number" />
              <description title="The biggest Mob you want to fight.">?</description>
            </setline>
            <setline>
              <preflabel>Min Mob Size:</preflabel>
              <input id="pref_min_mob_size" type="text" class="pref number" />
              <description title="The smallest Mob you want to fight.">?</description>
            </setline>
            <setline>
              <preflabel>Max Level:</preflabel>
              <input id="pref_fight_max_level" type="text" class="pref number" /> <span class="off">[Off]</span>
              <description title="The highest level you want to fight.">?</description>
            </setline>
            <setline>
              <preflabel>Fight Repeat:</preflabel>
              <span class="inputlabel">Exp:</span><input id="pref_exp_repeat" name="repeattype" class="prefradio" type="radio" />
              <span class="inputlabel">Cash:</span><input id="pref_cash_repeat" name="repeattype" class="prefradio" type="radio" />
              <span class="inputlabel">Threshold:</span><input id="pref_repeat_threshold" type="text" class="pref number" />
            </setline>
            <setline>
              <preflabel>Repeat Limit:</preflabel>
              <input id="pref_repeat_limit" type="text" class="pref number" /> <span class="infinite">[Infinite]</span> <span class="off">[Off]</span>
              <description title="Maximum number of times to repeativly attack a Mob.">?</description>
            </setline>
            <setline>
              <preflabel>Ignore Reset:</preflabel>
              <input id="pref_fight_reset" type="text" class="pref number" /> <span class="off">[Off]</span>
              <description title="Reset ignore list after this many attacks.">?</description>
            </setline>
            <setline>
              <preflabel>Avoid Mobs:</preflabel>
              <input id="pref_fight_avoid" type="text" class="pref number text" style="display:none;" /><span class="text_pref" description="Fight Avoid Mobs" updates="#pref_fight_avoid">Click here to input Mobs</span>
              <description title="Choose Mob's that you don't want to fight here.">?</description>
            </setline>
            <setline>
              <preflabel>Auto Punch:</preflabel>
              <span class="inputlabel">Off:</span><input id="pref_fight_punch_off" name="fight_punch" class="prefradio" type="radio" />
              <span class="inputlabel">Before Fight:</span><input id="pref_fight_punch_before" name="fight_punch" class="prefradio" type="radio" />
              <span class="inputlabel">Always Punch:</span><input id="pref_fight_punch_always" name="fight_punch" class="prefradio" type="radio" />
              <description title="Do you want to punch mobs before fighting them, or punch instead of attack?">?</description>
            </setline>
            <h3 class="mwt_pref_title">Hitlist Script</h3>
            <setline>
              <preflabel>Start Stamina:</preflabel>
              <input id="pref_hitlist_stamina_start" type="text" class="pref number" />
              <description title="When stamina reaches this amount, start Hitlisting.">?</description>
            </setline>
            <setline>
              <preflabel>Stop Stamina:</preflabel>
              <input id="pref_hitlist_stamina_stop" type="text" class="pref number" />
              <description title="When stamina reaches this amount, recharge to 'Start Stamina'.">?</description>
            </setline>
            <setline>
              <preflabel>Min Bounty:</preflabel>
              <input id="pref_min_bounty" type="text" class="pref number" />
              <description title="What is the smallest bounty you want to attack?">?</description> <span class="off">[Off]</span>
            </setline>
            <setline>
              <preflabel>Max Bounty:</preflabel>
              <input id="pref_max_bounty" type="text" class="pref number" />
              <description title="What is the largest bounty you want to attack?">?</description> <span class="off">[Off]</span>
            </setline>
            <setline>
              <preflabel>Multi Attack:</preflabel>
              <input id="pref_hitlist_multi_attack" type="text" class="pref number" />
              <description title="How many times do you want to try attack your target? NOTE: Will most likely cause un-reliable Log results.">?</description> <span class="off">[Off]</span>
            </setline>
            <setline>
              <preflabel>Avoid Mobs:</preflabel>
              <input id="pref_hitlist_avoid" type="text" class="pref number text" style="display:none;" /><span class="text_pref" description="Hitlist Avoid Mobs" updates="#pref_hitlist_avoid">Click here to input Mobs</span>
              <description title="Choose Mob's that you do not want to Hitlist here.">?</description>
            </setline>
            <h3 class="mwt_pref_title">Revenge Script</h3>
            <setline>
              <preflabel>Targets:</preflabel>
              <input id="pref_revenge_targets" type="text" class="pref number text" style="display:none;" /><span class="text_pref" description="Revenge Targets" updates="#pref_revenge_targets">Click here to input target mobs.</span>
              <description title="What Mobs do you want to release revenge upon?">?</description>
            </setline>
            <setline>
              <preflabel>Wait time:</preflabel>
              <input id="pref_revenge_wait" type="text" class="pref number" />
              <description title="How many seconds to wait before moving on to next target.">?</description>
            </setline>
            <setline>
              <preflabel>Start Stamina:</preflabel>
              <input id="pref_revenge_stamina_start" type="text" class="pref number" />
              <description title="When stamina reaches this amount, start fighting.">?</description>
            </setline>
            <setline>
              <preflabel>Stop Stamina:</preflabel>
              <input id="pref_revenge_stamina_stop" type="text" class="pref number" />
              <description title="When stamina reaches this amount, recharge to 'Start Stamina'.">?</description>
            </setline>
            <setline>
              <preflabel>Attack Mobs:</preflabel>
              <input id="pref_revenge_attack" type="checkbox" style="display:block;float:left;" />
              <description title="Do you want to attack (fight) targets?">?</description>
            </setline>
            <setline>
              <preflabel>Hitlist Mobs:</preflabel>
              <input id="pref_revenge_hitlist" type="checkbox" style="display:block;float:left;" />
              <description title="Do you want to add targets to the hitlist?">?</description>
            </setline>
            <setline>
              <preflabel>Punch Mobs:</preflabel>
              <input id="pref_revenge_punch" type="checkbox" style="display:block;float:left;" />
              <description title="Do you want to punch targets?">?</description>
            </setline>
            <setline>
              <preflabel>Ignore Reset:</preflabel>
              <input id="pref_revenge_ignore_reset" type="text" class="pref number" /> <span class="off">[Off]</span>
              <description title="Reset ignore list after this many actions.">?</description>
            </setline>
            <setline>
              <preflabel>Relatiate:</preflabel>
              <input id="pref_revenge_retaliate" type="checkbox" style="display:block;float:left;" />
              <description title="Do you want to automatically add mobs that chain attack you to the Revenge list?">?</description>
            </setline>
            <setline>
              <preflabel>Chainers:</preflabel>
              <input id="pref_revenge_chainers" type="text" class="pref number text" style="display:none;" /><span class="text_pref" description="Chain Attackers" updates="#pref_revenge_chainers">Click here to view Chain Attackers</span>
              <description title="View the chain attackers that have been added to your Revenge list. Can edit and clear them here.">?</description>
            </setline>
            <setline>
              <preflabel>Temporary:</preflabel>
              <input id="pref_revenge_retaliate_temp" type="checkbox" style="display:block;float:left;" />
              <description title="Would you like chain attackers saved? Or would you like the list reset each time you run Revenge?">?</description>
            </setline>
            <h3 class="mwt_pref_title">Property Script</h3>
            <setline>
              <preflabel>Undeveloped:</preflabel>
              <input id="pref_property_undev" type="checkbox" style="display:block;float:left;" />
              <description title="Do you want to invest in property that can be upgraded?">?</description>
            </setline>
            <setline>
              <preflabel>Reserve Cash:</preflabel>
              <input id="pref_property_reserve" type="text" class="pref number" />
              <description title="How much cash do you want to leave reserved? Setting 0 will spend as much cash as possible on Property.">?</description>
            </setline>
            <h3 class="mwt_pref_title">Job Script</h3>
            <setline>
              <preflabel>Job Number:</preflabel>
              <input id="pref_job_number" type="text" class="pref number" />
              <description title="What job to do. 1 = Mugging, 2 = House Burglary etc.">?</description>
            </setline>
            <h3 class="mwt_pref_title">Defend Script</h3>
            <setline>
              <preflabel>Wait Time:</preflabel>
              <input id="pref_defend_time" type="text" class="pref number" />
              <description title="How long to wait before rechecking stats.">?</description>
            </setline>
            <setline>
              <preflabel>Chain Detect:</preflabel>
              <input id="pref_defend_chain" type="checkbox" style="display:block;float:left;" />
              <description title="Do you want to play dead when chain attacked?">?</description>
            </setline>
            <setline>
              <preflabel>Play Dead:</preflabel>
              <input id="pref_defend_dead_wait" type="text" class="pref number" />
              <description title="How long to pause script in minutes when chain attacked.">?</description>
            </setline>
            <h3 class="mwt_pref_title">Captcha Solver Account (<a target=_blank href="http://www.SecureWorldHosting.com/MWTurboEnhanced/CaptchaSolver.html">Subscribe/Purchase</a>)<span id="mwc_points"></span></h3>
            <center><span id='CaptchaPoints1'></span>
			<span id='CaptchaPoints2'></span></center>
			<setline>
              <preflabel>Enable:</preflabel>
              <input id="pref_mwcaptcha" type="checkbox" style="display:block;float:left;" />
              <description title="If you have a Captcha Solver account and you want to use it, enable this option.">?</description>
            </setline>
            <setline>
              <preflabel>Username:</preflabel>
              <input id="pref_mwc_username" type="text" class="pref number text" />
              <description title="Your MWcaptcha Username.">?</description>
            </setline>
            <setline>
              <preflabel>Password:</preflabel>
              <input id="pref_mwc_password" type="password" class="pref number text" />
              <description title="Your MWcaptcha Password.">?</description>
            </setline>
          </div>
          <div class="dialog_buttons">
            <input id="mwtp_save" value="Save" name="save" class="inputsubmit" type="button">
            <input id="mwtp_cancel" value="Cancel" name="cancel" class="inputsubmit inputaux" type="button">
          </div>
        </div>
      </td>
      <td class="pop_border pop_side"></td>
    </tr>
    <tr>
      <td class="pop_bottomleft"></td>
      <td class="pop_border pop_bottom"></td>
      <td class="pop_bottomright"></td>
    </tr>
  </tbody>
  </table>
</div>
]]></>.toString();
var Settings = default_settings = {
  bank: false,
  bank_limit: 1,
  heal: true,
  min_health: 0.3,
  max_health: 0.6,
  min_refresh: 1,
  max_refresh: 4,
  script_repeat: -1,
  avoid_mobs: "1439889063\n1646335294\n1750411381\n1746987705",
  level: false,
  level_attack: 1,
  level_defence: 1,
  level_energy: 1,
  level_health: 10,
  level_stamina: 1,
  insider: false,
  captcha_sound: false,
  chain_time: 60,
  chain_attacks: 5,
  fight_stamina_start: 10,
  fight_stamina_stop: 3,
  max_mob_size: 20,
  min_mob_size: 5,
  fight_max_level: 0,
  fight_repeat: true,
  repeat_type: 'exp',
  repeat_threshold: 10,
  repeat_limit: -1,
  fight_reset: 0,
  fight_avoid: '',
  fight_punch: 'off',
  hitlist_stamina_start: 5,
  hitlist_stamina_stop: 0,
  min_bounty: 0,
  max_bounty: 0,
  hitlist_multi_attack: 0,
  hitlist_avoid: '',
  revenge_targets: '',
  revenge_wait: 30,
  revenge_stamina_start: 10,
  revenge_stamina_stop: 3,
  revenge_attack: true,
  revenge_hitlist: false,
  revenge_punch: false,
  revenge_ignore_reset: 0,
  revenge_retaliate: false,
  revenge_chainers: '',
  revenge_retaliate_temp: false,
  property_undev: false,
  property_reserve: 0,
  job_number: 1,
  defend_time: 30,
  defend_chain: true,
  defend_dead_wait: 5,
  mwcaptcha: false,
  mwcaptcha_safe: false,
  mwc_earn: true,
  mwc_use: false,
  mwc_username: '',
  mwc_password: '',
  log_memory: []
};
var stamina_wait = 110;
var Preferences = {
  displayed: false,
  textarea_target: null,
  show: function() {
    Preferences.save();
    Preferences.update();
    Preferences.temp = Settings;
    var div = document.createElement('div');
    div.className = 'generic_dialog pop_dialog';
    div.id = 'mwt_pref';
    div.innerHTML = pref_html;
    document.body.insertBefore(div, document.body.lastChild);
	
    var prefs = $('#mwt_pref')[0];
    $('#mwtp_save').bind('click', function() {
      Settings = Preferences.temp;
      Preferences.save();
      $(prefs).animate({
        opacity: "0"
      },
      100, function() {
        $(this).remove();
      });
      Preferences.displayed = false;
    });
    $('#mwtp_cancel').bind('click', function() {
      $(prefs).animate({
        opacity: "0"
      },
      100, function() {
        $(this).remove();
      });
      Preferences.displayed = false;
    });
    $('input', prefs).bind('change', function() {
      Preferences.change_temp_value(this);
    });
    $('.text_pref', prefs).bind('click', function() {
      Preferences.textarea(this);
    });
    $('span.infinite', prefs).bind('click', function() {
      var input = this.parentNode.getElementsByTagName('input')[0];
      input.value = -1;
      Preferences.change_temp_value(input);
    });
    $('span.off', prefs).bind('click', function() {
      var input = this.parentNode.getElementsByTagName('input')[0];
      input.value = 0;
      Preferences.change_temp_value(input);
    });
    $('#mwc_points').bind('click', function() {
      Mwcaptcha.username = Settings.mwc_username;
      Mwcaptcha.password = Settings.mwc_password;
      Mwcaptcha.points();
    });
    $('input', prefs).each(function(i) {
      var id = '';
      if (id = this.id.match(/pref_(.+)/)) {
        id = id[1];
        if (this.type == 'checkbox') {
          this.checked = eval('Preferences.temp.' + id);
        } else if (this.type == 'radio') {
          this.checked = eval('Preferences.temp.' + id);
        } else {
          this.value = eval('Preferences.temp.' + id);
        }
      }
	  var CaptchaSolver = eval(GM_getValue('CaptchaSolver', '({})'));
	
	  if (CaptchaSolver.LFT) {
		var temp = document.getElementById('CaptchaPoints1');
		if (temp) {
			temp.innerHTML = "Points Avail: "+CaptchaSolver.LFT;
			if (CaptchaSolver.Sys == 1) {
				temp.innerHTML += '&nbsp;&nbsp;&nbsp;&nbsp;Valid thru: ';
				var argh = new Date(parseFloat(CaptchaSolver.valid));
          		//when = argh.toLocaleString();
          		var year=argh.getFullYear()+'';
          		var ttime=argh.toTimeString()+'';
          		var when = (argh.getMonth()+1)+'/'+argh.getDate()+'/'+year.substr(2,2)+' '+ttime.substr(0,8);
				temp.innerHTML += when;
				var temp = document.getElementById('CaptchaPoints2');
				if (temp) temp.innerHTML = '<br>Request more points, if needed, by emailing Donations@SecureWorldHosting.com';
			}
		}
	  }
    });
    $('#pref_min_health')[0].value = this.temp.min_health * 100;
    $('#pref_max_health')[0].value = this.temp.max_health * 100;
    if (this.temp.repeat_type == 'cash') $('#pref_cash_repeat')[0].checked = true;
    else $('#pref_exp_repeat')[0].checked = true;
    if (this.temp.fight_punch == 'before') $('#pref_fight_punch_before')[0].checked = true;
    else if (this.temp.fight_punch == 'always') $('#pref_fight_punch_always')[0].checked = true;
    else $('#pref_fight_punch_off')[0].checked = true;
    //if (this.temp.mwc_earn == true) $('#pref_mwc_earn')[0].checked = true;
    //else $('#pref_mwc_use')[0].checked = true;
    this.displayed = true;
    return true;
  },
  change_temp_value: function(a) {
    var id = a.id;
    if (id == 'pref_exp_repeat') {
      this.temp.repeat_type = 'exp';
    }
    else if (id == 'pref_fight_punch_off')
      this.temp.fight_punch = 'off';
    else if (id == 'pref_fight_punch_before')
      this.temp.fight_punch = 'before';
    else if (id == 'pref_fight_punch_always')
      this.temp.fight_punch = 'always';
    else if (id == "pref_mwc_earn") {
      this.temp.mwc_earn = true;
      this.temp.mwc_use = false;
    } else if (id == "pref_mwc_use") {
      this.temp.mwc_earn = false;
      this.temp.mwc_use = true;
    }
    else if (id == 'pref_cash_repeat') {
      this.temp.repeat_type = 'cash';
    }
    else if (id == 'pref_min_health') {
      this.temp.min_health = a.value / 100;
    }
    else if (id == 'pref_max_health') {
      if (a.value > 60) {
        a.value = 60;
      }
      this.temp.max_health = a.value / 100;
    }
    else if (id == 'pref_revenge_retaliate_time') {
      if (parseInt(a.value) > 60 * 60) { // Mob Wars has a un-accurate news feed in terms of seconds after around 5 minutes
        a.value = 60 * 60;
      }
      this.temp.revenge_retaliate_time = parseInt(a.value);
    }
    else {
      var var_name = a.id.replace('pref_', '');
      if (a.type == 'checkbox') {
        eval('this.temp.' + var_name + ' = a.checked;');
      } else if (a.type == 'radio') {
        eval('this.temp.' + var_name + ' = a.checked;');
      } else {
        var value = (parseInt(a.value, 0) == -1) ? -1 : Utility.make_number(a.value);
        if (a.className.match(' text')) {
          value = a.value;
        }
        eval('this.temp.' + var_name + ' = value;');
        a.value = value;
      }
    }
	
	this.temp.mwc_earn = false;
    this.temp.mwc_use = true;
	
    return true;
  },
  save: function() {
    GM_setValue('preferences', Settings.toSource());
    //if (Settings.mwc_earn) {
      //Mwcaptcha.getting = false;
    //} else if (Settings.mwc_use) {
      Mwcaptcha.solving = false;
    //}
    Boss.ignore = Utility.textarea_array(Settings.avoid_mobs);
    if ( Modules["Fight"] )
      Fight.avoid = Utility.textarea_array(Settings.fight_avoid);
    if ( Modules["Hitlist"] )
      Hitlist.avoid = Utility.textarea_array(Settings.hitlist_avoid);
    Mwcaptcha.username = Settings.mwc_username;
    Mwcaptcha.password = Settings.mwc_password;
    return true;
  },
  update: function() {
    var temp = eval(GM_getValue('preferences', 'null')),
     key;
    if (!temp) temp = {};
    Settings = {};
    for ( key in default_settings ) {
      if (temp[ key ] === undefined) Settings[ key ] = default_settings[ key ];
      else Settings[ key ] = temp[ key ];
    }
    Preferences.save();
    return true;
  },
  textarea: function(ele) {
    Preferences.textarea_target = $(ele.getAttribute('updates'))[0];
    var title = ele.getAttribute('description');
    var div = document.createElement('div');
    if ($('#mwt_pref_textarea').length > 0) {
      $('#mwtp_textarea')[0].value = Preferences.textarea_target.value;
      $('.mwtp_textarea_title').html(title);
      return;
    }
    div.className = 'generic_dialog pop_dialog';
    div.id = 'mwt_pref_textarea';
    div.innerHTML = pref_textarea;
    document.body.insertBefore(div, document.body.lastChild);
    $('#mwtp_textarea')[0].value = Preferences.textarea_target.value;
    $('.mwtp_textarea_title').html(title);
    $('#mwtp_textarea_save').bind('click', function() {
      var value = Preferences.textarea_target.value = $('#mwtp_textarea')[0].value;
      var event = document.createEvent('HTMLEvents');
      event.initEvent('change', true, false);
      Preferences.textarea_target.dispatchEvent(event);
      $('#mwt_pref_textarea').remove();
    });
    $('#mwtp_textarea_cancel').bind('click', function() {
      $('#mwt_pref_textarea').remove();
    });
  }
};
var script_css = <><![CDATA[
div#mwt_menu {
  position:fixed;
  bottom:27px;
  right:2px;
  width:200px;
  overflow:hidden;
  z-index:10;
}
div#mwt_menu_links span, div#mwt_menu_options span {
  display:block;
  color:#3B5998;
  cursor:pointer;
  margin:16px 0;
}
div#mwt_menu_links span:hover, div#mwt_menu_options span:hover {
  text-decoration:underline;
}
h3.mwt_pref_title {
  margin:3px 0;
  padding:0;
  color:#333333;
  font-size:13px;
  font-weight:bold;
  width:100%;
  border:solid #D8DFEA;
  border-width:0 0 1px;
}
table.mwt_stats td {
  color:gray;
}
table.mwt_stats span {
  color:#000000;
  font-size:12px;
}
table#mwt_status td {
  color:gray;
  font-size:11px;
  vertical-align:baseline;
}
table#mwt_status span{
  font-size:14px;
  color:#BF0000;
  cursor:pointer;
  padding:0 10px 0 0;
}
table#mwt_status span:hover{
  text-decoration:underline;
}
span.running {
  color:#00AA00 !important;
}
td.script_name {
  text-align:right;
  width:70px;
}
select#mwt_logger option{
  padding: 6px 0pt 0pt;
  height:18px;
  font-size: 9px;
}
setline {
  margin:0;
  padding:0;
  display:block;
  overflow:hidden;
  height:22px;
}
preflabel {
  margin:0;
  padding:4px 0 0;
  font-size:11px;
  display:block;
  float:left;
  width:90px;
  color:gray;
  clear:left;
}
description {
  display:block;
  height:18px;
  width:18px;
  background-color:#3B5998;
  font-size:12px;
  font-weight:bold;
  color:#FFF;
  float:right;
  clear:right;
  text-align:center;
  cursor:help;
}
input.pref {
  display: block;
  float:left;
  border:1px solid #BDC7D8;
  padding:3px;
  font-size:11px;
}
input.number {
  width:79px;
}
input.small {
  width:30px !important;
}
input.string {
  width:100px;
}
input.prefradio {
  display:block;
  float:left;
}
span.inputlabel {
  margin:0;
  padding:4px 2px 0 3px;
  font-size:11px;
  display:block;
  float:left;
  color:#000000;
}
span.pref_text {
  display:block;
  float:left;
  padding:3px 2px 0;
}
span.infinite, span.off, span.text_pref {
  display:block;
  float:left;
  padding:3px 2px 0;
  color:#3B5998;
  cursor:pointer;
}
span.infinite:hover, span.off:hover, span.text_pref:hover {
  text-decoration:underline;
}
span#mwc_points{
  text-decoration:underline;
  color:#3B5998;
  font-size:11px;
  cursor:pointer;
}
]]></>.toString();
var script_menu = <><![CDATA[
<div style="height:25px;color:#ffffff;background:#3b5998;width:100%;font-size:14px;font-weight:bold;-moz-border-radius-topleft:5px;-moz-border-radius-topright:5px;text-align:center;padding:6px 0 0 0;">MWTurbo Enhanced</div><span id="scriptupdate"></span>
<div id="mwt_menucontent" style="background-color:#ffffff;padding:5px;width:188px;border:solid #3b5998;border-width:0 1px 1px;"> <center>
<div id="mwt_menu_links" style="padding:0 0 16px 0;">
  <span style="margin-top: 0;"><button type="button" id="mwt_console" class="inputsubmit">Start MWT</button></span>
  <button type="button" id="mwt_options" class="inputsubmit">Options</button>
</div>
<div id="mwt_menu_options" style="display:none;padding:0 0 16px;">
  <span id="mwt_reset" style="margin-top: 0;">Reset MWTurbo</span>
  <span id="mwt_version">Current Version</span>
  <button type="button" id="mwt_return" class="inputsubmit">Main Menu</button>
</div>
<button type="button" id="mwt_pref_button" class="inputsubmit">Preferences</button> </center></div>
<div id="sound_player" style="overflow: hidden; height: 0pt; width: 0pt;"></div>
]]></>.toString();
var Menu = {
  init: function() {
    GM_addStyle(script_css);
    $('#ScriptStatus').css({
      right: "0",
      left: "1px"
    });
    var div = document.createElement('div');
    div.id = 'mwt_menu';
    div.innerHTML = script_menu;
    document.body.insertBefore(div, document.body.lastChild);
    $('#mwt_console').bind('click', function() {
      if (Console.visable) {
        return;
      }
      Console.toggle();
    });
    $('#mwt_return').bind('click', function() {
      Menu.toggle('links');
    });
    $('#mwt_options').bind('click', function() {
      Menu.toggle('options');
    });
    $('#mwt_pref_button').bind('click', function() {
      if (Preferences.displayed) {
        return;
      }
      Preferences.show();
    });
    $('#mwt_reset').bind('click', function() {
      Settings = default_settings;
      Preferences.save();
      alert('MWTurbo has been reset!');
    });
    $('#mwt_version').bind('click', function() {
      alert( product_name + "\n" + "Version: " + script_version );
    });
  },
  toggle: function(page) {
    $("//div[@id='mwt_menu']//div[contains(@id,'mwt_menu_')]").hide();
    $('#mwt_menu_' + page).show();
    return true;
  }
};
var Page = {
  domain: "http://apps.facebook.com",
  captcha_data: {
    data: '',
    url: ''
  },
  special_pause: false,
  captcha_src: '',
  pausing: false,
  pause_cbs: [],
  init: function() {
    Menu.init();
    Preferences.update();
    if (Settings.insider)
      stamina_wait * 0.9;
    Log.memory = Settings.log_memory;
    Mwcaptcha.username = Settings.mwc_username;
    Mwcaptcha.password = Settings.mwc_password;
  },
  toggle: function(script) {
    if (eval(script.ucwords() + '.running')) {
      eval(script.ucwords() + '.log("Stopped running")');
      eval(script.ucwords() + '.running=false');
      $('#status_' + script).html('Click to begin');
      $('#mwt_' + script).attr('class', '');
    } else {
      var c_script = eval(script.ucwords());
      c_script.init();
      $('#mwt_' + script).attr('class', 'running');
    }
    var working = false;
    for (var i = Modules.length - 1; i >= 0; i--) {
      if (eval(Modules[i] + '.running')) {
        working = true;
      }
    }
    if (working) $('#mwt_working').css({
      display: 'block'
    }).show();
    else $('#mwt_working').hide();
  },
  bcast: function(script) {
    return eval(script.ucwords() + '.running');
  },
  wait: function() {
    return Math.floor(Math.random() * ( Settings.max_refresh - Settings.min_refresh + 1 ) + Settings.min_refresh);
  },
  pause_cb: function(cb) {
    for (var i = Page.pause_cbs.length - 1; i >= 0; i--) {
      if (Page.pause_cbs[i].toSource() == cb.toSource())
        return;
    }
    Page.pause_cbs.push(cb);
  },
  resume: function() {
    Page.pausing = false;
    Page.special_pause = false;
    for (var i = Page.pause_cbs.length - 1; i >= 0; i--) {
      var cb = Page.pause_cbs[i];
      cb();
    }
    Page.pause_cbs = [];
    return;
  },
  halt: function() {
    Array.forEach(Modules, function(module) {
      eval(module + '.running=false');
      return;
    });
    return;
  },
  captcha: function(html) {
    if ( html.indexOf('Are You Human?') !== -1 ) {
      if (Page.pausing) return;
      Page.pausing = true;
      var image = html.match( new RegExp('src="(http://.*?/img/captcha.*?)"') )[1].replace( new RegExp('&amp;', 'g'), '&' );
      Page.captcha_data.url = html.match( new RegExp('method="post" action="(.*?)"') )[1];
      if (m = html.match( new RegExp('type="hidden" (?:name="action"|value="(.*?)") (?:name="action"|value="(.*?)")') )) {
        if (m[1]) {
          action = m[1];
        } else {
          action = m[2];
        }
      }
      Page.captcha_src = image;
      if (Settings.mwcaptcha === true && Settings.mwc_use === true) {
        $('#captcha_image').hide();
        $('#captcha_answer')[0].disabled = true;
        $('#captcha_answer')[0].value = "Waiting to be answered";
        $('#captcha_submit').hide();
        Mwcaptcha.add(Page.captcha_src);
        $('#mwt_captcha_box').show();
      } else {
        $('#captcha_answer')[0].disabled = false;
        $('#captcha_answer')[0].value = '';
        $('#captcha_submit').show();
        $('#captcha_image').attr('src', image).show();
        $('#mwt_captcha_box').show();
        $('#captcha_answer')[0].focus();
      }
      Page.captcha_data.image = encodeURIComponent(image);
      Page.captcha_data.data = 'cap_action=bust_cap&action=' + action + '&cap_answer=';
      if (Settings.captcha_sound) {
        Page.captcha('play');
      }
      return true;
    }
    else if ( html.indexOf('Enter the number in the box') !== -1 ) {
      if (Page.pausing) return;
      Page.pausing = true;
      Page.captcha_data.url = html.match( new RegExp('method="post" action="(.*?)"') )[1];
      var image = html.match( new RegExp('src="(http://.*?/img/captcha_image.*?)"') )[1].replace( new RegExp('&amp;', 'g'), '&');
      Page.captcha_src = image;
      if (Settings.mwcaptcha === true && Settings.mwc_use === true) {
        $('#captcha_image').hide();
        $('#captcha_answer')[0].disabled = true;
        $('#captcha_answer')[0].value = "Waiting to be answered";
        $('#captcha_submit').hide();
        Mwcaptcha.add(Page.captcha_src);
        $('#mwt_captcha_box').show();
      } else {
        $('#captcha_answer')[0].disabled = false;
        $('#captcha_answer')[0].value = '';
        $('#captcha_submit').show();
        $('#captcha_image').attr('src', image).show();
        $('#mwt_captcha_box').show();
        $('#captcha_answer')[0].focus();
      }
      Page.captcha_data.image = escape(image);
      Page.captcha_data.data = 'action=allow_access&cap_value=';
      if (Settings.captcha_sound) {
        Page.captcha('play');
      }
      return true;
    }
    else if ( html.indexOf('This page is being heavily rate limited') !== -1 ) {
      Page.special_pause = true;
      Page.pausing = true;
      $('#a_title').html('Page being heavily rate limited!');
      $('#a_content').html('This Mob Wars page is being heavily rate limited. Wait for the timer to finish or click \'Retry\' to continue');
      $('#mwt_a').show();
      if (Console.a_timer) {
        Console.a_timer.stop();
      }
      Console.a_timer = new Utility.a_timer({
        time: 180,
        message: 'Retry [[time]]',
        fn: function() {
          Page.resume();
          Console.a_close();
          return;
        }
      });
      Console.a_timer.start();
      return true;
    } else if (html == 'play') {
      if (Page.pausing) {
        Utility.play_sound('http://www.mwturbo.com/sound.wav');
        setTimeout(Page.captcha, 180000, 'play');
      }
    }
    return false;
  },
  captcha_submit: function(answer) {
    $('#captcha_image')[0].src = '';
    answer = answer || $('#captcha_answer')[0].value;
    $('#mwt_captcha_box').slide_out();
    Page.captcha_data.answer = answer;
    Ajax(Page.captcha_data.url + '?' + Page.captcha_data.data + answer, function(xhr) {
      Page.resume();
      Boss.update(xhr.responseText);
      Page.captcha(xhr.responseText);
      if (Settings.mwcaptcha === true && Settings.mwc_use === true) {
        Page.send_catpcha();
      }
      return;
    },
    'POST');
    return;
  },
  send_catpcha: function() {
    if (Page.pausing != true) {
      Mwcaptcha.result(true);
    } else {
      Mwcaptcha.result(false);
    }
    return;
  },
  show_mwcaptcha: function() {
    Page.mwcaptcha_showing = true;
    $('#mwcaptcha_image')[0].src = Mwcaptcha.image;
    $('#mwcaptcha_answer')[0].value = "";
    $('#mwc_captcha_box').show();
    $('#mwcaptcha_answer')[0].focus();
    if (Settings.captcha_sound) {
      Utility.play_sound('http://www.mwturbo.com/sound.wav');
    }
    return;
  },
  mwcaptcha_submit: function() {
    $('#mwcaptcha_image')[0].src = "";
    Page.mwcaptcha_showing = false;
    Mwcaptcha.solution = $('#mwcaptcha_answer')[0].value;
    Mwcaptcha.answer();
    $('#mwc_captcha_box').slide_out();
  }
};
var Cache = {
  banking: false,
  healing: false,
  bank_cb: null,
  heal_cb: null,
  heal_v: false,
  tdd: 0,
  tdr: 0,
  tw: 0,
  texp: 0,
  tb: 0,
  twins: 0
};
Modules.push( "Fight" );
var Fight = {
  running: false,
  list: false,
  status: "",
  count: 0,
  list_rank: 0,
  ignore: [],
  avoid: [],
  individual_count: 0,
  last_reset: 0,
  user: null,
  log: function(action) {
    var log = [{
      name: 'Script',
      value: 'Fight'
    },
    {
      name: 'Action',
      value: action
    }];
    Console.log(log);
    Console.status('fight', action);
  },
  init: function(resume) {
    if (resume) {
      if (Fight.running === false) {
        return;
      }
    }
    Fight.running = true;
    Fight.list = false;
    Fight.count = 0;
    Fight.user;
    Fight.list_rank = 0;
    Fight.ignore = Boss.ignore.concat(Fight.avoid);
    Fight.individual_count = 0;
    Fight.last_reset = 0;
    Fight.status = "LIST";
    Fight.log('Initiating Fight Automation');
    Ajax(Page.domain + '/mobwars/fight/', function(xhr) {
      Page.captcha(xhr.responseText);
      if (Page.pausing === true) {
        Page.pause_cb(function() {
          Fight.init(true);
          return;
        });
        return;
      };
      Boss.update(xhr.responseText);
      Fight.update_list(xhr.responseText);
      Fight.stats_check();
      return;
    });
    return;
  },
  counter: function() {
    Fight.count++;
    if (Fight.count >= Settings.script_repeat && Settings.script_repeat != -1) {
      Page.toggle('fight');
      return;
    }
    if ((Fight.count - Fight.last_reset) >= Settings.fight_reset && Settings.fight_reset != 0) {
      Fight.ignore = Boss.ignore.concat(Fight.avoid);
      Fight.last_reset = Fight.count;
    }
    return;
  },
  ignore_check: function(user_id) {
    for (var i = 0, il = Fight.ignore.length; i < il; i++) {
      if (user_id == Fight.ignore[i])
        return true;
    }
    return false;
  },
  update_list: function(html) {
    Fight.log('Updating Fight List');
    var doc = document.createElement('div');
    Fight.list = [];
    doc.innerHTML = html;
    $("//tr[contains(.,', Level')]", doc).each(function() {
      Fight.list.push({
        mob_count: parseInt(this.innerHTML.match(/<td>([0-9]*?)<\/td>/)[1]),
        level: parseInt(this.innerHTML.match(new RegExp('Level ([0-9].*?) (Bulletproof|Tycoon|Insomniac)'))[1]),
        user_id: $("//input[@name='target_id']", this).attr('value')
      });
    });
    if (Fight.list.length <= 0)
      Fight.list = false;
  },
  stats_check: function() {
    if (Fight.running === false) {
      return;
    };
    if (Page.pausing === true) {
      Page.pause_cb(function() {
        Fight.stats_check();
        return;
      });
      return;
    };
    Fight.log('Checking Boss\'s Stats');
    var updating = false;
    if (Boss.cash >= Settings.bank_limit && Settings.bank && Cache.banking === false) {
      Fight.log('Banking ' + Utility.int_dollars(Boss.cash));
      Task.bank(Fight.stats_check);
      updating = true;
    }
    if (Settings.fight_stamina_stop >= Boss.stamina) {
      Fight.log('Recharging Boss\'s Stamina');
      var timer = new Utility.timer({
        script: 'fight',
        message: 'Waiting [[time]] for Stamina to recharge...',
        time: stamina_wait * (Settings.fight_stamina_start - Boss.stamina),
        fn: function() {
          Ajax(Page.domain + '/mobwars/fight/', function(xhr) {
            Page.captcha(xhr.responseText);
            if (Fight.running === false) {
              return;
            };
            if (Page.pausing === true) {
              Page.pause_cb(function() {
                Fight.stats_check();
                return;
              });
              return;
            };
            Boss.update(xhr.responseText);
            Fight.update_list(xhr.responseText);
            Fight.stats_check();
            return;
          });
        }
      });
      timer.start();
      updating = true;
    } else if (Boss.health <= Settings.min_health && Settings.heal && Cache.healing === false) {
      Fight.log('Healing your Boss');
      Task.heal(Fight.stats_check);
      updating = true;
    }
    if (updating) {
      Fight.list = false;
      return;
    }
    Fight.log('Stat checks complete');
    Fight.load_attack();
    return;
  },
  load_attack: function() {
    if (Fight.running === false) {
      return;
    };
    if (Page.pausing === true) {
      Page.pause_cb(function() {
        Fight.stats_check();
        return;
      });
      return;
    };
    if (Fight.list === false) {
      Fight.list_rank = 0;
      Fight.log('Getting Fight List');
      Ajax(Page.domain + '/mobwars/fight/', function(xhr) {
        Page.captcha(xhr.responseText);
        if (Fight.running === false) {
          return;
        };
        if (Page.pausing === true) {
          Page.pause_cb(function() {
            Fight.stats_check();
            return;
          });
          return;
        };
        Boss.update(xhr.responseText);
        Fight.update_list(xhr.responseText);
        Fight.stats_check();
        return;
      });
      return;
    }
    if (Fight.status == "INDIVIDUAL") {
      Fight.individual_count++;
      if (Settings.repeat_limit > Fight.individual_count || Settings.repeat_limit == -1) {
        var timer = new Utility.timer({
          time: Page.wait(),
          message: 'Fighting individual Mob [[time]]...',
          script: 'fight',
          fn: function() {
            Fight.attack(Fight.user);
            return;
          }
        });
        timer.start();
        return;
      }
      Fight.ignore.push(Fight.user);
      Fight.individual_count = 0;
      Fight.status = "LIST";
    }
    var mob;
    while (Fight.list_rank < Fight.list.length) {
      level = true;
      mob = Fight.list[Fight.list_rank];
      if (Settings.fight_max_level > 0) {
        if (mob.level >= Settings.fight_max_level) {
          level = false;
        }
      }
      if (Settings.min_mob_size <= mob.mob_count && Settings.max_mob_size >= mob.mob_count && level) {
        if (Fight.ignore_check(mob.user_id) === false) {
          Fight.user = mob.user_id;
          var timer = new Utility.timer({
            time: Page.wait(),
            message: 'Fighting Mob [[time]]...',
            script: 'fight',
            fn: function() {
              Fight.attack(Fight.user);
              return;
            }
          });
          timer.start();
          Fight.list_rank++;
          return;
        }
      }
      Fight.list_rank++;
    }
    Fight.list_rank = 0;
    Fight.list = false;
    var timer = new Utility.timer({
      time: 180,
      message: 'Waiting for new Fight List [[time]]...',
      script: 'fight',
      fn: function() {
        Fight.stats_check();
        return;
      }
    });
    timer.start();
    return;
  },
  attack: function(user_id) {
    if (Fight.running === false) {
      return;
    };
    if (Page.pausing === true) {
      Page.pause_cb(function() {
        Fight.stats_check();
        return;
      });
      return;
    };
    if (Settings.fight_punch != 'off') {
      Fight.log('Punching Mob ' + user_id);
      Ajax(Page.domain + '/mobwars/fight/do.php?action=punch&target_id=' + user_id + '&from=/profile/?user_id=' + user_id, function(xhr) {
        Page.captcha(xhr.responseText);
        if (Fight.running === false) {
          return;
        };
        if (Page.pausing === true) {
          Page.pause_cb(function() {
            Fight.stats_check();
            return;
          });
          return;
        };
        Boss.update(xhr.responseText);
        Fight.update_list(xhr.responseText);
        var ann = Task.announce(xhr.responseText);
        if (Settings.fight_punch == 'always') {
          Fight.status = "LIST";
          Fight.individual_count = 0;
          Fight.counter();
          Fight.stats_check();
        } else {
          Fight.fight(Fight.user);
        }
        return;
      });
    } else Fight.fight(user_id);
    return;
  },
  fight: function(user_id) {
    if (Fight.status == "INDIVIDUAL") Fight.log("Fighting Individual Mob " + user_id);
    else Fight.log("Fighting Mob " + user_id);
    Ajax(Page.domain + '/mobwars/fight/do.php?force=1&action=attack&target_id=' + user_id, function(xhr) {
      Page.captcha(xhr.responseText);
      if (Fight.running === false) {
        return;
      };
      if (Page.pausing === true) {
        Page.pause_cb(function() {
          Fight.stats_check();
          return;
        });
        return;
      };
      Boss.update(xhr.responseText);
      Fight.update_list(xhr.responseText);
      var ann = Task.announce(xhr.responseText);
      Fight.announce(ann);
      Fight.counter();
      Fight.stats_check();
    },
    'POST');
    return;
  },
  announce: function(ann) {
    if (ann) {
      if (ann.won) {
        Fight.log('Fight Won against ' + Fight.user + '! You dealt ' + ann.damaged + ' damage, recieved ' + ann.damager + ', gained ' + ann.cash_str + ' and ' + ann.exp + ' exp');
        if (Settings.repeat_type == "exp" && ann.exp >= Settings.repeat_threshold) {
          Fight.list = false;
          Fight.status = "INDIVIDUAL";
        } else if (Settings.repeat_type == "cash" && ann.cash >= Settings.repeat_threshold) {
          Fight.status = "INDIVIDUAL";
          Fight.list = false;
        }
      } else if (ann.lost) {
        Fight.individual_count = 0;
        Fight.status = "LIST";
        Fight.ignore.push(Fight.user);
        Fight.log('Fight Lost against ' + Fight.user + '! You dealt ' + ann.damaged + ' damage, recieved ' + ann.damager);
      } else if (ann) {
        Fight.individual_count = 0;
        Fight.status = "LIST";
        Fight.log('Fight Attack failed against ' + Fight.user + '! "' + ann.message + '"');
      }
    }
    return;
  }
};
Modules.push( "Hitlist" );
var Hitlist = {
  count: 0,
  counter: 0,
  running: false,
  ignore: [],
  avoid: [],
  attacking: false,
  attacks: 1,
  log: function(action) {
    var log = [{
      name: 'Script',
      value: 'Hitlist'
    },
    {
      name: 'Action',
      value: action
    }];
    Console.log(log);
    Console.status('hitlist', action);
    return;
  },
  ignore_check: function() {
    for (var i = Hitlist.ignore.length - 1; i >= 0; i--) {
      if (Hitlist.user == Hitlist.ignore[i]) {
        return true;
      }
    }
    return false;
  },
  init: function(resume) {
    if (resume) {
      if (Hitlist.running === false) {
        return;
      };
    }
    Hitlist.count = 0;
    Hitlist.counter = 0;
    Hitlist.ignore = Boss.ignore.concat(Hitlist.avoid);
    Hitlist.running = true;
    Hitlist.attacking = false;
    Hitlist.attacks = 1;
    Hitlist.log('Initiating Hitlist Automation');
    Ajax(Page.domain + '/mobwars/hitlist/', function(xhr) {
      Boss.update(xhr.responseText);
      Hitlist.stats_check();
      return;
    });
    return;
  },
  stats_check: function() {
    if (Hitlist.running === false) {
      return;
    };
    if (Page.pausing === true) {
      Page.pause_cb(function() {
        Hitlist.stats_check();
        return;
      });
      return;
    };
    Hitlist.log('Checking Boss\'s Stats');
    var updating = false;
    if (Boss.cash >= Settings.bank_limit && Settings.bank && Cache.banking === false) {
      Hitlist.log('Banking ' + Utility.int_dollars(Boss.cash));
      Task.bank(Hitlist.stats_check);
      updating = true;
    }
    if (Settings.hitlist_stamina_stop > Boss.stamina) {
      Hitlist.log('Recharging Boss\'s Stamina');
      var timer = new Utility.timer({
        script: 'hitlist',
        message: 'Waiting [[time]] for Stamina to recharge...',
        time: stamina_wait * (Settings.hitlist_stamina_start - Boss.stamina),
        fn: function() {
          Ajax(Page.domain + '/mobwars/fight/', function(xhr) {
            Page.captcha(xhr.responseText);
            if (Hitlist.running === false) {
              return;
            };
            if (Page.pausing === true) {
              Page.pause_cb(function() {
                Hitlist.stats_check();
                return;
              });
              return;
            };
            Boss.update(xhr.responseText);
            Hitlist.stats_check();
            return;
          });
        }
      });
      timer.start();
      updating = true;
    } else if (Boss.health <= Settings.min_health && Settings.heal && Cache.healing === false) {
      Hitlist.log('Healing your Boss');
      Task.heal(Hitlist.stats_check);
      updating = true;
    }
    if (updating) {
      Hitlist.list = null;
      return;
    }
    Hitlist.log('Stat checks complete');
    Hitlist.log('Checking Hitlist');
    var timer = new Utility.timer({
      time: Page.wait(),
      message: 'Checking Hitlist in [[time]]...',
      script: 'hitlist',
      fn: function() {
        Hitlist.load_attack();
        return;
      }
    });
    timer.start();
    return;
  },
  load_attack: function() {
    Ajax(Page.domain + '/mobwars/hitlist/', function(xhr) {
      Page.captcha(xhr.responseText);
      if (Hitlist.running === false) {
        return;
      };
      if (Page.pausing === true) {
        Page.pause_cb(function() {
          Hitlist.stats_check();
        });
        return;
      };
      Boss.update(xhr.responseText);
      Hitlist.check(xhr.responseText);
      return;
    });
    return;
  },
  check: function(html) {
    var tre = 'name="target_id" value="(.*?)"',
      bre = 'name="bounty_id" value="(.*?)"',
      vre = 'name="verify" value="(.*?)"',
      cre = '<td>\\$([0-9]{1,4}(?:,[0-9]{3})*?)</td>';
    if (ms = html.match(new RegExp(tre, 'g'))) {
      var cashs = html.match(new RegExp(cre, 'g')),
        b_ids = html.match(new RegExp(bre, 'g')),
        vs = html.match(new RegExp(vre, 'g')),
        tre = new RegExp(tre),
        bre = new RegExp(bre),
        cre = new RegExp(cre),
        vre = new RegExp(vre);
      for (var i = (ms.length - 1); i >= 0; i--) {
        var cash = Utility.make_number(cashs[i].match(cre)[1]);
        if (Settings.min_bounty <= cash && (Settings.max_bounty >= cash || 0 == Settings.max_bounty)) {
          Hitlist.user = ms[i].match(tre)[1];
          if (Hitlist.ignore_check() === false) {
            var b_id = b_ids[i].match(bre)[1],
              verify = vs[i].match(vre)[1];
            Hitlist.log('User ' + Hitlist.user + ' found. Attacking');
            Hitlist.counter = 0;
            Hitlist.attack(b_id, verify);
            return;
          }
        }
      }
    }
    Hitlist.stats_check();
    return;
  },
  attack: function(b_id, verify) {
    Hitlist.attacks = Settings.hitlist_multi_attack;
    if (0 >= Settings.hitlist_multi_attack) {
      Hitlist.attacks = 1;
    }
    Hitlist.attacking = true;
    var count = Hitlist.count;
    for (var i = Hitlist.attacks - 1; i >= 0; --i) {
      Ajax(Page.domain + '/mobwars/fight/do.php?from=hitlist&action=attack_bounty&target_id=' + Hitlist.user + '&bounty_id=' + b_id + '&verify=' + encodeURIComponent(verify), function(xhr) {
        Hitlist.counter++;
        var ann = Task.announce(xhr.responseText);
        if (ann) {
          if (ann.bounty) {
            Hitlist.log('Bounty Claimed from ' + Hitlist.user + '! Gained ' + Utility.int_dollars(ann.cash) + '.');
          }
          if (ann.won) {
            Hitlist.log('Hitlist Fight Won against ' + Hitlist.user + '! You dealt ' + ann.damaged + ' damage, recieved ' + ann.damager + ', gained   ' + ann.cash_str + ' and ' + ann.exp + ' exp');
          } else if (ann.lost) {
            if (!Histlist.ignore_check(Hitlist.user)) Hitlist.ignore.push(Hitlist.user);
            Hitlist.log('Hitlist Fight Lost against ' + Hitlist.user + '! You dealt ' + ann.damaged + ' damage, recieved ' + ann.damager);
          } else if (ann) {
            Hitlist.log('Hitlist Attack failed! "' + ann.message + '"');
          }
        }
        Page.captcha(xhr.responseText);
        if (Hitlist.count >= Settings.script_repeat && -1 != Settings.script_repeat) {
          Page.toggle('hitlist');
          return;
        }
        if (Hitlist.running === false) {
          return;
        };
        if (Page.pausing === true) {
          Page.pause_cb(function() {
            Hitlist.stats_check();
            return;
          });
          return;
        };
        Boss.update(xhr.responseText);
        if (Hitlist.attacks <= Hitlist.counter) {
          Hitlist.attacking = false;
          Hitlist.count++;
          Hitlist.stats_check();
        }
        return;
      }, "post");
    }
    var fn = function(count) {
      if (count <= Hitlist.count) return;
      if (Hitlist.attacking) {
        Hitlist.attacking = false;
        Hitlist.count++;
        Hitlist.stats_check();
      }
    };
    setTimeout(fn, 15000 * Hitlist.attacks, count);
  }
};
Modules.push( "Job" );
var Job = {
  running: false,
  list: false,
  energy: false,
  job_id: false,
  wait: 300,
  count: 0,
  init: function(resume) {
    if (resume) {
      if (Job.running === false) {
        Page.toggle('job');
      }
      return;
    }
    Job.count = 0;
    Job.running = true;
    Job.list = false;
    Job.wait = 300;
    Job.energy = false;
    Job.job_id = false;
    Job.log('Initiating Job Automation');
    Ajax(Page.domain + '/mobwars/profile/', function(xhr) {
      Page.captcha(xhr.responseText);
      if (Page.pausing === true) {
        Page.pause_cb(function() {
          Job.init(true);
          return;
        });
        return;
      };
      Boss.update(xhr.responseText);
      if (m = xhr.responseText.match(/>.*?Level [0-9]*? (.*?)<\/h1>/)) {
        if ('insomniac' == m[1].toLowerCase()) Job.wait = 240;
      } else {
        Job.init();
        return;
      };
      if (Settings.insider) Job.wait * 0.9;
      Job.calculate();
      return;
    });
    return;
  },
  log: function(action) {
    var log = [{
      name: 'Script',
      value: 'Job'
    },
    {
      name: 'Action',
      value: action
    }];
    Console.log(log);
    Console.status('job', action);
    return;
  },
  update_list: function(html) {
    if (Job.running === false) {
      return;
    };
    if (Page.pausing === true) {
      Page.pause_cb(function() {
        Job.check_stats();
        return;
      });
      return;
    };
    Job.list = [];
    var doc = document.createElement('div'),
    tables,
    re_energy = new RegExp('Energy:.*?(\\d+)');
    doc.innerHTML = html;
    tables = $("//div[@id='app8743457343_content']/div/table", doc);
    $("//tr[contains(@class,'rowData')]", tables[0]).each(function() {
      Job.list.push({
        id: parseInt($("//input[@name='jobid']", this)[0].value),
        name: $("//b[contains(@style,'color: silver;')]", this)[0].innerHTML,
        energy: parseInt(this.innerHTML.match(re_energy)[1])
      });
    });
    if (Job.list.length <= 0) return false;
    return true;
  },
  calculate: function() {
    if (Job.running === false) {
      return;
    };
    if (Page.pausing === true) {
      Page.pause_cb(function() {
        Job.calculate();
        return;
      });
      return;
    };
    if (Job.list === false) {
      Job.log('Loading Job List');
      Ajax(Page.domain + '/mobwars/jobs/', function(xhr) {
        Page.captcha(xhr.responseText);
        if (Page.pausing === true) {
          Page.pause_cb(function() {
            Job.calculate();
            return;
          });
          return;
        };
        Boss.update(xhr.responseText);
        Job.update_list(xhr.responseText);
        Job.calculate();
        return;
      });
      return;
    }
    Job.log('Checking Job List');
    if (c_job = Job.list[Settings.job_number - 1]) {
      if (c_job.energy > Boss.energy[1]) {
        Job.log('Not Enough Total Energy');
        var timer = new Utility.timer({
          time: 5,
          message: 'Not Enough Total Energy [[time]]...',
          script: 'job',
          fn: function() {
            Page.toggle('job');
            return;
          }
        });
        timer.start();
        return;
      }
      Job.job_id = c_job.id;
	  Job.energy = c_job.energy;
      Job.check_stats();
    } else {
      Job.log('Can\'t Find Job');
      var timer = new Utility.timer({
        time: 5,
        message: 'Can\'t Find Job [[time]]...',
        script: 'job',
        fn: function() {
          Page.toggle('job');
          return;
        }
      });
      timer.start();
    }
    return;
  },
  check_stats: function() {
    if (Job.running === false) {
      return;
    };
    if (Page.pausing === true) {
      Page.pause_cb(function() {
        Job.check_stats();
        return;
      });
      return;
    };
    Job.log('Checking Boss\'s Stats');
    var updating = false;
    if (Boss.cash >= Settings.bank_limit && Settings.bank && Cache.banking === false) {
      Job.log('Banking ' + Utility.int_dollars(Boss.cash));
      Task.bank(Job.calculate);
      updating = true;
    }
    if (Job.energy > Boss.energy[0]) {
      Job.log('Recharging Boss\'s Energy to ' + Job.energy);
      var timer = new Utility.timer({
        script: 'job',
        message: 'Waiting [[time]] for ' + Job.energy + ' Energy...',
        time: Job.wait * (Job.energy - Boss.energy[0]),
        fn: function() {
          Job.calculate();
          return;
        }
      });
      timer.start();
      updating = true;
    }
    if (updating) {
      Job.list = false;
      return;
    }
    Job.log('Stats Check Complete');
    Job.log( 'Doing Job Number ' + Settings.job_number );
    var timer = new Utility.timer({
      time: Page.wait(),
      message: 'Doing Job Number ' + Settings.job_number + ' [[time]]...',
      script: 'job',
      fn: function() {
        if (Job.running === false) {
          return;
        }
        Job.do_job();
      }
    });
    timer.start();
  },
  do_job: function() {
    Ajax(Page.domain + '/mobwars/jobs/do.php?action=dojob&jobid=' + Job.job_id, function(xhr) {
      Page.captcha(xhr.responseText);
      if (Page.pausing === true) {
        Page.pause_cb(function() {
          Job.calculate();
          return;
        });
        return;
      };
      Boss.update(xhr.responseText);
      Job.update_list(xhr.responseText);
      Task.announce(xhr.responseText);
      Job.count++;
      if (Job.count >= Settings.script_repeat && Settings.script_repeat != -1) {
        Page.toggle('job');
        return;
      }
      Job.calculate();
      return;
    },
    'POST');
  }
};
Modules.push( "Revenge" );
var Revenge = {
  count: 0,
  running: false,
  status: {
    rank: 0,
    attack: false,
    punch: false,
    hitlist: false
  },
  user: [],
  user_id: '',
  last_action: false,
  ignore: [],
  last_reset: 0,
  log: function(action) {
    var log = [{
      name: 'Script',
      value: 'Revenge'
    },
    {
      name: 'Action',
      value: action
    }];
    Console.log(log);
    Console.status('revenge', action);
    return;
  },
  init: function(resume) {
    if (resume) {
      if (Revenge.running === false) Page.toggle('revenge');
      return;
    }
    Revenge.count = 0;
    Revenge.running = true;
    Revenge.status = {
      rank: 0,
      attack: false,
      punch: false,
      hitlist: false
    };
    if ( Settings.revenge_retaliate_temp === true )
      Settings.revenge_chainers = "";
    Revenge.user = [];
    Revenge.user_id = '';
    Revenge.last_action = false;
    Revenge.ignore = [];
    Revenge.last_reset = 0;
    Revenge.log('Initiating Revenge Automation');
    Ajax(Page.domain + '/mobwars/', function(xhr) {
      Page.captcha(xhr.responseText);
      if (Page.pausing === true) {
        Page.pause_cb(function() {
          Revenge.init(true);
          return;
        });
        return;
      };
      Boss.update(xhr.responseText);
      Revenge.check_stats();
      return;
    });
    return;
  },
  ignore_check: function(user_id) {
    var array = Revenge.ignore;
    for (var i = array.length - 1; i >= 0; i--) {
      if (user_id == array[i]) {
        return true;
      }
    }
    return false;;
  },
  check_stats: function() {
    var updating = false;
    Revenge.log('Checking Boss\'s Stats');
    if (Boss.cash >= Settings.bank_limit && Settings.bank && Cache.banking === false) {
      Revenge.log('Banking ' + Utility.int_dollars(Boss.cash));
      Task.bank(Revenge.check_stats);
      updating = true;
    }
    if (Settings.revenge_stamina_stop >= Boss.stamina) {
      Revenge.log('Recharging Boss\'s Stamina');
      var timer = new Utility.timer({
        script: 'revenge',
        message: 'Waiting [[time]] for Stamina to recharge...',
        time: stamina_wait * (Settings.revenge_stamina_start - Boss.stamina),
        fn: function() {
          Ajax(Page.domain + '/mobwars/', function(xhr) {
            Page.captcha(xhr.responseText);
            if (Revenge.running === false) {
              return;
            };
            if (Page.pausing === true) {
              Page.pause_cb(function() {
                Revenge.check_stats();
                return;
              });
              return;
            };
            Boss.update(xhr.responseText);
            Revenge.check_stats();
            return;
          });
        }
      });
      timer.start();
      updating = true;
    } else if (Boss.health <= Settings.min_health && Settings.heal && Cache.healing === false) {
      Revenge.log('Healing your Boss');
      Task.heal(Revenge.check_stats);
      updating = true;
    }
    if (updating) return;
    Revenge.load_action();
    return;
  },
  load_action: function() {
    if ( Settings.revenge_retaliate === true )
      Ajax( Page.domain + "/mobwars/", function( xhr ) {
        Task.chain_check( xhr.responseText, function( user_id ) {
          var array = Utility.textarea_array( Settings.revenge_chainers );
          for ( var i = 0, user; user = array[ i++ ]; ) {
            if ( parseInt( user ) === parseInt( user_id ) )
              return;
          }
          array.push( user_id );
          Settings.revenge_chainers = array.join( "\n" );
          Revenge.log( 'Added a chainer: ' + user_id );
        });
      });
    Revenge.user = Utility.textarea_array(Settings.revenge_targets).concat( Utility.textarea_array( Settings.revenge_chainers ) );
    if (!Revenge.user.length > 0 && !Settings.revenge_retaliate) {
      var timer = new Utility.timer({
        time: 5,
        message: 'There are no targets set in Preferences! [[time]]',
        script: 'revenge',
        fn: function() {
          Page.toggle('revenge');
          return;
        }
      });
      timer.start();
      return;
    }
    else if ( !Revenge.user.length > 0 ) {
      Revenge.status.attack = false;
      Revenge.status.hitlist = false;
      Revenge.status.punch = false;
      Revenge.wait();
      return;
    }
    if (Revenge.user_id != Revenge.user[Revenge.status.rank]) {
      Revenge.status.attack = false;
      Revenge.status.hitlist = false;
      Revenge.status.punch = false;
    }
    if (Revenge.status.rank >= Revenge.user.length) {
      Revenge.status.rank = 0;
    }
    var ignore = true;
    var loop_reset = false;
    while (ignore) {
      if (Revenge.user_id = Revenge.user[Revenge.status.rank]) {
        ignore = Revenge.ignore_check(Revenge.user_id);
        if (ignore) Revenge.status.rank++;
      } else if (loop_reset === false) {
        Revenge.status.rank = 0;
        loop_reset = true;
      } else {
        Revenge.log('All targets have been ignored. Force reseting ignore list.');
        Revenge.ignore = [];
        Revenge.counter();
        Revenge.last_reset = Revenge.count;
        Revenge.wait();
        return;
      }
    }
    var action = false;
    Revenge.last_action = false;
    if (Settings.revenge_attack && Revenge.status.attack === false) {
      Revenge.status.attack = true;
      var timer = new Utility.timer({
        time: Page.wait(),
        message: 'Attacking Mob ' + Revenge.user_id + ' in [[time]]...',
        script: 'revenge',
        fn: function() {
          if (Revenge.running === false) {
            return;
          };
          if (Page.pausing === true) {
            Page.pause_cb(function() {
              Revenge.check_stats();
              return;
            });
            return;
          };
          Revenge.attack();
          return;
        }
      });
      timer.start();
      action = true;
    }
    if (Settings.revenge_punch && Revenge.status.punch === false) {
      if (action) return;
      Revenge.status.punch = true;
      var timer = new Utility.timer({
        time: Page.wait(),
        message: 'Punching Mob ' + Revenge.user_id + ' in [[time]]...',
        script: 'revenge',
        fn: function() {
          if (Revenge.running === false) {
            return;
          };
          if (Page.pausing === true) {
            Page.pause_cb(function() {
              Revenge.check_stats();
            });
            return;
          };
          Revenge.punch();
        }
      });
      timer.start();
      action = true;
    }
    if (Settings.revenge_hitlist && Revenge.status.hitlist === false) {
      if (action) return;
      Revenge.status.hitlist = true;
      var timer = new Utility.timer({
        time: Page.wait(),
        message: 'Hitlisting Mob ' + Revenge.user_id + ' in [[time]]...',
        script: 'revenge',
        fn: function() {
          if (Revenge.running === false) {
            return;
          };
          if (Page.pausing === true) {
            Page.pause_cb(function() {
              Revenge.check_stats();
              return;
            });
            return;
          };
          Revenge.hitlist();
          return;
        }
      });
      timer.start();
      action = true;
    }
    if (action) {
      Revenge.last_action = true;
      return;
    }
    Revenge.status.attack = false;
    Revenge.status.hitlist = false;
    Revenge.status.punch = false;
    Revenge.status.rank++;
    Revenge.wait();
    return;
  },
  punch: function() {
    Revenge.log('Punching Mob ' + Revenge.user_id);
    Ajax(Page.domain + '/mobwars/fight/do.php?action=punch&target_id=' + Revenge.user_id + '&force=1&from=profile', function(xhr) {
      Page.captcha(xhr.responseText);
      if (Revenge.running === false)
        return;
      if (Page.pausing === true) {
        Page.pause_cb(function() {
          Revenge.check_stats();
          return;
        });
        return;
      };
      Boss.update(xhr.responseText);
      Revenge.announce(Task.announce(xhr.responseText));
      Revenge.counter();
      if (!Revenge.last_action) Revenge.check_stats();
      else Revenge.load_action();
    });
  },
  hitlist: function() {
    Revenge.log('Hitlisting Mob ' + Revenge.user_id);
    Ajax(Page.domain + '/mobwars/hitlist/add.php?from=profile&target_id=' + Revenge.user_id, function(xhr) {
      if (bounty = xhr.responseText.match(new RegExp('name="bounty" value="(.*)"'))) {
        bounty = bounty[1];
        Ajax(Page.domain + '/mobwars/hitlist/do.php?action=add&success=profile&bounty=' + bounty + '&target_id=' + Revenge.user_id + '&next=add.php%3Ftarget_id%3D' + Revenge.user_id, function(xhr) {
          Page.captcha(xhr.responseText);
          if (Revenge.running === false) return;
          if (Page.pausing === true) {
            Page.pause_cb(function() {
              Revenge.check_stats();
              return;
            });
            return;
          };
          Boss.update(xhr.responseText);
          Revenge.announce(Task.announce(xhr.responseText));
          Revenge.counter();
          if (!Revenge.last_action) Revenge.check_stats();
          else Revenge.load_action();
          return;
        },
        'POST');
        return;
      }
      Revenge.counter();
      if (!Revenge.last_action) Revenge.check_stats();
      else Revenge.load_action();
      return;
    });
    return;
  },
  attack: function() {
    if (Revenge.running === false) return;
    Revenge.log('Attacking Mob ' + Revenge.user_id);
    Ajax(Page.domain + '/mobwars/fight/do.php?action=attack&force=1&target_id=' + Revenge.user_id + '&force=1&from=/profile/?user_id=' + Revenge.user_id, function(xhr) {
      Page.captcha(xhr.responseText);
      if (Revenge.running === false) return;
      if (Page.pausing === true) {
        Page.pause_cb(function() {
          Revenge.check_stats();
          return;
        });
        return;
      };
      Boss.update(xhr.responseText);
      Revenge.announce(Task.announce(xhr.responseText));
      Revenge.counter();
      if (!Revenge.last_action)
        Revenge.check_stats();
      else
        Revenge.load_action();
    });
  },
  announce: function(ann) {
    if (ann) {
      if (ann.won)
        Revenge.log('Fight Won against ' + Revenge.user_id + '! You dealt ' + ann.damaged + ' damage, recieved ' + ann.damager + ', gained ' + ann.cash_str + ' and ' + ann.exp + ' exp');
      else if (ann.lost)
        Revenge.log('Fight Lost against ' + Revenge.user_id + '! You dealt ' + ann.damaged + ' damage, recieved ' + ann.damager);
      else if (ann) {
        Revenge.log('Fight Attack failed against ' + Revenge.user_id + '! "' + ann.message + '"');
        Revenge.ignore.push(Revenge.user_id);
      }
    }
  },
  counter: function() {
    Revenge.count++;
    if (Revenge.count >= Settings.script_repeat && Settings.script_repeat != -1) {
      Revenge.log('Automation Finished!');
      Page.toggle('revenge');
    }
    if (Revenge.count - Revenge.last_reset >= Settings.revenge_ignore_reset && Settings.revenge_ignore_reset != 0) {
      Revenge.ignore = [];
      Revenge.last_reset = Revenge.count;
    }
    return;
  },
  wait: function() {
    if (Revenge.running === false) return;
    if (Settings.revenge_wait > 0) {
      var timer = new Utility.timer({
        time: Settings.revenge_wait,
        message: 'Waiting to attack next target in [[time]]...',
        script: 'revenge',
        fn: function() {
          if (Revenge.running === false) return;
          if (Page.pausing === true) {
            Page.pause_cb(function() {
              Revenge.check_stats();
              return;
            });
            return;
          };
          Revenge.check_stats();
          return;
        }
      });
      timer.start();
      return;
    }
    Revenge.check_stats();
    return;
  }
};
Modules.push( "Property" );
var Property = {
  count: 0,
  running: false,
  list: {},
  prop: null,
  log: function(action) {
    var log = [{
      name: 'Script',
      value: 'Property'
    },
    {
      name: 'Action',
      value: action
    }];
    Console.log(log);
    Console.status('property', action);
    return;
  },
  init: function(resume) {
    if (resume) {
      if (Property.running === false) return;
    }
    Property.count = 0;
    Property.log('Initiating the Property Automation');
    Property.running = true;
    Property.list = {};
    Property.prop = null;
    Ajax(Page.domain + '/mobwars/city/', function(xhr) {
      Property.update_list(xhr.responseText);
      return;
    });
    return;
  },
  update_list: function(html) {
    Property.log('Updating Property List');
    if (!html) {
      Ajax(Page.domain + '/mobwars/city/', function(xhr) {
        Page.captcha(xhr.responseText);
        if (Property.running === false) {
          return;
        };
        if (Page.pausing === true) {
          Page.pause_cb(function() {
            Property.update_list();
            return;
          });
          return;
        };
        Boss.update(xhr.responseText);
        Property.update_list(xhr.responseText);
        return;
      });
      return;
    }
    Property.list = {};
    var locations = [];
    var regex = new RegExp('"http://apps.facebook.com/mobwars/city/\\?show_loc=(.*?)"');
    Array.forEach(html.match(new RegExp('<a class="(lowerMenuHilighted|lowerMenuLink)" href="http://apps.facebook.com/mobwars/city/\\?show_loc=.*?"', 'g')), function(link) {
      locations.push(link.match(regex)[1]);
      return;
    });
    Property.locations = locations.length;
    Property.location_counter = 0;
    Array.forEach(locations, function(location) {
      GM_log(Page.domain + '/mobwars/city/?show_loc=' + location);
      Ajax(Page.domain + '/mobwars/city/?show_loc=' + location, function(xhr) {
        Page.captcha(xhr.responseText);
        if (Property.running === false)
          return;
        if (Page.pausing === true) {
          Page.pause_cb(function() {
            Property.update_list();
            return;
          });
          return;
        };
        Boss.update(xhr.responseText);
        Property.parse_location(xhr.responseText);
        Property.location_counter++;
        if (Property.location_counter >= Property.locations)
          Property.process();
        return;
      });
      return;
    });
    var timestamp = new Date().getTime();
    Property.timeout_timestamp = timestamp;
    var fn = function(time) {
      if (Property.running === false) {
        return;
      };
      if (Page.pausing === true) {
        Page.pause_cb(function() {
          Property.update_list();
          return;
        });
        return;
      };
      if (time == Property.timeout_timestamp) Property.update_list();
      return;
    };
    setTimeout(fn, 60000, timestamp);
    return;
  },
  parse_location: function(html) {
    var re_html = new RegExp('<a name="item_[0-9]*?"></a>(?:.|\\s)*?</form>', 'g'),
      html = html.match(re_html),
      name_re = new RegExp('<b style="font-size: 15px; color: silver;">(.*?)</b>'),
      cost_re = new RegExp('\\$([0-9]{1,4}(,[0-9]{3})*)</span>'),
      income_re = new RegExp('Income:.*?\\$([0-9]{1,4}(,[0-9]{3})*)'),
      req_re = new RegExp('<br />Built.+?On:.+?(.+?)(  )'),
      owned_re = new RegExp('([0-9]+?)</b></span>'),
      id_re = new RegExp('name="item" value="(.*?)"'),
      props = {},
      exclusions = [];
    for (i = html.length - 1; i >= 0; i--) {
      tr = html[i];
      var prop = {};
      prop.require = false;
      if (match = tr.match(name_re))
        prop.name = match[1];
      if (match = tr.match(id_re))
        prop.id = Utility.make_number(match[1]);
      if (match = tr.match(cost_re))
        prop.cost = Utility.make_number(match[1]);
      if (match = tr.match(income_re))
        prop.income = Utility.make_number(match[1]);
      if (match = tr.match(owned_re))
        prop.owned = Utility.make_number(match[1]);
      if (match = tr.match(req_re)) {
        prop.require = match[1];
        exclusions.push(prop.require);
      }
      if (prop.cost && prop.income) {
        prop.ror = (prop.income / prop.cost) * 100;
        if (10 <= prop.owned && !Settings.property_undev) {
          for (var j = exclusions.length - 1; j >= 0; j--) {
            if (prop.name == exclusions[j])
              prop.ror = -1;
          }
        }
      }
      props[prop.name] = prop;
    }
    for (prop_name in props) Property.list[prop_name] = props[prop_name];
    return;
  },
  process: function() {
    Property.timeout_timestamp = new Date().getTime();
    var props = [];
    for (property in Property.list) {
      props.push({
        name: property,
        ror: Property.list[property].ror
      });
    }
    props.sort(function(a, b) {
      return (b.ror - a.ror);
    });
    Property.prop = Property.list[props[0].name];
    if (Property.prop.require) {
      if (Property.list[Property.prop.require].owned < 10) {
        Property.prop = Property.list[Property.prop.require];
      }
    }
    Property.check_stats();
    return;
  },
  check_stats: function() {
    var prop = Property.prop;
    if (Property.running === false) return;
    if (Page.pausing === true) {
      Page.pause_cb(function() {
        Property.update_list();
        return;
      });
      return;
    };
    Property.log('Checking Boss\'s Stats');
    var updating = false;
    Settings.property_reserve = Settings.property_reserve || 0;
    if ((Boss.cash - Settings.property_reserve) < (prop.cost * 10)) {
      var timer = new Utility.timer({
        script: 'property',
        message: 'Re-checking for ' + Utility.int_dollars(prop.cost * 10) + ' to buy a ' + prop.name + ' in [[time]]...',
        time: 180,
        fn: function() {
          Property.log('Re-checking Boss\'s cash balance');
          if (Property.running === false) {
            return;
          };
          if (Page.pausing === true) {
            Page.pause_cb(function() {
              Property.update_list();
              return;
            });
            return;
          };
          Ajax(Page.domain + '/mobwars/city/', function(xhr) {
            Page.captcha(xhr.responseText);
            if (Property.running === false) {
              return;
            };
            if (Page.pausing === true) {
              Page.pause_cb(function() {
                Property.update_list();
                return;
              });
              return;
            };
            Boss.update(xhr.responseText);
            Property.update_list(xhr.responseText);
            return;
          });
          return;
        }
      });
      timer.start();
      return;
    }
    if (updating) {
      return;
    }
    Property.log('Stat checks complete');
    var wait = Page.wait();
    Property.log('Buying 10 ' + prop.name);
    var timer = new Utility.timer({
      script: 'property',
      message: 'Proceeding to buy 10 ' + prop.name + ' in [[time]]...',
      time: wait,
      fn: function() {
        if (Property.running === false) {
          return;
        };
        Property.buy();
        return;
      }
    });
    timer.start();
    return;
  },
  buy: function() {
    var prop = Property.prop;
    Ajax(Page.domain + '/mobwars/city/do.php?action=buy&qty=10&item=' + prop.id, function(xhr) {
      Property.count++;
      Page.captcha(xhr.responseText);
      if (Property.running === false) {
        return;
      };
      if (Page.pausing === true) {
        Page.pause_cb(function() {
          Property.update_list();
          return;
        });
        return;
      };
      Boss.update(xhr.responseText);
      Task.announce(xhr.responseText);
      Property.update_list(xhr.responseText);
      return;
    },
    'POST');
    return;
  }
};
Modules.push( "Defend" );
var Defend = {
  count: 0,
  running: false,
  chain_previous: '',
  log: function(action) {
    var log = [{
      name: 'Script',
      value: 'Defend'
    },
    {
      name: 'Action',
      value: action
    }];
    Console.log(log);
    Console.status('defend', action);
    return;
  },
  init: function(resume) {
    Defend.count = 0;
    if (resume) {
      if (Fight.running === false) return;
    }
    Defend.running = true;
    Defend.individual = false;
    Defend.log('Initiating Defend Automation');
    Ajax(Page.domain + '/mobwars/', function(xhr) {
      Page.captcha(xhr.responseText);
      if (Page.pausing === true) {
        Page.pause_cb(function() {
          Defend.init(true);
          return;
        });
        return;
      };
      Boss.update(xhr.responseText);
      Defend.chain_previous = Task.chain_check( xhr.responseText ).toSource();
      Defend.check_stats( xhr.responseText );
    });
  },
  refresh: function() {
    if (Defend.running === false) {
      return;
    };
    if (Page.pausing === true) {
      Page.pause_cb(function() {
        Defend.refresh();
        return;
      });
      return;
    };
    if (Defend.count >= Settings.script_repeat && -1 != Settings.script_repeat) {
      Page.toggle('defend');
      return;
    }
    Ajax(Page.domain + '/mobwars/', function(xhr) {
      Page.captcha(xhr.responseText);
      if (Page.pausing === true) {
        Page.pause_cb(function() {
          Defend.refresh();
          return;
        });
        return;
      };
      Boss.update(xhr.responseText);
      Defend.check_stats( xhr.responseText );
    });
  },
  check_stats: function( html ) {
    if (Defend.running === false) {
      return;
    };
    if (Page.pausing === true) {
      Page.pause_cb(function() {
        Defend.refresh();
        return;
      });
      return;
    };
    Defend.log('Checking Boss\'s Stats');
    var updating = false;
    Defend.count++;
    if (Boss.cash >= Settings.bank_limit && Settings.bank && Cache.banking === false) {
      Defend.log('Banking ' + Utility.int_dollars(Boss.cash));
      Task.bank(Defend.refresh);
      updating = true;
    }
    if (Boss.health <= Settings.min_health && Settings.heal && Cache.healing === false) {
      Defend.log('Healing your Boss');
      Task.heal(Defend.refresh);
      updating = true;
    }
    if ( Settings.defend_chain ) {
      var chain = Task.chain_check( html ).toSource();
      if ( chain !== Defend.chain_previous ) {
        Defend.chain_previous = chain;
        Page.pausing = true;
        var timer = new Utility.timer({
          time: Settings.defend_dead_wait * 60,
          message: 'Playing dead for [[time]]...',
          script: 'defend',
          fn: function() {
            Page.resume();
			Ajax( Page.domain + '/mobwars/', function( xhr ) {
				Page.captcha(xhr.responseText);
				if (Page.pausing === true) {
					Page.pause_cb(function() {
						Defend.refresh();
					})
					return;
				}
				Defend.chain_previous = Task.chain_check( xhr.responseText ).toSource();
            	Defend.refresh();
			});
          }
        });
        timer.start();
        updating = true;
      }
    }
    if (updating) {
      Defend.list = null;
      return;
    }
    Defend.log('Stat checks complete');
    var timer = new Utility.timer({
      time: Settings.defend_time,
      message: 'Checking stats again in [[time]]...',
      script: 'defend',
      fn: function() {
        Defend.refresh();
        return;
      }
    });
    timer.start();
    return;
  }
};
for (var i = Modules.length - 1; i >= 0; i--)
  this[Modules[i]] = {};
window.addEventListener('unload', function() {
  Settings.log_memory = Log.memory;
  Preferences.save();
}, false);

updateCheck(false);

// Avoid initiation if we don't have body
if ( document.body )
  Page.init();
