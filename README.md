# 京东抢购显卡预约爬虫

> 因为每天都要抢显卡, 花费 1 小时研究京东接口发现过于繁琐, 最后决定基于 puppeteer 花费 1 小时完成快速爬取内容并生成商品列表与 BP 链接

## 脚本的目的

其实这个仓库是和另外一个抢购脚本一起使用的, 解决抢购脚本每次要手动录入的麻烦操作.
故在 `build` 文件夹下生成了一个 JSONP 文件用于自动更新抢购脚本的列表.

## 使用

> 没想到真的有人用, 本想着只是存个档, 下面是使用方式:

```bash
git clone https://github.com/jf3096/jd-puppeteer-yuyue.git --depth=1
cd jd-puppeteer-yuyue
npm install (推荐 npm, 因为我配置了 .npmrc)

# 这个是执行爬虫的主程序
node index

# 另外开一个 terminal, 这个起一个 server, 用于 build 文件夹的访问
npm run test:server

# 此时, 首次会执行 puppeteer 进行页面数据爬取
# 页面爬取结果会生成到 build 文件夹下
# 目前每半小时自动执行 puppeteer 进行爬取 (因为快速编码, 所以没想过给其他人用, 所以就写死了半小时)
```

## 部署地址

目前暂时部署到 http://47.106.129.69:8080 使用, 2021年4月8日服务器过期后将无法使用 <br />
**须知: 网页中点击图片进入 BP 页面 (请用微信打开), 点击文案部分进入商品详情**

## DEMO

http://47.106.129.69:8080

## 爬取截图

![demo](demo.png)
