import AsyncStorage from '@react-native-async-storage/async-storage'

import {AppError} from "@utils/AppError";

import {groupGetAll} from "@storage/group/groupGetAll";

import {GROUP_COLLECTION} from "@storage/storageConfig";

export async function groupCreate(newGroup: string) {
    try {
        const storedGroups = await groupGetAll();

        const groupAlreadyExists = storedGroups.includes(newGroup)

        if (groupAlreadyExists) {
            throw new AppError("Group already exists");
        }

        const newCollection = JSON.stringify([...storedGroups, newGroup]);

        await AsyncStorage.setItem(GROUP_COLLECTION, newCollection);
    } catch (error) {
        throw error;
    }
}
