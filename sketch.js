// 儲存所有測驗題目
let questions = [
  // 第 1 題
  {
    question: "在 p5.js 中，哪一個指令可以建立畫布？",
    options: ["createCanvas()", "background()", "ellipse()", "draw()"],
    answer: 0
  },

  // 第 2 題
  {
    question: "在 p5.js 中，哪一個指令可以設定背景顏色？",
    options: ["fill()", "stroke()", "background()", "color()"],
    answer: 2
  },

  // 第 3 題
  {
    question: "在 p5.js 中，哪一個指令可以繪製橢圓形？",
    options: ["rect()", "ellipse()", "line()", "point()"],
    answer: 1
  },

  // 第 4 題
  {
    question: "在 p5.js 中，哪一個函式會持續重複執行？",
    options: ["setup()", "start()", "loop()", "draw()"],
    answer: 3
  },

  // 第 5 題
  {
    question: "在 p5.js 中，哪一個指令可以設定圖形填色？",
    options: ["fill()", "stroke()", "background()", "noFill()"],
    answer: 0
  }
];

// 記錄目前題目編號
let currentQuestion = 0;

// 記錄答對題數
let score = 0;

// 記錄是否已經作答
let hasAnswered = false;

// 記錄使用者選擇的選項
let selectedOption = -1;

// 設定下一題按鈕變數
let nextButton;

// 設定重新開始按鈕變數
let restartButton;

// 建立畫布與按鈕
function setup() {
  // 建立符合視窗大小的畫布
  createCanvas(windowWidth, windowHeight);

  // 設定文字水平置中
  textAlign(CENTER, CENTER);

  // 設定文字垂直置中
  textFont("Arial, sans-serif");

  // 建立下一題按鈕
  nextButton = createButton("下一題");

  // 設定下一題按鈕樣式
  nextButton.style("font-size", "clamp(16px, 2.5vw, 22px)");

  // 設定下一題按鈕內距
  nextButton.style("padding", "10px 24px");

  // 設定下一題按鈕圓角
  nextButton.style("border-radius", "8px");

  // 設定下一題按鈕邊框
  nextButton.style("border", "none");

  // 設定下一題按鈕背景顏色
  nextButton.style("background-color", "#219ebc");

  // 設定下一題按鈕文字顏色
  nextButton.style("color", "#ffffff");

  // 設定滑鼠游標樣式
  nextButton.style("cursor", "pointer");

  // 設定下一題按鈕點擊事件
  nextButton.mousePressed(nextQuestion);

  // 建立重新開始按鈕
  restartButton = createButton("重新開始");

  // 設定重新開始按鈕樣式
  restartButton.style("font-size", "clamp(16px, 2.5vw, 22px)");

  // 設定重新開始按鈕內距
  restartButton.style("padding", "10px 24px");

  // 設定重新開始按鈕圓角
  restartButton.style("border-radius", "8px");

  // 設定重新開始按鈕邊框
  restartButton.style("border", "none");

  // 設定重新開始按鈕背景顏色
  restartButton.style("background-color", "#219ebc");

  // 設定重新開始按鈕文字顏色
  restartButton.style("color", "#ffffff");

  // 設定滑鼠游標樣式
  restartButton.style("cursor", "pointer");

  // 設定重新開始按鈕點擊事件
  restartButton.mousePressed(restartQuiz);

  // 一開始隱藏重新開始按鈕
  restartButton.hide();

  // 設定按鈕位置
  updateButtonPosition();
}

// 持續繪製畫面
function draw() {
  // 設定背景顏色
  background("#ffffff");

  // 判斷是否已完成所有題目
  if (currentQuestion >= questions.length) {
    // 顯示測驗結果
    showResult();

    // 結束目前繪圖流程
    return;
  }

  // 取得目前題目資料
  let questionData = questions[currentQuestion];

  // 計算適合目前螢幕的基準尺寸
  let baseSize = min(width, height);

  // 設定標題文字大小
  let titleSize = constrain(baseSize * 0.075, 24, 40);

  // 設定題目文字大小
  let questionSize = constrain(baseSize * 0.052, 18, 30);

  // 設定選項文字大小
  let optionTextSize = constrain(baseSize * 0.042, 16, 24);

  // 設定一般提示文字大小
  let hintSize = constrain(baseSize * 0.035, 14, 20);

  // 設定標題文字顏色
  fill("#023047");

  // 設定標題文字大小
  textSize(titleSize);

  // 顯示測驗標題
  text("p5.js 簡易指令測驗", width / 2, getTitleY());

  // 設定題號文字顏色
  fill("#495057");

  // 設定題號文字大小
  textSize(hintSize);

  // 顯示目前題號
  text(
    "第 " + (currentQuestion + 1) + " 題／共 " + questions.length + " 題",
    width / 2,
    getQuestionNumberY()
  );

  // 設定題目文字顏色
  fill("#333333");

  // 設定題目文字大小
  textSize(questionSize);

  // 顯示題目文字
  drawWrappedText(
    questionData.question,
    width / 2,
    getQuestionY(),
    getContentWidth(),
    questionSize * 1.4
  );

  // 取得選項尺寸資料
  let layout = getOptionLayout();

  // 逐一繪製四個選項
  for (let i = 0; i < questionData.options.length; i++) {
    // 計算目前選項的垂直位置
    let optionY = layout.startY + i * (layout.optionHeight + layout.gap);

    // 設定選項預設背景顏色
    let optionColor = "#e9ecef";

    // 判斷是否已作答
    if (hasAnswered) {
      // 如果答錯，將正確選項設定為 #fefae0
      if (
        selectedOption !== questionData.answer &&
        i === questionData.answer
      ) {
        // 設定正確答案背景顏色
        optionColor = "#fefae0";
      }

      // 判斷是否為使用者選擇的選項
      if (i === selectedOption) {
        // 判斷使用者是否答對
        if (i === questionData.answer) {
          // 將答對選項設定為淡綠色
          optionColor = "#caffbf";
        } else {
          // 將答錯選項設定為淡紅色
          optionColor = "#ffadad";
        }
      }
    }

    // 設定選項背景顏色
    fill(optionColor);

    // 設定選項外框顏色
    stroke("#6c757d");

    // 設定選項外框粗細
    strokeWeight(2);

    // 繪製圓角選項方塊
    rect(layout.x, optionY, layout.optionWidth, layout.optionHeight, 12);

    // 設定選項文字顏色
    fill("#212529");

    // 設定選項文字大小
    textSize(optionTextSize);

    // 顯示選項文字
    drawWrappedText(
      String.fromCharCode(65 + i) + ". " + questionData.options[i],
      width / 2,
      optionY + layout.optionHeight / 2,
      layout.optionWidth - 30,
      optionTextSize * 1.25
    );
  }

  // 設定提示文字顏色
  fill("#495057");

  // 設定提示文字大小
  textSize(hintSize);

  // 計算提示文字位置
  let hintY = min(
    height - 85,
    layout.startY +
      questionData.options.length * (layout.optionHeight + layout.gap) +
      20
  );

  // 判斷是否已作答
  if (hasAnswered) {
    // 判斷是否答對
    if (selectedOption === questionData.answer) {
      // 顯示答對訊息
      text("答對了！", width / 2, hintY);
    } else {
      // 顯示答錯訊息
      text("答錯了！正確答案已標示為 #fefae0。", width / 2, hintY);
    }

    // 顯示下一題按鈕
    nextButton.show();
  } else {
    // 顯示操作提示
    text("請點選一個選項作答", width / 2, hintY);

    // 隱藏下一題按鈕
    nextButton.hide();
  }

  // 隱藏重新開始按鈕
  restartButton.hide();

  // 更新按鈕位置
  updateButtonPosition();
}

// 處理滑鼠點擊
function mousePressed() {
  // 如果測驗已完成，不處理選項點擊
  if (currentQuestion >= questions.length) {
    return;
  }

  // 如果已經作答，不允許再次選擇
  if (hasAnswered) {
    return;
  }

  // 取得目前題目資料
  let questionData = questions[currentQuestion];

  // 取得選項版面資料
  let layout = getOptionLayout();

  // 逐一檢查所有選項
  for (let i = 0; i < questionData.options.length; i++) {
    // 計算目前選項的垂直位置
    let optionY = layout.startY + i * (layout.optionHeight + layout.gap);

    // 判斷滑鼠是否點擊目前選項
    if (
      mouseX >= layout.x &&
      mouseX <= layout.x + layout.optionWidth &&
      mouseY >= optionY &&
      mouseY <= optionY + layout.optionHeight
    ) {
      // 記錄使用者選擇的選項
      selectedOption = i;

      // 設定為已作答
      hasAnswered = true;

      // 判斷是否答對
      if (selectedOption === questionData.answer) {
        // 答對題數加一
        score++;
      }

      // 結束選項檢查
      break;
    }
  }
}

// 前往下一題
function nextQuestion() {
  // 如果尚未作答，不執行下一題
  if (!hasAnswered) {
    return;
  }

  // 題目編號加一
  currentQuestion++;

  // 重設作答狀態
  hasAnswered = false;

  // 重設選項選擇結果
  selectedOption = -1;

  // 判斷是否已完成所有題目
  if (currentQuestion >= questions.length) {
    // 隱藏下一題按鈕
    nextButton.hide();

    // 顯示重新開始按鈕
    restartButton.show();
  }

  // 更新按鈕位置
  updateButtonPosition();
}

// 重新開始測驗
function restartQuiz() {
  // 將目前題目重設為第一題
  currentQuestion = 0;

  // 將分數重設為零
  score = 0;

  // 重設作答狀態
  hasAnswered = false;

  // 重設選項選擇結果
  selectedOption = -1;

  // 隱藏重新開始按鈕
  restartButton.hide();

  // 更新按鈕位置
  updateButtonPosition();
}

// 顯示測驗結果
function showResult() {
  // 計算響應式文字大小
  let baseSize = min(width, height);

  // 設定結果標題文字大小
  let resultTitleSize = constrain(baseSize * 0.085, 28, 46);

  // 設定結果分數文字大小
  let resultScoreSize = constrain(baseSize * 0.065, 22, 36);

  // 設定一般文字大小
  let resultHintSize = constrain(baseSize * 0.042, 16, 24);

  // 設定結果標題顏色
  fill("#023047");

  // 設定結果標題文字大小
  textSize(resultTitleSize);

  // 顯示測驗完成文字
  text("測驗完成！", width / 2, height / 2 - 100);

  // 設定分數文字顏色
  fill("#333333");

  // 設定分數文字大小
  textSize(resultScoreSize);

  // 顯示答對題數
  text(
    "你答對了 " + score + "／" + questions.length + " 題",
    width / 2,
    height / 2 - 30
  );

  // 設定提示文字大小
  textSize(resultHintSize);

  // 顯示重新開始提示
  text("點選下方按鈕重新挑戰！", width / 2, height / 2 + 30);

  // 顯示重新開始按鈕
  restartButton.show();

  // 隱藏下一題按鈕
  nextButton.hide();

  // 更新按鈕位置
  updateButtonPosition();
}

// 計算內容最大寬度
function getContentWidth() {
  // 使用視窗寬度的 90%，並限制最大寬度
  return min(width * 0.9, 800);
}

// 取得標題垂直位置
function getTitleY() {
  // 依照視窗高度計算標題位置
  return constrain(height * 0.1, 35, 75);
}

// 取得題號垂直位置
function getQuestionNumberY() {
  // 依照視窗高度計算題號位置
  return getTitleY() + constrain(height * 0.07, 35, 55);
}

// 取得題目垂直位置
function getQuestionY() {
  // 依照視窗高度計算題目位置
  return getQuestionNumberY() + constrain(height * 0.09, 55, 85);
}

// 計算選項版面配置
function getOptionLayout() {
  // 計算選項寬度
  let optionWidth = min(width * 0.9, 760);

  // 計算選項高度
  let optionHeight = constrain(height * 0.075, 48, 68);

  // 計算選項間距
  let gap = constrain(height * 0.02, 8, 18);

  // 計算題目區域下方的位置
  let startY = getQuestionY() + constrain(height * 0.1, 55, 90);

  // 回傳選項版面資料
  return {
    x: (width - optionWidth) / 2,
    startY: startY,
    optionWidth: optionWidth,
    optionHeight: optionHeight,
    gap: gap
  };
}

// 繪製可自動換行的文字
function drawWrappedText(content, x, y, maxWidth, lineHeight) {
  // 將文字切分成單字陣列
  let words = content.split("");

  // 建立目前行文字
  let line = "";

  // 建立所有文字行陣列
  let lines = [];

  // 逐一處理每個字元
  for (let i = 0; i < words.length; i++) {
    // 暫存加入下一個字元後的文字
    let testLine = line + words[i];

    // 判斷文字是否超過最大寬度
    if (textWidth(testLine) > maxWidth && line.length > 0) {
      // 將目前文字行加入陣列
      lines.push(line);

      // 重新建立下一行文字
      line = words[i];
    } else {
      // 將字元加入目前文字行
      line = testLine;
    }
  }

  // 將最後一行文字加入陣列
  lines.push(line);

  // 計算全部文字的總高度
  let totalHeight = lines.length * lineHeight;

  // 計算第一行文字的垂直位置
  let firstY = y - totalHeight / 2 + lineHeight / 2;

  // 逐行繪製文字
  for (let i = 0; i < lines.length; i++) {
    // 顯示目前文字行
    text(lines[i], x, firstY + i * lineHeight);
  }
}

// 更新 HTML 按鈕位置與大小
function updateButtonPosition() {
  // 計算按鈕寬度
  let buttonWidth = constrain(width * 0.32, 110, 170);

  // 計算按鈕高度
  let buttonHeight = constrain(height * 0.06, 42, 56);

  // 計算按鈕水平位置
  let buttonX = (width - buttonWidth) / 2;

  // 計算按鈕垂直位置
  let buttonY = height - buttonHeight - 18;

  // 設定下一題按鈕位置
  nextButton.position(buttonX, buttonY);

  // 設定下一題按鈕大小
  nextButton.size(buttonWidth, buttonHeight);

  // 設定重新開始按鈕位置
  restartButton.position(buttonX, buttonY);

  // 設定重新開始按鈕大小
  restartButton.size(buttonWidth, buttonHeight);
}

// 當視窗大小改變時執行
function windowResized() {
  // 重新調整畫布大小
  resizeCanvas(windowWidth, windowHeight);

  // 更新按鈕位置
  updateButtonPosition();
}