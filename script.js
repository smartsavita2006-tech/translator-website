const selectTag = document.querySelectorAll("select");
const translateBtn = document.querySelector("#transfer");
const fromtext = document.querySelector("#fromtext");
const totext = document.querySelector("#totext");
const icons = document.querySelectorAll("img")

selectTag.forEach((tag , id) => {
    for (const countriesCode in countries) {
        let selected;
        if( id == 0 && countriesCode == "en-GB"){
            selected = "selected";
        }
        else if(id == 1 && countriesCode == "hi-IN"){
            selected = "selected";
        }
        let option = ` <option value="${countriesCode}" ${selected}>${countries[countriesCode]}</option> `  
        tag.insertAdjacentHTML("beforeend", option);
    }
});


translateBtn.addEventListener(("click") , ()=> {
    let text = fromtext.value,
    translateFrom = selectTag[0].value,
    translateTo = selectTag[1].value;
   
    
    const apiURL=`https://api.mymemory.translated.net/get?q=${text} ! & langpair=${translateFrom} |${translateTo}`;

    
    fetch(apiURL).then(res => res.json()).then(data => {
        totext.value = data.responseData.translatedText;
    })
});

icons.forEach(icon => {
    icon.addEventListener("click", ({target}) => {
        if(target.classList.contains("copy") ){
            if(target.id == "from"){
                navigator.clipboard.writeText(fromtext.value);
            }
        
            else{
                navigator.clipboard.writeText(totext.value);
            }
        }
        else{
            let utterance;
            if(target.id == "from"){
                utterance = new SpeechSynthesisUtterance(fromtext.value);
                utterance.lang = selectTag[0].value;
            }
            else{
                utterance = new SpeechSynthesisUtterance(totext.value);
                utterance.lang = selectTag[1].value;
            }
            speechSynthesis.speak(utterance);
        }
    });
});