const puppeteer = require("puppeteer");
const iPhone = puppeteer.devices["iPhone 6"];
const fs = require("fs");
const day = require("dayjs");

Date.prototype.getBJDate = function () {
  //获得当前运行环境时间
  var d = new Date(),
    currentDate = new Date(),
    tmpHours = currentDate.getHours();
  //算得时区
  var time_zone = -d.getTimezoneOffset() / 60;
  //少于0的是西区 西区应该用时区绝对值加京八区 重新设置时间（西区时间比东区时间早 所以加时区间隔）
  if (time_zone < 0) {
    time_zone = Math.abs(time_zone) + 8;
    currentDate.setHours(tmpHours + time_zone);
  } else {
    //大于0的是东区  东区时间直接跟京八区相减
    time_zone -= 8;
    currentDate.setHours(tmpHours - time_zone);
  }
  return currentDate;
};

const starter = async () => {
  const browser = await puppeteer.launch({ headless: true, isMobile: true, args: ['--no-sandbox', '--disable-setuid-sandbox'] });
  const page = await browser.newPage();
  await page.emulate(iPhone);
  await page.goto(
    "https://so.m.jd.com/ware/search.action?keyword=%E6%98%BE%E5%8D%A1&searchFrom=home&sf=11&as=1"
  );

  let counter = 0;

  const scroll = async () => {
    const result = await page.evaluate((x) => {
      const scrollTop = document.documentElement.scrollTop;
      document.documentElement.scrollTop = document.body.offsetHeight;
      if ($(".search_prolist_item").length > 1000) {
        return document.documentElement.scrollTop - scrollTop;
      }
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(document.documentElement.scrollTop - scrollTop);
        }, 300);
      });
    });

    if (result > 1000) {
      counter = 0;
      return await scroll();
    }
    counter++;
    if (counter > 5) {
      return result;
    } else {
      return await scroll();
    }
  };

  const result = await scroll();

  const domString = await page.evaluate(() => {
    return $.map(
      $(
        Array.prototype.filter.call(
          $(".search_prolist_tip.color_red"),
          (a) => $(a).html() === "预约"
        )
      ),
      (a) => {
        var haha = $(a).parents(".search_prolist_item");
        debugger;
        var result = $("<div />").append(haha).html();
        return result;
      }
    ).join("");
  });

  const html = fs
    .readFileSync("index.html")
    .toString()
    .replace("{content}", domString);

  fs.writeFileSync(`build/${day().format("YYYY-MM-DD HH_mm_ss")}.html`, html);
};

var CronJob = require("cron").CronJob;
new CronJob("0 */30 * * * *", starter, null, true);
starter();
