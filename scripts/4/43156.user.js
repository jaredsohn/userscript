// ==UserScript==
// @name                        Kronos config
// @namespace                   Lord Script
// @description                 Based on Kronos.
// @author                      Lord1982
// ==/UserScript==

revision("$Revision$");

var options = {

  general: [
   { id: "kronosMenu", value: true },
   /* I haven't heard anyone request removing this, so far:
   { id: "changeTitle", value: true, name: "Change window title",
    desc: "Improves the window title with server name and current page."
   }*/],

  cityview: [
    { id: "haveEnough", value: { White: "#B1AB89", Green: "#40C040" } },
    { id: "notEnough", value: { Gray: "#918B69", Red: "red" } }
  ],

};

function optionDefault(id) {
  for each (var section in options)
    for each (var option in section)
      if (id == option.id)
        if (!isObject(option.value))
          return option.value;
        else
          for (var value in option.value)
            return option.value[value];
}

function addOption(opt) {
  var input, value, option, defaultValue = opt.value;
  var type = isString(defaultValue) ? "text" :
            isBoolean(defaultValue) ? "checkbox" : "select";
  var id = "kronos-"+ opt.id;

  switch (type) {
    case "checkbox":
      input = <input type={type} id={id}/>;
      value = config.get(opt.id, opt.value);
      if (value) input.@checked = "checked";
    break;

    case "select":
      input = <select id={id}/>;
      value = config.get(opt.id, hash(optionDefault(opt.id)));

      for (var maybe in opt.value) {
        option = <option value={opt.value[maybe]}>{lang[maybe+"$"]}</option>;
        if (value == opt.value[maybe]) option.@selected = "selected";
        input.* += option;
      }
    break;
  }
  var title = lang[opt.id + "_"];
  if (title) input.@title = title;

  return <tr>
    <th><label for={id}>{lang[opt.id+"$"]}</label></th>
    <td>{input}</td>
  </tr>;
}

function hash(n) { return !isBoolean(n) ? n : n ? 1 : 0; }

function optionsView() {

  function save(e) {
    function peek() {
      var id = $X('ancestor-or-self::*[@id][1]', input).id.slice(7);
      var is = "checkbox" == input.type ? hash(input.checked) : input.value;
      if (is == hash(optionDefault(id)))
        return config.remove(id);
      config.set(id, is);
    }
    var input = e.target;
    setTimeout(peek, 10);
  }

  var form = <form onsubmit="return false;"><p></p></form>;
  for (var header in options) {
    var section = <table/>;
    for each (var item in options[header].map(addOption))
      section.* += item;
    form.* += <><h3>{lang[header+"$"]}</h3>{section}</>;
  }

  var inputs = node({ tag: <div id="kronosOptions" class="contentBox01h">
    <h3 class="header">
      <span class="textLabel">{lang.title$}</span>
    </h3>
    <div class="content">{form}</div>
    <input type="button" value="Return to the game" class="button"
        onclick="history.back()"/>
    <div class="footer"></div>
  </div>, before: $("vacationMode") });

  for each (var input in inputs) {
    if (!/^kronos-(.*)/.test(input.id)) continue;
    input.addEventListener("click", save, false);
    input.addEventListener("change", save, false);
    input.addEventListener("keyup", save, false);
  }
}
