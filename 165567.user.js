// ==UserScript==
// @name about:blank notepad
// @description About
// @author distress147
// @icon https://dl.dropboxusercontent.com/u/65727683/favicon.ico
// @license WTFPL2
// @version 2.0
// @include about:blank
// @include http://www.ya.ru
// ==/UserScript==

document.write( '<html><head><title>NotePad</title> <link rel="shortcut icon" href="https://dl.dropboxusercontent.com/u/65727683/favicon.ico" type="image/x-icon">
<style>
.text{
position: absolute;
top: 0px;
bottom: 0px;
left: 0px;
right: 0px
height: 100%;
width: 100%;
border: 30px dashed black;
}
</style>
<script>
function supports_html5_storage() {
  try {
    return "localStorage" in window && window["localStorage"] !== null;
} catch (e) {
    return false;
  }
}
if(supports_html5_storage()){
    fucntion save(){
    var body = document.body.innerHTML;
    localStorage.setItem(name, body);
}
}
</script>
</head><body>
<div class="text" contenteditable></div>
</body>');