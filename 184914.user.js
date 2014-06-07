// ==UserScript==
// @name       Edit summary options
// @description  Gives you little checkboxes above the edit summary with preset options like "formatted code" or "removed signature."
// @version    1.0
// @match      http://*.askubuntu.com/*
// @match      http://*.mathoverflow.net/*
// @match      http://*.onstartups.com/*
// @match      http://*.serverfault.com/*
// @match      http://*.stackapps.com/*
// @match      http://*.stackexchange.com/*
// @match      http://*.stackoverflow.com/*
// @match      http://*.superuser.com/*
// @copyright  Public Domain (no copyright)
// ==/UserScript==

var config = localStorage.__edit_summary_opts_config || {
  Grammar: 'fixed grammar',
  Spelling: 'fixed spelling',
  Format: 'formatting',
  'Code Format': 'formatted code',
  Dethank: 'removed thanks',
  Desig: 'removed signature',
  Degreet: 'removed greeting'
}

$('.edit-post').click(function() {
  var intr = setInterval(function() {
    var ec = $('.edit-comment')
    if (ec.length) {
      clearInterval(intr)
      ec.css('opacity', '1')
      var i = 0
      var summaryDiv = ec.parents().eq(4)
      for (var x in config) {
        summaryDiv.before($('<input>').attr({type: 'checkbox', id: 'cb' + i})
                                      .change((function(x) { return function() {
                                        if (this.checked) {
                                          ec.val(ec.val() ? ec.val() + ', ' + config[x] : config[x])
                                        } else {
                                          ec.val(ec.val().replace(new RegExp(config[x] + '(, )?|, ' + config[x] + '$'), ''))
                                        }
                                      }})(x)))
                  .before($('<label>').attr({for: 'cb' + i++})
                                      .css({padding: '5px'})
                                      .text(x))
      }
      summaryDiv.after($('<button>').text('Edit')
                                    .click(function() {
                                      config = localStorage.__edit_summary_opts_config = JSON.parse(prompt('Enter JSON, formatted like {"checkbox name": "value", ...}', JSON.stringify(config)) || JSON.stringify(config))
                                    }))
    }
  }, 100)
})