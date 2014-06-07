// ==UserScript==
// @name        Stripe Payments Print
// @namespace   http://userscripts.org/scripts/source/440012.user.js
// @include     https://manage.stripe.com/payments
// @version     1.0
// @description Format stripe's "all payments" page for printing
// @grant       none
// ==/UserScript==


function create_element(html)
{
    d = document.createElement('div');
    d.innerHTML = html;
    return d.firstChild;
}

function try_remove_sel(sel)
{
    try
    {
	el = document.body.querySelector(sel);
	el.parentNode.removeChild(el);
    } catch(e){}
}

function add_style(css)
{
    d = create_element("<style>" + css + "</style>");
    document.body.appendChild(d);
}

function btn_onclick()
{
    // remove left pane
    try_remove_sel('div.sidebar-view-content');
    
    // remove top parts
    try_remove_sel('#toolbar-view');
    try_remove_sel('#quicksearch-view');
    try_remove_sel('#section div.filter');
    try_remove_sel('#header');

    // remove footer
    try_remove_sel('#footer');
    d = create_element("<br>");
    document.body.appendChild(d);
    
    // widen main section
    d = document.body.querySelector('#section');
    d.style.marginLeft = 0;
    add_style("div.payments-list-view div.items-list span.description em.long-label {max-width:900px;}");
    
    // make refunded column less wide 
    add_style("div.payments-list-view div.items-list span.status {width: auto;}");

    // make email column less wide, let it wrap
    add_style("div.payments-list-view div.items-list span.customer {max-width: 140px; overflow:inherit; text-overflow:inherit;}")
    a = document.body.getElementsByClassName("customer");
    for (i = 0; i < a.length; i++)
    {  a[i].innerHTML = a[i].innerHTML.replace(/@/, "@ "); }

    // reduce paddings
    add_style("div.items-list a span, div.items-list div.row span {padding: 7px 6px 6px;}")
    
    // page container is too wide for printing, shrink it
    add_style("#application, #main-body { width: 670px; }");    // was 940
}

function ready()
{
    return document.body.querySelector('div.list-view-content #export');
}

function doit()
{
  if (!ready())
  {
    window.setTimeout(doit, 100);
    return;
  }
  
  export_btn = document.body.querySelector('div.list-view-content #export');
  item = export_btn.parentNode;
  container = item.parentNode;
  
  html =    '<div class="item"><div class="control">' +
            '    <span class="icon export"></span>' +
            '    <span class="label">Printer Friendly</span>' +
            '</div></div>';
  print_btn = create_element(html);
  container.insertBefore(print_btn, item);
  container.insertBefore(create_element('<div class="item separator"></div>'), item)

  // click event
  print_btn.onclick = btn_onclick;
  
}

window.setTimeout(doit, 100);