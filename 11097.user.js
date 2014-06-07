// ==UserScript==
// @name          sprintf
// @description   a sprintf function like unix, php, perl.
// @version       101
// @author        Kazuyoshi Tlacaelel <kazu.php@gmail.com>
// ==/UserScript==



    // {{{ sprintf

    /**
     * a sprintf function like unix, php, perl. replaces all %s ocurrences in a
     * string for given (unlimited) arguments | parameters | varibales.
     * passed to this function
     *
     * at the moment only the following bindings are possible
     *      - %s    will bind a strings and integers
     *
     * @param mixed $params the parameter/s that you want to bind to the string
     * Note: if you have a string with several bindings simply add another
     * argument for each value
     *
     * @return string the binded string or the original string in case of
     * failure
     * <code>
     *   >>> x = new String(" Hello %s ");
     *   [" ", "H", "e", "l", "l", "o", " ", "%", "s", " "]
     *   >>> x.sprintf(" ? ")
     *   " Hello ? "
     *   >>> x.sprintf(" ? ", "a")
     *   " Hello %s "
     *   >>> x.sprintf(4)
     *   " Hello 4 "
     *   >>> x = new String(" %s %s ! ")
     *   [" ", "%", "s", " ", "%", "s", " ", "!", " "]
     *   >>> x.sprintf("Hello", "World")
     *   " Hello World ! "
     *   >>> x.sprintf("Hello", "John")
     *   " Hello John ! "
     *   >>> x.sprintf("Hello", "Good Nite")
     *   " Hello Good Nite ! "
     *   >>> x.sprintf("Hello", "Good Bye")
     *   " Hello Good Bye ! "
     *   >>> x.sprintf("Hello", ", Good Bye")
     *   " Hello , Good Bye ! "
     *   >>> x.sprintf("Hello", "& Good Bye")
     *   " Hello & Good Bye ! "
     * </code>
     */
    var sprintf = function ($params)
    {
        var $i = 0; $str = '';  
        for (; $i < this.length; $i ++)
            $str += this[$i];
        if ($str.match(/\%s/g).length != arguments.length)
            return $str;
        for ($i = 0; $i < arguments.length; $i ++)
            $str = $str.replace(/\%s/, arguments[$i]);
        return $str;
    }

    // }}}

var $s = document.createElement('script');
$s.innerHTML = "String.prototype = {}; String.prototype.sprintf = " +
    sprintf.toSource();
document.body.appendChild($s);

