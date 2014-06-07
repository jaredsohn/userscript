/* This program is free software. It comes without any warranty, to
 * the extent permitted by applicable law. You can redistribute it
 * and/or modify it under the terms of the Do What The Fuck You Want
 * To Public License, Version 2, as published by Sam Hocevar. See
 * http://sam.zoy.org/wtfpl/COPYING for more details. */

// ==UserScript==
// @name            Context Menu Example
// @namespace       http://userscripts.org/users/12
// @description     Share page/link to Twitter/Facebook/Google+ from browser context menu
// @version         2.1
// @author          LouCypher
// @license         WTFPL http://sam.zoy.org/wtfpl/COPYING
// @updateURL       https://userscripts.org/scripts/source/150793.meta.js
// @include         *
// @exclude         file:///*
// @exclude         /^https?://twitter\.com/.*/
// @exclude         /^https?://plus\.google\.com/.*/
// @exclude         /^https?://www\.facebook\.com/.*/
// @grant           none
// ==/UserScript==

/*
  References:
  - https://hacks.mozilla.org/2011/11/html5-context-menus-in-firefox-screencast-and-code/
  - http://thewebrocks.com/demos/context-menu/
*/

var menu = document.body.appendChild(document.createElement("menu"));
menu.outerHTML = '<menu id="userscript-context-menu" type="context">\
                    <menu label="" url="">\
                      <menuitem label="Twitter"\
                                icon="data:application/ico;base64,\
AAABAAEAEBAAAAEAIABoBAAAFgAAACgAAAAQAAAAIAAAAAEAIAAAAAAAAAQAAAAAAAAAAAAAAAAA\
AAAAAAD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A\
////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD/\
//8A////AP///wD///8A////AP///wD///8A////AP///wz///8f////H////x////8Y////B///\
/wD///8A////AP///wD///8A////AP///wD///8A////A////yj7789g9tV+ofbVfqH21X6h+N+e\
ifz03lf///8o////A////wD///8A////AP///wD///8A////APr37g/PsGCftogQ7r2JAP/bnwD/\
7qwA/+6sAP/urAD/9Mtftv357z////8D////AP///wD///8A////AP///wD///8A////AP///w/5\
7c5a88VQwu6sAP/urAD/7qwA/+6sAP/xvDDb/fnvP////wD///8A////AP///wD///8A////AP//\
/wDz5L5X7bgv2+6sAP/urAD/7qwA/+6sAP/urAD/7qwA//G8MNv///8Y////AP///wD///8A////\
AP///wD///8M9NN+n+6wD/PurAD/7qwA/+6sAP/urAD/7qwA/+6sAP/urAD/9Nyegf///wD///8A\
////AP///wD///8A+O3PVu6wD/PurAD/7qwA/+6sAP/urAD/7qwA/+6sAP/urAD/7qwA//G8MNv/\
//8A////AP///wD///8A////ANasQMXurAD/7qwA/+qpAP/YnAD/1JkA/+6sAP/urAD/7qwA/+6s\
AP/urAD/////FP///wD///8A////AP///wDz255+7qwA/9icAP+6ixDuz7Bgn9m8b5TurAD/7qwA\
/+6sAP/urAD/7qwA//jkr3j///8M////AP///wD///8A47Y/ysmRAP/PsGCf+vfuD////wDw584w\
46QA/+6sAP/urAD/7qwA/9+hAP/orA/z9OrPQv///wD///8A////AMypT7Hhz55g////AP///wD/\
//8A////AMOaL9DMlAD/0JYA/8mRAP/FoEC/vpIf4OPQnmL///8A////AP///wD69+4P////AP//\
/wD///8A////AP///wD69+4P3ceOcNi/foHhz55g////APr37g/69+4P////AP///wD///8A////\
AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A\
////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD/\
//8A//8AAP//AAD//wAA8P8AAMA/AAD4HwAA8A8AAOAHAADgBwAAwAcAAOAHAADHAwAA3wMAAP/f\
AAD//wAA//8AAA==">\
                      </menuitem>\
                      <menuitem label="Facebook"\
                                icon="data:application/ico;base64,\
iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAX0lEQVQ4jWP4//8/AyUYTFhHzjgD\
xP9JxGeQDSBVMxgTbUBCxer/r999+Q8DJBuArJksA9A10s8AXIBoA0B+R/Y/jD+EwoBoA1yT5v3P\
bdmCE8MAshhID/UMoDgzUYIBj0Cgi7ar4coAAAAASUVORK5CYII=">\
                      </menuitem>\
                      <menuitem label="Google+"\
                                icon="data:application/ico;base64,\
AAABAAMAEBAAAAEAIABoBAAANgAAACAgAAABACAAqBAAAJ4EAABAQAAAAQAgAChCAABGFQAAKAAA\
ABAAAAAgAAAAAQAgAAAAAAAABAAAEgsAABILAAAAAAAAAAAAAA0jiWoNI4vSDSOL/w0ji/8NI4v/\
DSOL/ztKjv/Bxdf/g4uy/w0ji/8NI4v/DSOL/w0ji/8NI4v/DSOL0g0ji2kNH27bEy6s/xUxuf8V\
Mbn/FTC2/xEnlf+RmcT/8fH1/8zQ5v8VMbn/FTG5/xUxuf8VMbn/FTG5/xQvsf8NJI7SrLLO/yU4\
jv8RJYb/ESeO/xwvjf+jq87/8/T3//P09/+Rntz/FzO7/xczu/8XM7v/FzO7/xczu/8XM7v/DiWR\
/7e+3f/29vj/6er0/8jN4//g4u3/9vb4//b2+P+ttuX/HTq+/xg1vf8YNb3/GDW9/xg1vf8YNb3/\
GDW9/w8mlP8RKJj/GjbA/z5Vxf/Kz+P/+Pn6//X3+f+Cktv/GjbA/xo2wP8aNsD/GjbA/xo2wP8a\
NsD/GjbA/xo2wP8RKJj/Eiqc/xo1tP8sQqn/+/v8//v7/P9YbdD/HDnD/xw5w/8cOcP/HDnD/xw5\
w/8cOcP/HDnD/xw5w/8cOcP/Eiqc/xAliv9RYKj/oanT//39/v/19vr/Izig/x46xP8eO8b/HjvG\
/x47xv8eO8b/HTrC/xUpiv8eO8b/HjvG/xMroP99h7X//////+Dk9/+wu+z/7e/6/73D4P8hN6D/\
ID3I/yA9yP8gPcj/ID3I/yxHx///////ID3I/yA9yP8VLaT/6ery/73F6/8nRMz/Ij/L/zJNz//n\
6vb/vsPf/yA7v/8iP8v/Ij/L/yI/y/8uScr//////yI/y/8iP8v/Fi+o//Hy9/9ec9X/JELO/yRC\
zv8kQs7/n6ra//////9NY8j/JELO/xkukP8ZLpD/JzqX//////8ZLpD/GS6Q/xEie//x8vf/Q1vM\
/yZE0f8mRNH/JUPO/6av1///////bIDZ/yZE0f/////////////////////////////////x8/r/\
8fL4/05gtf8mQ8v/JkLI/yo/qf/s7vb//////0tk2/8oRtT/KEbU/yhG1P80UNP//////yhG1P8o\
RtT/GjS0/+Hl9f/Q1e7/PlGp/0hZqv/FyuT//////52m0f8dMpb/JD22/ypI1/8qSNf/NlLW////\
//8qSNf/KkjX/xs1t/8vR8D/rLjw/+7w/P///////////////////////////5al7P8rSdn/K0nZ\
/zdU2///////K0nZ/zBO2v8cNrr/HDe92EVj3v9Ma+T/TGvk/0xr5P9Ma+T/TGvk/0xr5P9Ma+T/\
TGvk/0xr5P9Ma+T/TGvk/0xr5P9FY97/HDe92B04v28dOL/YHTi//x04v/8dOL//HTi//x04v/8d\
OL//HTi//x04v/8dOL//HTi//x04v/8dOL//HTi/2B04v28AAAAAAAAAAAAAAAAAAAAAAAAAAAAA\
AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAKAAAACAAAABAAAAAAQAg\
AAAAAAAAEAAAEwsAABMLAAAAAAAAAAAAAAwiihIMIoqWDCKK/wwiiv8MIor/DCKK/wwiiv8MIor/\
DCKK/wwiiv8MIor/DCKK/wwiiv8MIor/DCKK/6mtvv/IyMj/qK29/xMmgP8MIor/DCKK/wwiiv8M\
Ior/DCKK/wwiiv8MIor/DCKK/wwiiv8MIor/DCKK/wwiipYMIooSDSOLkBEqof8VMbn/FTG5/xUx\
uf8VMbn/FTG5/xUxuf8VMbn/FTG5/xUxuf8VMbn/FTG5/xUxuf8UMLT/q7HP//Dx9P/w8fT/UWK3\
/xUxuf8VMbn/FTG5/xUxuf8VMbn/FTG5/xUxuf8VMbn/FTG5/xUxuf8VMbn/ESqh/w0ji5AOJI3/\
FTG4/xUxuf8VMbn/FTG5/xUxuf8VMbn/FTG5/xUxuf8VMbn/FTG5/xUxuf8VMbn/FTC3/yM1kv/m\
5+//8fH1//Hx9f9resP/FTG5/xUxuf8VMbn/FTG5/xUxuf8VMbn/FTG5/xUxuf8VMbn/FTG5/xUx\
uf8VMbj/DiSN/w8nkP8WMbf/FjK6/xYyuv8WMrr/FjK6/xYyuv8WMrr/FjK6/xYyuv8WMrr/FjK6\
/xUws/8YK4v/t7zW//Ly9v/y8vb/8vL2/2Z3y/8WMrr/FjK6/xYyuv8WMrr/FjK6/xYyuv8WMrr/\
FjK6/xYyuv8WMrr/FjK6/xYyuv8PJ5H/eYm9/xsuif8VMK//FjO7/xYzu/8WM7v/FjO7/xYzu/8W\
M7v/FjO7/xYzu/8ULab/JziK/8PH3f/z8/f/8/P3//Pz9//z8/f/MErC/xYzu/8WM7v/FjO7/xYz\
u/8WM7v/FjO7/xYzu/8WM7v/FjO7/xYzu/8WM7v/FjO7/xAnkv+ytcX/0dXk/zpKkv8RJ43/FC2h\
/xUwr/8XNLz/FzS8/xc0vP8XM7j/EiiR/1hlov/n6fD/9PX3//T19//09ff/9PX3/6Ou4P8XNLz/\
FzS8/xc0vP8XNLz/FzS8/xc0vP8XNLz/FzS8/xc0vP8XNLz/FzS8/xc0vP8XNLz/ECiU/8HCyf/1\
9vj/9fb4/7W72P9sd63/PkyU/xAie/8QInv/ECJ7/x0ugv+kq8z/9fb4//X2+P/19vj/9fb4//X2\
+P/Gzev/JT/A/xg0vf8YNL3/GDS9/xg0vf8YNL3/GDS9/xg0vf8YNL3/GDS9/xg0vf8YNL3/GDS9\
/xg0vf8RKZX/NUih/11w0P+jruP/1dnw//f3+f/39/n/9/f5//f3+f/39/n/9/f5//f3+f/39/n/\
9/f5//f3+f/39/n/tr7n/yE8wP8ZNb7/GTW+/xk1vv8ZNb7/GTW+/xk1vv8ZNb7/GTW+/xk1vv8Z\
Nb7/GTW+/xk1vv8ZNb7/GTW+/xEpl/8SKpn/GjbA/xo2wP8aNsD/QV/G/0Ffxv9BX8b/lJ3K//j4\
+v/4+Pr/+Pj6//j4+v/4+Pr/+Pj6/5qm4f8dOMH/GjbA/xo2wP8aNsD/GjbA/xo2wP8aNsD/GjbA\
/xo2wP8aNsD/GjbA/xo2wP8aNsD/GjbA/xo2wP8aNsD/EiqZ/xMrm/8bN8H/GzfB/xs3wf8bN8H/\
GzfB/xs0sP/Lz+L/+fr7//n6+//5+vv/+fr7//Hz+P9xg9j/GzfB/xs3wf8bN8H/GzfB/xs3wf8b\
N8H/GzfB/xs3wf8bN8H/GzfB/xs3wf8bN8H/GzfB/xs3wf8bN8H/GzfB/xs3wf8TK5v/Eyyd/xs4\
wv8bOML/GzjC/xs4wv8bOML/GzjC//v7/P/7+/z/+/v8//v7/P/o6/b/RV3N/xs4wv8bOML/GzjC\
/xs4wv8bOML/GzjC/xs4wv8bOML/GzjC/xs4wv8bOML/GzjC/xs4wv8bOML/GzjC/xs4wv8bOML/\
GzjC/xMsnf8ULZ//HDnE/xw5xP8cOcT/HDnE/xw5xP8cOcT//Pz9//z8/f/8/P3//Pz9/1tv0f8c\
OcT/HDnE/xw5xP8cOcT/HDnE/xw5xP8cOcT/HDnE/xw5xP8cOcT/HDnE/xw5xP8cOcT/HDnE/xw5\
xP8cOcT/HDnE/xw5xP8cOcT/FC2f/xUtof8dOsX/GzW2/xcunP8WK5P/EyaB/0pZnv/9/f7//f3+\
//39/v/9/f7/KkK2/x06xf8dOsX/HTrF/x06xf8dOsX/HTrF/x06xf8dOsX/HTrF/x06xf8dOsX/\
HTrF/x06xf8dOsX/HTrF/x06xf8dOsX/HTrF/x06xf8VLaH/FS6i/xYrkv9IVp3/oKjM/7/E3P/7\
+/3/+/z9//7+/v/+/v7//v7+//7+/v8MKH3/HDi7/x47xv8eO8b/HjvG/x47xv8eO8b/HjvG/x47\
xv8eO8b/HjvG/x47xv8eO8b/HjvG/x47xv8eO8b/HjvG/x47xv8eO8b/HjvG/xUuo/8VLqL/RVeZ\
//////////////////z9/v+zwOr/lKTh/6u55//n6vj//////+zt9P8MKH3/HDe3/x88yP8fPMj/\
HzzI/x88yP8fPMj/HzzI/x88yP8fPMj/HzzI/x88yP8fPMj/HzzI/x88yP8fPMj/HzzI/x88yP8f\
PMj/Fi+l/0hfrf/////////////////c4fT/PF7L/yA+yf8gPsn/ID7J/yhFy/+UpeL//////+7w\
9v8MKH3/Hjm6/yA+yf8gPsn/ID7J/yA+yf8gPsn/ID7J/yA+yf8gPsn/ID7J/yA+yf8gPsn/ID7J\
/yA+yf8gPsn/ID7J/yA+yf8XMKf/z9HX////////////7O/4/y9Uyf8hP8v/IT/L/yE/y/8hP8v/\
IT/L/yE/y/+vuuT///////f3+/8MKH3/ID7G/yE/y/8hP8v/IT/L/yE/y/8hP8v/IT/L/yE/y/8h\
P8v/IT/L/xcsjv8XLI7/IT/L/yE/y/8hP8v/IT/L/xcxqf/a2tr///////////9xg93/I0DM/yNA\
zP8jQMz/I0DM/yNAzP8jQMz/I0DM/1Zr1P///////////+zt9f8tQ67/I0DM/yNAzP8jQMz/I0DM\
/yNAzP8jQMz/I0DM/yNAzP8jQMz/8fL1//Hy9f8jQMz/I0DM/yNAzP8jQMz/GDKr/9ra2v//////\
3+Lz/ydDz/8kQc7/JEHO/yRBzv8kQc7/JEHO/yRBzv8kQc7/M03N/////////////////46Yy/8k\
Qc7/JEHO/yRBzv8kQc7/JEHO/yRBzv8kQc7/JEHO/yRBzv/z9Pf/8/T3/yRBzv8kQc7/JEHO/yRB\
zv8YM63/2tra//////+Xo9//JULP/yVCz/8lQs//JULP/yVCz/8lQs//JULP/yVCz/8zTMj/////\
////////////0dXo/yVCz/8lQs//JULP/yVCz/8lQs//JULP/yVCz/8lQs//JULP//b3+f/29/n/\
JULP/yVCz/8lQs//JULP/xkzr//a2tr//////11y2P8mQ9D/JkPQ/yZD0P8mQ9D/JkPQ/yZD0P8m\
Q9D/JkPQ/0RZw//////////////////09fn/JkPQ/yZD0P8mQ9D/JkPQ/yZD0P8mQ9D/JkPQ/yZD\
0P8mQ9D/+fr7//n6+/8mQ9D/JkPQ/yZD0P8mQ9D/GjSx/9ra2v//////OFPV/yZE0v8mRNL/JkTS\
/yZE0v8mRNL/JkTS/yZE0v8mRNL/aHjD//////////////////r6/P8mRNL/JkTS/yZE0v8lQ87/\
Gy+T/xsvk/8bL5P/Gy+T/xsvk//8/P3//Pz9/xsvk/8bL5P/Gy+T/xsvk/8SJX3/2tra//////8p\
RtD/J0XT/ydF0/8nRdP/J0XT/ydF0/8nRdP/J0XT/yZE0P+psNT/////////////////4uX0/ydF\
0/8nRdP/J0XT/ydF0//+/v7//v7+//7+/v/+/v7//v7+//7+/v/+/v7//v7+//7+/v/+/v7//v7+\
/+Pj4//a2tr//////zFLxf8oRtT/KEbU/yhG1P8oRtT/KEbU/yhG1P8oRtT/K0O0//Lz+P//////\
//////////+ptOv/KEbU/yhG1P8oRtT/KEbU////////////////////////////////////////\
////////////////////4+Pj/9ra2v//////WWq6/ylH1v8pR9b/KUfW/ylH1v8pR9b/KUfW/yZD\
yf+Jk8T/////////////////+vr9/0Ba2v8pR9b/KUfW/ylH1v8pR9b/KUfW/ylH1v8pR9b/KUfW\
/ylH1v///////////ylH1v8pR9b/KUfW/ylH1v8dN7j/gZHI//////+5v9z/Ijqv/ypH1f8qSNf/\
KkjX/ypI1/8nQsb/RFWl//r6/P////////////r7/v9zhuX/KkjX/ypI1/8qSNf/KkjX/ypI1/8q\
SNf/KkjX/ypI1/8qSNf/KkjX////////////KkjX/ypI1/8qSNf/KkjX/x44uf8fObz/4eX5////\
//+XoMv/FjKI/xo5nv8aOZ7/FjKI/0xfov/s7vb////////////3+Pv/FjKI/xYyiP8WMoj/Gz+s\
/ypI1f8rSdj/K0nY/ytJ2P8rSdj/K0nY/ytJ2P8rSdj///////////8rSdj/K0nY/ytJ2P8rSdj/\
Hjm7/x86vv8yT9r/4OX3///////x8/r/sLrf/5ajz/+wut//////////////////////////////\
//////////z9/v+Pmcf/ITyW/x5DwP8rSdn/K0nZ/ytJ2f8rSdn/K0nZ/ytJ2f///////////ytJ\
2f8rSdn/K0nZ/ytJ2f8fObz/Hzq+/y1L2v8sStr/epTl/+Dl9///////////////////////////\
///////////////////////////////////////j6Pn/h5zl/yxK2v8sStr/LEra/yxK2v8sStr/\
LEra////////////LEra/yxK2v8sStr/LUva/x86vv8dOL7/PFre/y1L2/8tS9v/LUvb/y1L2/8t\
S9v/LUvb/y1L2/8tS9v/LUvb/y1L2/8tS9v/LUvb/y1L2/8tS9v/LUvb/y1L2/8tS9v/LUvb/y1L\
2/8tS9v/LUvb/y1L2/8tS9v/LUvb/y1L2/8tS9v/LUvb/y1L2/88Wt7/HTi+/x04vpA0UdD/TGvk\
/0xr5P9Ma+T/TGvk/0xr5P9Ma+T/TGvk/0xr5P9Ma+T/TGvk/0xr5P9Ma+T/TGvk/0xr5P9Ma+T/\
TGvk/0xr5P9Ma+T/TGvk/0xr5P9Ma+T/TGvk/0xr5P9Ma+T/TGvk/0xr5P9Ma+T/TGvk/zRR0P8d\
OL6QHTi/Eh04v5YdOL//HTi//x04v/8dOL//HTi//x04v/8dOL//HTi//x04v/8dOL//HTi//x04\
v/8dOL//HTi//x04v/8dOL//HTi//x04v/8dOL//HTi//x04v/8dOL//HTi//x04v/8dOL//HTi/\
/x04v/8dOL//HTi/lh04vxIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA\
AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA\
AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACgAAABAAAAAgAAAAAEAIAAAAAAAAEAAABIL\
AAASCwAAAAAAAAAAAADv8PQA7/D0AAwiiWMMIonMDCKJ/wwiif8MIon/DCKJ/wwiif8MIon/DCKJ\
/wwiif8MIon/DCKJ/wwiif8MIon/DCKJ/wwiif8MIon/DCKJ/wwiif8MIon/DCKJ/wwiif8MIon/\
DCKJ/wwiif8MIon/DCKJ/0dVmf/IyMj/yMjI/8jIyP/IyMj/yMjI/z5Mjv8MIon/DCKJ/wwiif8M\
Ion/DCKJ/wwiif8MIon/DCKJ/wwiif8MIon/DCKJ/wwiif8MIon/DCKJ/wwiif8MIon/DCKJ/wwi\
if8MIon/DCKJ/wwiif8MIon/DCKJ/wwiif8MIonSDCKJaSpQyQAqUMkA7/D0AAwiipYPJ5n/Ei6v\
/xQxuP8UMbj/FDG4/xQxuP8UMbj/FDG4/xQxuP8UMbj/FDG4/xQxuP8UMbj/FDG4/xQxuP8UMbj/\
FDG4/xQxuP8UMbj/FDG4/xQxuP8UMbj/FDG4/xQxuP8UMbj/FDG4/xQxuP8xSrr/5+jr/+fo6//n\
6Ov/5+jr/+fo6/9mdLP/FDG4/xQxuP8UMbj/FDG4/xQxuP8UMbj/FDG4/xQxuP8UMbj/FDG4/xQx\
uP8UMbj/FDG4/xQxuP8UMbj/FDG4/xQxuP8UMbj/FDG4/xQxuP8UMbj/FDG4/xQxuP8UMbj/Ey6w\
/w8nmv8MIoqWKlHJAAwjinUQKZr/FTG5/xUxuf8VMbn/FTG5/xUxuf8VMbn/FTG5/xUxuf8VMbn/\
FTG5/xUxuf8VMbn/FTG5/xUxuf8VMbn/FTG5/xUxuf8VMbn/FTG5/xUxuf8VMbn/FTG5/xUxuf8V\
Mbn/FTG5/xUxuf8VMbn/LUOv//Dw9P/w8PT/8PD0//Dw9P/w8PT/oafL/xUxuf8VMbn/FTG5/xUx\
uf8VMbn/FTG5/xUxuf8VMbn/FTG5/xUxuf8VMbn/FTG5/xUxuf8VMbn/FTG5/xUxuf8VMbn/FTG5\
/xUxuf8VMbn/FTG5/xUxuf8VMbn/FTG5/xUxuf8VMbn/ESqc/wwjingNI4veFC+z/xUxuf8VMbn/\
FTG5/xUxuf8VMbn/FTG5/xUxuf8VMbn/FTG5/xUxuf8VMbn/FTG5/xUxuf8VMbn/FTG5/xUxuf8V\
Mbn/FTG5/xUxuf8VMbn/FTG5/xUxuf8VMbn/FTG5/xUxuf8VMbn/FTG5/1Jhq//w8fT/8PH0//Dx\
9P/w8fT/8PH0/9PW5P8VMbj/FTG5/xUxuf8VMbn/FTG5/xUxuf8VMbn/FTG5/xUxuf8VMbn/FTG5\
/xUxuf8VMbn/FTG5/xUxuf8VMbn/FTG5/xUxuf8VMbn/FTG5/xUxuf8VMbn/FTG5/xUxuf8VMbn/\
FTG5/xQvtP8NI4vhDSOM/BUxuP8VMbn/FTG5/xUxuf8VMbn/FTG5/xUxuf8VMbn/FTG5/xUxuf8V\
Mbn/FTG5/xUxuf8VMbn/FTG5/xUxuf8VMbn/FTG5/xUxuf8VMbn/FTG5/xUxuf8VMbn/FTG5/xUx\
uf8VMbn/FTG5/xMtqP+rsc//8PH1//Dx9f/w8fX/8PH1//Dx9f/t7/T/GDK2/xUxuf8VMbn/FTG5\
/xUxuf8VMbn/FTG5/xUxuf8VMbn/FTG5/xUxuf8VMbn/FTG5/xUxuf8VMbn/FTG5/xUxuf8VMbn/\
FTG5/xUxuf8VMbn/FTG5/xUxuf8VMbn/FTG5/xUxuf8VMbn/DiWO/w0jjP8VMrr/FTK6/xUyuv8V\
Mrr/FTK6/xUyuv8VMrr/FTK6/xUyuv8VMrr/FTK6/xUyuv8VMrr/FTK6/xUyuv8VMrr/FTK6/xUy\
uv8VMrr/FTK6/xUyuv8VMrr/FTK6/xUyuv8VMrr/FTK6/xQws/9JWJ7/7u/0//Hx9f/x8fX/8fH1\
//Hx9f/x8fX/8fH1/yI9vf8VMrr/FTK6/xUyuv8VMrr/FTK6/xUyuv8VMrr/FTK6/xUyuv8VMrr/\
FTK6/xUyuv8VMrr/FTK6/xUyuv8VMrr/FTK6/xUyuv8VMrr/FTK6/xUyuv8VMrr/FTK6/xUyuv8V\
Mrr/FTK6/w8mkP8NJI3/FjK6/xYyuv8WMrr/FjK6/xYyuv8WMrr/FjK6/xYyuv8WMrr/FjK6/xYy\
uv8WMrr/FjK6/xYyuv8WMrr/FjK6/xYyuv8WMrr/FjK6/xYyuv8WMrr/FjK6/xYyuv8WMrr/FjK6\
/xUwsf8qO47/3N7p//Hy9f/x8vX/8fL1//Hy9f/x8vX/8fL1/+7w9P8WMrr/FjK6/xYyuv8WMrr/\
FjK6/xYyuv8WMrr/FjK6/xYyuv8WMrr/FjK6/xYyuv8WMrr/FjK6/xYyuv8WMrr/FjK6/xYyuv8W\
Mrr/FjK6/xYyuv8WMrr/FjK6/xYyuv8WMrr/FjK6/xYyuv8PJ5H/DSSO/xYyu/8WMrv/FjK7/xYy\
u/8WMrv/FjK7/xYyu/8WMrv/FjK7/xYyu/8WMrv/FjK7/xYyu/8WMrv/FjK7/xYyu/8WMrv/FjK7\
/xYyu/8WMrv/FjK7/xYyu/8WMrv/FjK7/xQtqP8sPY7/19nn//Ly9v/y8vb/8vL2//Ly9v/y8vb/\
8vL2//Ly9v/Q0+f/FjK7/xYyu/8WMrv/FjK7/xYyu/8WMrv/FjK7/xYyu/8WMrv/FjK7/xYyu/8W\
Mrv/FjK7/xYyu/8WMrv/FjK7/xYyu/8WMrv/FjK7/xYyu/8WMrv/FjK7/xYyu/8WMrv/FjK7/xYy\
u/8WMrv/DyeS/w4kjv8ULqn/FjO7/xYzu/8WM7v/FjO7/xYzu/8WM7v/FjO7/xYzu/8WM7v/FjO7\
/xYzu/8WM7v/FjO7/xYzu/8WM7v/FjO7/xYzu/8WM7v/FjO7/xYzu/8WM7v/FjO6/xIqmf9RX57/\
4uTt//Lz9v/y8/b/8vP2//Lz9v/y8/b/8vP2//Lz9v/y8/b/l6LY/xYzu/8WM7v/FjO7/xYzu/8W\
M7v/FjO7/xYzu/8WM7v/FjO7/xYzu/8WM7v/FjO7/xYzu/8WM7v/FjO7/xYzu/8WM7v/FjO7/xYz\
u/8WM7v/FjO7/xYzu/8WM7v/FjO7/xYzu/8WM7v/FjO7/xAnkv+Mk7j/T12e/xMrnv8XM7z/FzO8\
/xczvP8XM7z/FzO8/xczvP8XM7z/FzO8/xczvP8XM7z/FzO8/xczvP8XM7z/FzO8/xczvP8XM7z/\
FzO8/xczvP8XM7z/FjG1/xQni/+Ikbz/8/T3//P09//z9Pf/8/T3//P09//z9Pf/8/T3//P09//z\
9Pf/8/T3/0NayP8XM7z/FzO8/xczvP8XM7z/FzO8/xczvP8XM7z/FzO8/xczvP8XM7z/FzO8/xcz\
vP8XM7z/FzO8/xczvP8XM7z/FzO8/xczvP8XM7z/FzO8/xczvP8XM7z/FzO8/xczvP8XM7z/FzO8\
/xczvP8QJ5P/wsPJ//Hy9v94grP/ESaJ/xUwrf8XNLz/FzS8/xc0vP8XNLz/FzS8/xc0vP8XNLz/\
FzS8/xc0vP8XNLz/FzS8/xc0vP8XNLz/FzS8/xc0vP8XNLz/FC6m/yc5i/++w9r/9PT3//T09//0\
9Pf/9PT3//T09//09Pf/9PT3//T09//09Pf/9PT3/6aw4P8XNLz/FzS8/xc0vP8XNLz/FzS8/xc0\
vP8XNLz/FzS8/xc0vP8XNLz/FzS8/xc0vP8XNLz/FzS8/xc0vP8XNLz/FzS8/xc0vP8XNLz/FzS8\
/xc0vP8XNLz/FzS8/xc0vP8XNLz/FzS8/xc0vP8XNLz/ECiT/8LDyf/09ff/9PX3/8HG2/9GVJj/\
ESaJ/xUtpf8XMrf/GDS9/xg0vf8YNL3/GDS9/xg0vf8YNL3/GDS9/xg0vf8YNL3/GDS9/xg0vf8Y\
M7n/EyiS/15qpf/n6fD/9PX3//T19//09ff/9PX3//T19//09ff/9PX3//T19//09ff/9PX3/+Ll\
8f8vSMP/GDS9/xg0vf8YNL3/GDS9/xg0vf8YNL3/GDS9/xg0vf8YNL3/GDS9/xg0vf8YNL3/GDS9\
/xg0vf8YNL3/GDS9/xg0vf8YNL3/GDS9/xg0vf8YNL3/GDS9/xg0vf8YNL3/GDS9/xg0vf8YNL3/\
GDS9/xAolP/Cw8n/9fX4//X1+P/19fj/9fX4/8XI3v9kb6n/JjaH/xElhf8TKZX/FCyh/xYvqv8W\
MLD/GDO5/xg0vf8YNL3/GDS9/xg0vf8WL6r/HTCJ/6SrzP/19fj/9fX4//X1+P/19fj/9fX4//X1\
+P/19fj/9fX4//X1+P/19fj/9fX4//Dw9v9RZsz/GDS9/xg0vf8YNL3/GDS9/xg0vf8YNL3/GDS9\
/xg0vf8YNL3/GDS9/xg0vf8YNL3/GDS9/xg0vf8YNL3/GDS9/xg0vf8YNL3/GDS9/xg0vf8YNL3/\
GDS9/xg0vf8YNL3/GDS9/xg0vf8YNL3/GDS9/xg0vf8RKJT/oKa///X2+P/19vj/9fb4//X2+P/1\
9vj/9fb4//X2+P/S1uX/nKTI/3F8sf9TYaD/Pk2V/x0vg/8QI3z/ECN8/xAjfP8QI3z/UV+f/93g\
6//19vj/9fb4//X2+P/19vj/9fb4//X2+P/19vj/9fb4//X2+P/19vj/9fb4/+3v9f9ccND/GDW+\
/xg1vv8YNb7/GDW+/xg1vv8YNb7/GDW+/xg1vv8YNb7/GDW+/xg1vv8YNb7/GDW+/xg1vv8YNb7/\
GDW+/xg1vv8YNb7/GDW+/xg1vv8YNb7/GDW+/xg1vv8YNb7/GDW+/xg1vv8YNb7/GDW+/xg1vv8Y\
Nb7/ESmV/w8mk/9fc9H/sLnm/+ns9v/29/n/9vf5//b3+f/29/n/9vf5//b3+f/29/n/9vf5//b3\
+f/29/n/9vf5//b3+f/29/n/9vf5//b3+f/29/n/9vf5//b3+f/29/n/9vf5//b3+f/29/n/9vf5\
//b3+f/29/n/9vf5/+bp9P9KYMv/GTW+/xk1vv8ZNb7/GTW+/xk1vv8ZNb7/GTW+/xk1vv8ZNb7/\
GTW+/xk1vv8ZNb7/GTW+/xk1vv8ZNb7/GTW+/xk1vv8ZNb7/GTW+/xk1vv8ZNb7/GTW+/xk1vv8Z\
Nb7/GTW+/xk1vv8ZNb7/GTW+/xk1vv8ZNb7/GTW+/xEplv8PJpT/GTa//xk2v/8ZNr//UGbN/3yM\
2f+mseT/0NXv//f3+f/39/n/9/f5//f3+f/39/n/9/f5//f3+f/39/n/9/f5//f3+f/39/n/9/f5\
//f3+f/39/n/9/f5//f3+f/39/n/9/f5//f3+f/39/n/9/f5/93g8f8+Vsn/GTa//xk2v/8ZNr//\
GTa//xk2v/8ZNr//GTa//xk2v/8ZNr//GTa//xk2v/8ZNr//GTa//xk2v/8ZNr//GTa//xk2v/8Z\
Nr//GTa//xk2v/8ZNr//GTa//xk2v/8ZNr//GTa//xk2v/8ZNr//GTa//xk2v/8ZNr//GTa//xk2\
v/8RKZf/ECeV/xo2wP8aNsD/GjbA/xo2wP8aNsD/GjbA/xo2wP8aNsD/PFTJ/0ZdzP9meNT/c4TX\
/42a3v+lrdf/+Pj6//j4+v/4+Pr/+Pj6//j4+v/4+Pr/+Pj6//j4+v/4+Pr/+Pj6//j4+v/4+Pr/\
+Pj6/8HI6/8vSMX/GjbA/xo2wP8aNsD/GjbA/xo2wP8aNsD/GjbA/xo2wP8aNsD/GjbA/xo2wP8a\
NsD/GjbA/xo2wP8aNsD/GjbA/xo2wP8aNsD/GjbA/xo2wP8aNsD/GjbA/xo2wP8aNsD/GjbA/xo2\
wP8aNsD/GjbA/xo2wP8aNsD/GjbA/xo2wP8aNsD/EiqY/xAnlv8aN8D/GjfA/xo3wP8aN8D/GjfA\
/xo3wP8aN8D/GjfA/xo3wP8aN8D/GjfA/xo3wP8XMaz/maHH//j5+v/4+fr/+Pn6//j5+v/4+fr/\
+Pn6//j5+v/4+fr/+Pn6//j5+v/4+fr/+Pn6/5qn4f8fPMH/GjfA/xo3wP8aN8D/GjfA/xo3wP8a\
N8D/GjfA/xo3wP8aN8D/GjfA/xo3wP8aN8D/GjfA/xo3wP8aN8D/GjfA/xo3wP8aN8D/GjfA/xo3\
wP8aN8D/GjfA/xo3wP8aN8D/GjfA/xo3wP8aN8D/GjfA/xo3wP8aN8D/GjfA/xo3wP8aN8D/GjfA\
/xIqmf8QKJf/GzfB/xs3wf8bN8H/GzfB/xs3wf8bN8H/GzfB/xs3wf8bN8H/GzfB/xs3wf8bNr//\
VmSn//n5+//5+fv/+fn7//n5+//5+fv/+fn7//n5+//5+fv/+fn7//n5+//5+fv/8fL4/2x+1v8b\
N8H/GzfB/xs3wf8bN8H/GzfB/xs3wf8bN8H/GzfB/xs3wf8bN8H/GzfB/xs3wf8bN8H/GzfB/xs3\
wf8bN8H/GzfB/xs3wf8bN8H/GzfB/xs3wf8bN8H/GzfB/xs3wf8bN8H/GzfB/xs3wf8bN8H/GzfB\
/xs3wf8bN8H/GzfB/xs3wf8bN8H/GzfB/xs3wf8SK5r/ESiY/xs4wv8bOML/GzjC/xs4wv8bOML/\
GzjC/xs4wv8bOML/GzjC/xs4wv8bOML/IDit/+Tm7//6+vv/+vr7//r6+//6+vv/+vr7//r6+//6\
+vv/+vr7//r6+//6+vv/2t7y/0Vdzf8bOML/GzjC/xs4wv8bOML/GzjC/xs4wv8bOML/GzjC/xs4\
wv8bOML/GzjC/xs4wv8bOML/GzjC/xs4wv8bOML/GzjC/xs4wv8bOML/GzjC/xs4wv8bOML/GzjC\
/xs4wv8bOML/GzjC/xs4wv8bOML/GzjC/xs4wv8bOML/GzjC/xs4wv8bOML/GzjC/xs4wv8bOML/\
Eyub/xEomf8bOML/GzjC/xs4wv8bOML/GzjC/xs4wv8bOML/GzjC/xs4wv8bOML/GzjC/2l2uv/6\
+vz/+vr8//r6/P/6+vz/+vr8//r6/P/6+vz/+vr8//r6/P/6+vz/tr/q/yhDxf8bOML/GzjC/xs4\
wv8bOML/GzjC/xs4wv8bOML/GzjC/xs4wv8bOML/GzjC/xs4wv8bOML/GzjC/xs4wv8bOML/GzjC\
/xs4wv8bOML/GzjC/xs4wv8bOML/GzjC/xs4wv8bOML/GzjC/xs4wv8bOML/GzjC/xs4wv8bOML/\
GzjC/xs4wv8bOML/GzjC/xs4wv8bOML/GzjC/xMrnP8RKZr/HDnD/xw5w/8cOcP/HDnD/xw5w/8c\
OcP/HDnD/xw5w/8cOcP/HDnD/xw5w/+vttf/+/v8//v7/P/7+/z/+/v8//v7/P/7+/z/+/v8//v7\
/P/7+/z/pLDl/xw5w/8cOcP/HDnD/xw5w/8cOcP/HDnD/xw5w/8cOcP/HDnD/xw5w/8cOcP/HDnD\
/xw5w/8cOcP/HDnD/xw5w/8cOcP/HDnD/xw5w/8cOcP/HDnD/xw5w/8cOcP/HDnD/xw5w/8cOcP/\
HDnD/xw5w/8cOcP/HDnD/xw5w/8cOcP/HDnD/xw5w/8cOcP/HDnD/xw5w/8cOcP/HDnD/xw5w/8T\
LJ3/Eimb/xw5xP8cOcT/HDnE/xw5xP8cOcT/HDnE/xw5xP8cOcT/HDnE/xw5xP8cOcT/ytDm//v8\
/f/7/P3/+/z9//v8/f/7/P3/+/z9//v8/f/7/P3/09ju/yE+xf8cOcT/HDnE/xw5xP8cOcT/HDnE\
/xw5xP8cOcT/HDnE/xw5xP8cOcT/HDnE/xw5xP8cOcT/HDnE/xw5xP8cOcT/HDnE/xw5xP8cOcT/\
HDnE/xw5xP8cOcT/HDnE/xw5xP8cOcT/HDnE/xw5xP8cOcT/HDnE/xw5xP8cOcT/HDnE/xw5xP8c\
OcT/HDnE/xw5xP8cOcT/HDnE/xw5xP8cOcT/FCye/xIqnP8dOsT/HTrE/x06xP8dOsT/HTrE/x06\
xP8dOsT/HTrE/x06xP8dOsT/HTrE/8bM5v/8/P3//Pz9//z8/f/8/P3//Pz9//z8/f/8/P3//Pz9\
/3KD0f8dOsT/HTrE/x06xP8dOsT/HTrE/x06xP8dOsT/HTrE/x06xP8dOsT/HTrE/x06xP8dOsT/\
HTrE/x06xP8dOsT/HTrE/x06xP8dOsT/HTrE/x06xP8dOsT/HTrE/x06xP8dOsT/HTrE/x06xP8d\
OsT/HTrE/x06xP8dOsT/HTrE/x06xP8dOsT/HTrE/x06xP8dOsT/HTrE/x06xP8dOsT/HTrE/xQt\
n/8SKp3/HTrF/x06xf8dOsX/HTrF/x06xf8dOsX/HTrF/x06xf8dOsX/HTrF/x06xf+dqeD//f39\
//39/f/9/f3//f39//39/f/9/f3//f39//39/f9KX8H/HTrF/x06xf8dOsX/HTrF/x06xf8dOsX/\
HTrF/x06xf8dOsX/HTrF/x06xf8dOsX/HTrF/x06xf8dOsX/HTrF/x06xf8dOsX/HTrF/x06xf8d\
OsX/HTrF/x06xf8dOsX/HTrF/x06xf8dOsX/HTrF/x06xf8dOsX/HTrF/x06xf8dOsX/HTrF/x06\
xf8dOsX/HTrF/x06xf8dOsX/HTrF/x06xf8ULaD/Eyqe/x47xv8eO8b/HjvG/x47xv8cOLr/GjKp\
/xgvnf8WK5H/FiuP/xYrj/8WK4//QFGo//39/v/9/f7//f3+//39/v/9/f7//f3+//39/v/9/f7/\
W2y8/x47xv8eO8b/HjvG/x47xv8eO8b/HjvG/x47xv8eO8b/HjvG/x47xv8eO8b/HjvG/x47xv8e\
O8b/HjvG/x47xv8eO8b/HjvG/x47xv8eO8b/HjvG/x47xv8eO8b/HjvG/x47xv8eO8b/HjvG/x47\
xv8eO8b/HjvG/x47xv8eO8b/HjvG/x47xv8eO8b/HjvG/x47xv8eO8b/HjvG/x47xv8eO8b/FS2h\
/xMrn/8eO8b/HjrD/xkyqP8VKo3/O0qW/3R/tP+gqMz/x8vh/8/T5f/P0+X/z9Pl/7m+2f/z9Pj/\
/v7+//7+/v/+/v7//v7+//7+/v/+/v7//v7+/5Wex/8cOLz/HjvG/x47xv8eO8b/HjvG/x47xv8e\
O8b/HjvG/x47xv8eO8b/HjvG/x47xv8eO8b/HjvG/x47xv8eO8b/HjvG/x47xv8eO8b/HjvG/x47\
xv8eO8b/HjvG/x47xv8eO8b/HjvG/x47xv8eO8b/HjvG/x47xv8eO8b/HjvG/x47xv8eO8b/HjvG\
/x47xv8eO8b/HjvG/x47xv8eO8b/HjvG/xUuov8TK6D/GzWw/yAzj/96hbj/19vq//7+/v/+/v7/\
/v7+//7+/v/+/v7//v7+//7+/v/+/v7//v7+//7+/v/+/v7//v7+//7+/v/+/v7//v7+//7+/v/z\
9Pj/N0ic/x46wv8fPMf/HzzH/x88x/8fPMf/HzzH/x88x/8fPMf/HzzH/x88x/8fPMf/HzzH/x88\
x/8fPMf/HzzH/x88x/8fPMf/HzzH/x88x/8fPMf/HzzH/x88x/8fPMf/HzzH/x88x/8fPMf/HzzH\
/x88x/8fPMf/HzzH/x88x/8fPMf/HzzH/x88x/8fPMf/HzzH/x88x/8fPMf/HzzH/x88x/8VLqP/\
GTCi/2Fuq//l5/L//v7///7+///+/v///v7///7+///+/v///v7///7+///+/v///v7///7+///p\
7Pr//v7///7+///+/v///v7///7+///+/v///v7//93g7f8pPJn/HjrC/x88yP8fPMj/HzzI/x88\
yP8fPMj/HzzI/x88yP8fPMj/HzzI/x88yP8fPMj/HzzI/x88yP8fPMj/HzzI/x88yP8fPMj/HzzI\
/x88yP8fPMj/HzzI/x88yP8fPMj/HzzI/x88yP8fPMj/HzzI/x88yP8fPMj/HzzI/x88yP8fPMj/\
HzzI/x88yP8fPMj/HzzI/x88yP8fPMj/Fi+k/3iEvv//////////////////////////////////\
///////////////y9Pz/jp3k/01k1P8lQsr/ID3J/yA9yf86VM//fo/g/+Dk9///////////////\
////////0NTm/yw+lv8eObz/ID3J/yA9yf8gPcn/ID3J/yA9yf8gPcn/ID3J/yA9yf8gPcn/ID3J\
/yA9yf8gPcn/ID3J/yA9yf8gPcn/ID3J/yA9yf8gPcn/ID3J/yA9yf8gPcn/FiuM/xYrjP8WK4z/\
FiuM/xYrjP8WK4z/ID3J/yA9yf8gPcn/ID3J/yA9yf8gPcn/ID3J/yA9yf8gPcn/ID3J/xYvpf/Y\
2Nn///////////////////////////////////////////+eq+f/LUnM/yA+yf8gPsn/ID7J/yA+\
yf8gPsn/ID7J/yA+yf8lQ8r/hJTh//r6/f/////////////////j5vD/Pk+b/x04tv8gPsn/ID7J\
/yA+yf8gPsn/ID7J/yA+yf8gPsn/ID7J/yA+yf8gPsn/ID7J/yA+yf8gPsn/ID7J/yA+yf8gPsn/\
ID7J/yA+yf8gPsn/ID7J/+/w9P/v8PT/7/D0/+/w9P/v8PT/7/D0/yA+yf8gPsn/ID7J/yA+yf8g\
Psn/ID7J/yA+yf8gPsn/ID7J/yA+yf8WMKb/2tra////////////////////////////////////\
//+CkuH/IT7K/yE+yv8hPsr/IT7K/yE+yv8hPsr/IT7K/yE+yv8hPsr/IT7K/yE+yv9Ybtf/9/j8\
//////////////////T1+f9VY6f/Hzm7/yE+yv8hPsr/IT7K/yE+yv8hPsr/IT7K/yE+yv8hPsr/\
IT7K/yE+yv8hPsr/IT7K/yE+yv8hPsr/IT7K/yE+yv8hPsr/IT7K/yE+yv/w8fT/8PH0//Dx9P/w\
8fT/8PH0//Dx9P8hPsr/IT7K/yE+yv8hPsr/IT7K/yE+yv8hPsr/IT7K/yE+yv8hPsr/FzCn/9ra\
2v////////////////////////////////+EleL/IT/L/yE/y/8hP8v/IT/L/yE/y/8hP8v/IT/L\
/yE/y/8hP8v/IT/L/yE/y/8hP8v/IT/L/3KF3v//////////////////////9/f7/0dYo/8fPMH/\
IT/L/yE/y/8hP8v/IT/L/yE/y/8hP8v/IT/L/yE/y/8hP8v/IT/L/yE/y/8hP8v/IT/L/yE/y/8h\
P8v/IT/L/yE/y/8hP8v/8fH1//Hx9f/x8fX/8fH1//Hx9f/x8fX/IT/L/yE/y/8hP8v/IT/L/yE/\
y/8hP8v/IT/L/yE/y/8hP8v/IT/L/xcwqP/a2tr///////////////////////////++xu7/Ij/L\
/yI/y/8iP8v/Ij/L/yI/y/8iP8v/Ij/L/yI/y/8iP8v/Ij/L/yI/y/8iP8v/Ij/L/yI/y/8iP8v/\
0tfv///////////////////////s7fX/OUqf/yI/yf8iP8v/Ij/L/yI/y/8iP8v/Ij/L/yI/y/8i\
P8v/Ij/L/yI/y/8iP8v/Ij/L/yI/y/8iP8v/Ij/L/yI/y/8iP8v/Ij/L//Ly9v/y8vb/8vL2//Ly\
9v/y8vb/8vL2/yI/y/8iP8v/Ij/L/yI/y/8iP8v/Ij/L/yI/y/8iP8v/Ij/L/yI/y/8XMan/2tra\
///////////////////////v8fn/OFLR/yNAzP8jQMz/I0DM/yNAzP8jQMz/I0DM/yNAzP8jQMz/\
I0DM/yNAzP8jQMz/I0DM/yNAzP8jQMz/I0DM/3yN2////////////////////////////9ze7P8i\
Oqz/I0DM/yNAzP8jQMz/I0DM/yNAzP8jQMz/I0DM/yNAzP8jQMz/I0DM/yNAzP8jQMz/I0DM/yNA\
zP8jQMz/I0DM/yNAzP/z9Pf/8/T3//P09//z9Pf/8/T3//P09/8jQMz/I0DM/yNAzP8jQMz/I0DM\
/yNAzP8jQMz/I0DM/yNAzP8jQMz/FzGq/9ra2v//////////////////////kqDk/yNAzf8jQM3/\
I0DN/yNAzf8jQM3/I0DN/yNAzf8jQM3/I0DN/yNAzf8jQM3/I0DN/yNAzf8jQM3/I0DN/yNAzf9C\
W9P/////////////////////////////////hI/B/yM/y/8jQM3/I0DN/yNAzf8jQM3/I0DN/yNA\
zf8jQM3/I0DN/yNAzf8jQM3/I0DN/yNAzf8jQM3/I0DN/yNAzf8jQM3/9PX4//T1+P/09fj/9PX4\
//T1+P/09fj/I0DN/yNAzf8jQM3/I0DN/yNAzf8jQM3/I0DN/yNAzf8jQM3/I0DN/xgyq//a2tr/\
////////////////9PX7/zNO0f8kQc7/JEHO/yRBzv8kQc7/JEHO/yRBzv8kQc7/JEHO/yRBzv8k\
Qc7/JEHO/yRBzv8kQc7/JEHO/yRBzv8kQc7/J0PP//r6/P////////////////////////////Hy\
+P8nP7b/JEHO/yRBzv8kQc7/JEHO/yRBzv8kQc7/JEHO/yRBzv8kQc7/JEHO/yRBzv8kQc7/JEHO\
/yRBzv8kQc7/JEHO//b2+P/29vj/9vb4//b2+P/29vj/9vb4/yRBzv8kQc7/JEHO/yRBzv8kQc7/\
JEHO/yRBzv8kQc7/JEHO/yRBzv8YMqz/2tra/////////////////6ax5P8kQc7/JEHO/yRBzv8k\
Qc7/JEHO/yRBzv8kQc7/JEHO/yRBzv8kQc7/JEHO/yRBzv8kQc7/JEHO/yRBzv8kQc7/JEHO/yRB\
zv/x8/j/////////////////////////////////cX/B/yRBzv8kQc7/JEHO/yRBzv8kQc7/JEHO\
/yRBzv8kQc7/JEHO/yRBzv8kQc7/JEHO/yRBzv8kQc7/JEHO/yRBzv/39/n/9/f5//f3+f/39/n/\
9/f5//f3+f8kQc7/JEHO/yRBzv8kQc7/JEHO/yRBzv8kQc7/JEHO/yRBzv8kQc7/GDOt/9ra2v//\
//////////////9gddv/JULP/yVCz/8lQs//JULP/yVCz/8lQs//JULP/yVCz/8lQs//JULP/yVC\
z/8lQs//JULP/yVCz/8lQs//JULP/yVCz/8lQs7/7/D3////////////////////////////////\
/7vB3f8lQs//JULP/yVCz/8lQs//JULP/yVCz/8lQs//JULP/yVCz/8lQs//JULP/yVCz/8lQs//\
JULP/yVCz/8lQs//+Pn6//j5+v/4+fr/+Pn6//j5+v/4+fr/JULP/yVCz/8lQs//JULP/yVCz/8l\
Qs//JULP/yVCz/8lQs//JULP/xkzrv/a2tr////////////v8fj/KETR/yVC0P8lQtD/JULQ/yVC\
0P8lQtD/JULQ/yVC0P8lQtD/JULQ/yVC0P8lQtD/JULQ/yVC0P8lQtD/JULQ/yVC0P8lQtD/J0LL\
///////////////////////////////////////p6/T/JUHO/yVC0P8lQtD/JULQ/yVC0P8lQtD/\
JULQ/yVC0P8lQtD/JULQ/yVC0P8lQtD/JULQ/yVC0P8lQtD/JULQ//r6+//6+vv/+vr7//r6+//6\
+vv/+vr7/yVC0P8lQtD/JULQ/yVC0P8lQtD/JULQ/yVC0P8lQtD/JULQ/yVC0P8ZM6//2tra////\
////////uL/l/yZD0P8mQ9D/JkPQ/yZD0P8mQ9D/JkPQ/yZD0P8mQ9D/JkPQ/yZD0P8mQ9D/JkPQ\
/yZD0P8mQ9D/JkPQ/yZD0P8mQ9D/JkPQ/zVOxf//////////////////////////////////////\
/////ypFyv8mQ9D/JkPQ/yZD0P8mQ9D/Gy+R/xsvkf8bL5H/Gy+R/xsvkf8bL5H/Gy+R/xsvkf8b\
L5H/Gy+R/xsvkf/7+/z/+/v8//v7/P/7+/z/+/v8//v7/P8bL5H/Gy+R/xsvkf8bL5H/Gy+R/xsv\
kf8bL5H/Gy+R/xsvkf8bL5H/EiR7/9ra2v///////////4+d3f8mRNH/JkTR/yZE0f8mRNH/JkTR\
/yZE0f8mRNH/JkTR/yZE0f8mRNH/JkTR/yZE0f8mRNH/JkTR/yZE0f8mRNH/JkTR/yZE0f9TZsT/\
//////////////////////////////////////////85U8v/JkTR/yZE0f8mRNH/JkTR//z8/f/8\
/P3//Pz9//z8/f/8/P3//Pz9//z8/f/8/P3//Pz9//z8/f/8/P3//Pz9//z8/f/8/P3//Pz9//z8\
/f/8/P3//Pz9//z8/f/8/P3//Pz9//z8/f/8/P3//Pz9//z8/f/8/P3//Pz9/+Tk5P/a2tr/////\
//////9kd9T/JkTS/yZE0v8mRNL/JkTS/yZE0v8mRNL/JkTS/yZE0v8mRNL/JkTS/yZE0v8mRNL/\
JkTS/yZE0v8mRNL/JkTS/yZE0v8mRNL/d4bH////////////////////////////////////////\
////RF3S/yZE0v8mRNL/JkTS/yZE0v/9/f7//f3+//39/v/9/f7//f3+//39/v/9/f7//f3+//39\
/v/9/f7//f3+//39/v/9/f7//f3+//39/v/9/f7//f3+//39/v/9/f7//f3+//39/v/9/f7//f3+\
//39/v/9/f7//f3+//39/v/k5OT/2tra////////////U2nT/ydF0v8nRdL/J0XS/ydF0v8nRdL/\
J0XS/ydF0v8nRdL/J0XS/ydF0v8nRdL/J0XS/ydF0v8nRdL/J0XS/ydF0v8nRdL/J0XR/6621///\
/////////////////////////////////////////z5Z1v8nRdL/J0XS/ydF0v8nRdL//v7+//7+\
/v/+/v7//v7+//7+/v/+/v7//v7+//7+/v/+/v7//v7+//7+/v/+/v7//v7+//7+/v/+/v7//v7+\
//7+/v/+/v7//v7+//7+/v/+/v7//v7+//7+/v/+/v7//v7+//7+/v/+/v7/5OTk/9ra2v//////\
/////0Rd0v8nRdP/J0XT/ydF0/8nRdP/J0XT/ydF0/8nRdP/J0XT/ydF0/8nRdP/J0XT/ydF0/8n\
RdP/J0XT/ydF0/8nRdP/J0XT/yZBwP/v8Pf///////////////////////////////////////z9\
/v8qR9T/J0XT/ydF0/8nRdP/J0XT////////////////////////////////////////////////\
////////////////////////////////////////////////////////////////////////////\
/////////////////////+Xl5f/a2tr///////////9AWM7/KEbU/yhG1P8oRtT/KEbU/yhG1P8o\
RtT/KEbU/yhG1P8oRtT/KEbU/yhG1P8oRtT/KEbU/yhG1P8oRtT/KEbU/yhG1P9cbb//////////\
///////////////////////////////////Y3PD/KEbU/yhG1P8oRtT/KEbU/yhG1P//////////\
////////////////////////////////////////////////////////////////////////////\
///////////////////////////////////////////////////////////l5eX/2tra////////\
////SF/K/yhG1P8oRtT/KEbU/yhG1P8oRtT/KEbU/yhG1P8oRtT/KEbU/yhG1P8oRtT/KEbU/yhG\
1P8oRtT/KEbU/yhG1P8nRM7/pq7T////////////////////////////////////////////pbHm\
/yhG1P8oRtT/KEbU/yhG1P8oRtT/////////////////////////////////////////////////\
////////////////////////////////////////////////////////////////////////////\
////////////////////5eXl/9ra2v///////////2ByyP8pRtX/KUbV/ylG1f8pRtX/KUbV/ylG\
1f8pRtX/KUbV/ylG1f8pRtX/KUbV/ylG1f8pRtX/KUbV/ylG1f8pRtX/M0m0//f4+///////////\
/////////////////////////////////1lv3v8pRtX/KUbV/ylG1f8pRtX/KUbV/ylG1f8pRtX/\
KUbV/ylG1f8pRtX/KUbV/ylG1f8pRtX/KUbV/ylG1f8pRtX/////////////////////////////\
////KUbV/ylG1f8pRtX/KUbV/ylG1f8pRtX/KUbV/ylG1f8pRtX/KUbV/x03tv/a2tr/////////\
//+Fkcn/KUfW/ylH1v8pR9b/KUfW/ylH1v8pR9b/KUfW/ylH1v8pR9b/KUfW/ylH1v8pR9b/KUfW\
/ylH1v8pR9b/J0PJ/5agy////////////////////////////////////////////9nd9P8pR9b/\
KUfW/ylH1v8pR9b/KUfW/ylH1v8pR9b/KUfW/ylH1v8pR9b/KUfW/ylH1v8pR9b/KUfW/ylH1v8p\
R9b/KUfW/////////////////////////////////ylH1v8pR9b/KUfW/ylH1v8pR9b/KUfW/ylH\
1v8pR9b/KUfW/ylH1v8dN7f/2tra////////////zNDl/ydCyP8qR9b/KkfW/ypH1v8qR9b/KkfW\
/ypH1v8qR9b/KkfW/ypH1v8qR9b/KkfW/ypH1v8qR9b/KkbU/0NVq//6+vz/////////////////\
//////////////////////////9pfeL/KkfW/ypH1v8qR9b/KkfW/ypH1v8qR9b/KkfW/ypH1v8q\
R9b/KkfW/ypH1v8qR9b/KkfW/ypH1v8qR9b/KkfW/ypH1v//////////////////////////////\
//8qR9b/KkfW/ypH1v8qR9b/KkfW/ypH1v8qR9b/KkfW/ypH1v8qR9b/HTe4/9ra2v//////////\
//////9JW7D/KkjW/ypI1/8qSNf/KkjX/ypI1/8qSNf/KkjX/ypI1/8qSNf/KkjX/ypI1/8qSNf/\
KkjX/yc/r//R1ej///////////////////////////////////////////+7xPH/KkjX/ypI1/8q\
SNf/KkjX/ypI1/8qSNf/KkjX/ypI1/8qSNf/KkjX/ypI1/8qSNf/KkjX/ypI1/8qSNf/KkjX/ypI\
1/8qSNf/////////////////////////////////KkjX/ypI1/8qSNf/KkjX/ypI1/8qSNf/KkjX\
/ypI1/8qSNf/KkjX/x04uf/Y2Nr/////////////////yc7k/yQ7q/8qSNf/KkjX/ypI1/8qSNf/\
KkjX/ypI1/8qSNf/KkjX/ypI1/8qSNf/KkjX/yI6rP+cpM3/////////////////////////////\
///////////////m6fn/OVXa/ypI1/8qSNf/KkjX/ypI1/8qSNf/KkjX/ypI1/8qSNf/KkjX/ypI\
1/8qSNf/KkjX/ypI1/8qSNf/KkjX/ypI1/8qSNf/KkjX////////////////////////////////\
/ypI1/8qSNf/KkjX/ypI1/8qSNf/KkjX/ypI1/8qSNf/KkjX/ypI1/8eOLn/annG////////////\
//////////+krNH/IDej/ylG0P8rSdj/K0nY/ytJ2P8rSdj/K0nY/ytJ2P8rSdj/KkfS/yE4pf+f\
p8/////////////////////////////////////////////t8Pv/UGnf/ytJ2P8rSdj/K0nY/ytJ\
2P8rSdj/K0nY/ytJ2P8rSdj/K0nY/ytJ2P8rSdj/K0nY/ytJ2P8rSdj/K0nY/ytJ2P8rSdj/K0nY\
/ytJ2P////////////////////////////////8rSdj/K0nY/ytJ2P8rSdj/K0nY/ytJ2P8rSdj/\
K0nY/ytJ2P8rSdj/Hji6/xs2uf+Roev/+vv+/////////////////7zC3f84SZ3/Ijqq/ydCw/8q\
R9H/K0nY/ytJ1/8nQsX/Izuu/zBCmv+0u9n/////////////////////////////////////////\
///o6/r/UGnf/ytJ2P8rSdj/K0nY/ytJ2P8rSdj/K0nY/ytJ2P8rSdj/K0nY/ytJ2P8rSdj/K0nY\
/ytJ2P8rSdj/K0nY/ytJ2P8rSdj/K0nY/ytJ2P8rSdj/////////////////////////////////\
K0nY/ytJ2P8rSdj/K0nY/ytJ2P8rSdj/K0nY/ytJ2P8rSdj/K0nY/x45u/8bNrr/K0nZ/1hw4f/X\
3fj/////////////////9PX6/6ev0/9caq3/MUOY/xwwjf8fMo7/V2ar/5ylzf/y8/j/////////\
///////////////////////////////////k5/L/N0ia/xwwjf8cMI3/HDCN/xwwjf8dMpP/JT65\
/ytI1/8rSdn/K0nZ/ytJ2f8rSdn/K0nZ/ytJ2f8rSdn/K0nZ/ytJ2f8rSdn/K0nZ/ytJ2f8rSdn/\
K0nZ/////////////////////////////////ytJ2f8rSdn/K0nZ/ytJ2f8rSdn/K0nZ/ytJ2f8r\
Sdn/K0nZ/ytJ2f8eObz/HDa6/yxK2f8sStn/LErZ/3mM5//f4/n/////////////////////////\
////////////////////////////////////////////////////////////////////////////\
////////////////////////////7O72/32Ivf8jOJj/JkC7/yxK2P8sStn/LErZ/yxK2f8sStn/\
LErZ/yxK2f8sStn/LErZ/yxK2f8sStn/LErZ/yxK2f////////////////////////////////8s\
Stn/LErZ/yxK2f8sStn/LErZ/yxK2f8sStn/LErZ/yxK2f8sStn/Hzm8/xw2u/8sStr/LEra/yxK\
2v8sStr/LEra/2N55P+1v/L/7vD8////////////////////////////////////////////////\
////////////////////////////////////////////////////////////////////////////\
5Ofy/3WAuv8iNpv/J0HA/yxK2v8sStr/LEra/yxK2v8sStr/LEra/yxK2v8sStr/LEra/yxK2v8s\
Str/////////////////////////////////LEra/yxK2v8sStr/LEra/yxK2v8sStr/LEra/yxK\
2v8sStr/LEra/x85vf8cN7z/LEra/yxK2v8sStr/LEra/yxK2v8sStr/LEra/yxK2v9UbOH/fpDo\
/6Ow7//GzvX/3OH5////////////////////////////////////////////////////////////\
////////////////////////////////////////////////3+P5/3SI5/8sStr/LEra/yxK2v8s\
Str/LEra/yxK2v8sStr/LEra/yxK2v8sStr/LEra/////////////////////////////////yxK\
2v8sStr/LEra/yxK2v8sStr/LEra/yxK2v8sStr/LEra/yxK2v8fOr7/HDe8/y1L2/8tS9v/LUvb\
/y1L2/8tS9v/LUvb/y1L2/8tS9v/LUvb/y1L2/8tS9v/LUvb/y1L2/8tS9v/LUvb/y1L2/8tS9v/\
LUvb/y1L2/8tS9v/LUvb/y1L2/8tS9v/LUvb/y1L2/8tS9v/LUvb/y1L2/8tS9v/LUvb/y1L2/8t\
S9v/LUvb/y1L2/8tS9v/LUvb/y1L2/8tS9v/LUvb/y1L2/8tS9v/LUvb/y1L2/8tS9v/LUvb/y1L\
2/8tS9v/LUvb/y1L2/8tS9v/LUvb/y1L2/8tS9v/LUvb/y1L2/8tS9v/LUvb/y1L2/8tS9v/LUvb\
/y1L2/8tS9v/Hzq+/xw3vfwxT9z/LUvb/y1L2/8tS9v/LUvb/y1L2/8tS9v/LUvb/y1L2/8tS9v/\
LUvb/y1L2/8tS9v/LUvb/y1L2/8tS9v/LUvb/y1L2/8tS9v/LUvb/y1L2/8tS9v/LUvb/y1L2/8t\
S9v/LUvb/y1L2/8tS9v/LUvb/y1L2/8tS9v/LUvb/y1L2/8tS9v/LUvb/y1L2/8tS9v/LUvb/y1L\
2/8tS9v/LUvb/y1L2/8tS9v/LUvb/y1L2/8tS9v/LUvb/y1L2/8tS9v/LUvb/y1L2/8tS9v/LUvb\
/y1L2/8tS9v/LUvb/y1L2/8tS9v/LUvb/y1L2/8tS9v/MU/c/x45vv8dN77eO1rc/y1L2/8tS9v/\
LUvb/y1L2/8tS9v/LUvb/y1L2/8tS9v/LUvb/y1L2/8tS9v/LUvb/y1L2/8tS9v/LUvb/y1L2/8t\
S9v/LUvb/y1L2/8tS9v/LUvb/y1L2/8tS9v/LUvb/y1L2/8tS9v/LUvb/y1L2/8tS9v/LUvb/y1L\
2/8tS9v/LUvb/y1L2/8tS9v/LUvb/y1L2/8tS9v/LUvb/y1L2/8tS9v/LUvb/y1L2/8tS9v/LUvb\
/y1L2/8tS9v/LUvb/y1L2/8tS9v/LUvb/y1L2/8tS9v/LUvb/y1L2/8tS9v/LUvb/y1L2/8tS9v/\
LUvb/zxa3P8dN77hHTi+dS9Mzf9DYeL/NFLe/y5M3P8uTNz/Lkzc/y5M3P8uTNz/Lkzc/y5M3P8u\
TNz/Lkzc/y5M3P8uTNz/Lkzc/y5M3P8uTNz/Lkzc/y5M3P8uTNz/Lkzc/y5M3P8uTNz/Lkzc/y5M\
3P8uTNz/Lkzc/y5M3P8uTNz/Lkzc/y5M3P8uTNz/Lkzc/y5M3P8uTNz/Lkzc/y5M3P8uTNz/Lkzc\
/y5M3P8uTNz/Lkzc/y5M3P8uTNz/Lkzc/y5M3P8uTNz/Lkzc/y5M3P8uTNz/Lkzc/y5M3P8uTNz/\
Lkzc/y5M3P8uTNz/Lkzc/y5M3P8uTNz/NFLe/0Jh4v8vTM3/HTi+eE1s5QAdOL+WLEnL/0Ni3f9N\
bOX/TWzl/01s5f9NbOX/TWzl/01s5f9NbOX/TWzl/01s5f9NbOX/TWzl/01s5f9NbOX/TWzl/01s\
5f9NbOX/TWzl/01s5f9NbOX/TWzl/01s5f9NbOX/TWzl/01s5f9NbOX/TWzl/01s5f9NbOX/TWzl\
/01s5f9NbOX/TWzl/01s5f9NbOX/TWzl/01s5f9NbOX/TWzl/01s5f9NbOX/TWzl/01s5f9NbOX/\
TWzl/01s5f9NbOX/TWzl/01s5f9NbOX/TWzl/01s5f9NbOX/TWzl/01s5f9NbOX/TWzl/0Ri3v8u\
Ssz/HTi/lk1s5QBNbOUATWzlAB04v2MdOL/MHTi//x04v/8dOL//HTi//x04v/8dOL//HTi//x04\
v/8dOL//HTi//x04v/8dOL//HTi//x04v/8dOL//HTi//x04v/8dOL//HTi//x04v/8dOL//HTi/\
/x04v/8dOL//HTi//x04v/8dOL//HTi//x04v/8dOL//HTi//x04v/8dOL//HTi//x04v/8dOL//\
HTi//x04v/8dOL//HTi//x04v/8dOL//HTi//x04v/8dOL//HTi//x04v/8dOL//HTi//x04v/8d\
OL//HTi//x04v/8dOL//HTi//x04v/8dOL/PHTi/Zk1s5QBNbOUAwAAAAAAAAAOAAAAAAAAAAQAA\
AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA\
AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA\
AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA\
AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA\
AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA\
AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA\
AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA\
AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA\
AAAAAAAAAAAAAAAAAAAAAAAAAAAAAIAAAAAAAAABwAAAAAAAAAM=">\
                      </menuitem>\
                      <!--menuitem label="Test"></menuitem-->\
                    </menu>\
                  </menu>';

var html = document.documentElement;
html.setAttribute("contextmenu", "userscript-context-menu");

// If browser supports contextmenu
if ("contextMenu" in html && "HTMLMenuItemElement" in window) {
  // Executed on clicking a menuitem
  $("#userscript-context-menu menu").addEventListener("click", share, false);
  html.addEventListener("contextmenu", initMenu, false); // Executed on right clicking
}

function initMenu(e) {
  var node = e.target;
  var title = document.title;

  var menu = $("#userscript-context-menu menu");
  menu.label = "Share This Page\u2026"; // Set menu label

  var canonical = $("head link[rel='canonical']");
  // Use canonical where available
  var url = canonical ? canonical.href : location.href;

  // If right click on a link
  while (node && node.nodeName != "A") node = node.parentNode;
  if (node && node.hasAttribute("href")) {
    menu.label = "Share This Link\u2026"; // Menu label when right click on a link
    url = node.href;
    title = e.target.getAttribute("alt") || node.textContent;
  }

  // Set menu title and url attributes
  menu.title = title;
  menu.setAttribute("url", url);
}

function share(e) {
  var title = encodeURIComponent(e.target.parentNode.title);
  var url = encodeURIComponent(e.target.parentNode.getAttribute("url"));
  var name = "userscript-sharer";
  var feature = "width=640, height=480, toolbar=no, location";
  switch (e.target.label) { // context menu label
    case "Twitter": // Share on Twitter
      open("https://twitter.com/intent/tweet?text=" + title + "&url=" + url,
           name, feature);
      break;
    case "Facebook": // Share on Facebook
      open("https://www.facebook.com/sharer/sharer.php?src=bm&v=4" +
           "&u=" + url + "&t=" + title, name, feature);
      break;
    case "Google+": // Share on Google+
      open("https://plus.google.com/share?url=" + url, name, feature);
      break;
    default:
      alert(decodeURIComponent(title) + "\n" + decodeURIComponent(url));
  }
}

function $(aSelector, aNode) {
  return (aNode || document).querySelector(aSelector);
}