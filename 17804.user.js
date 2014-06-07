// ==UserScript==
// @name           Travian NPC helper
// @version        0.84
// @date           2008-02-02
// @author         George (george DOT pop AT gmail DOT com)
// @namespace      gp
// @description    Shows total resource units needed for upgrade, offers direct link to NPC merchant, auto-fills NPC form.
// @include        http://s*.travian.*/build.php*
// @exclude        http://s*.travian.*/build.php?id=*&s=*
// ==/UserScript==

GM_addStyle('.gp-container { margin: 3px 0 0; font-size: 10px }');
GM_addStyle('.gp-red { color: #dd0000 }');
GM_addStyle('.gp-green { color: #009900 }');
GM_addStyle('.gp-highlight { background-color: #ffffcc }');

var url = window.location.pathname + window.location.search;
var npc_res_param = 'gpnpc';
var npc_name_param = 'gpbn';
var npc_url = get_npc_url();

if (exclude_page(url)) return;
if (is_npc_page())
{
    fill_out_npc_form(url);
    persist_building_name();
}
else if (is_post_npc_page())
{
    insert_npc_back_link();
}

window.addEventListener('load', update, true);


function exclude_page(url)
{
    if (is_npc_page()) return false;
    return (url.match(/^\/build\.php\?id=\d+\&t=\d+/) != null);
}

function get_npc_url()
{
    var url = '/build.php?gid=17&t=3';
    return url;
}

function is_npc_page()
{
    var xp = xpathEvaluate('//tr[@class="rbg"]/td[@colspan="5"]');
    return (xp.snapshotLength == 1 && document.getElementsByName('m2[]').length == 4);
}

function is_post_npc_page()
{
    var xp = xpathEvaluate('//p[@class="txt_menue"]/following-sibling::*/img[@class="res"]');
    return (xp.snapshotLength == 8);
}

function is_troops_page()
{
    var xp = xpathEvaluate('//tr[@class="cbg1"]');
    return (xp.snapshotLength && document.getElementsByName('s1').length > 0);
}

function fill_out_npc_form(url)
{
    if (url.indexOf('&' + npc_res_param) != npc_url.length) return false;
    var needed = get_query_param(url, npc_res_param).split(',');
    var inputs = document.getElementsByName('m2[]');
    for (var i = 0; i < 4; i++)
    {
        inputs[i].value = needed[i];
    }
    unsafeWindow.calculateRest();
}

function get_building_names()
{
    var names = new Array();
    var xp = xpathEvaluate('//h2');
    if (xp.snapshotLength == 0)
        xp = xpathEvaluate('//h1/b');
    for (var i = 0; i < xp.snapshotLength; i++)
    {
        names.push(xp.snapshotItem(i).innerHTML);
    }
    return names;
}

function persist_building_name()
{
    var name = get_query_param(url, npc_name_param);
    if (name != undefined)
    {
        var xp = xpathEvaluate('//form[@name="snd"]');
        xp.snapshotItem(0).action = add_query_param(xp.snapshotItem(0).action, npc_name_param, name);
    }
}

function insert_npc_back_link()
{
    var bname = get_query_param(url, npc_name_param);
    if (!bname) return;
    var div = document.getElementById('lmid2');
    div.innerHTML += '<p><a href="#" onclick="window.history.go(-2)"> &laquo; ' + bname + '</a></p>';
}

function get_multiplier_fields()
{
    var xp = xpathEvaluate('//table[@class="tbg"]/tbody/tr/td/input[starts-with(@name, "t")]');
    if (!xp.snapshotLength) return;
    var fields = new Array();
    for (var i = 0; i < xp.snapshotLength; i++)
    {
        fields.push(xp.snapshotItem(i));
    }
    return fields;
}

function get_multipliers(fields)
{
    if (fields == undefined) return;
    var inputs = new Array();
    for (var i = 0; i < fields.length; i++)
    {
        var f = fields[i].value;
        inputs.push(f.length == 0 || isNaN(f) ? 0 : parseInt(f));
    }
    return inputs;
}

function get_max_multiplier()
{
    var xp = xpathEvaluate('//table[@class="f10"]/tbody/tr/td/b[1]');
    if (xp.snapshotLength == 0 || xp.snapshotItem(0).innerHTML.match(/\s*\d+\s*/) == null) return;
    var abs_max = parseInt(xp.snapshotItem(0).innerHTML);

    var m_fields = get_multiplier_fields();
    if (m_fields == undefined || m_fields.length != 1) return;
    xp = xpathEvaluate('//td[@class="s7"]/div/span[@class="c f75"]');
    if (xp.snapshotLength != 1) return;
    var re_m = xp.snapshotItem(0).innerHTML.match(/\s*\(.+: \d+\)/);
    if (re_m == null) return;
    var total_available = parseInt(xp.snapshotItem(0).innerHTML.replace(/[^\d]/g, ''));

    var total_in_progress = 0;
    xp = xpathEvaluate('//table[@class="tbg"][2]/tbody/tr/td[2]');
    for (var i = 0; i < xp.snapshotLength; i++)
    {
        var n = xp.snapshotItem(i).innerHTML.replace(/[^\d]/g, '');
        if (n.length && !isNaN(n)) total_in_progress += parseInt(n);
    }

    return abs_max - total_available - total_in_progress;
}

function get_available_resources()
{
    var resources = new Array();
    for (var i = 4; i > 0; i--)
    {
        var td = document.getElementById('l' + i);
        var parts = td.innerHTML.split('/');
        resources.push(parseInt(parts[0]));
    }
    return resources;
}

function get_hourly_production()
{
    var prod = new Array();
    for (var i = 4; i > 0; i--)
    {
        var td = document.getElementById('l' + i);
        prod.push(parseInt(td.title));
    }
    return prod;
}

function update()
{
    update_totals(1, '//table[@class="f10"]/tbody/tr[1]/td');
    var multipliers = null;
    if (is_troops_page())
        multipliers = get_multipliers(get_multiplier_fields());
    update_totals(2, '//table[@class="tbg"]/tbody/tr/td/table[@class="f10"]/tbody/tr[2]/td', multipliers);

    // Update deficit/surplus as available resources change
    window.setTimeout(update, 1000);
}

function update_totals(set, xp, multipliers)
{
    var available_res = get_available_resources();
    var total_have = 0;
    for (var i = 0; i < 4; i++)
        total_have += available_res[i];
    var hourly_production = get_hourly_production();
    var total_hourly_production = 0;
    for (var i = 0; i < 4; i++)
        total_hourly_production += hourly_production[i];
    var building_names = get_building_names();
    var multiplier_fields = get_multiplier_fields();

    // Needed resources
    var xp_need = xpathEvaluate(xp);
    if (xp_need.snapshotLength == 0) return;
    var multiplier_limit = get_max_multiplier();
    for (var i = 0; i < xp_need.snapshotLength; i++)
    {
        var td = xp_need.snapshotItem(i);
        var re_m = td.innerHTML.match(/\<img class="res"[^>]+\>\s*\d+/g);
        if (re_m == null || re_m.length < 4) continue;
        re_m = re_m.slice(0, 4);

        // Read needed resources and calculate total
        var needed_res = new Array();
        var total_need_per_unit = 0;
        for (var j = 0; j < 4; j++)
        {
            var re_m2 = re_m[j].match(/\d+$/);
            var n = parseInt(re_m2);
            needed_res.push(multipliers ? n * multipliers[i] : n);
            total_need_per_unit += n;
        }
        var total_need = multipliers ? total_need_per_unit * multipliers[i] : total_need_per_unit;

        // Get or create HTML container
        var container_id = 'gpnpc_' + set + '_' + i;
        var container = undefined;
        while ((container = document.getElementById(container_id)) == null)
        {
            td.innerHTML += '<br><div id="' + container_id + '" class="gp-container"> </div>';
        }

        // Show total & deficit/surplus
        var r = total_have - total_need;
        var r_s = '(' + r + ')';
        if (r < 0)
        {
            r_s = '<span class="gp-red">(' + r + ')</span>';
        }
        else if (r > 0)
        {
            r_s = '<span class="gp-green">(+' + r + ')</span>';
        }
        container.innerHTML = '<b>Total</b>: ' + total_need + ' ' + r_s;

        // Show time estimate
        var dt_now = new Date();
        var dt_est = new Date();
        if (total_need > 0 && r < 0)
        {
            var sec_est = Math.ceil(Math.abs(r) / (total_hourly_production / 3600));
            dt_est.setTime(dt_now.getTime() + (sec_est * 1000));
            var d_est_s = 
                (dt_est.getDate() < 10 ? '0' + dt_est.getDate() : dt_est.getDate()) + '.' +
                (dt_est.getMonth() < 9 ? '0' + (dt_est.getMonth() + 1) : (dt_est.getMonth() + 1)) +
                (dt_now.getFullYear() < dt_est.getFullYear() ? dt_est.getYear() : '');
            if (dt_est.getDate() == dt_now.getDate() && dt_est.getMonth() == dt_now.getMonth())
                d_est_s = '<span class="gp-highlight">' + d_est_s + '</span>';
            var t_est_s =
                (dt_est.getHours() < 10 ? '0' + dt_est.getHours() : dt_est.getHours()) + ':' +
                (dt_est.getMinutes() < 10 ? '0' + dt_est.getMinutes() : dt_est.getMinutes());
            container.innerHTML += ' / <span class="gp-green">@</span> ' + d_est_s + ', ' + t_est_s;
        }

        // Show time saved by NPC
        var time_saved = 0;
        if (total_need > 0)
        {
            for (var j = 0; j < 4; j++)
            {
                var prod_per_minute = hourly_production[j] / 60;
                var min_until_npc = (dt_est.getTime() - dt_now.getTime()) / 1000 / 60;
                var available_at_npc_time = available_res[j] + (min_until_npc * prod_per_minute);
                var deficit_at_npc_time = needed_res[j] - available_at_npc_time;
                if (deficit_at_npc_time <= 0) continue;
                if (prod_per_minute <= 0)
                {
                    time_saved = null;
                    break;
                }
                var delta = Math.ceil(deficit_at_npc_time / prod_per_minute);
                if (delta > time_saved)
                    time_saved = delta;
            }
        }
        if (time_saved == null)
        {
            container.innerHTML += ' / &#8734;';
        }
        else if (time_saved > 0)
        {
            var delta_h = Math.floor(time_saved / 60);
            var delta_m = time_saved % 60;
            var delta_str = '-' + delta_h + 'h' + delta_m + 'm';
            if (delta_h < 1)
                delta_str = '<span class="gp-red">' + delta_str + '</span>';
            container.innerHTML += ' / ' + delta_str;
        }

        // Show max.
        if (multipliers)
        {
            var max = Math.floor(total_have / total_need_per_unit);
            if (max > multiplier_limit) max = multiplier_limit;
            container.innerHTML += ' / max. <a href="#" onclick="document.snd.' + multiplier_fields[i].name + '.value=' + max + '; return false;">' + max + '</a>';
        }

        // Show NPC link
        if (total_need > 0 && r >= 0 && (time_saved > 0 || time_saved == null))
        {
            var npc_url_i = add_query_param(npc_url, npc_res_param, needed_res.join(','));
            npc_url_i = add_query_param(npc_url_i, npc_name_param, (building_names.length > 1 ? building_names[i] : building_names[0]));
            container.innerHTML += '&nbsp;<a href="' + npc_url_i + '"> &raquo; NPC</a>';
        }
    }
}

function parse_url(url)
{
    var url_parts = url.split('?', 2);
    if (url_parts.length == 1) url_parts[1] = '';
    var parts = {path: url_parts[0], query: url_parts[1]};
    return parts;
}

function get_query_param(url, param)
{
    var pairs = parse_url(url).query.split('&');
    for (var i = 0; i < pairs.length; i++)
    {
        var ki = pairs[i].split('=');
        if (ki[0] == param) return decodeURIComponent(ki[1]);
    }
}

function add_query_param(url, param, value)
{
    var add_pair = param + '=' + encodeURIComponent(value);
    var added = false;
    var url_parts = parse_url(url);
    var pairs = url_parts.query.split('&');
    for (var i = 0; i < pairs.length; i++)
    {
        var ki = pairs[i].split('=');
        if (ki[0] == param)
        {
            pairs[i] = add_pair;
            added = true;
            break;
        }
    }
    if (!added) pairs.push(add_pair);
    return url_parts.path + '?' + pairs.join('&');
}

/**
* xpathEvaluate Finds nodes in the HTML DOM using XPath expression.
* @param {String} xpathExpr XPath expression to be evaluated and found in the document.
* @return Node iterator with the nodes that obey the XPath expression. 
*/
function xpathEvaluate(xpathExpr) {
	return document.evaluate(xpathExpr, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );
}
