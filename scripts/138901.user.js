// ==UserScript==
// @name          Yet Another #自古CB出评论 sharing plugin
// @namespace     http://gplus.me/JaHIY
// @description   一键分享 cnBeta 新闻的评论
// @match         http://cnbeta.com/articles/*
// @match         http://www.cnbeta.com/articles/*
// @version       1.1.8
// @downloadURL   https://userscripts.org/scripts/source/138901.user.js
// @updateURL     https://userscripts.org/scripts/source/138901.meta.js
// ==/UserScript==

"use strict";

if (typeof GM_getValue !== "function") {
    var GM_getValue = function(key, default_value) {
        return default_value;
    };
}

var cBshare = function ($comments, $where_to_add_links_callback) {
    var $doc = document,
        $template_link = $doc.createElement("a"),
        $template_text = $doc.createElement("span"),
        $template_newline = $doc.createElement("br"),
        $post_title = $doc.getElementById("news_title").textContent.trim(),
        $post_url = window.location.href;
    $template_link.rel = "external nofollow noreferer";
    $template_link.className = "cbshare commt_a_link";
    return {
        "link_start": function () {
            var comments = $comments,
                where_to_add_links_callback = $where_to_add_links_callback,
                doc = $doc,
                i = comments.length,
                template = cBshare.generate_template(),
                generate_content = function (comment_node) {
                    var content_dict = {
                            "comment": comment_node.textContent.trim(),
                            "title": $post_title,
                            "url": $post_url
                        },
                        content = template.replace(/\{%(title|comment|url)%\}/g, function (match, p1, offset, string) {
                            return content_dict[p1];
                        });
                    return content;
                },
                generate_links = function (template) {
                    var fragment, temp_link, temp_text, temp_newline, parent_node,
                        template_single = template.replace(/\{%tag%\}/g, "#自古CB出评论"),
                        template_double = template.replace(/\{%tag%\}/g, "#自古CB出评论#"),
                        fragments = [
                            [
                                encodeURI('http://widget.renren.com/dialog/forward?content=') + encodeURIComponent(template_double),
                                "rentag",
                                "以 #自古CB出评论# 发表至人人",
                                "#人"
                            ], [
                                encodeURI('https://twitter.com/intent/tweet?text=') + encodeURIComponent(template_single),
                                "twitag",
                                "以 #自古CB出评论 发表至推特",
                                "#推"
                            ], [
                                encodeURI('http://service.weibo.com/share/share.php?title=') + encodeURIComponent(template_double),
                                "weitag",
                                "以 #自古CB出评论# 发表至微博",
                                "#微"
                            ]
                        ],
                        i = fragments.length,
                        template_link = $template_link,
                        template_text = $template_text,
                        template_newline = $template_newline,
                        df = doc.createDocumentFragment();
                    parent_node = template_text.cloneNode(true);
                    parent_node.className = "cbshare_bar";
                    temp_newline = template_newline.cloneNode(true);
                    parent_node.appendChild(temp_newline);
                    do {
                        i -= 1;
                        fragment = fragments[i];
                        temp_link = template_link.cloneNode(true);
                        temp_text = template_text.cloneNode(true);
                        temp_link.href = fragment[0];
                        temp_link.classList.add(fragment[1]);
                        temp_link.title = fragment[2];
                        temp_text.textContent = fragment[3];
                        temp_link.appendChild(temp_text);
                        parent_node.appendChild(temp_link);
                    } while (i !== 0);
                    df.appendChild(parent_node);
                    return df;
                },
                comment;
            if (i === 0) {
                console.warn("Cannot get comments! (Maybe this page has no comment.)");
            } else {
                do {
                    i -= 1;
                    comment = comments[i];
                    where_to_add_links_callback(comment).appendChild(generate_links(generate_content(comment)));
                } while (i !== 0);
            }
            return this;
        }
    };
};

cBshare.external_links = function () {
    var open_links_in_new_window = function (event) {
            var target = event.target.parentNode;
            if (target.classList.contains("cbshare")) {
                event.preventDefault();
                event.stopPropagation();
                window.open(target.href, "_blank");
            }
        };
    document.getElementsByClassName("main_content")[0].addEventListener("click", open_links_in_new_window, false);
    return this;
};

cBshare.append_style = (function () {
    var doc = document,
        style = doc.createElement("style");
        style.textContent = "a.weitag:link span,a.weitag:hover span{color:#EB192D;}\
            a.twitag:link span,a.twitag:hover span{color:#00C8FA;}\
            a.rentag:link span,a.rentag:hover span{color:#005EAC;}";
    return function () {
        try {
            doc.head.appendChild(style);
        } catch (err) {
            console.error("Cannot append style to <head>!");
        } finally {
            return this;
        }
    };
}());

cBshare.template = "{%comment%} ——「{%title%}」 {%url%} {%tag%}";

cBshare.generate_template = function () {
    return GM_getValue("template", this.template);
};

cBshare.create_observer = function (where_to_get_comments_callback, where_to_add_links_callback) {
    return new (window.MutationObserver || window.WebKitMutationObserver)(function (mutationRecord, observer) {
        mutationRecord.forEach(function (mutation) {
            var n = mutation.addedNodes,
                i = n.length;
            do {
                i -= 1;
                n[i].nodeType === Node.ELEMENT_NODE && cBshare(where_to_get_comments_callback(n[i]), where_to_add_links_callback).link_start();
            } while (i !== 0);
        });
    });
};

cBshare.append_style().external_links();

var commt_list_observer = cBshare.create_observer(function (e) {
        return e.getElementsByClassName("re_text");
    }, function (e) {
        return e.nextElementSibling;
    }),
    hotcommt_list_observer = cBshare.create_observer(function (e) {
        return e.querySelectorAll(".comContent em");
    }, function (e) {
        return e.parentNode.parentNode.nextElementSibling.firstElementChild;
    });
commt_list_observer.observe(document.getElementById("J_commt_list"), {"childList": true});
hotcommt_list_observer.observe(document.getElementById("J_hotcommt_list"), {"childList": true});

if (typeof GM_registerMenuCommand === "function") {
    GM_registerMenuCommand("「#自古CB出评论」模板设置", function () {
        var template, template_input, temp_link, cbshare_links, i;
        template = cBshare.generate_template();
        template_input = prompt("「#自古CB出评论」模板设置\n\n可用变量：\n{%title%} - 文章标题；\n{%url%} - 文章链接；\n{%comment%} - 评论正文；\n{%tag%} - 奇怪的标签；\n\n默认值：" + cBshare.template + "\n\n", template);
        if (template_input !== null && template !== template_input) {
            GM_setValue("template", template_input);
            cbshare_links = document.getElementsByClassName("main_content")[0].getElementsByClassName("cbshare_bar");
            i = cbshare_links.length;
            while (i !== 0) {
                i -= 1;
                temp_link = cbshare_links[i];
                temp_link.parentNode.removeChild(temp_link);
            }
            cBshare(document.getElementById("J_commt_list").getElementsByClassName("re_text"), function (e) {
                return e.nextElementSibling;
            }).link_start();
            cBshare(document.querySelectorAll("#J_hotcommt_list .comContent em"), function (e) {
                return e.parentNode.parentNode.nextElementSibling.firstChild;
            }).link_start();
        }
    });
}