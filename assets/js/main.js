let base_url = 'https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/'

let select_box = document.querySelectorAll('.dropdown select');
let button = document.querySelector('form button');
let amount = document.querySelector('.amount input');
let fromcur = document.querySelector('.from select');
let tocur = document.querySelector('.to select');
let msg = document.querySelector('.msg')
let convertvalue = document.querySelector('.fa-arrow-right-arrow-left');
for (let select of select_box) {
    for (currency in countryList) {
        let optionTag = document.createElement('option');
        optionTag.innerText = currency;
        optionTag.value = currency;
        select.appendChild(optionTag);
        if (select.name == 'from' && currency == "USD") {
            optionTag.selected = "selected"
        } else if (select.name == "to" && currency == 'INR') {
            optionTag.selected = "selected"
        }
    }

    select.addEventListener('change', (event) => {
        updateFlag(event.target)
    })
}



const updateFlag = (element) => {
    let currencyValue = element.value;
    let currencyCode = countryList[currencyValue];
    let imgurl = `https://flagsapi.com/${currencyCode}/flat/64.png`
    let img = element.parentElement.querySelector('img');
    img.src = imgurl;
}





const updateExchangeValue = async () => {
    let amountVal = amount.value;
    if (amountVal == "" || amountVal < 1) {
        amountVal = 1;
        amount.value = 1;
    }
    let formvaluelower = fromcur.value.toLowerCase()
    let tovaluelower = tocur.value.toLowerCase()
    const url = `${base_url}${formvaluelower}.json`;
    let response = await fetch(url);
    let data = await response.json();
    let FromVal = data[formvaluelower];
    let toVal = FromVal[tovaluelower];

    let finalAmount = Math.floor(amountVal * toVal);

    msg.innerText = `${amountVal} ${fromcur.value} = ${finalAmount} ${tocur.value}`
}

button.addEventListener('click', async (event) => {
    event.preventDefault();
    updateExchangeValue();
})

window.addEventListener('load', () => {
    updateExchangeValue();
})













































// let select_box = document.querySelectorAll('.dropdown select');
// let btn = document.querySelector('form button');
// let fromcur = document.querySelector('.from select');
// let tocur = document.querySelector('.to select');

// for (let select of select_box) {
//     for (currencyCode in countryList) {
//         let newOption = document.createElement('option');
//         newOption.innerText = currencyCode;
//         newOption.value = currencyCode;
//         if (select.name == 'from' && currencyCode == "USD") {
//             newOption.selected = "selected"
//         } else if (select.name == "to" && currencyCode == 'INR') {
//             newOption.selected = "selected"
//         }
//         select.appendChild(newOption)
//     }

//     select.addEventListener('change', (event) => {
//         updateFlag(event.target)
//     })
// }

// const updateFlag = (element) => {
//     let currencyValue = element.value;
//     let currencyCode = countryList[currencyValue];
//     let imgurl = `https://flagsapi.com/${currencyCode}/flat/64.png`
//     let img = element.parentElement.querySelector('img');
//     img.src = imgurl;
// }

// btn.addEventListener('click', async (evt) => {
//     evt.preventDefault();
//     let amount = document.querySelector('.amount input');
//     let amountVal = amount.value;
//     if (amountVal == "" || amountVal < 1) {
//         amountVal = 1;
//         amount.value = 1;
//     }

//     const url = `${base_url}/${fromcur.value.toLowerCase()}/${tocur.value.toLowerCase()}.json`;
//     let response = await fetch(url);
//     let data = await response.json();
//     console.log(data);

// })


