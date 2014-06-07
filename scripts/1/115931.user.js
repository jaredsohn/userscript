// ==UserScript==
// @id             speeddemosarchive sortable games list
// @name           speeddemosarchive sortable games list
// @version        1.1
// @namespace     
// @author         daemonicky
// @description   
// @include        http://speeddemosarchive.com/gamelist/
// @include        http://speeddemosarchive.com/gamelist/FullList.html
// @run-at         document-end
// ==/UserScript==

DOC  =unsafeWindow.document;
CH   ="childNodes"
TAG  ="getElementsByTagName"
CLS  ="getElementsByClassName"
TEXT ="textContent"

t_name    =[]
t_console =[]
t_time    =[]
t_link    =[]
index     =[]
sorted    =t_name

function name_parse(t)   {return t.slice(0,                      t.lastIndexOf("for"))}
function console_parse(t){return t.slice(t.lastIndexOf("for")+4, t.lastIndexOf("("))}
function time_parse(t)   {return t.slice(t.lastIndexOf("(")+1,   t.lastIndexOf(")"))}

// some times have 2 digits, I want all times to have 3 digits; N/A is unchanged
// HACK!!! "?".match(/:/g) would be null and null.length does not exist; I wrap it in exception
function time_has_3_numbers(t) {try{ if(t.match(/:/g).length == 1) return t+":00"; }catch(_){} return t}

// extract useful columns
function parse_page() {
    li=DOC[TAG]("li")
    for(i=0;i<li.length;i++) {
       t_name.   push( name_parse( li[i][TEXT] ))
       t_console.push( console_parse( li[i][TEXT] ))
       t_time.   push( time_has_3_numbers( time_parse( li[i][TEXT] )))
       t_link.   push( li[i][CH][0]["href"] )
       index.    push( i )
    }
}

// insert table first
function insert_table_tag() {
    tmp=DOC[TAG]("body")[0].innerHTML
    DOC[TAG]("body")[0].innerHTML="<div class=table_sort><b>test</b></div><br>"+tmp
}

// there is no such function
function strcmp(a,b){return sorted[a] == sorted[b]? 1 : (sorted[a] > sorted[b]? 1: -1)}
function sort_table(column)
{
    sorted=column
    index.sort(strcmp)   // POZOR!!! javascript ma nestabilni sort
    draw_table()
}

// HACK!!!
// problem:
//   <th onclick=alert()>              works
//   <th onclick=moje_funkce()>        doesn't work
function add_sortability()
{
    // HACK!!! I can't call g(x) in listener, I can't have arguments here; I wrap it like: f(){g(x)}
    DOC[CLS]("th_name")   [0].addEventListener('click', function(){ sort_table(t_name)},   false)
    DOC[CLS]("th_console")[0].addEventListener('click', function(){ sort_table(t_console)},false)
    DOC[CLS]("th_time")   [0].addEventListener('click', function(){ sort_table(t_time)},   false)
}

function link_game(link)
{
    try {
        FROM=TO="lastIndexOf"
        return link.slice(link[FROM]("/")+1, link[TO]("."))
    } catch(_) { return "" }
}

function link_to_img1(link){ return "http://speeddemosarchive.com/gfx/"+link_game(link)+"_1.jpg" }
function link_to_img2(link){ return "http://speeddemosarchive.com/gfx/"+link_game(link)+"_2.jpg" }
function text_of_table()
{
    table="<div align=left><table align=left>"
    table+="<tr><th>id</th><th>image</th><th class=th_name>name</th><th class=th_console>console</th><th class=th_time>time</th></tr>"
    // table+="<tr><th>id</th><th on_click=function(){sort_table(t_name)}>name</th><th onclick=function(){sort_table(t_console)}>console</th><th function(){sort_table(t_time)}>time</th></tr>"
    // HACK!!! I can not use functions so I use listener (therefore th_* classes)
    for(i of index) {
        table+="<tr>"
        +"<td>"+                      (i+1)+        "</td>"
        +"<td><img src="+link_to_img1(t_link[i])+"></img><img src="+link_to_img2(t_link[i])+"></img></td>"
        +"<td><a href="+t_link[i]+">"+t_name[i]+"</a></td>"
        +"<td>"+                      t_console[i]+ "</td>"
        +"<td>"+                      t_time[i]+    "</td>"
        +"</tr>"
    }
    table+="</table></div>"
    return table;
}

function draw_table()
{
    DOC[CLS]("table_sort")[0].innerHTML = text_of_table()
    add_sortability()
}

function remove_original_list()
{
    tmp=DOC[TAG]("ul")[0]
    tmp.parentNode.removeChild(tmp)
}

insert_table_tag()
parse_page()
remove_original_list()
draw_table()