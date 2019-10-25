import React from 'react'
import {cards_image_list} from './cards-list'
import _  from "lodash"



export default function random_pair(no_of_cards = 13,groups=4) {

    const sample = _.sampleSize(cards_image_list,no_of_cards)
    let concat = _.concat(sample);
    for(var i=0;i<groups - 1;i++)
    {        
         concat = _.concat(concat ,sample)
    }


    let shuffle = _.shuffle(concat)
    
    shuffle = shuffle.map((img,index) => ({id:index+1,is_fliped:true,img:img+'.png',name:`card-${img}`,component_classes:['flip-card'],is_disabled:false}))
    return {shuffle,sample}
}
