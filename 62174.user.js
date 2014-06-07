// ==UserScript==
// @name           XHTML Editor 1.1.1
// @namespace      xhe
// @description    Edit XHTML comfortably on Slashdot.
// @include        http://*.slashdot.org/comments.pl?*&op=Reply*
// @include        http://*.slashdot.org/comments.pl
// ==/UserScript==

function XHTMLEditor(textarea) {
  this.actionRenderer = {
    node: textarea,
    status: {
      node: null,
      text: "" // @todo: localization?
    },
    menu: {
      node: null,
      active: null,
      lists: {
        none: [
          { id: "<Ctrl>", info: "control mode" },
          { id: "<select>", info: "selection mode" },
          { id: "<special>", info: "XHTML entity" },
          { id: "F8", info: "preview" }
        ],
        preview: [
          { id: "F8", info: "editor" }
        ],
        control: [
          { id: "<Enter>", info: "like break" },
          { id: "i", info: "image" },
          { id: "<", info: "<…>" },
          { id: ">", info: "</…>" }
        ],
        selected: [
          { id: "<Ctrl>", info: "control mode" },
          { id: "<special>", info: "XHTML entity" }
        ],
        both: [
          { id: "e", info: "emphasis" },
          { id: "s", info: "strong emphasis" },
          { id: "a", info: "anchor (link)" },
          { id: "p", info: "paragraph" },
          { id: "u", info: "unordered list" },
          { id: "o", info: "ordered list" },
          { id: "d", info: "definition list" },
          { id: "q", info: "quote" },
          { id: "i", info: "image" },
          { id: "<", info: "<…>" },
          { id: ">", info: "</…>" }
        ]
      }
    },
    preview: {
      node: null,
      visible: false
    },
    setStatus: function (text) {
      this.status.text = text
      this.drawStatus()
    },
    showDefaultMenu: function () {
      this.menu.active = this.menu.lists.none
      this.drawMenu()
    },
    showPreviewMenu: function () {
      this.menu.active = this.menu.lists.preview
      this.drawMenu()
    },
    showControlMenu: function () {
      this.menu.active = this.menu.lists.control
      this.drawMenu()
    },
    showSelectedMenu: function () {
      this.menu.active = this.menu.lists.selected
      this.drawMenu()
    },
    showBothMenu: function () {
      this.menu.active = this.menu.lists.both
      this.drawMenu()
    },
    replaceLastCharBy: function (entity) {
      var cursor = this.node.selectionStart
      var len = this.node.selectionEnd - cursor
      this.node.value = this.node.value.slice(0,cursor) +
                        entity + this.node.value.slice(cursor+len)
      this.node.selectionStart = cursor + entity.length
      this.node.selectionEnd = cursor + entity.length
    },
    wrapSelectionIn: function (wrap) {
      var from = this.node.selectionStart
      var to = this.node.selectionEnd
      var txt = this.node.value
      var midtxt = txt.slice(from,to)
      var midlen = 0
      if ("lineBegin" in wrap) {
        midtxt = midtxt.split("\n")
        midlen = midtxt.length * (wrap.lineBegin.length + wrap.lineEnd.length)
        midtxt = midtxt.map(function (line) { return wrap.lineBegin + line + wrap.lineEnd }).join("\n")
      }
      this.node.value = txt.slice(0,from) +
                        wrap.begin + midtxt + wrap.end +
                        txt.slice(to)
      if ("cursorAt" in wrap) {
        this.node.selectionStart = from + wrap.cursorAt
        this.node.selectionEnd = from + wrap.cursorAt
      } else {
        this.node.selectionStart = from
        this.node.selectionEnd = to + wrap.begin.length + midlen + wrap.end.length
      }
    },
    togglePreview: function (visible) {
      this.preview.visible = visible
      this.drawPreview()
      if (visible) { this.showPreviewMenu() }
      else { this.showDefaultMenu() }
    },
    drawStatus: function () {
      this.status.node.firstChild.data = "» "+this.status.text
    },
    drawMenu: function () {
      var m = this.menu.node
      while (m.hasChildNodes()) { m.removeChild(m.firstChild) }
      var l = this.menu.active
      for (var i in this.menu.active) {
        var c = document.createElement("li")
        c.appendChild(document.createTextNode(l[i].id+": "+l[i].info))
        m.appendChild(c)
      }
    },
    drawPreview: function() {
      if (this.preview.visible) {
        this.preview.node.innerHTML = this.node.value
        this.node.style.display = "none"
        this.preview.node.style.display = "block"
        this.preview.node.focus()
      } else {
        this.preview.node.style.display = "none"
        this.node.style.display = "block"
        this.node.focus()
      }
    },
    getWidth: function (diff) {
      //return 800 - diff
      return GM_getValue("width","800") - diff
    },
    drawEditor: function(interpreter) {
      // Stil
      var head = document.getElementsByTagName("head")[0]
      var style = document.createElement("style")
      style.type = "text/css"
      style.appendChild(document.createTextNode(
        '#xhtml-editor { display: block; width: '+this.getWidth(0)+'px; margin: 0; background: #004C4C url(http://a.fsdn.com/sd/topnav-bg.png) repeat-x; padding: 20px; color: #FFF; -moz-border-radius: 10px 50px 10px 50px; }'+
        '#xhtml-editor-infoline { margin: 0; background: #666 url(http://a.fsdn.com/sd/block-title-bg.png) repeat-x; padding: 5px 10px; color: #FFF; -moz-border-radius: 10px 50px 0 0; }'+
        '#xhtml-editor-menu { display: block; float: left; width: 180px; margin: 0; border: 0; background: #666; padding: 0 10px 30px 10px; -moz-border-radius: 0 0 0 35px; overflow: hidden auto; color: #FFF; list-style-type: none; }'+
        '#xhtml-editor-menu li { margin: 0; background: #111; padding: 0 10px; font-size: 13px; }'+
        '#xhtml-editor-menu li:first-child { -moz-border-radius: 10px 0 0 0; }'+
        '#xhtml-editor-menu li:last-child { -moz-border-radius: 0 0 0 10px; }'+
        '#xhtml-editor-textarea, #xhtml-editor-preview { width: '+this.getWidth(220)+'px; margin: 0; border: 0; background: #111; padding: 10px; color: #FFF; -moz-border-radius: 0 0 10px 0; }'+
        '#xhtml-editor-preview { background: #FFF; color: #111; float: left; display: none; font-weight: normal; }'+
        '.br { clear: both; height: 1px; overflow: hidden; }'
      ))
      head.appendChild(style)
      // Editor
      var editor = document.createElement("div")
      editor.id = "xhtml-editor"
      editor.innerHTML =
      '<p id="xhtml-editor-infoline" style="margin-bottom: 0;">» Status: Initialisiere…</p>'+
        '<ul id="xhtml-editor-menu">'+
          '<li>&lt;Ctrl&gt;: control mode</li>'+
          '<li>&lt;select&gt;: selection mode</li>'+
          '<li>&lt;special&gt;: XHTML entity</li>'+
          '<li>F6: preview</li>'+
        '</ul>'+
        '<textarea id="xhtml-editor-textarea" name="postercomment" rows="30" cols="150" wrap="virtual"></textarea>'+
        '<div id="xhtml-editor-preview"></div>'+
        '<div class="br"></div>'
      this.node.parentNode.replaceChild(editor,this.node)
      // Elemente einbinden
      var txt = this.node.value
      this.node = document.getElementById("xhtml-editor-textarea")
      this.node.value = txt
      this.status.node = document.getElementById("xhtml-editor-infoline")
      this.menu.node = document.getElementById("xhtml-editor-menu")
      this.preview.node = document.getElementById("xhtml-editor-preview")
      interpreter.node = this.node
      interpreter.preview = this.preview.node
    }
  }
  this.commandProcessor = {
    renderer: this.actionRenderer,
    state: {
      control: false,
      selected: false,
      preview: false
    },
    entityMap: {
        38: "&amp;",
        60: "&lt;",
        62: "&gt;",
      8212: "&mdash;",
      8216: "&lsquo;",
      8217: "&rsquo;",
      8220: "&ldquo;",
      8221: "&rdquo;",
      8230: "&hellip;",
      8364: "&euro;"
    },
    controlMap: {
       13: "<br/>\n" // enter
    },
    wrappingControlMap: {
       60: { begin: "<", end: ">", cursorAt: 1 }, // <
       62: { begin: "</", end: ">", cursorAt: 2 }, // >
      101: { begin: "<em>", end: "</em>" }, // e
      115: { begin: "<strong>", end: "</strong>" }, // s
       97: { begin: "<a href=\"\">", end: "</a>", cursorAt: 9 }, // a
      112: { begin: "<p>", end: "</p>" }, // s
      117: { begin: "<ul>\n", end: "\n</ul>", lineBegin: "<li>", lineEnd: "</li>" }, // u
      111: { begin: "<ol>\n", end: "\n</ol>", lineBegin: "<li>", lineEnd: "</li>" }, // o
      100: { begin: "<dl>\n", end: "\n</dl>", lineBegin: "<dt>", lineEnd: "</dt><dd></dd>" }, // d
      113: { begin: "<quote>", end: "</quote>" }, // q
      105: { begin: "<img src=\"\" alt=\"", end: "\"/>", cursorAt: 10 } // i
    },
    activateControlMode: function () {
      this.state.control = true
      this.updateRendererMenu()
    },
    deactivateControlMode: function () {
      this.state.control = false
      this.updateRendererMenu()
    },
    activateSelectedMode: function () {
      this.state.selected = true
      this.updateRendererMenu()
    },
    deactivateSelectedMode: function () {
      if (this.state.selected) {
        this.state.selected = false
        this.updateRendererMenu()
      }
    },
    updateRendererMenu: function () {
      if (this.state.control && this.state.selected) { this.renderer.showBothMenu() }
      else if (this.state.control) { this.renderer.showControlMenu() }
      else if (this.state.selected) { this.renderer.showSelectedMenu() }
      else { this.renderer.showDefaultMenu() }
    },
    enterEntity: function (code) {
      if (code in this.entityMap) { this.renderer.replaceLastCharBy(this.entityMap[code]) }
      else this.renderer.setStatus("Error: I do not know the HTML entity for “"+code+"”.")
    },
    controlCommand: function (control) {
      if (control in this.controlMap) { this.renderer.replaceLastCharBy(this.controlMap[control]) }
      else if (control in this.wrappingControlMap) { this.renderer.wrapSelectionIn(this.wrappingControlMap[control]) }
      else this.renderer.setStatus("Error: I do not know the command “"+control+"”.")
    },
    preview: function () {
      this.state.preview = true
      this.renderer.togglePreview(this.state.preview)
    },
    editor: function () {
      this.state.preview = false
      this.renderer.togglePreview(this.state.preview)
    },
    illegalKeyPressed: function (key) {
      this.renderer.setStatus("Error: Illegal key "+key+" pressed.")
    },
    illegalInputReceived: function (what) {
      this.renderer.setStatus("Error: Illegal input: "+what)
    }
  }
  this.inputInterpreter = {
    node: null,
    preview: null,
    process: this.commandProcessor,
    entityChars: [38,60,62,8212,8216,8217,8220,8221,8230,8364], // &<>—“”“”…€
    controlChars: [13,60,62,101,97,115,112,117,111,100,113,105], // ←<>esapuodqi
    ctrlKey: 17,
    previewKey: 119,
    bindEvents: function () {
      this.node.addEventListener("keydown",this,false)
      this.node.addEventListener("keyup",this,false)
      this.node.addEventListener("select",this,false)
      this.node.addEventListener("keypress",this,false)
      // Es gibt kein unselect. :(
      this.node.addEventListener("change",this,false)
      this.node.addEventListener("textInput",this,false)
      this.node.addEventListener("click",this,false)
      this.node.addEventListener("dblclick",this,false)
      // preview
      document.addEventListener("keydown",this,false)

    },
    handleEvent: function (event) {
      if (event.target.nodeName == "HTML") {
        if (event.type == "keydown" && event.keyCode == this.previewKey) {
          event.preventDefault()
          this.process.editor()
        }
        return
      }
      if (event.type == "keydown") {
        if (this.node.style.display != "none" && this.node.selectionStart == this.node.selectionEnd) { this.process.deactivateSelectedMode() }
        if (event.keyCode == this.ctrlKey) { this.process.activateControlMode() }
        else if (event.keyCode == this.previewKey) { event.preventDefault(); this.process.preview() }
        //else this.process.illegalKeyPressed("0/"+event.keyCode) // Um einen Zeichencode rauszufinden.
      } else if (event.type == "keyup") {
        if (event.keyCode == this.ctrlKey) { this.process.deactivateControlMode() }
      } else if (event.type == "select") {
        this.process.activateSelectedMode()
      } else if (["change","textInput","click","dblclick"].indexOf(event.type) > -1) {
        if (this.node.style.display != "none" && this.node.selectionStart == this.node.selectionEnd) { this.process.deactivateSelectedMode() }
      } else if (event.type == "keypress") {
        if (event.ctrlKey) {
          if  (this.controlChars.indexOf(event.charCode) > -1) {
            event.preventDefault()
            this.process.controlCommand(event.charCode)
          } else if (this.controlChars.indexOf(event.keyCode) > -1) {
            event.preventDefault()
            this.process.controlCommand(event.keyCode)
          }
          //else this.process.illegalKeyPressed(event.charCode+"/"+event.keyCode) // Um einen Zeichencode rauszufinden.
        } else if (this.entityChars.indexOf(event.charCode) > -1) {
          event.preventDefault()
          this.process.enterEntity(event.charCode)
        }
        //else this.process.illegalKeyPressed(event.charCode+"/"+event.keyCode) // Um einen Zeichencode rauszufinden.
      } else {
        this.process.illegalInputReceived(event.type)
      }
    }
  }
  this.init = function () {
    this.actionRenderer.drawEditor(this.inputInterpreter)
    this.inputInterpreter.bindEvents()
    this.actionRenderer.setStatus("XHTML EDITOR 1.1 — Slashdot Edition — © 2009 by Navid Zamani")
  }
  this.init()
}

textarea = document.getElementById("postercomment")
textarea.editor = new XHTMLEditor(textarea)

GM_registerMenuCommand("Set editor width",function () {
  GM_setValue("width",
    prompt("Width of editor (in pixel, minimum: 220)", GM_getValue("width","800"))
  )
  location.reload();
});
