/*
 IdentityBurro for GreaseMonkey

 Version 0.3
 (C) 2005 Paolo Massa under cc-by-sa
 License: Creative Commons "Attribution-ShareAlike 2.5"
 http://creativecommons.org/licenses/by-sa/2.5/

 Parts of the code comes from the great BookBurro extension that is
 (C) 2005 Jesse Andrews, Britt Selvitelle under cc-by-sa
 Also the inspiration for this extension comes mainly from BookBurro
 extension. Thanks for sharing under a CC licence!

 Snipits used from RSS Reader for GreaseMonkey
 http://www.xs4all.nl/~jlpoutre/BoT/Javascript/RSSpanel/
 Version: 1.03 (C) 2005 Johannes la Poutre
 THANKS!

 Changelog:

 0.1 - initial release (working on flickr, del.icio.us and technorati) - July 17, 2005
 0.2 - tweaked to add: citeulike, last.fm (+audioscrobbler), 43things/places/ideas/allconsuming, rojo and lj
        plus modified idburro() to create a collapse button/function 0.--- Daniel Dockery, peritus@gmail.com, Aug 15, 2005
 0.3 - refactored the code a bit and cleaned it up (resetStyle, images are more separated from code). 
       added webjay.org and audioscrobbler.com (however audioscrobbler has been incorporated into last.fm so the code is commented but maybe in future it will be useful again.
       added 2 todos. added some comments
       in the code. --Paolo Massa, massa@itc.it, Aug 25, 2005
*/

// ==UserScript==
// @name          Identity Burro - Remixing identities on social sites
// @namespace     http://moloko.itc.it/paoloblog/
// @description   When on userpage of an user on a social site (such as flickr, del.icio.us, etc), provide links to userpages of same username on other social sites.
// @include       http://flickr.com*
// @include       http://www.flickr.com*
// @include       http://del.icio.us/*
// @include       http://technorati.com/*
// @include       http://www.technorati.com/*
// @include       http://*.43things.com/person/*
// @include       http://*.43places.com/person/*
// @include       http://43.allconsuming.net/person/*
// @include       http://*.livejournal.com*
// @include       http://*rojo.com/people/profile/?handle=*
// @include       http://*citeulike.org/user/*
// @include       http://www.last.fm/user/*
// @include       http://webjay.org/*
// @include       http://www.webjay.org/*
// @exclude
// ==/UserScript==

(function() {

var resetStyle="text-decoration: none; font-weight:normal;background:none;border:0;padding:0;margin:0;text-align:left;";

//this function creates a link, i.e. an <A> element
function dom_createLink(url, txt, title) {
  var a  = document.createElement("a");
  a.setAttribute("href", url);
  a.setAttribute("style",resetStyle+"color:#00b;");
  if (title) a.setAttribute("title", title);
  a.appendChild(document.createTextNode(txt));
  return a;
}

//this function create a new Table Row (<TR>) with 2 <TD>: first <TD> contains the icon of the target social site (as link to the user profile on that site), second <TD> contains a text link "<username> on <target site>"
function create_link_row(username,site,url,base64icon) {

  var icon = document.createElement("a");
  var icon_img = document.createElement("img");
  icon_img.setAttribute("src","data:image/png;base64,"+base64icon);
  icon_img.setAttribute("style",resetStyle);
//  icon_img.setAttribute("border", "0");
  icon.appendChild(icon_img);
  icon.setAttribute("style",resetStyle);
  icon.setAttribute("title",username+" on "+site);
  icon.setAttribute("href",url);

  var a = dom_createLink(url,username+' on '+site, 'Link to '+username+' on '+site);

  var tr = document.createElement("tr");
  tr.setAttribute("style",resetStyle);
  var td_left = document.createElement("td");
  var td_right = document.createElement("td");
  td_left.setAttribute("style",resetStyle+"padding-left:6px;");
  td_right.setAttribute("style",resetStyle+"padding-left:6px;");
  td_left.appendChild(icon);
  td_right.appendChild(a);
  td_right.setAttribute("align", "left");
  tr.appendChild(td_left);
  tr.appendChild(td_right);
  return tr;
}

//this function create the entire <DIV> element containing all the links and images for current user <username>

function idburro( username ) {
  //base64 encoding of the site icons.
  var  technorati_icon_base64="iVBORw0KGgoAAAANSUhEUgAAAA4AAAAMCAYAAABSgIzaAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH1QcRAh0YOybr8gAAAB10RVh0Q29tbWVudABDcmVhdGVkIHdpdGggVGhlIEdJTVDvZCVuAAABrUlEQVQY042PP2gTcRTHP7/f3fWO1oQcSaNV0Epti4I2g6RgjAjqojgUB+1QHIQ6tIsoSLcuWigupZRQFAQFBwXxD7o4KYqjTkaLpITa0pScjc3Z5C53PQdp6D+Ln+29x+e97xOuXw0e50Z5khujPZzgdvIVmtQpVn/w6PsIHwsvsZx5Ig0xuuNn6T1wk92N7YjJLzeCB1N3UKVKJv2Wg5FjLFSmGfyQZu73LBuJGlEmjr9HvsjfBcDU4+wPHQHgeT6zpQRgVS2eTo8jS84vAAQSKRQAXN9hO8q1ReRqUXIKzNhZAM7vu4ppmFtKTVojPa2DKHsvMQzgByvYXpF0ywVMfSepXeewnBnK7k8C4bJDi5CIpRhK3OOQmUKknhGsbpNC0tdxnSudI/XYds1i2S9hKGFCWgyB+PvaWhGgNdTJ/ZOf0aSxKWZtpcqn4hty5SzqxmHMaMYPPF7nx3k4dYtwQzNNqknFWyJvZ6l4LidaelB1RcPxa3XR9iz63x0lt/QNgPnlwqbLuqIhk/FT65pfF7N16V8k46eR1w5n6Ip28z8oQnKxbYAzey7zBwVZkfap5KGPAAAAAElFTkSuQmCC";
  var      flickr_icon_base64="iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH1QMdDBo5jcZZGQAAAMZJREFUOMtj/P///38GCgATA4UArwEbzn9l0K57zCBf9hCnGhZ8mgOnvmBgYGBgkBNiId0FFx7/ZGBgYGBw1uRkuNMuR5oB5WveMmy68I2BgYGB4fnHvww169/hNIARWyzw59xn+PTjH5zPx8HE8HGKInYT/mMBb7/8/Z+5+PV/huQ7/yNmvvj/9svf/7gAVi8IcTPh5dMvHVBkAC8HIwMfBxODIBczXgMYKc8LjK1Qo8ik//////8/Q8t/cmkGSjT/////PwBRndJGs8cdQAAAAABJRU5ErkJggg==";
  var   delicious_icon_base64="iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAIAAAC0tAIdAAAAK3RFWHRDcmVhdGlvbiBUaW1lAOMgMjIg6eXw6SAyMDA1IDA1OjQ3OjQzICswMjAw7OgyTQAAAAd0SU1FB9UGFgMyOcQmuP8AAAAJcEhZcwAACxIAAAsSAdLdfvwAAAAEZ0FNQQAAsY8L/GEFAAAAcUlEQVR42mNsbGzk5eVlQAUfP4IQGuDj+8zQ19f3HwPU1/9nYEBHBQV9TAykgKGqmrEe6P///9FEf/yw+PHDHE2Qn38+y8ePHydMmIAmkZeXl5+vjia4du2/weNLmoZgXV3d58+f0UR5eHgwE+b3798Bmzk9yeQIiMcAAAAASUVORK5CYII=";
  var          ft_icon_base64="iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAIAAACQkWg2AAAAB3RJTUUH1QgPFQYLPVFjPgAAAAlwSFlzAAALEgAACxIB0t1+/AAAAARnQU1BAACxjwv8YQUAAAE2SURBVHjatVKhUsQwFGwZROoS18rgDkddTyI5iYNPOBwWeRZ5Eln+4E4iWwfu6qhMXeISV/bdK9dO3TFDptN53by32d007vs+OmddnNX9l4HL6UdwDd5CLqgOXRQsoUJxwfg40H48hXaPQq9KkRauKe3ndkrH+CDJtXvuni11/SD0HVWJjKQmDyzD1C90aFbMBqRegYzob7dCpEdJwXVfr5F3IIPcYOqhdfHobetMFWwD+uCt4JQgi7QmMi02gzw0hQ58Wb4WIiPIOwOHRy0xLq55u5opgbZEaXt41/c7hMN5qHyd3jxTSqi4DxpoA0bTpW1KTpoMKx3aycVhDg/tdhWPCaWTLKcwDiUc8jBcjfcQuvqUOnwjZVDwgcydLTecUtT/Lm8qLuz3bgS9AY73CYn//W/9AVdlvgKfh0dTAAAAAElFTkSuQmCC"
  var     last_fm_icon_base64="iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAANbY1E9YMgAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAHySURBVHjaYvz//z/DZUar/wxkAN3/xxgBAojxEoMlWZphACCAmBgoBAABRLEBAAEEN4BVWpRBZl41g/r9tQwaTzcxKJ+YzcAXYAdXyOdrw6Byai6D6uUlDGJV8XBxgABiAWuWE2dQ3DWR4e/bjwwvSqcw/AHSfD7WDLJLGxieZfcyfFy1l0FqchHDm/4VDL8ePGfgcTVjYOLlYvj3+RsDQACBDZBoSWf4/fglw33XfLjJX/efY/h+/haDRGc2w6+7T4C2sDB8O3WN4dvxKwyfNh6GqwMIILAXOC20Gd7N2Yzhv4/LdzP8efaGgRfo/Dc9yxjkN3YBXTqBQTDRm4GRgw2sBiCAwAYwMjEx/P/9B8OA/3//MbydupZBINyF4d3czQx3LVIYvp24yiDRlQ32EggABBDYgO9nbzAIxntiGMBpqsnw9dB5cJgIxnow/Lr3jOFl3WyGZ1k9DDxOJmA1AAEENuBl7WwGLlMtBoUtPQxcVroM7JoKDKKVcQxKeyczsIgLMbxuXcAgVpvIwOttxcChrcgglOrH8PP2Y7ABAAEET4nsWooMEu0ZDJz6qgwMzEwMf998ZHgzaRXD+/lbwQrFm9MY+MOdwd79cfUew/PCiWAXAQQQxUkZIIAoTokAAUSxAQABxATKkuRqBukFCDAAuBKcTM5MQyoAAAAASUVORK5CYII=";
  var        rojo_icon_base64="iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAABgFBMVEUAAAD///8BAf8DBP8ICv8KDP8LDf8NEP8PEv8QE/8RFP8SFf8UF/8TF/8XG/8YHf8aH/8bIP8cIf8eI/8hJ/8hKP8jKf8jKv8kK/8lLP8oL/8oMP8pMf8sNP8tNf8xO/8yO/82QP82Qf86Rf89SP8/S/9BTv9IVv9LWv9RYP5UZP5WZv5bbP5cbv5ecP5hc/5idf5leP5ofP5ug/5yiP5zif52jf55kP56kf55kf58lP6Enf6Fn/6GoP6Kpf6Mp/6Oqf6RrP6Pq/6Rrf6Srv6Ws/6Ytf6Ztv6buP6Zt/6auP6buf6du/6gvv6evf6gv/6hwP7///8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABkZGXRAAAAAWJLR0QAiAUdSAAAAAlwSFlzAAAASAAAAEgARslrPgAAAJtJREFUGNNjYAxAAYwMYMpcXlBM1wfMBAtY8fOrSLHrwwXcFQRtAtwUJFxhAuY8ekBSS8gBJmDIaxEQ4CIu6w0X4LcOcFJiM4WbocapryfGaRAAF5Bh4uKTNwtACBixshh6BiAJ2AgyS1v6IwnYiUrKcavbIgSchZUdNTkEdOx9oQJeGtp+AVaKLCIWUAF/N5CRHsaqJiABdO8DAKoYP6C1VqZNAAAAAElFTkSuQmCC";
  var   citeulike_icon_base64="iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAABIAAAASABGyWs+AAABGElEQVQ4y8WSv44BURTGf/fO3WFKun0H4QUUeqXGC0g8gLeQUWkkCo1aopzwBBoayUai2agUEwoGd+ZsodjImoS1yX7t953fyfmjRER4QfqV4j8BGIDx2DIcWlxXOJ0cej1NLmd+hKfThPX6QqOR+QbM55Z2WwiCDJ6niKIEY9Tdbvu9Zru99cxkoqjXFZ53NbLZ56bSxsDx+PtD6GoVBgNhubSIwGJxYbeLHwYoEZHZzNLvQxhaCgWHVsvh7WOBKZVQWhOHIRwOzD7f6XQiXDcBwPczICmy5bLYKBIRkVMQiHS7d3P//0ipgERrsPa6qPOZRN3/DZMGoFYjaTaJKxUYjRDfT79CGiNerUg2G3SxiJPPPw94RF/Ij6Mlz63sWgAAAABJRU5ErkJggg==";
  var livejournal_icon_base64="iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAB3RJTUUH1QgPFQYB3YSKIAAAAAlwSFlzAAALEgAACxIB0t1+/AAAAARnQU1BAACxjwv8YQUAAAHVSURBVHjajZJNSxtRFIafOxPzMTUWLWIlKIqbCiaLli5sodCFtP0RTbQlFkKUhkj23fQX2A8To0msil12VcEf0AoiLahQW9CNK6EEwcnXZLwZSTSpqTlwN/fe85z3PedAY9ybNK3TYoh/ki/HVlxcB1AuJ5uh+3SaBv6nd3HaVFpXIj8ev/9oMjxuVmPty4bJnefX2hG1D3qBnbUIqiJ4NvOJ9m4PryMhQpNT5MvlpnZqFmITj5GFeRhK4L7dRyQ6TcmwkUh9wKnamtpRquT1zX2+ft+nq7ef0dEHZNLLqLINug7xxXdodvuVkAtZlcdcnvBMlEKhYKnZ291hfCKAYYDLBa9ehtGLxTo7F1OoXDodLC8tYZfVhBCMeH0sLqRrSuaSs7ja2uqUKHV6JORvNksmlbIgZdk8r89HMrFAJS+Xg2R6lk53Rw1y9aLIxw63G38gYNlRFIXPqyt4BoY4OvhN+JHGm5VD+JURzTdNQjSHgxfBoAXZ3N5lOyabcVI6l+7/hvkjKZSmAGnnNJ9nfi5u2bH06hJQlDtRKjP9pLdhCv9R4pAAT/dN/rwdlI0wrOujbBFP7GcLgOqIs6dotzSisnJ4rIee4BbcUFsENMKqUTI4AySMvjm5jB2UAAAAAElFTkSuQmCC"
 var webjay_icon_base64="iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAYAAAA71pVKAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsSAAALEgHS3X78AAAAB3RJTUUH1QcbFhMth4TplwAAAmBJREFUGJUtkklvHFUYRc/3xqrqqp67cbAFBCKMJYSIsoxYseansYW/wzY7xBKEkihKwO62e3IPNbz3suis7z13cXTl919/S/vtis39HYv7O9b/feBxu6M9nQgq4m1GNRgwvrhgPr9kOL9gOJziywJT77fst2u2798w2zzwTAvrXsar2/95vVxSGM3NbEpZH5HjgWNoQQkVAdN1DWa54Oey4NurC7BCiIpfbm64W60QiQzLijzP0HnB29WGt9s1nfMYHztmpx0vr59SVQWh09T1AYYlX09LRAxKWZTRxAiV1nT7NcvRGOPqmqfDgtJ4UpOh3s3JdUT6LTQONX2gfTdGZQeYLXEu54Ux/JFAZW1g7DPE9RBpSbsR7PskIGEgArWBU47SFi+KkbNYFMZpwYknhRrjDHzzAWJEZ4E2GNAJ5jWiAR1AaYiQeYvKBwPq0wHRHUkUktWkg6fLa3jwJBTStsQ6QNQQAo3L8GUPlT25ZBUgtudA2YhEjVp5OBrSyqC1oHRAVEK0YpFXmLyHUmWf7uor7jcrUlB0awu9LSkm7Hc7ko1Q1qh+DaI5ac9qMEH7DOOch2ff8/7PVwx0IJvsiFHQBpAGg5AkQQqE2PGm/zmxHOEUKKctuudof3jO35sdTRdROpISpC5w1i6kKNzaGdvZJdZqrPEo8Q5nC+xoTHf9I68fH2liAG2IEonxBARue1Puv7zG+BycRYzGoBXneY9cfUE3mvDvP3/x5HCgKgoa7VhPPmMxuSIqOVdFzi9IQBSNCCgUoRqiXvzEbXNkUR+JeUWjHV2KJCB84lOEj336B7UWkg/4AAAAAElFTkSuQmCC";
 var audioscrobbler_icon_base64="iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAYAAAA71pVKAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsSAAALEgHS3X78AAAAB3RJTUUH1QcbFhomwZSLVgAAAb5JREFUGJXF0rFPE2EcxvHve+/dtYU7WjCVKhVDqwkJYtJBE6MxbPpXuuji4O5mNCHGaBcQMUrQAI0VU4+Wk2vv3vf9OTDoXAef/TM8Tx4lIsKU8aaF/4x9ABEhzcYkp2cYscxVZpiPZ/EUJMOUZDiiFPgszNeolEso9RdOs4zN7U+8290nc5Z2o8HDWzcJtOPx0+dsffhILY64f/c2G/c6zFdjFArfWsve4Tfe7OwRzZZYLFf5fNgjLoUE9hePnjxj5UoDBbx8/Zal5gU6a6uEvo9XWMfe0THDbELr0iJr7ctUSgFbXw9wOURzFSrRLNevLdNuLWOMhzXufDARYZIbBGG/P2D7Sx9jHE4pOus3eLBxB2MtL1516XZ30E4Iff9PZ4MgYplMCjwF1jlAc/TjO72DYwQYpSnSt5wMh1jn0Hjn2NeaajlivdWkHsdsvt8lM44oDKjV5yDR1BeqtK4uYbVHlueEoY8yxsphf0BvkBBqzcVaRDI+4+R0TKfd5GSU8jM5Ix2nFKKoRTGrK0vMlEOUiIg4YWIMxlgC38PTHoVxlEMfT3lYJ+SmIC8sgdZUSgFKqXM87cP+37d/AySZzIEk5MVOAAAAAElFTkSuQmCC"; //not used
  //to create other base64icon, just save an image on your local disk
  // (should be 14x12 pixels)
  //then run something like
  //> python /usr/lib/python2.3/base64.py your_image_icon_file.png

  //base64 encodings of icons used in the interface
  var expand_button_icon_base64 = "iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAAAAABzHgM7AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH1QcQDywr8s95YAAAAB10RVh0Q29tbWVudABDcmVhdGVkIHdpdGggVGhlIEdJTVDvZCVuAAAAM0lEQVQI13WOMQ4AIAwCD+L/v1wHm4qDTAckBBVXDmYBIKC6acbBOPgd8Ek1zTgTTt8HG+RECReJSxyFAAAAAElFTkSuQmCC";
  var collapse_button_icon_base64 = "iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAIAAADZF8uwAAAALHRFWHRDcmVhdGlvbiBUaW1lAE1vbiAxNSBBdWcgMjAwNSAxOTowMzowNCAtMDYwMHCzYxkAAAAHdElNRQfVCBAAAxtPBqFNAAAACXBIWXMAAAsSAAALEgHS3X78AAAABGdBTUEAALGPC/xhBQAAAD9JREFUeNpj/P//PwMhwERQBRCwwFmMjIxwNprxTFglkDWgW4dLHbqbsKojyuHoirA6n4mgChRFeIKAkWohDgBfrBsTQ001dwAAAABJRU5ErkJggg==";
  var close_button_icon_base64 = "iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAAAAABzHgM7AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH1QcQDx0R8p6nYAAAAB10RVh0Q29tbWVudABDcmVhdGVkIHdpdGggVGhlIEdJTVDvZCVuAAAAN0lEQVQI122OQQ4AMAjCiv//MzvAsiybB4MKjTKnhnuQIH0ABFm4Aufi6gdQf2ngJKd+b9r/gwXGyQoXw2hMKQAAAABJRU5ErkJggg==";
  var logo_button_icon_base64 =
  "iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAAAAABzHgM7AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH1QcQDywr8s95YAAAAB10RVh0Q29tbWVudABDcmVhdGVkIHdpdGggVGhlIEdJTVDvZCVuAAAAM0lEQVQI13WOMQ4AIAwCD+L/v1wHm4qDTAckBBVXDmYBIKC6acbBOPgd8Ek1zTgTTt8HG+RECReJSxyFAAAAAElFTkSuQmCC";
  var about_button_icon_base64 = "iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAAAAABzHgM7AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH1QcRATMLttkdWQAAAB10RVh0Q29tbWVudABDcmVhdGVkIHdpdGggVGhlIEdJTVDvZCVuAAAANklEQVQI11WNQQ4AMAjCqvH/X2YHdHOcIG1CiJcCAgBBTidMUONyNc7raIb7kHb3T2uxRufTDg3YCRz3chRaAAAAAElFTkSuQmCC";

  var box = document.createElement("div");
  box.setAttribute("id","idBdiv");
  box.setAttribute("title","Click box to expand/collapse");
  box.setAttribute("style",resetStyle+"position:fixed;z-index:99;top:40px;right:-140px;background-color:#eef;border:1px dotted #111;padding:2px;text-align:left;opacity:.85;font:8pt sans-serif;overflow:hidden;width:174px;margin-bottom:15px;padding:0;margin:0;");

  var expand = document.createElement("img");
  expand.setAttribute("src","data:image/png;base64,"+expand_button_icon_base64);
  expand.setAttribute("style",resetStyle+"position:absolute;left:1px;top:1px;margin:1px;width:12px;height:12px;background-color:#ffb;border:1px solid black;line-height:8px;text-align:center;");
  expand.setAttribute("title","Click To Expand");
  expand.onclick = function() {
    this.parentNode.style.display = "block";
    this.parentNode.style.right = "0px";
    this.setAttribute("src","data:image/png;base64,"+collapse_button_icon_base64);
    this.setAttribute("title","Click to Collapse");
    this.onclick = function() {
      var n = document.getElementById("idBdiv"); n.style.display = 'none';
      n.parentNode.removeChild(n); idburro(username);
     }
   };
  box.appendChild(expand);

  var close = document.createElement("img");
  close.setAttribute("src","data:image/png;base64,"+close_button_icon_base64);
  close.setAttribute("style",resetStyle+"position:absolute;left:18px;top:1px;margin:1px;width:12px;height:12px;background-color:#ffb;border:1px solid black;line-height:8px;text-align:center;");
  close.setAttribute("title","Click To Remove");
  close.onclick = function() {
    var n = document.getElementById("idBdiv"); n.style.display = 'none';
    n.parentNode.removeChild(n);
   };
  box.appendChild(close);

  var logo = document.createElement("div");
  logo.setAttribute("src","data:image/png;base64,"+logo_button_icon_base64);
  logo.setAttribute("style",resetStyle+"position:absolute;left:51px;top:3px;margin:2px;height:12px;border:0;line-height:8px;text-align:center;font-weight:bold;");//font:10pt sans-serif;");
  logo.setAttribute("title","Identity Burro");
  logo.innerHTML="Identity Burro";
  box.appendChild(logo);

  var about = document.createElement("a");
  var about_img = document.createElement("img");
  about_img.setAttribute("style",resetStyle);
  about_img.setAttribute("src","data:image/png;base64,"+about_button_icon_base64);
  about.appendChild(about_img);
  about.setAttribute("style",resetStyle+"position:absolute;left:151px;top:1px;margin:2px;width:12px;height:12px;background-color:#ffb;border:1px solid black;line-height:8px;text-align:center;");
  about.setAttribute("title","Paolo Blog");
  about.setAttribute("href","http://moloko.itc.it/paoloblog/archives/2005/07/17/identity_burro_greasemonkey_extension_for_social_sites.html" );
  box.appendChild(about);

  var table = document.createElement("table");
  table.setAttribute("style", resetStyle+"padding-top:20px;width:100%;font:8pt sans-serif;margin:3px;");

  table.appendChild(create_link_row(username,"del.icio.us",'http://del.icio.us/'+username,delicious_icon_base64));
  table.appendChild(create_link_row(username,"Flickr",'http://flickr.com/photos/'+username,flickr_icon_base64));
  table.appendChild(create_link_row(username,"Technorati",'http://technorati.com/profile/'+username,technorati_icon_base64));
  table.appendChild(create_link_row(username,"Cite-u-Like",'http://www.citeulike.org/user/'+username,citeulike_icon_base64));
  table.appendChild(create_link_row(username,"WebJay",'http://webjay.org/by/'+username,webjay_icon_base64));
  table.appendChild(create_link_row(username,"Last.FM",'http://last.fm/user/'+username,last_fm_icon_base64));
// table.appendChild(create_link_row(username,"Audioscrobbler",'http://audioscrobbler.com/user/'+username,audioscrobbler_icon_base64));  //audioscrobbler has been incorporated into last.fm
  table.appendChild(create_link_row(username,"Rojo",'http://www.rojo.com/people/profile/?handle='+username,rojo_icon_base64));
  table.appendChild(create_link_row(username,"43Things",'http://www.43things.com/person/'+username,ft_icon_base64));
//  table.appendChild(create_link_row(username,"43ThingsIdeas",'http://ideas.43things.com/person/'+username,ft_icon_base64));
  table.appendChild(create_link_row(username,"43Places",'http://www.43places.com/person/'+username,ft_icon_base64));
//  table.appendChild(create_link_row(username,"43PlacesIdeas",'http://ideas.43places.com/person/'+username,ft_icon_base64));
  table.appendChild(create_link_row(username,"AllConsuming",'http://43.allconsuming.net/person/'+username,ft_icon_base64));
  table.appendChild(create_link_row(username,"Livejournal",'http://www.livejournal.com/users/'+username,livejournal_icon_base64));
  box.appendChild(table);

  document.getElementsByTagName("body")[0].appendChild(box);
}

function extractUsername (url) {
  var username;

  if (document.location.href.match(/^http:\/\/(www\.)?flickr\.com\/photos\//) ) {
    var parsedUrl = document.location.href.match(/^(http:\/\/(www\.)?flickr.com\/(photos|people)\/)([^\/]*)([^\/]*)([^\/]*)/ );
    username=parsedUrl[4];
  }

  if ((!(document.location.href.match(/^http:\/\/del.icio.us\/(login|register|popular|doc|about|tag|tags|rss|all|inbox|logout|settings|post|url|search)/)))&&(document.location.href.match(/^http:\/\/del.icio.us\//))) {
    var parsedUrl = document.location.href.match(/^(http:\/\/del.icio.us\/([^\/]*)([^\/]*))/);
    username=parsedUrl[2];
  }

  if (document.location.href.match(/^http:\/\/(www\.)?technorati.com\/profile\//))  {
    var parsedUrl = document.location.href.match(/^http:\/\/(www\.)?technorati.com\/profile\/([^\/]*)/);
    username=parsedUrl[2];
  }

  if (document.location.href.match(/^http:\/\/(www\.)?livejournal.com\/userinfo\.bml\?*user=([^&]*)/)) {
    var parsedUrl = document.location.href.match(/^http:\/\/(www\.)?livejournal.com\/userinfo\.bml\?*user=([^&]*)/);
    username=parsedUrl[2];
  }

  if (document.location.href.match(/^http:\/\/(www\.)?last.fm\/user\/([^\/]*)/)) {
    var parsedUrl = document.location.href.match(/^http:\/\/(www\.)?last.fm\/user\/([^\/]*)/);
    username=parsedUrl[2];
  }

  if (document.location.href.match(/^http:\/\/([^\.]*)\.livejournal.com\/?$/)) {
    var parsedUrl = document.location.href.match(/^http:\/\/([^\.]*)\.livejournal.com\/?$/);
    if (parsedUrl[1] != 'www') {
      username=parsedUrl[1];
    }
  }

  if (document.location.href.match(/^http:\/\/(www\.)?livejournal.com\/users\/([^\/]*)\/?/)) {
    var parsedUrl = document.location.href.match(/^http:\/\/(www\.)?livejournal.com\/users\/([^\/]*)\/?/);
    username=parsedUrl[2];
  }

  if (document.location.href.match(/^http:\/\/.*\.43(things|places)\.com\/person\/([^\/]*)/)) {
    var parsedUrl = document.location.href.match(/^http:\/\/.*\.43(things|places)\.com\/person\/([^\/]*)/);
    username=parsedUrl[2];
  }

  if (document.location.href.match(/^http:\/\/43\.allconsuming\.net\/person\/([^\/]*)/)) {
    var parsedUrl = document.location.href.match(/^http:\/\/43\.allconsuming\.net\/person\/([^\/]*)/);
    username=parsedUrl[1];
  }

  if (document.location.href.match(/^http:\/\/(www\.)?rojo.com\/people\/profile\/\?handle=([^\/]*)/)) {
    var parsedUrl = document.location.href.match(/^http:\/\/(www\.)?rojo.com\/people\/profile\/\?handle=([^\/]*)/);
    username=parsedUrl[2];
  }
  
  if (document.location.href.match(/http:\/\/(www\.)?citeulike.org\/user\/([^\/]*)/)) {
    var parsedUrl = document.location.href.match(/http:\/\/(www\.)?citeulike.org\/user\/([^\/]*)/);
    username=parsedUrl[2];
  }

  if (document.location.href.match(/^http:\/\/(www\.)?webjay.org\/by\//)) {
    var parsedUrl = document.location.href.match(/^http:\/\/(www\.)?webjay.org\/by\/([^\/]*)/);
    username=parsedUrl[2];
  }

/*
//audioscrobbler has been incorporated into last.fm
  if (document.location.href.match(/^http:\/\/(www\.)?audioscrobbler.com\/user\//)) {
    var parsedUrl = document.location.href.match(/^http:\/\/(www\.)?audioscrobbler.com\/user\/([^\/]*)/);
    username=parsedUrl[2];
  }
*/

  return username;
}

var username = extractUsername(document.location.href);

if(username) {
  idburro(username);
}


})();


/*
TODO July 17, 2005

# when expanded, part of the unexpanded interface (buttons and icons)
  remains in background, more transparent. understand why and fix it

# when expanded the "expand" icon should become a "collapse" icon (the
  arrow in the other direction).     --- Peritus: Aug 15, done

# some CSS properties are inherited from the current site, so that for
  example, the extension looks a bit different in flickr and in
  del.icio.us. Understand which are the properties of which elements
  and overwrite them (surely the background of some elements is
  inherited).
  I created the variable resetStyle that tries to reset all the styles
  and it is prepended in every your_element.setAttribute("style",resetStyle+ "your specific inline css here")

# adding some of these sites
//webjay
//citeulike            --- Peritus: Aug 15, added
//last.fm              --- Peritus: Aug 15, added
//audioscrobbler       --- Peritus: this has been incorporated into last.fm
//furl
//wist
//blogmarks
//43things             --- Peritus: Aug 15, added; also 43places, and the 43Ideas of both sites, as well as AllConsuming
//tagsurf
//upcoming
//jots
//podcast
//consumating
//rojo                 --- Peritus: Aug 15, added
//bloglines
//smugsmug
//bookswelike
//kinja.com

//Actually I hope that flickr or del.icio.us (or another social site)
//will soon allow its users to set (in the profile) what are her
//usernames on other sites.
//In this way this extension will not have to assume that xxx@flickr
//is also xxx@del.icio.us but can be yyy@del.icio.us

# creating an ajax method that query google or yahoo! for "<username>
blog" and creates a link with the first returned result (possibly the
highest in the two queries?) with anchor text such as "guessed blog of
<username>". For the ajax-power, I guess I need to steal, ... ehm,
take inspiration again from the fantastic bookburro code! ;-)

# on a link such as http://del.icio.us/phauly?setbundleview=hide, the
  extractUsername function extracts as username
  "phauly?setbundleview=hide" so the links will be such as
  http://flickr.com/phauly?setbundleview=hide and this is not
  correct. We want to   change the regexps to stop at the first "?"
  symbol. 

*/