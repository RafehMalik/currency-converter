const BASE_URL =
"https://api.frankfurter.dev/v1/latest?base=${from}&symbols=${to}";

//note: api only fetch data of few countries like inr and usd etc.

  const dropdowns = document.querySelectorAll(".dropdown select");
  const btn = document.querySelector("form button");
  const fromCurr = document.querySelector(".from select");
  const toCurr = document.querySelector(".to select");
  const msg = document.querySelector(".msg");

for (let select of dropdowns){
    for(let currCode in countryList){
        let newOption=document.createElement("option");
        newOption.innerText=currCode;
        newOption.value=currCode;
        select.append(newOption);
    }
    select.addEventListener("change",(evt)=>{
        updateFlag(evt.target);
    })
}
let updateFlag=(element)=>{
    let currCode=element.value;
    let countryCode=countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img=element.parentElement.querySelector("img");
    img.src=newSrc;
}

let getExchange=async ()=>{
    let amt=document.querySelector("input");
    let amtValue=amt.value;
    if(amtValue < 1 || amtValue===""){
        amt.value="1";
        amtValue=1;
    }
    let url=`https://api.frankfurter.app/latest?base=${fromCurr.value}&symbols=${toCurr.value}`;

    let response=await fetch(url);
    let data=await response.json();
    let rate=amtValue*data.rates[toCurr.value]
    msg.innerText = `${amtValue} ${fromCurr.value} = ${rate} ${toCurr.value}`;
}

btn.addEventListener("click",(evt)=>{
    evt.preventDefault();
    getExchange();
})

