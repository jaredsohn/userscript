// ==UserScript==
// @name       SHIEP教学管理系统登录验证码识别
// @namespace  com.find1x.js.shiepTeachingManagement
// @version    0.1
// @description  自动填写教学管理系统验证码
// @match      http://210.35.95.65:7777/schoolmanager/
// @copyright  2014+, FindiX Studio
// ==/UserScript==

window.onload = function() {
    var image = document.getElementsByTagName('img')[7]; //如果要用在greasemonkey脚本里,可以把下面的代码放在image的onload事件里          
    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext("2d");
    var numbers = [ //模板,依次是0-9十个数字对应的明暗值字符串
        "1100011100100100111000011100001110000111000011100001110010010011100011111111111111110000000",
        "1110011100001111100111110011111001111100111110011111001111100111000000111111111111110000000",
        "1000011011100111110011111001111100111100111100111100111100111110000001111111111111110000000",
        "1000001011110011111001111001100001111110011111100111110001110011000011111111111111110000000",
        "1111001111000111100011101001101100101110010000000111100111110011111001111111111111110000000",
        "0000000011111101111110000011111100111111001111100111110001110011000011111111111111110000000",
        "1100001100111010111110011111001000100011000011100001110010011001100001111111111111110000000",
        "0000000111110011110011111001111001111100111100111110011110011111001111111111111111110000000",
        "1000001001110000111000001001100001110000010011000001110000111001000001111111111111110000000",
        "1000011001100100111000011100001100010001001111100111110001110011000011111111111111110000000"
    ];
    var captcha = ""; //存放识别后的验证码
    canvas.width = image.width;
    canvas.height = image.height;
    document.body.appendChild(canvas);
    ctx.drawImage(image, 0, 0);
    for (var i = 0; i < 4; i++) {
        var pixels = ctx.getImageData(9 * i + 3, 3, 7, 13).data;
        var ldString = "";
        for (var j = 0, length = pixels.length; j < length; j += 4) {
            ldString = ldString + (+(pixels[j] * 0.3 + pixels[j + 1] * 0.59 + pixels[j + 2] * 0.11 >= 140));
        }
        var comms = numbers.map(function(value) { //为了100%识别率,这里不能直接判断是否和模板字符串相等,因为可能有个别0被计算成1,或者相反
            return ldString.split("").filter(function(v, index) {
                return value[index] === v;
            }).length;
        });
        captcha += comms.indexOf(Math.max.apply(null, comms)); //添加到识别好的验证码中
    }
    document.querySelector("input[name=validateCode]").value = captcha; //写入目标文本框
};