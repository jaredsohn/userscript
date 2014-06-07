// ==UserScript==
// @name          GerKiN Library
// @namespace     http://duality-studios.ca
// @description   Makes the GerKiN Library available to other scripts
// @require       http://userscripts.org/scripts/source/159638.user.js
// ==/UserScript==

function GerKiN($) {

  function filter(array, memberFn) {
    var ret = [];
    $.each(array, function() {
      if (memberFn(this)) {
        ret.push(this);
      }
    });
    return ret;
  };

  function giveFocus(focusOn) {
    if(focusOn.type == 'focus') {
      focusOn = $(focusOn.currentTarget);
    }
    var hadFocus = $('.hasFocus')
    hadFocus.removeClass('hasFocus');
	focusOn.addClass('hasFocus');
	hadFocus.off('focus', giveFocus);
    focusOn.off('focus', giveFocus);
	hadFocus.blur();
    if(focusOn[0] == hadFocus[0] || (focusOn[0].nodeName != 'TEXTAREA' && focusOn[0].nodeName != 'INPUT')) {
        focusOn.focus();
	}
	focusOn.on('focus', giveFocus);
	hadFocus.on('focus', giveFocus);
  };

  function getHorizontalCenter(e) {
    var gpos = e.data('GerKiN_Pos');
    if (gpos == undefined) {
      return e.offset().left + (e.width() / 2);
    } else {
      return gpos.x;
    }
  }
  function getVerticalCenter(e) {
    var gpos = e.data('GerKiN_Pos');
    if (gpos == undefined) {
      return e.offset().top + (e.height() / 2);
    } else {
      return gpos.y;
    }
  }
  function getLeft(e) {
    var gpos = e.data('GerKiN_Pos');
    if (gpos == undefined) {
      return e.offset().left;
    } else {
      return gpos.x;
    }
  }
  function getTop(e) {
    var gpos = e.data('GerKiN_Pos');
    if (gpos == undefined) {
      return e.offset().top;
    } else {
      return gpos.y;
    }
  }

  var getXPos = getLeft;
  var getYPos = getTop;
  function getPosition(e) {
    return {
      x : getXPos(e),
      y : getYPos(e)
    };
  };

  return {
    keys : {
      'tab' : 9,
      'w' : 87,
      's' : 83,
      'd' : 68,
      'a' : 65
    },

    navigate_with_keyboard : function(settings) {
      var g = this;
      if (typeof (settings.auto_apply_targeting) === 'function') {
        var targets = settings.auto_apply_targeting();
        targets.addClass(settings.target_class);
      }

      var selector = '.' + settings.target_class;

      function handleNav(nav) {
        return function(e) {
          var code = e.keyCode || e.which;
		  var has = $('.hasFocus')[0];
		  var isFocused = document.activeElement == has;
		  if (e.shiftKey && !(isFocused && (has.nodeName == 'INPUT' || has.nodeName == 'TEXTAREA'))) {
            if (code == g.keys.d) {
              nav.right();
            } else if (code == g.keys.a) {
              nav.left();
            } else if (code == g.keys.w) {
              nav.up();
            } else if (code == g.keys.s) {
              nav.down();
            }
            e.stopPropagation();
          }
        }
      }

      var handler;
      function init() {
        var ret;

        var first = $('.hasFocus');
        if (first.length != 1) {
          first = $('.target-first');
        }

        if (settings.strategy == "flow tree") {
          ret = g.newFlowStructure(selector, first);
        } else if (settings.strategy == "spacial nav") {
          ret = g.newSpacialNav(selector, first);
        } else {
          ret = g.newSpacialNav(selector, first);
        }
        handler = handleNav(ret);
        //$(selector).on('keypress', handler);
		$(document).on('keypress', handler);

        return ret;
      }

      
      var fs = init();
      $('*').focus(giveFocus);
      
      return {
        reset : function() {
          //$(selector).off('keypress', handler);
		  $(document).off('keypress', handler);
		  fs.dispose();
          $('.target-first').removeClass('target-first');
          var current = $('hasFocus');
          current.addClass('target-first');
          current.removeClass('hasFocus');
          fs = init();
        }
      }
    },

    newSpacialNav : function(selector, startingTarget) {
      var targets = $.map($(selector), function(x, i) {
        return $(x);
      });

      var findBestChoice = function(target, choices) {
        var bias = 4;
        var coneBias = 1; // 1 = 90 degree cone, 0 == 180 degree screen
                          // partition, 2 == 45 degree cone, 4 == 22 degree cone
                          // ???

        var selfPos = getPosition(target);

        function selectMinFrom(set, valFn) {
          if (set.length == 0) {
            return target;
          } else {
            var best;
            var bestScore = null;

            $.each(set, function() {
              var score = valFn(this);
              if (bestScore == null || score < bestScore) {
                bestScore = score;
                best = this;
              }
            });
            return best;
          }
        }

        function VDistance(other) {
          var oPos = getPosition(other);
          var ret = Math.abs(selfPos.y - oPos.y);
          return ret;
        };

        function HDistance(other) {
          var oPos = getPosition(other);
          var ret = Math.abs(selfPos.x - oPos.x);
          return ret;
        };

        function verticalBiasedDistance(other) {
          var ret = Math.sqrt(Math.pow(HDistance(other), 2)
              + Math.pow(VDistance(other) / bias, 2));
          return ret;
        };

        function horizontalBiasedDistance(other) {
          var ret = Math.sqrt(Math.pow(HDistance(other) / bias, 2)
              + Math.pow(VDistance(other), 2));
          return ret;
        };

        return function() {
          var above = filter(choices, function(e) {
            var pos = getPosition(e);
            return pos.y < selfPos.y
                && (coneBias * VDistance(e)) > HDistance(e);
          });
          var upward = selectMinFrom(above, verticalBiasedDistance);

          var below = filter(choices, function(e) {
            var pos = getPosition(e);
            return pos.y > selfPos.y
                && (coneBias * VDistance(e)) >= HDistance(e);
          });
          var downward = selectMinFrom(below, verticalBiasedDistance);

          var leftOf = filter(choices, function(e) {
            var pos = getPosition(e);
            return pos.x < selfPos.x
                && (coneBias * HDistance(e)) >= VDistance(e);
          });
          var toLeft = selectMinFrom(leftOf, horizontalBiasedDistance);

          var rightOf = filter(choices, function(e) {
            var pos = getPosition(e);
            return pos.x > selfPos.x
                && (coneBias * HDistance(e)) >= VDistance(e);
          });
          var toRight = selectMinFrom(rightOf, horizontalBiasedDistance);

          return [upward, toRight, downward, toLeft];
        };
      };

      $.each(targets, function(z) {
        this.data('GerKiN_finder', findBestChoice(this, targets));
        this.data('GerKiN_Pos', {
          x : getXPos(this),
          y : getYPos(this),
        });
      });

      function currentsMoveToLinks() {
        var current = $('.hasFocus');
        var moveToLinks = current.data('GerKiN_moveToLinks');
        if (moveToLinks == undefined) {
          moveToLinks = current.data('GerKiN_finder')();
          current.data('GerKiN_moveToLinks', moveToLinks);
        }
        return moveToLinks;
      };

      giveFocus(startingTarget);
      return {
        up : function() {
          console.log("spacial nav up.");
          giveFocus(currentsMoveToLinks()[0]);
        },
        down : function() {
          console.log("spacial nav down.");
          giveFocus(currentsMoveToLinks()[2]);
        },
        left : function() {
          console.log("spacial nav left.");
          giveFocus(currentsMoveToLinks()[3]);
        },
        right : function() {
          console.log("spacial nav right.");
          giveFocus(currentsMoveToLinks()[1]);
        },
        dispose : function() {
          $.each(targets, function(z) {
            this.data('GerKiN_moveToLinks', undefined);
            this.data('GerKiN_Pos', undefined);
          });
        }
      };
    },

    newFlowStructure : function(selector, startingTarget) {

      // var matching = $(selector);
      var childHistory = [];
      var current = undefined;

      var newNode = function(_node, _parent) {
        var flowNode = {
          node : $(_node),
          parent : _parent,
          nextSibling : undefined,
          prevSibling : undefined,
          children : undefined,
          giveFocus : function() {
            $('.hasFocus').removeClass('hasFocus');
            this.node.addClass('hasFocus');
            this.node.focus();
          },
          setNext : function(node) {
            this.nextSibling = node;
          },
          setPrev : function(node) {
            this.prevSibling = node;
          },
          is : function(elem) {
            return node.is($(elem));
          }
        };

        var children = (function() {
          var ret = [];
          var toSearch = [];
          // initialize search candidates
          var childes = flowNode.node.children();
          for ( var i = 0; i < childes.size(); i++) {
            toSearch.push(childes[i]);
          }
          // do a BFS
          while (toSearch.length > 0) {
            var lookAt = $(toSearch.shift());
            if (lookAt.is(selector)) {
              ret.push(newNode(lookAt, flowNode));
            } else {
              var childes = lookAt.children();
              for ( var i = 0; i < childes.size(); i++) {
                toSearch.push(childes[i]);
              }
            }
          }
          return ret;
        })();
        for ( var i = 0; i < children.length; i++) {
          var next = (i < children.length - 1) ? children[i + 1] : children[0];
          var prev = (i == 0) ? children[children.length - 1] : children[i - 1];
          children[i].setNext(next);
          children[i].setPrev(prev);
        }

        flowNode.children = children;
        if (current === undefined) {
          if (flowNode.node.is(startingTarget)) {
            flowNode.giveFocus();
            current = flowNode;
          }
        }
        return flowNode;
      }

      var root = newNode('body', undefined);
      if (current === undefined)
        current = root;
      current.giveFocus();

      return {
        'root' : root,
        right : function() {
          childHistory = [];
          current = current.nextSibling;
          current.giveFocus();
        },
        left : function() {
          childHistory = [];
          current = current.prevSibling;
          current.giveFocus();
        },
        up : function() {
          if (current.parent !== undefined) {
            childHistory.push(current);
            current = current.parent;
          }
          current.giveFocus();
        },
        down : function() {
          if (current.children.length > 0) {
            if (childHistory.length > 0) {
              current = childHistory.pop();
            } else {
              current = current.children[0];
            }
            current.giveFocus();
          }
        }
      };
    }
  };
};

var gerkin = undefined;
if ($ != undefined) {
  gerkin = GerKiN($);
}
