# 京东抢购显卡预约爬虫

> 因为每天都要抢显卡, 花费 1 小时研究京东接口发现过于繁琐, 最后决定基于 puppeteer 花费 1 小时完成快速爬取内容并生成商品列表与 BP 链接

## 使用

> 没想到真的有人用, 本想着只是存个档, 下面是使用方式:

```bash
git clone https://github.com/jf3096/jd-puppeteer-yuyue.git --depth=1
cd jd-puppeteer-yuyue
# yarn 也可以 (需要 nodejs 环境)
npm install

npm run test:server

# 此时, 首次会执行 puppeteer 进行页面数据爬取
# 页面爬取结果会生成到 build 文件夹下
```

## DEMO

http://47.106.129.69:8080

## 爬取截图

![demo](demo.png)
