import AsyncStorage from "@react-native-async-storage/async-storage";

import {groupGetAll} from "@storage/group/groupGetAll";

import {GROUP_COLLECTION, PLAYER_COLLECTION} from "@storage/storageConfig";

export async function groupRemoveByName(groupDeleted: string) {
    try {
        const stored = await groupGetAll();
        const filtered = stored.filter(group => group !== groupDeleted);
        const toStorage = JSON.stringify(filtered);

        await AsyncStorage.setItem(GROUP_COLLECTION, toStorage);
        await AsyncStorage.removeItem(`${PLAYER_COLLECTION}-${groupDeleted}`);
    } catch (error) {
        throw error;
    }
}
