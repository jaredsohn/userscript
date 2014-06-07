// ==UserScript==
// @name           Titech Portal Auto Login
// @namespace      http://www.titech.ac.jp/
// @id             titech-portal-auto-login@www.titech.ac.jp
// @description    東工大ポータルに自動的にログインします
// @author         NAKASHIMA, Makoto <makoto.nksm@gmail.com>
// @include        https://portal1.nap.gsic.titech.ac.jp/*
// @include        https://portal.nap.gsic.titech.ac.jp/*
// @include        http://portal.titech.ac.jp/*
// @jsversion      1.8
// @license        MIT License
// @noframes
// ==/UserScript==

// {{{ Configure

const MATRIX_WIDTH  = 10;
const MATRIX_HEIGHT = 7;
const MATRIX_ROW_LABELS = "1234567".split("");
const MATRIX_COL_LABELS = "ABCDEFGHIJ".split("");
const MATRIX_COORD_REG  = /\[([A-J]),([1-7])\]/;

// }}}

// {{{ Detect current page type

const PageType = { START: 0, PASSWORD: 1, MATRIX: 2, UNKNOWN: 3 };
const CurrentPageType = (function() {
  switch (location.pathname) {
  case "/":
  case "/portal.pl":
    return PageType.START;
  case "/GetAccess/Login":
    if (location.search.indexOf("Template=userpass_key") !== -1)
      return PageType.PASSWORD;
    if (location.search.indexOf("Template=idg_key") !== -1)
      return PageType.MATRIX;
    // fall through
  }
  return PageType.UNKNOWN;
})();

// }}}

// {{{ IDs and ID convertes

const NAME_PREFIX = "GM_titech_portal_auto_login_";
const TABLE_ID = NAME_PREFIX + "table_id";
const CELL_ID_PREFIX = NAME_PREFIX + "cell";

function cellId2index(id) {
  let [, row, col] = id.match(new RegExp(CELL_ID_PREFIX + "(\\d+)_(\\d+)"));
  row = ~~row; col = ~~col;
  return [row, col];
}

function index2cellId(row, col) {
  return CELL_ID_PREFIX + row + "_" + col;
}

// }}}

// {{{ Utilities

String.prototype.repeat = function(n, sep) {
  if (sep  === undefined || sep  === "")
    return Array(n+1).join(this);
  return Array(n).join(this + sep) + this;
};

function xml2dom(xml, xmlns, doc) {
  if (xmlns === undefined)
    xmlns = "http://www.w3.org/1999/xhtml";
  if (doc === undefined)
    doc = document;

  let xmlString = '<root xmlns="' + xmlns + '">' +
    xml.toXMLString() + "</root>";
  let newDoc = new DOMParser().parseFromString(xmlString, "application/xml");
  let imported = document.importNode(newDoc.documentElement, true);

  let range = document.createRange();
  range.selectNodeContents(imported);
  let fragment = range.extractContents();
  range.detach();
  if (fragment.childNodes.length > 1)
    return fragment;
  return fragment.firstChild;
}

// }}}

// {{{ MatrixCode

const MatrixCode = {
  isValidMatrix: function(mat) {
    let rows = String(mat).split(/,/);
    return rows.length === MATRIX_HEIGHT &&
      rows.every(MatrixCode.isValidRow);
  },
  isValidRow: function(row) {
    return row.length === MATRIX_WIDTH &&
      Array.every(row, MatrixCode.isValidCell);
  },
  isValidCell: function(cell) /^[a-zA-Z_]$/.test(cell),
  isValidIndex: function(row, col) 0 <= row && row < MATRIX_HEIGHT &&
    0 <= col && col < MATRIX_WIDTH,
  _assertMatrix: function(mat) {
    if (!this.isValidMatrix(mat))
      throw Error("Invalid Matrix Code [" + mat + "]");
  },
  _assertCell: function(cell) {
    if (!this.isValidCell(cell))
      throw Error("Invalid Cell Value [" + cell + "]");
  },
  _assertIndex: function(row, col) {
    if (!this.isValidIndex(row, col))
      throw Error("Invalid Index [" + row + "," + col + "]");
  },

  _value2array: function(value) value.split(",").map(
    function(row) row.split("")),
  _array2value: function(array) array.map(function(row) row.join("")).join(","),

  __array: null,
  get _array() {
    if (this.__array === null)
      this.__array = this._value2array(this.value);
    return this.__array;
  },
  set _array(array) this.__array = array,

  _key: "matrix_code",
  _defaultValue: "_".repeat(MATRIX_WIDTH).repeat(MATRIX_HEIGHT, ","),
  _value: null,
  _restoreValue: function() {
    this._value = GM_getValue(this._key, this._defaultValue);
  },
  _saveValue: function() {
    GM_setValue(this._key, this._value);
  },
  get value() {
    if (this._value === null)
      this._restoreValue();
    return this._value;
  },
  set value(value) {
    this._assertMatrix(value);
    this._value = value;
    this._array = null;
    this._saveValue();
    return this._value;
  },
  getCell: function(row, col) {
    this._assertIndex(row, col);
    return this._array[row][col];
  },
  setCell: function(row, col, value) {
    this._assertIndex(row, col);
    this._assertCell(value);
    this._array[row][col] = value.toUpperCase();
    this._value = this._array2value(this._array);
    this._saveValue();
    return this._array[row][col];
  }
};

// }}}

// {{{ MatrixTable

const MatrixTable = {
  _parent: null,
  get parent() this._parent,
  set parent(value) {
    this._parent = value;
    if (this._parent !==  null && this._table !== null)
      this._parent.appendChild(this._table);
  },

  _table: null,
  _createTable: function() {
    let table = <table id={TABLE_ID} style="display: none;">
      <tbody><tr><th/></tr></tbody>
    </table>;

    MATRIX_COL_LABELS.forEach(
      function(l) table.tbody.tr.appendChild(<th>{l}</th>));
    for (let row = 0; row < MATRIX_HEIGHT; row++) {
      let tr = <tr class={row % 2 == 0 ? "even" : "odd"}/>;
      tr.appendChild(<th>{MATRIX_ROW_LABELS[row]}</th>);
      for (let col = 0; col < MATRIX_WIDTH; col++) {
        let value = MatrixCode.getCell(row, col);
        tr.appendChild(
            <td><input value={value} id={index2cellId(row, col)}/></td>);
      }
      table.tbody.appendChild(tr);
    }

    this._initStyle();
    this._table = xml2dom(table);
    let self = this;
    Array.forEach(
      this._table.querySelectorAll('td input[id^="' + CELL_ID_PREFIX + '"]'),
      function(input) input.addEventListener("keyup", self, false));

    if (this.parent !== null)
      this.parent.appendChild(this._table);
  },
  _initStyle: function() {
    GM_addStyle(<><![CDATA[
      #TABLE_ID { margin: 0.5em; }
      #TABLE_ID input,
      #TABLE_ID table { font-size: 100%; }
      #TABLE_ID table td { padding: 0; }
      #TABLE_ID input {
        width: 1.5em; height: 1.5em; border: none;
        text-align: center; font-family: inherit;
        background-color: transparent;
      }
      #TABLE_ID input:focus { outline: 2px solid #3d80df; }
      #TABLE_ID input.error { outline: 2px solid red!important; }
      #TABLE_ID tr.even { background-color: #ffe8e8; }
    ]]></>.toString().replace(/#TABLE_ID/g, "#" + TABLE_ID));
  },
  handleEvent: function({type, target: input, keyCode}) {
    if (type !== "keyup")
      return;

    let [row, col] = cellId2index(input.id);
    if (input.value === "") {
      input.classList.remove("error");
      return;
    }
    try {
      MatrixCode.setCell(row, col, input.value);
    } catch (err) {
      input.classList.add("error");
      return;
    }
    input.classList.remove("error");
    input.value = MatrixCode.getCell(row, col);
    if (keyCode !== KEY_EVENT.DOM_VK_ENTER &&
        keyCode !== KEY_EVENT.DOM_VK_RETURN &&
        String.fromCharCode(keyCode).toUpperCase() != input.value)
      return;

    let nextCol = (col + 1) % MATRIX_WIDTH;
    let nextRow = (nextCol === 0) ? (row + 1) % MATRIX_HEIGHT : row;
    let nextInput = document.getElementById(index2cellId(nextRow, nextCol));
    setTimeout(function() { nextInput.focus(); }, 10);
  },

  _visible: false,
  show: function() {
    this._visible = true;
    if (this._table === null)
      this._createTable();
    this._table.style.display = '';
  },
  hide: function() {
    this._visible = false;
    if (this._table == null) return;
    this._table.style.display = 'none';
  },
  toggle: function() this._visible ? this.hide() : this.show()
};

// }}}

// {{{ Initializers

function initStartPage() {
  let form = xml2dom(
      <form name="matrix" method="post" action="#">
        <input type="submit" value="マトリクスコードの登録" name="OK"/>
        <span>ログイン用マトリクスコードを登録します</span>
      </form>);
  MatrixTable.parent = form;
  form.addEventListener("submit", function(e) {
    e.preventDefault();
    MatrixTable.toggle();
  }, false);
  document.getElementById("portal-form").appendChild(form);
}

function initPasswordPage() {
  document.querySelector('form[name="login"]').removeAttribute("autocomplete");
}

function initMatrixPage() {
  let inputCount = 0;
  Array.forEach(
    document.querySelectorAll('input[name^="message"]'),
    function(input) {
      if (!MATRIX_COORD_REG.test(input.parentNode.parentNode.innerHTML))
        return;
      let col = RegExp.$1.charCodeAt(0) - "A".charCodeAt(0);
      let row = RegExp.$2 - 1;
      let code = MatrixCode.getCell(row, col);
      if (code == "_")
        return;
      input.value = code;
      inputCount++;
    });

  if (document.documentElement.innerHTML.indexOf(
    'マトリクス認証に失敗しました。') !== -1 || inputCount < 3)
    return;

  document.querySelector('form[name="login"]').submit();
}

// }}}

switch (CurrentPageType) {
case PageType.START:    initStartPage();    break;
case PageType.PASSWORD: initPasswordPage(); break;
case PageType.MATRIX:   initMatrixPage();   break;
}
