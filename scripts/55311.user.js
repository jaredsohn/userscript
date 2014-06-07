// ==UserScript==
// @name           y
// @namespace      y
// @description    Rock Legend
// @include        http://apps.facebook.com/rock_legends/*
// ==/UserScript==
function a36105078640_ajax_dialog(a36105078640_title, a36105078640_url, a36105078640_button, a36105078640_callback) {
  a36105078640_spinner();
  var a36105078640_dialog = a36105078640_ajax_dialog.last_dialog = new a36105078640_Dialog(a36105078640_Dialog.DIALOG_POP);
  a36105078640_dialog.setStyle("width", "590px");
  a36105078640_dialog.onconfirm = a36105078640_callback;
  
  var a36105078640_ajax = new a36105078640_Ajax();
  a36105078640_ajax.responseType = a36105078640_Ajax.FBML;
  a36105078640_ajax.ondone = function(a36105078640_data) {
    a36105078640_spinner(function() {
      a36105078640_dialog.showMessage(a36105078640_title, a36105078640_data, (a36105078640_button || 'Cancel'));
    });
  }
  a36105078640_ajax.requireLogin = true;
  a36105078640_ajax.post(a36105078640_url);
  return false; 
}

//
function a36105078640_submit_form(a36105078640_form_id) {
  a36105078640_document.getElementById(a36105078640_form_id).submit();
}

function a36105078640_dialog(a36105078640_title, a36105078640_content, a36105078640_button) {
  var a36105078640_dialog = new a36105078640_Dialog(a36105078640_Dialog.DIALOG_POP);
  a36105078640_dialog.setStyle("width", "590px");
  a36105078640_dialog.showMessage(a36105078640_title, a36105078640_content, a36105078640_button);
}

function a36105078640_showWorldMap() {
  if (a36105078640_$('#map').css('display') == 'hidden' || a36105078640_$('#map').css('display') == 'none') {
    a36105078640_$('#location_div').slideToggle(200, function() { a36105078640_$('#map').slideToggle(400); });
  } else {
    a36105078640_$('#map').slideToggle(400, function() { a36105078640_$('#location_div').slideToggle(200); });
  }
}

function a36105078640_CountdownTimer(a36105078640_selector) {
  $FBJS.ref(this).root = a36105078640_$(a36105078640_selector);
  $FBJS.ref(this).interval = null;
  $FBJS.ref(this).outlet = $FBJS.ref(this).root.find('.time');
  $FBJS.ref(this).setSecondsLeft( a36105078640_parseInt($FBJS.ref(this).root.attr('title')) );

  if ( a36105078640_CountdownTimer.current ) a36105078640_CountdownTimer.current.clearInterval();
  a36105078640_CountdownTimer.current = $FBJS.ref(this);
}

a36105078640_CountdownTimer.prototype = {
  updater: function() {
    $FBJS.ref(this).secondsLeft--;
    if ( $FBJS.ref(this).secondsLeft > 0 ) {
      $FBJS.ref(this).root.css('display', 'block');
      $FBJS.ref(this).outlet.text(a36105078640_rounded_time_in_words($FBJS.ref(this).secondsLeft));

    } else {
      $FBJS.ref(this).clearInterval();
      $FBJS.ref(this).root.text('refresh for points');
    }
  },

  clearInterval: function() {
    if ( $FBJS.ref(this).interval != null ) a36105078640_clearInterval($FBJS.ref(this).interval);
    $FBJS.ref(this).interval = null;
  },

  setSecondsLeft: function(a36105078640_secs) {
    $FBJS.ref(this).secondsLeft = a36105078640_secs;
    $FBJS.ref(this).clearInterval();

    if ( $FBJS.ref(this).secondsLeft > 0 ) {
      var a36105078640_self = $FBJS.ref(this);
      $FBJS.ref(this).interval = a36105078640_setInterval(function(){a36105078640_self.updater();}, 1000);
    }
  }
};

function a36105078640_select_venue(a36105078640_id) {
  a36105078640_$('#venues').find('.venue').removeClass('selected');
  a36105078640_$('#venue_id').val(a36105078640_id);
  a36105078640_$('#venue_' + a36105078640_id).addClass('selected');
  
  return false;
}

function a36105078640_visible(a36105078640_elem) {
  var a36105078640_jElem = a36105078640_$(a36105078640_elem);
  return !(a36105078640_jElem.css('display') == 'hidden' || a36105078640_jElem.css('display') == 'none')
}

function a36105078640_spinner(a36105078640_callback) {
  var a36105078640_the_spinner;
  if (a36105078640_$('#spinner').length == 0) {
    a36105078640_the_spinner = a36105078640_$(a36105078640_document.createElement('img')).attr('src', a36105078640_AssetHost + '/images/spinner_transp.gif').attr('id', 'spinner').css({"display":"none", "position": "absolute", "top": "200px", "left": "400px"});
    a36105078640_$('#content')[$FBJS.idx(0)].appendChild(a36105078640_the_spinner[$FBJS.idx(0)]);
  } else {
    a36105078640_the_spinner = a36105078640_$('#spinner');
  }
  
  if (a36105078640_the_spinner.css('display') == 'hidden' || a36105078640_the_spinner.css('display') == 'none') {
    a36105078640_the_spinner.fadeIn(200, a36105078640_callback);
  } else {
    a36105078640_the_spinner.fadeOut(200, a36105078640_callback);
  }
}

var a36105078640_AjaxForm = function(a36105078640_form) {
  $FBJS.ref(this).form = a36105078640_$(a36105078640_form);
};
a36105078640_AjaxForm.prototype = {
  ajaxify: function() {
    $FBJS.ref(this).form.bind('submit', $FBJS.ref(this).ajaxSubmitHandler.bind($FBJS.ref(this)));
  },
  ajaxSubmitHandler: function(a36105078640_responseType, a36105078640_callback) {
    var a36105078640_ajax = new a36105078640_Ajax();
    a36105078640_ajax.responseType = a36105078640_responseType || a36105078640_Ajax.FBML;
    a36105078640_ajax.requireLogin = true;
    
    var a36105078640_that = $FBJS.ref(this);
    
    a36105078640_ajax.ondone = function(a36105078640_data) {
      a36105078640_callback(a36105078640_data);
    };
    
    a36105078640_ajax.onerror = function() {
      new a36105078640_Dialog().showMessage("An error occurred, please skip this step for now.");
    };
    
    a36105078640_ajax.post(
      a36105078640_rewriteUrl($FBJS.ref(this).form.attr("action"), a36105078640_AssetHost),
      $FBJS.ref(this).form[$FBJS.idx(0)].serialize()
    );
    
    return false;
  }
};

      
var a36105078640_ContractLock = function(a36105078640_lock_link) {
  $FBJS.ref(this).link = a36105078640_$(a36105078640_lock_link);
  $FBJS.ref(this).isLocked = $FBJS.ref(this).link.parent().hasClass('locked');
};
a36105078640_ContractLock.prototype = {
  ajaxify: function() {
    $FBJS.ref(this).link.bind('click', $FBJS.ref(this).toggleContract.bind($FBJS.ref(this)));
  },
  toggleContract: function() {
    if ($FBJS.ref(this).isLocked)
      $FBJS.ref(this).unlockContract();
    else
      $FBJS.ref(this).lockContract();
    return false;
  },
  lockContract: function() {
    var a36105078640_d = new a36105078640_Dialog(a36105078640_Dialog.DIALOG_CONTEXTUAL).setContext($FBJS.ref(this).link[$FBJS.idx(0)]);
    a36105078640_d.onconfirm =function() {
      $FBJS.ref(this).link.text('Click to unlock');
      (new a36105078640_Ajax({"requireLogin": true})).post(a36105078640_rewriteUrl($FBJS.ref(this).link.attr('href'), a36105078640_AssetHost));
      $FBJS.ref(this).link.parent().removeClass('unlocked').addClass('locked')
      $FBJS.ref(this).isLocked = true;
      $FBJS.ref(this).highlightChange();
    }.bind($FBJS.ref(this));
    a36105078640_d.showChoice('Lock Your Contract?', "Do you want to lock your contract?  Once you lock it, you will not be recruited again until you unlock it.", 'Lock It')
  },
  unlockContract: function() {
    var a36105078640_d = new a36105078640_Dialog(a36105078640_Dialog.DIALOG_CONTEXTUAL).setContext($FBJS.ref(this).link[$FBJS.idx(0)]);
    a36105078640_d.onconfirm =function() {
      $FBJS.ref(this).link.text('Click to lock');
      (new a36105078640_Ajax({"requireLogin": true})).post(a36105078640_rewriteUrl($FBJS.ref(this).link.attr('href'), a36105078640_AssetHost));
      $FBJS.ref(this).link.parent().removeClass('locked').addClass('unlocked')
      $FBJS.ref(this).isLocked = false;
      $FBJS.ref(this).highlightChange();
    }.bind($FBJS.ref(this));
    a36105078640_d.showChoice('Unlock Your Contract?', "Do you want to unlock your contract? It will be possible to be recruited again if you unlock it", 'Unlock It')
  },
  highlightChange: function() {
    var a36105078640_that = $FBJS.ref(this);
    $FBJS.ref(this).link.parent().animate({"backgroundColor":"#ffff66"}, {
      "complete": function() {
        a36105078640_that.link.parent().animate({"background-color": "#ffffff"}, 800)
      }, "duration": 200
    })
  }
};

function a36105078640_commaize(a36105078640_number){
  return a36105078640_number.toString().replace((new a36105078640_RegExp('(\\d)(?=(\\d{3})+$)','g')), "$1,");
}

var a36105078640_User = function(a36105078640_energy, a36105078640_cash, a36105078640_experience) {
  $FBJS.ref(this).energy = {
    "counter": a36105078640_$('#action_points .energy_points .points'),
    "value": 999
  }
  a36105078640_energy;
  $FBJS.ref(this).cash = {
    "counter": a36105078640_$('#cash_money'),
    "value": 999
  }
  $FBJS.ref(this).experience = {
    "value": a36105078640_experience,
    "barWidth": 163,
    "bar": a36105078640_$('.fame_bar_progress'),
    "counter": a36105078640_$('.fame_bar .fame_value')
  }
};
a36105078640_User.prototype = {
  set: function(a36105078640_data, a36105078640_callback) {
    $FBJS.ref(this).setEnergy.apply($FBJS.ref(this), a36105078640_data[$FBJS.idx("energy")])
    $FBJS.ref(this).setExperience.apply($FBJS.ref(this), a36105078640_data[$FBJS.idx("experience")])
    $FBJS.ref(this).setCash.call($FBJS.ref(this), a36105078640_data[$FBJS.idx("cash")])
  },
  setEnergy: function(a36105078640_absoluteValue, a36105078640_secondsLeft, a36105078640_callback) {
    if (a36105078640_absoluteValue != null && a36105078640_absoluteValue < $FBJS.ref(this).energy.value) {
      $FBJS.ref(this).rollCounter($FBJS.ref(this).energy.counter, $FBJS.ref(this).energy.value, a36105078640_absoluteValue, true);
      $FBJS.ref(this).energy.value = a36105078640_absoluteValue;
    }
    a36105078640_CountdownTimer.current.setSecondsLeft(a36105078640_parseInt(a36105078640_secondsLeft));
  },
  
  setCash: function(a36105078640_absoluteValue) {
    if (a36105078640_absoluteValue > $FBJS.ref(this).cash.value) {
      $FBJS.ref(this).rollCounter($FBJS.ref(this).cash.counter, $FBJS.ref(this).cash.value, a36105078640_absoluteValue);
      $FBJS.ref(this).cash.value = a36105078640_absoluteValue;
    }
  },
  
  setExperience: function(a36105078640_percentIncrease, a36105078640_absoluteValue, a36105078640_callback) {
    try {
      if (a36105078640_percentIncrease != null) {
        a36105078640_Animation($FBJS.ref(this).experience.bar[$FBJS.idx(0)]).to('width', a36105078640_Math.round(a36105078640_percentIncrease * $FBJS.ref(this).experience.barWidth) + "px").ease(a36105078640_Animation.ease.end).duration(250).checkpoint(1, a36105078640_callback).go()
      } else {
        a36105078640_callback()
      }
      if (a36105078640_absoluteValue != null && a36105078640_absoluteValue > $FBJS.ref(this).experience.value) {
        $FBJS.ref(this).rollCounter($FBJS.ref(this).experience.counter, $FBJS.ref(this).experience.value, a36105078640_absoluteValue, true);
        $FBJS.ref(this).experience.value = a36105078640_absoluteValue;
      }
    } catch(a36105078640_exception) {
      a36105078640_callback()
    }
  },
  
  ding: function(a36105078640_absoluteValue, a36105078640_callback) {
    try {
      a36105078640_Animation($FBJS.ref(this).experience.bar[$FBJS.idx(0)]).to('width', $FBJS.ref(this).experience.barWidth + "px").ease(a36105078640_Animation.ease.end).duration(250).checkpoint(1, a36105078640_callback).go()
      $FBJS.ref(this).rollCounter($FBJS.ref(this).experience.counter, $FBJS.ref(this).experience.value, a36105078640_absoluteValue, true);
      $FBJS.ref(this).experience.value = a36105078640_absoluteValue;
    } catch(a36105078640_exception) {
      a36105078640_callback();
    }
  },
  
  rollCounter: function(a36105078640_counter, a36105078640_old_total, a36105078640_new_total, a36105078640_skipPuff) {
    var a36105078640_decrement = (a36105078640_old_total > a36105078640_new_total);
    
    var a36105078640_awarded = a36105078640_new_total - a36105078640_old_total;
    var a36105078640_increment_by = a36105078640_awarded/27;

    var a36105078640_current_amount = a36105078640_old_total;
    
    var a36105078640_incrementer = function() {
      if (a36105078640_current_amount < a36105078640_new_total) {
        a36105078640_current_amount = a36105078640_Math.ceil(a36105078640_current_amount + a36105078640_increment_by);
        if (a36105078640_current_amount > a36105078640_new_total) {
          a36105078640_current_amount = a36105078640_new_total;
        }
        a36105078640_counter.text(a36105078640_commaize(a36105078640_current_amount));
        a36105078640_setTimeout(a36105078640_incrementer.bind($FBJS.ref(this)), 1);
      }
    }
    var a36105078640_decrementer = function() {
      if (a36105078640_current_amount > a36105078640_new_total) {
        a36105078640_current_amount = a36105078640_Math.floor(a36105078640_current_amount + a36105078640_increment_by);
        if (a36105078640_current_amount < a36105078640_new_total) {
          a36105078640_current_amount = a36105078640_new_total;
        }
        a36105078640_counter.text(a36105078640_commaize(a36105078640_current_amount));
        a36105078640_setTimeout(a36105078640_decrementer.bind($FBJS.ref(this)), 1);
      }
    }
    if (!a36105078640_skipPuff) {
      var a36105078640_puff = a36105078640_document.createElement('div');
      a36105078640_puff = a36105078640_$(a36105078640_puff);
      a36105078640_puff.addClass('puff');
      a36105078640_puff.text(a36105078640_awarded);
      a36105078640_counter.parent().append(a36105078640_puff);
      a36105078640_puff.animate({top: -20, opacity: 0}, 1400);
    }
    if (a36105078640_decrement) 
      a36105078640_decrementer.bind(a36105078640_decrementer).call();
    else
      a36105078640_incrementer.bind(a36105078640_incrementer).call();
  }
};

a36105078640_ItemPaginator = function(a36105078640_container) {
  $FBJS.ref(this).container = a36105078640_$(a36105078640_container);
  $FBJS.ref(this).pages = a36105078640_$(".page", $FBJS.ref(this).container);
  $FBJS.ref(this).current_page = 0;
  
  $FBJS.ref(this).generateAppleDots();
  
  $FBJS.ref(this).go(0);
};

a36105078640_ItemPaginator.prototype = {
  next: function() {
    $FBJS.ref(this).go(1);
  },
  
  previous: function() {
    $FBJS.ref(this).go(-1);
  },
  
  generateAppleDots: function() {
    var a36105078640_dot_container = a36105078640_$(".dots", $FBJS.ref(this).container);
    $FBJS.ref(this).dots = [];
    
    for(var a36105078640_i = 0; a36105078640_i < $FBJS.ref(this).pages.length; a36105078640_i++) {
      var a36105078640_dot = a36105078640_document.createElement("span");
      a36105078640_dot.setClassName("dot");
      a36105078640_dot.setTextValue(" ");
      a36105078640_dot_container.append(a36105078640_dot);
    }
    a36105078640_dot_container.css({
      width: ($FBJS.ref(this).pages.length * 10) + "px",
      height: "5px",
      margin: "0px auto"
    });
    
    $FBJS.ref(this).dots = a36105078640_$(".dot", a36105078640_dot_container);
  },
  
  go: function(a36105078640_direction) {
    var a36105078640_page_num = $FBJS.ref(this).current_page + a36105078640_direction;
    $FBJS.ref(this).getPageFor($FBJS.ref(this).current_page).hide();
    $FBJS.ref(this).getPageFor(a36105078640_page_num).show();

    //
    $FBJS.ref(this).dots.removeClass("active_dot");
    a36105078640_$($FBJS.ref(this).dots.get($FBJS.ref(this).getPageNumFor(a36105078640_page_num))).addClass("active_dot");
    
    $FBJS.ref(this).current_page += a36105078640_direction;
  },
  
  getPageFor: function(a36105078640_num) {
    var a36105078640_page = $FBJS.ref(this).pages.get($FBJS.ref(this).getPageNumFor(a36105078640_num));
    return a36105078640_page ? a36105078640_$(a36105078640_page) : null;
  },
  
  getPageNumFor: function(a36105078640_num) {
    return $FBJS.ref(this).mod(a36105078640_num, $FBJS.ref(this).pages.length);
  },
  
  //
  mod: function(a36105078640_X, a36105078640_Y) {
    return a36105078640_X - a36105078640_Math.floor(a36105078640_X / a36105078640_Y) * a36105078640_Y;
  }
};

a36105078640_HoverMonitor = {
  mouseOut: function(a36105078640_elem) {
    a36105078640_elem = a36105078640_$(a36105078640_elem);
    a36105078640_HoverMonitor.showing.remove(a36105078640_elem.attr('id'));
    a36105078640_setTimeout(function() {
      if (a36105078640_HoverMonitor.showing.indexOf(a36105078640_elem.attr('id')) == -1) {
        a36105078640_elem.next('.transparent_back').animate({top: '116px'}, 100, 'swing');
      }
    }, 200);
  }, 
  mouseIn: function(a36105078640_elem) {
    a36105078640_elem = a36105078640_$(a36105078640_elem);
    if (a36105078640_HoverMonitor.showing.indexOf(a36105078640_elem.attr('id')) != -1) { return; }
    a36105078640_elem.next('.transparent_back').animate({top: '15px'}, 100, 'swing');
    a36105078640_HoverMonitor.showing.push(a36105078640_elem.attr('id'));
  },
  showing: []
};

a36105078640_ItemPopupMonitor = {
  showBubble: function(a36105078640_elem) {
    a36105078640_elem = a36105078640_$(a36105078640_elem);
   
    a36105078640_ItemPopupMonitor.bubbles = a36105078640_ItemPopupMonitor.bubbles || a36105078640_$(".bundle_bubble");
    a36105078640_ItemPopupMonitor.bubbles.hide();
    
    var a36105078640_bubble_id = a36105078640_elem.attr('id').replace("_bubble_monitor", "_bubble");
    a36105078640_$("#" + a36105078640_bubble_id).fadeIn(200);
  },
  click: function(a36105078640_elem, a36105078640_event) {
    a36105078640_event.stopPropagation();
    $FBJS.ref(this).showBubble(a36105078640_elem);
  }
};



if (window.Bootloader) { Bootloader.done(["http:\/\/apps.facebook.com\/fbml_static_get.php?src=http%3A%2F%2F67.228.233.110%2F%2Fjavascripts%2Fapplication.js%3F1249720914&appid=36105078640&pv=1&sig=5dbed73dd2739fb376b6e61204902ca0&filetype=js"]); }