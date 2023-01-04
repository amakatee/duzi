import { type NextPage } from "next";

import { useState } from "react";

import { api } from "../utils/api";


export default function Texts () {
    // const notExist = {
    //     id: new Date().toString(),
    //     character: "&",
    //     pianyin: "not in db",
    //     rus: "-",
    //     eng: "-",
    //     tone: 5,
    //     audio: "https://yabla.vo.llnwd.net/media.yabla.com/audio/340410.mp3",
    //     visible: false
    //    }
    
       const {data:characters, isLoading} = api.characters.allCharacters.useQuery()

       


    return (
        <>
        {characters?.map((char,i) => (
            <div key={i}>{char?.character}</div>
        ))}
        </>
    )
 
}

   

