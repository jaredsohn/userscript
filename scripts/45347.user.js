// ==UserScript==
// @name Megaupload auto-fill captcha
// @version 0.0.6
// @namespace http://herecomethelizards.co.uk/mu_captcha/
// @description Auto-fills the megaupload captcha and auto-starts download
// @include http://megaupload.com/*
// @include http://www.megaupload.com/*
// @include http://megarotic.com/*
// @include http://www.megarotic.com/*
// ==/UserScript==
function Neuron()
{
this.activation = 0;
this.bias = -1;
this.threshold = 0;
this.weights = [];
}
Neuron.prototype.feed = function(inputs)
{
this.activation = 0;
for (var i in inputs)
{
this.activation += inputs * this.weights;
}
this.activation += this.bias*this.threshold;
}
Neuron.prototype.output = function()
{
e = 2.71828183;
return 1/(1+Math.pow(e,-this.activation));
}
function NeuralNet()
{
this.h_layer = [];
this.o_layer = [];
}
NeuralNet.prototype.create_layer = function(weights)
{
var layer = [];
for (var i in weights)
{
var neuron = new Neuron;
neuron.threshold = weights[0];
neuron.weights = weights[1];
layer.push(neuron);
}
return layer;
}
NeuralNet.prototype.feed = function(inputs)
{
var h_outputs = [];

for (var i in this.h_layer)
{
this.h_layer.feed(inputs);
h_outputs.push(this.h_layer.output());
}

for (var i in this.o_layer)
{
this.o_layer.feed(h_outputs);
}
}

NeuralNet.prototype.output = function()
{
var output = [];

for (var i in this.o_layer)
{
output.push(this.o_layer.output());
}

return output;
}

NeuralNet.prototype.test = function(inputs)
{
this.feed(inputs);
return this.output();
}

function get_code(image)
{
var canvas = unsafeWindow.document.createElement("canvas");
canvas.width = image.width;
canvas.height = image.height;
canvas.getContext("2d").drawImage(image, 0, 0);

var cropped_canvas = unsafeWindow.document.createElement("canvas");
cropped_canvas.width = 20;
cropped_canvas.height = 25;

var image_data = [canvas.getContext("2d").getImageData(0, 0, image.width, image.height),
canvas.getContext("2d").getImageData(0, 0, image.width, image.height),
canvas.getContext("2d").getImageData(0, 0, image.width, image.height)]

convert_grey(image_data[0]);
convert_grey(image_data[1]);
convert_grey(image_data[2]);

if (window.location.href.match('megaupload') != null)
{
filter(image_data[0], 105);
filter(image_data[1], 120);
filter(image_data[2], 135);
}
if (window.location.href.match('megarotic') != null)
{
filter(image_data[0], 103);
filter(image_data[1], 134);
filter(image_data[2], 163);
}

clean_noise(image_data[0]);
clean_noise(image_data[1]);
clean_noise(image_data[2]);
var code = '';
for (var i in image_data)
{
canvas.getContext("2d").putImageData(image_data, 0, 0, 0, 0, image_data.width, image_data.height);
cropped_canvas.getContext("2d").fillRect(0, 0, 20, 25);
var edges = find_edges(image_data);
cropped_canvas.getContext("2d").drawImage(canvas, edges[0], edges[1], edges[2]-edges[0], edges[3]-edg
es[1],
0, 0, edges[2]-edges[0], edges[3]-edges[1]);

image_data = cropped_canvas.getContext("2d").getImageData(0, 0, cropped_canvas.width, cropped_canvas.height);

code += guess_letter(check_receptors(image_data));
}

return code;
}

function guess_letter(receptors)
{
var output_map = ['a', 'b', 'c', 'd', 'e',
'f', 'g', 'h', 'i', 'j',
'k', 'l', 'm', 'n', 'o',
'p', 'q', 'r', 's', 't',
'u', 'v', 'w', 'x', 'y',
'z'];

var net = create_net();
var output = net.test(receptors);

var highest = 0;
for (var i in output)
{
if (output > output[highest])
highest = i;
}

return output_map[highest]
}
function check_receptors(image_data)
{
var receptors = [[0, 1], [0, 9], [0, 11], [0, 15],
[0, 18], [1, 0], [1, 17], [3, 0],
[3, 7], [3, 11], [3, 13], [3, 14],
[3, 18], [4, 4], [4, 5], [4, 7],
[4, 8], [4, 12], [5, 5], [5, 11],
[5, 17], [6, 0], [6, 8], [7, 0],
[7, 4], [7, 5], [7, 6], [7, 16],
[7, 19], [8, 0], [8, 15], [8, 20],
[8, 22], [9, 5], [9, 6], [9, 8],
[9, 11], [9, 12], [9, 14], [9, 18],
[10, 0], [10, 6], [10, 7], [10, 8],
[10, 9], [10, 11], [10, 15], [10, 16],
[12, 8], [12, 11], [12, 13], [12, 14],
[13, 1], [13, 10], [14, 0], [14, 5],
[14, 8], [15, 3], [15, 13], [15, 15],
[15, 17], [16, 1], [18, 3], [18, 4]];

var states = [];

for (var i in receptors)
{
x = receptors[0];
y = receptors[1];
i = x*4+y*4*image_data.width;

if (image_data.data == 255)
{
states.push(1);
}
else
{
states.push(0);
}
}

return states;
}

function find_edges(image_data)
{
var clean_columns = 0;
var im_left = image_data.width;
var im_top = image_data.height;
var im_right = 0;
var im_bottom = 0;
for (var x = 0; x < image_data.width; x++)
{
var white_pixels = 0;
for (var y = 0; y < image_data.height; y++)
{
i = x*4+y*4*image_data.width;

if (image_data.data == 255)
{
white_pixels = 1;

if (x < im_left)
im_left = x;
if (y < im_top)
im_top = y;
if (x > im_right)
im_right = x;
if (y > im_bottom)
im_bottom = y;
}
}

if (white_pixels == 0)
{
clean_columns += 1;
}
else
{
clean_columns = 0;
}

if (clean_columns > 2)
{
if (im_right-im_left < 2)
{
im_left = image_data.width;
im_top = image_data.height;
im_right = 0;
im_bottom = 0;
}
else
{
break;
}
}
}

return [im_left, im_top, im_right, im_bottom];
}

function clean_noise(image_data)
{
for (var x = 0; x < image_data.width; x++)
{
for (var y = 1; y < image_data.height-1; y++)
{
var i = x*4+y*4*image_data.width;
var above = x*4+(y-1)*4*image_data.width;
var below = x*4+(y+1)*4*image_data.width;

if (image_data.data == 255 &&
image_data.data[above] == 0 &&
image_data.data[below] == 0)
{
image_data.data = 0;
image_data.data[i+1] = 0;
image_data.data[i+2] = 0;
}
}
}
}
function filter(image_data, colour)
{
for (var x = 0; x < image_data.width; x++)
{
for (var y = 0; y < image_data.height; y++)
{
var i = x*4+y*4*image_data.width;

if (image_data.data == colour)
{
image_data.data = 255;
image_data.data[i+1] = 255;
image_data.data[i+2] = 255;
}
else
{
image_data.data = 0;
image_data.data[i+1] = 0;
image_data.data[i+2] = 0;
}
}
}
}

function convert_grey(image_data)
{
for (var x = 0; x < image_data.width; x++)
{
for (var y = 0; y < image_data.height; y++)
{
var i = x*4+y*4*image_data.width;

var luma = Math.floor(image_data.data * 299/1000 +
image_data.data[i+1] * 587/1000 +
image_data.data[i+2] * 114/1000);

image_data.data = luma;
image_data.data[i+1] = luma;
image_data.data[i+2] = luma;
image_data.data[i+3] = 255;

}
}
}
function create_net()
{
//pre-calculated weights
var h_weights = [[-1.1310486345974551, [-0.54897279963655443, -0.010673370771987623, -0.73708970134131335, 0.31802559324724716, -1.89
98571155002779, -1.0233933234185795, 0.15906334818661744, -0.18386409007728216, -0.12787446012854434, -0.94331619849480774, 0.18679049370422335, -0.22
101237954408789, -0.47369570363989316, -0.28599761841089438, 0.274642031173636, 1.0385894459956855, 0.62483769290253932, -0.19275295593936378, 0.14715
662697947621, 0.22327846874892149, 1.2297902722506204, 0.81293904772071657, 0.4994389773436621, 0.20934044225537715, 0.81269216482887452, 0.2154553492
295179, 0.70212261746710758, -0.62934612164993575, 0.63675158108607843, 1.4214285983202299, -0.81776807177949229, 0.42044439610508949, 0.2800717726024
3948, -0.23766985114456621, 0.91184361472194564, -0.021553759313594156, -0.54607123988816153, -0.011055505239957441, -0.24382911505040797, 0.119934378
31677227, -0.48187266612864293, 0.82845522988645426, 0.64092850930519751, -1.1279646893412698, -1.3292673494986142, -1.5858950135606715, 0.854924
