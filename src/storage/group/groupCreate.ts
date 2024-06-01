import AsyncStorage from '@react-native-async-storage/async-storage'

import {groupGetAll} from "@storage/group/groupGetAll";

import {GROUP_COLLECTION} from "@storage/storageConfig";

export async function groupCreate(newGroup: string){
    try{
        const storedGroups = await groupGetAll();

        const newCollection = JSON.stringify([...storedGroups, newGroup]);

        await AsyncStorage.setItem(GROUP_COLLECTION, newCollection);
    } catch(error){
        throw error;
    }
}
