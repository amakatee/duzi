import { type NextPage } from "next";

import { useState } from "react";

import { api } from "../utils/api";
// import { trpc } from "../utils/trpc";


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

const Characters: NextPage = () => {
    const [charData, setCharData] = useState<charsObj>({
        characters: '', 
        pianyin: '',
        rus: '',
        eng: '',
        tone: 0,
        audio: '',
        visible: false,
        level: ''
    })

    const utils = api.useContext()
   

    const addChar = api.characters.newCharacter.useMutation({
         onMutate: () => {
             utils.characters.allCharacters.cancel()
             const optimisticUpdates = utils.characters.allCharacters.getData()
            //  if(optimisticUpdates) {
            //      utils.characters.allCharacters.setData(optimisticUpdates)
 
            //  }
         }
    })
    const {data: allCharacters, isLoading} = api?.characters?.allCharacters.useQuery()
    
    const deleteChar = api?.characters?.deleteCharacter?.useMutation()

    return (
        <main className="bg-color  text-white min-h-[100vh]" >
            <form className="flex flex-col align-center gap-3  p-[1.5rem]" onSubmit={event => {
                event.preventDefault()
                console.log(charData)
                addChar.mutate({
                    characters: charData.characters,
                    pianyin: charData.pianyin,
                    eng: charData.eng,
                    rus: charData.rus,
                    tone:charData.tone,
                    audio: charData.audio,
                    visible:  charData.visible,
                    level: charData.level


                })
            }}>
                <h2>Add a new char</h2>
                <input 
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder="character"
                value={charData.characters}
                onChange = {event => setCharData({...charData, characters:event.target.value})}
                />
                <input 
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder="pianyin"
                value={charData.pianyin}
                onChange = {event => setCharData({...charData, pianyin:event.target.value})}
                />
                <input 
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder="eng"
                value={charData.eng}
                onChange = {event => setCharData({...charData, eng:event.target.value})}
                />
                <input 
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder="rus"
                value={charData.rus}
                onChange = {event => setCharData({...charData, rus:event.target.value})}
                />
                <input 
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder="tone"
                value={charData.tone}
                onChange = {event => setCharData({...charData, tone:+event.target.value})}
                />
                <input 
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder="audio"
                value={charData.audio}
                onChange = {event => setCharData({...charData, audio:event.target.value})}
                />
                <input 
                className="bg-transparent"
                placeholder="level"
                value={charData.level}
                onChange = {event => setCharData({...charData, level:event.target.value})}
                />
                <button type="submit">save</button>
            </form>
            
            <table className="table-auto w-screen text-center ">
                <thead >
                 <tr >
                   <th className="border-[1px] border-sky-300 p-[.5rem]">Character</th>
                   <th className="border-[1px] border-sky-300" >Pianyin</th>
                   <th className="border-[1px] border-sky-300">Tone</th>
                </tr>
              </thead>
                {allCharacters?.map((char, i) => (
                    <tbody key={i} className="border-[1px] border-sky-300">
                        <tr >
                     <td className="border-[1px] border-sky-300 p-[.5rem]">{char.character}</td>
                     <td className="border-[1px] border-sky-300">{char?.pianyin}</td>
                     <td className="border-[1px] border-sky-900 bg-sky-300" onClick={() => {
                         console.log(char.id)
                         deleteChar.mutate({id:char.id})
                     }}>delete</td>
                    </tr>
                    </tbody>
                    
                   

                ))}
            </table>

        </main>
    )
    
}

export default Characters