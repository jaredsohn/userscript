// ==UserScript==
// @name           OmeglePlus
// @namespace      omegleplus
// @description    Omegle Enhancements: style, timestamps, automatic reconnect on 'asl', autoresponses, commands for fun and more
// @include        http://*omegle.com/*
// ==/UserScript==

// OmeglePlus, custom JavaScript additions for omegle.com for Firefox and Opera browsers
// version 0.9
// Contact: http://omegle.speeqe.com/

// Additions:
// - some style changes
// - timestamps
// - nicknames - can be changed via /nick and /snick for the stranger for the current chat session
// - /me command - shows as *action*
// - automatic "asl" and "STAR" disregarding
// - changed messages here and there
// - keep text area enabled
// - /ask8ball, /ping, /slap, /version, /flip, /roll commands
// - automatic answer to simplistic questions such as "hi", "how are you", "f/m", etc
// - automatic reconnect if encountered asl or webcam or f/m in first 4 lines
// - statistics via /stats command, /stats2 for showing stats to the stranger 
// - clickable http:// and www. links
// - /auto command to turn off autoresponses and /expose to lock all stranger commands
// - /typing command to turn off typing notifications, they are turned off now
// - /paranoid command to turn on paranoid mode (reconnect on unoriginal lines like "hi")
// - /autorec - option for automatic reconnect if partner disconnected quickly
// - spambot detection and automatic reconnect
// NEW since 0.7:
// - /slap is now a fun random slap command
// NEW since 0.8:
// - fixed Chrome/Iron compatibility
// - removed /personal and /chatspeak commands, added /nosex shortcut ;)

function OmeglePlus()
{
  var
    versionText = "OmeglePlus v0.9 | http://userscripts.org/scripts/show/67858",
    yourNick = "Dragon",
    strangerNick,
    yourChars, strangerChars,
    yourLines, strangerLines,
    startTime, trialLines,
    contentTop,
    initialLogIsRecaptcha = false,
    aslAlarmed = false, starAlarmed = false, paranoidMode = false,
    autoResponse = false, exposeScript = true, sendTyping = true, isConnected = false,
    autoReconnect = false,
    defMessage = "";

  function killHeaders2(a)
  {
    delete a.headers["X-Requested-With"];
    delete a.headers["X-Request"];
    delete a.headers["Accept"];
    return a
  };

  function startUserCounter2()
  {
    var d = new Element("div", {id: "onlinecount", text: versionText});
    $("header").grab(d);
    function b()
    {
      setTimeout(a, 10*60000)
    };
    function c(e)
    {
      d.set("text", e + " users online");
      b()
    };
    function a()
    {
      killHeaders2(new Request(
        {
          url: "/count?rand=" + Math.floor(Math.random()*100000),
          method: "get",
          onSuccess: c,
          onFailure: b
        }
      )).send()
    };
    a()
  };

  function startNewChat2()
  {
    aslAlarmed = false;
    starAlarmed = false;
    strangerNick = "Stranger";
    yourChars = 0;
    strangerChars = 0;
    yourLines = 0;
    strangerLines = 0;
    startTime = new Date();
    trialLines = 5;

    if ($("appstore")) $("appstore").destroy();
    if ($("logo")) $("logo").destroy();
    if ($("tagline"))
    {
      $("tagline").style.height = '0';
      $("tagline").destroy();
    }
    if (!$("status")) $("header").grab(new Element('div', {id: "status", text: "Ready"}));
    $(document.body).addClass("inconversation");
    var A = new Element("div", {"class": "chatbox"});
    var v = new Element("div",
      {
        "class": "logwrapper",
        styles: {top: contentTop + "px"}
      }
    );
    var i = new Element("div", {"class": "logbox"});
    v.grab(i);
    A.grab(v);
    var u = new Element("div", {"class": "controlwrapper"});
    var f = new Element("table",
      {
        "class": "controltable",
        cellpadding: "0",
        cellspacing: "0",
        border: "0"
      }
    );
    var l = new Element("tbody");
    var w = new Element("tr");
    var Q = new Element("td", {"class": "disconnectbtncell"});
    var N = new Element("div", {"class": "disconnectbtnwrapper"});
    var C = new Element("input",
      {
        value: "Disconnect",
        "class": "disconnectbtn",
        type: "button",
        disabled: true
      }
    );
    C.set("value", "Disconnect");
    N.grab(C);
    Q.grab(N);
    w.grab(Q);
    var a = new Element("td", {"class": "chatmsgcell"});
    var o = new Element("div", {"class": "chatmsgwrapper"});
    var q = new Element("textarea",
      {
        "class": "chatmsg",
        cols: "80",
        rows: "3",
        disabled: false,
        value: defMessage
      }
    );
    o.grab(q);
    a.grab(o);
    w.grab(a);
    var g = new Element("td", {"class": "sendbthcell"});
    var G = new Element("div", {"class": "sendbtnwrapper"});
    var E = new Element("input",
      {
        "class": "sendbtn",
        type: "button",
        disabled: true
      }
    );
    E.set("value", "Send");
    G.grab(E);
    g.grab(G);
    w.grab(g);
    l.grab(w);
    f.grab(l);
    u.grab(f);
    A.grab(u);
    $(document.body).grab(A);
    var H;
    var J = false;
    var m = false;
    function p()
    {
      if (m) return;
      m = true;
      var S = [
        ["___Omegle___", "/static/favicon.png"],
        ["\xAF\xAF\xAFOmegle\xAF\xAF\xAF", "/static/altfavicon.png"]
      ];
      var T;
      function R()
      {
        var V = S.pop();
        document.title = V[0];
        //setFavicon(V[1]);
        S.unshift(V);
        T = setTimeout(R, 500)
      };
      R();
      function U()
      {
        clearTimeout(T);
        m = false;
        document.title = "Omegle";
        //setFavicon("/static/favicon.png");
        $(document).removeEvent("mousemove", U);
        $(document).removeEvent("keydown", U);
        $(document).removeEvent("focus", U);
        $(window).removeEvent("mousemove", U);
        $(window).removeEvent("keydown", U);
        $(window).removeEvent("focus", U)
      };
      $(document).addEvent("mousemove", U);
      $(document).addEvent("keydown", U);
      $(document).addEvent("focus", U);
      $(window).addEvent("mousemove", U);
      $(window).addEvent("keydown", U);
      $(window).addEvent("focus", U)
    };
    function j()
    {
      return i.scrollTop >= i.scrollHeight - i.clientHeight
    };
    function P()
    {
      i.scrollTop = i.scrollHeight
    };
    var I = null;
    function y(S)
    {
      var T = new Element("div", {"class": "logitem"});
      T.grab(S);
      var R = j();
      if (I === null)
      {
        i.grab(T)
      } else {
        T.inject(I, "before")
      }
      if (R) P();
      T.appendText('\n');
      i.scrollTo(0, 9999999);
      return T
    };
    function F(S, R)
    {
      if (R === undefined || R) p();
      var T = new Element("div", {"class": "statuslog"});
      var GG = new Element("span", {"class": "timestamp"});

      GG.appendText(getTimestamp());
      T.grab(GG);
      T.appendText(" ");

      RR = true;
      $each(S.split("\n"), function(Y)
        {
          if (!RR) T.grab(new Element("br"));
          RR = false;
          T.appendText(Y)
        }
      );
      return y(T)
    };
    var c = null;
    var B = false;
    function D(R)
    {
      Recaptcha.destroy();
      if (c !== null) c.dispose();
      c = y(R);
      initialLogIsRecaptcha = false
    };
    function s(R)
    {
      Recaptcha.destroy();
      if (c !== null) c.dispose();
      c = F(R, false);
      initialLogIsRecaptcha = false
    };
    function O(V, W)
    {
      if (V == "you")
      {
        var T = "youmsg";
        var U = "<"+yourNick+">";
        yourChars += W.length;
        yourLines++;
      } else {
        var T = "strangermsg";
        var U = "<"+strangerNick+">";
        if ((strPunctuation(W) > 0.85) && (W.length > 200)) W = '[ASCII not shown]';
        strangerChars += W.length;
        strangerLines++;
        if (trialLines) trialLines--;
        p()
      }
      var X = new Element("div", {"class": T});
      var GG = new Element("span", {"class": "timestamp"});
      var S = new Element("span", {"class": "msgsource"});

      GG.appendText(getTimestamp());
      S.grab(GG);
      S.appendText(" ");
      S.appendText(U);
      X.grab(S);
      X.appendText(" ");
      var R = true;
      $each(W.split("\n"), function(Y)
        {
          if (!R) X.grab(new Element("br"));
          R = false;
          Y = Y.replace(/</g, '&lt;');
          Y = Y.replace(/\b((http:\/\/)|(www\.))[^ ]{5,}/g, function(a)
            {
              //X.grab(new Element("a", {"href": a, "text": a}))
              var h = a;
              if (h.indexOf("www")==0) h = 'http://'+h; 
              return '<a href="'+h+'" target="_blank">'+a+'</a>';
            }
          );
          SS = new Element("span");
          SS.innerHTML = Y;
          X.grab(SS);
        }
      );
      y(X);
      if (V == "stranger")
      {
        if (W.indexOf("FBI") !==- 1
          || W.toLowerCase().indexOf("federal bureau") !==- 1)
        {
          F("The sentence above is false.");
        }
        if (paranoidMode && (trialLines > 0))
        {
          if (
               (W.match(/\basl\b/i) && (!W.match(/(don)|(not)/)) && (W.length<20))
            || (W.match(/\basl\?/i))
            || (W.match(/\ba\Ws\Wl\b/i)))
            return lookToDisconnect(W);
          var badList = ['hi', 'hi ', 'hey', 'heyy', 'sup', '?', '??', '???', 'wat',
            'what', 'sex', 'sex?', 'hi from?', 'hey m f', 'hi where are you from',
            'hey m/f?', 'hii', 'cyber?', 'from', 'from?'];
          for (var bl = 0; bl < badList.length; bl++)
            if (W == badList[bl])
              return lookToDisconnect(W);
          if (W.match(/(\bfuck)|(\bpenis\b)|(\bpussy\b)|(\bim 1)|(\bhbu\b)|(\bwere\b)|(\bcock\b)|(\bpics\b)|(\bgay\b)|(\bhorny\b)|(male\b)|(\blesbian\b)|(\bgay\b)/i) && (W.length < 20))
            return lookToDisconnect(W);
            
        }
        if (exposeScript)
        {
          if (W.indexOf('/ask8ball')==0)
          {
            sendText(getMagic8BallAnswer(), true);
            return;
          }
          if (W.indexOf('/ping')==0)
          {
            sendText("Pong!", true);
            return;
          }
          if (W.indexOf('/flip')==0)
          {
            sendText(coinFlip(), true);
            return;
          }
          if (W.indexOf('/roll')==0)
          {
            if (W == '/roll')
            {
              sendText("12-sided dice rolling result: "+rollDice(12), true);
            } else {
              if (W.substr(6, 1)=='d')
              {
                var sides = W.substr(7);
                sendText(sides+'-sided dice rolling result: '+rollDice(sides), true);
              } else {
                sendText('Expected "/roll" or "/roll dX" where X = number of sides', true);
              }
            }
            return;
          }
          if (W.indexOf('/version')==0)
          {
            sendText(versionText, true);
            return;
          }
          if (autoResponse)
          {
            if (W.match(/^((hi)|(hey)|(hello)).?.?$/i))
            {
              sendText("Greetings.", true);
              return;
            }
            if (W.match(/^(a?re? )?(y?o?u )?(([fm]\/[fm])|([fm] or [fm])|(((guy)|(boy)|(girl)|((fe)?male)).+((guy)|(boy)|(girl)|(male)))).?.?$/i))
            {
              sendText("I prefer not to answer on such questions.", true);
              lookToDisconnect(W);
              return;
            }
            if (W.match(/^(wh?ere? )?(a?r?e? )?(y?o?u )?from.?.?$/i))
            {
              sendText("I prefer not to answer on such questions.", true);
              return;
            }
            if (W.match(/^wh?at'?s ?up.?.?$/i))
            {
              sendText("Nothing's down.", true);
              return;
            }
            if (yourNick == "Dragon")
            {
              if (W.match(/^ho?w a?re? y?o?u( doing)?.?.?$/i))
              {
                sendText("I'm as good as a dragon could be.", true);
                return;
              }
              if (W.match(/^(a?re? )?(y?o?u )?horny.?.?$/i))
              {
                sendText("I have a pair of white horns.", true);
                return;
              }
            }
            if (W.match(/^msn.*\?$/i))
            {
              sendText("MSN sucks, XMPP rules.", true);
              return;
            }
          }
          if ((
               (W.match(/\basl\b/i) && (!W.match(/(don)|(do not)/)) && (W.length<20))
            || (W.match(/\basl\?/i))
            || (W.match(/\ba\Ws\Wl\b/i))
            ) && (!aslAlarmed))
          {
            F(strangerNick+" has triggered the asl notice.");
            sendText("NOTICE: By asking 'asl' you have declared yourself as "
              + "a disagreeable person and a highly possible retard.\n"
              + "Also, see http://www.urbandictionary.com/define.php?term=asl", false);
            // One guy managed to translate it to retard english :D
            // [21:51:38] <Stranger> by askin that question u av made youself luk like a dik
            aslAlarmed = true;
            lookToDisconnect(W);
            return;
          }
          if (((W.match(/\bSTAR\b/) && (W.length<20))
            || (W.match(/\bstar\b/i) && (W.length<8))) && (!starAlarmed))
          {
            F(strangerNick+" has triggered the star notice.");
            sendText("NOTICE: You have alarmed the "
              + "Automatic MW2 Detector equipped with a massive gauss "
              + "chaingun, which reacts and leaves no survivors "
              + "(and if you don't get it: YOU HAVE LOST THE GAME).", false);
            starAlarmed = true;
            return;
          }
          if (W.match(/^hey! my name is sara and i just turned 18/)
           || W.match(/^Hello stranger, you're talking to two girls!/)
           || W.match(/^Hello, we're two girls/)
           || W.match(/^two girls here/)
           || W.match(/^2 girls here/)
           || W.match(/^Hey! Two girls here/)
           || W.match(/^Hey, you're talking to 2 girls!/)
           || W.match(/^I have my webcam on atm if u wanna see me/)
           || W.match(/^hi there stranger!!/)
           || W.match(/^i've hide some dirty ones here!/)
           || W.match(/^Hey, how are you ?\n/)
           || W.match(/^hey how are you?/)
           || W.match(/^hey :\]/)
           || W.match(/^us 19 f/)
           // do you like yakkah.com or omegle?
           // I am trying to decide what site to use, so I am taking a vote, do you like yakkah.com or omegle?
           // do you by any chance chat on yakkah.com?
           // I am looking for new friends to add on yakkah.com
           )
          {
            lookToDisconnect('[Spam] '+W);
            return;
          }
        }
      }
    };
    function z()
    {
      if (I !== null)
      {
        I.dispose();
        I = null
      }
    };
    function n()
    {
      z();
      I = F(strangerNick+" is typing...", false)
    };
    function h()
    {
      isConnected = false;
      z();
      if (initialLogIsRecaptcha)
      {
        Recaptcha.destroy();
        c.dispose();
        c = null;
        initialLogIsRecaptcha = false
      }
      //$(document.body).removeClass("inconversation");
      //q.set("disabled", true);
      E.set("disabled", true);
      C.set("disabled", true);
      $(window).removeEvent("beforeunload", e);
      $(window).removeEvent("unload", L);
      J = true;
      var U = new Element("div");
      var T = new Element("input");
      T.type = "submit";
      T.value = "Start a new conversation";
      T.addEvent("click", function()
        {
          A.dispose();
          startNewChat2()
        }
      );
      U.grab(T);
      y(U)
    };
    function K(R)
    {
      $each(R, function(S)
        {
          switch(S[0])
          {
            case "waiting":
              F("Looking for someone you can chat with. Hang on.");
              break;
            case "connected":
              F("You're now chatting with a random stranger. Say hi!");
              q.set("disabled", false);
              E.set("disabled", false);
              q.focus();
              startTime = new Date();
              isConnected = true;
              break;
            case "gotMessage":
              z();
              var T = S[1];
              O("stranger", T);
              break;
            case "strangerDisconnected":
              if (autoReconnect && trialLines)
              {
                $("status").set("text", "Auto reconnect on stranger disconnect.");
                J = true;
                A.dispose();
                startNewChat2();
                return;
              }
              F(strangerNick+" ran away.");
              $("status").set("text", "Stranger have disconnected last time.");
              h();
              break;
            case "typing":
              n();
              break;
            case "stoppedTyping":
              z();
              break;
            case "recaptchaRequired":
              t(S[1]);
              break;
            case "recaptchaRejected":
              t(S[1]);
              break
          }
        }
      )
    };
    function d(R)
    {
      if (R == undefined) R = 0;
      if (R > 2)
      {
        F("Connection asploded.");
        h()
      }
      if (J) return;
      killHeaders2(new Request.JSON(
        {
          url: "/events",
          onSuccess: function(S)
          {
            if (J) return;
            if (S == null)
            {
              F("Connection imploded.");
              h();
              //F("Connection is about to implode, act quick!");
              //setTimeout(function(){d();}, 3000);
            } else {
              K(S);
              //setTimeout(function(){d();}, 3000);
              d()
            }
          },
          onFailure: function()
          {
            d(R + 1)
          }
        }
      )).post({id: H})
    };
    var M = null;
    function r()
    {
      if (M !== null)
      {
        clearTimeout(M);
        M = null
      }
    };
    function b()
    {
      r();
      q.focus();
      var R = q.value;
      if (!R) return;
      q.value = "";
      if (R.indexOf('/nick ')==0)
      {
        R = R.substr(6);
        yourNick = R;
        F('Your nick changed to '+R);
        return;
      }
      if (R.indexOf('/snick ')==0)
      {
        R = R.substr(7);
        strangerNick = R;
        F("Stranger's nick changed to "+R);
        return;
      }
      if (R.indexOf('/me ')==0)
      {
        R = "*"+R.substr(4)+"*";
      }
      if (R.indexOf('/girls')==0)
      {
        R = "Read this and prosper: http://encyclopediadramatica.com/No_girls_on_the_internet";
      }
      if (R.indexOf('/nosex')==0)
      {
        R = "I'm not looking for a date or a sex chat.";
      }
      if (R.indexOf('/ask8ball')==0)
      {
        if (R == '/ask8ball')
        {
          R = getMagic8BallAnswer();
        } else {
          sendText(R, true);
          R = getMagic8BallAnswer();
        }
      }
      if (R.indexOf('/slap')==0)
      {
        if (R == '/slap')
        {
          R = randomSlap('you');
        } else {
          R = randomSlap(R.substr(6));
        }
      }
      if (R.indexOf('/version')==0)
      {
        F(versionText);
        return;
      }
      if (R.indexOf('/flip')==0)
      {
        R = "Flipped a coin: "+coinFlip();
      }
      if (R.indexOf('/roll')==0)
      {
        if (R == '/roll')
        {
          R = "12-sided dice rolling result: "+rollDice(12);
        } else {
          if (R.substr(6, 1)=='d')
          {
            R = R.substr(7);
            R = R+'-sided dice rolling result: '+rollDice(R);
          } else {
            F('Expected "/roll" or "/roll dX" where X = number of sides');
            return;
          }
        }
      }
      if (R.indexOf('/stats2')==0)
      {
        R = genStats();
        yourChars -= R.length;
        yourLines--;
      }
      if (R.indexOf('/stats')==0)
      {
        F(genStats());
        return;
      }
      if (R.indexOf('/id')==0)
      {
        F("Stranger ID is: "+H);
        return;
      }
      if (R.indexOf('/setid')==0)
      {
        H = R.substr(7);
        F("Set ID to: "+H);
        if (!isConnected)
        {
          J = true;
          isConnected = true;
          d();
        }
        return;
      }
      if (R.indexOf('/msg')==0)
      {
        defMessage = R.substr(5);
        F("Set default message to: "+defMessage);
        return;
      }
      if (R.indexOf('/new')==0)
      {
        J = true;
        A.dispose();
        startNewChat2();
      }
      if (R.indexOf('/expose')==0)
      {
        exposeScript = !exposeScript;
        F('Script commands will' + (exposeScript ? '' : ' NOT') + ' work for the stranger now.');
        return;
      }
      if (R.indexOf('/autorec')==0)
      {
        autoReconnect = !autoReconnect;
        F('Automatic reconnect on disconnect at start is now ' + (autoReconnect ? 'ON.' : 'OFF.'));
        return;
      }
      if (R.indexOf('/auto')==0)
      {
        autoResponse = !autoResponse;
        F('Autoresponse is now ' + (autoResponse ? 'ON.' : 'OFF.'));
        return;
      }
      if (R.indexOf('/paranoid')==0)
      {
        paranoidMode = !paranoidMode;
        F('Paranoid mode is now ' + (paranoidMode ? 'ON.' : 'OFF.'));
        return;
      }
      if (R.indexOf('/typing')==0)
      {
        sendTyping = !sendTyping;
        F('Typing notification is now ' + (sendTyping ? 'ON.' : 'OFF.'));
        return;
      }
      if (R.indexOf('/brains')==0)
      {
        R = 'I can literally feel your brains boiling.';
      }
      if (R.indexOf('/')==0)
      {
        F('Unrecognized command "'+R+'"; type "\\/" to send "/"');
        return;
      }
      if (R.indexOf('\\/')==0)
      {
        R = R.substr(1);
      }
      O("you", R);
      if (isConnected)
      {
        killHeaders2(new Request({url: "/send", data: {msg: R, id: H},
          onSuccess: successText, onFailure: failText})).send();
        $("status").set("text", "Sent text");
      }
      function successText(text)
      {
        //$("status").set("text", "sDebug: '"+text+"'");
      }
      function failText(text)
      {
        $("status").set("text", "WARNING: Failed to send text");
      }
    };
    function k()
    {
      M = null;
      if (isConnected)
      {
        killHeaders2(new Request(
          {
            url: "/stoppedtyping",
            data: {id: H}
          }
        )).send();
        $("status").set("text", "Stopped typing");
      }
    };
    function x()
    {
      if (!sendTyping) return;
      if (M === null)
      {
        if (isConnected)
        {
          killHeaders2(new Request(
            {
              url: "/typing",
              data: {id: H}
            }
          )).send();
          $("status").set("text", "Typing");
        }
      }
      r();
      M = setTimeout(k, 7000)
    };
    q.addEvent("keydown", x);
    function t(S)
    {
      var R = new Element("form");
      R.setStyle("margin", "0");
      R.setStyle("padding", "0");
      R.addEvent("submit", function(U)
        {
          U.preventDefault();
          killHeaders2(new Request(
            {
              url: "/recaptcha",
              data:
              {
                id: H,
                challenge: Recaptcha.get_challenge(),
                response: Recaptcha.get_response()
              }
            }
          )).send();
          s("Verifying...")
        }
      );
      var T = new Element("div");
      T.setStyle("padding-left", "1px");
      T.setStyle("padding-top", "1px");
      R.grab(T);
      D(R);
      initialLogIsRecaptcha = true;
      Recaptcha.create(S, T,
        {
          callback: function()
          {
            Recaptcha.focus_response_field();
            var V = new Element("div");
            V.setStyle("padding-top", "0.5em");
            var U = new Element("input");
            U.set("type", "submit");
            U.set("value", "Submit");
            V.grab(U);
            R.grab(V)
          },
          theme: "clean"
        }
      )
    };
    function L()
    {
      if (J) return;
      killHeaders2(new Request(
        {
          url: "/disconnect",
          data: {id: H}
        }
      )).send();
      F("You have disconnected.");
      $("status").set("text", "You have disconnected last time.");
      h()
    };
    function e(R)
    {
      R.preventDefault();
      R.event.returnValue = "Leaving this page will end your conversation."
    };

    function sendText(R, show)
    {
      if (show) O("you", R);
      if (isConnected)
      {
        killHeaders2(new Request({url: "/send", data: {msg: R, id: H}})).send()
      }
    };
    function lookToDisconnect(line)
    {
      if (J) return;
      if (!trialLines) return;
      $("status").set("text", "AutoDis: '"+line+"'");
      J = true;
      A.dispose();
      startNewChat2();
    };

    E.addEvent("click", b);
    C.addEvent("click", function()
      {
        if (confirm("Are you sure you want to disconnect?"))
        {
          L();
          //A.dispose();
          //startNewChat2();
        }
      }
    );
    q.addEvent("keypress", function(R)
      {
        if (R.code == 13 &&! (R.shift || R.alt || R.meta))
        {
          b();
          R.preventDefault()
        }
      }
    );
    q.focus();
    F("Connecting to server...");
    killHeaders2(new Request.JSON(
      {
        url: "/start?rcs=1",
        onSuccess: function(R)
        {
          C.set("disabled", false);
          $(window).addEvent("beforeunload", e);
          $(window).addEvent("unload", L);
          H = R;
          d()
        },
        onFailure: function()
        {
          s("Error connecting to server. Please try again.");
          h()
        }
      }
    )).post();
  };

  function getTimestamp()
  {
    var DD = new Date();
    var Dx = '[';
    if (DD.getHours() < 10) Dx += "0";
    Dx += DD.getHours() + ":";
    if (DD.getMinutes() < 10) Dx += "0";
    Dx += (DD.getMinutes()) + ":";
    if (DD.getSeconds() < 10) Dx += "0";
    Dx += DD.getSeconds() + ']';
    return Dx;
  };

  function genStats()
  {
    var stats = "Statistics so far: \n";
    stats += yourNick+": "+yourLines+" lines and "+yourChars+" characters\n";
    stats += strangerNick+": "+strangerLines+" lines and "+strangerChars+" characters\n";
    stats += 'conversation time: '+timeDiff(startTime, new Date());
    return stats;
  };

  function timeDiff(startTime, endTime)
  {
    var diff = endTime.getTime() - startTime.getTime();
    var hours = Math.floor(diff/(1000*60*60));
    diff -= hours*1000*60*60;
    var mins = Math.floor(diff/(1000*60));
    diff -= mins*1000*60;
    var secs = Math.floor(diff/(1000));
    var result = ' ';
    if (hours>0) result += hours + ((hours>1) ? ' hours ' : ' hour ');
    if (mins>0) result += mins + ((mins>1) ? ' minutes ' : ' minute ');
    if (secs>0) result += secs + ((secs>1) ? ' seconds ' : ' second ');
    return result.substr(1, result.length-2);
  };

  function getMagic8BallAnswer()
  {
    var answers =
    [
      "Signs point to yes.",
      "Yes.",
      "Reply hazy, try again.",
      "Without a doubt.",
      "My sources say no.",
      "As I see it, yes.",
      "You may rely on it.",
      "Concentrate and ask again.",
      "Outlook not so good.",
      "It is decidedly so.",
      "Better not tell you now.",
      "Very doubtful.",
      "Yes - definitely.",
      "It is certain.",
      "Cannot predict now.",
      "Most likely.",
      "Ask again later.",
      "My reply is no.",
      "Outlook good.",
      "Don't count on it.",
      "Yes, in due time.",
      "Definitely not.",
      "You will have to wait.",
      "I have my doubts.",
      "Outlook so so.",
      "Looks good to me!",
      "Who knows?",
      "Looking good!",
      "Probably.",
      "Are you kidding?",
      "Go for it!",
      "Forget about it."
    ];    
    return "Magic 8-Ball says: "+answers[Math.floor(Math.random()*answers.length)];
  };
  function randomSlap(subj)
  {
    var slapobjects =
    [
      "a USB cable", "a small boulder", "a pointed stick", "a shotgun", "dust",
      "AOL CDs", "peanut butter", "a golf club", "air", "water", "a stapler",
      "a pair of scissors", "a size 13 bowling shoe", "a dead mouse", "a toilet",
      "a shampoo bottle", "Howard Dean", "the State of Maryland", "a piano",
      "Sparkling Cider", "a box of Kleenexes", "a Fig Newton", "an Apple ][",
      "a gallon of milk", "a Cuban cigar", "a 1968 Corvette", "a chess set",
      "a ZIP disk", "a can of Pig Brains with Gravy", "a trumpet", "a $2 bill",
      "the 2006 US Federal Tax Code", "Charles Manson's hair clippings", "yes",
      "CSI Season 1 DVD Set", "a pair of scissors", "nothing in particular",
      "99 bottles of beer on the wall", "a beanstalk", "a long pole", "lint",
      "a Patriot Missile", "an Oak 2x4", "a ROKR cellphone", "a light bulb",
      "a smoothbore depleted uranium sniper shell", "lots and lots of penguins",
      "a bottle of Welch's Sparkling White Grape Juice Cocktail (non-alcoholic)",
      "a trumpet mouthpiece", "a pair of headphones", "three sporks", "stuff",
      "a spiral fluorescent light bulb", "Sony's DRM Software", "Deep Space 9",
      "a slice of pizza", "a nosehair plucker", "three grains of sand", "earwax",
      "'One Fish Two Fish Red Fish Blue Fish'", "a coconut monkey", "a bathtub",
      "a Lego head, one of those cool ones with the sunglasses and stubble",
      "The Artist Formerly known as The Artist Formerly known as Prince", "ants",
      "bellybutton lint", "the 1932 World's Fair", "a Sharpie, Ultra Fine Point",
      "15 golf ball tees", "a roll of pennies", "a Chinese Crested Hairless dog",
      "dental floss", "a toothpick", "a cow pie", "a toilet seat cover", "Jewel",
      "a toilet seat", "12 pounds of bacon", "a shrimp, a starfish, and a pigmy",
      "a fur coat", "a dot matrix printer", "a leg lamp", "RITZ bits", "a sock",
      "a mechanical pencil (0.5mm lead)", "fuzzy dice", "a watch", "a keyboard",
      "toenail clippings", "the letter 'L'", "8 dill pickles", "carpet remnants",
      "one of those squishy rubbery things that spring keyboard keys back up",
      "an EIDE cable", "a tube of m&m's minis", "a gerbil dressed as Domo-kun",
      "two suction cups, a peanut, and a can of cooking spray", "an ice skate",
      "a slinkey", "3 hard boiled eggs", "french vanilla icecream", "a salad",
      "5 poker decks", "a stapler", "some 6 year old's two front teeth",
      "pickled pigs feet", "a trap door spider", "a stained glass window",
      "a bell tower", "string, wax, a bowling ball, and a tape measurer", "Twix",
      "a shoebox", "an ABIT motherboard", "a large yacht", "an LCD screen",
      "plains, trains, and automobiles", "a campfire", "peanut butter and syrup",
      "melted chocolate", "a crowbar", "Emperor Palpatine", "a sheet of drywall",
      "a ceiling fan blade", "a broken tennis racquet", "2 pair of water skis",
      "a 38 inch tire", "a smoke alarm", "a plastic fly", "a Pepsi cap",
      "a gopher", "a gopher trap", "a random kitchen utensil", "a plutonium rod",
      "peach fuzz", "oyster crackers", "electrolytes", "kosher salt", "termites",
      "dihydrogen monoxide", "a partial solar eclipse", "crayons", "an anteater",
      "a plastic hanger, tube kind, not the ones that come with items from a store",
      "the kitchen sink", "a refrigerator", "a broken shot glass", "curly fries",
      "73 cranberries", "David Hasselhoff", "a can of tomato sauce", "a pimple",
      "bamboo stilts", "a Tickle Me Elmo", "a Mickey Mouse Clock", "soy milk",
      "a Capria Sun pouch", "a rusty shot put ball", "Ernest Hemingway",
      "a random sea slug", "Gigli (Special Edition DVD)", "tofu casserole",
      "a spider, 4 toenail clippings, and a toupee", "24 pancakes", "Dr. Phill",
      "chicken parmesan, an innertube, and dental floss", "used chewing gum",
      "termites, packing peanuts, and 14 gummy bears", "used corn husks",
      "a hockey stick", "nine hockey pucks", "a bag of dogfood", "738 buttons",
      "Montel", "18 cans of Alpo", "random emoticons", "a newspaper from 1947",
      "a random tv show, but not a 'random' show as in 'OMG that was random' but a random show as in, well, random throw of the dice",
      "a random tv show", "a picknick table", "a ping pong table", "a techno DJ",
      "a lobster, three onions, seven pencils, and a chewed up roll of 'Fruit by the Foot'",
      "chicken legs", "two pitchforks", "Nebraska", "a .torrent of Darkwing Duck",
      "America's Next Top Model", "a 52 inch plasma monitor",
      "a fax machine", "four tennis racquets tied together to form a pyramid",
      "3 coupons and 2 AAA batteries", "a clown shoe", "a POS graphics card",
      "random prescription medicine", "three muffins and two slices of toast",
      "dental floss", "42 Pringles cans", "flakes of dead skin", "a shoe",
      "2 plastic coat hangers and a roll of nickles", "38 IDE cables", "an ant",
      "a box of t-shirts, 3 yards of dental floss, and a broken plastic fork",
      "the remains of Humpty Dumpty after all the King's Men couldn't put him back together",
      "7 egg whites and a cup of flower", "38 pigs and their farmer Willifred",
      "a first aid kit", "Salad Shooter(tm)", "a 17 car pile up on the freeway",
      "200 yards of barbed wire", "a PEZ dispenser filled with Tic-Tacs", "lice",
      "a Universal Power Supply backup battery", "a 4U racmount server",
      "314 empty envelops with prepaid postage from Credit Card companies",
      "mizspeld werds", "13 pounds of dust", "a spider's web", "a table leg",
      "42 Oreo Cookies, 2 Watermelons, 4 machine guns, and twisty ties",
      "a NERF bow and arrow", "an empty can of wasp spray", "the summer sky",
      "bubble wrap that has been painted blue", "99 red ballons", "bubbles",
      "the interwebs", "miscellaneous body fluids", "21,357 DVDs", "the letter W",
      "a broken watch that has been dipped in gasoline", "7 potted plants",
      "shoes, a rock, toilet paper, 3 inch plastic dice, and a Swiss Army knife with the main blade removed",
      "32 freshly beheaded chickens", "a New Kids on the Block tape", "a Furby",
      "fiiiiiiiiiiiive goooolden riiiiiiiiings", "Hobart, Tasmania", "Nunavut",
      "James Brown", "Danny DeVito", "Keanu Reeves", "Rosie O'Donnell", "a belt",
      "Ashton Kutcher", "the passenger mirror of a 1972 Mercedes-Benz 280SEL",
      "3 rose bushes", "a box of 248 crayons that are half used", "a cold",
      "2 bottles of 'all small & mighty' with stainlifter and 3x concentrated laundry detergent",
      "a bicycle helmet", "Cardcaptor Sakura", "a spider plant", "mayonnaise",
      "George, the bellboy from Manhattan", "Wooster", "Jeeves", "an oven mit",
      "a brown paper bag filled with Cheetos", "a Swingline 790 stapler",
      "a Linksys 16-Port Workgroup Switch", "200 yards of Cat 4 cable", "Nemo",
      "a smoke detector", "moldy cheese that a mouse didn't eat", "33 broken CDs",
      "Swiss Miss powdered Hot Chocolate with little marshmallows", "a spatula",
      "a Five Star binder", "a spider's egg sack", "3 dozen no bake cookies",
      "a glass of water", "5 pounds of asphault"
    ];
    slapobjects[Math.floor(Math.random()*slapobjects.length)];
    return (Math.random()<0.5)
      ? "*slaps "+subj+" with "+slapobjects[Math.floor(Math.random()*slapobjects.length)]+"*"
      : "*repeatedly slaps "+subj+" with "+slapobjects[Math.floor(Math.random()*slapobjects.length)]+" and then "+slapobjects[Math.floor(Math.random()*slapobjects.length)]+"*";
    
  }

  function coinFlip()
  {
    return (Math.random()<0.5) ? "Heads!" : "Tails!";
  };

  function rollDice(sides)
  {
    return Math.floor(Math.random()*sides)+1;
  };

  function strPunctuation(s)
  {
    if (!s.length) return 0;
  //  return (s.length - s.replace(/[- ;:_\.,\(\)\|'`"~]/g, '').length) / s.length;
    return (s.length - s.replace(/[- ;:_\.,\(\)\|'`"~\u2588\u2591\u2592\u2593]/g, '').length) / s.length;
  };

  $("textbtn").alt = 'Text';
  $("textbtn").removeEvents();
  $("textbtn").addEvent("click", function()
    {
      contentTop = $("intro").offsetTop;
      $("intro").dispose();
      startNewChat2()
    }
  );
};

function pageEnhancements()
{
  if (typeof GM_addStyle == 'undefined')
  function GM_addStyle(css)
  {
    var parent = document.getElementsByTagName("head")[0];
    if (!parent) parent = document.documentElement;
    var style = document.createElement("style");
    style.type = "text/css";
    var textNode = document.createTextNode(css);
    style.appendChild(textNode);
    parent.appendChild(style);
  }
  
  GM_addStyle(
    ''
  );

  var ss = OmeglePlus.toString();

  document.body.appendChild(document.createElement('script')).appendChild(
    document.createTextNode(ss.substr(ss.indexOf('{'), ss.lastIndexOf('}'))));

};

if (document.body == null)
  document.addEventListener('DOMContentLoaded', pageEnhancements, false);
else
  pageEnhancements();