let countryOpt= document.querySelectorAll(".copt");
let img1= document.querySelector(".imgSelect1 img");
let select1=document.querySelector(".copt1");
let select2=document.querySelector(".copt2");
let convertBtn=document.querySelector(".btn button");
let ContryBaseRateArr;
let finalRate;
let inputRate=document.querySelector(".entAmt input");
let msg = document.querySelector("#msg");


async function convete(){
    let contryRateApi = await fetch("https://api.freecurrencyapi.com/v1/latest?apikey=fca_live_mCkkhTGnl99DJYDvpmygLToMPNXcI1xvTCFipMRx");
    let contryData = await contryRateApi.json();
    ContryBaseRateArr=contryData.data;
    
    }
    
     convete();

// use for add all contry code in drowpdrow
for(let con in countryList)
{
    // use for access both drowpdown
    for(let opt of countryOpt)
    {
        let newOpt = document.createElement("option");
        let countryCode=opt.appendChild(newOpt);
        countryCode.innerText=con;
        countryCode.value=countryList[con];

        // set defale selected USD
        if (countryCode.value=="US" && opt.id=="from")
        {
            countryCode.selected=true;
        }

        // set defale selected INR
        if (countryCode.value=="IN" && opt.id=="to")
        {
            countryCode.selected=true;
        }


        

        //accces 1st select elemets

        select1.addEventListener("change",()=>{
        
            // acssecc imageselect1 class
            let sel1=select1.parentElement;

            // accssc img tag with withing only imageselect1 class 
            let img =sel1.querySelector("img");
            
            let img1ContryCode=select1.value;
            img.src=`https://flagsapi.com/${img1ContryCode}/flat/64.png`;
        })

        //accces 2nd select elemets

        select2.addEventListener("change",()=>{
        
            // acssecc imageselect1 class
            let sel2=select2.parentElement;

            // accssc img tag with withing only imageselect1 class 
            let img =sel2.querySelector("img");
            
            let img1ContryCode=select2.value;
            img.src=`https://flagsapi.com/${img1ContryCode}/flat/64.png`;
        })


        convertBtn.addEventListener("click",(event)=>{
            event.preventDefault();

        selCountry1=select1.value;
            if(selCountry1==countryList[con]){
             Country1=con;
             con1Rate=ContryBaseRateArr[Country1];

            }
        
            selCountry2=select2.value;
            if(selCountry2==countryList[con]){
                Country2=con;
                con2Rate=ContryBaseRateArr[Country2];
            }
            
            // set condition for minus and empty values
            if((inputRate.value=="") || inputRate.value<1) {

                inputRate.value=1;
                inputRate.innertext=1;

            }
            //access contry rate 
            if(Country1=="USD"){ 
            finalRate =con1Rate*con2Rate*inputRate.value
            }
            
           else{
            finalRate= inputRate.value/con1Rate*con2Rate
           }

            msg.innerText=`${inputRate.value} ${Country1} = ${finalRate} ${Country2}`;
       
       
    })
}}

function defaultFlags(select,imgUrl){
    // acssecc imageselect1 class
    let sel=select.parentElement;

    // accssc img tag with withing only imageselect1 class 
    let img =sel.querySelector("img");
    img.src=imgUrl;

    // accssc option tag with withing only imageselect1 class

    // let option =sel.querySelector("option");
    // console.log(option);
    // option.innerText=country;
    // option.value=country;
    // select.value=country;
} 
    // assine select value

defaultFlags(select1,"https://flagsapi.com/US/flat/64.png");
defaultFlags(select2,"https://flagsapi.com/IN/flat/64.png");

