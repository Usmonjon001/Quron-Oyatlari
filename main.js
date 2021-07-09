searchByNumber.onkeyup = async(event) =>{
    
    console.log(event)
    if(event.keyCode == 13){
        

        if(!(searchByNumber.value > 0 && searchByNumber.value < 114)){
            alert('Input Kiritishda Xatolik Bor')
            console.log('asd');
        }


        let response = await fetch(`https://api.quran.sutanlab.id/surah/${searchByNumber.value}`)
        let surah = await response.json()
        let translationRes = await fetch(`https://quranenc.com/api/translation/sura/uzbek_mansour/${searchByNumber.value}`)
        let translationUz = await translationRes.json()
        console.log(surah);
        textSide.innerHTML = ''
        let { data: { verses } } = surah;
        console.log(translationUz);
        let intro = document.createElement('h1')
        intro.textContent = 'Oyatni Eshitish Uchun Arab Harfining Ustiga Bosing!..'
        textSide.append(intro)
        intro.style.textAlign = 'center'
        intro.style.marginBottom = '45px'
        

        


        for(i=0; i< verses.length; i++){

            let wrapper = document.createElement('div')
            wrapper.setAttribute('class', 'wrappers')
            textSide.append(wrapper)

            let oyat = document.createElement('h1')
            oyat.textContent = verses[i].text.arab
            wrapper.append(oyat)
            let audio = document.createElement('audio')
            audio.setAttribute('src', verses[i].audio.primary)


            let tarjima = document.createElement('h1')
            tarjima.textContent = translationUz.result[i].translation
            wrapper.append(tarjima)


            wrapper.onclick = (event)=>{
                audio.play();
                let active = document.querySelectorAll('.active');
                active.forEach(el => el.classList.remove('active'))
                wrapper.classList.add('active');
            }

            let index = 0

            

            function readQuranAyats(index){
                let actives = document.querySelectorAll('.active')
                actives.forEach(el =>el.classList.remove('active'))
                console.log(verses.length,index)
                let item = document.querySelectorAll('.wrappers')
                item[index].classList.add('active')
                let audio = document.createElement('audio')
                let source = document.createElement('source')
                source.src = verses[index].audio.primary
                audio.append(source)
                audioWrapper.append(audio)

                btnPause.onclick = () => {
                    audio.pause()
                }
                play.onclick = () =>{
                    // audioWrapper.innerHTML = null
                    // index = -1
                    // audioWrapper.append(audio)
                    // console.log('hello world!');
                    // audio.play()
                    audio.play()
                    audio.onended = () =>{
                        if(index < verses.length-1){
                            console.log('hello');
                            return readQuranAyats(index + 1);
                        } else if(index == verses.length){
                            console.log('Tuagodi')
                            return index = -1
                        }
                    }
                }

                audio.play()
                audio.onended = () =>{
                    
                    if(index < verses.length-1){
                        console.log('hi');
                        return readQuranAyats(index + 1);
                    } 
                    if(index <= verses.length -1){
                        return index = -1
                    }
                }
            }
            play.onclick = () =>{
                readQuranAyats(index)
            }
        }
        console.log(surah);
    }
}