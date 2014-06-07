// ==UserScript==
// @name       Betterplace Dev shortcuts
// @namespace  http://use.i.E.your.homepage/
// @version    0.1
// @description  enter something useful
// @match      http://*.betterplace.dev/*
// @match      http://*.bp42.com/*
// @match      http://*.betterplace.org/*
// @require    http://cdn.craig.is/js/mousetrap/mousetrap.min.js?c13bc
// @require    http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js
// @copyright  2013+, Gregory Igelmund
// ==/UserScript==

Mousetrap.bind('?', function() {
    var helpMsg = '';
    helpMsg += '? : Show help\n';
    helpMsg += 'S : Call environment switcher\n';
    helpMsg += '\n';
    alert(helpMsg);
    return false;
});

Mousetrap.bind('S', function() {
  var environmentDomains = {
    'development': 'betterplace.dev',
    'staging': 'bp42.com',
    'production': 'betterplace.org'
  };
  var environmentsShortId = {
    D: 'development',
    S: 'staging',
    P: 'production'
  };
  
  var currentUrl = window.location.href;
  var currentEnv = false;
  var env;
  for(env in environmentDomains) {
    var environmentUrl = environmentDomains[env];
    if(currentUrl.match(environmentUrl)) {
      currentEnv = env;
    }
  }
  if(!currentEnv) { alert('Could not detect a valid environment!'); return false; }
  var currentEnvDomain = environmentDomains[currentEnv];
  
  var targetEnvShortId = window.prompt('Which env to switch to? (D)ev, (S)taging, (P)roduction:');
  var targetEnv        = environmentsShortId[targetEnvShortId] || false;
  if(!targetEnv) { alert('Ungültiges environment: ' + targetEnvShortId); return false; }
  
  var targetEnvDomain  = environmentDomains[targetEnv];
  var targetUrl        = currentUrl.replace(currentEnvDomain, targetEnvDomain);

  window.location.href = targetUrl;  
  return false;
});


console.log('Loaded Betterplace Dev Keyboard Shortcuts');