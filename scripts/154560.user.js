// ==UserScript==
// @name           Neige sur JVC
// @namespace       Neige
// @description		De la neige qui tombe sur le site !
// @version			1
// @include         http://www.jeuxvideo.com/*
// @include         http://*.forumjv.com/*
// ==/UserScript==

var snowStorm = (function(window, document) {

  // --- Propriété ---

  this.autoStart = true;          
  this.flakesMax = 128;           
  this.flakesMaxActive = 100;      
  this.animationInterval = 33;    
  this.excludeMobile = true;      
  this.flakeBottom = null;        
  this.followMouse = true;        
  this.snowColor = '#fff';        
  this.snowCharacter = '&bull;';  
  this.snowStick = true;          
  this.targetElement = null;      
  this.useMeltEffect = true;      
  this.useTwinkleEffect = false;  
  this.usePositionFixed = false;  

  // --- Ce qu'on utilise le moins ---

  this.freezeOnBlur = true;       
  this.flakeLeftOffset = 0;       
  this.flakeRightOffset = 0;      
  this.flakeWidth = 8;            
  this.flakeHeight = 8;           
  this.vMaxX = 5;                 
  this.vMaxY = 4;                 
  this.zIndex = 0;                

  // --- Fin de la section de l'utilisateur ---

  var s = this, storm = this, i,
  // UA
  isIE = navigator.userAgent.match(/msie/i),
  isIE6 = navigator.userAgent.match(/msie 6/i),
  isWin98 = navigator.appVersion.match(/windows 98/i),
  isMobile = navigator.userAgent.match(/mobile|opera m(ob|in)/i),
  isBackCompatIE = (isIE && document.compatMode === 'BackCompat'),
  noFixed = (isMobile || isBackCompatIE || isIE6),
  screenX = null, screenX2 = null, screenY = null, scrollY = null, vRndX = null, vRndY = null,
  windOffset = 1,
  windMultiplier = 2,
  flakeTypes = 6,
  fixedForEverything = false,
  opacitySupported = (function(){
    try {
      document.createElement('div').style.opacity = '0.5';
    } catch(e) {
      return false;
    }
    return true;
  }()),
  didInit = false,
  docFrag = document.createDocumentFragment();

  this.timers = [];
  this.flakes = [];
  this.disabled = false;
  this.active = false;
  this.meltFrameCount = 20;
  this.meltFrames = [];

  this.events = (function() {

    var old = (!window.addEventListener && window.attachEvent), slice = Array.prototype.slice,
    evt = {
      add: (old?'attachEvent':'addEventListener'),
      remove: (old?'detachEvent':'removeEventListener')
    };

    function getArgs(oArgs) {
      var args = slice.call(oArgs), len = args.length;
      if (old) {
        args[1] = 'on' + args[1]; // prefixe
        if (len > 3) {
          args.pop(); // pas de capture
        }
      } else if (len === 3) {
        args.push(false);

      }
      return args;
    }

    function apply(args, sType) {
      var element = args.shift(),
          method = [evt[sType]];
      if (old) {
        element[method](args[0], args[1]);
      } else {
        element[method].apply(element, args);
      }
    }

    function addEvent() {
      apply(getArgs(arguments), 'add');
    }

    function removeEvent() {
      apply(getArgs(arguments), 'remove');
    }

    return {
      add: addEvent,
      remove: removeEvent
    };

  }());

  function rnd(n,min) {
    if (isNaN(min)) {
      min = 0;
    }
    return (Math.random()*n)+min;
  }

  function plusMinus(n) {
    return (parseInt(rnd(2),10)===1?n*-1:n);
  }

  this.randomizeWind = function() {
    var i;
    vRndX = plusMinus(rnd(s.vMaxX,0.2));
    vRndY = rnd(s.vMaxY,0.2);
    if (this.flakes) {
      for (i=0; i<this.flakes.length; i++) {
        if (this.flakes[i].active) {
          this.flakes[i].setVelocities();
        }
      }
    }
  };

  this.scrollHandler = function() {
    var i;
    // "attacher" les flocons de neige en bas de la fenêtre si aucune valeur absolue a été donnée en bas
    scrollY = (s.flakeBottom?0:parseInt(window.scrollY||document.documentElement.scrollTop||document.body.scrollTop,10));
    if (isNaN(scrollY)) {
      scrollY = 0; // Défilement
    }
    if (!fixedForEverything && !s.flakeBottom && s.flakes) {
      for (i=s.flakes.length; i--;) {
        if (s.flakes[i].active === 0) {
          s.flakes[i].stick();
        }
      }
    }
  };

  this.resizeHandler = function() {
    if (window.innerWidth || window.innerHeight) {
      screenX = window.innerWidth-16-s.flakeRightOffset;
      screenY = (s.flakeBottom?s.flakeBottom:window.innerHeight);
    } else {
      screenX = (document.documentElement.clientWidth||document.body.clientWidth||document.body.scrollWidth)-(!isIE?8:0)-s.flakeRightOffset;
      screenY = s.flakeBottom?s.flakeBottom:(document.documentElement.clientHeight||document.body.clientHeight||document.body.scrollHeight);
    }
    screenX2 = parseInt(screenX/2,10);
  };

  this.resizeHandlerAlt = function() {
    screenX = s.targetElement.offsetLeft+s.targetElement.offsetWidth-s.flakeRightOffset;
    screenY = s.flakeBottom?s.flakeBottom:s.targetElement.offsetTop+s.targetElement.offsetHeight;
    screenX2 = parseInt(screenX/2,10);
  };

  this.freeze = function() {
    // pause de l'animation
    var i;
    if (!s.disabled) {
      s.disabled = 1;
    } else {
      return false;
    }
    for (i=s.timers.length; i--;) {
      clearInterval(s.timers[i]);
    }
  };

  this.resume = function() {
    if (s.disabled) {
       s.disabled = 0;
    } else {
      return false;
    }
    s.timerInit();
  };

  this.toggleSnow = function() {
    if (!s.flakes.length) {
      // première manche
      s.start();
    } else {
      s.active = !s.active;
      if (s.active) {
        s.show();
        s.resume();
      } else {
        s.stop();
        s.freeze();
      }
    }
  };

  this.stop = function() {
    var i;
    this.freeze();
    for (i=this.flakes.length; i--;) {
      this.flakes[i].o.style.display = 'none';
    }
    s.events.remove(window,'scroll',s.scrollHandler);
    s.events.remove(window,'resize',s.resizeHandler);
    if (s.freezeOnBlur) {
      if (isIE) {
        s.events.remove(document,'focusout',s.freeze);
        s.events.remove(document,'focusin',s.resume);
      } else {
        s.events.remove(window,'blur',s.freeze);
        s.events.remove(window,'focus',s.resume);
      }
    }
  };

  this.show = function() {
    var i;
    for (i=this.flakes.length; i--;) {
      this.flakes[i].o.style.display = 'block';
    }
  };

  this.SnowFlake = function(parent,type,x,y) {
    var s = this, storm = parent;
    this.type = type;
    this.x = x||parseInt(rnd(screenX-20),10);
    this.y = (!isNaN(y)?y:-rnd(screenY)-12);
    this.vX = null;
    this.vY = null;
    this.vAmpTypes = [1,1.2,1.4,1.6,1.8]; // "amplification" pour vX/vY 
    this.vAmp = this.vAmpTypes[this.type];
    this.melting = false;
    this.meltFrameCount = storm.meltFrameCount;
    this.meltFrames = storm.meltFrames;
    this.meltFrame = 0;
    this.twinkleFrame = 0;
    this.active = 1;
    this.fontSize = (10+(this.type/5)*10);
    this.o = document.createElement('div');
    this.o.innerHTML = storm.snowCharacter;
    this.o.style.color = storm.snowColor;
    this.o.style.position = (fixedForEverything?'fixed':'absolute');
    this.o.style.width = storm.flakeWidth+'px';
    this.o.style.height = storm.flakeHeight+'px';
    this.o.style.fontFamily = 'arial,verdana';
    this.o.style.cursor = 'default';
    this.o.style.overflow = 'hidden';
    this.o.style.fontWeight = 'normal';
    this.o.style.zIndex = storm.zIndex;
    docFrag.appendChild(this.o);

    this.refresh = function() {
      if (isNaN(s.x) || isNaN(s.y)) {
        // contrôle de sécurité
        return false;
      }
      s.o.style.left = s.x+'px';
      s.o.style.top = s.y+'px';
    };

    this.stick = function() {
      if (noFixed || (storm.targetElement !== document.documentElement && storm.targetElement !== document.body)) {
        s.o.style.top = (screenY+scrollY-storm.flakeHeight)+'px';
      } else if (storm.flakeBottom) {
        s.o.style.top = storm.flakeBottom+'px';
      } else {
        s.o.style.display = 'none';
        s.o.style.top = 'auto';
        s.o.style.bottom = '0px';
        s.o.style.position = 'fixed';
        s.o.style.display = 'block';
      }
    };

    this.vCheck = function() {
      if (s.vX>=0 && s.vX<0.2) {
        s.vX = 0.2;
      } else if (s.vX<0 && s.vX>-0.2) {
        s.vX = -0.2;
      }
      if (s.vY>=0 && s.vY<0.2) {
        s.vY = 0.2;
      }
    };

    this.move = function() {
      var vX = s.vX*windOffset, yDiff;
      s.x += vX;
      s.y += (s.vY*s.vAmp);
      if (s.x >= screenX || screenX-s.x < storm.flakeWidth) { // X-axis défilement
        s.x = 0;
      } else if (vX < 0 && s.x-storm.flakeLeftOffset < -storm.flakeWidth) {
        s.x = screenX-storm.flakeWidth-1; // Largeur des flocons;
      }
      s.refresh();
      yDiff = screenY+scrollY-s.y;
      if (yDiff<storm.flakeHeight) {
        s.active = 0;
        if (storm.snowStick) {
          s.stick();
        } else {
          s.recycle();
        }
      } else {
        if (storm.useMeltEffect && s.active && s.type < 3 && !s.melting && Math.random()>0.998) {
          // ~ 1/1000 risque de faire fondre la mi-air, à chaque trame
          s.melting = true;
          s.melt();
          // progressivement on fait fondre une image
          // s.melting = false;
        }
        if (storm.useTwinkleEffect) {
          if (!s.twinkleFrame) {
            if (Math.random()>0.9) {
              s.twinkleFrame = parseInt(Math.random()*20,10);
            }
          } else {
            s.twinkleFrame--;
            s.o.style.visibility = (s.twinkleFrame && s.twinkleFrame%2===0?'hidden':'visible');
          }
        }
      }
    };

    this.animate = function() {
      // boucle d'animation principal
      // move, verifier l'état, die etc.
      s.move();
    };

    this.setVelocities = function() {
      s.vX = vRndX+rnd(storm.vMaxX*0.12,0.1);
      s.vY = vRndY+rnd(storm.vMaxY*0.12,0.1);
    };

    this.setOpacity = function(o,opacity) {
      if (!opacitySupported) {
        return false;
      }
      o.style.opacity = opacity;
    };

    this.melt = function() {
      if (!storm.useMeltEffect || !s.melting) {
        s.recycle();
      } else {
        if (s.meltFrame < s.meltFrameCount) {
          s.setOpacity(s.o,s.meltFrames[s.meltFrame]);
          s.o.style.fontSize = s.fontSize-(s.fontSize*(s.meltFrame/s.meltFrameCount))+'px';
          s.o.style.lineHeight = storm.flakeHeight+2+(storm.flakeHeight*0.75*(s.meltFrame/s.meltFrameCount))+'px';
          s.meltFrame++;
        } else {
          s.recycle();
        }
      }
    };

    this.recycle = function() {
      s.o.style.display = 'none';
      s.o.style.position = (fixedForEverything?'fixed':'absolute');
      s.o.style.bottom = 'auto';
      s.setVelocities();
      s.vCheck();
      s.meltFrame = 0;
      s.melting = false;
      s.setOpacity(s.o,1);
      s.o.style.padding = '0px';
      s.o.style.margin = '0px';
      s.o.style.fontSize = s.fontSize+'px';
      s.o.style.lineHeight = (storm.flakeHeight+2)+'px';
      s.o.style.textAlign = 'center';
      s.o.style.verticalAlign = 'baseline';
      s.x = parseInt(rnd(screenX-storm.flakeWidth-20),10);
      s.y = parseInt(rnd(screenY)*-1,10)-storm.flakeHeight;
      s.refresh();
      s.o.style.display = 'block';
      s.active = 1;
    };

    this.recycle(); // installer x/y coords etc.
    this.refresh();

  };

  this.snow = function() {
    var active = 0, used = 0, waiting = 0, flake = null, i;
    for (i=s.flakes.length; i--;) {
      if (s.flakes[i].active === 1) {
        s.flakes[i].move();
        active++;
      } else if (s.flakes[i].active === 0) {
        used++;
      } else {
        waiting++;
      }
      if (s.flakes[i].melting) {
        s.flakes[i].melt();
      }
    }
    if (active<s.flakesMaxActive) {
      flake = s.flakes[parseInt(rnd(s.flakes.length),10)];
      if (flake.active === 0) {
        flake.melting = true;
      }
    }
  };

  this.mouseMove = function(e) {
    if (!s.followMouse) {
      return true;
    }
    var x = parseInt(e.clientX,10);
    if (x<screenX2) {
      windOffset = -windMultiplier+(x/screenX2*windMultiplier);
    } else {
      x -= screenX2;
      windOffset = (x/screenX2)*windMultiplier;
    }
  };

  this.createSnow = function(limit,allowInactive) {
    var i;
    for (i=0; i<limit; i++) {
      s.flakes[s.flakes.length] = new s.SnowFlake(s,parseInt(rnd(flakeTypes),10));
      if (allowInactive || i>s.flakesMaxActive) {
        s.flakes[s.flakes.length-1].active = -1;
      }
    }
    storm.targetElement.appendChild(docFrag);
  };

  this.timerInit = function() {
    s.timers = (!isWin98?[setInterval(s.snow,s.animationInterval)]:[setInterval(s.snow,s.animationInterval*3),setInterval(s.snow,s.animationInterval)]);
  };

  this.init = function() {
    var i;
    for (i=0; i<s.meltFrameCount; i++) {
      s.meltFrames.push(1-(i/s.meltFrameCount));
    }
    s.randomizeWind();
    s.createSnow(s.flakesMax); // créer l'initial 
    s.events.add(window,'resize',s.resizeHandler);
    s.events.add(window,'scroll',s.scrollHandler);
    if (s.freezeOnBlur) {
      if (isIE) {
        s.events.add(document,'focusout',s.freeze);
        s.events.add(document,'focusin',s.resume);
      } else {
        s.events.add(window,'blur',s.freeze);
        s.events.add(window,'focus',s.resume);
      }
    }
    s.resizeHandler();
    s.scrollHandler();
    if (s.followMouse) {
      s.events.add(isIE?document:window,'mousemove',s.mouseMove);
    }
    s.animationInterval = Math.max(20,s.animationInterval);
    s.timerInit();
  };

  this.start = function(bFromOnLoad) {
    if (!didInit) {
      didInit = true;
    } else if (bFromOnLoad) {
      // déjà installé et sa fonctionne bien
      return true;
    }
    if (typeof s.targetElement === 'string') {
      var targetID = s.targetElement;
      s.targetElement = document.getElementById(targetID);
      if (!s.targetElement) {
        throw new Error('Snowstorm: Unable to get targetElement "'+targetID+'"');
      }
    }
    if (!s.targetElement) {
      s.targetElement = (!isIE?(document.documentElement?document.documentElement:document.body):document.body);
    }
    if (s.targetElement !== document.documentElement && s.targetElement !== document.body) {
      s.resizeHandler = s.resizeHandlerAlt; // re-plan gestionnaire pour obtenir l'élément au lieu de dimensions de l'écran
    }
    s.resizeHandler(); // élements de la limitation de la boîte
    s.usePositionFixed = (s.usePositionFixed && !noFixed); // si oui ou non position:fixed est pris en charge
    fixedForEverything = s.usePositionFixed;
    if (screenX && screenY && !s.disabled) {
      s.init();
      s.active = true;
    }
  };

  function doDelayedStart() {
    window.setTimeout(function() {
      s.start(true);
    }, 20);
    // Nettoyage
    s.events.remove(isIE?document:window,'mousemove',doDelayedStart);
  }

  function doStart() {
    if (!s.excludeMobile || !isMobile) {
      if (s.freezeOnBlur) {
        s.events.add(isIE?document:window,'mousemove',doDelayedStart);
      } else {
        doDelayedStart();
      }
    }
    // Nettoyage
    s.events.remove(window, 'load', doStart);
  }

  // des crochets pour commencer la neige
  if (s.autoStart) {
    s.events.add(window, 'load', doStart, false);
  }

  return this;

}(window, document));