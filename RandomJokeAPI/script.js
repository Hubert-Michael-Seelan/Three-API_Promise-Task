
const jokeContent=document.getElementById('joke')
const btn=document.getElementById('btn')
const url='https://v2.jokeapi.dev/joke/Any?blacklistFlags=nsfw,religious,political,racist,sexist,explicit&type=single';



let getjoke=()=>{
    
    jokeContent.classList.remove('fade')
   
    fetch(url).then(Response=>Response.json())
    .then((result)=>{
        jokeContent.textContent=`${result.joke}`
    })
    jokeContent.classList.add('fade')
}
addEventListener('click',getjoke)
