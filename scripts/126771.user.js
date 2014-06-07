// ==UserScript==
// @name         Jegyzet
// @namespace    http://userscripts.org/scripts/show/126771
// @version      1.0
// @description  Kis Jegyzetek írására alkalmas a The West játékban.
// @author      w.vikice
// @include	http://*.the-west.*/game.php*
// @require	http://code.jquery.com/jquery-1.7.1.min.js
// @history	2012.02.25. kész a jegyzettömb ;)
// ==/UserScript==

var off_img = 

"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAAOCAYAAAD0f5bSAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9wCGRMmMAWekyAAAACXSURBVCjPY2CAgn3liv+JZTMxMDAwtF1+9x9G42IXnnkA18yIrAkfeP3zEwMDAwNDv4kCIxMDEQCmAQZYSFH86D0vdk3oCpEVo9iETSE2DR9+vsVuE7qp2AALIYUw0/EGBDZFDAwMDOwf/qBqwqUQXTFOm7ApYmBgYGD4/h1VE4ZCJAXYACOM4TX7LMGktC3VmJGBgYEBANinVu0BYFFQAAAAAElFTkSuQmCC";

var on_img = 

"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAYAAAA71pVKAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9wCGRMlMC6zwOMAAAD+SURBVCjPY2DAAvaVK/7HxkYHTLgUtV1+97/t8rv/6GxkwAiTtFhizHAi5iwDIVClK8QIY7MwMDAwRPF+YliGRePrn5/wGsSErBAdo4NH73kZgne//Y/i7AcPHvz/8eMHw8wvHBiKcYG1rsKMLMQqZmBgYPjw8y1mgD148OC/gIAAw4sXLxiqH4viVMz+4Q+E8f07IsDwmQ7XgKRpW6oxI4ZmdXV1hqkMNxmKzvxDNRFNE0pUYQVQDQwMDAx9ttwMHBwcDAq4ogrZ9j4TJrimPltuBnV1dazmY7VZXV2dYas6wcSGqvnjx4+QQPvwAUOhgoICI9a0DYsufAqxAQCBgHO0Y0G79QAAAABJRU5ErkJggg==";

var helptk =
"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAIAAADZrBkAAAAABGdBTUEAALGPC/xhBQAAAH1JREFUOE+1k1sKgDAMBOtlPa13ipXAuq6LJIrFDwuZTB66RMR4cSa2bqP1HKZ/Mc7esLWxCeRB/yVbAiVMgoAhhU4SJaEw++IXwIUxlu2Z3qwtQ5l/siE357rYZMoyElwRpnYYeEuMnTbbNH/cLFfsvisWSpYPf4AMvXLdAZQPPxIWQCIuAAAAAElFTkSuQmCC";

var wino =
"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAIAAADZrBkAAAAABGdBTUEAALGPC/xhBQAAA0hJREFUOE9j/P//PwMZAKhtQaHHqXV1pzfUn1haMjVSZ6KH6JHpKTd2N17d0TAzXKHNTWpNS/ip9XUn1tdvn5RS5CAPsgmIqyzE1tQGXdla31sT42RvVOwuf2RW1O2DLZc3Fa7MVFiSp7V6auaEptgjCzKnhChU20pBtfWFGXa6iR2YHjOxMbYoI6A/03hOrdue1ZXn12ctrzQ8uixuTkeMr5PO8lKTFTkGu2dlQ7Wd3Vi7pcW3MlQv1NM8OclPXVXB0VQ92MMizM88wM+yuyUhPdkzJtI9J9Xr4tbac9sa4NoaLu5scnLQMzFUd7bS19CQq0nW3b4s//TKiP0rU1fMznR0MbW3M9Az1tuxouIsXNvCCq9F3clqanK6+hou7vZlxWE3N4Y9P99ycXXg6yvtD/YmdDTG+Hha6pjotxd4zUwxgdrW4q6S7qbh56hlZ2cUGBHa2xb35HjZgyOld3fn3Nqd8eJSc31ZuJGhhoau9rRMvQU5VlBtwNDvqY6MC7FLT44wNNJLS/a+cyDn9o6M+4cKHx4turk7NSbA0thELzc75NimyrNbmqDajq0sX9IV4+pq7uHpyM0naGyofm1b/q29JXcPlt8+UHhlW2piqLWjo4F/oOv2eZnA6IVqK7UWm5+qGRvurK6pxs7FKyEpfGNb3pMTdY+OV93ZnXH3eK2Hp8XGWTF+PhYLc/QbXWWg2jZNy760vdHWWl9RSZaNg5uLh/vE8sRHh8seH6l8fLz6xGJ/dzfjp5cmV5XFzuxK3NARCdV2aE3NsXX1hgbq8oqyLJwcggJ8N3aX3N6a8vJi140tCbdOdgT6mp9aGNzbENNcHXcS7sh5jdGxjir6OipKilK+ziZy0sI3DrYdmep2/1jriUXBB5ZkBvvb7JvsVxJkmp3is3NRGdS2XF+jSCdDK11lJxN1O30VWwN1X1s9Pzt9dzONUFsdR0MVW20lWwNle225DDfT6iAbqLZsN/3CBD8jVZkELys5MX4zHZUQJ9NQF3MNeSkrTUULTSUjRRknHVVnZal8e4NcW22otq7CwPxIB387/VAbHVdTVV8HnUBnnQh7rQAHvSAnPQ9TdXtNKT9rjWhH/aYox/4MH6g2IEUqAAAt6NPPpK+2ogAAAABJRU5ErkJggg==";

var rofi_smly =
"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAYAAAA71pVKAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9wCGBYqHsuKdG0AAAD7SURBVCjPnVM7bgIxEH0PQTjKHoKKCkHBFiCocgeUIh3yWCiHSQQFx+EmSIuYFGa89q6DIkay1jM73/fGFBG8KsNUcc5pqnvvWbLZnVbZOacYHVqvZt/eO3ZLMMgyNnugriCLL5ChAEnspgegrrLALDi2ctqGTpZjkMTnfITrrbWnMkjnJQm3HMefH7M33O6h0PtkCJI5LiICVVUA/z6qqiIS0Pbe85EggFNXfV7OlwhiD7As8LgJBwCOmzBvXeWolwAzhFOxpp4uSXRefQPrn6DYtyB9ns+Xsudj5qc8m6PxytP2z4TsPozIY2FV06rFmc3BNe0ydINMfgFJenTplcV19wAAAABJRU5ErkJggg==";

var twdb =
"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAIAAADZrBkAAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAArhJREFUOE+dk+tLk2EYxutLB6jsm4GiYimaC9IUsyGFMpTNddBR5pYlzkDTLJ2CNiV0S9I8tblMMykPKW7mIYc2NVORnGnEzJqCiWEIQv+C/cZe9HO9PNue932f331d9/U827u9vb3nPy6w4caipszQ9vzwtqJIW2XM3Mukb2b11860hQ71dJNqtjllvk3FsNUkdmvjzTqVS4lPz+OMsmS/i6IjuXIfyGp18KhB8UARaCmTur+bs0QUvSfzzovzrL8ZLGCjT1PeFof0aIJmjLHOXpXTol5/f9fR6ZqgzPyT4YKjI/FjVdiEXjTxKEzAJp9dB7C/kK+OaNbGSpzW4pWREhzOtqZPNFzjLVbxDLn4SjJVLRawpf47X14n4H6h6zarWfd7WocFe3s2JZjQ1ZRBStufn8fsYitD+evW9M3Jwi17xZa98te4jrE6pt+YeuK+pcryQBZ2cAssqJHb2oCKHlzYvJFha0gnCdQAGBuTpcu9mbS92CJBVsAWLTk/B1M3p4vA/jhMYEhVKcOBmYMt9WtQE3rbwTC5Opi28SFvc6acMN5V32jIiP7cpbHWprUUxLcWSKhLWqg52uVkuxOJhqxhCCAnyvuK10FVwKE3pXJ4XVJIieyEKSOC2L6bla5IdtRclSxq3LMIJt5zPxN6I0CYjFOHpcePMlnqVrABnARBjT3BAJEMVsguB3qc9th3/tgB5UkPRApi/fIkvpwvdn/ZrJitP2OruSRgQ+XRqOObprFenRKAQqnMF00mJM72/OhMmDOJwXZN9mnP2vQRPAXGCVUpwevxOimFuHV2yWeMURyuIa2ovTBOUGvJFj+UetVe9TGm+pvSA90H11x8jhIYacsK4rg2qv3rlL4ssBoyBYz/Qsd9MaGzV7W3wvXJoXQF1qeNhHcfKOwweDJsyBUwfv71+gsx5C8AR/SWDwAAAABJRU5ErkJggg==";

var forts =
"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAIAAADZrBkAAAAABGdBTUEAALGPC/xhBQAAAqRJREFUOE9j/P//PwMZAKgNAtKIAHDFDHA9fv6+mlqa7e1lF09vuHdj76tHRz++PPXlw6XHd46sWdazbnlVR0sh0GSIepA2IKeiNENfXzs40HPF0snXL+36+eHS/+/X/3y+9vXtlRtXDvX2N29ZXbt+eUVVRRZEJ1RbV3uesYmunKLSyhVTf/24++rp2dtXDmxdNr27Krc2J7miOHn3xvpNq6oXzCpD0Ta3Lq403CEzzOHA6p7bJ1YdWDezPDW2Jjt+QU9VRU5CcVbIid0de7c07NnShKJtQprXrFTPpgjH6nCHlgS3yWmerUne66e11mdEpgW5TO/LO7m369COtt2bW1C05QQ69EQ7TkpwC7EzsjTU87E28rIxjnK19THX83Uw2r2u6dS+niO7gBa2omhztbMO83FoiLBf3JRakROrpaKkr6FhbWoU6mO9ZXnlmb09J3Z3HdvdcX5vL4q29u687YsrppSFezvYlEe592V5RTqb5Cb4nt3TceFg97Gd7cd2dR7f3Xn/xHQUbXOmlq6aktWb6m2ho2ahr1Ef5xTjbFpTEH7rxORze7vO7Ou6tK/7zoGe5ydmoGhbOrNw1/Ky5QX+9ZEO5oba+loaJhpqpcl+787Nf31q1v2jk96fm/vh9Iw3p2aiaNu7uXnjwoq5BX57u+PKol1MdNT97c1S/B1Lojwas4K+XVpwflXTna3tH45PQdG2bl5lX31Cc6rnpsaIWTm+MU5GzlaGNia6aorylgbaqf72PXlBz3d3P92KGm/t1TmrpxWsn1o4O8s7N8A60Fbf1VQn0MYgyc+uIc7TVlft4Pzq94emzumuRNgGSZYTGwpOLmttS/U2M9bR1FCOdzYt8zLfPrN2Vml8qqvxjU29iyc1oiRl8jMOPCMRyQAA4fgbBXoV/x0AAAAASUVORK5CYII=";

var nyan =
"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAIAAADZrBkAAAAABGdBTUEAALGPC/xhBQAAArdJREFUOE9j/P//PwMZAKjts5UdEH3S0vsop/hRSeWTuuYnNQ0g+qgBQq80tT9IS7+HIEXFc5YuIJuA+L+sMghxC/7nFgAjfjDi+88DR/y/eYUhste0LKHavkSp/YpQ+ukl8NOD95c77093PiD52w2I+ODom6cAUPCzl8j6zHiYbZtV/wPRWuE/a4X+rxWAox/rxIHo/zr+u2tN2fUjmUVVGCVVBFXUoNp+bZADoZU8v1Zw/l7JBUH3V8sENNdG17SE1LfaF01ycAp0s7Z2sLP3c7OAavv9TgaE3nD9fsP+5y0HBH18xY0IYGaGKQunrdm3Z/XO/ft2bIY58r/UfxBi//+fBYJufWAvWKhu5mppb29nbWdm52Q5Ze7sZes2Llm+fO3aKVBtR39Kn/opc+wH19Ef7Ed+sG/+zM/AzqCmYLVo74ZV25cd3L5/2959G3Zt2Lh71YYdKzfvXAzVFvlTPPKnWNAvbo83/CrdMpZ5pnGxMQ2Z1ZvWrZizYGpYRERgRERQRGAoEIWGB8SEQ7UF/JcCIrf/HAv2mgH9IyoqtWrbvN1bFxxcvnpaXz8DM0oiYhEERTUIW5xfD0Qap1fM3xHMzMAkJSo9e+m0xSvnb1yxblb/VFZmLiBKSdXLr9PIq1LJrbSHapPf9B+IeNf879mewcnNoKIktnjFrGWbFq/atHL6lIn83JxiUiwxhzdzr/7Ps/qf0ub3UG1Wi/4AkdasPzqzv6duWDFlY6yaspKEhLKkhJaNnbrJvFfqs36pzf6jCkNQbU3hf4GowvNvmdvfcre/1d5fdTS45WSZpCQ5fF21Klz+AFGl6184gmqr9/kPRFWu/6vdgHL/saIK1/9wBNU2b8YzIJo24cmEzkcTux9N6X08GYyADCCa1P24u+VBa/39jqb7E7oeAhE8lYByD0kAABpgAcWNinNGAAAAAElFTkSuQmCC";

var kerdojel =
"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAALCAYAAACprHcmAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9wCGRITMz9kahsAAAAdaVRYdENvbW1lbnQAAAAAAENyZWF0ZWQgd2l0aCBHSU1QZC5lBwAAAFFJREFUGNOdkUkOwCAMA23+/+fhBHIpqQo+ZbGSUWItAjFiW9ZOINJY1R7TCO36M0lD5qPfQJRswQ5CL6Zlam5vldF2fYkvjMn8B+Hqzj75YAdLIlu9q8FzrQAAAABJRU5ErkJggg==";

var felkialtojel =
"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAAMCAYAAAC0qUeeAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9wCGRIYKrj7GxAAAABFSURBVCjPpZExDgAwCAJP//9nOtU01qSmMgrcIFBIIDrawarg/CqoUkn3EfUk57uPqJl8+a+/hl8FMzly3bUEsu68BrYADUIv2qdjJC4AAAAASUVORK5CYII=";

var whp_img =
"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAASCAYAAABB7B6eAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9wCGBcmCnwnhSsAAAM+SURBVDjLpVXPSyp/FD0zWE601EIqiegHUlROCBVoPyBCcqgWLlu0FYJ20R/Rpm3LVi0TCtoElRVDOYZW0ibUWkg26MaFjY7nuyj95nu9XvAuzGbunXM+98y95yMQPwzy61JBEL77zPJTUEVRviw5qNX8gUjgD0Cz2SwcDgecTicKhQJKpRIqlQpyuRwEQUB7ezsODg6+7oqfH5KBQIB2u512u53r6+vUNI0vLy+sxeLiImdmZqjrOnVd59HREQOBAFdXV2mz2RgIBN4LPzC/JHA4HGxtbWU6nebnUFWVACgIAlVVbcglk0lKkvQbgfhZGkVR0NXVBUVRYJomCoVCg3qRSAQdHR0giVgs1pB7fX2Fw+FALpd7l/ZDarEG7vF4oOs6tre34ff7USqVoGlaHcA0TZyeniIUCsHhcEBV1QaC4+NjuFwubGxsIJvN1t+LtZNbLBasra3BarXC7XajpaUF5+fn9cJMJoNMJoNgMAhZlhGNRlEsFhvI5+bmEAwGYbVa613UJRodHYXX6wUAdHd3Y3h4GJFIBPl8HgCgaRo6OzsxMDAAj8eDx8dHPD8/AwASiQTS6XR96kZGRj518MVkWSwWzM/PI51O4+HhAQBwcnICWZYhiiLGx8fx9vaGm5sbAMDl5SV6e3vR39//G1adIB6P4+Liop6YmJiAaZq4vr5GuVzG/f09Zmdn6ydsa2uDpmkgicPDQywsLEAURZimiXg8jsY9ICnLMr1eLw3DIEk+PT3RbrdzZWWF0WiUsixT13WSpGEYnJ6eps/nYzKZ5ODgIO/u7kiSu7u7dLvd9VEVaz3FYjFIkoRQKIRqtQqn04nJyUmoqopwOIyxsTHYbDYAQFNTE6amppDJZBAOh9HT04OhoSFUq1Vsbm6+S1fT6ddF8/l8XF5eZiqV4tbWFgHQ6XRyb2+vYbH29/cpSRI7Ojq4s7PDVCrFpaWlbxbto5OzszOUy2UoioJEIoHm5maUSiX4fL6GUrfbDUmSUCwWcXV1Bb/fj0ql8u5Jn/6ywG9cVFEUGIYBXdfhcrlgs9kgiiKq1Sry+Txub2/R19cHwzD+N7tfXFXgP9j1Hx30xwR/u3D+ctkAwH88IQcUBvbTogAAAABJRU5ErkJggg==";

var on_checker = 0;
var name1 = '';
var name2 = '';
var nameswitch = 0;

//*****************Keret**************
var popup = document.createElement('div');
    popup.setAttribute('id', 'popupwindow');
    popup.setAttribute('style', 'position: absolute;visibility: hidden;overflow: hidden;border:2px solid #CCC;z-index: 1000000;background-color: rgba(0,190,255,0.6);border:2px solid  #333;padding:5px;width: 150px;height: 205px;top: 250px;right: 8px;');
var popup_header = '<p align="center"><font face="Arial" color="white" size="1"><b>Jegyzettömb v 1.0</b></font>';
    popup.innerHTML = popup_header;
//*****************Keret_end**************

var on_off = document.createElement('div');
    on_off.setAttribute('id', 'on_off');
    on_off.setAttribute('title', 'Jegyzet be');
    on_off.setAttribute('style', 'position:absolute;z-index:10;width:20px;cursor:pointer;text-align:center;background-color: rgba(0,0,0,0);font-size:12px;padding:5px 5px 0px 2px;left:100px;top:100');
    on_off.innerHTML = '<img id="on_off" src=' +off_img+ ' width="16px" heoght="16px" />';
    on_off.onclick = function(){
//**************szövegdoboz**************
popup.innerHTML = popup_header + '<input type="text" name="kisjegyzet" title="Kisjegyzet :)" ><p align="center"><font color="#88fbef"><b>Jegyzet </b></font><img src=' +felkialtojel+ ' title="Jegyzetet beírása után a ki/be kapcsolás valamint az oldal frissítése (F5) esetén a jegyzet törlődik!!!"/> <img src=' +kerdojel+ ' title="Fogd meg az egérrel a jobb alsó sarkot <b>.::</b> és húzd kisebbre a szövegdobozt, hogy láthasd a Honlap gombokat a (W) alatt!"/></p><p align="center"><textarea name="jegyzet" rows="7" cols="15" title="Jegyzettömb :)"></textarea></p><p align="center"><p align="center"><a href="http://www.whp.atw.hu" target="new blank"><img src=' +whp_img+ ' title="WHooP Kiadó Honlapja"/></a></p> <p align="center"><font color="white" size="1"><u>Hasznos Honlapok</u></p><p align="center"><a href="http://tw-db.info/" target="new blank"><img src=' +twdb+ ' title="TW-DB"/></a> <a href="http://www.west-help.tk" target="new blank"><img src=' +helptk+ ' title="West-Help"/></a> <a href="http://www.wini.lapunk.hu" target="new blank"><img src=' +wino+ ' title="Wini.lapunk"/></a> <a href="http://www.westforts.com/" target="new blank"><img src=' +forts+ ' title="West Forts"/></a> <a href="http://nyanit.com/www.the-west.hu/" target="new blank"><img src=' +nyan+ ' title="NYAN! + The West"/></a></p><p align="center"><font color="white" size="1">w.vikice &copy; 2011</p>';
//**************szövegdoboz_end**************
if (on_checker<1) {
popup.style.visibility = 'visible';
on_off.innerHTML = '<img id="on_off" src=' +on_img+ ' width="16px" heoght="16px" />';
on_off.title = "Jegyzet ki";
on_checker = 2;
document.addEventListener('click',getnames,false);
 }
else {
popup.style.visibility = 'hidden';
on_off.innerHTML = '<img id="on_off" src=' +off_img+ ' width="16px" heoght="16px" />';
on_off.title = "Jegyzet be";
on_checker = 0;
document.removeEventListener('click',getnames,false);
 }

 


   };

document.body.appendChild(on_off);
document.body.appendChild(popup);