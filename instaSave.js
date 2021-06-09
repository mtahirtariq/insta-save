function copyTextToClipboard(text) {
    var textArea = document.createElement("textarea");
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
        document.execCommand('copy');
    } catch (err) {
        console.error('Copy to clipboard faild')
    }

    document.body.removeChild(textArea);
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function getLinks() {
    let hrefs = new Set();
    let linksSelector = ".Nnq7C a"
    let loadingSpinnerSelector = ".By4nA"
    let links = document.querySelectorAll(linksSelector);
    let loadingSpinner = document.querySelector(loadingSpinnerSelector);
    do {
        for (i = 0; i < links.length; i++) {
            hrefs.add(links[i].href);
        }
        window.scrollTo(0, document.body.scrollHeight);
        links = document.querySelectorAll(linksSelector);
        loadingSpinner = document.querySelector(loadingSpinnerSelector);
        await sleep(1500);
    } while (loadingSpinner);
    return hrefs;
}

var links = await getLinks();
copyTextToClipboard(Array.from(links).join("\r\n"));
