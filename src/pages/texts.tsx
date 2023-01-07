import { type NextPage } from "next";
import PreviousMap from "postcss/lib/previous-map";



import { useEffect, useState } from "react";

import { api } from "../utils/api";

interface charsObj  {
    characters: string, 
    pianyin: string,
    rus: string,
    eng: string,
    tone: number,
    audio: string,
    visible: boolean,
    level: string

}

interface textObj {
    text: string
}

interface tObj {
    text:string
}


export default function Texts () {

    const [texts, setText] = useState<tObj[]>([])


    const {data:allText, isLoading:textLoading} = api?.texts?.allTexts.useQuery()

    const getTexts = (allText: any) => {
        setText(allText)

    }

    useEffect(() => {
        getTexts(allText)

    }, [allText])



     
   
 
    const deleteText = api.texts.deleteText.useMutation({
        onSuccess: (t: any) => {
            console.log(t)
            const newList:any  = allText?.filter(text => text.id !== t.id)

            setText(newList)
        }
    })
    

    
    

    console.log(texts)
    const utils = api.useContext()
    const addText = api?.texts?.newText?.useMutation({
        onSuccess:( t: any) => {
        setText(prev => [...prev, t])
         }
       
       
        

    })


    
  

    
    const [details, setDetails] = useState({
        pianyin: '',
        rus: '',
        eng: '',
        show: false
    })
    const [formData, setFormData] = useState<textObj>({
        text: ''

    })

    const [currentText, setCurrentText] = useState<tObj>({
        text: ''
    })

    const splitted = currentText?.text.split('')

   
    const notExist : charsObj = {
   
        characters: "&",
        pianyin: "not in db",
        rus: "-",
        eng: "-",
        tone: 5,
        audio: "https://yabla.vo.llnwd.net/media.yabla.com/audio/340410.mp3",
        visible: false,
        level: ''
       }
 
   
    const {data:characters, isLoading} = api.characters.allCharacters.useQuery()

  
    // const transformedText =  splittedRandomText?.map(text => {
    //     return text?.map(t => {
    //         return characters?.find(char => char.character ===  t)
    //     })
    // } )
    
    const transText = splitted?.map(letter => {
        return characters?.find(char => char.character === letter)
    })

    console.log(transText.map(t => t?.character))

     

        
       let toneColor = ''
       const switchColor = ( char: charsObj) => {
           if(char == undefined ) {
              char === notExist
              console.log(char)
           }
        if(char?.tone === 1) {
            toneColor = "text-[#F977CE]"
            return toneColor
          } else if (char?.tone === 2) {
           toneColor = "text-[#20BF55]"
           return toneColor
          } else if (char?.tone === 3) {
           toneColor = "text-[#01BAEF]"
           return toneColor 
           }  else if (char?.tone === 4) {
             toneColor = "text-[#B8D3FE]"
             return toneColor
           }else if (char?.tone === 0) {
             toneColor = "text-[#AF8C9D]"
             return toneColor
         }else if (char?.tone === 5) {
           toneColor = "text-[#4062BB]"
           return toneColor
         } else if (char?.tone == undefined ){
            toneColor = "text-[#4062BB]"
            return toneColor
         }


       }
       


       


    return (
        <div className="bg-color  text-white min-h-[100vh]">
            {  details.pianyin !== '' && <div className="fixed max-h-[25vh] p-[1rem]  bg-[#334155] w-[100vw] flex flex-col gap-[.5rem] border-[1px] rounded-md overflow-scroll">
                <div> { details.pianyin}</div>
                <div>{details.rus}</div>
                <div>{ details.eng}</div>
            
            </div>}
            <div className="fixed bottom-0 w-[100vw] bg-black flex justify-between min-h-[8vh] p-[1rem]" >
                <div className="text-[#F977CE]">一声</div>
                <div className="text-[#20BF55]">二声</div>
                <div className="text-[#01BAEF]">三声</div>
                <div className="text-[#B8D3FE]">四声</div>
                <div className="text-[#AF8C9D]">-</div>
            </div>
          {/* <section className="flex min-h-[40vh] p-[1rem] gap-[2px] text-lg font-medium text-justify font-serif pt-[30vh] "> 
        {transformedText?.map((texts : any) => {
            return texts.map((char : any, i: any) => <div  key={i}>
         
            <div onClick={(e) => {
                e.preventDefault()
                setDetails( {
                    ...details,
                    pianyin: char.pianyin,
                    rus: char.rus,
                    eng: char.eng,
                    show: true
                })
            }} className={`${switchColor(char)} hover:scale-125 transition ease-in-out`}> {char?.character} </div> 
       </div>)
        })}
        </section>  */}

        <div className=" flex flex-wrap align-center min-h-[40vh] p-[1rem] w-[90vw] gap-[2px] text-lg font-medium text-justify font-serif pt-[40vh] pb-[20vh] ">

            {/* {transText.map((char: any, i: any) => <div>{char.character}</div>)} */}
            {transText.map((char: any, i:any) => <div key={i}>
            <div  onClick={(e) => {
                e.preventDefault()
                setDetails( {
                    ...details,
                    pianyin: char ? char.pianyin : notExist.pianyin,
                    rus: char ? char.rus : notExist.rus,
                    eng: char ? char.eng : notExist.eng,
                    show: true
                })
            }} className={`${switchColor(char)} hover:scale-125 transition ease-in-out`}> {char ? char?.character : notExist.characters }</div> 
                </div>)}
        </div>



        <form className="w-[100vw] mb-[1rem] flex gap-[1rem] bg-color " onSubmit={(event) => {
           event.preventDefault()
           addText.mutate({
               text: formData.text
           })
           setFormData({...formData, text:''})

       } }>
           <input
           className="bg-color w-[80vw] p-[1rem] outline-none"
           placeholder="text"
           type='textfield'
           value={formData.text}
           onChange={event => setFormData({...formData, text: event.target.value})}
            />
            <button className=" " type="submit">save</button>
       </form>
        <div  className="w-[100vw]  flex flex-col gap-[.5rem] mb-[8vh]">
        {texts?.map((t:any, i:any) =>
      <div   key={i} className="flex  justify-between ] w-[100vw] p-[1rem] border-[.1px] overflow-hidden ">
          <div onClick={() => setCurrentText({...currentText, text:t.text})}  >    
            <div>{t.text}</div>    
        </div>
        <div onClick={() => deleteText.mutate({id: t.id})}>delete</div>

      </div>
        
            )}

        </div>
       
    
        </div>
    )
 
}

   

