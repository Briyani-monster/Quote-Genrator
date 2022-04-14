const quoteContainer=document.getElementById('quote-container')
const quoteText=document.getElementById('quote')
const authorText=document.getElementById('author')
const twitterBtn=document.getElementById('twitter')
const newQuoteBtn=document.getElementById('new-quote')
const copyQuoteBtn=document.getElementById('copy-quote')
const loader=document.getElementById('loader')
//global variable
let apiQuotes=[]
// show loader
function loading(){
    loader.hidden=false;
    quoteContainer.hidden=true;
}
// hide loader
function complete(){
    quoteContainer.hidden=false
    loader.hidden=true
}
// show new Quotes
function newQuotes(){
    loading();
    let index=Math.floor((Math.random()*apiQuotes.length))
    const quote=apiQuotes[index]
    authorText.textContent=(!quote.author)?'Unknown':quote.author 
    //check quote length to determine styling
    if(quote['text'].length>120){
        quoteText.classList.add('long-quote')
    }
    else{
        quoteText.classList.remove('long-quote')
    }
    // set Quote, Hide Loader
    quoteText.textContent=quote['text']
    complete();
}
// Get quotes from api

//1. using Async fetch method
//2. we'll put it in try catch block
async function getQuotes(){
    loading();
    const apiUrl='https://type.fit/api/quotes'
    try{
        // this will not run until data is fetched
        const response=await fetch(apiUrl)
        apiQuotes=await response.json()
        //this api returns all quotes at once
        newQuotes()
    }catch (error){

        //catch Error Here
    }
}
// Tweet Quote
function tweetQuote(){
    const twitterUrl=`https://twitter.com/intent/tweet?text=${quoteText.textContent}- ${authorText.textContent}`
    window.open(twitterUrl,'_blank')
}
// styling of copy button
function stylingcopybtn(text,colors){
    copyQuoteBtn.textContent=text
    copyQuoteBtn.style.color=colors
}
//copy Quote
function copyQuotes(){
    navigator.clipboard.writeText(`${quoteText.textContent}- ${authorText.textContent}`);
    stylingcopybtn('copied!!','#38a1f3')
    setInterval(()=>{
        
        stylingcopybtn('Copy Quote','black')
    },1000)
    
}
copyQuoteBtn.addEventListener('click',copyQuotes)
newQuoteBtn.addEventListener('click',newQuotes)
twitterBtn.addEventListener('click',tweetQuote)
//on Load
getQuotes()
