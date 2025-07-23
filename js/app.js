// 1. Declare variables (arrays) for two decks of cards.
// 2. Create HTML elements (two <div>s) for the card decks:
  // 1. Deck 1 should display the back of a card with a shadow outline, indicating a larger stack.
  // 2. Deck 2 should display an empty card outline.
// 3. Create cached element references for each of the card decks.
// 4. Add an event listener for the "Flip" button.
// 5. Write an initialization function that assigns 52 cards" to deck 1, then invoke it.
// 6. Declare a render() function to display a card after it is flipped.
// 7. Stub up a handleClick() function for the event listener to call.
  // 1. Select a random card from deck 1.
  // 2. Remove the card from deck 1.
  // 3. Add the card to deck 2.
  // 4. Call the render() function and pass the card to it.
// 8. Within the render() function (situated above handleClick()):
  // 1. After the first card is picked, remove the outline on deck 2.
  // 2. Add the class name to display the card picked on deck 2.
  // 3. When half of the cards are flipped, move the shadow from deck 1 to deck 2.
  // 4. When the final card is picked, add an outline to deck 1.

  // 1. 声明两个卡牌堆的变量（数组）。
// 2. 创建 HTML 元素（两个 <div>）来表示卡牌堆：
//    1. 卡堆1 应该显示卡背，并带有阴影轮廓，用以表示是一大叠牌。
//    2. 卡堆2 应该显示一个空的卡牌轮廓。
// 3. 创建两个卡堆元素的缓存引用。
// 4. 为“翻牌”按钮添加事件监听器。
// 5. 编写一个初始化函数，用于将52张牌分配给卡堆1，并立即调用该函数。
// 6. 声明一个 render() 函数，用于在翻牌后显示卡牌。
// 7. 编写 handleClick() 函数的初始框架，由事件监听器调用：
//    1. 从卡堆1中随机选择一张卡牌；
//    2. 将该卡牌从卡堆1中移除；
//    3. 将该卡牌加入卡堆2；
//    4. 调用 render() 函数，并将该卡牌作为参数传入。
// 8. 在 render() 函数中（位于 handleClick() 函数之上）：
//    1. 翻出第一张卡牌后，移除卡堆2的轮廓；
//    2. 为卡堆2添加类名，以显示抽出的那张卡牌；
//    3. 当抽出了一半的卡牌时，将阴影效果从卡堆1移动到卡堆2；
//    4. 当抽出最后一张牌时，为卡堆1添加一个轮廓。

// Declare variables
let deck1 = [];
let deck2 = [];
let cardToRemove;

// Cached element references
let deck1El = document.querySelector('#deck-1');
let deck2El = document.querySelector('#deck-2');
let btnEl = document.querySelector('#btn');

// Event listeners
btnEl.addEventListener('click', handleClick);

// Initialize deck 1 with array of 52 cards
const init = () => {
  deck1 = [
    "dA","dQ","dK","dJ","d10","d09","d08","d07","d06","d05","d04","d03","d02",
    "hA","hQ","hK","hJ","h10","h09","h08","h07","h06","h05","h04","h03","h02",
    "cA","cQ","cK","cJ","c10","c09","c08","c07","c06","c05","c04","c03","c02",
    "sA","sQ","sK","sJ","s10","s09","s08","s07","s06","s05","s04","s03","s02"
  ];
  deck2 = [];
  cardToRemove = null;

  // Reset UI
  deck1El.className = 'card large back-blue shadow';
  deck2El.className = 'card large outline';
  deck2El.style.backgroundImage = '';
};
init();

// Handle Flip Button Click
function handleClick() {
  if (deck1.length === 0) return;

  const randomIdx = Math.floor(Math.random() * deck1.length);
  const cardPicked = deck1.splice(randomIdx, 1)[0];
  deck2.push(cardPicked);

  render(cardPicked);
}

// Render selected card
function render(cardPicked) {
  // Step 1: remove outline on first card
  if (deck2.length === 1) {
    deck2El.classList.remove("outline");
  }

  // Step 2: remove previous card image
  if (deck2.length > 1) {
    deck2El.style.backgroundImage = '';
  }

  // Step 3: record this card for next round
  cardToRemove = cardPicked;

  // Step 4: parse suit and value
  const suitLetter = cardPicked[0];         // h/d/s/c
  let valuePart = cardPicked.slice(1);      // e.g., '08', 'A'

  const suitMap = {
    h: 'hearts',
    d: 'diamonds',
    s: 'spades',
    c: 'clubs'
  };
  const suitName = suitMap[suitLetter];

  let fileSuffix;
  if (['A', 'J', 'Q', 'K'].includes(valuePart)) {
    fileSuffix = valuePart;
  } else {
    fileSuffix = 'r' + valuePart;
  }

  const imagePath = `./images/${suitName}/${suitName}-${fileSuffix}.svg`;

  // Step 5: apply background image
  deck2El.style.backgroundImage = `url('${imagePath}')`;
  deck2El.style.backgroundSize = 'cover';
  deck2El.style.backgroundRepeat = 'no-repeat';
  deck2El.style.width = '100px';
  deck2El.style.height = '140px';

  // Step 6: visual transition
  if (deck2.length === 26) {
    deck2El.classList.add("shadow");
    deck1El.classList.remove("shadow");
  }

  if (deck1.length === 0) {
    deck1El.classList.add("outline");
    deck1El.classList.remove("back-blue");
  }
}





