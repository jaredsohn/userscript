// ==UserScript==
// @name           EA MasterID changer
// @namespace      armeagle.nl
// @description    Change your EA MasterID easily
// @include        https://synergy.eamobile.com/user/
// ==/UserScript==

/**
 * EA Origin ID changer, the JavaScript version
 * By: ArmEagle
 * Based on: http://www.reddit.com/r/battlefield3/comments/lcf7d/eaorigin_id_changer_for_windows/
 * What it does -
 * 1> Send your origin email and password to EA and get your user ID number and an encrypted token back
 * 2> Send encrypted token and user ID number back to EA for decrpytion
 * 3> Send decrypted token, user ID number and new origin ID name using PUT method (for some reason), if responce is blank then it worked
 *
 * Browse to https://synergy.eamobile.com/user/ which gives an error page. Then insert the code below (console, or other means);
 */

var idChanger = {
  hwId: '0',                                  // Hardware ID, required by server
  apiVer: '1.0.0',                            // API version, required by server
  host: 'https://synergy.eamobile.com/',      // The server to send stuff to
  uid: '1',                                   // User ID, needed for login step 1 which then sends the real user ID for later
  email: '',
  password: '',
  newUserName: '',
  getUserIdAttempted: false,
  formSubmit: function(e) {
    if (e.stopPropagation) e.stopPropagation();
    else e.cancelBubble = true;

    if (e.preventDefault) e.preventDefault();
    else e.returnValue = false;

    this.email = document.getElementById('email').value;
    this.password = document.getElementById('password').value;
    this.newUserName = document.getElementById('name').value;

    // Some basic validation
    if ('' == this.email || '' == this.pass || '' == this.newUserName) {
      this.log("[!] You're missing some info!");
    } else {
      this.login();
    }
    return false;
  },
  login: function() {
    // Login step 1
    // Make sure email and password are valid, get encrpyted token
    this.log("Here we go!");
    this.log("Logging in...");
    
    this.call(this.host + 'user/api/core/authenticateUser',
              {'hwId': this.hwId, 'apiVer': this.apiVer, 'uid': this.uid, 'email': this.email, 'password': this.password},
              this.bind(this, this.loginCallback)
              );
  },
  loginCallback: function(json) {
    if (null == json.encryptedToken) {
      // If the user has never loggin in to an EA mobile game and this if the first time we're changing name
      // we need to get an anonymous user ID thing
      if (!this.getUserIdAttempted) {
        this.getUserIdAttempted = true;
        this.log('Possible first time name change, need anonymous ID');
        this.call(this.host + 'user/api/android/getAnonUid',
                {'hwId': this.hwId, 'apiVer': this.apiVer, 'androidId': '0'},
                this.bind(this, this.getAnonIdCallback)
                );
      } else {
        this.log('[!] Couldn\'t login (step 1, probably wrong email or password) :/');
      }
      return;
    }
    if (null == json.user) {
      this.log('[!] No user info!');
    }
    this.uid = json.user.uid;
    this.log('Login step 1 complete...');
    
    // Login step 2
    // Decrypt token
    this.call(this.host + 'user/api/core/getAuthToken',
              {'hwId': this.hwId, 'apiVer': this.apiVer, 'uid': this.uid, 'encryptedToken': json.encryptedToken},
              this.bind(this, this.getAuthTokenCallback)
              );
  },
  getAnonIdCallback: function(json) {
    if (null != json.uid && '' != json.uid) {
      this.log('Setting uid to: '+ json.uid);
      this.uid = json.uid;
      
      // Lets try again
      this.call(this.host + 'user/api/core/authenticateUser',
              {'hwId': this.hwId, 'apiVer': this.apiVer, 'uid': this.uid, 'email': this.email, 'password': this.password},
              this.bind(this, this.loginCallback)
              );
      return;
    } else {
      this.log('[!] Did not get new Anonymous ID');
    }
  },
  getAuthTokenCallback: function(json) {
    if ('' == json.authToken)
    {
      this.log('[!] Couldn\'t login (step 2, unusal for this one to go wrong) :/');
      return;
    }
    this.log('Login step 2 complete, now changing ID...');
    // Do the name changing
    this.call(this.host + 'user/api/core/changeUserName',
              {'hwId': this.hwId, 'apiVer': this.apiVer, 'uid': this.uid, 'authToken': json.authToken, 'newUserName': this.newUserName},
              this.bind(this, this.changeNameCallback),
              'PUT'
              );
  },
  changeNameCallback: function(json) {
    if (null != json.suggestedUsernames) {
      this.log('[!] Name not available, suggestions: '+ json.suggestedUsernames.join(', or'));
      return;
    } else if (null != json.message) {
      this.log('[!] Error: '+ json.message);
      return;
    }
    this.log('Your ID has been changed!');
  },
  
  buildForm: function() {
    var body = document.getElementsByTagName('body')[0];
    body.innerHTML = '';
    var form = document.createElement('form');
    var emailLabel = document.createElement('label');
    emailLabel.setAttribute('for', 'email');
    emailLabel.appendChild(document.createTextNode('Email:'));
    form.appendChild(emailLabel);

    var email = document.createElement('input');
    email.setAttribute('type', 'text');
    email.setAttribute('name', 'email');
    email.setAttribute('id', 'email');
    form.appendChild(email);
    form.appendChild(document.createElement('br'));

    var passwordLabel = document.createElement('label');
    passwordLabel.setAttribute('for', 'password');
    passwordLabel.appendChild(document.createTextNode('Password:'));
    form.appendChild(passwordLabel);

    var password = document.createElement('input');
    password.setAttribute('type', 'text');
    password.setAttribute('name', 'password');
    password.setAttribute('id', 'password');
    form.appendChild(password);
    form.appendChild(document.createElement('br'));
    
    var nameLabel = document.createElement('label');
    nameLabel.setAttribute('for', 'name');
    nameLabel.appendChild(document.createTextNode('New name:'));
    form.appendChild(nameLabel);

    var name = document.createElement('input');
    name.setAttribute('type', 'text');
    name.setAttribute('name', 'name');
    name.setAttribute('id', 'name');
    form.appendChild(name);
    form.appendChild(document.createElement('br'));

    var submit = document.createElement('input');
    submit.setAttribute('type', 'submit');
    if (form.addEventListener) {
      form.addEventListener("submit", this.bind(this, this.formSubmit), false);
    } else if (form.attachEvent) {
      form.attachEvent("onsubmit", this.bind(this, this.formSubmit));
    }
    form.appendChild(submit);
    body.appendChild(form);

    var logTable = document.createElement('table');
    logTable.setAttribute('border', '1');
    logTable.setAttribute('cellpadding', '0');
    logTable.setAttribute('cellspacing', '0');
    logTable.setAttribute('width', '100%');
    var logBody = document.createElement('tbody');
    logBody.setAttribute('id', 'log');
    logTable.appendChild(logBody);
    body.appendChild(logTable);
  },

  log: function(leftString, rightString) {
    var log = document.getElementById('log');
    var row = document.createElement('tr');
    if (0 < log.childNodes.length) {
      log.insertBefore(row, log.childNodes[0]);
    } else {
      log.appendChild(row);
    }

    var left = document.createElement('td');
    left.appendChild(document.createTextNode(leftString));
    row.appendChild(left);

    if (null == rightString || '' == rightString) {
      left.setAttribute('colspan', '2');
    } else {
      var right = document.createElement('td');
      right.appendChild(document.createTextNode(rightString));
      right.setAttribute('width', '50%');
      row.appendChild(right);
    }
  },

  call: function(url, params, jsonCallback, method) {
    if (undefined === method) {
      method = 'GET';
    }
    if (null != params) {
      var paramsArray = new Array();
      for (var key in params) {
        paramsArray.push(key +'='+ params[key]);
      }
      url += '?'+ paramsArray.join('&');
    }
    
    var httpRequest;
    if (window.XMLHttpRequest) { // Mozilla, Safari, ...
      httpRequest = new XMLHttpRequest();
    } else if (window.ActiveXObject) { // IE 8 and older
      httpRequest = new ActiveXObject("Microsoft.XMLHTTP");
    }
    this.log(method +' '+ url, '');
    httpRequest.onreadystatechange = this.bind(this, function() {
      if (4 == httpRequest.readyState) {
        if (200 == httpRequest.status) {
          this.log('----->', httpRequest.responseText);
          json = JSON.parse(httpRequest.responseText);
          if (null != json.message) {
            this.log('[!] Error from server: '+ json.message);
          }
          jsonCallback(json);
        } else {
          this.log('[!] error: '+ httpRequest.responseText, '');
        }
      }
    });
    httpRequest.open(method, url, true);
    httpRequest.send(null);
  },
  bind: function(scope, fn) {
    return function () {
    	fn.apply(scope, arguments);
    };
  },
};
idChanger.buildForm();