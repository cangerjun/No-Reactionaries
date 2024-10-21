// ==UserScript==
// @name         屏蔽GitHub上反动内容的仓库
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  由于直播时查看github搜索正常内容时出现反动内容而被封直播间，特此屏蔽GitHub上反动内容的仓库。
// @author       cangerjun
// @match        https://github.com/*
// @grant        none
// @icon         https://github.com/fluidicon.png
// ==/UserScript==

(function() {
    'use strict';

    // 初始化关键词列表
    let keywords = JSON.parse(localStorage.getItem('blockedKeywords')) || [
        "cirosantilli",
        "cheezcharmer",
        "pxvr-official",
        "zaohmeing",
        "zhaohmng-outlook-com",
        "Daravai1234",
        "codin-stuffs",
        "Ifem2BXvz4N4gh1gGn0bkR3Lp",
        "gege-circle",//以上是那些用户名
        "反中",
        "警察",
        "政治",
        "习万岁",
        "中华人民共和国",
        "邓小平",
        "中共",
        "PCL",//最重要的一个
    ];

    // 创建正则表达式用于匹配关键词
    const keywordRegex = new RegExp(keywords.join('|'), 'i');

    // 查找并隐藏包含关键词span的div元素
    function hideDivsWithKeywordInSpan() {
        const targetDivs = document.querySelectorAll('.Box-sc-g0xbh4-0.cSURfY');
        targetDivs.forEach(targetDiv => {
            const spans = targetDiv.querySelectorAll('span');
            for (let span of spans) {
                if (keywordRegex.test(span.textContent)) {
                    targetDiv.style.display = 'none';
                    break; // 如果找到一个符合条件的span，就隐藏整个div，并跳出循环
                }
            }
        });
    }

    // 监听DOM变化
    const observer = new MutationObserver(() => {
        hideDivsWithKeywordInSpan();
    });
    observer.observe(document.body, { childList: true, subtree: true });

    // 立即执行一次
    hideDivsWithKeywordInSpan();
})();
