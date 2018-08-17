/**
 * 使用 superagent 与 cheerio 完成简单爬虫
 *   1. 使用superagent 抓取网页； superagent(http://visionmedia.github.io/superagent/ ) 是个 http 方面的库，可以发起 get 或 post 请求
 *   2. 使用cheerio 分析网页；cheerio(https://github.com/cheeriojs/cheerio ) 大家可以理解成一个 Node.js 版的 jquery，用来从网页中以 css selector 取数据，使用方式跟 jquery 一样的。
 *
 */
var express = require("express")
var app = express();
var superagent = require("superagent")
var cheerio = require("cheerio")
app.get('/server', function (req, res, next) {
    // 用superagent去抓取https://cnodejs.org/的内容
    superagent.get('https://cnodejs.org/').end(function (err, sres) {
        // 常规错误处理
        if(err) {
            return next(err);
        }
        // sres.text 里面存储着网页的html内容，将它传给cheerio.load之后，可以得打一个实现了jQuery接口的变量，我们习惯
        // 地将他命名为‘$',剩下的就是jQuery的内容了
        var $ = cheerio.load(sres.text);
        var items =[];
        $('#topic_list .topic_title').each(function (idx, element) {
            var $element = $(element);
            items.push({
                title: $element.attr("title"),
                href: $element.attr("href")
            })
        })
        $(".cell .user_avatar img").each(function(idx, element){
            var $element = $(element);
            items[idx].avator = $element.attr("src");
        })
        res.send( items);
    })
})

app.listen(3000, function (req, res) {
    console.log('app is running at port 3000');
})


