// 引入依赖
var express = require("express");
var utility = require("utility");

// 创建express实例,express()返回的为一个实例
var app = express();

app.get('/server', function (req, res) {
    // 从req.query中取出我们的参数
    // 如果是post传来的body数据，则是在req.body中获取，不过express默认不处理body中的信息，需要引入需要引入 https://github.com/expressjs/body-parser 这个中间件才会处理。
    var q = req.query.q;
    // 给获取的q进行加密，utility.md5(给字符串加密)
    // 调用 utility.md5 方法，得到 md5 之后的值
    // utility 的 github 地址：https://github.com/node-modules/utility
    // 里面定义了很多常用且比较杂的辅助方法，可以去看看
    console.log(utility.md5('你'));
    var md5value = utility.md5(q);
    res.send(md5value)
})

app.listen(3000, function (req, res) {
    console.log('app is running at port 3000');
})