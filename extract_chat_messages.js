const puppeteer = require('puppeteer');

(async () => {
  // Launch a headless Chrome instance
  const browser = await puppeteer.launch();

  // Create a new page and navigate to the chat URL
  const page = await browser.newPage();
  await page.goto('https://chat.openai.com/chat/457da351-0f21-4beb-8464-43833d04949c');

  // Wait for the chat messages to load
  await page.waitForSelector('.ChatMessageList__item');

  // Extract the chat messages from the page
  const messages = await page.evaluate(() => {
    const messageElements = Array.from(document.querySelectorAll('.ChatMessageList__item'));
    return messageElements.map(element => element.textContent.trim());
  });

  // Print the chat messages to the console
  console.log(messages);

  // Save the chat messages to a file
  const fs = require('fs');
  fs.writeFileSync('chat_messages.txt', messages.join('\n'));

  // Close the browser
  await browser.close();
})();
