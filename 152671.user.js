// ==UserScript==
//
// @name          Dynamic Math for FooPlot
// @namespace     http://userscripts.org/users/109239
// @description   Live adjust values to plot
// @copyright     2012+, Alex Vlasov (http://userscripts.org/users/109239), superkoder@gmail.com
// @license       GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @license       Creative Commons; http://creativecommons.org/licenses/by-nc-nd/3.0/
// @version       0.1a

// @include       htt*://fooplot.com/*
// @require  http://ajax.googleapis.com/ajax/libs/jquery/1.8/jquery.min.js
// ==/UserScript==

var console = unsafeWindow.console;

GM_addStyle((<><![CDATA[
    div.DynamicMath-container {
        margin: 3px -8px -8px;
        padding: 5px;
        background: #fafafa;
    }
    table.DynamicMath {
        border-spacing: 0;
    }
    body.DynamicMath, table.DynamicMath td {
        cursor: ns-resize;
    }
    table.DynamicMath td {
        text-align: center;
    }
    body.DynamicMath table.DynamicMath td {
        -moz-user-select: none;
        -webkit-user-select: none;
        user-select: none;
    }
    table.DynamicMath td.fraction > table:not(:first-child) {
        border-top: 1px #000 solid;
    }
    table.DynamicMath .pow > table {
        padding-bottom: 10px;
        visibility: visible;
        margin-left: -10px;
    }
        table.DynamicMath .pow-1 > table {margin-top: 0px;}
        table.DynamicMath .pow-2 > table {margin-top: -5px;}
        table.DynamicMath .pow-3 > table {margin-top: -10px;}

    table.DynamicMath .pow {
    	vertical-align: top;
        visibility: hidden;
        font-size: 80%;
    }

    table.DynamicMath table {
    	width: 100%;
    }
]]></>).toString());


(function($){


    $(document).bind('ready', function(){
        function update(){
            var plots = $('#plots > li');
            plots.each(function(i, plot){
                var $plot = $(plot);
                if (unsafeWindow.jQuery(plot).data('type') === 0 && !$plot.data('dynamic')){
                    $plot.dynamicMath();
                }
            });
        }
        $('#plots_add button').on('click', update);
        update();
    });

    $.fn.extend({
        dynamicMath: function($opts){
            $(this).each(function(){
                var $opts = $opts instanceof Object ? $opts : {};

                var DynamicMath = {
                    plot: this,
                    target: $('<div class="DynamicMath-container"></div>').appendTo(this),
                    settings: {
                        functionsRegexp: /^(\^|Math.E|sqrt|log|ln|exp|sin|sin|cos|tg|ctg)/gi,
                        classes: {
                            table: 'DynamicMath paren'
                        }
                    },
                    init: function(){
                        this.events.init.call(DynamicMath);
                        $(this.plot).data('dynamic', this);
                        $(this.getInput()).trigger('change');
                    },
                    getInput: function(){
                        return $('input.equation', DynamicMath.plot);
                    },
                    expressionToArray: function(expr){
                        var expr = expr.replace(/\s/g, '');
                        var $arr = [];

                        function pushChar(str, arr, parent){
                            var char = $.trim(str.substring(0,1));
                            switch (true){
                                case (char === '^' && str[1] && str[1] !== '('):	// is degree?
                                    str = str.substring(1);
                                    var degree = str.match(/^[-]?[\d.\/]+/);	// degree format without parens: (-)999.99
                                    degree = degree && degree[0];
                                    if (degree){								// degree value
                                        pushChar('^', arr, parent);
                                        str = str.replace(/^[-]?[\d.\/]+/, '(' + degree + ')');
                                        pushChar(str, arr, parent);
                                    } else {									// next operands
                                        pushChar(str.substring(1), arr, parent);
                                    }
                                    break;

                                case (char === '('):
                                    var newArr = [];
                                    arr.push(newArr);
                                    pushChar(str.substring(1), newArr, arr);
                                    break;

                                case (char === ')'):
                                    pushChar(str.substring(1), parent || $arr);
                                    break;

                                default:
                                    var func = str.match(DynamicMath.settings.functionsRegexp);
                                    switch (true){
                                        case (Boolean(func && func[0])):	// is function? (sin, cos etc.)
                                            arr.push(func[0]);
                                            str = str.substring(func[0].length - 1);
                                            break;

                                        case (/^\d|[.]$/.test(arr[arr.length - 1]) && /^\d|[.]$/.test(char)): // is long integer? (>9)
                                            arr[arr.length - 1] += char;
                                            break;

                                        case (char === '/'):	// is fraction?
                                        default:
                                            arr.push(char);
                                    }

                                    if (str.substring(1) && str.substring(1) != ')'){
                                        pushChar(str.substring(1), arr, parent)
                                    }
                            }
//                            console.log($arr)
                            return $arr;
                        }

                        pushChar(expr, $arr);

                        //            console.log({'array': $arr});
                        return $arr;
                    },
                    tableToExpression: function(table){
                        function $table(table, parens){
                            var isFraction =  table.parent().is('.fraction'),
                                $expr = '';

                            $(table).each(function(i, $table){
                                var $table = $($table);
                                if (isFraction){
                                    if (!$table.is(':first-child')){  // is denominator?
                                        $expr += '/';
                                    }
                                }
                                $expr += $tbody($table.children('tbody'));
                            });

                            parens = (parens !== false && !isFraction);

                            return (parens ? '(' : '') + $expr + (parens ? ')' : '');
                        }

                        function $tbody(tbody){
                            var rows = tbody.children('tr'),
                                $expr = '';

                            rows.each(function(i, row){
                                var $row = $(row);
                                $expr += $tr($row, false);
                            });

                            return $expr;
                        }

                        function $tr(tr){
                            return $td(tr.children('td:not(.equation)'));
                        }

                        function $td(td){
                            var expr = '';
                            td.each(function(i, cell){
                                var cell = $(cell),
                                    isParen = cell.children('table').length;

                                if (isParen){
                                    expr += $table(cell.children('table'));
                                } else {
                                    expr += ' ' + cell.html() + ' ';
                                }
                            });
                            return $.trim(expr);
                        }
                        var $expr = $.trim($table(table, false)
                            .replace(/\s\s/g,' ')
                            .replace(/-\s-/g,'+ ')
                            .replace(/\+\s\+/g,'+ ')
                            .replace(/-\s\+/g,'- ')
                            .replace(/\+\s-/g,'- ')
                            .replace(/\([\s]?\+/g,'('));

                        if ($expr.indexOf('+') === 0){
                            $expr = $.trim($expr.substring(1));
                        }
                        return $expr;
                    },
                    appendRowsToFraction: function(expressions, target){
                        if (!(expressions instanceof Array)){
                            expressions = new Array(expressions);
                        }

                        $(expressions).each(function(i, $expr){
                            var $T = $('<table></table>').appendTo(target),
                                $R = $('<tr></tr>').appendTo($T);

                            if ($expr instanceof Array && $expr.length === 1 && $expr[1] instanceof Array){
                                $expr = $expr[0];
                            }
                            DynamicMath.drawExpression($expr, $R);
                        });
                    },
                    drawExpression: function(expr, target){
                        var newParen = expr instanceof Array,
                            row, cell,
                            cellCls;

                        if (newParen){
                            switch (true){
                                case (target.is('div')):		// top level table
                                    var main_table = $('<table class="DynamicMath-main"></table>').appendTo(target),
                                        main_row = $('<tr></tr>').appendTo(main_table);

                                    $('<td class="DynamicMath-equation">y = </td>').appendTo(main_row);
                                    var target = $('<td class="DynamicMath-data-eq"></td>').appendTo(main_row);
                                    break;

                                case (target.is('tr')):			// default target
                                    target = $('<td></td>').appendTo(target);
                                    break;

                                default:						// other cases ?? (erroneus input)
                                //	                	console.log(target);
                            }

                            var table = $('<table></table>')
                                .addClass(DynamicMath.settings.classes.table)
                                .appendTo(target);

                            if (target.prev().html() === '^'){	// is current a degree value?
                                if (target.prev().hasClass('pow')){
                                    target.attr('class', target.prev().attr('class'));
                                }
                            }

                            row = $('<tr></tr>').appendTo(table);

                            $(expr).each(function(i, $expr){
                                var newRow = $expr === '/';

                                if (expr[i] === null) return;

                                if (newRow){
                                    var inFraction = !!row.children('.fraction').length;

                                    if (typeof expr[i-1] == 'string'){expr[i-1] = [expr[i-1]];}
                                    if (typeof expr[i+1] == 'string'){expr[i+1] = [expr[i+1]];}

                                    if (inFraction){				// add denominator to existent fraction (TODO: multiplicate by first denominator)
                                        var fraction = row.children('.fraction');
                                        DynamicMath.appendRowsToFraction([expr[i + 1]], fraction);

                                    } else {						// create new fraction
                                        row.children('td:last-child').remove();
                                        var fraction = $('<td class="fraction"></td>').appendTo(row);
                                        DynamicMath.appendRowsToFraction([expr[i - 1], expr[i + 1]], fraction);
                                    }

                                    expr[i + 1] = null;
                                } else {
                                    DynamicMath.drawExpression($expr, row);
                                }
                            })
                        } else {
                            cell = $('<td></td>')
                                .appendTo(target)
                                .html(expr);

                            if (expr === '+' || expr === '-'){
                                cell.addClass('sign');
                            }
                            if (/^[-]?[\d]*[.]?[\d]+$/.test(expr)){
                                cell.addClass('digits');
                            }
                            if (cell.prev().html() == '^'){
                                cell.attr('class', cell.prev().attr('class'));
                            } else if (expr == '^'){
                                var cls = cell.prev().attr('class'),
                                    match = cls && cls.match(/pow\-(\d*)/);
                                if (match && parseInt(match[1])){
                                    cell.attr('class', 'pow pow-' + (parseInt(match[1]) + 1));
                                } else {
                                    cell.attr('class', 'pow pow-1');
                                }
                            }
                        }
                    },
                    events: {
                        init: function(){
                            this.getInput().on('change.dynamicM', this.events.change);
                            unsafeWindow.jQuery(DynamicMath.plot).sortable('disable');
                            $(DynamicMath.plot).on('mousedown.dynamicM', '.DynamicMath-main', this.events.mousedown);
                            $(document).on('mouseup.dynamicM', this.events.mouseup);
                            $(document).on('mousemove.dynamicM', this.target, this.events.mousemove);
                        },
                        change: function(e){
                            if (e.namespace == 'dynamicM'){
                                return;
                            }
                            var input = $(this),
                                value = $.trim(input.val()),
                                array = DynamicMath.expressionToArray.call(DynamicMath, value);
                            DynamicMath.drawExpression(array, DynamicMath.target.empty());
                        },
                        mouseup: function(e){
                            if (!DynamicMath.events.on) return;
                            delete DynamicMath.events.on;
                            delete DynamicMath.events.element;
                            clearInterval(DynamicMath.interval);
                            $('body').removeClass('DynamicMath');
                            clearTimeout(DynamicMath.events.tTE);
                            if (!DynamicMath.events.changed) return;
                            delete DynamicMath.events.changed;
                            DynamicMath.events.tTE = setTimeout(function(){
                                var Expression = DynamicMath.tableToExpression($(DynamicMath.target).find('.DynamicMath-data-eq').children('table'));
                                DynamicMath.getInput()
                                    .val(Expression)
                                    .trigger('change.dynamicM');
                            }, 200);
                        },
                        mousedown: function(e){
                            e.stopPropagation();
                            $('body').addClass('DynamicMath');
                            DynamicMath.events.on = true;
                            DynamicMath.events.element = e.target;
                            DynamicMath.events.Y = e.clientY;
                            DynamicMath.interval = setInterval(function(e){
                                if (!DynamicMath.events.on){
                                    $(DynamicMath.target).trigger('mouseup.dynamicM');
                                    return;
                                }
                                if (DynamicMath.events.tTE){
                                    clearTimeout(DynamicMath.events.tTE);
                                    delete DynamicMath.events.tTE;
                                }

                                var delta = DynamicMath.events.Y - DynamicMath.events.$Y;
                                delta = delta > 0 ? Math.floor(delta / 25) : Math.ceil(delta / 25);
                                var el = $(DynamicMath.events.element),
                                    valueEl = el,
                                    value = el.html(),
                                    sign = 1,
                                    signEl,
                                    prev = el.prev(),
                                    $val,
                                    $sign,
                                    $type;

                                if (/[-+]$/.test(value)){
                                    $type = 'sign';

                                    if (delta > 0){
                                        $val = '+';
                                        DynamicMath.events.changed = true;
                                    } else {
                                        $val = '-';
                                        DynamicMath.events.changed = true;
                                    }
                                }

                                if (parseFloat(value) || parseInt(value) === 0){
                                    $type = 'digits';

                                    var $sign = prev.html();

                                    switch (true){
                                        case ($sign === '-'):
                                            signEl = prev;
                                            sign = -1;
                                            break;
                                        case ($sign === ''):
                                        case ($sign === '+'):
                                            signEl = prev;
                                            sign = 1;
                                            break;
                                        default:
                                            signEl = $('<td></td>').insertBefore(valueEl);
                                            sign = 1;
                                    }

                                    if (Math.abs(value) <= 1){
                                        delta = delta / 10
                                        $val = Math.abs(value) * sign + delta;
                                        $val = $val.toFixed(1);
                                    } else {
                                        $val = Math.abs(value) * sign + delta;
                                        $val = parseInt($val);
                                    }
                                    DynamicMath.events.changed = true;
                                }

                                switch ($type){
                                    case 'digits':
                                        if ($val < 0){
                                            if (signEl) signEl.html('-');
                                            valueEl.html(Math.abs($val));
                                        } else if ($val) {
                                            if (signEl) signEl.html('+')
                                            valueEl.html(Math.abs($val));
                                        } else if ($val === 0){
                                            valueEl.html(Math.abs($val));
                                        }
                                        break;
                                    case 'sign':
                                        valueEl.html($val);
                                        break;
                                }

                                DynamicMath.events.tTE = setTimeout(function(){
                                    var Expression = DynamicMath.tableToExpression($(DynamicMath.target).find('.DynamicMath-data-eq').children('table'));
                                    DynamicMath.getInput()
                                        .val(Expression)
                                        .trigger('change.dynamicM');
                                }, 200);
                            }, 500);
                        },
                        mousemove: function(e){
                            DynamicMath.events.$Y = e.clientY;
                        }
                    }
                };

                DynamicMath.init();
            });
        }
    });
})(jQuery);
