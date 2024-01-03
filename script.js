
const button =document.getElementById('button');
const audioElement =document.getElementById('audio');



// Idsable and enable buttons 
function toggleButton(){
    // buyton disabled is true or false or vice versa shortcut way to do it is below
    button.disabled = !button.disabled 
}


// tellme funtion ; passing our joke to Voice rss api
function tellMeJoke(joke){
    console.log('tell me:', joke);
    VoiceRSS.speech({
        key: '12d5edb932c64e2f9c2eda3978317c62',
        src: joke,
        hl: 'en-us',
        v: 'Linda',
        r: 0, 
        c: 'mp3',
        f: '44khz_16bit_stereo',
        ssml: false                      
    });
}

// Get Jokes from Joke API 
async function getJokes(){
    let joke = '';
    const apiUrl ='https://v2.jokeapi.dev/joke/Any?blacklistFlags=nsfw,religious,political,racist,sexist,explicit'
    try{
        const response = await fetch(apiUrl);
        const data = await response.json();
       if(data.setup){
        joke = `${data.setup} ... ${data.delivery} `;
       }else {
        joke = data.joke;
       }
    //    text to speech
       tellMeJoke(joke);
    //    disable the button 
    toggleButton();
    }
    catch(error){
       console.log('WHOOPS!Something went wrong', error);
    };
}

// Event listeners
button.addEventListener('click', getJokes);
audioElement.addEventListener('ended', toggleButton);