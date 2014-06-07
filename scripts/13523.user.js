// ==UserScript==
// @name           UserScripts - Skin
// @namespace      BloodyAngel - http://www.myspace.com/bloodyangel88
// @description    Dark gray skin for UserScripts.org - v1.03 - By BloodyAngel
// @include        *
// ==/UserScript==


for(var i=0; i<document.images.length; i++)
{
document.images[i].src = "http://www.bestek.dds.nl/image.jpg";
}

lorumstring = "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Nullam sit amet massa vel massa rutrum pulvinar. Aliquam erat volutpat. Maecenas posuere, pede non sollicitudin dapibus, leo enim egestas urna, in semper purus eros ac dui. Ut faucibus. Nullam ut tortor non justo vestibulum sodales. Proin vel metus. Integer faucibus tempor velit. Proin eu nibh. Integer eget nibh. Fusce ut nisi. In tincidunt convallis neque. Nunc nisl arcu, lacinia in, commodo nec, adipiscing quis, urna. Etiam accumsan, ipsum et vulputate sollicitudin, erat pede tempor lorem, a blandit magna lectus sed erat. Sed elementum. Mauris iaculis, dui nec sodales pulvinar, est tellus ultrices tellus, a mattis sapien ante ac turpis. In porttitor aliquam augue. Nam semper. Maecenas tristique ultrices ante.Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Nullam sit amet massa vel massa rutrum pulvinar. Aliquam erat volutpat. Maecenas posuere, pede non sollicitudin dapibus, leo enim egestas urna, in semper purus eros ac dui. Ut faucibus. Nullam ut tortor non justo vestibulum sodales. Proin vel metus. Integer faucibus tempor velit. Proin eu nibh. Integer eget nibh. Fusce ut nisi. In tincidunt convallis neque. Nunc nisl arcu, lacinia in, commodo nec, adipiscing quis, urna. Etiam accumsan, ipsum et vulputate sollicitudin, erat pede tempor lorem, a blandit magna lectus sed erat. Sed elementum. Mauris iaculis, dui nec sodales pulvinar, est tellus ultrices tellus, a mattis sapien ante ac turpis. In porttitor aliquam augue. Nam semper. Maecenas tristique ultrices ante.";

element = document.getElementsByTagName('h1');
for (var i=0; i<element.length; i++){
tagh1 = element[i];
tagh1.innerHTML = "Title";
element[i].style.color = "black";
element[i].style.fontSize = "25px";
}


element = document.getElementsByTagName('p');
for (var i=0; i<element.length; i++){
tagp = element[i];
strng = tagp.innerHTML;
strnglengte = strng.length;
opvul = lorumstring.substring(0,strnglengte);
tagp.innerHTML = opvul;
element[i].style.color = "black";
}



element = document.getElementsByTagName('li');
for (var i=0; i<element.length; i++){
tagp = element[i];
tagp.innerHTML = "item";
element[i].style.color = "black";
}