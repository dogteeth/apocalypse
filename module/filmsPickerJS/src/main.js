/*

功能：押了tag button，則秀出符合tag的商品。
可複選。tag button 押一下為"選取"，再押一下，為"取消選取"。

function的建立
1. tag button欄的功能
-> 押了選取，再押一下為取消選取。每次押，都更新tags array。
-> "清除"button, 押了則將 tags array全數清空。

2. refresh商品的功能
-> 依 tags array內的tag 取得相關商品並秀在網頁上。

*/

import { data } from './data.js';

let chooseNumbers = [];

// 更新Array資料
function refreshNumbersArray(Int) {
  const addNum = Int;
  const chooseNumberIndex = chooseNumbers.indexOf(addNum);
  if (chooseNumberIndex > -1) {
    // 號碼己在array裹，刪除array
    console.log('number is in the array, number is deleted');
    chooseNumbers.splice(chooseNumberIndex, 1);
    console.log(chooseNumbers);
  } else {
    // 號碼沒有在array裹，加入array
    console.log('number is not in the array, number is added');

    chooseNumbers.unshift(addNum);
    console.log(chooseNumbers);
  }
  refreshContent();
}

// 根據Array內的資料，更新商品資料
function refreshContent() {
  const content = document.querySelector('.mainContent');
  content.innerHTML = '';
  if (chooseNumbers.length > 0) {
    chooseNumbers.forEach(function (number) {
      const newDiv = document.createElement('div');
      newDiv.className = 'imgContainer';
      const posterLink = data[number].imageLink;
      newDiv.innerHTML = `<img src="` + posterLink + `">`;
      const node = document.querySelector('.mainContent');
      node.prepend(newDiv);
    });
  }
}

// 清空Array所有資料，並將buttons的class恢復原始。
function clearAll() {
  while (chooseNumbers.length > 0) {
    chooseNumbers.pop();
  }
  const buttons = document.querySelectorAll('.chooseBTN');
  buttons.forEach(function (button) {
    if (button.classList.contains('buttonSelected')) {
      button.classList.remove('buttonSelected');
      console.log('all is clear:');
    }
  });
  refreshContent();
  console.log(chooseNumbers);
}

// 監聽User點擊動作，點擊將條件加入Array，重覆點擊將條件移出Array
const buttons = document.querySelectorAll('.chooseBTN');
buttons.forEach(function (button) {
  button.addEventListener('click', function () {
    const clickNumber = parseInt(button.dataset.number);
    console.log('you click: ' + clickNumber);
    button.classList.toggle('buttonSelected');
    refreshNumbersArray(clickNumber);
  });
});

// 監聽User點擊動作，點擊後，清除Array內所有資料。
const clearButton = document.querySelector('.clearButton');
clearButton.addEventListener('click', function () {
  clearAll();
});
