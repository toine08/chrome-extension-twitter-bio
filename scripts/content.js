const insert = (content) => {
  const elements = document.getElementsByClassName(
    "r-30o5oe r-1niwhzg r-17gur6a r-1yadl64 r-deolkf r-homxoj r-poiln3 r-7cikom r-1ny4l3l r-t60dpp r-1dz5y72 r-fdjqy7 r-13qz1uu");


  if (elements.length === 0) {
    return;
  }
  const element = elements[1];
  const txtToRemove = element.childNodes[0];
  console.log(txtToRemove, "<--- txt to remove")
  //txtToRemove.remove()
  console.log(txtToRemove, "<--- should be empty")
  element.value +=content;
  return true;
};
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.message === "inject") {
    const { content } = request;
    console.log(content)
    const result = insert(content);
    if (!result) {
      sendResponse({ status: "failed" });
    }

    sendResponse({ status: "success" });
  }
});
