var shortenButton = document.querySelector("#shrtnBtn");
var LinkToshorten = document.querySelector("#inputURL");
var CopyBtn = document.querySelector("#copyOutput");
var OutputDiv = document.querySelector(".output");

shortenButton.addEventListener("click", () => {
    if (LinkToshorten.value != "") {
        //console.log("is Valid URL - " + validURL(LinkToshorten.value));
        if (validURL(LinkToshorten.value) != false) {
            if (LinkToshorten.value.includes("https://") == false)
            {
                LinkToshorten.value = "https://" + LinkToshorten.value;
            }
            document.querySelector(".outLink a").textContent = "";
            document.querySelector(".outLink a").setAttribute("href","");
            document.querySelector(".output .content").style.display = "none";
            
            // Insert Query -
            // https://script.google.com/macros/s/AKfycbzwXnFIE4RtVDM6MVtJUSvMiZTtSlq28w5XYHbXYx9BA1EDOEDWN11gA2wmNMsuaVk4kA/exec?addRowData=true&dt1&dt2=https://link.com
            var API_URL = "https://script.google.com/macros/s/AKfycbzwXnFIE4RtVDM6MVtJUSvMiZTtSlq28w5XYHbXYx9BA1EDOEDWN11gA2wmNMsuaVk4kA/exec?addRowData=true&";
            var val1 = document.getElementById("inputID").value;
            var val2 = document.getElementById("inputURL").value;

            OutputDiv.style.display = "flex";
            document.querySelector("#spinner").style.display = "block";

            fetch(API_URL + `dt1=${val1}&dt2=${val2}`)
                .then(response => response.json())
                .then(data => {
                    triggerMessage("success", "Your URL is Generated");

                    document.getElementById("inputID").value = "";
                    document.getElementById("inputURL").value = "";
                    document.querySelector("#spinner").style.animation = "animation: spin 3s linear infinite";
                    document.querySelector("#spinner").style.display = "none";
                    document.querySelector(".output .content").style.display = "flex";
                    document.querySelector(".outLink a").textContent = "https://secureurl.github.io/URL?o=" + data.Data.replace("Data Inserted Successfully with ID - ", "");
                    document.querySelector(".outLink a").setAttribute("href","https://secureurl.github.io/URL?o=" + data.Data.replace("Data Inserted Successfully with ID - ", ""));
                    //console.log(document.querySelector(".outLink a").textContent);
                    return;
                });
        }
        else
            triggerMessage("error", "Please enter a valid URL");

    }
    else
        triggerMessage("error", "Please enter a URL and then continue");
})

CopyBtn.addEventListener("click", () => {
    //console.log("copy button clicked");
    if (document.querySelector(".outLink a").textContent != "") {
        copyText();
    }
})

function copyText() {
    const textToCopy = document.querySelector(".outLink a").textContent;

    navigator.clipboard.writeText(textToCopy)
        .then(() => {
            triggerMessage("success", "New URL Copied");
            //alert("Text copied to clipboard!");
        })
        .catch((error) => {
            console.error("Error copying text: ", error);
        });
}

function hideOutput() {
}

function triggerMessage(type, MessageContent) {
    var promptText = document.querySelector(".prompt");
    var timeout;
    promptText.childNodes[1].textContent = MessageContent;

    promptText.classList.remove("error");
    promptText.classList.remove("success");
    if (promptText.classList.contains("show")) {
        promptText.classList.remove("show");
        promptText.classList.add("show");
        clearTimeout(timeout);
    }
    else {
        promptText.classList.add("show");
    }

    timeout = setTimeout(function () { promptText.classList.remove("show") }, 6000);

    promptText.classList.add(type);
    if (type == "error")
        promptText.childNodes[0].classList.add("fa-exclamation-triangle");
    else if (type == "success")
        promptText.childNodes[0].classList.add("fa-check-circle");

}

function validURL(str) {
    var pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
        '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
    return !!pattern.test(str);
}