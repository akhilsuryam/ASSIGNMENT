const xlsx = require('xlsx');

const filePath = process.argv.slice(2)[0];
const workbook = xlsx.readFile("Input.xlsx");
const worksheet = workbook.Sheets[workbook.SheetNames[0]];

let posts = [];
let post = {};

for (let cell in worksheet) {
    const cellAsString = cell.toString();

    if (cellAsString[1] !== 'r' && cellAsString[1] !== 'm' && cellAsString[1] > 1) {
        if (cellAsString[0] === 'A') {
            post.title = worksheet[cell].v;
        }
        if (cellAsString[0] === 'B') {
            post.author = worksheet[cell].v;
        }
        if (cellAsString[0] === 'C') {
            post.released = worksheet[cell].v;
            posts.push(post);
            post = {};
        }
    }
}

function findProp(obj, posts) {
    var result = [];
    function recursivelyFindProp(o, keyToBeFound) {
      Object.keys(o).forEach(function (key) {
        if (typeof o[key] === 'object') {
          recursivelyFindProp(o[key], keyToBeFound);
        } else {
          if (key === keyToBeFound) result.push(o[key]);
        }
      });
    }
    recursivelyFindProp(obj, posts);
    return result;
  }
  

const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({headless: false});
  const page = await browser.newPage();
  await page.goto('https://www.snapdeal.com/');
  await page.type("#inputValEnter",String(posts[0].released))
  await page.click(".searchTextSpan")
  await page.waitForNavigation();
  await page.click(".sort-selected")
  await page.click("#content_wrapper > div.col-xs-24.reset-padding.marT22 > div.col-xs-19.reset-padding > div.comp.comp-right-wrapper.ref-freeze-reference-point.clear > div.search-result-header > div > div.sorting-sec.animBounce > ul > li:nth-child(3)")
  await page.waitForTimeout (1000);
  //let price = []
  price1 =await page.$eval("d[0].querySelector(".product-price").textContent",price1 => price1.textContent)
  console.log(price1)
  let link = []
  link1 =await page.$eval(" div.product-tuple-image > a > picture > source",link1 => link1.textContent)
  link.push(link1)
  //await page.waitForTimeout (1000);
  console.log(link)
  await page.click(".product-title")
  //author
  //author =await page.$eval("#productOverview > div.col-xs-14.right-card-zoom.reset-padding > div > div.pdp-elec-topcenter-inner.layout > div.highlightsTileContent.highlightsTileContentTop.clearfix > div > ul > li:nth-child(5) > span.h-content",author => author.textContent)
  //console.log(author)
  //publisher
  //publisher =await page.$eval("#productOverview > div.col-xs-14.right-card-zoom.reset-padding > div > div.pdp-elec-topcenter-inner.layout > div.highlightsTileContent.highlightsTileContentTop.clearfix > div > ul > li:nth-child(5) > span.h-content",author => author.textContent)
  
  //await browser.close();
 
const xlsx =  require("xlsx")

const wb =xlsx.utils.book_new();
const ws =xlsx.utils(aoa);
xlsx.utils.book_append_sheet(wb,ws);
xlsx.writeFile(wb,"input.xlsx");
})();
