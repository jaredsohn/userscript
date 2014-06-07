// ==UserScript==
// @name           planary
// @namespace      http://planary.ru/tasks
// @include        http://planary.ru/tasks
// ==/UserScript==

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

addGlobalStyle((<r><![CDATA[
  #page {
  width: 99% !important;
  }
  #content{
    overflow: visible !important;
  }
  #header{
  margin-left: 50px !important;
  }
  .new_task{
  font-size: 12pt !important;
  }
  #task_name{
  font-size: 20pt !important;
  width: 400px !important ;
  }
  #worldOfTasks{
  width: 100% !important;
  left: 1% !important;

  }
  #column_day{
    visibility: visible !important;
  } 
  #column_week {
    visibility: visible !important;
  } 
  #column_chaos {
  visibility: visible !important;
  }
  .open2 {
  width: auto !important;
  position: absolute !important ;
  margin-left: 10px !important;
  margin-right: 10px !important;
  }
  #movebuttons{
    visibility: hidden !important;
    height: 0px !important;
  }
  ]]></r>).toString()
);