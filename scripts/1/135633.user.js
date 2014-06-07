// Generate arbitrary-sized passwords
// http://akkartik.name/firefox.html#password-composer

// Forked from pwdcomposer.user.js 79 2006-09-08 07:44:01Z
// By Johannes la Poutre

// ==UserScript==
// @name          Password Composer
// @author        Kartik Agaram
// @namespace     http://akkartik.name/greasemonkey
// @description   Generates site-specific password of tunable size
// @include       *
// @version       0.01
// ==/UserScript==

// begin user script

var pwdc = {
  prefs: {
    clearText: false,  // show generated passwds in cleartext
    topDomain: false   // use top domain instead of full host
  },

  // VARS
  tmr: null, // timeout timer
  lastPwdField: null,
  isMsie: /MSIE/.test(navigator.userAgent),

  // METHODS
  addOpener: function(fld) {
    var cls = fld.getAttribute("class");
    // return if class name (and dblclick handler) was set already
    if (cls && cls.indexOf("mpwdpasswd") > -1) return;
    fld.style.background = "#dfd url(" + this.icons.pwdfieldbg + ")";
    fld.style.backgroundPosition = "top right";
    fld.style.backgroundRepeat = "no-repeat";
    fld.style.borderColor = "green";
    fld.style.borderStyle = "inset";
    pwdc.addEventListener(fld, 'dblclick', pwdc.addPanel, true);
    fld.title = "Double click to open Password Composer";
    fld.setAttribute("class", (cls) ? cls + " mpwdpasswd" : "mpwdpasswd");
  },

  initFlds: function(doc) {
    try {
      var L = doc.getElementsByTagName('input');
    } catch (e) {
      dbg( doc + ", " + e.message);
    }
    var flds = [];
    for (var i=0; i < L.length; i++) {
      var nm, tp, cl;
      try { nm = L[i].getAttribute("name") || ""; } catch(e) { };
      try { tp = L[i].getAttribute("type") || ""; } catch(e) { };
      try { cl = L[i].getAttribute("class") || ""; } catch(e) { };
      if ((tp.toLowerCase() == "password") ||
        (tp == "text" && nm.toLowerCase().substring(0,5) == "passw") ||
        (cl.indexOf("mpwdpasswd") > -1)) {
          pwdc.addOpener(L[i]);
      }
    }
  },

  // init fields after a short tmeout
  initFldsSoon: function() {
    if (pwdc.tmr) clearTimeout(pwdc.tmr);
    pwdc.tmr = setTimeout(function() { pwdc.initFlds(document); }, 100);
  },

  // cross browser event listeners
  addEventListener: function(obj, evtName, func, capture) {
    if (obj.addEventListener) {
      obj.addEventListener(evtName, func, capture);
      return true;
    } else if (obj.attachEvent) return obj.attachEvent("on"+evtName, func);
  },

  removeEventListener: function(obj, evtName, func, capture) {
    if (obj.removeEventListener) {
      obj.removeEventListener(evtName, func, capture);
      return true;
    } else if (obj.detachEvent) return obj.detachEvent("on"+evtName, func);
  },

  getHostname: function() {
    var re = new RegExp('https?://([^/]+)');
    var url = document.location.href.toLowerCase();
    var host = null;
    try {
      host = url.match(re)[1];
    } catch (e) {
      // e.g.  working on a local file makes no sense
      return "INVALID DOMAIN";
    }
    // look at minimum domain instead of host
    // see http://labs.zarate.org/passwd/
    if (pwdc.prefs.topDomain) {
      host = host.split('.');
      if (host[2] != null) {
        s = host[host.length-2] + '.' + host[host.length-1];
        for(var i=0; i<pwdc.domains.length; i++) {
          if (s == pwdc.domains[i]) {
            s = host[host.length-3] + '.' + s;
            break;
          }
        }
      } else {
        s = host.join('.');
      }
      return s;
    } else {
      // no manipulation (full host name)
      return host;
    }
  },

  // Setting: use sub domain
  initSubdomainSetting: function() {
    if (typeof(GM_getValue) == 'function') {
      pwdc.prefs.topDomain = GM_getValue('topDomain', false);
    }
    pwdc.updateSubDomainSetting();
  },

  toggleSubdomain: function(val) {
    if (typeof(val) == 'boolean') {
      // use provided argument {true, false}...
      pwdc.prefs.topDomain = val;
    } else {
      // ...or toggle current value.
      pwdc.prefs.topDomain = !pwdc.prefs.topDomain;
    }
    if (typeof(GM_setValue) == 'function') {
      GM_setValue('topDomain', pwdc.prefs.topDomain);
    }
    pwdc.updateSubDomainSetting();
    document.getElementById('masterpwd').focus();
  },

  updateSubDomainSetting: function() {
    var icn = document.getElementById("icnSubdom");
    if (pwdc.prefs.topDomain) {
      icn.setAttribute('src', pwdc.icons.icnPlus);
      icn.setAttribute('title', "Using host's top level domain name");
      if (pwdc.isMsie) icn.style.backgroundColor = "#f77";
    } else {
      icn.setAttribute('src', pwdc.icons.icnMin);
      icn.setAttribute('title', "Using full host name");
      if (pwdc.isMsie) icn.style.backgroundColor = "#dfd";
    }
    document.getElementById("mpwddomain").setAttribute('value',
      pwdc.getHostname());
  },

  toggleClearText: function(val) {
    if (pwdc.isMsie) return; // not available for MSIE
    if (typeof(val) == 'boolean') {
      // use provided argument {true, false}...
      pwdc.prefs.clearText = val;
    } else {
      // ...or toggle current value.
      pwdc.prefs.clearText = !pwdc.prefs.clearText;
    }
    var icn = document.getElementById("icnShow");
    icn.setAttribute('src', (pwdc.prefs.clearText) ?
      pwdc.icons.icnShow : pwdc.icons.icnHide);
    document.getElementById('masterpwd').focus();
  },

  // verify if both passwords match (if two fields are displayed)
  checkPassword: function() {
    var pwd = document.getElementById('masterpwd');
    var pwd2 = document.getElementById('secondpwd');
    if (!pwd2) return true;
    if (pwd.value != pwd2.value && pwd2.value != '') {
      pwd2.style.background='#f77';
      pwd2.style.borderColor='red';
      return false;
    } else {
      pwd2.style.background = 'white';
      pwd2.style.borderColor='#777';
      return true;
    }
  },

  keyup: function(e) {
    pwdc.checkPassword();
    // CR, LF
    if (e.keyCode == 13 || e.keyCode == 10) {
      pwdc.generatePassword();
    // ESC
    } else if (e.keyCode == 27) {
      pwdc.removePanel();
    // SHIFT-CTRL-LEFT-ARROW
    } else if (e.keyCode == 37 && e.ctrlKey && e.shiftKey) {
      pwdc.toggleSubdomain(true);
    // SHIFT-CTRL-RIGHT-ARROW
    } else if (e.keyCode == 39 && e.ctrlKey && e.shiftKey) {
      pwdc.toggleSubdomain(false);
    // SHIFT-CTRL-C
    } else if (e.keyCode == 67 && e.ctrlKey && e.shiftKey) {
      pwdc.toggleClearText();
    }
    return true;
  },

  cancelEvent: function(e) {
    if (e.stopPropagation) e.stopPropagation();
    return false;
  },

  // generate the password and populate original form
  generatePassword: function() {
    if (!pwdc.checkPassword()) {
      return;
    }
    var master = document.getElementById('masterpwd').value;
    var domain = document.getElementById('mpwddomain').value.toLowerCase();
    var length = parseInt(document.getElementById('mpwdlength').value);
    var pass = hex_md5(master+':'+domain).substr(0,length);
    // show password in pwdcomposer rather than inserting into host page
    var generatedpwd = document.getElementById('generatedpwd');
    if (generatedpwd) {
      generatedpwd.value = pass;
      return;
    }
    // remove panel before messing with passwd fields in host page
    pwdc.removePanel();
    if (master != '' && master != null) {
      var i=0, j=0;
      var inputs = document.getElementsByTagName('input');
      for(i=0; i<inputs.length; i++) {
        var inp = inputs[i];
        var cl = inp.getAttribute("class") || "";
        // every passwd field is set to class "mpwdpasswd" on initialization
        if (cl.indexOf("mpwdpasswd") != -1) {
          inp.value = pass;
          // FIXME: input.type is readonly in MSIE...
          try {
            inp.type = (pwdc.prefs.clearText) ? "text" : "password";
          } catch (e) {};
        }
      }
      // give focus to selected passwd field
      if (pwdc.lastPwdField) pwdc.lastPwdField.focus();
    }
  },

  // check for multiple passwd fields per form (e.g. 'verify passwd')
  hasMultiplePwdFields: function() {
    // find any form that has 2+ password fields as children
    // note literal '>' char in xpath expression!
    var multiple = true; // default: show check field
    try {
      var xpres = document.evaluate("count(//form[count(//input[@type='password']) > 1])",
      document, null, XPathResult.ANY_TYPE,null);
      multiple = (xpres.numberValue > 0);
    } catch (e) {
      // Note: rewrite w/o XPath for Safari / MSIE compat
    }
    return multiple;
  },

  removePanel: function() {
    var body = document.getElementsByTagName('body')[0];
    body.removeChild(document.getElementById('mpwd_bgd'));
    body.removeChild(document.getElementById('mpwd_panel'));
    // remove masking key up/down event handlers
    pwdc.removeEventListener(document, 'keydown', pwdc.cancelEvent, false);
    pwdc.removeEventListener(document, 'keyup', pwdc.cancelEvent, false);
  },

  addPanel: function(evt) {
    evt = (evt) ? evt : window.event;
    var pwdTop = 0;
    var pwdLeft = 0;
    if (evt) {
      var elem = (evt.target) ? evt.target : evt.srcElement;
      // element nodes only
      if (1 == elem.nodeType) {
        var fld = pwdc.lastPwdField = elem;
        // open pwd panel aligned with double-clicked field
        while (fld.offsetParent) {
          pwdTop += fld.offsetTop;
          pwdLeft += fld.offsetLeft;
          fld = fld.offsetParent;
        }
        // shift panel to fully cover orig. passwd field
        pwdTop -= 5;
        pwdLeft -= 5;
      }
    } else {
      pwdc.lastPwdField = null;
    }
    // temporarily mask original key up/down handlers
    // doesn't work for MSIE (blocks every keypress)
    if (!pwdc.isMsie) {
      pwdc.addEventListener(document, 'keydown',  pwdc.cancelEvent, false);
      pwdc.addEventListener(document, 'keyup',  pwdc.cancelEvent, false);
    }
    if (document.getElementById('mpwd_panel')) {
      pwdc.removePanel();
      return;
    }
    var pwdFound = (pwdc.lastPwdField != null);

    // full document width and height as rendered in browser:
    // reverting to non-standard properties below
    var pag_w = document.documentElement.scrollWidth;
    var pag_h = document.documentElement.scrollHeight;
    if (window.innerHeight > pag_h) pag_h = window.innerHeight;

    var div = document.createElement('div');
    div.style.color='#777';
    div.style.padding='5px';
    div.style.backgroundColor='white';
    div.style.border='1px solid black';
    div.style.borderBottom='3px solid black';
    div.style.borderRight='2px solid black';
    div.style.MozBorderRadius='10px';
    div.style.fontSize='9pt';
    div.style.fontFamily='sans-serif';
    div.style.lineHeight='1.8em';
    div.style.position='absolute';
    div.style.width='230px';
    // keep panel at least 10 px away from right page edge
    div.style.left = ((250 + pwdLeft > pag_w) ? pag_w - 250 : pwdLeft) + 'px';
    div.style.top = pwdTop + 'px';
    div.style.zIndex = '999999';  // make sure we're visible/on top
    div.setAttribute('id', 'mpwd_panel');
    div.appendChild(document.createTextNode('Master password: '));

    // MSIE does not support changing type of input element, skip...
    if (!pwdc.isMsie) {
      var show = document.createElement('img');
      show.setAttribute('src', (pwdc.prefs.clearText) ?
        pwdc.icons.icnShow : pwdc.icons.icnHide);
      show.style.width = "12px";
      show.style.height = "12px";
      show.setAttribute('id', "icnShow");
      show.setAttribute('title', 'Show or hide generated password Shift+Ctrl+C');
      show.style.paddingRight = '4px';
      show.style.display = 'inline'; // some stupid sites set this to block
      show.style.cursor = 'pointer';
      show.style.border = 'none';
      pwdc.addEventListener(show, 'click', pwdc.toggleClearText, true);
      div.appendChild(show);
    }

    var pwd = document.createElement('input');
    pwd.style.border='1px solid #777';
    pwd.setAttribute('type','password');
    pwd.setAttribute('id','masterpwd');
    pwd.setAttribute("class", "mpwdpasswd");
    // specify tabindex, otherwise an existing 'tabindex=2' on host page takes precedence
    pwd.setAttribute('tabindex',10000);
    pwd.style.width = '100px';
    pwd.style.fontSize='9pt';
    pwd.style.color='#777';
    pwd.style.backgroundColor='white';
    if (! pwdFound) pwdc.addEventListener(pwd, 'change', pwdc.generatePassword, true);
    div.appendChild(pwd);
    div.appendChild(document.createElement('br'));

    if (pwdc.hasMultiplePwdFields() || ! pwdFound) {
      // only if a 'verify field' is on original page
      div.appendChild(document.createTextNode('Check password: '));
      var pwd2 = document.createElement('input');
      pwd2.setAttribute('type','password');
      pwd2.setAttribute('id','secondpwd');
      pwd2.setAttribute("class", "mpwdpasswd");
      pwd2.setAttribute('tabindex',10001);
      pwd2.style.width = '100px';
      pwd2.style.color='#777';
      pwd2.style.backgroundColor='white';
      pwd2.style.border='1px solid #777';
      pwd2.style.fontSize='9pt';
      if (! pwdFound) pwdc.addEventListener(pwd2, 'change', pwdc.generatePassword, true);
      div.appendChild(pwd2);
      div.appendChild(document.createElement('br'));
    }

    div.appendChild(document.createTextNode('Domain: '));

    var subicn = document.createElement('img');
    subicn.setAttribute('src', pwdc.icons.icnPlus);
    subicn.style.width = "9px";
    subicn.style.height = "9px";
    subicn.style.marginRight = "5px";
    subicn.setAttribute('id', "icnSubdom");
    subicn.setAttribute('title', 'Using full host name');
    subicn.style.display='inline';
    subicn.style.cursor = 'pointer';
    if (pwdc.isMsie) {
      subicn.style.cursor = "hand";
      subicn.style.backgroundColor = '#dfd';
    }
    subicn.style.border = 'none';
    pwdc.addEventListener(subicn,'click', function(event) {
      pwdc.toggleSubdomain();
      document.getElementById('masterpwd').focus();
    }, true);
    div.appendChild(subicn);

    var domn = document.createElement('input');
    domn.setAttribute('type','text');
    domn.setAttribute('value', pwdc.getHostname());
    domn.setAttribute('id','mpwddomain');
    domn.setAttribute('tabindex',10002);
    domn.setAttribute('title','Edit domain name for different password');
    domn.style.width = '150px';
    domn.style.border = 'none';
    domn.style.fontSize = '9pt';
    domn.style.color = '#777';
    domn.style.backgroundColor = 'white';
    if (! pwdFound) pwdc.addEventListener(domn, 'change', pwdc.generatePassword, true);
    div.appendChild(domn);

    div.appendChild(document.createTextNode('Password length: '));

    var domn = document.createElement('input');
    domn.setAttribute('type','text');
    domn.setAttribute('value', 12);
    domn.setAttribute('id','mpwdlength');
    domn.setAttribute('tabindex',10002);
    domn.setAttribute('title','Desired password size');
    domn.style.width = '50px';
    domn.style.border = 'none';
    domn.style.fontSize = '9pt';
    domn.style.color = '#777';
    domn.style.backgroundColor = 'white';
    if (! pwdFound) pwdc.addEventListener(domn, 'change', pwdc.generatePassword, true);
    div.appendChild(domn);

    if (! pwdFound) {
      // show generated password if no password field found on host page
      div.appendChild(document.createTextNode('Generated pwd: '));
      var pwd3 = document.createElement('input');
      pwd3.setAttribute('type','text');
      pwd3.setAttribute('id','generatedpwd');
      pwd3.setAttribute('tabindex',10004);
      pwd3.style.width = '100px';
      pwd3.style.color = 'black';
      pwd3.style.backgroundColor = 'white';
      pwd3.style.border = '1px solid #777';
      pwd3.style.fontSize = '9pt';
      pwdc.addEventListener(pwd3, 'focus', function(evt) {
          evt = (evt) ? evt : window.event;
          pwdc.generatePassword();
          var elem = (evt.target) ? evt.target : evt.srcElement;
          elem.select();
        }, true);
      div.appendChild(pwd3);
      div.appendChild(document.createElement('br'));
    }

    pwdc.addEventListener(div, "keyup", pwdc.keyup, false);
    if (!pwdc.isMsie) {
      pwdc.addEventListener(div, "keydown", pwdc.cancelEvent, false);
    }

    var bgd = document.createElement('div');
    bgd.setAttribute('id','mpwd_bgd');
    bgd.style.position='absolute';
    bgd.style.top='0px';
    bgd.style.left='0px';
    bgd.style.backgroundColor='black';
    bgd.style.opacity='0.4';
    if (pwdc.isMsie) bgd.style.filter = "alpha(opacity=40)";
    bgd.style.height = pag_h + 'px';
    bgd.style.width = pag_w + 'px';
    bgd.style.zIndex = '999998';
    pwdc.addEventListener(bgd, 'click', pwdc.removePanel, true);

    var body = document.getElementsByTagName('body')[0];
    body.appendChild(bgd);
    body.appendChild(div);
    try { pwd.focus(); } catch(e) {};
    setTimeout(function() { pwd.focus(); }, 250);
    pwdc.initSubdomainSetting();
  },


  icons: {
    // background icon for passwd field 12x14px
    pwdfieldbg:  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAOCAYAAAAbvf3sAAABsUlEQVQoz22QQUgUcRTGf+//n7Hd1ZnM3UwlSRckI8KV8uYl3eoS7KlDFAjSTRepS5cKOtU96BpEeIw6rUJtiEQdKupSbOUhiDRYJtLZWV1nZzzsLC6LH7zT+37ve+/JHZ+7hNxUBkdmeEWaaZrycPjJEgUW8CgDoIJdJhA6Ad7ziGw2i4ggInRKkvPJPCvXRvAaflQYMCiCCVDiJfl8HoB4Eqbud5DJZCgsvmP5VgMwAh9Ni3K5HACJFMzeu0TOXcSyLP5+jhJqLk5Qp06bUpzkavCC52+eANAzEiW4G3yPdXNOmxitQKlUQutGeO8ZmH4YAb9WWLWPc9mIkUirKWkCvUNdXClUMK0QawAk6qgPj/lY/sYXf4ftSW5TLBYBCL04f97GsPr3zQC66lBTBqY9yPCP1LOeB/NP9b818Coea699JubAiO0DEtWp8RtcH5vhYt84o2achCiEA9R8aXXjE5tVBwl8dkTji0aUgRaFDusENRd36zfrrVO6gdOHbMbSFxjtP8sxawDbTGDWdwmqDpXyV5z22C7gBDAE9AE20LxgG9g8aE8VGY8Ch9uA/3vJy33OfZE10QAAAABJRU5ErkJggg%3D%3D",
    // show in cleartext
    icnShow: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAIAAADZF8uwAAAAkUlEQVR4nGL4TwRgwCWxc%2BfOU6dOQRUZowKI6N%2B%2Ff93c3Ly8vBCKMI3Ztm1bZ2dnenr65cuXcSoKCwt7%2BPDh4cOHs7KysCt6%2Ffo1Pz%2B%2Fs7Ozk5MTkPH582csiiZMmDBlyhQIu6amZubMmVgUGRkZvXr1CsK%2Bffu2oaEhdjdBAFyKaEV4AFQRLmOQAQAAAP%2F%2FAwB27VC%2BrCyA0QAAAABJRU5ErkJggg%3D%3D",
    // hide passwd (show as *****)
    icnHide: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMAgMAAAArG7R0AAAADFBMVEX%2F%2F%2F%2FMzMxmZmYzMzM7z8wMAAAAJ0lEQVQImWNgAIMEhv%2FH0hgOMEYwHGAD0kD%2BAaAoBBuA8f%2F%2FH0AKARI5DD%2FY1kZdAAAAAElFTkSuQmCC",
    // plus sign (use full host name)
    icnPlus: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAkAAAAJCAAAAADF%2BlnMAAAAHUlEQVR42mNogQGGlv8QAGExYLAYQACnLFwvDAAA6Fk4WdfT%2FgAAAAAASUVORK5CYII%3D",
    // minus sign (use top level domain name)
    icnMin: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAkAAAAJCAAAAADF%2BlnMAAAAGUlEQVR42mNogQGGlv8QgIvFAAL%2FCaqDAQCbtDxVGHcjrgAAAABJRU5ErkJggg%3D%3D"
  },
  // http://www.surbl.org/two-level-tlds
  // retrieved: 2006-08-21
  domains: ["com.ac","edu.ac","gov.ac","net.ac","mil.ac","org.ac","com.ae","net.ae","org.ae","gov.ae","ac.ae","co.ae","sch.ae","pro.ae","com.ai","org.ai","edu.ai","gov.ai","com.ar","net.ar","org.ar","gov.ar","mil.ar","edu.ar","int.ar","co.at","ac.at","or.at","gv.at","priv.at","com.au","gov.au","org.au","edu.au","id.au","oz.au","info.au","net.au","asn.au","csiro.au","telememo.au","conf.au","otc.au","id.au","com.az","net.az","org.az","com.bb","net.bb","org.bb","ac.be","belgie.be","dns.be","fgov.be","com.bh","gov.bh","net.bh","edu.bh","org.bh","com.bm","edu.bm","gov.bm","org.bm","net.bm","adm.br","adv.br","agr.br","am.br","arq.br","art.br","ato.br","bio.br","bmd.br","cim.br","cng.br","cnt.br","com.br","coop.br","ecn.br","edu.br","eng.br","esp.br","etc.br","eti.br","far.br","fm.br","fnd.br","fot.br","fst.br","g12.br","ggf.br","gov.br","imb.br","ind.br","inf.br","jor.br","lel.br","mat.br","med.br","mil.br","mus.br","net.br","nom.br","not.br","ntr.br","odo.br","org.br","ppg.br","pro.br","psc.br","psi.br","qsl.br","rec.br","slg.br","srv.br","tmp.br","trd.br","tur.br","tv.br","vet.br","zlg.br","com.bs","net.bs","org.bs","ab.ca","bc.ca","mb.ca","nb.ca","nf.ca","nl.ca","ns.ca","nt.ca","nu.ca","on.ca","pe.ca","qc.ca","sk.ca","yk.ca","gc.ca","co.ck","net.ck","org.ck","edu.ck","gov.ck","com.cn","edu.cn","gov.cn","net.cn","org.cn","ac.cn","ah.cn","bj.cn","cq.cn","gd.cn","gs.cn","gx.cn","gz.cn","hb.cn","he.cn","hi.cn","hk.cn","hl.cn","hn.cn","jl.cn","js.cn","ln.cn","mo.cn","nm.cn","nx.cn","qh.cn","sc.cn","sn.cn","sh.cn","sx.cn","tj.cn","tw.cn","xj.cn","xz.cn","yn.cn","zj.cn","arts.co","com.co","edu.co","firm.co","gov.co","info.co","int.co","nom.co","mil.co","org.co","rec.co","store.co","web.co","ac.cr","co.cr","ed.cr","fi.cr","go.cr","or.cr","sa.cr","com.cu","net.cu","org.cu","ac.cy","com.cy","gov.cy","net.cy","org.cy","co.dk","art.do","com.do","edu.do","gov.do","gob.do","org.do","mil.do","net.do","sld.do","web.do","com.dz","org.dz","net.dz","gov.dz","edu.dz","ass.dz","pol.dz","art.dz","com.ec","k12.ec","edu.ec","fin.ec","med.ec","gov.ec","mil.ec","org.ec","net.ec","com.ee","pri.ee","fie.ee","org.ee","med.ee","com.eg","edu.eg","eun.eg","gov.eg","net.eg","org.eg","sci.eg","com.er","net.er","org.er","edu.er","mil.er","gov.er","ind.er","com.es","org.es","gob.es","edu.es","nom.es","com.et","gov.et","org.et","edu.et","net.et","biz.et","name.et","info.et","ac.fj","com.fj","gov.fj","id.fj","org.fj","school.fj","com.fk","ac.fk","gov.fk","net.fk","nom.fk","org.fk","asso.fr","nom.fr","barreau.fr","com.fr","prd.fr","presse.fr","tm.fr","aeroport.fr","assedic.fr","avocat.fr","avoues.fr","cci.fr","chambagri.fr","chirurgiens-dentistes.fr","experts-comptables.fr","geometre-expert.fr","gouv.fr","greta.fr","huissier-justice.fr","medecin.fr","notaires.fr","pharmacien.fr","port.fr","veterinaire.fr","com.ge","edu.ge","gov.ge","mil.ge","net.ge","org.ge","pvt.ge","co.gg","org.gg","sch.gg","ac.gg","gov.gg","ltd.gg","ind.gg","net.gg","alderney.gg","guernsey.gg","sark.gg","com.gr","edu.gr","gov.gr","net.gr","org.gr","com.gt","edu.gt","net.gt","gob.gt","org.gt","mil.gt","ind.gt","com.gu","edu.gu","net.gu","org.gu","gov.gu","mil.gu","com.hk","net.hk","org.hk","idv.hk","gov.hk","edu.hk","co.hu","2000.hu","erotika.hu","jogasz.hu","sex.hu","video.hu","info.hu","agrar.hu","film.hu","konyvelo.hu","shop.hu","org.hu","bolt.hu","forum.hu","lakas.hu","suli.hu","priv.hu","casino.hu","games.hu","media.hu","szex.hu","sport.hu","city.hu","hotel.hu","news.hu","tozsde.hu","tm.hu","erotica.hu","ingatlan.hu","reklam.hu","utazas.hu","ac.id","co.id","go.id","mil.id","net.id","or.id","co.il","net.il","org.il","ac.il","gov.il","k12.il","muni.il","idf.il","co.im","net.im","org.im","ac.im","lkd.co.im","gov.im","nic.im","plc.co.im","co.in","net.in","ac.in","ernet.in","gov.in","nic.in","res.in","gen.in","firm.in","mil.in","org.in","ind.in","ac.ir","co.ir","gov.ir","id.ir","net.ir","org.ir","sch.ir","ac.je","co.je","net.je","org.je","gov.je","ind.je","jersey.je","ltd.je","sch.je","com.jo","org.jo","net.jo","gov.jo","edu.jo","mil.jo","ad.jp","ac.jp","co.jp","go.jp","or.jp","ne.jp","gr.jp","ed.jp","lg.jp","net.jp","org.jp","gov.jp","hokkaido.jp","aomori.jp","iwate.jp","miyagi.jp","akita.jp","yamagata.jp","fukushima.jp","ibaraki.jp","tochigi.jp","gunma.jp","saitama.jp","chiba.jp","tokyo.jp","kanagawa.jp","niigata.jp","toyama.jp","ishikawa.jp","fukui.jp","yamanashi.jp","nagano.jp","gifu.jp","shizuoka.jp","aichi.jp","mie.jp","shiga.jp","kyoto.jp","osaka.jp","hyogo.jp","nara.jp","wakayama.jp","tottori.jp","shimane.jp","okayama.jp","hiroshima.jp","yamaguchi.jp","tokushima.jp","kagawa.jp","ehime.jp","kochi.jp","fukuoka.jp","saga.jp","nagasaki.jp","kumamoto.jp","oita.jp","miyazaki.jp","kagoshima.jp","okinawa.jp","sapporo.jp","sendai.jp","yokohama.jp","kawasaki.jp","nagoya.jp","kobe.jp","kitakyushu.jp","utsunomiya.jp","kanazawa.jp","takamatsu.jp","matsuyama.jp","com.kh","net.kh","org.kh","per.kh","edu.kh","gov.kh","mil.kh","ac.kr","co.kr","go.kr","ne.kr","or.kr","pe.kr","re.kr","seoul.kr","kyonggi.kr","com.kw","net.kw","org.kw","edu.kw","gov.kw","com.la","net.la","org.la","com.lb","org.lb","net.lb","edu.lb","gov.lb","mil.lb","com.lc","edu.lc","gov.lc","net.lc","org.lc","com.lv","net.lv","org.lv","edu.lv","gov.lv","mil.lv","id.lv","asn.lv","conf.lv","com.ly","net.ly","org.ly","co.ma","net.ma","org.ma","press.ma","ac.ma","com.mk","com.mm","net.mm","org.mm","edu.mm","gov.mm","com.mn","org.mn","edu.mn","gov.mn","museum.mn","com.mo","net.mo","org.mo","edu.mo","gov.mo","com.mt","net.mt","org.mt","edu.mt","tm.mt","uu.mt","com.mx","net.mx","org.mx","gob.mx","edu.mx","com.my","org.my","gov.my","edu.my","net.my","com.na","org.na","net.na","alt.na","edu.na","cul.na","unam.na","telecom.na","com.nc","net.nc","org.nc","ac.ng","edu.ng","sch.ng","com.ng","gov.ng","org.ng","net.ng","gob.ni","com.ni","net.ni","edu.ni","nom.ni","org.ni","com.np","net.np","org.np","gov.np","edu.np","ac.nz","co.nz","cri.nz","gen.nz","geek.nz","govt.nz","iwi.nz","maori.nz","mil.nz","net.nz","org.nz","school.nz","com.om","co.om","edu.om","ac.om","gov.om","net.om","org.om","mod.om","museum.om","biz.om","pro.om","med.om","com.pa","net.pa","org.pa","edu.pa","ac.pa","gob.pa","sld.pa","edu.pe","gob.pe","nom.pe","mil.pe","org.pe","com.pe","net.pe","com.pg","net.pg","ac.pg","com.ph","net.ph","org.ph","mil.ph","ngo.ph","aid.pl","agro.pl","atm.pl","auto.pl","biz.pl","com.pl","edu.pl","gmina.pl","gsm.pl","info.pl","mail.pl","miasta.pl","media.pl","mil.pl","net.pl","nieruchomosci.pl","nom.pl","org.pl","pc.pl","powiat.pl","priv.pl","realestate.pl","rel.pl","sex.pl","shop.pl","sklep.pl","sos.pl","szkola.pl","targi.pl","tm.pl","tourism.pl","travel.pl","turystyka.pl","com.pk","net.pk","edu.pk","org.pk","fam.pk","biz.pk","web.pk","gov.pk","gob.pk","gok.pk","gon.pk","gop.pk","gos.pk","edu.ps","gov.ps","plo.ps","sec.ps","com.pt","edu.pt","gov.pt","int.pt","net.pt","nome.pt","org.pt","publ.pt","com.py","net.py","org.py","edu.py","com.qa","net.qa","org.qa","edu.qa","gov.qa","asso.re","com.re","nom.re","com.ro","org.ro","tm.ro","nt.ro","nom.ro","info.ro","rec.ro","arts.ro","firm.ro","store.ro","www.ro","com.ru","net.ru","org.ru","gov.ru","pp.ru","com.sa","edu.sa","sch.sa","med.sa","gov.sa","net.sa","org.sa","pub.sa","com.sb","net.sb","org.sb","edu.sb","gov.sb","com.sd","net.sd","org.sd","edu.sd","sch.sd","med.sd","gov.sd","tm.se","press.se","parti.se","brand.se","fh.se","fhsk.se","fhv.se","komforb.se","kommunalforbund.se","komvux.se","lanarb.se","lanbib.se","naturbruksgymn.se","sshn.se","org.se","pp.se","com.sg","net.sg","org.sg","edu.sg","gov.sg","per.sg","com.sh","net.sh","org.sh","edu.sh","gov.sh","mil.sh","gov.st","saotome.st","principe.st","consulado.st","embaixada.st","org.st","edu.st","net.st","com.st","store.st","mil.st","co.st","com.sv","org.sv","edu.sv","gob.sv","red.sv","com.sy","net.sy","org.sy","gov.sy","ac.th","co.th","go.th","net.th","or.th","com.tn","net.tn","org.tn","edunet.tn","gov.tn","ens.tn","fin.tn","nat.tn","ind.tn","info.tn","intl.tn","rnrt.tn","rnu.tn","rns.tn","tourism.tn","com.tr","net.tr","org.tr","edu.tr","gov.tr","mil.tr","bbs.tr","k12.tr","gen.tr","co.tt","com.tt","org.tt","net.tt","biz.tt","info.tt","pro.tt","int.tt","coop.tt","jobs.tt","mobi.tt","travel.tt","museum.tt","aero.tt","name.tt","gov.tt","edu.tt","nic.tt","us.tt","uk.tt","ca.tt","eu.tt","es.tt","fr.tt","it.tt","se.tt","dk.tt","be.tt","de.tt","at.tt","au.tt","co.tv","com.tw","net.tw","org.tw","edu.tw","idv.tw","gov.tw","com.ua","net.ua","org.ua","edu.ua","gov.ua","ac.ug","co.ug","or.ug","go.ug","co.uk","me.uk","org.uk","edu.uk","ltd.uk","plc.uk","net.uk","sch.uk","nic.uk","ac.uk","gov.uk","nhs.uk","police.uk","mod.uk","dni.us","fed.us","com.uy","edu.uy","net.uy","org.uy","gub.uy","mil.uy","com.ve","net.ve","org.ve","co.ve","edu.ve","gov.ve","mil.ve","arts.ve","bib.ve","firm.ve","info.ve","int.ve","nom.ve","rec.ve","store.ve","tec.ve","web.ve","co.vi","net.vi","org.vi","com.vn","biz.vn","edu.vn","gov.vn","net.vn","org.vn","int.vn","ac.vn","pro.vn","info.vn","health.vn","name.vn","com.vu","edu.vu","net.vu","org.vu","de.vu","ch.vu","fr.vu","com.ws","net.ws","org.ws","gov.ws","edu.ws","ac.yu","co.yu","edu.yu","org.yu","com.ye","net.ye","org.ye","gov.ye","edu.ye","mil.ye","ac.za","alt.za","bourse.za","city.za","co.za","edu.za","gov.za","law.za","mil.za","net.za","ngo.za","nom.za","org.za","school.za","tm.za","web.za","co.zw","ac.zw","org.zw","gov.zw","eu.org","au.com","br.com","cn.com","de.com","de.net","eu.com","gb.com","gb.net","hu.com","no.com","qc.com","ru.com","sa.com","se.com","uk.com","uk.net","us.com","uy.com","za.com","dk.org","tel.no","fax.nr","mob.nr","mobil.nr","mobile.nr","tel.nr","tlf.nr","e164.arpa"]

};



// MD5 stuff
function hex_md5(s) {
  return binl2hex(core_md5(str2binl(s), s.length * 8));
}
function core_md5(x, len) {
  x[len >> 5] |= 0x80 << ((len) % 32);
  x[(((len + 64) >>>9) << 4) + 14] = len;
  var a = 1732584193;
  var b = -271733879;
  var c = -1732584194;
  var d = 271733878;
  for (var i = 0; i < x.length; i += 16) {
    var olda = a;
    var oldb = b;
    var oldc = c;
    var oldd = d;
    a = md5_ff(a, b, c, d, x[i + 0], 7, -680876936);
    d = md5_ff(d, a, b, c, x[i + 1], 12, -389564586);
    c = md5_ff(c, d, a, b, x[i + 2], 17, 606105819);
    b = md5_ff(b, c, d, a, x[i + 3], 22, -1044525330);
    a = md5_ff(a, b, c, d, x[i + 4], 7, -176418897);
    d = md5_ff(d, a, b, c, x[i + 5], 12, 1200080426);
    c = md5_ff(c, d, a, b, x[i + 6], 17, -1473231341);
    b = md5_ff(b, c, d, a, x[i + 7], 22, -45705983);
    a = md5_ff(a, b, c, d, x[i + 8], 7, 1770035416);
    d = md5_ff(d, a, b, c, x[i + 9], 12, -1958414417);
    c = md5_ff(c, d, a, b, x[i + 10], 17, -42063);
    b = md5_ff(b, c, d, a, x[i + 11], 22, -1990404162);
    a = md5_ff(a, b, c, d, x[i + 12], 7, 1804603682);
    d = md5_ff(d, a, b, c, x[i + 13], 12, -40341101);
    c = md5_ff(c, d, a, b, x[i + 14], 17, -1502002290);
    b = md5_ff(b, c, d, a, x[i + 15], 22, 1236535329);
    a = md5_gg(a, b, c, d, x[i + 1], 5, -165796510);
    d = md5_gg(d, a, b, c, x[i + 6], 9, -1069501632);
    c = md5_gg(c, d, a, b, x[i + 11], 14, 643717713);
    b = md5_gg(b, c, d, a, x[i + 0], 20, -373897302);
    a = md5_gg(a, b, c, d, x[i + 5], 5, -701558691);
    d = md5_gg(d, a, b, c, x[i + 10], 9, 38016083);
    c = md5_gg(c, d, a, b, x[i + 15], 14, -660478335);
    b = md5_gg(b, c, d, a, x[i + 4], 20, -405537848);
    a = md5_gg(a, b, c, d, x[i + 9], 5, 568446438);
    d = md5_gg(d, a, b, c, x[i + 14], 9, -1019803690);
    c = md5_gg(c, d, a, b, x[i + 3], 14, -187363961);
    b = md5_gg(b, c, d, a, x[i + 8], 20, 1163531501);
    a = md5_gg(a, b, c, d, x[i + 13], 5, -1444681467);
    d = md5_gg(d, a, b, c, x[i + 2], 9, -51403784);
    c = md5_gg(c, d, a, b, x[i + 7], 14, 1735328473);
    b = md5_gg(b, c, d, a, x[i + 12], 20, -1926607734);
    a = md5_hh(a, b, c, d, x[i + 5], 4, -378558);
    d = md5_hh(d, a, b, c, x[i + 8], 11, -2022574463);
    c = md5_hh(c, d, a, b, x[i + 11], 16, 1839030562);
    b = md5_hh(b, c, d, a, x[i + 14], 23, -35309556);
    a = md5_hh(a, b, c, d, x[i + 1], 4, -1530992060);
    d = md5_hh(d, a, b, c, x[i + 4], 11, 1272893353);
    c = md5_hh(c, d, a, b, x[i + 7], 16, -155497632);
    b = md5_hh(b, c, d, a, x[i + 10], 23, -1094730640);
    a = md5_hh(a, b, c, d, x[i + 13], 4, 681279174);
    d = md5_hh(d, a, b, c, x[i + 0], 11, -358537222);
    c = md5_hh(c, d, a, b, x[i + 3], 16, -722521979);
    b = md5_hh(b, c, d, a, x[i + 6], 23, 76029189);
    a = md5_hh(a, b, c, d, x[i + 9], 4, -640364487);
    d = md5_hh(d, a, b, c, x[i + 12], 11, -421815835);
    c = md5_hh(c, d, a, b, x[i + 15], 16, 530742520);
    b = md5_hh(b, c, d, a, x[i + 2], 23, -995338651);
    a = md5_ii(a, b, c, d, x[i + 0], 6, -198630844);
    d = md5_ii(d, a, b, c, x[i + 7], 10, 1126891415);
    c = md5_ii(c, d, a, b, x[i + 14], 15, -1416354905);
    b = md5_ii(b, c, d, a, x[i + 5], 21, -57434055);
    a = md5_ii(a, b, c, d, x[i + 12], 6, 1700485571);
    d = md5_ii(d, a, b, c, x[i + 3], 10, -1894986606);
    c = md5_ii(c, d, a, b, x[i + 10], 15, -1051523);
    b = md5_ii(b, c, d, a, x[i + 1], 21, -2054922799);
    a = md5_ii(a, b, c, d, x[i + 8], 6, 1873313359);
    d = md5_ii(d, a, b, c, x[i + 15], 10, -30611744);
    c = md5_ii(c, d, a, b, x[i + 6], 15, -1560198380);
    b = md5_ii(b, c, d, a, x[i + 13], 21, 1309151649);
    a = md5_ii(a, b, c, d, x[i + 4], 6, -145523070);
    d = md5_ii(d, a, b, c, x[i + 11], 10, -1120210379);
    c = md5_ii(c, d, a, b, x[i + 2], 15, 718787259);
    b = md5_ii(b, c, d, a, x[i + 9], 21, -343485551);
    a = safe_add(a, olda);
    b = safe_add(b, oldb);
    c = safe_add(c, oldc);
    d = safe_add(d, oldd);
  }
  return Array(a, b, c, d);
}
function md5_cmn(q, a, b, x, s, t) {
  return safe_add(bit_rol(safe_add(safe_add(a, q), safe_add(x, t)), s), b);
}
function md5_ff(a, b, c, d, x, s, t) {
  return md5_cmn((b & c) | ((~b) & d), a, b, x, s, t);
}
function md5_gg(a, b, c, d, x, s, t) {
  return md5_cmn((b & d) | (c & (~d)), a, b, x, s, t);
}
function md5_hh(a, b, c, d, x, s, t) {
  return md5_cmn(b ^ c ^ d, a, b, x, s, t);
}
function md5_ii(a, b, c, d, x, s, t) {
  return md5_cmn(c ^ (b | (~d)), a, b, x, s, t);
}
function safe_add(x, y) {
  var lsw = (x & 0xFFFF) + (y & 0xFFFF);
  var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
  return (msw << 16) | (lsw & 0xFFFF);
}
function bit_rol(num, cnt) {
  return (num << cnt) | (num >>>(32 - cnt));
}
function str2binl(str) {
  var bin = Array();
  var mask = (1 << 8) - 1;
  for (var i = 0; i < str.length * 8; i += 8) {
    bin[i >> 5] |= (str.charCodeAt(i / 8) & mask) << (i % 32);
  }
  return bin;
}
function binl2hex(binarray) {
  var hex_tab = '0123456789abcdef';
  var str = '';
  for (var i = 0; i < binarray.length * 4; i++) {
    str += hex_tab.charAt((binarray[i >> 2] >> ((i % 4) * 8 + 4)) & 0xF) + hex_tab.charAt((binarray[i >> 2] >> ((i % 4) * 8)) & 0xF);
  }
  return str;
}
// end MD5 stuff



// INITIALIZE
// change password field style: background image, color
// add double click listener to open panel on current field
pwdc.initFlds(document);

// Ajax: new node listener
pwdc.addEventListener(document, "DOMNodeInserted",
  function(evt) {
    evt = (evt) ? evt : window.event;
    var elem = (evt.target) ? evt.target : evt.srcElement;
    if (1 == elem.nodeType) pwdc.initFlds(elem);
  }, true);
// Ajax: attribute change listener
pwdc.addEventListener(document, "DOMAttrModified",
  function(evt) {
    pwdc.initFldsSoon();
  }, true);

// add menu command to manually launch passwd composer
if (typeof(GM_registerMenuCommand) == 'function') {
  try {
    GM_registerMenuCommand("Password Composer", pwdc.addPanel, "p", "shift control", "p");
  } catch (e) {
    // There is a bug with GM 0.5.1 and 0.5.2 (beta) which kills the 5 args version.
    GM_registerMenuCommand("Password Composer Shift+Ctrl+P", pwdc.addPanel);
    // listen for SHIFT-CTRL-P keypress
    window.addEventListener("keyup", function(e) { if (e.keyCode == 80 && e.ctrlKey && e.shiftKey) pwdc.addPanel(); }, true);
  }
} else {
  // listen for SHIFT-CTRL-P keypress
  pwdc.addEventListener(window, "keyup", function(e) { if (e.keyCode == 80 && e.ctrlKey && e.shiftKey) pwdc.addPanel(); }, true);
}

// end user script
// vim: ts=4 noet ai :
