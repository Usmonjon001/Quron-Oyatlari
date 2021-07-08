searchByNumber.onkeyup = async(event) =>{
    console.log(event)
    if(event.keyCode == 13){
        let response = await fetch(`http://api.alquran.cloud/v1/surah/${searchByNumber.value}/ar.alafasy`)
        let surah = await response.json()
        textSide.innerHTML = ''
        surah.data.ayahs.map( el => {
            let text = document.createElement('h1')
            text.textContent = el.text
            textSide.append(text)
            text.onclick = () =>{
                let audio = new Audio(el.audio)
                audio.play()
            }
            
        })
        console.log(surah);
    }
}