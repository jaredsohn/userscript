// ==UserScript==
// @name           last.fm About Me Preview
// @namespace      http://z3c.info/
// @description    Displays the Preview button when editing "About You" section in user settings
// @include        http://www.last.fm/settings
// @include        http://www.lastfm*/settings
// ==/UserScript==

$ = unsafeWindow.$;
$$ = unsafeWindow.$$;
uwd = unsafeWindow.document;

var Preview = {
  request: function (previewText) {
    this.previewButtonText = previewText;
    var tac = $$('textarea[name="bio"]')[0].value;

    GM_xmlhttpRequest({
      method: "POST",
      url: 'http://' + window.location.hostname + '/ajax/renderarticle/',
      headers: {
        "User-Agent": "Greasemokey script",
        "Accept": "text/monkey,text/xml",
        "Content-Type": 'application/x-www-form-urlencoded'
        },
      data: 'content=' + encodeURIComponent(tac),
      onload: Preview.onLoad
    });
  },

  onLoad: function (details) {
    Preview.display(details.responseText);
    $('editorPreview').disabled = false;
    $('editorPreview').value = Preview.previewButtonText;
  },

  display: function (preview) {
    $('editorPreviewPane').update(  preview);
  }
};

var Handle = {
  editorPreview: {
    click: function (e) {
      var previewText = $('editorPreview').value

      setTimeout(function () {
        Preview.request(previewText);
      }, 0);

      $('editorPreview').disabled = true;
      $('editorPreview').value = "Loa... wait for it... ding...";
      e.stop();
    }
  }
};

$$("textarea[name='bio']")[0]
  .up() // td
    .insert( 
      uwd.createElement('p')
        .insert(
          uwd.createElement('input')
            .writeAttribute('id', 'editorPreview')
            .writeAttribute('type', 'button')
            .writeAttribute('value', 'Preview')
        ))
  .up()
  .next()
    .insert({
      after: uwd.createElement('tr')
        .insert(uwd.createElement('td')
          .addClassName("label")
          .insert('<label for="blah">Preview</label>')
        )
        .insert(uwd.createElement('td')
          .addClassName("element")
          .insert(uwd.createElement('div')
            .writeAttribute('id', 'editorPreviewContainer')
            .insert(uwd.createElement('div')
              .writeAttribute('id', 'editorPreviewPane')
              .setStyle({
                'font-size': '10px',
                width: '300px',
                padding: '15px',
                background: 'url(http://cdn.last.fm/flatness/grids/fiflufi_right_top_gradient.5.png) right bottom transparent'
              })
            )
          )
        )
      });

$('editorPreview')
  .observe("click", Handle.editorPreview.click, false)