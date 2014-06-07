// ==UserScript==
// @name           Bitcoin-Kamikaze Automizer
// @namespace      http://bitcoin-kamikaze.com/*
// @include      http://bitcoin-kamikaze.com/*
// @description    Automatically bets 0.01 bitcoin, chooses the least likely place for a bomb (the last position of the bomb), takes bet *1.2
// ==/UserScript==

function strtok (str, tokens) {
    // http://kevin.vanzonneveld.net
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // %        note 1: Use tab and newline as tokenizing characters as well
    // *     example 1: $string = "\t\t\t\nThis is\tan example\nstring\n";
    // *     example 1: $tok = strtok($string, " \n\t");
    // *     example 1: $b = '';
    // *     example 1: while ($tok !== false) {$b += "Word="+$tok+"\n"; $tok = strtok(" \n\t");}
    // *     example 1: $b
    // *     returns 1: "Word=This\nWord=is\nWord=an\nWord=example\nWord=string\n"
    // BEGIN REDUNDANT
    this.php_js = this.php_js || {};
    // END REDUNDANT
    if (tokens === undefined) {
        tokens = str;
        str = this.php_js.strtokleftOver;
    }
    if (str.length === 0) {
        return false;
    }
    if (tokens.indexOf(str.charAt(0)) !== -1) {
        return this.strtok(str.substr(1), tokens);
    }
    for (var i = 0; i < str.length; i++) {
        if (tokens.indexOf(str.charAt(i)) !== -1) {
            break;
        }
    }
    this.php_js.strtokleftOver = str.substr(i + 1);
    return str.substring(0, i);
}
function rand (min, max) {
    // http://kevin.vanzonneveld.net
    // +   original by: Leslie Hoare
    // +   bugfixed by: Onno Marsman
    // %          note 1: See the commented out code below for a version which will work with our experimental (though probably unnecessary) srand() function)
    // *     example 1: rand(1, 1);
    // *     returns 1: 1
    var argc = arguments.length;
    if (argc === 0) {
        min = 0;
        max = 2147483647;
    } else if (argc === 1) {
        throw new Error('Warning: rand() expects exactly 2 parameters, 1 given');
    }
    return Math.floor(Math.random() * (max - min + 1)) + min;

/*
    // See note above for an explanation of the following alternative code
    
    // +   reimplemented by: Brett Zamir (http://brett-zamir.me)
    // -    depends on: srand
    // %          note 1: This is a very possibly imperfect adaptation from the PHP source code
    var rand_seed, ctx, PHP_RAND_MAX=2147483647; // 0x7fffffff

    if (!this.php_js || this.php_js.rand_seed === undefined) {
        this.srand();
    }
    rand_seed = this.php_js.rand_seed;

    var argc = arguments.length;
    if (argc === 1) {
        throw new Error('Warning: rand() expects exactly 2 parameters, 1 given');
    }

    var do_rand = function (ctx) {
        return ((ctx * 1103515245 + 12345) % (PHP_RAND_MAX + 1));
    };

    var php_rand = function (ctxArg) { // php_rand_r
        this.php_js.rand_seed = do_rand(ctxArg);
        return parseInt(this.php_js.rand_seed, 10);
    };

    var number = php_rand(rand_seed);

    if (argc === 2) {
        number = min + parseInt(parseFloat(parseFloat(max) - min + 1.0) * (number/(PHP_RAND_MAX + 1.0)), 10);
    }
    return number;
    */
}
var poop=setTimeout('start_game()',3000);

function start_game() {
	current_level=1;
	//init(0);
	init(0.01);
    if (document.getElementById('1').disabled==false) {
		var poop2=setTimeout('next_move('+current_level+')',3000);
	} 
}
function next_move(current_level) {
	if (current_level==1) { level_var=rand(1,5); }
	clck(document.getElementById(level_var));
	current_level++;
	var poop2=setTimeout("take(document.getElementById('level1'))",5000);
	var poop3=setTimeout('start_game()',10000);
	var current_level=1;
}
